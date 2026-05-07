import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Phone, Mail, Briefcase, GraduationCap, Award, MessageCircle } from "lucide-react";

interface AdvocateDetails {
  id: string; name: string; title: string; experience: string;
  specializations: string[]; phone: string; email: string;
  office: string; about: string; achievements: string[]; image: string;
}
interface AdvocateModalProps {
  advocate: AdvocateDetails | null;
  isOpen: boolean;
  onClose: () => void;
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } } };
const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } };

export const AdvocateModal = ({ advocate, isOpen, onClose }: AdvocateModalProps) => {
  if (!advocate) return null;
  const whatsappUrl = `https://wa.me/${advocate.phone.replace(/\D/g,"")}`;
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
            onClick={onClose} className="fixed inset-0 bg-black/85 backdrop-blur-md z-[100]" />
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: "spring", damping: 28, stiffness: 300, mass: 0.8 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0a0a0a] border border-primary/25 shadow-[0_0_80px_rgba(0,0,0,0.7),0_0_40px_rgba(201,168,76,0.06)] rounded-2xl z-[101]"
          >
            <motion.div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
              style={{ background: "linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.8) 40%, rgba(201,168,76,0.4) 70%, transparent 100%)" }}
              initial={{ scaleX: 0, originX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.2 }} />
            <motion.button onClick={onClose} className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-primary/20 text-muted-foreground hover:text-primary transition-all duration-300 z-10"
              whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }}>
              <X className="w-5 h-5" />
            </motion.button>
            <div className="grid grid-cols-1 md:grid-cols-3 min-h-[500px]">
              <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-[#050505] p-8 border-b md:border-b-0 md:border-r border-white/8 flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <motion.div className="absolute rounded-full border-2 border-primary/20 pointer-events-none"
                    style={{ inset: "-8px" }}
                    animate={{ scale: [1, 1.06, 1], opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 3, repeat: Infinity }} />
                  <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-40 h-40 rounded-full border-2 border-primary/40 overflow-hidden shadow-[0_0_40px_rgba(201,168,76,0.18)]">
                    <img src={advocate.image} alt={advocate.name} className="w-full h-full object-cover" />
                  </motion.div>
                </div>
                <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                  className="font-serif text-2xl text-foreground mb-1">{advocate.name}</motion.h2>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                  className="text-primary text-xs uppercase tracking-[0.2em] mb-8">{advocate.title}</motion.div>
                <motion.div variants={stagger} initial="hidden" animate="show" className="w-full space-y-3 text-left">
                  <motion.a variants={fadeUp} href={`tel:${advocate.phone}`}
                    className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors p-3 rounded-xl hover:bg-primary/5 border border-transparent hover:border-primary/15">
                    <Phone className="w-4 h-4 text-primary shrink-0" /><span>{advocate.phone}</span>
                  </motion.a>
                  <motion.a variants={fadeUp} href={`mailto:${advocate.email}`}
                    className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors p-3 rounded-xl hover:bg-primary/5 border border-transparent hover:border-primary/15">
                    <Mail className="w-4 h-4 text-primary shrink-0" /><span className="break-all">{advocate.email}</span>
                  </motion.a>
                  <motion.div variants={fadeUp} className="flex items-start gap-3 text-sm text-muted-foreground p-3">
                    <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" /><span>{advocate.office}</span>
                  </motion.div>
                </motion.div>
                <motion.a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className="mt-6 flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm text-black"
                  style={{ background: "linear-gradient(135deg, #C9A84C 0%, #e8c96a 100%)", boxShadow: "0 0 20px rgba(201,168,76,0.3)" }}>
                  <MessageCircle className="w-4 h-4" /> Book Consultation
                </motion.a>
              </motion.div>
              <motion.div variants={stagger} initial="hidden" animate="show" className="col-span-2 p-8 md:p-12 space-y-10">
                <motion.div variants={fadeUp}>
                  <h3 className="text-xl font-serif text-foreground mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center"><Briefcase className="text-primary w-4 h-4" /></div>
                    Professional Profile
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{advocate.about}</p>
                </motion.div>
                <motion.div variants={fadeUp}>
                  <h3 className="text-xl font-serif text-foreground mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center"><GraduationCap className="text-primary w-4 h-4" /></div>
                    Experience & Specializations
                  </h3>
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium">{advocate.experience}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {advocate.specializations.map((spec, i) => (
                      <motion.span key={i} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 + i * 0.06, type: "spring", stiffness: 300 }}
                        className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm hover:bg-primary/20 hover:border-primary/40 transition-colors cursor-default">
                        {spec}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
                <motion.div variants={fadeUp}>
                  <h3 className="text-xl font-serif text-foreground mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center"><Award className="text-primary w-4 h-4" /></div>
                    Key Achievements
                  </h3>
                  <ul className="space-y-3">
                    {advocate.achievements.map((achieve, i) => (
                      <motion.li key={i} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + i * 0.08, ease: "easeOut" }}
                        className="flex items-start gap-3 text-muted-foreground group">
                        <motion.div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"
                          animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }} />
                        <span className="group-hover:text-foreground/80 transition-colors duration-300">{achieve}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
