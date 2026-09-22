import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

function formatRemaining(ms: number): string {
  if (ms <= 0) return "Closed";
  const totalMin = Math.floor(ms / 60000);
  const days = Math.floor(totalMin / (60 * 24));
  const hours = Math.floor((totalMin - days * 60 * 24) / 60);
  const mins = totalMin % 60;
  if (days >= 2) return `${days}d ${hours}h`;
  if (days >= 1) return `${days}d ${hours}h`;
  if (hours >= 1) return `${hours}h ${mins}m`;
  return `${mins}m`;
}

export function Countdown({
  to,
  className,
}: {
  to: Date;
  className?: string;
}) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 30000);
    return () => window.clearInterval(id);
  }, []);

  const remaining = to.getTime() - now;
  const urgent = remaining > 0 && remaining < 1000 * 60 * 60 * 24 * 7;

  return (
    <span
      className={cn(
        "tabular-nums",
        urgent ? "text-warn" : "text-muted-foreground",
        remaining <= 0 && "text-destructive",
        className,
      )}
    >
      {formatRemaining(remaining)}
    </span>
  );
}
