import { cn } from "@/lib/utils";

export function CrestMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("text-primary", className)}
      aria-hidden="true"
    >
      <path
        d="M16 3.2 27 8.4v7.3c0 6.4-4.3 10.9-11 13.1C9.3 26.6 5 22.1 5 15.7V8.4L16 3.2Z"
        fill="currentColor"
        fillOpacity="0.16"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M16 8.2 11.2 16.8h3.1v6.2h3.4v-6.2h3.1L16 8.2Z"
        fill="currentColor"
      />
    </svg>
  );
}
