"use client";

import { useEffect, useRef, useState } from "react";
import Splitrveal from "@/components/Splitrveal";
import Magnetic from "@/components/Magnetic";
import NavBar from "@/components/NavBar";


export default function EnhancedHeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showScroll, setShowScroll] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Track mouse for glow effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    // Hide scroll indicator on scroll
    const handleScroll = () => {
      setShowScroll(window.scrollY <= 100);
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
      {/* Background Layers */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black via-black to-black/80" />

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 -z-10 opacity-[0.03]">
        <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_24%,rgba(255,255,255,.1)_25%,rgba(255,255,255,.1)_26%,transparent_27%,transparent_74%,rgba(255,255,255,.1)_75%,rgba(255,255,255,.1)_76%,transparent_77%,transparent)] bg-[size:50px_50px]" />
      </div>

      {/* Mouse Tracking Glow */}
      <div
        className="absolute pointer-events-none -z-10"
        style={{
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)",
          transform: `translate(${mousePos.x - 200}px, ${mousePos.y - 200}px)`,
          transition: "transform 0.3s ease-out",
        }}
      />

      {/* Decorative Corners */}
      <div className="absolute top-0 right-0 w-32 h-32 md:w-48 md:h-48 pointer-events-none opacity-10">
        <div className="w-full h-full border-r-2 border-t-2 border-white" />
      </div>
      <div className="absolute bottom-0 left-0 w-32 h-32 md:w-48 md:h-48 pointer-events-none opacity-10">
        <div className="w-full h-full border-l-2 border-b-2 border-white" />
      </div>

      {/* Navigation */}
      <NavBar />

      {/* Main Content */}
      <div className="relative w-full max-w-6xl">
        {/* Status Indicator */}
        <div
          className="absolute -top-12 left-0 flex items-center gap-2 md:gap-3 opacity-70"
          style={{ animation: "fadeIn 0.8s ease-out both" }}
        >
          <div className="w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full animate-pulse" />
          <span className="text-[10px] md:text-xs tracking-[0.2em] font-bold text-white/70">
            AVAILABLE FOR WORK
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="w-full font-display uppercase text-white/95 leading-[0.78] tracking-tighter select-none" style={{ fontSize: "clamp(56px, 14vw, 220px)" }}>
          {/* FULL */}
          <div className="relative overflow-hidden py-2">
            <Splitrveal text="FULL" delay={0} />
          </div>

          {/* STACK */}
          <div className="relative overflow-hidden py-2">
            <Splitrveal text="STACK" baseDelay={0.1} delay={0.15} />
          </div>

          {/* DEV with Pulsing Dot */}
          <div className="relative overflow-hidden py-2 flex items-end gap-3 md:gap-5">
            <Splitrveal text="DEV" baseDelay={0.2} delay={0.3} />
            <div
              className="inline-block bg-white/90 rounded-full flex-shrink-0"
              style={{
                width: "0.55em",
                height: "0.55em",
                animation: "pulseGlow 2s ease-in-out infinite",
                animationDelay: "0.8s",
              }}
            />
          </div>
        </h1>

        {/* Subtitle */}
        <p
          className="mt-8 md:mt-12 max-w-2xl text-base md:text-lg leading-relaxed text-white/60 font-light tracking-wide"
          style={{
            animation: "fadeInUp 0.8s ease-out 0.4s both",
          }}
        >
          Building modern web applications with clean design, scalable architecture and memorable user experiences.
        </p>

        {/* CTA Buttons */}
        <div
          className="mt-10 md:mt-16 flex flex-wrap gap-4"
          style={{
            animation: "fadeInUp 0.8s ease-out 0.5s both",
          }}
        >
          <Magnetic strength={0.3}>
            <a
              href="#work"
              className="group inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 border-2 border-white/70 hover:border-white text-xs md:text-sm tracking-[0.15em] font-bold uppercase transition-all duration-300 hover:bg-white hover:text-black relative overflow-hidden"
            >
              Explore Projects
              <svg
                className="w-3 h-3 md:w-4 md:h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </Magnetic>

          <Magnetic strength={0.3}>
            <a
              href="/Zoha_Malik_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 md:px-8 py-3 md:py-4 border-2 border-white/70 hover:border-white hover:bg-white hover:text-black text-xs md:text-sm tracking-[0.15em] font-bold uppercase transition-all duration-300"
            >
              Download Resume
            </a>
          </Magnetic>
        </div>
      </div>

      {/* Scroll Indicator */}
      {showScroll && (
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          style={{ animation: "bounce 2s ease-in-out infinite" }}
        >
          <svg
            className="w-6 h-6 text-white/50"
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

      {/* Animations */}
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

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
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
      `}</style>
    </section>
  );
}