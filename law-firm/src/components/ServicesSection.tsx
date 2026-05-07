import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Stamp, FileCheck, PenLine, DollarSign, Home, FileText, Shield, CheckCircle, ArrowRight } from "lucide-react";
import { useSiteData } from "@/context/SiteContext";

const SERVICE_ICONS = [Stamp, FileCheck, PenLine, DollarSign, Home, FileText, Shield, CheckCircle];

const ServiceCard = ({ svc, idx }: { svc: any; idx: number }) => {
  const Icon = SERVICE_ICONS[idx % SERVICE_ICONS.length];
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-60, 60], [6, -6]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-60, 60], [-6, 6]), { stiffness: 300, damping: 30 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };
  const resetMouse = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: idx * 0.08, ease: "easeOut" }}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      onMouseMove={handleMouse}
      onMouseLeave={resetMouse}
      className="group relative p-7 border border-white/8 bg-white/[0.015] backdrop-blur-sm rounded-2xl hover:border-primary/50 transition-colors duration-500 overflow-hidden cursor-default"
    >
      {/* Animated spotlight */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
        style={{ background: "radial-gradient(circle at 50% 0%, rgba(201,168,76,0.12) 0%, transparent 60%)" }} />

      {/* Top sweep line */}
      <div className="absolute top-0 left-0 w-0 group-hover:w-full h-[2px] bg-gradient-to-r from-primary via-primary/60 to-transparent transition-all duration-600 rounded-t-2xl" style={{ transitionDuration: "0.6s" }} />

      {/* Bottom sweep line */}
      <div className="absolute bottom-0 right-0 w-0 group-hover:w-full h-[1px] bg-gradient-to-l from-primary/40 to-transparent transition-all duration-700 rounded-b-2xl" style={{ transitionDuration: "0.7s" }} />

      {/* Watermark number */}
      <div className="absolute top-3 right-5 text-5xl font-serif select-none transition-all duration-500"
        style={{ color: "rgba(201,168,76,0.05)" }}>
        {String(idx + 1).padStart(2, "0")}
      </div>

      <div className="relative z-10">
        {/* Icon with pulse ring */}
        <div className="relative w-12 h-12 mb-5">
          <motion.div className="absolute inset-0 rounded-xl border border-primary/20"
            animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: idx * 0.3 }} />
          <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/50 group-hover:shadow-[0_0_20px_rgba(201,168,76,0.25)] transition-all duration-400">
            <Icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" />
          </div>
        </div>

        <h3 className="font-serif text-xl text-foreground mb-3 group-hover:text-primary transition-colors duration-300 leading-tight">
          {svc.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">{svc.description}</p>

        <motion.div className="flex items-center gap-2 text-primary/0 group-hover:text-primary/70 transition-colors duration-300 text-xs font-medium tracking-wider uppercase"
          initial={{ x: -8, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}>
          <div className="w-0 group-hover:w-4 h-[1px] bg-primary/50 transition-all duration-400" />
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">Enquire</span>
          <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150 group-hover:translate-x-1" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export const ServicesSection = () => {
  const { data } = useSiteData();
  return (
    <section id="services" className="py-24 bg-black relative border-t border-white/5 overflow-hidden">
      {/* Floating ambient orbs */}
      <motion.div className="absolute left-0 top-0 w-[400px] h-[400px] bg-primary/4 rounded-full blur-[120px] pointer-events-none"
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute right-0 bottom-0 w-[300px] h-[300px] bg-primary/3 rounded-full blur-[80px] pointer-events-none"
        animate={{ x: [0, -20, 0], y: [0, 20, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }} />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16">
          <motion.span className="text-primary tracking-[0.3em] text-xs uppercase mb-4 block"
            initial={{ letterSpacing: "0.1em", opacity: 0 }} whileInView={{ letterSpacing: "0.3em", opacity: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }}>
            What We Offer
          </motion.span>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-6">
            Our <span className="text-primary italic">Services</span>
          </h2>
          <motion.div className="flex items-center justify-center gap-3 mb-6"
            initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-primary" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-primary" />
          </motion.div>
          <p className="text-muted-foreground text-lg">Beyond litigation — comprehensive legal and documentation services under one roof.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.services.map((svc, idx) => <ServiceCard key={svc.id} svc={svc} idx={idx} />)}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-14">
          <motion.a href="#contact"
            onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
            className="inline-flex items-center gap-3 px-8 py-4 border border-primary text-primary hover:bg-primary hover:text-black transition-all duration-300 font-semibold tracking-wide rounded-xl group"
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Stamp className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
            Enquire About Our Services
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};
