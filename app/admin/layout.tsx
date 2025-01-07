"use client";

import { usePathname } from "next/navigation";
import { AdminHeader } from "@/components/admin/admin-header";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  return (
    <>
      {!isLoginPage && <AdminHeader />}
      {children}
    </>
  );
}