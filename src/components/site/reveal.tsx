import type { CSSProperties, ReactNode } from "react";
import { createElement } from "react";

type Tag = "div" | "section" | "li" | "article" | "header" | "p" | "span" | "details";

/**
 * Scroll reveal wrapper (server component). Elements fade in and rise 12px the
 * first time they enter the viewport. The observer lives in <RevealObserver />.
 * Without JS, or with reduced motion, content is simply visible.
 */
export function Reveal({
  as = "div",
  delay = 0,
  className,
  id,
  children,
}: {
  as?: Tag;
  /** Stagger delay in ms. Use multiples of 60. */
  delay?: number;
  className?: string;
  id?: string;
  children: ReactNode;
}) {
  return createElement(
    as,
    {
      "data-reveal": "",
      id,
      className,
      style: { "--d": `${delay}ms` } as CSSProperties,
    },
    children,
  );
}
