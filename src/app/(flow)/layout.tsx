import { Icon } from "@/components/icons";
import { Logo } from "@/components/logo";

// Checkout and confirmation use a stripped header to keep buyers focused.
export default function FlowLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="border-b border-ink/10">
        <div className="wrap flex min-h-[72px] items-center justify-between">
          <Logo />
          <div className="flex items-center gap-2 text-[13px] text-ink/70">
            <Icon name="lock" size={16} strokeWidth={1.8} />
            Secure checkout
          </div>
        </div>
      </header>
      <main>{children}</main>
    </>
  );
}
