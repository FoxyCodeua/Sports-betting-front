"use client";

import {
  CalendarDays,
  Trophy,
  BrainCircuit,
  Settings,
  SlidersHorizontal,
  X,
  Activity,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/matches", label: "Matches", icon: CalendarDays },
  { href: "/leagues", label: "Leagues", icon: Trophy },
  { href: "/predictions", label: "Predictions", icon: BrainCircuit },
  { href: "/admin", label: "Admin", icon: Settings },
  { href: "/settings", label: "Settings", icon: SlidersHorizontal },
];

interface SidebarProps {
  desktopOpen: boolean;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export function Sidebar({
  desktopOpen,
  mobileOpen,
  onMobileClose,
}: SidebarProps) {
  const pathname = usePathname();

  const navContent = (onNavClick?: () => void) => (
    <>
      <div className="flex h-16 items-center gap-2 border-b border-border/50 px-6">
        <Link href="/" className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-emerald-500" />
          <span className="text-lg font-bold tracking-tight">BetAnalytics</span>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {NAV_ITEMS.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavClick}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all",
                isActive
                  ? "bg-emerald-500/10 text-emerald-500"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border/50 p-4">
        <p className="text-xs text-muted-foreground">AI Football Analyst</p>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border/50 bg-card/80 backdrop-blur-xl transition-transform duration-300 lg:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="absolute right-3 top-4 z-10">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={onMobileClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        {navContent(onMobileClose)}
      </aside>

      {/* Desktop sidebar */}
      <aside
        className={cn(
          "hidden lg:flex shrink-0 flex-col border-r border-border/50 bg-card/80 backdrop-blur-xl transition-[width] duration-300 overflow-hidden",
          desktopOpen ? "w-64" : "w-0 border-r-0",
        )}
      >
        <div className="w-64 min-w-64 flex flex-col h-full">
          {navContent()}
        </div>
      </aside>
    </>
  );
}
