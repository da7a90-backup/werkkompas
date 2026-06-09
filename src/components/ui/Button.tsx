"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "gold" | "danger" | "outline";
type Size = "sm" | "md" | "lg" | "icon";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  fullWidth?: boolean;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-navy-700 text-white hover:bg-navy-800 active:bg-navy-900 disabled:bg-navy-700/40",
  secondary:
    "bg-white text-navy-700 border border-navy-700/15 hover:border-navy-700/35 hover:bg-navy-50 active:bg-navy-100",
  ghost:
    "bg-transparent text-navy-700 hover:bg-navy-50 active:bg-navy-100",
  gold: "bg-gold-400 text-navy-900 hover:bg-gold-300 active:bg-gold-500",
  danger: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800",
  outline:
    "bg-transparent text-navy-700 border-2 border-navy-700 hover:bg-navy-700 hover:text-white",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3 text-sm rounded-lg",
  md: "h-11 px-4 text-[15px] rounded-xl",
  lg: "h-14 px-6 text-base rounded-2xl",
  icon: "h-10 w-10 rounded-xl",
};

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  {
    variant = "primary",
    size = "md",
    loading,
    fullWidth,
    className,
    children,
    disabled,
    ...rest
  },
  ref
) {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center gap-2 font-semibold transition-[background-color,color,transform,box-shadow] duration-150 ease-out focus-ring select-none",
        "active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100",
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        className
      )}
      {...rest}
    >
      {loading ? (
        <svg
          className="h-4 w-4 animate-spin"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path strokeLinecap="round" d="M12 3a9 9 0 1 0 9 9" />
        </svg>
      ) : null}
      {children}
    </button>
  );
});
