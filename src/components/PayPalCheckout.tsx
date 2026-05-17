import { useEffect, useRef, useState } from "react";

const PAYPAL_CLIENT_ID =
  "AbwLv3_GiqKnxihz6BZBDHHYRmOjlLtONZtpj5nhAeWDEX9wEgUQ9mrhyt6TUal1lqG1gdZwZLANm8D3";
const PAYPAL_SDK_URL =
  `https://www.paypal.com/sdk/js` +
  `?client-id=${PAYPAL_CLIENT_ID}` +
  `&currency=EUR` +
  `&components=buttons` +
  `&enable-funding=installment` +
  `&disable-funding=paylater,venmo`;

interface Props {
  amount: number;
  onSuccess: (email: string, orderId: string) => void;
}

const PayPalCheckout = ({ amount, onSuccess }: Props) => {
  const [sdkReady, setSdkReady] = useState(false);
  const [sdkError, setSdkError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const onSuccessRef = useRef(onSuccess);

  useEffect(() => {
    onSuccessRef.current = onSuccess;
  }, [onSuccess]);

  // Step 1: load SDK script
  useEffect(() => {
    if ((window as any).paypal) {
      setSdkReady(true);
      return;
    }

    const existing = document.getElementById("paypal-sdk");
    if (existing) {
      const onLoad = () => setSdkReady(true);
      const onError = () => {
        console.error("[PayPal] SDK script failed to load (already in DOM)");
        setSdkError(true);
      };
      existing.addEventListener("load", onLoad);
      existing.addEventListener("error", onError);
      return () => {
        existing.removeEventListener("load", onLoad);
        existing.removeEventListener("error", onError);
      };
    }

    const script = document.createElement("script");
    script.id = "paypal-sdk";
    script.src = PAYPAL_SDK_URL;
    script.onload = () => {
      console.log("[PayPal] SDK loaded successfully");
      setSdkReady(true);
    };
    script.onerror = () => {
      console.error(
        "[PayPal] SDK failed to load — likely blocked by Content-Security-Policy. " +
        "Check Network tab > paypal.com entries, or Console for CSP errors."
      );
      setSdkError(true);
    };
    document.head.appendChild(script);
  }, []);

  // Step 2: render buttons once SDK is ready AND container is in the DOM
  useEffect(() => {
    if (!sdkReady) return;
    const container = containerRef.current;
    if (!container) return;

    const paypal = (window as any).paypal;
    if (!paypal) {
      console.error("[PayPal] window.paypal not found despite sdkReady=true");
      return;
    }

    container.innerHTML = "";

    const fundingSources = [
      paypal.FUNDING.PAYPAL,
      paypal.FUNDING.CARD,
      paypal.FUNDING.INSTALLMENT,
    ] as const;

    fundingSources.forEach((fundingSource) => {
      const wrapper = document.createElement("div");
      container.appendChild(wrapper);

      paypal
        .Buttons({
          fundingSource,
          style: { layout: "horizontal", height: 50, shape: "rect" },
          createOrder: (_data: unknown, actions: any) =>
            actions.order.create({
              intent: "CAPTURE",
              purchase_units: [
                {
                  amount: { currency_code: "EUR", value: amount.toFixed(2) },
                },
              ],
            }),
          onApprove: async (_data: unknown, actions: any) => {
            const order = await actions.order.capture();
            const email = order.payer?.email_address ?? "";
            onSuccessRef.current(email, order.id ?? "");
          },
          onError: (err: unknown) =>
            console.error("[PayPal] Button error:", err),
        })
        .render(wrapper);
    });

    return () => {
      if (container) container.innerHTML = "";
    };
  }, [sdkReady, amount]);

  return (
    <div
      style={{
        background: "#1a1a1a",
        border: "1px solid rgba(167,139,250,0.25)",
        padding: 30,
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <div
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 13,
          color: "#a78bfa",
          letterSpacing: 3,
          marginBottom: 4,
        }}
      >
        CHOISISSEZ VOTRE MODE DE PAIEMENT
      </div>

      {sdkError ? (
        <div
          style={{
            padding: "16px",
            textAlign: "center",
            color: "#e8110a",
            fontSize: 14,
          }}
        >
          ⚠️ Impossible de charger PayPal. Vérifiez votre connexion ou désactivez votre bloqueur de publicités.
        </div>
      ) : !sdkReady ? (
        <div
          style={{
            padding: "20px",
            textAlign: "center",
            color: "#888",
            fontSize: 14,
            letterSpacing: 0.5,
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: 16,
              height: 16,
              border: "2px solid #a78bfa",
              borderTopColor: "transparent",
              borderRadius: "50%",
              animation: "paypal-spin 0.8s linear infinite",
              marginRight: 10,
              verticalAlign: "middle",
            }}
          />
          Chargement des options de paiement...
          <style>{`
            @keyframes paypal-spin {
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      ) : (
        <div
          id="paypal-buttons-container"
          ref={containerRef}
          style={{ display: "flex", flexDirection: "column", gap: 12 }}
        />
      )}

      <p style={{ textAlign: "center", fontSize: 12, color: "#555", margin: "4px 0 0" }}>
        🔒 Paiement 100% sécurisé par PayPal · SSL 256 bits
      </p>
    </div>
  );
};

export default PayPalCheckout;
