"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useAccess } from "@/lib/context/access-context";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function AdminLoginPage() {
  const router = useRouter();
  const { access, setAccess } = useAccess();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (access?.isAdmin) {
      router.push("/admin/dashboard");
    }
  }, [access, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // In a real app, validate credentials against a backend
    if (username === "admin" && password === "admin") {
      setAccess({ spaceId: "admin", username, isAdmin: true });
      router.push("/admin/dashboard");
    } else {
      setError("Credenciales inválidas. Intenta con usuario: admin, contraseña: admin");
    }
  };

  if (access?.isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-4">
        <Card className="p-6">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold">Acceso Administrador</h1>
            <p className="text-sm text-muted-foreground mt-2">
              Ingresa tus credenciales para acceder al panel de administración
            </p>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Usuario</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ingresa tu usuario"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu contraseña"
                required
              />
            </div>

            <Button type="submit" className="w-full">
              Iniciar Sesión
            </Button>
          </form>
        </Card>

        <p className="text-center text-sm text-muted-foreground">
          ¿No eres administrador?{" "}
          <Button variant="link" className="p-0" onClick={() => router.push("/")}>
            Volver al inicio
          </Button>
        </p>
      </div>
    </div>
  );
}