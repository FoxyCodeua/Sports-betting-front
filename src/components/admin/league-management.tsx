"use client";

import { useState } from "react";
import {
  ExternalLink,
  Plus,
  Power,
  PowerOff,
  Trash2,
  Trophy,
} from "lucide-react";

import { TeamLogo } from "@/components/shared/team-logo";
import { EmptyState } from "@/components/shared/empty-state";
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import {
  useAdminLeagues,
  useActivateLeague,
  useDeactivateLeague,
  useCreateLeague,
  useDeleteLeague,
} from "@/lib/hooks/use-admin-leagues";

export function LeagueManagement() {
  const { data: leagues, isLoading } = useAdminLeagues();
  const activate = useActivateLeague();
  const deactivate = useDeactivateLeague();
  const create = useCreateLeague();
  const deleteMutation = useDeleteLeague();

  const [showAdd, setShowAdd] = useState(false);
  const [tournamentId, setTournamentId] = useState("");
  const [leagueName, setLeagueName] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const handleToggle = (id: string, isActive: boolean) => {
    if (isActive) {
      deactivate.mutate(id);
    } else {
      activate.mutate(id);
    }
  };

  const handleCreate = () => {
    const id = Number(tournamentId);
    if (!id || !leagueName.trim()) return;

    create.mutate(
      { tournamentId: id, name: leagueName.trim() },
      {
        onSuccess: () => {
          setTournamentId("");
          setLeagueName("");
          setShowAdd(false);
        },
      },
    );
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    deleteMutation.mutate(deleteTarget.id, {
      onSuccess: () => setDeleteTarget(null),
    });
  };

  return (
    <>
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-emerald-500" />
            <h2 className="text-lg font-semibold">League Management</h2>
            {leagues && (
              <Badge variant="outline" className="text-xs">
                {leagues.filter((l) => l.isActive).length} active
              </Badge>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAdd(!showAdd)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add League
          </Button>
        </div>

        {showAdd && (
          <Card className="border-emerald-500/20 bg-emerald-500/5">
            <CardContent className="space-y-4 p-4">
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  To find a SofaScore Tournament ID, open the league on{" "}
                  <a
                    href="https://www.sofascore.com/football"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-500 underline underline-offset-2 inline-flex items-center gap-0.5"
                  >
                    sofascore.com
                    <ExternalLink className="h-3 w-3" />
                  </a>{" "}
                  and copy the number at the end of the URL.
                  <br />
                  Example:{" "}
                  <code className="rounded bg-muted px-1.5 py-0.5 text-[11px]">
                    sofascore.com/.../premier-league/<strong>17</strong>
                  </code>
                </p>
              </div>

              <div className="flex items-end gap-3">
                <div className="w-40 space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">
                    Tournament ID
                  </label>
                  <Input
                    type="number"
                    placeholder="e.g. 325"
                    value={tournamentId}
                    onChange={(e) => setTournamentId(e.target.value)}
                  />
                </div>
                <div className="flex-1 space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">
                    League Name
                  </label>
                  <Input
                    placeholder="e.g. Eredivisie"
                    value={leagueName}
                    onChange={(e) => setLeagueName(e.target.value)}
                  />
                </div>
                <Button
                  onClick={handleCreate}
                  disabled={
                    create.isPending || !tournamentId || !leagueName.trim()
                  }
                >
                  {create.isPending ? "Adding..." : "Add"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {isLoading ? (
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-16 rounded-xl" />
            ))}
          </div>
        ) : !leagues?.length ? (
          <EmptyState
            icon={Trophy}
            title="No leagues"
            description="No leagues in the database yet. Add one to get started."
          />
        ) : (
          <div className="space-y-2">
            {leagues.map((league) => (
              <Card
                key={league.id}
                className={cn(
                  "border-border/50 transition-colors",
                  league.isActive ? "bg-card/50" : "bg-muted/30 opacity-60",
                )}
              >
                <CardContent className="flex items-center gap-4 p-4">
                  <TeamLogo
                    src={league.logoUrl}
                    name={league.name}
                    size={40}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">{league.name}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>ID: {league.externalId}</span>
                      <span>&middot;</span>
                      <span>{league.type}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handleToggle(league.id, league.isActive)
                      }
                      disabled={activate.isPending || deactivate.isPending}
                      className={cn(
                        league.isActive
                          ? "text-muted-foreground hover:text-destructive hover:border-destructive/30 hover:bg-destructive/10"
                          : "text-emerald-500 border-emerald-500/30 hover:bg-emerald-500/10",
                      )}
                    >
                      {league.isActive ? (
                        <>
                          <PowerOff className="mr-1.5 h-3.5 w-3.5" />
                          Deactivate
                        </>
                      ) : (
                        <>
                          <Power className="mr-1.5 h-3.5 w-3.5" />
                          Activate
                        </>
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() =>
                        setDeleteTarget({
                          id: league.id,
                          name: league.name,
                        })
                      }
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {deleteTarget?.name}?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the league and all associated data:
              matches, odds, predictions, and statistics. This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteMutation.isPending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
