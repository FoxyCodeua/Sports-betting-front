"use client";

import { FilterControls } from "@/components/shared/filter-controls";
import { useFiltersStore } from "@/lib/stores/filters-store";
import { MatchStatus } from "@/types/graphql";

const STATUS_OPTIONS = [
  { value: "ALL", label: "All Matches" },
  { value: MatchStatus.SCHEDULED, label: "Scheduled" },
  { value: MatchStatus.LIVE, label: "Live" },
  { value: MatchStatus.FINISHED, label: "Finished" },
];

const SORT_OPTIONS = [
  { value: "scheduledAt:DESC", label: "Newest first" },
  { value: "scheduledAt:ASC", label: "Oldest first" },
  { value: "status:ASC", label: "Status A-Z" },
  { value: "status:DESC", label: "Status Z-A" },
];

export function MatchesFilters() {
  return (
    <FilterControls
      useStore={useFiltersStore}
      statusOptions={STATUS_OPTIONS}
      sortOptions={SORT_OPTIONS}
    />
  );
}
