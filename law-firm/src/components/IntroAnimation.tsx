import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ganeshLogo from "@/assets/images/ganesh-logo.png";
import { useSiteData } from "@/context/SiteContext";

interface IntroAnimationProps {
  onComplete: () => void;
}

const ease = [0.76, 0, 0.24, 1] as const;

export const IntroAnimation = ({ onComplete }: IntroAnimationProps) => {
  const { data } = useSiteData();
  const [phase, setPhase] = useState<"show" | "open" | "exit">("show");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("open"), 3000);
    const t2 = setTimeout(() => setPhase("exit"), 3800);
    const t3 = setTimeout(() => onComplete(), 4600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  const advocate1 = data.advocates[0]?.name ?? "Adv. Ramesh N Patel";
  const advocate2 = data.advocates[1]?.name ?? "Adv. Jaydeep N Patel";

  return (
    <AnimatePresence>
      {phase !== "exit" && (
        <motion.div
          key="intro-root"
          className="fixed inset-0 z-[300]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* ── LEFT PANEL ── */}
          <motion.div
            className="absolute top-0 left-0 w-1/2 h-full overflow-hidden"
            style={{ background: "#060606" }}
            animate={phase === "open" ? { x: "-100%" } : { x: 0 }}
            transition={{ duration: 1.2, ease }}
          >
            <div className="absolute inset-0" style={{
              backgroundImage: "radial-gradient(rgba(201,168,76,0.04) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }} />
            <div className="absolute right-0 top-0 h-full w-[2px] bg-gradient-to-b from-transparent via-primary/60 to-transparent" />
            <div className="absolute top-4 left-4 md:top-6 md:left-6 w-8 h-8 md:w-12 md:h-12 border-t border-l border-primary/40" />
            <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 w-8 h-8 md:w-12 md:h-12 border-b border-l border-primary/40" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_80%_50%,rgba(201,168,76,0.05)_0%,transparent_70%)]" />
            <div className="absolute left-6 md:left-10 top-[15%] bottom-[15%] w-[1px] bg-gradient-to-b from-transparent via-primary/20 to-transparent" />
          </motion.div>

          {/* ── RIGHT PANEL ── */}
          <motion.div
            className="absolute top-0 right-0 w-1/2 h-full overflow-hidden"
            style={{ background: "#060606" }}
            animate={phase === "open" ? { x: "100%" } : { x: 0 }}
            transition={{ duration: 1.2, ease }}
          >
            <div className="absolute inset-0" style={{
              backgroundImage: "radial-gradient(rgba(201,168,76,0.04) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }} />
            <div className="absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-transparent via-primary/60 to-transparent" />
            <div className="absolute top-4 right-4 md:top-6 md:right-6 w-8 h-8 md:w-12 md:h-12 border-t border-r border-primary/40" />
            <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 w-8 h-8 md:w-12 md:h-12 border-b border-r border-primary/40" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_20%_50%,rgba(201,168,76,0.05)_0%,transparent_70%)]" />
            <div className="absolute right-6 md:right-10 top-[15%] bottom-[15%] w-[1px] bg-gradient-to-b from-transparent via-primary/20 to-transparent" />
          </motion.div>

          {/* ── CENTER SPINE ── */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-[2px] md:w-[3px] bg-gradient-to-b from-transparent via-primary/50 to-transparent z-10" />

          {/* ── FLOATING PARTICLES ── */}
          {Array.from({ length: 14 }).map((_, i) => (
            <motion.div key={i}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: Math.random() * 3 + 1,
                height: Math.random() * 3 + 1,
                background: `rgba(201,168,76,${0.2 + Math.random() * 0.4})`,
                top: `${10 + Math.random() * 80}%`,
                left: `${5 + Math.random() * 90}%`,
              }}
              animate={{ y: [0, -25, 0], opacity: [0, 0.8, 0] }}
              transition={{ duration: 2.5 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2.5, ease: "easeInOut" }}
            />
          ))}

          {/* ── CENTER CONTENT ── */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none px-4"
            animate={phase === "open" ? { opacity: 0, scale: 1.08 } : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          >
            {/* Outer glow — scales with screen */}
            <motion.div
              className="absolute rounded-full"
              style={{
                width: "min(320px, 82vw)",
                height: "min(320px, 82vw)",
                background: "radial-gradient(circle, rgba(201,168,76,0.10) 0%, transparent 70%)",
              }}
              animate={{ scale: [1, 1.15, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Rotating rings — vw-capped for mobile */}
            {[
              { size: "min(200px, 52vw)", dashed: true, dir: 1, dur: 22 },
              { size: "min(160px, 42vw)", dashed: false, dir: -1, dur: 18 },
              { size: "min(120px, 32vw)", dashed: false, dir: 1, dur: 14 },
            ].map(({ size, dashed, dir, dur }, i) => (
              <motion.div key={i}
                className="absolute rounded-full"
                style={{
                  width: size, height: size,
                  border: `${dashed ? "1px dashed" : "1px solid"} rgba(201,168,76,${0.1 + i * 0.08})`,
                }}
                animate={{ rotate: dir * 360 }}
                transition={{ duration: dur, repeat: Infinity, ease: "linear" }}
              />
            ))}

            {/* Ganesh Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              className="relative flex items-center justify-center rounded-full mb-5"
              style={{
                width: "min(112px, 28vw)",
                height: "min(112px, 28vw)",
                background: "radial-gradient(circle, rgba(201,168,76,0.15) 0%, transparent 70%)",
                border: "1.5px solid rgba(201,168,76,0.4)",
                boxShadow: "0 0 60px rgba(201,168,76,0.25), 0 0 120px rgba(201,168,76,0.08)",
              }}
            >
              <motion.img
                src={ganeshLogo}
                alt="Ganesh Logo"
                style={{
                  width: "min(76px, 19vw)",
                  height: "min(76px, 19vw)",
                  objectFit: "contain",
                  filter: "sepia(1) saturate(5) hue-rotate(5deg) brightness(1.2) drop-shadow(0 0 20px rgba(201,168,76,0.9))",
                }}
                animate={{ opacity: [0.85, 1, 0.85] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>

            {/* Firm Name */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.6, ease: "easeOut" }}
              className="text-center mb-4 w-full"
            >
              <h1
                className="font-serif text-white font-normal tracking-widest mb-1 leading-tight"
                style={{ fontSize: "clamp(1.4rem, 7vw, 3rem)", letterSpacing: "0.12em" }}
              >
                {data.firmName}
              </h1>
              <p
                className="text-primary uppercase mt-2"
                style={{ fontSize: "clamp(8px, 2.2vw, 12px)", letterSpacing: "0.38em" }}
              >
                {data.tagline}
              </p>
            </motion.div>

            {/* Gold Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="flex items-center gap-2 md:gap-3 mb-4"
            >
              <div className="h-[1px] bg-gradient-to-r from-transparent to-primary" style={{ width: "clamp(40px, 8vw, 96px)" }} />
              <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
              <div className="h-[1px] bg-gradient-to-l from-transparent to-primary" style={{ width: "clamp(40px, 8vw, 96px)" }} />
            </motion.div>

            {/* Advocate Names */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="text-center"
            >
              <p className="text-primary/70 uppercase mb-3" style={{ fontSize: "clamp(8px, 2vw, 10px)", letterSpacing: "0.35em" }}>
                Our Advocates
              </p>
              <div className="flex flex-col md:flex-row items-center gap-2 md:gap-8">
                <p className="font-serif text-white/90 tracking-wide" style={{ fontSize: "clamp(0.9rem, 3.5vw, 1.25rem)" }}>
                  {advocate1}
                </p>
                <div className="hidden md:block w-[1px] h-5 bg-primary/40" />
                <div className="block md:hidden h-[1px] bg-primary/40" style={{ width: "clamp(32px, 8vw, 48px)" }} />
                <p className="font-serif text-white/90 tracking-wide" style={{ fontSize: "clamp(0.9rem, 3.5vw, 1.25rem)" }}>
                  {advocate2}
                </p>
              </div>
            </motion.div>

            {/* Loading bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2"
              style={{ width: "clamp(120px, 35vw, 224px)" }}
            >
              <div className="h-[1px] bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2.8, ease: "linear", delay: 0.2 }}
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
