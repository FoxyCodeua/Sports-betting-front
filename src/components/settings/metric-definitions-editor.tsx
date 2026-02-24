import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import type { MetricDefinition } from "@/types/settings";

interface MetricDefinitionsEditorProps {
  metrics: MetricDefinition[];
  onChange: (metrics: MetricDefinition[]) => void;
}

export function MetricDefinitionsEditor({
  metrics,
  onChange,
}: MetricDefinitionsEditorProps) {
  const handleToggle = (index: number, enabled: boolean) => {
    const updated = metrics.map((m, i) =>
      i === index ? { ...m, enabled } : m,
    );
    onChange(updated);
  };

  const enabledCount = metrics.filter((m) => m.enabled).length;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">
          Metric Definitions
        </Label>
        <span className="text-xs text-muted-foreground">
          {enabledCount}/{metrics.length} enabled
        </span>
      </div>
      <p className="text-xs text-muted-foreground">
        Toggle which metrics are included in the AI prompt. Disabled metrics
        won&apos;t be sent to the model for analysis.
      </p>
      <div className="grid gap-2 sm:grid-cols-2">
        {metrics.map((metric, index) => (
          <div
            key={metric.prefix}
            className="flex items-center justify-between rounded-lg border border-border/50 px-3 py-2"
          >
            <div className="flex flex-col">
              <span className="text-sm">{metric.label}</span>
              <span className="text-xs text-muted-foreground">
                {metric.prefix}
                {metric.hasTotal ? " (with total)" : " (no total)"}
              </span>
            </div>
            <Switch
              checked={metric.enabled}
              onCheckedChange={(checked) => handleToggle(index, checked)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
