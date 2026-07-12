"use client";

import React, { ReactNode } from "react";
import Image from "next/image";

interface ToolIcon {
  key: string;
  label: string;
  active?: boolean;
  svg: ReactNode;
}

interface MsPaintWindowProps {
  title: string;
  icon?: string;
  children: ReactNode;
  showToolPanel?: boolean;
  statusText?: string;
  menuItems?: string[];
  activeTool?: string; // which tool key should render as "pressed in"
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

export default function MsPaintWindow({
  title,
  icon,
  children,
  showToolPanel = true,
  statusText = "Ready",
  menuItems = ["File", "Edit", "View", "Image", "Colors", "Help"],
  activeTool = "rectangle",
}: MsPaintWindowProps) {
  return (
    <div className="bg-[#bfbfbf] p-1 font-sans text-xs flex flex-col shadow-[inset_1px_1px_0_#ffffff] border-2 border-black">
      {/* Title Bar — authentic Paint style: app icon + title, not colored dots */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-2 sm:px-3 py-1 sm:py-1.5 flex items-center justify-between border-b-2 border-black">
        <div className="flex items-center gap-2 min-w-0">
          {icon && <Image src={icon} alt="" width={16} height={16} className="shrink-0" />}
          <span className="text-white font-bold text-[9px] sm:text-xs tracking-wider truncate">
            {title}
          </span>
        </div>
        <div className="flex gap-1 shrink-0">
          <button className="w-5 sm:w-6 h-5 sm:h-6 bg-gray-300 border-2 border-gray-500 border-t-white border-l-white hover:bg-gray-200 flex items-center justify-center text-[8px] font-bold">
            _
          </button>
          <button className="w-5 sm:w-6 h-5 sm:h-6 bg-gray-300 border-2 border-gray-500 border-t-white border-l-white hover:bg-gray-200 flex items-center justify-center text-[8px] font-bold">
            □
          </button>
          <button className="w-5 sm:w-6 h-5 sm:h-6 bg-red-600 border-2 border-gray-500 border-t-white border-l-white hover:bg-red-700 flex items-center justify-center text-white text-[8px] font-bold">
            ×
          </button>
        </div>
      </div>

      {/* Menu Bar */}
      <div className="bg-gray-300 px-2 py-0.5 sm:py-1 border-b-2 border-black flex gap-3 sm:gap-4 font-bold text-[9px] sm:text-xs overflow-x-auto">
        {menuItems.map((item) => (
          <span key={item} className="cursor-default whitespace-nowrap hover:bg-gray-400 px-1 transition-colors">
            <span className="underline">{item[0]}</span>
            {item.slice(1)}
          </span>
        ))}
      </div>

      {/* Main Content Area — no more forced min-h-[500px]. The row now
          sizes itself to whatever content is passed in, so short content
          (like the About card) doesn't get padded out with a huge slab
          of empty dark canvas underneath it. */}
      <div className="flex flex-col lg:flex-row gap-1 p-1 bg-[#bfbfbf]">
        {/* Tool Panel — now actually renders TOOL_ICONS instead of blank squares */}
        {showToolPanel && (
          <div className="hidden sm:flex flex-col gap-0.5 p-1 bg-[#bfbfbf] w-[56px] shrink-0">
            <div className="grid grid-cols-2 gap-0.5">
              {TOOL_ICONS.map((tool) => (
                <div
                  key={tool.key}
                  title={tool.label}
                  className={`w-6 h-6 flex items-center justify-center cursor-pointer select-none ${
                    tool.key === activeTool
                      ? "bg-[#dfdfdf] border-2 border-t-[#808080] border-l-[#808080] border-b-white border-r-white shadow-[inset_1px_1px_1px_rgba(0,0,0,0.35)]"
                      : "bg-[#bfbfbf] border-2 border-t-white border-l-white border-b-[#808080] border-r-[#808080] hover:bg-gray-300"
                  }`}
                >
                  <div className="w-[18px] h-[18px]">{tool.svg}</div>
                </div>
              ))}
            </div>

            {/* Brush Size Preview */}
            <div className="h-11 mt-1 bg-[#bfbfbf] border-2 border-t-[#808080] border-l-[#808080] border-b-white border-r-white p-1 flex items-center justify-center">
              <div className="w-full h-full bg-[#bfbfbf] border border-t-[#808080] border-l-[#808080] border-b-white border-r-white flex flex-col justify-center gap-1 px-2">
                <div className="w-full h-[4px] bg-black" />
                <div className="w-full h-[2px] bg-black" />
                <div className="w-2/3 h-[1px] bg-black" />
              </div>
            </div>
          </div>
        )}

        {/* Canvas Content Area */}
        <div className="flex-1 bg-[#262626] p-2 sm:p-3 md:p-4 overflow-auto">
          {children}
        </div>
      </div>

      {/* Color Palette Bar */}
      <div className="p-1 bg-[#bfbfbf] border-t-2 border-white flex items-center gap-1 sm:gap-1.5 overflow-x-auto">
        <div className="w-6 sm:w-7 h-6 sm:h-7 bg-[#bfbfbf] border-2 border-t-[#808080] border-l-[#808080] border-b-white border-r-white relative shrink-0 cursor-pointer">
          <div className="absolute top-0.5 left-0.5 w-3 sm:w-4 h-3 sm:h-4 bg-black border border-white z-20 shadow-sm" />
          <div className="absolute bottom-0.5 right-0.5 w-3 sm:w-4 h-3 sm:h-4 bg-white border border-[#808080] z-10" />
        </div>

        <div className="grid grid-flow-col grid-rows-2 gap-[1px] bg-black p-[1px] overflow-x-auto">
          {COLOR_PALETTE.map((color, idx) => (
            <div
              key={idx}
              className="w-2.5 sm:w-3 h-2.5 sm:h-3 cursor-pointer border border-transparent hover:border-white shrink-0 transition-all"
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      </div>

      {/* Status Bar */}
      <div className="border-t-2 border-white bg-[#bfbfbf] px-2 sm:px-3 py-1 sm:py-1.5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-1.5 sm:gap-2 text-[8px] sm:text-xs">
        <span className="text-gray-800 font-sans flex items-center gap-1 sm:gap-1.5 select-none truncate">
          <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 inline-block border border-t-black border-l-black border-b-white border-r-white bg-green-600 shrink-0" />
          {statusText}
        </span>
        <span className="text-neutral-500 font-mono text-[7px] sm:text-[9px] tracking-widest uppercase text-right whitespace-nowrap">
          MS Paint © Windows XP
        </span>
      </div>
    </div>
  );
}