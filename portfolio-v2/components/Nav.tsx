"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { label: "🏠 Home",        href: "#hero" },
  { label: "🎓 Education",   href: "#education" },
  { label: "📊 Case Studies",href: "#case-studies" },
  { label: "🏆 Achievements",href: "#achievements" },
  { label: "📜 Gallery",     href: "#certificates" },
  { label: "⚡ Life",         href: "#extracurriculars" },
  { label: "💌 Contact",     href: "#contact" },
];

export default function Nav() {
  const [active, setActive]   = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = NAV_ITEMS.map(n => n.href.slice(1));
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  return (
    <>
      {/* ── Desktop top nav ────────────────────────────────────── */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 hidden md:block transition-all duration-300 ${
          scrolled ? "py-2" : "py-4"
        }`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 280, damping: 24 }}
      >
        <div className="max-w-5xl mx-auto px-6">
          <div
            className="flex items-center justify-between px-6 py-3 rounded-2xl border-3 border-inkBlack"
            style={{
              background: scrolled ? "rgba(255,253,245,0.97)" : "rgba(255,253,245,0.85)",
              backdropFilter: "blur(12px)",
              boxShadow: scrolled ? "4px 4px 0px #1A1A2E" : "none",
            }}
          >
            {/* Logo */}
            <motion.a
              href="#hero"
              onClick={e => { e.preventDefault(); scrollTo("#hero"); }}
              whileHover={{ scale: 1.08, rotate: -3 }}
              whileTap={{ scale: 0.95 }}
              className="font-display text-2xl text-inkBlack"
              style={{ fontFamily: "Bangers, cursive", letterSpacing: "0.1em" }}
            >
              M.A <span className="text-fireRed">🐉</span>
            </motion.a>

            {/* Links */}
            <div className="flex items-center gap-1">
              {NAV_ITEMS.map(item => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={e => { e.preventDefault(); scrollTo(item.href); }}
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  className={`relative px-3 py-1.5 rounded-xl font-sans text-xs font-700 transition-colors ${
                    active === item.href.slice(1)
                      ? "bg-inkBlack text-cream"
                      : "text-inkDark hover:bg-warm"
                  }`}
                  style={{ fontFamily: "Nunito, sans-serif", fontWeight: 700 }}
                >
                  {item.label}
                  {active === item.href.slice(1) && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-inkBlack rounded-xl -z-10"
                      transition={{ type: "spring", stiffness: 400, damping: 28 }}
                    />
                  )}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* ── Mobile FAB menu ────────────────────────────────────── */}
      <div className="fixed bottom-5 right-5 z-50 md:hidden flex flex-col items-end gap-2">
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              className="flex flex-col gap-1 p-3 rounded-2xl border-3 border-inkBlack bg-cream"
              style={{ boxShadow: "5px 5px 0px #1A1A2E" }}
            >
              {NAV_ITEMS.map(item => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={e => { e.preventDefault(); scrollTo(item.href); }}
                  className={`px-4 py-2 rounded-xl font-sans text-xs font-bold transition-colors ${
                    active === item.href.slice(1)
                      ? "bg-inkBlack text-cream"
                      : "text-inkDark hover:bg-warm"
                  }`}
                  style={{ fontFamily: "Nunito, sans-serif" }}
                >
                  {item.label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileTap={{ scale: 0.88, rotate: 15 }}
          onClick={() => setMenuOpen(o => !o)}
          className="w-14 h-14 rounded-2xl border-3 border-inkBlack bg-sunYellow text-2xl flex items-center justify-center"
          style={{ boxShadow: "4px 4px 0px #1A1A2E" }}
          aria-label="Menu"
        >
          {menuOpen ? "✕" : "🐉"}
        </motion.button>
      </div>
    </>
  );
}
