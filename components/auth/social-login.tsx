"use client";

import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface SocialLoginProps {
  spaceId: string;
}

export function SocialLogin({ spaceId }: SocialLoginProps) {
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleSocialLogin = async (provider: "google" | "github") => {
    if (!spaceId) {
      return;
    }

    setIsLoading(provider);
    try {
      await signIn(provider, {
        callbackUrl: "/",
        redirect: true,
        spaceId,
      });
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="grid gap-4 w-full">
      <Button
        variant="outline"
        onClick={() => handleSocialLogin("google")}
        disabled={!spaceId || isLoading !== null}
        className="gap-2"
      >
        {isLoading === "google" ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <Image
            src="/google.svg"
            alt="Google"
            width={20}
            height={20}
            className="w-5 h-5"
          />
        )}
        Continuar con Google
      </Button>

      <Button
        variant="outline"
        onClick={() => handleSocialLogin("github")}
        disabled={!spaceId || isLoading !== null}
        className="gap-2"
      >
        {isLoading === "github" ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <Github className="w-5 h-5" />
        )}
        Continuar con GitHub
      </Button>

      {!spaceId && (
        <p className="text-sm text-muted-foreground text-center">
          Ingresa el ID del Open Space para continuar
        </p>
      )}
    </div>
  );
}