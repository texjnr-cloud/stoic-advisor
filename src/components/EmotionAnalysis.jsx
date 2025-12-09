import React from 'react';

export default function EmotionAnalysis({ analysis }) {
  if (!analysis) return null;

  const virtueColors = {
    Wisdom: 'bg-purple-100 text-purple-900',
    Courage: 'bg-red-100 text-red-900',
    Temperance: 'bg-blue-100 text-blue-900',
    Justice: 'bg-green-100 text-green-900',
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 border-l-4 border-blue-500 mb-4 sm:mb-6">
      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">What's Really Happening</h3>
      
      <div className="space-y-3 sm:space-y-4">
        <div>
          <p className="text-xs font-semibold text-gray-600 uppercase">Your Emotion</p>
          <p className="text-base sm:text-lg text-gray-900 font-medium">{analysis.emotion}</p>
        </div>

        <div>
          <p className="text-xs font-semibold text-gray-600 uppercase">The Belief Driving It</p>
          <p className="text-sm sm:text-lg text-gray-900 italic">"{analysis.belief}"</p>
        </div>

        <div>
          <p className="text-xs font-semibold text-gray-600 uppercase">Virtue You Need</p>
          <span className={`inline-block px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${virtueColors[analysis.virtue_needed] || 'bg-gray-100'}`}>
            {analysis.virtue_needed}
          </span>
        </div>
      </div>
    </div>
  );
}
