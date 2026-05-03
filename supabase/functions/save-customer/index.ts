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
    const { payment_intent_id, email } = await req.json();
    if (!payment_intent_id || !email) {
      return new Response(JSON.stringify({ error: "Missing payment_intent_id or email" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Retrieve PaymentIntent from Stripe
    const piRes = await fetch(
      `https://api.stripe.com/v1/payment_intents/${encodeURIComponent(payment_intent_id)}`,
      {
        headers: {
          Authorization: `Bearer ${stripe_key}`,
        },
      },
    );
    const pi = await piRes.json();
    if (!piRes.ok) {
      return new Response(JSON.stringify({ error: pi?.error?.message ?? "Stripe error" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let customerId: string | null =
      typeof pi.customer === "string" ? pi.customer : pi.customer?.id ?? null;
    const paymentMethodId: string | null =
      typeof pi.payment_method === "string"
        ? pi.payment_method
        : pi.payment_method?.id ?? null;

    // If no customer attached, create one and attach PM so it can be re-used off_session
    if (!customerId && paymentMethodId) {
      const custBody = new URLSearchParams();
      custBody.set("email", email);
      custBody.set("payment_method", paymentMethodId);
      custBody.set("invoice_settings[default_payment_method]", paymentMethodId);
      const custRes = await fetch("https://api.stripe.com/v1/customers", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${stripe_key}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: custBody.toString(),
      });
      const cust = await custRes.json();
      if (custRes.ok) {
        customerId = cust.id;
        // Attach PM to customer (idempotent)
        await fetch(
          `https://api.stripe.com/v1/payment_methods/${paymentMethodId}/attach`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${stripe_key}`,
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({ customer: customerId! }).toString(),
          },
        );
      }
    }

    // Upsert into customers table via PostgREST
    const upsertRes = await fetch(
      `${SUPABASE_URL}/rest/v1/customers?on_conflict=email`,
      {
        method: "POST",
        headers: {
          apikey: SERVICE_ROLE,
          Authorization: `Bearer ${SERVICE_ROLE}`,
          "Content-Type": "application/json",
          Prefer: "resolution=merge-duplicates,return=representation",
        },
        body: JSON.stringify({
          email,
          stripe_customer_id: customerId,
          stripe_payment_method_id: paymentMethodId,
          updated_at: new Date().toISOString(),
        }),
      },
    );

    if (!upsertRes.ok) {
      const errTxt = await upsertRes.text();
      return new Response(JSON.stringify({ error: "DB upsert failed", details: errTxt }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        customer_id: customerId,
        payment_method_id: paymentMethodId,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
