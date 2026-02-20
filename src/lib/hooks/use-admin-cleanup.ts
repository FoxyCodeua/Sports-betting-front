"use client";

import { useMutation } from "@tanstack/react-query";

import { restFetch } from "@/lib/api/rest-client";

interface CleanupResult {
  odds: number;
  predictions: number;
  clickouts: number;
}

export function useManualCleanup() {
  return useMutation({
    mutationFn: () =>
      restFetch<CleanupResult>("/api/admin/cleanup", { method: "POST" }),
  });
}
