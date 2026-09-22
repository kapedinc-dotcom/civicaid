import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { formatAward, cn } from "@/lib/utils";
import { useCrest } from "@/store/use-crest";
import type { MatchResult } from "@/data/types";

export const HERO_SLIDE_COUNT = 6;

const GAP = 12;
const PAD = 20;
const LOCK = 8;
const FLICK = 0.42;
const SNAP_RATIO = 0.2;
const SNAP_MS = 320;
const SNAP_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

type Axis = "undecided" | "x" | "y";

interface DragState {
  pointerId: number | null;
  startX: number;
  startY: number;
  lastX: number;
  lastT: number;
  vx: number;
  offset: number;
  axis: Axis;
  dragging: boolean;
}

function emptyDrag(): DragState {
  return {
    pointerId: null,
    startX: 0,
    startY: 0,
    lastX: 0,
    lastT: 0,
    vx: 0,
    offset: 0,
    axis: "undecided",
    dragging: false,
  };
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export function HeroCarousel({ matches }: { matches: MatchResult[] }) {
  const setSheet = useCrest((s) => s.setSheet);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const dragRef = useRef<DragState>(emptyDrag());
  const [index, setIndex] = useState(0);
  const [slideW, setSlideW] = useState(0);
  const last = Math.max(0, matches.length - 1);

  const restX = useCallback(
    (i: number) => -clamp(i, 0, last) * ((slideW || 0) + GAP),
    [last, slideW],
  );

  const paint = useCallback((x: number, animate: boolean) => {
    const track = trackRef.current;
    if (!track) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.style.transition = animate && !reduce ? `transform ${SNAP_MS}ms ${SNAP_EASE}` : "none";
    track.style.transform = `translate3d(${x}px,0,0)`;
  }, []);

  const goTo = useCallback(
    (next: number) => {
      const i = clamp(next, 0, last);
      indexRef.current = i;
      setIndex(i);
      paint(restX(i), true);
    },
    [last, paint, restX],
  );

  useLayoutEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;
    const measure = () => {
      const width = vp.clientWidth * 0.78;
      setSlideW(width);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(vp);
    return () => ro.disconnect();
  }, [matches.length]);

  useLayoutEffect(() => {
    paint(restX(indexRef.current), false);
  }, [slideW, paint, restX]);

  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;
    const blockScroll = (e: TouchEvent) => {
      if (dragRef.current.axis === "x") e.preventDefault();
    };
    vp.addEventListener("touchmove", blockScroll, { passive: false });
    return () => vp.removeEventListener("touchmove", blockScroll);
  }, []);

  useEffect(() => {
    const api = {
      getIndex: () => indexRef.current,
      goTo,
      swipe: (dir: -1 | 1) => goTo(indexRef.current + dir),
    };
    (window as Window & { __heroCarousel?: typeof api }).__heroCarousel = api;
    return () => {
      delete (window as Window & { __heroCarousel?: typeof api }).__heroCarousel;
    };
  }, [goTo]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    dragRef.current = {
      ...emptyDrag(),
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      lastX: e.clientX,
      lastT: performance.now(),
    };
    paint(restX(indexRef.current), false);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const drag = dragRef.current;
    if (drag.pointerId !== e.pointerId) return;
    const dx = e.clientX - drag.startX;
    const dy = e.clientY - drag.startY;

    if (drag.axis === "undecided") {
      if (Math.hypot(dx, dy) < LOCK) return;
      drag.axis = Math.abs(dx) > Math.abs(dy) * 1.15 ? "x" : "y";
      if (drag.axis === "x") {
        drag.dragging = true;
        viewportRef.current?.setPointerCapture(e.pointerId);
      }
    }
    if (drag.axis !== "x") return;

    const now = performance.now();
    const dt = now - drag.lastT;
    if (dt > 0) drag.vx = (e.clientX - drag.lastX) / dt;
    drag.lastX = e.clientX;
    drag.lastT = now;

    let offset = dx;
    const i = indexRef.current;
    if (i === 0 && offset > 0) offset *= 0.32;
    if (i === last && offset < 0) offset *= 0.32;
    drag.offset = offset;
    paint(restX(i) + offset, false);
  };

  const endPointer = (e: React.PointerEvent) => {
    const drag = dragRef.current;
    if (drag.pointerId !== e.pointerId) return;
    if (viewportRef.current?.hasPointerCapture(e.pointerId)) {
      viewportRef.current.releasePointerCapture(e.pointerId);
    }
    if (drag.axis === "x") {
      const width = slideW || viewportRef.current?.clientWidth || 1;
      let next = indexRef.current;
      if (drag.offset < -width * SNAP_RATIO || drag.vx < -FLICK) next += 1;
      else if (drag.offset > width * SNAP_RATIO || drag.vx > FLICK) next -= 1;
      goTo(next);
    }
    window.setTimeout(() => {
      dragRef.current.dragging = false;
    }, 40);
    dragRef.current.pointerId = null;
    dragRef.current.axis = "undecided";
    dragRef.current.offset = 0;
    dragRef.current.vx = 0;
  };

  if (matches.length === 0) return null;

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Top benefits you qualify for"
      className="-mx-5 select-none"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          goTo(index + 1);
        }
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          goTo(index - 1);
        }
      }}
    >
      <div
        ref={viewportRef}
        data-hero-scroller
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endPointer}
        onPointerCancel={endPointer}
        className="overflow-hidden touch-pan-y"
      >
        <div
          ref={trackRef}
          data-hero-track
          className="flex will-change-transform"
          style={{ gap: GAP, paddingInline: PAD }}
        >
          {matches.map((m, i) => {
            const award = formatAward(m.monthlyAward, m.program.valueKind);
            return (
              <article
                key={m.program.id}
                data-slide
                aria-label={`${m.program.shortName}, slide ${i + 1} of ${matches.length}`}
                className="relative shrink-0 overflow-hidden rounded-3xl"
                style={{ width: slideW || "78%" }}
              >
                <button
                  type="button"
                  onClick={() => {
                    if (dragRef.current.dragging) return;
                    setSheet("program", m.program.id);
                  }}
                  className="relative block h-60 w-full overflow-hidden text-left"
                >
                  <img
                    src={m.program.image ?? "/images/liheap-hero.jpg"}
                    alt=""
                    draggable={false}
                    className="pointer-events-none h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/25 to-transparent" />
                  <span className="absolute left-3 top-3 rounded-full bg-ok/90 px-2.5 py-1 text-xs font-medium text-primary-foreground">
                    You qualify · {m.score}%
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-5 text-primary-foreground">
                    <p className="text-xs uppercase tracking-wide text-primary-foreground/70">
                      {m.program.agency}
                    </p>
                    <p className="mt-1 font-display text-2xl italic leading-tight">
                      {m.program.shortName}
                    </p>
                    <div className="mt-3 flex items-end justify-between gap-3">
                      <p className="font-display text-xl tabular-nums">
                        {m.monthlyAward > 0 ? (
                          <>
                            {award.value}
                            <span className="ml-1 text-sm text-primary-foreground/75">
                              {award.suffix}
                            </span>
                          </>
                        ) : (
                          <span className="text-base">In-kind help</span>
                        )}
                      </p>
                      <span className="inline-flex h-10 items-center rounded-full bg-card px-4 text-sm font-medium text-foreground">
                        Review <ArrowRight className="ml-1 size-4" />
                      </span>
                    </div>
                  </div>
                </button>
              </article>
            );
          })}
        </div>
      </div>

      {matches.length > 1 ? (
        <div className="mt-3 flex items-center justify-center gap-3 px-5">
          <p className="sr-only" aria-live="polite">
            {matches[index]?.program.shortName}, {index + 1} of {matches.length}
          </p>
          <div className="flex min-h-11 items-center justify-center gap-2">
            {matches.map((m, i) => (
              <button
                key={m.program.id}
                type="button"
                aria-label={`Show ${m.program.shortName}`}
                aria-current={i === index}
                onClick={() => goTo(i)}
                className="flex h-11 items-center justify-center px-0.5"
              >
                <span
                  className={cn(
                    "block h-2 rounded-full transition-[width,background-color] duration-200",
                    i === index ? "w-6 bg-foreground" : "w-2 bg-foreground/40",
                  )}
                />
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
