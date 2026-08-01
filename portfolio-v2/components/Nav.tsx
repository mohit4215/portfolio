"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { label: "Home",        href: "#hero" },
  { label: "Education",   href: "#education" },
  { label: "Work",        href: "#case-studies" },
  { label: "Achievements",href: "#achievements" },
  { label: "Gallery",     href: "#certificates" },
  { label: "Life",        href: "#extracurriculars" },
  { label: "Contact",     href: "#contact" },
];

export default function Nav() {
  const [active, setActive] = useState("hero");
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // Active section tracking
  useEffect(() => {
    const ids = NAV_ITEMS.map((n) => n.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Move liquid indicator pill
  useEffect(() => {
    const targetIdx =
      hoveredIdx !== null
        ? hoveredIdx
        : NAV_ITEMS.findIndex((n) => n.href === `#${active}`);
    const el = itemRefs.current[targetIdx];
    const indicator = indicatorRef.current;
    if (!el || !indicator) return;
    const parent = indicator.parentElement;
    if (!parent) return;
    const parentRect = parent.getBoundingClientRect();
    const rect = el.getBoundingClientRect();
    indicator.style.width = `${rect.width}px`;
    indicator.style.transform = `translateX(${rect.left - parentRect.left}px)`;
  }, [active, hoveredIdx]);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  return (
    <>
      {/* ── Desktop: bottom capsule nav ───────────────────────── */}
      <nav
        aria-label="Main navigation"
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 hidden md:block"
      >
        <div className="relative flex items-center gap-1 bg-charcoal px-2 py-2 rounded-full shadow-brutal border-2 border-charcoal">
          {/* Liquid background indicator */}
          <span
            ref={indicatorRef}
            className="absolute top-2 left-0 h-[calc(100%-16px)] bg-cobalt rounded-full transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
            aria-hidden
            style={{ width: 0 }}
          />

          {NAV_ITEMS.map((item, i) => (
            <a
              key={item.href}
              ref={(el) => { itemRefs.current[i] = el; }}
              href={item.href}
              onClick={(e) => { e.preventDefault(); scrollTo(item.href); }}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              className={`relative z-10 px-4 py-1.5 rounded-full font-mono text-xs tracking-widest uppercase transition-colors duration-150 select-none ${
                active === item.href.slice(1)
                  ? "text-paper"
                  : "text-faint hover:text-paper"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      {/* ── Mobile: hamburger + slide-up drawer ───────────────── */}
      <div className="fixed bottom-5 right-5 z-50 md:hidden flex flex-col items-end gap-3">
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              className="flex flex-col gap-1 bg-charcoal border-2 border-charcoal rounded-2xl p-3 shadow-brutal"
            >
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(item.href); }}
                  className={`px-5 py-2 rounded-xl font-mono text-xs uppercase tracking-widest transition-colors ${
                    active === item.href.slice(1)
                      ? "bg-cobalt text-paper"
                      : "text-faint hover:text-paper hover:bg-white/10"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          className="w-12 h-12 rounded-full bg-charcoal border-2 border-charcoal shadow-brutal flex flex-col items-center justify-center gap-[5px]"
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            className="block w-5 h-[2px] bg-paper origin-center transition-all"
          />
          <motion.span
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block w-5 h-[2px] bg-paper"
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            className="block w-5 h-[2px] bg-paper origin-center transition-all"
          />
        </motion.button>
      </div>
    </>
  );
}
