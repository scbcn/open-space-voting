"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccess } from "@/lib/context/access-context";
import { OpenSpaceEvent } from "@/lib/types";
import { EventCard } from "@/components/admin/event-card";

export function DashboardClient({ initialEvents }: { initialEvents: OpenSpaceEvent[] }) {
  const router = useRouter();
  const { access } = useAccess();
  const [events, setEvents] = useState(initialEvents);

  const handleDeleteEvent = (eventCode: string) => {
    setEvents(events.filter(event => event.code !== eventCode));
  };

  useEffect(() => {
    if (!access?.isAdmin) {
      router.replace("/admin/login");
    }
  }, [access, router]);

  if (!access?.isAdmin) return null;

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <EventCard 
          key={event.code} 
          event={event}
          onDelete={handleDeleteEvent}
        />
      ))}
    </div>
  );
} 