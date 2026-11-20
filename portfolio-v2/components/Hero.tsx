"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const ROLES = ["Strategy Consulting", "Financial Modeling", "M&A Blueprints", "AI & ML", "Entrepreneurship"];

const FLOATING_ELEMENTS = [
  { emoji: "⚔️",  top: "12%", left: "8%",  delay: 0,    duration: 4   },
  { emoji: "🔥",  top: "20%", right: "6%", delay: 0.5,  duration: 3.5 },
  { emoji: "💎",  top: "70%", left: "5%",  delay: 1,    duration: 5   },
  { emoji: "🌟",  top: "60%", right: "8%", delay: 0.8,  duration: 4.5 },
  { emoji: "📊",  top: "80%", left: "12%", delay: 1.5,  duration: 3.8 },
  { emoji: "🎯",  top: "15%", left: "85%", delay: 0.3,  duration: 4.2 },
  { emoji: "🏆",  top: "75%", right: "5%", delay: 1.2,  duration: 4   },
  { emoji: "✨",  top: "45%", left: "3%",  delay: 0.6,  duration: 3.2 },
];

function Counter({ to, decimals = 0 }: { to: number; decimals?: number }) {
  const [val, setVal] = useState(0);
  const ref     = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - t0) / 1400, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          setVal(parseFloat((ease * to).toFixed(decimals)));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to, decimals]);
  return <span ref={ref}>{val.toFixed(decimals)}</span>;
}

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setRoleIdx(i => (i + 1) % ROLES.length), 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #FFFDF5 0%, #FFF8E7 40%, #FFF3D4 70%, #FFEDD0 100%)" }}
    >
      {/* ── Halftone bg ── */}
      <div className="absolute inset-0 halftone pointer-events-none" />

      {/* ── Decorative circles ── */}
      <div className="absolute top-20 right-0 w-96 h-96 rounded-full opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle, #FFE566, transparent 70%)" }} />
      <div className="absolute bottom-20 left-0 w-64 h-64 rounded-full opacity-15 pointer-events-none"
        style={{ background: "radial-gradient(circle, #FFD6E0, transparent 70%)" }} />

      {/* ── Floating emojis ── */}
      {FLOATING_ELEMENTS.map((el, i) => (
        <motion.div
          key={i}
          className="absolute text-3xl select-none pointer-events-none hidden md:block"
          style={{ top: el.top, left: (el as { left?: string }).left, right: (el as { right?: string }).right }}
          animate={{ y: [-8, 8, -8], rotate: [-5, 5, -5] }}
          transition={{ duration: el.duration, delay: el.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          {el.emoji}
        </motion.div>
      ))}

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 pt-28 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* ── Left: text ── */}
          <div>
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 400, damping: 20 }}
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border-3 border-inkBlack bg-mint"
              style={{ boxShadow: "3px 3px 0px #1A1A2E" }}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
              </span>
              <span className="font-sans text-xs font-bold text-inkBlack uppercase tracking-wider">
                Open to Opportunities ✨
              </span>
            </motion.div>

            {/* Name */}
            <div className="overflow-hidden mb-2">
              <motion.h1
                className="font-display text-[clamp(3.5rem,9vw,7rem)] leading-none text-inkBlack"
                style={{ fontFamily: "Bangers, cursive", letterSpacing: "0.06em" }}
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.25, duration: 0.7, ease: [0.77, 0, 0.175, 1] }}
              >
                MOHIT
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-4">
              <motion.h1
                className="font-display text-[clamp(3.5rem,9vw,7rem)] leading-none"
                style={{ fontFamily: "Bangers, cursive", letterSpacing: "0.06em",
                  WebkitTextStroke: "3px #1A1A2E",
                  color: "transparent",
                  textShadow: "4px 4px 0px #FFB800",
                }}
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.4, duration: 0.7, ease: [0.77, 0, 0.175, 1] }}
              >
                AGARWAL
              </motion.h1>
            </div>

            {/* Subtitle + role ticker */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="flex flex-wrap items-center gap-3 mb-6"
            >
              <div
                className="px-3 py-1.5 rounded-xl border-3 border-inkBlack bg-sky"
                style={{ boxShadow: "3px 3px 0px #1A1A2E" }}
              >
                <span className="font-sans text-sm font-bold text-inkBlack">🎓 B.Tech IT · AKGEC</span>
              </div>
              <div
                className="px-3 py-1.5 rounded-xl border-3 border-inkBlack bg-sakura"
                style={{ boxShadow: "3px 3px 0px #1A1A2E" }}
              >
                <span className="font-sans text-sm font-bold text-inkBlack">📍 Ghaziabad, IN</span>
              </div>
              <div
                className="px-3 py-1.5 rounded-xl border-3 border-inkBlack bg-sunYellow overflow-hidden"
                style={{ boxShadow: "3px 3px 0px #1A1A2E" }}
              >
                <motion.span
                  key={roleIdx}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  className="font-sans text-sm font-bold text-inkBlack block"
                >
                  ⚡ {ROLES[roleIdx]}
                </motion.span>
              </div>
            </motion.div>

            {/* Tagline speech bubble */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, type: "spring", stiffness: 300, damping: 20 }}
              className="speech-bubble px-5 py-4 mb-8 max-w-sm"
            >
              <p className="font-sans text-sm font-semibold text-inkDark leading-relaxed">
                Always eager to learn. Loves the blend of <strong>business</strong> &amp; <strong>tech</strong>.
                A future <span className="text-fireRed font-extrabold">entrepreneur</span> 🚀
              </p>
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.5 }}
            >
              <motion.a
                href="#case-studies"
                onClick={e => { e.preventDefault(); document.querySelector("#case-studies")?.scrollIntoView({ behavior: "smooth" }); }}
                whileHover={{ scale: 1.06, y: -3 }}
                whileTap={{ scale: 0.94 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl border-3 border-inkBlack bg-inkBlack text-cream font-sans font-bold text-sm"
                style={{ boxShadow: "5px 5px 0px #FF4D2E", fontFamily: "Nunito, sans-serif" }}
              >
                📊 View Case Studies
              </motion.a>
              <motion.a
                href="#contact"
                onClick={e => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
                whileHover={{ scale: 1.06, y: -3 }}
                whileTap={{ scale: 0.94 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl border-3 border-inkBlack bg-sunYellow text-inkBlack font-sans font-bold text-sm"
                style={{ boxShadow: "5px 5px 0px #1A1A2E", fontFamily: "Nunito, sans-serif" }}
              >
                💌 Get In Touch
              </motion.a>
            </motion.div>
          </div>

          {/* ── Right: Stats card stack ── */}
          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.7, ease: [0.34, 1.2, 0.64, 1] }}
          >
            {/* Age badge floating */}
            <motion.div
              className="self-end mb-2"
              animate={{ rotate: [-3, 3, -3], y: [-4, 4, -4] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <div
                className="px-4 py-2 rounded-2xl border-3 border-inkBlack bg-lavender text-inkBlack font-display text-lg"
                style={{ fontFamily: "Bangers, cursive", letterSpacing: "0.1em", boxShadow: "4px 4px 0px #1A1A2E" }}
              >
                AGE 18 ⚡ ENTREPRENEUR
              </div>
            </motion.div>

            {/* Stats cards */}
            {[
              { label: "1st Year CGPA (AKTU)", value: 8.48, dec: 2, suffix: "", color: "bg-sky",     emoji: "🎓" },
              { label: "Class 10th ICSE",       value: 95,   dec: 0, suffix: "%", color: "bg-mint",    emoji: "⭐" },
              { label: "Competitions Entered",  value: 10,   dec: 0, suffix: "+", color: "bg-sakura",  emoji: "🏆" },
            ].map((s, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.04, rotate: i % 2 === 0 ? 1 : -1 }}
                className={`flex items-center justify-between px-5 py-4 rounded-2xl border-3 border-inkBlack ${s.color}`}
                style={{ boxShadow: "5px 5px 0px #1A1A2E" }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{s.emoji}</span>
                  <span className="font-sans text-sm font-bold text-inkDark">{s.label}</span>
                </div>
                <span
                  className="font-display text-3xl text-inkBlack"
                  style={{ fontFamily: "Bangers, cursive", letterSpacing: "0.05em" }}
                >
                  <Counter to={s.value} decimals={s.dec} />{s.suffix}
                </span>
              </motion.div>
            ))}

            {/* Chibi dragon doodle */}
            <motion.div
              className="self-center text-5xl"
              animate={{ y: [-6, 6, -6], rotate: [-5, 5, -5] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              🐲
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
