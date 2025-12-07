// src/App.jsx
// Main app component with authentication wrapper and LoginPage

import { useEffect, useState } from 'react';
import { supabase } from './services/supabaseClient';
import ChatInterface from './components/ChatInterface';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      setLoading(false);
    };

    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription?.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  return <ChatInterface />;
}

// ============================================================================
// LoginPage Component
// ============================================================================

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const [message, setMessage] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      if (!email || !password) {
        setError('Please enter both email and password');
        setLoading(false);
        return;
      }

      if (isSignUp) {
        // Sign up
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });
        
        if (signUpError) throw signUpError;
        
        setMessage('✓ Account created! Check your email to confirm (or just log in if email confirmation is disabled)');
        setEmail('');
        setPassword('');
        setIsSignUp(false);
      } else {
        // Log in
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (signInError) throw signInError;
        
        // Auth state change will handle redirect automatically
      }
    } catch (err) {
      console.error('Auth error:', err);
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">
            Stoic Advisor
          </h1>
          <p className="text-gray-600 text-lg">
            Seek wisdom from Marcus Aurelius
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Success Message */}
        {message && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
            {message}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4 mb-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              disabled={loading}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              disabled={loading}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading || !email || !password}
            className="w-full bg-amber-700 hover:bg-amber-800 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                {isSignUp ? 'Creating account...' : 'Logging in...'}
              </span>
            ) : (
              isSignUp ? 'Create Account' : 'Log In'
            )}
          </button>
        </form>

        {/* Toggle Sign Up / Log In */}
        <div className="text-center pt-6 border-t border-gray-200">
          <p className="text-gray-600 text-sm mb-4">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          </p>
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError(null);
              setMessage(null);
            }}
            className="text-amber-700 hover:text-amber-800 font-semibold transition-colors"
          >
            {isSignUp ? 'Log In Instead' : 'Create New Account'}
          </button>
        </div>

        {/* Info Section */}
        <div className="mt-8 p-4 bg-amber-50 rounded-lg border border-amber-200">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Quick start:</span> Use any email and password to create an account. For testing, email confirmation is disabled.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
