"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import type { Faq } from "@/types/content";
import { cn } from "@/lib/cn";

/**
 * Accordion. Height animates through grid-template-rows (0fr to 1fr) so the
 * panel can size to its content without measuring.
 */
export function FaqList({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <ul className="border-b border-line">
      {items.map((item, i) => {
        const expanded = open === i;
        const panelId = `${baseId}-panel-${i}`;
        return (
          <li key={item.question} className="border-t border-line">
            <h3>
              <button
                type="button"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpen(expanded ? null : i)}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left text-lead font-medium"
              >
                {item.question}
                <span
                  aria-hidden
                  className={cn(
                    "inline-flex size-10 shrink-0 items-center justify-center rounded-full border transition-[transform,background-color,border-color,color] duration-(--dur) ease-out motion-reduce:transition-none",
                    expanded ? "rotate-45 border-accent bg-accent text-on-accent" : "border-line-strong group-hover:border-fg",
                  )}
                >
                  <Plus strokeWidth={1.75} className="size-4" />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-label={item.question}
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-(--dur) ease-out motion-reduce:transition-none",
                expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden" inert={!expanded}>
                <p className="max-w-[62ch] pb-7 text-fg-2">{item.answer}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
