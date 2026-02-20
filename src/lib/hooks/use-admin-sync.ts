"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { restFetch } from "@/lib/api/rest-client";

interface SyncStatus {
  isRunning: boolean;
}

export function useSyncStatus(enabled: boolean) {
  return useQuery({
    queryKey: ["admin", "syncStatus"],
    queryFn: () =>
      restFetch<SyncStatus>("/api/admin/sync/status"),
    enabled,
    refetchInterval: enabled ? 5_000 : false,
  });
}

export function useManualSync() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      restFetch<{ status: string }>("/api/admin/sync", { method: "POST" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "syncStatus"] });
    },
  });
}
