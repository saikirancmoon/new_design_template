"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export function LenisProvider() {
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (mediaQuery.matches) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      autoRaf: false,
      anchors: {
        offset: -88,
        duration: 1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      },
      lerp: 0.09,
      duration: 1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 0.9,
      touchMultiplier: 1,
      syncTouch: false,
      smoothWheel: true,
    });

    window.__lenis = lenis;

    const updateScrollTrigger = () => ScrollTrigger.update();
    const refreshScroll = () => {
      lenis.resize();
      ScrollTrigger.refresh();
    };
    const resizeLenis = () => lenis.resize();
    const raf = (time: number) => lenis.raf(time * 1000);

    lenis.on("scroll", updateScrollTrigger);
    ScrollTrigger.addEventListener("refreshInit", resizeLenis);
    ScrollTrigger.defaults({ markers: false });
    window.addEventListener("resize", refreshScroll);
    window.addEventListener("load", refreshScroll);

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const refreshFrame = requestAnimationFrame(() => {
      refreshScroll();
    });

    return () => {
      cancelAnimationFrame(refreshFrame);
      lenis.off("scroll", updateScrollTrigger);
      ScrollTrigger.removeEventListener("refreshInit", resizeLenis);
      window.removeEventListener("resize", refreshScroll);
      window.removeEventListener("load", refreshScroll);
      gsap.ticker.remove(raf);
      if (window.__lenis === lenis) window.__lenis = undefined;
      lenis.destroy();
    };
  }, []);

  return null;
}
