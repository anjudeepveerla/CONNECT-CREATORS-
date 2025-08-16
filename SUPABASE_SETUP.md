# Supabase Authentication Setup

This project now uses Supabase for real email and password authentication instead of demo access.

## Setup Steps

### 1. Create a Supabase Project
1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Create a new project
3. Wait for the project to be ready

### 2. Get Your Project Credentials
1. In your Supabase dashboard, go to Settings > API
2. Copy your Project URL and anon/public key
3. Create a `.env.local` file in your project root with:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

### 3. Configure Authentication
1. In Supabase dashboard, go to Authentication > Settings
2. Enable Email confirmations (recommended)
3. Configure your site URL and redirect URLs

### 4. Create Database Tables (Optional)
The app will automatically create user profiles when users sign up. If you want to customize the schema, you can create a `users` table in your Supabase database with:

```sql
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  role TEXT CHECK (role IN ('creator', 'brand', 'agency')) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.users
  FOR INSERT WITH CHECK (auth.uid() = id);
```

### 5. Test the Setup
1. Run `npm run dev` or `pnpm dev`
2. Go to `/login` page
3. Try creating a new account
4. Test logging in with the created account

## Features

- **Real Authentication**: Email/password signup and login
- **User Roles**: Creator, Brand, or Agency account types
- **Secure Routes**: Protected dashboard and calculator pages
- **Session Management**: Automatic session handling and logout
- **Error Handling**: Proper validation and error messages

## Troubleshooting

- Make sure your environment variables are correct
- Check that Supabase project is active and not paused
- Verify email confirmation settings if using email verification
- Check browser console for any authentication errors

## Security Notes

- Never commit your `.env.local` file to version control
- The anon key is safe to use in client-side code
- Row Level Security (RLS) is recommended for production
- Consider enabling additional authentication methods like OAuth 