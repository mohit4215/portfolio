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
        // Light anime palette
        cream:    "#FFFDF5",
        parchment:"#FFF8E7",
        warm:     "#FFF3D4",
        sakura:   "#FFD6E0",
        sky:      "#D6EEFF",
        mint:     "#D6FFE8",
        lavender: "#EDD6FF",
        sunYellow:"#FFE566",
        fireRed:  "#FF4D2E",
        fireOrange:"#FF8C00",
        emberGold:"#FFB800",
        inkBlack: "#1A1A2E",
        inkDark:  "#16213E",
        inkMid:   "#2D2D44",
        outline:  "#1A1A2E",
        // whites
        white:    "#FFFFFF",
        offWhite: "#FAFAF8",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans:    ["var(--font-sans)",    "sans-serif"],
        mono:    ["var(--font-mono)",    "monospace"],
        anime:   ["var(--font-anime)",   "sans-serif"],
      },
      borderWidth: { "3": "3px", "4": "4px" },
      boxShadow: {
        "manga":     "4px 4px 0px #1A1A2E",
        "manga-lg":  "6px 6px 0px #1A1A2E",
        "manga-xl":  "8px 8px 0px #1A1A2E",
        "manga-fire":"4px 4px 0px #FF4D2E",
        "manga-gold":"4px 4px 0px #FFB800",
        "inner-glow":"inset 0 0 20px rgba(255,184,0,0.3)",
        "pop":       "0 0 0 3px #1A1A2E, 4px 4px 0px #1A1A2E",
      },
      keyframes: {
        // Dragon animations
        "dragon-fly": {
          "0%":   { transform: "translateX(-120%) translateY(10%) rotate(-5deg)" },
          "40%":  { transform: "translateX(10%) translateY(-5%) rotate(2deg)" },
          "60%":  { transform: "translateX(5%) translateY(-8%) rotate(-1deg)" },
          "80%":  { transform: "translateX(8%) translateY(-5%) rotate(3deg)" },
          "100%": { transform: "translateX(10%) translateY(-5%) rotate(2deg)" },
        },
        "fire-breathe": {
          "0%,100%": { transform: "scaleX(0.3) scaleY(0.8)", opacity: "0.6" },
          "50%":     { transform: "scaleX(1) scaleY(1.2)", opacity: "1" },
        },
        "fire-flicker": {
          "0%,100%": { transform: "scaleY(1) scaleX(1)", filter: "hue-rotate(0deg)" },
          "25%":     { transform: "scaleY(1.15) scaleX(0.9)", filter: "hue-rotate(10deg)" },
          "50%":     { transform: "scaleY(0.9) scaleX(1.1)", filter: "hue-rotate(-10deg)" },
          "75%":     { transform: "scaleY(1.1) scaleX(0.95)", filter: "hue-rotate(5deg)" },
        },
        "intro-out": {
          "0%":   { opacity: "1", transform: "scale(1)" },
          "100%": { opacity: "0", transform: "scale(1.05)", pointerEvents: "none" },
        },
        // UI animations
        "float": {
          "0%,100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%":     { transform: "translateY(-12px) rotate(2deg)" },
          "66%":     { transform: "translateY(-6px) rotate(-2deg)" },
        },
        "float-slow": {
          "0%,100%": { transform: "translateY(0px)" },
          "50%":     { transform: "translateY(-18px)" },
        },
        "bounce-in": {
          "0%":   { transform: "scale(0) rotate(-10deg)", opacity: "0" },
          "60%":  { transform: "scale(1.15) rotate(3deg)", opacity: "1" },
          "80%":  { transform: "scale(0.95) rotate(-1deg)" },
          "100%": { transform: "scale(1) rotate(0deg)", opacity: "1" },
        },
        "wiggle": {
          "0%,100%": { transform: "rotate(0deg)" },
          "25%":     { transform: "rotate(-8deg)" },
          "75%":     { transform: "rotate(8deg)" },
        },
        "pop": {
          "0%":   { transform: "scale(1)" },
          "50%":  { transform: "scale(1.12)" },
          "100%": { transform: "scale(1)" },
        },
        "slide-in-left": {
          "0%":   { transform: "translateX(-60px)", opacity: "0" },
          "100%": { transform: "translateX(0)",     opacity: "1" },
        },
        "slide-in-right": {
          "0%":   { transform: "translateX(60px)", opacity: "0" },
          "100%": { transform: "translateX(0)",    opacity: "1" },
        },
        "slide-in-up": {
          "0%":   { transform: "translateY(40px)", opacity: "0" },
          "100%": { transform: "translateY(0)",    opacity: "1" },
        },
        "marquee": {
          "0%":   { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to:   { transform: "rotate(360deg)" },
        },
        "pulse-ring": {
          "0%":   { transform: "scale(1)",   opacity: "1" },
          "100%": { transform: "scale(2.2)", opacity: "0" },
        },
        "blink": {
          "0%,100%": { opacity: "1" },
          "50%":     { opacity: "0" },
        },
        "shimmer": {
          "0%":   { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        "star-spin": {
          "0%":   { transform: "rotate(0deg) scale(1)" },
          "50%":  { transform: "rotate(180deg) scale(1.3)" },
          "100%": { transform: "rotate(360deg) scale(1)" },
        },
      },
      animation: {
        "dragon-fly":    "dragon-fly 2.5s cubic-bezier(0.34,1.2,0.64,1) forwards",
        "fire-breathe":  "fire-breathe 0.4s ease-in-out infinite",
        "fire-flicker":  "fire-flicker 0.15s ease-in-out infinite",
        "intro-out":     "intro-out 0.8s ease-in-out forwards",
        "float":         "float 4s ease-in-out infinite",
        "float-slow":    "float-slow 6s ease-in-out infinite",
        "float-delay":   "float 4s ease-in-out 1.5s infinite",
        "bounce-in":     "bounce-in 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards",
        "wiggle":        "wiggle 0.5s ease-in-out",
        "pop":           "pop 0.3s ease-in-out",
        "slide-left":    "slide-in-left 0.6s cubic-bezier(0.34,1.2,0.64,1) forwards",
        "slide-right":   "slide-in-right 0.6s cubic-bezier(0.34,1.2,0.64,1) forwards",
        "slide-up":      "slide-in-up 0.6s cubic-bezier(0.34,1.2,0.64,1) forwards",
        "marquee":       "marquee 20s linear infinite",
        "spin-slow":     "spin-slow 8s linear infinite",
        "pulse-ring":    "pulse-ring 1.5s ease-out infinite",
        "blink":         "blink 1s step-end infinite",
        "shimmer":       "shimmer 2.5s linear infinite",
        "star-spin":     "star-spin 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
