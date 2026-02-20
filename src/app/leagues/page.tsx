"use client";

import { Trophy } from "lucide-react";
import Link from "next/link";

import { TeamLogo } from "@/components/shared/team-logo";
import { EmptyState } from "@/components/shared/empty-state";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useLeagues } from "@/lib/hooks/use-leagues";

export default function LeaguesPage() {
  const { data: leagues, isLoading } = useLeagues();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Leagues</h1>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (!leagues?.length) {
    return (
      <EmptyState
        icon={Trophy}
        title="No leagues found"
        description="League data will appear here once synchronized."
      />
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Leagues</h1>
        <p className="text-sm text-muted-foreground">
          Top football leagues tracked by the platform.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {leagues.map((league) => (
          <Link
            key={league.id}
            href={`/matches?leagueId=${league.id}`}
            className="block"
          >
            <Card className="bg-card/50 border-border/50 hover:bg-accent/30 transition-colors cursor-pointer">
              <CardContent className="flex items-center gap-4 p-4">
                <TeamLogo
                  src={league.logoUrl}
                  name={league.name}
                  size={48}
                />
                <div className="flex-1">
                  <p className="font-semibold">{league.name}</p>
                  <Badge variant="outline" className="mt-1 text-xs">
                    {league.type}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
