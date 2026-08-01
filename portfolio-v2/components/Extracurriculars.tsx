"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";

const ACTIVITIES = [
  { emoji: "🏋️", title: "Gym & Fitness",    role: "Physical Discipline", tag: "DAILY",   bg: "bg-sky",      desc: "Dedicated to strength training and maintaining peak physical fitness — because a disciplined body builds a disciplined mind." },
  { emoji: "🏊", title: "Swimming",          role: "Aquatic Sport",       tag: "WEEKLY",  bg: "bg-mint",     desc: "Active swimmer focusing on endurance, breathing technique, and the mental clarity that comes from long sessions in the water." },
  { emoji: "🥊", title: "Boxing",            role: "Combat Sport",        tag: "TRAINING",bg: "bg-sakura",   desc: "Practising boxing for explosive speed, sharp tactical instincts, and disciplined stress management through controlled aggression." },
  { emoji: "🎵", title: "Flutist",           role: "Musical Artist",      tag: "CREATIVE",bg: "bg-lavender", desc: "Passionate flute player exploring classical notes — music sharpens creative thinking and emotional intelligence." },
  { emoji: "❤️", title: "NGO Volunteering", role: "Community Service",   tag: "IMPACT",  bg: "bg-warm",     desc: "Volunteering at NGOs to support educational and social welfare. Giving back is non-negotiable." },
];

export default function Extracurriculars() {
  const { ref: sectionRef, inView } = useInView<HTMLElement>({ threshold: 0.08 });
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      id="extracurriculars"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="section-pad"
      style={{ background: "linear-gradient(180deg, #1A1A2E 0%, #16213E 100%)" }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">

        {/* ── Header ── */}
        <div className="text-center mb-14">
          <motion.div initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}} transition={{ type: "spring", stiffness: 400, damping: 18 }} className="inline-block mb-4 text-4xl">⚡</motion.div>
          <motion.h2 className="font-display text-5xl md:text-6xl text-cream" style={{ fontFamily: "Bangers, cursive", letterSpacing: "0.08em", textShadow: "0 0 30px rgba(255,229,102,0.4)" }} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
            BEYOND ACADEMICS
          </motion.h2>
          <motion.p className="font-sans text-sm text-white/40 mt-2 uppercase tracking-widest" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}>
            ✦ The Full Stack of a Human ✦
          </motion.p>
        </div>

        {/* ── Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {ACTIVITIES.map((act, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, rotate: i % 2 === 0 ? -5 : 5 }}
              animate={inView ? { opacity: 1, y: 0, rotate: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.1, type: "spring", stiffness: 300, damping: 22 }}
              whileHover={{ y: -10, rotate: i % 2 === 0 ? -3 : 3, scale: 1.04 }}
              onHoverStart={() => setHovered(i)}
              onHoverEnd={() => setHovered(null)}
              className={`manga-panel ${act.bg} p-5 flex flex-col gap-3 cursor-default`}
            >
              {/* Tag */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-[0.6rem] uppercase tracking-widest text-inkBlack/40 font-bold">{act.tag}</span>
                <span className="font-display text-3xl text-inkBlack/8 leading-none select-none" style={{ fontFamily: "Bangers, cursive" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Emoji */}
              <motion.div
                className="text-5xl"
                animate={hovered === i ? { scale: [1, 1.3, 0.9, 1.2, 1], rotate: [0, 15, -10, 8, 0] } : {}}
                transition={{ duration: 0.5 }}
              >
                {act.emoji}
              </motion.div>

              <h3 className="font-sans text-base font-extrabold text-inkBlack">{act.title}</h3>
              <span className="inline-block self-start px-2 py-0.5 rounded-full border-2 border-inkBlack bg-inkBlack text-cream font-mono text-[0.6rem] font-bold uppercase">
                {act.role}
              </span>
              <p className="font-sans text-xs text-inkDark/70 leading-relaxed">{act.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
