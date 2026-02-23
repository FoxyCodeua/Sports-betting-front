"use client";

import { useQuery } from "@tanstack/react-query";

import { restFetch } from "@/lib/api/rest-client";
import type { PredictionResponse } from "@/types/api";

export function useMatchPrediction(matchId: string) {
  const query = useQuery({
    queryKey: ["match-prediction", matchId] as const,
    queryFn: () =>
      restFetch<PredictionResponse | null>(
        `/api/matches/${matchId}/prediction`,
      ),
    enabled: !!matchId,
    staleTime: 5 * 60_000,
    refetchInterval: (query) => {
      const status = query.state.data?.status;
      if (!status || status === "draft" || status === "failed") return 60_000;
      return false;
    },
  });

  return query;
}
