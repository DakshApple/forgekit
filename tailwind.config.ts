import type { Config } from "tailwindcss";

// Brand: strictly black and white. Greys are black at lower opacity (ink/xx).
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0A0A0A",
        paper: "#FFFFFF",
        wash: "#FAFAFA",
        tint: "#F5F5F5",
      },
      fontFamily: {
        sans: ["Poppins", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(10,10,10,0.04)",
        lift: "0 12px 32px rgba(10,10,10,0.08)",
        float: "0 12px 32px rgba(10,10,10,0.10)",
      },
      letterSpacing: {
        tightest: "-0.035em",
      },
    },
  },
  plugins: [],
};

export default config;
