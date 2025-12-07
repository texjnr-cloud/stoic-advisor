-- Stoic Advisor Database Schema
-- Run this in Supabase SQL Editor to set up the database

-- ============================================================================
-- TABLES
-- ============================================================================

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  tier TEXT NOT NULL DEFAULT 'free' CHECK (tier IN ('free', 'paid')),
  queries_used_this_month INTEGER NOT NULL DEFAULT 0,
  last_reset_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Scenarios table (user's dilemmas/questions)
CREATE TABLE IF NOT EXISTS public.scenarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Responses table (Marcus Aurelius advice)
CREATE TABLE IF NOT EXISTS public.responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scenario_id UUID NOT NULL REFERENCES public.scenarios(id) ON DELETE CASCADE,
  quote TEXT NOT NULL,
  advice TEXT NOT NULL,
  action_plan JSONB, -- Stored as JSON for flexibility
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Journal entries table (reflection prompts & answers)
CREATE TABLE IF NOT EXISTS public.journal_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scenario_id UUID NOT NULL REFERENCES public.scenarios(id) ON DELETE CASCADE,
  prompt TEXT NOT NULL,
  user_answer TEXT,
  answered_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- INDEXES (for performance)
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_scenarios_user_id ON public.scenarios(user_id);
CREATE INDEX IF NOT EXISTS idx_scenarios_created_at ON public.scenarios(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_responses_scenario_id ON public.responses(scenario_id);
CREATE INDEX IF NOT EXISTS idx_journal_entries_scenario_id ON public.journal_entries(scenario_id);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scenarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.journal_entries ENABLE ROW LEVEL SECURITY;

-- Users: Users can only view/edit their own profile
CREATE POLICY "Users can view own profile"
  ON public.users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.users FOR UPDATE
  USING (auth.uid() = id);

-- Scenarios: Users can only view/edit their own scenarios
CREATE POLICY "Users can view own scenarios"
  ON public.scenarios FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create scenarios"
  ON public.scenarios FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own scenarios"
  ON public.scenarios FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own scenarios"
  ON public.scenarios FOR DELETE
  USING (auth.uid() = user_id);

-- Responses: Users can view responses for their scenarios
CREATE POLICY "Users can view responses for own scenarios"
  ON public.responses FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.scenarios
      WHERE scenarios.id = responses.scenario_id
      AND scenarios.user_id = auth.uid()
    )
  );

CREATE POLICY "Service role can insert responses"
  ON public.responses FOR INSERT
  WITH CHECK (auth.role() = 'service_role');

-- Journal entries: Users can view/edit their own journal entries
CREATE POLICY "Users can view own journal entries"
  ON public.journal_entries FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.scenarios
      WHERE scenarios.id = journal_entries.scenario_id
      AND scenarios.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own journal entries"
  ON public.journal_entries FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.scenarios
      WHERE scenarios.id = journal_entries.scenario_id
      AND scenarios.user_id = auth.uid()
    )
  );

CREATE POLICY "Service role can insert journal entries"
  ON public.journal_entries FOR INSERT
  WITH CHECK (auth.role() = 'service_role');

-- ============================================================================
-- FUNCTIONS
-- ============================================================================

-- Function to reset monthly query count (runs on user login or via cron)
CREATE OR REPLACE FUNCTION reset_monthly_queries()
RETURNS void AS $$
BEGIN
  UPDATE public.users
  SET queries_used_this_month = 0,
      last_reset_date = CURRENT_DATE
  WHERE EXTRACT(MONTH FROM last_reset_date) != EXTRACT(MONTH FROM CURRENT_DATE)
    OR EXTRACT(YEAR FROM last_reset_date) != EXTRACT(YEAR FROM CURRENT_DATE);
END;
$$ LANGUAGE plpgsql;

-- Function to increment query count
CREATE OR REPLACE FUNCTION increment_query_count(user_id UUID)
RETURNS INTEGER AS $$
DECLARE
  current_count INTEGER;
BEGIN
  UPDATE public.users
  SET queries_used_this_month = queries_used_this_month + 1
  WHERE id = user_id;
  
  SELECT queries_used_this_month INTO current_count
  FROM public.users
  WHERE id = user_id;
  
  RETURN current_count;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- TRIGGERS
-- ============================================================================

-- Auto-create user profile when they sign up
CREATE OR REPLACE FUNCTION create_user_profile()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email)
  VALUES (new.id, new.email);
  RETURN new;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION create_user_profile();

-- ============================================================================
-- NOTES
-- ============================================================================
-- 
-- RLS Policies:
-- - All tables use auth.uid() to ensure users can only access their own data
-- - Service role (your backend) can insert responses/journal entries
-- - No direct user inserts to responses/journal_entries (done via API)
--
-- Monthly Query Reset:
-- - Call reset_monthly_queries() on first login of the month
-- - Or use a Supabase cron job (requires paid plan)
-- - For MVP, we'll call it in the frontend on app load
--
