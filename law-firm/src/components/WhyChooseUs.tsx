import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { UserCheck, Trophy, Scale, ShieldCheck, Clock, Star } from "lucide-react";

const features = [
  { icon: UserCheck, title: "Personalized Attention", description: "Every case is unique. Dedicated focus to understand the nuances of your specific legal situation.", accent: "rgba(59,130,246,0.08)" },
  { icon: Trophy, title: "Proven Track Record", description: "Decades of successful judgments and satisfied clients stand testament to our legal acumen.", accent: "rgba(245,158,11,0.08)" },
  { icon: Scale, title: "Multi-court Expertise", description: "Extensive experience spanning District Courts to the High Court — seamless representation at all levels.", accent: "rgba(16,185,129,0.08)" },
  { icon: ShieldCheck, title: "Confidential & Trustworthy", description: "Absolute discretion and unwavering ethics in handling your most sensitive personal and legal matters.", accent: "rgba(139,92,246,0.08)" },
  { icon: Clock, title: "Timely & Responsive", description: "We understand urgency. Prompt responses and proactive communication at every stage of your case.", accent: "rgba(239,68,68,0.08)" },
  { icon: Star, title: "Multi-Generational Wisdom", description: "The rare combination of time-tested legal wisdom and sharp modern legal strategy — all under one roof.", accent: "rgba(201,168,76,0.10)" },
];

const FeatureCard = ({ feature, idx }: { feature: typeof features[0]; idx: number }) => {
  const Icon = feature.icon;
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-60, 60], [7, -7]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-60, 60], [-7, 7]), { stiffness: 300, damping: 30 });
  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };
  const resetMouse = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      initial={{ opacity: 0, y: 32, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.65, delay: idx * 0.09, ease: [0.21, 1.11, 0.81, 0.99] }}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onMouseMove={handleMouse}
      onMouseLeave={resetMouse}
      className="group relative p-8 border border-white/8 bg-white/[0.015] backdrop-blur-sm rounded-2xl hover:border-primary/40 transition-colors duration-500 overflow-hidden cursor-default"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
        style={{ background: `radial-gradient(circle at 50% 0%, ${feature.accent} 0%, transparent 70%)` }} />
      <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-primary/80 to-transparent transition-all duration-[0.6s] rounded-b-2xl" />
      <div className="absolute top-3 right-5 text-5xl font-serif text-white/4 select-none group-hover:text-white/7 transition-colors">
        {String(idx + 1).padStart(2, "0")}
      </div>
      <div className="relative z-10">
        <div className="relative w-14 h-14 mb-6">
          <motion.div className="absolute inset-0 rounded-xl border border-primary/20"
            animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2.8, repeat: Infinity, delay: idx * 0.35 }} />
          <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/50 group-hover:shadow-[0_0_24px_rgba(201,168,76,0.25)] transition-all duration-400">
            <Icon className="w-7 h-7 text-primary group-hover:scale-110 group-hover:rotate-6 transition-all duration-400" />
          </div>
        </div>
        <h3 className="font-serif text-xl text-foreground mb-3 group-hover:text-primary transition-colors duration-300">{feature.title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
      </div>
    </motion.div>
  );
};

export const WhyChooseUs = () => {
  return (
    <section id="why-choose-us" className="py-28 bg-[#040404] relative overflow-hidden">
      <motion.div className="absolute top-1/3 left-1/4 w-[600px] h-[400px] bg-primary/3 rounded-full blur-[180px] pointer-events-none"
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 8, repeat: Infinity }} />
      <motion.div className="absolute bottom-1/4 right-1/4 w-[400px] h-[300px] bg-primary/2 rounded-full blur-[140px] pointer-events-none"
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 7, repeat: Infinity, delay: 2 }} />
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(rgba(201,168,76,0.035) 1px, transparent 1px)", backgroundSize: "44px 44px" }} />
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/12 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/12 to-transparent" />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-primary tracking-[0.3em] text-[10px] uppercase mb-4 block font-semibold">Why Us</span>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-6">
            Why <span className="text-primary italic">Choose Us</span>
          </h2>
          <div className="flex items-center justify-center gap-3 mb-6">
            <motion.div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-primary"
              initial={{ scaleX: 0, originX: 1 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} />
            <motion.div className="w-1 h-1 rounded-full bg-primary" animate={{ scale: [1, 1.6, 1] }} transition={{ duration: 2, repeat: Infinity }} />
            <motion.div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-primary"
              initial={{ scaleX: 0, originX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} />
          </div>
          <p className="text-muted-foreground text-lg">Our firm stands on the pillars of integrity, deep legal knowledge, and an unwavering commitment to our clients' best interests.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => <FeatureCard key={i} feature={f} idx={i} />)}
        </div>
      </div>
    </section>
  );
};
