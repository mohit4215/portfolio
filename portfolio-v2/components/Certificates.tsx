"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "@/hooks/useInView";

const CERTS = [
  { id: 0, title: "Plum X Invicta",              subtitle: "Case Study · DU",         src: "/assets/certificates/plum-xiv.jpg", hasImage: true,  emoji: "🏆", bg: "bg-sky" },
  { id: 1, title: "Nerd AI Quest",                subtitle: "AI/ML Competition",        src: null,                                hasImage: false, emoji: "🤖", bg: "bg-mint" },
  { id: 2, title: "Tech Nova",                    subtitle: "Tech Innovation",           src: null,                                hasImage: false, emoji: "💻", bg: "bg-lavender" },
  { id: 3, title: "NitiGyan 5.0",                 subtitle: "Policy & Strategy",         src: null,                                hasImage: false, emoji: "⚖️", bg: "bg-warm" },
  { id: 4, title: "Elementary Teaching",          subtitle: "Teaching Certificate",      src: null,                                hasImage: false, emoji: "📖", bg: "bg-sakura" },
  { id: 5, title: "DTU Assets — M&A Offline",    subtitle: "MarkSense · DTU",          src: "/assets/gallery/dtu-presentation-1.jpeg", hasImage: true, emoji: "🤝", bg: "bg-sky" },
  { id: 6, title: "DTU Assets — Final Boardroom",subtitle: "Offline Presentation · DTU",src: "/assets/gallery/dtu-presentation-2.jpeg", hasImage: true, emoji: "🎤", bg: "bg-sunYellow" },
  { id: 7, title: "IGDTUW — Prompt Wars",         subtitle: "by GDSC Offline",          src: null,                                hasImage: false, emoji: "⚡", bg: "bg-mint" },
];

const IMGS = CERTS.filter(c => c.hasImage);

export default function Certificates() {
  const { ref: sectionRef, inView } = useInView<HTMLElement>({ threshold: 0.08 });
  const [lightbox, setLightbox] = useState<number | null>(null);

  const openLightbox = (certId: number) => {
    const idx = IMGS.findIndex(c => c.id === certId);
    if (idx !== -1) setLightbox(idx);
  };

  return (
    <section
      id="certificates"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="section-pad"
      style={{ background: "linear-gradient(135deg, #FFF8E7 0%, #FFFDF5 100%)" }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">

        {/* ── Header ── */}
        <div className="text-center mb-14">
          <motion.div initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}} transition={{ type: "spring", stiffness: 400, damping: 18 }} className="inline-block mb-4 text-4xl">📜</motion.div>
          <motion.h2 className="font-display text-5xl md:text-6xl text-inkBlack" style={{ fontFamily: "Bangers, cursive", letterSpacing: "0.08em" }} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
            CERTIFICATES
          </motion.h2>
          <motion.div className="inline-block mt-2 px-4 py-1 rounded-full border-3 border-inkBlack bg-sakura font-sans text-xs font-bold uppercase tracking-widest" style={{ boxShadow: "3px 3px 0px #1A1A2E" }} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}>
            🎖️ {CERTS.length} Participations
          </motion.div>
        </div>

        {/* ── Grid ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CERTS.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, scale: 0.8, rotate: Math.random() > 0.5 ? 3 : -3 }}
              animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
              transition={{ delay: 0.05 + i * 0.06, type: "spring", stiffness: 350, damping: 22 }}
              whileHover={{ scale: 1.06, rotate: i % 2 === 0 ? -3 : 3, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => cert.hasImage && openLightbox(cert.id)}
              className={`manga-panel ${cert.bg} overflow-hidden ${cert.hasImage ? "cursor-pointer" : ""}`}
            >
              {/* Image or icon */}
              <div className="aspect-[4/3] relative flex items-center justify-center overflow-hidden border-b-3 border-inkBlack">
                {cert.hasImage && cert.src ? (
                  <>
                    <Image src={cert.src} alt={cert.title} fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
                    <div className="absolute inset-0 bg-inkBlack/0 hover:bg-inkBlack/30 transition-colors flex items-center justify-center">
                      <motion.span className="text-3xl opacity-0 hover:opacity-100">🔍</motion.span>
                    </div>
                  </>
                ) : (
                  <motion.span
                    className="text-5xl"
                    animate={{ scale: [1, 1.15, 1], rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 3 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {cert.emoji}
                  </motion.span>
                )}
              </div>

              {/* Info */}
              <div className="p-3">
                <h4 className="font-sans text-xs font-extrabold text-inkBlack leading-tight">{cert.title}</h4>
                <p className="font-mono text-[0.6rem] text-inkDark/50 mt-0.5">{cert.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox !== null && (
          <>
            <motion.div className="fixed inset-0 bg-inkBlack/90 z-50 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setLightbox(null)} />
            <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-6 pointer-events-none">
              <motion.div
                initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", stiffness: 380, damping: 26 }}
                className="pointer-events-auto manga-panel bg-white max-w-2xl w-full p-4"
              >
                <button onClick={() => setLightbox(null)} className="absolute top-3 right-3 w-9 h-9 rounded-full border-3 border-inkBlack bg-fireRed text-white font-bold text-sm flex items-center justify-center hover:scale-110 transition-transform">✕</button>
                <div className="flex items-center justify-between mb-3">
                  <button onClick={() => setLightbox(i => i === null ? 0 : (i - 1 + IMGS.length) % IMGS.length)} className="w-9 h-9 rounded-full border-3 border-inkBlack bg-sunYellow flex items-center justify-center font-bold hover:scale-110 transition-transform">←</button>
                  <span className="font-mono text-xs text-inkBlack/40">{lightbox + 1} / {IMGS.length}</span>
                  <button onClick={() => setLightbox(i => i === null ? 0 : (i + 1) % IMGS.length)} className="w-9 h-9 rounded-full border-3 border-inkBlack bg-sunYellow flex items-center justify-center font-bold hover:scale-110 transition-transform">→</button>
                </div>
                <div className="relative w-full rounded-xl overflow-hidden border-3 border-inkBlack" style={{ aspectRatio: "3/2" }}>
                  <Image src={IMGS[lightbox].src!} alt={IMGS[lightbox].title} fill className="object-contain" />
                </div>
                <div className="mt-3 text-center">
                  <p className="font-sans text-base font-extrabold text-inkBlack">{IMGS[lightbox].emoji} {IMGS[lightbox].title}</p>
                  <p className="font-mono text-xs text-inkDark/40">{IMGS[lightbox].subtitle}</p>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
