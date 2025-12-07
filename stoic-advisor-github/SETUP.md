# Stoic Advisor - Setup Instructions

This is your complete GitHub-ready project. Follow these steps to get it running.

## Step 1: Push to GitHub (5 min)

1. Go to GitHub.com
2. Click **"New Repository"**
3. Name it: `stoic-advisor`
4. Click **"Create Repository"**
5. You'll see instructions. Follow them to push this code:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/stoic-advisor.git
git push -u origin main
```

## Step 2: Create Supabase Project (10 min)

1. Go to https://supabase.com
2. Click **"New Project"**
3. Name it: `stoic-advisor`
4. Create password and select region
5. Wait 3-5 minutes for creation
6. Go to **Settings > API**
7. Copy **Project URL** and **Anon Key** - save them!

## Step 3: Run Database Schema (5 min)

1. In Supabase, go to **SQL Editor**
2. Click **New Query**
3. Open `stoic-advisor-DATABASE.sql` from this repo
4. Copy ALL the SQL code
5. Paste it into Supabase SQL Editor
6. Click **Run**
7. Verify: Go to **Table Editor** - you should see 4 tables

## Step 4: Get Claude API Key (5 min)

1. Go to https://console.anthropic.com/account/keys
2. Sign up or log in
3. Click **Create Key**
4. Name it: `stoic-advisor`
5. Copy the key - save it somewhere safe!

## Step 5: Deploy to Vercel (5 min)

1. Go to https://vercel.com
2. Click **New Project**
3. Click **Import Git Repository**
4. Select your GitHub repo (`stoic-advisor`)
5. Click **Import**
6. You'll see "Configure Project" - add these environment variables:

```
REACT_APP_SUPABASE_URL = (your Supabase URL from Step 2)
REACT_APP_SUPABASE_ANON_KEY = (your Supabase Anon Key from Step 2)
REACT_APP_CLAUDE_API_KEY = (your Claude key from Step 4)
```

7. Click **Deploy**
8. Wait 2-3 minutes for deployment

## Step 6: Test It! (5 min)

1. Vercel will give you a URL like `https://stoic-advisor-xxx.vercel.app`
2. Open that URL in your browser
3. You should see the Stoic Advisor login page
4. Sign up with any email/password
5. Log in
6. Ask Marcus Aurelius a question
7. See the response with quote + advice!

## You're Done! 🎉

Your app is now live at the Vercel URL.

### Next Steps:

- Test with different questions
- Show friends
- Gather feedback
- Plan Phase 2 features (Stripe, etc.)

## Troubleshooting

### "Page not found" or "Build failed"
- Check Vercel dashboard for build errors
- Ensure all environment variables are set correctly

### "Environment variables missing" error
- Go to Vercel dashboard
- Click your project
- Go to Settings > Environment Variables
- Add all three variables

### "RLS policy violation"
- Ensure you ran the DATABASE.sql successfully
- Check Supabase Table Editor - do you see 4 tables?

### "Failed to generate advice"
- Verify Claude API key is correct
- Check you have credits in Anthropic console

### "Database connection error"
- Verify Supabase URL and Anon Key are correct
- Check .env is being read by Vercel

## Local Development

If you want to develop locally instead:

```bash
# Clone your repo
git clone https://github.com/YOUR-USERNAME/stoic-advisor.git
cd stoic-advisor

# Install dependencies
npm install

# Create .env.local with your keys
echo "REACT_APP_SUPABASE_URL=your-url" > .env.local
echo "REACT_APP_SUPABASE_ANON_KEY=your-key" >> .env.local
echo "REACT_APP_CLAUDE_API_KEY=your-key" >> .env.local

# Start dev server
npm run dev

# Open http://localhost:5173
```

## Support

If you get stuck:
1. Check browser console (F12) for errors
2. Check Vercel build logs
3. Check Supabase dashboard for errors
4. Verify all environment variables are set

---

**You've got this! The app is production-ready.** 🚀
