import type { MatchStatus } from "@/types/graphql";

export function StatusBadge({ status }: { status: MatchStatus }) {
  if (status === "LIVE") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-0.5 ring-1 ring-inset ring-emerald-500/25">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-500">
          Live
        </span>
      </span>
    );
  }

  if (status === "SCHEDULED") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-500/10 px-2.5 py-0.5 ring-1 ring-inset ring-sky-500/20">
        <span className="text-[11px] font-medium text-sky-400">
          Upcoming
        </span>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center rounded-full bg-muted/60 px-2.5 py-0.5 ring-1 ring-inset ring-border/50">
      <span className="text-[11px] font-medium tracking-wide text-muted-foreground">
        Finished
      </span>
    </span>
  );
}
