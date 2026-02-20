import { BarChart3 } from "lucide-react";

import { EmptyState } from "@/components/shared/empty-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { STAT_GROUPS, STAT_LABELS } from "@/lib/utils/constants";
import type { MatchStatistics } from "@/types/graphql";

import { StatBar } from "./stat-bar";

interface TabStatisticsProps {
  statistics: MatchStatistics | null;
}

export function TabStatistics({ statistics }: TabStatisticsProps) {
  if (!statistics) {
    return (
      <EmptyState
        icon={BarChart3}
        title="No statistics available"
        description="Match statistics will appear here once the match has started or finished."
      />
    );
  }

  return (
    <div className="space-y-6">
      {STAT_GROUPS.map((group) => (
        <Card key={group.label} className="bg-card/50 border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">{group.label}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {group.stats.map((stat) => {
              const homeKey = `${stat}_home` as keyof MatchStatistics;
              const awayKey = `${stat}_away` as keyof MatchStatistics;
              const homeVal = statistics[homeKey];
              const awayVal = statistics[awayKey];

              if (homeVal == null && awayVal == null) return null;

              return (
                <StatBar
                  key={stat}
                  label={STAT_LABELS[stat] ?? stat}
                  homeValue={homeVal as number | null}
                  awayValue={awayVal as number | null}
                  isPercentage={stat === "possession"}
                  isDecimal={stat.includes("xg")}
                />
              );
            })}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
