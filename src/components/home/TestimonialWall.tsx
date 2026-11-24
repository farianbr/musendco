"use client";

import { useEffect, useRef } from "react";

/** Momentum left after a throw decays by this factor per second. */
const FRICTION = 3.2;
/** Throws are capped so a flick never sends the wall spinning. */
const MAX_THROW = 2400;

type Column = {
  track: HTMLElement;
  copy: HTMLElement;
  /** +1 drifts up, -1 drifts down. */
  dir: number;
  duration: number;
  offset: number;
  height: number;
};

/**
 * Drives the testimonial wall. Each column drifts on its own, in alternating
 * directions. A mouse or pen can grab the wall and drag every column with it;
 * letting go throws the wall, and the throw eases back into the drift.
 * Hovering slows the drift to a stop so any card can be read. Touch is left
 * to the page so a swipe still scrolls. Under reduced motion nothing moves
 * and the CSS shows the full list instead.
 *
 * Expects children with [data-wall-track] (one per column), each holding two
 * identical copies of its cards, so the loop is seamless.
 */
export function TestimonialWall({ className, children }: { className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wall = ref.current;
    if (!wall || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const columns: Column[] = Array.from(wall.querySelectorAll<HTMLElement>("[data-wall-track]")).map((track) => ({
      track,
      copy: track.firstElementChild as HTMLElement,
      dir: track.dataset.reverse ? -1 : 1,
      duration: Number(track.dataset.duration) || 50,
      offset: 0,
      height: 0,
    }));

    const measure = () => {
      for (const column of columns) {
        column.height = column.copy?.offsetHeight ?? 0;
        // Downward columns start half a loop in, so the two directions never line up.
        if (column.dir < 0 && column.offset === 0) column.offset = column.height / 2;
      }
    };
    measure();
    const resize = new ResizeObserver(measure);
    columns.forEach((column) => column.copy && resize.observe(column.copy));

    let visible = false;
    const seen = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
    });
    seen.observe(wall);

    let hovered = false;
    let dragging = false;
    let play = 1;
    let momentum = 0;
    let lastY = 0;
    let lastT = 0;
    let raf = 0;
    let prev = 0;

    const paint = () => {
      for (const column of columns) {
        if (!column.height) continue;
        column.offset = ((column.offset % column.height) + column.height) % column.height;
        column.track.style.transform = `translate3d(0, ${-column.offset}px, 0)`;
      }
    };

    const frame = (now: number) => {
      const dt = Math.min((now - prev) / 1000, 0.05);
      prev = now;

      if (!dragging) {
        // Ease the drift toward stopped (hovered) or full speed.
        const target = hovered ? 0 : 1;
        play += (target - play) * Math.min(1, dt * 4);
        momentum *= Math.exp(-FRICTION * dt);
        if (Math.abs(momentum) < 1) momentum = 0;
        for (const column of columns) {
          if (!column.height) continue;
          column.offset += (column.dir * play * (column.height / column.duration) + momentum) * dt;
        }
      }
      paint();

      if (visible) raf = requestAnimationFrame(frame);
      else raf = 0;
    };

    function start() {
      if (raf) return;
      prev = performance.now();
      raf = requestAnimationFrame(frame);
    }

    const onEnter = () => (hovered = true);
    const onLeave = () => (hovered = false);

    const onDown = (event: PointerEvent) => {
      if (event.pointerType === "touch" || event.button !== 0) return;
      dragging = true;
      momentum = 0;
      lastY = event.clientY;
      lastT = event.timeStamp;
      wall.setPointerCapture(event.pointerId);
      wall.setAttribute("data-dragging", "");
    };

    const onMove = (event: PointerEvent) => {
      if (!dragging) return;
      const dy = event.clientY - lastY;
      const dt = Math.max((event.timeStamp - lastT) / 1000, 0.001);
      lastY = event.clientY;
      lastT = event.timeStamp;
      // Content follows the pointer: dragging down moves the cards down.
      for (const column of columns) column.offset -= dy;
      const velocity = -dy / dt;
      momentum = momentum * 0.6 + velocity * 0.4;
    };

    const onUp = (event: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      wall.removeAttribute("data-dragging");
      if (wall.hasPointerCapture(event.pointerId)) wall.releasePointerCapture(event.pointerId);
      // A pause before letting go means no throw.
      if (event.timeStamp - lastT > 80) momentum = 0;
      momentum = Math.max(-MAX_THROW, Math.min(MAX_THROW, momentum));
    };

    // A drag that ends over a link should not also follow it.
    let moved = 0;
    const onDownCount = (event: PointerEvent) => (moved = event.clientY);
    const onClick = (event: MouseEvent) => {
      if (Math.abs(event.clientY - moved) > 4) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    wall.addEventListener("pointerenter", onEnter);
    wall.addEventListener("pointerleave", onLeave);
    wall.addEventListener("pointerdown", onDown);
    wall.addEventListener("pointerdown", onDownCount);
    wall.addEventListener("pointermove", onMove);
    wall.addEventListener("pointerup", onUp);
    wall.addEventListener("pointercancel", onUp);
    wall.addEventListener("click", onClick, true);

    return () => {
      cancelAnimationFrame(raf);
      resize.disconnect();
      seen.disconnect();
      wall.removeEventListener("pointerenter", onEnter);
      wall.removeEventListener("pointerleave", onLeave);
      wall.removeEventListener("pointerdown", onDown);
      wall.removeEventListener("pointerdown", onDownCount);
      wall.removeEventListener("pointermove", onMove);
      wall.removeEventListener("pointerup", onUp);
      wall.removeEventListener("pointercancel", onUp);
      wall.removeEventListener("click", onClick, true);
      columns.forEach((column) => (column.track.style.transform = ""));
    };
  }, []);

  return (
    <div ref={ref} data-reveal="fade" className={className}>
      {children}
    </div>
  );
}
