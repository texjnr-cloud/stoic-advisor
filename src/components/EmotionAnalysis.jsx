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
    <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">What's Really Happening</h3>
      
      <div className="space-y-4">
        <div>
          <p className="text-sm font-semibold text-gray-600 uppercase">Your Emotion</p>
          <p className="text-lg text-gray-900 font-medium">{analysis.emotion}</p>
        </div>

        <div>
          <p className="text-sm font-semibold text-gray-600 uppercase">The Belief Driving It</p>
          <p className="text-lg text-gray-900 italic">"{analysis.belief}"</p>
        </div>

        <div>
          <p className="text-sm font-semibold text-gray-600 uppercase">Virtue You Need</p>
          <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${virtueColors[analysis.virtue_needed] || 'bg-gray-100'}`}>
            {analysis.virtue_needed}
          </span>
        </div>
      </div>
    </div>
  );
}
