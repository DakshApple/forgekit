import Link from "next/link";

export function Logo({
  variant = "black",
  width = 100,
  href = "/",
}: {
  variant?: "black" | "white";
  width?: number;
  href?: string | null;
}) {
  // eslint-disable-next-line @next/next/no-img-element
  const img = (
    <img
      src={variant === "black" ? "/logo-black.png" : "/logo-white.png"}
      alt="Forgekit"
      width={width}
      style={{ width, height: "auto", display: "block" }}
    />
  );
  if (!href) return img;
  return (
    <Link href={href} aria-label="Forgekit home">
      {img}
    </Link>
  );
}
