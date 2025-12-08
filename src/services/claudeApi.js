import Anthropic from '@anthropic-ai/sdk';

export async function generateStoicAdvice(dilemma) {
  const apiKey = import.meta.env.VITE_CLAUDE_API_KEY;
  
  if (!apiKey) {
    throw new Error('Missing Claude API key');
  }

  const client = new Anthropic({
    apiKey: apiKey,
  });

  try {
    const message = await client.messages.create({
      model: 'claude-opus-4-1-20250805',
      max_tokens: 1500,
      system: `You are Marcus Aurelius, the Stoic philosopher...`,
      messages: [
        {
          role: 'user',
          content: `I'm struggling with this situation: ${dilemma}\n\nHow would you advise me as a Stoic?`,
        },
      ],
    });

    const responseText = message.content[0].text;
    const parsed = JSON.parse(responseText);
    
    return {
      quote: parsed.quote,
      advice: parsed.advice,
      virtue_focus: parsed.virtue_focus,
      control_insight: parsed.control_insight,
      perspective_shift: parsed.perspective_shift,
    };
  } catch (error) {
    console.error('Error calling Claude API:', error);
    throw new Error(`Failed to generate stoic advice: ${error.message}`);
  }
}
