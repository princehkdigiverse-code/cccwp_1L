"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useGsapScroll() {
  useEffect(() => {
    ScrollTrigger.refresh();
  }, []);

  // Helper to check reduced motion preference
  const isReducedMotion = () => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  };

  const revealHeading = (element: HTMLElement | null) => {
    if (!element) return;
    const reduced = isReducedMotion();

    gsap.fromTo(
      element,
      { y: reduced ? 0 : 30, opacity: 0, filter: reduced ? "none" : "blur(4px)" },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: reduced ? 0.3 : 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  };

  const fadeUp = (element: HTMLElement | null, delay = 0) => {
    if (!element) return;
    const reduced = isReducedMotion();

    gsap.fromTo(
      element,
      { y: reduced ? 0 : 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: reduced ? 0.3 : 0.8,
        delay: reduced ? 0 : delay,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  };

  const staggerCards = (container: HTMLElement | null, selector: string) => {
    if (!container) return;
    const cards = container.querySelectorAll(selector);
    if (!cards.length) return;
    const reduced = isReducedMotion();

    gsap.fromTo(
      cards,
      { y: reduced ? 0 : 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: reduced ? 0.2 : 0.6,
        stagger: reduced ? 0 : 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  };

  const parallaxMedia = (container: HTMLElement | null, element: HTMLElement | null) => {
    if (!container || !element) return;
    const reduced = isReducedMotion();

    if (reduced) {
      // No parallax scrolling for reduced motion, just show standard scale
      gsap.set(element, { scale: 1, y: 0 });
      return;
    }

    gsap.fromTo(
      element,
      { scale: 1.05, y: -20 },
      {
        scale: 1.15,
        y: 20,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );
  };

  const heroScroll = (
    container: HTMLElement | null,
    visual: HTMLElement | null,
    overlay: HTMLElement | null,
    title: HTMLElement | null,
    subtitle: HTMLElement | null,
    cta: HTMLElement | null
  ) => {
    if (!container) return;
    const reduced = isReducedMotion();

    if (reduced) {
      // Don't apply scroll parallax triggers for reduced motion
      return;
    }

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    if (visual) {
      timeline.to(visual, { scale: 1.08, ease: "none" }, 0);
    }
    if (overlay) {
      timeline.to(overlay, { opacity: 0.6, ease: "none" }, 0);
    }
    if (title) {
      timeline.to(title, { y: -80, opacity: 0.2, ease: "none" }, 0);
    }
    if (subtitle) {
      timeline.to(subtitle, { y: -40, opacity: 0.1, ease: "none" }, 0);
    }
    if (cta) {
      timeline.to(cta, { y: -20, opacity: 0, ease: "none" }, 0);
    }
  };

  return {
    revealHeading,
    fadeUp,
    staggerCards,
    parallaxMedia,
    heroScroll,
  };
}
