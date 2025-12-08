// components/ResponseCard.jsx
// Displays the stoic advice, quote, and virtue focus

import React from 'react';

export default function ResponseCard({ response }) {
  if (!response) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-amber-700">
      {/* Quote Section */}
      <div className="mb-8 pb-6 border-b border-gray-200">
        <p className="text-2xl font-serif italic text-gray-800 text-center leading-relaxed">
          "{response.quote}"
        </p>
        <p className="text-center text-sm text-gray-600 mt-3">— Marcus Aurelius</p>
      </div>

      {/* Advice Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">His Counsel</h3>
        <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
          {response.advice}
        </div>
      </div>

      {/* Virtues Section */}
      {response.virtue_focus && response.virtue_focus.length > 0 && (
        <div className="mb-8 bg-amber-50 p-4 rounded-lg">
          <h4 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
            Virtues to Practice
          </h4>
          <div className="flex flex-wrap gap-2">
            {response.virtue_focus.map((virtue) => (
              <span
                key={virtue}
                className="bg-amber-200 text-amber-900 px-3 py-1 rounded-full text-sm font-medium"
              >
                {virtue}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Control Insight */}
      {response.control_insight && (
        <div className="mb-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">What's in Your Control</h4>
          <p className="text-gray-700 text-sm">{response.control_insight}</p>
        </div>
      )}

      {/* Perspective Shift */}
      {response.perspective_shift && (
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">Your New Perspective</h4>
          <p className="text-gray-700 text-sm italic">"{response.perspective_shift}"</p>
        </div>
      )}
    </div>
  );
}
