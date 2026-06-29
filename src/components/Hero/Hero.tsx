"use client";

import { motion } from "framer-motion";
import { Play, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-bg-dark z-20 pt-28 pb-16"
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-70 scale-100"
        style={{ filter: "brightness(0.8) contrast(1.1)" }}
      >
        <source src="/videos/0222.mp4" type="video/mp4" />
      </video>

      {/* Luxury Glass Reflection Overlays */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/2 to-transparent opacity-20 pointer-events-none z-10 skew-y-12 scale-150 transform-gpu" />

      {/* Backdrop overlay */}
      <div className="absolute inset-0 bg-bg-dark/15 z-10 pointer-events-none" />

      {/* Deep Dark Decorative Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-transparent to-bg-dark/30 z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-bg-dark/40 via-transparent to-bg-dark/10 z-10 pointer-events-none" />

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
          The Ultimate Aqua Adventure
        </motion.div>

        {/* Huge Heading */}
        <h1 className="font-poppins font-black text-4xl md:text-7xl lg:text-[7rem] xl:text-[8.5rem] leading-[0.9] tracking-tight uppercase max-w-6xl mb-6">
          <motion.span
            initial={{ y: 60, opacity: 0, filter: "blur(10px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="block text-white"
          >
            Chhab Chhaba Chhab
          </motion.span>
          <motion.span
            initial={{ y: 60, opacity: 0, filter: "blur(10px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="block text-gradient mt-2"
          >
            Waterpark
          </motion.span>
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-white/70 text-sm md:text-lg font-inter max-w-2xl mb-8 leading-relaxed font-light"
        >
          Dive into premium luxury water attractions, towering slides, and high-energy wave pools designed for the ultimate family escape.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-4 justify-center w-full sm:w-auto"
        >
          <a
            href="#booking"
            className="w-full sm:w-auto text-center bg-[#00a3e0] text-[#051421] border border-transparent font-poppins font-bold px-9 py-4 rounded-full text-xs uppercase tracking-widest shadow-lg shadow-[#00a3e0]/10 hover:bg-transparent hover:text-[#00a3e0] hover:border-[#00a3e0] hover:scale-[1.03] transition-all duration-300 cursor-pointer"
          >
            Book Tickets
          </a>
          <a
            href="#about"
            className="w-full sm:w-auto text-center inline-flex items-center justify-center gap-2 border border-white/20 hover:border-[#00a3e0] hover:bg-white/5 hover:text-[#00a3e0] text-white font-poppins font-bold px-9 py-4 rounded-full text-xs uppercase tracking-widest hover:scale-[1.03] transition-all duration-300 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" />
            Explore Park
          </a>
        </motion.div>
      </div>

      {/* Mouse scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => {
          document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-white/40 font-semibold font-inter">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2"
        >
          <motion.div className="w-1.5 h-1.5 bg-primary rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
