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

interface MenuItem {
  id?: string;
  label: string;
  icon?: any;
  href?: string;
  type?: "label";
}

const menuItems: MenuItem[] = [
  // SECTION 1: CORE ENGINE
  { type: "label", label: "Core Console" },
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/admin/dashboard" },
  { id: "colleges", label: "Colleges", icon: GraduationCap, href: "/admin/colleges" },
  { id: "exams", label: "Exams", icon: FileText, href: "/admin/exams" },
  { id: "students", label: "Students", icon: Users, href: "/admin/students" },
  
  // SECTION 2: REVENUE OPS
  { type: "label", label: "Revenue Ops" },
  { id: "leads", label: "Lead Monitor", icon: Target, href: "/admin/operations/leads" },
  { id: "disputes", label: "Lead Disputes", icon: ShieldCheck, href: "/admin/operations/leads/disputes" },
  
  // SECTION 3: CONTENT
  { type: "label", label: "Content Engine" },
  { id: "blogs", label: "Articles", icon: FileText, href: "/admin/content/blogs" },

  // SECTION 4: GROWTH
  { type: "label", label: "Growth" },
  { id: "growth-analytics", label: "Engagement", icon: TrendingUp, href: "/admin/growth/analytics" },
  { id: "funnels", label: "Funnels", icon: Zap, href: "/admin/growth/funnels" },
  { id: "ab-testing", label: "A/B Testing", icon: LayoutGrid, href: "/admin/growth/ab-testing" },

  // SECTION 4: INTERNATIONAL
  { type: "label", label: "Study Abroad" },
  { id: "study-abroad", label: "Universities", icon: Globe, href: "/admin/study-abroad/universities" },
  { id: "partners", label: "Partner Portal", icon: Briefcase, href: "/admin/study-abroad/partners" },

  // SECTION 5: COMMUNICATION
  { type: "label", label: "Communication" },
  { id: "notifications", label: "Email Engine", icon: MessageSquare, href: "/admin/notifications/email" },
  { id: "sms-manager", label: "SMS Manager", icon: Smartphone, href: "/admin/notifications/sms" },
  { id: "whatsapp", label: "WhatsApp Bot", icon: Globe, href: "/admin/notifications/whatsapp" },

  // SECTION 6: GOVERNANCE
  { type: "label", label: "Governance" },
  { id: "audit", label: "Audit Logs", icon: History, href: "/admin/security/audit" },
  { id: "access-logs", label: "Access Logs", icon: ShieldAlert, href: "/admin/security/access-logs" },
  { id: "rbac", label: "Role Matrix", icon: Lock, href: "/admin/security/rbac" },
  { id: "moderation", label: "Moderation", icon: ShieldCheck, href: "/admin/moderation/reviews" },
  { id: "seo", label: "SEO Ops", icon: Search, href: "/admin/seo/metadata" },
  { id: "ai", label: "AI Control", icon: Cpu, href: "/admin/ai/models/status" },
  { id: "observability", label: "Platform Health", icon: Activity, href: "/admin/system/observability" },
];

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Sidebar - Desktop (Sticky) & Mobile (Fixed Drawer) */}
      <aside 
        className={cn(
          "h-screen fixed lg:sticky top-0 bg-[#06162C] text-white transition-all duration-300 z-[50] border-r border-white/5 shadow-2xl overflow-hidden flex flex-col shrink-0",
          // Desktop Widths
          collapsed ? "lg:w-24" : "lg:w-[280px]",
          // Mobile Widths & Visibility
          isOpen ? "w-[280px] left-0" : "w-[280px] -left-[280px] lg:left-0",
          !isOpen && !collapsed && "lg:w-[280px]",
          !isOpen && collapsed && "lg:w-24"
        )}
      >
        {/* Premium Background Glows */}
        <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-blue-500/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

        {/* Sidebar Header */}
        <div className="relative h-24 flex items-center justify-between px-7 shrink-0 z-10">
          <div className="flex items-center group cursor-pointer transition-all">
             <span className="font-extrabold text-[#F8FAFC] text-2xl tracking-tight leading-none lg:block">
               {collapsed ? "E" : "EduSearch"}
             </span>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Desktop Toggle */}
            <button 
              onClick={() => setCollapsed(!collapsed)}
              className={cn(
                "hidden lg:flex p-2 rounded-xl transition-all border border-transparent backdrop-blur-md",
                collapsed ? "bg-white/5 border-white/10 text-white hover:bg-white/10" : "hover:bg-white/5 text-slate-500 hover:text-slate-300"
              )}
            >
              {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>

            {/* Mobile Close */}
            <button 
              onClick={() => setIsOpen(false)}
              className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all"
            >
              <ChevronLeft size={20} />
            </button>
          </div>
        </div>

        <div className="px-7 mb-4 shrink-0 z-10">
           <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto no-scrollbar relative z-10 pb-6">
          {menuItems.map((item, index) => {
            if (item.type === "label") {
              return !collapsed ? (
                <div key={`label-${index}`} className="px-4 pt-8 pb-3 select-none">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] font-montserrat">
                    {item.label}
                  </p>
                  <div className="w-8 h-0.5 bg-blue-500/30 mt-1 rounded-full" />
                </div>
              ) : (
                <div key={`label-${index}`} className="h-px bg-white/5 my-6 mx-4" />
              );
            }

            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.id} 
                href={item.href!}
                onClick={() => setIsOpen(false)}
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
                   {item.icon && <item.icon size={20} className="relative z-10" />}
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

    </>
  );
}
