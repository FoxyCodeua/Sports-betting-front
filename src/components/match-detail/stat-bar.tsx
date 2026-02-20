import { cn } from "@/lib/utils";

interface StatBarProps {
  label: string;
  homeValue: number | null;
  awayValue: number | null;
  isPercentage?: boolean;
  isDecimal?: boolean;
}

export function StatBar({
  label,
  homeValue,
  awayValue,
  isPercentage = false,
  isDecimal = false,
}: StatBarProps) {
  const home = homeValue ?? 0;
  const away = awayValue ?? 0;
  const total = home + away || 1;
  const homePercent = (home / total) * 100;

  const formatValue = (val: number | null) => {
    if (val == null) return "-";
    if (isPercentage) return `${val.toFixed(0)}%`;
    if (isDecimal) return val.toFixed(2);
    return val.toString();
  };

  const homeWinning = home > away;
  const awayWinning = away > home;

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span
          className={cn("font-mono", homeWinning && "font-bold text-emerald-400")}
        >
          {formatValue(homeValue)}
        </span>
        <span className="text-xs text-muted-foreground">{label}</span>
        <span
          className={cn("font-mono", awayWinning && "font-bold text-emerald-400")}
        >
          {formatValue(awayValue)}
        </span>
      </div>
      <div className="flex h-1.5 overflow-hidden rounded-full bg-muted/50">
        <div
          className={cn(
            "transition-all duration-500",
            homeWinning ? "bg-emerald-500" : "bg-muted-foreground/30",
          )}
          style={{ width: `${homePercent}%` }}
        />
        <div
          className={cn(
            "transition-all duration-500",
            awayWinning ? "bg-emerald-500" : "bg-muted-foreground/30",
          )}
          style={{ width: `${100 - homePercent}%` }}
        />
      </div>
    </div>
  );
}
