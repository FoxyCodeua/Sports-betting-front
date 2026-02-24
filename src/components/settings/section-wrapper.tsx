import { RotateCcw, Save, CheckCircle2, type LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface SectionWrapperProps {
  icon: LucideIcon;
  title: string;
  description: string;
  children: React.ReactNode;
  handleSave: () => void;
  handleReset: () => void;
  isSaving: boolean;
  isResetting: boolean;
  saveSuccess: boolean;
  hasChanges: boolean;
}

export function SectionWrapper({
  icon: Icon,
  title,
  description,
  children,
  handleSave,
  handleReset,
  isSaving,
  isResetting,
  saveSuccess,
  hasChanges,
}: SectionWrapperProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-emerald-500" />
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>

      <Card className="border-border/50 bg-card/50">
        <CardContent className="p-6 space-y-6">
          <p className="text-sm text-muted-foreground">{description}</p>

          {children}

          <div className="flex items-center gap-3 pt-2 border-t border-border/30">
            <Button
              variant="default"
              size="sm"
              onClick={handleSave}
              disabled={isSaving || !hasChanges}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              <Save className="mr-2 h-3.5 w-3.5" />
              {isSaving ? "Saving..." : "Save"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              disabled={isResetting}
            >
              <RotateCcw className="mr-2 h-3.5 w-3.5" />
              {isResetting ? "Resetting..." : "Reset to Default"}
            </Button>
            {saveSuccess && (
              <p className="flex items-center gap-1.5 text-xs text-emerald-500">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Saved successfully
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
