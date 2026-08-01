"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";

import Nav           from "@/components/Nav";
import Hero          from "@/components/Hero";
import Marquee       from "@/components/Marquee";
import CaseStudies   from "@/components/CaseStudies";
import Achievements  from "@/components/Achievements";
import Education     from "@/components/Education";
import Certificates  from "@/components/Certificates";
import Extracurriculars from "@/components/Extracurriculars";
import Contact       from "@/components/Contact";
import ScrollProgress from "@/components/ScrollProgress";

const Cursor      = dynamic(() => import("@/components/Cursor"),      { ssr: false });
const DragonIntro = dynamic(() => import("@/components/DragonIntro"), { ssr: false });

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);
  const handleIntroComplete = useCallback(() => setIntroComplete(true), []);

  return (
    <>
      {/* ── Dragon intro — shows until dismissed ── */}
      <AnimatePresence>
        {!introComplete && (
          <DragonIntro onComplete={handleIntroComplete} />
        )}
      </AnimatePresence>

      {/* ── Main site — fades in after intro ── */}
      <AnimatePresence>
        {introComplete && (
          <motion.div
            key="site"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <Cursor />
            <ScrollProgress />
            <Nav />

            <main>
              <Hero />
              <Marquee />
              <CaseStudies />
              <Achievements />
              <Education />
              <Certificates />
              <Extracurriculars />
              <Contact />
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
