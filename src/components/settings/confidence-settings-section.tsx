"use client";

import { useMemo } from "react";
import { Target } from "lucide-react";

import { NumberInput } from "@/components/ui/number-input";
import { useSectionDraft } from "@/lib/hooks/use-section-draft";
import type { ConfidenceSettings } from "@/types/settings";

import { SectionWrapper } from "./section-wrapper";
import { SettingsField } from "./settings-field";

interface ConfidenceSettingsSectionProps {
  settings: ConfidenceSettings;
}

export function ConfidenceSettingsSection({
  settings,
}: ConfidenceSettingsSectionProps) {
  const { draft, setDraft, ...sectionProps } = useSectionDraft(
    "confidence",
    settings,
  );

  const updateField = (field: keyof ConfidenceSettings, value: number) => {
    setDraft((prev) => ({ ...prev, [field]: value }));
  };

  const exampleScore = useMemo(() => {
    let c = draft.baseConfidence;
    c += Math.min(5 / 10, 1) * draft.sampleSizeWeight;
    c += draft.coachContinuityBonus;
    c += draft.oddsBonus;
    c += draft.lineupsBonus;
    return Math.max(0.1, Math.min(0.99, Math.round(c * 100) / 100));
  }, [draft]);

  return (
    <SectionWrapper
      icon={Target}
      title="Confidence Formula"
      description="Adjust how prediction confidence scores are calculated. Each factor adds to the base confidence."
      {...sectionProps}
    >
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <SettingsField
            id="baseConfidence"
            label="Base Confidence"
            description="Starting point for every prediction"
          >
            <NumberInput
              id="baseConfidence"
              value={draft.baseConfidence}
              onChange={(v) => updateField("baseConfidence", v)}
              step={0.05}
              min={0}
              max={1}
            />
          </SettingsField>

          <SettingsField
            id="sampleSizeWeight"
            label="Sample Size Weight"
            description="Bonus scaled by avg sample size (0-10 matches)"
          >
            <NumberInput
              id="sampleSizeWeight"
              value={draft.sampleSizeWeight}
              onChange={(v) => updateField("sampleSizeWeight", v)}
              step={0.05}
              min={0}
              max={1}
            />
          </SettingsField>

          <SettingsField
            id="coachContinuityBonus"
            label="Coach Continuity Bonus"
            description="Added when both teams have same coach as H2H"
          >
            <NumberInput
              id="coachContinuityBonus"
              value={draft.coachContinuityBonus}
              onChange={(v) => updateField("coachContinuityBonus", v)}
              step={0.05}
              min={0}
              max={1}
            />
          </SettingsField>

          <SettingsField
            id="squadChangesThreshold"
            label="Squad Changes Threshold"
            description="Max total squad changes (both teams) to get bonus"
          >
            <NumberInput
              id="squadChangesThreshold"
              value={draft.squadChangesThreshold}
              onChange={(v) => updateField("squadChangesThreshold", v)}
              min={0}
              max={22}
            />
          </SettingsField>

          <SettingsField
            id="squadChangesBonus"
            label="Squad Changes Bonus"
            description="Added when squad changes are below threshold"
          >
            <NumberInput
              id="squadChangesBonus"
              value={draft.squadChangesBonus}
              onChange={(v) => updateField("squadChangesBonus", v)}
              step={0.01}
              min={0}
              max={1}
            />
          </SettingsField>

          <SettingsField
            id="oddsBonus"
            label="Odds Available Bonus"
            description="Added when bookmaker odds data exists"
          >
            <NumberInput
              id="oddsBonus"
              value={draft.oddsBonus}
              onChange={(v) => updateField("oddsBonus", v)}
              step={0.05}
              min={0}
              max={1}
            />
          </SettingsField>

          <SettingsField
            id="lineupsBonus"
            label="Lineups Confirmed Bonus"
            description="Added when starting lineups are confirmed"
          >
            <NumberInput
              id="lineupsBonus"
              value={draft.lineupsBonus}
              onChange={(v) => updateField("lineupsBonus", v)}
              step={0.01}
              min={0}
              max={1}
            />
          </SettingsField>
        </div>

        <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4">
          <p className="text-sm font-medium text-emerald-500 mb-1">
            Example Calculation
          </p>
          <p className="text-xs text-muted-foreground">
            Match with 5 marker samples, same coaches, odds available, lineups
            confirmed:
          </p>
          <p className="text-sm font-mono mt-1">
            {draft.baseConfidence} + (0.5 x {draft.sampleSizeWeight}) +{" "}
            {draft.coachContinuityBonus} + {draft.oddsBonus} +{" "}
            {draft.lineupsBonus} ={" "}
            <span className="text-emerald-500 font-bold">{exampleScore}</span>
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
