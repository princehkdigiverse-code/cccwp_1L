"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import SmoothScroll from "@/components/ScrollAnimations/SmoothScroll";
import Loader from "@/components/Loader/Loader";
import RouteHero from "@/components/Hero/RouteHero";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ChevronLeft, ChevronRight, Play, Camera, Heart } from "lucide-react";
import { useVideoObserver } from "@/hooks/useVideoObserver";
import Image from "next/image";
import { MEDIA_CONFIG } from "@/config/media";
import { useReveal, useFadeUp, useStagger } from "@/hooks/useAnimationSystem";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import AnimatedButton from "@/components/ui/AnimatedButton";
import SectionWrapper from "@/components/ui/SectionWrapper";

const GALLERY_PHOTOS = [
  { src: MEDIA_CONFIG.images.slides.slide1, alt: "Adrenaline Kamikaze Slide Drop", aspect: "aspect-[4/3]" },
  { src: MEDIA_CONFIG.images.slides.slide2, alt: "Cinematic Sunset Wave Pool", aspect: "aspect-[16/10]" },
  { src: MEDIA_CONFIG.images.slides.slide3, alt: "Kids Aqua Adventure Splash Arena", aspect: "aspect-square" },
  { src: MEDIA_CONFIG.images.slides.slide4, alt: "Tropical Mist Lazy River Float", aspect: "aspect-[16/10]" },
  { src: MEDIA_CONFIG.images.slides.slide1, alt: "High-Speed Spiral Tube Action", aspect: "aspect-square" },
  { src: MEDIA_CONFIG.images.slides.slide2, alt: "Resort-style Private Dining Cabana", aspect: "aspect-[4/3]" },
  { src: MEDIA_CONFIG.images.slides.slide3, alt: "Waterpark Night Lighting Show", aspect: "aspect-[16/10]" },
  { src: MEDIA_CONFIG.images.slides.slide4, alt: "Happy Family Splash Moment", aspect: "aspect-square" },
];

const VIDEO_CLIPS = [
  { title: "Drone Flyover Tour", desc: "A cinematic look over the park's luxury tropical landscapes.", video: MEDIA_CONFIG.videos.hero.url },
  { title: "Slide POV Ride", desc: "Experience the speed of the Cyclone Funnel from a rider's perspective.", video: MEDIA_CONFIG.videos.slides.url },
];

function GalleryVideoCard({ clip }: { clip: typeof VIDEO_CLIPS[0] }) {
  const videoRef = useVideoObserver();

  return (
    <GlassCard className="video-card p-4 overflow-hidden group opacity-0 translate-y-[30px]" hoverEffect={false}>
      <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-black/60">
        <video
          ref={videoRef}
          src={clip.video}
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-60 group-hover:scale-102 transition-transform duration-700"
        />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-14 h-14 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
            <Play className="w-6 h-6 fill-primary ml-1" />
          </div>
        </div>
        <div className="absolute top-4 left-4 bg-bg-dark/70 px-3 py-1 rounded-full text-[9px] text-white/70 uppercase tracking-widest font-semibold pointer-events-none">
          Autoplay Muted
        </div>
      </div>
      <div className="p-4">
        <h4 className="font-poppins font-bold text-white text-base uppercase">{clip.title}</h4>
        <p className="text-white/55 font-inter text-xs mt-1.5 leading-relaxed">{clip.desc}</p>
      </div>
    </GlassCard>
  );
}

export default function GalleryClient() {
  const [activePhotoIdx, setActivePhotoIdx] = useState<number | null>(null);

  const photoHeadingRef = useReveal();
  const photoGridRef = useStagger(".photo-card");

  const videoHeadingRef = useReveal();
  const videoGridRef = useStagger(".video-card");

  const momentsHeadingRef = useReveal();
  const momentsGridRef = useStagger(".moment-card");

  const ctaContainerRef = useFadeUp();

  return (
    <>
      <Loader />
      <SmoothScroll>
        <Navbar />
        <main className="bg-bg-dark overflow-hidden">
          <RouteHero
            title="Visual Splendor"
            subtitle="Take a visual tour through our luxury waterpark amenities, extreme action slides, and relaxing beach zones."
            videoUrl={MEDIA_CONFIG.videos.splash.url}
            folderName={MEDIA_CONFIG.videos.splash.folder}
            tagline="Visual Journey"
          />

          {/* Photo Gallery Section */}
          <SectionWrapper id="photo-gallery" bg="blue">
            <SectionHeading
              tagline="Snapshots of Joy"
              titleNormal="Photo"
              titleGradient="Gallery"
              headingRef={photoHeadingRef as any}
              description="Explore high-definition captures of the thrills, laughs, and premium relaxation spaces."
            />

            {/* Masonry Layout */}
            <div ref={photoGridRef as any} className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {GALLERY_PHOTOS.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setActivePhotoIdx(idx)}
                  className={`photo-card break-inside-avoid relative ${img.aspect} rounded-3xl overflow-hidden group cursor-pointer border border-white/5 bg-white/3 shadow-lg opacity-0 translate-y-[30px] mb-6`}
                >
                  <div className={`relative ${img.aspect} w-full`}>
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-bg-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center text-primary shadow-xl">
                        <ZoomIn className="w-5 h-5" />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-bg-dark to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-[9px] text-accent uppercase tracking-wider font-bold">Chhab Chhaba Chhab</p>
                      <h4 className="text-xs md:text-sm font-poppins font-bold text-white mt-1 leading-snug">{img.alt}</h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SectionWrapper>

          {/* Video Gallery Section */}
          <SectionWrapper id="video-gallery" bg="dark" glow>
            <SectionHeading
              tagline="Cinematics"
              titleNormal="Video"
              titleGradient="Clips"
              headingRef={videoHeadingRef as any}
              description="Watch the dynamic motion of our slides and water attractions in action."
            />

            <div ref={videoGridRef as any} className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {VIDEO_CLIPS.map((clip, idx) => (
                <GalleryVideoCard key={idx} clip={clip} />
              ))}
            </div>
          </SectionWrapper>

          {/* Visitor Moments Section */}
          <SectionWrapper id="visitor-moments" bg="blue">
            <SectionHeading
              tagline="Social Wall"
              titleNormal="Visitor"
              titleGradient="Moments"
              headingRef={momentsHeadingRef as any}
              description="Shared memories from our guests posting their luxury adventure experiences."
            />

            <div ref={momentsGridRef as any} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { user: "@aditya_shah", text: "Best weekend escape in Surat! Kamikaze Drop is absolutely mental. 🌊✨", likes: "1,240", img: MEDIA_CONFIG.images.placeholders.aerial },
                { user: "@riya.patel22", text: "Super clean pools, amazing food, and premium private cabanas. Loved it! 🍍🍹", likes: "895", img: MEDIA_CONFIG.images.placeholders.cyclone },
                { user: "@thesuratfoodie", text: "Spent all day at the high-tech Rain Dance arena. Best sound setup ever!", likes: "1,530", img: MEDIA_CONFIG.images.placeholders.kidsSplash },
                { user: "@kabir_travels", text: "Luxury waterpark standard achieved. Filtration keeps water crystal clear.", likes: "720", img: MEDIA_CONFIG.images.placeholders.lazyRiver },
              ].map((moment, idx) => (
                <GlassCard
                  key={idx}
                  className="moment-card flex flex-col p-4 opacity-0 translate-y-[30px]"
                >
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-black/30">
                    <Image
                      src={moment.img}
                      alt="Visitor capture"
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover opacity-80"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between pt-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                          <Camera className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <span className="font-poppins font-bold text-white text-xs">{moment.user}</span>
                      </div>
                      <p className="text-white/60 font-inter text-xs leading-relaxed italic">"{moment.text}"</p>
                    </div>
                    <div className="flex items-center gap-1.5 text-accent mt-4 pt-3 border-t border-white/5 text-[10px] font-semibold">
                      <Heart className="w-3.5 h-3.5 fill-accent" />
                      <span>{moment.likes} Likes</span>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </SectionWrapper>

          {/* Call to Action */}
          <SectionWrapper id="cta" bg="dark" ref={ctaContainerRef as any} className="opacity-0 translate-y-[40px]" glow>
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-xs tracking-[0.3em] uppercase text-accent font-semibold block">Visual Escape</span>
              <h2 className="text-3xl md:text-5xl font-poppins font-black uppercase text-white mt-4">
                Be Part of the <span className="text-gradient">Experience</span>
              </h2>
              <p className="text-white/65 font-inter text-sm md:text-base mt-4 max-w-md mx-auto">
                Secure your tickets online now and dive into Surat's most premium water theme park.
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

      {/* Lightbox */}
      <AnimatePresence>
        {activePhotoIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePhotoIdx(null)}
            className="fixed inset-0 z-[9999] bg-[#071C2C]/95 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
          >
            <button
              onClick={() => setActivePhotoIdx(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); setActivePhotoIdx((activePhotoIdx - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length); }}
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
              className="relative max-w-4xl w-full aspect-video rounded-3xl overflow-hidden border border-white/10 bg-black/40 shadow-2xl cursor-default"
            >
              <Image
                src={GALLERY_PHOTOS[activePhotoIdx].src}
                alt={GALLERY_PHOTOS[activePhotoIdx].alt}
                fill
                className="object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <span className="text-[10px] text-accent font-bold tracking-widest uppercase">Visual Preview</span>
                <h3 className="text-sm md:text-base font-poppins font-bold text-white mt-1">{GALLERY_PHOTOS[activePhotoIdx].alt}</h3>
              </div>
            </motion.div>

            <button
              onClick={(e) => { e.stopPropagation(); setActivePhotoIdx((activePhotoIdx + 1) % GALLERY_PHOTOS.length); }}
              className="absolute right-6 p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-all z-10"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
