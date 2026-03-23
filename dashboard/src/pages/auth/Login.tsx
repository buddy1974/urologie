import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { useAuthStore } from "@/store/auth";
import type { UserRole } from "@/types";

const DEMO_USERS = [
  { email: "dr.fomuki@urologie-neuwied.de", password: "praxis2024", name: "Dr. Walters T. Fomuki", role: "inhaber" as UserRole },
  { email: "dr.nwankwo@urologie-neuwied.de", password: "praxis2024", name: "Dr. C. Nwankwo", role: "arzt" as UserRole },
  { email: "theismann@urologie-neuwied.de", password: "praxis2024", name: "Bettina Theismann", role: "mfa" as UserRole },
  { email: "jakoby@urologie-neuwied.de", password: "praxis2024", name: "Frau Jakoby", role: "buero" as UserRole },
];

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuthStore();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    await new Promise((r) => setTimeout(r, 600));
    const user = DEMO_USERS.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      login({ id: user.email, name: user.name, role: user.role, email: user.email });
      navigate("/");
    } else {
      setError("E-Mail oder Passwort ist falsch.");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "linear-gradient(135deg, #1A202C 0%, #2D3748 50%, #1A202C 100%)" }}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ backgroundColor: "#1E9FD4" }} />
      </div>
      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: "#1E9FD4" }}>
            <span className="text-white font-bold text-xl">U</span>
          </div>
          <div className="text-white font-bold text-xl mb-1">PraxisOS</div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider"
            style={{ backgroundColor: "rgba(30,159,212,0.15)", color: "#5ECFEB", border: "1px solid rgba(30,159,212,0.3)" }}>
            Urologie Neuwied · Interner Bereich
          </div>
        </div>
        <div className="rounded-2xl p-8 shadow-2xl"
          style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(20px)" }}>
          <h1 className="text-2xl font-bold text-white mb-2">Anmelden</h1>
          <p className="text-sm mb-8" style={{ color: "#94a3b8" }}>Zugang für autorisiertes Praxispersonal</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#94a3b8" }}>
                E-Mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="name@urologie-neuwied.de"
                className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-slate-500 outline-none transition-all"
                style={{ backgroundColor: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}
                onFocus={(e) => e.target.style.borderColor = "#1E9FD4"}
                onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#94a3b8" }}>
                Passwort
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-slate-500 outline-none transition-all pr-12"
                  style={{ backgroundColor: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}
                  onFocus={(e) => e.target.style.borderColor = "#1E9FD4"}
                  onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            {error && (
              <div className="px-4 py-3 rounded-xl text-sm text-red-300"
                style={{ backgroundColor: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-white transition-all mt-2"
              style={{ backgroundColor: "#1E9FD4" }}
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <LogIn size={16} />
              )}
              {loading ? "Anmelden..." : "Anmelden"}
            </button>
          </form>
          <div className="mt-6 pt-5 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
            <p className="text-xs text-center mb-3" style={{ color: "#64748b" }}>Demo-Zugänge (Passwort: praxis2024)</p>
            <div className="space-y-1.5">
              {DEMO_USERS.map((u) => (
                <button
                  key={u.email}
                  onClick={() => { setEmail(u.email); setPassword(u.password); }}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs transition-colors hover:bg-white/5"
                  style={{ color: "#94a3b8" }}
                >
                  <span className="font-medium text-white">{u.name}</span>
                  <span className="ml-2 px-1.5 py-0.5 rounded"
                    style={{ backgroundColor: "rgba(30,159,212,0.15)", color: "#5ECFEB" }}>
                    {u.role}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
        <p className="text-center text-xs mt-6" style={{ color: "#475569" }}>
          © 2026 Urologische Praxis Neuwied · Nur für autorisiertes Personal
        </p>
      </div>
    </div>
  );
}
