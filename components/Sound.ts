// components/Sound.ts
"use client";

const audioCache: Record<string, HTMLAudioElement | null> = {
  boot: null,
  click: null,
  open: null,
  close: null,
  hover: null,
  type: null,
  success: null,
};

// Variable to track keyboard typing audio pacing
let lastTypeTime = 0;

function triggerAudio(key: string, filePath: string, volume: number) {
  if (typeof window === "undefined") return;

  try {
    if (!audioCache[key]) {
      audioCache[key] = new Audio(filePath);
      audioCache[key].volume = volume;
    }

    const audio = audioCache[key];
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    }
  } catch (error) {
    console.error(`Audio error [${key}]:`, error);
  }
}

export function playStartup() { triggerAudio("boot", "/sounds/boot.mp3", 0.6); }
export function playClick()   { triggerAudio("click", "/sounds/click.mp3", 0.4); }
export function playOpen()    { triggerAudio("open", "/sounds/open.mp3", 0.5); }
export function playClose()   { triggerAudio("close", "/sounds/close.mp3", 0.35); }
export function playHover()   { triggerAudio("hover", "/sounds/hover.mp3", 0.25); }
export function playSuccess() { triggerAudio("success", "/sounds/success.mp3", 0.5); }

export function playType() {
  const now = Date.now();
  // Only trigger the typing clack if at least 90ms has passed since the last character
  if (now - lastTypeTime > 90) {
    triggerAudio("type", "/sounds/type.mp3", 0.3);
    lastTypeTime = now;
  }
}