import React, { useState } from 'react';
import { getCurrentUser, getUserFreeUsesRemaining, decrementFreeUses, isPaidUser } from '../services/supabaseClient';
import { generateStoicAdvice, generateActionPlan, generateJournalPrompts, analyzeEmotion } from '../services/claudeApi';
import EmotionAnalysis from './EmotionAnalysis';
import ResponseCard from './ResponseCard';
import ActionPlan from './ActionPlan';
import JournalPrompts from './JournalPrompts';
import PaywallModal from './PaywallModal';

export default function ChatInterface() {
  const [dilemma, setDilemma] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [actionPlan, setActionPlan] = useState(null);
  const [journalPrompts, setJournalPrompts] = useState(null);
  const [emotionAnalysis, setEmotionAnalysis] = useState(null);
  const [error, setError] = useState(null);
  const [showPaywall, setShowPaywall] = useState(false);
  const [freeUsesRemaining, setFreeUsesRemaining] = useState(3);
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
        return;
      }

      const remaining = await getUserFreeUsesRemaining(user.id);
      setFreeUsesRemaining(remaining);

      const paid = await isPaidUser(user.id);
      setIsPaid(paid);

      if (!paid && remaining <= 0) {
        setShowPaywall(true);
        setLoading(false);
        return;
      }

      if (!paid) {
        const result = await decrementFreeUses(user.id);
        setFreeUsesRemaining(result.remaining);
      }

      const analysis = await analyzeEmotion(dilemma);
      setEmotionAnalysis(analysis);

      const advice = await generateStoicAdvice(dilemma);
      setResponse(advice);

      if (paid) {
        const plan = await generateActionPlan(dilemma, advice.advice);
        setActionPlan(plan);

        const prompts = await generateJournalPrompts(dilemma);
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
    window.location.href = 'https://buy.stripe.com/your-payment-link';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">Stoic Advisor</h1>
          <p className="text-lg text-gray-600">Seek wisdom from Marcus Aurelius</p>
          {!isPaid && <p className="text-sm text-gray-500 mt-2">Free uses remaining: <span className="font-semibold">{freeUsesRemaining}/3</span></p>}
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
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                <p className="text-gray-700 mb-4"><span className="font-semibold">Unlock unlimited questions, 4-week action plans, and journal prompts</span> with a paid subscription</p>
                <button onClick={handleUpgrade} className="bg-amber-700 hover:bg-amber-800 text-white font-semibold py-2 px-6 rounded-lg transition-colors">Upgrade to Paid</button>
              </div>
            )}
          </div>
        )}

        {showPaywall && <PaywallModal onUpgrade={handleUpgrade} />}
      </div>
    </div>
  );
}
