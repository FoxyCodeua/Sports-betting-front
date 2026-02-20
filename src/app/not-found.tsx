import { ArrowLeft, Search } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="mx-4 flex max-w-md flex-col items-center gap-4 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted">
          <Search className="h-7 w-7 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-semibold">Page not found</h2>
        <p className="text-sm text-muted-foreground">
          The page you are looking for does not exist or has been moved.
        </p>
        <Button asChild variant="outline" className="gap-2">
          <Link href="/matches">
            <ArrowLeft className="h-4 w-4" />
            Back to matches
          </Link>
        </Button>
      </div>
    </div>
  );
}
