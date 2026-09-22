import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export function Badge({
  className,
  tone = "muted",
  ...props
}: HTMLAttributes<HTMLSpanElement> & {
  tone?: "muted" | "accent" | "ok" | "warn" | "danger" | "lilac" | "peach";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
        tone === "muted" && "bg-secondary text-muted-foreground",
        tone === "accent" && "bg-mint text-ok",
        tone === "ok" && "bg-ok-soft text-ok",
        tone === "warn" && "bg-warn-soft text-warn",
        tone === "danger" && "bg-destructive/12 text-destructive",
        tone === "lilac" && "bg-lilac text-lilac-fg",
        tone === "peach" && "bg-peach text-warn",
        className,
      )}
      {...props}
    />
  );
}
