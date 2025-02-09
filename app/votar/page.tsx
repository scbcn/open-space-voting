"use client";

import { useEffect } from "react";
import { redirect, useRouter } from "next/navigation";
import { ThemeCard } from "@/components/themes/theme-card";
import { OpenSpaceEvent, Theme } from "@/lib/types";
import { useAccess } from "@/lib/context/access-context";
import { useState } from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getThemesByEventCode, voteTheme } from "../actions/themes";
import { getEventByCode } from "../actions/events";
import { useSession } from "next-auth/react";

export default function VotePage() {
  const { access } = useAccess();
  const [event, setEvent] = useState<OpenSpaceEvent | null>(null);
  const [themes, setThemes] = useState<Theme[]>([]);
  const { data: session } = useSession();

  if (!session) {
    redirect("/error");
  }

  useEffect(() => {
    console.log("access", access);
    if (!access?.spaceId) return;

    const loadEventAndThemes = async () => {
      try {
        const eventData = await getEventByCode(access.spaceId);
        setEvent(eventData);
        
        if (eventData?.allowVoting) {
          const themesData = await getThemesByEventCode(access.spaceId);
          setThemes(themesData);
        }
      } catch (error) {
        console.error("Error loading event data:", error);
      }
    };

    loadEventAndThemes();
  }, [access?.spaceId]);

  const handleVote = async (themeId: string) => {
    if (!event?.allowVoting || !access?.username) return;
    
    try {
      const updatedTheme = await voteTheme(themeId, access.username);
      
      if (updatedTheme) {
        setThemes(prevThemes => 
          prevThemes.map(theme => 
            theme.id === themeId ? updatedTheme : theme
          )
        );
      }
    } catch (error) {
      console.error("Error al votar:", error);
    }
  };

  if (!access || !event) {
    return null;
  }

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Votar Temas</h1>

        {!event?.allowVoting && (
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
              hasVoted={theme.votedBy.includes(access?.username || "")}
              allowVoting={event?.allowVoting}
            />
          ))}
        </div>
      </div>
    </main>
  );
}