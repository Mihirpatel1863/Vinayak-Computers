import React from "react";
import { motion } from "framer-motion";
import { useSiteData } from "@/context/SiteContext";
import ganeshLogo from "@/assets/images/ganesh-logo.png";
import { Scale, BookOpen, Award } from "lucide-react";

export const AboutSection = () => {
  const { data } = useSiteData();

  const pillars = [
    { icon: Scale, label: "Justice" },
    { icon: BookOpen, label: "Expertise" },
    { icon: Award, label: "Integrity" },
  ];

  return (
    <section id="about" className="py-28 bg-black relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/4 rounded-full blur-[150px] pointer-events-none -translate-x-1/2 -translate-y-1/4" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[120px] pointer-events-none translate-x-1/3 translate-y-1/4" />

      {/* Subtle dot grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(rgba(201,168,76,0.04) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

      {/* Horizontal accent lines */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/15 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/15 to-transparent" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <div className="relative">
              {/* Corner frame */}
              <motion.div className="absolute -top-4 -left-4 w-16 h-16 border-t border-l border-primary/40"
                initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }} />
              <motion.div className="absolute -bottom-4 -right-4 w-16 h-16 border-b border-r border-primary/40"
                initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5 }} />

              <div className="relative bg-white/[0.02] border border-white/8 backdrop-blur-sm p-10 lg:p-14 rounded-xl">
                {/* Gradient overlay inside card */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/4 via-transparent to-transparent pointer-events-none" />

                <span className="text-primary tracking-[0.3em] text-[10px] uppercase mb-4 block font-semibold">Our Legacy</span>
                <h2 className="font-serif text-3xl md:text-4xl text-foreground leading-tight mb-8">
                  {data.aboutHeading.split(" ").map((word, i, arr) =>
                    i === arr.length - 1
                      ? <span key={i} className="text-primary italic"> {word}</span>
                      : <span key={i}>{word} </span>
                  )}
                </h2>

                <div className="space-y-5 text-muted-foreground text-base leading-relaxed relative z-10">
                  <p>{data.aboutText1}</p>
                  <p>{data.aboutText2}</p>
                  <p className="text-foreground/70 italic border-l-2 border-primary/50 pl-4">{data.aboutText3}</p>
                </div>

                {/* 3 Pillars */}
                <div className="mt-10 grid grid-cols-3 gap-4">
                  {pillars.map(({ icon: Icon, label }) => (
                    <div key={label} className="text-center group">
                      <div className="w-10 h-10 mx-auto rounded-lg bg-primary/8 border border-primary/15 flex items-center justify-center mb-2 group-hover:bg-primary/15 group-hover:border-primary/30 transition-all duration-300">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <p className="text-[10px] text-primary/70 uppercase tracking-widest">{label}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex items-center gap-4">
                  <div className="flex-1 h-[1px] bg-gradient-to-r from-primary/60 to-transparent" />
                  <span className="font-serif italic text-sm text-foreground/60">{data.advocates[0]?.name.replace("Adv. ", "")}, Founder</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — Visual Panel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
            className="hidden lg:block relative h-full min-h-[600px]"
          >
            <div className="absolute inset-0 bg-white/[0.015] border border-white/8 rounded-xl overflow-hidden flex items-center justify-center backdrop-blur-sm">
              {/* Inner glow */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.08)_0%,transparent_65%)]" />

              {/* Dot grid */}
              <div className="absolute inset-0"
                style={{ backgroundImage: "radial-gradient(rgba(201,168,76,0.05) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

              {/* Animated concentric rings */}
              {[300, 240, 180, 120, 64].map((size, i) => (
                <motion.div key={i}
                  className="absolute rounded-full"
                  style={{
                    width: size, height: size,
                    border: `${i === 4 ? "2px" : "1px"} ${i % 2 === 0 ? "dashed" : "solid"} rgba(201,168,76,${0.06 + i * 0.06})`,
                  }}
                  animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                  transition={{ duration: 15 + i * 10, repeat: Infinity, ease: "linear" }}
                />
              ))}

              {/* Gold pulsing ring around logo */}
              <motion.div className="absolute rounded-full"
                style={{ width: 168, height: 168, border: "1px solid rgba(201,168,76,0.25)", boxShadow: "0 0 40px rgba(201,168,76,0.1)" }}
                animate={{ scale: [1, 1.07, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }} />

              {/* Ganesh Logo */}
              <div className="relative z-10 flex flex-col items-center gap-6">
                <motion.div
                  className="w-36 h-36 rounded-full flex items-center justify-center"
                  style={{
                    background: "radial-gradient(circle, rgba(201,168,76,0.18) 0%, transparent 70%)",
                    border: "1.5px solid rgba(201,168,76,0.4)",
                    boxShadow: "0 0 60px rgba(201,168,76,0.2), 0 0 100px rgba(201,168,76,0.08)",
                  }}
                  animate={{ boxShadow: ["0 0 40px rgba(201,168,76,0.15)", "0 0 80px rgba(201,168,76,0.3)", "0 0 40px rgba(201,168,76,0.15)"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <img src={ganeshLogo} alt="Logo" className="w-24 h-24 object-contain"
                    style={{ filter: "sepia(1) saturate(4) hue-rotate(5deg) brightness(1.15) drop-shadow(0 0 20px rgba(201,168,76,0.8))" }} />
                </motion.div>

                <div className="text-center space-y-2">
                  <div className="font-serif text-2xl text-primary font-semibold tracking-wide">{data.firmName}</div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-[1px] bg-primary/30" />
                    <div className="text-[9px] text-white/40 tracking-[0.4em] uppercase">Est. 1994</div>
                    <div className="flex-1 h-[1px] bg-primary/30" />
                  </div>
                  <div className="text-xs text-white/30 tracking-widest uppercase">{data.tagline}</div>
                </div>

                {/* Advocate names in the panel */}
                <div className="text-center space-y-1 mt-1">
                  {data.advocates.map(adv => (
                    <p key={adv.id} className="text-sm text-white/50 font-serif italic">{adv.name}</p>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
