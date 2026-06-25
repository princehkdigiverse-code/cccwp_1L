"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { animate } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

// Reduced motion helper
const isReducedMotion = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

// Hook: Fade Up
export function useFadeUp(delay = 0) {
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const reduced = isReducedMotion();
    const trigger = gsap.fromTo(
      el,
      { y: reduced ? 0 : 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: reduced ? 0.3 : 0.8,
        delay: reduced ? 0 : delay,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => {
      trigger.scrollTrigger?.kill();
      trigger.kill();
    };
  }, [delay]);

  return elementRef;
}

// Hook: Reveal Heading
export function useReveal() {
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const reduced = isReducedMotion();
    const trigger = gsap.fromTo(
      el,
      { y: reduced ? 0 : 30, opacity: 0, filter: reduced ? "none" : "blur(4px)" },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: reduced ? 0.3 : 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => {
      trigger.scrollTrigger?.kill();
      trigger.kill();
    };
  }, []);

  return elementRef;
}

// Hook: Parallax Media
export function useParallax() {
  const containerRef = useRef<HTMLElement | null>(null);
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const el = elementRef.current;
    if (!container || !el) return;

    const reduced = isReducedMotion();
    if (reduced) {
      gsap.set(el, { scale: 1, y: 0 });
      return;
    }

    const trigger = gsap.fromTo(
      el,
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

    return () => {
      trigger.scrollTrigger?.kill();
      trigger.kill();
    };
  }, []);

  return { containerRef, elementRef };
}

// Hook: Stagger Elements
export function useStagger(selector: string) {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll(selector);
    if (!cards.length) return;

    const reduced = isReducedMotion();
    const trigger = gsap.fromTo(
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

    return () => {
      trigger.scrollTrigger?.kill();
      trigger.kill();
    };
  }, [selector]);

  return containerRef;
}

// Hook: Animated Counter
export function useCounterAnimation(value: number, duration = 2) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            const obj = { val: 0 };
            animate(obj.val, value, {
              duration: duration,
              ease: "easeOut",
              onUpdate: (latest) => setCount(Math.floor(latest)),
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [value, duration, hasAnimated]);

  return { count, containerRef };
}
