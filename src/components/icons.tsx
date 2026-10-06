import type { SVGProps } from "react";

const paths = {
  invoice: "M6 3h12v18l-3-2-3 2-3-2-3 2V3zM9 8h6M9 12h6",
  calendar: "M3 6a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6zM3 10h18M8 2v4M16 2v4",
  star: "M12 3l2.6 5.6 6 .8-4.4 4.2 1.1 6L12 16.7 6.7 19.6l1.1-6L3.4 9.4l6-.8L12 3z",
  box: "M3 7l9-4 9 4-9 4-9-4zM3 7v10l9 4 9-4V7M12 11v10",
  quote: "M4 4h16v13H8l-4 4V4zM8 9h8M8 13h5",
  "user-plus": "M9 12a4 4 0 100-8 4 4 0 000 8zM2 21c0-4 3-6 7-6s7 2 7 6M19 8v6M16 11h6",
  check: "M5 12l5 5 9-10",
  arrow: "M5 12h14M13 6l6 6-6 6",
  back: "M19 12H5M11 6l-6 6 6 6",
  lock: "M6 10h12a2 2 0 012 2v7a2 2 0 01-2 2H6a2 2 0 01-2-2v-7a2 2 0 012-2zM8 10V7a4 4 0 018 0v3",
  refund: "M3 12a9 9 0 109-9M3 4v5h5",
  mail: "M3 5h18v14H3zM3 7l9 6 9-6",
  headset: "M4 12a8 8 0 1116 0v5a2 2 0 01-2 2h-1v-6h3M4 12v5a2 2 0 002 2h1v-6H4",
  card: "M3 6h18v13H3zM3 10h18",
  user: "M12 12a4 4 0 100-8 4 4 0 000 8zM4 21c1-4 4-6 8-6s7 2 8 6",
  menu: "M4 8h16M4 16h16",
  close: "M6 6l12 12M18 6L6 18",
  plus: "M12 5v14M5 12h14",
  search: "M11 18a7 7 0 100-14 7 7 0 000 14zM20 20l-4-4",
  chevron: "M6 9l6 6 6-6",
  copy: "M9 9h11v11H9zM5 15V5a1 1 0 011-1h10",
  download: "M12 4v11M7 11l5 5 5-5M5 20h14",
  dashboard: "M3 3h7v9H3zM14 3h7v5h-7zM14 12h7v9h-7zM3 16h7v5H3z",
  key: "M8 19a4 4 0 100-8 4 4 0 000 8zM11 12l9-9M16 7l3 3",
  users: "M9 12a4 4 0 100-8 4 4 0 000 8zM2 21c0-4 3-6 7-6s7 2 7 6M17 4a4 4 0 010 8M22 21c0-3-2-5-5-5.7",
  logout: "M9 4H5a1 1 0 00-1 1v14a1 1 0 001 1h4M16 8l4 4-4 4M20 12H9",
  upload: "M12 16V5M7 9l5-5 5 5M5 20h14",
  sun: "M12 3v1.5M12 19.5V21M4.6 4.6l1.1 1.1M18.3 18.3l1.1 1.1M3 12h1.5M19.5 12H21M4.6 19.4l1.1-1.1M18.3 5.7l1.1-1.1M12 16.5a4.5 4.5 0 100-9 4.5 4.5 0 000 9z",
  moon: "M20.5 14.5A8.5 8.5 0 019.5 3.5a8.5 8.5 0 1011 11z",
  shield: "M12 3l8 3v6c0 4.6-3.4 8-8 9-4.6-1-8-4.4-8-9V6l8-3zM9 12l2 2 4-4",
  globe: "M12 21a9 9 0 100-18 9 9 0 000 18zM3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z",
  terminal: "M4 5h16v14H4zM8 10l2.5 2L8 14M13 14h3",
} as const;

export type IconName = keyof typeof paths;

export function Icon({
  name,
  size = 18,
  strokeWidth = 2,
  ...rest
}: { name: IconName; size?: number; strokeWidth?: number } & Omit<
  SVGProps<SVGSVGElement>,
  "name"
>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      <path d={paths[name]} />
    </svg>
  );
}
