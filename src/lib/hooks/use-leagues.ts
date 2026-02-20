"use client";

import { useQuery } from "@tanstack/react-query";

import { graphqlClient } from "@/lib/api/graphql-client";
import { LEAGUES_QUERY } from "@/lib/api/queries/leagues";
import type { League } from "@/types/graphql";

interface LeaguesResponse {
  leagues: League[];
}

export function useLeagues() {
  return useQuery({
    queryKey: ["leagues"] as const,
    queryFn: async () => {
      const data = await graphqlClient.request<LeaguesResponse>(
        LEAGUES_QUERY,
        { page: 1, limit: 50 },
      );
      return data.leagues;
    },
    staleTime: 10 * 60_000,
  });
}
