"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { SessionCard } from "@/components/agenda/session-card";
import { TimeSlot } from "@/components/agenda/time-slot";
import { Card } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export default function AgendaPage() {
  const [date, setDate] = useState<Date>(new Date());

  // Mock data - In a real app, this would come from your backend
  const mockSessions = [
    {
      id: "1",
      themeId: "theme1",
      title: "Introducción a Next.js 13",
      time: "09:00 - 10:30",
      location: "Sala A",
      participantCount: 15,
      participants: [],
      notes: "",
    },
    {
      id: "2",
      themeId: "theme2",
      title: "Clean Architecture en React",
      time: "09:00 - 10:30",
      location: "Sala B",
      participantCount: 12,
      participants: [],
      notes: "",
    },
    {
      id: "3",
      themeId: "theme3",
      title: "TypeScript Avanzado",
      time: "11:00 - 12:30",
      location: "Sala A",
      participantCount: 20,
      participants: [],
      notes: "",
    },
  ];

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Agenda del Evento</h1>
          
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="min-w-[240px] justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(date, "PPP", { locale: es })}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(date) => date && setDate(date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <Button variant="outline" size="icon">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <TimeSlot time="09:00 - 10:30">
            {mockSessions
              .filter(session => session.time === "09:00 - 10:30")
              .map(session => (
                <SessionCard
                  key={session.id}
                  session={session}
                  title={session.title}
                  time={session.time}
                  location={session.location}
                  participantCount={session.participantCount}
                />
              ))}
          </TimeSlot>

          <TimeSlot time="11:00 - 12:30">
            {mockSessions
              .filter(session => session.time === "11:00 - 12:30")
              .map(session => (
                <SessionCard
                  key={session.id}
                  session={session}
                  title={session.title}
                  time={session.time}
                  location={session.location}
                  participantCount={session.participantCount}
                />
              ))}
          </TimeSlot>
        </div>
      </div>
    </main>
  );
}