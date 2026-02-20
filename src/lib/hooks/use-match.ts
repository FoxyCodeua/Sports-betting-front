"use client";

import { useQuery } from "@tanstack/react-query";

import { graphqlClient } from "@/lib/api/graphql-client";
import { MATCH_DETAIL_QUERY } from "@/lib/api/queries/matches";
import type { Match } from "@/types/graphql";

interface MatchResponse {
  match: Match | null;
}

export function useMatch(id: string) {
  return useQuery({
    queryKey: ["match", id] as const,
    queryFn: async () => {
      const data = await graphqlClient.request<MatchResponse>(
        MATCH_DETAIL_QUERY,
        { id: Number(id) },
      );
      return data.match;
    },
    enabled: !!id,
    staleTime: 60_000,
  });
}
