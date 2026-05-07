import React, { useState, useRef, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin, Search, X, Navigation, Phone, ExternalLink, Menu, ChevronRight, Mail
} from "lucide-react";
import { useSiteData } from "@/context/SiteContext";
import ganeshLogo from "@/assets/images/ganesh-logo.png";

const SEARCHABLE = [
  { label: "About Our Firm", section: "about" },
  { label: "Our Advocates", section: "advocates" },
  { label: "Practice Areas", section: "practice-areas" },
  { label: "Our Services", section: "services" },
  { label: "Why Choose Us", section: "why-choose-us" },
  { label: "Testimonials", section: "testimonials" },
  { label: "Contact Us", section: "contact" },
  { label: "Civil Law", section: "practice-areas" },
  { label: "Criminal Defense", section: "practice-areas" },
  { label: "Property Law", section: "practice-areas" },
  { label: "Family Law", section: "practice-areas" },
  { label: "Corporate Law", section: "practice-areas" },
];

const NAV_LINKS = [
  { label: "Home", href: "home" },
  { label: "About", href: "about" },
  { label: "Advocates", href: "advocates" },
  { label: "Practice Areas", href: "practice-areas" },
  { label: "Services", href: "services" },
  { label: "Contact", href: "contact" },
];

export const Header = () => {
  const { data } = useSiteData();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationOpen, setLocationOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMap, setActiveMap] = useState(0);
  const searchRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  // Close location dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (locationRef.current && !locationRef.current.contains(e.target as Node)) {
        setLocationOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const results = searchQuery.length > 1
    ? SEARCHABLE.filter(s =>
        s.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        data.advocates.some(a =>
          a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.specializations.some(sp => sp.toLowerCase().includes(searchQuery.toLowerCase()))
        )
      )
    : [];

  const scrollTo = (section: string) => {
    const el = document.getElementById(section);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setSearchOpen(false);
    setSearchQuery("");
    setMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-xl border-b border-white/6"
      >
        <div className="container mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between gap-3">

          {/* LEFT — Logo + Name */}
          <Link href="/" className="flex items-center gap-2.5 md:gap-3 group shrink-0">
            <motion.div
              className="relative w-11 h-11 md:w-14 md:h-14 rounded-full flex items-center justify-center shrink-0"
              style={{
                background: "radial-gradient(circle, rgba(201,168,76,0.18) 0%, rgba(0,0,0,0) 70%)",
                boxShadow: "0 0 24px rgba(201,168,76,0.2), 0 0 60px rgba(201,168,76,0.06)",
                border: "1px solid rgba(201,168,76,0.35)",
              }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="absolute inset-0 rounded-full border border-primary/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <motion.img
                src={ganeshLogo}
                alt="Logo"
                className="w-7 h-7 md:w-9 md:h-9 object-contain relative z-10"
                style={{ filter: "sepia(1) saturate(5) hue-rotate(5deg) brightness(1.15) drop-shadow(0 0 10px rgba(201,168,76,0.8))" }}
                animate={{ opacity: [0.85, 1, 0.85] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>

            <div className="flex flex-col min-w-0">
              <span className="font-serif text-base md:text-2xl font-semibold tracking-wide text-white leading-tight truncate">
                {data.firmName}
              </span>
              <span className="text-[9px] md:text-[10px] text-primary tracking-[0.18em] md:tracking-[0.22em] uppercase leading-tight">
                {data.tagline}
              </span>
            </div>
          </Link>

          {/* CENTER — Nav (desktop only) */}
          <nav className="hidden xl:flex items-center gap-7">
            {NAV_LINKS.map(item => (
              <a
                key={item.label}
                href={`#${item.href}`}
                onClick={e => { e.preventDefault(); scrollTo(item.href); }}
                className="text-sm font-medium tracking-wide text-white/60 hover:text-primary transition-colors duration-300 relative after:absolute after:bottom-[-3px] after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:bg-primary after:transition-all after:duration-300"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* RIGHT — Actions */}
          <div className="flex items-center gap-1.5 md:gap-2 shrink-0">

            {/* Search */}
            <div className="relative">
              <AnimatePresence>
                {searchOpen && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "min(220px, 48vw)", opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="absolute right-10 top-1/2 -translate-y-1/2 overflow-hidden"
                  >
                    <input
                      ref={searchRef}
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      onKeyDown={e => e.key === "Escape" && setSearchOpen(false)}
                      placeholder="Search..."
                      className="w-full bg-white/8 border border-white/15 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-primary/50"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              <button
                onClick={() => { setSearchOpen(!searchOpen); setSearchQuery(""); }}
                className="relative z-10 w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-lg border border-white/10 text-white/60 hover:text-primary hover:border-primary/30 transition-all"
              >
                {searchOpen ? <X className="w-3.5 h-3.5 md:w-4 md:h-4" /> : <Search className="w-3.5 h-3.5 md:w-4 md:h-4" />}
              </button>

              {/* Search Results */}
              <AnimatePresence>
                {searchOpen && results.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute right-0 top-12 w-[min(288px,90vw)] bg-[#111] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50"
                  >
                    {results.slice(0, 6).map((r, i) => (
                      <button
                        key={i}
                        onClick={() => scrollTo(r.section)}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-white/80 hover:bg-primary/10 hover:text-primary transition-colors text-left"
                      >
                        <Search className="w-3.5 h-3.5 text-primary/60 shrink-0" />
                        {r.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Location Dropdown */}
            <div className="relative" ref={locationRef}>
              <button
                onClick={() => setLocationOpen(!locationOpen)}
                className={`w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-lg border transition-all ${
                  locationOpen ? "border-primary/50 text-primary bg-primary/10" : "border-white/10 text-white/60 hover:text-primary hover:border-primary/30"
                }`}
              >
                <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4" />
              </button>

              <AnimatePresence>
                {locationOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.96 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-12 w-[min(400px,92vw)] bg-[#0d0d0d] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50"
                  >
                    <div className="p-4 border-b border-white/5">
                      <h3 className="font-serif text-base text-white">Our Offices</h3>
                      <p className="text-xs text-white/40 mt-0.5">Click a location to get directions</p>
                    </div>
                    <div className="flex border-b border-white/5">
                      {data.offices.map((office, idx) => (
                        <button
                          key={office.id}
                          onClick={() => setActiveMap(idx)}
                          className={`flex-1 px-3 py-2.5 text-xs font-medium transition-colors ${
                            activeMap === idx ? "text-primary border-b-2 border-primary" : "text-white/50 hover:text-white/80"
                          }`}
                        >
                          {office.name}
                        </button>
                      ))}
                    </div>
                    <div className="relative h-40 bg-black/50">
                      <iframe
                        key={activeMap}
                        src={`https://www.openstreetmap.org/export/embed.html?bbox=${data.offices[activeMap].lng - 0.01}%2C${data.offices[activeMap].lat - 0.008}%2C${data.offices[activeMap].lng + 0.01}%2C${data.offices[activeMap].lat + 0.008}&layer=mapnik&marker=${data.offices[activeMap].lat}%2C${data.offices[activeMap].lng}`}
                        className="w-full h-full border-0"
                        style={{ filter: "invert(90%) hue-rotate(180deg) saturate(0.8)" }}
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4 space-y-3">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="text-white/80 text-sm">{data.offices[activeMap].address}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Phone className="w-3 h-3 text-primary/70" />
                            <a href={`tel:${data.offices[activeMap].phone}`} className="text-xs text-primary hover:underline">
                              {data.offices[activeMap].phone}
                            </a>
                          </div>
                        </div>
                      </div>
                      <a
                        href={data.offices[activeMap].directionsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-2.5 bg-primary/10 border border-primary/30 text-primary rounded-lg text-sm hover:bg-primary hover:text-black transition-all font-medium"
                      >
                        <Navigation className="w-3.5 h-3.5" />
                        Get Directions
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Book Consultation — desktop only */}
            <a
              href="#contact"
              onClick={e => { e.preventDefault(); scrollTo("contact"); }}
              className="hidden lg:flex items-center gap-2 px-4 py-2.5 border border-primary text-primary hover:bg-primary hover:text-black transition-all duration-300 text-sm font-semibold tracking-wide rounded-lg"
            >
              Book Consultation
            </a>

            {/* Hamburger — mobile/tablet only */}
            <button
              onClick={() => setMenuOpen(o => !o)}
              className="xl:hidden w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-lg border border-white/10 text-white/70 hover:text-primary hover:border-primary/30 transition-all"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── MOBILE MENU DRAWER ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm xl:hidden"
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.32, 0, 0.67, 0] }}
              className="fixed top-0 right-0 bottom-0 z-40 w-[min(300px,85vw)] xl:hidden flex flex-col"
              style={{
                background: "#080808",
                borderLeft: "1px solid rgba(201,168,76,0.15)",
              }}
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/8">
                <div className="flex items-center gap-2.5">
                  <img src={ganeshLogo} alt="Logo" className="w-8 h-8 object-contain"
                    style={{ filter: "sepia(1) saturate(4) hue-rotate(5deg) brightness(1.1) drop-shadow(0 0 8px rgba(201,168,76,0.6))" }} />
                  <span className="font-serif text-base text-white">{data.firmName}</span>
                </div>
                <button onClick={() => setMenuOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/10 text-white/60">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Nav links */}
              <div className="flex-1 overflow-y-auto py-4">
                {NAV_LINKS.map((item, idx) => (
                  <motion.button
                    key={item.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + idx * 0.05, duration: 0.3 }}
                    onClick={() => scrollTo(item.href)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left text-white/70 hover:text-primary hover:bg-primary/5 transition-all duration-200 group border-b border-white/4"
                  >
                    <span className="font-medium tracking-wide">{item.label}</span>
                    <ChevronRight className="w-4 h-4 text-primary/40 group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" />
                  </motion.button>
                ))}
              </div>

              {/* Drawer footer */}
              <div className="p-5 border-t border-white/8 space-y-3">
                <a
                  href="#contact"
                  onClick={e => { e.preventDefault(); scrollTo("contact"); }}
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-primary text-black font-bold rounded-xl hover:bg-primary/90 transition-all text-sm"
                >
                  Book Free Consultation
                </a>

                {/* Quick contact */}
                <div className="grid grid-cols-2 gap-2">
                  {data.offices.slice(0, 1).map(o => (
                    <a key={o.id} href={`tel:${o.phone}`}
                      className="flex items-center gap-2 p-3 rounded-lg border border-white/8 text-white/60 hover:text-primary hover:border-primary/30 transition-all text-xs">
                      <Phone className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span className="truncate">{o.phone}</span>
                    </a>
                  ))}
                  <a href={`mailto:${data.email}`}
                    className="flex items-center gap-2 p-3 rounded-lg border border-white/8 text-white/60 hover:text-primary hover:border-primary/30 transition-all text-xs">
                    <Mail className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span className="truncate">Email Us</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
