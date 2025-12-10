import { useEffect, useState } from 'react';
import { supabase } from './services/supabaseClient';
import ChatInterface from './components/ChatInterface';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      setLoading(false);
    };

    getSession();

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

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (signInError) throw signInError;
    } catch (err) {
      console.error('Auth error:', err);
      
      if (err.message.includes('Invalid login credentials')) {
        setMessage('Account not found. Creating new account...');
        
        try {
          const { data, error: signUpError } = await supabase.auth.signUp({
            email,
            password,
          });
          
          if (signUpError) throw signUpError;

          // Create user profile in public.users table
          const { error: profileError } = await supabase.from('users').insert({
            id: data.user.id,
            email: data.user.email,
            free_uses_remaining: 1,
            is_paid: false,
          });

          if (profileError) {
            console.error('Profile creation error:', profileError);
            throw profileError;
          }
          
          setMessage('✓ Account created! Please refresh and log in.');
          setEmail('');
          setPassword('');
        } catch (signUpErr) {
          setError(signUpErr.message || 'Failed to create account');
        }
      } else {
        setError(err.message || 'Authentication failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mb-2">
            Stoic Help
          </h1>
          <p className="text-gray-600 text-base sm:text-lg">
            Seek wisdom from Marcus Aurelius
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs sm:text-sm">
            {error}
          </div>
        )}

        {message && (
          <div className="mb-6 p-3 sm:p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg text-xs sm:text-sm">
            {message}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 mb-6">
          <div>
            <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-xs sm:text-base"
              disabled={loading}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-xs sm:text-base"
              disabled={loading}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading || !email || !password}
            className="w-full bg-amber-700 hover:bg-amber-800 disabled:bg-gray-400 text-white font-semibold py-2 sm:py-3 px-4 rounded-lg transition-colors text-xs sm:text-base"
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <span className="inline-block h-3 sm:h-4 w-3 sm:w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Logging in...
              </span>
            ) : (
              'Log In or Create Account'
            )}
          </button>
        </form>

        <div className="p-3 sm:p-4 bg-amber-50 rounded-lg border border-amber-200">
          <p className="text-xs sm:text-sm text-gray-700">
            <span className="font-semibold">New here?</span> Use any email and password. Your account will be created automatically.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
