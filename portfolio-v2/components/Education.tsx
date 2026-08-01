"use client";

import { motion } from "framer-motion";
import { GraduationCap, School, Medal } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const EDU = [
  {
    icon: GraduationCap,
    status: "Current",
    statusColor: "#2563EB",
    degree: "B.Tech — Information Technology",
    institution: "AKGEC, Ghaziabad · AKTU University",
    score: 8.48,
    scoreMax: 10,
    scoreLabel: "1st Year CGPA",
    accent: "#2563EB",
    side: "left",
    note: "Pursuing",
  },
  {
    icon: School,
    status: "Completed",
    statusColor: "#71717A",
    degree: "Class 12th — CBSE Board",
    institution: "Senior Secondary Education",
    score: null,
    scoreMax: null,
    scoreLabel: null,
    accent: "#FF4800",
    side: "right",
    note: "2023–24",
  },
  {
    icon: Medal,
    status: "Top Scorer",
    statusColor: "#FF4800",
    degree: "Class 10th — ICSE Board",
    institution: "Secondary Education",
    score: 95,
    scoreMax: 100,
    scoreLabel: "Board Score",
    accent: "#FF4800",
    side: "left",
    note: "2021–22",
  },
];

function ScoreRing({ score, max, label, color }: { score: number; max: number; label: string; color: string }) {
  const pct = (score / max) * 100;
  const r = 42;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative w-24 h-24">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={r} fill="none" stroke="#E4E2D9" strokeWidth="5" />
          <motion.circle
            cx="50" cy="50" r={r}
            fill="none"
            stroke={color}
            strokeWidth="5"
            strokeLinecap="square"
            strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            whileInView={{ strokeDashoffset: circ - dash }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.77, 0, 0.175, 1], delay: 0.3 }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-xl text-charcoal">{score}{max === 100 ? "%" : ""}</span>
        </div>
      </div>
      <span className="font-mono text-[0.6rem] uppercase tracking-widest text-muted">{label}</span>
    </div>
  );
}

export default function Education() {
  const { ref: sectionRef, inView } = useInView<HTMLElement>({ threshold: 0.1 });

  return (
    <section
      id="education"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="section-pad bg-paper border-b-2 border-charcoal"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* ── Header ────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b-2 border-charcoal pb-8">
          <div>
            <motion.p
              className="font-mono text-xs uppercase tracking-[0.18em] text-cobalt mb-3"
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.4 }}
            >
              ✦ Academic Journey
            </motion.p>
            <motion.h2
              className="font-display text-display-xl text-charcoal"
              initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1] }}
            >
              Education
            </motion.h2>
          </div>

          {/* editorial index */}
          <motion.span
            className="font-display text-[8rem] leading-none text-charcoal/[0.04] select-none hidden md:block"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.4, duration: 0.6 }}
          >
            EDU
          </motion.span>
        </div>

        {/* ── Asymmetric grid ───────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-2 border-charcoal">
          {EDU.map((edu, i) => {
            const Icon = edu.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.15, duration: 0.6, ease: [0.77, 0, 0.175, 1] }}
                className={`group p-8 border-b-2 md:border-b-0 md:border-r-2 border-charcoal last:border-r-0 last:border-b-0 hover:bg-charcoal transition-colors duration-300 cursor-default ${
                  i === 0 ? "md:col-span-1" : ""
                }`}
              >
                {/* Top row */}
                <div className="flex items-start justify-between mb-6">
                  <div
                    className="w-10 h-10 border-2 border-charcoal flex items-center justify-center group-hover:border-paper transition-colors"
                    style={{ background: edu.accent }}
                  >
                    <Icon size={18} color="#F3F1EA" />
                  </div>
                  <span
                    className="font-mono text-[0.6rem] uppercase tracking-widest px-2 py-0.5 border"
                    style={{
                      color: edu.statusColor,
                      borderColor: edu.statusColor,
                      background: `${edu.statusColor}14`,
                    }}
                  >
                    {edu.status}
                  </span>
                </div>

                {/* Degree */}
                <h3 className="font-display text-xl text-charcoal group-hover:text-paper mb-1 transition-colors">
                  {edu.degree}
                </h3>
                <p className="font-sans text-xs text-muted group-hover:text-faint mb-2 transition-colors">
                  {edu.institution}
                </p>
                <p className="font-mono text-[0.6rem] uppercase tracking-widest text-muted group-hover:text-faint/60 mb-6 transition-colors">
                  {edu.note}
                </p>

                {/* Score ring */}
                {edu.score !== null && (
                  <ScoreRing
                    score={edu.score}
                    max={edu.scoreMax!}
                    label={edu.scoreLabel!}
                    color={edu.accent}
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
