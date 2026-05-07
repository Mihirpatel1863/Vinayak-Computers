import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Send, Navigation, ExternalLink, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSiteData } from "@/context/SiteContext";

export const ContactSection = () => {
  const { data } = useSiteData();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeOffice, setActiveOffice] = useState(0);

  const whatsappUrl = `https://wa.me/${data.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("Namaste, I would like to book a consultation.")}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message Sent Successfully",
        description: "We will get back to you shortly.",
      });
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 relative bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary tracking-[0.3em] text-xs uppercase mb-4 block">Get In Touch</span>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-6">Contact Us</h2>
          <div className="w-24 h-[1px] bg-primary mx-auto mb-6" />
          <p className="text-muted-foreground text-lg">
            Schedule a consultation to discuss your legal matters with our experienced advocates.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left — offices + contact */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-10"
          >
            <div>
              <h3 className="font-serif text-2xl text-foreground mb-6 flex items-center gap-3">
                <MapPin className="text-primary" /> Our Offices
              </h3>

              {/* Office tabs */}
              <div className="flex gap-2 mb-4">
                {data.offices.map((o, idx) => (
                  <button key={o.id} onClick={() => setActiveOffice(idx)}
                    className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                      activeOffice === idx ? "bg-primary/10 border border-primary/30 text-primary" : "border border-white/10 text-white/50 hover:text-white/70"
                    }`}>
                    {o.name}
                  </button>
                ))}
              </div>

              {data.offices.map((o, idx) => (
                <motion.div key={o.id}
                  initial={false}
                  animate={{ opacity: activeOffice === idx ? 1 : 0, height: activeOffice === idx ? "auto" : 0 }}
                  className={activeOffice === idx ? "block" : "hidden"}
                >
                  <div className="p-6 border border-white/10 bg-white/[0.03] backdrop-blur-sm rounded-xl hover:border-primary/30 transition-colors duration-300">
                    <h4 className="text-lg font-medium text-foreground mb-2">{o.name}</h4>
                    <p className="text-muted-foreground mb-4">{o.address}</p>
                    <div className="flex items-center gap-4">
                      <a href={`tel:${o.phone}`} className="flex items-center gap-2 text-sm text-primary hover:underline">
                        <Phone className="w-3.5 h-3.5" /> {o.phone}
                      </a>
                      <a href={o.directionsUrl} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                        <Navigation className="w-3.5 h-3.5" /> Directions <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  {/* Embedded map */}
                  <div className="mt-3 rounded-xl overflow-hidden border border-white/10 h-44">
                    <iframe
                      src={`https://www.openstreetmap.org/export/embed.html?bbox=${o.lng - 0.012}%2C${o.lat - 0.009}%2C${o.lng + 0.012}%2C${o.lat + 0.009}&layer=mapnik&marker=${o.lat}%2C${o.lng}`}
                      className="w-full h-full border-0"
                      style={{ filter: "invert(90%) hue-rotate(180deg) saturate(0.7) brightness(0.95)" }}
                      loading="lazy"
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            <div>
              <h3 className="font-serif text-2xl text-foreground mb-6 flex items-center gap-3">
                <Phone className="text-primary" /> Direct Contact
              </h3>
              <div className="space-y-3">
                {data.offices.map((o) => (
                  <a key={o.id} href={`tel:${o.phone}`}
                    className="flex items-center gap-4 p-4 border border-white/10 bg-white/[0.02] rounded-xl hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 group">
                    <Phone className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                    <div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">{o.name}</div>
                      <div className="text-foreground font-medium">{o.phone}</div>
                    </div>
                  </a>
                ))}
                <a href={`mailto:${data.email}`}
                  className="flex items-center gap-4 p-4 border border-white/10 bg-white/[0.02] rounded-xl hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 group">
                  <Mail className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                  <div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">Email</div>
                    <div className="text-foreground font-medium">{data.email}</div>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right — consultation form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="p-8 md:p-10 border border-primary/20 bg-[#0a0a0a] rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/8 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-primary/5 rounded-full blur-2xl pointer-events-none" />

              <h3 className="font-serif text-2xl text-foreground mb-2 relative z-10">Request a Consultation</h3>
              <p className="text-muted-foreground text-sm mb-8 relative z-10">We respond within 24 hours.</p>

              <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs text-muted-foreground uppercase tracking-wider">Full Name</label>
                    <input required type="text"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary/50 transition-colors text-sm"
                      placeholder="Your full name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-muted-foreground uppercase tracking-wider">Phone</label>
                    <input required type="tel"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary/50 transition-colors text-sm"
                      placeholder="+91 98794 51711" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground uppercase tracking-wider">Email</label>
                  <input required type="email"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary/50 transition-colors text-sm"
                    placeholder="you@example.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground uppercase tracking-wider">Legal Matter</label>
                  <textarea required rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary/50 transition-colors resize-none text-sm"
                    placeholder="Briefly describe your legal matter..." />
                </div>

                {/* Two action buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-4 bg-primary text-black font-semibold rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    ) : (
                      <>Send Message <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                    )}
                  </motion.button>

                  <motion.a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-4 border border-[#25D366]/40 text-[#25D366] font-semibold rounded-xl hover:bg-[#25D366]/10 transition-all flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <MessageCircle className="w-4 h-4" />
                    Book via WhatsApp
                  </motion.a>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
