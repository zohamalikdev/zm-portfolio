"use client";

import { useState } from "react";
import MsPaintWindow from "@/components/MsPaintWindow";
import { playClick } from "@/components/Sound";

// ---------------------------------------------------------------------------
// Static resume data (Standardized headers and plain layout for ATS mapping)
// ---------------------------------------------------------------------------

interface SkillItem {
  name: string;
  level: string;
}

const CORE_STACK: SkillItem[] = [
  { name: "React.js", level: "Intermediate" },
  { name: "Next.js", level: "Beginner" },
  { name: "Node.js / Express.js", level: "Beginner" },
  { name: "PostgreSQL / MySQL", level: "Intermediate" },
  { name: "JavaScript / TypeScript", level: "Intermediate" },
  { name: "Tailwind CSS", level: "Intermediate" },
  { name: "Git / GitHub", level: "Intermediate" },
  { name: "REST API Development", level: "Intermediate" },
];

const ATTRIBUTES: string[] = [
  "REST API Development",
  "Git & Version Control",
  "Relational Database Design",
  "Serverless Application Development",
];

const PERKS: string[] = ["AWS GameDay Competitor", "Graphic Designing"];

const EXPERIENCE_BULLETS: string[] = [
  "Built scalable full-stack web applications using modern web development technologies.",
  "Designed efficient database structures and implemented secure backend functionality with REST APIs.",
  "Developed responsive, user-friendly interfaces while maintaining clean, modular, and maintainable code.",
];

export default function ResumeWindow() {
  const [systemOnline] = useState(true);

  const handleActionClick = () => {
    playClick();
  };

  return (
    <section
      id="resume"
      className="relative min-h-screen flex items-center justify-center px-3 md:px-8 py-12 md:py-20 bg-transparent text-black select-none"
    >
      <div className="w-full max-w-6xl">
        <MsPaintWindow
          title="resume.bmp - Paint"
          icon="/projects/paint.png"
          statusText="For Help, click Help Topics on the Help Menu."
          activeTool="text"
        >
          {/* CANVAS INTERIOR: High-Contrast Magazine Style Optimized for ATS Parsing */}
          <div className="bg-white border-[3px] border-black text-black w-full min-h-full p-6 md:p-10 font-serif shadow-[6px_6px_0px_rgba(0,0,0,1)] tracking-tight">
            {/* Header Layout Component */}
            <div className="border-b-[4px] border-black pb-4 mb-8 flex flex-col sm:flex-row justify-between items-baseline gap-2">
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-sans uppercase tracking-tighter leading-none">
                  ZOHA MALIK
                </h1>
                <p className="text-xs font-mono font-bold tracking-widest uppercase mt-2 text-neutral-600">
                  Software Engineering & Full-Stack Web Development
                </p>
              </div>
              <div className="font-mono text-[10px] uppercase text-neutral-500 tracking-wider">
                [EDITION 2026 // RESUME]
              </div>
            </div>

            {/* ATS-Optimized Single Column Linear Flow */}
            <div className="space-y-8 max-w-3xl">
              {/* 1. Summary Section */}
              <div className="space-y-2">
                <h2 className="font-sans font-black text-sm uppercase tracking-wider bg-black text-white px-2 py-0.5 inline-block">
                  Professional Summary
                </h2>
                <p className="text-sm leading-relaxed text-neutral-800 antialiased pt-1">
                  Full-Stack Software Engineer specializing in web application development, database management,
                  and responsive UI design. Experienced in developing scalable applications, integrating backend
                  services, and building secure, user-friendly solutions using modern development practices.
                </p>
              </div>

              {/* 2. Core Experience Section */}
              <div className="space-y-3">
                <h2 className="font-sans font-black text-sm uppercase tracking-wider bg-black text-white px-2 py-0.5 inline-block">
                  Professional Experience
                </h2>

                <div className="space-y-4">
                  <div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline font-sans font-bold text-xs uppercase tracking-tight">
                      <span className="text-neutral-900">Independent Full Stack Developer</span>
                      <span className="font-mono text-[11px] text-neutral-500">2024 — Present</span>
                    </div>
                    <ul className="mt-2 space-y-2 text-xs text-neutral-700 list-disc pl-4 font-sans leading-relaxed">
                      {EXPERIENCE_BULLETS.map((bullet, idx) => (
                        <li key={idx} className="marker:text-black">{bullet}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* 3. Tech Stack Matrix */}
              <div className="space-y-3">
                <h2 className="font-sans font-black text-sm uppercase tracking-wider bg-black text-white px-2 py-0.5 inline-block">
                  Technical Skills
                </h2>
                <p className="text-xs font-mono text-neutral-800 leading-relaxed">
                  <strong>Core Stack:</strong> {CORE_STACK.map((s) => `${s.name} (${s.level})`).join(", ")}
                </p>
                <p className="text-xs font-mono text-neutral-800 leading-relaxed">
                  <strong>Methodologies:</strong> {ATTRIBUTES.join(", ")}
                </p>
              </div>

              {/* 4. Education History */}
              <div className="space-y-2">
                <h2 className="font-sans font-black text-sm uppercase tracking-wider bg-black text-white px-2 py-0.5 inline-block">
                  Education
                </h2>
                <div className="pt-1">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline font-sans font-bold text-xs uppercase tracking-tight">
                    <span>Bachelor of Science in Computer Science</span>
                    <span className="font-mono text-[11px] text-neutral-500">2023 — 2027</span>
                  </div>
                  <p className="text-xs text-neutral-600 mt-0.5 font-mono">
                    National University of Modern Languages
                  </p>
                </div>
              </div>

              {/* 5. Projects & Accomplishments */}
              <div className="space-y-3">
                <h2 className="font-sans font-black text-sm uppercase tracking-wider bg-black text-white px-2 py-0.5 inline-block">
                  Honors & Certifications
                </h2>
                <ul className="space-y-1.5 font-mono text-xs text-neutral-800 tracking-tight">
                  {PERKS.map((perk, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="text-[9px]">■</span> {perk}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </MsPaintWindow>

        {/* System Action Tray — separate strip below the window, not fighting
            with MsPaintWindow's own internal status bar */}
        <div className="border-2 border-t-0 border-black bg-[#bfbfbf] px-3 py-1.5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 text-xs">
          <span className="text-gray-800 font-sans flex items-center gap-1.5 select-none self-center sm:self-auto">
            <span
              className={`w-2.5 h-2.5 inline-block border border-t-black border-l-black border-b-white border-r-white ${
                systemOnline ? "bg-green-600" : "bg-gray-500"
              }`}
            />
            Status: {systemOnline ? "Online" : "Ready"}
          </span>

          <div className="flex flex-wrap items-center justify-end gap-1 font-sans">
            <button
              onClick={() => {
                handleActionClick();
                window.print();
              }}
              className="px-3 py-1 border-2 border-b-black border-r-black border-t-white border-l-white bg-[#bfbfbf]
                         active:border-t-black active:border-l-black active:border-b-white active:border-r-white
                         text-black rounded-none font-medium cursor-pointer text-xs"
            >
              Print
            </button>
            <a
              href="/Zoha_Malik_Resume.pdf"
              download
              onClick={handleActionClick}
              className="px-3 py-1 border-2 border-b-black border-r-black border-t-white border-l-white bg-[#bfbfbf]
                         active:border-t-black active:border-l-black active:border-b-white active:border-r-white
                         text-black rounded-none font-medium text-center cursor-pointer text-xs"
            >
              Download
            </a>
            <a
              href="https://www.linkedin.com/in/zohamalik-/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleActionClick}
              className="px-3 py-1 border-2 border-b-black border-r-black border-t-white border-l-white bg-[#bfbfbf]
                         active:border-t-black active:border-l-black active:border-b-white active:border-r-white
                         text-black rounded-none font-medium text-center cursor-pointer text-xs"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}