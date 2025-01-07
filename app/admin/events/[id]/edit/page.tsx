import { getEvent, getEventIds } from "@/lib/data/events";
import { EventForm } from "@/components/admin/event-form";

export async function generateStaticParams() {
  return await getEventIds();
}

export default async function EditEventPage({ params }: { params: { id: string } }) {
  const event = await getEvent(params.id);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Evento no encontrado</h1>
          <p className="text-muted-foreground">El evento que buscas no existe o ha sido eliminado.</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen p-8 bg-background">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Editar Open Space</h1>
        <EventForm initialEvent={event} mode="edit" />
      </div>
    </main>
  );
}