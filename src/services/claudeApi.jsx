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
