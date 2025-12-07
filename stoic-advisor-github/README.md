# Stoic Advisor 🏛️

Ask Marcus Aurelius for personalized stoic wisdom on life's dilemmas.

## Features

- 💬 **Chat with Marcus Aurelius** - Ask for stoic advice on any life situation
- 🎯 **Personalized Guidance** - Get quotes, advice, and virtue focus tailored to your situation
- 📋 **4-Week Action Plans** - Concrete daily steps to implement stoic principles
- 📔 **Journal Prompts** - Reflection questions to deepen understanding
- 🔒 **Secure & Private** - Your data stays in your database
- 📱 **Mobile Responsive** - Works on all devices
- ⏱️ **Free & Paid Tiers** - 3 questions/month free, unlimited with subscription

## Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth)
- **AI**: Claude API (Anthropic)
- **Deployment**: Vercel

## Quick Start

### Prerequisites

- Supabase account (free at supabase.com)
- Claude API key (from console.anthropic.com)
- GitHub account (free at github.com)

### Setup

1. **Clone this repo** and push to your GitHub account
2. **Create Supabase project** at supabase.com
3. **Run database schema** - Copy `stoic-advisor-DATABASE.sql` into Supabase SQL Editor and execute
4. **Get Claude API key** at console.anthropic.com/account/keys
5. **Deploy to Vercel** - Connect your GitHub repo to Vercel (auto-deploys)
6. **Set environment variables** in Vercel:
   ```
   REACT_APP_SUPABASE_URL=your-supabase-url
   REACT_APP_SUPABASE_ANON_KEY=your-anon-key
   REACT_APP_CLAUDE_API_KEY=your-claude-key
   ```

## Project Structure

```
stoic-advisor/
├── src/
│   ├── components/
│   │   ├── ChatInterface.jsx      # Main chat UI
│   │   ├── ResponseCard.jsx       # Display advice
│   │   ├── ActionPlan.jsx         # 4-week plan
│   │   ├── JournalPrompts.jsx     # Reflection prompts
│   │   └── UpgradePrompt.jsx      # Free tier limit notice
│   ├── services/
│   │   ├── claudeApi.js           # Claude API calls
│   │   └── supabaseClient.js      # Database & auth
│   ├── App.jsx                    # Main app + login
│   ├── main.jsx                   # Entry point
│   └── index.css                  # Styles
├── public/                        # Static files
├── index.html                     # HTML entry
├── package.json                   # Dependencies
├── vite.config.js                 # Vite config
├── tailwind.config.js             # Tailwind config
└── .env.example                   # Environment variables
```

## Environment Variables

Create `.env.local` in the root directory:

```env
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key-here
REACT_APP_CLAUDE_API_KEY=sk-ant-your-key-here
```

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview build
npm run preview
```

## Deployment to Vercel

1. Push this repo to GitHub
2. Go to vercel.com
3. Click "New Project"
4. Select your GitHub repo
5. Add environment variables (see above)
6. Click "Deploy"

That's it! Vercel will auto-deploy on every push.

## Database Setup

Run this SQL in Supabase SQL Editor:

1. Go to your Supabase project
2. Click "SQL Editor"
3. Create new query
4. Copy contents from `stoic-advisor-DATABASE.sql`
5. Execute

This creates:
- `users` table (auth + tier info)
- `scenarios` table (user's dilemmas)
- `responses` table (Marcus's advice)
- `journal_entries` table (reflection prompts)

All with row-level security enabled.

## How It Works

1. User signs up/logs in via Supabase Auth
2. User enters a life dilemma
3. App checks free tier limit (3/month for free users)
4. Claude API generates:
   - Relevant stoic quote
   - Tailored advice incorporating virtues
   - Control insight (what's in your control)
   - Perspective shift
5. App generates:
   - 4-week action plan with daily steps
   - 5 reflection journal prompts
6. Everything is stored in Supabase
7. User can review past scenarios and journal entries

## Monetization

- **Free Tier**: 3 questions per month
- **Paid Tier**: Unlimited questions ($4.99/month recommended)
- Implement Stripe for Phase 2

## Future Features

- Voice/audio responses
- Follow-up guidance system
- Adaptive difficulty (track struggling virtues)
- Community features (share scenarios)
- Habit tracking dashboard
- Email reminders
- Mobile app (React Native)

## Troubleshooting

### "Missing environment variables"
- Check `.env.local` exists in root directory
- Verify all three variables are present
- Restart dev server

### "RLS policy violation"
- Ensure you ran the DATABASE.sql in Supabase
- Check that 4 tables exist in Supabase Table Editor

### "Failed to generate advice"
- Verify Claude API key is correct
- Check you have API credits in Anthropic console
- Verify environment variable is set

### Blank page
- Open browser console (F12)
- Look for red errors
- Report the error message

## Support

If you get stuck:
1. Check browser console (F12) for errors
2. Verify all environment variables are set
3. Ensure database tables were created
4. Check Supabase dashboard for errors

## License

MIT - Feel free to modify and use for your own projects

## Author

Built with Stoic Advisor to provide wisdom from Marcus Aurelius for modern life challenges.

---

**Ready to build?** Push this to GitHub, deploy to Vercel, and start asking Marcus for advice! 🚀
