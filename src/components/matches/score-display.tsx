import { cn } from "@/lib/utils";
import type { MatchStatus } from "@/types/graphql";

import { CountdownTimer } from "./countdown-timer";

interface ScoreDisplayProps {
  status: MatchStatus;
  homeScore: number | null;
  awayScore: number | null;
  scheduledAt: string | null;
}

export function ScoreDisplay({
  status,
  homeScore,
  awayScore,
  scheduledAt,
}: ScoreDisplayProps) {
  if (status === "SCHEDULED" && scheduledAt) {
    return <CountdownTimer targetDate={scheduledAt} />;
  }

  return (
    <div
      className={cn(
        "flex items-center gap-1 font-mono text-lg font-bold",
        status === "LIVE" && "text-emerald-400",
      )}
    >
      <span>{homeScore ?? "-"}</span>
      <span className="text-muted-foreground">:</span>
      <span>{awayScore ?? "-"}</span>
    </div>
  );
}
