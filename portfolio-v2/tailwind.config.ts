import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F3F1EA",
        espresso: "#121110",
        charcoal: "#18181B",
        cobalt: "#2563EB",
        orange: "#FF4800",
        ink: "#27272A",
        muted: "#71717A",
        faint: "#A1A1AA",
        rule: "#E4E2D9",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        "display-2xl": ["clamp(4rem,10vw,9rem)", { lineHeight: "0.92", letterSpacing: "-0.04em" }],
        "display-xl":  ["clamp(2.8rem,6vw,6rem)",  { lineHeight: "0.94", letterSpacing: "-0.03em" }],
        "display-lg":  ["clamp(2rem,4vw,3.5rem)",   { lineHeight: "1",    letterSpacing: "-0.02em" }],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "section": "7rem",
      },
      borderWidth: {
        "3": "3px",
      },
      boxShadow: {
        "brutal":    "4px 4px 0px #18181B",
        "brutal-lg": "6px 6px 0px #18181B",
        "brutal-cobalt": "4px 4px 0px #2563EB",
        "brutal-orange": "4px 4px 0px #FF4800",
        "inset-rule": "inset 0 0 0 2px #18181B",
      },
      keyframes: {
        marquee: {
          "0%":   { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to:   { transform: "rotate(360deg)" },
        },
        blink: {
          "0%,100%": { opacity: "1" },
          "50%":     { opacity: "0" },
        },
        "flicker": {
          "0%,100%": { opacity: "1" },
          "92%":     { opacity: "1" },
          "93%":     { opacity: "0.4" },
          "94%":     { opacity: "1" },
          "96%":     { opacity: "0.6" },
          "97%":     { opacity: "1" },
        },
        "slide-up": {
          from: { transform: "translateY(100%)", opacity: "0" },
          to:   { transform: "translateY(0)",    opacity: "1" },
        },
        "noise": {
          "0%,100%": { backgroundPosition: "0 0" },
          "10%": { backgroundPosition: "-5% -10%" },
          "20%": { backgroundPosition: "-15% 5%" },
          "30%": { backgroundPosition: "7% -25%" },
          "40%": { backgroundPosition: "20% 25%" },
          "50%": { backgroundPosition: "-25% 10%" },
          "60%": { backgroundPosition: "15% 5%" },
          "70%": { backgroundPosition: "0% 15%" },
          "80%": { backgroundPosition: "25% 35%" },
          "90%": { backgroundPosition: "-10% 10%" },
        },
      },
      animation: {
        marquee:    "marquee 18s linear infinite",
        "spin-slow": "spin-slow 20s linear infinite",
        blink:      "blink 1s step-end infinite",
        flicker:    "flicker 4s linear infinite",
        "slide-up": "slide-up 0.4s ease forwards",
        noise:      "noise 0.5s steps(2) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
