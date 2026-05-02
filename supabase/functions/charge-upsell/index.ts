const stripe_key = Deno.env.get("STRIPE_SECRET_KEY") ?? "";

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
    const { customer_id, payment_method_id, amount } = await req.json();

    const body = new URLSearchParams();

    body.append("amount", String(amount));
    body.append("currency", "eur");
    body.append("customer", customer_id);
    body.append("payment_method", payment_method_id);
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

    return new Response(JSON.stringify({ success: true, status: pi.status }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
