import { Fragment } from "react";

type Part = { text: string; em?: boolean };

/**
 * Splits text into masked words so each can rise into place. Animation is
 * driven by CSS: `.enter-words` on an ancestor plays on load, and
 * `data-reveal="words"` plays when scrolled into view.
 * Screen readers get the plain sentence from a visually hidden copy.
 */
export function SplitWords({
  parts,
  offset = 0,
}: {
  parts: Part[] | string;
  /** Starting index, so several SplitWords can share one cascade. */
  offset?: number;
}) {
  const list: Part[] = typeof parts === "string" ? [{ text: parts }] : parts;
  let index = offset;
  const label = list.map((p) => p.text).join(" ").replace(/\s+/g, " ").trim();

  return (
    <>
      <span className="sr-only">{label}</span>
      {list.map((part, p) => (
        <Fragment key={p}>
          {part.text
            .trim()
            .split(/\s+/)
            .map((word, w) => {
              const i = index++;
              return (
                <Fragment key={w}>
                  <span aria-hidden className="word" style={{ "--w": i } as React.CSSProperties}>
                    <span className={part.em ? "italic" : undefined}>{word}</span>
                  </span>{" "}
                </Fragment>
              );
            })}
        </Fragment>
      ))}
    </>
  );
}
