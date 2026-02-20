import { cn } from "@/lib/utils";

interface RiskIndicatorProps {
  risk: string;
}

export function RiskIndicator({ risk }: RiskIndicatorProps) {
  const normalized = risk.toLowerCase();
  const color =
    normalized.includes("low")
      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
      : normalized.includes("high")
        ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
        : "bg-amber-500/10 text-amber-400 border-amber-500/20";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold capitalize",
        color,
      )}
    >
      {risk} risk
    </span>
  );
}
