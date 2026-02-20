"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface AnalysisSectionProps {
  title: string;
  content: string;
  defaultOpen?: boolean;
}

export function AnalysisSection({
  title,
  content,
  defaultOpen = false,
}: AnalysisSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="glass-card overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-accent/30"
      >
        <h3 className="text-sm font-semibold">{title}</h3>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-muted-foreground transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="border-t border-border/50 px-4 py-3">
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
                {content}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
