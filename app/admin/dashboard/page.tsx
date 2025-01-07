"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useAccess } from "@/lib/context/access-context";
import { OpenSpaceEvent } from "@/lib/types";
import { EventCard } from "@/components/admin/event-card";
import Link from "next/link";

export default function AdminDashboardPage() {
  const router = useRouter();
  const { access } = useAccess();
  const [events, setEvents] = useState<OpenSpaceEvent[]>([
    {
      id: "os-1",
      name: "Tech Innovation Summit 2024",
      description: "Un espacio para compartir las últimas tendencias en tecnología",
      date: "2024-06-15",
      location: "Madrid",
      maxParticipants: 100,
      status: "published",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      allowProposals: false,
      allowVoting: false
    }
  ]);

  useEffect(() => {
    if (!access?.isAdmin) {
      router.push("/admin/login");
    }
  }, [access, router]);

  const handleDeleteEvent = (eventId: string) => {
    // In a real app, this would make an API call
    setEvents(events.filter(event => event.id !== eventId));
  };

  if (!access?.isAdmin) {
    return null;
  }

  return (
    <main className="min-h-screen p-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Gestión de Open Spaces</h1>
          <Link href="/admin/events/new">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Crear Nuevo Evento
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard 
              key={event.id} 
              event={event} 
              onDelete={handleDeleteEvent}
            />
          ))}
        </div>
      </div>
    </main>
  );
}