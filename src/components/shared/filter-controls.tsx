"use client";

import { format } from "date-fns";
import { ArrowDownUp, CalendarIcon, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLeagues } from "@/lib/hooks/use-leagues";
import type { FiltersState } from "@/lib/stores/filters-store";
import { cn } from "@/lib/utils";
import { MatchStatus } from "@/types/graphql";

interface SelectOption {
  value: string;
  label: string;
}

interface FilterControlsProps {
  useStore: () => FiltersState;
  statusOptions: SelectOption[];
  sortOptions: SelectOption[];
}

export function FilterControls({
  useStore,
  statusOptions,
  sortOptions,
}: FilterControlsProps) {
  const {
    dateFrom,
    dateTo,
    leagueId,
    status,
    sortBy,
    sortDirection,
    setDateFrom,
    setDateTo,
    setLeagueId,
    setStatus,
    setSortBy,
    setSortDirection,
    resetFilters,
  } = useStore();

  const { data: leagues } = useLeagues();

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-[200px] justify-start gap-2 text-left font-normal",
              !dateFrom && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="h-4 w-4" />
            {dateFrom
              ? format(new Date(dateFrom), "dd MMM yyyy")
              : "From date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={dateFrom ? new Date(dateFrom) : undefined}
            onSelect={(date) =>
              setDateFrom(date ? date.toISOString() : null)
            }
          />
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-[200px] justify-start gap-2 text-left font-normal",
              !dateTo && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="h-4 w-4" />
            {dateTo ? format(new Date(dateTo), "dd MMM yyyy") : "To date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={dateTo ? new Date(dateTo) : undefined}
            onSelect={(date) => setDateTo(date ? date.toISOString() : null)}
          />
        </PopoverContent>
      </Popover>

      <Select
        value={leagueId?.toString() ?? "ALL"}
        onValueChange={(val) =>
          setLeagueId(val === "ALL" ? null : Number(val))
        }
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="All Leagues" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">All Leagues</SelectItem>
          {leagues?.map((league) => (
            <SelectItem key={league.id} value={league.id}>
              {league.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={status ?? "ALL"}
        onValueChange={(val) =>
          setStatus(val === "ALL" ? null : (val as MatchStatus))
        }
      >
        <SelectTrigger className="w-[160px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {statusOptions.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={`${sortBy}:${sortDirection}`}
        onValueChange={(val) => {
          const [field, dir] = val.split(":");
          setSortBy(field);
          setSortDirection(dir as "ASC" | "DESC");
        }}
      >
        <SelectTrigger className="w-[160px]">
          <ArrowDownUp className="mr-2 h-4 w-4" />
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button
        variant="ghost"
        size="icon"
        onClick={resetFilters}
        className="h-9 w-9"
      >
        <RotateCcw className="h-4 w-4" />
      </Button>
    </div>
  );
}
