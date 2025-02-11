"use client";

import { useEffect } from "react";
import { ThemeCard } from "@/components/themes/theme-card";
import { useAccess } from "@/lib/context/access-context";
import { useState } from "react";
import { AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getThemesByEventCode, voteTheme } from "../actions/themes";
import { useSession } from "next-auth/react";
import { useEventStore } from "@/lib/store/event-store";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/auth-store";
import { Theme } from "@/lib/types";
export default function VotePage() {
  const router = useRouter();
  const [themes, setThemes] = useState<Theme[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();

  const event = useEventStore((state) => state.currentEvent);
  const user = useAuthStore((state) => state.user);
  const authenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {

    if (!authenticated) {
      router.push("/");
      return;
    }

    const loadEventAndThemes = async () => {
      try {
        setIsLoading(true);
        if (!event?.code) return;
        if (event?.allowVoting) {
          const themesData = await getThemesByEventCode(event.code);
          setThemes(themesData);
        }
      } catch (error) {
        console.error("Error loading event data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadEventAndThemes();
  }, []);

  const handleVote = async (themeId: string) => {
    console.log("session", event?.allowVoting);

    if (!event?.allowVoting) {
      return;
    }

    try {
      const updatedTheme = await voteTheme(themeId, session?.user?.name ?? "");
      
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

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Votar Temas</h1>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
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
                  hasVoted={theme.votedBy.includes(session?.user?.name ?? "")}
                  allowVoting={event?.allowVoting}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}