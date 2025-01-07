"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { OpenSpaceAccess } from "@/lib/types";
import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { SocialLogin } from "./social-login";
import { Separator } from "@/components/ui/separator";

interface AccessFormProps {
  onAccess: (data: OpenSpaceAccess) => void;
}

export function AccessForm({ onAccess }: AccessFormProps) {
  const [spaceId, setSpaceId] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!spaceId.trim() || !username.trim()) {
      setError("Por favor, completa todos los campos");
      return;
    }

    // Temporary validation - In production this would check against a backend
    if (spaceId === "demo") {
      onAccess({ spaceId, username });
    } else {
      setError('Para acceder usa el ID de evento: "demo"');
    }
  };

  return (
    <Card className="w-full max-w-md p-6">
      <div className="text-center mb-6">
        <h2 className="text-lg font-semibold">Acceder al Open Space</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Ingresa con tu cuenta o usa el acceso temporal
        </p>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="spaceId">Open Space ID</Label>
          <Input
            id="spaceId"
            type="text"
            value={spaceId}
            onChange={(e) => setSpaceId(e.target.value)}
            placeholder="Ingresa el ID del Open Space"
            required
          />
        </div>

        <SocialLogin spaceId={spaceId} />

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              O accede temporalmente
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Nombre de Usuario</Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder='Ingresa tu nombre de usuario'
              required
            />
            <p className="text-xs text-muted-foreground">
              Para acceso temporal, usa el ID de evento "demo"
            </p>
          </div>

          <Button type="submit" className="w-full">
            Acceder Temporalmente
          </Button>
        </form>

        <div className="text-center">
          <span className="text-sm text-muted-foreground">¿Eres administrador? </span>
          <Link href="/admin/login" className="text-sm text-primary hover:underline">
            Acceder al Backoffice
          </Link>
        </div>
      </div>
    </Card>
  );
}