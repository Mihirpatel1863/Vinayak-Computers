import React from "react";
import { motion } from "framer-motion";
import { Stamp, FileCheck, PenLine, DollarSign, Home, FileText, Shield, CheckCircle } from "lucide-react";
import { useSiteData } from "@/context/SiteContext";

const SERVICE_ICONS = [Stamp, FileCheck, PenLine, DollarSign, Home, FileText, Shield, CheckCircle];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

export const ServicesSection = () => {
  const { data } = useSiteData();
  return (
    <section id="services" className="py-24 bg-black relative border-t border-white/5">
      <div className="absolute left-0 top-0 w-[400px] h-[400px] bg-primary/4 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute right-0 bottom-0 w-[300px] h-[300px] bg-primary/3 rounded-full blur-[80px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary tracking-[0.3em] text-xs uppercase mb-4 block">What We Offer</span>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-6">
            Our <span className="text-primary italic">Services</span>
          </h2>
          <div className="w-24 h-[1px] bg-primary mx-auto mb-6" />
          <p className="text-muted-foreground text-lg">
            Beyond litigation — comprehensive legal and documentation services under one roof.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {data.services.map((svc, idx) => {
            const Icon = SERVICE_ICONS[idx % SERVICE_ICONS.length];
            return (
              <motion.div
                key={svc.id}
                variants={item}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ duration: 0.25 }}
                className="group relative p-7 border border-white/8 bg-white/[0.015] backdrop-blur-sm rounded-2xl hover:border-primary/50 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

                {/* Number badge */}
                <div className="absolute top-4 right-5 text-4xl font-serif text-white/5 font-bold select-none group-hover:text-white/8 transition-colors">
                  {String(idx + 1).padStart(2, "0")}
                </div>

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5 group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-300">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {svc.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{svc.description}</p>
                </div>

                <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-primary/80 to-transparent transition-all duration-500 rounded-b-2xl" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-14"
        >
          <a href="#contact"
            onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
            className="inline-flex items-center gap-3 px-8 py-4 border border-primary text-primary hover:bg-primary hover:text-black transition-all duration-300 font-semibold tracking-wide rounded-xl">
            <Stamp className="w-4 h-4" />
            Enquire About Our Services
          </a>
        </motion.div>
      </div>
    </section>
  );
};
