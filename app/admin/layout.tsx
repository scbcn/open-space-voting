import { Header } from "@/components/layout/header";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="min-h-screen bg-background">
      {/* <Header /> */}
      <main>
        {children}
      </main>
    </div>
  );
}