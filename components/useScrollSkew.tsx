"use client";
import { useEffect } from "react";

/**
 * Applies a subtle skewY to the given element based on scroll velocity —
 * the classic "text distorts as you fling-scroll, settles when you stop"
 * effect. Pure rAF + scroll listener, no dependency.
 */
export function useScrollSkew(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    let lastY = window.scrollY;
    let velocity = 0;
    let raf = 0;

    const update = () => {
      const currentY = window.scrollY;
      const diff = currentY - lastY;
      lastY = currentY;

      // smooth toward the new velocity so it eases rather than snaps
      velocity += (diff - velocity) * 0.12;

      const skew = Math.max(-6, Math.min(6, velocity * 0.6));
      if (ref.current) {
        ref.current.style.transform = `skewY(${skew}deg)`;
      }

      raf = requestAnimationFrame(update);
    };

    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [ref]);
}