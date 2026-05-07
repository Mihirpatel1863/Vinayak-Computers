import React from "react";
import { motion } from "framer-motion";
import { Scale, ShieldAlert, Home, Users, Briefcase, BookOpen, UserMinus, Landmark, Gavel } from "lucide-react";
import { useSiteData } from "@/context/SiteContext";

const ICONS: Record<string, React.ElementType> = {
  civil: Scale,
  criminal: ShieldAlert,
  property: Home,
  family: Users,
  corporate: Briefcase,
  constitutional: BookOpen,
  consumer: UserMinus,
  highcourt: Landmark,
  default: Gavel,
};

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
};
const item = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

export const PracticeAreas = () => {
  const { data } = useSiteData();

  return (
    <section id="practice-areas" className="py-28 relative overflow-hidden">
      {/* Multi-layer background */}
      <div className="absolute inset-0 bg-[#080808]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_80%_20%,rgba(201,168,76,0.06)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_10%_80%,rgba(201,168,76,0.04)_0%,transparent_60%)]" />
      <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(rgba(201,168,76,0.035) 1px, transparent 1px)", backgroundSize: "38px 38px" }} />

      {/* Border lines */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/15 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/15 to-transparent" />

      {/* Vertical accent */}
      <div className="absolute left-[8%] top-[20%] h-[60%] w-[1px] bg-gradient-to-b from-transparent via-primary/12 to-transparent" />
      <div className="absolute right-[8%] top-[30%] h-[50%] w-[1px] bg-gradient-to-b from-transparent via-primary/12 to-transparent" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="text-primary tracking-[0.3em] text-[10px] uppercase mb-4 block font-semibold">What We Do</span>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-6">
            Areas of <span className="text-primary italic">Practice</span>
          </h2>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-primary" />
            <div className="w-1 h-1 rounded-full bg-primary" />
            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-primary" />
          </div>
          <p className="text-muted-foreground text-lg">
            Expert legal counsel and vigorous representation across a wide spectrum of legal disciplines.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {data.practiceAreas.map((practice, idx) => {
            const Icon = ICONS[practice.id] ?? ICONS.default;
            return (
              <motion.div
                key={practice.id}
                variants={item}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.28 }}
                className="group relative p-7 border border-white/8 bg-white/[0.018] backdrop-blur-sm rounded-2xl hover:border-primary/50 transition-all duration-500 cursor-default overflow-hidden"
              >
                {/* Hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

                {/* Animated top border on hover */}
                <div className="absolute top-0 left-0 w-0 group-hover:w-full h-[2px] bg-gradient-to-r from-primary to-primary/20 transition-all duration-500 rounded-t-2xl" />

                {/* Background number watermark */}
                <div className="absolute top-2 right-4 text-6xl font-serif text-primary/4 select-none group-hover:text-primary/8 transition-colors duration-300">
                  {String(idx + 1).padStart(2, "0")}
                </div>

                {/* Corner accent */}
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-primary/0 group-hover:border-primary/20 transition-colors duration-500 rounded-br-2xl" />

                <div className="relative z-10">
                  <motion.div
                    className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/20 group-hover:border-primary/40 group-hover:shadow-[0_0_25px_rgba(201,168,76,0.2)] transition-all duration-400"
                    whileHover={{ rotate: 8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon className="w-6 h-6 text-primary" />
                  </motion.div>

                  <h3 className="font-serif text-xl text-foreground mb-3 group-hover:text-primary transition-colors duration-300 leading-tight">
                    {practice.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {practice.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
