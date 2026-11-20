"use client";

import { useEffect, useRef } from "react";
import { useMotionValue, useSpring } from "framer-motion";

/**
 * Returns a smoothed motion value representing scroll velocity.
 * Positive = scrolling down, negative = scrolling up.
 * Used to drive skew/tilt effects on scroll.
 */
export function useScrollVelocity(smoothing = 50) {
  const velocity = useMotionValue(0);
  const smoothVelocity = useSpring(velocity, {
    damping: smoothing,
    stiffness: 400,
  });

  const lastScrollY = useRef(
    typeof window !== "undefined" ? window.scrollY : 0
  );
  const lastTime = useRef(performance.now());
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const measure = () => {
      const now = performance.now();
      const dt = now - lastTime.current || 1;
      const dy = window.scrollY - lastScrollY.current;
      const v = dy / dt; // px/ms

      velocity.set(v * 1000); // scale to px/s for more dramatic effect

      lastScrollY.current = window.scrollY;
      lastTime.current = now;
      rafId.current = requestAnimationFrame(measure);
    };

    rafId.current = requestAnimationFrame(measure);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [velocity]);

  return smoothVelocity;
}
