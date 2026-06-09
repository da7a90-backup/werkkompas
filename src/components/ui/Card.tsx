import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
  variant?: "default" | "muted" | "navy" | "gold";
}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { interactive, variant = "default", className, children, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl overflow-hidden",
        variant === "default" && "bg-white border border-line",
        variant === "muted" && "bg-canvas border border-line",
        variant === "navy" && "bg-navy-700 text-white",
        variant === "gold" && "bg-gold-400 text-navy-900",
        interactive &&
          "transition-all duration-150 hover:border-navy-700/25 hover:shadow-elevated active:scale-[0.99] cursor-pointer",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
});

export function CardBody({
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-5", className)} {...rest}>
      {children}
    </div>
  );
}

export function CardDivider({ className }: { className?: string }) {
  return <div className={cn("border-t border-line", className)} />;
}
