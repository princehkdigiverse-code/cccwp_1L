"use client";

import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useCanvasScrollAnimation } from "@/hooks/useCanvasScrollAnimation";
import { getMediaUrl } from "@/config/media";

const QUICK_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Water Slides", href: "#attractions" },
  { label: "Photo Gallery", href: "#gallery" },
  { label: "Park Facilities", href: "#facilities" },
  { label: "Book Tickets", href: "#booking" },
  { label: "Contact Us", href: "#contact" },
];

export default function Footer() {
  const { canvasRef, videoRef, isUsingFrames } = useCanvasScrollAnimation({
    folderName: "sunset",
    frameCount: 120,
    fallbackVideoUrl: "/videos/sunset.mp4",
    triggerSelector: "footer",
    startTrigger: "top bottom",
    endTrigger: "bottom bottom",
    pin: false,
  });

  return (
    <footer className="relative bg-[#040E18] border-t border-white/5 pt-28 pb-10 overflow-hidden">

      {/* Background Video or Canvas */}
      {isUsingFrames !== false ? (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-10 pointer-events-none"
          style={{ filter: "brightness(0.4) contrast(1.1)" }}
        />
      ) : (
        <video
          ref={videoRef}
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-10 pointer-events-none"
          style={{ filter: "brightness(0.4) contrast(1.1)" }}
        >
          <source src={getMediaUrl("/videos/sunset.mp4", "video")} type="video/mp4" />
        </video>
      )}

      {/* Top gradient line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent z-10" />

      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40rem] h-60 bg-primary/5 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">

          {/* Brand */}
          <div className="flex flex-col gap-5 sm:col-span-2 lg:col-span-1">
            <a href="#home" className="flex flex-col">
              <span className="font-poppins font-black text-2xl tracking-wider text-gradient uppercase">
                Chhab Chhaba Chhab
              </span>
              <span className="text-xs tracking-[0.4em] text-accent uppercase font-bold mt-1">
                Waterpark
              </span>
            </a>
            <p className="text-white/50 text-sm font-inter leading-relaxed max-w-xs">
              Experience the ultimate luxurious water park escape. State-of-the-art slides, pristine wave pools, and memories to cherish forever.
            </p>
            {/* Social icons */}
            <div className="flex gap-3 mt-1">
              {[
                { label: "Facebook", path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" },
                { label: "Instagram", path: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zm1.5-4.87h.01M7.5 20.5h9a5 5 0 0 0 5-5v-9a5 5 0 0 0-5-5h-9a5 5 0 0 0-5 5v9a5 5 0 0 0 5 5z" },
                { label: "Twitter", path: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center hover:bg-primary/10 hover:border-primary/30 transition-all"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/60">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-poppins font-bold text-white text-sm tracking-wider uppercase mb-5 pb-2 border-b border-primary/20 w-fit">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/50 hover:text-primary text-sm font-inter transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Park Hours */}
          <div>
            <h3 className="font-poppins font-bold text-white text-sm tracking-wider uppercase mb-5 pb-2 border-b border-primary/20 w-fit">
              Park Hours
            </h3>
            <ul className="flex flex-col gap-5 text-white/50 text-sm font-inter">
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white/90 text-sm">Everyday Operations</p>
                  <p className="text-xs text-white/40 mt-1">10:00 AM - 6:00 PM</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white/90 text-sm">Holiday Special Hours</p>
                  <p className="text-xs text-white/40 mt-1">09:00 AM - 7:00 PM</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-poppins font-bold text-white text-sm tracking-wider uppercase mb-5 pb-2 border-b border-primary/20 w-fit">
              Contact Us
            </h3>
            <ul className="flex flex-col gap-4 text-white/50 text-sm font-inter">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="leading-relaxed">Hazira Coastal Highway, Surat, Gujarat, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a href="tel:+919876543210" className="hover:text-primary transition-colors">+91 98765 43210</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a href="mailto:info@chhabchhabachhab.com" className="hover:text-primary transition-colors text-xs">
                  info@chhabchhabachhab.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Divider + Copyright */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-white/30 text-xs font-inter">
          <p>© {new Date().getFullYear()} Chhab Chhaba Chhab Waterpark. All Rights Reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Safety Rules</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
