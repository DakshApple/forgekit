import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  // Public static routes
  const routes = ["", "/products", "/terms", "/privacy", "/refunds"].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
    })
  );

  // Dynamic product routes
  const products = await getProducts();
  const productRoutes = products.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date(product.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [...routes, ...productRoutes];
}
