"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Dumbbell, Waves, Swords, Music4, Heart } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const ACTIVITIES = [
  {
    icon: Dumbbell,
    title: "Gym & Fitness",
    role: "Physical Discipline",
    desc: "Dedicated to strength training and maintaining peak physical fitness — because a disciplined body builds a disciplined mind.",
    accent: "#FF4800",
    tag: "DAILY",
  },
  {
    icon: Waves,
    title: "Swimming",
    role: "Aquatic Sport",
    desc: "Active swimmer focusing on endurance, breathing technique, and the mental clarity that comes from long sessions in open water.",
    accent: "#2563EB",
    tag: "WEEKLY",
  },
  {
    icon: Swords,
    title: "Boxing",
    role: "Combat Sport",
    desc: "Practising boxing for explosive speed, sharp tactical instincts, and disciplined stress management through controlled aggression.",
    accent: "#18181B",
    tag: "TRAINING",
  },
  {
    icon: Music4,
    title: "Flutist",
    role: "Musical Artist",
    desc: "Passionate flute player exploring classical notes — music sharpens creative thinking and emotional intelligence.",
    accent: "#FF4800",
    tag: "CREATIVE",
  },
  {
    icon: Heart,
    title: "NGO Volunteering",
    role: "Community Service",
    desc: "Volunteering at non-profit organisations to support educational and social welfare initiatives. Giving back is non-negotiable.",
    accent: "#2563EB",
    tag: "IMPACT",
  },
];

export default function Extracurriculars() {
  const { ref: sectionRef, inView } = useInView<HTMLElement>({ threshold: 0.08 });
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      id="extracurriculars"
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
              ✦ Beyond Academics
            </motion.p>
            <motion.h2
              className="font-display text-display-xl text-paper"
              initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1] }}
            >
              Life
            </motion.h2>
          </div>
          <motion.p
            className="font-sans text-sm text-white/40 max-w-xs"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}
          >
            Disciplines, sport, music, and social impact — the full stack of a human.
          </motion.p>
        </div>

        {/* ── Activity grid — staggered with offset effect ──────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-0 border-2 border-white/10">
          {ACTIVITIES.map((act, i) => {
            const Icon = act.icon;
            const isHovered = hovered === i;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.55, ease: [0.77, 0, 0.175, 1] }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className="group border-b-2 lg:border-b-0 lg:border-r-2 border-white/10 last:border-0 p-6 cursor-default overflow-hidden relative"
                style={{
                  background: isHovered ? act.accent : "transparent",
                  transition: "background 0.25s ease",
                }}
              >
                {/* Top index */}
                <div className="flex items-center justify-between mb-8">
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-white/30 group-hover:text-paper/60 transition-colors">
                    {act.tag}
                  </span>
                  <span className="font-display text-4xl text-white/[0.05] leading-none select-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Icon */}
                <div
                  className="w-12 h-12 border-2 border-white/20 group-hover:border-paper flex items-center justify-center mb-5 transition-colors"
                  style={isHovered ? { background: "rgba(255,255,255,0.2)", borderColor: "rgba(255,255,255,0.6)" } : {}}
                >
                  <Icon size={20} color={isHovered ? "#F3F1EA" : "#A1A1AA"} />
                </div>

                <h3 className="font-display text-lg text-paper mb-0.5">{act.title}</h3>
                <p className="font-mono text-[0.6rem] uppercase tracking-widest text-white/30 group-hover:text-paper/50 mb-3 transition-colors">
                  {act.role}
                </p>

                {/* Description slides up on hover */}
                <motion.p
                  className="font-sans text-xs leading-relaxed text-white/40 group-hover:text-paper/70 transition-colors"
                  animate={{ opacity: isHovered ? 1 : 0.5, y: isHovered ? 0 : 4 }}
                  transition={{ duration: 0.25 }}
                >
                  {act.desc}
                </motion.p>

                {/* Bottom accent bar */}
                <motion.div
                  className="absolute bottom-0 left-0 h-[3px] bg-paper"
                  animate={{ width: isHovered ? "100%" : "0%" }}
                  transition={{ duration: 0.35, ease: [0.77, 0, 0.175, 1] }}
                  aria-hidden
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
