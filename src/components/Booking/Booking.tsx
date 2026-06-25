"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  User,
  Baby,
  Sparkles,
  CheckCircle2,
  Ticket,
  Check,
  AlertCircle,
  Loader2,
  Crown,
  ShieldCheck,
  Waves,
  Wifi,
} from "lucide-react";

const PERKS = [
  { icon: Waves, text: "Access to all 25+ slides & wave simulator pools." },
  { icon: ShieldCheck, text: "Hygienic changing rooms & warm shower entries." },
  { icon: Wifi, text: "Free Wi-Fi access throughout the park areas." },
  { icon: Ticket, text: "Secure cashless payment wristband on entry." },
];

export default function Booking() {
  const [date, setDate] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [passType, setPassType] = useState<"standard" | "vip">("standard");
  const [isBooked, setIsBooked] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const PRICE = {
    standard: { adult: 999, child: 699 },
    vip: { adult: 1999, child: 1399 },
  };

  const totalCost =
    adults * PRICE[passType].adult + children * PRICE[passType].child;

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!guestName.trim() || guestName.trim().length < 2) {
      setValidationError("Please enter a valid guest name (at least 2 characters).");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(guestEmail)) {
      setValidationError("Please enter a valid email address.");
      return;
    }
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(guestPhone.replace(/\s+/g, ""))) {
      setValidationError("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (!date) {
      setValidationError("Please select a date for your visit.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsBooked(true);
    }, 1800);
  };

  return (
    <section id="booking" className="relative py-28 md:py-36 bg-[#051421] overflow-hidden">
      {/* Ambient glow blobs */}
      <div className="absolute top-0 right-0 w-[28rem] h-[28rem] bg-primary/6 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[22rem] h-[22rem] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[45rem] bg-primary/3 rounded-full blur-[180px] pointer-events-none" />

      <div className="section-container relative z-10">

        {/* ── Section Header ── */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.35em] uppercase text-primary font-bold mb-5">
            <span className="w-8 h-px bg-primary/50" />
            Plan Your Visit
            <span className="w-8 h-px bg-primary/50" />
          </span>
          <h2 className="text-3xl md:text-5xl font-poppins font-black uppercase text-white mt-2 leading-tight">
            Reserve Your{" "}
            <span className="text-gradient">Adventure Passes</span>
          </h2>
          <p className="text-white/50 font-inter text-sm md:text-base mt-5 max-w-xl mx-auto leading-relaxed">
            Book online and skip the long ticket queue. Choose from standard day passes or unlock the full VIP experience.
          </p>
        </div>

        {/* ── Two Column Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 xl:gap-16 items-start">

          {/* LEFT: Info Panel */}
          <div className="lg:col-span-2 flex flex-col gap-6 min-w-0">

            {/* Perks Card */}
            <div className="relative rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-secondary/5 rounded-2xl" />
              <div className="relative glass-card p-7 rounded-2xl border border-white/8">
                <h3 className="font-poppins font-black text-sm uppercase tracking-[0.2em] text-white mb-6 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  What&apos;s Included
                </h3>
                <div className="flex flex-col gap-5">
                  {PERKS.map((perk, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                        <perk.icon className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-white/60 text-sm font-inter leading-relaxed pt-2">{perk.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* VIP Callout */}
            <div className="relative rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-accent/5 to-transparent rounded-2xl" />
              <div className="relative glass-card p-7 rounded-2xl border border-accent/20">
                <div className="flex items-center gap-2.5 mb-4">
                  <Crown className="w-4 h-4 text-accent" />
                  <h4 className="font-poppins font-black text-xs uppercase tracking-[0.2em] text-accent">
                    VIP Express Privileges
                  </h4>
                </div>
                <p className="text-white/55 text-sm font-inter leading-relaxed">
                  Fast-Track lane access, private beach cabana coupon, complimentary premium lockers, and exclusive VIP lounge entry.
                </p>
              </div>
            </div>

            {/* Pricing Strip */}
            <div className="glass-card p-6 rounded-2xl border border-white/8 flex justify-between items-center gap-6">
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-white/40 mb-2">Standard Pass</p>
                <p className="font-poppins font-black text-white text-2xl leading-none">
                  ₹999
                  <span className="text-xs text-white/35 font-normal ml-1.5">/adult</span>
                </p>
              </div>
              <div className="w-px h-12 bg-white/8 shrink-0" />
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-white/40 mb-2">VIP Express</p>
                <p className="font-poppins font-black text-accent text-2xl leading-none">
                  ₹1,999
                  <span className="text-xs text-white/35 font-normal ml-1.5">/adult</span>
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: Form Card */}
          <div className="lg:col-span-3 relative">
            {/* Glow border effect */}
            <div className="absolute -inset-[1px] bg-gradient-to-br from-primary/40 via-primary/10 to-secondary/30 rounded-3xl blur-sm opacity-60" />
            <div className="relative bg-[#07192a] border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
              <AnimatePresence mode="wait">
                {!isBooked ? (
                  <motion.form
                    key="booking-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleBooking}
                    className="flex flex-col gap-6"
                  >
                    <div className="mb-2">
                      <h3 className="font-poppins font-black text-xl uppercase tracking-wide text-white">
                        Guest Details
                      </h3>
                      <p className="text-white/40 text-sm font-inter mt-2">Fill in your details to reserve your passes.</p>
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-2.5">
                        <label className="text-[10px] text-white/50 uppercase tracking-[0.18em] font-semibold font-poppins flex items-center gap-1.5">
                          <User className="w-3 h-3" />
                          Guest Name
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Your full name"
                          value={guestName}
                          onChange={(e) => setGuestName(e.target.value)}
                          disabled={isLoading}
                          className="bg-white/4 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm placeholder-white/25 focus:outline-none focus:border-primary/60 focus:bg-primary/5 font-inter transition-all duration-200"
                        />
                      </div>
                      <div className="flex flex-col gap-2.5">
                        <label className="text-[10px] text-white/50 uppercase tracking-[0.18em] font-semibold font-poppins">
                          Email Address
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="name@domain.com"
                          value={guestEmail}
                          onChange={(e) => setGuestEmail(e.target.value)}
                          disabled={isLoading}
                          className="bg-white/4 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm placeholder-white/25 focus:outline-none focus:border-primary/60 focus:bg-primary/5 font-inter transition-all duration-200"
                        />
                      </div>
                    </div>

                    {/* Phone & Date */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-2.5">
                        <label className="text-[10px] text-white/50 uppercase tracking-[0.18em] font-semibold font-poppins">
                          Mobile Number
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="10-digit number"
                          value={guestPhone}
                          onChange={(e) => setGuestPhone(e.target.value)}
                          disabled={isLoading}
                          className="bg-white/4 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm placeholder-white/25 focus:outline-none focus:border-primary/60 focus:bg-primary/5 font-inter transition-all duration-200"
                        />
                      </div>
                      <div className="flex flex-col gap-2.5">
                        <label className="text-[10px] text-white/50 uppercase tracking-[0.18em] font-semibold font-poppins flex items-center gap-1.5">
                          <Calendar className="w-3 h-3" />
                          Visit Date
                        </label>
                        <input
                          type="date"
                          required
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          min={new Date().toISOString().split("T")[0]}
                          disabled={isLoading}
                          className="bg-white/4 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-primary/60 focus:bg-primary/5 font-inter transition-all duration-200 [color-scheme:dark]"
                        />
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-white/8 my-1" />

                    {/* Pass Type */}
                    <div className="flex flex-col gap-3">
                      <label className="text-[10px] text-white/50 uppercase tracking-[0.18em] font-semibold font-poppins flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-accent" />
                        Pass Category
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        {(["standard", "vip"] as const).map((type) => (
                          <button
                            key={type}
                            type="button"
                            disabled={isLoading}
                            onClick={() => setPassType(type)}
                            className={`py-4 px-4 rounded-xl border text-[11px] font-poppins font-black uppercase tracking-[0.15em] transition-all duration-200 cursor-pointer ${
                              passType === type
                                ? type === "standard"
                                  ? "bg-primary text-[#051421] border-primary shadow-lg shadow-primary/20"
                                  : "bg-accent text-[#051421] border-accent shadow-lg shadow-accent/20"
                                : "bg-white/3 border-white/10 text-white/55 hover:bg-white/6 hover:text-white hover:border-white/20"
                            }`}
                          >
                            {type === "standard" ? (
                              <span className="flex items-center justify-center gap-2">
                                <Ticket className="w-3.5 h-3.5" />
                                Standard
                              </span>
                            ) : (
                              <span className="flex items-center justify-center gap-2">
                                <Crown className="w-3.5 h-3.5" />
                                VIP Express
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Guests Selector */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { label: "Adults", icon: User, count: adults, setCount: setAdults, min: 1, price: PRICE[passType].adult },
                        { label: "Children", icon: Baby, count: children, setCount: setChildren, min: 0, price: PRICE[passType].child },
                      ].map(({ label, icon: Icon, count, setCount, min, price }) => (
                        <div
                          key={label}
                          className="flex items-center justify-between p-5 rounded-xl bg-white/3 border border-white/8"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center shrink-0">
                              <Icon className="w-4 h-4 text-primary" />
                            </div>
                            <div>
                              <p className="font-poppins font-bold text-white text-sm">{label}</p>
                              <p className="text-white/40 text-[10px] mt-0.5 font-inter">₹{price}/each</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              disabled={isLoading}
                              onClick={() => setCount(Math.max(min, count - 1))}
                              className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-white flex items-center justify-center font-bold hover:bg-white/10 transition-all cursor-pointer text-base leading-none"
                            >
                              −
                            </button>
                            <span className="font-poppins font-black text-white w-6 text-center text-base">{count}</span>
                            <button
                              type="button"
                              disabled={isLoading}
                              onClick={() => setCount(count + 1)}
                              className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-white flex items-center justify-center font-bold hover:bg-white/10 transition-all cursor-pointer text-base leading-none"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Summary & CTA */}
                    <div className="pt-6 mt-1 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-5">
                      <div>
                        <p className="text-[10px] text-white/40 uppercase tracking-[0.25em] font-semibold font-poppins">Total Payable</p>
                        <h4 className="text-4xl font-poppins font-black text-accent mt-1">
                          ₹{totalCost.toLocaleString()}
                        </h4>
                      </div>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full sm:w-auto bg-primary text-[#051421] font-poppins font-black py-4 px-12 rounded-xl text-[11px] uppercase tracking-[0.2em] shadow-lg shadow-primary/20 hover:bg-[#00cfff] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2.5 min-w-[220px] cursor-pointer"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Processing...</span>
                          </>
                        ) : (
                          "Book Pass Now"
                        )}
                      </button>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div
                    key="booking-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center py-12"
                  >
                    <div className="w-16 h-16 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center mb-6">
                      <CheckCircle2 className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-poppins font-black uppercase text-white tracking-wide">
                      Reservation Confirmed!
                    </h3>
                    <p className="text-white/50 font-inter text-sm max-w-sm mt-3 leading-relaxed">
                      Thank you, <span className="font-bold text-white">{guestName}</span>. Your passes for{" "}
                      <span className="font-bold text-white">{date}</span> have been reserved. Check your email{" "}
                      <span className="text-primary font-medium">{guestEmail}</span> for confirmation.
                    </p>
                    <div className="mt-6 p-4 rounded-xl border border-white/8 bg-white/3 inline-flex flex-col gap-2 items-center">
                      <div className="flex items-center gap-2">
                        <Ticket className="w-4 h-4 text-accent" />
                        <span className="font-poppins font-bold text-[11px] uppercase tracking-widest text-white/70">
                          {passType} pass &middot; {adults} ADT, {children} CHD
                        </span>
                      </div>
                      <p className="text-[10px] text-white/35 font-mono">
                        Order ID: CC-{Math.floor(100000 + Math.random() * 900000)}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setIsBooked(false);
                        setAdults(1);
                        setChildren(0);
                        setDate("");
                        setGuestName("");
                        setGuestEmail("");
                        setGuestPhone("");
                      }}
                      className="mt-7 text-[11px] text-primary font-poppins font-bold uppercase tracking-widest border-b border-primary/20 hover:border-primary pb-0.5 transition-all"
                    >
                      Make Another Booking
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
