"use client";

import { useQuery } from "@tanstack/react-query";

import { restFetch } from "@/lib/api/rest-client";
import type { FormResponse } from "@/types/api";

export function useMatchForm(matchId: string) {
  return useQuery({
    queryKey: ["match-form", matchId] as const,
    queryFn: () => restFetch<FormResponse>(`/api/matches/${matchId}/form`),
    enabled: !!matchId,
    staleTime: 5 * 60_000,
  });
}
