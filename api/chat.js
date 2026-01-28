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

VERY IMPORTANT LANGUAGE RULES:
- Detect the language of the user's question.
- You MUST answer in EXACTLY the same language as the user's question.
- This rule is ABSOLUTE and has priority over everything else.
- Even if the apartment information is written in another language, you MUST translate it first.
- NEVER answer in the language of the apartment information unless the user used that language.
- NEVER mix languages.
- English questions MUST be answered in English.

You are NOT allowed to choose the language yourself.

APARTMENT INFORMATION:
${apartmentInfo}
            `.trim(),
          },
          {
            role: "assistant",
            content: "I will strictly follow the language rules.",
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
