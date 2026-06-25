"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Attractions", href: "/attractions" },
  { label: "Gallery", href: "/gallery" },
  { label: "Facilities", href: "/facilities" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          isScrolled
            ? "py-3 bg-bg-dark/80 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex flex-col group">
            <span className="font-poppins font-black text-lg md:text-xl tracking-wider text-gradient uppercase transition-transform duration-300 group-hover:scale-[1.02]">
              Chhab Chhaba Chhab
            </span>
            <span className="text-[9px] tracking-[0.35em] text-accent uppercase font-bold leading-none mt-0.5">
              Waterpark
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`font-inter font-semibold text-[11px] uppercase tracking-widest transition-all duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1.5px] after:bg-primary after:transition-all hover:after:w-full ${
                    isActive ? "text-primary after:w-full" : "text-white/80 hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Book Tickets CTA Button */}
          <div className="hidden lg:block">
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 bg-[#00a3e0] text-[#051421] border border-transparent font-poppins font-bold px-6 py-2.5 rounded-full text-xs uppercase tracking-widest shadow-lg shadow-[#00a3e0]/10 hover:bg-transparent hover:text-[#00a3e0] hover:border-[#00a3e0] hover:scale-[1.03] transition-all duration-300 cursor-pointer"
            >
              Book Tickets
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-white hover:text-primary transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#071C2C]/98 backdrop-blur-xl pt-24 px-6 flex flex-col justify-between pb-10 lg:hidden"
          >
            <div className="flex flex-col gap-6 relative z-10">
              {NAV_LINKS.map((link, idx) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`font-poppins font-bold text-2xl tracking-wide ${
                        isActive ? "text-primary" : "text-white/90 hover:text-primary"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="relative z-10"
            >
              <Link
                href="/booking"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center inline-flex justify-center items-center gap-2 bg-gradient-to-r from-primary via-secondary to-primary hover:opacity-90 text-bg-dark font-poppins font-black py-4 rounded-xl text-base tracking-widest uppercase shadow-xl shadow-primary/20"
              >
                Book Tickets
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

