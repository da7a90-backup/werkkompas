import { cn } from "@/lib/utils";

interface Props {
  initials: string;
  color?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  ring?: boolean;
}

const sizes = {
  xs: "h-7 w-7 text-[10px]",
  sm: "h-9 w-9 text-xs",
  md: "h-11 w-11 text-sm",
  lg: "h-14 w-14 text-base",
  xl: "h-20 w-20 text-xl",
};

export function Avatar({
  initials,
  color = "#002F5C",
  size = "md",
  className,
  ring,
}: Props) {
  return (
    <div
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full font-bold text-white tracking-tightest select-none",
        sizes[size],
        ring && "ring-2 ring-white",
        className
      )}
      style={{ backgroundColor: color }}
    >
      {initials}
    </div>
  );
}
