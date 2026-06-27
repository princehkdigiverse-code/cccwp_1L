"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";
import { Waves } from "lucide-react";
import { useCanvasScrollAnimation } from "@/hooks/useCanvasScrollAnimation";

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!isInView) return;
    let currentStep = 0;
    const steps = 50;
    const stepValue = value / steps;
    const duration = 1500;
    const interval = duration / steps;

    const timer = setInterval(() => {
      currentStep++;
      const currentCount = Math.min(Math.round(stepValue * currentStep), value);
      setCount(currentCount);
      if (currentStep >= steps) {
        setCount(value);
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref} className="font-poppins font-black text-4xl md:text-5xl text-primary block">
      {count}{suffix}
    </span>
  );
}

export default function WavePool() {
  const { canvasRef, videoRef, isUsingFrames } = useCanvasScrollAnimation({
    folderName: "wave",
    frameCount: 120,
    fallbackVideoUrl: "/videos/wave.mp4",
    triggerSelector: "#wave-pool-section",
    startTrigger: "top center",
    endTrigger: "bottom center",
    pin: false,
  });

  return (
    <section id="wave-pool-section" className="relative py-32 md:py-44 bg-[#071C2C] overflow-hidden section-divider">
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left: Text & Stats */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6"
          >
            <span className="text-xs tracking-[0.3em] uppercase text-primary font-bold">Luxury Wave Pool</span>
            <h2 className="text-3xl md:text-5xl font-poppins font-black uppercase text-white leading-tight">
              Ride the Oceanic <br />
              <span className="text-gradient">Tidal Experience</span>
            </h2>

            <p className="text-white/65 text-base md:text-lg font-inter leading-relaxed">
              Experience the closest thing to real ocean swells in our state-of-the-art 2.5 million gallon wave pool. Featuring controlled wave profiles from calm ripples to massive 1.5-meter swells.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-4 border-t border-white/5">
              <div>
                <Counter value={5} suffix="M+" />
                <span className="text-white/40 text-xs font-inter mt-1 block">Happy Visitors</span>
              </div>
              <div>
                <Counter value={25} suffix="+" />
                <span className="text-white/40 text-xs font-inter mt-1 block">Premium Slides</span>
              </div>
              <div>
                <Counter value={100} suffix="%" />
                <span className="text-white/40 text-xs font-inter mt-1 block">Safety Rating</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Video Canvas */}
          <div className="relative group w-full order-first lg:order-last">
            <div className="absolute -inset-1 bg-gradient-to-r from-secondary to-primary rounded-2xl blur opacity-30 group-hover:opacity-45 transition duration-700" />
            <div className="relative rounded-2xl overflow-hidden aspect-video border border-white/5 shadow-2xl bg-black/40">
              {isUsingFrames ? (
                <canvas
                  ref={canvasRef}
                  className="w-full h-full object-cover opacity-85 group-hover:scale-102 transition-transform duration-700"
                />
              ) : (
                <video
                  ref={videoRef}
                  muted
                  playsInline
                  className="w-full h-full object-cover opacity-85 group-hover:scale-102 transition-transform duration-700"
                >
                  <source src="/videos/wave.mp4" type="video/mp4" />
                </video>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#071C2C]/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary">
                  <Waves className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <p className="font-poppins font-bold text-white text-sm">Ocean Simulator</p>
                  <p className="text-white/40 text-xs font-inter">Simulates natural sea currents</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
