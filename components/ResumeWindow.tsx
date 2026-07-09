"use client";

import { useState } from "react";
import RetroWindow from "@/components/RetroWindow";
import { playClick } from "@/components/Sound";

export default function ResumeWindow() {
  const [zoom, setZoom] = useState<number>(100);

  const coreStack = [
    { name: "React / Next.js", level: "95" },
    { name: "Node.js / Express", level: "90" },
    { name: "PostgreSQL / SQL", level: "85" },
    { name: "TypeScript / JS", level: "90" },
    { name: "Tailwind CSS", level: "95" },
  ];

  const skills = [
    { name: "REST Architecture", level: "95" },
    { name: "Git & Version Control", level: "90" },
    { name: "Database Design", level: "85" },
  ];

  const certifications = [
    "AWS Cloud Practitioner",
    "Build with Gemma Hackathon",
    "AWS GameDay Competitor",
  ];

  return (
    <section
      id="resume"
      className="relative min-h-screen flex items-center justify-center px-3 md:px-8 py-12 md:py-20 bg-transparent text-gray-900 select-none"
    >
      <RetroWindow
        title="ZOHA_MALIK_CV.exe"
        icon="/projects/pdf.png"
        statusText="Ready"
      >
        {/* Main Container with Pixel Art Border */}
        <div className="bg-gradient-to-br from-[#F4ECD8] to-[#F0E8D0] border-8 border-[#0F4C43] shadow-[inset_0_2px_4px_rgba(0,0,0,0.1),0_8px_16px_rgba(0,0,0,0.3)] relative overflow-hidden">
          
          {/* Decorative Pixel Art Top Border */}
          <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-b from-[#1c7467] to-[#0F4C43] border-b-2 border-[#0F4C43]" />
          
          {/* Decorative Pixel Art Bottom Border */}
          <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-t from-[#1c7467] to-[#0F4C43] border-t-2 border-[#0F4C43]" />

          {/* Content Wrapper */}
          <div className="pt-6 pb-12 px-6 md:px-12">

            {/* ═══════════════════════════════════════════════════════════════════ */}
            {/* HERO SECTION: Centered Profile Area                               */}
            {/* ═══════════════════════════════════════════════════════════════════ */}
            <div className="text-center mb-10 border-b-4 border-double border-[#0F4C43] pb-8">
              
              {/* Pixel Art Title Frame */}
              <div className="inline-block bg-[#0F4C43] text-[#F4ECD8] px-6 py-2 mb-6 border-4 border-[#1c7467] shadow-[4px_4px_0px_rgba(0,0,0,0.3)]">
                <h2 className="text-xs font-bold font-mono tracking-widest uppercase">
                  ◆ CURRICULUM VITAE ◆
                </h2>
              </div>

              {/* Main Name */}
              <h1 className="text-4xl md:text-5xl font-black font-mono text-[#0F4C43] tracking-wide mb-2 drop-shadow-[2px_2px_0px_rgba(0,0,0,0.1)]">
                ZOHA MALIK
              </h1>

              {/* Subtitle with Pixel Divider */}
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-8 h-0.5 bg-[#0F4C43]" />
                <p className="text-sm font-bold font-mono text-[#1c7467] tracking-wider uppercase">
                  // Full Stack Developer Engine
                </p>
                <div className="w-8 h-0.5 bg-[#0F4C43]" />
              </div>

              {/* Decorative Pixel Art Elements - Small Hexagons */}
              <div className="flex items-center justify-center gap-8 mt-6">
                <div className="w-6 h-6 border-2 border-[#1c7467] transform rotate-45" />
                <div className="text-xl">⬥</div>
                <div className="w-6 h-6 border-2 border-[#1c7467] transform rotate-45" />
              </div>

            </div>

            {/* ═══════════════════════════════════════════════════════════════════ */}
            {/* TWO-COLUMN GRID LAYOUT                                            */}
            {/* ═══════════════════════════════════════════════════════════════════ */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 font-mono">

              {/* LEFT COLUMN: Experience & Education */}
              <div className="md:col-span-6 space-y-8">

                {/* Summary Section */}
                <div className="border-l-4 border-[#0F4C43] pl-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 bg-[#0F4C43]" />
                    <h3 className="font-bold text-xs uppercase tracking-wider text-[#0F4C43]">
                      ▶ Summary
                    </h3>
                  </div>
                  <p className="text-xs font-sans text-gray-700 leading-relaxed">
                    Computer Science student engineered to construct optimized web assets, server blueprints, and full-stack solutions built around concrete business growth indicators.
                  </p>
                </div>

                {/* Experience Section */}
                <div className="border-l-4 border-[#0F4C43] pl-4">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 bg-[#0F4C43]" />
                    <h3 className="font-bold text-xs uppercase tracking-wider text-[#0F4C43]">
                      ▼ Experience
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {/* Experience Item */}
                    <div className="relative">
                      <div className="absolute -left-[22px] top-0.5 w-3 h-3 bg-[#1c7467] border-2 border-[#0F4C43]" />
                      <div className="space-y-1">
                        <div className="flex justify-between items-baseline">
                          <span className="font-bold text-xs text-[#0F4C43]">
                            Freelance Full Stack Dev
                          </span>
                          <span className="text-[10px] text-gray-600 font-sans">
                            2024 — PRES
                          </span>
                        </div>
                        <div className="space-y-1 text-xs text-gray-700 font-sans">
                          <p>→ Built performance-tuned transactional marketplace interfaces and conversion routes.</p>
                          <p>→ Created secure database integrations and high-availability REST architecture patterns.</p>
                          <p>→ Supervised operational staging deployments and automated environment configurations.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Education Section */}
                <div className="border-l-4 border-[#0F4C43] pl-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 bg-[#0F4C43]" />
                    <h3 className="font-bold text-xs uppercase tracking-wider text-[#0F4C43]">
                      ■ Education
                    </h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-bold text-xs text-[#0F4C43]">
                        BS Computer Science
                      </span>
                      <span className="text-[10px] text-gray-600 font-sans">
                        2023 — 2027
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 font-sans">
                      National University of Modern Languages
                    </p>
                  </div>
                </div>

              </div>

              {/* RIGHT COLUMN: Skills & Certifications */}
              <div className="md:col-span-6 space-y-8">

                {/* Core Stack Section */}
                <div className="border-l-4 border-[#1c7467] pl-4">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 bg-[#1c7467]" />
                    <h3 className="font-bold text-xs uppercase tracking-wider text-[#0F4C43]">
                      ⚙ Core Systems
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {coreStack.map((tech) => (
                      <div key={tech.name}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="font-bold text-[#0F4C43]">{tech.name}</span>
                          <span className="text-gray-600 text-[10px]">{tech.level}%</span>
                        </div>
                        {/* Pixel Art Skill Bar */}
                        <div className="h-2 bg-gray-300 border-2 border-[#0F4C43] overflow-hidden shadow-[inset_1px_1px_0_rgba(0,0,0,0.2)]">
                          <div
                            className="h-full bg-gradient-to-r from-[#0F4C43] to-[#1c7467] transition-all duration-300"
                            style={{ width: `${tech.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Additional Skills Section */}
                <div className="border-l-4 border-[#1c7467] pl-4">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 bg-[#1c7467]" />
                    <h3 className="font-bold text-xs uppercase tracking-wider text-[#0F4C43]">
                      ✦ Attributes
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {skills.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="font-bold text-[#0F4C43]">{skill.name}</span>
                          <span className="text-gray-600 text-[10px]">{skill.level}%</span>
                        </div>
                        <div className="h-2 bg-gray-300 border-2 border-[#1c7467] overflow-hidden shadow-[inset_1px_1px_0_rgba(0,0,0,0.2)]">
                          <div
                            className="h-full bg-gradient-to-r from-[#1c7467] to-[#0F4C43] transition-all duration-300"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certifications Section */}
                <div className="border-l-4 border-[#0F4C43] pl-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 bg-[#0F4C43]" />
                    <h3 className="font-bold text-xs uppercase tracking-wider text-[#0F4C43]">
                      ▲ Unlocked Perks
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {certifications.map((cert) => (
                      <div
                        key={cert}
                        className="text-xs bg-[#fcf9f2] border-2 border-[#0F4C43] p-2 font-sans text-[#0F4C43] shadow-[2px_2px_0px_rgba(0,0,0,0.1)]"
                      >
                        ✔ {cert}
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>

            {/* Footer Divider */}
            <div className="mt-8 pt-4 border-t-2 border-dashed border-[#0F4C43] flex justify-between items-center text-[10px] font-mono text-gray-600">
              <span>PAGES_COMPILED: OK</span>
              <span>BUILD_VER: 2026.07</span>
              <span>STATUS: READY_FOR_DEPLOYMENT</span>
            </div>

          </div>
        </div>

        {/* Action Bar */}
        <div className="bg-gradient-to-r from-[#f0e8d0] to-[#e8dfc5] border-t-2 border-gray-400 px-4 py-3 flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-bold font-mono text-[#0F4C43]">✓ Systems Online</span>

          <div className="flex items-center gap-2 font-mono text-xs">
            <button
              onClick={() => window.print()}
              className="px-4 py-1.5 bg-gradient-to-b from-white to-gray-100 text-[#0F4C43] font-bold border-2 border-t-white border-l-white border-r-gray-500 border-b-gray-500 hover:from-blue-50 active:border-t-gray-500 active:border-l-gray-500 shadow-[1px_1px_2px_rgba(0,0,0,0.1)]"
            >
              📄 Preview
            </button>
            <a
              href="/resume.pdf"
              download
              onClick={() => playClick()}
              className="px-4 py-1.5 bg-gradient-to-b from-white to-gray-100 text-[#0F4C43] font-bold border-2 border-t-white border-l-white border-r-gray-500 border-b-gray-500 hover:from-blue-50 active:border-t-gray-500 active:border-l-gray-500 shadow-[1px_1px_2px_rgba(0,0,0,0.1)]"
            >
              ⬇ Download
            </a>
            <a
              href="https://linkedin.com/in/zoha-malik"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playClick()}
              className="px-4 py-1.5 bg-gradient-to-b from-[#0F4C43] to-[#093d35] text-white font-bold border-2 border-[#0F4C43] hover:from-[#1c7467] shadow-[1px_1px_2px_rgba(0,0,0,0.2)] active:scale-95 transition-all"
            >
              🔗 LinkedIn
            </a>
          </div>
        </div>

      </RetroWindow>
    </section>
  );
}