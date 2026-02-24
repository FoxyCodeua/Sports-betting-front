"use client";

import { BarChart3 } from "lucide-react";

import { NumberInput } from "@/components/ui/number-input";
import { useSectionDraft } from "@/lib/hooks/use-section-draft";
import type { AggregationSettings } from "@/types/settings";

import { SectionWrapper } from "./section-wrapper";
import { SettingsField } from "./settings-field";

interface AnalyticsSettingsSectionProps {
  settings: AggregationSettings;
}

export function AnalyticsSettingsSection({
  settings,
}: AnalyticsSettingsSectionProps) {
  const { draft, setDraft, ...sectionProps } = useSectionDraft(
    "aggregation",
    settings,
  );

  const updateField = (field: keyof AggregationSettings, value: number) => {
    setDraft((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <SectionWrapper
      icon={BarChart3}
      title="Analytics Engine"
      description="Configure how marker matches and H2H data are selected for statistical aggregation."
      {...sectionProps}
    >
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium mb-3">Marker Matches</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <SettingsField
              id="markerWindowMonths"
              label="Window (months)"
              description="Standard search window for marker matches"
            >
              <NumberInput
                id="markerWindowMonths"
                value={draft.markerWindowMonths}
                onChange={(v) => updateField("markerWindowMonths", v)}
                min={1}
                max={36}
              />
            </SettingsField>

            <SettingsField
              id="markerExtendedWindowMonths"
              label="Extended Window (months)"
              description="Fallback window when standard has too few matches"
            >
              <NumberInput
                id="markerExtendedWindowMonths"
                value={draft.markerExtendedWindowMonths}
                onChange={(v) => updateField("markerExtendedWindowMonths", v)}
                min={1}
                max={60}
              />
            </SettingsField>

            <SettingsField
              id="markerMinSample"
              label="Min Sample Size"
              description="Minimum matches required before relaxing filters"
            >
              <NumberInput
                id="markerMinSample"
                value={draft.markerMinSample}
                onChange={(v) => updateField("markerMinSample", v)}
                min={1}
                max={20}
              />
            </SettingsField>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-3">Head-to-Head</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <SettingsField id="h2hWindowMonths" label="Window (months)">
              <NumberInput
                id="h2hWindowMonths"
                value={draft.h2hWindowMonths}
                onChange={(v) => updateField("h2hWindowMonths", v)}
                min={1}
                max={36}
              />
            </SettingsField>

            <SettingsField
              id="h2hExtendedMonths"
              label="Extended Window (months)"
            >
              <NumberInput
                id="h2hExtendedMonths"
                value={draft.h2hExtendedMonths}
                onChange={(v) => updateField("h2hExtendedMonths", v)}
                min={1}
                max={60}
              />
            </SettingsField>

            <SettingsField
              id="minH2hMatches"
              label="Min H2H Matches"
              description="Below this, window is extended automatically"
            >
              <NumberInput
                id="minH2hMatches"
                value={draft.minH2hMatches}
                onChange={(v) => updateField("minH2hMatches", v)}
                min={1}
                max={10}
              />
            </SettingsField>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-3">Odds Matching</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <SettingsField
              id="oddsTolerance"
              label="Odds Tolerance"
              description="Max difference when matching historical odds to current"
            >
              <NumberInput
                id="oddsTolerance"
                value={draft.oddsTolerance}
                onChange={(v) => updateField("oddsTolerance", v)}
                step={0.05}
                min={0}
                max={2}
              />
            </SettingsField>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
