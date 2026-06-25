"use client";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import SmoothScroll from "@/components/ScrollAnimations/SmoothScroll";
import Loader from "@/components/Loader/Loader";
import RouteHero from "@/components/Hero/RouteHero";
import AttractionsComponent from "@/components/Attractions/Attractions";
import { Flame, Sparkles, Compass, Shield, HelpCircle, ArrowRight } from "lucide-react";
import Image from "next/image";
import { MEDIA_CONFIG } from "@/config/media";
import { useReveal, useFadeUp, useStagger } from "@/hooks/useAnimationSystem";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import AnimatedButton from "@/components/ui/AnimatedButton";
import SectionWrapper from "@/components/ui/SectionWrapper";

const ADVENTURE_CARDS = [
  {
    name: "Kamikaze Drop",
    height: "18 meters",
    speed: "50 km/h",
    thrill: "Extreme",
    desc: "Feel the ultimate rush of gravity as you slide down a near-vertical drop. Not for the faint of heart.",
    icon: Flame,
    image: MEDIA_CONFIG.images.placeholders.aerial,
    color: "from-red-500 to-orange-500",
  },
  {
    name: "Cyclone Funnel",
    height: "15 meters",
    speed: "40 km/h",
    thrill: "High",
    desc: "A massive enclosed tube that spins you into a giant open funnel before a final splash drop.",
    icon: Compass,
    image: MEDIA_CONFIG.images.placeholders.cyclone,
    color: "from-blue-500 to-indigo-500",
  },
  {
    name: "Tornado Wave",
    height: "14 meters",
    speed: "35 km/h",
    thrill: "High",
    desc: "Ride with friends on a multi-person raft that sweeps up a towering zero-gravity wave wall.",
    icon: Sparkles,
    image: MEDIA_CONFIG.images.placeholders.kidsSplash,
    color: "from-purple-500 to-pink-500",
  },
  {
    name: "Lazy River Cruise",
    height: "Ground Level",
    speed: "5 km/h",
    thrill: "Low",
    desc: "Drift along a scenic 300-meter slow-current tropical river with misting tunnels and water curtains.",
    icon: Shield,
    image: MEDIA_CONFIG.images.placeholders.lazyRiver,
    color: "from-teal-400 to-emerald-500",
  },
];

export default function AttractionsClient() {
  const catalogHeadingRef = useReveal();
  const cardsContainerRef = useStagger(".adventure-card");
  const safetyContainerRef = useFadeUp();

  return (
    <>
      <Loader />
      <SmoothScroll>
        <Navbar />
        <main className="bg-bg-dark overflow-hidden">
          <RouteHero
            title="Water Attractions"
            subtitle="Explore our catalog of record-breaking slides, wave pools, and premium tropical lagoons."
            videoUrl={MEDIA_CONFIG.videos.child.url}
            folderName={MEDIA_CONFIG.videos.child.folder}
            tagline="The Ultimate Splash"
          />

          <AttractionsComponent />

          {/* Water Slide Collection Grid */}
          <SectionWrapper id="catalog" bg="dark" glow>
            <SectionHeading
              tagline="Ride Catalog"
              titleNormal="Find Your Level of"
              titleGradient="Thrill"
              headingRef={catalogHeadingRef as any}
              description="From high-adrenaline vertical drops to relaxing rivers, we have something tailored for everyone."
            />

            {/* Adventure Cards Grid */}
            <div ref={cardsContainerRef as any} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {ADVENTURE_CARDS.map((ride, idx) => {
                const Icon = ride.icon;
                return (
                  <GlassCard
                    key={idx}
                    className="adventure-card flex flex-col justify-between p-0 overflow-hidden opacity-0 translate-y-[30px]"
                  >
                    <div className="relative aspect-[16/10] w-full bg-black/40 overflow-hidden">
                      <Image
                        src={ride.image}
                        alt={ride.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover opacity-70 group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-transparent to-transparent" />
                      <div className={`absolute top-4 left-4 w-10 h-10 rounded-xl bg-gradient-to-br ${ride.color} flex items-center justify-center text-white shadow-lg`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest bg-bg-dark/70 border border-white/10 ${
                        ride.thrill === "Extreme" ? "text-red-400" :
                        ride.thrill === "High" ? "text-orange-400" :
                        "text-teal-400"
                      }`}>
                        {ride.thrill} Thrill
                      </span>
                    </div>

                    <div className="p-8">
                      <h3 className="font-poppins font-black text-white text-xl uppercase tracking-wide mb-3">{ride.name}</h3>
                      <p className="text-white/60 font-inter text-sm leading-relaxed mb-6">{ride.desc}</p>
                      
                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5 text-xs text-white/55 font-inter">
                        <div>
                          <span className="block text-white/30 uppercase text-[9px] tracking-wider mb-0.5">Slide Height</span>
                          <span className="font-semibold text-white/85">{ride.height}</span>
                        </div>
                        <div>
                          <span className="block text-white/30 uppercase text-[9px] tracking-wider mb-0.5">Average Speed</span>
                          <span className="font-semibold text-white/85">{ride.speed}</span>
                        </div>
                      </div>

                      <div className="mt-6 flex justify-end">
                        <AnimatedButton
                          href="/booking"
                          variant="secondary"
                          className="!py-2 !px-4 hover:text-white"
                        >
                          Book Ride
                          <ArrowRight className="w-4 h-4" />
                        </AnimatedButton>
                      </div>
                    </div>
                  </GlassCard>
                );
              })}
            </div>
          </SectionWrapper>

          {/* Safety Information */}
          <SectionWrapper id="safety" bg="blue">
            <GlassCard
              ref={safetyContainerRef as any}
              className="p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 max-w-4xl mx-auto opacity-0 translate-y-[40px]"
              hoverEffect={false}
            >
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0">
                  <HelpCircle className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="font-poppins font-black text-white text-lg uppercase">Safety & Dress Code Guidelines</h4>
                  <p className="text-white/55 font-inter text-xs md:text-sm mt-1 leading-relaxed">
                    Safety is our utmost priority. All guests must wear appropriate swim apparel. Extreme thrills have a height restriction of 120cm. Lifeguards are stationed at every terminal.
                  </p>
                </div>
              </div>
              <AnimatedButton href="/booking" variant="primary" className="shrink-0">
                Book Passes
              </AnimatedButton>
            </GlassCard>
          </SectionWrapper>
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
