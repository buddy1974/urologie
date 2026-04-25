import { FastifyInstance } from "fastify";
import { db } from "../db";
import { pages, blogPosts, media } from "../db/schema";
import { eq, desc } from "drizzle-orm";
import Anthropic from "@anthropic-ai/sdk";
import fs from "fs";
import path from "path";

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

const SYSTEM_PROMPTS: Record<string, string> = {
  blog: "Du bist ein medizinischer Redakteur für eine Urologie-Praxis in Deutschland. Schreibe aus dem folgenden Rohentwurf einen vollständigen, professionellen Blogartikel auf Deutsch. Strukturiere ihn mit Einleitung, Hauptteil und Fazit. Verwende medizinisch korrekte Sprache, die dennoch für Patienten verständlich ist.",
  page: "Du bist ein medizinischer Texter für eine Urologie-Praxis. Verbessere den folgenden Text — korrigiere Sprache, mache ihn professioneller und patientenfreundlicher. Behalte alle medizinischen Fakten bei.",
  meta: 'Generiere für den folgenden Medizintext: 1) einen SEO-optimierten Metatitel (max 60 Zeichen), 2) eine Metabeschreibung (max 160 Zeichen), 3) 5-8 relevante Keywords kommagetrennt. Antworte NUR mit diesem JSON ohne weitere Erklärung: {"metaTitle":"...","metaDescription":"...","metaKeywords":"..."}',
};

interface PageBody {
  title?: string;
  content?: Record<string, unknown>;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  updatedBy?: string;
}

interface BlogPostBody {
  title: string;
  content: string;
  excerpt?: string;
  coverImage?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  status?: string;
  scheduledAt?: string;
  category?: string;
  authorName?: string;
}

interface BlogPostUpdate {
  title?: string;
  content?: string;
  excerpt?: string;
  coverImage?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  status?: string;
  scheduledAt?: string;
  publishedAt?: string;
  category?: string;
  authorName?: string;
}

export async function cmsRoutes(fastify: FastifyInstance) {
  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  // Ensure uploads directory exists
  const uploadsDir = path.join(__dirname, "..", "uploads");
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  // ── PAGES ────────────────────────────────────────────────────────────────

  fastify.get("/api/cms/pages", async () => {
    return await db.select().from(pages);
  });

  fastify.get("/api/cms/pages/:slug", async (request, reply) => {
    const { slug } = request.params as { slug: string };
    const [page] = await db.select().from(pages).where(eq(pages.slug, slug));
    if (!page) return reply.status(404).send({ error: "Page not found" });
    return page;
  });

  fastify.put("/api/cms/pages/:slug", async (request) => {
    const { slug } = request.params as { slug: string };
    const body = request.body as PageBody;

    const [existing] = await db.select().from(pages).where(eq(pages.slug, slug));

    if (existing) {
      const updates: Partial<PageBody> & { updatedAt: Date } = { updatedAt: new Date() };
      if (body.title !== undefined) updates.title = body.title;
      if (body.content !== undefined) updates.content = body.content;
      if (body.metaTitle !== undefined) updates.metaTitle = body.metaTitle;
      if (body.metaDescription !== undefined) updates.metaDescription = body.metaDescription;
      if (body.metaKeywords !== undefined) updates.metaKeywords = body.metaKeywords;
      if (body.updatedBy !== undefined) updates.updatedBy = body.updatedBy;

      const [updated] = await db.update(pages)
        .set(updates)
        .where(eq(pages.slug, slug))
        .returning();
      return updated;
    }

    const [created] = await db.insert(pages)
      .values({
        slug,
        title: body.title ?? slug,
        content: body.content ?? {},
        metaTitle: body.metaTitle,
        metaDescription: body.metaDescription,
        metaKeywords: body.metaKeywords,
        updatedBy: body.updatedBy,
      })
      .returning();
    return created;
  });

  // ── BLOG ─────────────────────────────────────────────────────────────────

  fastify.get("/api/cms/blog", async (request) => {
    const { status } = request.query as { status?: string };
    if (status) {
      return await db.select().from(blogPosts)
        .where(eq(blogPosts.status, status))
        .orderBy(desc(blogPosts.createdAt));
    }
    return await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
  });

  fastify.get("/api/cms/blog/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    if (!post) return reply.status(404).send({ error: "Post not found" });
    return post;
  });

  fastify.post<{ Body: BlogPostBody }>("/api/cms/blog", async (request, reply) => {
    const body = request.body;
    const slug = generateSlug(body.title);

    const [post] = await db.insert(blogPosts)
      .values({
        title: body.title,
        slug,
        content: body.content,
        excerpt: body.excerpt,
        coverImage: body.coverImage,
        metaTitle: body.metaTitle,
        metaDescription: body.metaDescription,
        metaKeywords: body.metaKeywords,
        status: body.status ?? "draft",
        scheduledAt: body.scheduledAt ? new Date(body.scheduledAt) : undefined,
        category: body.category,
        authorName: body.authorName,
      })
      .returning();
    return reply.status(201).send(post);
  });

  fastify.put<{ Params: { id: string }; Body: BlogPostUpdate }>("/api/cms/blog/:id", async (request, reply) => {
    const { id } = request.params;
    const body = request.body;

    const [existing] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    if (!existing) return reply.status(404).send({ error: "Post not found" });

    const updates: Record<string, unknown> = { updatedAt: new Date() };
    if (body.title !== undefined) updates.title = body.title;
    if (body.content !== undefined) updates.content = body.content;
    if (body.excerpt !== undefined) updates.excerpt = body.excerpt;
    if (body.coverImage !== undefined) updates.coverImage = body.coverImage;
    if (body.metaTitle !== undefined) updates.metaTitle = body.metaTitle;
    if (body.metaDescription !== undefined) updates.metaDescription = body.metaDescription;
    if (body.metaKeywords !== undefined) updates.metaKeywords = body.metaKeywords;
    if (body.status !== undefined) {
      updates.status = body.status;
      if (body.status === "published" && !existing.publishedAt) {
        updates.publishedAt = new Date();
      }
    }
    if (body.scheduledAt !== undefined) updates.scheduledAt = new Date(body.scheduledAt);
    if (body.category !== undefined) updates.category = body.category;
    if (body.authorName !== undefined) updates.authorName = body.authorName;

    const [updated] = await db.update(blogPosts)
      .set(updates)
      .where(eq(blogPosts.id, id))
      .returning();
    return updated;
  });

  fastify.delete("/api/cms/blog/:id", async (request) => {
    const { id } = request.params as { id: string };
    await db.delete(blogPosts).where(eq(blogPosts.id, id));
    return { success: true };
  });

  // ── AI ENHANCE ───────────────────────────────────────────────────────────

  fastify.post<{ Body: { type: string; rawText: string; context?: string } }>(
    "/api/cms/ai-enhance",
    async (request, reply) => {
      const secret = request.headers["x-webhook-secret"];
      if (!secret || secret !== process.env.N8N_WEBHOOK_SECRET) {
        return reply.status(401).send({ error: "Unauthorized" });
      }

      const { type, rawText, context } = request.body;
      const systemPrompt = SYSTEM_PROMPTS[type];
      if (!systemPrompt) return reply.status(400).send({ error: `Invalid type: ${type}` });

      const userContent = context ? `Context: ${context}\n\n${rawText}` : rawText;

      const message = await anthropic.messages.create({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 4096,
        system: systemPrompt,
        messages: [{ role: "user", content: userContent }],
      });

      const result = (message.content[0] as { type: string; text: string })?.text ?? "";

      if (type === "meta") {
        try {
          const jsonMatch = result.match(/\{[\s\S]*\}/);
          if (jsonMatch) return JSON.parse(jsonMatch[0]);
        } catch {
          // fallthrough to { result }
        }
      }

      return { result };
    }
  );

  // ── MEDIA ────────────────────────────────────────────────────────────────

  fastify.post("/api/cms/media/upload", async (request, reply) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = await (request as any).file();
    if (!data) return reply.status(400).send({ error: "No file provided" });

    const buf: Buffer = await data.toBuffer();
    const ext = path.extname(data.filename as string) || ".bin";
    const safeName = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;
    const filepath = path.join(uploadsDir, safeName);

    await fs.promises.writeFile(filepath, buf);

    const baseUrl = (process.env.BACKEND_URL ?? `http://localhost:${process.env.PORT ?? 3002}`).replace(/\/$/, "");
    const url = `${baseUrl}/uploads/${safeName}`;

    const [item] = await db.insert(media)
      .values({
        filename: data.filename as string,
        url,
        mimeType: data.mimetype as string,
        size: buf.length,
        uploadedBy: (request.query as { user?: string }).user,
      })
      .returning();

    return reply.status(201).send(item);
  });

  fastify.get("/api/cms/media", async () => {
    return await db.select().from(media).orderBy(desc(media.uploadedAt));
  });

  fastify.delete("/api/cms/media/:id", async (request) => {
    const { id } = request.params as { id: string };
    const [item] = await db.select().from(media).where(eq(media.id, id));

    if (item?.url) {
      const filename = item.url.split("/uploads/").pop();
      if (filename) {
        const filepath = path.join(uploadsDir, filename);
        if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
      }
    }

    await db.delete(media).where(eq(media.id, id));
    return { success: true };
  });
}
