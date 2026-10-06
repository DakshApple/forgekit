import type { ReactNode } from "react";
import { Reveal } from "./reveal";

export function SectionHeading({
  kicker,
  title,
  body,
  align = "center",
  id,
}: {
  kicker: string;
  title: ReactNode;
  body?: ReactNode;
  align?: "center" | "left";
  id?: string;
}) {
  const centered = align === "center";
  return (
    <div className={centered ? "mx-auto max-w-[680px] text-center" : "max-w-[620px]"}>
      <Reveal>
        <span className="kicker">
          <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-sapphire-500 to-sapphire-400" />
          {kicker}
        </span>
      </Reveal>
      <Reveal delay={60}>
        <h2 id={id} className="title text-gradient mt-4 pb-1">
          {title}
        </h2>
      </Reveal>
      {body && (
        <Reveal delay={120}>
          <p className={`mt-4 text-[17px] leading-[1.6] text-ink/65 ${centered ? "mx-auto max-w-[540px]" : ""}`}>
            {body}
          </p>
        </Reveal>
      )}
    </div>
  );
}
