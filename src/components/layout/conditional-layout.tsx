"use client";

import { usePathname } from "next/navigation";
import { type ReactNode } from "react";

import { AppShell } from "./app-shell";
import { AuthGuard } from "./auth-guard";

export function ConditionalLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/login") {
    return <>{children}</>;
  }

  return (
    <AuthGuard>
      <AppShell>{children}</AppShell>
    </AuthGuard>
  );
}
