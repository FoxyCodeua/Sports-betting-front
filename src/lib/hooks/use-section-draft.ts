import { useCallback, useEffect, useState } from "react";

import { useUpdateSettings, useResetSettingsSection } from "@/lib/hooks/use-settings";
import type { SettingsSection } from "@/types/settings";

const SUCCESS_TIMEOUT = 3000;

interface SectionDraftResult<T> {
  draft: T;
  setDraft: React.Dispatch<React.SetStateAction<T>>;
  hasChanges: boolean;
  handleSave: () => void;
  handleReset: () => void;
  isSaving: boolean;
  isResetting: boolean;
  saveSuccess: boolean;
}

export function useSectionDraft<T>(
  sectionKey: SettingsSection,
  settings: T,
): SectionDraftResult<T> {
  const [draft, setDraft] = useState<T>(settings);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const updateSettings = useUpdateSettings();
  const resetSection = useResetSettingsSection();

  useEffect(() => {
    setDraft(settings);
  }, [settings]);

  useEffect(() => {
    if (!saveSuccess) return;
    const timer = setTimeout(() => setSaveSuccess(false), SUCCESS_TIMEOUT);
    return () => clearTimeout(timer);
  }, [saveSuccess]);

  const hasChanges = JSON.stringify(draft) !== JSON.stringify(settings);

  const handleSave = useCallback(() => {
    updateSettings.mutate(
      { [sectionKey]: draft },
      { onSuccess: () => setSaveSuccess(true) },
    );
  }, [draft, sectionKey, updateSettings]);

  const handleReset = useCallback(() => {
    resetSection.mutate(sectionKey);
  }, [sectionKey, resetSection]);

  return {
    draft,
    setDraft,
    hasChanges,
    handleSave,
    handleReset,
    isSaving: updateSettings.isPending,
    isResetting: resetSection.isPending,
    saveSuccess,
  };
}
