"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MARKET_TYPE_LABELS } from "@/lib/utils/constants";
import type { Odds } from "@/types/graphql";

interface MarketCardProps {
  marketType: string;
  odds: Odds[];
}

export function MarketCard({ marketType, odds }: MarketCardProps) {
  const sorted = [...odds].sort(
    (a, b) =>
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
  );

  const latestByBookmaker = new Map<string, Odds>();
  for (const odd of sorted) {
    latestByBookmaker.set(odd.bookmaker, odd);
  }
  const latest = Array.from(latestByBookmaker.values());

  const chartData = sorted.map((o) => ({
    time: new Date(o.timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    value: o.value,
  }));

  return (
    <Card className="bg-card/50 border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">
          {MARKET_TYPE_LABELS[marketType] ?? marketType}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-lg border border-border/50 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Bookmaker</TableHead>
                <TableHead className="text-right">Value</TableHead>
                <TableHead className="text-right">Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {latest.map((odd) => (
                <TableRow key={odd.id}>
                  <TableCell className="font-medium">
                    {odd.bookmaker}
                  </TableCell>
                  <TableCell className="text-right font-mono font-bold">
                    {odd.value.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right text-xs text-muted-foreground">
                    {new Date(odd.timestamp).toLocaleString([], {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {chartData.length > 2 && (
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis
                  dataKey="time"
                  tick={{ fontSize: 10 }}
                  stroke="hsl(var(--muted-foreground))"
                />
                <YAxis
                  tick={{ fontSize: 10 }}
                  stroke="hsl(var(--muted-foreground))"
                  domain={["auto", "auto"]}
                />
                <RechartsTooltip
                  contentStyle={{
                    background: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: 12,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="oklch(0.696 0.17 162.48)"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
