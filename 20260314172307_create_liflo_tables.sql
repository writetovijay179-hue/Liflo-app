/*
  # LIFLO App Database Schema

  ## Overview
  This migration creates the core database structure for the LIFLO productivity app,
  which helps users focus on 3 daily priorities to maintain life balance.

  ## 1. New Tables
  
  ### `waitlist`
  Stores email signups with referral tracking for viral growth
  - `id` (uuid, primary key) - Unique identifier
  - `email` (text, unique) - User's email address
  - `referral_code` (text, unique) - Unique code for sharing
  - `referred_by` (uuid, nullable) - References who referred them
  - `referral_count` (integer) - Number of successful referrals
  - `created_at` (timestamptz) - Signup timestamp
  
  ### `priorities`
  Stores daily priorities for authenticated users
  - `id` (uuid, primary key) - Unique identifier
  - `user_id` (uuid) - References auth.users
  - `title` (text) - Priority task title
  - `completed` (boolean) - Completion status
  - `completed_at` (timestamptz, nullable) - When completed
  - `date` (date) - Which day this priority is for
  - `position` (integer) - Order (1-3)
  - `created_at` (timestamptz) - Creation timestamp
  
  ### `share_cards`
  Tracks shared completion cards for analytics
  - `id` (uuid, primary key) - Unique identifier
  - `user_id` (uuid) - References auth.users
  - `date` (date) - Date of completion
  - `share_count` (integer) - Number of times shared
  - `created_at` (timestamptz) - Creation timestamp

  ## 2. Security
  - Enable Row Level Security (RLS) on all tables
  - Waitlist: Public can insert, authenticated users can read their own
  - Priorities: Users can only access their own priorities
  - Share cards: Users can only access their own share cards

  ## 3. Indexes
  - Add indexes for common queries (email lookups, user_id queries, date filters)
*/

-- Create waitlist table
CREATE TABLE IF NOT EXISTS waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  referral_code text UNIQUE NOT NULL,
  referred_by uuid REFERENCES waitlist(id),
  referral_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create priorities table
CREATE TABLE IF NOT EXISTS priorities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  completed boolean DEFAULT false,
  completed_at timestamptz,
  date date NOT NULL,
  position integer NOT NULL CHECK (position >= 1 AND position <= 3),
  created_at timestamptz DEFAULT now()
);

-- Create share_cards table
CREATE TABLE IF NOT EXISTS share_cards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  date date NOT NULL,
  share_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_referral_code ON waitlist(referral_code);
CREATE INDEX IF NOT EXISTS idx_waitlist_referred_by ON waitlist(referred_by);
CREATE INDEX IF NOT EXISTS idx_priorities_user_id ON priorities(user_id);
CREATE INDEX IF NOT EXISTS idx_priorities_date ON priorities(date);
CREATE INDEX IF NOT EXISTS idx_priorities_user_date ON priorities(user_id, date);
CREATE INDEX IF NOT EXISTS idx_share_cards_user_id ON share_cards(user_id);
CREATE INDEX IF NOT EXISTS idx_share_cards_date ON share_cards(date);

-- Enable Row Level Security
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE priorities ENABLE ROW LEVEL SECURITY;
ALTER TABLE share_cards ENABLE ROW LEVEL SECURITY;

-- Waitlist policies
CREATE POLICY "Anyone can join waitlist"
  ON waitlist FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Users can read their own waitlist entry"
  ON waitlist FOR SELECT
  TO authenticated
  USING (email = (SELECT email FROM auth.users WHERE id = auth.uid()));

CREATE POLICY "Users can update their own referral count"
  ON waitlist FOR UPDATE
  TO authenticated
  USING (email = (SELECT email FROM auth.users WHERE id = auth.uid()))
  WITH CHECK (email = (SELECT email FROM auth.users WHERE id = auth.uid()));

-- Priorities policies
CREATE POLICY "Users can view own priorities"
  ON priorities FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own priorities"
  ON priorities FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own priorities"
  ON priorities FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own priorities"
  ON priorities FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Share cards policies
CREATE POLICY "Users can view own share cards"
  ON share_cards FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own share cards"
  ON share_cards FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own share cards"
  ON share_cards FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Function to generate unique referral code
CREATE OR REPLACE FUNCTION generate_referral_code()
RETURNS text AS $$
DECLARE
  chars text := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  result text := '';
  i integer;
BEGIN
  FOR i IN 1..8 LOOP
    result := result || substr(chars, floor(random() * length(chars) + 1)::integer, 1);
  END LOOP;
  RETURN result;
END;
$$ LANGUAGE plpgsql;