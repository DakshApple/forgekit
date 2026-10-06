import Link from "next/link";
import Image from "next/image";

export function Logo({
  variant = "black",
  width = 100,
  href = "/",
}: {
  variant?: "black" | "white";
  width?: number;
  href?: string | null;
}) {
  const img = (
    <Image
      src={variant === "black" ? "/logo-black.png" : "/logo-white.png"}
      alt="Forgekit"
      width={width}
      height={width * 0.3} // Approximation, adjust based on actual aspect ratio
      style={{ width, height: "auto", display: "block" }}
      priority
    />
  );
  if (!href) return img;
  return (
    <Link href={href} aria-label="Forgekit home">
      {img}
    </Link>
  );
}
