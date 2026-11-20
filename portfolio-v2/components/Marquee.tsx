"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const SKILLS = [
  { label: "Financial Modeling",    emoji: "💹" },
  { label: "Strategy Consulting",   emoji: "🎯" },
  { label: "Data Analytics",        emoji: "📊" },
  { label: "Python · C · C++",      emoji: "💻" },
  { label: "AI & Machine Learning", emoji: "🤖" },
  { label: "Technical Analysis",    emoji: "📈" },
  { label: "M&A Blueprints",        emoji: "🏦" },
  { label: "Entrepreneurship",      emoji: "🚀" },
  { label: "Product Leadership",    emoji: "👑" },
  { label: "Prompt Engineering",    emoji: "⚡" },
  { label: "Case Competitions",     emoji: "🏆" },
  { label: "FinTech Innovation",    emoji: "💎" },
];

const ITEMS = [...SKILLS, ...SKILLS, ...SKILLS];

export default function Marquee() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  return (
    <motion.section
      ref={ref}
      className="overflow-hidden border-y-4 border-inkBlack"
      style={{ opacity, background: "linear-gradient(135deg, #1A1A2E, #2D2D44)" }}
      aria-label="Skills marquee"
    >
      {/* Row 1 */}
      <div className="flex py-3 overflow-hidden border-b-2 border-white/10">
        <div className="flex animate-marquee" style={{ animationDuration: "22s" }}>
          {ITEMS.map((s, i) => (
            <div key={i} className="flex items-center gap-0 shrink-0">
              <span className="flex items-center gap-2 px-5 py-2 font-sans text-base font-bold text-cream whitespace-nowrap"
                style={{ fontFamily: "Nunito, sans-serif" }}>
                <span className="text-lg">{s.emoji}</span>
                {s.label}
              </span>
              <span className="text-sunYellow text-lg px-2" aria-hidden>✦</span>
            </div>
          ))}
          {ITEMS.map((s, i) => (
            <div key={`b${i}`} className="flex items-center gap-0 shrink-0">
              <span className="flex items-center gap-2 px-5 py-2 font-sans text-base font-bold text-cream whitespace-nowrap"
                style={{ fontFamily: "Nunito, sans-serif" }}>
                <span className="text-lg">{s.emoji}</span>
                {s.label}
              </span>
              <span className="text-sunYellow text-lg px-2" aria-hidden>✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 — reversed, cream bg */}
      <div className="flex py-3 overflow-hidden bg-sunYellow/90">
        <div className="flex animate-marquee" style={{ animationDuration: "18s", animationDirection: "reverse" }}>
          {ITEMS.map((s, i) => (
            <div key={i} className="flex items-center gap-0 shrink-0">
              <span className="flex items-center gap-2 px-5 py-2 font-display text-xl text-inkBlack whitespace-nowrap"
                style={{ fontFamily: "Bangers, cursive", letterSpacing: "0.08em" }}>
                <span>{s.emoji}</span>
                {s.label.toUpperCase()}
              </span>
              <span className="text-inkBlack text-lg px-2 font-bold" aria-hidden>★</span>
            </div>
          ))}
          {ITEMS.map((s, i) => (
            <div key={`b${i}`} className="flex items-center gap-0 shrink-0">
              <span className="flex items-center gap-2 px-5 py-2 font-display text-xl text-inkBlack whitespace-nowrap"
                style={{ fontFamily: "Bangers, cursive", letterSpacing: "0.08em" }}>
                <span>{s.emoji}</span>
                {s.label.toUpperCase()}
              </span>
              <span className="text-inkBlack text-lg px-2 font-bold" aria-hidden>★</span>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
