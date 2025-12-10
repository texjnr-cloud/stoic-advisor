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

setMessage('✓ Account created! Logging you in...');

// Wait a moment then try to login
setTimeout(async () => {
  const { error: loginError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (loginError) {
    setError('Account created but login failed. Please refresh and log in manually.');
  } else {
    setMessage('✓ Welcome to Stoic Help!');
  }
}, 1000);
