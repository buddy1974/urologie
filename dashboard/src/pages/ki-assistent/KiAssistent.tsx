import { useState, useRef, useEffect } from "react";
import { Bot, Send, Loader2, Sparkles, FileText, FlaskConical, CreditCard, Trash2, Mic, MicOff, Copy, RefreshCw, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth";
import AIWriteButton from "@/components/ui/AIWriteButton";

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

  // Voice dictation state
  const [speechSupported, setSpeechSupported] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [aiResult, setAiResult] = useState("");
  const [dictateLoading, setDictateLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const finalTranscriptRef = useRef("");

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!(window as any).SpeechRecognition && !(window as any).webkitSpeechRecognition) {
      setSpeechSupported(false);
    }
  }, []);

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

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
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

  function toggleRecording() {
    if (isRecording) {
      recognitionRef.current?.stop();
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SR: (new () => SpeechRecognition) | undefined = (window as any).SpeechRecognition ?? (window as any).webkitSpeechRecognition;
    if (!SR) return;

    finalTranscriptRef.current = "";
    setTranscript("");
    setAiResult("");

    const recognition = new SR();
    recognition.lang = "de-DE";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (e: SpeechRecognitionEvent) => {
      let interim = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) {
          finalTranscriptRef.current += e.results[i][0].transcript + " ";
        } else {
          interim += e.results[i][0].transcript;
        }
      }
      setTranscript(finalTranscriptRef.current + interim);
    };

    recognition.onend = () => {
      setIsRecording(false);
      setTranscript(finalTranscriptRef.current.trim());
    };

    recognition.onerror = () => {
      setIsRecording(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsRecording(true);
  }

  async function generateWithClaude(type: "arztbrief" | "email") {
    if (!transcript.trim()) return;
    setDictateLoading(true);
    const systemPrompt =
      type === "arztbrief"
        ? "Du bist ein medizinischer Assistent für einen Urologen in Deutschland. Der folgende Text ist ein gesprochenes Diktat des Arztes. Formatiere es als professionellen Arztbrief auf Deutsch mit: Betreff, Anrede, medizinischem Befund, Diagnose, Therapieempfehlung und Grußformel. Halte den Inhalt exakt — nur Format und Sprache verbessern."
        : "Du bist ein medizinischer Assistent für einen Urologen in Deutschland. Der folgende Text ist ein gesprochenes Diktat des Arztes. Formatiere es als professionelle E-Mail auf Deutsch. Korrigiere Grammatik und Struktur, behalte den Inhalt exakt bei.";
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ system: systemPrompt, messages: [{ role: "user", content: transcript }] }),
      });
      if (!response.ok) throw new Error("API error");
      const data = await response.json();
      setAiResult(data.content?.[0]?.text ?? "Fehler bei der Verarbeitung.");
    } catch {
      setAiResult("Fehler bei der Verbindung zur KI. Bitte erneut versuchen.");
    } finally {
      setDictateLoading(false);
    }
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(aiResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function formatContent(content: string) {
    return content
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/•/g, "•")
      .replace(/\n/g, "<br/>");
  }

  return (
    <div className="flex h-full flex-col lg:flex-row">

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
      <div className="w-full lg:w-72 flex-shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200 bg-white p-5 overflow-y-auto max-h-64 lg:max-h-full">

        {/* ── Sprachdiktat ── */}
        <div className="mb-5 pb-5 border-b border-slate-100">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Sprachdiktat</h3>

          {!speechSupported ? (
            <div className="text-xs text-amber-700 bg-amber-50 border border-amber-100 rounded-xl p-3 leading-relaxed">
              Spracherkennung wird in diesem Browser nicht unterstützt. Bitte Chrome oder Edge verwenden.
            </div>
          ) : (
            <>
              {/* Record button */}
              <div className="flex flex-col items-center gap-2 mb-3">
                <button
                  onClick={toggleRecording}
                  disabled={dictateLoading}
                  className={cn(
                    "w-14 h-14 rounded-full flex items-center justify-center transition-all shadow-md disabled:opacity-50",
                    isRecording
                      ? "bg-red-500 hover:bg-red-600 animate-pulse"
                      : "bg-slate-200 hover:bg-slate-300"
                  )}
                >
                  {isRecording
                    ? <MicOff size={22} className="text-white" />
                    : <Mic size={22} className="text-slate-600" />
                  }
                </button>
                <p className="text-xs text-slate-500 font-medium">
                  {isRecording
                    ? "Aufnahme läuft…"
                    : dictateLoading
                      ? "Verarbeite…"
                      : "Zum Aufnehmen klicken"}
                </p>
              </div>

              {/* Live transcript */}
              {(transcript || isRecording) && (
                <textarea
                  readOnly
                  value={transcript}
                  rows={4}
                  placeholder="Transkript erscheint hier…"
                  className="w-full text-xs rounded-xl border border-slate-200 p-2.5 resize-none bg-slate-50 text-slate-700 mb-3 outline-none"
                />
              )}

              {/* Action buttons — appear once transcript ready */}
              {transcript && !isRecording && !dictateLoading && (
                <div className="flex gap-2 mb-3">
                  <button
                    onClick={() => generateWithClaude("arztbrief")}
                    className="flex-1 text-xs py-2 rounded-lg text-white font-medium transition-opacity hover:opacity-90"
                    style={{ backgroundColor: "#7c3aed" }}
                  >
                    Arztbrief
                  </button>
                  <button
                    onClick={() => generateWithClaude("email")}
                    className="flex-1 text-xs py-2 rounded-lg font-medium border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
                  >
                    E-Mail
                  </button>
                </div>
              )}

              {/* Processing indicator */}
              {dictateLoading && (
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                  <Loader2 size={12} className="animate-spin" />
                  Verarbeite…
                </div>
              )}

              {/* AI result */}
              {aiResult && (
                <>
                  <textarea
                    value={aiResult}
                    onChange={(e) => setAiResult(e.target.value)}
                    rows={7}
                    className="w-full text-xs rounded-xl border border-slate-200 p-2.5 resize-none text-slate-700 mb-2 outline-none focus:border-purple-400 transition-colors"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleCopy}
                      className="flex-1 flex items-center justify-center gap-1.5 text-xs py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
                    >
                      {copied ? <Check size={12} className="text-green-500" /> : <Copy size={12} />}
                      {copied ? "Kopiert!" : "Kopieren"}
                    </button>
                    <button
                      onClick={() => { setTranscript(""); setAiResult(""); finalTranscriptRef.current = ""; }}
                      className="flex-1 flex items-center justify-center gap-1.5 text-xs py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
                    >
                      <RefreshCw size={12} />
                      Neu starten
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>

        <div className="mb-5 pb-5 border-b border-slate-100">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Schreibassistent</h3>
          <p className="text-xs text-slate-400 mb-3">Stichworte ins Chat-Feld tippen, dann Feld wählen:</p>
          <div className="space-y-1.5">
            <AIWriteButton fieldValue={input} field="arztbrief_befund" onResult={(text) => setInput(text)} />
            <AIWriteButton fieldValue={input} field="arztbrief_therapie" onResult={(text) => setInput(text)} />
            <AIWriteButton fieldValue={input} field="arztbrief_anamnese" onResult={(text) => setInput(text)} />
          </div>
        </div>
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
