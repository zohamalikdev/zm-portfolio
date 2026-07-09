"use client";
import { useEffect, useRef } from "react";

export default function EnhancedCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const targetPos = useRef({ x: -100, y: -100 });
  const hovering = useRef(false);

  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;

    const move = (e: MouseEvent) => {
      targetPos.current.x = e.clientX;
      targetPos.current.y = e.clientY;
      const target = e.target as HTMLElement;
      hovering.current = !!target.closest("a, button, input, textarea");
    };

    window.addEventListener("mousemove", move, { passive: true });

    let raf = 0;
    const render = () => {
      el.style.transform = `translate(${targetPos.current.x}px, ${targetPos.current.y}px) scale(${
        hovering.current ? 1.25 : 1
      })`;
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      /*  Bumped z-index to 100001 so it rides above all taskbar & shutdown layers */
      className="pointer-events-none fixed top-0 left-0 z-[100001] hidden md:block"
      style={{ willChange: "transform", transition: "transform 80ms linear" }}
    >
      {/* Classic Windows arrow cursor, drawn in CSS via clip-path */}
      <div
        className="w-6 h-6 bg-black border-2 border-white"
        style={{
          clipPath:
            "polygon(0 0, 0 70%, 25% 55%, 40% 85%, 55% 78%, 40% 48%, 70% 48%)",
        }}
      />
    </div>
  );
}