import Stripe from "https://esm.sh/stripe@14.21.0?target=deno";

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
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
      apiVersion: "2024-06-20",
    });

    const body = await req.json();
    const amount = Number(body?.amount);
    const bump = Boolean(body?.bump);
    const paymentMethodTypes: string[] = Array.isArray(body?.payment_method_types)
      ? body.payment_method_types
      : ["card"];

    if (!Number.isInteger(amount) || amount < 100 || amount > 1000000) {
      return new Response(JSON.stringify({ error: "Invalid amount" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const pi = await stripe.paymentIntents.create({
      amount,
      currency: "eur",
      payment_method_types: paymentMethodTypes,
      ...(paymentMethodTypes.includes("card") && {
        setup_future_usage: "off_session",
      }),
      payment_method_options: {
        klarna: {
          preferred_locale: "fr-FR",
        },
      },
      metadata: {
        bump: bump ? "1" : "0",
        product: bump ? "systeme_pirate_bump" : "systeme_pirate",
      },
    });

    return new Response(
      JSON.stringify({ clientSecret: pi.client_secret }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("create-payment-intent error", err);
    return new Response(
      JSON.stringify({ error: (err as Error).message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
