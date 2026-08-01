"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useInView } from "@/hooks/useInView";

const ITEMS = [
  {
    emoji: "🏆", badge: "Winner", bg: "bg-sunYellow",
    title: "Social Media Challenge — MAIT Marathon",
    meta: "TechXtract · Maharaja Agrasen Institute of Technology",
    desc: "Won the Social Media Challenge at the TechXtract marathon, competing against teams across Delhi NCR engineering colleges.",
    year: "2025", index: "01",
  },
  {
    emoji: "⭐", badge: "Academic", bg: "bg-sky",
    title: "95% — Class 10th ICSE Board",
    meta: "Secondary Education · National Board",
    desc: "Achieved an outstanding 95% in ICSE Board examinations, ranking among top performers and setting a strong academic foundation.",
    year: "2022", index: "02",
  },
  {
    emoji: "🎮", badge: "Competitor", bg: "bg-mint",
    title: "10+ Competition Presence",
    meta: "Across Delhi NCR & Online Platforms",
    desc: "Active participant in India Predicts 2026, PromptWars, 360 Product Leadership Challenge, Plum X Invicta, TechNova, Niti Gyaan 5.0, Code Theft Auto, and more.",
    year: "2024–26", index: "03",
  },
];

export default function Achievements() {
  const { ref: sectionRef, inView } = useInView<HTMLElement>({ threshold: 0.08 });
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start 0.8", "end 0.3"] });
  const lineH = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "100%"]), { stiffness: 80, damping: 20 });

  return (
    <section
      id="achievements"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="section-pad"
      style={{ background: "linear-gradient(135deg, #1A1A2E 0%, #16213E 50%, #2D2D44 100%)" }}
    >
      <div className="max-w-4xl mx-auto px-6 md:px-12">

        {/* ── Header ── */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}}
            transition={{ type: "spring", stiffness: 400, damping: 18 }}
            className="inline-block mb-4 text-4xl"
          >🏆</motion.div>
          <motion.h2
            className="font-display text-5xl md:text-6xl text-cream"
            style={{ fontFamily: "Bangers, cursive", letterSpacing: "0.08em",
              textShadow: "0 0 30px rgba(255,184,0,0.4), 4px 4px 0px rgba(255,77,46,0.5)" }}
            initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            ACHIEVEMENTS
          </motion.h2>
          <motion.p
            className="font-sans text-sm text-white/40 mt-2 uppercase tracking-widest"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}
          >
            ✦ Milestones Unlocked ✦
          </motion.p>
        </div>

        {/* ── Timeline ── */}
        <div ref={trackRef} className="relative">
          {/* Progress line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-white/10">
            <motion.div className="absolute top-0 left-0 w-full bg-gradient-to-b from-fireRed to-emberGold origin-top" style={{ height: lineH }} />
          </div>

          <div className="flex flex-col gap-8">
            {ITEMS.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.15, type: "spring", stiffness: 280, damping: 22 }}
                className="relative flex gap-6 pl-20"
              >
                {/* Pulse node */}
                <div className="absolute left-5 top-4 w-7 h-7 rounded-full border-3 border-emberGold bg-inkBlack flex items-center justify-center z-10">
                  <span className="text-sm">{item.emoji}</span>
                  <span className="absolute w-7 h-7 rounded-full border-2 border-emberGold animate-pulse-ring" aria-hidden />
                </div>

                {/* Card */}
                <motion.div
                  whileHover={{ x: 6, scale: 1.01 }}
                  className={`flex-1 manga-panel ${item.bg} p-5`}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="inline-block px-3 py-1 rounded-full border-2 border-inkBlack bg-inkBlack text-cream font-sans text-xs font-bold">
                        {item.badge}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-inkBlack/40">{item.year}</span>
                      <span
                        className="font-display text-4xl text-inkBlack/8 leading-none select-none"
                        style={{ fontFamily: "Bangers, cursive" }}
                      >
                        {item.index}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-sans text-lg font-extrabold text-inkBlack mb-0.5">{item.title}</h3>
                  <p className="font-mono text-xs text-inkDark/50 mb-3">{item.meta}</p>
                  <p className="font-sans text-sm text-inkDark/70 leading-relaxed">{item.desc}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
