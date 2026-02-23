import { CleanupSection } from "@/components/admin/cleanup-section";
import { LeagueManagement } from "@/components/admin/league-management";
import { ResetSection } from "@/components/admin/reset-section";
import { SyncSection } from "@/components/admin/sync-section";
import { Separator } from "@/components/ui/separator";

export default function AdminPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Admin</h1>
        <p className="text-sm text-muted-foreground">
          Platform administration and data management.
        </p>
      </div>

      <LeagueManagement />
      <Separator className="opacity-50" />
      <SyncSection />
      <Separator className="opacity-50" />
      <CleanupSection />
      <Separator className="opacity-50" />
      <ResetSection />
    </div>
  );
}
