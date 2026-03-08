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
  Lock,
  Activity,
  Zap,
  CreditCard,
  ShieldAlert,
  Fingerprint,
  Terminal,
  History,
  HardDrive,
  RotateCcw,
  RefreshCw,
  Layers,
  Bug,
  LayoutGrid,
  Smartphone
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const menuItems = [
  { id: "dashboard", label: "Command Centre", icon: LayoutDashboard, href: "/admin/dashboard" },
  { id: "colleges", label: "Institution Hub", icon: GraduationCap, href: "/admin/colleges" },
  { id: "exams", label: "Exam Intelligence", icon: FileText, href: "/admin/exams" },
  
  // Section 4 - Operations & Leads
  { id: "leads", label: "Lead Monitor", icon: Target, href: "/admin/operations/leads" },
  { id: "disputes", label: "Dispute Workflow", icon: ShieldCheck, href: "/admin/operations/leads/disputes" },
  
  // Section 9 - Growth & Analytics
  { id: "growth-analytics", label: "Growth Intel", icon: TrendingUp, href: "/admin/growth/analytics" },
  { id: "funnels", label: "Conversion Funnel", icon: Zap, href: "/admin/growth/funnels" },
  { id: "ab-testing", label: "A/B Test Lab", icon: LayoutGrid, href: "/admin/growth/ab-testing" },

  // Section 10 - Study Abroad
  { id: "study-abroad", label: "Global CMS", icon: Globe, href: "/admin/study-abroad/universities" },
  { id: "partners", label: "Partner Vault", icon: Briefcase, href: "/admin/study-abroad/partners" },

  // Section 11 - Communication
  { id: "notifications", label: "Email Engine", icon: MessageSquare, href: "/admin/notifications/email" },
  { id: "sms-manager", label: "SMS Registry", icon: Smartphone, href: "/admin/notifications/sms" },
  { id: "whatsapp", label: "Bot Control", icon: Globe, href: "/admin/notifications/whatsapp" },

  // Section 12 - Security & Audit
  { id: "audit", label: "Audit Ledger", icon: History, href: "/admin/security/audit" },
  { id: "access-logs", label: "Access Shifts", icon: ShieldAlert, href: "/admin/security/access-logs" },
  { id: "rbac", label: "Auth Matrix", icon: Lock, href: "/admin/security/rbac" },

  // Tech & Content
  { id: "moderation", label: "Auto-Mod Rules", icon: ShieldCheck, href: "/admin/moderation/reviews" },
  { id: "seo", label: "SEO Intelligence", icon: Search, href: "/admin/seo/metadata" },
  { id: "ai", label: "AI Ops Console", icon: Cpu, href: "/admin/ai/models/status" },
  { id: "observability", label: "System Health", icon: Activity, href: "/admin/system/observability" },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside 
        className={cn(
          "h-screen sticky top-0 bg-[#06162C] text-white transition-all duration-300 z-50 border-r border-white/5 shadow-2xl relative overflow-hidden shrink-0",
          collapsed ? "w-24" : "w-[280px]",
          "hidden lg:flex flex-col"
        )}
      >
        {/* Premium Background Glows */}
        <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-blue-500/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

        {/* Sidebar Header */}
        <div className="relative h-24 flex items-center justify-between px-7 shrink-0 z-10">
          {!collapsed && (
            <div className="flex items-center group cursor-pointer transition-all">
               <span className="font-extrabold text-[#F8FAFC] text-2xl tracking-tight leading-none">EduSearch</span>
            </div>
          )}
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className={cn(
              "p-2 rounded-xl transition-all border border-transparent backdrop-blur-md",
              collapsed ? "mx-auto bg-white/5 border-white/10 text-white hover:bg-white/10" : "hover:bg-white/5 text-slate-500 hover:text-slate-300"
            )}
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        <div className="px-7 mb-4 shrink-0 z-10">
           <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto no-scrollbar relative z-10 pb-6">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.id} 
                href={item.href}
                className={cn(
                  "flex items-center space-x-3.5 px-4 py-3.5 rounded-[14px] transition-all duration-300 group relative overflow-hidden",
                  isActive 
                    ? "bg-white/10 text-white shadow-lg shadow-black/20 border border-white/10" 
                    : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
                )}
              >
                {/* Active Item Background Glow */}
                {isActive && (
                   <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-transparent opacity-50 pointer-events-none" />
                )}

                <div className={cn(
                   "relative flex items-center justify-center shrink-0 transition-all duration-300",
                   isActive ? "text-blue-400" : "group-hover:text-blue-300 group-hover:scale-110"
                )}>
                   {isActive && (
                      <div className="absolute inset-0 bg-blue-400 blur-md opacity-40 rounded-full" />
                   )}
                   <item.icon size={20} className="relative z-10" />
                </div>
                
                {!collapsed && (
                  <span className={cn(
                     "text-[13px] tracking-wide transition-all z-10",
                     isActive ? "font-bold" : "font-medium"
                  )}>{item.label}</span>
                )}
                
                {isActive && !collapsed && (
                  <div className="absolute left-0 w-1 h-8 bg-blue-500 rounded-r-full shadow-[0_0_12px_rgba(59,130,246,0.8)] top-1/2 -translate-y-1/2" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="px-4 shrink-0 z-10 mb-4 mt-auto">
           <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        {/* Sidebar Footer */}
        <div className="p-5 pt-0 shrink-0 z-10">
          <button className={cn(
             "w-full flex items-center space-x-3.5 px-4 py-3.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/20 border border-transparent rounded-[14px] transition-all font-medium group",
             collapsed && "justify-center"
          )}>
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
            {!collapsed && <span className="text-[13px] font-bold tracking-wide">Secure Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#06162C]/95 backdrop-blur-xl border-t border-white/10 z-[100] flex flex-row items-center justify-between px-2 overflow-x-auto no-scrollbar shadow-[0_-10px_40px_rgba(0,0,0,0.3)] touch-pan-x">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.id} 
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center p-2 min-w-[64px] rounded-xl transition-all relative overflow-hidden",
                isActive ? "text-blue-400" : "text-slate-400"
              )}
            >
              <div className="relative mb-1">
                 {isActive && (
                    <div className="absolute inset-0 bg-blue-400 blur-sm opacity-40 rounded-full" />
                 )}
                 <item.icon size={20} className="relative z-10" />
              </div>
              <span className={cn(
                "text-[9px] font-semibold whitespace-nowrap",
                isActive ? "text-blue-400" : "text-slate-500"
              )}>
                 {item.label.split(' ')[0]} {/* Show short label on mobile */}
              </span>
              {isActive && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-blue-500 rounded-t-full shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
              )}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
