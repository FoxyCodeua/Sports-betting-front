"use client";

import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { AlertTriangle, CheckCircle2, Trash2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useDatabaseReset } from "@/lib/hooks/use-admin-reset";
import { useSyncStatus } from "@/lib/hooks/use-admin-sync";

export function ResetSection() {
  const reset = useDatabaseReset();
  const queryClient = useQueryClient();
  const [showConfirm, setShowConfirm] = useState(false);
  const [syncActive, setSyncActive] = useState(false);

  const { data: syncStatus } = useSyncStatus(syncActive);

  const handleReset = () => {
    reset.mutate(undefined, {
      onSuccess: () => {
        setShowConfirm(false);
        setSyncActive(true);
      },
    });
  };

  useEffect(() => {
    if (!syncActive || syncStatus?.isRunning !== false) return;

    queryClient.invalidateQueries({ queryKey: ["matches"] });
    queryClient.invalidateQueries({ queryKey: ["matchesCount"] });
    queryClient.invalidateQueries({ queryKey: ["admin", "leagues"] });
    setSyncActive(false);
  }, [syncActive, syncStatus, queryClient]);

  const isWorking = reset.isPending || syncActive;

  return (
    <>
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-rose-500" />
          <h2 className="text-lg font-semibold">Database Reset</h2>
        </div>

        <Card className="border-rose-500/20 bg-card/50">
          <CardContent className="p-4 space-y-4">
            <p className="text-sm text-muted-foreground">
              Wipe all match data (matches, teams, players, referees,
              predictions, odds, statistics) and re-sync fresh from SofaScore.
              League configuration will be preserved.
            </p>

            <div className="flex items-center gap-3">
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setShowConfirm(true)}
                disabled={isWorking}
              >
                <Trash2 className="mr-2 h-3.5 w-3.5" />
                {reset.isPending
                  ? "Clearing..."
                  : syncActive
                    ? "Sync running..."
                    : "Reset & Re-sync"}
              </Button>
              {syncActive && (
                <p className="text-xs text-emerald-500">
                  Database cleared. Sync in progress, please wait...
                </p>
              )}
              {reset.isSuccess && !syncActive && !reset.isPending && (
                <p className="flex items-center gap-1.5 text-xs text-emerald-500">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Reset complete. Fresh data synced.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </section>

      <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reset entire database?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete ALL match data, teams, players,
              referees, predictions, odds, and statistics. League configuration
              will be kept. A fresh sync will start immediately after.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={reset.isPending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleReset}
              disabled={reset.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {reset.isPending ? "Clearing..." : "Yes, Reset Everything"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
