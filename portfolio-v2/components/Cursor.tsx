"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const starRef  = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const star  = starRef.current;
    const trail = trailRef.current;
    if (!star || !trail) return;

    let mx = 0, my = 0, tx = 0, ty = 0;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      star.style.left = `${mx}px`;
      star.style.top  = `${my}px`;
    };

    const animate = () => {
      tx += (mx - tx) * 0.14;
      ty += (my - ty) * 0.14;
      trail.style.left = `${tx}px`;
      trail.style.top  = `${ty}px`;
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(animate);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <div ref={starRef}  className="cursor-star"  aria-hidden>⭐</div>
      <div ref={trailRef} className="cursor-trail" aria-hidden />
    </>
  );
}
