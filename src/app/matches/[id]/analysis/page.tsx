"use client";

import { AlertCircle, AlertTriangle, BrainCircuit, Clock, XCircle } from "lucide-react";
import { use } from "react";

import { AnalysisSection } from "@/components/analysis/analysis-section";
import {
  ConfidenceGauge,
} from "@/components/analysis/confidence-badge";
import { MarkerMatchesTable } from "@/components/analysis/marker-matches-table";
import { OddsOverviewCard } from "@/components/analysis/odds-overview-card";
import { RecommendationsTable } from "@/components/analysis/recommendations-table";
import { RiskIndicator } from "@/components/analysis/risk-indicator";
import { TeamFormCard } from "@/components/analysis/team-form-card";
import { MatchDetailHeader } from "@/components/match-detail/match-detail-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useMatch } from "@/lib/hooks/use-match";
import { useMatchAggregates } from "@/lib/hooks/use-match-aggregates";
import { useMatchForm } from "@/lib/hooks/use-match-form";
import { useMatchPrediction } from "@/lib/hooks/use-match-prediction";

const ANALYSIS_SECTIONS = [
  { key: "motivation" as const, title: "Team Motivation" },
  { key: "form" as const, title: "Team Form" },
  { key: "squads" as const, title: "Squad Status" },
  { key: "markerMatches" as const, title: "Marker Matches" },
  { key: "h2h" as const, title: "Head-to-Head" },
  { key: "statistics" as const, title: "Statistics Analysis" },
  { key: "oddsAnalysis" as const, title: "Odds Analysis" },
];

export default function AnalysisPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data: match, isLoading: matchLoading } = useMatch(id);
  const { data: prediction, isLoading: predLoading } = useMatchPrediction(id);
  const { data: aggregates } = useMatchAggregates(id);
  const { data: form } = useMatchForm(id);

  if (matchLoading || predLoading) {
    return <AnalysisSkeleton />;
  }

  if (!match) {
    return (
      <EmptyState
        icon={AlertCircle}
        title="Match not found"
        description="The match you're looking for doesn't exist."
      />
    );
  }

  return (
    <div className="space-y-6">
      <MatchDetailHeader match={match} />

      {!prediction ? (
        <EmptyState
          icon={BrainCircuit}
          title="No prediction available"
          description="AI analysis hasn't been generated for this match yet. Predictions are generated 2 hours before kickoff."
        />
      ) : prediction.status === "failed" ? (
        <EmptyState
          icon={XCircle}
          title="Prediction generation failed"
          description="AI analysis could not be generated for this match. It will be retried automatically."
        />
      ) : (
        <>
          {prediction.status === "draft" && (
            <Card className="border-blue-500/20 bg-blue-500/5">
              <CardContent className="flex items-center gap-3 p-4">
                <Clock className="h-5 w-5 text-blue-400 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-blue-400">
                    Preliminary Analysis
                  </p>
                  <p className="text-xs text-muted-foreground">
                    This analysis will be updated when lineups are confirmed, closer to kickoff.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {prediction.insufficientData && (
            <Card className="border-amber-500/20 bg-amber-500/5">
              <CardContent className="flex items-center gap-3 p-4">
                <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-amber-400">
                    Insufficient Data
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Limited data available for this analysis. Predictions may be less accurate.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex flex-wrap items-center justify-center gap-6 py-2">
            <div className="text-center">
              <p className="mb-2 text-xs font-medium uppercase text-muted-foreground">
                Confidence
              </p>
              <ConfidenceGauge value={prediction.confidence} />
            </div>
            <div className="text-center">
              <p className="mb-2 text-xs font-medium uppercase text-muted-foreground">
                Risk Level
              </p>
              <RiskIndicator risk={prediction.risk} />
            </div>
          </div>

          {form && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Team Form</h2>
              <div className="grid gap-4 lg:grid-cols-2">
                <TeamFormCard
                  title={`${match.homeTeam.name} (Home)`}
                  data={form.homeTeam}
                />
                <TeamFormCard
                  title={`${match.awayTeam.name} (Away)`}
                  data={form.awayTeam}
                />
              </div>
            </div>
          )}

          {(aggregates?.markerHome || aggregates?.markerAway) && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Marker Matches</h2>
              <div className="grid gap-4 lg:grid-cols-2">
                <MarkerMatchesTable
                  title={`${match.homeTeam.name} (Home)`}
                  data={aggregates.markerHome}
                />
                <MarkerMatchesTable
                  title={`${match.awayTeam.name} (Away)`}
                  data={aggregates.markerAway}
                />
              </div>
            </div>
          )}

          {aggregates?.h2h && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Head-to-Head</h2>
              <MarkerMatchesTable
                title={`${match.homeTeam.name} vs ${match.awayTeam.name}`}
                data={aggregates.h2h}
              />
            </div>
          )}

          {match.odds && match.odds.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Odds</h2>
              <OddsOverviewCard odds={match.odds} />
            </div>
          )}

          {prediction.predictions?.recommendations && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Recommended Bets</h2>
              <RecommendationsTable
                title="Big Markets"
                recommendations={
                  prediction.predictions.recommendations.bigMarkets
                }
              />
              <RecommendationsTable
                title="Small Markets"
                recommendations={
                  prediction.predictions.recommendations.smallMarkets
                }
              />
            </div>
          )}

          {prediction.predictions?.analysis && (
            <div className="space-y-3">
              <h2 className="text-lg font-semibold">AI Analysis</h2>
              {ANALYSIS_SECTIONS.map((section) => {
                const content =
                  prediction.predictions?.analysis[section.key];
                if (!content) return null;
                return (
                  <AnalysisSection
                    key={section.key}
                    title={section.title}
                    content={content}
                  />
                );
              })}
            </div>
          )}

          {prediction.predictions?.summary && (
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-4">
                <p className="text-sm font-medium">Summary</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {prediction.predictions.summary}
                </p>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}

function AnalysisSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-64 w-full rounded-xl" />
      <div className="flex justify-center gap-6">
        <Skeleton className="h-28 w-28 rounded-full" />
        <Skeleton className="h-10 w-32 rounded-full" />
      </div>
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-16 w-full rounded-xl" />
      ))}
    </div>
  );
}
