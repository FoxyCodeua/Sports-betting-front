import { Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Player } from "@/types/graphql";

interface PlayerRowProps {
  player: Player;
}

export function PlayerRow({ player }: PlayerRowProps) {
  return (
    <div className="flex items-center justify-between rounded-lg px-2 py-1 text-sm hover:bg-accent/50">
      <div className="flex items-center gap-2">
        {player.jerseyNumber && (
          <span className="w-6 text-center font-mono text-xs text-muted-foreground">
            {player.jerseyNumber}
          </span>
        )}
        <span
          className={cn(
            player.status === "INJURED" && "text-rose-400",
            player.status === "SUSPENDED" && "text-amber-400",
          )}
        >
          {player.name}
        </span>
        {player.importance === "KEY_PLAYER" && (
          <Star className="h-3 w-3 text-amber-400" />
        )}
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">
          {player.position}
        </span>
        {player.status === "INJURED" && (
          <Badge
            variant="outline"
            className="border-rose-500/20 bg-rose-500/10 text-rose-400 text-xs"
          >
            Injured
          </Badge>
        )}
        {player.status === "SUSPENDED" && (
          <Badge
            variant="outline"
            className="border-amber-500/20 bg-amber-500/10 text-amber-400 text-xs"
          >
            Suspended
          </Badge>
        )}
      </div>
    </div>
  );
}
