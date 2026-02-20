import { create, type StoreApi, type UseBoundStore } from "zustand";

import type { MatchStatus } from "@/types/graphql";

type SortDirection = "ASC" | "DESC";

export interface FiltersState {
  dateFrom: string | null;
  dateTo: string | null;
  leagueId: number | null;
  status: MatchStatus | null;
  page: number;
  sortBy: string;
  sortDirection: SortDirection;
  setDateFrom: (date: string | null) => void;
  setDateTo: (date: string | null) => void;
  setLeagueId: (id: number | null) => void;
  setStatus: (status: MatchStatus | null) => void;
  setPage: (page: number) => void;
  setSortBy: (sortBy: string) => void;
  setSortDirection: (dir: SortDirection) => void;
  resetFilters: () => void;
}

interface FiltersDefaults {
  status?: MatchStatus | null;
  sortDirection?: SortDirection;
}

export function createFiltersStore(
  defaults: FiltersDefaults = {},
): UseBoundStore<StoreApi<FiltersState>> {
  const { status = null, sortDirection = "DESC" } = defaults;

  return create<FiltersState>((set) => ({
    dateFrom: null,
    dateTo: null,
    leagueId: null,
    status,
    page: 1,
    sortBy: "scheduledAt",
    sortDirection,
    setDateFrom: (dateFrom) => set({ dateFrom, page: 1 }),
    setDateTo: (dateTo) => set({ dateTo, page: 1 }),
    setLeagueId: (leagueId) => set({ leagueId, page: 1 }),
    setStatus: (s) => set({ status: s, page: 1 }),
    setPage: (page) => set({ page }),
    setSortBy: (sortBy) => set({ sortBy, page: 1 }),
    setSortDirection: (sd) => set({ sortDirection: sd, page: 1 }),
    resetFilters: () =>
      set({
        dateFrom: null,
        dateTo: null,
        leagueId: null,
        status,
        page: 1,
        sortBy: "scheduledAt",
        sortDirection,
      }),
  }));
}

export const useFiltersStore = createFiltersStore();
