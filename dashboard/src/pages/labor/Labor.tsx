import { useState, useEffect } from "react";
import { fetchLabResults, saveLabComment } from "@/lib/api";
import { FlaskConical, TrendingUp, TrendingDown, Minus, AlertCircle, CheckCircle, Search, Filter, Save } from "lucide-react";
import { cn } from "@/lib/utils";
import OCRScanner from "@/components/ui/OCRScanner";

interface LabResult {
  id: string;
  patient: string;
  test: string;
  value: string;
  unit: string;
  refMin: number;
  refMax: number;
  numericValue: number;
  date: string;
  status: "normal" | "high" | "low" | "critical";
  doctor: string;
  sent: boolean;
  doctorComment: string;
}

type APILabResult = {
  id: string;
  patient: string;
  test: string;
  value: string;
  unit: string | null;
  refMin: number | null;
  refMax: number | null;
  numericValue: number | null;
  date: string;
  status: "normal" | "high" | "low" | "critical";
  doctor: string;
  sent: boolean;
  doctorComment: string | null;
};

function mapAPILabResult(r: APILabResult): LabResult {
  return {
    id: r.id,
    patient: r.patient,
    test: r.test,
    value: r.value,
    unit: r.unit ?? "",
    refMin: r.refMin ?? 0,
    refMax: r.refMax ?? 0,
    numericValue: r.numericValue ?? 0,
    date: r.date,
    status: r.status,
    doctor: r.doctor,
    sent: r.sent,
    doctorComment: r.doctorComment ?? "",
  };
}

const RESULTS: LabResult[] = [
  { id:"1", patient:"Müller, Hans", test:"PSA", value:"5.8", unit:"ng/ml", refMin:0, refMax:4, numericValue:5.8, date:"23.03.2026", status:"high", doctor:"Dr. Fomuki", sent:false, doctorComment:"" },
  { id:"2", patient:"Weber, Klaus", test:"PSA", value:"0.12", unit:"ng/ml", refMin:0, refMax:4, numericValue:0.12, date:"23.03.2026", status:"normal", doctor:"Dr. Fomuki", sent:true, doctorComment:"" },
  { id:"3", patient:"Papadopoulos, Dimitri", test:"PSA", value:"6.2", unit:"ng/ml", refMin:0, refMax:4, numericValue:6.2, date:"23.03.2026", status:"critical", doctor:"Dr. Fomuki", sent:false, doctorComment:"" },
  { id:"4", patient:"Fischer, Jürgen", test:"Kreatinin", value:"1.1", unit:"mg/dl", refMin:0.7, refMax:1.2, numericValue:1.1, date:"23.03.2026", status:"normal", doctor:"Dr. Fomuki", sent:true, doctorComment:"" },
  { id:"5", patient:"Yilmaz, Mehmet", test:"Leukozyten Urin", value:"+++", unit:"", refMin:0, refMax:0, numericValue:3, date:"23.03.2026", status:"high", doctor:"Dr. Nwankwo", sent:false, doctorComment:"" },
  { id:"6", patient:"Wagner, Stefan", test:"Testosteron", value:"2.1", unit:"ng/ml", refMin:2.8, refMax:8.0, numericValue:2.1, date:"23.03.2026", status:"low", doctor:"Dr. Fomuki", sent:false, doctorComment:"" },
  { id:"7", patient:"Schmidt, Thomas", test:"Spermiogramm", value:"18 Mio/ml", unit:"", refMin:0, refMax:0, numericValue:18, date:"22.03.2026", status:"normal", doctor:"Dr. Fomuki", sent:true, doctorComment:"" },
  { id:"8", patient:"Klein, Andreas", test:"Urinkultur", value:"E.coli >100.000", unit:"KBE/ml", refMin:0, refMax:0, numericValue:3, date:"22.03.2026", status:"critical", doctor:"Dr. Nwankwo", sent:false, doctorComment:"" },
];

const statusConfig = {
  normal:   { label:"Normal",     color:"#16a34a", bg:"rgba(22,163,74,0.1)",   icon:CheckCircle },
  high:     { label:"Erhöht",     color:"#d97706", bg:"rgba(217,119,6,0.1)",   icon:TrendingUp },
  low:      { label:"Erniedrigt", color:"#0284c7", bg:"rgba(2,132,199,0.1)",   icon:TrendingDown },
  critical: { label:"Kritisch",   color:"#dc2626", bg:"rgba(220,38,38,0.1)",   icon:AlertCircle },
};

export default function Labor() {
  const [results, setResults] = useState<LabResult[]>(RESULTS);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all"|"normal"|"high"|"low"|"critical">("all");
  const [comments, setComments] = useState<Record<string, string>>({});
  const [savingId, setSavingId] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setFetchError(null);
    fetchLabResults()
      .then((data: APILabResult[]) => {
        if (data.length > 0) {
          const mapped = data.map(mapAPILabResult);
          setResults(mapped);
          const initial: Record<string, string> = {};
          mapped.forEach((r) => { initial[r.id] = r.doctorComment; });
          setComments(initial);
        } else {
          const initial: Record<string, string> = {};
          RESULTS.forEach((r) => { initial[r.id] = r.doctorComment; });
          setComments(initial);
        }
      })
      .catch((err: unknown) => setFetchError(err instanceof Error ? err.message : "Verbindungsfehler"))
      .finally(() => setLoading(false));
  }, []);

  async function handleSaveComment(id: string) {
    setSavingId(id);
    try {
      await saveLabComment(id, comments[id] ?? "");
    } catch {
      // silent — comment field is best-effort
    }
    setSavingId(null);
  }

  const filtered = results.filter((r) => {
    const matchSearch = (r.patient ?? "").toLowerCase().includes(search.toLowerCase()) || (r.test ?? "").toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || r.status === filter;
    return matchSearch && matchFilter;
  });

  const counts = {
    critical: results.filter((r) => r.status === "critical").length,
    high: results.filter((r) => r.status === "high").length,
    unsent: results.filter((r) => !r.sent).length,
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Labor & Befunde</h1>
          <p className="text-slate-500 text-sm mt-0.5">{results.length} Ergebnisse · {counts.unsent} noch nicht versendet</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label:"Kritische Werte", value:counts.critical, color:"#dc2626", bg:"rgba(220,38,38,0.08)" },
          { label:"Erhöhte Werte", value:counts.high, color:"#d97706", bg:"rgba(217,119,6,0.08)" },
          { label:"Nicht versendet", value:counts.unsent, color:"#7c3aed", bg:"rgba(124,58,237,0.08)" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl p-5 border border-slate-100 bg-white">
            <div className="text-3xl font-bold mb-1" style={{ color: s.color }}>{s.value}</div>
            <div className="text-sm text-slate-500">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="mb-5">
        <OCRScanner
          label="Laborzettel scannen (KI)"
          onImport={(data) => { console.log("Lab scan result:", data); }}
        />
      </div>

      <div className="flex gap-3 mb-4">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Patient oder Test suchen..."
            className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#1E9FD4] bg-white" />
        </div>
        <div className="flex gap-1.5">
          {(["all","critical","high","low","normal"] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={cn("px-3 py-2 rounded-xl text-xs font-medium transition-all",
                filter === f ? "text-white" : "bg-white border border-slate-200 text-slate-500")}
              style={filter === f ? { backgroundColor: "#1E9FD4" } : {}}>
              {f === "all" ? "Alle" : statusConfig[f]?.label ?? f}
            </button>
          ))}
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-16 text-slate-400 text-sm">Laden...</div>
      )}
      {!loading && fetchError && (
        <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm mb-4">
          {fetchError}
        </div>
      )}

      <div className="space-y-2">
        {!loading && !fetchError && filtered.map((r) => {
          const cfg = statusConfig[r.status];
          const Icon = cfg.icon;
          return (
            <div key={r.id} className="bg-white rounded-2xl border border-slate-100 hover:shadow-sm transition-all p-3 md:p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: cfg.bg }}>
                  <Icon size={18} style={{ color: cfg.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-semibold text-slate-800 text-sm">{r.patient}</span>
                    {r.status === "critical" && (
                      <span className="text-xs px-2 py-0.5 rounded-full font-bold text-white" style={{ backgroundColor: "#dc2626" }}>KRITISCH</span>
                    )}
                  </div>
                  <div className="text-xs text-slate-400">{r.test} · {r.doctor} · {r.date}</div>
                </div>
                <div className="text-right hidden sm:block">
                  <div className="text-lg font-bold" style={{ color: cfg.color }}>
                    {r.value} <span className="text-xs font-normal text-slate-400">{r.unit}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold flex-shrink-0"
                  style={{ backgroundColor: cfg.bg, color: cfg.color }}>
                  {cfg.label}
                </div>
                <div className={cn("text-xs px-2.5 py-1.5 rounded-lg font-medium flex-shrink-0",
                  r.sent ? "bg-green-50 text-green-600" : "bg-slate-100 text-slate-400")}>
                  {r.sent ? "Versendet" : "Ausstehend"}
                </div>
              </div>

              <div className="flex gap-2 items-center mt-3 pl-13">
                <input
                  type="text"
                  placeholder="Arztkommentar für Patient…"
                  value={comments[r.id] ?? ""}
                  onChange={(e) => setComments((prev) => ({ ...prev, [r.id]: e.target.value }))}
                  onKeyDown={(e) => { if (e.key === "Enter") handleSaveComment(r.id); }}
                  className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs outline-none focus:border-[#1E9FD4] bg-slate-50 placeholder:text-slate-300"
                />
                <button
                  onClick={() => handleSaveComment(r.id)}
                  disabled={savingId === r.id}
                  title="Kommentar speichern"
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs text-white disabled:opacity-50 transition-opacity flex-shrink-0"
                  style={{ backgroundColor: "#1E9FD4" }}
                >
                  <Save size={12} />
                  {savingId === r.id ? "…" : "Speichern"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
