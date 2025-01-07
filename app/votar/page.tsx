"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ThemeCard } from "@/components/themes/theme-card";
import { Theme } from "@/lib/types";
import { useAccess } from "@/lib/context/access-context";
import { useState } from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function VotePage() {
  const router = useRouter();
  const { access } = useAccess();
  
  // Mock data - In a real app, this would come from your backend
  const [allowVoting, setAllowVoting] = useState(true);
  
  useEffect(() => {
    if (!access) {
      router.push("/");
    }
  }, [access, router]);

  // Mock themes data - In a real app, this would come from your backend
  const [themes, setThemes] = useState<Theme[]>([
    {
      id: "1",
      title: "GraphQL vs REST en 2024",
      description: "Comparación de arquitecturas y casos de uso",
      author: "María García",
      tags: ["API", "Backend", "Arquitectura"],
      votes: 5,
      votedBy: ["user2", "user3"]
    },
    {
      id: "2",
      title: "Micro-frontends en la práctica",
      description: "Experiencias reales implementando arquitecturas distribuidas",
      author: "Carlos Ruiz",
      tags: ["Frontend", "Arquitectura", "Escalabilidad"],
      votes: 3,
      votedBy: ["user1"]
    }
  ]);

  const handleVote = async (themeId: string, remove?: boolean) => {
    if (!allowVoting || !access?.username) return;

    setThemes(prev => prev.map(theme => {
      if (theme.id === themeId) {
        if (remove) {
          return {
            ...theme,
            votes: theme.votes - 1,
            votedBy: theme.votedBy.filter(user => user !== access.username)
          };
        } else {
          return {
            ...theme,
            votes: theme.votes + 1,
            votedBy: [...theme.votedBy, access.username]
          };
        }
      }
      return theme;
    }));
  };

  if (!access) {
    return null;
  }

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Votar Temas</h1>

        {!allowVoting && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Votaciones Cerradas</AlertTitle>
            <AlertDescription>
              La votación de temas está temporalmente cerrada por el administrador.
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-6">
          {themes.map((theme) => (
            <ThemeCard
              key={theme.id}
              theme={theme}
              onVote={handleVote}
              hasVoted={theme.votedBy.includes(access.username)}
              allowVoting={allowVoting}
            />
          ))}
        </div>
      </div>
    </main>
  );
}