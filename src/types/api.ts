export interface AggregatesResponse {
  matchId: number;
  markerHome: AggregationData | null;
  markerAway: AggregationData | null;
  h2h: AggregationData | null;
  referee: RefereeResponse;
}

export interface AggregationData {
  scopeType: "MARKER_HOME" | "MARKER_AWAY" | "H2H";
  sampleSize: number;
  windowFrom: string;
  windowTo: string;
  sampleMatchIds: number[];
  filterRulesApplied: Record<string, unknown>;
  computedAt: string;
  metrics: AggregatedMetrics;
}

export interface AggregatedMetrics {
  goals_for_avg: number;
  goals_against_avg: number;
  goals_total_avg: number;
  xg_for_avg: number;
  xg_against_avg: number;
  xg_total_avg: number;
  corners_for_avg: number;
  corners_against_avg: number;
  corners_total_avg: number;
  yellow_for_avg: number;
  yellow_against_avg: number;
  yellow_total_avg: number;
  red_for_avg: number;
  red_against_avg: number;
  red_total_avg: number;
  shots_on_target_for_avg: number;
  shots_on_target_against_avg: number;
  shots_on_target_total_avg: number;
  shots_for_avg: number;
  shots_against_avg: number;
  shots_total_avg: number;
  offsides_for_avg: number;
  offsides_against_avg: number;
  offsides_total_avg: number;
  fouls_for_avg: number;
  fouls_against_avg: number;
  fouls_total_avg: number;
  attacks_for_avg: number;
  attacks_against_avg: number;
  attacks_total_avg: number;
  dangerous_attacks_for_avg: number;
  dangerous_attacks_against_avg: number;
  dangerous_attacks_total_avg: number;
  goal_kicks_for_avg: number;
  goal_kicks_against_avg: number;
  goal_kicks_total_avg: number;
  free_kicks_for_avg: number;
  free_kicks_against_avg: number;
  free_kicks_total_avg: number;
  throw_ins_for_avg: number;
  throw_ins_against_avg: number;
  throw_ins_total_avg: number;
  crosses_for_avg: number;
  crosses_against_avg: number;
  crosses_total_avg: number;
  saves_for_avg: number;
  saves_against_avg: number;
  saves_total_avg: number;
  possession_for_avg: number;
  possession_against_avg: number;
}

export interface RefereeResponse {
  refereeId: number | null;
  name: string | null;
  avgYellowCards: number | null;
  avgRedCards: number | null;
  sampleSize: number | null;
}

export interface PredictionResponse {
  status: "draft" | "published" | "failed";
  predictions: DeepSeekPredictionResponse | null;
  confidence: number;
  risk: string;
  insufficientData: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DeepSeekPredictionResponse {
  analysis: {
    motivation: string;
    form: string;
    squads: string;
    markerMatches: string;
    h2h: string;
    statistics: string;
    oddsAnalysis: string;
  };
  recommendations: {
    bigMarkets: BetRecommendation[];
    smallMarkets: BetRecommendation[];
  };
  summary: string;
}

export interface BetRecommendation {
  market: string;
  recommendation: string;
  confidence: "high" | "medium" | "low";
  risk: string;
  bookmakerOdds?: number;
  valueBet: boolean;
}

export interface TeamFormMatch {
  date: string;
  opponent: string;
  venue: "H" | "A";
  score: string;
  xgHome: number | null;
  xgAway: number | null;
  result: "W" | "D" | "L";
}

export interface TeamFormData {
  name: string;
  matches: TeamFormMatch[];
}

export interface FormResponse {
  homeTeam: TeamFormData;
  awayTeam: TeamFormData;
}

export interface CreateClickoutDto {
  matchId: number;
  bookmaker: string;
  marketType: string;
  odds: number;
  timestamp: string;
}
