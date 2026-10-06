import { SiteFooter } from "@/components/store/site-footer";
import { GlassNav } from "@/components/site/glass-nav";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div data-store className="store-root">
      <GlassNav />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
