import React from "react";
import { cn } from "@/lib/utils";

interface TitleProps {
  className?: string;
  children: React.ReactNode;
}

export function Title({ className, children }: TitleProps) {
  return (
    <h1
      className={cn(
        "text-2xl font-bold tracking-tight text-foreground",
        className
      )}
    >
      {children}
    </h1>
  );
}