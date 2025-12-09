import React, { useState } from 'react';

export default function JournalPrompts({ prompts }) {
  const [answers, setAnswers] = useState({});

  if (!prompts || !prompts.prompts || prompts.prompts.length === 0) {
    return null;
  }

  const handleAnswerChange = (idx, value) => {
    setAnswers({
      ...answers,
      [idx]: value,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-8">
      <h3 className="text-lg sm:text-2xl font-serif font-bold text-gray-900 mb-2 sm:mb-2">
        Deepen Your Reflection
      </h3>
      <p className="text-xs sm:text-base text-gray-600 mb-4 sm:mb-6">
        Journal on these prompts. Writing deepens understanding.
      </p>

      <div className="space-y-3 sm:space-y-6">
        {prompts.prompts.map((prompt, idx) => (
          <div key={idx} className="border border-gray-300 rounded-lg p-3 sm:p-6 bg-gray-50">
            <h4 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-lg">
              {idx + 1}. {prompt}
            </h4>

            <textarea
              value={answers[idx] || ''}
              onChange={(e) => handleAnswerChange(idx, e.target.value)}
              placeholder="Your reflection here..."
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none mb-2 sm:mb-3 text-xs sm:text-base"
              rows="3"
            />
          </div>
        ))}
      </div>

      <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-xs sm:text-sm text-gray-700">
          <span className="font-semibold">Marcus would say:</span> "The mind that takes its own measure is a mind at peace."
        </p>
      </div>
    </div>
  );
}
