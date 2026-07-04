"use client";

import React from "react";

interface SplitrvealProps {
  text: string;
  baseDelay?: number;
  delay?: number;
  staggerDelay?: number;
  className?: string;
}

export default function Splitrveal({
  text,
  baseDelay = 0,
  delay = 0,
  staggerDelay = 0.03,
  className = "",
}: SplitrvealProps) {
  const letters = text.split("");
  const totalDelay = baseDelay + delay;

  return (
    <span className={`inline-block ${className}`}>
      {letters.map((letter, index) => (
        <span
          key={`${letter}-${index}`}
          className="inline-block"
          style={{
            animation: `revealLetter 0.5s ease-out forwards`,
            animationDelay: `${totalDelay + index * staggerDelay}s`,
            opacity: 0,
            transform: "translateY(20px)",
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </span>
      ))}

      <style>{`
        @keyframes revealLetter {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </span>
  );
}