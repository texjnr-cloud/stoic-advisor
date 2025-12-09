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
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 300,
        system: `You are a Stoic psychologist. Analyze the user's dilemma and identify:
1. The core emotion (Fear, Anger, Shame, Anxiety, Confusion, Attachment, Desire, Frustration)
2. The underlying belief/judgment driving this emotion

Respond ONLY with JSON: {"emotion": "Fear", "belief": "I need certainty before I can act", "virtue_needed": "Courage"}`,
        messages: [
          {
            role: 'user',
            content: `Dilemma: ${dilemma}\n\nIdentify the core emotion, underlying belief, and which Stoic virtue is needed. Respond ONLY with JSON.`,
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
