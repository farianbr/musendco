"use client";

import { useEffect, useRef } from "react";
import { geoEquirectangular, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { FeatureCollection, MultiPolygon, Polygon, Position } from "geojson";
import type { GeometryCollection, Topology } from "topojson-specification";

type Land = FeatureCollection<Polygon | MultiPolygon>;

const DEG = Math.PI / 180;
/** Auto-rotation, degrees per second. */
const SPIN = 7;
/** Spacing of the land dot lattice, in degrees of latitude. */
const DOT_STEP = 0.8;
/** Coastline points closer than this (degrees) to the previous one are dropped. */
const COAST_TOLERANCE = 0.12;
/** Fastest spin a throw can start, degrees per second. */
const MAX_THROW = 260;

/** Unit vector for a lon/lat: x right, y up, z towards the viewer at 0,0. */
function toVec(lon: number, lat: number, out: number[]) {
  const cl = Math.cos(lat * DEG);
  out.push(cl * Math.sin(lon * DEG), Math.sin(lat * DEG), cl * Math.cos(lon * DEG));
}

/** Polylines are packed into one array; a NaN triple starts a new line. */
function pushBreak(out: number[]) {
  out.push(NaN, NaN, NaN);
}

/** A lattice of points on land, as unit vectors. Land is found by rasterising it once. */
function landDots(land: Land) {
  const w = 1440;
  const h = 720;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
  const projection = geoEquirectangular().scale(w / (2 * Math.PI)).translate([w / 2, h / 2]);
  ctx.beginPath();
  geoPath(projection, ctx)(land);
  ctx.fill();
  const pixels = ctx.getImageData(0, 0, w, h).data;

  const out: number[] = [];
  for (let lat = -84; lat <= 84; lat += DOT_STEP) {
    const step = DOT_STEP / Math.max(0.15, Math.cos(lat * DEG));
    for (let lon = -180; lon < 180; lon += step) {
      const x = Math.floor(((lon + 180) / 360) * w);
      const y = Math.floor(((90 - lat) / 180) * h);
      if (pixels[(y * w + x) * 4 + 3] > 128) toVec(lon, lat, out);
    }
  }
  return new Float32Array(out);
}

/** Every ring of the land outline as one packed, lightly decimated polyline array. */
function coastlines(land: Land) {
  const out: number[] = [];
  const addRing = (ring: Position[]) => {
    let prev: Position | null = null;
    for (const point of ring) {
      if (prev && Math.abs(point[0] - prev[0]) + Math.abs(point[1] - prev[1]) < COAST_TOLERANCE) continue;
      toVec(point[0], point[1], out);
      prev = point;
    }
    const first = ring[0];
    toVec(first[0], first[1], out);
    pushBreak(out);
  };
  for (const f of land.features) {
    const g = f.geometry;
    const polygons = g.type === "Polygon" ? [g.coordinates] : g.coordinates;
    for (const polygon of polygons) for (const ring of polygon) addRing(ring);
  }
  return new Float32Array(out);
}

/** Meridians and parallels every 15 degrees. */
function graticule() {
  const out: number[] = [];
  for (let lon = -180; lon < 180; lon += 15) {
    for (let lat = -90; lat <= 90; lat += 2) toVec(lon, lat, out);
    pushBreak(out);
  }
  for (let lat = -75; lat <= 75; lat += 15) {
    for (let lon = -180; lon <= 180; lon += 2) toVec(lon, lat, out);
    pushBreak(out);
  }
  return new Float32Array(out);
}

function themeColours() {
  const style = getComputedStyle(document.documentElement);
  return {
    ink: style.getPropertyValue("--fg").trim() || "#ecece7",
    sphere: style.getPropertyValue("--bg").trim() || "#0b0b0c",
    marker: style.getPropertyValue("--brand-orange").trim() || "#ff5931",
  };
}

/**
 * Wireframe globe (after wearestokt.com): a solid sphere with a graticule,
 * dotted land and crisp coastlines, plus a pulsing marker on the studio.
 * It turns on its own; drag to spin it on both axes, and it carries on with
 * the momentum of the throw before easing back into its own turn. Slows while
 * hovered so it is easy to catch, pauses off-screen, and under reduced motion
 * only moves when dragged. Decorative: the location is stated beside it.
 *
 * Rendering: all geometry is precomputed as unit vectors, so a frame is one
 * rotation per point plus a few batched canvas calls.
 */
export function Globe({ location, className }: { location: [number, number]; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const [lat, lon] = location;
    const marker: number[] = [];
    toVec(lon, lat, marker);

    let disposed = false;
    let dots = new Float32Array();
    let coast = new Float32Array();
    const grid = graticule();
    let colours = themeColours();

    // Yaw and pitch in degrees. Start with the studio a little east of centre.
    const rotation = { yaw: -lon - 28, pitch: 24 };
    const velocity = { yaw: 0, pitch: 0 };
    let dragging = false;
    let hovering = false;
    let last = { x: 0, y: 0, t: 0 };
    let size = 0;
    let dpr = 1;
    let visible = true;
    let frame = 0;
    let previous = performance.now();
    let spinScale = reduce ? 0 : 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      size = canvas.clientWidth;
      canvas.width = Math.round(size * dpr);
      canvas.height = Math.round(size * dpr);
    };

    const draw = (now: number) => {
      const s = size * dpr;
      const r = s / 2 - 2 * dpr;
      const cx = s / 2;
      const cy = s / 2;
      const ca = Math.cos(rotation.yaw * DEG);
      const sa = Math.sin(rotation.yaw * DEG);
      const cb = Math.cos(rotation.pitch * DEG);
      const sb = Math.sin(rotation.pitch * DEG);

      ctx.clearRect(0, 0, s, s);
      ctx.globalAlpha = 1;
      ctx.fillStyle = colours.sphere;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();

      // Polylines, front hemisphere only. Breaks at the limb and at NaN separators.
      const lines = (data: Float32Array) => {
        ctx.beginPath();
        let pen = false;
        for (let i = 0; i < data.length; i += 3) {
          const x = data[i];
          if (x !== x) {
            pen = false;
            continue;
          }
          const y = data[i + 1];
          const z = data[i + 2];
          const x1 = x * ca + z * sa;
          const z1 = -x * sa + z * ca;
          const y2 = y * cb - z1 * sb;
          const z2 = y * sb + z1 * cb;
          if (z2 < 0) {
            pen = false;
            continue;
          }
          const px = cx + r * x1;
          const py = cy - r * y2;
          if (pen) ctx.lineTo(px, py);
          else ctx.moveTo(px, py);
          pen = true;
        }
      };

      ctx.strokeStyle = colours.ink;
      lines(grid);
      ctx.globalAlpha = 0.16;
      ctx.lineWidth = 0.7 * dpr;
      ctx.stroke();

      // Land dots, batched into four brightness bands that fade towards the limb.
      const d = 1.15 * dpr;
      const half = d / 2;
      ctx.fillStyle = colours.ink;
      for (let band = 0; band < 4; band++) {
        const lo = band / 4;
        const hi = (band + 1) / 4;
        ctx.beginPath();
        for (let i = 0; i < dots.length; i += 3) {
          const x = dots[i];
          const y = dots[i + 1];
          const z = dots[i + 2];
          const z1 = -x * sa + z * ca;
          const z2 = y * sb + z1 * cb;
          if (z2 <= 0.02 || z2 < lo || z2 >= hi) continue;
          const x1 = x * ca + z * sa;
          const y2 = y * cb - z1 * sb;
          ctx.rect(cx + r * x1 - half, cy - r * y2 - half, d, d);
        }
        ctx.globalAlpha = 0.2 + 0.5 * (lo + 0.125);
        ctx.fill();
      }

      // Coastlines and limb.
      lines(coast);
      ctx.globalAlpha = 0.95;
      ctx.lineWidth = 1.1 * dpr;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.globalAlpha = 0.35;
      ctx.lineWidth = 1 * dpr;
      ctx.stroke();

      // Studio marker with a ring that pulses outward.
      const [mx, my, mz] = marker;
      const mz1 = -mx * sa + mz * ca;
      const facing = my * sb + mz1 * cb;
      if (facing > 0) {
        const px = cx + r * (mx * ca + mz * sa);
        const py = cy - r * (my * cb - mz1 * sb);
        const pulse = reduce ? 0.4 : (now / 1600) % 1;
        ctx.globalAlpha = (1 - pulse) * 0.7 * facing;
        ctx.strokeStyle = colours.marker;
        ctx.lineWidth = 1.5 * dpr;
        ctx.beginPath();
        ctx.arc(px, py, (4 + pulse * 14) * dpr, 0, Math.PI * 2);
        ctx.stroke();

        ctx.globalAlpha = Math.min(1, 0.4 + facing);
        ctx.shadowColor = colours.marker;
        ctx.shadowBlur = 14 * dpr;
        ctx.fillStyle = colours.marker;
        ctx.beginPath();
        ctx.arc(px, py, 4 * dpr, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      ctx.globalAlpha = 1;
    };

    const clampPitch = (value: number) => Math.max(-85, Math.min(85, value));

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      const dt = Math.min(0.05, (now - previous) / 1000);
      previous = now;
      if (!visible || disposed) return;

      if (!dragging) {
        // A throw's momentum decays smoothly while the idle spin eases back in.
        const decay = Math.pow(0.04, dt);
        velocity.yaw *= decay;
        velocity.pitch *= decay;
        const targetSpin = reduce ? 0 : hovering ? 0.35 : 1;
        spinScale += (targetSpin - spinScale) * Math.min(1, dt * 2.5);
        rotation.yaw += (velocity.yaw + SPIN * spinScale) * dt;
        rotation.pitch = clampPitch(rotation.pitch + velocity.pitch * dt);
      }
      draw(now);
    };

    const onDown = (event: PointerEvent) => {
      dragging = true;
      velocity.yaw = 0;
      velocity.pitch = 0;
      last = { x: event.clientX, y: event.clientY, t: performance.now() };
      canvas.setPointerCapture(event.pointerId);
      canvas.dataset.dragging = "";
    };
    const onMove = (event: PointerEvent) => {
      if (!dragging) return;
      const now = performance.now();
      // The surface follows the pointer: a drag across the globe is about half a turn.
      const k = 180 / Math.max(200, size);
      const dx = (event.clientX - last.x) * k;
      const dy = (event.clientY - last.y) * k;
      rotation.yaw += dx;
      rotation.pitch = clampPitch(rotation.pitch + dy);
      const elapsed = Math.max(8, now - last.t) / 1000;
      const clamp = (v: number) => Math.max(-MAX_THROW, Math.min(MAX_THROW, v));
      velocity.yaw = clamp(velocity.yaw * 0.6 + (dx / elapsed) * 0.4);
      velocity.pitch = clamp(velocity.pitch * 0.6 + (dy / elapsed) * 0.4);
      last = { x: event.clientX, y: event.clientY, t: now };
      if (reduce) draw(now);
    };
    const onUp = (event: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      delete canvas.dataset.dragging;
      // A pause before letting go means no throw.
      if (performance.now() - last.t > 80) {
        velocity.yaw = 0;
        velocity.pitch = 0;
      }
      if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
    };
    const onEnter = () => (hovering = true);
    const onLeave = () => (hovering = false);

    resize();
    const resizeObserver = new ResizeObserver(() => {
      resize();
      draw(performance.now());
    });
    resizeObserver.observe(canvas);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    intersection.observe(canvas);
    const themeObserver = new MutationObserver(() => {
      colours = themeColours();
      draw(performance.now());
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    canvas.addEventListener("pointerenter", onEnter);
    canvas.addEventListener("pointerleave", onLeave);

    // The map (Natural Earth 1:50m land, via world-atlas) is fetched only once a globe is on the page.
    fetch("/geo/land-50m.json")
      .then((response) => response.json() as Promise<Topology<{ land: GeometryCollection }>>)
      .then((topology) => {
        if (disposed) return;
        const land = feature(topology, topology.objects.land) as unknown as Land;
        dots = landDots(land);
        coast = coastlines(land);
        canvas.style.opacity = "1";
        draw(performance.now());
      })
      .catch(() => {
        // Without the map the globe still turns as a graticule sphere.
        canvas.style.opacity = "1";
      });

    frame = requestAnimationFrame(tick);

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersection.disconnect();
      themeObserver.disconnect();
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      canvas.removeEventListener("pointerenter", onEnter);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, [location]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`globe-canvas block aspect-square w-full ${className ?? ""}`}
      style={{ opacity: 0 }}
    />
  );
}
