import { cn } from "@/lib/utils";

interface Props {
  size?: number;
  className?: string;
  variant?: "light" | "dark";
  showWordmark?: boolean;
}

export function Logo({
  size = 32,
  className,
  variant = "dark",
  showWordmark = false,
}: Props) {
  const navy = "#002F5C";
  const gold = "#d7ba1d";
  const ring = variant === "light" ? "rgba(255,255,255,0.25)" : "rgba(0,47,92,0.18)";
  const bg = variant === "light" ? "#ffffff" : navy;
  const fg = variant === "light" ? navy : "#ffffff";
  return (
    <div className={cn("inline-flex items-center gap-3", className)}>
      <svg
        viewBox="0 0 64 64"
        width={size}
        height={size}
        className="shrink-0"
        style={{ display: "block" }}
      >
        <rect width="64" height="64" rx="14" fill={bg} />
        <circle cx="32" cy="32" r="22" fill="none" stroke={ring} strokeWidth="2" />
        <g transform="translate(32 32)">
          <polygon points="0,-22 6,0 0,22 -6,0" fill={gold} />
          <polygon points="0,-22 6,0 0,0" fill={fg} />
          <circle r="3" fill={bg} />
          <circle r="3" fill="none" stroke={fg} strokeWidth="1" />
        </g>
      </svg>
      {showWordmark && (
        <span
          className={cn(
            "font-display text-lg font-extrabold tracking-tightest",
            variant === "light" ? "text-white" : "text-navy-700"
          )}
        >
          Werkkompas
        </span>
      )}
    </div>
  );
}
