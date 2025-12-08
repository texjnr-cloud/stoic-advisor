export async function generateStoicAdvice(dilemma) {
  const response = await fetch('/api/generateAdvice', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ dilemma }),
  });

  if (!response.ok) {
    throw new Error('Failed to generate advice');
  }

  return response.json();
}

export async function generateActionPlan(dilemma, advice) {
  const response = await fetch('/api/generateActionPlan', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ dilemma, advice }),
  });

  if (!response.ok) {
    throw new Error('Failed to generate action plan');
  }

  return response.json();
}

export async function generateJournalPrompts(dilemma) {
  const response = await fetch('/api/generateJournalPrompts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ dilemma }),
  });

  if (!response.ok) {
    throw new Error('Failed to generate prompts');
  }

  return response.json();
}
