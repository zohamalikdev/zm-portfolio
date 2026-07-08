"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

interface OpenWindow {
  id: string;
  title: string;
}

interface WindowManagerContextValue {
  openWindows: OpenWindow[];
  activeId: string | null;
  openWindow: (id: string, title: string) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
}

const WindowManagerContext = createContext<WindowManagerContextValue | null>(null);

export function WindowManagerProvider({ children }: { children: React.ReactNode }) {
  const [openWindows, setOpenWindows] = useState<OpenWindow[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  const openWindow = useCallback((id: string, title: string) => {
    setOpenWindows((prev) => {
      if (prev.some((w) => w.id === id)) return prev;
      return [...prev, { id, title }];
    });
    setActiveId(id);
  }, []);

  const closeWindow = useCallback((id: string) => {
    setOpenWindows((prev) => prev.filter((w) => w.id !== id));
    setActiveId((prev) => (prev === id ? null : prev));
  }, []);

  const focusWindow = useCallback((id: string) => {
    setActiveId(id);
  }, []);

  const value = useMemo(
    () => ({ openWindows, activeId, openWindow, closeWindow, focusWindow }),
    [openWindows, activeId, openWindow, closeWindow, focusWindow]
  );

  return (
    <WindowManagerContext.Provider value={value}>
      {children}
    </WindowManagerContext.Provider>
  );
}

export function useWindowManager() {
  const ctx = useContext(WindowManagerContext);
  if (!ctx) {
    throw new Error("useWindowManager must be used within a WindowManagerProvider");
  }
  return ctx;
}