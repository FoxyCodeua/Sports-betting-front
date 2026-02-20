import { Skeleton } from "@/components/ui/skeleton";

export default function MatchDetailLoading() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-64 w-full rounded-xl" />
      <Skeleton className="h-12 w-full rounded-xl" />
      <div className="grid gap-6 md:grid-cols-2">
        <Skeleton className="h-48 rounded-xl" />
        <Skeleton className="h-48 rounded-xl" />
      </div>
    </div>
  );
}
