"use client";

import { useQuery } from "@tanstack/react-query";

import { restFetch } from "@/lib/api/rest-client";
import type { AggregatesResponse } from "@/types/api";

export function useMatchAggregates(matchId: string) {
  return useQuery({
    queryKey: ["match-aggregates", matchId] as const,
    queryFn: () =>
      restFetch<AggregatesResponse>(`/api/matches/${matchId}/aggregates`),
    enabled: !!matchId,
    staleTime: 5 * 60_000,
  });
}
