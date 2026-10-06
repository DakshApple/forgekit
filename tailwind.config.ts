import type { Config } from "tailwindcss";

// Brand: strictly black and white. Greys are black at lower opacity (ink/xx).
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0A0A0B", // slightly cooler black
        paper: "#FFFFFF",
        wash: "#FAFAFA",
        tint: "#F4F4F5",
        accent: {
          50: '#eef2ff',
          100: '#e0e7ff',
          500: '#6366f1', // Indigo
          600: '#4f46e5',
          900: '#312e81',
        }
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"], // Switch to Inter for that premium SaaS look
      },
      boxShadow: {
        soft: "0 2px 8px rgba(0,0,0,0.04)",
        lift: "0 20px 40px rgba(0,0,0,0.08)",
        float: "0 24px 48px rgba(0,0,0,0.12)",
        glow: "0 0 20px rgba(99, 102, 241, 0.4)",
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "float-idle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        }
      },
      animation: {
        "fade-in": "fade-in 0.8s ease-out forwards",
        "fade-in-up": "fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in-up-delay": "fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s forwards",
        "fade-in-up-delay-2": "fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards",
        "float-idle": "float-idle 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
