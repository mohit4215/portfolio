"use client";

import { useRef, useCallback } from "react";
import { useSpring } from "framer-motion";

const SPRING_CONFIG = { stiffness: 400, damping: 18, mass: 0.6 };
const PULL_RADIUS = 80; // px — magnetic field radius
const PULL_STRENGTH = 0.35; // 0–1, how aggressively it pulls

export function useMagneticPull() {
  const ref = useRef<HTMLElement | null>(null);

  const x = useSpring(0, SPRING_CONFIG);
  const y = useSpring(0, SPRING_CONFIG);

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < PULL_RADIUS) {
        x.set(dx * PULL_STRENGTH);
        y.set(dy * PULL_STRENGTH);
      }
    },
    [x, y]
  );

  const onMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  const magneticRef = useCallback(
    (node: HTMLElement | null) => {
      if (ref.current) {
        ref.current.removeEventListener("mousemove", onMouseMove);
        ref.current.removeEventListener("mouseleave", onMouseLeave);
      }
      ref.current = node;
      if (node) {
        node.addEventListener("mousemove", onMouseMove);
        node.addEventListener("mouseleave", onMouseLeave);
      }
    },
    [onMouseMove, onMouseLeave]
  );

  return { magneticRef, x, y };
}
