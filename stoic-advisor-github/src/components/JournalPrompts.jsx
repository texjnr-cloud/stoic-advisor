// components/JournalPrompts.jsx
// Journal reflection prompts for processing the advice

import React, { useState } from 'react';
import { updateJournalEntry } from '../services/supabaseClient';

export default function JournalPrompts({ prompts, scenarioId }) {
  const [answers, setAnswers] = useState({});
  const [savedEntries, setSavedEntries] = useState({});
  const [loading, setLoading] = useState({});

  if (!prompts || !prompts.prompts || prompts.prompts.length === 0) {
    return null;
  }

  const handleAnswerChange = (idx, value) => {
    setAnswers({
      ...answers,
      [idx]: value,
    });
  };

  const handleSave = async (idx, entryId) => {
    const answer = answers[idx];
    if (!answer || !answer.trim()) return;

    setLoading({ ...loading, [idx]: true });

    try {
      await updateJournalEntry(entryId, answer);
      setSavedEntries({
        ...savedEntries,
        [idx]: true,
      });
    } catch (err) {
      console.error('Error saving journal entry:', err);
      alert('Failed to save. Please try again.');
    } finally {
      setLoading({ ...loading, [idx]: false });
    }
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
            {/* Prompt */}
            <h4 className="font-semibold text-gray-900 mb-4 text-lg">
              {idx + 1}. {prompt}
            </h4>

            {/* Answer Textarea */}
            <textarea
              value={answers[idx] || ''}
              onChange={(e) => handleAnswerChange(idx, e.target.value)}
              placeholder="Your reflection here..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none mb-3"
              rows="4"
              disabled={loading[idx] || savedEntries[idx]}
            />

            {/* Save Button */}
            {!savedEntries[idx] ? (
              <button
                onClick={() => handleSave(idx, null)} // You'd need to track entry IDs
                disabled={!answers[idx] || !answers[idx].trim() || loading[idx]}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
              >
                {loading[idx] ? 'Saving...' : 'Save Reflection'}
              </button>
            ) : (
              <div className="text-green-600 font-medium text-sm flex items-center">
                ✓ Saved
              </div>
            )}
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
