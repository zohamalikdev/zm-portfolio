"use client";

import { motion } from "framer-motion";
import Image from "next/image";
// 🔊 Import our optimized central audio hooks
import { playClick, playHover, playClose } from "@/components/Sound";

interface RetroWindowProps {
  title: string;
  icon?: string;
  children: React.ReactNode;
  menuItems?: string[];
  statusBar?: boolean;
  statusText?: string;
  className?: string;
}

export default function RetroWindow({
  title,
  icon,
  children,
  menuItems,
  statusBar = true,
  statusText = "Ready",
  className = "",
}: RetroWindowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0,0,0,0.35)" }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`bg-gray-300 border-4 border-black shadow-lg ${className} cursor-none`}
    >
      {/* Title Bar */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2 flex items-center justify-between border-b-4 border-black">
        <div className="flex items-center gap-2">
          {icon ? (
            <Image src={icon} alt="" width={16} height={16} />
          ) : (
            <>
              <div className="w-4 h-4 bg-red-500 border-2 border-black" />
              <div className="w-4 h-4 bg-yellow-500 border-2 border-black" />
              <div className="w-4 h-4 bg-green-500 border-2 border-black" />
            </>
          )}
        </div>
        <span className="text-white font-bold text-sm tracking-wider select-none">{title}</span>
        <div className="flex gap-2">
          <button 
            onMouseEnter={playHover}
            onClick={playClick}
            className="w-6 h-6 bg-gray-300 border-2 border-gray-500 border-t-white border-l-white hover:bg-gray-200 transition-colors duration-150 flex items-center justify-center text-xs font-bold active:border-t-gray-500 active:border-l-gray-500 active:border-b-white active:border-r-white"
          >
            _
          </button>
          <button 
            onMouseEnter={playHover}
            onClick={playClick}
            className="w-6 h-6 bg-gray-300 border-2 border-gray-500 border-t-white border-l-white hover:bg-gray-200 transition-colors duration-150 flex items-center justify-center text-xs font-bold active:border-t-gray-500 active:border-l-gray-500 active:border-b-white active:border-r-white"
          >
            □
          </button>
          <button 
            onMouseEnter={playHover}
            onClick={playClose} // 🔊 Play critical close effect on window destruction request
            className="w-6 h-6 bg-gray-300 border-2 border-gray-500 border-t-white border-l-white hover:bg-red-500 hover:text-white transition-colors duration-150 flex items-center justify-center text-xs font-bold active:border-t-gray-500 active:border-l-gray-500 active:border-b-white active:border-r-white"
          >
            ×
          </button>
        </div>
      </div>

      {/* Menu Bar — optional */}
      {menuItems && (
        <div className="bg-gray-200 px-2 py-1 border-b-2 border-black flex gap-4 font-bold text-xs">
          {menuItems.map((item) => (
            <button
              key={item}
              onMouseEnter={playHover} // 🔊 Subtle link alignment drift hover accent
              onClick={playClick}
              className="px-3 py-1 hover:bg-blue-600 hover:text-white transition-colors duration-150 active:bg-blue-700 select-none"
            >
              {item}
            </button>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="bg-white p-6 md:p-8">{children}</div>

      {/* Status Bar — optional */}
      {statusBar && (
        <div className="bg-gray-300 border-t-2 border-black px-4 py-2 flex justify-between items-center text-xs font-bold select-none">
          <span>{statusText}</span>
          <div className="flex gap-4">
            <span>🔴 Secure</span>
            <span>🔵 Fast</span>
          </div>
        </div>
      )}
    </motion.div>
  );
}