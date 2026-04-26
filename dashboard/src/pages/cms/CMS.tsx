import { useState, useEffect, useRef, useCallback } from "react";
import { Globe, FileText, BookOpen, Image, Save, Sparkles, Trash2, Plus, Eye, RefreshCw, Copy, Check, Upload, X, ChevronRight, Loader2, AlertCircle } from "lucide-react";
import { useAuthStore } from "@/store/auth";

const API_BASE = import.meta.env.VITE_API_URL ?? "https://urologie-backend.onrender.com";
const WEBHOOK_SECRET = import.meta.env.VITE_WEBHOOK_SECRET ?? "urologie-n8n-secret-2026";

// ── Types ─────────────────────────────────────────────────────────────────────

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

// ── Constants ─────────────────────────────────────────────────────────────────

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

const CATEGORIES = ["Allgemein", "PSA & Prostata", "Urologie News", "Praxis Update", "Gesundheitstipps"];

const STATUS_BADGE: Record<string, { label: string; color: string; bg: string }> = {
  draft:       { label: "Entwurf",        color: "#64748b", bg: "rgba(100,116,139,0.12)" },
  published:   { label: "Veröffentlicht", color: "#16a34a", bg: "rgba(22,163,74,0.12)" },
  scheduled:   { label: "Geplant",        color: "#2563eb", bg: "rgba(37,99,235,0.12)" },
  unpublished: { label: "Unveröffentlicht", color: "#ea580c", bg: "rgba(234,88,12,0.12)" },
};

const BLANK_BLOG: BlogForm = {
  title: "", category: "Allgemein", authorName: "Dr. Walters T. Fomuki",
  coverImageUrl: "", excerpt: "", content: "",
  metaTitle: "", metaDescription: "", metaKeywords: "",
  status: "draft", scheduledAt: "",
};

// ── Helpers ───────────────────────────────────────────────────────────────────

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

// ── Component ─────────────────────────────────────────────────────────────────

export default function CMS() {
  const { user } = useAuthStore();
  const [tab, setTab] = useState<"pages" | "blog" | "media">("pages");
  const [toast, setToast] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  const showToast = useCallback((type: "success" | "error", msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3500);
  }, []);

  // ── Pages state ──────────────────────────────────────────────────────────────

  const [pagesList, setPagesList] = useState<CMSPage[]>([]);
  const [pagesLoading, setPagesLoading] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState<string>("");
  const [pageDetail, setPageDetail] = useState<CMSPage | null>(null);
  const [pageDetailLoading, setPageDetailLoading] = useState(false);
  const [pageForm, setPageForm] = useState<PageForm>({ title: "", content: "{}", metaTitle: "", metaDescription: "", metaKeywords: "" });
  const [pageSaving, setPageSaving] = useState(false);
  const [pageAiLoading, setPageAiLoading] = useState(false);
  const [pageMetaLoading, setPageMetaLoading] = useState(false);

  async function loadPages() {
    setPagesLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/cms/pages`);
      if (!res.ok) throw new Error();
      const data: CMSPage[] = await res.json();
      setPagesList(data);
      if (data.length && !selectedSlug) {
        const first = data.find((p) => p.slug === "home") ?? data[0];
        selectPage(first.slug, data);
      }
    } catch {
      showToast("error", "Seiten konnten nicht geladen werden.");
    } finally {
      setPagesLoading(false);
    }
  }

  function selectPage(slug: string, list?: CMSPage[]) {
    setSelectedSlug(slug);
    const source = list ?? pagesList;
    const page = source.find((p) => p.slug === slug);
    if (page) applyPageToForm(page);
  }

  function applyPageToForm(page: CMSPage) {
    setPageDetail(page);
    setPageForm({
      title: page.title,
      content: JSON.stringify(page.content, null, 2),
      metaTitle: page.metaTitle ?? "",
      metaDescription: page.metaDescription ?? "",
      metaKeywords: page.metaKeywords ?? "",
    });
  }

  async function savePage() {
    if (!selectedSlug) return;
    let parsedContent: Record<string, unknown>;
    try {
      parsedContent = JSON.parse(pageForm.content);
    } catch {
      showToast("error", "Inhalt ist kein gültiges JSON.");
      return;
    }
    setPageSaving(true);
    try {
      const res = await fetch(`${API_BASE}/api/cms/pages/${selectedSlug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...pageForm, content: parsedContent, updatedBy: user?.name }),
      });
      if (!res.ok) throw new Error();
      const updated: CMSPage = await res.json();
      setPageDetail(updated);
      setPagesList((prev) => prev.map((p) => (p.slug === selectedSlug ? updated : p)));
      showToast("success", "Seite gespeichert.");
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
      const data = await res.json();
      setPageForm((f) => ({ ...f, content: data.result ?? f.content }));
      showToast("success", "KI-Verbesserung angewendet.");
    } catch {
      showToast("error", "KI-Verbesserung fehlgeschlagen.");
    } finally {
      setPageAiLoading(false);
    }
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
      const data = await res.json();
      if (data.metaTitle) setPageForm((f) => ({ ...f, metaTitle: data.metaTitle ?? f.metaTitle, metaDescription: data.metaDescription ?? f.metaDescription, metaKeywords: data.metaKeywords ?? f.metaKeywords }));
      showToast("success", "Meta-Felder generiert.");
    } catch {
      showToast("error", "Meta-Generierung fehlgeschlagen.");
    } finally {
      setPageMetaLoading(false);
    }
  }

  // ── Blog state ───────────────────────────────────────────────────────────────

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [blogLoading, setBlogLoading] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [blogForm, setBlogForm] = useState<BlogForm>(BLANK_BLOG);
  const [blogSaving, setBlogSaving] = useState(false);
  const [blogAiLoading, setBlogAiLoading] = useState(false);
  const [blogMetaLoading, setBlogMetaLoading] = useState(false);
  const [coverUploadLoading, setCoverUploadLoading] = useState(false);
  const coverInputRef = useRef<HTMLInputElement>(null);

  async function loadPosts() {
    setBlogLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/cms/blog`);
      if (!res.ok) throw new Error();
      setPosts(await res.json());
    } catch {
      showToast("error", "Blog-Artikel konnten nicht geladen werden.");
    } finally {
      setBlogLoading(false);
    }
  }

  function openNewPost() {
    setEditingId(null);
    setBlogForm(BLANK_BLOG);
    setShowEditor(true);
  }

  function openEditPost(post: BlogPost) {
    setEditingId(post.id);
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
      showToast("success", editingId ? "Artikel aktualisiert." : "Artikel erstellt.");
      setShowEditor(false);
      loadPosts();
    } catch {
      showToast("error", "Fehler beim Speichern.");
    } finally {
      setBlogSaving(false);
    }
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
      const res = await fetch(`${API_BASE}/api/cms/blog/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      showToast("success", "Artikel gelöscht.");
      setPosts((prev) => prev.filter((p) => p.id !== id));
      if (showEditor && editingId === id) setShowEditor(false);
    } catch {
      showToast("error", "Löschen fehlgeschlagen.");
    }
  }

  async function aiGenerateArticle() {
    if (!blogForm.content.trim()) return;
    setBlogAiLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/cms/ai-enhance`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-webhook-secret": WEBHOOK_SECRET },
        body: JSON.stringify({ type: "blog", rawText: blogForm.content }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setBlogForm((f) => ({ ...f, content: data.result ?? f.content }));
      showToast("success", "KI-Artikel generiert.");
    } catch {
      showToast("error", "KI-Generierung fehlgeschlagen.");
    } finally {
      setBlogAiLoading(false);
    }
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
      const data = await res.json();
      if (data.metaTitle) setBlogForm((f) => ({ ...f, metaTitle: data.metaTitle ?? f.metaTitle, metaDescription: data.metaDescription ?? f.metaDescription, metaKeywords: data.metaKeywords ?? f.metaKeywords }));
      showToast("success", "Meta-Felder generiert.");
    } catch {
      showToast("error", "Meta-Generierung fehlgeschlagen.");
    } finally {
      setBlogMetaLoading(false);
    }
  }

  async function uploadCoverImage(file: File) {
    setCoverUploadLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch(`${API_BASE}/api/cms/media/upload`, { method: "POST", body: formData });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setBlogForm((f) => ({ ...f, coverImageUrl: data.url }));
      showToast("success", "Bild hochgeladen.");
    } catch {
      showToast("error", "Upload fehlgeschlagen.");
    } finally {
      setCoverUploadLoading(false);
    }
  }

  // ── Media state ──────────────────────────────────────────────────────────────

  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function loadMedia() {
    setMediaLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/cms/media`);
      if (!res.ok) throw new Error();
      setMediaItems(await res.json());
    } catch {
      showToast("error", "Medien konnten nicht geladen werden.");
    } finally {
      setMediaLoading(false);
    }
  }

  async function uploadMedia(file: File) {
    if (!file.type.startsWith("image/")) { showToast("error", "Nur Bilder erlaubt."); return; }
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch(`${API_BASE}/api/cms/media/upload`, { method: "POST", body: formData });
      if (!res.ok) throw new Error();
      const item: MediaItem = await res.json();
      setMediaItems((prev) => [item, ...prev]);
      showToast("success", "Bild hochgeladen.");
    } catch {
      showToast("error", "Upload fehlgeschlagen.");
    } finally {
      setUploading(false);
    }
  }

  async function deleteMedia(id: string) {
    if (!confirm("Bild wirklich löschen?")) return;
    try {
      const res = await fetch(`${API_BASE}/api/cms/media/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setMediaItems((prev) => prev.filter((m) => m.id !== id));
      showToast("success", "Bild gelöscht.");
    } catch {
      showToast("error", "Löschen fehlgeschlagen.");
    }
  }

  async function copyUrl(item: MediaItem) {
    await navigator.clipboard.writeText(item.url);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  // ── Load on tab change ────────────────────────────────────────────────────────

  useEffect(() => {
    if (tab === "pages") loadPages();
    if (tab === "blog") loadPosts();
    if (tab === "media") loadMedia();
  }, [tab]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Input helpers ─────────────────────────────────────────────────────────────

  const inputCls = "w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#1E9FD4] transition-colors";
  const btnPrimary = "inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50";
  const btnSecondary = "inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-50";

  // ── Render ────────────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col h-full bg-slate-50">

      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-2.5 px-5 py-3.5 rounded-2xl shadow-xl text-sm font-semibold transition-all ${toast.type === "success" ? "bg-emerald-600 text-white" : "bg-red-500 text-white"}`}>
          {toast.type === "success" ? <Check size={16} /> : <AlertCircle size={16} />}
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "rgba(30,159,212,0.1)" }}>
            <Globe size={20} style={{ color: "#1E9FD4" }} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900">Website CMS</h1>
            <p className="text-xs text-slate-400">Seiten, Blog und Medien verwalten</p>
          </div>
        </div>
        {/* Tab switcher */}
        <div className="flex items-center gap-1 bg-slate-100 rounded-xl p-1">
          {[
            { id: "pages" as const, label: "Seiten", icon: FileText },
            { id: "blog" as const, label: "Blog", icon: BookOpen },
            { id: "media" as const, label: "Medien", icon: Image },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${tab === id ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── TAB 1: SEITEN ─────────────────────────────────────────────────────── */}
      {tab === "pages" && (
        <div className="flex flex-1 overflow-hidden">
          {/* Page list sidebar */}
          <div className="w-56 flex-shrink-0 bg-white border-r border-slate-100 overflow-y-auto">
            {pagesLoading ? (
              <div className="flex items-center justify-center py-12"><Loader2 size={20} className="animate-spin text-slate-400" /></div>
            ) : (
              <nav className="py-3 px-2 space-y-0.5">
                {pagesList
                  .sort((a, b) => (Object.keys(PAGE_LABELS).indexOf(a.slug) - Object.keys(PAGE_LABELS).indexOf(b.slug)))
                  .map((page) => (
                    <button
                      key={page.slug}
                      onClick={() => selectPage(page.slug)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all text-left ${selectedSlug === page.slug ? "font-semibold text-white" : "text-slate-600 hover:bg-slate-50"}`}
                      style={selectedSlug === page.slug ? { backgroundColor: "#1E9FD4" } : {}}
                    >
                      <span className="truncate">{PAGE_LABELS[page.slug] ?? page.slug}</span>
                      {selectedSlug === page.slug && <ChevronRight size={13} />}
                    </button>
                  ))}
              </nav>
            )}
          </div>

          {/* Page editor */}
          <div className="flex-1 overflow-y-auto p-6">
            {!selectedSlug ? (
              <div className="flex items-center justify-center h-full text-slate-400 text-sm">Seite auswählen</div>
            ) : pageDetailLoading ? (
              <div className="flex items-center justify-center h-full"><Loader2 size={24} className="animate-spin text-slate-400" /></div>
            ) : (
              <div className="max-w-2xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-slate-900">{PAGE_LABELS[selectedSlug] ?? selectedSlug}</h2>
                  {pageDetail?.updatedAt && (
                    <span className="text-xs text-slate-400">Aktualisiert: {fmt(pageDetail.updatedAt)}{pageDetail.updatedBy ? ` · ${pageDetail.updatedBy}` : ""}</span>
                  )}
                </div>

                {/* Seitentitel */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Seitentitel</label>
                  <input type="text" className={inputCls} value={pageForm.title} onChange={(e) => setPageForm((f) => ({ ...f, title: e.target.value }))} />
                </div>

                {/* Inhalt */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Seiteninhalt (JSON)</label>
                    <button onClick={aiEnhancePage} disabled={pageAiLoading} className={btnSecondary + " text-xs py-1.5"} style={{ color: "#7c3aed" }}>
                      {pageAiLoading ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
                      KI verbessern
                    </button>
                  </div>
                  <textarea
                    rows={10}
                    className={inputCls + " resize-y font-mono text-xs"}
                    value={pageForm.content}
                    onChange={(e) => setPageForm((f) => ({ ...f, content: e.target.value }))}
                  />
                  <p className="text-xs text-slate-400 mt-1">JSON-Objekt mit allen Seitentexten. Nur Werte (nicht Schlüssel) bearbeiten.</p>
                </div>

                {/* Meta */}
                <div className="bg-white rounded-2xl border border-slate-100 p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-slate-700">SEO & Meta</h3>
                    <button onClick={generatePageMeta} disabled={pageMetaLoading} className={btnSecondary + " text-xs py-1.5"} style={{ color: "#1E9FD4" }}>
                      {pageMetaLoading ? <Loader2 size={12} className="animate-spin" /> : <RefreshCw size={12} />}
                      Meta generieren
                    </button>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Meta-Titel</label>
                      <span className={`text-xs ${pageForm.metaTitle.length > 60 ? "text-red-500" : "text-slate-400"}`}>{pageForm.metaTitle.length}/60</span>
                    </div>
                    <input type="text" maxLength={70} className={inputCls} value={pageForm.metaTitle} onChange={(e) => setPageForm((f) => ({ ...f, metaTitle: e.target.value }))} />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Meta-Beschreibung</label>
                      <span className={`text-xs ${pageForm.metaDescription.length > 160 ? "text-red-500" : "text-slate-400"}`}>{pageForm.metaDescription.length}/160</span>
                    </div>
                    <textarea rows={3} maxLength={180} className={inputCls + " resize-none"} value={pageForm.metaDescription} onChange={(e) => setPageForm((f) => ({ ...f, metaDescription: e.target.value }))} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Keywords (kommagetrennt)</label>
                    <input type="text" className={inputCls} value={pageForm.metaKeywords} onChange={(e) => setPageForm((f) => ({ ...f, metaKeywords: e.target.value }))} />
                  </div>
                </div>

                <button onClick={savePage} disabled={pageSaving} className={`${btnPrimary} w-full justify-center py-3`} style={{ backgroundColor: "#1E9FD4" }}>
                  {pageSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                  {pageSaving ? "Wird gespeichert…" : "Seite speichern"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── TAB 2: BLOG ───────────────────────────────────────────────────────── */}
      {tab === "blog" && (
        <div className="flex-1 overflow-hidden flex flex-col">
          {showEditor ? (
            /* Blog editor panel */
            <div className="flex-1 overflow-y-auto p-6">
              <div className="max-w-2xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-slate-900">{editingId ? "Artikel bearbeiten" : "Neuer Artikel"}</h2>
                  <button onClick={() => setShowEditor(false)} className="p-2 rounded-xl hover:bg-slate-100 transition-colors"><X size={18} className="text-slate-400" /></button>
                </div>

                <div className="space-y-5">
                  {/* Titel */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Titel *</label>
                    <input type="text" className={inputCls} placeholder="Artikeltitel…" value={blogForm.title} onChange={(e) => setBlogForm((f) => ({ ...f, title: e.target.value }))} />
                  </div>

                  {/* Kategorie + Autor */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Kategorie</label>
                      <select className={inputCls + " bg-white"} value={blogForm.category} onChange={(e) => setBlogForm((f) => ({ ...f, category: e.target.value }))}>
                        {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Autor</label>
                      <input type="text" className={inputCls} value={blogForm.authorName} onChange={(e) => setBlogForm((f) => ({ ...f, authorName: e.target.value }))} />
                    </div>
                  </div>

                  {/* Cover Bild */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Cover-Bild</label>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <input type="file" accept="image/*" className="hidden" ref={coverInputRef} onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadCoverImage(f); }} />
                        <button onClick={() => coverInputRef.current?.click()} disabled={coverUploadLoading} className={btnSecondary + " w-full justify-center py-2.5"}>
                          {coverUploadLoading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                          Datei hochladen
                        </button>
                      </div>
                      <input type="url" className={inputCls} placeholder="https://…" value={blogForm.coverImageUrl} onChange={(e) => setBlogForm((f) => ({ ...f, coverImageUrl: e.target.value }))} />
                    </div>
                    {blogForm.coverImageUrl && (
                      <img src={blogForm.coverImageUrl} alt="Cover" className="mt-2 h-24 w-full object-cover rounded-xl border border-slate-100" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                    )}
                  </div>

                  {/* Excerpt */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Kurzbeschreibung</label>
                      <span className={`text-xs ${blogForm.excerpt.length > 200 ? "text-red-500" : "text-slate-400"}`}>{blogForm.excerpt.length}/200</span>
                    </div>
                    <textarea rows={2} maxLength={220} className={inputCls + " resize-none"} placeholder="Kurze Zusammenfassung für Übersichten…" value={blogForm.excerpt} onChange={(e) => setBlogForm((f) => ({ ...f, excerpt: e.target.value }))} />
                  </div>

                  {/* Inhalt */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Inhalt *</label>
                      <div className="flex gap-2">
                        <button onClick={aiGenerateArticle} disabled={blogAiLoading} className={btnSecondary + " text-xs py-1.5"} style={{ color: "#7c3aed" }}>
                          {blogAiLoading ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
                          KI Artikel generieren
                        </button>
                        <button onClick={generateBlogMeta} disabled={blogMetaLoading} className={btnSecondary + " text-xs py-1.5"} style={{ color: "#1E9FD4" }}>
                          {blogMetaLoading ? <Loader2 size={12} className="animate-spin" /> : <RefreshCw size={12} />}
                          Meta generieren
                        </button>
                      </div>
                    </div>
                    <textarea rows={14} className={inputCls + " resize-y"} placeholder="Artikel-Inhalt oder Stichpunkte für KI-Generierung…" value={blogForm.content} onChange={(e) => setBlogForm((f) => ({ ...f, content: e.target.value }))} />
                  </div>

                  {/* Meta */}
                  <div className="bg-white rounded-2xl border border-slate-100 p-5 space-y-4">
                    <h3 className="text-sm font-semibold text-slate-700">SEO & Meta</h3>
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Meta-Titel</label>
                        <span className={`text-xs ${blogForm.metaTitle.length > 60 ? "text-red-500" : "text-slate-400"}`}>{blogForm.metaTitle.length}/60</span>
                      </div>
                      <input type="text" maxLength={70} className={inputCls} value={blogForm.metaTitle} onChange={(e) => setBlogForm((f) => ({ ...f, metaTitle: e.target.value }))} />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Meta-Beschreibung</label>
                        <span className={`text-xs ${blogForm.metaDescription.length > 160 ? "text-red-500" : "text-slate-400"}`}>{blogForm.metaDescription.length}/160</span>
                      </div>
                      <textarea rows={2} maxLength={180} className={inputCls + " resize-none"} value={blogForm.metaDescription} onChange={(e) => setBlogForm((f) => ({ ...f, metaDescription: e.target.value }))} />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Keywords</label>
                      <input type="text" className={inputCls} value={blogForm.metaKeywords} onChange={(e) => setBlogForm((f) => ({ ...f, metaKeywords: e.target.value }))} />
                    </div>
                  </div>

                  {/* Status */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Status</label>
                      <select className={inputCls + " bg-white"} value={blogForm.status} onChange={(e) => setBlogForm((f) => ({ ...f, status: e.target.value }))}>
                        <option value="draft">Entwurf</option>
                        <option value="published">Veröffentlicht</option>
                        <option value="scheduled">Geplant</option>
                        <option value="unpublished">Unveröffentlicht</option>
                      </select>
                    </div>
                    {blogForm.status === "scheduled" && (
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Veröffentlichungsdatum</label>
                        <input type="datetime-local" className={inputCls} value={blogForm.scheduledAt} onChange={(e) => setBlogForm((f) => ({ ...f, scheduledAt: e.target.value }))} />
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 pt-2">
                    <button onClick={savePost} disabled={blogSaving} className={`${btnPrimary} flex-1 justify-center py-3`} style={{ backgroundColor: "#1E9FD4" }}>
                      {blogSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                      {blogSaving ? "Wird gespeichert…" : "Speichern"}
                    </button>
                    <button
                      onClick={() => window.open(`https://urologie-neuwied.de/blog`, "_blank")}
                      className={btnSecondary}
                    >
                      <Eye size={15} />
                      Vorschau
                    </button>
                    {editingId && (
                      <button onClick={() => deletePost(editingId)} className={btnSecondary + " !text-red-500 !border-red-200"}>
                        <Trash2 size={15} />
                        Löschen
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Blog post list */
            <div className="flex-1 overflow-y-auto p-6">
              <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-slate-900">Blog-Artikel</h2>
                  <button onClick={openNewPost} className={btnPrimary} style={{ backgroundColor: "#1E9FD4" }}>
                    <Plus size={16} />
                    Neuer Artikel
                  </button>
                </div>

                {blogLoading ? (
                  <div className="flex items-center justify-center py-16"><Loader2 size={24} className="animate-spin text-slate-400" /></div>
                ) : posts.length === 0 ? (
                  <div className="text-center py-16 text-slate-400">
                    <BookOpen size={40} className="mx-auto mb-3 opacity-30" />
                    <p>Noch keine Artikel vorhanden.</p>
                    <button onClick={openNewPost} className="mt-4 text-sm font-semibold" style={{ color: "#1E9FD4" }}>Ersten Artikel erstellen →</button>
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-slate-100">
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
                                <div className="font-semibold text-slate-900 truncate max-w-[240px]">{post.title}</div>
                                {post.excerpt && <div className="text-xs text-slate-400 truncate max-w-[240px] mt-0.5">{post.excerpt}</div>}
                              </td>
                              <td className="px-4 py-3.5 text-slate-500 hidden md:table-cell">{post.category ?? "Allgemein"}</td>
                              <td className="px-4 py-3.5">
                                <span className="px-2.5 py-1 rounded-lg text-xs font-semibold" style={{ color: badge.color, backgroundColor: badge.bg }}>{badge.label}</span>
                              </td>
                              <td className="px-4 py-3.5 text-slate-400 text-xs hidden lg:table-cell">{fmt(post.createdAt)}</td>
                              <td className="px-5 py-3.5">
                                <div className="flex items-center justify-end gap-1.5">
                                  <button onClick={() => openEditPost(post)} className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors text-slate-500 hover:text-slate-700" title="Bearbeiten">
                                    <FileText size={14} />
                                  </button>
                                  <button
                                    onClick={() => togglePublish(post)}
                                    className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors text-xs font-medium px-2.5 py-1"
                                    style={{ color: post.status === "published" ? "#ea580c" : "#16a34a" }}
                                    title={post.status === "published" ? "Unveröffentlichen" : "Veröffentlichen"}
                                  >
                                    {post.status === "published" ? "Dep." : "Pub."}
                                  </button>
                                  <button onClick={() => deletePost(post.id)} className="p-1.5 rounded-lg hover:bg-red-50 transition-colors text-slate-400 hover:text-red-500" title="Löschen">
                                    <Trash2 size={14} />
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

      {/* ── TAB 3: MEDIEN ─────────────────────────────────────────────────────── */}
      {tab === "media" && (
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Medienbibliothek</h2>

            {/* Upload zone */}
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; if (f) uploadMedia(f); }}
              className={`cursor-pointer border-2 border-dashed rounded-2xl p-10 text-center mb-6 transition-all ${dragOver ? "border-[#1E9FD4] bg-blue-50" : "border-slate-200 hover:border-slate-300 bg-white"}`}
            >
              <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadMedia(f); if (e.target) e.target.value = ""; }} />
              {uploading ? (
                <div className="flex flex-col items-center gap-2 text-[#1E9FD4]">
                  <Loader2 size={28} className="animate-spin" />
                  <p className="text-sm font-medium">Wird hochgeladen…</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 text-slate-400">
                  <Upload size={28} />
                  <p className="text-sm font-medium text-slate-600">Bild hierher ziehen oder klicken zum Auswählen</p>
                  <p className="text-xs">PNG, JPG, WEBP · max. 10 MB</p>
                </div>
              )}
            </div>

            {/* Media grid */}
            {mediaLoading ? (
              <div className="flex items-center justify-center py-16"><Loader2 size={24} className="animate-spin text-slate-400" /></div>
            ) : mediaItems.length === 0 ? (
              <div className="text-center py-16 text-slate-400">
                <Image size={40} className="mx-auto mb-3 opacity-30" />
                <p>Noch keine Bilder hochgeladen.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {mediaItems.map((item) => (
                  <div key={item.id} className="group relative bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-md transition-all">
                    <div className="aspect-square bg-slate-50 relative overflow-hidden">
                      <img src={item.url} alt={item.filename} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                      {/* Hover actions */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button onClick={() => copyUrl(item)} className="p-2 bg-white rounded-lg shadow-sm hover:scale-105 transition-transform" title="URL kopieren">
                          {copiedId === item.id ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} className="text-slate-700" />}
                        </button>
                        <button onClick={() => deleteMedia(item.id)} className="p-2 bg-white rounded-lg shadow-sm hover:scale-105 transition-transform" title="Löschen">
                          <Trash2 size={14} className="text-red-500" />
                        </button>
                      </div>
                    </div>
                    <div className="px-2.5 py-2">
                      <p className="text-xs text-slate-600 truncate font-medium">{item.filename}</p>
                      {item.size && <p className="text-xs text-slate-400">{fmtSize(item.size)}</p>}
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
