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
    <div className="space-y-12 pb-20 font-montserrat italic">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-4 border-b border-gray-100 italic transition-all">
        <div>
           <div className="flex items-center space-x-3 mb-2">
              <div className="bg-primary/5 px-3 py-1.5 rounded-xl border border-primary/10">
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary italic lowercase">Vigilance Monitoring</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30">System Infrastructure Watch</span>
           </div>
           <h1 className="text-3xl md:text-3xl md:text-5xl font-black text-typography tracking-tighter leading-none mb-1">
             System <span className="text-primary italic italic">Health</span> Control
           </h1>
           <p className="text-secondary/40 text-sm font-bold uppercase tracking-widest mt-2 overflow-hidden text-ellipsis whitespace-nowrap">
              Monitoring MySQL Telemetry & Hostinger Node Operations
           </p>
        </div>

        <div className="flex items-center space-x-4">
           <div className="bg-emerald-50 px-8 py-4 rounded-3xl border border-emerald-100 flex items-center space-x-4 group animate-in slide-in-from-right transition-all">
              <div className="w-10 h-10 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                 <Wifi size={18} />
              </div>
              <div>
                 <p className="text-[9px] font-black uppercase tracking-widest text-emerald-800 italic">Network Integrity</p>
                 <p className="text-xl font-black text-emerald-900">99.9% Up</p>
              </div>
           </div>
           <button className="flex items-center space-x-3 px-10 py-5 bg-primary text-white rounded-3xl text-[11px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20">
              <RotateCcw size={18} />
              <span>Full System Reboot</span>
           </button>
        </div>
      </section>

      {/* Infrastructure Widgets */}
      <div className="grid grid-cols-3 gap-5">
         <div className="bg-white p-6 rounded-2xl border border-gray-50 shadow-sm group hover:border-primary/20 transition-all overflow-hidden relative italic">
            <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-primary/5 rounded-full group-hover:scale-150 transition-transform duration-700" />
            <div className="flex items-center justify-between mb-6 relative">
               <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <Database size={24} />
               </div>
               <span className="text-[9px] font-black bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full uppercase italic">HEALTHY</span>
            </div>
            <p className="text-3xl font-black text-typography mb-1 uppercase tracking-tighter">{health?.database?.latency || "---"}</p>
            <p className="text-[10px] font-bold text-secondary/40 uppercase tracking-widest">MySQL Latency (Hostinger)</p>
         </div>
         <div className="bg-white p-6 rounded-2xl border border-gray-50 shadow-sm group hover:border-sky-500/20 transition-all overflow-hidden relative italic">
            <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-sky-50 rounded-full group-hover:scale-150 transition-transform duration-700" />
            <div className="flex items-center justify-between mb-6 relative">
               <div className="w-12 h-12 bg-sky-50 rounded-2xl flex items-center justify-center text-sky-500 group-hover:scale-110 transition-transform">
                  <Cpu size={24} />
               </div>
               <span className="text-[9px] font-black bg-sky-50 text-sky-600 px-3 py-1 rounded-full uppercase italic">STABLE</span>
            </div>
            <p className="text-3xl font-black text-typography mb-1 uppercase tracking-tighter">{health?.infrastructure?.cpu_usage || "---"}</p>
            <p className="text-[10px] font-bold text-secondary/40 uppercase tracking-widest">Server CPU Consumption</p>
         </div>
         <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm group hover:border-amber-500/20 transition-all overflow-hidden relative italic">
            <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-amber-50 rounded-full group-hover:scale-150 transition-transform duration-700" />
            <div className="flex items-center justify-between mb-6 relative">
               <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
                  <HardDrive size={24} />
               </div>
               <span className="text-[9px] font-black bg-amber-50 text-amber-600 px-3 py-1 rounded-full uppercase italic">CAPACITY</span>
            </div>
            <p className="text-3xl font-black text-typography mb-1 uppercase tracking-tighter">{health?.infrastructure?.disk || "---"}</p>
            <p className="text-[10px] font-bold text-secondary/40 uppercase tracking-widest whitespace-nowrap overflow-hidden text-ellipsis">Storage Index (Knowledge Tree)</p>
         </div>
      </div>

      {/* Maintenance & Error Log Console */}
      <section className="grid grid-cols-12 gap-5">
         {/* Live Error Log */}
         <div className="col-span-12 lg:col-span-8 bg-white p-12 rounded-[3.5rem] border border-gray-50 shadow-sm overflow-hidden relative italic">
            <div className="flex items-center justify-between mb-6">
               <div>
                  <h3 className="text-3xl font-black text-typography tracking-tight">Real-time Error Logs</h3>
                  <p className="text-[10px] font-bold text-secondary/40 uppercase tracking-widest mt-1 italic capitalize">Aggregating 404s & 500s across 10M+ users</p>
               </div>
               <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded-2xl border border-gray-100">
                  <button className="px-6 py-2.5 bg-white text-primary rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm transition-all whitespace-nowrap overflow-hidden text-ellipsis">Critical</button>
                  <button className="px-6 py-2.5 text-secondary/30 hover:text-secondary rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">Minor</button>
               </div>
            </div>

            <div className="space-y-6 pb-20 font-black italic">
               {loading ? [...Array(3)].map((_, i) => (
                 <div key={i} className="h-20 bg-gray-50 animate-pulse rounded-2xl" />
               )) : (health?.errors || []).map((err: any) => (
                 <div key={err.id} className="group flex items-center justify-between p-5 bg-gray-50/50 rounded-2xl border border-gray-100 hover:bg-white hover:border-red-500/20 transition-all cursor-pointer">
                    <div className="flex items-center space-x-10 flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
                       <div className={cn(
                          "w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all shadow-sm",
                          err.impact === 'HIGH' ? 'bg-red-50 text-red-500 group-hover:bg-red-500 group-hover:text-white' : 'bg-amber-50 text-amber-500'
                       )}>
                          <ShieldAlert size={24} />
                       </div>
                       <div className="overflow-hidden text-ellipsis whitespace-nowrap">
                          <h4 className="text-base font-black text-typography uppercase tracking-tighter group-hover:text-red-600 transition-colors line-clamp-1">{err.message}</h4>
                          <div className="flex items-center space-x-4 text-[10px] font-bold text-secondary/30 uppercase tracking-widest mt-1 italic overflow-hidden text-ellipsis whitespace-nowrap">
                             <span className={cn(err.impact === 'HIGH' ? 'text-red-600' : 'text-amber-600')}>{err.code} ERROR</span>
                             <div className="w-1 h-1 bg-secondary/10 rounded-full" />
                             <span>{err.count} Occurrences Today</span>
                          </div>
                       </div>
                    </div>

                    <div className="flex items-center space-x-8 text-typography flex-shrink-0 italic">
                       <p className="text-[12px] font-black">{err.time}</p>
                       <button className="p-4 bg-white border border-gray-100 rounded-2xl hover:bg-primary hover:text-white transition-all shadow-sm">
                          <Eye size={18} />
                       </button>
                    </div>
                 </div>
               ))}
            </div>
            
            <div className="absolute left-0 bottom-0 w-full p-6 bg-gradient-to-t from-white to-transparent pointer-events-none flex justify-center italic transition-all">
               <button className="pointer-events-auto px-10 py-5 bg-gray-50 border border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-secondary/40 hover:text-primary transition-all shadow-sm transition-all whitespace-nowrap overflow-hidden text-ellipsis">Archive Management Console</button>
            </div>
         </div>

         {/* Backup Control */}
         <div className="col-span-12 lg:col-span-4 bg-typography p-12 rounded-[4rem] text-white shadow-2xl shadow-primary/20 relative overflow-hidden flex flex-col justify-between group/dark italic transition-all">
            <div className="absolute right-0 bottom-0 w-1/2 h-1/2 bg-gradient-to-tl from-primary/10 to-transparent pointer-events-none transition-all" />
            
            <div>
               <h3 className="text-3xl font-black tracking-tight leading-none mb-2">Relay <span className="text-primary italic italic">Vault</span></h3>
               <p className="text-[10px] font-black text-secondary/30 uppercase tracking-[0.2em] mb-12 italic">Disaster Recovery & Redundancy Logic</p>
               
               <div className="space-y-8 mt-12 italic transition-all">
                  <div className="bg-white/5 p-5 rounded-2xl border border-white/10 flex items-center justify-between group cursor-pointer hover:bg-white/5 transition-all transition-all active:scale-95 italic">
                     <div className="flex items-center space-x-6 overflow-hidden text-ellipsis whitespace-nowrap transition-all">
                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-primary group-hover:scale-105 transition-transform transition-all">
                           <Database size={22} />
                        </div>
                        <div className="overflow-hidden text-ellipsis whitespace-nowrap transition-all">
                           <p className="text-xs font-black uppercase tracking-widest leading-none truncate overflow-hidden text-ellipsis whitespace-nowrap">MySQL Relay</p>
                           <p className="text-[10px] font-bold text-white/30 uppercase mt-1 italic transition-all">Hostinger Node-9</p>
                        </div>
                     </div>
                     <CheckCircle2 size={16} className="text-emerald-500" />
                  </div>

                  <div className="bg-white/5 p-5 rounded-2xl border border-white/10 flex items-center justify-between group cursor-pointer hover:bg-white/5 transition-all active:scale-95 italic">
                     <div className="flex items-center space-x-6 overflow-hidden text-ellipsis whitespace-nowrap transition-all">
                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-sky-500 transition-all">
                           <Monitor size={22} />
                        </div>
                        <div className="overflow-hidden text-ellipsis whitespace-nowrap transition-all">
                           <p className="text-xs font-black uppercase tracking-widest leading-none truncate overflow-hidden text-ellipsis whitespace-nowrap italic">Bucket Sync</p>
                           <p className="text-[10px] font-bold text-white/30 uppercase mt-1 italic truncate overflow-hidden text-ellipsis whitespace-nowrap grayscale">AWS S3 Infrastructure</p>
                        </div>
                     </div>
                     <XCircle size={16} className="text-secondary/20" />
                  </div>
               </div>
            </div>

            <div className="mt-12 transition-all">
               <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-6 italic transition-all text-center">Last Backup: {health?.database?.last_backup || "---"}</p>
               <button className="w-full py-6 bg-primary text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-primary/40 flex items-center justify-center space-x-4 transition-all">
                  <RotateCcw size={18} />
                  <span>Execute Forced Backup</span>
               </button>
            </div>
         </div>
      </section>

      {/* Database Optimization Logic */}
      <section className="bg-emerald-50 p-12 rounded-[4rem] border border-emerald-100 flex items-start space-x-8 italic shadow-xl shadow-emerald-500/5 group animate-in slide-in-from-bottom transition-all">
         <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-emerald-500 border border-emerald-100 group-hover:scale-110 transition-transform shadow-sm transition-all flex-shrink-0">
            <Zap size={32} />
         </div>
         <div>
            <h4 className="text-xl font-black text-emerald-900 uppercase tracking-tight italic transition-all">Performance Optimization Relay</h4>
            <p className="text-sm font-bold text-emerald-800 leading-relaxed mt-2 max-w-4xl italic uppercase tracking-widest opacity-80 leading-relaxed truncate overflow-hidden text-ellipsis whitespace-nowrap transition-all">
              MySQL Connection Pools are operating at 42% capacity. Slow queries (over 200ms) are automatically logged to Section 12.1 for Governance review. Real-time Node integrity is verified every 60 seconds across the Hostinger India data center.
            </p>
         </div>
      </section>
    </div>
  );
}
