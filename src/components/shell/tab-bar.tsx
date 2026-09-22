import { CircleCheck, ClipboardCheck, Compass, LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCrest } from "@/store/use-crest";
import type { TabId } from "@/data/types";

const TABS: { id: TabId; label: string; icon: typeof Compass }[] = [
  { id: "hall", label: "Discover", icon: Compass },
  { id: "ledger", label: "Browse", icon: LayoutGrid },
  { id: "screen", label: "Eligibility", icon: ClipboardCheck },
  { id: "quests", label: "Tracker", icon: CircleCheck },
];

export function TabBar() {
  const tab = useCrest((s) => s.tab);
  const setTab = useCrest((s) => s.setTab);
  const setLedgerFilter = useCrest((s) => s.setLedgerFilter);

  return (
    <nav
      className="safe-bottom sticky bottom-0 z-30 border-t border-border bg-background/95 backdrop-blur-sm"
      aria-label="Primary"
    >
      <ul className="grid grid-cols-4 px-3 py-2">
        {TABS.map((item) => {
          const active = tab === item.id;
          const Icon = item.icon;
          return (
            <li key={item.id} className="flex justify-center">
              <button
                type="button"
                onClick={() => {
                  if (item.id === "ledger") setLedgerFilter("all");
                  setTab(item.id);
                }}
                className={cn(
                  "flex h-12 min-w-[4.75rem] flex-col items-center justify-center gap-0.5 rounded-full px-3 text-xs font-medium tracking-wide transition-[color,background-color] duration-150 ease-out",
                  active ? "bg-primary text-primary-foreground" : "text-muted-foreground",
                )}
                aria-current={active ? "page" : undefined}
              >
                <Icon className="size-4" strokeWidth={active ? 2.2 : 1.7} />
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
