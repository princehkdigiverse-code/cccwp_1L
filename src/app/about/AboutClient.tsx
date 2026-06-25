"use client";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import SmoothScroll from "@/components/ScrollAnimations/SmoothScroll";
import Loader from "@/components/Loader/Loader";
import RouteHero from "@/components/Hero/RouteHero";
import { Award, Compass, ShieldCheck, Eye, Target, ArrowRight } from "lucide-react";
import Image from "next/image";
import { MEDIA_CONFIG } from "@/config/media";
import {
  useReveal,
  useParallax,
  useStagger,
  useCounterAnimation,
  useFadeUp,
} from "@/hooks/useAnimationSystem";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import AnimatedButton from "@/components/ui/AnimatedButton";
import SectionWrapper from "@/components/ui/SectionWrapper";

function CounterItem({ label, val, suffix }: { label: string; val: number; suffix: string }) {
  const { count, containerRef } = useCounterAnimation(val);
  return (
    <div ref={containerRef as any} className="stat-card text-center opacity-0 translate-y-[30px]">
      <h3 className="font-poppins font-black text-4xl md:text-6xl text-gradient mb-2">
        {count}
        {suffix}
      </h3>
      <p className="text-white/60 font-inter text-xs md:text-sm uppercase tracking-wider">
        {label}
      </p>
    </div>
  );
}

export default function AboutClient() {
  const storyHeadingRef = useReveal();
  const { containerRef: storyMediaRef, elementRef: storyImageRef } = useParallax();
  const visionHeadingRef = useReveal();
  const visionContainerRef = useStagger(".vision-card");
  const statsContainerRef = useStagger(".stat-card");
  const ctaContainerRef = useFadeUp();

  return (
    <>
      <Loader />
      <SmoothScroll>
        <Navbar />
        <main className="bg-bg-dark overflow-hidden">
          <RouteHero
            title="About Chhab Chhaba Chhab"
            subtitle="Discover unforgettable family adventures and world-class water attractions designed for pure joy."
            videoUrl={MEDIA_CONFIG.videos.slides.url}
            folderName={MEDIA_CONFIG.videos.slides.folder}
            tagline="Cinematic Legacy"
          />

          {/* About Story Section */}
          <SectionWrapper id="story" bg="blue" ref={storyMediaRef as any}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Premium media container with parallax */}
              <div className="lg:col-span-6 relative aspect-[4/3] lg:aspect-[16/10] w-full rounded-3xl overflow-hidden border border-white/10 bg-bg-dark/80 shadow-2xl group">
                <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/90 via-transparent to-transparent z-10 pointer-events-none" />
                <div ref={storyImageRef as any} className="absolute inset-0 w-full h-full">
                  <Image
                    src={MEDIA_CONFIG.images.placeholders.aerial}
                    alt="Chhab Chhaba Chhab Waterpark Aerial View"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover opacity-80 scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="absolute top-4 left-4 z-20 bg-bg-dark/70 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest text-primary font-bold">
                  Surat's Finest
                </div>
              </div>

              {/* Right Column: Content */}
              <div className="lg:col-span-6 flex flex-col gap-6">
                <SectionHeading
                  tagline="Our Legacy"
                  titleNormal="Crafting Experiences,"
                  titleGradient="Creating Memories"
                  centered={false}
                  headingRef={storyHeadingRef as any}
                />
                <p className="text-white/70 text-sm md:text-base font-inter leading-relaxed -mt-6">
                  Established with a vision to redefine family entertainment, Chhab Chhaba Chhab stands as a monumental landmark on the Hazira Coastal Highway. Spanning across lush landscapes, we combine international-grade safety standards with high-octane water attractions.
                </p>
                <p className="text-white/50 text-xs md:text-sm font-inter leading-relaxed">
                  Whether you are seeking the ultimate gravity-defying slide thrills, a peaceful float down our lazy river, or family moments in the kids zones, we provide a premium sanctuary designed for laughter and relaxation.
                </p>
                <div className="flex flex-wrap gap-4 mt-2">
                  <div className="flex items-center gap-2 text-xs text-white/70 font-semibold bg-white/5 border border-white/10 rounded-full px-4 py-2">
                    <ShieldCheck className="w-4 h-4 text-primary" />
                    German Water Filtration
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/70 font-semibold bg-white/5 border border-white/10 rounded-full px-4 py-2">
                    <Award className="w-4 h-4 text-accent" />
                    International Safety Certified
                  </div>
                </div>
              </div>
            </div>
          </SectionWrapper>

          {/* Our Vision Section */}
          <SectionWrapper id="vision" bg="dark" glow>
            <SectionHeading
              tagline="Future Outlook"
              titleNormal="Our Mission &"
              titleGradient="Vision"
              headingRef={visionHeadingRef as any}
              description="We are driven by passion, premium hospitality standards, and the simple desire to create the happiest place on Earth."
            />

            <div ref={visionContainerRef as any} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Our Mission",
                  desc: "To deliver unmatched joy and premium entertainment in a safe, hygienic, and luxury resort-level environment for families of all generations.",
                  icon: Target,
                },
                {
                  title: "Core Values",
                  desc: "Guest safety is our foundation. We practice extreme cleanliness, warm hospitality, and continuous updates to maintain world-class standards.",
                  icon: Compass,
                },
                {
                  title: "The Future",
                  desc: "Expanding with next-generation VR water coasters, luxury staycation villas, and eco-friendly solar-powered pool heating systems.",
                  icon: Eye,
                },
              ].map((item, idx) => (
                <GlassCard
                  key={idx}
                  className="vision-card flex flex-col h-full opacity-0 translate-y-[30px]"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-white/5 flex items-center justify-center text-primary mb-6">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-poppins font-bold text-white text-lg uppercase mb-3">{item.title}</h3>
                  <p className="text-white/55 font-inter text-sm leading-relaxed">{item.desc}</p>
                </GlassCard>
              ))}
            </div>
          </SectionWrapper>

          {/* Statistics Section */}
          <SectionWrapper id="statistics" bg="blue">
            <div ref={statsContainerRef as any} className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
              {[
                { label: "Years of Experience", val: 15, suffix: "+" },
                { label: "Happy Visitors", val: 5, suffix: "M+" },
                { label: "Water Attractions", val: 25, suffix: "+" },
                { label: "Customer Satisfaction", val: 99, suffix: "%" },
              ].map((stat, idx) => (
                <CounterItem key={idx} label={stat.label} val={stat.val} suffix={stat.suffix} />
              ))}
            </div>
          </SectionWrapper>

          {/* Call to Action Section */}
          <SectionWrapper id="cta" bg="dark" ref={ctaContainerRef as any} className="opacity-0 translate-y-[40px]" glow>
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-xs tracking-[0.3em] uppercase text-accent font-semibold block">Your Next Adventure</span>
              <h2 className="text-3xl md:text-6xl font-poppins font-black uppercase text-white mt-4 leading-none">
                Ready to Experience <span className="text-gradient">The Thrill?</span>
              </h2>
              <p className="text-white/65 font-inter text-sm md:text-lg mt-6 max-w-xl mx-auto leading-relaxed">
                Step into a world of pure fun, massive wave pools, and premium high-speed water slides.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center mt-10">
                <AnimatedButton href="/attractions" variant="secondary">
                  Explore Attractions
                  <ArrowRight className="w-4 h-4 text-primary" />
                </AnimatedButton>
                <AnimatedButton href="/booking" variant="primary">
                  Book Tickets
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
