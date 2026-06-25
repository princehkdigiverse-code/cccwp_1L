"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
  Clock,
  Share2,
  AlertCircle,
  Loader2,
  User,
  MessageSquare,
} from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setValidationError("Please enter a valid name (at least 2 characters).");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setValidationError("Please enter a valid email address.");
      return;
    }
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone.replace(/\s+/g, ""))) {
      setValidationError("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setValidationError("Please write a message with at least 10 characters.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
    }, 1800);
  };

  const SOCIAL_LINKS = [
    {
      label: "Facebook",
      path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
      color: "hover:text-blue-400 hover:border-blue-400/30",
    },
    {
      label: "Instagram",
      path: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zm1.5-4.87h.01M7.5 20.5h9a5 5 0 0 0 5-5v-9a5 5 0 0 0-5-5h-9a5 5 0 0 0-5 5v9a5 5 0 0 0 5 5z",
      color: "hover:text-pink-400 hover:border-pink-400/30",
    },
    {
      label: "Twitter",
      path: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z",
      color: "hover:text-cyan-400 hover:border-cyan-400/30",
    },
    {
      label: "Youtube",
      path: "M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z M9.75 15.02V8.98L16 12l-6.25 3.02z",
      color: "hover:text-red-400 hover:border-red-400/30",
    },
  ];

  return (
    <section id="contact" className="relative py-24 md:py-32 bg-[#071C2C] overflow-hidden">
      {/* Ambient glow blobs — mirror of Booking but flipped */}
      <div className="absolute top-0 left-0 w-[28rem] h-[28rem] bg-primary/6 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[22rem] h-[22rem] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[45rem] bg-primary/3 rounded-full blur-[180px] pointer-events-none" />

      <div className="section-container relative z-10">

        {/* ── Section Header ── */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.35em] uppercase text-primary font-bold mb-4">
            <span className="w-6 h-px bg-primary/50" />
            Get In Touch
            <span className="w-6 h-px bg-primary/50" />
          </span>
          <h2 className="text-3xl md:text-5xl font-poppins font-black uppercase text-white mt-1 leading-tight">
            Plan Your{" "}
            <span className="text-gradient">Ultimate Escape</span>
          </h2>
          <p className="text-white/50 font-inter text-sm md:text-base mt-4 max-w-xl mx-auto leading-relaxed">
            Have questions about tickets, group packages, school tours, or private events? Send us a message and we&apos;ll reach out immediately.
          </p>
        </div>

        {/* ── Two Column Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 xl:gap-14 items-start">

          {/* LEFT: Info Panel */}
          <div className="lg:col-span-2 flex flex-col gap-5 min-w-0">

            {/* Contact Details */}
            <div className="relative rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-secondary/5 rounded-2xl" />
              <div className="relative glass-card p-6 rounded-2xl border border-white/8">
                <h3 className="font-poppins font-black text-sm uppercase tracking-[0.2em] text-white mb-5 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  Contact Details
                </h3>
                <ul className="flex flex-col gap-4">
                  <li className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                      <MapPin className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <span className="text-white/55 text-xs font-inter leading-relaxed pt-1.5">
                      Chhab Chhaba Chhab Water Park, Hazira Coastal Highway, Surat, Gujarat, India
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                      <Phone className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <a
                      href="tel:+919876543210"
                      className="text-white/55 text-xs font-inter hover:text-primary transition-colors"
                    >
                      +91 98765 43210
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                      <Mail className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <a
                      href="mailto:info@chhabchhabachhab.com"
                      className="text-white/55 text-xs font-inter hover:text-primary transition-colors"
                    >
                      info@chhabchhabachhab.com
                    </a>
                  </li>
                  <li className="flex items-start gap-3 pt-4 border-t border-white/6">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                      <Clock className="w-3.5 h-3.5 text-accent" />
                    </div>
                    <div className="pt-1">
                      <p className="text-white/80 text-xs font-semibold font-inter">Working Hours</p>
                      <p className="text-white/40 text-[10px] mt-1 font-inter">Everyday: 10:00 AM – 6:00 PM</p>
                      <p className="text-white/40 text-[10px] font-inter">Holidays: 09:00 AM – 7:00 PM</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Socials */}
            <div className="relative rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/8 via-transparent to-primary/5 rounded-2xl" />
              <div className="relative glass-card p-6 rounded-2xl border border-white/8">
                <h4 className="font-poppins font-black text-sm uppercase tracking-[0.2em] text-white mb-4 flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-primary" />
                  Follow Our Splash Feed
                </h4>
                <div className="flex gap-3">
                  {SOCIAL_LINKS.map((social, idx) => (
                    <a
                      key={idx}
                      href="#"
                      aria-label={social.label}
                      className={`w-10 h-10 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-white/50 transition-all duration-200 ${social.color}`}
                    >
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d={social.path} />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="relative rounded-2xl overflow-hidden">
              <div className="absolute -inset-[1px] bg-gradient-to-br from-primary/30 via-primary/8 to-secondary/20 rounded-2xl blur-sm opacity-50" />
              <div className="relative h-48 w-full rounded-2xl overflow-hidden border border-white/8 bg-[#051421] flex flex-col items-center justify-center gap-3">
                <div
                  className="absolute inset-0 opacity-6"
                  style={{ backgroundImage: "radial-gradient(#00B8FF 1px, transparent 1px)", backgroundSize: "20px 20px" }}
                />
                <MapPin className="w-7 h-7 text-primary animate-bounce relative z-10" />
                <div className="text-center relative z-10">
                  <p className="font-poppins font-black text-xs text-white uppercase tracking-widest">Chhab Chhaba Chhab</p>
                  <p className="text-white/35 text-[9px] font-inter uppercase tracking-widest mt-1">Hazira Coastal Highway, Surat</p>
                </div>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-10 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/50 text-white font-poppins font-bold px-5 py-1.5 rounded-xl text-[9px] uppercase tracking-widest transition-all"
                >
                  Open in Maps
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT: Form Card */}
          <div className="lg:col-span-3 relative">
            {/* Glow border effect — same as Booking */}
            <div className="absolute -inset-[1px] bg-gradient-to-br from-secondary/40 via-primary/10 to-primary/30 rounded-3xl blur-sm opacity-60" />
            <div className="relative bg-[#07192a] border border-white/10 rounded-3xl p-7 md:p-10 shadow-2xl">
              <AnimatePresence mode="wait">
                {!isSent ? (
                  <motion.form
                    key="contact-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5"
                  >
                    <div className="mb-1">
                      <h3 className="font-poppins font-black text-lg uppercase tracking-wide text-white">
                        Send a Message
                      </h3>
                      <p className="text-white/35 text-xs font-inter mt-1">We&apos;ll get back to you within 24 hours.</p>
                    </div>

                    {/* Validation Error */}
                    {validationError && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-500/8 border border-red-500/25 text-red-400 p-3.5 rounded-xl flex items-start gap-3 text-xs font-inter"
                      >
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                        <span>{validationError}</span>
                      </motion.div>
                    )}

                    {/* Name & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] text-white/45 uppercase tracking-[0.2em] font-semibold font-poppins flex items-center gap-1.5">
                          <User className="w-3 h-3" />
                          Your Name
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="John Doe"
                          disabled={isLoading}
                          className="bg-white/4 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-primary/60 focus:bg-primary/5 font-inter transition-all duration-200"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] text-white/45 uppercase tracking-[0.2em] font-semibold font-poppins">
                          Email Address
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="john@example.com"
                          disabled={isLoading}
                          className="bg-white/4 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-primary/60 focus:bg-primary/5 font-inter transition-all duration-200"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] text-white/45 uppercase tracking-[0.2em] font-semibold font-poppins">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="10-digit mobile number"
                        disabled={isLoading}
                        className="bg-white/4 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-primary/60 focus:bg-primary/5 font-inter transition-all duration-200"
                      />
                    </div>

                    {/* Divider */}
                    <div className="border-t border-white/6" />

                    {/* Message */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] text-white/45 uppercase tracking-[0.2em] font-semibold font-poppins flex items-center gap-1.5">
                        <MessageSquare className="w-3 h-3" />
                        How Can We Help?
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Write your message here..."
                        disabled={isLoading}
                        className="bg-white/4 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-primary/60 focus:bg-primary/5 font-inter transition-all duration-200 resize-none"
                      />
                    </div>

                    {/* CTA */}
                    <div className="pt-1">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full inline-flex items-center justify-center gap-2.5 bg-primary text-[#051421] font-poppins font-black py-4 rounded-xl text-[11px] uppercase tracking-[0.2em] shadow-lg shadow-primary/15 hover:bg-[#00cfff] hover:scale-[1.01] active:scale-[0.98] transition-all duration-300 min-h-[52px] cursor-pointer"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Sending Message...</span>
                          </>
                        ) : (
                          <>
                            <span>Send Message</span>
                            <Send className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div
                    key="contact-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center py-12"
                  >
                    <div className="w-16 h-16 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center mb-6">
                      <CheckCircle2 className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-poppins font-black uppercase text-white tracking-wide">
                      Message Dispatched!
                    </h3>
                    <p className="text-white/50 font-inter text-sm max-w-sm mt-3 leading-relaxed">
                      Thank you, <span className="text-white font-bold">{formData.name}</span>. Our guest support team will reach out to you at{" "}
                      <span className="text-primary font-medium">{formData.email}</span> within 24 hours.
                    </p>
                    <button
                      onClick={() => {
                        setIsSent(false);
                        setFormData({ name: "", email: "", phone: "", message: "" });
                      }}
                      className="mt-7 text-[11px] text-primary font-poppins font-bold uppercase tracking-widest border-b border-primary/20 hover:border-primary pb-0.5 transition-all"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
