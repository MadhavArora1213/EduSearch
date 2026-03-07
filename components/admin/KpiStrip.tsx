"use client";

import { useMemo } from "react";
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
    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-50 shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 relative group overflow-hidden active:scale-[0.98]">
      {/* Background Micro-Decoration */}
      <div className={cn(
        "absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-5 group-hover:scale-150 transition-transform duration-700",
        color
      )} />
      
      <div className="flex justify-between items-start mb-6">
        <div className={cn(
          "w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:-rotate-6",
          color.replace('bg-', 'bg-opacity-10 text-'),
          color
        )}>
          <Icon size={26} className={cn("text-white")} />
        </div>
        <div className={cn(
          "flex items-center space-x-1 px-3 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest",
          isPositive ? "bg-emerald-50 text-emerald-600 border border-emerald-100/50" : "bg-red-50 text-red-600 border border-red-100/50"
        )}>
           {isPositive ? <TrendingUpIcon size={12} /> : <TrendingDown size={12} />}
           <span>{Math.abs(trend)}%</span>
        </div>
      </div>

      <div className="space-y-1">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary/40">{label}</h3>
        <div className="flex items-baseline space-x-2">
            <p className="text-4xl font-black text-typography tracking-tighter">{value}</p>
            {secondary && <span className="text-xs font-bold text-secondary/30">{secondary}</span>}
        </div>
      </div>
      
      {/* Bottom status line */}
      <div className="mt-6 flex items-center justify-between">
         <p className="text-[10px] font-bold text-secondary/40">Updated 30s ago</p>
         <button className="p-2 bg-gray-50 rounded-xl hover:bg-primary hover:text-white transition-all">
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
  };
  loading?: boolean;
}

export function KpiStrip({ kpis, loading }: KpiStripProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-10">
      <KpiCard 
        label="Total Students" 
        value={loading ? "..." : (kpis?.students || 0).toString()} 
        trend={12} 
        icon={Users} 
        color="bg-primary"
        secondary="Database"
      />
      <KpiCard 
        label="Total Leads" 
        value={loading ? "..." : (kpis?.leads || 0).toString()} 
        trend={-4} 
        icon={MousePointer2} 
        color="bg-yale-blue"
        secondary="Captured"
      />
      <KpiCard 
        label="Pending Reviews" 
        value={loading ? "..." : (kpis?.reviews || 0).toString()} 
        trend={22} 
        icon={MessageSquare} 
        color="bg-red-500"
        secondary="Moderate"
      />
      <KpiCard 
        label="Total Colleges" 
        value={loading ? "..." : (kpis?.colleges || 0).toString()} 
        trend={8} 
        icon={Briefcase} 
        color="bg-secondary"
        secondary="Institutes"
      />
      <KpiCard 
        label="Revenue MTD" 
        value="₹428k" 
        trend={15} 
        icon={TrendingUp} 
        color="bg-emerald-500"
        secondary="INR"
      />
      <KpiCard 
        label="VPS Health" 
        value="99.8%" 
        trend={0} 
        icon={Activity} 
        color="bg-primary"
        secondary="Online"
      />
    </div>
  );
}
