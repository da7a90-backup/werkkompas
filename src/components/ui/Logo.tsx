import { cn } from "@/lib/utils";

interface Props {
  size?: number;
  className?: string;
  variant?: "light" | "dark";
  showWordmark?: boolean;
}

/**
 * Werkkompas compass-rose mark.
 * - "dark" variant = navy/gold on a light surface (in-app default).
 * - "light" variant = white/gold on a dark surface (e.g. navy hero).
 */
export function Logo({
  size = 32,
  className,
  variant = "dark",
  showWordmark = false,
}: Props) {
  const isLight = variant === "light";
  const ring = isLight ? "#ffffff" : "#1a2f47";
  const goldLight = "#cfa971";
  const goldDark = "#8c6d35";
  const center = isLight ? "#ffffff" : "#1a2f47";

  return (
    <div className={cn("inline-flex items-center gap-3", className)}>
      <svg
        viewBox="0 0 64 64"
        width={size}
        height={size}
        className="shrink-0"
        style={{ display: "block" }}
        aria-hidden="true"
      >
        {/* Outer ring */}
        <circle
          cx="32"
          cy="32"
          r="26"
          fill="none"
          stroke={ring}
          strokeWidth="2.5"
        />

        {/* Compass rose star */}
        <g transform="translate(32 32)">
          {/* Diagonal (intercardinal) points — drawn first so cardinals overlap on top */}
          <polygon points="9,-9 0,-3 0,0 3,0" fill={goldDark} />
          <polygon points="-9,-9 0,-3 0,0 -3,0" fill={goldLight} />
          <polygon points="9,9 3,0 0,0 0,3" fill={goldLight} />
          <polygon points="-9,9 -3,0 0,0 0,3" fill={goldDark} />

          {/* North */}
          <polygon points="0,-24 -4,0 0,0" fill={goldLight} />
          <polygon points="0,-24 4,0 0,0" fill={goldDark} />

          {/* East */}
          <polygon points="24,0 0,-4 0,0" fill={goldLight} />
          <polygon points="24,0 0,4 0,0" fill={goldDark} />

          {/* South */}
          <polygon points="0,24 4,0 0,0" fill={goldLight} />
          <polygon points="0,24 -4,0 0,0" fill={goldDark} />

          {/* West */}
          <polygon points="-24,0 0,4 0,0" fill={goldLight} />
          <polygon points="-24,0 0,-4 0,0" fill={goldDark} />

          {/* Center pivot */}
          <circle r="2.6" fill={center} />
        </g>
      </svg>
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
