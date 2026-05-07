import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useSiteData } from "@/context/SiteContext";

export const Testimonials = () => {
  const { data } = useSiteData();
  const testimonials = data.testimonials;
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % testimonials.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const prev = () => setCurrent(c => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent(c => (c + 1) % testimonials.length);

  return (
    <section className="py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#060606]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(201,168,76,0.05)_0%,transparent_70%)]" />
      <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(rgba(201,168,76,0.03) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

      {/* Ambient side glows */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[400px] h-[500px] bg-primary/4 rounded-full blur-[140px] -translate-x-1/2 pointer-events-none" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[300px] h-[400px] bg-primary/3 rounded-full blur-[120px] translate-x-1/3 pointer-events-none" />

      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/12 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/12 to-transparent" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="text-primary tracking-[0.3em] text-[10px] uppercase mb-4 block font-semibold">Voices of Trust</span>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-6">
            Client <span className="text-primary italic">Testimonials</span>
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-primary" />
            <div className="w-1 h-1 rounded-full bg-primary" />
            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-primary" />
          </div>
        </motion.div>

        {/* Main testimonial card */}
        <div className="max-w-4xl mx-auto mb-12 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -24, scale: 0.98 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="relative p-10 md:p-16 border border-white/10 bg-white/[0.025] backdrop-blur-md rounded-3xl text-center overflow-hidden"
            >
              {/* Card glow overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/6 via-transparent to-primary/3 rounded-3xl pointer-events-none" />

              {/* Animated corner accents */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-primary/30 rounded-tl-3xl" />
              <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-primary/30 rounded-tr-3xl" />
              <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-primary/30 rounded-bl-3xl" />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-primary/30 rounded-br-3xl" />

              {/* Quote icon */}
              <motion.div
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="mb-8"
              >
                <Quote className="w-14 h-14 text-primary/40 mx-auto" />
              </motion.div>

              {/* Stars */}
              <div className="flex justify-center gap-1 mb-8">
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.08, duration: 0.3 }}
                  >
                    <Star className="w-4 h-4 text-primary fill-primary" />
                  </motion.div>
                ))}
              </div>

              {/* Quote text */}
              <p className="font-serif text-xl md:text-2xl text-foreground/90 italic leading-relaxed mb-12 relative z-10">
                &ldquo;{testimonials[current]?.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center justify-center gap-5 relative z-10">
                <div className="w-14 h-14 rounded-full flex items-center justify-center text-primary font-serif text-2xl font-bold"
                  style={{
                    background: "radial-gradient(circle, rgba(201,168,76,0.2) 0%, transparent 70%)",
                    border: "1.5px solid rgba(201,168,76,0.35)",
                    boxShadow: "0 0 20px rgba(201,168,76,0.15)",
                  }}>
                  {testimonials[current]?.author.charAt(0)}
                </div>
                <div className="text-left">
                  <div className="text-foreground font-semibold tracking-wide">{testimonials[current]?.author}</div>
                  <div className="text-primary text-sm tracking-widest uppercase" style={{ fontSize: "10px" }}>{testimonials[current]?.role}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-5 mt-10">
            <button onClick={prev}
              className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all duration-300">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2 items-center">
              {testimonials.map((_, i) => (
                <motion.button key={i} onClick={() => setCurrent(i)}
                  animate={{ width: i === current ? 28 : 8, backgroundColor: i === current ? "#C9A84C" : "rgba(255,255,255,0.2)" }}
                  transition={{ duration: 0.35 }}
                  className="h-2 rounded-full" />
              ))}
            </div>
            <button onClick={next}
              className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all duration-300">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mini card previews */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {testimonials.slice(0, 3).map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
              onClick={() => setCurrent(idx)}
              className={`p-5 rounded-xl border cursor-pointer transition-all duration-400 group relative overflow-hidden ${
                current === idx
                  ? "border-primary/50 bg-primary/6 shadow-[0_0_30px_rgba(201,168,76,0.08)]"
                  : "border-white/8 bg-white/[0.01] hover:border-white/20 hover:bg-white/[0.02]"
              }`}
            >
              <div className={`absolute top-0 left-0 w-full h-[2px] transition-all duration-400 ${current === idx ? "bg-gradient-to-r from-primary/80 to-transparent" : "opacity-0"}`} />
              <div className="flex gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3 h-3 text-primary fill-primary" />
                ))}
              </div>
              <Quote className="w-4 h-4 text-primary/30 mb-2" />
              <p className="text-muted-foreground text-sm italic line-clamp-3">"{t.quote}"</p>
              <div className="mt-3 text-xs text-primary font-medium tracking-wide">{t.author}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
