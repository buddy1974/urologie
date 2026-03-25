export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { input, field } = req.body;
  if (!input) return res.status(400).json({ error: "Input required" });

  const fieldPrompts = {
    arztbrief_befund: "Befundbeschreibung im Arztbrief",
    arztbrief_therapie: "Therapieempfehlung im Arztbrief",
    arztbrief_anamnese: "Anamnese-Abschnitt im Arztbrief",
    diagnose: "Diagnose-Formulierung",
    notiz: "Klinische Notiz",
    patient_notes: "Patientennotiz",
  };

  const fieldLabel = fieldPrompts[field] ?? "Medizinischer Text";

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY || process.env.VITE_ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 512,
      messages: [{
        role: "user",
        content: `Du bist ein medizinischer Schreibassistent für Dr. Walters T. Fomuki, Facharzt für Urologie in Neuwied.

Der Arzt hat folgende Stichworte für das Feld "${fieldLabel}" eingegeben:
"${input}"

Formuliere einen professionellen, vollständigen deutschen medizinischen Text für dieses Feld.
Verwende korrekte urologische Fachterminologie.
Antworte NUR mit dem fertig formulierten Text, keine Erklärungen, keine Anführungszeichen.`,
      }],
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    return res.status(response.status).json({ error: err });
  }

  const data = await response.json();
  const text = data.content?.[0]?.text?.trim() ?? input;
  return res.status(200).json({ text });
}
