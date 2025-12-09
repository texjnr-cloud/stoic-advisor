export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { dilemma, advice } = req.body;
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
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 800,
        system: `You are Marcus Aurelius creating a 4-week action plan. Respond ONLY with JSON: {"weeks": [{"week": 1, "theme": "...", "daily_actions": ["..."], "virtue_to_practice": "..."}]}`,
        messages: [
          {
            role: 'user',
            content: `Situation: ${dilemma}\n\nAdvice given: ${advice}\n\nCreate a 4-week action plan with daily actions. Respond ONLY with JSON.`,
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
