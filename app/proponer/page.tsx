"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { OpenSpaceEvent, Theme } from "@/lib/types";
import { useAccess } from "@/lib/context/access-context";
import { useState } from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getEventByCode } from "../actions/events";
import { createTheme } from "../actions/themes";
import { ITheme } from "@/models/Theme";
import { ObjectId } from "mongoose";

export default function ProposePage() {
  const router = useRouter();
  const { access } = useAccess();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [event, setEvent] = useState<OpenSpaceEvent | null>(null);
  
  useEffect(() => {
    if (access?.spaceId) {
      getEventByCode(access.spaceId).then((eventData) => {
        setEvent(eventData);
      });
    }
  }, [access?.spaceId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!event?.allowProposals) {
      return;
    }

    const newTheme = {
      title,
      description,
      author: access?.username || "Anonymous",
      tags: tags.split(",").map(tag => tag.trim()),
      votes: 0,
      votedBy: [],
      event: event?.id || ""
    };

    console.log(newTheme);

    createTheme(newTheme).then(() => {
      console.log("Theme created");
      router.push("/votar");
    });

    // Reset form
    setTitle("");
    setDescription("");
    setTags("");
  };

  if (!access || !event) {
    return null;
  }

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Proponer un Tema</h1>

        {!event.allowProposals && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Propuestas Cerradas</AlertTitle>
            <AlertDescription>
              La propuesta de temas está temporalmente cerrada por el administrador.
            </AlertDescription>
          </Alert>
        )}
        
        <Card className="p-6 mb-8">
          <div className="mb-6 grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Open Space ID</Label>
              <Input value={access.spaceId} disabled />
            </div>
            <div className="space-y-2">
              <Label>Usuario</Label>
              <Input value={access.username} disabled />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Título del Tema</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Escribe un título descriptivo"
                required
                disabled={!event.allowProposals}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe brevemente tu propuesta..."
                className="min-h-[150px]"
                required
                disabled={!event.allowProposals}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Etiquetas (separadas por comas)</Label>
              <Input
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="tecnología, innovación, desarrollo..."
                disabled={!event.allowProposals}
              />
            </div>

            <Button type="submit" className="w-full" disabled={!event.allowProposals}>
              Enviar Propuesta
            </Button>
          </form>
        </Card>
      </div>
    </main>
  );
}