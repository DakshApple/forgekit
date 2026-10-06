const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export function formatInr(amount: number): string {
  return inr.format(amount);
}

export function billingLabel(type: "monthly" | "one-time"): string {
  return type === "monthly" ? "/ month" : "one-time";
}
