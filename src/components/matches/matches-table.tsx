"use client";

import { AlertCircle, BrainCircuit, CalendarOff } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { StatusBadge } from "@/components/shared/status-badge";
import { TeamLogo } from "@/components/shared/team-logo";
import { EmptyState } from "@/components/shared/empty-state";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { formatMatchTime, formatMatchDate } from "@/lib/utils/date";
import type { Match } from "@/types/graphql";

import { ScoreDisplay } from "./score-display";

interface MatchesTableProps {
  matches: Match[] | undefined;
  isLoading: boolean;
  isError?: boolean;
  getHref?: (matchId: string) => string;
}

export function MatchesTable({ matches, isLoading, isError, getHref }: MatchesTableProps) {
  const router = useRouter();
  const buildHref = getHref ?? ((id: string) => `/matches/${id}`);

  if (isLoading) {
    return <MatchesTableSkeleton />;
  }

  if (isError) {
    return (
      <EmptyState
        icon={AlertCircle}
        title="Failed to load matches"
        description="Something went wrong while fetching matches. Please try again later."
      />
    );
  }

  if (!matches?.length) {
    return (
      <EmptyState
        icon={CalendarOff}
        title="No matches found"
        description="Try adjusting your filters or check back later for upcoming matches."
      />
    );
  }

  return (
    <>
      <div className="hidden md:block">
        <div className="rounded-xl border border-border/50 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[100px]">Date</TableHead>
                <TableHead className="w-[80px]">Time</TableHead>
                <TableHead>League</TableHead>
                <TableHead className="text-right">Home</TableHead>
                <TableHead className="w-[100px] text-center">Score</TableHead>
                <TableHead>Away</TableHead>
                <TableHead className="w-[100px]">Status</TableHead>
                <TableHead className="w-[40px]" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {matches.map((match) => (
                <TableRow
                  key={match.id}
                  role="link"
                  tabIndex={0}
                  className={cn(
                    "group cursor-pointer transition-colors",
                    match.status === "LIVE" &&
                      "bg-emerald-500/5 hover:bg-emerald-500/10",
                  )}
                  onClick={() => router.push(buildHref(match.id))}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      router.push(buildHref(match.id));
                    }
                  }}
                >
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {formatMatchDate(match.scheduledAt)}
                  </TableCell>
                  <TableCell className="font-mono text-xs">
                    {formatMatchTime(match.scheduledAt)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <TeamLogo
                        src={match.league.logoUrl}
                        name={match.league.name}
                        size={20}
                      />
                      <span className="text-xs text-muted-foreground truncate max-w-[120px]">
                        {match.league.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <span className="font-medium truncate max-w-[140px]">
                        {match.homeTeam.name}
                      </span>
                      <TeamLogo
                        src={match.homeTeam.logoUrl}
                        name={match.homeTeam.name}
                        size={24}
                      />
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <ScoreDisplay
                      status={match.status}
                      homeScore={match.homeScore}
                      awayScore={match.awayScore}
                      scheduledAt={match.scheduledAt}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <TeamLogo
                        src={match.awayTeam.logoUrl}
                        name={match.awayTeam.name}
                        size={24}
                      />
                      <span className="font-medium truncate max-w-[140px]">
                        {match.awayTeam.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={match.status} />
                  </TableCell>
                  <TableCell>
                    <BrainCircuit className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="grid gap-3 md:hidden">
        {matches.map((match) => (
          <MatchCard key={match.id} match={match} href={buildHref(match.id)} />
        ))}
      </div>
    </>
  );
}

function MatchCard({ match, href }: { match: Match; href: string }) {
  return (
    <Link href={href}>
      <div
        className={cn(
          "rounded-xl border border-border/50 bg-card/50 p-4 transition-colors hover:bg-accent/50",
          match.status === "LIVE" && "border-emerald-500/20 bg-emerald-500/5",
        )}
      >
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TeamLogo
              src={match.league.logoUrl}
              name={match.league.name}
              size={16}
            />
            <span className="text-xs text-muted-foreground">
              {match.league.name}
            </span>
          </div>
          <StatusBadge status={match.status} />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-1 flex-col items-center gap-1">
            <TeamLogo
              src={match.homeTeam.logoUrl}
              name={match.homeTeam.name}
              size={36}
            />
            <span className="text-center text-xs font-medium truncate max-w-[100px]">
              {match.homeTeam.name}
            </span>
          </div>

          <div className="px-4">
            <ScoreDisplay
              status={match.status}
              homeScore={match.homeScore}
              awayScore={match.awayScore}
              scheduledAt={match.scheduledAt}
            />
          </div>

          <div className="flex flex-1 flex-col items-center gap-1">
            <TeamLogo
              src={match.awayTeam.logoUrl}
              name={match.awayTeam.name}
              size={36}
            />
            <span className="text-center text-xs font-medium truncate max-w-[100px]">
              {match.awayTeam.name}
            </span>
          </div>
        </div>

        <div className="mt-3 text-center text-xs text-muted-foreground">
          {formatMatchDate(match.scheduledAt)} &middot;{" "}
          {formatMatchTime(match.scheduledAt)}
        </div>
      </div>
    </Link>
  );
}

function MatchesTableSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 8 }).map((_, i) => (
        <Skeleton key={i} className="h-14 w-full rounded-xl" />
      ))}
    </div>
  );
}
