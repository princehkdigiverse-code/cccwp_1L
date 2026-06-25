"use client";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import SmoothScroll from "@/components/ScrollAnimations/SmoothScroll";
import Loader from "@/components/Loader/Loader";
import RouteHero from "@/components/Hero/RouteHero";
import { KeyRound, Car, UtensilsCrossed, ShieldCheck, HeartPulse, CloudRain, Smile, Waves, HardHat, Award, Sparkles } from "lucide-react";
import { MEDIA_CONFIG } from "@/config/media";
import { useReveal, useFadeUp, useStagger } from "@/hooks/useAnimationSystem";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import AnimatedButton from "@/components/ui/AnimatedButton";
import SectionWrapper from "@/components/ui/SectionWrapper";

const FACILITIES_LIST = [
  { name: "Smart Lockers", desc: "RFID-enabled smart locker bands for cashless operations and absolute security.", icon: KeyRound },
  { name: "Secure Parking", desc: "Spacious multi-level parking structure for up to 1,200 vehicles with 24/7 CCTV monitoring.", icon: Car },
  { name: "Multi-Cuisine Food Court", desc: "Clean food courts serving premium cuisines, freshly prepared snacks, and chilled mocktails.", icon: UtensilsCrossed },
  { name: "Premium Changing Rooms", desc: "High-end hygiene-compliant changing areas, separate cubicles, and temperature-controlled showers.", icon: HardHat },
  { name: "Kids Splash Zone", desc: "Shallow, fully protected adventure pools with soft-touch slide modules for our youngest guests.", icon: Smile },
  { name: "High-Tech Rain Dance", desc: "Spacious dance zone with immersive DJ sound systems and high-pressure refreshing rain sprayers.", icon: CloudRain },
  { name: "Cinematic Wave Pool", desc: "A massive simulated ocean pool producing waves up to 1.5m, complete with a sandy shoreline.", icon: Waves },
  { name: "Fully Staffed First Aid", desc: "In-house medical room with qualified nurses, first-response trauma kits, and standby ambulance.", icon: HeartPulse },
  { name: "Professional Safety Team", desc: "Over 80 certified lifeguards guarding slides, pools, and guest activity zones continuously.", icon: ShieldCheck },
];

export default function FacilitiesClient() {
  const facilitiesHeadingRef = useReveal();
  const gridContainerRef = useStagger(".facility-card");

  const trustHeadingRef = useReveal();
  const trustContentRef = useFadeUp();
  const ctaContainerRef = useFadeUp();

  return (
    <>
      <Loader />
      <SmoothScroll>
        <Navbar />
        <main className="bg-bg-dark overflow-hidden">
          <RouteHero
            title="Park Facilities"
            subtitle="Premium conveniences designed for your absolute comfort, security, and relaxation."
            videoUrl={MEDIA_CONFIG.videos.wave.url}
            folderName={MEDIA_CONFIG.videos.wave.folder}
            tagline="World-Class Services"
          />

          {/* Overview Section */}
          <SectionWrapper id="overview" bg="blue">
            <SectionHeading
              tagline="Guest Conveniences"
              titleNormal="Designed for"
              titleGradient="Your Comfort"
              headingRef={facilitiesHeadingRef as any}
              description="Enjoy an outstanding resort-level experience. We cover all technical, safety, and hospitality needs so you can focus entirely on making memories with your family."
            />
          </SectionWrapper>

          {/* Feature Cards Grid */}
          <SectionWrapper id="grid" bg="dark" glow>
            <div
              ref={gridContainerRef as any}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {FACILITIES_LIST.map((fac, idx) => {
                const Icon = fac.icon;
                return (
                  <GlassCard
                    key={idx}
                    className="facility-card flex flex-col items-start opacity-0 translate-y-[20px]"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-6 shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-poppins font-bold text-white text-base tracking-wide uppercase mb-3">{fac.name}</h3>
                    <p className="text-white/55 font-inter text-xs md:text-sm leading-relaxed">{fac.desc}</p>
                  </GlassCard>
                );
              })}
            </div>
          </SectionWrapper>

          {/* Why Choose Us Section */}
          <SectionWrapper id="trust" bg="blue">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <SectionHeading
                  tagline="Premium Standards"
                  titleNormal="Why Families Trust"
                  titleGradient="Chhab Chhaba Chhab"
                  centered={false}
                  headingRef={trustHeadingRef as any}
                />
                <div ref={trustContentRef as any} className="opacity-0 translate-y-[30px] -mt-6">
                  <p className="text-white/55 font-inter text-sm md:text-base leading-relaxed">
                    We maintain strict adherence to international quality standards, ensuring our park is clean, safe, and exciting.
                  </p>
                  <div className="flex flex-col gap-4 mt-8">
                    {[
                      "Six-stage active German pool water filtration systems.",
                      "Certified first-responders guarding slide parameters.",
                      "Hygienic food prep standards with 100% pure vegetarian options.",
                    ].map((point, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
                          <Award className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <span className="text-white/70 text-sm font-inter">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Graphical Card */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-3xl blur opacity-20" />
                <GlassCard className="relative bg-[#071C2C] border border-white/8 rounded-3xl p-8 md:p-10 shadow-2xl" hoverEffect={false}>
                  <span className="text-xs tracking-[0.25em] uppercase text-primary font-bold flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-accent" />
                    Guest Promise
                  </span>
                  <h3 className="font-poppins font-black text-white text-xl uppercase tracking-wider mt-4">
                    Safety & Quality First
                  </h3>
                  <p className="text-white/55 text-xs md:text-sm font-inter leading-relaxed mt-4">
                    "Our pools undergo hourly chemical testing and continuous filtration cycles. We guarantee crystal clear water and a completely rash-free swimming experience for children and adults alike."
                  </p>
                  <p className="text-white/30 text-[10px] uppercase font-bold tracking-widest mt-6">
                    — Operations Director, Chhab Chhaba Chhab
                  </p>
                </GlassCard>
              </div>
            </div>
          </SectionWrapper>

          {/* Call to Action */}
          <SectionWrapper id="cta" bg="dark" ref={ctaContainerRef as any} className="opacity-0 translate-y-[40px]" glow>
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-xs tracking-[0.3em] uppercase text-accent font-semibold block">Ready for Action?</span>
              <h2 className="text-3xl md:text-5xl font-poppins font-black uppercase text-white mt-4">
                Join Us for the <span className="text-gradient">Ultimate Adventure</span>
              </h2>
              <p className="text-white/65 font-inter text-sm md:text-base mt-4 max-w-md mx-auto">
                Secure your tickets online now and skip the queues at the entrance gate.
              </p>
              <div className="mt-8">
                <AnimatedButton href="/booking" variant="primary">
                  Book Tickets Now
                </AnimatedButton>
              </div>
            </div>
          </SectionWrapper>
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
