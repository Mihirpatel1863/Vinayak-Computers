import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="back-to-top"
          onClick={scrollTop}
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          whileHover={{ scale: 1.1, boxShadow: "0 0 25px rgba(201,168,76,0.5)" }}
          whileTap={{ scale: 0.92 }}
          className="fixed bottom-24 right-4 md:bottom-24 md:right-8 z-50 w-10 h-10 rounded-full flex items-center justify-center"
          style={{
            background: "rgba(10,10,10,0.9)",
            border: "1px solid rgba(201,168,76,0.4)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 0 15px rgba(201,168,76,0.2)",
          }}
          aria-label="Back to top"
        >
          <ArrowUp className="w-4 h-4 text-primary" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
