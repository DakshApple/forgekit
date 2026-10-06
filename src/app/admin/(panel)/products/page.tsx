import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, TableShell } from "@/components/admin/page-header";
import { Icon } from "@/components/icons";
import { ButtonLink, Tag } from "@/components/ui";
import { getAllProductsAdmin } from "@/lib/data";
import { formatInr } from "@/lib/format";

export const metadata: Metadata = { title: "Admin products" };

const cols = "grid grid-cols-[minmax(200px,1.5fr)_minmax(180px,1fr)_100px_130px_90px] gap-4";

export default async function AdminProductsPage() {
  const products = await getAllProductsAdmin();
  return (
    <>
      <PageHeader
        title="Products"
        description="Add a tool, set its plans and prices, publish it."
        actions={
          <ButtonLink href="/admin/products/new">
            <Icon name="plus" size={16} /> Add product
          </ButtonLink>
        }
      />
      <div className="mt-8">
        <TableShell minWidth={760}>
          <div className={`${cols} px-6 py-3 text-xs font-medium text-ink/60`}>
            <span>Product</span><span>Plans</span><span>Status</span><span>Updated</span><span />
          </div>
          {products.map((p) => (
            <div key={p.slug} className={`${cols} items-center border-t border-ink/10 px-6 py-4 text-sm hover:bg-tint`}>
              <span>
                <span className="block font-medium">{p.name}</span>
                <span className="block text-[13px] font-light text-ink/65">/products/{p.slug}</span>
              </span>
              <span className="flex flex-wrap gap-1.5">
                {p.plans.map((pl) => (
                  <Tag key={pl.id}>
                    {formatInr(pl.priceInr)} {pl.type === "monthly" ? "/ mo" : "once"}
                  </Tag>
                ))}
              </span>
              <span><Tag solid={p.status === "live"}>{p.status === "live" ? "Live" : "Draft"}</Tag></span>
              <span className="text-ink/75">{p.updatedAt}</span>
              <span className="text-right">
                <Link href={`/admin/products/${p.slug}/edit`} className="font-medium underline underline-offset-4">Edit</Link>
              </span>
            </div>
          ))}
        </TableShell>
      </div>
    </>
  );
}
