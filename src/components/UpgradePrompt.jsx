// components/UpgradePrompt.jsx
// Shown when user hits free tier limit

import React from 'react';

export default function UpgradePrompt() {
  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-lg p-8 mb-8">
      <div className="flex items-start gap-4">
        <div className="text-3xl">✨</div>
        <div className="flex-1">
          <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">
            You've Reached Your Monthly Limit
          </h3>
          <p className="text-gray-700 mb-4">
            The free tier includes 3 conversations per month. Upgrade to unlimited access and unlock additional features.
          </p>
          
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-amber-700 font-bold">✓</span>
              <span className="text-gray-700">Unlimited dilemmas & guidance</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-amber-700 font-bold">✓</span>
              <span className="text-gray-700">Personalized 4-week action plans</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-amber-700 font-bold">✓</span>
              <span className="text-gray-700">Journal prompts for deeper reflection</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-amber-700 font-bold">✓</span>
              <span className="text-gray-700">Save all your conversations</span>
            </div>
          </div>

          <div className="flex gap-4">
            <button className="bg-amber-700 hover:bg-amber-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
              Upgrade Now
            </button>
            <button className="border-2 border-amber-700 text-amber-700 hover:bg-amber-50 font-semibold py-3 px-6 rounded-lg transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
