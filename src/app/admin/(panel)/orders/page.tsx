import type { Metadata } from "next";
import { OrdersTable } from "@/components/admin/orders-table";
import { PageHeader } from "@/components/admin/page-header";
import { Button } from "@/components/ui";
import { Icon } from "@/components/icons";
import { listOrders, orderCounts, pageParams } from "@/server/admin-queries";

export const metadata: Metadata = { title: "Admin orders" };

type SearchParams = Promise<{ page?: string; q?: string; status?: string }>;

export default async function OrdersPage({ searchParams }: { searchParams: SearchParams }) {
  const f = pageParams(await searchParams, ["paid", "pending", "failed", "refunded"]);
  const [list, counts] = await Promise.all([listOrders(f), orderCounts()]);
  return (
    <>
      <PageHeader
        title="Orders"
        description="Every payment attempt, with its Razorpay id and license."
        actions={
          <Button size="md">
            <Icon name="download" size={16} /> Export CSV
          </Button>
        }
      />
      <OrdersTable orders={list.rows} total={list.total} pageSize={list.pageSize} counts={counts} />
    </>
  );
}
