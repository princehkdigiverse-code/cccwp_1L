"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useCanvasScrollAnimation } from "@/hooks/useCanvasScrollAnimation";
import { useGsapScroll } from "@/hooks/useGsapScroll";

interface RouteHeroProps {
  title: string;
  subtitle: string;
  videoUrl: string;
  folderName: string;
  frameCount?: number;
  tagline?: string;
}

export default function RouteHero({
  title,
  subtitle,
  videoUrl,
  folderName,
  frameCount = 120,
  tagline = "The Ultimate Aqua Adventure",
}: RouteHeroProps) {
  const visualRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement | null>(null);

  // We set a shorter scroll window trigger for the banner parallax effect
  const { canvasRef, containerRef, videoRef, isUsingFrames } = useCanvasScrollAnimation({
    folderName,
    frameCount,
    fallbackVideoUrl: videoUrl,
    triggerSelector: `#hero-scroll-container-${folderName}`,
    startTrigger: "top top",
    endTrigger: "bottom top",
    pin: false,
  });

  const { heroScroll } = useGsapScroll();

  useEffect(() => {
    if (containerRef.current) {
      heroScroll(
        containerRef.current,
        visualRef.current,
        overlayRef.current,
        titleRef.current,
        subtitleRef.current,
        scrollIndicatorRef.current
      );
    }
  }, [heroScroll, isUsingFrames]);

  return (
    <div
      id={`hero-scroll-container-${folderName}`}
      ref={containerRef}
      className="relative h-[65vh] min-h-[480px] w-full bg-bg-dark border-b border-white/5 overflow-hidden"
    >
      {/* Standard Header Viewport (non-sticky for normal page flow) */}
      <section className="relative h-full w-full flex items-center justify-center overflow-hidden bg-bg-dark z-20">
        
        {/* Visual wrapper to apply subtle parallax scale */}
        <div ref={visualRef} className="absolute inset-0 w-full h-full object-cover z-0">
          {/* Render Canvas or fallback video */}
          {isUsingFrames ? (
            <canvas
              ref={canvasRef}
              className="w-full h-full object-cover z-0 opacity-40 scale-100"
              style={{ filter: "brightness(0.6) contrast(1.1)" }}
            />
          ) : (
            <video
              ref={videoRef}
              muted
              playsInline
              loop
              autoPlay
              className="w-full h-full object-cover z-0 opacity-40 scale-100"
              style={{ filter: "brightness(0.6) contrast(1.1)" }}
            >
              <source src={videoUrl} type="video/mp4" />
            </video>
          )}
        </div>

        {/* Luxury Glass Reflection Overlays */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/2 to-transparent opacity-20 pointer-events-none z-10 skew-y-12 scale-150 transform-gpu" />

        {/* Backdrop overlay */}
        <div ref={overlayRef} className="absolute inset-0 bg-bg-dark/30 z-10 pointer-events-none opacity-30" />

        {/* Deep Dark Decorative Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-transparent to-bg-dark/60 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg-dark/70 via-transparent to-bg-dark/20 z-10 pointer-events-none" />

        {/* Content Container */}
        <div className="relative z-20 max-w-[1400px] mx-auto px-6 lg:px-8 text-center flex flex-col items-center">
          {/* Premium badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs uppercase tracking-[0.25em] font-semibold mb-6 shadow-inner"
          >
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            {tagline}
          </motion.div>

          {/* Title */}
          <h1 ref={titleRef} className="font-poppins font-black text-4xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight uppercase max-w-5xl mb-6">
            <motion.span
              initial={{ y: 40, opacity: 0, filter: "blur(5px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="block text-white"
            >
              {title}
            </motion.span>
          </h1>

          {/* Subtitle */}
          <motion.p
            ref={subtitleRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/70 text-sm md:text-base max-w-2xl leading-relaxed font-light font-inter"
          >
            {subtitle}
          </motion.p>
        </div>

        {/* Subtle indicator */}
        <motion.div
          ref={scrollIndicatorRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 cursor-pointer"
          onClick={() => {
            const nextElem = containerRef.current?.nextElementSibling;
            if (nextElem) {
              nextElem.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          <span className="text-[9px] tracking-[0.3em] uppercase text-white/30 font-semibold font-inter">
            Explore
          </span>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-5 h-8 border border-white/20 rounded-full flex justify-center pt-1"
          >
            <motion.div className="w-1 h-1.5 bg-primary rounded-full" />
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
