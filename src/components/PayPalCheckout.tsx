import { useEffect, useRef } from "react";

const PAYPAL_CLIENT_ID =
  "AbwLv3_GiqKnxihz6BZBDHHYRmOjlLtONZtpj5nhAeWDEX9wEgUQ9mrhyt6TUal1lqG1gdZwZLANm8D3";
const PAYPAL_SDK_URL = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=EUR&components=buttons&enable-funding=installment&disable-funding=paylater,venmo`;

interface Props {
  amount: number;
  onSuccess: (email: string, orderId: string) => void;
}

const PayPalCheckout = ({ amount, onSuccess }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const onSuccessRef = useRef(onSuccess);

  useEffect(() => {
    onSuccessRef.current = onSuccess;
  }, [onSuccess]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderButtons = () => {
      const paypal = (window as any).paypal;
      if (!paypal || !container) return;

      container.innerHTML = "";

      const fundingSources = [
        paypal.FUNDING.PAYPAL,
        paypal.FUNDING.CARD,
        paypal.FUNDING.INSTALLMENT,
      ];

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
                    amount: {
                      currency_code: "EUR",
                      value: amount.toFixed(2),
                    },
                  },
                ],
              }),
            onApprove: async (_data: unknown, actions: any) => {
              const order = await actions.order.capture();
              const email = order.payer?.email_address ?? "";
              onSuccessRef.current(email, order.id ?? "");
            },
            onError: (err: unknown) => console.error("PayPal error:", err),
          })
          .render(wrapper);
      });
    };

    if ((window as any).paypal) {
      renderButtons();
    } else {
      const existing = document.getElementById("paypal-sdk");
      if (existing) {
        existing.addEventListener("load", renderButtons);
        return () => {
          existing.removeEventListener("load", renderButtons);
          if (container) container.innerHTML = "";
        };
      } else {
        const script = document.createElement("script");
        script.id = "paypal-sdk";
        script.src = PAYPAL_SDK_URL;
        script.onload = renderButtons;
        script.onerror = () => console.error("PayPal SDK failed to load");
        document.head.appendChild(script);
      }
    }

    return () => {
      if (container) container.innerHTML = "";
    };
  }, [amount]);

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
      <div
        id="paypal-buttons-container"
        ref={containerRef}
        style={{ display: "flex", flexDirection: "column", gap: 12 }}
      />
      <p style={{ textAlign: "center", fontSize: 12, color: "#555", margin: "4px 0 0" }}>
        🔒 Paiement 100% sécurisé par PayPal · SSL 256 bits
      </p>
    </div>
  );
};

export default PayPalCheckout;
