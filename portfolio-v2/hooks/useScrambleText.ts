"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&";

interface UseScrambleOptions {
  /** How many animation frames each character scrambles before settling */
  scrambleFrames?: number;
  /** Delay between each character resolving, in ms */
  revealDelay?: number;
  /** Whether to trigger on mount automatically */
  autoPlay?: boolean;
}

export function useScrambleText(
  target: string,
  options: UseScrambleOptions = {}
) {
  const { scrambleFrames = 8, revealDelay = 40, autoPlay = true } = options;

  const [display, setDisplay] = useState(target);
  const [isPlaying, setIsPlaying] = useState(false);
  const frameRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef = useRef<number | null>(null);

  const randomChar = () => CHARS[Math.floor(Math.random() * CHARS.length)];

  const scramble = useCallback(() => {
    if (isPlaying) return;
    setIsPlaying(true);

    let revealedCount = 0;
    const totalChars = target.length;

    const step = () => {
      setDisplay((prev) => {
        const chars = prev.split("");
        // Randomise unrevealed characters
        for (let i = revealedCount; i < totalChars; i++) {
          chars[i] = randomChar();
        }
        return chars.join("");
      });

      frameRef.current = setTimeout(() => {
        // Reveal one more character at a time
        const framesForChar = scrambleFrames;
        let frame = 0;

        const revealFrame = () => {
          frame++;
          if (frame >= framesForChar) {
            setDisplay((prev) => {
              const chars = prev.split("");
              chars[revealedCount] = target[revealedCount];
              return chars.join("");
            });
            revealedCount++;
            if (revealedCount < totalChars) {
              frameRef.current = setTimeout(step, revealDelay);
            } else {
              setDisplay(target);
              setIsPlaying(false);
            }
          } else {
            setDisplay((prev) => {
              const chars = prev.split("");
              if (revealedCount < totalChars) chars[revealedCount] = randomChar();
              return chars.join("");
            });
            rafRef.current = requestAnimationFrame(revealFrame);
          }
        };

        rafRef.current = requestAnimationFrame(revealFrame);
      }, revealDelay);
    };

    step();
  }, [target, scrambleFrames, revealDelay, isPlaying]);

  useEffect(() => {
    if (autoPlay) {
      const t = setTimeout(scramble, 300);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep display in sync if target changes without scramble
  useEffect(() => {
    if (!isPlaying) setDisplay(target);
  }, [target, isPlaying]);

  useEffect(() => {
    return () => {
      if (frameRef.current) clearTimeout(frameRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return { display, scramble, isPlaying };
}
