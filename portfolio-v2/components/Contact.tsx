"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Linkedin, Github, Mail, ArrowUpRight, CheckCircle } from "lucide-react";
import { useMagneticPull } from "@/hooks/useMagneticPull";
import { useInView } from "@/hooks/useInView";

const SOCIALS = [
  { icon: Linkedin, label: "LinkedIn",  href: "https://linkedin.com",                  accent: "#2563EB" },
  { icon: Github,   label: "GitHub",    href: "https://github.com",                     accent: "#18181B" },
  { icon: Mail,     label: "Email",     href: "mailto:mohitagarwal4215@gmail.com",       accent: "#FF4800" },
];

function MagneticSocial({ social }: { social: typeof SOCIALS[0] }) {
  const { magneticRef, x, y } = useMagneticPull();
  const Icon = social.icon;

  return (
    <motion.a
      ref={magneticRef as React.RefObject<HTMLAnchorElement>}
      href={social.href}
      target={social.href.startsWith("mailto") ? undefined : "_blank"}
      rel="noopener noreferrer"
      style={{ x, y }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      className="group flex items-center gap-3 border-2 border-white/20 px-5 py-3 hover:border-paper transition-colors duration-200"
      data-magnetic
    >
      <div
        className="w-8 h-8 border-2 border-white/20 flex items-center justify-center group-hover:border-paper/60 transition-colors"
        style={{ background: social.accent }}
      >
        <Icon size={15} color="#F3F1EA" />
      </div>
      <span className="font-mono text-xs uppercase tracking-widest text-white/60 group-hover:text-paper transition-colors">
        {social.label}
      </span>
      <ArrowUpRight
        size={14}
        className="text-white/30 group-hover:text-paper ml-auto transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </motion.a>
  );
}

type FormState = "idle" | "submitting" | "success" | "error";

export default function Contact() {
  const { ref: sectionRef, inView } = useInView<HTMLElement>({ threshold: 0.1 });
  const { magneticRef: submitRef, x: sx, y: sy } = useMagneticPull();

  const [formState, setFormState] = useState<FormState>("idle");
  const [fields, setFields] = useState({ name: "", email: "", message: "" });
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");
    // Simulate send — replace with your API / EmailJS call
    await new Promise((r) => setTimeout(r, 1400));
    setFormState("success");
    setFields({ name: "", email: "", message: "" });
    setTimeout(() => setFormState("idle"), 4000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="section-pad bg-paper border-b-2 border-charcoal"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* ── High-impact callout ───────────────────────────────── */}
        <div className="mb-16 border-2 border-charcoal overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-12 border-b-2 md:border-b-0 md:border-r-2 border-charcoal bg-charcoal flex flex-col justify-between gap-8">
              <motion.p
                className="font-mono text-xs uppercase tracking-[0.18em] text-orange"
                initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
              >
                ✦ Let&apos;s Connect
              </motion.p>

              <motion.h2
                className="font-display text-[clamp(2.8rem,6vw,5rem)] text-paper leading-[0.95] tracking-tight"
                initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, ease: [0.77, 0, 0.175, 1] }}
              >
                Get In<br />
                <span className="text-orange">Touch.</span>
              </motion.h2>

              <div>
                <p className="font-sans text-sm text-paper/50 mb-6 max-w-xs">
                  Have an interesting project or want to chat about tech, finance & business strategy?
                </p>
                <a
                  href="mailto:mohitagarwal4215@gmail.com"
                  className="font-mono text-xs uppercase tracking-widest text-paper border-b-2 border-orange pb-0.5 hover:text-orange transition-colors"
                >
                  mohitagarwal4215@gmail.com
                </a>
              </div>

              {/* Social links */}
              <div className="flex flex-col gap-2">
                {SOCIALS.map((s) => (
                  <MagneticSocial key={s.label} social={{
                    ...s,
                    // invert colors for dark bg
                  }} />
                ))}
              </div>
            </div>

            {/* ── Contact form ────────────────────────────────────── */}
            <div className="p-8 md:p-12 bg-paper">
              <AnimatePresence mode="wait">
                {formState === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center h-full gap-4 min-h-[320px]"
                  >
                    <CheckCircle size={48} className="text-cobalt" />
                    <h3 className="font-display text-2xl text-charcoal">Message Sent!</h3>
                    <p className="font-sans text-sm text-muted text-center">I&apos;ll get back to you within 24 hours.</p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    ref={formRef}
                    onSubmit={handleSubmit}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col gap-5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {(["name", "email"] as const).map((field) => (
                        <div key={field} className="flex flex-col gap-1.5">
                          <label className="font-mono text-[0.65rem] uppercase tracking-widest text-muted">
                            {field}
                          </label>
                          <input
                            type={field === "email" ? "email" : "text"}
                            name={field}
                            value={fields[field]}
                            onChange={handleChange}
                            required
                            placeholder={field === "email" ? "you@example.com" : "Your name"}
                            className="border-2 border-charcoal bg-paper px-4 py-3 font-sans text-sm text-charcoal placeholder:text-faint focus:outline-none focus:border-cobalt transition-colors"
                          />
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-[0.65rem] uppercase tracking-widest text-muted">
                        message
                      </label>
                      <textarea
                        name="message"
                        value={fields.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="Tell me what you're working on..."
                        className="border-2 border-charcoal bg-paper px-4 py-3 font-sans text-sm text-charcoal placeholder:text-faint focus:outline-none focus:border-cobalt transition-colors resize-none"
                      />
                    </div>

                    <motion.button
                      ref={submitRef as React.RefObject<HTMLButtonElement>}
                      type="submit"
                      style={{ x: sx, y: sy }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      disabled={formState === "submitting"}
                      className="flex items-center justify-center gap-3 bg-charcoal text-paper font-mono text-xs uppercase tracking-widest px-8 py-4 border-2 border-charcoal shadow-brutal hover:bg-cobalt hover:border-cobalt transition-colors duration-150 disabled:opacity-60"
                      data-magnetic
                    >
                      {formState === "submitting" ? (
                        <>
                          <span className="w-4 h-4 border-2 border-paper/30 border-t-paper rounded-full animate-spin" />
                          Sending…
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send size={14} />
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* ── Footer strip ──────────────────────────────────────── */}
      <footer className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t-2 border-charcoal pt-8">
          <p className="font-display text-2xl text-charcoal">M.A<span className="text-orange">.</span></p>
          <p className="font-mono text-xs text-muted uppercase tracking-widest text-center">
            © 2026 Mohit Agarwal · Built with Precision
          </p>
          <p className="font-mono text-[0.6rem] text-faint uppercase tracking-widest">
            Next.js · Framer Motion · Tailwind
          </p>
        </div>
      </footer>
    </section>
  );
}
