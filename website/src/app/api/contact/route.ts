import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// In-memory rate limiter: 3 requests per 60 s per IP
const ipRequests = new Map<string, { count: number; reset: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = ipRequests.get(ip);
  if (!entry || now > entry.reset) {
    ipRequests.set(ip, { count: 1, reset: now + 60_000 });
    return true;
  }
  if (entry.count >= 3) return false;
  entry.count++;
  return true;
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Zu viele Anfragen. Bitte warten Sie eine Minute." },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  const { anrede, vorname, nachname, telefon, email, nachricht } = body as {
    anrede?: string;
    vorname?: string;
    nachname?: string;
    telefon?: string;
    email?: string;
    nachricht?: string;
  };

  // Required field validation
  const missing: string[] = [];
  if (!vorname?.trim()) missing.push("Vorname");
  if (!nachname?.trim()) missing.push("Nachname");
  if (!telefon?.trim()) missing.push("Telefon");
  if (!email?.trim()) missing.push("E-Mail");
  if (!nachricht?.trim()) missing.push("Nachricht");

  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Pflichtfelder fehlen: ${missing.join(", ")}` },
      { status: 422 }
    );
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email!.trim())) {
    return NextResponse.json(
      { error: "Bitte geben Sie eine gültige E-Mail-Adresse ein." },
      { status: 422 }
    );
  }

  // Length validation
  if (nachricht!.trim().length > 2000) {
    return NextResponse.json(
      { error: "Die Nachricht darf maximal 2000 Zeichen enthalten." },
      { status: 422 }
    );
  }

  const anredeLabel = anrede && anrede !== "keine" ? `${anrede} ` : "";
  const fullName = `${anredeLabel}${vorname!.trim()} ${nachname!.trim()}`;

  const htmlBody = `
<!DOCTYPE html>
<html lang="de">
<head><meta charset="UTF-8"></head>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
  <div style="border-top: 4px solid #1e6ab4; padding-top: 20px; margin-bottom: 24px;">
    <h2 style="margin: 0; color: #1e6ab4; font-size: 20px;">Neue Kontaktanfrage</h2>
    <p style="color: #666; font-size: 13px; margin: 4px 0 0;">Über das Kontaktformular auf urologie-neuwied.de</p>
  </div>

  <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
    <tr>
      <td style="padding: 10px; background: #f5f5f5; font-weight: bold; width: 140px; border-bottom: 1px solid #e0e0e0;">Name</td>
      <td style="padding: 10px; border-bottom: 1px solid #e0e0e0;">${fullName}</td>
    </tr>
    <tr>
      <td style="padding: 10px; background: #f5f5f5; font-weight: bold; border-bottom: 1px solid #e0e0e0;">Telefon</td>
      <td style="padding: 10px; border-bottom: 1px solid #e0e0e0;"><a href="tel:${telefon!.trim()}" style="color: #1e6ab4;">${telefon!.trim()}</a></td>
    </tr>
    <tr>
      <td style="padding: 10px; background: #f5f5f5; font-weight: bold; border-bottom: 1px solid #e0e0e0;">E-Mail</td>
      <td style="padding: 10px; border-bottom: 1px solid #e0e0e0;"><a href="mailto:${email!.trim()}" style="color: #1e6ab4;">${email!.trim()}</a></td>
    </tr>
  </table>

  <div style="background: #f9f9f9; border-left: 3px solid #1e6ab4; padding: 16px; border-radius: 4px; margin-bottom: 24px;">
    <p style="font-weight: bold; margin: 0 0 8px; color: #555; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Nachricht</p>
    <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${nachricht!.trim().replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
  </div>

  <p style="font-size: 12px; color: #999; border-top: 1px solid #eee; padding-top: 12px;">
    Diese E-Mail wurde automatisch über das Kontaktformular der Urologischen Praxis Neuwied gesendet.
  </p>
</body>
</html>`;

  try {
    await resend.emails.send({
      from: "Urologische Praxis Neuwied <noreply@urologie-neuwied.de>",
      to: ["info@urologie-neuwied.de"],
      replyTo: email!.trim(),
      subject: `Kontaktanfrage: ${fullName}`,
      html: htmlBody,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[contact] Resend error:", err);
    return NextResponse.json(
      {
        error:
          "Die Nachricht konnte nicht gesendet werden. Bitte rufen Sie uns direkt an.",
      },
      { status: 500 }
    );
  }
}
