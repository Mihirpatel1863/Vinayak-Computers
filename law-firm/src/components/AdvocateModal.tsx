import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Phone, Mail, Briefcase, GraduationCap, Award } from "lucide-react";

interface AdvocateDetails {
  id: string;
  name: string;
  title: string;
  experience: string;
  specializations: string[];
  phone: string;
  email: string;
  office: string;
  about: string;
  achievements: string[];
  image: string;
}

interface AdvocateModalProps {
  advocate: AdvocateDetails | null;
  isOpen: boolean;
  onClose: () => void;
}

export const AdvocateModal = ({ advocate, isOpen, onClose }: AdvocateModalProps) => {
  if (!advocate) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0a0a0a] border border-primary/30 shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-xl z-[101]"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-primary/20 text-muted-foreground hover:text-primary transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-3 min-h-[500px]">
              {/* Left Column - Image & Quick Contact */}
              <div className="bg-[#050505] p-8 border-b md:border-b-0 md:border-r border-white/10 flex flex-col items-center text-center">
                <div className="w-40 h-40 rounded-full border-2 border-primary/50 overflow-hidden mb-6 relative shadow-[0_0_30px_rgba(201,168,76,0.15)]">
                  <img src={advocate.image} alt={advocate.name} className="w-full h-full object-cover" />
                </div>
                <h2 className="font-serif text-2xl text-foreground mb-2">{advocate.name}</h2>
                <div className="text-primary text-sm uppercase tracking-widest mb-8">{advocate.title}</div>
                
                <div className="w-full space-y-4 text-left">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Phone className="w-4 h-4 text-primary shrink-0" />
                    <span>{advocate.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Mail className="w-4 h-4 text-primary shrink-0" />
                    <span>{advocate.email}</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 text-primary shrink-0 mt-1" />
                    <span>{advocate.office}</span>
                  </div>
                </div>
              </div>

              {/* Right Column - Details */}
              <div className="col-span-2 p-8 md:p-12 space-y-10">
                <div>
                  <h3 className="text-xl font-serif text-foreground mb-4 flex items-center gap-3">
                    <Briefcase className="text-primary w-5 h-5" />
                    Professional Profile
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {advocate.about}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-serif text-foreground mb-4 flex items-center gap-3">
                    <GraduationCap className="text-primary w-5 h-5" />
                    Experience & Specializations
                  </h3>
                  <div className="mb-4">
                    <span className="text-foreground font-medium">{advocate.experience}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {advocate.specializations.map((spec, i) => (
                      <span key={i} className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-serif text-foreground mb-4 flex items-center gap-3">
                    <Award className="text-primary w-5 h-5" />
                    Key Achievements
                  </h3>
                  <ul className="space-y-3">
                    {advocate.achievements.map((achieve, i) => (
                      <li key={i} className="flex items-start gap-3 text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                        <span>{achieve}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
