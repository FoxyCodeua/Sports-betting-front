import { AlertTriangle, User } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Player } from "@/types/graphql";

import { PlayerRow } from "./player-row";

interface SquadCardProps {
  title: string;
  formation: string | null;
  coach: string | null;
  players: Player[];
}

export function SquadCard({ title, formation, coach, players }: SquadCardProps) {
  const starters = players.filter((p) => p.importance === "KEY_PLAYER");
  const injured = players.filter((p) => p.status === "INJURED");
  const suspended = players.filter((p) => p.status === "SUSPENDED");

  return (
    <Card className="bg-card/50 border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">{title}</CardTitle>
          {formation && (
            <Badge variant="outline" className="font-mono text-xs">
              {formation}
            </Badge>
          )}
        </div>
        {coach && (
          <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <User className="h-3.5 w-3.5" />
            {coach}
          </p>
        )}
      </CardHeader>
      <CardContent className="space-y-3">
        {starters.length > 0 && (
          <div>
            <p className="mb-2 text-xs font-medium uppercase text-muted-foreground">
              Key Players
            </p>
            <div className="space-y-1">
              {starters.map((p) => (
                <PlayerRow key={p.id} player={p} />
              ))}
            </div>
          </div>
        )}

        {(injured.length > 0 || suspended.length > 0) && (
          <>
            <Separator className="opacity-50" />
            <div>
              <p className="mb-2 flex items-center gap-1.5 text-xs font-medium uppercase text-muted-foreground">
                <AlertTriangle className="h-3 w-3" />
                Unavailable
              </p>
              <div className="space-y-1">
                {injured.map((p) => (
                  <PlayerRow key={p.id} player={p} />
                ))}
                {suspended.map((p) => (
                  <PlayerRow key={p.id} player={p} />
                ))}
              </div>
            </div>
          </>
        )}

        {players.length === 0 && (
          <p className="text-sm text-muted-foreground">
            Squad data not available yet.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
