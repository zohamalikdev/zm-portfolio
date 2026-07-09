"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, type ReactNode } from "react";
import RetroWindow from "@/components/RetroWindow";
import { playClick } from "@/components/Sound";

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
  { key: "text", label: "Text", svg: <svg viewBox="0 0 20 20" shapeRendering="crispEdges"><text x="10" y="15" textAnchor="middle" fontFamily="Georgia, serif" fontWeight="bold" fontSize="13" fill="#000000">A</text></svg> },
  { key: "line", label: "Line", svg: <svg viewBox="0 0 20 20" shapeRendering="crispEdges"><line x1="4" y1="16" x2="16" y2="4" stroke="#000" strokeWidth="1.4" /></svg> },
  { key: "curve", label: "Curve", svg: <svg viewBox="0 0 20 20" shapeRendering="crispEdges"><path d="M3 14 C 7 4, 13 16, 17 6" fill="none" stroke="#000" strokeWidth="1.3" /></svg> },
  { key: "rectangle", label: "Rectangle", active: true, svg: <svg viewBox="0 0 20 20" shapeRendering="crispEdges"><rect x="4" y="5" width="12" height="10" fill="none" stroke="#000" strokeWidth="1.3" /></svg> },
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

const projects = [
  {
    id: "bazaar",
    icon: "/projects/bazzar.png",
    name: "Bazaar Shop.exe",
    tagline: "Full Stack Marketplace",
    subtitle: "A scalable multi-vendor marketplace built to simplify online buying and selling.",
    status: "Production",
    version: "v2.1",
    size: "18.4 MB",
    screenshot: "/projects/bazzar.png",
    problem: "Small businesses need an affordable online marketplace without relying on restrictive third-party platforms.",
    solution: "Built a robust end-to-end e-commerce infrastructure supporting products, dynamic categories, shopping cart systems, and secure checkout frameworks.",
    stack: ["React", "Next.js", "Node.js", "Express", "PostgreSQL", "JWT"],
    features: ["User Authentication", "Admin Dashboard", "Shopping Cart Matrix", "REST API Infrastructure", "Database Integration", "Secure Checkout Gateway"],
    metrics: { loc: "18,000+", pages: "22", tables: "14", apis: "17" },
    href: "https://zohamalikdev.github.io/Bazzar-Shop/index.html",
    github: "https://github.com/zohamalikdev/Bazzar-Shop",
  },
  {
    id: "artwala",
    icon: "/projects/artwala.png",
    name: "ArtWala.exe",
    tagline: "Event Ticket Booking System",
    subtitle: "An event ticket booking system with real-time seat availability and admin management.",
    status: "Live",
    version: "v1.8",
    size: "12.1 MB",
    screenshot: "/projects/artwala.png",
    problem: "Traditional physical ticketing creates long bottlenecks and lacks an automated tracking hub for local organizers.",
    solution: "Digitizes the ticket-booking lifecycle complete with a real-time availability engine, intuitive scheduling matrices, and an integrated administrative dashboard.",
    stack: ["PHP", "MySQL", "JavaScript", "Tailwind CSS"],
    features: ["Dynamic Event Ticketing", "Artist Profiles Engine", "Secure SQL Gateway", "Interactive Layout Maps", "Real-Time Availability Check"],
    metrics: { loc: "8,500+", pages: "12", tables: "6", apis: "9" },
    href: "https://artwala.page.gd",
    github: "https://github.com/zohamalikdev/ArtWala",
  },
  {
    id: "drinkco",
    icon: "/projects/drinkco.png",
    name: "DrinkCo.exe",
    tagline: "Marketing Landing Page",
    subtitle: "A conversion-focused landing page designed to increase product engagement and sales.",
    status: "Production",
    version: "v1.0",
    size: "4.2 MB",
    screenshot: "/projects/drinkco.png",
    problem: "Brands lose prospective leads due to poorly structured product storytelling and non-responsive web design templates.",
    solution: "Engineered a high-performance, responsive shell optimizing user experience paths, clear conversion funnels, and fluid media distribution arrays.",
    stack: ["HTML", "CSS", "JavaScript", "Vite"],
    features: ["Fluid Layout Systems", "High-Fidelity Animations", "Asynchronous Contact Submissions", "Asset Size Optimization"],
    metrics: { loc: "1,200+", pages: "1", tables: "0", apis: "2" },
    href: "https://zohamalikdev.github.io/DrinkCo/index.html",
    github: "https://github.com/zohamalikdev/DrinkCo",
  },
];

export default function WorkSection() {
  const [selected, setSelected] = useState<string>("bazaar");
  const [imgError, setImgError] = useState<Record<string, boolean>>({});
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
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

  const handleSelectProject = (id: string) => {
    playClick();
    setSelected(id);
  };

  const handleLinkClick = () => {
    playClick();
  };

  const activeProject = projects.find((p) => p.id === selected) || projects[0];

  const renderStatusBadge = (status: string) => {
    const badgeStyles = {
      Production: "bg-gradient-to-b from-green-500 to-green-600 text-white shadow-[inset_1px_1px_0_rgba(255,255,255,0.4),inset_-1px_-1px_0_rgba(0,0,0,0.4)]",
      Live: "bg-gradient-to-b from-blue-500 to-blue-600 text-white shadow-[inset_1px_1px_0_rgba(255,255,255,0.4),inset_-1px_-1px_0_rgba(0,0,0,0.4)]",
    };

    const statusConfig = {
      Production: { label: "🟢 Production", style: badgeStyles.Production },
      Live: { label: "🔵 Live Shell", style: badgeStyles.Live },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || { label: "🟡 Staging", style: badgeStyles.Production };

    return (
      <span className={`${config.style} px-3 py-1 rounded-sm text-[11px] select-none font-mono font-semibold`}>
        {config.label}
      </span>
    );
  };

  return (
    <section id="work" className="relative bg-transparent px-3 md:px-8 lg:px-12 py-12 md:py-16 text-gray-900 select-none cursor-none">
      <div className="max-w-6xl mx-auto">
        <RetroWindow
          title="my_projects.bmp - Paint"
          icon="/projects/folder.png"
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
            <div className="flex items-stretch gap-1 p-1 bg-[#bfbfbf] min-h-[600px]">
              
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

              {/* CANVAS INNER SHEET - Split Pane Work Environment */}
              <div className="flex-1 bg-[#262626] p-4 overflow-auto flex items-start justify-center">
                <div className="bg-white border-[3px] border-black text-black w-full max-w-5xl p-4 font-serif shadow-[6px_6px_0px_rgba(0,0,0,1)] tracking-tight">
                  
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                    
                    {/* LEFT EXPLORER NAVIGATION */}
                    <div className="lg:col-span-4 space-y-2">
                      <p className="text-[10px] font-bold font-mono text-gray-400 uppercase tracking-wider mb-2 px-2 select-none">
                        // Installed Systems
                      </p>
                      <div className="space-y-1.5">
                        {projects.map((project) => {
                          const isCurrent = selected === project.id;
                          const isHovered = hoveredProject === project.id;
                          
                          return (
                            <motion.button
                              key={project.id}
                              onMouseEnter={() => setHoveredProject(project.id)}
                              onMouseLeave={() => setHoveredProject(null)}
                              onClick={() => handleSelectProject(project.id)}
                              whileHover={{ x: isCurrent ? 0 : 2 }}
                              whileTap={{ scale: 0.98 }}
                              className={`w-full text-left flex items-center gap-3 px-3 py-2.5 transition-all duration-100 font-mono text-xs cursor-none rounded-sm border ${
                                isCurrent
                                  ? "bg-black text-white font-bold border-black shadow-[3px_3px_0px_rgba(0,0,0,0.15)]"
                                  : isHovered
                                  ? "bg-neutral-100 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                                  : "bg-white border-black shadow-[3px_3px_0px_rgba(0,0,0,1)]"
                              }`}
                            >
                              <Image 
                                src={project.icon} 
                                alt="" 
                                width={20} 
                                height={20} 
                                className={`shrink-0 ${isCurrent ? "invert" : ""}`} 
                              />
                              <div className="min-w-0 flex-1">
                                <p className="truncate text-xs font-bold uppercase tracking-tight">{project.name}</p>
                                <p className={`text-[9px] truncate mt-0.5 ${isCurrent ? "text-neutral-400" : "text-neutral-500"}`}>
                                  {project.tagline}
                                </p>
                              </div>
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>

                    {/* RIGHT APPLICATION DETAIL PANEL */}
                    <div className="lg:col-span-8 bg-white border-2 border-black p-4 shadow-[4px_4px_0px_rgba(0,0,0,1)] rounded-sm">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeProject.id}
                          variants={containerVariants}
                          initial="hidden"
                          animate="visible"
                          exit={{ opacity: 0, y: -5 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-4 font-sans"
                        >
                          {/* Visual Snapshot Frame */}
                          <motion.div variants={rowVariants} className="border-2 border-black bg-neutral-50 p-1 shadow-[3px_3px_0px_rgba(0,0,0,1)]">
                            <div className="relative aspect-[16/9] w-full border border-black bg-neutral-900 overflow-hidden flex items-center justify-center">
                              {!imgError[activeProject.id] ? (
                                <Image
                                  src={activeProject.screenshot}
                                  alt={`${activeProject.name} Capture Frame`}
                                  fill
                                  className="object-cover"
                                  onError={() => setImgError(prev => ({ ...prev, [activeProject.id]: true }))}
                                />
                              ) : (
                                <div className="w-full h-full p-4 font-mono text-xs text-black flex flex-col justify-between bg-white">
                                  <div>
                                    <p className="text-neutral-400">// STAGE_RENDER_CONNECTED</p>
                                    <p className="text-black font-black mt-1">SYS: {activeProject.name}</p>
                                  </div>
                                  <div className="text-center text-neutral-400 text-[10px] animate-pulse">
                                    [ Image binary sandbox context pending live swap ]
                                  </div>
                                </div>
                              )}
                            </div>
                          </motion.div>

                          {/* Primary Package Metadata Strip */}
                          <motion.div variants={rowVariants} className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 border-b-2 border-black pb-3">
                            <div className="min-w-0">
                              <h2 className="text-sm font-black text-gray-900 font-sans uppercase tracking-tight flex items-center gap-2 truncate">
                                📁 {activeProject.name}
                              </h2>
                              <p className="text-xs text-neutral-500 font-mono mt-0.5">{activeProject.tagline}</p>
                            </div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <div>{renderStatusBadge(activeProject.status)}</div>
                              <div className="text-black border-2 border-black bg-white px-2 py-0.5 text-[10px] rounded-sm font-mono font-bold shadow-[1px_1px_0px_rgba(0,0,0,1)]">
                                v{activeProject.version.slice(1)}
                              </div>
                            </div>
                          </motion.div>

                          {/* Problem & Solution Boxes */}
                          <motion.div variants={rowVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {/* Problem Statement */}
                            <div className="border-2 border-black bg-white p-3 rounded-sm shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                              <h4 className="text-[9px] font-mono font-bold text-neutral-400 uppercase tracking-wider mb-1.5">// Problem</h4>
                              <p className="text-xs text-gray-700 leading-relaxed font-serif">{activeProject.problem}</p>
                            </div>

                            {/* Solution Strategy */}
                            <div className="border-2 border-black bg-white p-3 rounded-sm shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                              <h4 className="text-[9px] font-mono font-bold text-neutral-400 uppercase tracking-wider mb-1.5">// Solution</h4>
                              <p className="text-xs text-gray-700 leading-relaxed font-serif">{activeProject.solution}</p>
                            </div>
                          </motion.div>

                          {/* Architecture Metrics */}
                          <motion.div variants={rowVariants}>
                            <h4 className="text-[9px] font-mono font-bold text-neutral-400 uppercase tracking-wider mb-2 px-1">// Architecture Metrics</h4>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-[10px]">
                              {[
                                { label: "Lines of Code", value: activeProject.metrics.loc },
                                { label: "Modules", value: activeProject.metrics.pages },
                                { label: "DB Tables", value: activeProject.metrics.tables },
                                { label: "REST Endpoints", value: activeProject.metrics.apis },
                              ].map((metric) => (
                                <div
                                  key={metric.label}
                                  className="border border-black bg-white p-2 text-center rounded-sm shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                                >
                                  <span className="text-neutral-400 block text-[8px] uppercase font-bold mb-0.5">
                                    {metric.label}
                                  </span>
                                  <span className="text-black font-black text-xs">{metric.value}</span>
                                </div>
                              ))}
                            </div>
                          </motion.div>

                          {/* Features & Tech Stack */}
                          <motion.div variants={rowVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {/* Features */}
                            <div className="border border-black bg-white p-3 rounded-sm shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                              <h4 className="text-[9px] font-mono font-bold text-black uppercase tracking-wider mb-2 border-b-2 border-black pb-1">
                                 Features
                              </h4>
                              <div className="space-y-1 text-xs">
                                {activeProject.features.map((feat) => (
                                  <div key={feat} className="flex items-start gap-2 text-gray-700 font-serif">
                                    <span className="text-black font-bold text-xs shrink-0 mt-0.5">✓</span>
                                    <span className="leading-snug">{feat}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Tech Stack */}
                            <div className="border border-black bg-white p-3 rounded-sm shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                              <h4 className="text-[9px] font-mono font-bold text-black uppercase tracking-wider mb-2 border-b-2 border-black pb-1">
                                 Tech Stack
                              </h4>
                              <div className="flex flex-wrap gap-1.5">
                                {activeProject.stack.map((tech) => (
                                  <span
                                    key={tech}
                                    className="border border-black bg-white text-black px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded-sm shadow-[1px_1px_0px_rgba(0,0,0,1)] select-none"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </motion.div>

                          {/* Action Buttons */}
                          <motion.div variants={rowVariants} className="pt-3 border-t-2 border-black flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2 font-mono">
                            <a
                              href={activeProject.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={handleLinkClick}
                              className="px-4 py-1.5 bg-white hover:bg-neutral-50 text-black border-2 border-black font-bold text-xs shadow-[3px_3px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all text-center cursor-none select-none rounded-sm uppercase tracking-tight"
                            >
                              ▶ Launch App
                            </a>
                            <a
                              href={activeProject.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={handleLinkClick}
                              className="px-4 py-1.5 border-2 border-black bg-white hover:bg-neutral-50 text-black font-bold text-xs rounded-sm shadow-[3px_3px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all text-center cursor-none select-none uppercase tracking-tight"
                            >
                               Source Code
                            </a>
                          </motion.div>

                        </motion.div>
                      </AnimatePresence>
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
    </section>
  );
}