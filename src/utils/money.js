export function formatMoney(amountCents) {
  return amountCents >= 0
    ? `$${(amountCents / 100).toFixed(2)}`
    : `-$${Math.abs(amountCents / 100).toFixed(2)}`;
}
