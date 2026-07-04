"use client";
import { useEffect, useRef } from "react";

/**
 * Wraps a full-height section in `position: sticky`. Because each section
 * in the page stacks in DOM order with increasing z-index, later sections
 * slide up and cover earlier ones as you scroll — the "pinned stack" effect.
 * On top of that, this component tracks how far a section has been scrolled
 * past (once pinned) and applies a subtle scale-down + dim, so the section
 * being covered visibly recedes instead of just vanishing underneath.
 */
export default function StickySection({
  children,
  id,
  zIndex,
  className = "",
}: {
  children: React.ReactNode;
  id?: string;
  zIndex: number;
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let ticking = false;

    const update = () => {
      ticking = false;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;

      // Once the section's top has passed the viewport top, start receding.
      const scrolledPast = Math.max(0, -rect.top);
      const progress = Math.min(1, scrolledPast / vh);

      const scale = 1 - progress * 0.08;
      const brightness = 1 - progress * 0.3;

      el.style.transform = `scale(${scale})`;
      el.style.filter = `brightness(${brightness})`;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        raf = requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id={id}
      style={{ zIndex, willChange: "transform, filter" }}
      className={`sticky top-0 ${className}`}
    >
      {children}
    </section>
  );
}