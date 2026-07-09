"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import RetroWindow from "@/components/RetroWindow";
import { playClick } from "@/components/Sound";

// 🚀 STEP 1: Upgraded Software Package Dataset
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
    github: "#",
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
    github: "#",
  },
];

export default function WorkSection() {
  const [selected, setSelected] = useState<string>("bazaar");
  const [imgError, setImgError] = useState<Record<string, boolean>>({});
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

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
    <section id="work" className="relative bg-transparent px-3 md:px-8 lg:px-12 py-12 md:py-16 text-gray-900">
      <RetroWindow>
        {/* Header Ribbon */}
        <div className="border-b-2 border-t-2 border-gray-300 bg-gradient-to-r from-blue-600 to-blue-700 px-3 py-2 mb-4 select-none shadow-[inset_1px_1px_0_rgba(255,255,255,0.3),inset_-1px_-1px_0_rgba(0,0,0,0.3)]">
          <h2 className="text-xs font-bold font-mono text-white flex items-center gap-2">
            📂 Program Files
          </h2>
        </div>

        {/* SPLIT-PANE DESKTOP INTERFACE CONTAINER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          
          {/* LEFT EXPLORER NAVIGATION */}
          <div className="lg:col-span-4 space-y-2">
            <p className="text-[10px] font-bold font-mono text-gray-600 uppercase tracking-wider mb-2 px-2 select-none">
               Installed Systems
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
                    className={`w-full text-left flex items-center gap-3 px-3 py-2.5 transition-all duration-100 font-mono text-xs cursor-pointer rounded-sm ${
                      isCurrent
                        ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold shadow-[inset_1px_1px_0_rgba(255,255,255,0.3),inset_-1px_-1px_0_rgba(0,0,0,0.4),0_2px_4px_rgba(0,0,0,0.3)]"
                        : isHovered
                        ? "bg-blue-100 border border-blue-300 shadow-[inset_1px_1px_0_rgba(255,255,255,0.6)]"
                        : "bg-white border border-gray-300 shadow-[inset_1px_1px_0_rgba(255,255,255,1),inset_-1px_-1px_0_rgba(128,128,128,0.4)]"
                    }`}
                  >
                    <Image 
                      src={project.icon} 
                      alt="" 
                      width={20} 
                      height={20} 
                      className="shrink-0 drop-shadow-sm" 
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-bold">{project.name}</p>
                      <p className={`text-[9px] truncate ${isCurrent ? "text-blue-100" : "text-gray-500"}`}>
                        {project.tagline}
                      </p>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* RIGHT APPLICATION DETAIL PANEL */}
          <div className="lg:col-span-8 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-400 p-4 shadow-[inset_1px_1px_0_rgba(255,255,255,1),inset_-1px_-1px_0_rgba(0,0,0,0.1),0_3px_8px_rgba(0,0,0,0.15)] rounded-sm">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="space-y-4 font-sans"
              >
                {/* Visual Snapshot Frame */}
                <div className="border-2 border-gray-300 bg-gray-100 p-1.5 shadow-[inset_1px_1px_0_rgba(255,255,255,1),inset_-1px_-1px_0_rgba(0,0,0,0.2)]">
                  <div className="relative aspect-[16/9] w-full border-2 border-gray-400 bg-gray-900 overflow-hidden flex items-center justify-center shadow-[inset_1px_1px_4px_rgba(0,0,0,0.3)]">
                    {!imgError[activeProject.id] ? (
                      <Image
                        src={activeProject.screenshot}
                        alt={`${activeProject.name} Capture Frame`}
                        fill
                        className="object-cover"
                        onError={() => setImgError(prev => ({ ...prev, [activeProject.id]: true }))}
                      />
                    ) : (
                      <div className="w-full h-full p-4 font-mono text-xs text-green-400 flex flex-col justify-between bg-black">
                        <div>
                          <p className="text-gray-500">// STAGE_RENDER_CONNECTED</p>
                          <p className="text-blue-400 mt-1">SYS: {activeProject.name}</p>
                        </div>
                        <div className="text-center text-gray-600 text-[10px] animate-pulse">
                          [ Image binary sandbox context pending live swap ]
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Primary Package Metadata Strip */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 border-b-2 border-gray-300 pb-3">
                  <div className="min-w-0">
                    <h2 className="text-sm font-bold text-gray-900 font-mono flex items-center gap-2 truncate">
                      📁 {activeProject.name}
                    </h2>
                    <p className="text-xs text-gray-600 font-mono mt-0.5">{activeProject.tagline}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <div>{renderStatusBadge(activeProject.status)}</div>
                    <div className="text-gray-700 border-2 border-gray-400 bg-gradient-to-b from-white to-gray-50 px-2 py-1 text-[10px] rounded-sm font-mono font-bold shadow-[inset_1px_1px_0_rgba(255,255,255,1),inset_-1px_-1px_0_rgba(0,0,0,0.1)]">
                      v{activeProject.version.slice(1)}
                    </div>
                  </div>
                </div>

                {/* Problem & Solution Boxes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Problem Statement */}
                  <div className="border-2 border-red-300 bg-gradient-to-br from-red-50 to-red-25 p-3 rounded-sm shadow-[inset_1px_1px_0_rgba(255,255,255,0.6),0_1px_2px_rgba(0,0,0,0.05)]">
                    <h4 className="text-[9px] font-mono font-bold text-red-700 uppercase tracking-wider mb-1.5">⚠️ Problem</h4>
                    <p className="text-xs text-gray-700 leading-relaxed">{activeProject.problem}</p>
                  </div>

                  {/* Solution Strategy */}
                  <div className="border-2 border-green-300 bg-gradient-to-br from-green-50 to-green-25 p-3 rounded-sm shadow-[inset_1px_1px_0_rgba(255,255,255,0.6),0_1px_2px_rgba(0,0,0,0.05)]">
                    <h4 className="text-[9px] font-mono font-bold text-green-700 uppercase tracking-wider mb-1.5">💡 Solution</h4>
                    <p className="text-xs text-gray-700 leading-relaxed">{activeProject.solution}</p>
                  </div>
                </div>

                {/* Architecture Metrics */}
                <div>
                  <h4 className="text-[9px] font-mono font-bold text-blue-700 uppercase tracking-wider mb-2 px-1">📊 Architecture Metrics</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-[10px]">
                    {[
                      { label: "Lines of Code", value: activeProject.metrics.loc },
                      { label: "Modules", value: activeProject.metrics.pages },
                      { label: "DB Tables", value: activeProject.metrics.tables },
                      { label: "REST Endpoints", value: activeProject.metrics.apis },
                    ].map((metric) => (
                      <div
                        key={metric.label}
                        className="border-2 border-gray-300 bg-gradient-to-b from-white to-gray-100 p-2 text-center rounded-sm shadow-[inset_1px_1px_0_rgba(255,255,255,0.8),inset_-1px_-1px_0_rgba(0,0,0,0.1)]"
                      >
                        <span className="text-gray-500 block text-[8px] uppercase font-bold mb-0.5">
                          {metric.label}
                        </span>
                        <span className="text-gray-800 font-bold text-xs">{metric.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features & Tech Stack */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Features */}
                  <div className="border-2 border-gray-300 bg-white p-3 rounded-sm shadow-[inset_1px_1px_0_rgba(255,255,255,1),inset_-1px_-1px_0_rgba(0,0,0,0.05)]">
                    <h4 className="text-[9px] font-mono font-bold text-gray-700 uppercase tracking-wider mb-2 border-b-2 border-gray-300 pb-1">
                      ✔ Features
                    </h4>
                    <div className="space-y-1 text-xs">
                      {activeProject.features.map((feat) => (
                        <div key={feat} className="flex items-start gap-2 text-gray-700">
                          <span className="text-green-600 font-bold text-xs shrink-0 mt-0.5">✓</span>
                          <span className="leading-snug">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="border-2 border-gray-300 bg-white p-3 rounded-sm shadow-[inset_1px_1px_0_rgba(255,255,255,1),inset_-1px_-1px_0_rgba(0,0,0,0.05)]">
                    <h4 className="text-[9px] font-mono font-bold text-gray-700 uppercase tracking-wider mb-2 border-b-2 border-gray-300 pb-1">
                       Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {activeProject.stack.map((tech) => (
                        <span
                          key={tech}
                          className="border-2 border-gray-300 bg-gradient-to-b from-blue-100 to-blue-50 text-gray-700 px-2 py-1 text-[10px] font-mono font-semibold rounded-sm shadow-[inset_1px_1px_0_rgba(255,255,255,0.8),0_1px_2px_rgba(0,0,0,0.05)] select-none"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-3 border-t-2 border-gray-300 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2 font-mono">
                  <a
                    href={activeProject.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleLinkClick}
                    className="px-4 py-2 bg-gradient-to-b from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 active:from-blue-700 active:to-blue-800 text-white font-bold text-xs border-2 border-blue-800 shadow-[inset_1px_1px_0_rgba(255,255,255,0.3),0_2px_4px_rgba(0,0,0,0.2)] active:shadow-[inset_1px_1px_0_rgba(0,0,0,0.2)] active:scale-95 transition-all text-center cursor-pointer select-none rounded-sm"
                  >
                    ▶ Launch App
                  </a>
                  <a
                    href={activeProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleLinkClick}
                    className="px-4 py-2 border-2 border-gray-400 bg-gradient-to-b from-white to-gray-100 hover:from-blue-50 hover:to-gray-50 active:from-gray-100 active:to-gray-200 text-gray-700 font-bold text-xs rounded-sm shadow-[inset_1px_1px_0_rgba(255,255,255,1),inset_-1px_-1px_0_rgba(0,0,0,0.1)] active:shadow-[inset_1px_1px_0_rgba(0,0,0,0.1)] active:scale-95 transition-all text-center cursor-pointer select-none"
                  >
                     Source Code
                  </a>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </RetroWindow>
    </section>
  );
}