"use client";

import React, { useState, useEffect } from "react";
import { playClick, playHover, playType, playSuccess } from "@/components/Sound";

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const steps = [
    "INITIALIZING PACKAGE PROTOCOLS...",
    "ENCRYPTING DYNAMIC PAYLOADS...",
    "ROUTING TO SMTP GATEWAY...",
    "TRANSMISSION COMPLETE.",
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

  // High-contrast, clean magazine styling tokens
  const inputClass = "w-full border-b-2 border-black bg-transparent py-2 text-sm font-mono outline-none focus:border-neutral-400 placeholder-neutral-400 text-black transition-colors";

  return (
    <section 
      id="contact" 
      className="relative max-w-2xl mx-auto bg-white border-[3px] border-black text-black p-6 md:p-10 shadow-[8px_8px_0px_rgba(0,0,0,1)] font-sans"
    >
      {/* Editorial Header Layout */}
      <div className="border-b-[4px] border-black pb-4 mb-8 flex justify-between items-baseline">
        <div>
          <h2 className="text-3xl font-black uppercase tracking-tighter leading-none">
            CONTACT
          </h2>
          <p className="text-xs font-mono font-bold tracking-widest uppercase mt-1 text-neutral-500">
            // SUBMIT AN INQUIRY
          </p>
        </div>
        <div className="font-mono text-[10px] uppercase text-neutral-400 tracking-wider">
          [SEC_07 // MSG_OUT]
        </div>
      </div>

      {/* Main Submission Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-black">
              01 / Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="e.g., John Doe"
              value={formData.name}
              onChange={handleChange}
              onMouseEnter={playHover}
              onFocus={playClick}
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-black">
              02 / Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="name@domain.com"
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
          <label className="block text-xs font-black uppercase tracking-wider text-black">
            03 / Message Payload
          </label>
          <textarea
            name="message"
            placeholder="Type your transmission here..."
            value={formData.message}
            onChange={handleChange}
            onMouseEnter={playHover}
            onFocus={playClick}
            required
            rows={5}
            className={`${inputClass} resize-none`}
          />
        </div>

        {/* Editorial Action Layout Footer */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between pt-4 gap-4 border-t border-neutral-200">
          <p className="text-[11px] font-mono text-neutral-500 max-w-xs leading-tight">
            * Submissions are piped directly into the gateway architecture and processed instantly.
          </p>
          <button
            type="submit"
            disabled={isSubmitting}
            onMouseEnter={playHover}
            onClick={playClick}
            className="px-6 py-3 bg-black hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-widest font-mono transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "DISPATCHING..." : "DISPATCH TRANSMISSION"}
          </button>
        </div>
      </form>

      {/* High-Contrast Editorial Status Overlay Modal */}
      {showStatusModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="w-full max-w-sm bg-white border-[4px] border-black p-6 shadow-[12px_12px_0px_rgba(0,0,0,1)] text-black">
            
            <div className="border-b-2 border-black pb-2 mb-4 flex justify-between items-center">
              <span className="font-mono text-xs font-black uppercase tracking-wider">
                System Log Status
              </span>
              <span className="font-mono text-[10px] text-white bg-black px-1.5 py-0.5">
                {progress}%
              </span>
            </div>

            <div className="space-y-4 font-mono">
              <div className="text-xs tracking-tight min-h-[32px] text-neutral-900 leading-normal">
                &gt; {steps[currentStep]}
              </div>

              {/* Minimal Stark Progress Bar Divider Container */}
              <div className="w-full h-3 border border-black bg-neutral-100 p-[1px]">
                <div 
                  className="h-full bg-black transition-all duration-100 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="text-[10px] text-neutral-400 uppercase text-right tracking-tight">
                Processing pipeline...
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}