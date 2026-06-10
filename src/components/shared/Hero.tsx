import { cn } from "@/lib/utils";

interface Props {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

export function Hero({ eyebrow, title, description, children, className }: Props) {
  return (
    <div className={cn("rounded-3xl bg-navy-700 p-6 text-white relative overflow-hidden", className)}>
      <div className="absolute inset-0 dot-bg opacity-40" />
      <div
        className="absolute -right-12 -top-12 h-48 w-48 rounded-full"
        style={{
          background: "radial-gradient(closest-side, rgba(253,220,92,0.35), rgba(253,220,92,0))",
        }}
      />
      <div className="relative">
        {eyebrow && (
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white/80">
            <span className="h-1 w-1 rounded-full bg-gold-400" />
            {eyebrow}
          </div>
        )}
        <h2 className="font-display text-2xl font-black tracking-tightest text-balance">
          {title}
        </h2>
        {description && (
          <p className="mt-2 max-w-md text-sm leading-relaxed text-white/75">
            {description}
          </p>
        )}
        {children && <div className="mt-4">{children}</div>}
      </div>
    </div>
  );
}
