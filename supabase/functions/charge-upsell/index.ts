const stripe_key = Deno.env.get("STRIPE_SECRET_KEY") ?? "";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, apikey, x-client-info",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, amount, upsell_type } = await req.json();

    if (!email) {
      return new Response(JSON.stringify({ error: "Missing email" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const upsellAmounts: Record<string, number> = {
      upsell0: 9700,
      upsell1: 49700,
      upsell2: 9700,
    };
    const chargeAmount =
      typeof amount === "number" && amount > 0
        ? amount
        : (upsell_type && upsellAmounts[upsell_type]) || 9700;

    // Lookup customer in DB
    const lookupRes = await fetch(
      `${SUPABASE_URL}/rest/v1/customers?email=eq.${encodeURIComponent(email)}&select=stripe_customer_id,stripe_payment_method_id&limit=1`,
      {
        headers: {
          apikey: SERVICE_ROLE,
          Authorization: `Bearer ${SERVICE_ROLE}`,
        },
      },
    );

    if (!lookupRes.ok) {
      const t = await lookupRes.text();
      return new Response(JSON.stringify({ error: "DB lookup failed", details: t }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const rows = await lookupRes.json();
    const customer = Array.isArray(rows) ? rows[0] : null;

    if (!customer || !customer.stripe_customer_id || !customer.stripe_payment_method_id) {
      return new Response(
        JSON.stringify({ error: "No saved payment method for this email" }),
        {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const body = new URLSearchParams();
    body.append("amount", String(chargeAmount));
    body.append("currency", "eur");
    body.append("customer", customer.stripe_customer_id);
    body.append("payment_method", customer.stripe_payment_method_id);
    body.append("confirm", "true");
    body.append("off_session", "true");

    const res = await fetch("https://api.stripe.com/v1/payment_intents", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + stripe_key,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    });

    const pi = await res.json();

    if (pi.error) {
      return new Response(JSON.stringify({ error: pi.error.message }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({ success: true, status: pi.status, payment_intent_id: pi.id }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
