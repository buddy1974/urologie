import { useState, useEffect, useRef } from "react";
import { MapPin } from "lucide-react";

type AddressResult = {
  display: string;
  street: string;
  city: string;
  zip: string;
};

export default function AddressAutocomplete({
  value,
  onChange,
  onSelect,
  placeholder,
}: {
  value: string;
  onChange: (val: string) => void;
  onSelect?: (result: AddressResult) => void;
  placeholder?: string;
}) {
  const [results, setResults] = useState<AddressResult[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (value.length < 3) { setResults([]); return; }
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/address?q=${encodeURIComponent(value)}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data);
          setOpen(data.length > 0);
        }
      } finally {
        setLoading(false);
      }
    }, 400);
  }, [value]);

  return (
    <div className="relative">
      <div className="relative">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => results.length > 0 && setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 200)}
          placeholder={placeholder ?? "Straße eingeben..."}
          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#1E9FD4] transition-colors bg-white"
        />
        {loading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="w-3 h-3 border border-slate-300 border-t-[#1E9FD4] rounded-full animate-spin" />
          </div>
        )}
      </div>
      {open && results.length > 0 && (
        <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden">
          {results.map((r, i) => (
            <button
              key={i}
              type="button"
              onMouseDown={() => {
                onChange(r.street || r.display);
                onSelect?.(r);
                setOpen(false);
              }}
              className="w-full flex items-start gap-2 px-3 py-2.5 hover:bg-slate-50 text-left transition-colors border-b border-slate-50 last:border-0"
            >
              <MapPin size={12} className="text-slate-400 mt-0.5 flex-shrink-0" style={{ color: "#1E9FD4" }} />
              <div className="min-w-0">
                <p className="text-slate-800 text-xs truncate">{r.street || r.display}</p>
                <p className="text-slate-400 text-xs">{[r.zip, r.city].filter(Boolean).join(" ")}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
