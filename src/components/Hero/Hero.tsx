"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCanvasScrollAnimation } from "@/hooks/useCanvasScrollAnimation";
import BubblesOverlay from "./BubblesOverlay";
import { Zap, Waves, Smile, Utensils, Compass, Gem, Ticket, ArrowRight, Baby, User, Heart } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const CARDS_DATA = [
  {
    stat: "25+",
    title: "Thrill Slides",
    desc: "Experience high-speed vertical drops and twisty tube slides for the ultimate adrenaline rush.",
    icon: Zap,
    color: "from-[#00B8FF] via-blue-500 to-indigo-600",
  },
  {
    stat: "50K+",
    title: "Wave Pool (Sq. Ft)",
    desc: "Surf the ocean-like waves or lounge along the beach in Gujarat's largest wave pool.",
    icon: Waves,
    color: "from-cyan-400 via-teal-500 to-blue-600",
  },
  {
    stat: "10+",
    title: "Kids Attractions",
    desc: "Safe, shallow splash zones with mini slides and fun water tipping buckets for your little ones.",
    icon: Smile,
    color: "from-amber-400 via-orange-500 to-yellow-500",
  },
  {
    stat: "4",
    title: "Food Zones",
    desc: "Savor delicious multi-cuisine meals and refreshing beverages at our premium food stalls.",
    icon: Utensils,
    color: "from-orange-400 via-red-500 to-rose-600",
  },
  {
    stat: "450m",
    title: "Lazy River",
    desc: "Unwind and float along our scenic, tropical lazy river designed for pure relaxation.",
    icon: Compass,
    color: "from-teal-400 via-emerald-500 to-green-600",
  },
  {
    stat: "100%",
    title: "VIP Experience",
    desc: "Relax in style with private VIP seating, personalized services, and premium comfort.",
    icon: Gem,
    color: "from-fuchsia-500 via-purple-600 to-violet-700",
  },
];

export default function Hero() {
  const scrollIndicatorRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const pricingRef = useRef<HTMLDivElement | null>(null);

  const { canvasRef, videoRef, isUsingFrames, isAutoplayComplete } = useCanvasScrollAnimation({
    folderName: "0222",
    frameCount: 240,
    fallbackVideoUrl: "/videos/0222.mp4",
    triggerSelector: "#home",
    startTrigger: "top top",
    endTrigger: "+=350%",
    pin: true, // Pin the hero section during scroll-scrubbing
    extension: "jpg",
    framePrefix: "frame_",
    autoplay: false, // Scroll with the mouse instead of autoplaying on load
  });

  useEffect(() => {
    if (!isAutoplayComplete) return;

    // Clean GSAP context for strict mode double-initialisation and memory leak prevention
    const ctx = gsap.context(() => {
      if (scrollIndicatorRef.current) {
        gsap.to(scrollIndicatorRef.current, {
          opacity: 0,
          y: -20,
          scrollTrigger: {
            trigger: "#home",
            start: "top top",
            end: "top+=150 top",
            scrub: true,
          },
        });
      }
    });

    return () => ctx.revert();
  }, [isAutoplayComplete]);

  useEffect(() => {
    if (!isAutoplayComplete) return;

    const ctx = gsap.context(() => {
      // Initialize cards starting positions
      cardsRef.current.forEach((card, idx) => {
        if (!card) return;
        const isLeft = idx % 2 === 0;
        gsap.set(card, { opacity: 0, x: isLeft ? -100 : 100, pointerEvents: "none" });
      });

      // Initialize pricing starting position
      if (pricingRef.current) {
        gsap.set(pricingRef.current, { opacity: 0, scale: 0.9, y: 30, pointerEvents: "none" });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#home",
          start: "top top",
          end: "+=350%",
          scrub: true,
        },
      });

      // Card 1 (Left) - enters 5% to 10%, exits 15% to 20%
      tl.to(cardsRef.current[0], { opacity: 1, x: 0, pointerEvents: "auto", duration: 5 }, 5)
        .to(cardsRef.current[0], { opacity: 0, x: -100, pointerEvents: "none", duration: 5 }, 15);

      // Card 2 (Right) - enters 20% to 25%, exits 30% to 35%
      tl.to(cardsRef.current[1], { opacity: 1, x: 0, pointerEvents: "auto", duration: 5 }, 20)
        .to(cardsRef.current[1], { opacity: 0, x: 100, pointerEvents: "none", duration: 5 }, 30);

      // Card 3 (Left) - enters 35% to 40%, exits 45% to 50%
      tl.to(cardsRef.current[2], { opacity: 1, x: 0, pointerEvents: "auto", duration: 5 }, 35)
        .to(cardsRef.current[2], { opacity: 0, x: -100, pointerEvents: "none", duration: 5 }, 45);

      // Card 4 (Right) - enters 50% to 55%, exits 60% to 65%
      tl.to(cardsRef.current[3], { opacity: 1, x: 0, pointerEvents: "auto", duration: 5 }, 50)
        .to(cardsRef.current[3], { opacity: 0, x: 100, pointerEvents: "none", duration: 5 }, 60);

      // Card 5 (Left) - enters 65% to 70%, exits 75% to 80%
      tl.to(cardsRef.current[4], { opacity: 1, x: 0, pointerEvents: "auto", duration: 5 }, 65)
        .to(cardsRef.current[4], { opacity: 0, x: -100, pointerEvents: "none", duration: 5 }, 75);

      // Card 6 (Right) - enters 80% to 85%, exits 90% to 95%
      tl.to(cardsRef.current[5], { opacity: 1, x: 0, pointerEvents: "auto", duration: 5 }, 80)
        .to(cardsRef.current[5], { opacity: 0, x: 100, pointerEvents: "none", duration: 5 }, 90);

      // Fade out video/canvas from 90% to 94% to show pricing card on solid dark background
      const mediaElements = [canvasRef.current, videoRef.current].filter(Boolean);
      if (mediaElements.length > 0) {
        tl.to(mediaElements, { opacity: 0, duration: 4 }, 90);
      }

      // Pricing Card (Center) - enters at 91% and stays visible up to 100%
      tl.to(pricingRef.current, { opacity: 1, scale: 1, y: 0, pointerEvents: "auto", duration: 4 }, 91);
    });

    return () => ctx.revert();
  }, [isAutoplayComplete]);

  return (
    <section
      id="home"
      className="relative w-full overflow-hidden bg-bg-dark z-20"
      style={{ height: "100dvh" }} // Dynamic viewport height prevents layout shifts from collapsing mobile browser address bars
    >
      {/* Background Canvas / Video Scrubbing with GPU layer promotion */}
      {isUsingFrames ? (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-100 transform-gpu"
          style={{ filter: "brightness(0.95) contrast(1.05)", willChange: "transform" }}
        />
      ) : (
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          webkit-playsinline="true"
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-100 transform-gpu"
          style={{ filter: "brightness(0.95) contrast(1.05)", willChange: "transform" }}
        >
          <source src="/videos/0222.mp4" type="video/mp4" />
        </video>
      )}

      {/* Interactive Water Bubbles Overlay */}
      <BubblesOverlay />

      {/* Luxury Glass Reflection Overlays */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/2 to-transparent opacity-15 pointer-events-none z-10 skew-y-12 scale-150 transform-gpu" />

      {/* Subtle Dark Gradients for Smooth Transitions (Localized) */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#051421] via-[#051421]/70 to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-bg-dark/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-bg-dark/20 via-transparent to-bg-dark/10 z-10 pointer-events-none" />

      {/* Informative Scroll-scrubbed Cards */}
      {CARDS_DATA.map((card, idx) => {
        const Icon = card.icon;
        const isLeft = idx % 2 === 0;
        return (
          <div
            key={idx}
            ref={(el) => {
              cardsRef.current[idx] = el;
            }}
            className={`absolute z-30 w-[290px] sm:w-[350px] md:w-[410px] p-8 rounded-3xl backdrop-blur-[8px] shadow-[0_20px_50px_rgba(180,235,255,0.12)] flex flex-col gap-4 pointer-events-none opacity-0 border border-[rgba(180,235,255,0.22)] bg-gradient-to-br from-[rgba(180,235,255,0.07)] via-[rgba(180,235,255,0.02)] to-[rgba(7,28,44,0.25)] ${
              isLeft
                ? "left-4 sm:left-8 md:left-16 lg:left-28 top-[45%] md:top-1/2 -translate-y-1/2"
                : "right-4 sm:right-8 md:right-16 lg:right-28 top-[45%] md:top-1/2 -translate-y-1/2"
            }`}
            style={{
              willChange: "transform, opacity",
            }}
          >
            {/* Header: Stat + Icon */}
            <div className="flex items-center justify-between gap-4">
              <span className={`text-4xl md:text-5xl font-poppins font-black text-transparent bg-clip-text bg-gradient-to-r ${card.color} drop-shadow-sm`}>
                {card.stat}
              </span>
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center text-white shadow-lg`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>

            {/* Divider */}
            <div className="w-12 h-[2px] bg-gradient-to-r from-primary to-transparent" />

            {/* Content */}
            <div className="flex flex-col gap-1.5">
              <h3 className="font-poppins font-extrabold text-xl md:text-2xl uppercase text-white tracking-wide">
                {card.title}
              </h3>
              <p className="font-inter text-xs md:text-sm text-white/80 font-light leading-relaxed">
                {card.desc}
              </p>
            </div>
          </div>
        );
      })}

      {/* Pricing Ticket Card (Enters at the end of the scroll) */}
      <div
        ref={pricingRef}
        className="absolute z-30 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] sm:w-[580px] md:w-[780px] lg:w-[880px] p-6 md:p-8 rounded-3xl backdrop-blur-[12px] shadow-[0_30px_70px_rgba(0,184,255,0.25)] border border-[rgba(180,235,255,0.3)] bg-gradient-to-br from-[rgba(180,235,255,0.15)] via-[rgba(7,28,44,0.55)] to-[rgba(5,20,33,0.82)] flex flex-col gap-6 pointer-events-none opacity-0"
        style={{
          willChange: "transform, opacity",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-primary text-xs uppercase tracking-[0.2em] font-bold">
            <Ticket className="w-4 h-4 text-accent animate-pulse" />
            Water Park Rates
          </div>
          <span className="text-[10px] bg-primary/10 text-primary border border-primary/30 px-3 py-1 rounded-full uppercase tracking-wider font-semibold">
            2026 Season
          </span>
        </div>

        <div className="text-center">
          <h3 className="font-poppins font-black text-2xl md:text-4xl uppercase text-white leading-none">
            Water Fun Park <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Tickets</span>
          </h3>
          <p className="font-inter text-xs text-white/50 mt-1.5 font-light">
            Choose your splash pass and get ready for a day of pure thrill and adventure.
          </p>
        </div>

        {/* 3 Column Grid for Child, Adult, Sr. Citizen */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* Child Card */}
          <div className="flex flex-col justify-between p-5 rounded-2xl bg-gradient-to-b from-[rgba(180,235,255,0.12)] via-[rgba(7,28,44,0.35)] to-[rgba(5,20,33,0.65)] border border-[rgba(180,235,255,0.25)] hover:border-[rgba(180,235,255,0.55)] hover:bg-[rgba(180,235,255,0.15)] hover:shadow-[0_10px_30px_rgba(180,235,255,0.2)] transition-all duration-300 text-center gap-4">
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-xl bg-[#00a3e0]/10 flex items-center justify-center text-[#00a3e0] shadow-inner">
                <Baby className="w-6 h-6" />
              </div>
              <div>
                <span className="font-poppins font-black text-lg uppercase text-white block mt-1">Child</span>
                <span className="font-inter text-[10px] text-white/40 block mt-0.5">Max height 4 feet</span>
              </div>
            </div>
            
            <div className="py-2 border-t border-b border-white/5 my-1 flex flex-col items-center">
              <span className="font-poppins font-black text-3xl md:text-4xl text-accent drop-shadow-[0_4px_15px_rgba(255,184,0,0.5)]">₹600</span>
              <span className="font-inter text-[10px] text-white/40 block mt-1">Weekday & Weekend</span>
            </div>

            <span className="text-[10px] text-accent font-bold uppercase tracking-wider animate-pulse">Lunch Free</span>
          </div>

          {/* Adult Card */}
          <div className="flex flex-col justify-between p-5 rounded-2xl bg-gradient-to-b from-[rgba(180,235,255,0.12)] via-[rgba(7,28,44,0.35)] to-[rgba(5,20,33,0.65)] border border-[rgba(180,235,255,0.25)] hover:border-[rgba(180,235,255,0.55)] hover:bg-[rgba(180,235,255,0.15)] hover:shadow-[0_10px_30px_rgba(180,235,255,0.2)] transition-all duration-300 text-center gap-4">
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-xl bg-[#00a3e0]/10 flex items-center justify-center text-[#00a3e0] shadow-inner">
                <User className="w-6 h-6" />
              </div>
              <div>
                <span className="font-poppins font-black text-lg uppercase text-white block mt-1">Adult</span>
                <span className="font-inter text-[10px] text-white/40 block mt-0.5">General Entry Pass</span>
              </div>
            </div>

            <div className="py-2 border-t border-b border-white/5 my-1 flex flex-col items-center">
              <span className="font-poppins font-black text-3xl md:text-4xl text-accent drop-shadow-[0_4px_15px_rgba(255,184,0,0.5)]">₹850</span>
              <span className="font-inter text-[10px] text-white/40 block mt-1">Weekday & Weekend</span>
            </div>

            <span className="text-[10px] text-accent font-bold uppercase tracking-wider animate-pulse">Lunch Free</span>
          </div>

          {/* Sr. Citizen Card */}
          <div className="flex flex-col justify-between p-5 rounded-2xl bg-gradient-to-b from-[rgba(180,235,255,0.12)] via-[rgba(7,28,44,0.35)] to-[rgba(5,20,33,0.65)] border border-[rgba(180,235,255,0.25)] hover:border-[rgba(180,235,255,0.55)] hover:bg-[rgba(180,235,255,0.15)] hover:shadow-[0_10px_30px_rgba(180,235,255,0.2)] transition-all duration-300 text-center gap-4">
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-xl bg-[#00a3e0]/10 flex items-center justify-center text-[#00a3e0] shadow-inner">
                <Heart className="w-6 h-6" />
              </div>
              <div>
                <span className="font-poppins font-black text-lg uppercase text-white block mt-1">Sr. Citizen</span>
                <span className="font-inter text-[10px] text-white/40 block mt-0.5">60+ Years (ID required)</span>
              </div>
            </div>

            <div className="py-2 border-t border-b border-white/5 my-1 flex flex-col items-center">
              <span className="font-poppins font-black text-3xl md:text-4xl text-accent drop-shadow-[0_4px_15px_rgba(255,184,0,0.5)]">₹600</span>
              <span className="font-inter text-[10px] text-white/40 block mt-1">Weekday & Weekend</span>
            </div>

            <span className="text-[10px] text-accent font-bold uppercase tracking-wider animate-pulse">Lunch Free</span>
          </div>
        </div>

        {/* Free Lunch Announcement and CTA Button */}
        <div className="flex flex-col gap-4 border-t border-white/10 pt-4">
          <div className="text-center text-accent font-poppins font-black text-xs md:text-sm uppercase tracking-wider animate-pulse">
            ★ FREE LUNCH INCLUDED WITH EVERY WATER PARK ENTRY TICKET! ★
          </div>
          
          <Link
            href="/booking"
            className="w-full text-center inline-flex justify-center items-center gap-2 bg-[#00a3e0] text-[#051421] border border-transparent font-poppins font-bold py-3.5 rounded-2xl text-xs md:text-sm uppercase tracking-widest shadow-lg shadow-[#00a3e0]/10 hover:bg-transparent hover:text-[#00a3e0] hover:border-[#00a3e0] hover:scale-[1.01] transition-all duration-300 cursor-pointer pointer-events-auto"
          >
            Book Splash Tickets Now
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Small Notice */}
        <div className="text-center font-inter text-[9px] text-white/40 leading-normal">
          *Taxes applicable extra. Free entry for infants under 3.0 Feet height.
        </div>
      </div>

      {/* Mouse scroll indicator - hidden during autoplay, fades in dynamically when scroll is unlocked */}
      <div
        ref={scrollIndicatorRef}
        className={`absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer transition-all duration-700 ease-out ${
          isAutoplayComplete ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        onClick={() => {
          document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-white/50 font-semibold font-inter">
          Scroll to Experience
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
        >
          <motion.div className="w-1.5 h-1.5 bg-primary rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}
