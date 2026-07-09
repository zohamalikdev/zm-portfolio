"use client";

import React, { useState, useEffect, type ReactNode } from "react";
import RetroWindow from "@/components/RetroWindow";
import { playClick, playHover, playType, playSuccess } from "@/components/Sound";

// ---------------------------------------------------------------------------
// Paint Toolbox Icons (Visual Frame Only)
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

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const steps = [
    "STARTING OUTBOUND CONNECTION...",
    "CHECKING SECURITY...",
    "SENDING YOUR MESSAGE...",
    "SENT SUCCESSFULLY!",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    playType();
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setShowStatusModal(true);
    setCurrentStep(0);
    setProgress(0);
  };

  useEffect(() => {
    if (!showStatusModal) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        
        const nextProgress = prev + 5;
        if (nextProgress === 25) setCurrentStep(1);
        if (nextProgress === 55) setCurrentStep(2);
        if (nextProgress === 85) setCurrentStep(3);
        
        if (nextProgress === 100) {
          playSuccess();
          setTimeout(() => {
            setShowStatusModal(false);
            setIsSubmitting(false);
            setFormData({ name: "", email: "", message: "" });
          }, 1500);
        }
        return nextProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [showStatusModal]);

  const inputClass = "w-full border-b-2 border-black bg-transparent py-2 text-sm font-mono outline-none focus:border-neutral-400 placeholder-neutral-400 text-black transition-colors";

  return (
    <section
      id="contact"
      className="relative bg-transparent px-3 md:px-8 lg:px-12 py-12 md:py-16 text-black select-none"
    >
      <div className="max-w-6xl mx-auto">
        <RetroWindow
          title="contact_form.bmp - Paint"
          icon="/projects/paint.png"
          statusText="For Help, click Help Topics on the Help Menu."
        >
          {/* Main Paint Canvas Chassis */}
          <div className="bg-[#bfbfbf] p-1 font-sans text-xs flex flex-col shadow-[inset_1px_1px_0_#ffffff]">
            
            {/* Top Menu Bar */}
            <div className="flex items-center gap-4 px-2 py-1 border-b border-[#808080] text-gray-900">
              <span className="cursor-default"><span className="underline">F</span>ile</span>
              <span className="cursor-default"><span className="underline">E</span>dit</span>
              <span className="cursor-default"><span className="underline">V</span>iew</span>
              <span className="cursor-default"><span className="underline">I</span>mage</span>
              <span className="cursor-default"><span className="underline">C</span>olors</span>
              <span className="cursor-default"><span className="underline">H</span>elp</span>
            </div>

            {/* Interface Core Layer */}
            <div className="flex items-stretch gap-1 p-1 bg-[#bfbfbf] min-h-[550px]">
              
              {/* Left Hand Icon Rails */}
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

              {/* CANVAS INTERIOR: Expanded Clean Magazine Layout Sheet */}
              <div className="flex-1 bg-[#262626] p-4 overflow-auto flex items-start justify-center">
                <div className="bg-white border-[3px] border-black text-black w-full max-w-5xl p-6 md:p-8 font-serif shadow-[6px_6px_0px_rgba(0,0,0,1)] tracking-tight">
                  
                  {/* Heading */}
                  <div className="border-b-[4px] border-black pb-4 mb-6 flex justify-between items-baseline">
                    <div>
                      <h2 className="text-3xl font-black font-sans uppercase tracking-tighter leading-none">
                        CONTACT ME
                      </h2>
                      <p className="text-xs font-mono font-bold tracking-widest uppercase mt-1 text-neutral-500">
                        🟢 Available 24/7
                      </p>
                    </div>
                    <div className="font-mono text-[10px] uppercase text-neutral-400 tracking-wider">
                      [PAGE 01]
                    </div>
                  </div>

                  {/* Form Fields */}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-black font-sans uppercase tracking-wider text-black">
                          Your Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          placeholder="Enter your name"
                          value={formData.name}
                          onChange={handleChange}
                          onMouseEnter={playHover}
                          onFocus={playClick}
                          required
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-black font-sans uppercase tracking-wider text-black">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          placeholder="yourname@email.com"
                          value={formData.email}
                          onChange={handleChange}
                          onMouseEnter={playHover}
                          onFocus={playClick}
                          required
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-black font-sans uppercase tracking-wider text-black">
                         Your Message
                      </label>
                      <textarea
                        name="message"
                        placeholder="Write your message here..."
                        value={formData.message}
                        onChange={handleChange}
                        onMouseEnter={playHover}
                        onFocus={playClick}
                        required
                        rows={4}
                        className={`${inputClass} resize-none`}
                      />
                    </div>

                    {/* Submission Row */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between pt-4 gap-4 border-t border-neutral-200">
                      <p className="text-[10px] font-mono text-neutral-400 max-w-xs leading-tight uppercase">
                        * Messages go straight to my inbox.
                      </p>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        onMouseEnter={playHover}
                        onClick={playClick}
                        className="px-5 py-2.5 bg-black hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-widest font-mono transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed border border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5"
                      >
                        {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>

            </div>

            {/* Bottom Palette Swatch Belt */}
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

          {/* Outer Application Action Shelf */}
          <div className="border-t border-white bg-[#bfbfbf] px-3 py-1.5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 text-xs">
            <span className="text-gray-800 font-sans flex items-center gap-1.5 select-none self-center">
              <span className="w-2.5 h-2.5 inline-block border border-t-black border-l-black border-b-white border-r-white bg-green-600" />
              Status: Ready
            </span>
            <div className="flex items-center justify-end font-sans">
              <span className="text-neutral-500 font-mono text-[10px] tracking-widest uppercase">
                 FILL ALL FIELDS TO SEND
              </span>
            </div>
          </div>
        </RetroWindow>
      </div>

      {/* Simplified Status Modal */}
      {showStatusModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-sm bg-white border-[4px] border-black p-6 shadow-[12px_12px_0px_rgba(0,0,0,1)] text-black">
            
            <div className="border-b-2 border-black pb-2 mb-4 flex justify-between items-center">
              <span className="font-mono text-xs font-black uppercase tracking-wider">
                Sending Status
              </span>
              <span className="font-mono text-[10px] text-white bg-black px-1.5 py-0.5">
                {progress}%
              </span>
            </div>

            <div className="space-y-4 font-mono">
              <div className="text-xs tracking-tight min-h-[32px] text-neutral-900 leading-normal">
                &gt; {steps[currentStep]}
              </div>

              {/* Minimal Progress Bar */}
              <div className="w-full h-3 border border-black bg-neutral-100 p-[1px]">
                <div 
                  className="h-full bg-black transition-all duration-100 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="text-[10px] text-neutral-400 uppercase text-right tracking-tight">
                Please wait...
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}