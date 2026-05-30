"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function LenisProvider() {
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (mediaQuery.matches) {
      return;
    }

    const lenis = new Lenis({
      autoRaf: true,
      anchors: true,
      lerp: 0.14,
      duration: 0.85,
      wheelMultiplier: 1.05,
      touchMultiplier: 1,
      syncTouch: false,
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return null;
}
