const labels = ["Your details", "Payment", "Your key"];

export function Steps({ current }: { current: 1 | 2 | 3 }) {
  return (
    <ol className="flex flex-wrap items-center gap-x-5 gap-y-3">
      {labels.map((label, i) => {
        const n = i + 1;
        const on = n === current;
        const done = n < current;
        return (
          <li key={label} className="flex items-center gap-5">
            <span
              className={`flex items-center gap-2.5 text-sm font-medium ${
                on || done ? "" : "text-ink/50"
              }`}
              aria-current={on ? "step" : undefined}
            >
              <span
                className={`flex h-[26px] w-[26px] flex-none items-center justify-center rounded-full border text-xs ${
                  on
                    ? "border-ink bg-ink text-paper"
                    : done
                      ? "border-ink"
                      : "border-ink/30"
                }`}
              >
                {n}
              </span>
              {label}
            </span>
            {n < 3 && <span className="hidden h-px w-8 bg-ink/30 sm:block" />}
          </li>
        );
      })}
    </ol>
  );
}
