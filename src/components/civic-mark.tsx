import { cn } from "@/lib/utils";

export function CivicMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn("text-accent", className)} aria-hidden="true">
      <rect x="2" y="2" width="28" height="28" rx="8" fill="currentColor" fillOpacity="0.14" />
      <path
        d="M16 8.2c-3.4 2.4-5.6 5.6-5.6 8.6 0 3.1 2.5 5.2 5.6 5.2s5.6-2.1 5.6-5.2c0-3-2.2-6.2-5.6-8.6Z"
        fill="currentColor"
      />
      <path
        d="M16 11.4c.6 1.6 1.6 2.8 1.6 4.2 0 1.3-.8 2.2-1.6 2.2s-1.6-.9-1.6-2.2c0-1.4 1-2.6 1.6-4.2Z"
        fill="var(--color-background)"
      />
    </svg>
  );
}
