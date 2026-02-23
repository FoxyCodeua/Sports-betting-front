import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Odds } from "@/types/graphql";

interface OddsOverviewCardProps {
  odds: Odds[];
}

function parseMarketType(marketType: string): {
  market: string;
  selection: string;
} {
  const dashIndex = marketType.indexOf(" - ");
  if (dashIndex === -1) return { market: marketType, selection: "" };
  return {
    market: marketType.slice(0, dashIndex),
    selection: marketType.slice(dashIndex + 3),
  };
}

export function OddsOverviewCard({ odds }: OddsOverviewCardProps) {
  if (!odds.length) return null;

  const sorted = [...odds].sort(
    (a, b) =>
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  );

  const latestByType = new Map<string, Odds>();
  for (const odd of sorted) {
    if (!latestByType.has(odd.marketType)) {
      latestByType.set(odd.marketType, odd);
    }
  }

  const byMarket = new Map<string, { selection: string; odd: Odds }[]>();
  for (const [type, odd] of latestByType) {
    const { market, selection } = parseMarketType(type);
    const existing = byMarket.get(market) ?? [];
    existing.push({ selection, odd });
    byMarket.set(market, existing);
  }

  return (
    <Card className="bg-card/50 border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Bookmaker Odds</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {Array.from(byMarket.entries()).map(([market, entries]) => (
          <div key={market}>
            <p className="mb-2 text-xs font-medium text-muted-foreground">
              {market}
            </p>
            <div className="flex flex-wrap gap-2">
              {entries.map(({ selection, odd }) => (
                <div
                  key={odd.id}
                  className="flex items-center gap-2 rounded-lg border border-border/50 bg-accent/10 px-3 py-1.5"
                >
                  <span className="text-xs text-muted-foreground">
                    {selection}
                  </span>
                  <span className="font-mono text-sm font-bold text-primary">
                    {Number(odd.value).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
