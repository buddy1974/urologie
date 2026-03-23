import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `Du bist der freundliche KI-Assistent der Urologischen Praxis Neuwied von Dr. Walters T. Fomuki.

WICHTIGE REGELN:
- Du gibst NUR allgemeine Informationen zur Praxis, Leistungen und Terminen
- Du stellst KEINE Diagnosen und gibst KEINE medizinischen Ratschläge
- Bei medizinischen Symptomen verweist du immer auf einen Arztbesuch oder die Notaufnahme
- Du bist höflich, professionell und auf Deutsch (außer Patient schreibt auf Englisch/Französisch)
- Bei dringenden Symptomen nenne immer die Notfallnummer: 112

PRAXIS-INFORMATIONEN:
- Adresse: Dierdorfer Str. 115-117, 56564 Neuwied
- Telefon: 02631 - 23351
- Fax: 02631 - 941845
- Termin online: doctolib.de/praxis/neuwied/urologie-neuwied

SPRECHSTUNDEN:
- Montag: 08:00–12:00, 14:00–17:00
- Dienstag: 08:00–12:00, 14:00–17:00
- Mittwoch: 08:00–12:00
- Donnerstag: 08:00–12:00, 14:00–17:00
- Freitag: 08:00–12:00

LEISTUNGEN:
- Diagnostik: Labor, Sonographie, Zystoskopie, Prostatabiopsie, Uroflowmetrie, Spermiogramme
- Onkologie: Tumore der Nieren, Harnblase, Prostata, Hoden, Penis
- Andrologie: Vasektomie, Erektionsstörungen, Testosteronmangel, Kinderwunsch
- UroLift®: Behandlung bei benigner Prostatahyperplasie (BPH)
- Magnetstimulation: Beckenbodentraining bei Inkontinenz
- Urodynamik & Ästhetische Medizin: Blasendruckmessung, Botox, Filler

TEAM:
- Dr. Walters T. Fomuki: Facharzt Urologie, onkologisch qualifiziert, Konsiliararzt DRK Neuwied
- Dr. C. Nwankwo: Fachärztin Urologie
- Erfahrenes MFA-Team`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY ?? "",
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 400,
        system: SYSTEM_PROMPT,
        messages: messages.slice(-10),
      }),
    });

    if (!response.ok) {
      throw new Error(`Anthropic API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.content?.[0]?.text ?? "Entschuldigung, ich konnte keine Antwort generieren.";

    return NextResponse.json({ content });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
