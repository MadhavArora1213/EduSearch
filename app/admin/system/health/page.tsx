"use client";

import { useState, useEffect } from "react";
import { 
  Activity, 
  ChevronRight, 
  Search, 
  Zap, 
  Globe, 
  ShieldCheck, 
  Settings, 
  Info, 
  ExternalLink,
  Edit2,
  Trash2,
  Download,
  Filter,
  Monitor,
  Flame,
  Terminal,
  Play,
  Share2,
  AlertTriangle,
  Cpu,
  Layers,
  Sparkles,
  TrendingUp,
  CreditCard,
  Users,
  Target,
  ArrowUpRight,
  TrendingDown,
  Clock,
  LayoutGrid,
  Database,
  Server,
  HardDrive,
  Wifi,
  MoreVertical,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ShieldAlert,
  Eye
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SystemError {
  id: string;
  code: number;
  count: number;
  impact: string;
  message: string;
  time: string;
}

export default function SystemHealthPage() {
  const [health, setHealth] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSystemHealth();
  }, []);

  const fetchSystemHealth = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/system/health");
      const data = await res.json();
      setHealth(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 font-montserrat pb-10">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-4 md:space-y-0 pb-4 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-1.5">
              <div className="bg-primary/5 px-2.5 py-1 rounded-lg border border-primary/10">
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary">Vigilance</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30 uppercase tracking-widest text-[10px]">Infrastructure Watch</span>
           </div>
           <h1 className="text-3xl font-black text-typography tracking-tighter leading-none mb-1">
             System <span className="text-primary italic">Health</span> Control
           </h1>
           <p className="text-secondary/40 text-[10px] font-black uppercase tracking-[0.2em] mt-1.5 leading-none">
              Monitoring MySQL Telemetry & Hostinger Node Operations
           </p>
        </div>

        <div className="flex items-center space-x-3">
           <div className="bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100 flex items-center space-x-3 shadow-sm transition-all">
              <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white shadow-md shadow-emerald-500/10">
                 <Wifi size={14} />
              </div>
              <div>
                 <p className="text-[8px] font-black uppercase tracking-widest text-emerald-800 leading-none mb-1">Network</p>
                 <p className="text-sm font-black text-emerald-900 leading-none">99.9% Up</p>
              </div>
           </div>
           <button className="flex items-center space-x-2 px-6 py-2.5 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20">
              <RotateCcw size={14} />
              <span>System Reboot</span>
           </button>
        </div>
      </section>

      {/* Infrastructure Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
         {[
           { label: "MySQL Latency (Hostinger)", val: health?.database?.latency || "---", icon: Database, color: "text-primary bg-primary/5", status: "HEALTHY", sCol: "text-emerald-600 bg-emerald-50" },
           { label: "Server CPU Consumption", val: health?.infrastructure?.cpu_usage || "---", icon: Cpu, color: "text-sky-500 bg-sky-50", status: "STABLE", sCol: "text-sky-600 bg-sky-50" },
           { label: "Storage Index (Knowledge Tree)", val: health?.infrastructure?.disk || "---", icon: HardDrive, color: "text-amber-500 bg-amber-50", status: "CAPACITY", sCol: "text-amber-600 bg-amber-50" },
         ].map((w, i) => (
           <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm group hover:shadow-md transition-all overflow-hidden relative">
              <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-primary/5 rounded-full group-hover:scale-150 transition-transform duration-700" />
              <div className="flex items-center justify-between mb-6 relative">
                 <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center border border-gray-100 shadow-sm transition-transform group-hover:scale-110", w.color)}>
                    <w.icon size={18} />
                 </div>
                 <span className={cn("text-[8px] font-black px-2 py-0.5 rounded-md uppercase", w.sCol)}>{w.status}</span>
              </div>
              <p className="text-3xl font-black text-typography mb-1.5 tracking-tighter leading-none">{w.val}</p>
              <p className="text-[9px] font-black text-secondary/30 uppercase tracking-widest leading-none truncate">{w.label}</p>
           </div>
         ))}
      </div>

      {/* Maintenance & Error Log Console */}
      <section className="grid grid-cols-12 gap-4">
         {/* Live Error Log */}
         <div className="col-span-12 lg:col-span-8 bg-white p-6 rounded-xl border border-gray-100 shadow-sm overflow-hidden relative">
            <div className="flex items-center justify-between mb-6">
               <div>
                  <h3 className="text-xs font-black text-typography uppercase tracking-widest">Real-time Error Logs</h3>
                  <p className="text-[9px] font-black text-secondary/20 uppercase tracking-widest mt-1">Aggregating 404s & 500s across 10M+ nodes</p>
               </div>
               <div className="flex items-center space-x-1.5 bg-gray-50 p-1 rounded-lg border border-gray-100">
                  <button className="px-4 py-1.5 bg-white text-primary rounded-md text-[8px] font-black uppercase tracking-widest shadow-sm">Critical</button>
                  <button className="px-4 py-1.5 text-secondary/30 hover:text-secondary rounded-md text-[8px] font-black uppercase tracking-widest transition-all">Minor</button>
               </div>
            </div>

            <div className="space-y-3 pb-12">
               {loading ? [...Array(3)].map((_, i) => (
                 <div key={i} className="h-16 bg-gray-50 animate-pulse rounded-xl" />
               )) : (health?.errors || []).map((err: any) => (
                 <div key={err.id} className="group flex items-center justify-between p-3.5 bg-gray-50/50 rounded-xl border border-gray-100 hover:bg-white hover:shadow-md hover:border-red-100 transition-all cursor-pointer">
                    <div className="flex items-center space-x-4 min-w-0">
                       <div className={cn(
                          "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all shadow-sm border border-gray-100",
                          err.impact === 'HIGH' ? 'bg-red-50 text-red-500 group-hover:bg-red-500 group-hover:text-white' : 'bg-amber-50 text-amber-500'
                       )}>
                          <ShieldAlert size={18} />
                       </div>
                       <div className="min-w-0">
                          <h4 className="text-[11px] font-black text-typography leading-tight uppercase truncate">{err.message}</h4>
                          <div className="flex items-center space-x-3 text-[8px] font-black text-secondary/30 uppercase tracking-widest mt-1 opacity-70">
                             <span className={cn(err.impact === 'HIGH' ? 'text-red-500' : 'text-amber-500')}>{err.code} ERROR</span>
                             <div className="w-1 h-1 bg-gray-300 rounded-full" />
                             <span>{err.count} Occurrences</span>
                          </div>
                       </div>
                    </div>

                    <div className="flex items-center space-x-4 flex-shrink-0 ml-4">
                       <p className="text-[10px] font-black text-typography tracking-tighter">{err.time}</p>
                       <button className="w-8 h-8 flex items-center justify-center bg-white border border-gray-100 rounded-lg hover:text-primary transition-all shadow-sm">
                          <Eye size={14} />
                       </button>
                    </div>
                 </div>
               ))}
            </div>
            
            <div className="absolute left-0 bottom-0 w-full p-4 bg-gradient-to-t from-white to-transparent pointer-events-none flex justify-center">
               <button className="pointer-events-auto px-6 py-2 bg-gray-50 border border-gray-100 rounded-lg text-[9px] font-black uppercase tracking-widest text-secondary/40 hover:text-primary transition-all shadow-sm">Archive Management Console</button>
            </div>
         </div>

         {/* Backup Control */}
         <div className="col-span-12 lg:col-span-4 bg-slate-900 p-6 rounded-xl text-white shadow-xl relative overflow-hidden flex flex-col justify-between group shadow-lg">
            <div className="absolute right-0 bottom-0 w-1/3 h-1/3 bg-gradient-to-tl from-primary/10 to-transparent pointer-events-none" />
            
            <div>
               <h3 className="text-xl font-black tracking-tighter leading-none mb-1">Relay <span className="text-primary italic">Vault</span></h3>
               <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-10">Disaster Recovery & Redundancy</p>
               
               <div className="space-y-4">
                  {[
                     { label: "MySQL Relay", sub: "Hostinger Node-9", icon: Database, color: "text-primary", ok: true },
                     { label: "Bucket Sync", sub: "AWS S3 Cluster", icon: Monitor, color: "text-sky-400", ok: false }
                  ].map((b, i) => (
                     <div key={i} className="bg-white/5 p-4 rounded-xl border border-white/5 flex items-center justify-between group/item cursor-pointer hover:bg-white/[0.07] transition-all shadow-inner">
                        <div className="flex items-center space-x-4 min-w-0">
                           <div className={cn("w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/5 shadow-sm transition-transform group-hover/item:scale-105", b.color)}>
                              <b.icon size={18} />
                           </div>
                           <div className="min-w-0">
                              <p className="text-[10px] font-black uppercase tracking-widest leading-none truncate mb-1">{b.label}</p>
                              <p className="text-[8px] font-black text-slate-500 uppercase tracking-tight truncate">{b.sub}</p>
                           </div>
                        </div>
                        {b.ok ? <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0" /> : <XCircle size={14} className="text-slate-700 flex-shrink-0" />}
                     </div>
                  ))}
               </div>
            </div>

            <div className="mt-10">
               <p className="text-[8px] font-black uppercase tracking-widest text-primary mb-4 text-center opacity-70">Backup Health: {health?.database?.last_backup || "---"}</p>
               <button className="w-full py-3.5 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/40 flex items-center justify-center space-x-3">
                  <RotateCcw size={14} />
                  <span>Execute forced backup</span>
               </button>
            </div>
         </div>
      </section>

      {/* Database Optimization Logic */}
      <section className="bg-emerald-50 p-6 rounded-xl border border-emerald-100 flex items-start space-x-6 shadow-sm group">
         <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-emerald-500 border border-emerald-100 group-hover:scale-110 transition-transform shadow-sm flex-shrink-0">
            <Zap size={24} />
         </div>
         <div className="min-w-0">
            <h4 className="text-xs font-black text-emerald-900 uppercase tracking-widest mb-1.5">Optimization Relay</h4>
            <p className="text-[10px] font-black text-emerald-800 tracking-tight uppercase opacity-60 leading-relaxed max-w-4xl line-clamp-2">
              MySQL Connection Pools at 42%. Slow queries (&gt;200ms) automatically logged to Section 12.1 for review. Node integrity verified every 60 seconds across Hostinger India.
            </p>
         </div>
      </section>
    </div>
  );
}
