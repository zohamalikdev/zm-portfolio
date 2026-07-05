"use client";

import { useEffect, useRef, useState } from "react";
import Splitrveal from "@/components/Splitrveal";
import Magnetic from "@/components/Magnetic";

interface NavItem {
  label: string;
  href: string;
  highlight?: boolean;
}

const navItems: NavItem[] = [
  { label: "Introduction", href: "#about" },
  { label: "Projects", href: "#work", highlight: true },
  { label: "Resume", href: "#resume" },
  { label: "Skills", href: "#skills", highlight: true },
  { label: "Services", href: "#contact" },
];

export default function EnhancedHeroSection() {
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollIndicator, setScrollIndicator] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    const handleScroll = () => {
      setScrollIndicator(window.scrollY <= 100);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-end px-8 md:px-16 py-24 bg-black text-white overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black via-black to-black/80" />

      <div className="absolute inset-0 -z-10 opacity-[0.03]">
        <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_24%,rgba(255,255,255,.1)_25%,rgba(255,255,255,.1)_26%,transparent_27%,transparent_74%,rgba(255,255,255,.1)_75%,rgba(255,255,255,.1)_76%,transparent_77%,transparent)] bg-[size:50px_50px]" />
      </div>

      <div
        className="absolute pointer-events-none -z-10"
        style={{
          width: "400px",
          height: "400px",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)",
          transform: `translate(${mousePos.x - 200}px, ${mousePos.y - 200}px)`,
          transition: "transform 0.3s ease-out",
        }}
      />

      <nav className="absolute top-12 md:top-16 right-8 md:right-16 text-right z-20">
        <div className="space-y-3 md:space-y-4">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`group block text-xs md:text-sm tracking-widest transition-all duration-300 ${
                item.highlight
                  ? "font-bold text-white"
                  : "opacity-60 hover:opacity-100 text-white/80"
              }`}
            >
              <span className="relative inline-block">
                {item.label}
                <span
                  className={`absolute bottom-0 left-0 h-px bg-white transition-all duration-300 ${
                    item.highlight ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </span>
            </a>
          ))}
        </div>
      </nav>

      <div className="relative w-full max-w-6xl">
        <div className="absolute -top-12 left-0 flex items-center gap-2 md:gap-3 opacity-70">
          <div className="w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full animate-pulse" />
          <span className="text-[10px] md:text-xs tracking-[0.2em] font-bold text-white/70">
            AVAILABLE FOR WORK
          </span>
        </div>

        <h1
          ref={heroTitleRef}
          className="w-full font-display uppercase text-white/95 leading-[0.78] tracking-tighter select-none"
          style={{
            fontSize: "clamp(56px, 14vw, 220px)",
            letterSpacing: "-0.02em",
          }}
        >
          <div className="relative overflow-hidden py-2">
            <Splitrveal text="FULL" delay={0} />
          </div>

          <div className="relative overflow-hidden py-2">
            <Splitrveal text="STACK" baseDelay={0.1} delay={0.15} />
          </div>

          <div className="relative overflow-hidden py-2 flex items-end gap-3 md:gap-5">
            <Splitrveal text="DEV" baseDelay={0.2} delay={0.3} />
            <div className="relative flex items-end mb-[0.08em]">
              <div
                className="inline-block bg-white/90 rounded-full"
                style={{
                  width: "0.55em",
                  height: "0.55em",
                  boxShadow: "0 0 30px rgba(255,255,255,0.3)",
                }}
              />
            </div>
          </div>
        </h1>

        <p className="mt-8 md:mt-12 text-sm md:text-base tracking-[0.15em] text-white/60 font-light">
          CRAFTING DIGITAL EXPERIENCES THAT MATTER
        </p>

        <div className="mt-10 md:mt-16 flex flex-wrap gap-4">
          <Magnetic>
            <a
              href="#work"
              className="group inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 border-2 border-white/70 hover:border-white text-xs md:text-sm tracking-[0.15em] font-bold uppercase transition-all duration-300 hover:bg-white hover:text-black relative overflow-hidden"
            >
              Explore Projects
            </a>
          </Magnetic>

          <Magnetic>
            <a
              href="/Zoha_Malik_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 md:px-8 py-3 md:py-4 border-2 border-white/70 hover:bg-white hover:text-black text-xs md:text-sm tracking-[0.15em] font-bold uppercase transition-all duration-300"
            >
              Resume
            </a>
          </Magnetic>
        </div>
      </div>

      {scrollIndicator && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          ↓
        </div>
      )}
    </section>
  );
}