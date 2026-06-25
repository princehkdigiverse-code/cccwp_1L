"use client";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import SmoothScroll from "@/components/ScrollAnimations/SmoothScroll";
import Loader from "@/components/Loader/Loader";
import RouteHero from "@/components/Hero/RouteHero";
import ContactComponent from "@/components/Contact/Contact";
import { MEDIA_CONFIG } from "@/config/media";

export default function ContactClient() {
  return (
    <>
      <Loader />
      <SmoothScroll>
        <Navbar />
        <main className="bg-bg-dark overflow-hidden">
          <RouteHero
            title="Connect With Us"
            subtitle="Have questions about ticketing, group events, or safety standards? Get in touch with our team."
            videoUrl={MEDIA_CONFIG.videos.sunset.url}
            folderName={MEDIA_CONFIG.videos.sunset.folder}
            tagline="Guest Support Desk"
          />

          <ContactComponent />
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
