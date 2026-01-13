-- Create table for community notification subscriptions
CREATE TABLE public.community_subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  parent_name TEXT NOT NULL,
  child_name TEXT,
  parental_consent BOOLEAN NOT NULL DEFAULT false,
  consent_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  CONSTRAINT consent_required CHECK (parental_consent = true)
);

-- Add unique constraint on email to prevent duplicates
ALTER TABLE public.community_subscriptions ADD CONSTRAINT unique_email UNIQUE (email);

-- Enable Row Level Security
ALTER TABLE public.community_subscriptions ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert a subscription (public form)
CREATE POLICY "Anyone can subscribe to community notifications"
ON public.community_subscriptions
FOR INSERT
WITH CHECK (true);

-- Policy: No one can select subscriptions from client (admin only via service role)
-- No SELECT policy = no public read access

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_community_subscriptions_updated_at
BEFORE UPDATE ON public.community_subscriptions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();