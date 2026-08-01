"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function DragonIntro({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"fly" | "roar" | "fire" | "exit" | "done">("fly");

  useEffect(() => {
    // Phase timeline
    const t1 = setTimeout(() => setPhase("roar"), 2200);
    const t2 = setTimeout(() => setPhase("fire"), 2800);
    const t3 = setTimeout(() => setPhase("exit"), 4400);
    const t4 = setTimeout(() => { setPhase("done"); onComplete(); }, 5400);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [onComplete]);

  if (phase === "done") return null;

  return (
    <AnimatePresence>
      <motion.div
        key="intro"
        className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden"
        style={{ background: "#0a0a1a" }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
      >
        {/* ── Stars background ── */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 80 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: Math.random() * 3 + 1,
                height: Math.random() * 3 + 1,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.7 + 0.2,
                animation: `blink ${Math.random() * 3 + 1}s step-end infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        {/* ── Moon ── */}
        <div className="absolute top-12 right-16 md:right-24">
          <div
            className="w-20 h-20 md:w-28 md:h-28 rounded-full"
            style={{
              background: "radial-gradient(circle at 35% 35%, #FFFDE0, #FFD700, #FF8C00)",
              boxShadow: "0 0 40px rgba(255,184,0,0.6), 0 0 80px rgba(255,140,0,0.3)",
              border: "3px solid rgba(255,220,0,0.8)",
            }}
          />
        </div>

        {/* ── Mountains silhouette ── */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-40 md:h-56">
            <path d="M0,320 L0,200 L120,100 L240,180 L360,60 L480,140 L600,40 L720,120 L840,20 L960,100 L1080,30 L1200,110 L1320,50 L1440,130 L1440,320 Z" fill="#0f0f2a" />
            <path d="M0,320 L0,240 L180,150 L300,210 L450,120 L600,190 L750,100 L900,180 L1050,90 L1200,160 L1350,80 L1440,150 L1440,320 Z" fill="#16163a" />
            <path d="M0,320 L0,280 L200,220 L400,260 L600,200 L800,250 L1000,190 L1200,240 L1440,200 L1440,320 Z" fill="#1e1e4a" />
          </svg>
        </div>

        {/* ── Trees silhouette ── */}
        <div className="absolute bottom-0 left-0 right-0 flex items-end justify-around px-4 md:px-12">
          {[28, 40, 22, 36, 44, 18, 32, 26, 42].map((h, i) => (
            <div key={i} className="flex flex-col items-center" style={{ marginBottom: -2 }}>
              <div style={{ width: 0, height: 0, borderLeft: `${h * 0.4}px solid transparent`, borderRight: `${h * 0.4}px solid transparent`, borderBottom: `${h}px solid #0d0d22` }} />
              <div style={{ width: 6, height: 14, background: "#0d0d22" }} />
            </div>
          ))}
        </div>

        {/* ── Dragon SVG ── */}
        <motion.div
          className="absolute"
          style={{ top: "28%", left: "5%" }}
          initial={{ x: "-130vw", y: 40, rotate: -8 }}
          animate={
            phase === "fly"
              ? { x: "15vw", y: 0, rotate: -3 }
              : phase === "roar" || phase === "fire"
              ? { x: "12vw", y: [-8, 0, -8, 0, -8], rotate: [-3, 0, -3, 0, -3] }
              : { x: "120vw", y: -80, rotate: 15 }
          }
          transition={
            phase === "fly"
              ? { duration: 2.2, ease: [0.25, 0.46, 0.45, 0.94] }
              : phase === "exit"
              ? { duration: 1.0, ease: [0.55, 0, 1, 0.45] }
              : { duration: 0.8, repeat: Infinity, ease: "easeInOut" }
          }
        >
          <DragonSVG phase={phase} />
        </motion.div>

        {/* ── Fire breath ── */}
        <AnimatePresence>
          {(phase === "fire") && (
            <motion.div
              className="absolute"
              style={{ top: "34%", left: "38%" }}
              initial={{ scaleX: 0, opacity: 0, originX: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              exit={{ scaleX: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <FireBreath />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Roar text ── */}
        <AnimatePresence>
          {phase === "roar" && (
            <motion.div
              className="absolute"
              style={{ top: "16%", left: "32%" }}
              initial={{ scale: 0, opacity: 0, rotate: -15 }}
              animate={{ scale: 1, opacity: 1, rotate: -8 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 18 }}
            >
              <div
                className="text-4xl md:text-6xl font-display text-white px-4 py-2 border-4 border-white rounded-lg"
                style={{
                  fontFamily: "Bangers, cursive",
                  letterSpacing: "0.1em",
                  textShadow: "0 0 20px rgba(255,77,46,0.8), 3px 3px 0px #FF4D2E",
                  background: "rgba(0,0,0,0.4)",
                }}
              >
                RAAWR!!! 🔥
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Title text ── */}
        <AnimatePresence>
          {(phase === "fire") && (
            <motion.div
              className="absolute bottom-28 md:bottom-36 left-1/2 -translate-x-1/2 text-center"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <p
                className="text-5xl md:text-7xl text-white mb-2"
                style={{
                  fontFamily: "Bangers, cursive",
                  letterSpacing: "0.12em",
                  textShadow: "0 0 30px rgba(255,184,0,0.7), 4px 4px 0px #FF4D2E",
                }}
              >
                MOHIT AGARWAL
              </p>
              <p
                className="text-lg md:text-2xl text-yellow-300"
                style={{ fontFamily: "Fredoka One, cursive", letterSpacing: "0.2em" }}
              >
                ⚔️ PORTFOLIO ⚔️
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Ember particles ── */}
        {phase === "fire" && Array.from({ length: 18 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: i % 3 === 0 ? "#FF4D2E" : i % 3 === 1 ? "#FFB800" : "#FFE566",
              top: `${30 + Math.random() * 30}%`,
              left: `${38 + Math.random() * 30}%`,
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{
              scale: [0, 1.5, 0],
              opacity: [1, 0.8, 0],
              x: (Math.random() - 0.5) * 120,
              y: -(Math.random() * 100 + 40),
            }}
            transition={{ duration: 0.8 + Math.random() * 0.6, delay: Math.random() * 0.5, repeat: Infinity }}
          />
        ))}

        {/* ── Skip button ── */}
        <button
          onClick={() => { setPhase("done"); onComplete(); }}
          className="absolute bottom-6 right-6 text-white/50 hover:text-white font-sans text-sm border border-white/20 px-3 py-1 rounded-full transition-colors hover:border-white/60"
          style={{ fontFamily: "Nunito, sans-serif" }}
        >
          skip →
        </button>
      </motion.div>
    </AnimatePresence>
  );
}

/* ── Dragon SVG component ─────────────────────────────────────── */
function DragonSVG({ phase }: { phase: string }) {
  const isFlapping = phase === "roar" || phase === "fire";
  return (
    <svg
      width="320" height="200"
      viewBox="0 0 320 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: "drop-shadow(0 0 16px rgba(255,100,0,0.5))" }}
    >
      {/* Body */}
      <ellipse cx="160" cy="120" rx="90" ry="42" fill="#2D5A27" stroke="#1A1A2E" strokeWidth="3"/>
      <ellipse cx="160" cy="118" rx="80" ry="35" fill="#3D7A35"/>

      {/* Belly */}
      <ellipse cx="165" cy="128" rx="55" ry="22" fill="#8FD18A" stroke="#1A1A2E" strokeWidth="2"/>

      {/* Neck */}
      <path d="M90 100 Q70 80 55 75 Q45 72 40 78" stroke="#1A1A2E" strokeWidth="3" fill="#2D5A27"/>
      <path d="M92 108 Q72 88 58 83 Q48 80 42 86" stroke="#3D7A35" strokeWidth="2" fill="none"/>

      {/* Head */}
      <ellipse cx="38" cy="85" rx="28" ry="20" fill="#2D5A27" stroke="#1A1A2E" strokeWidth="3"/>
      <ellipse cx="36" cy="84" rx="24" ry="17" fill="#3D7A35"/>

      {/* Snout */}
      <path d="M14 86 Q8 90 6 94 Q10 98 16 95 Q20 93 22 88 Z" fill="#2D5A27" stroke="#1A1A2E" strokeWidth="2"/>
      <circle cx="9" cy="90" r="2.5" fill="#1A1A2E"/>
      <circle cx="14" cy="88" r="2" fill="#1A1A2E"/>

      {/* Eye */}
      <circle cx="30" cy="80" r="6" fill="#FFEE00" stroke="#1A1A2E" strokeWidth="2"/>
      <ellipse cx="30" cy="80" rx="2.5" ry="4" fill="#1A1A2E"/>
      <circle cx="31" cy="78" r="1.2" fill="white"/>

      {/* Horns */}
      <path d="M28 66 Q24 50 26 44 Q30 42 32 50 Q34 58 32 66 Z" fill="#1A7A2A" stroke="#1A1A2E" strokeWidth="2"/>
      <path d="M38 64 Q36 50 38 46 Q42 44 44 52 Q44 60 42 64 Z" fill="#1A7A2A" stroke="#1A1A2E" strokeWidth="2"/>

      {/* Ears / frills */}
      <path d="M46 72 Q54 60 60 62 Q58 72 50 76 Z" fill="#4CAF50" stroke="#1A1A2E" strokeWidth="1.5"/>

      {/* Left wing */}
      <motion.g
        animate={isFlapping ? { rotate: [-25, 10, -25] } : { rotate: -15 }}
        transition={{ duration: 0.5, repeat: isFlapping ? Infinity : 0, ease: "easeInOut" }}
        style={{ originX: "160px", originY: "100px" }}
      >
        <path d="M130 95 Q100 40 60 20 Q80 50 90 80 Q105 68 115 75 Q120 55 130 60 Q125 80 130 95 Z"
          fill="#1A5C1A" stroke="#1A1A2E" strokeWidth="2.5"/>
        <path d="M130 95 Q110 70 80 50 M130 95 Q115 72 95 65 M130 95 Q122 78 112 72"
          stroke="#0F3D0F" strokeWidth="1.5" fill="none"/>
      </motion.g>

      {/* Right wing */}
      <motion.g
        animate={isFlapping ? { rotate: [20, -15, 20] } : { rotate: 10 }}
        transition={{ duration: 0.5, repeat: isFlapping ? Infinity : 0, ease: "easeInOut" }}
        style={{ originX: "190px", originY: "100px" }}
      >
        <path d="M190 95 Q220 40 265 18 Q242 48 235 78 Q218 66 208 73 Q202 53 192 58 Q198 79 190 95 Z"
          fill="#1A5C1A" stroke="#1A1A2E" strokeWidth="2.5"/>
        <path d="M190 95 Q210 68 242 46 M190 95 Q208 70 228 63 M190 95 Q198 76 214 70"
          stroke="#0F3D0F" strokeWidth="1.5" fill="none"/>
      </motion.g>

      {/* Tail */}
      <path d="M245 125 Q275 118 295 108 Q310 100 315 92 Q316 88 312 90 Q298 106 280 116 Q262 126 248 132 Z"
        fill="#2D5A27" stroke="#1A1A2E" strokeWidth="2"/>
      <path d="M310 90 Q322 82 318 76 Q310 80 308 88 Z" fill="#1A7A2A" stroke="#1A1A2E" strokeWidth="1.5"/>

      {/* Spine spikes */}
      {[0,1,2,3,4].map(i => (
        <path
          key={i}
          d={`M${145+i*18} ${100-8} Q${148+i*18} ${85-i*2} ${151+i*18} ${100-8} Z`}
          fill="#1A7A2A" stroke="#1A1A2E" strokeWidth="1.5"
        />
      ))}

      {/* Legs */}
      <path d="M140 155 Q135 170 132 182 Q136 184 138 172 Q142 182 145 183 Q147 171 143 155 Z"
        fill="#2D5A27" stroke="#1A1A2E" strokeWidth="2"/>
      <path d="M180 155 Q185 170 188 182 Q184 184 182 172 Q178 182 175 183 Q173 171 177 155 Z"
        fill="#2D5A27" stroke="#1A1A2E" strokeWidth="2"/>

      {/* Claws */}
      <path d="M130 182 Q126 188 124 186 Q127 182 130 182Z" fill="#A0C878" stroke="#1A1A2E" strokeWidth="1"/>
      <path d="M136 184 Q134 190 132 188 Q134 184 136 184Z" fill="#A0C878" stroke="#1A1A2E" strokeWidth="1"/>
      <path d="M142 183 Q140 189 138 188 Q140 183 142 183Z" fill="#A0C878" stroke="#1A1A2E" strokeWidth="1"/>
    </svg>
  );
}

/* ── Fire breath SVG ──────────────────────────────────────────── */
function FireBreath() {
  return (
    <svg width="260" height="100" viewBox="0 0 260 100" fill="none">
      {/* Outer flame */}
      <motion.path
        d="M0 50 Q30 10 80 20 Q120 8 160 30 Q200 10 240 40 Q260 48 255 55 Q240 45 200 50 Q160 38 120 48 Q80 30 40 55 Q20 62 0 50 Z"
        fill="#FF4D2E"
        animate={{ scaleY: [1, 1.3, 0.9, 1.2, 1], scaleX: [1, 0.95, 1.05, 0.98, 1] }}
        transition={{ duration: 0.2, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "0 50px" }}
      />
      {/* Mid flame */}
      <motion.path
        d="M0 50 Q25 22 70 32 Q110 18 150 38 Q185 22 220 46 Q235 52 228 58 Q210 48 175 52 Q140 40 105 52 Q70 36 35 56 Q18 60 0 50 Z"
        fill="#FF8C00"
        animate={{ scaleY: [1, 1.4, 0.85, 1.25, 1], scaleX: [1, 0.92, 1.08, 0.96, 1] }}
        transition={{ duration: 0.18, repeat: Infinity, ease: "easeInOut", delay: 0.04 }}
        style={{ transformOrigin: "0 50px" }}
      />
      {/* Inner flame */}
      <motion.path
        d="M0 50 Q20 30 60 38 Q95 26 130 44 Q165 30 200 48 Q212 53 206 58 Q190 50 158 54 Q124 44 90 54 Q58 40 28 56 Q14 60 0 50 Z"
        fill="#FFB800"
        animate={{ scaleY: [1, 1.5, 0.8, 1.3, 1], scaleX: [1, 0.9, 1.1, 0.94, 1] }}
        transition={{ duration: 0.16, repeat: Infinity, ease: "easeInOut", delay: 0.08 }}
        style={{ transformOrigin: "0 50px" }}
      />
      {/* Core */}
      <motion.path
        d="M0 50 Q15 36 45 42 Q75 34 108 46 Q138 36 165 48 Q178 53 172 57 Q155 50 124 54 Q94 46 64 54 Q40 44 20 56 Q10 60 0 50 Z"
        fill="#FFE566"
        animate={{ scaleY: [1, 1.6, 0.75, 1.35, 1] }}
        transition={{ duration: 0.14, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
        style={{ transformOrigin: "0 50px" }}
      />
    </svg>
  );
}
