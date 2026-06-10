import Image from "next/image";
import { cn } from "@/lib/utils";

interface Props {
  size?: number;
  className?: string;
  variant?: "light" | "dark";
  showWordmark?: boolean;
}

/**
 * Werkkompas brand mark — renders the real logo PNG asset.
 * - "dark"  → for light surfaces (navy ring + gold star).
 * - "light" → for dark surfaces (white ring + gold star).
 */
export function Logo({
  size = 32,
  className,
  variant = "dark",
  showWordmark = false,
}: Props) {
  const isLight = variant === "light";
  const src = isLight ? "/werkkompas-mark-light.png" : "/werkkompas-mark.png";

  return (
    <div className={cn("inline-flex items-center gap-3", className)}>
      <Image
        src={src}
        alt="Werkkompas"
        width={size}
        height={size}
        priority={size >= 32}
        className="shrink-0 block"
        style={{ width: size, height: size }}
      />
      {showWordmark && (
        <span
          className={cn(
            "font-display text-lg font-extrabold tracking-tightest",
            isLight ? "text-white" : "text-navy-700"
          )}
        >
          Werkkompas
        </span>
      )}
    </div>
  );
}
