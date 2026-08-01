"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "@/hooks/useInView";

const CASES = [
  {
    id: 0,
    tag: "FinTech Strategy",
    title: "Xelaration",
    org: "by Money Mantra",
    desc: "Strategic case study on fintech innovation and market disruption — analysing how emerging financial platforms challenge incumbents through product-led growth.",
    emoji: "💰",
    bg: "bg-sky",
    accent: "#D6EEFF",
    shadow: "manga-gold",
    year: "2025",
  },
  {
    id: 1,
    tag: "Blockchain Business",
    title: "Case-O-Crypt 6.0",
    org: "Crypto & Blockchain Track",
    desc: "Analytical deep-dive into crypto business models, on-chain market positioning, and sustainable tokenomics for long-term growth strategy.",
    emoji: "🔗",
    bg: "bg-lavender",
    accent: "#EDD6FF",
    shadow: "manga",
    year: "2025",
  },
  {
    id: 2,
    tag: "Market Strategy",
    title: "RIFT-20 hypLW",
    org: "Consulting Competition",
    desc: "Market dynamics analysis with competitive benchmarking and go-to-market strategy recommendations for a high-growth sector.",
    emoji: "📈",
    bg: "bg-sakura",
    accent: "#FFD6E0",
    shadow: "manga-fire",
    year: "2024",
  },
];

export default function CaseStudies() {
  const { ref: sectionRef, inView } = useInView<HTMLElement>({ threshold: 0.1 });
  const [active, setActive] = useState<number | null>(null);
  const [flipped, setFlipped] = useState<number | null>(null);

  return (
    <section
      id="case-studies"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="section-pad"
      style={{ background: "linear-gradient(180deg, #FFF8E7 0%, #FFFDF5 100%)" }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">

        {/* ── Header ── */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={inView ? { scale: 1, rotate: 0 } : {}}
            transition={{ type: "spring", stiffness: 400, damping: 18 }}
            className="inline-block mb-4 text-4xl"
          >🗂️</motion.div>
          <motion.h2
            className="font-display text-5xl md:text-6xl text-inkBlack mb-2"
            style={{ fontFamily: "Bangers, cursive", letterSpacing: "0.08em" }}
            initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            CASE STUDIES
          </motion.h2>
          <motion.div
            className="inline-block px-4 py-1 rounded-full border-3 border-inkBlack bg-sunYellow font-sans text-xs font-bold uppercase tracking-widest"
            style={{ boxShadow: "3px 3px 0px #1A1A2E" }}
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}
          >
            📊 Strategy Consulting
          </motion.div>
        </div>

        {/* ── Manga panel grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CASES.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 50, rotate: i % 2 === 0 ? -3 : 3 }}
              animate={inView ? { opacity: 1, y: 0, rotate: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.12, type: "spring", stiffness: 300, damping: 22 }}
              whileHover={{ y: -8, rotate: i % 2 === 0 ? -2 : 2, scale: 1.02 }}
              onClick={() => setActive(c.id)}
              className={`manga-panel cursor-pointer ${c.bg} p-6 flex flex-col gap-4`}
            >
              {/* Panel number */}
              <div className="flex items-center justify-between">
                <span
                  className="font-display text-5xl text-inkBlack/10 leading-none select-none"
                  style={{ fontFamily: "Bangers, cursive" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-4xl">{c.emoji}</span>
              </div>

              {/* Tag */}
              <div className="inline-block self-start px-3 py-1 rounded-full border-2 border-inkBlack bg-white text-inkBlack font-sans text-xs font-bold">
                {c.tag}
              </div>

              {/* Title */}
              <h3
                className="font-display text-3xl text-inkBlack leading-tight"
                style={{ fontFamily: "Bangers, cursive", letterSpacing: "0.06em" }}
              >
                {c.title}
              </h3>
              <p className="font-sans text-xs font-semibold text-inkDark/60">{c.org} · {c.year}</p>
              <p className="font-sans text-sm text-inkDark/70 leading-relaxed flex-1">{c.desc}</p>

              {/* Action */}
              <div className="flex items-center justify-between border-t-2 border-inkBlack/10 pt-3">
                <span className="font-sans text-xs font-bold text-inkBlack/50 uppercase tracking-widest">View Study</span>
                <motion.span
                  className="text-xl"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                >→</motion.span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Modal ── */}
      <AnimatePresence>
        {active !== null && (() => {
          const c = CASES[active];
          return (
            <>
              <motion.div className="fixed inset-0 bg-inkBlack/60 z-50 backdrop-blur-sm"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setActive(null)} />
              <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-6 pointer-events-none">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className={`pointer-events-auto manga-panel ${c.bg} max-w-md w-full p-8`}
                >
                  <button onClick={() => setActive(null)} className="absolute top-4 right-4 text-2xl hover:animate-wiggle">✕</button>
                  <div className="text-5xl mb-4">{c.emoji}</div>
                  <div className="inline-block px-3 py-1 rounded-full border-2 border-inkBlack bg-white text-xs font-bold font-sans mb-3">{c.tag} · {c.year}</div>
                  <h3 className="font-display text-4xl text-inkBlack mb-1" style={{ fontFamily: "Bangers, cursive", letterSpacing: "0.08em" }}>{c.title}</h3>
                  <p className="font-sans text-xs font-semibold text-inkDark/60 mb-4">{c.org}</p>
                  <p className="font-sans text-sm text-inkDark leading-relaxed mb-6">{c.desc}</p>
                  <div className="border-3 border-dashed border-inkBlack/30 rounded-xl p-4 text-center bg-white/50">
                    <span className="text-2xl">📄</span>
                    <p className="font-sans text-xs font-bold text-inkDark/50 mt-1 uppercase tracking-widest">
                      Drop PDF into assets/case-studies/
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </>
          );
        })()}
      </AnimatePresence>
    </section>
  );
}
