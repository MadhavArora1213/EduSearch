"use client";

import { useState } from "react";
import { 
  LayoutDashboard, 
  Server, 
  Database, 
  Zap, 
  Cpu, 
  Search, 
  Activity, 
  Layers, 
  ChevronRight, 
  AlertTriangle,
  ExternalLink,
  Maximize2,
  RefreshCw,
  Eye,
  Settings,
  ShieldCheck,
  Flame
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Dashboard {
  id: string;
  name: string;
  icon: any;
  metric: string;
  status: 'HEALTHY' | 'WARNING' | 'CRITICAL';
  type: string;
}

export default function GrafanaHubPage() {
  const [activeDashboard, setActiveDashboard] = useState<string>("vps");
  const ramUsage = 88; // Simulated high RAM for alert

  const dashboards: Dashboard[] = [
    { id: "vps", name: "VPS Node Health", icon: Server, metric: "CPU 12% | RAM 88%", status: 'CRITICAL', type: "System" },
    { id: "postgres", name: "PostgreSQL Depth", icon: Database, metric: "142 Conn | 4ms Lat", status: 'HEALTHY', type: "Storage" },
    { id: "redis", name: "Redis Cache Yield", icon: Zap, metric: "84% Hit-Rate", status: 'HEALTHY', type: "Memory" },
    { id: "ollama", name: "Ollama / AI Inference", icon: Cpu, metric: "Queue: 02 | 12 t/s", status: 'HEALTHY', type: "Inference" },
    { id: "meilisearch", name: "Search Engine Latency", icon: Search, metric: "12ms P95", status: 'HEALTHY', type: "Index" },
    { id: "nginx", name: "Nginx Traffic Flow", icon: Activity, metric: "1.2k req/s", status: 'HEALTHY', type: "Traffic" },
    { id: "bullmq", name: "BullMQ Job Pipeline", icon: Layers, metric: "08 Pending", status: 'HEALTHY', type: "Queue" },
  ];

  return (
    <div className="space-y-10">
      {/* Critical RAM Alert Banner */}
      {ramUsage > 85 && (
         <div className="bg-rose-600 p-6 rounded-[2rem] flex items-center justify-between text-white animate-pulse shadow-xl shadow-rose-600/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform duration-1000">
               <Flame size={100} />
            </div>
            <div className="flex items-center space-x-6 relative z-10">
               <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center border border-white/20">
                  <AlertTriangle size={28} className="text-white" />
               </div>
               <div>
                  <h4 className="text-xl font-black tracking-tighter uppercase italic">Resource Threshold Violation</h4>
                  <p className="text-[11px] font-bold text-white/80 uppercase tracking-widest mt-1">VPS Memory Utilization: {ramUsage}% • Immediate Optimization Suggested</p>
               </div>
            </div>
            <button className="px-8 py-3 bg-white text-rose-600 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all relative z-10">
               Flush App Cache
            </button>
         </div>
      )}

      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-6 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-2">
              <div className="bg-primary/5 px-3 py-1.5 rounded-xl border border-primary/10">
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary italic lowercase">Telemetry Hub</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30">Infrastructure Observability</span>
           </div>
           <h1 className="text-5xl font-black text-typography tracking-tighter leading-none mb-1">
             Grafana <span className="text-primary italic">Command</span>
           </h1>
           <p className="text-secondary/40 text-sm font-bold uppercase tracking-widest mt-2">
              Real-time Hardware & Software Performance Metrics (Node-V3 Cluster)
           </p>
        </div>

        <div className="flex items-center space-x-4">
           <button className="flex items-center space-x-2 px-8 py-4 bg-white border border-gray-200 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:border-primary/20 transition-all">
              <ExternalLink size={18} />
              <span>Full View</span>
           </button>
        </div>
      </section>

      <div className="grid grid-cols-12 gap-10">
         {/* Side Navigation */}
         <div className="col-span-12 lg:col-span-3 space-y-4">
            {dashboards.map((dash) => (
               <button 
                 key={dash.id}
                 onClick={() => setActiveDashboard(dash.id)}
                 className={cn(
                   "w-full text-left p-6 rounded-[2rem] border transition-all group relative overflow-hidden",
                   activeDashboard === dash.id 
                     ? "bg-primary border-primary text-white shadow-xl shadow-primary/20 scale-105" 
                     : "bg-white border-gray-50 text-secondary/40 hover:border-primary/20 hover:bg-snow-pearl/50"
                 )}
               >
                  {activeDashboard === dash.id && (
                     <div className="absolute top-0 right-0 p-4 opacity-20">
                        <dash.icon size={48} className="text-white" />
                     </div>
                  )}
                  <div className="flex items-center space-x-4 relative z-10">
                     <div className={cn(
                        "w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-inner",
                        activeDashboard === dash.id ? "bg-white/10" : "bg-snow-pearl"
                     )}>
                        <dash.icon size={22} className={activeDashboard === dash.id ? "text-white" : "text-secondary/20 group-hover:text-primary"} />
                     </div>
                     <div>
                        <p className={cn(
                           "text-[10px] font-black uppercase tracking-widest",
                           activeDashboard === dash.id ? "text-white/60" : "text-secondary/20 group-hover:text-primary/40"
                        )}>{dash.type}</p>
                        <h4 className="text-sm font-black uppercase tracking-tight leading-none mt-1">{dash.name}</h4>
                     </div>
                  </div>
                  <div className="mt-6 flex items-center justify-between relative z-10">
                     <span className={cn(
                        "text-[10px] font-bold uppercase italic",
                        activeDashboard === dash.id ? "text-white/80" : "text-secondary/40"
                     )}>{dash.metric}</span>
                     <div className={cn(
                        "w-2 h-2 rounded-full",
                        dash.status === 'HEALTHY' ? "bg-emerald-500" : dash.status === 'WARNING' ? "bg-amber-500" : "bg-rose-500 animate-pulse ring-4 ring-rose-500/20"
                     )} />
                  </div>
               </button>
            ))}

            <div className="bg-slate-900 p-8 rounded-[3rem] text-white mt-10 relative overflow-hidden">
               <div className="absolute -top-10 -left-10 w-32 h-32 bg-primary/5 blur-2xl rounded-full" />
               <div className="relative z-10">
                  <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-6 italic underline decoration-primary/30">Operational Discipline</h4>
                  <div className="flex items-center space-x-4 mb-6">
                     <ShieldCheck size={28} className="text-emerald-500" />
                     <div>
                        <p className="text-lg font-black italic tracking-tighter uppercase leading-none">Healthy</p>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Uptime: 99.998%</p>
                     </div>
                  </div>
                  <p className="text-[9px] font-bold text-slate-500 leading-relaxed uppercase tracking-widest bg-white/5 p-4 rounded-2xl border border-white/5 italic">Prometheus Node-Exporter collecting 420+ metrics/sec per core. Data interval: 15s.</p>
               </div>
            </div>
         </div>

         {/* Embedded Iframe View */}
         <div className="col-span-12 lg:col-span-9 space-y-8">
            <div className="bg-white rounded-[3rem] border border-gray-50 shadow-sm overflow-hidden flex flex-col min-h-[800px] relative">
               <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-snow-pearl/30">
                  <div className="flex items-center space-x-6">
                     <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm ring-1 ring-gray-100">
                        {dashboards.find(d => d.id === activeDashboard)?.icon && (
                          <div className="text-primary">
                            {(dashboards.find(d => d.id === activeDashboard) as any).icon({ size: 24 })}
                          </div>
                        )}
                     </div>
                     <div>
                        <h3 className="text-2xl font-black text-typography tracking-tighter italic lowercase underline decoration-primary/10 select-none">Embedded Grafana Environment</h3>
                        <p className="text-[10px] font-bold text-secondary/30 uppercase tracking-[0.2em] mt-1 italic select-none">Streaming Live Telemetry from {activeDashboard.toUpperCase()} Provisioning Node</p>
                     </div>
                  </div>
                  <div className="flex items-center space-x-2">
                     <button className="p-4 bg-white rounded-2xl border border-gray-100 text-secondary/40 hover:text-primary transition-all group" title="Refresh Telemetry">
                        <RefreshCw size={18} className="group-active:rotate-180 transition-transform duration-500" />
                     </button>
                     <button className="p-4 bg-white rounded-2xl border border-gray-100 text-secondary/40 hover:text-primary transition-all" title="Toggle Focus Mode">
                        <Maximize2 size={18} />
                     </button>
                  </div>
               </div>
               
               {/* Embed Placeholder */}
               <div className="flex-1 bg-slate-950 flex flex-col items-center justify-center text-center p-20 text-white relative overflow-hidden group">
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent group-hover:scale-150 transition-transform duration-1000" />
                  <div className="relative z-10">
                     <div className="w-24 h-24 bg-white/5 rounded-full border border-white/10 flex items-center justify-center mb-8 mx-auto shadow-[0_0_50px_rgba(59,130,246,0.1)]">
                        <LayoutDashboard size={42} className="text-primary animate-pulse" />
                     </div>
                     <h4 className="text-3xl font-black tracking-tighter mb-4 italic uppercase">Grafana Instance {activeDashboard.toUpperCase()}</h4>
                     <code className="text-[11px] font-bold text-slate-500 bg-black/40 px-6 py-2 rounded-full border border-white/5 uppercase tracking-widest mb-10 block w-fit mx-auto italic">
                        Proxying https://grafana.internal.edusearch.com/d/{activeDashboard}-node
                     </code>
                     <p className="text-sm font-bold text-slate-400 capitalize underline decoration-primary/30 max-w-lg mx-auto leading-relaxed">
                        Iframe embed would render here in production environment using signed JWT auth cookie for security.
                     </p>
                     
                     <div className="mt-12 grid grid-cols-3 gap-8 w-full max-w-2xl">
                        {[
                           { label: "Net Load", val: "Lo-Wait" },
                           { label: "Disk I/O", val: "Nominal" },
                           { label: "Alerts", val: "None" }
                        ].map((i_stat, idx) => (
                           <div key={idx} className="p-6 bg-white/5 rounded-[2rem] border border-white/5 text-left italic">
                              <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{i_stat.label}</p>
                              <p className="text-xl font-black text-slate-200 mt-1">{i_stat.val}</p>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>

               <div className="p-10 border-t border-gray-50 flex items-center justify-between text-[11px] font-bold text-secondary/30 uppercase tracking-widest italic bg-snow-pearl/50">
                  <div className="flex items-center space-x-3">
                     <Eye size={16} />
                     <span>Secure Telemetry Channel Active • Audited by Super Admin</span>
                  </div>
                  <p>Observability Engine v9.42 • Node-V3 Primary</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
