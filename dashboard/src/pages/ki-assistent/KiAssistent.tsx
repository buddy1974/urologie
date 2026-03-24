import { useState, useRef, useEffect } from "react";
import { Bot, Send, Loader2, Sparkles, FileText, FlaskConical, CreditCard, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const QUICK_PROMPTS = [
  { icon: FileText, label: "Arztbrief verfassen", prompt: "Verfasse einen Arztbrief für einen Patienten mit benigner Prostatahyperplasie (BPH) der mit UroLift behandelt wurde. Bitte nutze das Standard-Format für einen deutschen Arztbrief." },
  { icon: FlaskConical, label: "PSA-Wert einordnen", prompt: "PSA-Wert 5.8 ng/ml bei einem 65-jährigen Patienten. Wie ist dieser Wert einzuordnen und welche weiteren Maßnahmen empfiehlst du?" },
  { icon: CreditCard, label: "GOÄ-Code vorschlagen", prompt: "Welche GOÄ-Abrechnungsziffern kommen für eine Zystoskopie mit Probenentnahme in einer urologischen Praxis in Frage?" },
  { icon: Sparkles, label: "ICD-10 Code finden", prompt: "Welcher ICD-10 Code ist korrekt für eine benigne Prostatahyperplasie mit Miktionsbeschwerden?" },
];

const SYSTEM_PROMPT = `Du bist ein KI-Assistent für die Urologische Praxis Neuwied von Dr. Walters T. Fomuki.

Du unterstützt das medizinische Team bei:
- Verfassen von Arztbriefen und medizinischen Dokumenten auf Deutsch
- Einordnung von Laborwerten (PSA, Testosteron, Urinstatus etc.)
- Vorschlägen für ICD-10 Diagnose-Codes
- Vorschlägen für GOÄ/EBM Abrechnungsziffern
- Medizinischen Informationen zur Urologie
- Therapieprotokollen und Behandlungspfaden

WICHTIGE REGELN:
- Alle Vorschläge sind Unterstützung — der Arzt entscheidet immer final
- Kennzeichne alle KI-Vorschläge mit "KI-Vorschlag:" am Anfang
- Bei Arztbriefen: nutze deutsches Standardformat
- Bei Abrechnungscodes: weise darauf hin, dass die finale Kodierung durch den Arzt zu prüfen ist
- Du arbeitest für eine urologische Facharztpraxis in Deutschland

Fachschwerpunkte der Praxis:
- Diagnostik: Labor, Sonographie, Zystoskopie, Prostatabiopsie
- Onkologie: Prostata, Niere, Blase, Hoden
- Andrologie: Vasektomie, Erektionsstörungen, Kinderwunsch
- UroLift® bei BPH
- Magnetstimulation Beckenboden
- Urodynamik`;

export default function KiAssistent() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "0",
      role: "assistant",
      content: "Guten Tag! Ich bin Ihr KI-Assistent für die Urologische Praxis Neuwied.\n\nIch kann Ihnen helfen bei:\n• **Arztbriefe** verfassen\n• **Laborwerte** einordnen (PSA, Testosteron etc.)\n• **ICD-10** und **GOÄ/EBM** Codes vorschlagen\n• Medizinischen Fragen zur Urologie\n\nAlle Vorschläge sind als Unterstützung zu verstehen — die finale Entscheidung liegt immer beim Arzt.",
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { user } = useAuthStore();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage(text?: string) {
    const content = (text ?? input).trim();
    if (!content || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const apiMessages = [...messages, userMsg]
        .filter((m) => m.id !== "0")
        .map((m) => ({ role: m.role, content: m.content }));

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY ?? "",
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: apiMessages.length > 0 ? apiMessages : [{ role: "user", content }],
        }),
      });

      if (!response.ok) throw new Error("API error");
      const data = await response.json();
      const reply = data.content?.[0]?.text ?? "Entschuldigung, ich konnte keine Antwort generieren.";

      setMessages((prev) => [...prev, {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: reply,
        timestamp: new Date(),
      }]);
    } catch {
      setMessages((prev) => [...prev, {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Es gab einen Fehler bei der Verbindung zur KI. Bitte prüfen Sie den API-Schlüssel in den Einstellungen.",
        timestamp: new Date(),
      }]);
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

  function formatContent(content: string) {
    return content
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/•/g, "•")
      .replace(/\n/g, "<br/>");
  }

  return (
    <div className="flex h-full">

      {/* Left — Chat */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Header */}
        <div className="px-6 py-4 bg-white border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: "rgba(124,58,237,0.1)" }}>
              <Bot size={20} style={{ color: "#7c3aed" }} />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900">KI-Assistent</h1>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse inline-block" />
                Claude AI · Urologische Praxis
              </div>
            </div>
          </div>
          <button
            onClick={() => setMessages([{
              id: "0", role: "assistant",
              content: "Gespräch gelöscht. Wie kann ich Ihnen helfen?",
              timestamp: new Date(),
            }])}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
          >
            <Trash2 size={13} />
            Löschen
          </button>
        </div>

        {/* Disclaimer */}
        <div className="mx-6 mt-3 px-4 py-2 rounded-xl text-xs flex items-center gap-2"
          style={{ backgroundColor: "rgba(245,158,11,0.08)", color: "#92400e" }}>
          <Sparkles size={12} />
          KI-Vorschläge dienen nur zur Unterstützung. Finale Entscheidungen liegen beim Arzt.
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={cn("flex gap-3", msg.role === "user" ? "flex-row-reverse" : "flex-row")}>
              <div className={cn(
                "w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold"
              )}
                style={{ backgroundColor: msg.role === "user" ? "#1E9FD4" : "#7c3aed" }}>
                {msg.role === "user"
                  ? (user?.name?.split(" ").map(n => n[0]).join("").slice(0, 2) ?? "U")
                  : <Bot size={14} className="text-white" />
                }
              </div>
              <div className={cn(
                "max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed",
                msg.role === "user"
                  ? "text-white rounded-tr-sm"
                  : "bg-white border border-slate-100 text-slate-800 rounded-tl-sm shadow-sm"
              )}
                style={msg.role === "user" ? { backgroundColor: "#1E9FD4" } : {}}>
                <div dangerouslySetInnerHTML={{ __html: formatContent(msg.content) }} />
                <div className="text-xs mt-1.5 opacity-60">
                  {msg.timestamp.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#7c3aed" }}>
                <Bot size={14} className="text-white" />
              </div>
              <div className="bg-white border border-slate-100 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm">
                <Loader2 size={16} className="text-slate-400 animate-spin" />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="px-6 py-4 bg-white border-t border-slate-100">
          <div className="flex gap-3 items-end">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Frage stellen oder Aufgabe beschreiben... (Enter zum Senden, Shift+Enter für Zeilenumbruch)"
              rows={2}
              className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-purple-400 transition-colors resize-none"
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading}
              className="w-11 h-11 rounded-xl flex items-center justify-center text-white transition-colors flex-shrink-0"
              style={{ backgroundColor: !input.trim() || loading ? "#e2e8f0" : "#7c3aed" }}
            >
              <Send size={16} className={!input.trim() || loading ? "text-slate-400" : "text-white"} />
            </button>
          </div>
        </div>
      </div>

      {/* Right — Quick prompts */}
      <div className="w-72 flex-shrink-0 border-l border-slate-200 bg-white p-5 overflow-y-auto">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Schnellzugriff</h3>
        <div className="space-y-2">
          {QUICK_PROMPTS.map((qp) => {
            const Icon = qp.icon;
            return (
              <button
                key={qp.label}
                onClick={() => sendMessage(qp.prompt)}
                className="w-full text-left p-3.5 rounded-xl border border-slate-100 hover:border-purple-200 hover:bg-purple-50/50 transition-all group"
              >
                <div className="flex items-center gap-2.5 mb-1">
                  <Icon size={15} style={{ color: "#7c3aed" }} />
                  <span className="text-sm font-semibold text-slate-700 group-hover:text-purple-700">{qp.label}</span>
                </div>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{qp.prompt.slice(0, 80)}...</p>
              </button>
            );
          })}
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Tipps</h3>
          <div className="space-y-2 text-xs text-slate-500">
            <p>• Patientendaten <strong>anonymisieren</strong> vor Eingabe</p>
            <p>• Alle Vorschläge vom Arzt <strong>prüfen lassen</strong></p>
            <p>• <strong>Shift+Enter</strong> für Zeilenumbruch</p>
            <p>• KI kann Arztbriefe auf <strong>Deutsch</strong> verfassen</p>
          </div>
        </div>
      </div>
    </div>
  );
}
