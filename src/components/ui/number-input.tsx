"use client";

import { useEffect, useRef, useState } from "react";

import { Input } from "@/components/ui/input";

interface NumberInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  id?: string;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
}

export function NumberInput({
  value,
  onChange,
  min,
  max,
  step,
  id,
  className,
  placeholder,
  disabled,
}: NumberInputProps) {
  const [raw, setRaw] = useState(String(value));
  const skipSync = useRef(false);

  useEffect(() => {
    if (skipSync.current) {
      skipSync.current = false;
      return;
    }
    setRaw(String(value));
  }, [value]);

  const commit = (input: string) => {
    const trimmed = input.trim();
    if (trimmed === "" || trimmed === "-") {
      setRaw(String(value));
      return;
    }

    let num = Number(trimmed);
    if (isNaN(num)) {
      setRaw(String(value));
      return;
    }

    if (min != null && num < min) num = min;
    if (max != null && num > max) num = max;

    skipSync.current = true;
    setRaw(String(num));
    onChange(num);
  };

  return (
    <Input
      id={id}
      type="text"
      inputMode="decimal"
      value={raw}
      onChange={(e) => setRaw(e.target.value)}
      onBlur={() => commit(raw)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          commit(raw);
        }
      }}
      min={min}
      max={max}
      step={step}
      className={className}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
}
