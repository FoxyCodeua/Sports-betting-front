"use client";

import { useCallback } from "react";
import { BrainCircuit } from "lucide-react";

import { Input } from "@/components/ui/input";
import { NumberInput } from "@/components/ui/number-input";
import { Textarea } from "@/components/ui/textarea";
import { useSectionDraft } from "@/lib/hooks/use-section-draft";
import type { AiSettings, MetricDefinition } from "@/types/settings";

import { MetricDefinitionsEditor } from "./metric-definitions-editor";
import { SectionWrapper } from "./section-wrapper";
import { SettingsField } from "./settings-field";

interface AiSettingsSectionProps {
  settings: AiSettings;
}

export function AiSettingsSection({ settings }: AiSettingsSectionProps) {
  const { draft, setDraft, ...sectionProps } = useSectionDraft("ai", settings);

  const handleMetricsChange = useCallback(
    (metrics: MetricDefinition[]) => {
      setDraft((prev) => ({ ...prev, metricDefinitions: metrics }));
    },
    [setDraft],
  );

  return (
    <SectionWrapper
      icon={BrainCircuit}
      title="AI Model"
      description="Configure the AI model parameters and system prompt that drives prediction generation."
      {...sectionProps}
    >
      <div className="space-y-4">
        <SettingsField
          id="systemPrompt"
          label="System Prompt"
          description={`${draft.systemPrompt.length} characters`}
        >
          <Textarea
            id="systemPrompt"
            value={draft.systemPrompt}
            onChange={(e) =>
              setDraft((prev) => ({ ...prev, systemPrompt: e.target.value }))
            }
            className="min-h-[300px] font-mono text-xs"
            placeholder="Enter system prompt..."
          />
        </SettingsField>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <SettingsField id="model" label="Model">
            <Input
              id="model"
              value={draft.model}
              onChange={(e) =>
                setDraft((prev) => ({ ...prev, model: e.target.value }))
              }
              placeholder="deepseek-chat"
            />
          </SettingsField>

          <SettingsField
            id="temperature"
            label="Temperature"
            description="0 = deterministic, 2 = creative"
          >
            <NumberInput
              id="temperature"
              value={draft.temperature}
              onChange={(v) =>
                setDraft((prev) => ({ ...prev, temperature: v }))
              }
              step={0.1}
              min={0}
              max={2}
            />
          </SettingsField>

          <SettingsField id="maxTokens" label="Max Tokens">
            <NumberInput
              id="maxTokens"
              value={draft.maxTokens}
              onChange={(v) =>
                setDraft((prev) => ({ ...prev, maxTokens: v }))
              }
              min={256}
              max={16384}
            />
          </SettingsField>

          <SettingsField
            id="timeout"
            label="Timeout (ms)"
            description={`${(draft.timeout / 1000).toFixed(0)}s`}
          >
            <NumberInput
              id="timeout"
              value={draft.timeout}
              onChange={(v) => setDraft((prev) => ({ ...prev, timeout: v }))}
              min={10000}
              max={600000}
              step={1000}
            />
          </SettingsField>

          <SettingsField id="retries" label="Retries">
            <NumberInput
              id="retries"
              value={draft.retries}
              onChange={(v) => setDraft((prev) => ({ ...prev, retries: v }))}
              min={1}
              max={10}
            />
          </SettingsField>
        </div>

        <MetricDefinitionsEditor
          metrics={draft.metricDefinitions}
          onChange={handleMetricsChange}
        />
      </div>
    </SectionWrapper>
  );
}
