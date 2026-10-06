import { ButtonLink } from "@/components/ui";
import { Logo } from "@/components/logo";

export default function NotFound() {
  return (
    <div className="wrap flex min-h-screen flex-col items-start justify-center gap-6 py-20">
      <Logo />
      <div className="eyebrow mt-10">404</div>
      <h1 className="h1">That page does not exist.</h1>
      <p className="lead max-w-[480px]">
        The link may be old, or the order may not be paid yet.
      </p>
      <ButtonLink href="/products">Browse products</ButtonLink>
    </div>
  );
}
