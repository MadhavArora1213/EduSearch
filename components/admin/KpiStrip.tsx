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
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 relative group overflow-hidden active:scale-[0.98]">
      {/* Background Micro-Decoration */}
      <div className={cn(
        "absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-5 group-hover:scale-150 transition-transform duration-700",
        color
      )} />
      
      <div className="flex justify-between items-start mb-4">
        <div className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center shadow-sm transition-transform group-hover:-rotate-6",
          color.replace('bg-', 'bg-opacity-10 text-'),
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
        <h3 className="text-sm font-medium text-gray-500">{label}</h3>
        <div className="flex items-baseline space-x-2">
            <p className="text-2xl font-bold text-typography">{value}</p>
            {secondary && <span className="text-xs font-medium text-gray-400">{secondary}</span>}
        </div>
      </div>
      
      {/* Bottom status line */}
      <div className="mt-4 flex items-center justify-between pt-4 border-t border-gray-50">
         <p className="text-xs font-medium text-gray-400">Updated 30s ago</p>
         <button className="p-1.5 bg-gray-50 rounded-lg hover:bg-primary hover:text-white transition-all text-gray-400">
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
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
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
        value={loading ? "..." : `₹${((kpis?.revenueMTD || 0) / 1000).toFixed(1)}k`} 
        trend={15} 
        icon={TrendingUp} 
        color="bg-emerald-500"
        secondary="INR"
      />
      <KpiCard 
        label="Active AI Sessions" 
        value={loading ? "..." : "124"} 
        trend={34} 
        icon={Activity} 
        color="bg-blue-500"
        secondary="Real-time"
      />
    </div>
  );
}
