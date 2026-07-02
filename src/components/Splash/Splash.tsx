"use client";

import { motion } from "framer-motion";
import { Waves } from "lucide-react";
import { useCanvasScrollAnimation } from "@/hooks/useCanvasScrollAnimation";
import { getMediaUrl } from "@/config/media";

export default function Splash() {
  const { canvasRef, videoRef, isUsingFrames } = useCanvasScrollAnimation({
    folderName: "splash",
    frameCount: 120,
    fallbackVideoUrl: "/videos/splash.mp4",
    triggerSelector: "#splash-section",
    startTrigger: "top center",
    endTrigger: "bottom center",
    pin: false,
  });

  return (
    <section id="splash-section" className="relative h-[80vh] min-h-[550px] w-full flex items-center justify-center overflow-hidden bg-bg-dark section-divider">
      {/* Background Canvas / Video */}
      {isUsingFrames ? (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-45"
          style={{ filter: "brightness(0.5) contrast(1.15)" }}
        />
      ) : (
        <video
          ref={videoRef}
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-45"
          style={{ filter: "brightness(0.5) contrast(1.15)" }}
        >
          <source src={getMediaUrl("/videos/splash.mp4", "video")} type="video/mp4" />
        </video>
      )}

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-transparent to-bg-dark z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-bg-dark/50 via-transparent to-bg-dark/50 z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,184,255,0.15)_0%,transparent_65%)] z-10 pointer-events-none" />

      {/* Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-primary/40 bg-primary/10 text-primary mb-6"
        >
          <Waves className="w-7 h-7" />
        </motion.div>

        <h2 className="font-poppins font-black text-5xl md:text-7xl lg:text-8xl leading-[0.88] tracking-tight uppercase mb-6">
          <motion.span
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.1 }}
            className="block text-white"
          >
            Feel the Rush
          </motion.span>
          <motion.span
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.2 }}
            className="block text-gradient mt-2"
          >
            Live the Thrill
          </motion.span>
        </h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="text-white/60 text-base md:text-lg font-inter max-w-lg mx-auto font-light leading-relaxed"
        >
          Embark on an unforgettable day packed with luxury vibes, heart-pounding vertical falls, and non-stop aqua action.
        </motion.p>
      </div>
    </section>
  );
}
