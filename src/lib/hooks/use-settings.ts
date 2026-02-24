import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { restFetch } from "@/lib/api/rest-client";
import type { AppSettings, SettingsSection } from "@/types/settings";

export function useSettings() {
  return useQuery({
    queryKey: ["admin", "settings"],
    queryFn: () => restFetch<AppSettings>("/api/admin/settings"),
  });
}

export function useSettingsDefaults() {
  return useQuery({
    queryKey: ["admin", "settings", "defaults"],
    queryFn: () => restFetch<AppSettings>("/api/admin/settings/defaults"),
  });
}

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<AppSettings>) =>
      restFetch<AppSettings>("/api/admin/settings", {
        method: "PATCH",
        body: JSON.stringify(data),
      }),
    onSuccess: (data) => {
      queryClient.setQueryData(["admin", "settings"], data);
    },
  });
}

export function useResetSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      restFetch<AppSettings>("/api/admin/settings/reset", { method: "POST" }),
    onSuccess: (data) => {
      queryClient.setQueryData(["admin", "settings"], data);
    },
  });
}

export function useResetSettingsSection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (section: SettingsSection) =>
      restFetch<AppSettings>(`/api/admin/settings/reset/${section}`, {
        method: "POST",
      }),
    onSuccess: (data) => {
      queryClient.setQueryData(["admin", "settings"], data);
    },
  });
}
