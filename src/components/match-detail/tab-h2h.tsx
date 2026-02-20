import { Repeat2 } from "lucide-react";

import { EmptyState } from "@/components/shared/empty-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AGGREGATED_METRIC_LABELS,
  getMetricValues,
} from "@/lib/utils/constants";
import { formatWindowRange } from "@/lib/utils/date";
import type { AggregationData } from "@/types/api";

interface TabH2HProps {
  h2h: AggregationData | null;
}

export function TabH2H({ h2h }: TabH2HProps) {
  if (!h2h) {
    return (
      <EmptyState
        icon={Repeat2}
        title="No H2H data available"
        description="Head-to-head statistics will appear here once calculated."
      />
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-card/50 border-border/50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Head-to-Head Summary</CardTitle>
            <Badge variant="outline" className="text-xs">
              {h2h.sampleSize} matches
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            {formatWindowRange(h2h.windowFrom, h2h.windowTo)}
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(AGGREGATED_METRIC_LABELS).map(([key, label]) => {
              const { forVal, againstVal, totalVal } = getMetricValues(
                h2h.metrics,
                key,
              );

              if (forVal == null && totalVal == null) return null;

              return (
                <div
                  key={key}
                  className="rounded-lg border border-border/50 bg-accent/30 p-3"
                >
                  <p className="mb-2 text-xs font-medium text-muted-foreground">
                    {label}
                  </p>
                  <div className="flex items-center justify-between gap-2">
                    {forVal != null && (
                      <div className="text-center">
                        <p className="text-lg font-bold">
                          {forVal.toFixed(2)}
                        </p>
                        <p className="text-xs text-muted-foreground">For</p>
                      </div>
                    )}
                    {againstVal != null && (
                      <div className="text-center">
                        <p className="text-lg font-bold">
                          {againstVal.toFixed(2)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Against
                        </p>
                      </div>
                    )}
                    {totalVal != null && (
                      <div className="text-center">
                        <p className="text-lg font-bold text-primary">
                          {totalVal.toFixed(2)}
                        </p>
                        <p className="text-xs text-muted-foreground">Total</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
