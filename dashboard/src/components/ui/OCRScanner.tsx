import { useState, useRef } from "react";
import { Camera, Upload, Sparkles, X, CheckCircle } from "lucide-react";

type OCRResult = {
  patientName: string | null;
  dateOfBirth: string | null;
  testName: string | null;
  testValue: string | null;
  testUnit: string | null;
  referenceRange: string | null;
  status: string | null;
  doctor: string | null;
  date: string | null;
  diagnosis: string | null;
  icdCode: string | null;
  notes: string | null;
  confidence: string;
};

export default function OCRScanner({
  onImport,
  label = "Dokument scannen",
}: {
  onImport: (data: OCRResult) => void;
  label?: string;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<OCRResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const processImage = async (file: File) => {
    setLoading(true);
    setError(null);
    setResult(null);

    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUrl = e.target?.result as string;
      setPreview(dataUrl);
      const base64 = dataUrl.split(",")[1];
      const mediaType = file.type;

      try {
        const res = await fetch("/api/ocr", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageBase64: base64, mediaType }),
        });
        if (res.ok) {
          const data = await res.json();
          setResult(data);
        } else {
          setError("Fehler beim Lesen des Dokuments");
        }
      } catch {
        setError("Verarbeitungsfehler");
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const confidenceColor: Record<string, string> = {
    high: "#16a34a",
    medium: "#d97706",
    low: "#dc2626",
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-2"
        style={{ backgroundColor: "rgba(124,58,237,0.04)" }}>
        <Sparkles size={14} style={{ color: "#7c3aed" }} />
        <h3 className="text-sm font-semibold text-slate-800">{label}</h3>
      </div>
      <div className="p-4">
        {!preview ? (
          <div className="space-y-3">
            <p className="text-slate-400 text-xs">Foto eines Laborzettels, Befundberichts oder Dokuments — KI liest automatisch aus.</p>
            <div className="flex gap-2">
              <button type="button"
                onClick={() => { if (fileRef.current) { fileRef.current.accept = "image/*"; fileRef.current.click(); } }}
                className="flex items-center gap-2 text-white text-xs font-semibold px-3 py-2 rounded-xl transition-colors"
                style={{ backgroundColor: "#7c3aed" }}>
                <Camera size={13} /> Foto aufnehmen
              </button>
              <button type="button"
                onClick={() => fileRef.current?.click()}
                className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold px-3 py-2 rounded-xl transition-colors">
                <Upload size={13} /> Datei wählen
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <img src={preview} alt="Scan" className="w-16 h-16 object-cover rounded-xl border border-slate-200 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                {loading && (
                  <div className="flex items-center gap-2 text-xs" style={{ color: "#7c3aed" }}>
                    <Sparkles size={12} className="animate-pulse" /> KI liest Dokument...
                  </div>
                )}
                {error && <p className="text-red-500 text-xs">{error}</p>}
                {result && (
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-slate-400">Konfidenz:</span>
                      <span className="text-xs font-semibold" style={{ color: confidenceColor[result.confidence] ?? "#64748b" }}>
                        {result.confidence === "high" ? "Hoch" : result.confidence === "medium" ? "Mittel" : "Niedrig"}
                      </span>
                    </div>
                    {result.patientName && <p className="text-xs text-green-600 flex items-center gap-1"><CheckCircle size={10} /> Patient: {result.patientName}</p>}
                    {result.testName && <p className="text-xs text-green-600 flex items-center gap-1"><CheckCircle size={10} /> Test: {result.testName} {result.testValue}</p>}
                    {result.diagnosis && <p className="text-xs text-green-600 flex items-center gap-1"><CheckCircle size={10} /> Diagnose erkannt</p>}
                    {result.icdCode && <p className="text-xs text-green-600 flex items-center gap-1"><CheckCircle size={10} /> ICD-10: {result.icdCode}</p>}
                  </div>
                )}
              </div>
              <button type="button" onClick={() => { setPreview(null); setResult(null); }}
                className="text-slate-300 hover:text-slate-500 transition-colors flex-shrink-0">
                <X size={16} />
              </button>
            </div>
            {result && (
              <button type="button" onClick={() => onImport(result)}
                className="w-full text-white text-xs font-semibold py-2.5 rounded-xl transition-colors"
                style={{ backgroundColor: "#7c3aed" }}>
                Daten übernehmen
              </button>
            )}
          </div>
        )}
        <input ref={fileRef} type="file" accept="image/*" className="hidden"
          onChange={(e) => { const file = e.target.files?.[0]; if (file) processImage(file); }} />
      </div>
    </div>
  );
}
