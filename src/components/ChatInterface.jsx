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

      // Check free uses first
      const remaining = await getUserFreeUsesRemaining(user.id);
      setFreeUsesRemaining(remaining);

      const paid = await isPaidUser(user.id);
      setIsPaid(paid);

      // If not paid and no uses left, show paywall
      if (!paid && remaining <= 0) {
        setShowPaywall(true);
        setLoading(false);
        return;
      }

      // If not paid, decrement free uses
      if (!paid) {
        const result = await decrementFreeUses(user.id);
        setFreeUsesRemaining(result.remaining);
      }

      // Generate analysis
      const analysis = await analyzeEmotion(dilemma);
      setEmotionAnalysis(analysis);

      // Generate advice
      const advice = await generateStoicAdvice(dilemma);
      setResponse(advice);

      // Only show action plan and journal if paid
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
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">
            Stoic Advisor
          </h1>
          <p className="text-lg text-gray-600">
            Seek wisdom from Marcus Aurelius
          </p>
          {!isPaid && (
            <p className="text-sm text-gray-500 mt-2">
              Free uses remaining: <span className="font-semibold">{freeUsesRemaining}/3</span>
            </p>
          )}
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
              disabled={loading
