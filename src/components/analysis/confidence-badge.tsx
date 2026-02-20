import { cn } from "@/lib/utils";
import { CONFIDENCE_BG_COLORS, CONFIDENCE_COLORS } from "@/lib/utils/constants";

interface ConfidenceBadgeProps {
  confidence: "high" | "medium" | "low";
  className?: string;
}

export function ConfidenceBadge({ confidence, className }: ConfidenceBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize",
        CONFIDENCE_BG_COLORS[confidence],
        CONFIDENCE_COLORS[confidence],
        className,
      )}
    >
      {confidence}
    </span>
  );
}

interface ConfidenceGaugeProps {
  value: number;
}

export function ConfidenceGauge({ value }: ConfidenceGaugeProps) {
  const percent = Math.round(value * 100);
  const level = percent >= 70 ? "high" : percent >= 40 ? "medium" : "low";
  const strokeColor =
    level === "high"
      ? "stroke-emerald-500"
      : level === "medium"
        ? "stroke-amber-500"
        : "stroke-rose-500";

  const circumference = 2 * Math.PI * 40;
  const offset = circumference - (value * circumference);

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="100" height="100" className="-rotate-90">
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          className="text-muted/50"
        />
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          strokeWidth="6"
          strokeLinecap="round"
          className={strokeColor}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-2xl font-bold">{percent}%</span>
      </div>
    </div>
  );
}
