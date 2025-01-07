"use client";

import { Github, Twitter } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container py-8 md:py-10 px-4 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <h3 className="font-semibold">SCBCN Open Space App</h3>
            <p className="text-sm text-muted-foreground">
              Una aplicación para gestionar Open Spaces, desarrollada por la comunidad de Software Crafters Barcelona.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold">Software Crafters BCN</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="https://softwarecrafters.barcelona" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                  Sitio Web
                </a>
              </li>
              <li>
                <a href="https://www.meetup.com/software-crafters-barcelona" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                  Meetup
                </a>
              </li>
              <li>
                <a href="https://conf.softwarecrafters.barcelona" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                  Conferencia SCBCN
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold">Enlaces</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/agenda" className="hover:text-primary">
                  Agenda
                </Link>
              </li>
              <li>
                <Link href="/proponer" className="hover:text-primary">
                  Proponer Tema
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-primary">
                  Acceso Admin
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold">Comunidad</h3>
            <div className="flex space-x-4">
              <a href="https://github.com/softwarecrafters-barcelona" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://twitter.com/bcnswcraft" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              Únete a nuestra comunidad y participa en nuestros eventos.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Software Crafters Barcelona. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}