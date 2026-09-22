import { cn } from "@/lib/utils";

export function Progress({
  value,
  className,
  barClassName,
}: {
  value: number;
  className?: string;
  barClassName?: string;
}) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div
      className={cn(
        "h-1.5 w-full overflow-hidden rounded-full bg-foreground/10",
        className,
      )}
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={cn(
          "h-full origin-left rounded-full bg-primary transition-[transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          barClassName,
        )}
        style={{ transform: `scaleX(${pct / 100})` }}
      />
    </div>
  );
}
