import { OpenSpaceEvent } from "@/lib/types";

// Mock data - In a real app, this would come from your backend
const mockEvents: OpenSpaceEvent[] = [
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
    allowProposals: true,
    allowVoting: true
  }
];

export async function getEvent(id: string): Promise<OpenSpaceEvent | null> {
  return mockEvents.find(e => e.id === id) || null;
}

export async function getEventIds(): Promise<{ id: string }[]> {
  return mockEvents.map(event => ({
    id: event.id,
  }));
}

export async function getAllEvents(): Promise<OpenSpaceEvent[]> {
  return [...mockEvents];
}