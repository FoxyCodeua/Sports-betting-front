"use client";

import { RotateCcw } from "lucide-react";

import { AiSettingsSection } from "@/components/settings/ai-settings-section";
import { AnalyticsSettingsSection } from "@/components/settings/analytics-settings-section";
import { ConfidenceSettingsSection } from "@/components/settings/confidence-settings-section";
import { TimingSettingsSection } from "@/components/settings/timing-settings-section";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSettings, useResetSettings } from "@/lib/hooks/use-settings";

export default function SettingsPage() {
  const { data: settings, isLoading, isError } = useSettings();
  const resetAll = useResetSettings();

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="mt-2 h-4 w-96" />
        </div>
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (isError || !settings) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-destructive">
          Failed to load settings. Check server connection.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-sm text-muted-foreground">
            Configure AI model, analytics engine, and prediction parameters.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => resetAll.mutate()}
          disabled={resetAll.isPending}
        >
          <RotateCcw className="mr-2 h-3.5 w-3.5" />
          {resetAll.isPending ? "Resetting..." : "Reset All"}
        </Button>
      </div>

      <Tabs defaultValue="ai" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="ai">AI Model</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="timing">Timing</TabsTrigger>
          <TabsTrigger value="confidence">Confidence</TabsTrigger>
        </TabsList>

        <TabsContent value="ai" className="mt-6">
          <AiSettingsSection settings={settings.ai} />
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <AnalyticsSettingsSection settings={settings.aggregation} />
        </TabsContent>

        <TabsContent value="timing" className="mt-6">
          <TimingSettingsSection settings={settings.prediction} />
        </TabsContent>

        <TabsContent value="confidence" className="mt-6">
          <ConfidenceSettingsSection settings={settings.confidence} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
