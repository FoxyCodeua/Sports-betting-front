"use client";

import { useMemo } from "react";

import { MatchesTable } from "@/components/matches/matches-table";
import { PredictionsFilters } from "@/components/predictions/predictions-filters";
import { PaginationControls } from "@/components/shared/pagination-controls";
import { useMatches, useMatchesCount } from "@/lib/hooks/use-matches";
import { usePredictionsFiltersStore } from "@/lib/stores/predictions-filters-store";
import type { MatchesFilterInput } from "@/types/graphql";

const PAGE_SIZE = 20;

export default function PredictionsPage() {
  const {
    dateFrom,
    dateTo,
    leagueId,
    status,
    page,
    sortBy,
    sortDirection,
    setPage,
  } = usePredictionsFiltersStore();

  const filter: MatchesFilterInput | undefined = useMemo(() => {
    const f: MatchesFilterInput = {};
    if (status) f.status = status;
    if (dateFrom) f.dateFrom = dateFrom;
    if (dateTo) f.dateTo = dateTo;
    if (leagueId) f.leagueId = leagueId;
    return Object.keys(f).length > 0 ? f : undefined;
  }, [status, dateFrom, dateTo, leagueId]);

  const {
    data: matches,
    isLoading,
    isError,
  } = useMatches(filter, page, PAGE_SIZE, sortBy, sortDirection);

  const { data: totalCount } = useMatchesCount(filter);
  const totalPages =
    totalCount != null ? Math.ceil(totalCount / PAGE_SIZE) : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Predictions</h1>
          <p className="text-sm text-muted-foreground">
            AI-generated analysis for upcoming matches. Click a match for the
            full breakdown.
          </p>
        </div>
        {totalCount != null && (
          <p className="shrink-0 text-sm text-muted-foreground">
            {totalCount} {totalCount === 1 ? "match" : "matches"}
          </p>
        )}
      </div>

      <PredictionsFilters />

      <MatchesTable
        matches={matches}
        isLoading={isLoading}
        isError={isError}
        getHref={(id) => `/matches/${id}/analysis`}
      />

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
