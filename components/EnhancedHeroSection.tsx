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
    // Track mouse position for light effect
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    // Hide scroll indicator on scroll
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrollIndicator(false);
      } else {
        setScrollIndicator(true);
      }
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
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black via-black to-black/80" />

      {/* Subtle animated grid */}
      <div className="absolute inset-0 -z-10 opacity-[0.03]">
        <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_24%,rgba(255,255,255,.1)_25%,rgba(255,255,255,.1)_26%,transparent_27%,transparent_74%,rgba(255,255,255,.1)_75%,rgba(255,255,255,.1)_76%,transparent_77%,transparent)] bg-[size:50px_50px]" />
      </div>

      {/* Glow effect that follows mouse */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none -z-10"
        style={{
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)",
          transform: `translate(${mousePos.x - 200}px, ${mousePos.y - 200}px)`,
          transition: "transform 0.3s ease-out",
        }}
      />

      {/* Navigation - Top Right */}
      <nav className="absolute top-12 md:top-16 right-8 md:right-16 text-right z-20">
        <div className="space-y-3 md:space-y-4">
          {navItems.map((item, index) => (
            <a
              key={item.label}
              href={item.href}
              className={`group block text-xs md:text-sm tracking-widest transition-all duration-300 relative ${
                item.highlight
                  ? "font-bold text-white"
                  : "opacity-60 hover:opacity-100 text-white/80"
              }`}
              style={{
                animation: `slideInDown 0.5s ease-out ${index * 0.05}s both`,
              }}
            >
              {/* Animated underline on hover */}
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

      {/* Main Content */}
      <div className="relative w-full max-w-6xl">
        {/* Status indicator */}
        <div className="absolute -top-12 left-0 flex items-center gap-2 md:gap-3 opacity-70 animate-fadeIn">
          <div className="w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full animate-pulse" />
          <span className="text-[10px] md:text-xs tracking-[0.2em] font-bold text-white/70">
            AVAILABLE FOR WORK
          </span>
        </div>

        {/* Main Hero Title with enhanced styling */}
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
            <Splitrveal text="STACK" baseDelay={0.1} 
            delay={0.15} />
          </div>
          
          {/* DEV with animated dot */}
          <div className="relative overflow-hidden py-2 flex items-end gap-3 md:gap-5">
            <Splitrveal text="DEV" baseDelay={0.2} delay={0.3} />
            
            {/* Animated circle that pulses */}
            <div className="relative flex items-end mb-[0.08em]">
              <div
                className="inline-block bg-white/90 rounded-full"
                style={{
                  width: "0.55em",
                  height: "0.55em",
                  animation: "pulseGlow 2s ease-in-out infinite",
                  boxShadow: "0 0 30px rgba(255, 255, 255, 0.3)",
                }}
              />
            </div>
          </div>
        </h1>

        {/* Subtitle with fade-in animation */}
        <p
          className="mt-8 md:mt-12 text-sm md:text-base tracking-[0.15em] text-white/60 font-light"
          style={{
            animation: "fadeInUp 0.8s ease-out 0.4s both",
          }}
        >
          CRAFTING DIGITAL EXPERIENCES THAT MATTER
        </p>

        {/* CTA Button - Magnetic hover effect */}
        <div
          className="mt-10 md:mt-16"
          style={{
            animation: "fadeInUp 0.8s ease-out 0.5s both",
          }}
        >
          <Magnetic>
            <a
              href="#work"
              className="group inline-flex items-center gap-3 md:gap-4 px-6 md:px-8 py-3 md:py-4 border-2 border-white/70 hover:border-white text-xs md:text-sm tracking-[0.15em] font-bold uppercase transition-all duration-300 hover:bg-white hover:text-black relative overflow-hidden"
            >
              <span className="relative z-10">Explore Projects</span>
              <svg
                className="w-3 h-3 md:w-4 md:h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              
              {/* Animated background on hover */}
              <div className="absolute inset-0 bg-white -z-10 transform -skew-x-12 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </a>
          </Magnetic>
        </div>
      </div>

      {/* Scroll Indicator - animated arrow at bottom */}
      {scrollIndicator && (
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          style={{
            animation: "bounce 2s ease-in-out infinite",
          }}
        >
          <svg
            className="w-5 h-5 md:w-6 md:h-6 text-white/50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      )}

      {/* Decorative elements - corner accents */}
      <div className="absolute top-0 right-0 w-32 h-32 md:w-48 md:h-48 pointer-events-none opacity-10">
        <div className="w-full h-full border-r-2 border-t-2 border-white" />
      </div>

      <div className="absolute bottom-0 left-0 w-32 h-32 md:w-48 md:h-48 pointer-events-none opacity-10">
        <div className="w-full h-full border-l-2 border-b-2 border-white" />
      </div>

      <style>{`
        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0) translateX(-50%);
          }
          50% {
            transform: translateY(-10px) translateX(-50%);
          }
        }

        @keyframes pulseGlow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
          }
          50% {
            box-shadow: 0 0 40px rgba(255, 255, 255, 0.4);
          }
        }

        /* Smooth text reveal animation */
        @keyframes textReveal {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}