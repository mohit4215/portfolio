"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Coins, Puzzle, BarChart2, X } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const CASES = [
  {
    id: 0,
    tag: "FinTech Strategy",
    title: "Xelaration",
    org: "by Money Mantra",
    desc: "Strategic case study on fintech innovation and market disruption — analysing how emerging financial platforms challenge incumbents through product-led growth.",
    icon: Coins,
    accent: "#2563EB",
    year: "2025",
  },
  {
    id: 1,
    tag: "Blockchain Business",
    title: "Case-O-Crypt 6.0",
    org: "Crypto & Blockchain Track",
    desc: "Analytical deep-dive into crypto business models, on-chain market positioning, and sustainable tokenomics for long-term growth strategy.",
    icon: Puzzle,
    accent: "#FF4800",
    year: "2025",
  },
  {
    id: 2,
    tag: "Market Strategy",
    title: "RIFT-20 hypLW",
    org: "Consulting Competition",
    desc: "Market dynamics analysis with competitive benchmarking and go-to-market strategy recommendations for a high-growth sector.",
    icon: BarChart2,
    accent: "#18181B",
    year: "2024",
  },
];

/* ── Fan-out deck ───────────────────────────────────────────────── */
const DECK_OFFSETS = [
  { rotate: -6, x: -20, y: 8,  z: 0 },
  { rotate:  2, x:  10, y: 4,  z: 1 },
  { rotate:  0, x:   0, y: 0,  z: 2 },
];

export default function CaseStudies() {
  const { ref: sectionRef, inView } = useInView<HTMLElement>({ threshold: 0.1 });
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [deckHovered, setDeckHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const skewX = useTransform(scrollYProgress, [0, 1], [-2, 2]);

  return (
    <section
      id="case-studies"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="section-pad bg-paper border-b-2 border-charcoal"
    >
      <div ref={containerRef} className="max-w-7xl mx-auto px-6 md:px-12">

        {/* ── Header ────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b-2 border-charcoal pb-8">
          <div>
            <motion.p
              className="font-mono text-xs uppercase tracking-[0.18em] text-cobalt mb-3"
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.4 }}
            >
              ✦ Strategy Consulting
            </motion.p>
            <motion.h2
              className="font-display text-display-xl text-charcoal"
              initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1] }}
            >
              Case Studies
            </motion.h2>
          </div>
          <motion.p
            className="font-sans text-sm text-muted max-w-xs"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.3, duration: 0.5 }}
          >
            Real-world strategy problems across fintech, crypto, and market intelligence.
          </motion.p>
        </div>

        {/* ── Layout: deck + list ────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: interactive card deck */}
          <div
            className="relative h-[420px] flex items-center justify-center"
            onMouseEnter={() => setDeckHovered(true)}
            onMouseLeave={() => setDeckHovered(false)}
          >
            {CASES.map((c, i) => {
              const off = DECK_OFFSETS[i];
              const Icon = c.icon;
              return (
                <motion.div
                  key={c.id}
                  className="absolute w-72 md:w-80 cursor-pointer"
                  style={{ zIndex: off.z }}
                  initial={{ rotate: off.rotate, x: off.x, y: off.y }}
                  animate={
                    deckHovered
                      ? { rotate: off.rotate * 1.6, x: off.x * 2.2, y: -i * 60, scale: 1 + i * 0.02 }
                      : { rotate: off.rotate, x: off.x, y: off.y }
                  }
                  whileHover={{ scale: 1.04, zIndex: 10 }}
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                  onClick={() => setActiveCard(c.id)}
                >
                  <div
                    className="border-2 border-charcoal bg-paper shadow-brutal-lg p-6 h-52 flex flex-col justify-between"
                    style={{ boxShadow: `6px 6px 0px ${c.accent}` }}
                  >
                    <div className="flex items-start justify-between">
                      <div
                        className="w-10 h-10 border-2 border-charcoal flex items-center justify-center"
                        style={{ background: c.accent }}
                      >
                        <Icon size={18} color="#F3F1EA" />
                      </div>
                      <span className="font-mono text-xs text-muted uppercase tracking-widest">
                        {c.year}
                      </span>
                    </div>
                    <div>
                      <p className="font-mono text-[0.65rem] uppercase tracking-widest text-muted mb-1">{c.tag}</p>
                      <h3 className="font-display text-xl text-charcoal">{c.title}</h3>
                      <p className="font-sans text-xs text-muted">{c.org}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right: list */}
          <motion.div style={{ skewX }} className="flex flex-col gap-0">
            {CASES.map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.button
                  key={c.id}
                  initial={{ opacity: 0, x: 40 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.15 + i * 0.12, duration: 0.55, ease: [0.77, 0, 0.175, 1] }}
                  onClick={() => setActiveCard(c.id)}
                  className="group flex items-center gap-5 border-b-2 border-charcoal py-6 text-left hover:bg-charcoal transition-colors duration-200 px-4 -mx-4"
                >
                  <div
                    className="w-10 h-10 border-2 border-charcoal flex items-center justify-center shrink-0 group-hover:border-paper transition-colors"
                    style={{ background: c.accent }}
                  >
                    <Icon size={16} color="#F3F1EA" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-[0.65rem] uppercase tracking-widest text-muted group-hover:text-faint mb-0.5">{c.tag}</p>
                    <h3 className="font-display text-xl text-charcoal group-hover:text-paper truncate">{c.title}</h3>
                    <p className="font-sans text-xs text-muted group-hover:text-faint">{c.org}</p>
                  </div>
                  <ArrowUpRight
                    size={20}
                    className="text-muted group-hover:text-paper shrink-0 transition-all group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* ── Case detail modal ──────────────────────────────────── */}
      <AnimatePresence>
        {activeCard !== null && (
          <>
            <motion.div
              className="fixed inset-0 bg-charcoal/70 z-50 backdrop-blur-sm"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setActiveCard(null)}
            />
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-6 pointer-events-none"
            >
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 40, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 340, damping: 28 }}
                className="pointer-events-auto bg-paper border-2 border-charcoal shadow-brutal-lg max-w-lg w-full p-8 relative"
              >
                <button
                  onClick={() => setActiveCard(null)}
                  className="absolute top-4 right-4 w-8 h-8 border-2 border-charcoal flex items-center justify-center hover:bg-charcoal hover:text-paper transition-colors"
                  aria-label="Close"
                >
                  <X size={14} />
                </button>
                {(() => {
                  const c = CASES[activeCard];
                  const Icon = c.icon;
                  return (
                    <>
                      <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 border-2 border-charcoal flex items-center justify-center" style={{ background: c.accent }}>
                          <Icon size={18} color="#F3F1EA" />
                        </div>
                        <div>
                          <p className="font-mono text-[0.65rem] uppercase tracking-widest text-muted">{c.tag} · {c.year}</p>
                          <h3 className="font-display text-2xl text-charcoal leading-tight">{c.title}</h3>
                        </div>
                      </div>
                      <p className="font-sans text-sm text-muted leading-relaxed mb-6">{c.desc}</p>
                      <div className="border-2 border-dashed border-charcoal p-5 text-center">
                        <p className="font-mono text-xs text-muted uppercase tracking-widest">
                          Drop PDF into <code className="bg-rule px-1">assets/case-studies/</code> to activate
                        </p>
                      </div>
                    </>
                  );
                })()}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
