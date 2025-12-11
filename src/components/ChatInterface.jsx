import { supabase } from '../services/supabaseClient';
import { logQuestion, getCurrentUser } from '../services/supabaseClient';
import React, { useState, useEffect } from 'react';
import { generateStoicAdvice, generateActionPlan, generateJournalPrompts, analyzeEmotion } from '../services/claudeApi';
import EmotionAnalysis from './EmotionAnalysis';
import ResponseCard from './ResponseCard';
import ActionPlan from './ActionPlan';
import JournalPrompts from './JournalPrompts';
import UpgradeSection from './UpgradeSection';

export default function ChatInterface() {
  const [dilemma, setDilemma] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [actionPlan, setActionPlan] = useState(null);
  const [journalPrompts, setJournalPrompts] = useState(null);
  const [emotionAnalysis, setEmotionAnalysis] = useState(null);
  const [error, setError] = useState(null);
  const [userIsPaid, setUserIsPaid] = useState(false);

  useEffect(() => {
    console.log('%c=== ChatInterface Mounted ===', 'color: green; font-size: 14px;');
    checkUserStatus();
  }, []);

  const checkUserStatus = async () => {
    try {
      const user = await getCurrentUser();
      console.log('%c[checkUserStatus] User:', 'color: blue;', user?.email);
      
      if (user) {
        const { data, error } = await supabase
          .from('users')
          .select('is_paid')
          .eq('id', user.id)
          .single();
        
        if (error) {
          console.error('%c[checkUserStatus] Error:', 'color: red;', error);
          setUserIsPaid(false);
          return;
        }

        // EXPLICIT CHECK: Only true = paid
        const isPaid = data?.is_paid === true;
        console.log('%c[checkUserStatus] is_paid value from DB:', 'color: blue;', data?.is_paid);
        console.log('%c[checkUserStatus] isPaid after check:', 'color: orange;', isPaid);
        setUserIsPaid(isPaid);
      }
    } catch (err) {
      console.error('%c[checkUserStatus] Exception:', 'color: red;', err);
      setUserIsPaid(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!dilemma.trim()) return;

    setError(null);
    setLoading(true);
    console.log('%c[handleSubmit] Starting...', 'color: blue;');

    try {
      const user = await getCurrentUser();
      if (!user) {
        setError('Please log in to continue');
        setLoading(false);
        return;
      }

      console.log('%c[handleSubmit] User authenticated:', 'color: green;', user.email);

      // Check paid status
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('is_paid')
        .eq('id', user.id)
        .single();
      
      if (userError) {
        console.error('%c[handleSubmit] User check error:', 'color: red;', userError);
      }

      const userPaid = userData?.is_paid === true;
      console.log('%c[handleSubmit] Raw is_paid from DB:', 'color: blue;', userData?.is_paid);
      console.log('%c[handleSubmit] Processed userPaid:', 'color: orange;', userPaid);
      setUserIsPaid(userPaid);

      // Log question
      await logQuestion(user.id, dilemma);
      console.log('%c[handleSubmit] Question logged', 'color: green;');

      // Generate analysis and advice
      console.log('%c[handleSubmit] Generating emotion analysis and advice...', 'color: blue;');
      const [analysis, advice] = await Promise.all([
        analyzeEmotion(dilemma),
        generateStoicAdvice(dilemma),
      ]);

      setEmotionAnalysis(analysis);
      setResponse(advice);
      console.log('%c[handleSubmit] Analysis and advice generated', 'color: green;');

      // Only generate action plan and journal if PAID
      if (userPaid) {
        console.log('%c[handleSubmit] USER IS PAID - Generating action plan and prompts...', 'color: green; font-weight: bold;');
        const [plan, prompts] = await Promise.all([
          generateActionPlan(dilemma, advice.advice),
          generateJournalPrompts(dilemma),
        ]);
        
        setActionPlan(plan);
        setJournalPrompts(prompts);
        console.log('%c[handleSubmit] Action plan and prompts generated for PAID user', 'color: green;');
      } else {
        console.log('%c[handleSubmit] USER IS FREE - NOT generating action plan and prompts', 'color: red; font-weight: bold;');
        setActionPlan(null);
        setJournalPrompts(null);
      }

      setDilemma('');
    } catch (err) {
      console.error('%c[handleSubmit] Exception:', 'color: red;', err);
      setError(err.message || 'Failed to get advice. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleUpgradeClick = () => {
    window.location.href = import.meta.env.VITE_STRIPE_CHECKOUT_URL || 'https://buy.stripe.com/pay/cs_live_YOUR_LINK';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-4 sm:p-6">
      <div className="w-full max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div className="text-center flex-1">
            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-gray-900 mb-1 sm:mb-2">Stoic Help</h1>
            <p className="text-xs sm:text-lg text-gray-600">Seek wisdom from Marcus Aurelius</p>
          </div>
          <button onClick={handleLogout} className="text-xs sm:text-sm text-gray-600 hover:text-gray-900 underline">
            Logout
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mb-6 sm:mb-8">
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 border border-gray-200">
            <label htmlFor="dilemma" className="block text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-3">
              What's troubling you?
            </label>
            <textarea 
              id="dilemma" 
              value={dilemma} 
              onChange={(e) => setDilemma(e.target.value)} 
              placeholder="Describe the situation you're facing..." 
              className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none text-sm sm:text-base" 
              rows="4" 
              disabled={loading} 
            />
            <button 
              type="submit" 
              disabled={loading || !dilemma.trim()} 
              className="mt-3 sm:mt-4 w-full bg-amber-700 hover:bg-amber-800 disabled:bg-gray-400 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-colors text-sm sm:text-base"
            >
              {loading ? 'Consulting Marcus...' : 'Seek Guidance'}
            </button>
          </div>
        </form>

        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-3 sm:px-4 py-2 sm:py-3 rounded-lg mb-6 text-xs sm:text-base">{error}</div>}

        {loading && (
          <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 text-center">
            <div className="animate-spin rounded-full h-10 sm:h-12 w-10 sm:w-12 border-b-2 border-amber-700 mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium text-xs sm:text-base">Consulting Marcus Aurelius...</p>
            <p className="text-xs text-gray-500 mt-2">Analyzing emotion and generating guidance...</p>
          </div>
        )}

        {response && (
          <div className="space-y-4 sm:space-y-6">
            <EmotionAnalysis analysis={emotionAnalysis} />
            <ResponseCard response={response} />
            
            {console.log('%c[RENDER] userIsPaid:', 'color: purple; font-weight: bold;', userIsPaid, '| actionPlan:', !!actionPlan, '| journalPrompts:', !!journalPrompts)}
            
            {userIsPaid ? (
              <>
                {console.log('%c[RENDER] === SHOWING PAID USER CONTENT ===', 'color: green; font-weight: bold;')}
                {actionPlan && <ActionPlan plan={actionPlan} />}
                {journalPrompts && <JournalPrompts prompts={journalPrompts} />}
              </>
            ) : (
              <>
                {console.log('%c[RENDER] === SHOWING UPGRADE SECTION (FREE USER) ===', 'color: red; font-weight: bold;')}
                <UpgradeSection onUpgrade={handleUpgradeClick} />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
