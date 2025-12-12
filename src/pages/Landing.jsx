import React from 'react';

export default function Landing({ setShowLanding }) {
  return (
    <div className="font-sans text-gray-900">

      {/* NAV */}
      <nav className="flex items-center justify-between p-6 max-w-5xl mx-auto">
        <h2 className="text-2xl font-serif font-bold">Stoic Help</h2>
        <button onClick={() => setShowLanding(false)} className="text-amber-700 hover:text-amber-800 font-semibold">
          Open App
        </button>
      </nav>

      {/* HERO */}
      <section className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            ✓ Unlimited Free Questions
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-gray-900 mb-6">
            Stop Reading Stoicism.<br /><span className="text-amber-700">Start <em>Implementing</em> It.</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 mb-8 leading-relaxed">
            Ask Marcus Aurelius anything. <strong>Unlimited.</strong> Free. Get personalized Stoic wisdom for your real problems—anxiety, anger, big decisions. Then level up to a concrete 4-week action plan for just $9.
          </p>
          <p className="text-2xl font-bold text-gray-900 mb-12">
            Theory is cheap. <span className="text-amber-700">Results are not.</span>
          </p>
          <button onClick={() => setShowLanding(false)} className="inline-block bg-amber-700 hover:bg-amber-800 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors">
            Ask Your First Question (Free)
          </button>
        </div>
      </section>

      {/* VIDEO SECTION */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-serif font-bold text-center mb-12">See It In Action</h2>
          <div className="w-full aspect-video bg-gray-200 rounded-lg overflow-hidden">
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
              <iframe src="https://www.loom.com/embed/525711224a3d43fdbe983b7c33146b65" frameBorder="0" webkitAllowFullScreen mozAllowFullScreen allowFullScreen style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* THE GAP */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-serif font-bold text-center mb-16">
            Close The Gap Between Theory and Action.
          </h2>
          
          <div className="space-y-12">
            <div className="bg-white p-8 rounded-lg border-l-4 border-amber-700">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">1. Clarity on the Real Root Cause</h3>
              <p className="text-gray-700 mb-4">
                Stop guessing. You ask about your problem, and Stoic Help identifies two things:
              </p>
              <ul className="text-gray-700 space-y-2 mb-4">
                <li>• The core emotion driving it (Fear, Shame, Attachment).</li>
                <li>• The exact belief underneath that emotion.</li>
              </ul>
              <p className="text-gray-900 font-semibold italic">
                "Clarity is the first step to control."
              </p>
              <p className="text-green-700 font-semibold mt-4">✓ Free for all users</p>
            </div>

            <div className="bg-white p-8 rounded-lg border-l-4 border-amber-700">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">2. Personalized Wisdom That Cuts Through the Noise</h3>
              <p className="text-gray-700 mb-4">
                No generic quotes or random passages.
              </p>
              <p className="text-gray-900 font-bold mb-4">
                A Marcus Aurelius-type response to YOUR specific situation.
              </p>
              <p className="text-gray-700">
                The advice is built for the problem you're facing <em>right now</em>. It's a direct, personalized letter from the Emperor-Philosopher on your dilemma.
              </p>
              <p className="text-green-700 font-semibold mt-4">✓ Free for all users</p>
            </div>

            <div className="bg-white p-8 rounded-lg border-l-4 border-amber-700">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">3. A Concrete 4-Week Action Plan</h3>
              <p className="text-gray-700 mb-4">
                Forget "be more courageous" or "accept what you can't control." That's theory.
              </p>
              <p className="text-gray-900 font-bold">
                You get a 4-week plan of concrete daily steps.
              </p>
              <p className="text-gray-700 mt-4">
                Actual things to do every single day to rewire your response. This is the implementation.
              </p>
              <p className="text-amber-700 font-semibold mt-4">🔒 Unlock with $9</p>
            </div>
          </div>
        </div>
      </section>

      {/* FREE VS PAID */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl font-serif font-bold text-center mb-16">What's Free vs. What You Unlock</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* FREE COLUMN */}
            <div className="border-2 border-green-200 rounded-lg p-8 bg-green-50">
              <h3 className="text-2xl font-bold text-green-800 mb-8">Free Forever ✓</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-green-700 font-bold text-xl">✓</span>
                  <div>
                    <p className="font-semibold text-gray-900">Unlimited Questions</p>
                    <p className="text-sm text-gray-600">Ask Marcus anything, as many times as you want</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-green-700 font-bold text-xl">✓</span>
                  <div>
                    <p className="font-semibold text-gray-900">Emotion Analysis</p>
                    <p className="text-sm text-gray-600">Identify the core emotion driving your problem</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-green-700 font-bold text-xl">✓</span>
                  <div>
                    <p className="font-semibold text-gray-900">Personalized Marcus Advice</p>
                    <p className="text-sm text-gray-600">Get direct, personalized wisdom built for your situation</p>
                  </div>
                </div>
              </div>

              <button onClick={() => setShowLanding(false)} className="w-full mt-8 bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-6 rounded-lg text-center transition-colors block">
                Start Your Free Questions Now
              </button>
            </div>

            {/* PAID COLUMN */}
            <div className="border-2 border-amber-700 rounded-lg p-8 bg-amber-50">
              <h3 className="text-2xl font-bold text-amber-700 mb-2">Unlock Everything</h3>
              <p className="text-3xl font-bold text-amber-700 mb-8">$9 <span className="text-sm text-gray-600">(one-time)</span></p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-amber-700 font-bold text-xl">+</span>
                  <div>
                    <p className="font-semibold text-gray-900">4-Week Action Plans</p>
                    <p className="text-sm text-gray-600">Concrete daily steps to rewire your response</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-amber-700 font-bold text-xl">+</span>
                  <div>
                    <p className="font-semibold text-gray-900">Journal Prompts</p>
                    <p className="text-sm text-gray-600">3 reflection questions to deepen your practice</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-amber-700 font-bold text-xl">+</span>
                  <div>
                    <p className="font-semibold text-gray-900">Lifetime Access</p>
                    <p className="text-sm text-gray-600">Pay once, keep everything forever. No subscriptions.</p>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-600 mt-6 mb-6">
                <strong>Try the free questions first.</strong> If it works, upgrade anytime.
              </p>

              <button onClick={() => setShowLanding(false)} className="w-full bg-amber-700 hover:bg-amber-800 text-white font-bold py-3 px-6 rounded-lg text-center transition-colors block">
                Start Free, Upgrade Anytime
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl font-serif font-bold text-center mb-16">What You Get</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-green-50 p-8 rounded-lg border-l-4 border-green-700">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Emotion Analysis</h3>
              <p className="text-sm font-semibold text-green-700 mb-3">Free</p>
              <p className="text-gray-700">Identifies your core emotion (Fear, Shame, Attachment) and the exact belief underneath driving it. You finally understand what's really happening.</p>
            </div>

            <div className="bg-green-50 p-8 rounded-lg border-l-4 border-green-700">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Personalized Stoic Advice</h3>
              <p className="text-sm font-semibold text-green-700 mb-3">Free</p>
              <p className="text-gray-700">Marcus Aurelius responds directly to YOUR situation. Not generic quotes—personalized wisdom built for the exact problem you're facing.</p>
            </div>

            <div className="bg-amber-50 p-8 rounded-lg border-l-4 border-amber-700">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">4-Week Action Plan</h3>
              <p className="text-sm font-semibold text-amber-700 mb-3">Paid ($9)</p>
              <p className="text-gray-700">Concrete daily steps for each week. Actual things to do every day to rewire your response and implement Stoicism in real life.</p>
            </div>

            <div className="bg-amber-50 p-8 rounded-lg border-l-4 border-amber-700">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Journal Prompts</h3>
              <p className="text-sm font-semibold text-amber-700 mb-3">Paid ($9)</p>
              <p className="text-gray-700">3 reflection questions for each dilemma. Write to deepen your practice and track your progress over the 4 weeks.</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-serif font-bold text-center mb-16">How to Stop Overthinking in 3 Steps</h2>
          
          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-amber-700 text-white rounded-full flex items-center justify-center font-bold text-lg">1</div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Drop the Problem (Free)</h3>
                <p className="text-gray-700">Describe what's troubling you. Anxiety about starting your business. Anger at a colleague. Perfectionism paralyzing your launch. Whatever it is.</p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-amber-700 text-white rounded-full flex items-center justify-center font-bold text-lg">2</div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Get the Blueprint (Free + Paid)</h3>
                <p className="text-gray-700 mb-3">In seconds, you get:</p>
                <ul className="text-gray-700 space-y-1">
                  <li>• <span className="font-semibold">Free:</span> What emotion is driving this + Marcus's personalized response.</li>
                  <li>• <span className="font-semibold">Paid ($9):</span> Your 4-week action plan + reflection prompts.</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-amber-700 text-white rounded-full flex items-center justify-center font-bold text-lg">3</div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Execute</h3>
                <p className="text-gray-700">That's it. You have the plan (if paid). Now you just do the work.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-serif font-bold text-center mb-16">Why People Use It</h2>
          
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-lg border-l-4 border-amber-700">
              <p className="text-lg text-gray-800 italic mb-4">
                "This is really bloody good. The response was so insightful!"
              </p>
              <p className="text-gray-600 font-semibold">— Jermaine Anderson </p>
            </div>

            <div className="bg-white p-8 rounded-lg border-l-4 border-amber-700">
              <p className="text-lg text-gray-800 italic mb-4">
                "I went from overthinking to acting in one week. This is what Stoicism should feel like...practical, not preachy."
              </p>
              <p className="text-gray-600 font-semibold">— Lorraine Mills</p>
            </div>

            <div className="bg-white p-8 rounded-lg border-l-4 border-amber-700">
              <p className="text-lg text-gray-800 italic mb-4">
                "I finally understood what was driving my fear of failure. The personalized advice was the kick I needed."
              </p>
              <p className="text-gray-600 font-semibold">— Gavin White</p>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING FINAL CTA */}
      <section className="py-20 bg-gradient-to-r from-amber-50 to-orange-50">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-serif font-bold text-center mb-6">Ready to Get Unstuck?</h2>
          <p className="text-xl text-gray-700 text-center mb-8">
            <strong>Try unlimited free questions first.</strong> No credit card. No signup costs. If it works, upgrade to action plans for $9.
          </p>

          <div className="bg-white rounded-lg shadow-lg p-12 text-center max-w-lg mx-auto mb-8">
            <div className="mb-8">
              <p className="text-gray-600 text-sm mb-2">TRY FREE, THEN UPGRADE</p>
              <p className="text-5xl font-bold text-green-700 mb-2">$0</p>
              <p className="text-gray-700 text-lg">for unlimited Marcus questions</p>
            </div>

            <div className="border-t border-gray-200 pt-8 mb-8">
              <p className="text-gray-600 text-sm mb-3">THEN UNLOCK EVERYTHING FOR</p>
              <p className="text-4xl font-bold text-amber-700">$9</p>
              <p className="text-gray-600 text-sm mt-2">One-time. Lifetime access.</p>
            </div>

            <button onClick={() => setShowLanding(false)} className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors block mb-4">
              Ask Your First Question (Free)
            </button>

            <p className="text-gray-600 text-sm">
              No credit card required. No hidden fees. Cancel anytime.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="mb-4">Built by someone who practices Stoicism, not just studies it.</p>
          <p className="text-sm">© 2025 Stoic Help. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}
