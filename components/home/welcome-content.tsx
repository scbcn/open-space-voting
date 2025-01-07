"use client";

import { Button } from "@/components/ui/button";
import { Calendar, MessageSquare, ThumbsUp } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAccess } from "@/lib/context/access-context";
import { OpenSpaceEvent } from "@/lib/types";
import { getCurrentEvent } from "@/lib/data/current-event";

export function WelcomeContent() {
  const { access } = useAccess();
  const [event, setEvent] = useState<OpenSpaceEvent | null>(null);

  useEffect(() => {
    if (access?.spaceId) {
      getCurrentEvent(access.spaceId).then(setEvent);
    }
  }, [access?.spaceId]);

  if (!event) {
    return null;
  }

  return (
    <>
      <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent px-4 text-center">
        {event.name}
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto px-4 text-center">
        {event.description}
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
        <Link href="/proponer" className="w-full sm:w-auto">
          <Button size="lg" className="w-full sm:w-auto gap-2">
            <MessageSquare className="w-4 h-4" />
            Proponer Tema
          </Button>
        </Link>
        <Link href="/votar" className="w-full sm:w-auto">
          <Button size="lg" variant="secondary" className="w-full sm:w-auto gap-2">
            <ThumbsUp className="w-4 h-4" />
            Votar Temas
          </Button>
        </Link>
        <Link href="/agenda" className="w-full sm:w-auto">
          <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2">
            <Calendar className="w-4 h-4" />
            Ver Agenda
          </Button>
        </Link>
      </div>
    </>
  );
}