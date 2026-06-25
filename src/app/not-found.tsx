"use client";

import { motion } from "framer-motion";
import { Waves, ArrowLeft, Home, Ticket, HelpCircle } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#071C2C] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Decorative Ripples */}
      <div className="absolute inset-0 flex items-center justify-center opacity-25 pointer-events-none z-0">
        <motion.div
          animate={{
            scale: [1, 2.5, 4],
            opacity: [0.4, 0.15, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 6,
            ease: "easeOut",
          }}
          className="absolute w-[30rem] h-[30rem] border border-primary rounded-full"
        />
        <motion.div
          animate={{
            scale: [1, 2.5, 4],
            opacity: [0.4, 0.15, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 6,
            delay: 2,
            ease: "easeOut",
          }}
          className="absolute w-[30rem] h-[30rem] border border-secondary rounded-full"
        />
      </div>

      <div className="relative z-10 max-w-xl text-center flex flex-col items-center px-4">
        {/* Animated wave logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-20 h-20 rounded-full bg-primary/10 border border-primary/40 flex items-center justify-center text-primary mb-8"
        >
          <Waves className="w-10 h-10 animate-bounce" />
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-7xl md:text-8xl font-poppins font-black tracking-tight text-gradient leading-none uppercase"
        >
          404
        </motion.h1>

        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-2xl md:text-3xl font-poppins font-black uppercase text-white tracking-wide mt-4"
        >
          Lost at Sea
        </motion.h2>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-white/55 font-inter text-sm md:text-base mt-4 leading-relaxed max-w-sm"
        >
          The page you are looking for has been swept away by a tidal wave or doesn't exist anymore. Let's get you back to safe shores.
        </motion.p>

        {/* Quick Links Grid */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 w-full"
        >
          <Link
            href="/"
            className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-white/5 border border-white/8 hover:border-primary/40 hover:bg-white/10 text-white font-poppins font-bold text-xs uppercase tracking-wider transition-all"
          >
            <Home className="w-4 h-4 text-primary" />
            Home
          </Link>
          <Link
            href="/booking"
            className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-white/5 border border-white/8 hover:border-primary/40 hover:bg-white/10 text-white font-poppins font-bold text-xs uppercase tracking-wider transition-all"
          >
            <Ticket className="w-4 h-4 text-accent" />
            Tickets
          </Link>
          <Link
            href="/contact"
            className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-white/5 border border-white/8 hover:border-primary/40 hover:bg-white/10 text-white font-poppins font-bold text-xs uppercase tracking-wider transition-all"
          >
            <HelpCircle className="w-4 h-4 text-secondary" />
            Support
          </Link>
        </motion.div>

        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-10"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs text-primary font-poppins font-bold uppercase tracking-widest border-b border-primary/20 hover:border-primary transition-all py-1"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Safety
          </Link>
        </motion.div>
      </div>

      {/* Decorative Wave Waveforms Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden opacity-10 pointer-events-none">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="absolute bottom-0 w-full h-full text-primary fill-current"
        >
          <path d="M0,0 C150,90 350,10 500,70 C650,130 850,20 1000,80 C1150,140 1350,30 1500,90 L1500,120 L0,120 Z" />
        </svg>
      </div>
    </div>
  );
}
