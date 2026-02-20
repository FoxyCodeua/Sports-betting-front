"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef } from "react";

import { MatchesFilters } from "@/components/matches/matches-filters";
import { MatchesTable } from "@/components/matches/matches-table";
import { PaginationControls } from "@/components/shared/pagination-controls";
import { useMatches, useMatchesCount } from "@/lib/hooks/use-matches";
import { useFiltersStore } from "@/lib/stores/filters-store";
import type { MatchesFilterInput } from "@/types/graphql";

const PAGE_SIZE = 20;

export default function MatchesPage() {
  const searchParams = useSearchParams();
  const synced = useRef(false);

  const {
    dateFrom,
    dateTo,
    leagueId,
    status,
    page,
    sortBy,
    sortDirection,
    setPage,
    setLeagueId,
  } = useFiltersStore();

  useEffect(() => {
    if (synced.current) return;
    synced.current = true;

    const urlLeagueId = searchParams.get("leagueId");
    if (urlLeagueId) {
      setLeagueId(Number(urlLeagueId));
    }
  }, [searchParams, setLeagueId]);

  const hasFilters = Boolean(dateFrom || dateTo || leagueId || status);

  const filter: MatchesFilterInput | undefined = useMemo(
    () =>
      hasFilters
        ? {
            ...(dateFrom && { dateFrom }),
            ...(dateTo && { dateTo }),
            ...(leagueId && { leagueId }),
            ...(status && { status }),
          }
        : undefined,
    [dateFrom, dateTo, leagueId, status, hasFilters],
  );

  const {
    data: matches,
    isLoading,
    isError,
  } = useMatches(filter, page, PAGE_SIZE, sortBy, sortDirection);

  const { data: totalCount } = useMatchesCount(filter);

  const totalPages = totalCount != null ? Math.ceil(totalCount / PAGE_SIZE) : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Matches</h1>
          <p className="text-sm text-muted-foreground">
            Browse upcoming, live and finished football matches across top
            leagues.
          </p>
        </div>
        {totalCount != null && (
          <p className="shrink-0 text-sm text-muted-foreground">
            {totalCount} {totalCount === 1 ? "match" : "matches"} found
          </p>
        )}
      </div>

      <MatchesFilters />

      <MatchesTable matches={matches} isLoading={isLoading} isError={isError} />

      {matches && matches.length > 0 && (
        <PaginationControls
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
