-- Add a SELECT policy that explicitly denies all public access to protect sensitive PII
-- This ensures parent emails, parent names, and child names cannot be read by anyone
-- Only server-side operations with service role key can access this data

CREATE POLICY "No public read access to subscriptions"
ON public.community_subscriptions
FOR SELECT
USING (false);