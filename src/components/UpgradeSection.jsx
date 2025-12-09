import React from 'react';

export default function UpgradeSection({ onUpgrade }) {
  return (
    <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-red-50 border-2 border-amber-300 rounded-lg p-6 sm:p-8 mt-6 sm:mt-8">
      <div className="flex items-start gap-4">
        <div className="text-4xl">🔥</div>
        <div className="flex-1">
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 mb-2">
            You've Unlocked Something Powerful
          </h3>
          <p className="text-gray-700 mb-4 text-sm sm:text-base">
            You just got personalized advice from Marcus Aurelius. But here's what most people miss: the real transformation happens with the <span className="font-bold">4-week action plan</span> and <span className="font-bold">daily journal prompts</span>.
          </p>
          
          <div className="bg-white rounded-lg p-4 mb-6 border border-amber-200">
            <p className="text-sm sm:text-base text-gray-900 mb-3">
              <span className="font-bold">The difference:</span>
            </p>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-red-500 font-bold text-lg">✗</span>
                <span className="text-gray-700 text-sm">One-time advice (what you have now)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 font-bold text-lg">✓</span>
                <span className="text-gray-900 font-semibold text-sm">4-week transformation plan + daily reflections = real change</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-xs sm:text-sm text-gray-600 mb-2">What you'll get:</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-amber-700 font-bold text-lg">→</span>
                <span className="text-gray-700 text-sm">Unlimited questions to Marcus</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-amber-700 font-bold text-lg">→</span>
                <span className="text-gray-700 text-sm">4-week action plans (concrete daily steps)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-amber-700 font-bold text-lg">→</span>
                <span className="text-gray-700 text-sm">Journal prompts (proven to deepen practice)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-amber-700 font-bold text-lg">→</span>
                <span className="text-gray-700 text-sm">Lifetime access (one-time payment)</span>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-center">
              <span className="text-3xl sm:text-4xl font-bold text-green-700">$9</span>
              <span className="text-gray-600 text-sm sm:text-base"> one-time</span>
            </p>
            <p className="text-center text-xs text-gray-600 mt-2">
              That's less than a coffee. Lifetime access.
            </p>
          </div>

          <button
            onClick={onUpgrade}
            className="w-full bg-gradient-to-r from-amber-700 to-orange-700 hover:from-amber-800 hover:to-orange-800 text-white font-bold py-3 sm:py-4 px-6 rounded-lg transition-all text-base sm:text-lg shadow-lg hover:shadow-xl"
          >
            Unlock Lifetime Access - $9
          </button>

          <p className="text-xs text-gray-600 text-center mt-3">
            Most people who upgrade say: <span className="italic">"This should be the default. The action plan changed everything."</span>
          </p>
        </div>
      </div>
    </div>
  );
}
