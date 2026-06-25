"use client";

import { motion } from "framer-motion";
import {
  KeyRound, Car, UtensilsCrossed, CloudRain,
  Smile, Users, ShieldCheck, HeartPulse,
} from "lucide-react";

const FACILITIES = [
  { name: "Secure Lockers", desc: "RFID-enabled smart locker panels to keep all your personal assets safe.", icon: KeyRound },
  { name: "Spacious Parking", desc: "Secure multi-level parking lot with automated entry for up to 1,200 vehicles.", icon: Car },
  { name: "Luxury Food Court", desc: "Multi-cuisine restaurants, juice bars, and cafes serving fresh hygienic food.", icon: UtensilsCrossed },
  { name: "Rain Dance Arena", desc: "Massive outdoor dancing arena with premium DJ sound and high-pressure rain nozzles.", icon: CloudRain },
  { name: "Kids Adventure Zone", desc: "Dedicated shallow pool areas with soft playgrounds tailored for safety.", icon: Smile },
  { name: "Family Cabanas", desc: "Premium shaded lounge zones and private cabanas available for rental.", icon: Users },
  { name: "Certified Safety", desc: "International safety standards with certified lifeguards at every slide exit.", icon: ShieldCheck },
  { name: "24/7 First Aid", desc: "In-house medical center with qualified nursing staff and emergency response.", icon: HeartPulse },
];

export default function Facilities() {
  return (
    <section id="facilities" className="relative py-16 bg-[#071C2C] overflow-hidden">
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-secondary/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-xs tracking-[0.3em] uppercase text-primary font-bold">Guest Conveniences</span>
          <h2 className="text-3xl md:text-5xl font-poppins font-black uppercase text-white mt-2 leading-tight">
            Premium <span className="text-gradient">Facilities</span>
          </h2>
          <p className="text-white/55 font-inter text-sm md:text-base max-w-xl mx-auto mt-3">
            We provide everything you need for a comfortable, secure, and stress-free adventure at Chhab Chhaba Chhab.
          </p>
        </div>

        {/* 4-column card grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {FACILITIES.map((fac, idx) => {
            const IconComponent = fac.icon;
            return (
              <motion.div
                key={idx}
                variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } } }}
                className="glass-card p-6 rounded-2xl border border-white/5 flex flex-col items-start hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4 shrink-0">
                  <IconComponent className="w-5 h-5" />
                </div>
                <h3 className="font-poppins font-bold text-white text-sm tracking-wide uppercase mb-2">{fac.name}</h3>
                <p className="text-white/55 font-inter text-xs leading-relaxed">{fac.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
