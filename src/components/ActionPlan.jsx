import React, { useState } from 'react';

export default function ActionPlan({ plan }) {
  const [expandedWeek, setExpandedWeek] = useState(0);

  if (!plan || !plan.weeks || plan.weeks.length === 0) {
    return null;
  }

  const virtueColors = {
    Wisdom: 'bg-purple-100 text-purple-900 border-purple-300',
    Courage: 'bg-red-100 text-red-900 border-red-300',
    Temperance: 'bg-blue-100 text-blue-900 border-blue-300',
    Justice: 'bg-green-100 text-green-900 border-green-300',
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">
        Your 4-Week Action Plan
      </h3>
      <p className="text-gray-600 mb-6">
        Marcus has outlined concrete steps for each week. Small, consistent actions build stoic practice.
      </p>

      <div className="space-y-4">
        {plan.weeks.map((week, idx) => (
          <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => setExpandedWeek(expandedWeek === idx ? -1 : idx)}
              className="w-full px-6 py-4 bg-amber-50 hover:bg-amber-100 flex justify-between items-center transition-colors"
            >
              <div className="text-left">
                <h4 className="font-semibold text-gray-900">
                  Week {week.week}: {week.theme}
                </h4>
              </div>
              <span className="text-xl text-gray-600">
                {expandedWeek === idx ? '−' : '+'}
              </span>
            </button>

            {expandedWeek === idx && (
              <div className="px-6 py-4 bg-white border-t border-gray-200 space-y-4">
                {week.virtue_to_practice && (
                  <div className={`p-3 rounded-lg border ${virtueColors[week.virtue_to_practice] || 'bg-gray-100'}`}>
                    <p className="text-sm font-semibold">Focus Virtue: {week.virtue_to_practice}</p>
                  </div>
                )}

                <div>
                  <h5 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">
                    Daily Actions
                  </h5>
                  <ul className="space-y-2">
            {week.daily_actions && week.daily_actions.map((action, i) => (
  <li key={i} className="flex items-start">
