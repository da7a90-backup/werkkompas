import Image from "next/image";
import { cn } from "@/lib/utils";

interface Props {
  /** Rendered height in px. Width auto-scales to the lockup aspect ratio. */
  height?: number;
  className?: string;
  variant?: "light" | "dark";
}

const LOCKUP_W = 343;
const LOCKUP_H = 117;
const ASPECT = LOCKUP_W / LOCKUP_H;

/**
 * Werkkompas full brand lockup (compass + WERK KOMPAS BV + tagline).
 * - "dark"  → for light surfaces (navy text + gold star).
 * - "light" → for dark surfaces (white text + gold star).
 */
export function Logo({
  height = 32,
  className,
  variant = "dark",
}: Props) {
  const isLight = variant === "light";
  const src = isLight ? "/werkkompas-lockup-light.png" : "/werkkompas-lockup.png";
  const width = Math.round(height * ASPECT);

  return (
    <Image
      src={src}
      alt="Werkkompas"
      width={width}
      height={height}
      priority
      className={cn("shrink-0 block", className)}
      style={{ height: `${height}px`, width: `${width}px` }}
    />
  );
}
