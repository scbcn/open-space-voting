"use client";

import { Card } from "@/components/ui/card";

interface TimeSlotProps {
  time: string;
  children: React.ReactNode;
}

export function TimeSlot({ time, children }: TimeSlotProps) {
  return (
    <div className="flex gap-4 mb-8">
      <div className="w-24 flex-shrink-0 pt-4">
        <span className="text-sm font-medium text-muted-foreground">{time}</span>
      </div>
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {children}
      </div>
    </div>
  );
}