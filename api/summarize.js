export default async function handler(req, res) {
  // CORS (important for extension)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "No text provided" });
    }

    // 🔥 Simple summary (upgrade later to OpenAI)
    const summary =
      text.length > 500
        ? text.slice(0, 500) + "..."
        : text;

    return res.status(200).json({ summary });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
}