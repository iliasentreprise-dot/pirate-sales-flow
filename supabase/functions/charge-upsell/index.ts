import Stripe from "https://esm.sh/stripe@14.21.0?target=deno";
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

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
      apiVersion: "2024-06-20",
    });
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

    let stripeCustomerId = customer?.stripe_customer_id;
    let paymentMethodId = customer?.stripe_payment_method_id;

    // If we don't have it cached, try to find via initial PaymentIntent
    if (!stripeCustomerId || !paymentMethodId) {
      const search = await stripe.paymentIntents.search({
        query: `metadata['email']:'${email}' OR receipt_email:'${email}'`,
        limit: 5,
      }).catch(() => null);

      const pi = search?.data?.find((p) => p.customer && p.payment_method && p.status === "succeeded");
      if (pi) {
        stripeCustomerId = typeof pi.customer === "string" ? pi.customer : pi.customer?.id;
        paymentMethodId = typeof pi.payment_method === "string" ? pi.payment_method : pi.payment_method?.id;
      }
    }

    // Fallback: search customers by email
    if (!stripeCustomerId) {
      const customers = await stripe.customers.list({ email, limit: 1 });
      if (customers.data[0]) {
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
      const methods = await stripe.paymentMethods.list({
        customer: stripeCustomerId,
        type: "card",
        limit: 1,
      });
      paymentMethodId = methods.data[0]?.id;
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
    const pi = await stripe.paymentIntents.create({
      amount: product.amount,
      currency: "eur",
      customer: stripeCustomerId,
      payment_method: paymentMethodId,
      off_session: true,
      confirm: true,
      metadata: { email, upsell_type, product: product.label },
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
