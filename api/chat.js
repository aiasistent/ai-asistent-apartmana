export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message, apartmentInfo } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.2,
        messages: [
          {
            role: "system",
            content: `
You are an AI assistant for apartment guests.

STRICT RULES:
- Detect the language of the user's last message.
- Respond ONLY in that language.
- Translate the apartment information to that language before answering.
- Never mix languages.
- Use ONLY the apartment information.
- If the information is missing, clearly say you do not have that information.

APARTMENT INFORMATION:
${apartmentInfo}
            `.trim(),
          },
          {
            role: "user",
            content: message,
          },
        ],
      }),
    });

    const data = await response.json();

    res.status(200).json({
      reply: data.choices[0].message.content,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI error" });
  }
}
