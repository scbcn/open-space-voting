import { SessionPageClient } from "./session-page-client";
import { getThemeById } from "@/app/actions/themes";
import { Theme } from "@/lib/types";
export default async function SessionPage(props: Readonly<{
  params: Promise<{ id: string }>
}>) {

  const params = await props.params;
  const currentTheme: Theme | null = await getThemeById(params.id);


  if (!currentTheme) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Sesión no encontrada</h1>
          <p className="text-muted-foreground">La sesión que buscas no existe o ha sido eliminada.</p>
        </div>
      </div>
    );
  }

  return <SessionPageClient initialSession={{
    id: currentTheme.id ?? '',
    themeId: currentTheme.id ?? '',
    participants: currentTheme.votedBy,
    notes: '',
    title: currentTheme.title,
    votes: currentTheme.votes,
    description: currentTheme.description ?? '',
    tags: currentTheme.tags ?? [],
    createdBy: currentTheme.author
  }} />;
}