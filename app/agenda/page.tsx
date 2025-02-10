"use client";

import { useEffect, useState } from "react";
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
import { getStoredEvent } from "@/lib/store/event-store";
import { OpenSpaceEvent } from "@/lib/types";
import { getThemesByEventCode } from "../actions/themes";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AgendaPage() {
  const [date, setDate] = useState<Date>(new Date());
  const [event, setEvent] = useState<OpenSpaceEvent | null>(null);
  const [sessions, setSessions] = useState([]); 
  const { data: session } =  useSession();
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      if (!session) {
        router.push("/");
        return;
      }

      const eventStored = await getStoredEvent();
      if (eventStored) {
        const themes = await getThemesByEventCode(eventStored.id);
        console.log("themes", themes);
      }
    };

    loadData();
  }, []);
  

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
          {/* <TimeSlot time="09:00 - 10:30">
            {sessions
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
          </TimeSlot> */}

          {/* <TimeSlot time="11:00 - 12:30">
            {sessions
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
          </TimeSlot> */}
        </div>
      </div>
    </main>
  );
}