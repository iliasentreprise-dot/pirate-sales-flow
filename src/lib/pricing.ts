export const FORMATION_PRICE_EUR = 97;
export const ORDER_BUMP_PRICE_EUR = 47;

export function getTotalPriceEur(bumpAdded: boolean): number {
  return FORMATION_PRICE_EUR + (bumpAdded ? ORDER_BUMP_PRICE_EUR : 0);
}

export function getTotalPriceCents(bumpAdded: boolean): number {
  return getTotalPriceEur(bumpAdded) * 100;
}

export function getRevolutPaymentLink(bumpAdded: boolean): string {
  const amount = getTotalPriceCents(bumpAdded);
  const note = bumpAdded
    ? "Formation%20%20%20Logiciel%20d%27automatisation"
    : "Le%20Syst%C3%A8me%20pirate%20complet";

  return `https://revolut.me/ilias_business?currency=EUR&amount=${amount}&note=${note}`;
}