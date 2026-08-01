"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Trophy, Star, Medal } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const ITEMS = [
  {
    icon: Trophy,
    badge: "Winner",
    badgeColor: "#FF4800",
    title: "Social Media Challenge — MAIT Marathon",
    meta: "TechXtract · Maharaja Agrasen Institute of Technology",
    desc: "Won the Social Media Challenge at the TechXtract marathon — competing against teams across engineering colleges in Delhi NCR.",
    year: "2025",
    index: "01",
  },
  {
    icon: Star,
    badge: "Academic",
    badgeColor: "#2563EB",
    title: "95% — Class 10th ICSE Board",
    meta: "Secondary Education · National Board",
    desc: "Achieved an outstanding 95% in ICSE Board examinations, ranking among top performers and setting the foundation for rigorous academic pursuit.",
    year: "2022",
    index: "02",
  },
  {
    icon: Medal,
    badge: "Competitor",
    badgeColor: "#18181B",
    title: "10+ Competition Presence",
    meta: "Across Delhi NCR & Online Platforms",
    desc: "Active participant in India Predicts 2026, PromptWars, 360 Product Leadership Challenge, Plum X Invicta, TechNova, Niti Gyaan 5.0, Code Theft Auto, and more.",
    year: "2024–26",
    index: "03",
  },
];

export default function Achievements() {
  const { ref: sectionRef, inView } = useInView<HTMLElement>({ threshold: 0.1 });
  const trackRef = useRef<HTMLDivElement>(null);

  // Scroll-driven vertical progress line
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start 0.8", "end 0.3"] });
  const lineHeight = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "100%"]), {
    stiffness: 80,
    damping: 20,
  });

  return (
    <section
      id="achievements"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="section-pad bg-charcoal border-b-2 border-charcoal"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* ── Header ────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b-2 border-white/10 pb-8">
          <div>
            <motion.p
              className="font-mono text-xs uppercase tracking-[0.18em] text-orange mb-3"
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.4 }}
            >
              ✦ Milestones
            </motion.p>
            <motion.h2
              className="font-display text-display-xl text-paper"
              initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1] }}
            >
              Achievements
            </motion.h2>
          </div>
        </div>

        {/* ── Timeline ──────────────────────────────────────────── */}
        <div ref={trackRef} className="relative">

          {/* Scrolling progress line */}
          <div className="absolute left-6 md:left-[3.5rem] top-0 bottom-0 w-[2px] bg-white/10" aria-hidden>
            <motion.div
              className="absolute top-0 left-0 w-full bg-orange origin-top"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="flex flex-col gap-0">
            {ITEMS.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.15, duration: 0.6, ease: [0.77, 0, 0.175, 1] }}
                  className="relative flex gap-8 md:gap-16 pl-16 md:pl-28 pb-16 last:pb-0 group"
                >
                  {/* Pulse node */}
                  <div className="absolute left-4 md:left-[2.65rem] top-1 w-5 h-5 border-2 border-orange bg-charcoal rounded-full flex items-center justify-center z-10">
                    <div className="w-2 h-2 rounded-full bg-orange" />
                    {/* Ping ring */}
                    <span className="absolute w-5 h-5 rounded-full border-2 border-orange animate-ping opacity-40" aria-hidden />
                  </div>

                  {/* Card */}
                  <div className="flex-1 border-2 border-white/10 bg-white/[0.03] p-6 group-hover:border-orange/40 group-hover:bg-white/[0.06] transition-all duration-300">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-9 h-9 border-2 border-white/20 flex items-center justify-center shrink-0"
                          style={{ background: item.badgeColor }}
                        >
                          <Icon size={16} color="#F3F1EA" />
                        </div>
                        <span
                          className="font-mono text-[0.65rem] uppercase tracking-widest px-2 py-0.5 border"
                          style={{ color: item.badgeColor, borderColor: item.badgeColor, background: `${item.badgeColor}18` }}
                        >
                          {item.badge}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-white/30">{item.year}</span>
                        <span className="font-display text-5xl text-white/[0.06] leading-none select-none">{item.index}</span>
                      </div>
                    </div>

                    <h3 className="font-display text-xl md:text-2xl text-paper mb-1">{item.title}</h3>
                    <p className="font-mono text-[0.65rem] uppercase tracking-widest text-white/30 mb-3">{item.meta}</p>
                    <p className="font-sans text-sm text-white/50 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
