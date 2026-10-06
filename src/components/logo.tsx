import Link from "next/link";
import Image from "next/image";

/**
 * "black" / "white" force a variant (admin uses black).
 * "auto" follows the storefront theme via CSS, so it never flashes.
 */
export function Logo({
  variant = "black",
  width = 100,
  href = "/",
}: {
  variant?: "black" | "white" | "auto";
  width?: number;
  href?: string | null;
}) {
  const make = (src: string, className?: string, priority = true) => (
    <Image
      src={src}
      alt="Forgekit"
      width={width}
      height={Math.round(width * 0.3)} // Approximation, adjust based on actual aspect ratio
      style={{ width, height: "auto" }}
      className={className ?? "block"}
      priority={priority}
    />
  );

  const img =
    variant === "auto" ? (
      <>
        {make("/logo-black.png", "block dark:hidden")}
        {make("/logo-white.png", "hidden dark:block", false)}
      </>
    ) : (
      make(variant === "black" ? "/logo-black.png" : "/logo-white.png")
    );

  if (!href) return <span className="inline-flex">{img}</span>;
  return (
    <Link href={href} aria-label="Forgekit home" className="inline-flex">
      {img}
    </Link>
  );
}
