import { headers } from 'next/headers';
import { AdminHeader } from "@/components/admin/admin-header";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '';
  const isLoginPage = pathname === "/admin/login";

  return (
    <div className="min-h-screen bg-background">
      {/* {!isLoginPage && (
        <header className="sticky top-0 z-50 w-full">
          <AdminHeader />
        </header>
      )} */}
      <main>
        {children}
      </main>
    </div>
  );
}