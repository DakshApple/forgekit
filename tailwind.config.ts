import type { Config } from "tailwindcss";

// Brand: ink on paper. Greys are ink at lower opacity (ink/xx).
// ink / paper / wash / tint are CSS variables so the storefront can switch
// to dark mode. Light values are the defaults (see globals.css); the admin
// panel always uses the light values.
const themed = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  // `dark:` utilities only apply inside the storefront when dark mode is on.
  darkMode: ["variant", "&:is(.dark [data-store] *)"],
  theme: {
    extend: {
      colors: {
        ink: themed("ink"), // light: #0B132B midnight · dark: #F7F8F8
        paper: themed("paper"), // light: #FFFFFF · dark: #08090A
        wash: themed("wash"), // light: #F8FAFC · dark: #0F1011
        tint: themed("tint"), // light: #F1F5F9 · dark: #16171A
        accent: themed("accent"), // AA-safe sapphire text/accent per theme
        sapphire: {
          400: "#0EA5E9",
          500: "#3B82F6",
          600: "#2563EB",
        },
        brand: {
          50: "#f0f7ff",
          100: "#e0effe",
          500: "#0284c7", // Sapphire Electric
          600: "#0369a1", // Deep Sapphire
          700: "#075985",
          800: "#0c4a6e",
          900: "#0a2540", // Midnight Sapphire
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      boxShadow: {
        soft: "0 2px 8px rgba(10,37,64,0.04)",
        lift: "0 20px 40px rgba(10,37,64,0.08)",
        float: "0 24px 48px rgba(10,37,64,0.12)",
        glow: "0 0 24px rgba(59, 130, 246, 0.35)",
        "glow-lg": "0 30px 120px -20px rgba(59, 130, 246, 0.45)",
        hairline: "0 0 0 1px rgb(var(--ink) / 0.08)",
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "float-idle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        beam: {
          "0%": { strokeDashoffset: "220" },
          "100%": { strokeDashoffset: "0" },
        },
        caret: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        "slide-list": {
          "0%, 20%": { transform: "translateY(0)" },
          "33%, 53%": { transform: "translateY(100%)" },
          "66%, 86%": { transform: "translateY(200%)" },
          "100%": { transform: "translateY(0)" },
        },
        "ping-soft": {
          "0%": { transform: "scale(1)", opacity: "0.6" },
          "100%": { transform: "scale(2.2)", opacity: "0" },
        },
        "type-key": {
          "0%": { clipPath: "inset(0 100% 0 0)" },
          "45%, 85%": { clipPath: "inset(0 0 0 0)" },
          "100%": { clipPath: "inset(0 0 0 0)", opacity: "0" },
        },
        "check-pop": {
          "0%, 40%": { transform: "scale(0)", opacity: "0" },
          "55%": { transform: "scale(1.15)", opacity: "1" },
          "65%, 100%": { transform: "scale(1)", opacity: "1" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in-up": "fade-in-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in-up-delay": "fade-in-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.12s forwards",
        "fade-in-up-delay-2": "fade-in-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.24s forwards",
        "float-idle": "float-idle 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        shimmer: "shimmer 2.4s cubic-bezier(0.16, 1, 0.3, 1) infinite",
        beam: "beam 3.2s cubic-bezier(0.16, 1, 0.3, 1) infinite",
        caret: "caret 1s steps(1) infinite",
        "slide-list": "slide-list 6s cubic-bezier(0.16, 1, 0.3, 1) infinite",
        "ping-soft": "ping-soft 2s cubic-bezier(0.16, 1, 0.3, 1) infinite",
        "type-key": "type-key 5s steps(18) infinite",
        "check-pop": "check-pop 5s cubic-bezier(0.16, 1, 0.3, 1) infinite",
        marquee: "marquee 40s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
