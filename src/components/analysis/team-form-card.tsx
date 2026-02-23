import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { TeamFormData } from "@/types/api";

interface TeamFormCardProps {
  title: string;
  data: TeamFormData;
}

const RESULT_STYLES = {
  W: "text-emerald-400",
  D: "text-amber-400",
  L: "text-rose-400",
} as const;

export function TeamFormCard({ title, data }: TeamFormCardProps) {
  if (!data.matches.length) return null;

  const wins = data.matches.filter((m) => m.result === "W").length;
  const draws = data.matches.filter((m) => m.result === "D").length;
  const losses = data.matches.filter((m) => m.result === "L").length;

  return (
    <Card className="bg-card/50 border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">{title}</CardTitle>
          <div className="flex gap-1.5">
            <Badge variant="outline" className="text-xs text-emerald-400 border-emerald-500/30">
              {wins}W
            </Badge>
            <Badge variant="outline" className="text-xs text-amber-400 border-amber-500/30">
              {draws}D
            </Badge>
            <Badge variant="outline" className="text-xs text-rose-400 border-rose-500/30">
              {losses}L
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50">
                <th className="pb-2 text-left text-xs font-medium text-muted-foreground">
                  Date
                </th>
                <th className="pb-2 text-left text-xs font-medium text-muted-foreground">
                  Opponent
                </th>
                <th className="pb-2 text-center text-xs font-medium text-muted-foreground">
                  V
                </th>
                <th className="pb-2 text-center text-xs font-medium text-muted-foreground">
                  Score
                </th>
                <th className="pb-2 text-center text-xs font-medium text-muted-foreground">
                  xG
                </th>
                <th className="pb-2 text-center text-xs font-medium text-muted-foreground">
                  R
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {data.matches.map((m, i) => (
                <tr key={i} className="hover:bg-accent/20">
                  <td className="py-2 text-xs text-muted-foreground">
                    {m.date}
                  </td>
                  <td className="py-2 text-xs truncate max-w-30">
                    {m.opponent}
                  </td>
                  <td className="py-2 text-center text-xs text-muted-foreground">
                    {m.venue}
                  </td>
                  <td className="py-2 text-center font-mono text-xs font-bold">
                    {m.score}
                  </td>
                  <td className="py-2 text-center font-mono text-xs text-muted-foreground">
                    {m.xgHome != null && m.xgAway != null
                      ? `${m.xgHome.toFixed(1)}-${m.xgAway.toFixed(1)}`
                      : "-"}
                  </td>
                  <td
                    className={cn(
                      "py-2 text-center text-xs font-bold",
                      RESULT_STYLES[m.result],
                    )}
                  >
                    {m.result}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
