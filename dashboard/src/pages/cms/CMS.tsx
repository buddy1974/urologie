import { useState, useEffect, useRef, useCallback } from "react";
import {
  Globe, FileText, BookOpen, ImageIcon, Save, Sparkles, Trash2, Plus,
  Eye, RefreshCw, Copy, Check, Upload, X, ChevronRight, ChevronDown,
  Loader2, AlertCircle, ArrowLeft, Link as LinkIcon,
} from "lucide-react";
import { useAuthStore } from "@/store/auth";

const API_BASE = import.meta.env.VITE_API_URL ?? "https://urologie-backend.onrender.com";
const WEBHOOK_SECRET = import.meta.env.VITE_WEBHOOK_SECRET ?? "urologie-n8n-secret-2026";
const SITE_BASE = "https://urologie-six.vercel.app";

// ── Types ──────────────────────────────────────────────────────────────────────

interface CMSPage {
  id: string;
  slug: string;
  title: string;
  content: Record<string, unknown>;
  metaTitle: string | null;
  metaDescription: string | null;
  metaKeywords: string | null;
  updatedAt: string | null;
  updatedBy: string | null;
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  coverImage: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  metaKeywords: string | null;
  status: string;
  scheduledAt: string | null;
  publishedAt: string | null;
  authorName: string | null;
  category: string | null;
  createdAt: string;
  updatedAt: string;
}

interface MediaItem {
  id: string;
  filename: string;
  url: string;
  mimeType: string | null;
  size: number | null;
  uploadedAt: string | null;
}

interface PageForm {
  title: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
}

interface BlogForm {
  title: string;
  category: string;
  authorName: string;
  coverImageUrl: string;
  excerpt: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  status: string;
  scheduledAt: string;
}

// ── Constants ──────────────────────────────────────────────────────────────────

const PAGE_LABELS: Record<string, string> = {
  home: "Startseite",
  praxis: "Unsere Praxis",
  team: "Unser Team",
  diagnostik: "Diagnostik",
  onkologie: "Onkologie",
  andrologie: "Andrologie & Vasektomie",
  urolift: "UroLift® bei BPH",
  magnetstimulation: "Magnetstimulation",
  urodynamik: "Urodynamik & Ästhetik",
  kontakt: "Kontakt & Anfahrt",
};

const PAGE_ORDER = ["home", "praxis", "team", "diagnostik", "onkologie", "andrologie", "urolift", "magnetstimulation", "urodynamik", "kontakt"];

const CATEGORIES = ["Allgemein", "PSA & Prostata", "Urologie News", "Praxis Update", "Gesundheitstipps"];

const IMAGE_PRESETS = [
  { label: "Hero (1920×600)", value: "1920x600" },
  { label: "Team-Foto (400×500)", value: "400x500" },
  { label: "Leistung (800×400)", value: "800x400" },
  { label: "Blog-Header (1200×630)", value: "1200x630" },
  { label: "Quadrat (400×400)", value: "400x400" },
];

const STATUS_BADGE: Record<string, { label: string; color: string; bg: string }> = {
  draft:       { label: "Entwurf",          color: "#64748b", bg: "rgba(100,116,139,0.12)" },
  published:   { label: "Veröffentlicht",   color: "#16a34a", bg: "rgba(22,163,74,0.12)"  },
  scheduled:   { label: "Geplant",          color: "#2563eb", bg: "rgba(37,99,235,0.12)"  },
  unpublished: { label: "Unveröffentlicht", color: "#ea580c", bg: "rgba(234,88,12,0.12)"  },
};

const BLANK_BLOG: BlogForm = {
  title: "", category: "Allgemein", authorName: "Dr. Walters T. Fomuki",
  coverImageUrl: "", excerpt: "", content: "",
  metaTitle: "", metaDescription: "", metaKeywords: "",
  status: "draft", scheduledAt: "",
};

// ── Helpers ────────────────────────────────────────────────────────────────────

function fmt(date?: string | null) {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("de-DE", { day: "2-digit", month: "short", year: "numeric" });
}

function fmtSize(bytes?: number | null) {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function uploadWithProgress(
  url: string,
  file: File,
  onProgress: (pct: number) => void
): Promise<MediaItem> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.upload.addEventListener("progress", (e: ProgressEvent) => {
      if (e.lengthComputable) onProgress(Math.round((e.loaded / e.total) * 100));
    });
    xhr.addEventListener("load", () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(JSON.parse(xhr.responseText) as MediaItem);
      } else {
        reject(new Error("Upload failed"));
      }
    });
    xhr.addEventListener("error", () => reject(new Error("Upload failed")));
    const fd = new FormData();
    fd.append("file", file);
    xhr.send(fd);
  });
}

// ── Component ──────────────────────────────────────────────────────────────────

export default function CMS() {
  const { user } = useAuthStore();
  const [tab, setTab] = useState<"pages" | "blog" | "media">("pages");
  const [toast, setToast] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  const showToast = useCallback((type: "success" | "error", msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3500);
  }, []);

  // ── SEITEN ───────────────────────────────────────────────────────────────────

  const [pagesList, setPagesList] = useState<CMSPage[]>([]);
  const [pagesLoading, setPagesLoading] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState("");
  const [pageDetail, setPageDetail] = useState<CMSPage | null>(null);
  const [pageForm, setPageForm] = useState<PageForm>({
    title: "", content: "{}", metaTitle: "", metaDescription: "", metaKeywords: "",
  });
  const [pageSaving, setPageSaving] = useState(false);
  const [pageAiLoading, setPageAiLoading] = useState(false);
  const [pageMetaLoading, setPageMetaLoading] = useState(false);
  const [metaOpen, setMetaOpen] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  // Image section (page editor)
  const [imgTab, setImgTab] = useState<"url" | "upload">("url");
  const [imgUrl, setImgUrl] = useState("");
  const [imgPreset, setImgPreset] = useState("1920x600");
  const [imgDragOver, setImgDragOver] = useState(false);
  const [imgUploading, setImgUploading] = useState(false);
  const [imgUploadPct, setImgUploadPct] = useState(0);
  const [imgCopied, setImgCopied] = useState(false);
  const pageImgRef = useRef<HTMLInputElement>(null);

  const previewUrl = selectedSlug
    ? selectedSlug === "home"
      ? `${SITE_BASE}/de`
      : `${SITE_BASE}/de/${selectedSlug}`
    : "";

  async function loadPages() {
    setPagesLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/cms/pages`);
      if (!res.ok) throw new Error();
      const data = (await res.json()) as CMSPage[];
      setPagesList(data);
      if (data.length && !selectedSlug) {
        const first = data.find((p) => p.slug === "home") ?? data[0];
        applyPage(first);
      }
    } catch {
      showToast("error", "Seiten konnten nicht geladen werden.");
    } finally {
      setPagesLoading(false);
    }
  }

  function applyPage(page: CMSPage) {
    setSelectedSlug(page.slug);
    setPageDetail(page);
    setPageForm({
      title: page.title,
      content: JSON.stringify(page.content, null, 2),
      metaTitle: page.metaTitle ?? "",
      metaDescription: page.metaDescription ?? "",
      metaKeywords: page.metaKeywords ?? "",
    });
    setIframeKey((k) => k + 1);
    setLastSaved(null);
  }

  async function savePage() {
    if (!selectedSlug) return;
    let parsedContent: Record<string, unknown>;
    try { parsedContent = JSON.parse(pageForm.content); }
    catch { showToast("error", "Inhalt ist kein gültiges JSON."); return; }
    setPageSaving(true);
    try {
      const res = await fetch(`${API_BASE}/api/cms/pages/${selectedSlug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...pageForm, content: parsedContent, updatedBy: user?.name }),
      });
      if (!res.ok) throw new Error();
      const updated = (await res.json()) as CMSPage;
      setPageDetail(updated);
      setPagesList((prev) => prev.map((p) => (p.slug === selectedSlug ? updated : p)));
      setLastSaved(new Date().toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" }));
      showToast("success", "✅ Seite gespeichert.");
    } catch {
      showToast("error", "Fehler beim Speichern.");
    } finally {
      setPageSaving(false);
    }
  }

  async function aiEnhancePage() {
    if (!pageForm.content.trim()) return;
    setPageAiLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/cms/ai-enhance`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-webhook-secret": WEBHOOK_SECRET },
        body: JSON.stringify({ type: "page", rawText: pageForm.content }),
      });
      if (!res.ok) throw new Error();
      const data = (await res.json()) as { result?: string };
      setPageForm((f) => ({ ...f, content: data.result ?? f.content }));
      showToast("success", "KI-Verbesserung angewendet.");
    } catch {
      showToast("error", "KI-Verbesserung fehlgeschlagen.");
    } finally { setPageAiLoading(false); }
  }

  async function generatePageMeta() {
    if (!pageForm.content.trim()) return;
    setPageMetaLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/cms/ai-enhance`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-webhook-secret": WEBHOOK_SECRET },
        body: JSON.stringify({ type: "meta", rawText: pageForm.content }),
      });
      if (!res.ok) throw new Error();
      const data = (await res.json()) as { metaTitle?: string; metaDescription?: string; metaKeywords?: string };
      if (data.metaTitle) {
        setPageForm((f) => ({
          ...f,
          metaTitle: data.metaTitle ?? f.metaTitle,
          metaDescription: data.metaDescription ?? f.metaDescription,
          metaKeywords: data.metaKeywords ?? f.metaKeywords,
        }));
        if (!metaOpen) setMetaOpen(true);
      }
      showToast("success", "Meta-Felder generiert.");
    } catch {
      showToast("error", "Meta-Generierung fehlgeschlagen.");
    } finally { setPageMetaLoading(false); }
  }

  async function uploadPageImage(file: File) {
    if (!file.type.startsWith("image/")) { showToast("error", "Nur Bilder erlaubt."); return; }
    setImgUploading(true);
    setImgUploadPct(0);
    try {
      const item = await uploadWithProgress(`${API_BASE}/api/cms/media/upload`, file, setImgUploadPct);
      setImgUrl(item.url);
      showToast("success", "Bild hochgeladen.");
    } catch {
      showToast("error", "Upload fehlgeschlagen.");
    } finally { setImgUploading(false); }
  }

  async function copyImgUrl() {
    if (!imgUrl) return;
    await navigator.clipboard.writeText(imgUrl);
    setImgCopied(true);
    setTimeout(() => setImgCopied(false), 2000);
  }

  // ── BLOG ─────────────────────────────────────────────────────────────────────

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [blogLoading, setBlogLoading] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingSlug, setEditingSlug] = useState("");
  const [blogForm, setBlogForm] = useState<BlogForm>(BLANK_BLOG);
  const [blogSaving, setBlogSaving] = useState(false);
  const [blogAiLoading, setBlogAiLoading] = useState(false);
  const [blogMetaLoading, setBlogMetaLoading] = useState(false);
  const [blogMetaOpen, setBlogMetaOpen] = useState(false);

  // Blog cover image
  const [coverImgTab, setCoverImgTab] = useState<"url" | "upload">("url");
  const [coverDragOver, setCoverDragOver] = useState(false);
  const [coverUploading, setCoverUploading] = useState(false);
  const [coverUploadPct, setCoverUploadPct] = useState(0);
  const coverInputRef = useRef<HTMLInputElement>(null);

  async function loadPosts() {
    setBlogLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/cms/blog`);
      if (!res.ok) throw new Error();
      setPosts((await res.json()) as BlogPost[]);
    } catch {
      showToast("error", "Artikel konnten nicht geladen werden.");
    } finally { setBlogLoading(false); }
  }

  function openNewPost() {
    setEditingId(null);
    setEditingSlug("");
    setBlogForm(BLANK_BLOG);
    setBlogMetaOpen(false);
    setCoverImgTab("url");
    setShowEditor(true);
  }

  function openEditPost(post: BlogPost) {
    setEditingId(post.id);
    setEditingSlug(post.slug);
    setBlogForm({
      title: post.title,
      category: post.category ?? "Allgemein",
      authorName: post.authorName ?? "Dr. Walters T. Fomuki",
      coverImageUrl: post.coverImage ?? "",
      excerpt: post.excerpt ?? "",
      content: post.content,
      metaTitle: post.metaTitle ?? "",
      metaDescription: post.metaDescription ?? "",
      metaKeywords: post.metaKeywords ?? "",
      status: post.status,
      scheduledAt: post.scheduledAt ? post.scheduledAt.slice(0, 16) : "",
    });
    setBlogMetaOpen(false);
    setCoverImgTab("url");
    setShowEditor(true);
  }

  async function savePost() {
    if (!blogForm.title.trim() || !blogForm.content.trim()) {
      showToast("error", "Titel und Inhalt sind erforderlich.");
      return;
    }
    setBlogSaving(true);
    const body = {
      title: blogForm.title,
      category: blogForm.category,
      authorName: blogForm.authorName,
      coverImage: blogForm.coverImageUrl || undefined,
      excerpt: blogForm.excerpt || undefined,
      content: blogForm.content,
      metaTitle: blogForm.metaTitle || undefined,
      metaDescription: blogForm.metaDescription || undefined,
      metaKeywords: blogForm.metaKeywords || undefined,
      status: blogForm.status,
      scheduledAt: blogForm.scheduledAt || undefined,
    };
    try {
      const url = editingId ? `${API_BASE}/api/cms/blog/${editingId}` : `${API_BASE}/api/cms/blog`;
      const res = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error();
      showToast("success", editingId ? "✅ Artikel aktualisiert." : "✅ Artikel erstellt.");
      setShowEditor(false);
      loadPosts();
    } catch {
      showToast("error", "Fehler beim Speichern.");
    } finally { setBlogSaving(false); }
  }

  async function togglePublish(post: BlogPost) {
    const newStatus = post.status === "published" ? "unpublished" : "published";
    try {
      const res = await fetch(`${API_BASE}/api/cms/blog/${post.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error();
      showToast("success", newStatus === "published" ? "Artikel veröffentlicht." : "Artikel unveröffentlicht.");
      loadPosts();
    } catch {
      showToast("error", "Status konnte nicht geändert werden.");
    }
  }

  async function deletePost(id: string) {
    if (!confirm("Artikel wirklich löschen?")) return;
    try {
      await fetch(`${API_BASE}/api/cms/blog/${id}`, { method: "DELETE" });
      showToast("success", "Artikel gelöscht.");
      setPosts((prev) => prev.filter((p) => p.id !== id));
      if (showEditor && editingId === id) setShowEditor(false);
    } catch {
      showToast("error", "Löschen fehlgeschlagen.");
    }
  }

  async function aiGenerateBlog() {
    if (!blogForm.content.trim()) return;
    setBlogAiLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/cms/ai-enhance`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-webhook-secret": WEBHOOK_SECRET },
        body: JSON.stringify({ type: "blog", rawText: blogForm.content }),
      });
      if (!res.ok) throw new Error();
      const data = (await res.json()) as { result?: string };
      setBlogForm((f) => ({ ...f, content: data.result ?? f.content }));
      showToast("success", "KI-Artikel generiert.");
    } catch {
      showToast("error", "KI-Generierung fehlgeschlagen.");
    } finally { setBlogAiLoading(false); }
  }

  async function generateBlogMeta() {
    if (!blogForm.content.trim()) return;
    setBlogMetaLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/cms/ai-enhance`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-webhook-secret": WEBHOOK_SECRET },
        body: JSON.stringify({ type: "meta", rawText: blogForm.content }),
      });
      if (!res.ok) throw new Error();
      const data = (await res.json()) as { metaTitle?: string; metaDescription?: string; metaKeywords?: string };
      if (data.metaTitle) {
        setBlogForm((f) => ({
          ...f,
          metaTitle: data.metaTitle ?? f.metaTitle,
          metaDescription: data.metaDescription ?? f.metaDescription,
          metaKeywords: data.metaKeywords ?? f.metaKeywords,
        }));
        if (!blogMetaOpen) setBlogMetaOpen(true);
      }
      showToast("success", "Meta-Felder generiert.");
    } catch {
      showToast("error", "Meta-Generierung fehlgeschlagen.");
    } finally { setBlogMetaLoading(false); }
  }

  async function uploadCover(file: File) {
    if (!file.type.startsWith("image/")) { showToast("error", "Nur Bilder erlaubt."); return; }
    setCoverUploading(true);
    setCoverUploadPct(0);
    try {
      const item = await uploadWithProgress(`${API_BASE}/api/cms/media/upload`, file, setCoverUploadPct);
      setBlogForm((f) => ({ ...f, coverImageUrl: item.url }));
      showToast("success", "Cover-Bild hochgeladen.");
    } catch {
      showToast("error", "Upload fehlgeschlagen.");
    } finally { setCoverUploading(false); }
  }

  // ── MEDIA ─────────────────────────────────────────────────────────────────────

  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [mediaDragOver, setMediaDragOver] = useState(false);
  const [mediaUploading, setMediaUploading] = useState(false);
  const [mediaUploadPct, setMediaUploadPct] = useState(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const mediaFileRef = useRef<HTMLInputElement>(null);

  async function loadMedia() {
    setMediaLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/cms/media`);
      if (!res.ok) throw new Error();
      setMediaItems((await res.json()) as MediaItem[]);
    } catch {
      showToast("error", "Medien konnten nicht geladen werden.");
    } finally { setMediaLoading(false); }
  }

  async function handleMediaUpload(file: File) {
    if (!file.type.startsWith("image/")) { showToast("error", "Nur Bilder erlaubt."); return; }
    setMediaUploading(true);
    setMediaUploadPct(0);
    try {
      const item = await uploadWithProgress(`${API_BASE}/api/cms/media/upload`, file, setMediaUploadPct);
      setMediaItems((prev) => [item, ...prev]);
      showToast("success", "Bild hochgeladen.");
    } catch {
      showToast("error", "Upload fehlgeschlagen.");
    } finally { setMediaUploading(false); }
  }

  async function deleteMedia(id: string) {
    if (!confirm("Bild wirklich löschen?")) return;
    try {
      await fetch(`${API_BASE}/api/cms/media/${id}`, { method: "DELETE" });
      setMediaItems((prev) => prev.filter((m) => m.id !== id));
      showToast("success", "Bild gelöscht.");
    } catch {
      showToast("error", "Löschen fehlgeschlagen.");
    }
  }

  async function copyMediaUrl(item: MediaItem) {
    await navigator.clipboard.writeText(item.url);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  // ── Effects ───────────────────────────────────────────────────────────────────

  useEffect(() => {
    if (tab === "pages") loadPages();
    if (tab === "blog") loadPosts();
    if (tab === "media") loadMedia();
  }, [tab]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Shared style helpers ──────────────────────────────────────────────────────

  const inp = "w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#1E9FD4] transition-colors bg-white";
  const btnPri = "inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed";
  const btnSec = "inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

  // ── Progress bar ──────────────────────────────────────────────────────────────

  const ProgressBar = ({ pct }: { pct: number }) => (
    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mt-2">
      <div className="h-full rounded-full transition-all duration-300" style={{ width: `${pct}%`, backgroundColor: "#1E9FD4" }} />
    </div>
  );

  // ── Render ────────────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col h-full overflow-hidden bg-slate-50">

      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-[100] flex items-center gap-2.5 px-5 py-3.5 rounded-2xl shadow-xl text-sm font-semibold animate-fade-in ${toast.type === "success" ? "bg-emerald-600" : "bg-red-500"} text-white`}>
          {toast.type === "success" ? <Check size={15} /> : <AlertCircle size={15} />}
          {toast.msg}
        </div>
      )}

      {/* Header + tabs */}
      <div className="bg-white border-b border-slate-100 px-6 py-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: "rgba(30,159,212,0.1)" }}>
            <Globe size={18} style={{ color: "#1E9FD4" }} />
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-900 leading-tight">Website CMS</h1>
            <p className="text-xs text-slate-400">Seiten · Blog · Medien</p>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-slate-100 rounded-xl p-1">
          {([["pages", "Seiten", FileText], ["blog", "Blog", BookOpen], ["media", "Medien", ImageIcon]] as const).map(([id, label, Icon]) => (
            <button key={id} onClick={() => { setTab(id); setShowEditor(false); }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${tab === id ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>
              <Icon size={13} />{label}
            </button>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          TAB 1 — SEITEN
          ══════════════════════════════════════════════════════════════════════ */}
      {tab === "pages" && (
        <div className="flex flex-1 overflow-hidden">

          {/* Page sidebar */}
          <div className="w-48 flex-shrink-0 bg-white border-r border-slate-100 overflow-y-auto">
            {pagesLoading ? (
              <div className="flex justify-center py-10"><Loader2 size={18} className="animate-spin text-slate-300" /></div>
            ) : (
              <nav className="py-3 px-2 space-y-0.5">
                {[...pagesList].sort((a, b) => PAGE_ORDER.indexOf(a.slug) - PAGE_ORDER.indexOf(b.slug)).map((page) => (
                  <button key={page.slug} onClick={() => applyPage(page)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all text-left ${selectedSlug === page.slug ? "text-white" : "text-slate-600 hover:bg-slate-50"}`}
                    style={selectedSlug === page.slug ? { backgroundColor: "#1E9FD4" } : {}}>
                    <span className="truncate">{PAGE_LABELS[page.slug] ?? page.slug}</span>
                    {selectedSlug === page.slug && <ChevronRight size={11} />}
                  </button>
                ))}
              </nav>
            )}
          </div>

          {/* Split panel: Preview + Editor */}
          {!selectedSlug ? (
            <div className="flex-1 flex items-center justify-center text-slate-400 text-sm">Seite auswählen</div>
          ) : (
            <div className="flex-1 overflow-hidden flex">

              {/* LEFT: Live preview */}
              <div className="flex-1 flex flex-col border-r border-slate-100 bg-slate-50 p-4 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Live-Vorschau</p>
                    <a href={previewUrl} target="_blank" rel="noopener noreferrer"
                      className="text-xs text-slate-400 hover:text-[#1E9FD4] transition-colors flex items-center gap-1 mt-0.5">
                      <LinkIcon size={10} />urologie-six.vercel.app
                    </a>
                  </div>
                  <button onClick={() => setIframeKey((k) => k + 1)}
                    className={btnSec + " text-xs py-1.5 px-3"}>
                    <RefreshCw size={11} />Aktualisieren
                  </button>
                </div>
                <div className="flex-1 rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-white" style={{ minHeight: 0 }}>
                  <iframe
                    key={iframeKey}
                    src={previewUrl}
                    title={`Vorschau: ${PAGE_LABELS[selectedSlug] ?? selectedSlug}`}
                    className="w-full h-full border-0"
                    style={{ minHeight: "560px" }}
                  />
                </div>
              </div>

              {/* RIGHT: Editor */}
              <div className="w-[380px] flex-shrink-0 overflow-y-auto p-5 bg-white space-y-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-bold text-slate-900">{PAGE_LABELS[selectedSlug] ?? selectedSlug}</h2>
                  {pageDetail?.updatedAt && (
                    <span className="text-xs text-slate-400">✓ {fmt(pageDetail.updatedAt)}</span>
                  )}
                </div>

                {/* Seitentitel */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Seitentitel</label>
                  <input type="text" className={inp} value={pageForm.title} onChange={(e) => setPageForm((f) => ({ ...f, title: e.target.value }))} />
                </div>

                {/* Hauptinhalt */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Hauptinhalt (JSON)</label>
                  <textarea rows={8} className={inp + " resize-y font-mono text-xs"} value={pageForm.content}
                    onChange={(e) => setPageForm((f) => ({ ...f, content: e.target.value }))} />
                  <button onClick={aiEnhancePage} disabled={pageAiLoading}
                    className={`${btnSec} w-full justify-center mt-2`} style={{ color: "#7c3aed", borderColor: "rgba(124,58,237,0.3)" }}>
                    {pageAiLoading ? <><Loader2 size={13} className="animate-spin" />Wird verbessert…</> : <><Sparkles size={13} />✨ KI verbessern</>}
                  </button>
                </div>

                {/* Bild-Upload */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Bild-Upload</label>
                  <div className="bg-slate-50 rounded-xl border border-slate-200 p-3 space-y-3">
                    {/* Tabs */}
                    <div className="flex gap-1 bg-white rounded-lg p-0.5 border border-slate-100">
                      {(["url", "upload"] as const).map((t) => (
                        <button key={t} onClick={() => setImgTab(t)}
                          className={`flex-1 flex items-center justify-center gap-1 py-1.5 rounded-md text-xs font-medium transition-all ${imgTab === t ? "bg-[#1E9FD4] text-white shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>
                          {t === "url" ? <><LinkIcon size={11} />URL eingeben</> : <><Upload size={11} />Bild hochladen</>}
                        </button>
                      ))}
                    </div>

                    {imgTab === "url" ? (
                      <input type="url" placeholder="https://…" className={inp + " text-xs"} value={imgUrl}
                        onChange={(e) => setImgUrl(e.target.value)} />
                    ) : (
                      <>
                        <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" ref={pageImgRef}
                          onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadPageImage(f); if (e.target) e.target.value = ""; }} />
                        <div
                          onClick={() => !imgUploading && pageImgRef.current?.click()}
                          onDragOver={(e) => { e.preventDefault(); setImgDragOver(true); }}
                          onDragLeave={() => setImgDragOver(false)}
                          onDrop={(e) => { e.preventDefault(); setImgDragOver(false); const f = e.dataTransfer.files[0]; if (f) uploadPageImage(f); }}
                          className={`cursor-pointer border-2 border-dashed rounded-xl py-5 text-center transition-all ${imgDragOver ? "border-[#1E9FD4] bg-blue-50" : "border-slate-200 hover:border-slate-300"}`}>
                          {imgUploading ? (
                            <div className="px-4">
                              <Loader2 size={20} className="mx-auto mb-1 animate-spin text-[#1E9FD4]" />
                              <p className="text-xs text-slate-500">Wird hochgeladen…</p>
                              <ProgressBar pct={imgUploadPct} />
                            </div>
                          ) : (
                            <>
                              <Upload size={18} className="mx-auto mb-1 text-slate-400" />
                              <p className="text-xs text-slate-500">Bild hierher ziehen oder klicken</p>
                            </>
                          )}
                        </div>
                      </>
                    )}

                    {/* Preset + copy */}
                    <div className="flex gap-2">
                      <select className={inp + " text-xs flex-1"}
                        value={imgPreset} onChange={(e) => setImgPreset(e.target.value)}>
                        {IMAGE_PRESETS.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
                      </select>
                    </div>
                    <p className="text-xs text-slate-400">Bild wird auf <strong>{imgPreset}</strong> optimiert.</p>

                    {imgUrl && (
                      <div className="space-y-2">
                        <img src={imgUrl} alt="Vorschau" className="w-full h-24 object-cover rounded-lg border border-slate-100"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                        <button onClick={copyImgUrl} className={btnSec + " w-full justify-center text-xs"}>
                          {imgCopied ? <><Check size={12} className="text-emerald-500" />Kopiert!</> : <><Copy size={12} />URL kopieren</>}
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Meta (collapsible) */}
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <button onClick={() => setMetaOpen((o) => !o)}
                    className="w-full flex items-center justify-between px-4 py-3 text-xs font-semibold text-slate-600 bg-slate-50 hover:bg-slate-100 transition-colors">
                    <span className="flex items-center gap-2"><Eye size={12} />SEO & Meta-Felder</span>
                    <ChevronDown size={13} className={`transition-transform ${metaOpen ? "rotate-180" : ""}`} />
                  </button>
                  {metaOpen && (
                    <div className="p-4 space-y-3 bg-white">
                      <div>
                        <div className="flex justify-between mb-1.5">
                          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Meta-Titel</label>
                          <span className={`text-xs ${pageForm.metaTitle.length > 60 ? "text-red-500" : "text-slate-400"}`}>{pageForm.metaTitle.length}/60</span>
                        </div>
                        <input type="text" maxLength={70} className={inp} value={pageForm.metaTitle}
                          onChange={(e) => setPageForm((f) => ({ ...f, metaTitle: e.target.value }))} />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1.5">
                          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Meta-Beschreibung</label>
                          <span className={`text-xs ${pageForm.metaDescription.length > 160 ? "text-red-500" : "text-slate-400"}`}>{pageForm.metaDescription.length}/160</span>
                        </div>
                        <textarea rows={3} maxLength={180} className={inp + " resize-none"} value={pageForm.metaDescription}
                          onChange={(e) => setPageForm((f) => ({ ...f, metaDescription: e.target.value }))} />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Keywords</label>
                        <input type="text" className={inp} value={pageForm.metaKeywords}
                          onChange={(e) => setPageForm((f) => ({ ...f, metaKeywords: e.target.value }))} />
                      </div>
                      <button onClick={generatePageMeta} disabled={pageMetaLoading} className={btnSec + " w-full justify-center"}>
                        {pageMetaLoading ? <Loader2 size={13} className="animate-spin" /> : <RefreshCw size={13} />}
                        🔍 Meta automatisch generieren
                      </button>
                    </div>
                  )}
                </div>

                {/* Save */}
                <button onClick={savePage} disabled={pageSaving}
                  className={`${btnPri} w-full justify-center py-3`} style={{ backgroundColor: "#1E9FD4" }}>
                  {pageSaving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
                  {pageSaving ? "Wird gespeichert…" : "💾 Seite speichern"}
                </button>
                {lastSaved && <p className="text-center text-xs text-slate-400">Zuletzt gespeichert: {lastSaved}</p>}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          TAB 2 — BLOG
          ══════════════════════════════════════════════════════════════════════ */}
      {tab === "blog" && (
        <div className="flex-1 overflow-hidden flex flex-col">
          {showEditor ? (
            /* ── Blog Editor ────────────────────────────────────────────────────── */
            <div className="flex-1 overflow-y-auto p-6">
              <div className="max-w-2xl mx-auto">
                {/* Top bar */}
                <div className="flex items-center gap-3 mb-6">
                  <button onClick={() => setShowEditor(false)} className="p-2 rounded-xl hover:bg-slate-100 transition-colors">
                    <ArrowLeft size={16} className="text-slate-500" />
                  </button>
                  <h2 className="text-lg font-bold text-slate-900 flex-1">{editingId ? "Artikel bearbeiten" : "Neuer Artikel"}</h2>
                  {editingId && (() => {
                    const badge = STATUS_BADGE[blogForm.status] ?? STATUS_BADGE.draft;
                    return <span className="px-2.5 py-1 rounded-lg text-xs font-semibold" style={{ color: badge.color, backgroundColor: badge.bg }}>{badge.label}</span>;
                  })()}
                </div>

                <div className="space-y-5">
                  {/* Titel */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Titel *</label>
                    <input type="text" placeholder="Artikeltitel…" className={inp + " text-base font-semibold"} value={blogForm.title}
                      onChange={(e) => setBlogForm((f) => ({ ...f, title: e.target.value }))} />
                  </div>

                  {/* Kategorie + Autor */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Kategorie</label>
                      <select className={inp + " bg-white"} value={blogForm.category}
                        onChange={(e) => setBlogForm((f) => ({ ...f, category: e.target.value }))}>
                        {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Autor</label>
                      <input type="text" className={inp} value={blogForm.authorName}
                        onChange={(e) => setBlogForm((f) => ({ ...f, authorName: e.target.value }))} />
                    </div>
                  </div>

                  {/* Cover Bild */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Cover-Bild <span className="text-slate-400 font-normal normal-case">(Blog-Header 1200×630)</span></label>
                    <div className="bg-slate-50 rounded-xl border border-slate-200 p-3 space-y-3">
                      <div className="flex gap-1 bg-white rounded-lg p-0.5 border border-slate-100">
                        {(["url", "upload"] as const).map((t) => (
                          <button key={t} onClick={() => setCoverImgTab(t)}
                            className={`flex-1 flex items-center justify-center gap-1 py-1.5 rounded-md text-xs font-medium transition-all ${coverImgTab === t ? "bg-[#1E9FD4] text-white shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>
                            {t === "url" ? <><LinkIcon size={11} />URL eingeben</> : <><Upload size={11} />Bild hochladen</>}
                          </button>
                        ))}
                      </div>

                      {coverImgTab === "url" ? (
                        <input type="url" placeholder="https://…" className={inp + " text-sm"} value={blogForm.coverImageUrl}
                          onChange={(e) => setBlogForm((f) => ({ ...f, coverImageUrl: e.target.value }))} />
                      ) : (
                        <>
                          <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" ref={coverInputRef}
                            onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadCover(f); if (e.target) e.target.value = ""; }} />
                          <div
                            onClick={() => !coverUploading && coverInputRef.current?.click()}
                            onDragOver={(e) => { e.preventDefault(); setCoverDragOver(true); }}
                            onDragLeave={() => setCoverDragOver(false)}
                            onDrop={(e) => { e.preventDefault(); setCoverDragOver(false); const f = e.dataTransfer.files[0]; if (f) uploadCover(f); }}
                            className={`cursor-pointer border-2 border-dashed rounded-xl py-6 text-center transition-all ${coverDragOver ? "border-[#1E9FD4] bg-blue-50" : "border-slate-200 hover:border-slate-300"}`}>
                            {coverUploading ? (
                              <div className="px-4">
                                <Loader2 size={20} className="mx-auto mb-1 animate-spin text-[#1E9FD4]" />
                                <p className="text-xs text-slate-500">Wird hochgeladen…</p>
                                <ProgressBar pct={coverUploadPct} />
                              </div>
                            ) : (
                              <>
                                <Upload size={20} className="mx-auto mb-1 text-slate-400" />
                                <p className="text-sm text-slate-500">Cover-Bild hochladen</p>
                                <p className="text-xs text-slate-400 mt-0.5">JPG, PNG, WEBP · max. 10 MB</p>
                              </>
                            )}
                          </div>
                        </>
                      )}

                      {blogForm.coverImageUrl && (
                        <img src={blogForm.coverImageUrl} alt="Cover" className="w-full h-32 object-cover rounded-xl border border-slate-100"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                      )}
                    </div>
                  </div>

                  {/* Kurzbeschreibung */}
                  <div>
                    <div className="flex justify-between mb-1.5">
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Kurzbeschreibung</label>
                      <span className={`text-xs ${blogForm.excerpt.length > 200 ? "text-red-500" : "text-slate-400"}`}>{blogForm.excerpt.length}/200</span>
                    </div>
                    <textarea rows={3} maxLength={220} className={inp + " resize-none"} placeholder="Zusammenfassung für die Blog-Übersicht…"
                      value={blogForm.excerpt} onChange={(e) => setBlogForm((f) => ({ ...f, excerpt: e.target.value }))} />
                  </div>

                  {/* Inhalt */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Inhalt *</label>
                    <textarea rows={16} className={inp + " resize-y"} placeholder="Artikel-Inhalt oder Stichpunkte für KI-Generierung…"
                      value={blogForm.content} onChange={(e) => setBlogForm((f) => ({ ...f, content: e.target.value }))} />
                    <div className="flex gap-2 mt-2">
                      <button onClick={aiGenerateBlog} disabled={blogAiLoading}
                        className={`${btnSec} flex-1 justify-center`} style={{ color: "#7c3aed", borderColor: "rgba(124,58,237,0.3)" }}>
                        {blogAiLoading ? <><Loader2 size={13} className="animate-spin" />KI schreibt Artikel…</> : <><Sparkles size={13} />✨ KI Artikel generieren</>}
                      </button>
                      <button onClick={generateBlogMeta} disabled={blogMetaLoading} className={`${btnSec} flex-1 justify-center`}>
                        {blogMetaLoading ? <Loader2 size={13} className="animate-spin" /> : <RefreshCw size={13} />}
                        🔍 Meta generieren
                      </button>
                    </div>
                  </div>

                  {/* SEO (collapsible) */}
                  <div className="border border-slate-200 rounded-xl overflow-hidden">
                    <button onClick={() => setBlogMetaOpen((o) => !o)}
                      className="w-full flex items-center justify-between px-4 py-3 text-xs font-semibold text-slate-600 bg-slate-50 hover:bg-slate-100 transition-colors">
                      <span className="flex items-center gap-2"><Eye size={12} />SEO-Felder</span>
                      <ChevronDown size={13} className={`transition-transform ${blogMetaOpen ? "rotate-180" : ""}`} />
                    </button>
                    {blogMetaOpen && (
                      <div className="p-4 space-y-3 bg-white">
                        <div>
                          <div className="flex justify-between mb-1"><label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Meta-Titel</label><span className={`text-xs ${blogForm.metaTitle.length > 60 ? "text-red-500" : "text-slate-400"}`}>{blogForm.metaTitle.length}/60</span></div>
                          <input type="text" maxLength={70} className={inp} value={blogForm.metaTitle} onChange={(e) => setBlogForm((f) => ({ ...f, metaTitle: e.target.value }))} />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1"><label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Meta-Beschreibung</label><span className={`text-xs ${blogForm.metaDescription.length > 160 ? "text-red-500" : "text-slate-400"}`}>{blogForm.metaDescription.length}/160</span></div>
                          <textarea rows={2} maxLength={180} className={inp + " resize-none"} value={blogForm.metaDescription} onChange={(e) => setBlogForm((f) => ({ ...f, metaDescription: e.target.value }))} />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Keywords</label>
                          <input type="text" className={inp} value={blogForm.metaKeywords} onChange={(e) => setBlogForm((f) => ({ ...f, metaKeywords: e.target.value }))} />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Status */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Status</label>
                      <select className={inp + " bg-white"} value={blogForm.status}
                        onChange={(e) => setBlogForm((f) => ({ ...f, status: e.target.value }))}>
                        <option value="draft">Entwurf</option>
                        <option value="published">Veröffentlicht</option>
                        <option value="scheduled">Geplant</option>
                        <option value="unpublished">Unveröffentlicht</option>
                      </select>
                    </div>
                    {blogForm.status === "scheduled" && (
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Datum</label>
                        <input type="datetime-local" className={inp} value={blogForm.scheduledAt}
                          onChange={(e) => setBlogForm((f) => ({ ...f, scheduledAt: e.target.value }))} />
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 pt-2">
                    <button onClick={savePost} disabled={blogSaving}
                      className={`${btnPri} flex-1 justify-center py-3`} style={{ backgroundColor: "#1E9FD4" }}>
                      {blogSaving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
                      {blogSaving ? "Wird gespeichert…" : "💾 Speichern"}
                    </button>
                    <button onClick={() => window.open(`${SITE_BASE}/de/blog`, "_blank")} className={btnSec}>
                      <Eye size={14} />Vorschau
                    </button>
                    {editingId && (
                      <button onClick={() => deletePost(editingId)} className={btnSec + " !border-red-200 !text-red-500"}>
                        <Trash2 size={14} />Löschen
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* ── Blog List ──────────────────────────────────────────────────────── */
            <div className="flex-1 overflow-y-auto p-6">
              <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-xl font-bold text-slate-900">Blog-Artikel</h2>
                  <button onClick={openNewPost} className={btnPri} style={{ backgroundColor: "#1E9FD4" }}>
                    <Plus size={15} />Neuer Artikel
                  </button>
                </div>

                {blogLoading ? (
                  <div className="flex justify-center py-16"><Loader2 size={24} className="animate-spin text-slate-300" /></div>
                ) : posts.length === 0 ? (
                  <div className="text-center py-16">
                    <BookOpen size={40} className="mx-auto mb-3 text-slate-200" />
                    <p className="text-slate-400 mb-3">Noch keine Artikel vorhanden.</p>
                    <button onClick={openNewPost} className="text-sm font-semibold" style={{ color: "#1E9FD4" }}>Ersten Artikel erstellen →</button>
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="border-b border-slate-100">
                        <tr>
                          <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Titel</th>
                          <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden md:table-cell">Kategorie</th>
                          <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                          <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden lg:table-cell">Datum</th>
                          <th className="text-right px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Aktionen</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {posts.map((post) => {
                          const badge = STATUS_BADGE[post.status] ?? STATUS_BADGE.draft;
                          return (
                            <tr key={post.id} className="hover:bg-slate-50 transition-colors">
                              <td className="px-5 py-3.5">
                                <div className="font-semibold text-slate-900 truncate max-w-[220px]">{post.title}</div>
                                {post.excerpt && <div className="text-xs text-slate-400 truncate max-w-[220px] mt-0.5">{post.excerpt.slice(0, 70)}…</div>}
                              </td>
                              <td className="px-4 py-3.5 text-slate-500 text-sm hidden md:table-cell">{post.category ?? "Allgemein"}</td>
                              <td className="px-4 py-3.5">
                                <span className="px-2.5 py-1 rounded-lg text-xs font-semibold" style={{ color: badge.color, backgroundColor: badge.bg }}>{badge.label}</span>
                              </td>
                              <td className="px-4 py-3.5 text-xs text-slate-400 hidden lg:table-cell">{fmt(post.createdAt)}</td>
                              <td className="px-5 py-3.5">
                                <div className="flex items-center justify-end gap-1">
                                  <button onClick={() => openEditPost(post)} className="px-2.5 py-1.5 rounded-lg hover:bg-slate-100 transition-colors text-xs font-medium text-slate-600 hover:text-slate-800">Bearbeiten</button>
                                  <button onClick={() => togglePublish(post)}
                                    className="px-2.5 py-1.5 rounded-lg hover:bg-slate-100 transition-colors text-xs font-medium"
                                    style={{ color: post.status === "published" ? "#ea580c" : "#16a34a" }}>
                                    {post.status === "published" ? "Unveröffentlichen" : "Veröffentlichen"}
                                  </button>
                                  <button onClick={() => deletePost(post.id)} className="p-1.5 rounded-lg hover:bg-red-50 transition-colors text-slate-400 hover:text-red-500">
                                    <Trash2 size={13} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          TAB 3 — MEDIEN
          ══════════════════════════════════════════════════════════════════════ */}
      {tab === "media" && (
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-xl font-bold text-slate-900 mb-5">Medienbibliothek</h2>

            {/* Upload zone */}
            <input type="file" accept="image/*" className="hidden" ref={mediaFileRef}
              onChange={(e) => { const f = e.target.files?.[0]; if (f) handleMediaUpload(f); if (e.target) e.target.value = ""; }} />
            <div
              onClick={() => !mediaUploading && mediaFileRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setMediaDragOver(true); }}
              onDragLeave={() => setMediaDragOver(false)}
              onDrop={(e) => { e.preventDefault(); setMediaDragOver(false); const f = e.dataTransfer.files[0]; if (f) handleMediaUpload(f); }}
              className={`cursor-pointer border-2 border-dashed rounded-2xl p-10 text-center mb-6 transition-all select-none ${mediaDragOver ? "border-[#1E9FD4] bg-blue-50" : "border-slate-200 hover:border-slate-300 bg-white"}`}>
              {mediaUploading ? (
                <div className="max-w-xs mx-auto">
                  <Loader2 size={28} className="mx-auto mb-2 animate-spin text-[#1E9FD4]" />
                  <p className="text-sm font-medium text-slate-600 mb-2">Wird hochgeladen… {mediaUploadPct}%</p>
                  <ProgressBar pct={mediaUploadPct} />
                </div>
              ) : (
                <>
                  <Upload size={28} className="mx-auto mb-2 text-slate-400" />
                  <p className="text-sm font-medium text-slate-600">Bild hierher ziehen oder klicken zum Auswählen</p>
                  <p className="text-xs text-slate-400 mt-1">PNG, JPG, WEBP · max. 10 MB</p>
                </>
              )}
            </div>

            {/* Grid */}
            {mediaLoading ? (
              <div className="flex justify-center py-16"><Loader2 size={24} className="animate-spin text-slate-300" /></div>
            ) : mediaItems.length === 0 ? (
              <div className="text-center py-12">
                <ImageIcon size={40} className="mx-auto mb-3 text-slate-200" />
                <p className="text-slate-400">Noch keine Bilder hochgeladen.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {mediaItems.map((item) => (
                  <div key={item.id} className="group relative bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-md transition-all">
                    <div className="aspect-square bg-slate-50 overflow-hidden relative">
                      <img src={item.url} alt={item.filename} className="w-full h-full object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button onClick={() => copyMediaUrl(item)} title="URL kopieren"
                          className="p-2 bg-white rounded-lg shadow hover:scale-110 transition-transform">
                          {copiedId === item.id ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} className="text-slate-700" />}
                        </button>
                        <button onClick={() => deleteMedia(item.id)} title="Löschen"
                          className="p-2 bg-white rounded-lg shadow hover:scale-110 transition-transform">
                          <Trash2 size={13} className="text-red-500" />
                        </button>
                      </div>
                    </div>
                    <div className="p-2.5">
                      <p className="text-xs text-slate-600 truncate font-medium">{item.filename}</p>
                      {item.size && <p className="text-xs text-slate-400">{fmtSize(item.size)}</p>}
                      <p className="text-xs text-slate-400">{fmt(item.uploadedAt)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
