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
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">
        Deepen Your Reflection
      </h3>
      <p className="text-gray-600 mb-6">
        Journal on these prompts. Writing deepens understanding and reveals truths you may not yet see.
      </p>

      <div className="space-y-6">
        {prompts.prompts.map((prompt, idx) => (
          <div key={idx} className="border border-gray-300 rounded-lg p-6 bg-gray-50">
            <h4 className="font-semibold text-gray-900 mb-4 text-lg">
              {idx + 1}. {prompt}
            </h4>

            <textarea
              value={answers[idx] || ''}
              onChange={(e) => handleAnswerChange(idx, e.target.value)}
              placeholder="Your reflection here..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none mb-3"
              rows="4"
            />
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Marcus would say:</span> "The mind that takes its own measure is a mind at peace."
        </p>
      </div>
    </div>
  );
}
