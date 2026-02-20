"use client";

import { FilterControls } from "@/components/shared/filter-controls";
import { usePredictionsFiltersStore } from "@/lib/stores/predictions-filters-store";
import { MatchStatus } from "@/types/graphql";

const STATUS_OPTIONS = [
  { value: "ALL", label: "All Statuses" },
  { value: MatchStatus.SCHEDULED, label: "Upcoming" },
  { value: MatchStatus.LIVE, label: "Live" },
  { value: MatchStatus.FINISHED, label: "Finished" },
];

const SORT_OPTIONS = [
  { value: "scheduledAt:ASC", label: "Soonest first" },
  { value: "scheduledAt:DESC", label: "Latest first" },
];

export function PredictionsFilters() {
  return (
    <FilterControls
      useStore={usePredictionsFiltersStore}
      statusOptions={STATUS_OPTIONS}
      sortOptions={SORT_OPTIONS}
    />
  );
}
