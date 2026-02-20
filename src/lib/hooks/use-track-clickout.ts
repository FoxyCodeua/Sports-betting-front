"use client";

import { useMutation } from "@tanstack/react-query";

import { restFetch } from "@/lib/api/rest-client";
import type { CreateClickoutDto } from "@/types/api";

export function useTrackClickout() {
  return useMutation({
    mutationFn: (data: CreateClickoutDto) =>
      restFetch<void>("/api/track/clickout", {
        method: "POST",
        body: JSON.stringify(data),
      }),
  });
}
