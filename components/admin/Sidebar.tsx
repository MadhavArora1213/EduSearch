"use client";

import { 
  BarChart3, 
  GraduationCap, 
  FileText, 
  Users, 
  ShieldCheck, 
  Settings, 
  Search, 
  Cpu, 
  Globe, 
  MessageSquare, 
  Bell,
  LogOut,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Database,
  Briefcase,
  TrendingUp,
  Map,
  BookOpen,
  Target,
  Lock
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const menuItems = [
  { id: "dashboard", label: "Core Dashboard", icon: LayoutDashboard, href: "/admin/dashboard" },
  { id: "colleges", label: "College & Course", icon: GraduationCap, href: "/admin/colleges" },
  { id: "exams", label: "Entrance & Cutoffs", icon: FileText, href: "/admin/exams" },
  { id: "leads", label: "Lead Velocitor", icon: Target, href: "/admin/operations/leads" },
  { id: "moderation", label: "Review Vigilance", icon: ShieldCheck, href: "/admin/moderation/reviews" },
  { id: "content", label: "Content Editor", icon: BookOpen, href: "/admin/content/articles" },
  { id: "seo", label: "SEO Intelligence", icon: Globe, href: "/admin/seo/meta-tags" },
  { id: "ai", label: "AI Control Center", icon: Cpu, href: "/admin/ai/control" },
  { id: "growth", label: "Revenue Flux", icon: TrendingUp, href: "/admin/growth/analytics" },
  { id: "system", label: "Infrastructure", icon: Database, href: "/admin/system/health" },
  { id: "notifications", label: "Omni Link Hub", icon: Bell, href: "/admin/notifications/hub" },
  { id: "security", label: "Vigilance Audit", icon: Lock, href: "/admin/security/audit" },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside 
      className={cn(
        "h-screen sticky top-0 bg-primary text-white transition-all duration-300 flex flex-col z-50",
        collapsed ? "w-20" : "w-72"
      )}
    >
      {/* Sidebar Header */}
      <div className="p-6 flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/10">
              <span className="text-white font-black text-xl italic pt-0.5">E</span>
            </div>
            <span className="font-black text-xl tracking-tight">EduSearch</span>
          </div>
        )}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 hover:bg-white/10 rounded-xl transition-colors"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 mt-4 px-4 space-y-2 overflow-y-auto no-scrollbar">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.id} 
              href={item.href}
              className={cn(
                "flex items-center space-x-4 px-4 py-3.5 rounded-2xl transition-all duration-200 group relative",
                isActive 
                  ? "bg-secondary text-white shadow-lg shadow-black/20" 
                  : "text-white/60 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon size={22} className={cn(
                "shrink-0",
                isActive ? "text-white" : "group-hover:scale-110 transition-transform"
              )} />
              {!collapsed && (
                <span className="font-bold text-sm tracking-wide">{item.label}</span>
              )}
              {isActive && !collapsed && (
                <div className="absolute left-0 w-1.5 h-6 bg-white rounded-r-full" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-white/5 space-y-2">
        {!collapsed && (
          <div className="bg-white/5 p-4 rounded-2xl mb-4">
            <p className="text-[10px] uppercase font-black tracking-widest text-white/40 mb-2">Environment</p>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-tighter">PRODUCTION</span>
            </div>
          </div>
        )}
        <button className="w-full flex items-center space-x-4 px-4 py-3.5 text-white/60 hover:text-red-400 hover:bg-red-400/10 rounded-2xl transition-all">
          <LogOut size={22} />
          {!collapsed && <span className="font-bold text-sm uppercase tracking-widest">Logout</span>}
        </button>
      </div>
    </aside>
  );
}
