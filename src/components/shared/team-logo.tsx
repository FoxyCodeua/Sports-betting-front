"use client";

import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

interface TeamLogoProps {
  src: string | null;
  name: string;
  size?: number;
  className?: string;
}

export function TeamLogo({ src, name, size = 32, className }: TeamLogoProps) {
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-full bg-muted text-xs font-bold text-muted-foreground",
          className,
        )}
        style={{ width: size, height: size }}
      >
        {name.charAt(0).toUpperCase()}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={name}
      width={size}
      height={size}
      className={cn("object-contain", className)}
      onError={() => setError(true)}
      unoptimized
    />
  );
}
