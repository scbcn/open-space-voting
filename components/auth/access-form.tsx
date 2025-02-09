"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { OpenSpaceAccess } from "@/lib/types";
import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { SocialLogin } from "./social-login";
import { getEventByCode } from "@/app/actions/events";
import { useSession, signOut } from "next-auth/react";

interface AccessFormProps {
  onAccess: (data: OpenSpaceAccess) => void;
}

export function AccessForm({ onAccess }: AccessFormProps) {
  const { data: session } = useSession();
  const [spaceId, setSpaceId] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (session) {
      setUsername(session.user?.name || "");
    }
  }, [session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");


    if (!spaceId.trim() || !username.trim()) {
      setError("Por favor, completa todos los campos");
      return;
    }

    const event = await getEventByCode(spaceId);

    if (spaceId === event?.code && event.status === 'published') {
      
      onAccess({ spaceId, username });
    } else {
      setError('Para acceder usa el ID de event proporcionado por el organizador');
    }
  };

  return (
    <Card className="w-full max-w-md p-6">
      <div className="text-center mb-6">
        <h2 className="text-lg font-semibold">Acceder al Open Space</h2>
        
      </div>

      <div className="space-y-6">
        <div className="relative">
          {username && (
            <>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
               Accediendo como <span className="font-bold text-primary">{username}</span>
              </p>
            </div>
            <div className="text-center p-6">
              <Button variant="outline" onClick={() => signOut()}>🔄 Entrar con otra cuenta</Button>
              </div>
            </>
          )}


          {!username && (
            <>
              <p className="text-sm text-muted-foreground mt-1">
                Ingresa con tu cuenta de Google o Github
              </p>
              <SocialLogin spaceId={spaceId} />
            </>
          )}

        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            
          </div>
        </div>
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
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            
          </div>

          <Button type="submit" className="w-full">
          🚀 Acceder al Open Space
          </Button>
        </form>
        {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
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