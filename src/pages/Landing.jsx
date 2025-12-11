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
          <h1 className="text-5xl sm:text-6xl font-serif font-bold text-gray-900 mb-6">
            Stop Reading Stoicism.<br /><span className="text-amber-700">Start <em>Implementing</em> It.</span>
          </h1>
          <p className="text-xl text-gray-700 mb-8 leading-relaxed">
            Most people read <em>Meditations</em>. They feel great. Then real life hits—anxiety, anger, a big decision. They freeze. The philosophy they love is useless because they can't apply it.
          </p>
          <p className="text-2xl font-bold text-gray-900 mb-12">
            Theory is cheap. <span className="text-amber-700">Results are not.</span>
          </p>
          <button onClick={() => setShowLanding(false)} className="inline-block bg-amber-700 hover:bg-amber-800 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors">
            Try Your First Question Free
          </button>
        </div>
      </section>

      {/* VIDEO SECTION */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-serif font-bold text-center mb-12">See It In Action</h2>
          <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
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
            The Gap Between Theory and Action is Now Closed.
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
            </div>

            <div className="bg-white p-8 rounded-lg border-l-4 border-amber-700">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">2. Personalized Wisdom That Cuts Through the Noise</h3>
              <p className="text-gray-700 mb-4">
                Not a generic quote. Not a random passage.
              </p>
              <p className="text-gray-900 font-bold mb-4">
                Marcus Aurelius responds to YOUR specific situation.
              </p>
              <p className="text-gray-700">
                The advice is built for the problem you're facing <em>right now</em>. It's a direct, personalized letter from the Emperor-Philosopher on your dilemma.
              </p>
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
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl font-serif font-bold text-center mb-16">What You Get</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-amber-50 p-8 rounded-lg border-l-4 border-amber-700">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Emotion Analysis</h3>
              <p className="text-gray-700">Identifies your core emotion (Fear, Shame, Attachment) and the exact belief underneath driving it. You finally understand what's really happening.</p>
            </div>

            <div className="bg-amber-50 p-8 rounded-lg border-l-4 border-amber-700">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Personalized Stoic Advice</h3>
              <p className="text-gray-700">Marcus Aurelius responds directly to YOUR situation. Not generic quotes—personalized wisdom built for the exact problem you're facing.</p>
            </div>

            <div className="bg-amber-50 p-8 rounded-lg border-l-4 border-amber-700">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">4-Week Action Plan</h3>
              <p className="text-gray-700">Concrete daily steps for each week. Actual things to do every day to rewire your response and implement Stoicism in real life.</p>
            </div>

            <div className="bg-amber-50 p-8 rounded-lg border-l-4 border-amber-700">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Journal Prompts</h3>
              <p className="text-gray-700">3 reflection questions for each dilemma. Write to deepen your practice and track your progress over the 4 weeks.</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-serif font-bold text-center mb-16">How to Stop Overthinking in 3 Steps</h2>
          
          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-amber-700 text-white rounded-full flex items-center justify-center font-bold text-lg">1</div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Drop the Problem</h3>
                <p className="text-gray-700">Describe what's troubling you. Anxiety about starting your business. Anger at a colleague. Perfectionism paralyzing your launch. Whatever it is.</p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-amber-700 text-white rounded-full flex items-center justify-center font-bold text-lg">2</div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Get the Blueprint</h3>
                <p className="text-gray-700 mb-3">In seconds, you get the full analysis:</p>
                <ul className="text-gray-700 space-y-1">
                  <li>• What emotion is actually driving this.</li>
                  <li>• Marcus's personalized response.</li>
                  <li>• Your 4-week action plan + reflection prompts.</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-amber-700 text-white rounded-full flex items-center justify-center font-bold text-lg">3</div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Execute</h3>
                <p className="text-gray-700">That's it. You have the plan. Now you just do the work.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-serif font-bold text-center mb-16">Why People Use It</h2>
          
          <div className="space-y-8">
            <div className="bg-amber-50 p-8 rounded-lg border-l-4 border-amber-700">
              <p className="text-lg text-gray-800 italic mb-4">
                "Killed my procrastination. The 4-week plan gave me real steps instead of just theory."
              </p>
              <p className="text-gray-600 font-semibold">— User</p>
            </div>

            <div className="bg-amber-50 p-8 rounded-lg border-l-4 border-amber-700">
              <p className="text-lg text-gray-800 italic mb-4">
                "I went from overthinking to acting in one week. This is what Stoicism should feel like—practical, not preachy."
              </p>
              <p className="text-gray-600 font-semibold">— User</p>
            </div>

            <div className="bg-amber-50 p-8 rounded-lg border-l-4 border-amber-700">
              <p className="text-lg text-gray-800 italic mb-4">
                "I finally understood what was driving my fear of failure. The personalized advice was the kick I needed."
              </p>
              <p className="text-gray-600 font-semibold">— User</p>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-serif font-bold text-center mb-4">Pricing: $9. One Time. Forever.</h2>
          <p className="text-center text-gray-700 text-lg mb-16">
            <strong>No subscriptions. No monthly fees. You pay once and you own it.</strong>
          </p>

          <div className="bg-white rounded-lg shadow-lg p-12 mb-8 text-center">
            <div className="mb-6">
              <p className="text-gray-600 text-sm mb-2">LAUNCH PRICE (First 100 Users)</p>
              <p className="text-5xl font-bold text-amber-700">$9</p>
              <p className="text-gray-600 text-sm mt-2">Regular price: $29</p>
            </div>

            <ul className="text-left space-y-3 mb-8 max-w-sm mx-auto">
              <li className="flex items-center gap-3">
                <span className="text-amber-700 font-bold">✓</span>
                <span>Unlimited questions to Marcus</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-amber-700 font-bold">✓</span>
                <span>4-week action plans for each</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-amber-700 font-bold">✓</span>
                <span>Lifetime access to all features</span>
              </li>
            </ul>

            <p className="text-red-600 font-bold text-sm mb-8">🔥 Only 87 spots left at this price</p>

            <button onClick={() => setShowLanding(false)} className="inline-block bg-amber-700 hover:bg-amber-800 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors">
              Start Your Free Question Now
            </button>
          </div>

          <p className="text-center text-gray-700">
            We hate subscriptions as much as you do. This is a tool, not a habit you have to pay for every month.
          </p>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 bg-gradient-to-r from-amber-50 to-orange-50">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-serif font-bold mb-6">Ready to Stop Reading and Start Implementing?</h2>
          <p className="text-xl text-gray-700 mb-8">
            Try one question free. Zero risk. If it works, $9 unlocks everything forever.
          </p>
          <button onClick={() => setShowLanding(false)} className="inline-block bg-amber-700 hover:bg-amber-800 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors">
            Try the First Question Free
          </button>
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
