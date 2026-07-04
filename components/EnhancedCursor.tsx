"use client";
import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  opacity: number;
}

export default function EnhancedCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [prevPos, setPrevPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    let animationFrameId: number;
    
    const move = (e: MouseEvent) => {
      const newPos = { x: e.clientX, y: e.clientY };
      
      // Calculate velocity for trail effect
      const vel = {
        x: newPos.x - prevPos.x,
        y: newPos.y - prevPos.y,
      };
      setVelocity(vel);
      
      setPos(newPos);
      setPrevPos(newPos);
      
      const el = e.target as HTMLElement;
      setHovering(!!el.closest("a, button, [data-hover]"));

      // Add particles on fast movement
      const speed = Math.sqrt(vel.x ** 2 + vel.y ** 2);
      if (speed > 5) {
        setParticles((prev) => [
          ...prev.slice(-15),
          {
            id: Date.now() + Math.random(),
            x: newPos.x,
            y: newPos.y,
            opacity: 0.6,
          },
        ]);
      }
    };

    const click = (e: MouseEvent) => {
      setClicking(true);
      setTimeout(() => setClicking(false), 300);
      
      // Create ripple particles on click
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        const distance = 30;
        setParticles((prev) => [
          ...prev,
          {
            id: Date.now() + Math.random(),
            x: e.clientX + Math.cos(angle) * distance,
            y: e.clientY + Math.sin(angle) * distance,
            opacity: 0.8,
          },
        ]);
      }
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("click", click);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("click", click);
    };
  }, [prevPos]);

  // Animate particles fading out
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({ ...p, opacity: p.opacity - 0.05 }))
          .filter((p) => p.opacity > 0)
      );
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Main cursor */}
      <div
        className="pointer-events-none fixed z-[999] mix-blend-difference transition-all duration-75 ease-linear hidden md:block"
        style={{
          left: pos.x,
          top: pos.y,
          width: hovering ? 40 : clicking ? 50 : 16,
          height: hovering ? 40 : clicking ? 50 : 16,
          border: "2px solid white",
          transform: `translate(-50%, -50%) rotate(${hovering ? 45 : 0}deg)`,
          backgroundColor: hovering ? "transparent" : clicking ? "rgba(255,255,255,0.1)" : "white",
          boxShadow: clicking ? "0 0 30px rgba(255,255,255,0.5)" : "none",
          opacity: clicking ? 1 : 0.9,
        }}
      />

      {/* Trail particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="pointer-events-none fixed z-[998]"
          style={{
            left: particle.x,
            top: particle.y,
            width: 4,
            height: 4,
            backgroundColor: "white",
            borderRadius: "50%",
            opacity: particle.opacity * 0.5,
            transform: "translate(-50%, -50%)",
            boxShadow: `0 0 ${4 + particle.opacity * 8}px rgba(255,255,255,${particle.opacity})`,
          }}
        />
      ))}

      {/* Click ripple effect */}
      {clicking && (
        <div
          className="pointer-events-none fixed z-[998]"
          style={{
            left: pos.x,
            top: pos.y,
            width: 0,
            height: 0,
            border: "2px solid white",
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
            animation: "ripple 0.6s ease-out",
          }}
        />
      )}

      <style>{`
        @keyframes ripple {
          to {
            width: 80px;
            height: 80px;
            opacity: 0;
            border-color: rgba(255, 255, 255, 0);
          }
        }
      `}</style>
    </>
  );
}