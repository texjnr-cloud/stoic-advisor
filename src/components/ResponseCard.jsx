import React from 'react';

export default function ResponseCard({ response }) {
  if (!response) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">
        Marcus Aurelius Responds
      </h3>

      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">
            His Advice
          </h4>
          <p className="text-lg text-gray-800 leading-relaxed">
            {response.advice}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-xs font-semibold text-blue-700 uppercase mb-2">
              What's in Your Control
            </p>
            <p className="text-gray-800">
              {response.control_insight}
            </p>
          </div>

          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <p className="text-xs font-semibold text-green-700 uppercase mb-2">
              Virtue to Practice
            </p>
            <div className="flex flex-wrap gap-2">
              {response.virtue_focus && response.virtue_focus.map((virtue, i) => (
                <span key={i} className="inline-block bg-green-200 text-green-900 px-3 py-1 rounded-full text-sm font-medium">
                  {virtue}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">
            New Perspective
          </p>
          <p className="text-gray-800 italic">
            {response.perspective_shift}
          </p>
        </div>
      </div>
    </div>
  );
}
