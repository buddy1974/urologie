export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { imageBase64, mediaType } = req.body;
  if (!imageBase64) return res.status(400).json({ error: "Image required" });

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY || process.env.VITE_ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      messages: [{
        role: "user",
        content: [
          {
            type: "image",
            source: { type: "base64", media_type: mediaType ?? "image/jpeg", data: imageBase64 },
          },
          {
            type: "text",
            text: `Du bist ein medizinischer OCR-Assistent für eine urologische Facharztpraxis in Deutschland.
Lies dieses Bild (Laborzettel, Befundbericht, Patientenakte, handgeschriebene Notiz).
Extrahiere alle relevanten medizinischen Informationen.
Antworte NUR mit gültigem JSON, kein Markdown, keine Erklärungen.

Format:
{
  "patientName": "string oder null",
  "dateOfBirth": "YYYY-MM-DD oder null",
  "testName": "string oder null",
  "testValue": "string oder null",
  "testUnit": "string oder null",
  "referenceRange": "string oder null",
  "status": "normal|erhöht|erniedrigt|kritisch oder null",
  "doctor": "string oder null",
  "date": "YYYY-MM-DD oder null",
  "diagnosis": "string oder null",
  "icdCode": "string oder null",
  "notes": "string oder null",
  "confidence": "high|medium|low"
}`,
          },
        ],
      }],
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    return res.status(response.status).json({ error: err });
  }

  const data = await response.json();
  const text = data.content?.[0]?.text ?? "";

  try {
    const parsed = JSON.parse(text);
    return res.status(200).json(parsed);
  } catch {
    return res.status(422).json({ error: "Could not parse response", raw: text });
  }
}
