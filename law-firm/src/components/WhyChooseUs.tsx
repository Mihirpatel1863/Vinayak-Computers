import React from "react";
import { motion } from "framer-motion";
import { UserCheck, Trophy, Scale, ShieldCheck, Clock, Star } from "lucide-react";

const features = [
  {
    icon: UserCheck,
    title: "Personalized Attention",
    description: "Every case is unique. Dedicated focus to understand the nuances of your specific legal situation.",
    accent: "from-blue-500/10",
  },
  {
    icon: Trophy,
    title: "Proven Track Record",
    description: "Decades of successful judgments and satisfied clients stand testament to our legal acumen.",
    accent: "from-amber-500/10",
  },
  {
    icon: Scale,
    title: "Multi-court Expertise",
    description: "Extensive experience spanning District Courts to the High Court — seamless representation at all levels.",
    accent: "from-emerald-500/10",
  },
  {
    icon: ShieldCheck,
    title: "Confidential & Trustworthy",
    description: "Absolute discretion and unwavering ethics in handling your most sensitive personal and legal matters.",
    accent: "from-purple-500/10",
  },
  {
    icon: Clock,
    title: "Timely & Responsive",
    description: "We understand urgency. Prompt responses and proactive communication at every stage of your case.",
    accent: "from-rose-500/10",
  },
  {
    icon: Star,
    title: "Multi-Generational Wisdom",
    description: "The rare combination of time-tested legal wisdom and sharp modern legal strategy — all under one roof.",
    accent: "from-primary/10",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

export const WhyChooseUs = () => {
  return (
    <section className="py-28 bg-[#040404] relative overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[400px] bg-primary/3 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[300px] bg-primary/2 rounded-full blur-[140px] pointer-events-none" />

      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(rgba(201,168,76,0.035) 1px, transparent 1px)", backgroundSize: "44px 44px" }} />

      {/* Border lines */}
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
          <span className="text-primary tracking-[0.3em] text-[10px] uppercase mb-4 block font-semibold">Why Us</span>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-6">
            Why <span className="text-primary italic">Choose Us</span>
          </h2>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-primary" />
            <div className="w-1 h-1 rounded-full bg-primary" />
            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-primary" />
          </div>
          <p className="text-muted-foreground text-lg">
            Our firm stands on the pillars of integrity, deep legal knowledge, and an unwavering commitment to our clients' best interests.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                variants={item}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ duration: 0.25 }}
                className="group relative p-8 border border-white/8 bg-white/[0.015] backdrop-blur-sm rounded-2xl hover:border-primary/40 transition-all duration-500 overflow-hidden"
              >
                {/* Hover gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.accent} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />

                {/* Animated border on hover */}
                <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-primary/80 to-transparent transition-all duration-500 rounded-b-2xl" />

                {/* Number watermark */}
                <div className="absolute top-3 right-5 text-5xl font-serif text-white/4 select-none group-hover:text-white/7 transition-colors">
                  {String(idx + 1).padStart(2, "0")}
                </div>

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-13 h-13 w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/20 group-hover:border-primary/40 group-hover:shadow-[0_0_20px_rgba(201,168,76,0.15)] transition-all duration-400">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
