import type { Metadata } from "next";
import { LicenseManager } from "@/components/admin/license-manager";
import { PageHeader } from "@/components/admin/page-header";
import {
  licenseCounts,
  licenseEventsByKey,
  listLicenses,
  pageParams,
} from "@/server/admin-queries";

export const metadata: Metadata = { title: "Admin licenses" };

type SearchParams = Promise<{ page?: string; q?: string; status?: string }>;

export default async function LicensesPage({ searchParams }: { searchParams: SearchParams }) {
  const f = pageParams(await searchParams, ["active", "expired", "revoked"]);
  const [list, counts] = await Promise.all([listLicenses(f), licenseCounts()]);
  const events = await licenseEventsByKey(list.rows.map((l) => l.key));
  return (
    <>
      <PageHeader
        title="Licenses"
        description="Mark a key active, expired or revoked. Every change is logged."
      />
      <LicenseManager
        initial={list.rows}
        initialEvents={events}
        total={list.total}
        pageSize={list.pageSize}
        counts={counts}
      />
    </>
  );
}
