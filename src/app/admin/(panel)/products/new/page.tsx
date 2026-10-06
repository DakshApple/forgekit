import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/page-header";
import { ProductForm } from "@/components/admin/product-form";

export const metadata: Metadata = { title: "Add product" };

export default function NewProductPage() {
  return (
    <>
      <PageHeader title="Add product" description="Basics, plans and prices, and how the buyer gets access." />
      <ProductForm />
    </>
  );
}
