import { cn } from "@/lib/utils";

interface Props {
  size?: number;
  className?: string;
  variant?: "light" | "dark";
  showWordmark?: boolean;
}

/**
 * Werkkompas compass-rose mark.
 * - "dark"  → for light surfaces (navy ring + gold star + navy centre).
 * - "light" → for dark surfaces (white ring + gold star + white centre).
 */
export function Logo({
  size = 32,
  className,
  variant = "dark",
  showWordmark = false,
}: Props) {
  const isLight = variant === "light";
  const ring = isLight ? "#ffffff" : "#1a2f47";
  const goldLight = "#FDDC5C";
  const goldDark = "#a07b30";
  const center = isLight ? "#ffffff" : "#1a2f47";
  const centerDot = isLight ? "#1a2f47" : "#1a2f47";

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
          r="25"
          fill="none"
          stroke={ring}
          strokeWidth="2.5"
        />

        <g transform="translate(32 32)">
          {/* Diagonal (intercardinal) spikes — short, drawn under the cardinals */}
          {/* NE */}
          <polygon points="11,-11 0,0 4,0" fill={goldDark} />
          <polygon points="11,-11 0,0 0,-4" fill={goldLight} />
          {/* NW */}
          <polygon points="-11,-11 0,0 0,-4" fill={goldDark} />
          <polygon points="-11,-11 0,0 -4,0" fill={goldLight} />
          {/* SE */}
          <polygon points="11,11 0,0 0,4" fill={goldDark} />
          <polygon points="11,11 0,0 4,0" fill={goldLight} />
          {/* SW */}
          <polygon points="-11,11 0,0 -4,0" fill={goldDark} />
          <polygon points="-11,11 0,0 0,4" fill={goldLight} />

          {/* Cardinal points — long, with light + shadow halves */}
          {/* N */}
          <polygon points="0,-23 -4,0 0,0" fill={goldLight} />
          <polygon points="0,-23 4,0 0,0" fill={goldDark} />
          {/* E */}
          <polygon points="23,0 0,-4 0,0" fill={goldLight} />
          <polygon points="23,0 0,4 0,0" fill={goldDark} />
          {/* S */}
          <polygon points="0,23 4,0 0,0" fill={goldLight} />
          <polygon points="0,23 -4,0 0,0" fill={goldDark} />
          {/* W */}
          <polygon points="-23,0 0,4 0,0" fill={goldLight} />
          <polygon points="-23,0 0,-4 0,0" fill={goldDark} />

          {/* Centre pivot */}
          <circle r="2.4" fill={center} />
          {!isLight && <circle r="1" fill={centerDot} />}
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
