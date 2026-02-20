export const STAT_LABELS: Record<string, string> = {
  goals: "Goals",
  xg: "Expected Goals (xG)",
  corners: "Corners",
  shots_on_target: "Shots on Target",
  shots: "Total Shots",
  possession: "Possession %",
  fouls: "Fouls",
  offsides: "Offsides",
  cards_yellow: "Yellow Cards",
  cards_red: "Red Cards",
  attacks: "Attacks",
  dangerous_attacks: "Dangerous Attacks",
  goal_kicks: "Goal Kicks",
  free_kicks: "Free Kicks",
  throw_ins: "Throw-ins",
  crosses: "Crosses",
  saves: "Saves",
  first_half_goals: "1st Half Goals",
  first_half_xg: "1st Half xG",
};

export const STAT_GROUPS = [
  {
    label: "Scoring",
    stats: ["goals", "xg", "first_half_goals", "first_half_xg"],
  },
  {
    label: "Shots",
    stats: ["shots", "shots_on_target"],
  },
  {
    label: "Set Pieces",
    stats: ["corners", "free_kicks", "goal_kicks", "throw_ins"],
  },
  {
    label: "Discipline",
    stats: ["fouls", "cards_yellow", "cards_red"],
  },
  {
    label: "Play Style",
    stats: ["possession", "attacks", "dangerous_attacks", "crosses", "offsides", "saves"],
  },
];

export const AGGREGATED_METRIC_LABELS: Record<string, string> = {
  goals: "Goals",
  xg: "xG",
  corners: "Corners",
  yellow: "Yellow Cards",
  red: "Red Cards",
  shots_on_target: "Shots on Target",
  shots: "Total Shots",
  offsides: "Offsides",
  fouls: "Fouls",
  attacks: "Attacks",
  dangerous_attacks: "Dangerous Attacks",
  goal_kicks: "Goal Kicks",
  free_kicks: "Free Kicks",
  throw_ins: "Throw-ins",
  crosses: "Crosses",
  saves: "Saves",
  possession: "Possession",
};

export const MARKET_TYPE_LABELS: Record<string, string> = {
  "1X2": "Match Result (1X2)",
  "TOTAL_OVER_UNDER": "Total Over/Under",
  "BTTS": "Both Teams to Score",
  "CORNERS": "Corners",
  "CARDS": "Cards",
  "HANDICAP": "Handicap",
};

export const CONFIDENCE_COLORS = {
  high: "text-emerald-400",
  medium: "text-amber-400",
  low: "text-rose-400",
} as const;

export const CONFIDENCE_BG_COLORS = {
  high: "bg-emerald-500/10 border-emerald-500/20",
  medium: "bg-amber-500/10 border-amber-500/20",
  low: "bg-rose-500/10 border-rose-500/20",
} as const;

export function getMetricValues(
  metrics: import("@/types/api").AggregatedMetrics,
  key: string,
) {
  const m = metrics as unknown as Record<string, number>;
  return {
    forVal: m[`${key}_for_avg`] as number | undefined,
    againstVal: m[`${key}_against_avg`] as number | undefined,
    totalVal: m[`${key}_total_avg`] as number | undefined,
  };
}
