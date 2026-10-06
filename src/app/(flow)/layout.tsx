import { Icon } from "@/components/icons";
import { Logo } from "@/components/logo";

// Checkout and confirmation use a stripped header to keep buyers focused.
export default function FlowLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div data-store className="store-root">
      <header className="border-b border-ink/[0.06] bg-paper/80 backdrop-blur-xl">
        <div className="wrap flex min-h-[72px] items-center justify-between">
          <Logo variant="auto" />
          <div className="flex items-center gap-2 text-[13px] font-medium text-ink/70">
            <Icon name="lock" size={16} strokeWidth={2} className="text-sapphire-500" />
            Secure checkout
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
