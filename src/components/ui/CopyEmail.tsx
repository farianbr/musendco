"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, LazyMotion, domAnimation, m } from "motion/react";
import { Check, Copy } from "lucide-react";

/**
 * The email as a mailto link, plus a copy button whose icon morphs to a check
 * to confirm the copy (state change shown, not just announced).
 */
export function CopyEmail({ email, className }: { email: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <div className={className ?? "flex items-center gap-3"}>
      <a href={`mailto:${email}`} className="link-underline text-[clamp(1.25rem,0.9rem+1.5vw,2.25rem)] font-medium tracking-[-0.025em] break-all">
        {email}
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Email address copied" : "Copy email address"}
        className="pressable relative inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-line-strong hover:border-fg"
      >
        <LazyMotion features={domAnimation} strict>
          <AnimatePresence mode="popLayout" initial={false}>
            <m.span
              key={copied ? "check" : "copy"}
              initial={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
              transition={{ type: "spring", duration: 0.3, bounce: 0 }}
              className="inline-flex"
            >
              {copied ? (
                <Check aria-hidden strokeWidth={2} className="size-4 text-accent" />
              ) : (
                <Copy aria-hidden strokeWidth={1.75} className="size-4" />
              )}
            </m.span>
          </AnimatePresence>
        </LazyMotion>
      </button>
      <span role="status" className="sr-only">
        {copied ? "Copied to clipboard" : ""}
      </span>
    </div>
  );
}
