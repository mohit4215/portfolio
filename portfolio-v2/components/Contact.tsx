"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "@/hooks/useInView";

const SOCIALS = [
  { icon: "💼", label: "LinkedIn", href: "https://linkedin.com",                  bg: "bg-sky"     },
  { icon: "🐙", label: "GitHub",   href: "https://github.com",                     bg: "bg-lavender" },
  { icon: "📧", label: "Email",    href: "mailto:mohitagarwal4215@gmail.com",       bg: "bg-sakura"  },
];

type FormState = "idle" | "submitting" | "success";

export default function Contact() {
  const { ref: sectionRef, inView } = useInView<HTMLElement>({ threshold: 0.1 });
  const [formState, setFormState] = useState<FormState>("idle");
  const [fields, setFields] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFields(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");
    await new Promise(r => setTimeout(r, 1400));
    setFormState("success");
    setFields({ name: "", email: "", message: "" });
    setTimeout(() => setFormState("idle"), 4500);
  };

  return (
    <section
      id="contact"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="section-pad"
      style={{ background: "linear-gradient(135deg, #FFF8E7 0%, #FFFDF5 50%, #FFF3D4 100%)" }}
    >
      <div className="max-w-5xl mx-auto px-6 md:px-12">

        {/* ── Header ── */}
        <div className="text-center mb-14">
          <motion.div initial={{ scale: 0, rotate: -20 }} animate={inView ? { scale: 1, rotate: 0 } : {}} transition={{ type: "spring", stiffness: 400, damping: 18 }} className="inline-block mb-4 text-4xl">💌</motion.div>
          <motion.h2 className="font-display text-5xl md:text-6xl text-inkBlack" style={{ fontFamily: "Bangers, cursive", letterSpacing: "0.08em" }} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
            GET IN TOUCH
          </motion.h2>
          <motion.p className="font-sans text-sm text-inkDark/60 mt-3 max-w-sm mx-auto" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}>
            Want to chat about tech, finance & business strategy? Let&apos;s connect! 🚀
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

          {/* ── Left: speech bubble callout + socials ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.15, type: "spring", stiffness: 280, damping: 22 }}
            className="flex flex-col gap-6"
          >
            {/* Big speech bubble */}
            <div className="speech-bubble p-6">
              <p className="font-display text-3xl text-inkBlack mb-2" style={{ fontFamily: "Bangers, cursive", letterSpacing: "0.08em" }}>
                HEY, LET&apos;S COLLAB! 🔥
              </p>
              <p className="font-sans text-sm text-inkDark/70 leading-relaxed">
                I&apos;m always open to interesting projects, case competitions, and conversations about entrepreneurship, tech & business strategy.
              </p>
              <div className="mt-4 px-4 py-2 rounded-xl border-2 border-inkBlack bg-sunYellow inline-block">
                <a href="mailto:mohitagarwal4215@gmail.com" className="font-mono text-xs font-bold text-inkBlack">
                  📧 mohitagarwal4215@gmail.com
                </a>
              </div>
            </div>

            {/* Social links */}
            <div className="flex flex-col gap-3">
              {SOCIALS.map((s, i) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1, type: "spring", stiffness: 300, damping: 22 }}
                  whileHover={{ scale: 1.04, x: 6 }}
                  whileTap={{ scale: 0.96 }}
                  className={`flex items-center gap-4 manga-panel ${s.bg} p-4`}
                >
                  <span className="text-2xl">{s.icon}</span>
                  <span className="font-sans font-extrabold text-sm text-inkBlack">{s.label}</span>
                  <span className="ml-auto font-sans text-lg text-inkBlack/40">→</span>
                </motion.a>
              ))}
            </div>

            {/* Floating dragon */}
            <motion.div
              className="text-center text-5xl select-none"
              animate={{ y: [-8, 8, -8], rotate: [-8, 8, -8] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              🐲✨
            </motion.div>
          </motion.div>

          {/* ── Right: form ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.25, type: "spring", stiffness: 280, damping: 22 }}
          >
            <AnimatePresence mode="wait">
              {formState === "success" ? (
                <motion.div
                  key="success"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="manga-panel bg-mint p-10 flex flex-col items-center gap-4 text-center"
                >
                  <motion.div className="text-6xl" animate={{ rotate: [0, 20, -20, 0], scale: [1, 1.3, 1] }} transition={{ duration: 0.6 }}>✅</motion.div>
                  <h3 className="font-display text-4xl text-inkBlack" style={{ fontFamily: "Bangers, cursive", letterSpacing: "0.08em" }}>MESSAGE SENT!</h3>
                  <p className="font-sans text-sm text-inkDark/70">I&apos;ll get back to you within 24 hours! 🚀</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="manga-panel bg-white p-6 flex flex-col gap-4"
                >
                  <div className="grid grid-cols-2 gap-3">
                    {(["name", "email"] as const).map(field => (
                      <div key={field} className="flex flex-col gap-1">
                        <label className="font-mono text-[0.65rem] uppercase tracking-widest text-inkBlack/50 font-bold">{field}</label>
                        <input
                          type={field === "email" ? "email" : "text"}
                          name={field}
                          value={fields[field]}
                          onChange={handleChange}
                          required
                          placeholder={field === "email" ? "you@example.com" : "Your name"}
                          className="border-3 border-inkBlack rounded-xl px-3 py-2.5 font-sans text-sm text-inkBlack bg-cream placeholder:text-inkBlack/30 focus:outline-none focus:border-fireRed transition-colors"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-mono text-[0.65rem] uppercase tracking-widest text-inkBlack/50 font-bold">message</label>
                    <textarea
                      name="message"
                      value={fields.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Tell me what you're working on... 💬"
                      className="border-3 border-inkBlack rounded-xl px-3 py-2.5 font-sans text-sm text-inkBlack bg-cream placeholder:text-inkBlack/30 focus:outline-none focus:border-fireRed transition-colors resize-none"
                    />
                  </div>
                  <motion.button
                    type="submit"
                    disabled={formState === "submitting"}
                    whileHover={{ scale: 1.04, y: -3 }}
                    whileTap={{ scale: 0.96 }}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl border-3 border-inkBlack bg-inkBlack text-cream font-sans font-extrabold text-sm disabled:opacity-60"
                    style={{ boxShadow: "5px 5px 0px #FF4D2E", fontFamily: "Nunito, sans-serif" }}
                  >
                    {formState === "submitting" ? (
                      <><span className="w-4 h-4 border-2 border-cream/30 border-t-cream rounded-full animate-spin" />Sending...</>
                    ) : (
                      <>🚀 Send Message</>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* ── Footer ── */}
      <motion.footer
        className="max-w-5xl mx-auto px-6 md:px-12 mt-16"
        initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }}
      >
        <div className="manga-panel bg-inkBlack p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-display text-3xl text-cream" style={{ fontFamily: "Bangers, cursive", letterSpacing: "0.1em" }}>
            M.A 🐉
          </p>
          <p className="font-sans text-xs text-white/40 text-center uppercase tracking-widest">
            © 2026 Mohit Agarwal · Built with 🔥 &amp; Precision
          </p>
          <p className="font-mono text-[0.6rem] text-white/30 uppercase tracking-widest">
            Next.js · Framer · Tailwind
          </p>
        </div>
      </motion.footer>
    </section>
  );
}
