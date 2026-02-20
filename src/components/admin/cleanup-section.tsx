"use client";

import { useState } from "react";
import { Database, HardDriveDownload } from "lucide-react";

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
import { useManualCleanup } from "@/lib/hooks/use-admin-cleanup";

export function CleanupSection() {
  const cleanup = useManualCleanup();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleCleanup = () => {
    cleanup.mutate(undefined, {
      onSuccess: () => setShowConfirm(false),
    });
  };

  return (
    <>
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Database className="h-4 w-4 text-emerald-500" />
          <h2 className="text-lg font-semibold">Database Maintenance</h2>
        </div>

        <Card className="border-border/50 bg-card/50">
          <CardContent className="p-4 space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Auto-cleanup runs daily at 4:00 AM to keep the database
                within the free tier limit. You can also trigger it manually.
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-muted-foreground">
                <span>
                  Odds:{" "}
                  <span className="text-foreground font-medium">7 days</span>{" "}
                  after match ends
                </span>
                <span>
                  Predictions:{" "}
                  <span className="text-foreground font-medium">30 days</span>{" "}
                  after match ends
                </span>
                <span>
                  Clickouts:{" "}
                  <span className="text-foreground font-medium">90 days</span>{" "}
                  retention
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowConfirm(true)}
                disabled={cleanup.isPending}
              >
                <HardDriveDownload className="mr-2 h-3.5 w-3.5" />
                {cleanup.isPending ? "Running..." : "Run Cleanup Now"}
              </Button>
              {cleanup.data && !cleanup.isPending && (
                <p className="text-xs text-muted-foreground">
                  Deleted{" "}
                  <span className="text-foreground font-medium">
                    {cleanup.data.odds}
                  </span>{" "}
                  odds,{" "}
                  <span className="text-foreground font-medium">
                    {cleanup.data.predictions}
                  </span>{" "}
                  predictions,{" "}
                  <span className="text-foreground font-medium">
                    {cleanup.data.clickouts}
                  </span>{" "}
                  clickouts
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </section>

      <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Run database cleanup?</AlertDialogTitle>
            <AlertDialogDescription>
              This will delete old odds, predictions, and clickout records
              based on the retention rules above. Active match data will not
              be affected.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={cleanup.isPending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCleanup}
              disabled={cleanup.isPending}
            >
              {cleanup.isPending ? "Running..." : "Run Cleanup"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
