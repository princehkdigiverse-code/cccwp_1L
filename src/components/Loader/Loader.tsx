"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 600);
          return 100;
        }
        const increment = Math.floor(Math.random() * 12) + 4;
        return Math.min(prev + increment, 100);
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#071C2C] overflow-hidden"
        >
          {/* Animated Water Ripples Background */}
          <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
            <motion.div
              animate={{
                scale: [1, 2, 3],
                opacity: [0.5, 0.2, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeOut",
              }}
              className="absolute w-64 h-64 border border-primary rounded-full"
            />
            <motion.div
              animate={{
                scale: [1, 2, 3],
                opacity: [0.5, 0.2, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
                delay: 1.3,
                ease: "easeOut",
              }}
              className="absolute w-64 h-64 border border-secondary rounded-full"
            />
            <motion.div
              animate={{
                scale: [1, 2, 3],
                opacity: [0.5, 0.2, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
                delay: 2.6,
                ease: "easeOut",
              }}
              className="absolute w-64 h-64 border border-accent/60 rounded-full"
            />
          </div>

          {/* Loader content */}
          <div className="relative z-10 flex flex-col items-center px-4">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-4xl md:text-6xl font-poppins font-black tracking-widest text-center text-gradient uppercase"
            >
              Chhab Chhaba Chhab
            </motion.h1>
            <motion.span
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-xs md:text-sm tracking-[0.4em] uppercase text-accent font-medium mt-3"
            >
              Waterpark
            </motion.span>

            {/* Ripple Wave Fill Bar */}
            <div className="w-48 md:w-64 h-[2px] bg-white/10 rounded-full mt-12 overflow-hidden relative">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "easeInOut" }}
                className="h-full bg-gradient-to-r from-primary via-secondary to-accent"
              />
            </div>

            {/* Progress Count */}
            <motion.span
              key={progress}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-white/60 font-mono text-sm mt-4 tracking-wider"
            >
              {progress}%
            </motion.span>
          </div>

          {/* Wave ripple bottom decorative element */}
          <div className="absolute bottom-0 left-0 right-0 h-24 overflow-hidden opacity-20 pointer-events-none">
            <svg
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              className="absolute bottom-0 w-full h-full text-primary fill-current"
            >
              <path d="M0,0 C150,90 350,10 500,70 C650,130 850,20 1000,80 C1150,140 1350,30 1500,90 L1500,120 L0,120 Z" />
            </svg>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
