import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useSiteData } from "@/context/SiteContext";

const Counter = ({ value, label, suffix = "", index }: { value: number; label: string; suffix?: string; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = value;
    const duration = 2200;
    const steps = Math.min(end, 80);
    const increment = end / steps;
    const intervalTime = duration / steps;
    const timer = setInterval(() => {
      start += increment;
      const rounded = Math.round(Math.min(start, end));
      setCount(rounded);
      if (start >= end) clearInterval(timer);
    }, intervalTime);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: "easeOut" }}
      className="relative text-center flex flex-col items-center group px-4 py-8"
    >
      {/* Glow behind number */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(201,168,76,0.06)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />

      {/* Number */}
      <div className="relative font-serif text-5xl md:text-7xl font-bold leading-none mb-4"
        style={{ background: "linear-gradient(135deg, #C9A84C 0%, #f0d078 50%, #C9A84C 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
        {count}{suffix}
      </div>

      {/* Divider */}
      <motion.div className="w-10 h-[1px] bg-primary/50 mb-4"
        initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
        transition={{ delay: 0.3 + index * 0.12, duration: 0.5 }} />

      {/* Label */}
      <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-[0.25em] font-medium">
        {label}
      </div>
    </motion.div>
  );
};

export const ExperienceCounters = () => {
  const { data } = useSiteData();

  return (
    <section className="py-20 relative overflow-hidden border-y border-white/6">
      {/* Background */}
      <div className="absolute inset-0 bg-[#050505]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(201,168,76,0.04)_0%,transparent_70%)]" />
      <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(rgba(201,168,76,0.035) 1px, transparent 1px)", backgroundSize: "36px 36px" }} />

      {/* Top shimmer line */}
      <motion.div className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ background: "linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.5) 50%, transparent 100%)" }}
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 3 }} />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 divide-x divide-y lg:divide-y-0 divide-white/8">
          {data.counterStats.map((stat, i) => (
            <Counter key={stat.id} value={stat.value} suffix={stat.suffix} label={stat.label} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};
