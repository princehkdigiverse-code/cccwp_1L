"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import SmoothScroll from "@/components/ScrollAnimations/SmoothScroll";
import Loader from "@/components/Loader/Loader";
import RouteHero from "@/components/Hero/RouteHero";
import BookingComponent from "@/components/Booking/Booking";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown, HelpCircle } from "lucide-react";
import { MEDIA_CONFIG } from "@/config/media";
import { useReveal, useStagger } from "@/hooks/useAnimationSystem";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import AnimatedButton from "@/components/ui/AnimatedButton";
import SectionWrapper from "@/components/ui/SectionWrapper";

const PRICING_TIERS = [
  {
    name: "Silver",
    price: "999",
    childPrice: "699",
    desc: "Perfect for a budget-friendly fun day with the family.",
    features: [
      "Access to all 25+ regular slides",
      "Access to Wave Pools & Kids Zone",
      "Standard changing room entry",
      "Free parking pass",
    ],
    accent: "border-white/5",
    buttonBg: "bg-white/5 border border-white/10 hover:bg-white/10 text-white",
  },
  {
    name: "Gold",
    price: "1,299",
    childPrice: "899",
    desc: "Includes our gourmet multi-cuisine lunch coupon.",
    features: [
      "Access to all 25+ regular slides",
      "Access to Wave Pools & Kids Zone",
      "Standard changing room entry",
      "Gourmet lunch buffet coupon",
      "Complimentary Wi-Fi",
    ],
    accent: "border-primary/20",
    buttonBg: "bg-primary/10 border border-primary/20 hover:bg-primary/20 text-primary",
  },
  {
    name: "VIP Express",
    price: "1,999",
    childPrice: "1,399",
    desc: "Fast-Track lanes with luxury perks and cabanas.",
    features: [
      "Fast-Track queue lane access",
      "Complimentary smart lockers",
      "Access to private Beach Cabanas",
      "Premium changing room & towel access",
      "Gourmet lunch + welcome drinks",
    ],
    accent: "border-accent/40 shadow-lg shadow-accent/5",
    buttonBg: "bg-accent text-bg-dark font-black hover:scale-[1.02] transition-transform",
    isPopular: true,
  },
];

const FAQ_ITEMS = [
  {
    q: "What is the dress code inside the park?",
    a: "Proper swim apparel made of nylon or synthetic materials is mandatory for safety. Loose garments, sarees, and cotton shirts are strictly prohibited on slides.",
  },
  {
    q: "Are changing rooms and smart lockers available?",
    a: "Yes! We have premium separate changing suites and warm shower entries. RFID-enabled smart lockers are available for rental at ₹100, or free with VIP passes.",
  },
  {
    q: "Can I reschedule or cancel my booking?",
    a: "Tickets are non-refundable but can be rescheduled once for free up to 24 hours prior to your scheduled visit date via our guest helpline.",
  },
  {
    q: "Is food from outside allowed inside the park?",
    a: "Outside food and beverages are not allowed inside the park due to hygiene and health guidelines. We host a luxury multi-cuisine food court catering to all preferences.",
  },
];

function FaqAccordion({ q, a }: { q: string; a: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <GlassCard
      className="faq-accordion p-0 overflow-hidden transition-all duration-300 opacity-0 translate-y-[20px]"
      hoverEffect={false}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-white/3 transition-colors"
      >
        <span className="font-poppins font-bold text-white text-sm md:text-base pr-4 flex items-center gap-3">
          <HelpCircle className="w-5 h-5 text-primary shrink-0" />
          {q}
        </span>
        <ChevronDown className={`w-4 h-4 text-white/50 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="p-6 pt-0 border-t border-white/5 text-white/60 font-inter text-xs md:text-sm leading-relaxed">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </GlassCard>
  );
}

export default function BookingClient() {
  const pricingHeadingRef = useReveal();
  const pricingGridRef = useStagger(".price-card");
  const faqHeadingRef = useReveal();
  const faqGridRef = useStagger(".faq-accordion");

  return (
    <>
      <Loader />
      <SmoothScroll>
        <Navbar />
        <main className="bg-bg-dark overflow-hidden">
          <RouteHero
            title="Book Passes"
            subtitle="Reserve your family passes online. Pick a date, choose your tier, and skip the entry queue."
            videoUrl={MEDIA_CONFIG.videos.sunset.url}
            folderName={MEDIA_CONFIG.videos.sunset.folder}
            tagline="Instant Access"
          />

          {/* Pricing Tiers Section */}
          <SectionWrapper id="tiers" bg="blue">
            <SectionHeading
              tagline="Pass Categories"
              titleNormal="Choose Your"
              titleGradient="Experience"
              headingRef={pricingHeadingRef as any}
              description="Select a pass category that fits your style. Upgrade to VIP to bypass queues entirely."
            />

            {/* Pricing Cards */}
            <div ref={pricingGridRef as any} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {PRICING_TIERS.map((tier, idx) => (
                <div
                  key={idx}
                  className={`price-card glass-card rounded-3xl p-8 border flex flex-col justify-between relative opacity-0 translate-y-[30px] ${tier.accent}`}
                >
                  {tier.isPopular && (
                    <div className="absolute -top-3.5 right-6 bg-accent text-[#051421] text-[9px] uppercase font-bold tracking-widest px-3 py-1 rounded-full shadow-lg">
                      Best Seller
                    </div>
                  )}
                  <div>
                    <span className="text-xs font-poppins font-black uppercase text-primary tracking-widest">{tier.name}</span>
                    <div className="mt-4 flex items-baseline text-white">
                      <span className="text-4xl font-poppins font-black tracking-tight">₹{tier.price}</span>
                      <span className="ml-1 text-xs text-white/50">/adult</span>
                    </div>
                    <p className="text-[10px] text-white/40 mt-1">Children (under 120cm): ₹{tier.childPrice}</p>
                    <p className="text-white/60 font-inter text-xs leading-relaxed mt-4 mb-6">{tier.desc}</p>
                    
                    <div className="h-px bg-white/5 my-6" />

                    <ul className="flex flex-col gap-3 mb-8">
                      {tier.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-primary" />
                          </div>
                          <span className="text-white/70 text-xs md:text-sm font-inter">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <AnimatedButton
                    href="#booking-calculator"
                    variant={tier.isPopular ? "accent" : "secondary"}
                    className="w-full text-center"
                  >
                    Choose {tier.name}
                  </AnimatedButton>
                </div>
              ))}
            </div>
          </SectionWrapper>

          {/* Booking Form Area */}
          <div id="booking-calculator">
            <BookingComponent />
          </div>

          {/* Frequently Asked Questions */}
          <SectionWrapper id="faq" bg="blue">
            <SectionHeading
              tagline="Support Desk"
              titleNormal="Frequently Asked"
              titleGradient="Questions"
              headingRef={faqHeadingRef as any}
              description="Everything you need to know about clothing guidelines, passes, and booking procedures."
            />

            <div ref={faqGridRef as any} className="flex flex-col gap-4 max-w-3xl mx-auto">
              {FAQ_ITEMS.map((faq, idx) => (
                <FaqAccordion key={idx} q={faq.q} a={faq.a} />
              ))}
            </div>
          </SectionWrapper>
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
