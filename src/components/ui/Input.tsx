"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  trailing?: React.ReactNode;
  leading?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hint, error, trailing, leading, id, className, ...rest },
  ref
) {
  const inputId = id ?? rest.name;
  return (
    <div className="flex w-full flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-[13px] font-semibold tracking-tight text-ink/80"
        >
          {label}
        </label>
      )}
      <div
        className={cn(
          "flex h-12 items-center gap-2 rounded-xl border border-line bg-white px-3.5 transition-colors",
          "focus-within:border-navy-700 focus-within:ring-2 focus-within:ring-navy-700/15",
          error && "border-red-400 focus-within:border-red-500 focus-within:ring-red-500/15",
          className
        )}
      >
        {leading && (
          <span className="text-ink/50 flex shrink-0 items-center">{leading}</span>
        )}
        <input
          ref={ref}
          id={inputId}
          className="h-full w-full bg-transparent text-[15px] text-ink placeholder:text-ink/35 focus:outline-none"
          {...rest}
        />
        {trailing && (
          <span className="text-ink/50 flex shrink-0 items-center">{trailing}</span>
        )}
      </div>
      {hint && !error && (
        <p className="text-xs text-ink/55">{hint}</p>
      )}
      {error && <p className="text-xs font-medium text-red-600">{error}</p>}
    </div>
  );
});

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, hint, error, id, className, ...rest },
  ref
) {
  const inputId = id ?? rest.name;
  return (
    <div className="flex w-full flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-[13px] font-semibold tracking-tight text-ink/80"
        >
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={inputId}
        className={cn(
          "w-full rounded-xl border border-line bg-white px-3.5 py-3 text-[15px] text-ink placeholder:text-ink/35 transition-colors",
          "focus:border-navy-700 focus:outline-none focus:ring-2 focus:ring-navy-700/15",
          error && "border-red-400 focus:border-red-500 focus:ring-red-500/15",
          className
        )}
        rows={4}
        {...rest}
      />
      {hint && !error && <p className="text-xs text-ink/55">{hint}</p>}
      {error && <p className="text-xs font-medium text-red-600">{error}</p>}
    </div>
  );
});

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, hint, error, id, className, children, ...rest },
  ref
) {
  const inputId = id ?? rest.name;
  return (
    <div className="flex w-full flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-[13px] font-semibold tracking-tight text-ink/80"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref}
          id={inputId}
          className={cn(
            "h-12 w-full appearance-none rounded-xl border border-line bg-white pl-3.5 pr-10 text-[15px] text-ink transition-colors",
            "focus:border-navy-700 focus:outline-none focus:ring-2 focus:ring-navy-700/15",
            error && "border-red-400",
            className
          )}
          {...rest}
        >
          {children}
        </select>
        <svg
          className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-ink/50"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
      {hint && !error && <p className="text-xs text-ink/55">{hint}</p>}
      {error && <p className="text-xs font-medium text-red-600">{error}</p>}
    </div>
  );
});
