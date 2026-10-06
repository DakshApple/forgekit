import type { Config } from "tailwindcss";

// Brand: strictly black and white. Greys are black at lower opacity (ink/xx).
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0B132B", // Deep midnight dark
        paper: "#FFFFFF",
        wash: "#F8FAFC", // Cool slate tint wash
        tint: "#F1F5F9",
        brand: {
          50: '#f0f7ff',
          100: '#e0effe',
          500: '#0284c7', // Sapphire Electric
          600: '#0369a1', // Deep Sapphire
          700: '#075985',
          800: '#0c4a6e',
          900: '#0a2540', // Stripe-like Midnight Sapphire
        }
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 2px 8px rgba(10,37,64,0.04)",
        lift: "0 20px 40px rgba(10,37,64,0.08)",
        float: "0 24px 48px rgba(10,37,64,0.12)",
        glow: "0 0 24px rgba(2, 132, 199, 0.35)",
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
