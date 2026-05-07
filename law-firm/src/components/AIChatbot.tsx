import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User } from "lucide-react";
import { useSiteData } from "@/context/SiteContext";
import type { SiteData } from "@/context/SiteContext";

type Message = { id: string; role: "user" | "assistant"; content: string };

function getResponse(query: string, data: SiteData): string {
  const q = query.toLowerCase();
  if (/consult|book|appoint|meet|visit|schedule/.test(q))
    return `To book a consultation, contact us:\n\n📞 ${data.advocates[0].name}: ${data.advocates[0].phone}\n📞 ${data.advocates[1].name}: ${data.advocates[1].phone}\n\nTap the WhatsApp button on this page for the fastest response!`;
  if (/office|location|address|where|find|direction|meghraj|malpur/.test(q))
    return data.offices.map(o => `📍 ${o.name}\n${o.address}\n📞 ${o.phone}`).join('\n\n');
  if (/service|stamp|notary|document|draft|affidavit|registration|court fee/.test(q))
    return `Our services include:\n\n${data.services.map(s => `• ${s.title}`).join('\n')}\n\nCall us for details.`;
  if (/practice|area|civil|criminal|property|family|corporate|constitutional|consumer|high court/.test(q))
    return `Our practice areas:\n\n${data.practiceAreas.map(p => `• ${p.title}`).join('\n')}`;
  if (/advocate|lawyer|attorney|ramesh|jaydeep|patel|senior|experience|specializ/.test(q))
    return data.advocates.map(a => `👨‍⚖️ ${a.name}\n${a.title} | ${a.experience}\nSpecializes in: ${a.specializations.join(', ')}\n📞 ${a.phone}\n✉️ ${a.email}`).join('\n\n');
  if (/contact|email|phone|number|reach|touch|whatsapp/.test(q))
    return `Reach us at:\n\n📧 ${data.email}\n${data.offices.map(o => `📞 ${o.name}: ${o.phone}`).join('\n')}\n\nOr use the WhatsApp button for a quick chat.`;
  if (/about|firm|company|who|vinayak|history/.test(q))
    return `${data.firmName} — ${data.tagline}\n\n${data.aboutText1}\n\n${data.aboutText3}`;
  if (/time|hour|open|close|when|timing|day/.test(q))
    return `Offices open Mon–Sat, 10 AM – 6 PM.\n\nFor urgent matters:\n${data.offices.map(o => `📞 ${o.name}: ${o.phone}`).join('\n')}`;
  if (/fee|charge|cost|price|rate/.test(q))
    return `Fees vary by case complexity. We offer a free first consultation.\n\nCall to discuss: ${data.advocates[0].phone}`;
  return `Thank you! For a prompt response:\n\n📞 ${data.advocates[0].phone}\n💬 WhatsApp: ${data.whatsapp}\n📧 ${data.email}\n\nOr use the contact form on our website.`;
}

const QUICK_REPLIES = ["Book a consultation", "Our offices", "Practice areas", "Our services", "Contact details"];

export const AIChatbot = () => {
  const { data } = useSiteData();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [initialized, setInitialized] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && !initialized) {
      setMessages([{ id: "greeting", role: "assistant", content: data.chatbotGreeting }]);
      setInitialized(true);
    }
  }, [open, initialized, data.chatbotGreeting]);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);
  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 300); }, [open]);

  const sendMessage = (text?: string) => {
    const userText = (text || input).trim();
    if (!userText) return;
    setInput("");
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: userText };
    const reply: Message = { id: (Date.now()+1).toString(), role: "assistant", content: getResponse(userText, data) };
    setMessages(prev => [...prev, userMsg, reply]);
  };

  const handleKey = (e: React.KeyboardEvent) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } };

  return (
    <>
      <motion.button onClick={() => setOpen(o => !o)}
        className="fixed bottom-6 left-4 md:bottom-8 md:left-8 z-50 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-2xl"
        style={{ background: "linear-gradient(135deg, #C9A84C 0%, #8B6914 100%)", boxShadow: "0 0 30px rgba(201,168,76,0.4)" }}
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2, type: "spring", stiffness: 200, damping: 20 }}
        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <AnimatePresence mode="wait">
          {open
            ? <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}><X className="w-5 h-5 md:w-6 md:h-6 text-black" /></motion.div>
            : <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}><MessageSquare className="w-5 h-5 md:w-6 md:h-6 text-black" /></motion.div>}
        </AnimatePresence>
        {!open && <motion.div className="absolute inset-0 rounded-full border-2 border-primary" animate={{ scale: [1, 1.6], opacity: [0.6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }} />}
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }} transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed z-50 flex flex-col rounded-2xl overflow-hidden shadow-2xl"
            style={{ bottom: "calc(4rem + 24px)", left: "1rem", right: "1rem", maxWidth: "100%", background: "#0d0d0d", border: "1px solid rgba(201,168,76,0.25)", boxShadow: "0 20px 60px rgba(0,0,0,0.6)", maxHeight: "70vh" }}>
            <div className="flex flex-col w-full md:w-[340px]" style={{ maxHeight: "inherit" }}>
              <div className="flex items-center gap-3 px-4 py-3 border-b border-white/8" style={{ background: "linear-gradient(135deg, rgba(201,168,76,0.12) 0%, transparent 100%)" }}>
                <div className="w-9 h-9 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0"><Bot className="w-5 h-5 text-primary" /></div>
                <div>
                  <div className="text-sm font-semibold text-white">Legal Assistant</div>
                  <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /><span className="text-[10px] text-white/50">Online</span></div>
                </div>
                <button onClick={() => setOpen(false)} className="ml-auto p-1 text-white/40 hover:text-white/70 transition-colors"><X className="w-4 h-4" /></button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ minHeight: "200px", maxHeight: "calc(70vh - 170px)" }}>
                {messages.map(msg => (
                  <motion.div key={msg.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`flex gap-2 ${msg.role==="user"?"flex-row-reverse":""}`}>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${msg.role==="assistant"?"bg-primary/15 border border-primary/30":"bg-white/10"}`}>
                      {msg.role==="assistant"?<Bot className="w-3.5 h-3.5 text-primary"/>:<User className="w-3.5 h-3.5 text-white/70"/>}
                    </div>
                    <div className={`max-w-[78%] px-3 py-2 rounded-xl text-sm leading-relaxed whitespace-pre-line ${msg.role==="assistant"?"bg-white/5 border border-white/8 text-white/85":"bg-primary/20 border border-primary/30 text-white"}`}>
                      {msg.content}
                    </div>
                  </motion.div>
                ))}
                <div ref={bottomRef} />
              </div>
              {messages.length === 1 && (
                <div className="px-4 pb-2 flex flex-wrap gap-2">
                  {QUICK_REPLIES.map(qr => (
                    <button key={qr} onClick={() => sendMessage(qr)} className="text-[11px] px-3 py-1.5 rounded-full border border-primary/30 text-primary/80 hover:bg-primary/10 transition-colors">{qr}</button>
                  ))}
                </div>
              )}
              <div className="p-3 border-t border-white/8">
                <div className="flex gap-2 items-center bg-white/5 border border-white/10 rounded-xl px-3 py-2 focus-within:border-primary/40 transition-colors">
                  <input ref={inputRef} value={input} onChange={e=>setInput(e.target.value)} onKeyDown={handleKey} placeholder="Ask me anything..." className="flex-1 bg-transparent text-sm text-white placeholder:text-white/30 focus:outline-none" />
                  <button onClick={() => sendMessage()} disabled={!input.trim()} className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center disabled:opacity-40 hover:bg-primary/80 transition-colors shrink-0">
                    <Send className="w-3.5 h-3.5 text-black" />
                  </button>
                </div>
                <p className="text-[9px] text-white/20 text-center mt-1.5">Virtual Legal Assistant</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
