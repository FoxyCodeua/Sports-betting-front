import { MapPin, Cloud, Users } from "lucide-react";
import Link from "next/link";

import { StatusBadge } from "@/components/shared/status-badge";
import { TeamLogo } from "@/components/shared/team-logo";
import { Badge } from "@/components/ui/badge";
import { formatMatchDateTime } from "@/lib/utils/date";
import type { Match } from "@/types/graphql";

interface MatchDetailHeaderProps {
  match: Match;
}

export function MatchDetailHeader({ match }: MatchDetailHeaderProps) {
  return (
    <div className="glass-card p-6">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <TeamLogo
          src={match.league.logoUrl}
          name={match.league.name}
          size={20}
        />
        <span className="text-sm text-muted-foreground">
          {match.league.name}
        </span>
        <StatusBadge status={match.status} />
        <span className="text-sm text-muted-foreground">
          {formatMatchDateTime(match.scheduledAt)}
        </span>
      </div>

      <div className="flex items-center justify-center gap-6 sm:gap-12">
        <div className="flex flex-1 flex-col items-center gap-2">
          <TeamLogo
            src={match.homeTeam.logoUrl}
            name={match.homeTeam.name}
            size={64}
          />
          <span className="text-center text-lg font-bold">
            {match.homeTeam.name}
          </span>
          {match.homeFormation && (
            <Badge variant="outline" className="text-xs">
              {match.homeFormation}
            </Badge>
          )}
        </div>

        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-2 text-4xl font-bold tabular-nums">
            <span>{match.homeScore ?? "-"}</span>
            <span className="text-muted-foreground">:</span>
            <span>{match.awayScore ?? "-"}</span>
          </div>
          {match.lineupsStatus === "CONFIRMED" && (
            <Badge
              variant="outline"
              className="gap-1 bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-xs"
            >
              <Users className="h-3 w-3" />
              Lineups Confirmed
            </Badge>
          )}
        </div>

        <div className="flex flex-1 flex-col items-center gap-2">
          <TeamLogo
            src={match.awayTeam.logoUrl}
            name={match.awayTeam.name}
            size={64}
          />
          <span className="text-center text-lg font-bold">
            {match.awayTeam.name}
          </span>
          {match.awayFormation && (
            <Badge variant="outline" className="text-xs">
              {match.awayFormation}
            </Badge>
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
        {match.venueName && (
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            {match.venueName}
          </div>
        )}
        {match.weatherCondition && (
          <div className="flex items-center gap-1.5">
            <Cloud className="h-3.5 w-3.5" />
            {match.weatherCondition}
          </div>
        )}
      </div>

      <div className="mt-4 flex justify-center">
        <Link
          href={`/matches/${match.id}/analysis`}
          className="text-sm font-medium text-primary hover:underline"
        >
          View AI Analysis
        </Link>
      </div>
    </div>
  );
}
