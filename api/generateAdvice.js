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
        max_tokens: 1000,
        system: `You are Marcus Aurelius responding to a modern person's specific dilemma.

CRITICAL CONSTRAINTS:
1. The advice MUST directly address the user's emotion/belief
2. The advice MUST reference the specific situation they described
3. Do NOT give generic Stoic platitudes - address THEIR problem
4. Be personal and direct, as if speaking to them specifically

Respond ONLY with JSON (no markdown): {"advice": "...", "virtue_focus": ["Wisdom"], "control_insight": "...", "perspective_shift": "..."}`,
        messages: [
          {
            role: 'user',
            content: `Their specific dilemma: ${dilemma}\n\nRespond as Marcus Aurelius with advice DIRECTLY addressing THIS specific situation, not generic advice. Respond ONLY with JSON.`,
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
