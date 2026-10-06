import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/admin-shell";
import { getAdmin } from "@/server/auth";

// Admin pages are never prerendered: they depend on the session and live data.
export const dynamic = "force-dynamic";

// Second line of defence after middleware: verify the session on the server.
export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getAdmin();
  if (!admin) redirect("/admin/login");
  return <AdminShell email={admin.email}>{children}</AdminShell>;
}
