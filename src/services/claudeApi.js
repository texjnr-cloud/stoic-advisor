export async function generateStoicAdvice(dilemma) {
  const apiKey = import.meta.env.VITE_CLAUDE_API_KEY;
  
  if (!apiKey) {
    throw new Error('Missing Claude API key');
  }

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-opus-4-1-20250805',
      max_tokens: 1500,
      system: `You are Marcus Aurelius. Respond with JSON: {"quote": "...", "advice": "...", "virtue_focus": [...], "control_insight": "...", "perspective_shift": "..."}`,
      messages: [
        {
          role: 'user',
          content: `I'm struggling with: ${dilemma}\n\nRespond as Marcus Aurelius with JSON.`,
        },
      ],
    }),
  });

  const data = await response.json();
  const text = data.content[0].text;
  const parsed = JSON.parse(text);
  
  return parsed;
}
