"use client";

import { useMutation } from "@tanstack/react-query";

import { restFetch } from "@/lib/api/rest-client";

export function useDatabaseReset() {
  return useMutation({
    mutationFn: () =>
      restFetch<{ status: string }>("/api/admin/reset", { method: "POST" }),
  });
}
