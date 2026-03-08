"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/admin/Sidebar";
import { Navbar } from "@/components/admin/Navbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return (
      <div className="min-h-screen bg-snow-pearl font-montserrat">
        {children}
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-snow-pearl font-montserrat antialiased overflow-hidden relative">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[45] lg:hidden transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col h-full relative overflow-y-auto no-scrollbar">
        <main className="p-4 md:p-5 lg:p-6 flex-1 relative bg-snow-pearl/30 pb-20 lg:pb-6">
          <div className="max-w-[1800px] mx-auto animate-in fade-in slide-in-from-bottom-1 duration-400 overflow-x-hidden">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
