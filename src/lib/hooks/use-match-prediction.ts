"use client";

import { useQuery } from "@tanstack/react-query";

import { restFetch } from "@/lib/api/rest-client";
import type { PredictionResponse } from "@/types/api";

export function useMatchPrediction(matchId: string) {
  return useQuery({
    queryKey: ["match-prediction", matchId] as const,
    queryFn: () =>
      restFetch<PredictionResponse | null>(
        `/api/matches/${matchId}/prediction`,
      ),
    enabled: !!matchId,
    staleTime: 5 * 60_000,
  });
}
