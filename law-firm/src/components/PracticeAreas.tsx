import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Scale, ShieldAlert, Home, Users, Briefcase, BookOpen, UserMinus, Landmark, Gavel } from "lucide-react";
import { useSiteData } from "@/context/SiteContext";

const ICONS: Record<string, React.ElementType> = {
  civil: Scale, criminal: ShieldAlert, property: Home, family: Users,
  corporate: Briefcase, constitutional: BookOpen, consumer: UserMinus, highcourt: Landmark, default: Gavel,
};

const PracticeCard = ({ practice, idx }: { practice: any; idx: number }) => {
  const Icon = ICONS[practice.id] ?? ICONS.default;
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-60, 60], [8, -8]), { stiffness: 350, damping: 35 });
  const rotateY = useSpring(useTransform(x, [-60, 60], [-8, 8]), { stiffness: 350, damping: 35 });
  const glowX = useTransform(x, [-60, 60], [0, 100]);
  const glowY = useTransform(y, [-60, 60], [0, 100]);

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };
  const resetMouse = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.65, delay: idx * 0.07, ease: [0.21, 1.11, 0.81, 0.99] }}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onMouseMove={handleMouse}
      onMouseLeave={resetMouse}
      className="group relative p-7 border border-white/8 bg-white/[0.018] backdrop-blur-sm rounded-2xl hover:border-primary/50 transition-colors duration-400 cursor-default overflow-hidden"
    >
      <motion.div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(201,168,76,0.12) 0%, transparent 60%)` }} />
      <div className="absolute top-0 left-0 w-0 group-hover:w-full h-[2px] bg-gradient-to-r from-primary/90 to-transparent transition-all duration-500 rounded-t-2xl" />
      <motion.div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-primary/0 group-hover:bg-primary/60 transition-all duration-300"
        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }} />
      <div className="absolute top-2 right-4 text-6xl font-serif text-primary/4 select-none group-hover:text-primary/8 transition-colors duration-400">
        {String(idx + 1).padStart(2, "0")}
      </div>
      <div className="relative z-10">
        <div className="relative w-12 h-12 mb-6">
          <motion.div className="absolute inset-0 rounded-xl bg-primary/10 border border-primary/20"
            animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, delay: idx * 0.25 }} />
          <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/25 group-hover:border-primary/50 group-hover:shadow-[0_0_30px_rgba(201,168,76,0.3)] transition-all duration-400">
            <Icon className="w-6 h-6 text-primary group-hover:scale-125 group-hover:rotate-6 transition-all duration-400" />
          </div>
        </div>
        <h3 className="font-serif text-xl text-foreground mb-3 group-hover:text-primary transition-colors duration-300 leading-tight">
          {practice.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{practice.description}</p>
      </div>
    </motion.div>
  );
};

export const PracticeAreas = () => {
  const { data } = useSiteData();
  return (
    <section id="practice-areas" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#080808]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_80%_20%,rgba(201,168,76,0.06)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_10%_80%,rgba(201,168,76,0.04)_0%,transparent_60%)]" />
      <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(rgba(201,168,76,0.035) 1px, transparent 1px)", backgroundSize: "38px 38px" }} />
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/15 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/15 to-transparent" />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-20">
          <motion.span className="text-primary tracking-[0.3em] text-[10px] uppercase mb-4 block font-semibold"
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            What We Do
          </motion.span>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-6">
            Areas of <span className="text-primary italic">Practice</span>
          </h2>
          <div className="flex items-center justify-center gap-3 mb-6">
            <motion.div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-primary"
              initial={{ scaleX: 0, originX: 1 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} />
            <motion.div className="w-1 h-1 rounded-full bg-primary"
              animate={{ scale: [1, 1.6, 1] }} transition={{ duration: 2, repeat: Infinity }} />
            <motion.div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-primary"
              initial={{ scaleX: 0, originX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} />
          </div>
          <p className="text-muted-foreground text-lg">Expert legal counsel and vigorous representation across a wide spectrum of legal disciplines.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.practiceAreas.map((p, i) => <PracticeCard key={p.id} practice={p} idx={i} />)}
        </div>
      </div>
    </section>
  );
};
