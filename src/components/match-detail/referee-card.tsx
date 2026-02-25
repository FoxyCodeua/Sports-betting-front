import { Shield } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { RefereeResponse } from "@/types/api";

interface RefereeCardProps {
  referee: RefereeResponse | null;
}

export function RefereeCard({ referee }: RefereeCardProps) {
  return (
    <Card className="bg-card/50 border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Shield className="h-4 w-4" />
          Referee
        </CardTitle>
      </CardHeader>
      <CardContent>
        {referee?.name ? (
          <div className="flex flex-wrap items-center gap-6">
            <div>
              <p className="font-medium">{referee.name}</p>
            </div>
            {referee.avgYellowCards != null && (
              <div className="text-center">
                <p className="text-lg font-bold text-amber-400">
                  {Number(referee.avgYellowCards).toFixed(1)}
                </p>
                <p className="text-xs text-muted-foreground">
                  Avg Yellow Cards
                </p>
              </div>
            )}
            {referee.avgRedCards != null && (
              <div className="text-center">
                <p className="text-lg font-bold text-rose-400">
                  {Number(referee.avgRedCards).toFixed(2)}
                </p>
                <p className="text-xs text-muted-foreground">Avg Red Cards</p>
              </div>
            )}
            {referee.sampleSize != null && (
              <div className="text-center">
                <p className="text-lg font-bold">{referee.sampleSize}</p>
                <p className="text-xs text-muted-foreground">Matches</p>
              </div>
            )}
          </div>
        ) : (
          <p className="text-muted-foreground">Not assigned</p>
        )}
      </CardContent>
    </Card>
  );
}
