import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const UPSELL_PRICES: Record<string, { amount: number; label: string }> = {
  upsell0: { amount: 6700, label: "Lives Pirates" },
  upsell1: { amount: 12700, label: "Pirate en Bande Organisée" },
  upsell2: { amount: 9700, label: "Coaching Pirate" },
};

const STRIPE_API = "https://api.stripe.com/v1";

function formEncode(obj: Record<string, string | number | boolean>): string {
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(obj)) {
    params.append(k, String(v));
  }
  return params.toString();
}

async function stripeFetch(
  path: string,
  secretKey: string,
  init: { method?: string; body?: Record<string, string | number | boolean> } = {},
): Promise<any> {
  const headers: Record<string, string> = {
    Authorization: `Bearer ${secretKey}`,
  };
  let body: string | undefined;
  if (init.body) {
    headers["Content-Type"] = "application/x-www-form-urlencoded";
    body = formEncode(init.body);
  }
  const res = await fetch(`${STRIPE_API}${path}`, {
    method: init.method ?? "GET",
    headers,
    body,
  });
  const json = await res.json();
  if (!res.ok) {
    const msg = json?.error?.message || `Stripe error ${res.status}`;
    throw new Error(msg);
  }
  return json;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, upsell_type } = await req.json();

    if (!email || typeof email !== "string") {
      return new Response(JSON.stringify({ success: false, error: "Invalid email" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const product = UPSELL_PRICES[upsell_type as string];
    if (!product) {
      return new Response(JSON.stringify({ success: false, error: "Invalid upsell" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY")!;
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // Look up the saved customer + payment method
    const { data: customer } = await supabase
      .from("customers")
      .select("stripe_customer_id, stripe_payment_method_id")
      .eq("email", email)
      .maybeSingle();

    let stripeCustomerId: string | undefined = customer?.stripe_customer_id ?? undefined;
    let paymentMethodId: string | undefined = customer?.stripe_payment_method_id ?? undefined;

    // Fallback: search customers by email
    if (!stripeCustomerId) {
      const customers = await stripeFetch(
        `/customers?email=${encodeURIComponent(email)}&limit=1`,
        stripeKey,
      );
      if (customers.data?.[0]) {
        stripeCustomerId = customers.data[0].id;
      }
    }

    if (!stripeCustomerId) {
      return new Response(
        JSON.stringify({ success: false, error: "Customer not found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // If no payment method, fetch from customer's saved methods
    if (!paymentMethodId) {
      const methods = await stripeFetch(
        `/payment_methods?customer=${stripeCustomerId}&type=card&limit=1`,
        stripeKey,
      );
      paymentMethodId = methods.data?.[0]?.id;
    }

    if (!paymentMethodId) {
      return new Response(
        JSON.stringify({ success: false, error: "No saved payment method" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Cache for next upsell
    await supabase.from("customers").upsert({
      email,
      stripe_customer_id: stripeCustomerId,
      stripe_payment_method_id: paymentMethodId,
    }, { onConflict: "email" });

    // Charge off-session
    const pi = await stripeFetch("/payment_intents", stripeKey, {
      method: "POST",
      body: {
        amount: product.amount,
        currency: "eur",
        customer: stripeCustomerId,
        payment_method: paymentMethodId,
        off_session: "true",
        confirm: "true",
        "metadata[email]": email,
        "metadata[upsell_type]": upsell_type,
        "metadata[product]": product.label,
      },
    });

    if (pi.status !== "succeeded") {
      return new Response(
        JSON.stringify({ success: false, error: `Status: ${pi.status}` }),
        { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    await supabase.from("orders").insert({
      email,
      stripe_payment_intent_id: pi.id,
      amount: product.amount,
      product_type: upsell_type,
      status: "succeeded",
    });

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("charge-upsell error", err);
    return new Response(
      JSON.stringify({ success: false, error: (err as Error).message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
