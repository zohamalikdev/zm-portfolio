"use client";

import { useState, type ReactNode } from "react";
import RetroWindow from "@/components/RetroWindow";
import PopupWindow from "@/components/PopupWindow";
import Typewriter from "./TypeWriter";
import { AnimatePresence, motion } from "framer-motion";
import { playClick, playOpen, playClose } from "@/components/Sound";
import Image from "next/image";

type WindowId = "skills" | "tech" | "status" | "journey" | null;

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

export default function AboutWindow() {
  const [activeWindow, setActiveWindow] = useState<WindowId>(null);
  const [showContent, setShowContent] = useState(false);
  const [selectedFile, setSelectedFile] = useState<WindowId>(null);
  const [loading, setLoading] = useState(false);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const iconVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.25 },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.25 },
    },
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
        <RetroWindow
          title="about_me.bmp - Paint"
          icon="/projects/about.png"
          statusText="For Help, click Help Topics on the Help Menu."
        >
          {/* Main Paint Chassis Frame */}
          <div className="bg-[#bfbfbf] p-1 font-sans text-xs flex flex-col shadow-[inset_1px_1px_0_#ffffff]">
            
            {/* Context Dropdown Bar Headers */}
            <div className="flex items-center gap-4 px-2 py-1 border-b border-[#808080] text-gray-900">
              <span className="cursor-default"><span className="underline">F</span>ile</span>
              <span className="cursor-default"><span className="underline">E</span>dit</span>
              <span className="cursor-default"><span className="underline">V</span>iew</span>
              <span className="cursor-default"><span className="underline">I</span>mage</span>
              <span className="cursor-default"><span className="underline">C</span>olors</span>
              <span className="cursor-default"><span className="underline">H</span>elp</span>
            </div>

            {/* Core Interface Workspace Split */}
            <div className="flex items-stretch gap-1 p-1 bg-[#bfbfbf] min-h-[550px]">
              
              {/* MS Paint Classic Left Sidebar Toolset */}
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

              {/* CANVAS INNER SHEET - Clean Magazine Presentation Viewport */}
              <div className="flex-1 bg-[#262626] p-4 overflow-auto flex items-center justify-center">
                <div className="bg-white border-[3px] border-black text-black w-full max-w-5xl p-6 md:p-8 font-serif shadow-[6px_6px_0px_rgba(0,0,0,1)] tracking-tight">
                  
                  <div className="grid md:grid-cols-[220px_1fr] gap-10">
                    {/* LEFT SIDE — Profile Card Section */}
                    <div className="flex flex-col items-center border-r border-neutral-200 pr-0 md:pr-6">
                      <div className="border-4 border-black p-1 bg-white shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                        <Image
                          src="/projects/hero.jpg"
                          alt="Zoha"
                          width={180}
                          height={230}
                          priority
                        />
                      </div>

                      <h2 className="mt-5 text-2xl font-black font-sans uppercase tracking-tight text-center leading-none">
                        Zoha Malik
                      </h2>
                      <p className="text-xs font-mono font-bold tracking-wider uppercase mt-1.5 text-neutral-500">
                        Full Stack Developer
                      </p>

                      <div className="mt-5 w-full border-t border-neutral-200 pt-4 text-xs font-mono space-y-2 text-neutral-600">
                        <p> Multan, Pakistan</p>
                        <p> BS Computer Science</p>
                      </div>
                    </div>

                    {/* RIGHT SIDE — Typewriter Introduction + Files Grid */}
                    <div className="flex flex-col justify-between">
                      <div className="bg-neutral-50 border-2 border-black p-4 md:p-6 font-mono text-sm shadow-[3px_3px_0px_rgba(0,0,0,1)]">
                        <Typewriter
                          lines={[
                            "Hello.",
                            "I'm Zoha Malik.",
                            "Full Stack Developer.",
                            "I build modern web applications.",
                            "Double-click any file to know more..."
                          ]}
                          onComplete={() => setShowContent(true)}
                        />
                      </div>

                      <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate={showContent ? "visible" : "hidden"}
                        className="mt-8"
                      >
                        {/* Divider Line */}
                        <div className="flex items-center gap-4 mb-6">
                          <div className="flex-1 border-b-2 border-black" />
                          <span className="text-[10px] font-mono font-black uppercase tracking-widest text-neutral-400">
                            Desktop Files
                          </span>
                          <div className="flex-1 border-b-2 border-black" />
                        </div>

                        {/* Interactive Grid Icons */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 justify-items-center">
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
                                setSelectedFile(item.id);
                              }}
                              onDoubleClick={() => {
                                playClick();
                                openWindow(item.id);
                              }}
                              className={`cursor-none w-full max-w-[140px] p-3 flex flex-col items-center border-2 text-black transition-all duration-150 ${
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
                                />
                              </div>
                              <h3 className="mt-2 text-xs font-black font-sans uppercase tracking-tight text-center">
                                {item.label}
                              </h3>
                              <p className={`text-[10px] font-mono mt-1 text-center ${selectedFile === item.id ? "text-neutral-300" : "text-neutral-500"}`}>
                                {item.subtitle}
                              </p>
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  </div>

                </div>
              </div>

            </div>

            {/* Bottom Color Palette Alignment Strip */}
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
        </RetroWindow>
      </div>

      {/* Global Window Asset Loading Overlay Modal */}
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
                <Image
                  src="/projects/loading.gif"
                  alt="Loading asset frames"
                  width={40}
                  height={40}
                  unoptimized
                />
                <p className="font-mono font-bold uppercase tracking-wider text-neutral-700">Opening file...</p>
              </div>
            </RetroWindow>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Popup Window Modals Render Pipeline */}
      <AnimatePresence>
        {/* SKILLS MODAL */}
        {activeWindow === "skills" && (
          <PopupWindow id="skills" title="Skills.exe" icon="/projects/folder.png" onClose={closeWindow}>
            <h2 className="font-sans font-black text-lg uppercase tracking-tight mb-4 border-b-2 border-black pb-1">Technical Skills</h2>
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4 font-mono"
            >
              {[
                { category: "Frontend", skill: "React / Next.js", pct: 95, color: "bg-black" },
                { category: "Frontend", skill: "TypeScript", pct: 90, color: "bg-black" },
                { category: "Backend", skill: "Node.js / Express", pct: 88, color: "bg-black" },
                { category: "Backend", skill: "PostgreSQL / MySQL", pct: 82, color: "bg-black" },
                { category: "Design", skill: "UI / Product Design", pct: 92, color: "bg-black" },
              ].map((row) => (
                <motion.div key={row.skill} variants={rowVariants} className="text-xs">
                  <div className="flex justify-between font-bold mb-1">
                    <span className="text-neutral-500 uppercase text-[10px] tracking-wide">[{row.category}] {row.skill}</span>
                    <span>{row.pct}%</span>
                  </div>
                  <div className="w-full bg-neutral-100 border border-black h-3 p-[1px]">
                    <div className={`${row.color} h-full`} style={{ width: `${row.pct}%` }} />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </PopupWindow>
        )}

        {/* TECHSTACK MODAL (Sequential entry fixed via rowVariants) */}
        {activeWindow === "tech" && (
          <PopupWindow id="tech" title="Tech Stack.exe" icon="/projects/about.png" onClose={closeWindow}>
            <h2 className="font-sans font-black text-lg uppercase tracking-tight mb-4 border-b-2 border-black pb-1">Installed Technologies</h2>
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4 font-mono"
            >
              {[
                { category: " Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
                { category: " Backend", items: ["Node.js", "Express"] },
                { category: " Database", items: ["PostgreSQL","MongoDB", "MySQL"] },
                               { category: " Tools", items: ["Git", "Figma"] },
              ].map((group) => (
                <motion.div key={group.category} variants={rowVariants} className="text-xs">
                  <p className="font-bold text-neutral-400 uppercase text-[10px] tracking-wider mb-2">// {group.category}</p>
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

        {/* CURRENT STATUS MODAL */}
        {activeWindow === "status" && (
          <PopupWindow id="status" title="Current Status.exe" icon="/projects/status.png" onClose={closeWindow}>
            <h2 className="font-sans font-black text-lg uppercase tracking-tight mb-4 border-b-2 border-black pb-1">System Status</h2>
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-3 font-mono text-xs"
            >
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

        {/* JOURNEY TIMELINE MODAL */}
        {activeWindow === "journey" && (
          <PopupWindow id="journey" title="Journey.txt" icon="/projects/notepad.png" onClose={closeWindow}>
            <h2 className="font-sans font-black text-lg uppercase tracking-tight mb-4 border-b-2 border-black pb-1">Career Timeline</h2>
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4 font-mono text-xs max-h-[300px] overflow-auto pr-1"
            >
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