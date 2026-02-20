import { TrendingUp } from "lucide-react";

import { EmptyState } from "@/components/shared/empty-state";
import type { Odds } from "@/types/graphql";

import { MarketCard } from "./market-card";

interface TabOddsProps {
  odds: Odds[];
}

export function TabOdds({ odds }: TabOddsProps) {
  if (!odds.length) {
    return (
      <EmptyState
        icon={TrendingUp}
        title="No odds available"
        description="Bookmaker odds will appear here once they are published."
      />
    );
  }

  const groupedByMarket = odds.reduce<Record<string, Odds[]>>((acc, odd) => {
    const key = odd.marketType;
    if (!acc[key]) acc[key] = [];
    acc[key].push(odd);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {Object.entries(groupedByMarket).map(([marketType, marketOdds]) => (
        <MarketCard
          key={marketType}
          marketType={marketType}
          odds={marketOdds}
        />
      ))}
    </div>
  );
}
