import { useMemo, useState } from "react";
import { ArrowLeft, Bookmark, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CATEGORY_IMAGES, CATEGORY_META, FILTERS } from "@/data/programs";
import { matchTier, sortByRelevance } from "@/data/eligibility";
import { formatAward } from "@/lib/utils";
import { useCrest } from "@/store/use-crest";
import { useLivePrograms } from "@/data/live-catalog";
import type { Category, MatchResult } from "@/data/types";
import { cn } from "@/lib/utils";

const CATEGORY_CARDS = FILTERS.filter((f): f is { id: Category; label: string } => f.id !== "all");

function valueLine(match: MatchResult): string {
  if (match.program.listing === "advisory") return "Reality check";
  if (match.program.listing === "directory") return "Free locator";
  const award = formatAward(match.monthlyAward, match.program.valueKind);
  if (match.eligible && match.monthlyAward > 0) {
    return `${award.value}${award.suffix}`;
  }
  if (match.eligible) return "In-kind / waitlist";
  return match.blockers[0] ?? "Not a match";
}

function ProgramRow({
  match,
  quiet,
}: {
  match: MatchResult;
  quiet?: boolean;
}) {
  const setSheet = useCrest((s) => s.setSheet);
  const saved = useCrest((s) => s.saved);
  const toggleSaved = useCrest((s) => s.toggleSaved);
  const bookmarked = saved.includes(match.program.id);
  const cat = CATEGORY_META[match.program.category];
  const tier = matchTier(match);

  return (
    <article
      className={cn(
        "rounded-2xl bg-card p-4 shadow-[var(--shadow-border)]",
        quiet && "opacity-70",
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <Badge tone={tier === "qualify" ? "ok" : quiet ? "muted" : cat.tone}>
          {tier === "qualify" ? "You qualify" : tier === "close" ? "Might qualify" : cat.label}
        </Badge>
        <button
          type="button"
          onClick={() => toggleSaved(match.program.id)}
          className="flex size-11 shrink-0 items-center justify-center text-muted-foreground"
          aria-label={bookmarked ? "Unsave" : "Save"}
        >
          <Bookmark className={cn("size-4", bookmarked && "fill-foreground text-foreground")} />
        </button>
      </div>
      <button
        type="button"
        onClick={() => setSheet("program", match.program.id)}
        className="w-full text-left"
      >
        <h2 className="font-display text-xl leading-snug">{match.program.shortName}</h2>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
          {quiet ? (match.blockers[0] ?? match.program.summary) : match.program.summary}
        </p>
        <div className="mt-3 flex items-center justify-between gap-2">
          <p className={cn("font-display text-base tabular-nums", quiet && "text-muted-foreground")}>
            {quiet ? "Not advertised" : valueLine(match)}
          </p>
          <span className="text-sm font-medium text-ok">Details</span>
        </div>
      </button>
    </article>
  );
}

export function LedgerView({ matches }: { matches: MatchResult[] }) {
  const setLedgerFilter = useCrest((s) => s.setLedgerFilter);
  const ledgerFilter = useCrest((s) => s.ledgerFilter);
  const programs = useLivePrograms();
  const [query, setQuery] = useState("");

  const browsing = ledgerFilter !== "all";
  const matchedOnly = ledgerFilter === "matched";

  const list = useMemo(() => {
    const pool = sortByRelevance(matches).filter((m) => {
      if (matchedOnly) return matchTier(m) === "qualify";
      if (ledgerFilter !== "all" && m.program.category !== ledgerFilter) return false;
      if (query.trim()) {
        const q = query.trim().toLowerCase();
        const hay =
          `${m.program.name} ${m.program.shortName} ${m.program.agency} ${m.program.summary}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    return pool;
  }, [matches, ledgerFilter, query, matchedOnly]);

  const qualify = list.filter((m) => matchTier(m) === "qualify");
  const close = list.filter((m) => matchTier(m) === "close");
  const explore = list.filter((m) => matchTier(m) === "explore");
  const activeLabel = matchedOnly
    ? "Your matches"
    : (CATEGORY_CARDS.find((c) => c.id === ledgerFilter)?.label ?? "Browse");

  if (!browsing) {
    return (
      <div className="flex flex-col gap-5 px-5 pb-10 pt-6">
        <section>
          <h1 className="font-display text-3xl italic tracking-tight">Browse</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Start with a kind of help. Matches sit up top once you pick one.
          </p>
        </section>
        <div className="grid grid-cols-2 gap-3">
          {CATEGORY_CARDS.map((cat) => {
            const forYou = matches.filter(
              (m) => m.program.category === cat.id && matchTier(m) === "qualify",
            ).length;
            const count = programs.filter((p) => p.category === cat.id).length;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setQuery("");
                  setLedgerFilter(cat.id);
                }}
                className="relative min-h-40 overflow-hidden rounded-2xl text-left"
              >
                <img
                  src={CATEGORY_IMAGES[cat.id]}
                  alt=""
                  className="absolute inset-0 size-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-foreground/35 via-foreground/40 to-foreground/50" />
                <span className="relative flex min-h-40 flex-col items-center justify-center px-3 text-center text-primary-foreground">
                  <span className="font-display text-2xl tracking-tight text-balance drop-shadow-sm">
                    {cat.label}
                  </span>
                  <span className="mt-1 text-xs text-primary-foreground/80">
                    {forYou > 0
                      ? `${forYou} for you`
                      : `${count} program${count === 1 ? "" : "s"}`}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 px-5 pb-10 pt-6">
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => {
            setQuery("");
            setLedgerFilter("all");
          }}
          className="flex size-11 items-center justify-center rounded-full"
          aria-label="All categories"
        >
          <ArrowLeft className="size-5" />
        </button>
        <h1 className="font-display text-2xl tracking-tight">{activeLabel}</h1>
      </div>

      <label className="sr-only" htmlFor="ledger-search">
        Search {activeLabel} programs
      </label>
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-subtle" />
        <input
          id="ledger-search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Search ${activeLabel.toLowerCase()}…`}
          className="flex h-12 w-full rounded-2xl bg-card pl-10 pr-4 text-sm text-foreground shadow-[var(--shadow-border)] placeholder:text-subtle"
        />
      </div>

      {qualify.length > 0 ? (
        <section className="flex flex-col gap-3">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            {qualify.length} you qualify for
          </p>
          {qualify.map((m) => (
            <ProgramRow key={m.program.id} match={m} />
          ))}
        </section>
      ) : null}

      {close.length > 0 ? (
        <section className="flex flex-col gap-3">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Might qualify</p>
          {close.map((m) => (
            <ProgramRow key={m.program.id} match={m} />
          ))}
        </section>
      ) : null}

      {explore.length > 0 && !matchedOnly ? (
        <section className="flex flex-col gap-3">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Other programs · not advertised
          </p>
          {explore.map((m) => (
            <ProgramRow key={m.program.id} match={m} quiet />
          ))}
        </section>
      ) : null}

      {list.length === 0 ? (
        <p className="py-16 text-center text-sm text-muted-foreground">
          Nothing matches that search.
        </p>
      ) : null}
    </div>
  );
}
