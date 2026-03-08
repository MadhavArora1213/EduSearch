"use client";

import { useEffect, useState } from "react";
import { 
  Users, 
  MessageSquare, 
  Briefcase, 
  TrendingUp, 
  Activity, 
  MousePointer2,
  TrendingUp as TrendingUpIcon,
  TrendingDown,
  ArrowUpRight,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

interface KpiProps {
  label: string;
  value: string;
  trend: number;
  icon: any;
  color: string;
  secondary?: string;
}

function KpiCard({ label, value, trend, icon: Icon, color, secondary }: KpiProps) {
  const isPositive = trend >= 0;

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 relative group overflow-hidden active:scale-[0.98]">
      {/* Background Micro-Decoration */}
      <div className={cn(
        "absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-5 group-hover:scale-150 transition-transform duration-700",
        color
      )} />
      
      <div className="flex justify-between items-start mb-4">
        <div className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center shadow-sm transition-transform group-hover:-rotate-6",
          color && color.replace('bg-', 'text-'),
          color && `${color}/10`,
          color
        )}>
          <Icon size={22} className="text-white" />
        </div>
        <div className={cn(
          "flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-semibold",
          isPositive ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-red-50 text-red-600 border border-red-100"
        )}>
           {isPositive ? <TrendingUpIcon size={14} /> : <TrendingDown size={14} />}
           <span>{Math.abs(trend)}%</span>
        </div>
      </div>

      <div className="space-y-1">
        <h3 className="text-[10px] font-black uppercase tracking-widest text-secondary/40">{label}</h3>
        <div className="flex items-baseline space-x-2">
            <p className="text-4xl font-black text-typography tracking-tighter">{value}</p>
            {secondary && <span className="text-[10px] font-bold text-secondary/20 uppercase tracking-[0.2em]">{secondary}</span>}
        </div>
      </div>
      
      {/* Bottom status line */}
      <div className="mt-6 flex items-center justify-between pt-6 border-t border-gray-50 group-hover:border-primary/10 transition-colors">
         <div className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <p className="text-[9px] font-black uppercase tracking-widest text-secondary/30">Live Syncing</p>
         </div>
         <button className="w-8 h-8 flex items-center justify-center bg-gray-50 rounded-xl hover:bg-primary hover:text-white transition-all text-secondary/20 group-hover:scale-110">
            <ArrowUpRight size={14} />
         </button>
      </div>
    </div>
  );
}

interface KpiStripProps {
  kpis?: {
    students: number;
    leads: number;
    reviews: number;
    colleges: number;
    revenueMTD?: number;
  };
  loading?: boolean;
}

export function KpiStrip({ kpis, loading }: KpiStripProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16 font-montserrat">
      <KpiCard 
        label="DAU (Students)" 
        value={loading ? "..." : (kpis?.students || 0).toString()} 
        trend={12} 
        icon={Users} 
        color="bg-primary"
        secondary="Today"
      />
      <KpiCard 
        label="Leads Today" 
        value={loading ? "..." : (kpis?.leads || 0).toString()} 
        trend={22} 
        icon={MousePointer2} 
        color="bg-indigo-600"
        secondary="Active"
      />
      <KpiCard 
        label="Pending Reviews" 
        value={loading ? "..." : (kpis?.reviews || 0).toString()} 
        trend={-5} 
        icon={MessageSquare} 
        color="bg-rose-500"
        secondary="Action Needed"
      />
      <KpiCard 
        label="Active Clients" 
        value={loading ? "..." : "42"} 
        trend={8} 
        icon={Briefcase} 
        color="bg-amber-600"
        secondary="B2B Colleges"
      />
      <KpiCard 
        label="Revenue MTD" 
        value={loading ? "..." : `₹${((kpis?.revenueMTD || 0) / 1000).toFixed(1)}k`} 
        trend={15} 
        icon={TrendingUp} 
        color="bg-emerald-500"
        secondary="INR"
      />
      <KpiCard 
        label="System Pulse" 
        value={loading ? "..." : "Stable"} 
        trend={100} 
        icon={Activity} 
        color="bg-sky-500"
        secondary="All Systems Go"
      />
    </div>
  );
}
