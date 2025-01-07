"use client";

import { useState } from "react";
import { SessionDetails } from "@/components/session/session-details";
import { Session, Theme } from "@/lib/types";

// Mock user ID - In a real app, this would come from authentication
const MOCK_USER_ID = "user1";

interface SessionPageClientProps {
  initialSession: Session & { theme: Theme };
}

export function SessionPageClient({ initialSession }: SessionPageClientProps) {
  const [session, setSession] = useState(initialSession);

  const handleJoinSession = () => {
    if (!session.participants.includes(MOCK_USER_ID)) {
      setSession(prev => ({
        ...prev,
        participants: [...prev.participants, MOCK_USER_ID]
      }));
    }
  };

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <SessionDetails
          session={session}
          theme={session.theme}
          onJoin={handleJoinSession}
          isParticipant={session.participants.includes(MOCK_USER_ID)}
        />
      </div>
    </main>
  );
}