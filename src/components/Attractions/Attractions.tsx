"use client";

import { motion } from "framer-motion";
import { Sparkles, Flame, Waves, Heart, Shield } from "lucide-react";
import { useCanvasScrollAnimation } from "@/hooks/useCanvasScrollAnimation";

const ATTRACTIONS = [
  {
    name: "Kamikaze Drop",
    category: "Extreme Thrill",
    desc: "An 18-meter near-vertical free-fall slide launching you at 50 km/h.",
    icon: Flame,
    iconBg: "bg-red-500/10",
    iconColor: "text-red-400",
  },
  {
    name: "Cyclone Funnel",
    category: "High Gravity",
    desc: "Spin down a high-gravity giant funnel before splashing into the deep pool.",
    icon: Waves,
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    name: "Tornado Wave",
    category: "Family Raft",
    desc: "Launch with up to 4 riders on an inflatable raft up a massive vertical wall.",
    icon: Heart,
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-400",
  },
  {
    name: "Lazy River Cruise",
    category: "Relaxation",
    desc: "Drift along our beautifully landscaped 300-meter slow-current river.",
    icon: Shield,
    iconBg: "bg-teal-500/10",
    iconColor: "text-teal-400",
  },
];

export default function Attractions() {
  const { canvasRef, videoRef, isUsingFrames } = useCanvasScrollAnimation({
    folderName: "child",
    frameCount: 120,
    fallbackVideoUrl: "/videos/child.mp4",
    triggerSelector: "#attractions",
    startTrigger: "top center",
    endTrigger: "bottom center",
    pin: false,
  });

  return (
    <section id="attractions" className="relative py-32 md:py-44 bg-[#051421] overflow-hidden section-divider">
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <div>
            <span className="text-xs tracking-[0.3em] uppercase text-primary font-bold">The Main Event</span>
            <h2 className="text-3xl md:text-5xl font-poppins font-black uppercase text-white mt-2 leading-tight">
              World-Class <br />
              <span className="text-gradient">Aqua Attractions</span>
            </h2>
          </div>
          <p className="text-white/55 font-inter text-sm md:text-base max-w-md">
            Our park features some of the highest and fastest water structures in the region, engineered for maximum thrill and absolute safety.
          </p>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Video Canvas */}
          <div className="lg:col-span-7 group relative rounded-2xl overflow-hidden border border-white/5 bg-white/3 p-3">
            <div className="relative rounded-xl overflow-hidden aspect-[16/9] bg-black/40">
              {isUsingFrames ? (
                <canvas
                  ref={canvasRef}
                  className="w-full h-full object-cover opacity-80 group-hover:scale-102 transition-transform duration-700"
                />
              ) : (
                <video
                  ref={videoRef}
                  muted
                  playsInline
                  className="w-full h-full object-cover opacity-80 group-hover:scale-102 transition-transform duration-700"
                >
                  <source src="/videos/child.mp4" type="video/mp4" />
                </video>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#051421]/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-accent/30 bg-accent/10 text-accent text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                Featured: Family Adventure Arena
              </div>
            </div>
            <div className="mt-5 px-2 pb-2">
              <h3 className="font-poppins font-black text-xl uppercase text-white tracking-wide">Aqua Play Zone for Children</h3>
              <p className="text-white/60 font-inter text-sm mt-2 leading-relaxed">
                A massive shallow splash pool customized for toddlers and children. Features water cannons, mini-slides, climbing meshes, and a giant bucket that pours refreshing water every 5 minutes.
              </p>
            </div>
          </div>

          {/* Right: Cards */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {ATTRACTIONS.map((attr, idx) => {
              const IconComponent = attr.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: idx * 0.08 }}
                  className="group glass-card p-6 rounded-2xl border border-white/5 flex gap-4 items-start hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${attr.iconBg} border border-white/5`}>
                    <IconComponent className={`w-5 h-5 ${attr.iconColor}`} />
                  </div>
                  <div>
                    <span className="text-[10px] tracking-[0.2em] uppercase text-accent font-semibold">{attr.category}</span>
                    <h4 className="font-poppins font-bold text-base text-white mt-0.5">{attr.name}</h4>
                    <p className="text-white/55 font-inter text-xs mt-1 leading-relaxed">{attr.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
