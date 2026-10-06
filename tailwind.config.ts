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
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "float-idle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        }
      },
      animation: {
        "fade-in": "fade-in 0.6s ease-out forwards",
        "fade-in-up": "fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in-up-delay": "fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s forwards",
        "fade-in-up-delay-2": "fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards",
        "float-idle": "float-idle 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
