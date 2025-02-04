import { OpenSpaceEvent } from "@/lib/types";
import { getEvents, getEventById } from "@/app/actions/events";

// Mock data - In a real app, this would come from your backend
// const mockEvents: OpenSpaceEvent[] = [
//   {
//     code: "os-1",
//     name: "Tech Innovation Summit 2024",
//     description: "Un espacio para compartir las últimas tendencias en tecnología",
//     date: "2024-06-15",
//     location: "Madrid",
//     maxParticipants: 100,
//     status: "published",
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//     allowProposals: true,
//     allowVoting: true
//   }
// ];

export async function getEvent(code: string): Promise<OpenSpaceEvent | null> {
  const events = await getEvents();
  const event = events.find(e => e.eventCode === code);
  if (!event) return null;
  
  return {
    code: event.eventCode,
    name: event.title,
    description: event.description,
    date: event.date.toISOString(),
    location: event.location,
    status: event.state,
    maxParticipants: event.maxParticipants || 100,
    createdAt: event.createdAt?.toISOString() || new Date().toISOString(),
    updatedAt: event.updatedAt?.toISOString() || new Date().toISOString(),
    allowProposals: event.proposalsEnabled,
    allowVoting: event.votingEnabled
  };
}

export async function getEventIds(): Promise<{ code: string }[]> {
  const events = await getEvents();
  return events.map(event => ({
    code: event.eventCode,
  }));
}

export async function getAllEvents(): Promise<OpenSpaceEvent[]> {
  const events = await getEvents();
  return events.map(event => ({
    code: event.eventCode,
    name: event.title,
    description: event.description,
    date: event.date.toISOString(),
    location: event.location,
    status: event.state,
    maxParticipants: event.maxParticipants || 100,
    createdAt: event.createdAt?.toISOString() || new Date().toISOString(),
    updatedAt: event.updatedAt?.toISOString() || new Date().toISOString(),
    allowProposals: event.proposalsEnabled,
    allowVoting: event.votingEnabled
  }));
}