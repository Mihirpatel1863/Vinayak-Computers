import React from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { AdvocateCard } from "./AdvocateCard";
import { useSiteData } from "@/context/SiteContext";
import seniorImage from "@/assets/images/senior-advocate.png";
import advocateImage from "@/assets/images/advocate.png";
import ganeshLogo from "@/assets/images/ganesh-logo.png";

interface HeroSectionProps {
  onOpenModal: (id: string) => void;
}

export const HeroSection = ({ onOpenModal }: HeroSectionProps) => {
  const { data } = useSiteData();
  const defaultImages: Record<string, string> = {
    senior: seniorImage,
    advocate: advocateImage,
  };

  const parts = data.heroTitle.split(".");
  const lastPart = parts.pop();
  const firstPart = parts.join(".") + ".";

  const whatsappUrl = `https://wa.me/${data.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("Namaste, I would like to book a consultation.")}`;

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden bg-black">

      {/* ── PREMIUM BACKGROUND LAYER ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(201,168,76,0.09)_0%,transparent_70%)]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div className="absolute rounded-full"
            style={{ width: 780, height: 780, background: "radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 65%)" }}
            animate={{ scale: [1, 1.08, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} />
          <motion.div className="absolute rounded-full"
            style={{ width: 680, height: 680, border: "1px dashed rgba(201,168,76,0.14)", boxShadow: "0 0 60px 2px rgba(201,168,76,0.05)" }}
            animate={{ rotate: 360 }} transition={{ duration: 90, repeat: Infinity, ease: "linear" }} />
          <motion.div className="absolute rounded-full"
            style={{ width: 580, height: 580, border: "1px solid rgba(201,168,76,0.10)" }}
            animate={{ rotate: -360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }}>
            {Array.from({ length: 36 }).map((_, i) => (
              <div key={i} className="absolute"
                style={{
                  width: i % 9 === 0 ? 14 : i % 3 === 0 ? 8 : 4, height: 1.5,
                  background: i % 9 === 0 ? "rgba(201,168,76,0.6)" : i % 3 === 0 ? "rgba(201,168,76,0.3)" : "rgba(201,168,76,0.15)",
                  top: "50%", left: i % 9 === 0 ? -7 : i % 3 === 0 ? -4 : -2,
                  transformOrigin: `${290}px 0.75px`,
                  transform: `rotate(${i * 10}deg)`,
                }} />
            ))}
          </motion.div>
          <motion.div className="absolute rounded-full"
            style={{ width: 460, height: 460, border: "1.5px solid rgba(201,168,76,0.22)", boxShadow: "0 0 80px 6px rgba(201,168,76,0.08), inset 0 0 80px 6px rgba(201,168,76,0.04)" }}
            animate={{ opacity: [0.5, 1, 0.5], scale: [0.99, 1.01, 0.99] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }} />
          <motion.div className="absolute rounded-full"
            style={{ width: 340, height: 340, border: "2px solid rgba(201,168,76,0.18)", background: "radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)", boxShadow: "0 0 40px 8px rgba(201,168,76,0.06)" }}
            animate={{ rotate: 360 }} transition={{ duration: 120, repeat: Infinity, ease: "linear" }} />
          <motion.div className="absolute flex items-center justify-center" style={{ width: 260, height: 260 }}>
            <motion.img src={ganeshLogo} alt="Ganesh Background" className="w-56 h-56 object-contain select-none"
              style={{ filter: "sepia(1) saturate(5) hue-rotate(5deg) brightness(0.85) drop-shadow(0 0 30px rgba(201,168,76,0.5)) drop-shadow(0 0 60px rgba(201,168,76,0.25))", opacity: 0.18 }}
              animate={{ opacity: [0.14, 0.22, 0.14] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} />
          </motion.div>
          {[0, 90, 180, 270].map((deg) => (
            <motion.div key={deg} className="absolute rounded-full"
              style={{ width: 6, height: 6, background: "#C9A84C", boxShadow: "0 0 10px 3px rgba(201,168,76,0.6)", top: "50%", left: "50%", transformOrigin: "0 0", transform: `rotate(${deg}deg) translateX(228px) translate(-50%, -50%)` }}
              animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.3, 0.8] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: deg / 360 * 3 }} />
          ))}
        </div>
        <motion.div className="absolute left-[8%] top-[20%] w-[1px] h-[55%] bg-gradient-to-b from-transparent via-primary/25 to-transparent"
          animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute right-[8%] top-[30%] w-[1px] h-[45%] bg-gradient-to-b from-transparent via-primary/25 to-transparent"
          animate={{ opacity: [0.2, 0.6, 0.2] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} />
      </div>

      {/* ── CONTENT ── */}
      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">

        {/* Hero text — clean, no button here */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-16 max-w-4xl"
        >
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.5, ease: "easeOut" }}>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-normal text-foreground leading-[1.1] mb-6">
              {firstPart}<br />
              <span className="italic text-primary">{lastPart}.</span>
            </h1>
          </motion.div>
          <p className="text-lg md:text-xl text-muted-foreground font-light tracking-wide max-w-2xl mx-auto">
            {data.heroSubtitle}
          </p>
        </motion.div>

        {/* Advocate Cards */}
        <div id="advocates" className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 w-full mb-12">
          {data.advocates.map((adv, idx) => (
            <React.Fragment key={adv.id}>
              {idx === 1 && (
                <div className="hidden md:block w-[1px] h-32 bg-gradient-to-b from-transparent via-primary/40 to-transparent" />
              )}
              <AdvocateCard
                id={adv.id}
                name={adv.name}
                title={adv.title}
                image={adv.photo || defaultImages[adv.id] || seniorImage}
                delay={idx * 0.2}
                onClick={() => onOpenModal(adv.id)}
              />
            </React.Fragment>
          ))}
        </div>

        {/* Book Consultation — below cards, clean separation */}
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.7 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-black text-base transition-all"
          style={{
            background: "linear-gradient(135deg, #C9A84C 0%, #e8c96a 50%, #C9A84C 100%)",
            boxShadow: "0 0 32px rgba(201,168,76,0.35), 0 2px 16px rgba(0,0,0,0.4)",
          }}
        >
          <MessageCircle className="w-5 h-5" />
          Book a Free Consultation
        </motion.a>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        >
          <motion.div animate={{ y: [0, 12, 0], opacity: [0.4, 1, 0.4] }} transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="w-[1px] h-10 bg-gradient-to-b from-primary/60 to-transparent rounded-full" />
        </motion.div>
      </div>
    </section>
  );
};
