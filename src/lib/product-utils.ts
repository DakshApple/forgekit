import type { Product } from "./types";

/** Cheapest plan of a product. Pure helper, safe in client and server code. */
export function lowestPrice(p: Product) {
  return [...p.plans].sort((a, b) => a.priceInr - b.priceInr)[0];
}
