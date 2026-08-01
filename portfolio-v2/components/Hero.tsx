"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowDownRight, Zap, MapPin, GraduationCap } from "lucide-react";
import { useMagneticPull } from "@/hooks/useMagneticPull";

/* ── Text scramble ──────────────────────────────────────────────── */
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@$%&";

function useScramble(target: string, delay = 0) {
  const [text, setText] = useState(() =>
    target.replace(/\S/g, () => CHARS[Math.floor(Math.random() * CHARS.length)])
  );

  useEffect(() => {
    let rafId = 0;
    let frameCount = 0;
    let resolved = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    const step = () => {
      frameCount++;

      // Scramble all unresolved characters every frame
      setText((prev) => {
        const arr = prev.split("");
        for (let i = resolved; i < target.length; i++) {
          arr[i] = target[i] === " " ? " " : CHARS[Math.floor(Math.random() * CHARS.length)];
        }
        return arr.join("");
      });

      // Resolve one character every 3 frames
      if (frameCount % 3 === 0 && resolved < target.length) {
        const idx = resolved;
        setText((prev) => {
          const arr = prev.split("");
          arr[idx] = target[idx];
          return arr.join("");
        });
        resolved++;
      }

      if (resolved < target.length) {
        rafId = requestAnimationFrame(step);
      } else {
        setText(target);
      }
    };

    timeoutId = setTimeout(() => {
      rafId = requestAnimationFrame(step);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(rafId);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  return text;
}

/* ── Animated counter ──────────────────────────────────────────── */
function Counter({ to, decimals = 0, duration = 1600 }: { to: number; decimals?: number; duration?: number }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          setVal(parseFloat((ease * to).toFixed(decimals)));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to, decimals, duration]);

  return <span ref={ref}>{val.toFixed(decimals)}</span>;
}

/* ── Quick-action toggle ────────────────────────────────────────── */
const ROLES = ["Strategy Consulting", "Financial Modeling", "M&A Blueprints", "AI & ML", "Entrepreneurship"];

export default function Hero() {
  const { magneticRef: btnRef1, x: bx1, y: by1 } = useMagneticPull();
  const { magneticRef: btnRef2, x: bx2, y: by2 } = useMagneticPull();

  const [roleIdx, setRoleIdx] = useState(0);
  const line1 = useScramble("MOHIT", 200);
  const line2 = useScramble("AGARWAL", 600);

  // Cycle roles
  useEffect(() => {
    const id = setInterval(() => setRoleIdx((i) => (i + 1) % ROLES.length), 2800);
    return () => clearInterval(id);
  }, []);

  // Parallax on mouse move for large headline
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(mx, [-1, 1], [-8, 8]), { stiffness: 80, damping: 20 });
  const ry = useSpring(useTransform(my, [-1, 1], [-5, 5]), { stiffness: 80, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    mx.set(((clientX - left) / width - 0.5) * 2);
    my.set(((clientY - top) / height - 0.5) * 2);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-paper border-b-2 border-charcoal"
      onMouseMove={handleMouseMove}
    >
      {/* ── Background grid ───────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(#18181B 1px,transparent 1px),linear-gradient(90deg,#18181B 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Orange accent block ───────────────────────────────── */}
      <div className="absolute top-0 right-0 w-[38vw] h-[38vw] max-w-[520px] max-h-[520px] bg-orange opacity-[0.08] rounded-bl-[60%] pointer-events-none" />

      {/* ── Content ───────────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-24 pb-32">

        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="inline-flex items-center gap-2 border-2 border-charcoal bg-paper px-4 py-1.5 mb-10 shadow-brutal"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange" />
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-charcoal">
            Open to Opportunities
          </span>
          <span className="font-mono text-xs text-muted ml-1">— 2026</span>
        </motion.div>

        {/* Giant kinetic headline */}
        <div className="overflow-hidden">
          <motion.h1
            className="font-display leading-none select-none"
            style={{ rotateX: ry, rotateY: rx, perspective: 800 }}
          >
            {/* Line 1 */}
            <motion.div
              className="block text-[clamp(4.5rem,12vw,11rem)] tracking-[-0.04em] text-charcoal"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.15, duration: 0.7, ease: [0.77, 0, 0.175, 1] }}
            >
              {line1.split("").map((ch, i) => (
                <span
                  key={i}
                  className="inline-block"
                  style={{ color: ch === line1[i] ? "#18181B" : "#2563EB" }}
                >
                  {ch === " " ? "\u00A0" : ch}
                </span>
              ))}
            </motion.div>

            {/* Line 2 — orange accent on last char */}
            <motion.div
              className="block text-[clamp(4.5rem,12vw,11rem)] tracking-[-0.04em] -mt-2 md:-mt-4"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.35, duration: 0.7, ease: [0.77, 0, 0.175, 1] }}
            >
              {line2.split("").map((ch, i) => (
                <span
                  key={i}
                  className="inline-block"
                  style={{
                    color:
                      i === line2.length - 1
                        ? "#FF4800"
                        : ch === line2[i]
                        ? "#18181B"
                        : "#2563EB",
                  }}
                >
                  {ch === " " ? "\u00A0" : ch}
                </span>
              ))}
            </motion.div>
          </motion.h1>
        </div>

        {/* Sub-line + role ticker */}
        <motion.div
          className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-8 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <div className="flex items-center gap-2 text-charcoal font-sans text-base md:text-lg font-medium">
            <GraduationCap size={18} className="text-cobalt shrink-0" />
            <span>B.Tech IT · AKGEC / AKTU</span>
          </div>
          <div className="w-px h-5 bg-charcoal hidden sm:block" />
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-orange shrink-0" />
            <span className="font-sans text-sm text-muted">Ghaziabad, IN</span>
          </div>
          <div className="w-px h-5 bg-charcoal hidden sm:block" />
          {/* Role ticker */}
          <div className="border-2 border-charcoal bg-cobalt px-3 py-1 overflow-hidden h-8 flex items-center">
            <motion.div
              key={roleIdx}
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -24, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 24 }}
              className="font-mono text-xs uppercase tracking-widest text-paper whitespace-nowrap"
            >
              {ROLES[roleIdx]}
            </motion.div>
          </div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="flex flex-wrap gap-0 mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.55 }}
        >
          {[
            { label: "1st Year CGPA (AKTU)", value: 8.48, dec: 2, suffix: "" },
            { label: "Class 10th ICSE",      value: 95,   dec: 0, suffix: "%" },
            { label: "Competitions Entered", value: 10,   dec: 0, suffix: "+" },
          ].map((s, i) => (
            <div
              key={i}
              className="border-2 border-charcoal px-6 py-4 -ml-[2px] first:ml-0 bg-paper hover:bg-charcoal hover:text-paper transition-colors duration-200 group"
            >
              <div className="font-display text-3xl md:text-4xl text-charcoal group-hover:text-paper leading-none">
                <Counter to={s.value} decimals={s.dec} />
                <span>{s.suffix}</span>
              </div>
              <div className="font-mono text-[0.65rem] uppercase tracking-widest text-muted group-hover:text-faint mt-1">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.5 }}
        >
          <motion.a
            ref={btnRef1 as React.RefObject<HTMLAnchorElement>}
            href="#case-studies"
            style={{ x: bx1, y: by1 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={(e) => { e.preventDefault(); document.querySelector("#case-studies")?.scrollIntoView({ behavior: "smooth" }); }}
            className="inline-flex items-center gap-2 bg-charcoal text-paper font-mono text-xs uppercase tracking-widest px-7 py-4 border-2 border-charcoal shadow-brutal hover:bg-cobalt hover:border-cobalt transition-colors duration-150"
          >
            View Case Studies
            <ArrowDownRight size={16} />
          </motion.a>

          <motion.a
            ref={btnRef2 as React.RefObject<HTMLAnchorElement>}
            href="#contact"
            style={{ x: bx2, y: by2 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
            className="inline-flex items-center gap-2 bg-paper text-charcoal font-mono text-xs uppercase tracking-widest px-7 py-4 border-2 border-charcoal shadow-brutal hover:bg-orange hover:text-paper hover:border-orange transition-colors duration-150"
          >
            <Zap size={15} />
            Get In Touch
          </motion.a>
        </motion.div>

        {/* Age tag — editorial floating label */}
        <motion.div
          className="absolute bottom-8 right-8 md:right-12 hidden md:block"
          initial={{ opacity: 0, rotate: -6 }}
          animate={{ opacity: 1, rotate: -6 }}
          transition={{ delay: 1.6, duration: 0.4 }}
        >
          <div className="border-2 border-charcoal bg-orange text-paper font-mono text-xs uppercase tracking-widest px-4 py-2 shadow-brutal-orange">
            Age 18 ·&nbsp;Entrepreneur
          </div>
        </motion.div>
      </div>
    </section>
  );
}
