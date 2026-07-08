"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Draggable from "react-draggable";
import { useWindowManager } from "@/components/WindowManagerContext";

interface PopupWindowProps {
  id: string; // unique id, used for taskbar registration — e.g. "skills", "tech"
  title: string;
  icon?: string;
  children: React.ReactNode;
  onClose: () => void;
}

export default function PopupWindow({ id, title, icon, children, onClose }: PopupWindowProps) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const { openWindow, closeWindow } = useWindowManager();

  // Register with the taskbar on mount, deregister on unmount.
  useEffect(() => {
    openWindow(id, title);
    return () => closeWindow(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, title]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/25 backdrop-blur-[2px]"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <Draggable handle=".xp-title" nodeRef={nodeRef}>
        <motion.div
          ref={nodeRef}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="w-[470px] max-w-[90vw] overflow-hidden rounded-md border border-[#0A246A] shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
        >
          {/* XP TITLE BAR */}
          <div className="xp-title h-8 cursor-move select-none bg-gradient-to-r from-[#0A53D9] to-[#3A8DFF] flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              {icon && <Image src={icon} alt="" width={16} height={16} />}
              <span className="text-white font-bold text-sm">{title}</span>
            </div>
            <div className="flex gap-1">
              <button className="w-5 h-5 bg-[#ECE9D8] border border-gray-500 text-xs">_</button>
              <button className="w-5 h-5 bg-[#ECE9D8] border border-gray-500 text-xs">□</button>
              <button
                onClick={onClose}
                className="w-5 h-5 bg-[#E04343] hover:bg-red-600 text-white text-xs rounded-sm"
              >
                ×
              </button>
            </div>
          </div>

          {/* CONTENT */}
          <div className="bg-[#ECE9D8] p-6 max-h-[70vh] overflow-y-auto">{children}</div>

          {/* STATUS BAR */}
          <div className="bg-[#ECE9D8] border-t border-gray-400 px-3 py-1 flex justify-between text-xs">
            <span>Ready</span>
            <button
              onClick={onClose}
              className="px-4 py-1 bg-[#ECE9D8] border border-gray-500 hover:bg-gray-200"
            >
              OK
            </button>
          </div>
        </motion.div>
      </Draggable>
    </motion.div>
  );
}