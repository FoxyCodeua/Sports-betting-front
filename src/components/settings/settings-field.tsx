import { Label } from "@/components/ui/label";

interface SettingsFieldProps {
  id: string;
  label: string;
  description?: string;
  children: React.ReactNode;
}

export function SettingsField({
  id,
  label,
  description,
  children,
}: SettingsFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
