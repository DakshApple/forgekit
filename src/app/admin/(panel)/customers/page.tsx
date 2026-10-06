import type { Metadata } from "next";
import { CustomersTable } from "@/components/admin/customers-table";
import { PageHeader } from "@/components/admin/page-header";
import { Button } from "@/components/ui";
import { Icon } from "@/components/icons";
import { listCustomers, ordersAndLicensesFor, pageParams } from "@/server/admin-queries";

export const metadata: Metadata = { title: "Admin customers" };

type SearchParams = Promise<{ page?: string; q?: string }>;

export default async function CustomersPage({ searchParams }: { searchParams: SearchParams }) {
  const f = pageParams(await searchParams, []);
  const list = await listCustomers(f);
  const { orders, licenses } = await ordersAndLicensesFor(list.rows.map((c) => c.email));
  return (
    <>
      <PageHeader
        title="Customers"
        description="Created from orders. One row per email. Nobody signs up."
        actions={
          <Button>
            <Icon name="download" size={16} /> Export CSV
          </Button>
        }
      />
      <CustomersTable
        customers={list.rows}
        orders={orders}
        licenses={licenses}
        total={list.total}
        pageSize={list.pageSize}
      />
    </>
  );
}
