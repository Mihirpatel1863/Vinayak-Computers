import React from "react";
import { motion } from "framer-motion";

interface AdvocateCardProps {
  id: string;
  name: string;
  title: string;
  image: string;
  delay?: number;
  onClick: () => void;
}

export const AdvocateCard = ({ id, name, title, image, delay = 0, onClick }: AdvocateCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay, ease: "easeOut" }}
      className="relative group cursor-pointer"
      onClick={onClick}
    >
      <motion.div
        animate={{ y: [-8, 8, -8] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: delay * 2 }}
      >
        {/* Responsive card: full width on xs, fixed on sm+ */}
        <div className="relative w-[min(280px,80vw)] h-[360px] sm:w-[300px] sm:h-[390px] md:w-[320px] md:h-[410px] rounded-2xl p-[1px] overflow-hidden mx-auto">
          {/* Animated glow border */}
          <motion.div
            className="absolute inset-0 rounded-2xl"
            style={{ background: "linear-gradient(135deg, rgba(201,168,76,0.6), transparent, rgba(201,168,76,0.2))" }}
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay }}
          />

          {/* Card body */}
          <div className="absolute inset-[1px] bg-black/85 backdrop-blur-xl rounded-2xl flex flex-col items-center justify-center p-6 md:p-8 group-hover:scale-[0.98] transition-transform duration-500">
            {/* Ambient glow behind photo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-primary/15 rounded-full blur-3xl group-hover:bg-primary/25 transition-colors duration-500" />

            {/* Photo */}
            <div
              className="relative w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44 rounded-full overflow-hidden mb-6 group-hover:shadow-[0_0_40px_rgba(201,168,76,0.4)] transition-all duration-500"
              style={{ border: "2px solid rgba(201,168,76,0.3)" }}
            >
              <motion.img
                src={image}
                alt={name}
                className="w-full h-full object-cover"
                style={{ filter: "grayscale(15%)" }}
                whileHover={{ scale: 1.06, filter: "grayscale(0%)" }}
                transition={{ duration: 0.5 }}
              />
            </div>

            {/* Name */}
            <div className="text-center relative z-10 space-y-1">
              <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-medium text-foreground tracking-wide drop-shadow-md">
                {name}
              </h3>
              <div className="flex items-center justify-center gap-2 mt-2">
                <div className="w-6 h-[1px] bg-primary/50" />
                <span className="text-primary text-[10px] uppercase tracking-[0.25em]">Advocate</span>
                <div className="w-6 h-[1px] bg-primary/50" />
              </div>
            </div>

            {/* View Profile hint */}
            <motion.div
              className="absolute bottom-4 text-[10px] text-primary/60 uppercase tracking-widest flex items-center gap-1"
              initial={{ opacity: 0, y: 4 }}
              whileHover={{ opacity: 1, y: 0 }}
            >
              <div className="w-4 h-[1px] bg-primary/40" />
              View Profile
              <div className="w-4 h-[1px] bg-primary/40" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
