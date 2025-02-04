"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccess } from "@/lib/context/access-context";

export default function EditEventLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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

  return <>{children}</>;
}