"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { restFetch } from "@/lib/api/rest-client";
import type { League } from "@/types/graphql";

interface AdminLeague extends League {
  isActive: boolean;
}

export function useAdminLeagues() {
  return useQuery({
    queryKey: ["adminLeagues"] as const,
    queryFn: () => restFetch<AdminLeague[]>("/api/admin/leagues"),
    staleTime: 0,
  });
}

export function useActivateLeague() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      restFetch<AdminLeague>(`/api/admin/leagues/${id}/activate`, {
        method: "PATCH",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminLeagues"] });
      queryClient.invalidateQueries({ queryKey: ["leagues"] });
      queryClient.invalidateQueries({ queryKey: ["matches"] });
      queryClient.invalidateQueries({ queryKey: ["matchesCount"] });
    },
  });
}

export function useDeactivateLeague() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      restFetch<AdminLeague>(`/api/admin/leagues/${id}/deactivate`, {
        method: "PATCH",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminLeagues"] });
      queryClient.invalidateQueries({ queryKey: ["leagues"] });
      queryClient.invalidateQueries({ queryKey: ["matches"] });
      queryClient.invalidateQueries({ queryKey: ["matchesCount"] });
    },
  });
}

export function useCreateLeague() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { tournamentId: number; name: string }) =>
      restFetch<AdminLeague>("/api/admin/leagues", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminLeagues"] });
      queryClient.invalidateQueries({ queryKey: ["leagues"] });
    },
  });
}

export function useDeleteLeague() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      restFetch(`/api/admin/leagues/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminLeagues"] });
      queryClient.invalidateQueries({ queryKey: ["leagues"] });
      queryClient.invalidateQueries({ queryKey: ["matches"] });
      queryClient.invalidateQueries({ queryKey: ["matchesCount"] });
    },
  });
}
