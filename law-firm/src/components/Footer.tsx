import React from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, ChevronRight, Scale, MessageCircle } from "lucide-react";
import { useSiteData } from "@/context/SiteContext";
import ganeshLogo from "@/assets/images/ganesh-logo.png";
import { Link } from "wouter";

export const Footer = () => {
  const { data } = useSiteData();
  const whatsappUrl = `https://wa.me/${data.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("Namaste, I would like to book a consultation.")}`;

  return (
    <footer className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[#030303]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(201,168,76,0.05)_0%,transparent_70%)]" />
      <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(rgba(201,168,76,0.025) 1px, transparent 1px)", backgroundSize: "36px 36px" }} />
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="relative z-10 pt-24 pb-10">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-20 pb-16 border-b border-white/8">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "radial-gradient(circle, rgba(201,168,76,0.15) 0%, transparent 70%)", border: "1px solid rgba(201,168,76,0.3)" }}>
                <img src={ganeshLogo} alt="Logo" className="w-9 h-9 object-contain" style={{ filter: "sepia(1) saturate(4) hue-rotate(5deg) brightness(1.2) drop-shadow(0 0 10px rgba(201,168,76,0.7))" }} />
              </div>
            </div>
            <h3 className="font-serif text-3xl md:text-4xl text-white mb-4">Ready to <span className="text-primary italic">Discuss Your Case</span>?</h3>
            <p className="text-muted-foreground max-w-lg mx-auto mb-8">Take the first step toward resolving your legal matters. Book a confidential consultation today.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.a href={whatsappUrl} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-black transition-all"
                style={{ background: "linear-gradient(135deg, #C9A84C 0%, #e8c96a 50%, #C9A84C 100%)", boxShadow: "0 0 32px rgba(201,168,76,0.35)" }}>
                <MessageCircle className="w-5 h-5" />Book Free Consultation
              </motion.a>
              <a href={`tel:${data.advocates[0].phone}`} className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-primary border border-primary/40 hover:bg-primary/10 transition-all">
                <Scale className="w-4 h-4" />Call Us Now
              </a>
            </div>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0" style={{ background: "radial-gradient(circle, rgba(201,168,76,0.15) 0%, transparent 70%)", border: "1px solid rgba(201,168,76,0.25)" }}>
                  <img src={ganeshLogo} alt="Logo" className="w-7 h-7 object-contain" style={{ filter: "sepia(1) saturate(4) hue-rotate(5deg) brightness(1.1) drop-shadow(0 0 6px rgba(201,168,76,0.5))" }} />
                </div>
                <div>
                  <div className="font-serif text-lg font-semibold text-foreground leading-tight">{data.firmName}</div>
                  <div className="text-[9px] text-primary tracking-[0.2em] uppercase">{data.tagline}</div>
                </div>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">Distinguished legal services with over two decades of excellence, integrity, and unwavering commitment to our clients.</p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-[1px] bg-primary/40" />
                <span className="text-[10px] text-primary/50 uppercase tracking-widest">Est. 2000</span>
              </div>
              <Link href="/admin" className="inline-flex items-center gap-1 text-[10px] text-white/15 hover:text-primary/50 transition-colors">Admin</Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="space-y-5">
              <h4 className="font-serif text-lg font-medium text-foreground relative inline-block">Quick Links<span className="absolute -bottom-2 left-0 w-8 h-[1px] bg-primary" /></h4>
              <ul className="space-y-2.5 pt-3">
                {[{label:"Home",href:"#home"},{label:"About Firm",href:"#about"},{label:"Our Advocates",href:"#advocates"},{label:"Practice Areas",href:"#practice-areas"},{label:"Our Services",href:"#services"},{label:"Contact Us",href:"#contact"}].map(link => (
                  <li key={link.label}>
                    <a href={link.href} onClick={e=>{e.preventDefault();document.querySelector(link.href)?.scrollIntoView({behavior:"smooth"});}} className="text-muted-foreground hover:text-primary text-sm flex items-center group transition-colors duration-300">
                      <ChevronRight className="w-3 h-3 mr-0 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:mr-1.5 transition-all duration-300 text-primary shrink-0" />{link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="space-y-5">
              <h4 className="font-serif text-lg font-medium text-foreground relative inline-block">Practice Areas<span className="absolute -bottom-2 left-0 w-8 h-[1px] bg-primary" /></h4>
              <ul className="space-y-2 pt-3">
                {data.practiceAreas.slice(0,6).map(area => (
                  <li key={area.id} className="flex items-center gap-2 group">
                    <div className="w-1 h-1 rounded-full bg-primary/30 group-hover:bg-primary transition-colors duration-300" />
                    <span className="text-muted-foreground text-sm hover:text-primary/80 transition-colors cursor-default">{area.title}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} className="space-y-5">
              <h4 className="font-serif text-lg font-medium text-foreground relative inline-block">Get In Touch<span className="absolute -bottom-2 left-0 w-8 h-[1px] bg-primary" /></h4>
              <ul className="space-y-4 pt-3">
                {data.offices.map(o => (
                  <li key={o.id} className="flex items-start gap-3 group">
                    <div className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/15 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary/20 transition-colors"><MapPin className="w-3.5 h-3.5 text-primary" /></div>
                    <div><div className="text-[10px] text-primary mb-0.5 uppercase tracking-widest">{o.name}</div><span className="text-xs text-muted-foreground leading-relaxed">{o.address}</span></div>
                  </li>
                ))}
                {data.offices.map(o => (
                  <li key={o.id+"ph"} className="flex items-center gap-3 group">
                    <div className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/15 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors"><Phone className="w-3.5 h-3.5 text-primary" /></div>
                    <a href={`tel:${o.phone}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">{o.phone}</a>
                  </li>
                ))}
                <li className="flex items-center gap-3 group">
                  <div className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/15 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors"><Mail className="w-3.5 h-3.5 text-primary" /></div>
                  <a href={`mailto:${data.email}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">{data.email}</a>
                </li>
              </ul>
            </motion.div>
          </div>
          <div className="border-t border-white/6 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-xs">&copy; {new Date().getFullYear()} <span className="text-primary">{data.firmName}</span>. All rights reserved.</p>
            <div className="flex gap-6">
              <span className="text-muted-foreground text-xs cursor-pointer hover:text-primary transition-colors">Privacy Policy</span>
              <span className="text-muted-foreground text-xs cursor-pointer hover:text-primary transition-colors">Terms of Service</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
