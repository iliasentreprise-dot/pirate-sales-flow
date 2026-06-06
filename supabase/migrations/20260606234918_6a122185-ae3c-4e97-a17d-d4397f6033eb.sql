
REVOKE ALL ON public.customers FROM anon, authenticated;
REVOKE ALL ON public.email_leads FROM anon, authenticated;
REVOKE ALL ON public.orders FROM anon, authenticated;
REVOKE ALL ON public.upsell_tokens FROM anon, authenticated;

GRANT ALL ON public.customers TO service_role;
GRANT ALL ON public.email_leads TO service_role;
GRANT ALL ON public.orders TO service_role;
GRANT ALL ON public.upsell_tokens TO service_role;

CREATE POLICY "Deny all client access to customers" ON public.customers AS RESTRICTIVE FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);
CREATE POLICY "Deny all client access to email_leads" ON public.email_leads AS RESTRICTIVE FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);
CREATE POLICY "Deny all client access to orders" ON public.orders AS RESTRICTIVE FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);
CREATE POLICY "Deny all client access to upsell_tokens" ON public.upsell_tokens AS RESTRICTIVE FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);
