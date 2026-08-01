"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, ChevronLeft, ChevronRight, X, Bot, Cpu, Scale, BookOpen, Terminal } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const CERTS = [
  {
    id: 0,
    title: "Plum X Invicta",
    subtitle: "Case Study Competition · DU",
    src: "/assets/certificates/plum-xiv.jpg",
    hasImage: true,
    icon: null,
    accent: "#2563EB",
  },
  {
    id: 1,
    title: "Nerd AI Quest",
    subtitle: "AI/ML Competition",
    src: null,
    hasImage: false,
    icon: Bot,
    accent: "#FF4800",
  },
  {
    id: 2,
    title: "Tech Nova",
    subtitle: "Tech Innovation Event",
    src: null,
    hasImage: false,
    icon: Cpu,
    accent: "#18181B",
  },
  {
    id: 3,
    title: "NitiGyan 5.0",
    subtitle: "Policy & Strategy",
    src: null,
    hasImage: false,
    icon: Scale,
    accent: "#2563EB",
  },
  {
    id: 4,
    title: "Elementary Teaching",
    subtitle: "Teaching Certificate",
    src: null,
    hasImage: false,
    icon: BookOpen,
    accent: "#FF4800",
  },
  {
    id: 5,
    title: "DTU Assets — M&A Offline",
    subtitle: "MarkSense Competition · DTU",
    src: "/assets/gallery/dtu-presentation-1.jpeg",
    hasImage: true,
    icon: null,
    accent: "#18181B",
  },
  {
    id: 6,
    title: "DTU Assets — Final Boardroom",
    subtitle: "Offline Presentation · DTU",
    src: "/assets/gallery/dtu-presentation-2.jpeg",
    hasImage: true,
    icon: null,
    accent: "#2563EB",
  },
  {
    id: 7,
    title: "IGDTUW — Prompt Wars",
    subtitle: "by GDSC Offline",
    src: null,
    hasImage: false,
    icon: Terminal,
    accent: "#FF4800",
  },
];

const IMAGE_CERTS = CERTS.filter((c) => c.hasImage);

export default function Certificates() {
  const { ref: sectionRef, inView } = useInView<HTMLElement>({ threshold: 0.08 });
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const openLightbox = (certId: number) => {
    const imgIdx = IMAGE_CERTS.findIndex((c) => c.id === certId);
    if (imgIdx !== -1) setLightboxIdx(imgIdx);
  };

  const prev = () => setLightboxIdx((i) => (i === null ? 0 : (i - 1 + IMAGE_CERTS.length) % IMAGE_CERTS.length));
  const next = () => setLightboxIdx((i) => (i === null ? 0 : (i + 1) % IMAGE_CERTS.length));

  return (
    <section
      id="certificates"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="section-pad bg-paper border-b-2 border-charcoal"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* ── Header ────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b-2 border-charcoal pb-8">
          <div>
            <motion.p
              className="font-mono text-xs uppercase tracking-[0.18em] text-cobalt mb-3"
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            >
              ✦ Participations
            </motion.p>
            <motion.h2
              className="font-display text-display-xl text-charcoal"
              initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1] }}
            >
              Certificates &amp; Gallery
            </motion.h2>
          </div>
          <motion.span className="font-mono text-sm text-muted" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}>
            {CERTS.length} entries
          </motion.span>
        </div>

        {/* ── Grid ──────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 border-2 border-charcoal">
          {CERTS.map((cert, i) => {
            const canOpen = cert.hasImage;
            const Icon = cert.icon;
            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.05 + i * 0.06, duration: 0.5 }}
                onClick={() => canOpen && openLightbox(cert.id)}
                className={`group relative border-b-2 border-r-2 border-charcoal overflow-hidden ${
                  i % 4 === 3 ? "border-r-0" : ""
                } ${canOpen ? "cursor-pointer" : "cursor-default"}`}
              >
                <div className="aspect-[4/3] relative bg-rule flex items-center justify-center overflow-hidden">
                  {cert.hasImage && cert.src ? (
                    <Image
                      src={cert.src}
                      alt={cert.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  ) : (
                    <div
                      className="w-14 h-14 border-2 border-charcoal flex items-center justify-center"
                      style={{ background: cert.accent }}
                    >
                      {Icon && <Icon size={22} color="#F3F1EA" />}
                    </div>
                  )}

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/80 transition-all duration-300 flex items-center justify-center">
                    <motion.div
                      className="opacity-0 group-hover:opacity-100 flex flex-col items-center gap-2"
                      initial={false}
                    >
                      {canOpen ? (
                        <>
                          <Maximize2 size={22} color="#F3F1EA" />
                          <span className="font-mono text-[0.6rem] uppercase tracking-widest text-paper">Expand</span>
                        </>
                      ) : (
                        <span className="font-mono text-[0.6rem] uppercase tracking-widest text-paper px-3 text-center">{cert.subtitle}</span>
                      )}
                    </motion.div>
                  </div>

                  {/* Accent bar */}
                  <div
                    className="absolute bottom-0 left-0 w-0 h-[3px] group-hover:w-full transition-all duration-500"
                    style={{ background: cert.accent }}
                    aria-hidden
                  />
                </div>

                {/* Info */}
                <div className="px-3 py-3 border-t-2 border-charcoal">
                  <h4 className="font-sans text-xs font-semibold text-charcoal truncate">{cert.title}</h4>
                  <p className="font-mono text-[0.6rem] text-muted truncate">{cert.subtitle}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── Lightbox ──────────────────────────────────────────── */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <>
            <motion.div
              className="fixed inset-0 bg-charcoal/95 z-50"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setLightboxIdx(null)}
            />
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-6"
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 360, damping: 30 }}
            >
              {/* close */}
              <button
                onClick={() => setLightboxIdx(null)}
                className="absolute top-5 right-5 w-10 h-10 border-2 border-paper/20 flex items-center justify-center hover:border-orange hover:text-orange text-paper transition-colors z-10"
                aria-label="Close"
              >
                <X size={16} />
              </button>

              {/* prev / next */}
              <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 border-2 border-paper/20 flex items-center justify-center hover:border-cobalt text-paper transition-colors z-10" aria-label="Previous">
                <ChevronLeft size={18} />
              </button>
              <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 border-2 border-paper/20 flex items-center justify-center hover:border-cobalt text-paper transition-colors z-10" aria-label="Next">
                <ChevronRight size={18} />
              </button>

              {/* image */}
              <div className="relative max-w-3xl w-full pointer-events-none" onClick={(e) => e.stopPropagation()}>
                <div className="relative w-full" style={{ maxHeight: "75vh" }}>
                  <Image
                    src={IMAGE_CERTS[lightboxIdx].src!}
                    alt={IMAGE_CERTS[lightboxIdx].title}
                    width={900}
                    height={600}
                    className="w-full h-auto object-contain border-2 border-paper/20 shadow-brutal pointer-events-auto"
                    style={{ maxHeight: "75vh" }}
                  />
                </div>
                <div className="mt-4 text-center">
                  <p className="font-display text-lg text-paper">{IMAGE_CERTS[lightboxIdx].title}</p>
                  <p className="font-mono text-xs text-paper/40 uppercase tracking-widest">{IMAGE_CERTS[lightboxIdx].subtitle}</p>
                  <p className="font-mono text-xs text-paper/20 mt-1">{lightboxIdx + 1} / {IMAGE_CERTS.length}</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
