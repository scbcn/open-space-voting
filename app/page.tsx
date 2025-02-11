"use client";

import { Button } from "@/components/ui/button";
import { AccessForm } from "@/components/auth/access-form";
import { WelcomeContent } from "@/components/home/welcome-content";
import Link from "next/link";
import {  useEventStore } from "@/lib/store/event-store";
import { useAuthStore } from "@/lib/store/auth-store";

export default function Home() {

  const user = useAuthStore((state) => state.user);
  const sessionEvent = useEventStore((state) => state.currentEvent);

 


  return (
    <main className="min-h-screen bg-background">


      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          {!sessionEvent ? (
            <div className="flex flex-col items-center">
              <h1 className="text-4xl font-bold mb-8">Bienvenido al Open Space</h1>
              <AccessForm  />
            </div>
          ) : (
            <WelcomeContent />
          )}
        </div>
      </section>

      {/* Rules Section - Only show when logged in */}
      {user?.name && (
        <section className="py-16 px-4 bg-muted/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Principios del Open Space</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Quien sea que venga es la persona correcta",
                  description: "Los participantes más apasionados son los que hacen la diferencia."
                },
                {
                  title: "Lo que suceda es lo único que podría haber sucedido",
                  description: "Mantén la mente abierta y aprovecha cada momento."
                },
                {
                  title: "Cuando empieza es el momento correcto",
                  description: "La creatividad no sigue un horario estricto."
                },
                {
                  title: "Cuando termina, termina",
                  description: "Respeta el flujo natural de las conversaciones."
                }
              ].map((rule, index) => (
                <div key={index} className="bg-card p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-lg mb-2">{rule.title}</h3>
                  <p className="text-muted-foreground">{rule.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Call to Action - Only show when logged in */}
      {user?.name && (
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">¿Listo para participar?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Únete a nosotros en esta experiencia única de aprendizaje colaborativo y networking.
            </p>
            <Link href="/proponer">
              <Button size="lg">Proponer un Tema</Button>
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}