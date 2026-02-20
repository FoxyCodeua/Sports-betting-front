"use client";

import { useState, type ReactNode } from "react";

import { ErrorBoundary } from "@/components/shared/error-boundary";

import { Header } from "./header";
import { Sidebar } from "./sidebar";

export function AppShell({ children }: { children: ReactNode }) {
  const [desktopOpen, setDesktopOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        desktopOpen={desktopOpen}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header
          desktopOpen={desktopOpen}
          onDesktopToggle={() => setDesktopOpen((prev) => !prev)}
          onMobileOpen={() => setMobileOpen(true)}
        />
        <main className="flex-1 overflow-y-auto p-6">
          <ErrorBoundary>{children}</ErrorBoundary>
        </main>
      </div>
    </div>
  );
}
