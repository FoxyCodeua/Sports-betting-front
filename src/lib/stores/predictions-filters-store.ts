import { createFiltersStore } from "./filters-store";
import type { MatchStatus } from "@/types/graphql";

export const usePredictionsFiltersStore = createFiltersStore({
  status: "SCHEDULED" as MatchStatus,
  sortDirection: "ASC",
});
