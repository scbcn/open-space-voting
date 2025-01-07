"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccess } from "@/lib/context/access-context";
import { EventForm } from "@/components/admin/event-form";

export default function NewEventPage() {
  const router = useRouter();
  const { access } = useAccess();

  useEffect(() => {
    if (!access?.isAdmin) {
      router.push("/admin/login");
    }
  }, [access, router]);

  if (!access?.isAdmin) {
    return null;
  }

  return (
    <main className="min-h-screen p-8 bg-background">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Crear Nuevo Open Space</h1>
        <EventForm mode="create" />
      </div>
    </main>
  );
}