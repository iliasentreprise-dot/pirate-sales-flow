import type { CSSProperties } from "react";

interface SoldOutButtonProps {
  className?: string;
  style?: CSSProperties;
}

const SoldOutButton = ({ className, style }: SoldOutButtonProps) => (
  <button
    type="button"
    disabled
    className={className}
    style={{
      display: "inline-flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
      maxWidth: "100%",
      padding: "18px 28px",
      border: "1px solid rgba(167,139,250,0.4)",
      borderRadius: 8,
      background: "#312345",
      color: "#f2ead8",
      fontFamily: "'DM Sans', sans-serif",
      fontSize: "clamp(14px, 3vw, 20px)",
      fontWeight: 700,
      lineHeight: 1.4,
      textAlign: "center",
      ...style,
      height: "auto",
      cursor: "not-allowed",
      animation: "none",
      transform: "none",
      boxShadow: "none",
    }}
  >
    <s style={{ color: "#a78bfa", fontSize: "0.85em" }}>544 €</s>
    <span>AUCUNE PLACE DISPONIBLE</span>
  </button>
);

export default SoldOutButton;
