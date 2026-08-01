"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const SKILLS = [
  "Financial Modeling",
  "Strategy Consulting",
  "Data Analytics",
  "Python · C · C++",
  "AI & Machine Learning",
  "Technical Analysis",
  "M&A Blueprints",
  "Entrepreneurship",
  "Product Leadership",
  "Prompt Engineering",
  "Case Competitions",
  "FinTech Innovation",
];

// Duplicate for seamless loop
const ITEMS = [...SKILLS, ...SKILLS, ...SKILLS];

interface MarqueeRowProps {
  direction?: "left" | "right";
  speed?: number;
  accent?: boolean;
}

function MarqueeRow({ direction = "left", speed = 22, accent = false }: MarqueeRowProps) {
  const inner = (
    <div
      className="flex items-center gap-0 shrink-0"
      style={{ animationDuration: `${speed}s`, animationDirection: direction === "right" ? "reverse" : "normal" }}
    >
      {ITEMS.map((s, i) => (
        <div
          key={i}
          className={`flex items-center gap-0 whitespace-nowrap select-none ${
            accent ? "group" : ""
          }`}
        >
          <span
            className={`font-display text-[clamp(1.6rem,3.5vw,2.8rem)] leading-none px-6 py-3 border-r-2 border-charcoal transition-colors duration-150 ${
              accent
                ? "text-paper group-hover:text-orange"
                : i % 4 === 0
                ? "text-cobalt"
                : "text-charcoal hover:text-orange"
            }`}
          >
            {s}
          </span>
          {/* separator asterisk */}
          <span
            className={`font-mono text-sm px-3 ${accent ? "text-faint" : "text-muted"}`}
            aria-hidden
          >
            ✦
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="marquee-track flex overflow-hidden">
      <div
        className="flex animate-marquee"
        style={{ animationDuration: `${speed}s`, animationDirection: direction === "right" ? "reverse" : "normal" }}
      >
        {inner}
        {/* second copy for seamless wrap */}
        {inner}
      </div>
    </div>
  );
}

export default function Marquee() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  return (
    <motion.section
      ref={ref}
      style={{ opacity }}
      className="overflow-hidden border-y-2 border-charcoal bg-charcoal"
      aria-label="Skills ticker"
    >
      {/* Row 1 — light on dark */}
      <div className="py-3 border-b border-white/10">
        <MarqueeRow speed={24} accent />
      </div>
      {/* Row 2 — dark on light (reversed) */}
      <div className="bg-paper py-3">
        <MarqueeRow direction="right" speed={18} />
      </div>
    </motion.section>
  );
}
