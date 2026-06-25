"use client";

import { motion } from "framer-motion";
import { Shield, Sparkles, Award } from "lucide-react";
import { useCanvasScrollAnimation } from "@/hooks/useCanvasScrollAnimation";

const features = [
  { title: "100% Safety", desc: "Certified lifeguards at every slide", icon: Shield },
  { title: "25+ Slides", desc: "Thrill rides for every age group", icon: Sparkles },
  { title: "Family Zones", desc: "Dedicated kids and elder-safe areas", icon: Award },
];

export default function About() {
  const { canvasRef, videoRef, isUsingFrames } = useCanvasScrollAnimation({
    folderName: "slides",
    frameCount: 120,
    fallbackVideoUrl: "/videos/slides.mp4",
    triggerSelector: "#about",
    startTrigger: "top center",
    endTrigger: "bottom center",
    pin: false,
  });

  return (
    <section
      id="about"
      className="relative py-24 md:py-32 w-full flex items-center bg-[#071C2C] overflow-hidden"
    >
      <div className="section-container w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left: Canvas/Video visual frame */}
        <div className="lg:col-span-6 relative aspect-[4/3] lg:aspect-[16/10] w-full rounded-3xl overflow-hidden border border-white/10 bg-[#051421] shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 via-transparent to-transparent z-10 pointer-events-none" />
          
          {isUsingFrames ? (
            <canvas
              ref={canvasRef}
              className="w-full h-full object-cover relative z-0"
            />
          ) : (
            <video
              ref={videoRef}
              muted
              playsInline
              className="w-full h-full object-cover relative z-0"
            >
              <source src="/videos/slides.mp4" type="video/mp4" />
            </video>
          )}

          {/* Premium badge overlay */}
          <div className="absolute top-4 left-4 z-20 bg-bg-dark/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest text-primary font-bold">
            Live Showcase
          </div>
        </div>

        {/* Right: Text Information */}
        <div className="lg:col-span-6 flex flex-col justify-center gap-6 min-w-0">
          <span className="text-xs tracking-[0.3em] uppercase text-primary font-bold">Discover Luxury</span>
          <h2 className="text-3xl md:text-5xl font-poppins font-black uppercase text-white leading-tight">
            Welcome to the Oasis of{" "}
            <span className="text-gradient">Pure Joy & Thrills</span>
          </h2>

          <p className="text-white/70 text-sm md:text-base font-inter leading-relaxed">
            Chhab Chhaba Chhab Waterpark is a premier luxury aquatic playground. Nestled on the coastal highway, our park blends nature, high-octane water slides, and resort-level hospitality into a cinematic vacation experience.
          </p>
          <p className="text-white/55 text-xs md:text-sm font-inter leading-relaxed">
            Whether you are plunging down our free-fall body slides, dancing in our high-tech rain arenas, or relaxing under private cabanas &mdash; every moment is crafted for absolute comfort and exhilaration.
          </p>

          {/* Feature badges */}
          <div className="grid grid-cols-3 gap-3 mt-2">
            {features.map((feat, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-white/5 border border-white/8 hover:border-primary/25 transition-all group flex flex-col items-center text-center"
              >
                <feat.icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform mb-2" />
                <h4 className="font-poppins font-bold text-white text-[10px] sm:text-xs uppercase">{feat.title}</h4>
                <p className="text-white/40 text-[9px] mt-1 font-inter">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
