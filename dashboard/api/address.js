export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  const q = req.query?.q;
  if (!q || q.length < 3) return res.status(200).json([]);

  const encoded = encodeURIComponent(q + ", Germany");
  const url = `https://nominatim.openstreetmap.org/search?q=${encoded}&format=json&addressdetails=1&limit=5&countrycodes=de`;

  const response = await fetch(url, {
    headers: { "User-Agent": "UrologieNeuwied/1.0 (praxis@urologie-neuwied.de)" },
  });

  if (!response.ok) return res.status(200).json([]);

  const data = await response.json();

  const results = data.map((item) => ({
    display: item.display_name,
    street: [item.address.road, item.address.house_number].filter(Boolean).join(" "),
    city: item.address.city || item.address.town || item.address.village || "",
    zip: item.address.postcode || "",
  }));

  return res.status(200).json(results);
}
