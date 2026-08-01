"use client";

import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import CaseStudies from "@/components/CaseStudies";
import Achievements from "@/components/Achievements";
import Education from "@/components/Education";
import Certificates from "@/components/Certificates";
import Extracurriculars from "@/components/Extracurriculars";
import Contact from "@/components/Contact";
import Nav from "@/components/Nav";
import ScrollProgress from "@/components/ScrollProgress";

// Cursor only on client (no SSR — it reads window)
const Cursor = dynamic(() => import("@/components/Cursor"), { ssr: false });

export default function Home() {
  return (
    <>
      {/* Global chrome */}
      <Cursor />
      <ScrollProgress />
      <Nav />

      <main>
        {/* 1 · Hero ─────────────────────────────── */}
        <Hero />

        {/* 2 · Kinetic skills marquee ──────────── */}
        <Marquee />

        {/* 3 · Case Studies ────────────────────── */}
        <CaseStudies />

        {/* 4 · Achievements timeline ───────────── */}
        <Achievements />

        {/* 5 · Education ───────────────────────── */}
        <Education />

        {/* 6 · Certificates & Gallery ──────────── */}
        <Certificates />

        {/* 7 · Extracurriculars ────────────────── */}
        <Extracurriculars />

        {/* 8 · Contact + Footer ────────────────── */}
        <Contact />
      </main>
    </>
  );
}
