import React, { useState } from 'react';
import { getCurrentUser, isPaidUser } from '../services/supabaseClient';
import { generateStoicAdvice, generateActionPlan, generateJournalPrompts, analyzeEmotion } from '../services/claudeApi';
import EmotionAnalysis from './EmotionAnalysis';
import ResponseCard from './ResponseCard';
import ActionPlan from './ActionPlan';
import JournalPrompts from './JournalPrompts';

export default function ChatInterface() {
  const [dilemma, setDilemma] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [actionPlan, setActionPlan] = useState(null);
  const [journalPrompts, setJournalPrompts] = useState(null);
  const [emotionAnalysis, setEmotionAnalysis] = useState(null);
  const [error, setError] = useState(null);
  const [isPaid, setIsPaid] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!dilemma.trim()) return;

    setError(null);
    setLoading(true);

    try {
      const user = await getCurrentUser();
      if (!user) {
        setError('Please log in to continue');
        setLoading(false);
        return;
      }

      const paid = await isPaidUser(user.id);
      setIsPaid(paid);

      const [analysis, advice] = await Promise.all([
        analyzeEmotion(dilemma),
        generateStoicAdvice(dilemma),
      ]);

      setEmotionAnalysis(analysis);
      setResponse(advice);

      if (paid) {
        const [plan, prompts] = await Promise.all([
          generateActionPlan(dilemma, advice.advice),
          generateJournalPrompts(dilemma),
        ]);
        
        setActionPlan(plan);
        setJournalPrompts(prompts);
      }

      setDilemma('');
    } catch (err) {
      console.error('Error:', err);
      setError(err.message || 'Failed to get advice. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpgrade = () => {
    const TEST_MODE = true;
    
    if (TEST_MODE) {
      alert('Test mode: Payment skipped. In production, redirects to Stripe.');
      return;
    }
    
    window.location.href = 'https://buy.stripe.com/your-payment-link';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">Stoic Advisor</h1>
          <p className="text-lg text-gray-600">Seek wisdom from Marcus Aurelius</p>
        </div>

        <form onSubmit={handleSubmit} className="mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <label htmlFor="dilemma" className="block text-sm font-medium text-gray-700 mb-3">What's troubling you?</label>
            <textarea id="dilemma" value={dilemma} onChange={(e) => setDilemma(e.target.value)} placeholder="Describe the situation you're facing..." className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none" rows="6" disabled={loading} />
            <button type="submit" disabled={loading || !dilemma.trim()} className="mt-4 w-full bg-amber-700 hover:bg-amber-800 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors">{loading ? 'Consulting Marcus...' : 'Seek Guidance'}</button>
          </div>
        </form>

        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">{error}</div>}

        {loading && (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700 mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">Consulting Marcus Aurelius...</p>
            <p className="text-sm text-gray-500 mt-2">Analyzing emotion, belief, and generating guidance...</p>
          </div>
        )}

        {response && (
          <div className="space-y-6">
            <EmotionAnalysis analysis={emotionAnalysis} />
            <ResponseCard response={response} />
            {isPaid && actionPlan && <ActionPlan plan={actionPlan} />}
            {isPaid && journalPrompts && <JournalPrompts prompts={journalPrompts} />}
            {!isPaid && (
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-lg p-8">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">✨</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">Unlock Full Access</h3>
                    <p className="text-gray-700 mb-4">Get 4-week action plans and journal prompts to deepen your practice.</p>
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center gap-2">
                        <span className="text-amber-700 font-bold">✓</span>
                        <span className="text-gray-700">4-week personalized action plans</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-amber-700 font-bold">✓</span>
                        <span className="text-gray-700">Reflection journal prompts</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-amber-700 font-bold">✓</span>
                        <span className="text-gray-700">Unlimited questions</span>
                      </div>
                    </div>
                    <button onClick={handleUpgrade} className="bg-amber-700 hover:bg-amber-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors">Pay $9 - Lifetime Access</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
