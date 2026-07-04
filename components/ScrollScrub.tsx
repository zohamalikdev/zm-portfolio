"use client";
import { useEffect, useRef } from "react";

/**
 * Like Reveal, but instead of flipping visible on/off at a threshold,
 * this drives opacity/translateY continuously off the element's actual
 * scroll position — the closer it gets to its "settled" point in the
 * viewport, the closer to progress = 1. Mimics a GSAP ScrollTrigger
 * scrub without the dependency.
 */
export default function ScrollScrub({
  children,
  className = "",
  distance = 60,
}: {
  children: React.ReactNode;
  className?: string;
  distance?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let active = false;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;

      const start = vh * 0.95; // element bottom-ish enters view
      const end = vh * 0.55; // "settled" point, a bit above center

      let progress = (start - rect.top) / (start - end);
      progress = Math.min(1, Math.max(0, progress));

      el.style.opacity = String(progress);
      el.style.transform = `translateY(${(1 - progress) * distance}px)`;

      if (active) raf = requestAnimationFrame(update);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        active = entry.isIntersecting;
        if (active) {
          raf = requestAnimationFrame(update);
        } else {
          cancelAnimationFrame(raf);
        }
      },
      { rootMargin: "20% 0px 20% 0px" }
    );

    io.observe(el);
    update();

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [distance]);

  return (
    <div
      ref={ref}
      className={`motion-reduce:opacity-100 motion-reduce:translate-y-0 ${className}`}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </div>
  );
}