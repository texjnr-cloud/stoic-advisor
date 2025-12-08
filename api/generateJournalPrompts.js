export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { dilemma } = req.body;
  const apiKey = process.env.VITE_CLAUDE_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'Missing Claude API key' });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-opus-4-1-20250805',
        max_tokens: 800,
        system: `You are Marcus Aurelius creating reflection prompts. Respond ONLY with JSON: {"prompts": ["question 1?", "question 2?"]}`,
        messages: [
          {
            role: 'user',
            content: `Situation: ${dilemma}\n\nCreate 5 reflection questions for journaling. Respond ONLY with JSON.`,
          },
        ],
      }),
    });

    const data = await response.json();
    const text = data.content[0].text;
    const cleanText = text.replace(/```json\n?|\n?```/g, '').trim();
const parsed = JSON.parse(cleanText);

    return res.status(200).json(parsed);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
