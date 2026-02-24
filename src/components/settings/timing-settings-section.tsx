"use client";

import { Clock } from "lucide-react";

import { NumberInput } from "@/components/ui/number-input";
import { useSectionDraft } from "@/lib/hooks/use-section-draft";
import type { PredictionSettings } from "@/types/settings";

import { SectionWrapper } from "./section-wrapper";
import { SettingsField } from "./settings-field";

interface TimingSettingsSectionProps {
  settings: PredictionSettings;
}

export function TimingSettingsSection({
  settings,
}: TimingSettingsSectionProps) {
  const { draft, setDraft, ...sectionProps } = useSectionDraft(
    "prediction",
    settings,
  );

  const updateField = (field: keyof PredictionSettings, value: number) => {
    setDraft((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <SectionWrapper
      icon={Clock}
      title="Prediction Timing"
      description="Configure when predictions are generated relative to match start time. Runs every 5 minutes via cron."
      {...sectionProps}
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <SettingsField
          id="draftWindowMin"
          label="Draft Window (min)"
          description={`Draft generated ${draft.draftWindowMin} min before match (${(draft.draftWindowMin / 60).toFixed(1)}h)`}
        >
          <NumberInput
            id="draftWindowMin"
            value={draft.draftWindowMin}
            onChange={(v) => updateField("draftWindowMin", v)}
            min={5}
            max={360}
          />
        </SettingsField>

        <SettingsField
          id="lineupRefreshWindowMin"
          label="Lineup Refresh (min)"
          description={`Re-generates with confirmed lineups ${draft.lineupRefreshWindowMin} min before`}
        >
          <NumberInput
            id="lineupRefreshWindowMin"
            value={draft.lineupRefreshWindowMin}
            onChange={(v) => updateField("lineupRefreshWindowMin", v)}
            min={5}
            max={180}
          />
        </SettingsField>

        <SettingsField
          id="autoPublishWindowMin"
          label="Auto-Publish (min)"
          description={`Publishes remaining drafts ${draft.autoPublishWindowMin} min before match`}
        >
          <NumberInput
            id="autoPublishWindowMin"
            value={draft.autoPublishWindowMin}
            onChange={(v) => updateField("autoPublishWindowMin", v)}
            min={1}
            max={60}
          />
        </SettingsField>
      </div>
    </SectionWrapper>
  );
}
