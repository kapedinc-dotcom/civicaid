import { initials } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { PartyMember } from "@/data/types";

export function PartyAvatar({
  member,
  size = "md",
}: {
  member: PartyMember;
  size?: "sm" | "md" | "lg";
}) {
  const dim = size === "sm" ? "size-8 text-xs" : size === "lg" ? "size-14 text-base" : "size-11 text-sm";
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full bg-mint font-display font-medium text-ok shadow-[var(--shadow-border)]",
        dim,
      )}
      aria-hidden="true"
    >
      {initials(member.name)}
    </div>
  );
}
