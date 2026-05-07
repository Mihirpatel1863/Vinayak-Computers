import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User, Loader2 } from "lucide-react";
import { useSiteData } from "@/context/SiteContext";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const BASE = import.meta.env.BASE_URL?.replace(/\/$/, "") ?? "";

export const AIChatbot = () => {
  const { data } = useSiteData();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const systemContext = `You are a helpful, professional, and friendly virtual assistant for "${data.firmName}" — a distinguished law firm.

FIRM DETAILS:
- Name: ${data.firmName}
- Tagline: ${data.tagline}
- Email: ${data.email}
- WhatsApp: ${data.whatsapp}

ADVOCATES:
${data.advocates.map(a => `- ${a.name} (${a.title}): ${a.experience}, Specializes in: ${a.specializations.join(", ")}. Contact: ${a.phone}`).join("\n")}

OFFICES:
${data.offices.map(o => `- ${o.name}: ${o.address}, Phone: ${o.phone}`).join("\n")}

PRACTICE AREAS: ${data.practiceAreas.map(p => p.title).join(", ")}
SERVICES: ${data.services.map(s => s.title).join(", ")}

INSTRUCTIONS:
- Keep answers concise, warm, and professional.
- If asked about consultation, direct them to call or use the contact form.
- If asked something outside your knowledge, politely say you'll connect them with the team.
- Respond in the same language the user writes in.
- Do not make up facts about cases or legal advice.`;

  useEffect(() => {
    if (open && !initialized) {
      setMessages([{ id: "greeting", role: "assistant", content: data.chatbotGreeting }]);
      setInitialized(true);
    }
  }, [open, initialized, data.chatbotGreeting]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || streaming) return;
    setInput("");

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: text };
    const asstId = (Date.now() + 1).toString();
    const asstMsg: Message = { id: asstId, role: "assistant", content: "" };

    setMessages(prev => [...prev, userMsg, asstMsg]);
    setStreaming(true);

    try {
      const resp = await fetch(`${BASE}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content })),
          systemContext,
        }),
      });

      if (!resp.body) throw new Error("No stream");
      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          try {
            const parsed = JSON.parse(line.slice(6));
            if (parsed.done) break;
            if (parsed.error) {
              setMessages(prev => prev.map(m => m.id === asstId ? { ...m, content: parsed.error } : m));
            } else if (parsed.content) {
              setMessages(prev => prev.map(m => m.id === asstId ? { ...m, content: m.content + parsed.content } : m));
            }
          } catch { /* ignore parse errors */ }
        }
      }
    } catch {
      setMessages(prev => prev.map(m =>
        m.id === asstId ? { ...m, content: "Sorry, I couldn't connect. Please call us directly." } : m
      ));
    } finally {
      setStreaming(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  return (
    <>
      {/* Toggle button — bottom-right on mobile, bottom-left on md+ */}
      <motion.button
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-6 left-4 md:bottom-8 md:left-8 z-50 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-2xl"
        style={{
          background: "linear-gradient(135deg, #C9A84C 0%, #8B6914 100%)",
          boxShadow: "0 0 30px rgba(201,168,76,0.4)",
        }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 200, damping: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="w-5 h-5 md:w-6 md:h-6 text-black" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageSquare className="w-5 h-5 md:w-6 md:h-6 text-black" />
            </motion.div>
          )}
        </AnimatePresence>
        {!open && (
          <motion.div className="absolute inset-0 rounded-full border-2 border-primary"
            animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }} />
        )}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed z-50 flex flex-col rounded-2xl overflow-hidden shadow-2xl"
            style={{
              bottom: "calc(4rem + 24px)",
              left: "1rem",
              right: "1rem",
              maxWidth: "100%",
              background: "#0d0d0d",
              border: "1px solid rgba(201,168,76,0.25)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(201,168,76,0.08)",
              maxHeight: "70vh",
            }}
            // Override on md+
          >
            {/* Inner wrapper that sets fixed width on md+ via className */}
            <div className="flex flex-col w-full md:w-[340px] md:ml-0 md:mr-auto" style={{ maxHeight: "inherit" }}>
              {/* Header */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-white/8"
                style={{ background: "linear-gradient(135deg, rgba(201,168,76,0.12) 0%, transparent 100%)" }}>
                <div className="w-9 h-9 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">Legal Assistant</div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-[10px] text-white/50">Online</span>
                  </div>
                </div>
                <button onClick={() => setOpen(false)} className="ml-auto p-1 text-white/40 hover:text-white/70 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ minHeight: "200px", maxHeight: "calc(70vh - 130px)" }}>
                {messages.map(msg => (
                  <motion.div key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                  >
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                      msg.role === "assistant" ? "bg-primary/15 border border-primary/30" : "bg-white/10"
                    }`}>
                      {msg.role === "assistant"
                        ? <Bot className="w-3.5 h-3.5 text-primary" />
                        : <User className="w-3.5 h-3.5 text-white/70" />}
                    </div>
                    <div className={`max-w-[78%] px-3 py-2 rounded-xl text-sm leading-relaxed ${
                      msg.role === "assistant"
                        ? "bg-white/5 border border-white/8 text-white/85"
                        : "bg-primary/20 border border-primary/30 text-white"
                    }`}>
                      {msg.content || (streaming && msg.role === "assistant" && (
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-primary" />
                      ))}
                    </div>
                  </motion.div>
                ))}
                <div ref={bottomRef} />
              </div>

              {/* Input */}
              <div className="p-3 border-t border-white/8">
                <div className="flex gap-2 items-center bg-white/5 border border-white/10 rounded-xl px-3 py-2 focus-within:border-primary/40 transition-colors">
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKey}
                    placeholder="Ask me anything..."
                    disabled={streaming}
                    className="flex-1 bg-transparent text-sm text-white placeholder:text-white/30 focus:outline-none disabled:opacity-50"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!input.trim() || streaming}
                    className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center disabled:opacity-40 hover:bg-primary/80 transition-colors shrink-0"
                  >
                    {streaming
                      ? <Loader2 className="w-3.5 h-3.5 text-black animate-spin" />
                      : <Send className="w-3.5 h-3.5 text-black" />}
                  </button>
                </div>
                <p className="text-[9px] text-white/20 text-center mt-1.5">Powered by AI</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
