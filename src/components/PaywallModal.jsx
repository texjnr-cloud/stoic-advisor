import React from 'react';

export default function PaywallModal({ onUpgrade }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 sm:p-6 z-50">
      <div className="bg-white rounded-lg shadow-2xl p-4 sm:p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <div className="text-3xl sm:text-4xl mb-4">✨</div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-gray-900 mb-2">
            You've Used Your Free Question
          </h2>
          <p className="text-xs sm:text-base text-gray-600">
            Unlock unlimited access to Marcus Aurelius
          </p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 sm:p-4 mb-6">
          <p className="text-xs sm:text-sm text-gray-700 mb-3">
            <span className="font-semibold">Paid Plan includes:</span>
          </p>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
              <span className="text-amber-700 font-bold">✓</span>
              Unlimited questions
            </li>
            <li className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
              <span className="text-amber-700 font-bold">✓</span>
              4-week action plans
            </li>
            <li className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
              <span className="text-amber-700 font-bold">✓</span>
              Journal prompts
            </li>
          </ul>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4 mb-6">
          <p className="text-center">
            <span className="text-xl sm:text-2xl font-bold text-green-700">$9</span>
            <span className="text-gray-600 text-xs sm:text-sm"> one-time</span>
          </p>
          <p className="text-center text-xs text-gray-600 mt-1">
            Lifetime access
          </p>
        </div>

        <button
          onClick={onUpgrade}
          className="w-full bg-amber-700 hover:bg-amber-800 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-colors mb-3 text-sm sm:text-base"
        >
          Upgrade Now
        </button>

        <button
          onClick={() => window.location.reload()}
          className="w-full border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-colors text-sm sm:text-base"
        >
          Maybe Later
        </button>
      </div>
    </div>
  );
}
