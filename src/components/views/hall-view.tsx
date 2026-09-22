import { ArrowRight, Phone, ShieldAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { HeroCarousel, HERO_SLIDE_COUNT } from "@/components/hero-carousel";
import { START_DOORS } from "@/data/programs";
import { potentialMonthly, sortByRelevance, tierMatches } from "@/data/eligibility";
import { cn, firstName, formatAward, formatUsd, greeting } from "@/lib/utils";
import { useCrest } from "@/store/use-crest";
import type { MatchResult } from "@/data/types";

export function HallView({ matches }: { matches: MatchResult[] }) {
  const household = useCrest((s) => s.household);
  const applications = useCrest((s) => s.applications);
  const setSheet = useCrest((s) => s.setSheet);
  const setTab = useCrest((s) => s.setTab);
  const setLedgerFilter = useCrest((s) => s.setLedgerFilter);
  const lead = household.members.find((m) => m.role === "self") ?? household.members[0]!;
  const ranked = sortByRelevance(matches);
  const qualify = ranked.filter((m) => m.eligible && m.program.listing === "benefit");
  const close = tierMatches(ranked, "close");
  const potential = potentialMonthly(matches);
  const slides = qualify.slice(0, HERO_SLIDE_COUNT);
  const curated = qualify.slice(HERO_SLIDE_COUNT, HERO_SLIDE_COUNT + 2);
  const near = qualify.length < 3 ? close.slice(0, 2) : [];
  const activeCount = Object.values(applications).filter((a) => a.status !== "idle").length;
  const doors = START_DOORS.filter(
    (d) => (!d.state || d.state === household.state) && d.id !== "benefits-gov",
  );

  return (
    <div className="stagger-in flex flex-col gap-7 px-5 pb-10 pt-6">
      <section>
        <Badge tone="ok">{qualify.length} for you</Badge>
        <h1 className="mt-3 font-display text-3xl italic leading-tight tracking-tight">
          {greeting()}, {firstName(lead.name)}
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {qualify.length === 0
            ? "Nothing is advertised yet. Finish Eligibility, or keep browsing categories."
            : `${qualify.length} programs you qualify for, about `}
          {qualify.length > 0 ? (
            <span className="font-medium text-foreground">{formatUsd(potential)}/mo</span>
          ) : null}
          {qualify.length > 0 ? " in estimated support." : null}
        </p>
      </section>

      <HeroCarousel matches={slides} />

      <section className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-card px-4 py-4 shadow-[var(--shadow-border)]">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Active</p>
          <p className="mt-1 font-display text-3xl tabular-nums">{activeCount}</p>
          <p className="mt-1 text-xs text-muted-foreground">applications</p>
        </div>
        <div className="rounded-2xl bg-card px-4 py-4 shadow-[var(--shadow-border)]">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Support</p>
          <p className="mt-1 font-display text-3xl tabular-nums">{formatUsd(potential)}</p>
          <p className="mt-1 text-xs text-muted-foreground">estimated / month</p>
        </div>
      </section>

      {curated.length > 0 ? (
        <section className="flex flex-col gap-3">
          <div className="flex items-end justify-between gap-3">
            <div>
              <h2 className="font-display text-xl">For you</h2>
              <p className="text-sm text-muted-foreground">More matches from your answers</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setLedgerFilter("matched");
                setTab("ledger");
              }}
              className="h-11 text-sm font-medium text-ok"
            >
              All matches
            </button>
          </div>

          {curated.map((m, i) => {
            const award = formatAward(m.monthlyAward, m.program.valueKind);
            return (
              <button
                key={m.program.id}
                type="button"
                onClick={() => setSheet("program", m.program.id)}
                className={cn(
                  "rounded-2xl p-4 text-left",
                  i === 0 ? "bg-lilac text-lilac-fg" : "bg-peach",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs font-medium">You qualify · {m.score}%</p>
                    <p className="mt-1 font-display text-lg leading-snug text-foreground">
                      {m.program.shortName}
                    </p>
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                      {m.program.summary}
                    </p>
                  </div>
                  <div className="rounded-xl bg-card px-3 py-2 text-right">
                    <p className="font-display text-lg tabular-nums text-foreground">
                      {m.monthlyAward > 0 ? award.value : "—"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {m.monthlyAward > 0 ? award.suffix : "In-kind"}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </section>
      ) : null}

      {near.length > 0 ? (
        <section className="flex flex-col gap-3">
          <h2 className="font-display text-xl">Might qualify</h2>
          <p className="text-sm text-muted-foreground">Close, but something is still missing</p>
          {near.map((m) => (
            <button
              key={m.program.id}
              type="button"
              onClick={() => setSheet("program", m.program.id)}
            className="rounded-2xl bg-card p-4 text-left shadow-[var(--shadow-border)]"
            >
              <p className="text-xs font-medium text-warn">Not advertised · {m.score}%</p>
              <p className="mt-1 font-display text-lg">{m.program.shortName}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {m.blockers[0] ?? "One screening answer still blocks this."}
              </p>
            </button>
          ))}
        </section>
      ) : null}

      <section className="flex flex-col gap-3">
        <h2 className="font-display text-xl">Apply on official sites</h2>
        {doors.map((door) => (
          <a
            key={door.id}
            href={door.href}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 rounded-2xl bg-card p-4 text-left shadow-[var(--shadow-border)]"
          >
            <span className="flex size-11 items-center justify-center rounded-xl bg-mint text-ok">
              {door.phone ? <Phone className="size-5" /> : <ArrowRight className="size-5" />}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">{door.label}</p>
              <p className="text-xs text-muted-foreground">{door.detail}</p>
            </div>
          </a>
        ))}
      </section>

      <article className="rounded-2xl bg-card p-4 shadow-[var(--shadow-border)]">
        <p className="flex items-center gap-2 text-sm font-medium">
          <ShieldAlert className="size-4 text-warn" /> Never pay to apply
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Real programs do not charge a fee, and no .gov office will ask for a gift card.
        </p>
      </article>
    </div>
  );
}
