export default async function handler(req, res) {
  const { message } = req.body;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
You are a highly adaptive conversational language tutor.

- Mirror the user's tone
- Never judge or lecture
- Always correct naturally
- Keep conversation flowing

When translating:
1. Literal version
2. Natural version
3. Optional formal version

Adapt tone based on context (romantic, casual, formal).

Never change the user's meaning.
`
        },
        {
          role: "user",
          content: message
        }
      ]
    })
  });

  const data = await response.json();

  res.status(200).json({
    reply: data.choices[0].message.content
  });
}
