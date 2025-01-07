import { mockSessions } from "@/lib/data/sessions";
import { SessionPageClient } from "./session-page-client";

// Generate static params for all known session IDs
export function generateStaticParams() {
  return Object.keys(mockSessions).map((id) => ({
    id,
  }));
}

export default function SessionPage({ params }: { params: { id: string } }) {
  const session = mockSessions[params.id];
  
  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Sesión no encontrada</h1>
          <p className="text-muted-foreground">La sesión que buscas no existe o ha sido eliminada.</p>
        </div>
      </div>
    );
  }

  return <SessionPageClient initialSession={session} />;
}