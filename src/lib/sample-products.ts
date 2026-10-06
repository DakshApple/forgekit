// Sample catalogue cleared. Add your real products via the admin panel.

import type { Product } from "./types";

export type SeedProduct = Omit<Product, "accessUrl" | "keyPrefix">;

export const products: SeedProduct[] = [];
