"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const IMAGES = [
  { src: "/images/slide1.png", alt: "Modern Waterpark Slide" },
  { src: "/images/slide2.png", alt: "Premium Wave Pool Sunset" },
  { src: "/images/slide3.png", alt: "Interactive Kids Splash Zone" },
  { src: "/images/slide4.png", alt: "Tranquil Tropical Lazy River" },
  { src: "/images/slide1.png", alt: "Winding High-Speed Tubes" },
  { src: "/images/slide2.png", alt: "Luxury Private Cabanas" },
];

export default function Gallery() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  return (
    <section id="gallery" className="relative py-32 md:py-44 bg-[#051421] overflow-hidden section-divider">
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-primary/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs tracking-[0.3em] uppercase text-primary font-bold">Visual Journey</span>
          <h2 className="text-3xl md:text-5xl font-poppins font-black uppercase text-white mt-2 leading-tight">
            Our Premium <span className="text-gradient">Gallery</span>
          </h2>
          <p className="text-white/55 font-inter text-sm md:text-base max-w-xl mx-auto mt-4">
            Take a visual tour through our luxury waterpark amenities, extreme action slides, and relaxing beach zones.
          </p>
        </div>

        {/* 3-column even grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {IMAGES.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: idx * 0.07 }}
              onClick={() => setActiveIdx(idx)}
              className="relative h-72 rounded-2xl overflow-hidden group cursor-pointer border border-white/5 bg-white/3"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-bg-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="w-11 h-11 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center text-primary">
                  <ZoomIn className="w-5 h-5" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-bg-dark to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-[10px] text-accent uppercase tracking-wider font-semibold">Chhab Chhaba Chhab</p>
                <h4 className="text-sm font-poppins font-bold text-white mt-0.5">{img.alt}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {activeIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveIdx(null)}
            className="fixed inset-0 z-[9999] bg-[#071C2C]/95 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
          >
            <button
              onClick={() => setActiveIdx(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); setActiveIdx((activeIdx - 1 + IMAGES.length) % IMAGES.length); }}
              className="absolute left-6 p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-all z-10"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black/40 shadow-2xl cursor-default"
            >
              <Image
                src={IMAGES[activeIdx].src}
                alt={IMAGES[activeIdx].alt}
                fill
                className="object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 to-transparent">
                <span className="text-[10px] text-accent font-semibold tracking-widest uppercase">Visual Preview</span>
                <h3 className="text-base font-poppins font-bold text-white mt-0.5">{IMAGES[activeIdx].alt}</h3>
              </div>
            </motion.div>

            <button
              onClick={(e) => { e.stopPropagation(); setActiveIdx((activeIdx + 1) % IMAGES.length); }}
              className="absolute right-6 p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-all z-10"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
