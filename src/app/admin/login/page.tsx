import type { Metadata } from "next";
import { LoginForm } from "@/components/admin/login-form";
import { Logo } from "@/components/logo";

export const metadata: Metadata = { title: "Admin sign in" };

// TODO(auth): wire to NextAuth or Supabase Auth. Admin only, no customer accounts.
// Protect everything under /admin (except /admin/login) with middleware.
export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen flex-wrap">
      <div className="relative flex min-h-[320px] flex-1 basis-[520px] flex-col justify-between gap-12 overflow-hidden bg-ink p-8 text-paper md:p-14">
        <div
          aria-hidden
          className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent_0_39px,rgba(255,255,255,0.08)_39px_40px)]"
        />
        <div className="relative">
          <Logo variant="white" width={120} href={null} />
        </div>
        <div className="relative">
          <div className="text-[13px] font-medium text-paper/65">Admin portal</div>
          <div className="mt-5 text-[64px] font-bold leading-[0.95] tracking-[-0.05em] md:text-[96px]">
            Admin.
          </div>
          <p className="mt-6 max-w-[420px] text-lg font-light leading-[30px] text-paper/80">
            Products, licenses, orders and customers. One place, no code.
          </p>
        </div>
      </div>

      <div className="flex flex-1 basis-[480px] items-center justify-center px-6 py-14 md:px-10">
        <LoginForm />
      </div>
    </div>
  );
}
