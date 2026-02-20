import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AGGREGATED_METRIC_LABELS,
  getMetricValues,
} from "@/lib/utils/constants";
import { formatWindowRange } from "@/lib/utils/date";
import type { AggregationData } from "@/types/api";

interface MarkerMatchesTableProps {
  title: string;
  data: AggregationData | null;
}

export function MarkerMatchesTable({ title, data }: MarkerMatchesTableProps) {
  if (!data) return null;

  return (
    <Card className="bg-card/50 border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">{title}</CardTitle>
          <Badge variant="outline" className="text-xs">
            {data.sampleSize} matches
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground">
          {formatWindowRange(data.windowFrom, data.windowTo)}
        </p>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50">
                <th className="pb-2 text-left text-xs font-medium text-muted-foreground">
                  Metric
                </th>
                <th className="pb-2 text-right text-xs font-medium text-muted-foreground">
                  Ind. Total
                </th>
                <th className="pb-2 text-right text-xs font-medium text-muted-foreground">
                  Ind. Total Opp.
                </th>
                <th className="pb-2 text-right text-xs font-medium text-emerald-400">
                  Match Total
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {Object.entries(AGGREGATED_METRIC_LABELS).map(([key, label]) => {
                const { forVal, againstVal, totalVal } = getMetricValues(
                  data.metrics,
                  key,
                );

                if (forVal == null && totalVal == null) return null;

                return (
                  <tr key={key} className="hover:bg-accent/20">
                    <td className="py-2 text-muted-foreground">{label}</td>
                    <td className="py-2 text-right font-mono">
                      {forVal?.toFixed(2) ?? "-"}
                    </td>
                    <td className="py-2 text-right font-mono">
                      {againstVal?.toFixed(2) ?? "-"}
                    </td>
                    <td className="py-2 text-right font-mono font-bold text-primary">
                      {totalVal?.toFixed(2) ?? "-"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
