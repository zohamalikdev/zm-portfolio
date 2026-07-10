"use client";

import { useState, type ReactNode } from "react";
import RetroWindow from "@/components/RetroWindow";
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
  { name: "REST API Development", level: "Intermediate" }

];

const ATTRIBUTES: string[] = [
  "REST API Development",
  "Git & Version Control",
  "Relational Database Design",
  "Serverless Application Development"
];

const PERKS: string[] = [
  "AWS GameDay Competitor",
  "Graphic Designing",
];

const EXPERIENCE_BULLETS: string[] = [
"Built scalable full-stack web applications using modern web development technologies.",
  "Designed efficient database structures and implemented secure backend functionality with REST APIs.",
  "Developed responsive, user-friendly interfaces while maintaining clean, modular, and maintainable code."
];

// ---------------------------------------------------------------------------
// Paint Toolbox Icons (Framing UI Only - Purely Visual)
// ---------------------------------------------------------------------------

interface ToolIcon {
  key: string;
  label: string;
  active?: boolean;
  svg: ReactNode;
}

const TOOL_ICONS: ToolIcon[] = [
  { key: "free-select", label: "Free-Form Select", svg: <svg viewBox="0 0 20 20" shapeRendering="crispEdges"><path d="M4 8 L6 4 L11 3 L16 6 L15 11 L11 16 L6 15 L3 11 Z" fill="none" stroke="#000" strokeWidth="1" strokeDasharray="1.6 1.4" /></svg> },
  { key: "rect-select", label: "Rectangular Select", svg: <svg viewBox="0 0 20 20" shapeRendering="crispEdges"><rect x="3.5" y="4.5" width="13" height="11" fill="none" stroke="#000" strokeWidth="1" strokeDasharray="1.6 1.4" /></svg> },
  { key: "eraser", label: "Eraser", svg: <svg viewBox="0 0 20 20" shapeRendering="crispEdges"><rect x="4" y="8" width="12" height="7" fill="#ff8fc7" stroke="#000" strokeWidth="1" /><rect x="4" y="8" width="12" height="3.2" fill="#ffffff" stroke="#000" strokeWidth="1" /></svg> },
  { key: "fill", label: "Fill With Color", svg: <svg viewBox="0 0 20 20" shapeRendering="crispEdges"><path d="M5 10 L11 4 L16 9 L10 15 Z" fill="#c0c0c0" stroke="#000" strokeWidth="1" /><path d="M10 15 L4 15 L4 17 L10 17 Z" fill="#0000ff" stroke="#000" strokeWidth="1" /><circle cx="15" cy="14" r="1.3" fill="#ff0000" stroke="#000" strokeWidth="0.6" /></svg> },
  { key: "picker", label: "Pick Color", svg: <svg viewBox="0 0 20 20" shapeRendering="crispEdges"><path d="M13 3 L17 7 L9 15 L5 15 L5 11 Z" fill="#ffffff" stroke="#000" strokeWidth="1" /><rect x="4" y="14" width="3" height="3" fill="#000" /></svg> },
  { key: "magnifier", label: "Magnifier", svg: <svg viewBox="0 0 20 20" shapeRendering="crispEdges"><rect x="3" y="3" width="14" height="10" fill="#ffffff" stroke="#000" strokeWidth="1" /><circle cx="8" cy="8" r="3" fill="none" stroke="#000" strokeWidth="1" /><line x1="10.2" y1="10.2" x2="12.5" y2="12.5" stroke="#000" strokeWidth="1.2" /></svg> },
  { key: "pencil", label: "Pencil", svg: <svg viewBox="0 0 20 20" shapeRendering="crispEdges"><path d="M5 15 L13 4 L16 6 L8 17 Z" fill="#ffd84a" stroke="#000" strokeWidth="1" /><path d="M5 15 L4 17 L6 16 Z" fill="#000" /></svg> },
  { key: "brush", label: "Brush", svg: <svg viewBox="0 0 20 20" shapeRendering="crispEdges"><path d="M11 3 L16 8 L9 15 L6 15 L6 12 Z" fill="#8fb8ff" stroke="#000" strokeWidth="1" /><path d="M6 12 L4 17 L9 15 Z" fill="#804000" stroke="#000" strokeWidth="1" /></svg> },
  { key: "airbrush", label: "Airbrush", svg: <svg viewBox="0 0 20 20" shapeRendering="crispEdges"><path d="M4 15 L9 10 L13 6 L16 4 L14 7 L11 11 L6 16 Z" fill="#c0c0c0" stroke="#000" strokeWidth="1" /><circle cx="6" cy="6" r="0.7" fill="#000" /><circle cx="9" cy="4.5" r="0.6" fill="#000" /><circle cx="4.5" cy="9" r="0.6" fill="#000" /></svg> },
  { key: "text", label: "Text", active: true, svg: <svg viewBox="0 0 20 20" shapeRendering="crispEdges"><text x="10" y="15" textAnchor="middle" fontFamily="Georgia, serif" fontWeight="bold" fontSize="13" fill="#000000">A</text></svg> },
  { key: "line", label: "Line", svg: <svg viewBox="0 0 20 20" shapeRendering="crispEdges"><line x1="4" y1="16" x2="16" y2="4" stroke="#000" strokeWidth="1.4" /></svg> },
  { key: "curve", label: "Curve", svg: <svg viewBox="0 0 20 20" shapeRendering="crispEdges"><path d="M3 14 C 7 4, 13 16, 17 6" fill="none" stroke="#000" strokeWidth="1.3" /></svg> },
  { key: "rectangle", label: "Rectangle", svg: <svg viewBox="0 0 20 20" shapeRendering="crispEdges"><rect x="4" y="5" width="12" height="10" fill="none" stroke="#000" strokeWidth="1.3" /></svg> },
  { key: "polygon", label: "Polygon", svg: <svg viewBox="0 0 20 20" shapeRendering="crispEdges"><path d="M5 15 L4 8 L10 4 L16 7 L14 15 Z" fill="none" stroke="#000" strokeWidth="1.3" /></svg> },
  { key: "ellipse", label: "Ellipse", svg: <svg viewBox="0 0 20 20" shapeRendering="crispEdges"><ellipse cx="10" cy="10" rx="6.5" ry="5" fill="none" stroke="#000" strokeWidth="1.3" /></svg> },
  { key: "rounded-rect", label: "Rounded Rectangle", svg: <svg viewBox="0 0 20 20" shapeRendering="crispEdges"><rect x="4" y="5" width="12" height="10" rx="3" fill="none" stroke="#000" strokeWidth="1.3" /></svg> },
];

const COLOR_PALETTE: string[] = [
  "#000000", "#808080", "#800000", "#808000", "#008000", "#008080", "#000080",
  "#800080", "#808040", "#004040", "#0080ff", "#004080", "#4000ff", "#804000",
  "#ffffff", "#c0c0c0", "#ff0000", "#ffff00", "#00ff00", "#00ffff", "#0000ff",
  "#ff00ff", "#ffff80", "#00ff80", "#80ffff", "#8080ff", "#ff8000", "#ff8080",
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
      <RetroWindow
        title="resume.bmp - Paint"
        icon="/projects/paint.png"
        statusText="For Help, click Help Topics on the Help Menu."
      >
        {/* Main Interface */}
        <div className="bg-[#bfbfbf] p-1 font-sans text-xs flex flex-col shadow-[inset_1px_1px_0_#ffffff]">

          {/* Menu Strip */}
          <div className="flex items-center gap-4 px-2 py-1 border-b border-[#808080] text-gray-900">
            <span className="cursor-default"><span className="underline">F</span>ile</span>
            <span className="cursor-default"><span className="underline">E</span>dit</span>
            <span className="cursor-default"><span className="underline">V</span>iew</span>
            <span className="cursor-default"><span className="underline">I</span>mage</span>
            <span className="cursor-default"><span className="underline">C</span>olors</span>
            <span className="cursor-default"><span className="underline">H</span>elp</span>
          </div>

          {/* App Workspace Frame */}
          <div className="flex items-stretch gap-1 p-1 bg-[#bfbfbf] min-h-[600px]">

            {/* Sidebar Tools Wrapper */}
            <div className="flex flex-col gap-0.5 p-1 bg-[#bfbfbf] self-start w-[56px] shrink-0">
              <div className="grid grid-cols-2 gap-0.5">
                {TOOL_ICONS.map((tool) => (
                  <div
                    key={tool.key}
                    title={tool.label}
                    className={`w-6 h-6 flex items-center justify-center cursor-pointer select-none
                      ${tool.active
                        ? "bg-[#dfdfdf] border-2 border-t-[#808080] border-l-[#808080] border-b-white border-r-white shadow-[inset_1px_1px_1px_rgba(0,0,0,0.35)]"
                        : "bg-[#bfbfbf] border-2 border-t-white border-l-white border-b-[#808080] border-r-[#808080] active:border-t-[#808080] active:border-l-[#808080] active:border-b-white active:border-r-white"
                      }`}
                  >
                    <div className="w-[18px] h-[18px]">{tool.svg}</div>
                  </div>
                ))}
              </div>
              <div className="h-11 mt-1 bg-[#bfbfbf] border-2 border-t-[#808080] border-l-[#808080] border-b-white border-r-white p-1 flex items-center justify-center">
                <div className="w-full h-full bg-[#bfbfbf] border border-t-[#808080] border-l-[#808080] border-b-white border-r-white flex flex-col justify-center gap-1 px-2">
                  <div className="w-full h-[4px] bg-black" />
                  <div className="w-full h-[2px] bg-black" />
                  <div className="w-2/3 h-[1px] bg-black" />
                </div>
              </div>
            </div>

            {/* CANVAS INTERIOR: High-Contrast Magazine Style Optimized for ATS Parsing */}
            <div className="flex-1 bg-[#262626] p-4 overflow-auto">
              <div className="bg-white border-[3px] border-black text-black min-h-full p-6 md:p-10 font-serif shadow-[6px_6px_0px_rgba(0,0,0,1)] tracking-tight">

                {/* Header Layout Component */}
                <div className="border-b-[4px] border-black pb-4 mb-8 flex flex-col sm:flex-row justify-between items-baseline gap-2">
                  <div>
                    <h1 className="text-4xl md:text-5xl font-black font-sans uppercase tracking-tighter leading-none">
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
                      <strong>Core Stack:</strong> {CORE_STACK.map(s => `${s.name} (${s.level})`).join(", ")}
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
            </div>
          </div>

          {/* Palette Footer Tray */}
          <div className="p-1 bg-[#bfbfbf] border-t-2 border-white flex items-center gap-1.5 overflow-hidden">
            <div className="w-7 h-7 bg-[#bfbfbf] border-2 border-t-[#808080] border-l-[#808080] border-b-white border-r-white relative shrink-0">
              <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-black border border-white z-20 shadow-sm" />
              <div className="absolute bottom-0.5 right-0.5 w-4 h-4 bg-white border border-[#808080] z-10" />
            </div>

            <div className="grid grid-flow-col grid-rows-2 gap-[1px] bg-black p-[1px] overflow-x-auto max-w-full">
              {COLOR_PALETTE.map((color, idx) => (
                <div
                  key={idx}
                  className="w-3 h-3 cursor-pointer border border-transparent hover:border-white"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>
        </div>

        {/* System Action Tray */}
        <div className="border-t border-white bg-[#bfbfbf] px-3 py-1.5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 text-xs">
          <span className="text-gray-800 font-sans flex items-center gap-1.5 select-none self-center">
            <span
              className={`w-2.5 h-2.5 inline-block border border-t-black border-l-black border-b-white border-r-white ${systemOnline ? "bg-green-600" : "bg-gray-500"
                }`}
            />
            Status: {systemOnline ? "Online" : "Ready"}
          </span>

          <div className="flex items-center justify-end gap-1 font-sans">
            <button
              onClick={() => {
                handleActionClick();
                window.print();
              }}
              className="px-3 py-0.5 border-2 border-b-black border-r-black border-t-white border-l-white bg-[#bfbfbf]
                         active:border-t-black active:border-l-black active:border-b-white active:border-r-white
                         text-black rounded-none font-medium cursor-pointer"
            >
              Print
            </button>
            <a
              href="/Zoha_Malik_Resume.pdf"
              download
              onClick={handleActionClick}
              className="px-3 py-0.5 border-2 border-b-black border-r-black border-t-white border-l-white bg-[#bfbfbf]
                         active:border-t-black active:border-l-black active:border-b-white active:border-r-white
                         text-black rounded-none font-medium text-center cursor-pointer"
            >
              Download
            </a>
            <a
              href="https://www.linkedin.com/in/zohamalik-/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleActionClick}
              className="px-3 py-0.5 border-2 border-b-black border-r-black border-t-white border-l-white bg-[#bfbfbf]
                         active:border-t-black active:border-l-black active:border-b-white active:border-r-white
                         text-black rounded-none font-medium text-center cursor-pointer"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </RetroWindow>
    </section>
  );
}