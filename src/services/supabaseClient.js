import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Get current user from auth session
 */
export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

/**
 * Get user's free uses remaining
 */
export async function getUserFreeUsesRemaining(userId) {
  const { data, error } = await supabase
    .from('users')
    .select('free_uses_remaining')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error getting free uses:', error);
    return 3;
  }

  return data?.free_uses_remaining || 3;
}

/**
 * Decrement free uses by 1
 */
export async function decrementFreeUses(userId) {
  const remaining = await getUserFreeUsesRemaining(userId);
  
  if (remaining <= 0) {
    return { can_use: false, remaining: 0 };
  }

  const { error } = await supabase
    .from('users')
    .update({ free_uses_remaining: remaining - 1 })
    .eq('id', userId);

  if (error) {
    console.error('Error decrementing free uses:', error);
    return { can_use: true, remaining: remaining - 1 };
  }

  return { can_use: true, remaining: remaining - 1 };
}

/**
 * Check if user is paid
 */
export async function isPaidUser(userId) {
  const { data, error } = await supabase
    .from('users')
    .select('is_paid')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error checking paid status:', error);
    return false;
  }

  return data?.is_paid || false;
}

/**
 * Get user profile with tier and query count
 */
export async function getUserProfile(userId) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data;
}

/**
 * Reset monthly query count if needed
 */
export async function resetMonthlyQueriesIfNeeded(userId) {
  const { data, error } = await supabase
    .rpc('reset_monthly_queries');

  if (error) {
    console.error('Error resetting queries:', error);
  }
}

/**
 * Check if user can make a query (tier + query limit)
 */
export async function canMakeQuery(userId) {
  const profile = await getUserProfile(userId);
  
  if (profile.tier === 'paid') {
    return { can_query: true, reason: null };
  }

  if (profile.queries_used_this_month >= 3) {
    return { 
      can_query: false, 
      reason: 'Free tier limit reached (3/month)',
      used: profile.queries_used_this_month,
      limit: 3
    };
  }

  return { can_query: true, reason: null };
}

/**
 * Increment query count
 */
export async function incrementQueryCount(userId) {
  const { data, error } = await supabase
    .rpc('increment_query_count', { user_id: userId });

  if (error) throw error;
  return data;
}

/**
 * Create a new scenario (user's dilemma)
 */
export async function createScenario(userId, title, description) {
  const { data, error } = await supabase
    .from('scenarios')
    .insert({
      user_id: userId,
      title,
      description,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Get all scenarios for a user
 */
export async function getScenarios(userId) {
  const { data, error } = await supabase
    .from('scenarios')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

/**
 * Get a specific scenario with its response
 */
export async function getScenarioWithResponse(scenarioId) {
  const { data, error } = await supabase
    .from('scenarios')
    .select(`
      *,
      responses (*),
      journal_entries (*)
    `)
    .eq('id', scenarioId)
    .single();

  if (error) throw error;
  return data;
}

/**
 * Delete a scenario
 */
export async function deleteScenario(scenarioId) {
  const { error } = await supabase
    .from('scenarios')
    .delete()
    .eq('id', scenarioId);

  if (error) throw error;
}

/**
 * Save a response (Marcus Aurelius advice)
 */
export async function saveResponse(scenarioId, responseData) {
  const { data, error } = await supabase
    .from('responses')
    .insert({
      scenario_id: scenarioId,
      quote: responseData.quote,
      advice: responseData.advice,
      action_plan: responseData.action_plan || null,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Get response for a scenario
 */
export async function getResponse(scenarioId) {
  const { data, error } = await supabase
    .from('responses')
    .select('*')
    .eq('scenario_id', scenarioId)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data || null;
}

/**
 * Create journal prompts for a scenario
 */
export async function createJournalPrompts(scenarioId, prompts) {
  const entries = prompts.map(prompt => ({
    scenario_id: scenarioId,
    prompt,
    user_answer: null,
    answered_at: null,
  }));

  const { data, error } = await supabase
    .from('journal_entries')
    .insert(entries)
    .select();

  if (error) throw error;
  return data;
}

/**
 * Get journal entries for a scenario
 */
export async function getJournalEntries(scenarioId) {
  const { data, error } = await supabase
    .from('journal_entries')
    .select('*')
    .eq('scenario_id', scenarioId)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data;
}

/**
 * Update a journal entry with user's answer
 */
export async function updateJournalEntry(entryId, answer) {
  const { data, error } = await supabase
    .from('journal_entries')
    .update({
      user_answer: answer,
      answered_at: new Date().toISOString(),
    })
    .eq('id', entryId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export default supabase;
