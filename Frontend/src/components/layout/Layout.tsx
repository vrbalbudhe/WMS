
import { PropsWithChildren } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

type LayoutProps = PropsWithChildren<{
  role: "admin" | "warehouse" | "procurement" | null;
  user?: {
    name: string;
    role: "Administrator" | "Warehouse Manager" | "Procurement Officer";
    avatar?: string;
  };
}>;

export default function Layout({ children, role, user }: LayoutProps) {
  const defaultUser = {
    name: "User Name",
    role: "Administrator" as const,
    avatar: "",
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar role={role} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={user || defaultUser} />
        
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
