"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/admin/Sidebar";
import { Navbar } from "@/components/admin/Navbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return (
      <div className="min-h-screen bg-snow-pearl font-sans">
        {children}
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-snow-pearl font-sans antialiased overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full relative overflow-y-auto no-scrollbar">
        <Navbar />
        <main className="p-4 md:p-6 lg:p-10 flex-1 relative bg-snow-pearl/30 pb-24 lg:pb-10">
          <div className="max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-2 duration-500 overflow-x-hidden">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
