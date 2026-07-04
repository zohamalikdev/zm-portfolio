"use client";
import { useRef, useState } from "react";
import Image from "next/image";

type ProjectCard3DProps = {
  title: string;
  description: string;
  year: string;
  tags: string[];
  image?: string;
  liveHref: string;
  githubHref?: string;
};

function GithubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.5 0 12.3c0 5.44 3.44 10.05 8.21 11.68.6.11.82-.27.82-.6 0-.29-.01-1.06-.02-2.08-3.34.75-4.04-1.66-4.04-1.66-.55-1.44-1.34-1.82-1.34-1.82-1.09-.77.08-.76.08-.76 1.21.09 1.84 1.28 1.84 1.28 1.07 1.87 2.81 1.33 3.5 1.02.11-.79.42-1.33.76-1.64-2.67-.31-5.47-1.38-5.47-6.13 0-1.35.47-2.46 1.24-3.32-.12-.31-.54-1.57.12-3.28 0 0 1.01-.33 3.3 1.27.96-.27 1.98-.41 3-.42 1.02.01 2.04.15 3 .42 2.29-1.6 3.3-1.27 3.3-1.27.66 1.71.24 2.97.12 3.28.77.86 1.24 1.97 1.24 3.32 0 4.76-2.8 5.82-5.48 6.12.43.38.81 1.13.81 2.28 0 1.64-.02 2.97-.02 3.37 0 .33.22.72.83.6C20.57 22.34 24 17.74 24 12.3 24 5.5 18.63 0 12 0z" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="square" strokeLinejoin="miter" />
    </svg>
  );
}

export default function Projectcard({
  title,
  description,
  year,
  tags,
  image,
  liveHref,
  githubHref,
}: ProjectCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - centerY) / (rect.height / 2);

    // Clamp values between -1 and 1
    const clampX = Math.max(-1, Math.min(1, x));
    const clampY = Math.max(-1, Math.min(1, y));

    // Calculate tilt (rotate Y is opposite of mouse X)
    setTilt({
      x: clampY * 8, // rotateX based on vertical mouse position
      y: clampX * -8, // rotateY based on horizontal mouse position
    });

    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      className="group relative border-4 border-current perspective"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: "1000px",
      }}
    >
      {/* 3D Container */}
      <div
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: "preserve-3d",
          transition: "transform 0.1s ease-out",
          transitionDuration: "0.15s",
        }}
      >
        {/* ===== PREVIEW ===== */}
        <div className="relative aspect-[16/10] border-b-4 border-current overflow-hidden bg-black/5">
          {image ? (
            <Image
              src={image}
              alt={`${title} preview`}
              fill
              className="object-cover object-top grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center brutal-tag opacity-40">
              [ ADD PREVIEW IMAGE ]
            </div>
          )}

          {/* Enhanced gradient overlay on hover */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.1) 0%, transparent 50%)`,
            }}
          />

          {/* Year badge */}
          <div className="absolute top-4 left-4 bg-white text-black border-2 border-black px-3 py-1 text-xs font-bold tracking-wide transform transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1">
            {year}
          </div>

          {/* Icon links with enhanced hover */}
          <div className="absolute top-4 right-4 flex gap-2 transform transition-all duration-300 group-hover:scale-110">
            {githubHref && (
              <a
                href={githubHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${title} on GitHub`}
                className="w-9 h-9 flex items-center justify-center bg-white text-black border-2 border-black hover:bg-black hover:text-white transition-all duration-200 hover:scale-125"
              >
                <GithubIcon />
              </a>
            )}
            <a
              href={liveHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${title} live site`}
              className="w-9 h-9 flex items-center justify-center bg-white text-black border-2 border-black hover:bg-black hover:text-white transition-all duration-200 hover:scale-125"
            >
              <ExternalLinkIcon />
            </a>
          </div>
        </div>

        {/* ===== INFO ===== */}
        <div className="p-6 md:p-8 bg-current text-white/80">
          <div className="flex items-start justify-between gap-4 mb-4">
            <h3 className="text-3xl md:text-4xl font-display uppercase leading-none group-hover:translate-x-2 transition-transform duration-300">
              {title}
            </h3>
            <div className="flex gap-2 shrink-0 flex-wrap justify-end">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="border-2 border-white/40 px-2 py-1 text-[11px] font-bold uppercase tracking-wide opacity-60 group-hover:opacity-100 group-hover:border-white transition-all duration-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <p className="text-base md:text-lg opacity-70 group-hover:opacity-90 leading-relaxed transition-opacity duration-300">
            {description}
          </p>

          {/* Hover CTA that appears */}
          <div className="mt-4 transform opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <a
              href={liveHref}
              className="inline-block text-xs font-bold tracking-widest border-2 border-white/40 hover:border-white px-4 py-2 transition-all duration-200 hover:bg-white hover:text-black"
            >
              VIEW PROJECT →
            </a>
          </div>
        </div>
      </div>

      {/* Subtle shadow that responds to tilt */}
      <div
        className="absolute inset-0 -z-10 bg-black/20 blur-xl transition-all duration-300"
        style={{
          transform: `translateZ(-100px) rotateX(${tilt.x * 0.5}deg) rotateY(${tilt.y * 0.5}deg)`,
          opacity: Math.abs(tilt.x) + Math.abs(tilt.y) > 5 ? 0.3 : 0.1,
        }}
      />
    </div>
  );
}