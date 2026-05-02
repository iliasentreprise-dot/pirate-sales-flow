import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { token } = await req.json();
    if (!token || typeof token !== "string") {
      return new Response(JSON.stringify({ valid: false }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { data, error } = await supabase
      .from("upsell_tokens")
      .select("token, email, expires_at")
      .eq("token", token)
      .maybeSingle();

    if (error) throw error;

    const valid = !!data && new Date(data.expires_at) > new Date();

    return new Response(
      JSON.stringify({ valid, email: valid ? data!.email : null }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("validate-upsell-token error", err);
    return new Response(JSON.stringify({ valid: false }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
