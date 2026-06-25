"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Runtime Boundary caught error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#071C2C] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Glow ambient background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35rem] h-[35rem] bg-red-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-md text-center flex flex-col items-center px-4">
        {/* Animated Warning Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-500 mb-8"
        >
          <AlertTriangle className="w-10 h-10" />
        </motion.div>

        <motion.h1
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl font-poppins font-black uppercase tracking-tight text-white leading-none"
        >
          System Disruption
        </motion.h1>

        <motion.p
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-white/55 font-inter text-sm mt-4 leading-relaxed"
        >
          We encountered an unexpected error while loading this page. Let's try to reset the flow or go back to the safe zone.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 mt-8 w-full"
        >
          <button
            onClick={() => reset()}
            className="flex items-center justify-center gap-2 p-4 rounded-xl bg-primary text-[#051421] hover:bg-[#00a3e0] font-poppins font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-primary/20 w-full"
          >
            <RotateCcw className="w-4 h-4" />
            Try Again
          </button>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 p-4 rounded-xl bg-white/5 border border-white/8 hover:bg-white/10 hover:border-white/20 text-white font-poppins font-bold text-xs uppercase tracking-wider transition-all w-full"
          >
            <Home className="w-4 h-4" />
            Safe Harbor
          </Link>
        </motion.div>

        {/* Error Details */}
        {error.message && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            className="mt-8 text-[10px] font-mono text-white/40 max-w-xs break-all"
          >
            Message: {error.message}
            {error.digest && <span className="block mt-1">Digest: {error.digest}</span>}
          </motion.div>
        )}
      </div>
    </div>
  );
}
