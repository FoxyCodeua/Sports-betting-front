"use client";

import { differenceInSeconds } from "date-fns";
import { useEffect, useState } from "react";

export function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState(() =>
    getTimeLeft(targetDate),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 60_000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (!timeLeft) return <span className="text-muted-foreground">--</span>;

  return (
    <span className="text-sm font-mono text-muted-foreground">
      {timeLeft}
    </span>
  );
}

function getTimeLeft(dateStr: string): string | null {
  const diff = differenceInSeconds(new Date(dateStr), new Date());
  if (diff <= 0) return null;

  const days = Math.floor(diff / 86400);
  const hours = Math.floor((diff % 86400) / 3600);
  const minutes = Math.floor((diff % 3600) / 60);

  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}
