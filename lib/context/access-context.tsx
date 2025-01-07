"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { OpenSpaceAccess } from "@/lib/types";

interface AccessContextType {
  access: OpenSpaceAccess | null;
  setAccess: (access: OpenSpaceAccess | null) => void;
}

const AccessContext = createContext<AccessContextType | undefined>(undefined);

export function AccessProvider({ children }: { children: ReactNode }) {
  const [access, setAccess] = useState<OpenSpaceAccess | null>(null);

  return (
    <AccessContext.Provider value={{ access, setAccess }}>
      {children}
    </AccessContext.Provider>
  );
}

export function useAccess() {
  const context = useContext(AccessContext);
  if (context === undefined) {
    throw new Error("useAccess must be used within an AccessProvider");
  }
  return context;
}