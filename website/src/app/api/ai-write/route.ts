import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT =
  "Du bist ein medizinischer Texter für eine urologische Praxis in Deutschland. Verbessere und vervollständige den folgenden Text professionell auf Deutsch.";

export async function POST(req: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "KI-Dienst nicht konfiguriert" },
      { status: 503 }
    );
  }

  const body = await req.json().catch(() => null);
  const { input } = body ?? {};

  if (!input || typeof input !== "string" || input.trim() === "") {
    return NextResponse.json(
      { error: "Pflichtfeld 'input' fehlt oder ist leer" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: [{ role: "user", content: input }],
      }),
    });

    if (!response.ok) {
      throw new Error(`Anthropic API error: ${response.status}`);
    }

    const data = await response.json();
    const text: string = data.content?.[0]?.text ?? "";

    return NextResponse.json({ text });
  } catch (error) {
    console.error("ai-write error:", error);
    return NextResponse.json(
      { error: "Fehler beim Verbessern des Textes" },
      { status: 500 }
    );
  }
}
