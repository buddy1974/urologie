"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const INITIAL_MESSAGE: Message = {
  id: "0",
  role: "assistant",
  content:
    "Hallo! Ich bin der KI-Assistent der Urologie Neuwied. Ich beantworte gerne allgemeine Fragen zu unserer Praxis, unseren Leistungen und Öffnungszeiten. Wie kann ich Ihnen helfen?",
  timestamp: new Date(),
};

const DISCLAIMER =
  "⚕️ Hinweis: Dieser Assistent gibt nur allgemeine Informationen und ersetzt keine ärztliche Beratung.";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!res.ok) throw new Error("API error");
      const data = await res.json();

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.content,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content:
            "Entschuldigung, es gab einen technischen Fehler. Bitte rufen Sie uns an: 02631 - 23351.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-primary-gradient text-primary-foreground font-semibold px-5 py-3.5 rounded-2xl shadow-glow transition-transform hover:scale-105",
          open && "hidden"
        )}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: "spring" }}
        aria-label="KI-Assistent öffnen"
      >
        <MessageCircle size={20} />
        KI-Assistent
        <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="ai-chat"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[370px] max-w-[calc(100vw-24px)] flex flex-col glass-strong rounded-3xl shadow-elegant overflow-hidden"
            style={{ height: "520px" }}
          >
            {/* Header */}
            <div className="bg-primary-gradient px-5 py-4 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
                  <Bot size={18} className="text-primary-foreground" />
                </div>
                <div>
                  <div className="text-primary-foreground font-semibold text-sm">KI-Assistent</div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-primary-foreground/60 rounded-full animate-pulse" />
                    <span className="text-primary-foreground/70 text-xs">Urologie Neuwied</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-primary-foreground/70 hover:text-primary-foreground p-1.5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Disclaimer */}
            <div className="border-b border-white/5 px-4 py-2 text-xs text-muted-foreground bg-muted/30 flex-shrink-0">
              {DISCLAIMER}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex gap-2.5",
                    msg.role === "user" ? "flex-row-reverse" : "flex-row"
                  )}
                >
                  {/* Avatar */}
                  <div
                    className={cn(
                      "w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
                      msg.role === "user" ? "bg-primary/20" : "bg-primary-gradient"
                    )}
                  >
                    {msg.role === "user" ? (
                      <User size={13} className="text-accent" />
                    ) : (
                      <Bot size={13} className="text-primary-foreground" />
                    )}
                  </div>

                  {/* Bubble */}
                  <div
                    className={cn(
                      "max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed",
                      msg.role === "user"
                        ? "bg-primary-gradient text-primary-foreground rounded-tr-sm"
                        : "glass text-foreground rounded-tl-sm"
                    )}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {/* Loading */}
              {loading && (
                <div className="flex gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-primary-gradient flex items-center justify-center flex-shrink-0">
                    <Bot size={13} className="text-primary-foreground" />
                  </div>
                  <div className="glass px-4 py-3 rounded-2xl rounded-tl-sm">
                    <Loader2 size={16} className="text-muted-foreground animate-spin" />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="border-t border-white/5 px-4 py-3 flex items-center gap-2 flex-shrink-0">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ihre Frage..."
                className="flex-1 text-sm glass rounded-xl px-4 py-2.5 outline-none focus:border-primary/40 transition-all text-foreground placeholder:text-muted-foreground bg-transparent"
                maxLength={500}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || loading}
                className="w-10 h-10 bg-primary-gradient disabled:opacity-30 disabled:cursor-not-allowed text-primary-foreground rounded-xl flex items-center justify-center transition-transform hover:scale-105 flex-shrink-0"
              >
                <Send size={15} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
