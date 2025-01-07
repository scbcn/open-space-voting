"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Users } from "lucide-react";
import Link from "next/link";
import { Session } from "@/lib/types";

interface SessionCardProps {
  session: Session;
  title: string;
  time: string;
  location: string;
  participantCount: number;
}

export function SessionCard({ session, title, time, location, participantCount }: SessionCardProps) {
  return (
    <Card className="p-4 hover:shadow-lg transition-shadow">
      <h3 className="font-semibold text-lg mb-3">{title}</h3>
      <div className="space-y-2 text-sm text-muted-foreground mb-4">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>{time}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4" />
          <span>{participantCount} participantes</span>
        </div>
      </div>
      <Link href={`/sesion/${session.id}`}>
        <Button className="w-full">Ver Detalles</Button>
      </Link>
    </Card>
  );
}