import React from 'react';

export default function UpgradeSection({ onUpgrade }) {
  return (
    <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-red-50 border-2 border-amber-300 rounded-lg p-6 sm:p-8 mt-6 sm:mt-8">
      <div className="flex items-start gap-4">
        <div className="text-4xl">🔥</div>
        <div className="flex-1">
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 mb-2">
            You Got the Insight. Now Get the Implementation.
          </h3>
          <p className="text-gray-700 mb-4 text-sm sm:text-base">
            Marcus gave you personalized advice. But here's what changes everything: the <span className="font-bold">4-week action plan</span> and <span className="font-bold">daily journal prompts</span> above.
          </p>
          
          <div className="bg-white rounded-lg p-4 mb-6 border border-amber-200">
            <p className="text-sm sm:text-base text-gray-900 mb-3">
              <span className="font-bold">The difference between reading and doing:</span>
            </p>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-red-500 font-bold text-lg mt-0.5">✗</span>
                <span className="text-gray-700 text-sm">One insight (what you have right now)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 font-bold text-lg mt-0.5">✓</span>
                <span className="text-gray-900 font-semibold text-sm">4-week plan + daily reflections = actual change</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-xs sm:text-sm text-gray-600 mb-3 font-semibold">What you unlock:</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-amber-700 font-bold text-lg">→</span>
                <span className="text-gray-700 text-sm">Unlimited questions to Marcus (not just 1/day)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-amber-700 font-bold text-lg">→</span>
                <span className="text-gray-700 text-sm">4-week action plans with concrete daily steps</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-amber-700 font-bold text-lg">→</span>
                <span className="text-gray-700 text-sm">Journal prompts (proven to deepen Stoic practice)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-amber-700 font-bold text-lg">→</span>
                <span className="text-gray-700 text-sm">Lifetime access (one-time payment, no subscriptions)</span>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center gap-6 mb-3">
              <div>
                <p className="text-xs text-gray-600">Regular Price</p>
                <p className="text-2xl font-bold text-gray-400 line-through">$29</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-green-600 font-bold">LAUNCH PRICE</p>
                <p className="text-4xl font-bold text-green-700">$9</p>
              </div>
            </div>
            <p className="text-center text-xs text-red-600 font-semibold mb-2">
              🔥 Limited spots at this price
            </p>
            <p className="text-center text-xs text-gray-600">
              One payment. Lifetime access. No subscriptions.
            </p>
          </div>

          <button
            onClick={onUpgrade}
            className="w-full bg-gradient-to-r from-amber-700 to-orange-700 hover:from-amber-800 hover:to-orange-800 text-white font-bold py-3 sm:py-4 px-6 rounded-lg transition-all text-base sm:text-lg shadow-lg hover:shadow-xl mb-3"
          >
            Unlock Full Access - $9
          </button>

          <p className="text-xs text-gray-600 text-center">
            Users who upgrade say: <span className="italic">"The action plan changed everything."</span>
          </p>
        </div>
      </div>
    </div>
  );
}
