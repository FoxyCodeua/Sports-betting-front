import {
  format,
  formatDistanceToNow,
  isPast,
  differenceInSeconds,
} from "date-fns";

export function formatMatchDate(dateStr: string | null): string {
  if (!dateStr) return "TBD";
  return format(new Date(dateStr), "dd MMM yyyy");
}

export function formatMatchTime(dateStr: string | null): string {
  if (!dateStr) return "TBD";
  return format(new Date(dateStr), "HH:mm");
}

export function formatMatchDateTime(dateStr: string | null): string {
  if (!dateStr) return "TBD";
  return format(new Date(dateStr), "dd MMM yyyy, HH:mm");
}

export function getCountdown(dateStr: string | null): string | null {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  if (isPast(date)) return null;
  return formatDistanceToNow(date, { addSuffix: true });
}

export function isMatchStartingSoon(dateStr: string | null): boolean {
  if (!dateStr) return false;
  const date = new Date(dateStr);
  const diff = differenceInSeconds(date, new Date());
  return diff > 0 && diff < 3600;
}

export function formatWindowRange(from: string, to: string): string {
  return `${format(new Date(from), "dd MMM yyyy")} - ${format(new Date(to), "dd MMM yyyy")}`;
}
