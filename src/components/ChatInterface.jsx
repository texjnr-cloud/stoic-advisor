import React, { useState } from 'react';
import { getCurrentUser } from '../services/supabaseClient';
import { generateStoicAdvice, generateActionPlan, generateJournalPrompts } from '../services/claudeApi';
import ResponseCard from './ResponseCard';
import ActionPlan from './ActionPlan';
import JournalPrompts from './JournalPrompts';

export default function ChatInterface() {
  const [dilemma, setDilemma] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [actionPlan, setActionPlan] = useState(null);
  const [journalPrompts, setJournalPrompts] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!dilemma.trim()) return;

    setError(null);
    setLoading(true);

    try {
      const user = await getCurrentUser();
      if (!user) {
        setError('Please log in to continue');
        return;
      }

      const advice = await generateStoicAdvice(dilemma);
      setResponse(advice);

      const plan = await generateActionPlan(dilemma, advice.advice);
      setActionPlan(plan);

      const prompts = await generateJournalPrompts(dilemma);
      setJournalPrompts(prompts);

      setDilemma('');
    } catch (err) {
      console.error('Error:', err);
      setError(err.message || 'Failed to get advice. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">
            Ask Marcus Aurelius
          </h1>
          <p className="text-lg text-gray-600">
            Seek stoic wisdom for life's dilemmas
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <label htmlFor="dilemma" className="block text-sm font-medium text-gray-700 mb-3">
              What's troubling you?
            </label>
            <textarea
              id="dilemma"
              value={dilemma}
              onChange={(e) => setDilemma(e.target.value)}
              placeholder="Describe the situation you're facing..."
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
              rows="6"
              disabled={loading}
            />
            
            <button
              type="submit"
              disabled={loading || !dilemma.trim()}
              className="mt-4 w-full bg-amber-700 hover:bg-amber-800 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              {loading ? 'Consulting Marcus...' : 'Seek Guidance'}
            </button>
          </div>
        </form>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {response && (
          <div className="space-y-6">
            <ResponseCard response={response} />
            {actionPlan && <ActionPlan plan={actionPlan} />}
            {journalPrompts && <JournalPrompts prompts={journalPrompts} />}
          </div>
        )}
      </div>
    </div>
  );
}
