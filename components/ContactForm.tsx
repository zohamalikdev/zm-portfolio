"use client";

import React, { useState, useEffect } from "react";
import PopupWindow from "@/components/PopupWindow";
import { playClick, playHover, playType, playSuccess } from "@/components/Sound";
import RetroWindow from "./RetroWindow";

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const steps = [
    "Preparing package protocols...",
    "Encrypting dynamic payloads...",
    "Routing packages to SMTP gateway...",
    "Message delivered successfully!",
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

  // Handles the vintage multi-stage sending progress bar animation
  useEffect(() => {
    if (!showStatusModal) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        
        // Dynamically increment status steps alongside bar progress milestones
        const nextProgress = prev + 5;
        if (nextProgress === 25) setCurrentStep(1);
        if (nextProgress === 55) setCurrentStep(2);
        if (nextProgress === 85) setCurrentStep(3);
        
        if (nextProgress === 100) {
          playSuccess(); // 🔊 Play Windows system confirmation chime!
          setTimeout(() => {
            setShowStatusModal(false);
            setIsSubmitting(false);
            setFormData({ name: "", email: "", message: "" });
          }, 1500);
        }
        return nextProgress;
      });
    }, 120); // ✅ Correctly closed functional block parameter

    return () => clearInterval(interval);
  }, [showStatusModal]);

  const inputClass = "w-full border-2 border-gray-400 bg-white p-2 text-xs font-mono outline-none focus:border-blue-600 focus:bg-amber-50/20 shadow-inner";
  const blockCount = Math.floor(progress / 10);

  return (
    <section id="contact" className="relative p-6 max-w-md mx-auto bg-gray-300 border-2 border-t-white border-l-white border-b-gray-600 border-r-gray-600 shadow-md">
      <RetroWindow>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold mb-1 uppercase text-gray-700">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onMouseEnter={playHover}
            onFocus={playClick}
            required
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-xs font-bold mb-1 uppercase text-gray-700">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onMouseEnter={playHover}
            onFocus={playClick}
            required
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-xs font-bold mb-1 uppercase text-gray-700">Message:</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            onMouseEnter={playHover}
            onFocus={playClick}
            required
            rows={4}
            className={`${inputClass} resize-none`}
          />
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            onMouseEnter={playHover}
            onClick={playClick}
            className="px-6 py-2 bg-gray-300 border-2 border-gray-500 border-t-white border-l-white text-xs font-bold uppercase tracking-wide hover:bg-gray-200 transition-colors duration-150 active:border-t-gray-500 active:border-l-gray-500 active:border-b-white active:border-r-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
          </button>
        </div>
      </form>
     </RetroWindow>
      {/* Retro OS Email Transmission Status Dialog */}
      {showStatusModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="w-80 bg-gray-300 border-2 border-t-white border-l-white border-b-black border-r-black p-1 shadow-2xl">
            {/* Window Top Header Bar */}
            <div className="bg-blue-800 text-white px-2 py-1 flex justify-between items-center text-xs font-bold select-none">
              <span>MailTransferOS.exe</span>
              <div className="bg-gray-300 border border-t-white border-l-white text-black font-black px-1.5 py-0.5 text-[9px] cursor-not-allowed">
                X
              </div>
            </div>

            {/* Dialog Content Area */}
            <div className="p-4 space-y-4">
              <div className="text-xs font-mono text-gray-800 min-h-[32px]">
                {steps[currentStep]}
              </div>

              {/* Classic Windows Segmented Progress Bar Grid Layout */}
              <div className="border-2 border-b-white border-r-white border-t-gray-600 border-l-gray-600 bg-white p-1 flex gap-[2px] h-6">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className={`flex-1 h-full transition-colors duration-700 ${
                      i < blockCount ? "bg-blue-800" : "bg-transparent"
                    }`}
                  />
                ))}
              </div>

              <div className="text-right text-[10px] font-mono text-gray-500">
                {progress}% Completed
              </div>
            </div>
          </div>
        </div>
       
      )}
    </section>
  );
}