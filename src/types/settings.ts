export interface MetricDefinition {
  label: string;
  prefix: string;
  hasTotal: boolean;
  enabled: boolean;
}

export interface AiSettings {
  systemPrompt: string;
  metricDefinitions: MetricDefinition[];
  model: string;
  temperature: number;
  maxTokens: number;
  timeout: number;
  retries: number;
}

export interface AggregationSettings {
  markerWindowMonths: number;
  markerExtendedWindowMonths: number;
  markerMinSample: number;
  h2hWindowMonths: number;
  h2hExtendedMonths: number;
  minH2hMatches: number;
  oddsTolerance: number;
}

export interface PredictionSettings {
  draftWindowMin: number;
  lineupRefreshWindowMin: number;
  autoPublishWindowMin: number;
}

export interface ConfidenceSettings {
  baseConfidence: number;
  sampleSizeWeight: number;
  coachContinuityBonus: number;
  squadChangesThreshold: number;
  squadChangesBonus: number;
  oddsBonus: number;
  lineupsBonus: number;
}

export interface AppSettings {
  ai: AiSettings;
  aggregation: AggregationSettings;
  prediction: PredictionSettings;
  confidence: ConfidenceSettings;
}

export type SettingsSection = keyof AppSettings;
