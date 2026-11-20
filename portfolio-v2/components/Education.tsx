"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";

const EDU = [
  {
    emoji: "🏫", status: "Current", statusBg: "bg-mint",
    degree: "B.Tech — Information Technology",
    institution: "AKGEC, Ghaziabad · AKTU University",
    score: 8.48, scoreMax: 10, scoreLabel: "1st Year CGPA",
    bg: "bg-sky", note: "Pursuing", color: "#2563EB",
  },
  {
    emoji: "📚", status: "Completed", statusBg: "bg-lavender",
    degree: "Class 12th — CBSE Board",
    institution: "Senior Secondary Education",
    score: null, scoreMax: null, scoreLabel: null,
    bg: "bg-sakura", note: "2023–24", color: "#FF4D2E",
  },
  {
    emoji: "🏅", status: "Top Scorer", statusBg: "bg-sunYellow",
    degree: "Class 10th — ICSE Board",
    institution: "Secondary Education",
    score: 95, scoreMax: 100, scoreLabel: "Board Score",
    bg: "bg-warm", note: "2021–22", color: "#FFB800",
  },
];

function ScoreRing({ score, max, label, color }: { score: number; max: number; label: string; color: string }) {
  const pct = score / max;
  const r = 38, circ = 2 * Math.PI * r, dash = pct * circ;
  return (
    <div className="flex flex-col items-center gap-1 mt-4">
      <div className="relative w-24 h-24">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(26,26,46,0.1)" strokeWidth="6" />
          <motion.circle cx="50" cy="50" r={r} fill="none" stroke={color} strokeWidth="6"
            strokeLinecap="round" strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            whileInView={{ strokeDashoffset: circ - dash }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.77, 0, 0.175, 1], delay: 0.4 }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-2xl text-inkBlack" style={{ fontFamily: "Bangers, cursive" }}>
            {score}{max === 100 ? "%" : ""}
          </span>
        </div>
      </div>
      <span className="font-sans text-xs font-bold text-inkDark/50 uppercase tracking-wider">{label}</span>
    </div>
  );
}

export default function Education() {
  const { ref: sectionRef, inView } = useInView<HTMLElement>({ threshold: 0.1 });

  return (
    <section
      id="education"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="section-pad"
      style={{ background: "linear-gradient(135deg, #FFFDF5 0%, #FFF3D4 100%)" }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">

        {/* ── Header ── */}
        <div className="text-center mb-14">
          <motion.div initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}} transition={{ type: "spring", stiffness: 400, damping: 18 }} className="inline-block mb-4 text-4xl">🎓</motion.div>
          <motion.h2 className="font-display text-5xl md:text-6xl text-inkBlack" style={{ fontFamily: "Bangers, cursive", letterSpacing: "0.08em" }} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
            EDUCATION
          </motion.h2>
          <motion.div className="inline-block mt-2 px-4 py-1 rounded-full border-3 border-inkBlack bg-sunYellow font-sans text-xs font-bold uppercase tracking-widest" style={{ boxShadow: "3px 3px 0px #1A1A2E" }} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}>
            🎒 Academic Journey
          </motion.div>
        </div>

        {/* ── Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {EDU.map((edu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50, rotate: i % 2 === 0 ? -4 : 4 }}
              animate={inView ? { opacity: 1, y: 0, rotate: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.12, type: "spring", stiffness: 300, damping: 22 }}
              whileHover={{ y: -8, rotate: i % 2 === 0 ? -2 : 2 }}
              className={`manga-panel ${edu.bg} p-6 flex flex-col items-center text-center`}
            >
              {/* Emoji icon */}
              <motion.div
                className="text-5xl mb-4"
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut" }}
              >
                {edu.emoji}
              </motion.div>

              {/* Status badge */}
              <span className={`inline-block px-3 py-1 rounded-full border-2 border-inkBlack ${edu.statusBg} font-sans text-xs font-bold mb-4`}>
                {edu.status}
              </span>

              <h3 className="font-sans text-base font-extrabold text-inkBlack mb-1 leading-tight">{edu.degree}</h3>
              <p className="font-sans text-xs text-inkDark/60 mb-1">{edu.institution}</p>
              <p className="font-mono text-xs text-inkDark/40 mb-4">{edu.note}</p>

              {edu.score !== null && (
                <ScoreRing score={edu.score} max={edu.scoreMax!} label={edu.scoreLabel!} color={edu.color} />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
