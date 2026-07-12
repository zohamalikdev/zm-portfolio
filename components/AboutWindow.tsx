"use client";

import { useState } from "react";
import MsPaintWindow from "@/components/MsPaintWindow";
import RetroWindow from "@/components/RetroWindow";
import PopupWindow from "@/components/PopupWindow";
import Typewriter from "./TypeWriter";
import { AnimatePresence, motion } from "framer-motion";
import { playClick, playOpen, playClose } from "@/components/Sound";
import Image from "next/image";

type WindowId = "skills" | "tech" | "status" | "journey" | null;

export default function AboutWindow() {
  const [activeWindow, setActiveWindow] = useState<WindowId>(null);
  const [showContent, setShowContent] = useState(false);
  const [selectedFile, setSelectedFile] = useState<WindowId>(null);
  const [loading, setLoading] = useState(false);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };

  const iconVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.25 } },
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
  };

  const openWindow = (id: WindowId) => {
    playOpen();
    setSelectedFile(id);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setActiveWindow(id);
    }, 400);
  };

  const closeWindow = () => {
    playClose();
    setActiveWindow(null);
  };

  return (
    <section id="about" className="relative bg-transparent px-3 md:px-8 py-12 md:py-20 text-black select-none cursor-none">
      <div className="max-w-6xl mx-auto">
        <MsPaintWindow
          title="about_me.bmp - Paint"
          icon="/projects/about.png"
          statusText="For Help, click Help Topics on the Help Menu."
          showToolPanel={false}
        >
          {/* The "paper sheet" inside the canvas — your actual content.
              No more heavy black border / hard shadow — just a soft
              drop shadow so it still reads as a card floating on the
              dark canvas, without the thick frame. Padding steps down
              at each breakpoint (p-4 on phones, up to p-8 on desktop)
              instead of jumping straight from mobile to desktop sizing. */}
          <div className="bg-white border-[3px] border-black text-black w-full p-4 sm:p-6 md:p-8 font-serif shadow-[6px_6px_0px_rgba(0,0,0,1)] tracking-tight">
            <div className="grid md:grid-cols-[220px_1fr] gap-5 sm:gap-6 md:gap-10">
              {/* LEFT — Profile Card */}
              <div className="flex flex-col items-center border-b md:border-b-0 md:border-r border-neutral-200 pb-5 sm:pb-6 md:pb-0 pr-0 md:pr-6">
                <div className="border-4 border-black p-1 bg-white shadow-[4px_4px_0px_rgba(0,0,0,1)] w-[120px] sm:w-[150px] md:w-[180px]">
                  <Image
                    src="/projects/hero.jpg"
                    alt="Zoha"
                    width={180}
                    height={230}
                    priority
                    className="w-full h-auto"
                  />
                </div>

                <h2 className="mt-4 sm:mt-5 text-xl sm:text-2xl font-black font-sans uppercase tracking-tight text-center leading-none">
                  Zoha Malik
                </h2>
                <p className="text-[11px] sm:text-xs font-mono font-bold tracking-wider uppercase mt-1.5 text-neutral-500">
                  Full Stack Developer
                </p>

                <div className="mt-4 sm:mt-5 w-full border-t border-neutral-200 pt-3 sm:pt-4 text-[11px] sm:text-xs font-mono space-y-2 text-neutral-600">
                  <p>Multan, Pakistan</p>
                  <p>BS Computer Science</p>
                </div>
              </div>

              {/* RIGHT — Typewriter intro + file grid */}
              <div className="flex flex-col justify-between">
                <div className="bg-neutral-50 border-2 border-black p-3 sm:p-4 md:p-6 font-mono text-xs sm:text-sm shadow-[3px_3px_0px_rgba(0,0,0,1)]">
                  <Typewriter
                    lines={[
                      "Hello.",
                      "I'm Zoha Malik.",
                      "Full Stack Developer.",
                      "I build modern web applications.",
                      "Select a file, then click/tap again to open...",
                    ]}
                    onComplete={() => setShowContent(true)}
                  />
                </div>

                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate={showContent ? "visible" : "hidden"}
                  className="mt-6 sm:mt-8"
                >
                  <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="flex-1 border-b-2 border-black" />
                    <span className="text-[9px] sm:text-[10px] font-mono font-black uppercase tracking-widest text-neutral-400 whitespace-nowrap">
                      Desktop Files
                    </span>
                    <div className="flex-1 border-b-2 border-black" />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 justify-items-center">
                    {[
                      { id: "skills" as const, label: "Skills.exe", subtitle: "Technical Abilities", icon: "/projects/skills.png" },
                      { id: "tech" as const, label: "TechStack.exe", subtitle: "Languages & Tools", icon: "/projects/tech.png" },
                      { id: "status" as const, label: "Status.exe", subtitle: "Current Activity", icon: "/projects/status.png" },
                      { id: "journey" as const, label: "Journey.txt", subtitle: "Career Timeline", icon: "/projects/journey.png" },
                    ].map((item) => (
                      <motion.button
                        key={item.id}
                        variants={iconVariants}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          playClick();
                          if (selectedFile === item.id) {
                            // Already selected — this tap/click "opens" it,
                            // same convention as double-clicking a desktop
                            // icon, but works identically on touch where
                            // native dblclick is unreliable.
                            openWindow(item.id);
                          } else {
                            setSelectedFile(item.id);
                          }
                        }}
                        onDoubleClick={() => {
                          // Kept for desktop users who do double-click directly.
                          playClick();
                          openWindow(item.id);
                        }}
                        className={`cursor-none w-full max-w-[140px] p-2 sm:p-3 flex flex-col items-center border-2 text-black transition-all duration-150 ${
                          selectedFile === item.id
                            ? "bg-black text-white border-black shadow-[4px_4px_0px_rgba(0,0,0,0.2)]"
                            : "bg-white border-black hover:bg-neutral-50 shadow-[4px_4px_0px_rgba(0,0,0,1)]"
                        }`}
                      >
                        <div className={`p-1 ${selectedFile === item.id ? "invert" : ""}`}>
                          <Image
                            src={item.icon}
                            alt={item.label}
                            width={48}
                            height={48}
                            className="w-9 h-9 sm:w-12 sm:h-12"
                          />
                        </div>
                        <h3 className="mt-2 text-[10px] sm:text-xs font-black font-sans uppercase tracking-tight text-center">
                          {item.label}
                        </h3>
                        <p className={`text-[9px] sm:text-[10px] font-mono mt-1 text-center ${selectedFile === item.id ? "text-neutral-300" : "text-neutral-500"}`}>
                          {item.subtitle}
                        </p>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </MsPaintWindow>
      </div>

      {/* Loading overlay — a different, generic window, so RetroWindow still fits here */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          >
            <RetroWindow title="Loading..." icon="/projects/loading.png">
              <div className="flex flex-col items-center gap-4 p-6 min-w-[220px] bg-[#bfbfbf] border-t border-white text-black font-sans text-xs">
                <Image src="/projects/loading.gif" alt="Loading asset frames" width={40} height={40} unoptimized />
                <p className="font-mono font-bold uppercase tracking-wider text-neutral-700">Opening file...</p>
              </div>
            </RetroWindow>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Popups — unchanged */}
      <AnimatePresence>
        {activeWindow === "skills" && (
          <PopupWindow id="skills" title="Skills.exe" icon="/projects/folder.png" onClose={closeWindow}>
            <h2 className="font-sans font-black text-lg uppercase tracking-tight mb-4 border-b-2 border-black pb-1">Technical Skills</h2>
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4 font-mono">
              {[
                { category: "Frontend", skill: "React / Next.js", pct: 95 },
                { category: "Frontend", skill: "TypeScript", pct: 90 },
                { category: "Backend", skill: "Node.js / Express", pct: 88 },
                { category: "Backend", skill: "PostgreSQL / MySQL", pct: 82 },
                { category: "Design", skill: "UI / Product Design", pct: 92 },
              ].map((row) => (
                <motion.div key={row.skill} variants={rowVariants} className="text-xs">
                  <div className="flex justify-between font-bold mb-1">
                    <span className="text-neutral-500 uppercase text-[10px] tracking-wide">[{row.category}] {row.skill}</span>
                    <span>{row.pct}%</span>
                  </div>
                  <div className="w-full bg-neutral-100 border border-black h-3 p-[1px]">
                    <div className="bg-black h-full" style={{ width: `${row.pct}%` }} />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </PopupWindow>
        )}

        {activeWindow === "tech" && (
          <PopupWindow id="tech" title="Tech Stack.exe" icon="/projects/about.png" onClose={closeWindow}>
            <h2 className="font-sans font-black text-lg uppercase tracking-tight mb-4 border-b-2 border-black pb-1">Installed Technologies</h2>
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4 font-mono">
              {[
                { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
                { category: "Backend", items: ["Node.js", "Express"] },
                { category: "Database", items: ["PostgreSQL", "MongoDB", "MySQL"] },
                { category: "Tools", items: ["Git", "Figma"] },
              ].map((group) => (
                <motion.div key={group.category} variants={rowVariants} className="text-xs">
                  <p className="font-bold text-neutral-400 uppercase text-[10px] tracking-wider mb-2"> {group.category}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <span key={item} className="border border-black bg-white px-2 py-0.5 font-bold uppercase text-[11px]">
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </PopupWindow>
        )}

        {activeWindow === "status" && (
          <PopupWindow id="status" title="Current Status.exe" icon="/projects/status.png" onClose={closeWindow}>
            <h2 className="font-sans font-black text-lg uppercase tracking-tight mb-4 border-b-2 border-black pb-1">System Status</h2>
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-3 font-mono text-xs">
              {[
                { label: "Current Focus", value: "Full Stack Web Development" },
                { label: "Learning", value: "AWS / Cloud Infrastructure" },
                { label: "Availability", value: "Open to Work", highlight: true },
                { label: "Location", value: "Multan, Pakistan (Remote)" },
              ].map((item) => (
                <motion.div key={item.label} variants={rowVariants} className="flex justify-between border-b border-neutral-100 pb-2 last:border-none">
                  <span className="text-neutral-400 font-bold uppercase text-[10px] tracking-wider">{item.label}</span>
                  <span className={`font-black text-right ${item.highlight ? "text-green-600" : "text-black"}`}>{item.value}</span>
                </motion.div>
              ))}
            </motion.div>
          </PopupWindow>
        )}

        {activeWindow === "journey" && (
          <PopupWindow id="journey" title="Journey.txt" icon="/projects/notepad.png" onClose={closeWindow}>
            <h2 className="font-sans font-black text-lg uppercase tracking-tight mb-4 border-b-2 border-black pb-1">Career Timeline</h2>
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4 font-mono text-xs max-h-[300px] overflow-auto pr-1">
              {[
                { year: "2022", title: "Graphic Designer", desc: "Started designing social media posts, flyers and branding projects." },
                { year: "2023", title: "Freelancer", desc: "Worked with international clients on Fiverr and independent projects." },
                { year: "2024", title: "Frontend Developer", desc: "Learned React, Next.js and modern UI development." },
                { year: "2025", title: "Full Stack Developer", desc: "Built complete applications using Node.js, Express and PostgreSQL." },
                { year: "2026", title: "Cloud & SaaS", desc: "Learning AWS while creating scalable SaaS products and preparing for internships." },
              ].map((item) => (
                <motion.div key={item.year} variants={rowVariants} className="flex gap-3 items-start border-b border-neutral-100 pb-3 last:border-none">
                  <div className="bg-black text-white px-1 py-0.5 text-[10px] font-black shrink-0">{item.year}</div>
                  <div className="flex-1">
                    <h3 className="font-black text-black uppercase tracking-tight">{item.title}</h3>
                    <p className="text-neutral-600 mt-1 leading-normal text-[11px]">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.6 } }}
              className="mt-4 border-t-2 border-black pt-3 text-[11px] font-mono leading-normal text-neutral-500 uppercase"
            >
              <span className="font-black text-black">Current Objective:</span> Secure a Full Stack Internship, deepen AWS expertise, and build impactful products.
            </motion.div>
          </PopupWindow>
        )}
      </AnimatePresence>
    </section>
  );
}