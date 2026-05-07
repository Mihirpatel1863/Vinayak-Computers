import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useSiteData } from "@/context/SiteContext";

const DURATION = 5500;

export const Testimonials = () => {
  const { data } = useSiteData();
  const testimonials = data.testimonials;
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  const goTo = (idx: number, dir: number) => {
    setDirection(dir);
    setCurrent(idx);
    setProgress(0);
    startRef.current = null;
  };
  const prev = () => goTo((current - 1 + testimonials.length) % testimonials.length, -1);
  const next = () => goTo((current + 1) % testimonials.length, 1);

  useEffect(() => {
    const animate = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const p = Math.min(elapsed / DURATION, 1);
      setProgress(p);
      if (p >= 1) {
        setDirection(1);
        setCurrent(c => (c + 1) % testimonials.length);
        startRef.current = null;
        setProgress(0);
      } else {
        progressRef.current = requestAnimationFrame(animate);
      }
    };
    progressRef.current = requestAnimationFrame(animate);
    return () => { if (progressRef.current) cancelAnimationFrame(progressRef.current); };
  }, [current, testimonials.length]);

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 80 : -80, scale: 0.97 }),
    center: { opacity: 1, x: 0, scale: 1 },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -80 : 80, scale: 0.97 }),
  };

  return (
    <section className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#060606]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(201,168,76,0.05)_0%,transparent_70%)]" />
      <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(rgba(201,168,76,0.03) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      <motion.div className="absolute left-0 top-1/2 -translate-y-1/2 w-[400px] h-[500px] bg-primary/4 rounded-full blur-[140px] -translate-x-1/2 pointer-events-none"
        animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 4, repeat: Infinity }} />
      <motion.div className="absolute right-0 top-1/2 -translate-y-1/2 w-[300px] h-[400px] bg-primary/3 rounded-full blur-[120px] translate-x-1/3 pointer-events-none"
        animate={{ opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 5, repeat: Infinity, delay: 1 }} />
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/12 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/12 to-transparent" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-primary tracking-[0.3em] text-[10px] uppercase mb-4 block font-semibold">Voices of Trust</span>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-6">
            Client <span className="text-primary italic">Testimonials</span>
          </h2>
          <div className="flex items-center justify-center gap-3">
            <motion.div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-primary"
              initial={{ scaleX: 0, originX: 1 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} />
            <motion.div className="w-1 h-1 rounded-full bg-primary" animate={{ scale: [1, 1.6, 1] }} transition={{ duration: 2, repeat: Infinity }} />
            <motion.div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-primary"
              initial={{ scaleX: 0, originX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} />
          </div>
        </motion.div>

        <div className="max-w-4xl mx-auto mb-12 relative" style={{ perspective: "1200px" }}>
          <AnimatePresence custom={direction} mode="wait">
            <motion.div key={current} custom={direction} variants={variants} initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.55, ease: [0.32, 0, 0.67, 0] }}
              className="relative p-10 md:p-16 border border-white/10 bg-white/[0.025] backdrop-blur-md rounded-3xl text-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/6 via-transparent to-primary/3 rounded-3xl pointer-events-none" />
              <motion.div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-primary/0 rounded-tl-3xl"
                animate={{ borderColor: ["rgba(201,168,76,0.1)", "rgba(201,168,76,0.4)", "rgba(201,168,76,0.1)"] }}
                transition={{ duration: 3, repeat: Infinity }} />
              <motion.div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-primary/0 rounded-tr-3xl"
                animate={{ borderColor: ["rgba(201,168,76,0.1)", "rgba(201,168,76,0.4)", "rgba(201,168,76,0.1)"] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.75 }} />
              <motion.div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-primary/0 rounded-bl-3xl"
                animate={{ borderColor: ["rgba(201,168,76,0.1)", "rgba(201,168,76,0.4)", "rgba(201,168,76,0.1)"] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }} />
              <motion.div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-primary/0 rounded-br-3xl"
                animate={{ borderColor: ["rgba(201,168,76,0.1)", "rgba(201,168,76,0.4)", "rgba(201,168,76,0.1)"] }}
                transition={{ duration: 3, repeat: Infinity, delay: 2.25 }} />
              <motion.div animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.05, 1] }} transition={{ duration: 3, repeat: Infinity }} className="mb-8">
                <Quote className="w-14 h-14 text-primary/40 mx-auto" />
              </motion.div>
              <div className="flex justify-center gap-1 mb-8">
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.div key={i} initial={{ opacity: 0, scale: 0, rotate: -20 }} animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.4, type: "spring", stiffness: 300 }}>
                    <Star className="w-4 h-4 text-primary fill-primary" />
                  </motion.div>
                ))}
              </div>
              <motion.blockquote className="font-serif text-xl md:text-2xl text-foreground/90 leading-relaxed mb-10 italic"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.5 }}>
                "{testimonials[current].quote}"
              </motion.blockquote>
              <motion.div className="flex flex-col items-center gap-2"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.4 }}>
                <div className="w-12 h-[1px] bg-primary/40 mb-1" />
                <div className="font-semibold text-foreground tracking-wide">{testimonials[current].author}</div>
                <div className="text-primary text-xs uppercase tracking-[0.2em]">{testimonials[current].role}</div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="h-[2px] bg-white/8 rounded-full mb-8 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full" style={{ width: `${progress * 100}%`, transition: "none" }} />
          </div>
          <div className="flex items-center justify-center gap-6">
            <motion.button onClick={prev} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-primary hover:border-primary/50 transition-all duration-300">
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <motion.button key={i} onClick={() => goTo(i, i > current ? 1 : -1)} className="rounded-full"
                  animate={{ width: i === current ? 28 : 8, height: 8, backgroundColor: i === current ? "rgba(201,168,76,0.9)" : "rgba(255,255,255,0.2)" }} />
              ))}
            </div>
            <motion.button onClick={next} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-primary hover:border-primary/50 transition-all duration-300">
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};
