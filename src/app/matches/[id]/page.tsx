"use client";

import { AlertCircle } from "lucide-react";
import { use } from "react";

import { MatchDetailHeader } from "@/components/match-detail/match-detail-header";
import { TabH2H } from "@/components/match-detail/tab-h2h";
import { TabOdds } from "@/components/match-detail/tab-odds";
import { TabOverview } from "@/components/match-detail/tab-overview";
import { TabStatistics } from "@/components/match-detail/tab-statistics";
import { EmptyState } from "@/components/shared/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMatch } from "@/lib/hooks/use-match";
import { useMatchAggregates } from "@/lib/hooks/use-match-aggregates";

export default function MatchDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data: match, isLoading, isError } = useMatch(id);
  const { data: aggregates } = useMatchAggregates(id);

  if (isLoading) {
    return <MatchDetailSkeleton />;
  }

  if (isError || !match) {
    return (
      <EmptyState
        icon={AlertCircle}
        title="Match not found"
        description="The match you're looking for doesn't exist or couldn't be loaded."
      />
    );
  }

  return (
    <div className="space-y-6">
      <MatchDetailHeader match={match} />

      <Tabs defaultValue="overview">
        <TabsList className="w-full justify-start bg-card/50 border border-border/50 rounded-xl p-1">
          <TabsTrigger value="overview" className="rounded-lg">
            Overview
          </TabsTrigger>
          <TabsTrigger value="statistics" className="rounded-lg">
            Statistics
          </TabsTrigger>
          <TabsTrigger value="odds" className="rounded-lg">
            Odds
          </TabsTrigger>
          <TabsTrigger value="h2h" className="rounded-lg">
            H2H
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4">
          <TabOverview
            match={match}
            referee={aggregates?.referee ?? null}
          />
        </TabsContent>

        <TabsContent value="statistics" className="mt-4">
          <TabStatistics statistics={match.statistics} />
        </TabsContent>

        <TabsContent value="odds" className="mt-4">
          <TabOdds odds={match.odds ?? []} />
        </TabsContent>

        <TabsContent value="h2h" className="mt-4">
          <TabH2H h2h={aggregates?.h2h ?? null} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function MatchDetailSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-64 w-full rounded-xl" />
      <Skeleton className="h-12 w-full rounded-xl" />
      <div className="grid gap-6 md:grid-cols-2">
        <Skeleton className="h-48 rounded-xl" />
        <Skeleton className="h-48 rounded-xl" />
      </div>
    </div>
  );
}
