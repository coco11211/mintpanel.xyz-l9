-- Create enum for token plan types
CREATE TYPE public.token_plan AS ENUM ('basic', 'advanced');

-- Create enum for network types
CREATE TYPE public.solana_network AS ENUM ('mainnet-beta', 'devnet');

-- Create enum for transaction types
CREATE TYPE public.token_transaction_type AS ENUM ('create', 'mint', 'burn', 'freeze', 'thaw', 'update_metadata', 'revoke_authority', 'transfer_authority');

-- Create users table (wallet-based auth)
CREATE TABLE public.users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  wallet_address TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on users
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Users can read their own record
CREATE POLICY "Users can view their own record"
  ON public.users FOR SELECT
  USING (wallet_address = current_setting('request.jwt.claims', true)::json->>'wallet_address');

-- Anyone can insert (for initial signup)
CREATE POLICY "Anyone can create a user record"
  ON public.users FOR INSERT
  WITH CHECK (true);

-- Create tokens table
CREATE TABLE public.tokens (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  mint_address TEXT NOT NULL UNIQUE,
  creator_wallet TEXT NOT NULL,
  name TEXT NOT NULL,
  symbol TEXT NOT NULL,
  decimals INTEGER NOT NULL DEFAULT 9,
  initial_supply NUMERIC NOT NULL,
  description TEXT,
  image_url TEXT,
  metadata_uri TEXT,
  plan token_plan NOT NULL DEFAULT 'basic',
  network solana_network NOT NULL DEFAULT 'devnet',
  creation_signature TEXT,
  payment_signature TEXT,
  payment_amount NUMERIC,
  is_metadata_mutable BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on tokens
ALTER TABLE public.tokens ENABLE ROW LEVEL SECURITY;

-- Anyone can view tokens (public data)
CREATE POLICY "Tokens are publicly viewable"
  ON public.tokens FOR SELECT
  USING (true);

-- Only the creator can insert their tokens
CREATE POLICY "Creators can insert their tokens"
  ON public.tokens FOR INSERT
  WITH CHECK (true);

-- Create transactions table
CREATE TABLE public.token_transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  signature TEXT NOT NULL,
  transaction_type token_transaction_type NOT NULL,
  token_mint TEXT NOT NULL,
  user_wallet TEXT NOT NULL,
  details JSONB,
  network solana_network NOT NULL DEFAULT 'devnet',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on transactions
ALTER TABLE public.token_transactions ENABLE ROW LEVEL SECURITY;

-- Anyone can view transactions (public blockchain data)
CREATE POLICY "Transactions are publicly viewable"
  ON public.token_transactions FOR SELECT
  USING (true);

-- Anyone can insert transactions
CREATE POLICY "Anyone can insert transactions"
  ON public.token_transactions FOR INSERT
  WITH CHECK (true);

-- Create fee configuration table
CREATE TABLE public.fee_config (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  network solana_network NOT NULL,
  basic_fee_sol NUMERIC NOT NULL DEFAULT 0.05,
  advanced_fee_sol NUMERIC NOT NULL DEFAULT 0.1,
  fee_wallet TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(network)
);

-- Enable RLS on fee_config
ALTER TABLE public.fee_config ENABLE ROW LEVEL SECURITY;

-- Anyone can read fee config
CREATE POLICY "Fee config is publicly viewable"
  ON public.fee_config FOR SELECT
  USING (true);

-- Insert default fee configurations
INSERT INTO public.fee_config (network, basic_fee_sol, advanced_fee_sol, fee_wallet)
VALUES
  ('devnet', 0.03, 0.05, ''),
  ('mainnet-beta', 0.03, 0.05, '');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for users table
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger for fee_config table
CREATE TRIGGER update_fee_config_updated_at
  BEFORE UPDATE ON public.fee_config
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();