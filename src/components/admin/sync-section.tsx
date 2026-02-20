"use client";

import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useManualSync, useSyncStatus } from "@/lib/hooks/use-admin-sync";

export function SyncSection() {
  const sync = useManualSync();
  const queryClient = useQueryClient();

  const syncStarted = sync.isSuccess || sync.isPending;
  const { data: syncStatus } = useSyncStatus(syncStarted);
  const prevRunning = useRef(false);

  useEffect(() => {
    if (prevRunning.current && syncStatus && !syncStatus.isRunning) {
      queryClient.invalidateQueries({ queryKey: ["matches"] });
      queryClient.invalidateQueries({ queryKey: ["matchesCount"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "leagues"] });
      sync.reset();
    }
    prevRunning.current = syncStatus?.isRunning ?? false;
  }, [syncStatus, queryClient, sync]);

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <RefreshCw className="h-4 w-4 text-emerald-500" />
        <h2 className="text-lg font-semibold">Data Sync</h2>
      </div>

      <Card className="border-border/50 bg-card/50">
        <CardContent className="p-4 space-y-4">
          <p className="text-sm text-muted-foreground">
            Daily sync runs automatically at 3:00 AM — fetches matches,
            standings, statistics, and lineups for all active leagues. Use
            the button below to trigger it manually (e.g. after adding a
            new league).
          </p>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => sync.mutate()}
              disabled={sync.isPending || syncStatus?.isRunning}
            >
              <RefreshCw
                className={cn(
                  "mr-2 h-3.5 w-3.5",
                  (sync.isPending || syncStatus?.isRunning) && "animate-spin",
                )}
              />
              {sync.isPending
                ? "Starting..."
                : syncStatus?.isRunning
                  ? "Sync Running..."
                  : "Run Sync Now"}
            </Button>
            {syncStatus?.isRunning && (
              <p className="text-xs text-emerald-500">
                Sync in progress. This page will update automatically when done.
              </p>
            )}
            {sync.isError && (
              <p className="text-xs text-destructive">
                Failed to start sync. Check server logs.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
