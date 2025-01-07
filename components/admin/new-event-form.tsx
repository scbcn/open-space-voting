"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function NewEventForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    spaceId: "",
    name: "",
    description: "",
    date: "",
    location: "",
    maxParticipants: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, save to backend
    router.push("/admin/dashboard");
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="spaceId">ID Open Space</Label>
          <Input
            id="spaceId"
            placeholder="Ej: os-2024"
            value={formData.spaceId}
            onChange={handleChange}
            required
          />
          <p className="text-sm text-muted-foreground">
            Este ID será usado por los participantes para acceder al evento
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Nombre del Evento</Label>
          <Input
            id="name"
            placeholder="Ej: Tech Innovation Summit 2024"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Descripción</Label>
          <Textarea
            id="description"
            placeholder="Describe el propósito y objetivos del evento..."
            className="min-h-[100px]"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="date">Fecha</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Ubicación</Label>
            <Input
              id="location"
              placeholder="Ej: Madrid"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="maxParticipants">Número Máximo de Participantes</Label>
          <Input
            id="maxParticipants"
            type="number"
            min="1"
            placeholder="100"
            value={formData.maxParticipants}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex gap-4 justify-end">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancelar
          </Button>
          <Button type="submit">
            Crear Evento
          </Button>
        </div>
      </form>
    </Card>
  );
}