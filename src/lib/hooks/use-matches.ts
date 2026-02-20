"use client";

import { useQuery } from "@tanstack/react-query";

import { graphqlClient } from "@/lib/api/graphql-client";
import { MATCHES_COUNT_QUERY, MATCHES_QUERY } from "@/lib/api/queries/matches";
import type { Match, MatchesFilterInput, MatchStatus } from "@/types/graphql";

interface MatchesResponse {
  matches: Match[];
}

interface MatchesCountResponse {
  matchesCount: number;
}

export function useMatches(
  filter: MatchesFilterInput | undefined,
  page: number,
  limit = 20,
  sortBy = "scheduledAt",
  sortDirection = "DESC",
) {
  return useQuery({
    queryKey: ["matches", filter ?? null, page, limit, sortBy, sortDirection] as const,
    queryFn: async () => {
      const data = await graphqlClient.request<MatchesResponse>(
        MATCHES_QUERY,
        {
          filter: filter ?? null,
          page,
          limit,
          sortBy,
          sortDirection,
        },
      );
      return data.matches;
    },
    staleTime: 60_000,
  });
}

export function useMatchesCount(filter: MatchesFilterInput | undefined) {
  return useQuery({
    queryKey: ["matchesCount", filter ?? null] as const,
    queryFn: async () => {
      const data = await graphqlClient.request<MatchesCountResponse>(
        MATCHES_COUNT_QUERY,
        { filter: filter ?? null },
      );
      return data.matchesCount;
    },
    staleTime: 60_000,
  });
}

export function useMatchesByStatus(status: MatchStatus) {
  return useQuery({
    queryKey: ["matches", { status }] as const,
    queryFn: async () => {
      const data = await graphqlClient.request<MatchesResponse>(
        MATCHES_QUERY,
        { filter: { status }, page: 1, limit: 50 },
      );
      return data.matches;
    },
    refetchInterval: status === "LIVE" ? 30_000 : false,
    staleTime: status === "LIVE" ? 10_000 : 60_000,
  });
}
