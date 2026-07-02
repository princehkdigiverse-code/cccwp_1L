"use client";

import { motion } from "framer-motion";
import { Shield, Sparkles, Award } from "lucide-react";
import { useCanvasScrollAnimation } from "@/hooks/useCanvasScrollAnimation";
import { getMediaUrl } from "@/config/media";

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
      className="relative py-32 md:py-44 w-full flex items-center bg-gradient-to-b from-[#051421] via-[#071C2C] to-[#051421] overflow-hidden"
    >
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/2 -left-32 w-96 h-96 bg-[#00a3e0]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="section-container w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center z-10">

        {/* Left: Canvas/Video visual frame */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-6 relative aspect-[4/3] lg:aspect-[16/10] w-full rounded-3xl overflow-hidden border border-white/15 bg-[#051421] shadow-[0_20px_50px_rgba(0,0,0,0.5)] group"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 via-transparent to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-0 border border-primary/20 rounded-3xl pointer-events-none z-20 group-hover:border-primary/40 transition-colors duration-500" />

          {isUsingFrames !== false ? (
            <canvas
              ref={canvasRef}
              className="w-full h-full object-cover relative z-0"
            />
          ) : (
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover relative z-0"
            >
              <source src={getMediaUrl("/videos/slides.mp4", "video")} type="video/mp4" />
            </video>
          )}

          {/* Premium badge overlay */}
          <div className="absolute top-5 left-5 z-20 bg-bg-dark/70 backdrop-blur-md border border-white/15 px-4 py-1.5 rounded-full text-[11px] uppercase tracking-widest text-primary font-bold flex items-center gap-2 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Live Showcase
          </div>
        </motion.div>

        {/* Right: Text Information */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-6 flex flex-col justify-center gap-6 min-w-0"
        >
          <div className="inline-flex items-center gap-2 text-xs tracking-[0.3em] uppercase text-primary font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            Discover Luxury
          </div>

          <h2 className="text-3xl md:text-5xl font-poppins font-black uppercase text-white leading-[1.15]">
            Welcome to the Oasis of{" "}
            <span className="text-gradient block mt-1">Pure Joy & Thrills</span>
          </h2>

          <p className="text-white/80 text-sm md:text-base font-inter leading-relaxed font-light">
            Chhab Chhaba Chhab Waterpark is a premier luxury aquatic playground. Nestled on the coastal highway, our park blends nature, high-octane water slides, and resort-level hospitality into a cinematic vacation experience.
          </p>
          <p className="text-white/60 text-xs md:text-sm font-inter leading-relaxed font-light">
            Whether you are plunging down our free-fall body slides, dancing in our high-tech rain arenas, or relaxing under private cabanas &mdash; every moment is crafted for absolute comfort and exhilaration.
          </p>

          {/* Feature badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-6">
            {features.map((feat, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/10 hover:border-primary/40 hover:bg-white/[0.07] transition-all duration-300 group flex flex-col items-center text-center shadow-lg hover:-translate-y-1"
              >
                <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20 text-primary mb-3 group-hover:scale-110 group-hover:bg-primary group-hover:text-[#051421] transition-all duration-300">
                  <feat.icon className="w-5 h-5" />
                </div>
                <h4 className="font-poppins font-bold text-white text-xs uppercase tracking-wider">{feat.title}</h4>
                <p className="text-white/50 text-[11px] mt-1.5 font-inter font-light leading-tight">{feat.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
