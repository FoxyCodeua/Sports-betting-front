"use client";

import { LogOut, Menu, PanelLeftClose, PanelLeftOpen } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/stores/auth-store";

import { ThemeToggle } from "./theme-toggle";

interface HeaderProps {
  desktopOpen: boolean;
  onDesktopToggle: () => void;
  onMobileOpen: () => void;
}

export function Header({ desktopOpen, onDesktopToggle, onMobileOpen }: HeaderProps) {
  const logout = useAuthStore((s) => s.logout);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border/50 bg-background/80 px-6 backdrop-blur-xl">
      {/* Mobile: burger menu */}
      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9 lg:hidden"
        onClick={onMobileOpen}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Desktop: sidebar toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="hidden h-9 w-9 lg:inline-flex"
        onClick={onDesktopToggle}
      >
        {desktopOpen ? (
          <PanelLeftClose className="h-5 w-5" />
        ) : (
          <PanelLeftOpen className="h-5 w-5" />
        )}
      </Button>

      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 text-muted-foreground hover:text-foreground"
          onClick={logout}
          title="Sign out"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}
