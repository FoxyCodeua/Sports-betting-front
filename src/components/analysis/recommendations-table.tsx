import { Check, X } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { BetRecommendation } from "@/types/api";

import { ConfidenceBadge } from "./confidence-badge";
import { RiskIndicator } from "./risk-indicator";

interface RecommendationsTableProps {
  title: string;
  recommendations: BetRecommendation[];
}

export function RecommendationsTable({
  title,
  recommendations,
}: RecommendationsTableProps) {
  if (!recommendations.length) return null;

  return (
    <Card className="bg-card/50 border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-border/50 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Market</TableHead>
                <TableHead>Recommendation</TableHead>
                <TableHead>Confidence</TableHead>
                <TableHead>Risk</TableHead>
                <TableHead className="text-right">Odds</TableHead>
                <TableHead className="text-center">Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recommendations.map((rec) => (
                <TableRow key={`${rec.market}-${rec.recommendation}`}>
                  <TableCell className="font-medium">{rec.market}</TableCell>
                  <TableCell>{rec.recommendation}</TableCell>
                  <TableCell>
                    <ConfidenceBadge confidence={rec.confidence} />
                  </TableCell>
                  <TableCell>
                    <RiskIndicator risk={rec.risk} />
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {rec.bookmakerOdds?.toFixed(2) ?? "-"}
                  </TableCell>
                  <TableCell className="text-center">
                    {rec.valueBet ? (
                      <Check className="mx-auto h-4 w-4 text-emerald-400" />
                    ) : (
                      <X className="mx-auto h-4 w-4 text-muted-foreground/50" />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
