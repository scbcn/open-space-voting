"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useAccess } from "@/lib/context/access-context";
import { OpenSpaceEvent } from "@/lib/types";
import { EventCard } from "@/components/admin/event-card";
import Link from "next/link";
import { getEvents } from "@/app/actions/events";

export default function AdminDashboardPage() {
  const router = useRouter();
  const { access } = useAccess();
  const [events, setEvents] = useState<OpenSpaceEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!access?.isAdmin) {
      router.push("/admin/login");
      return;
    }

    const fetchEvents = async () => {
      setLoading(true);
      try {
        const eventsList = await getEvents();
        console.log(eventsList);
        setEvents(eventsList);
      } catch (error) {
        console.error("Error al cargar eventos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [access, router]);

  const handleDeleteEvent = (eventCode: string) => {
    // In a real app, this would make an API call
    setEvents(events.filter(event => event.code !== eventCode));
  };

  if (!access?.isAdmin) {
    return null;
  }

  if (loading) {
    return <div className="min-h-screen p-8 bg-background">Cargando...</div>;
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
              key={event.code} 
              event={event} 
              onDelete={handleDeleteEvent}
            />
          ))}
        </div>
      </div>
    </main>
  );
}