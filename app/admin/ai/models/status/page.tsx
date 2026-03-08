"use client";

import { useState } from "react";
import { 
  Cpu, 
  Search, 
  Filter, 
  ChevronRight, 
  Activity, 
  Zap, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Play, 
  Square, 
  Clock, 
  TrendingUp, 
  Database, 
  ArrowUpRight, 
  Sparkles,
  Layers,
  Terminal,
  BrainCircuit,
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ModelMetric {
  id: string;
  label: string;
  value: string;
  trend: string;
  color: string;
  icon: any;
}

export default function ModelStatusDashboard() {
  const [modelStatus, setModelStatus] = useState<'LOADED' | 'UNLOADING' | 'UNLOADED' | 'LOADING'>('LOADED');

  const metrics: ModelMetric[] = [
    { id: "M1", label: "RAM Consumption", value: "6.4 GB", trend: "Stable", color: "text-emerald-500 bg-emerald-50", icon: Database },
    { id: "M2", label: "Avg. Inference", value: "2.4s", trend: "-0.2s", color: "text-primary bg-primary/5", icon: Zap },
    { id: "M3", label: "P95 Latency", value: "4.8s", trend: "Slow", color: "text-amber-500 bg-amber-50", icon: Clock },
    { id: "M4", label: "Total Requests", value: "14,202", trend: "+12%", color: "text-indigo-500 bg-indigo-50", icon: Activity },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-6 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-2">
              <div className="bg-primary/5 px-3 py-1.5 rounded-xl border border-primary/10">
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary italic lowercase underline decoration-primary/10">Ollama Inference Control</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30">Llama 3.1 8B Q4_K_M Pipeline</span>
           </div>
           <h1 className="text-3xl md:text-3xl md:text-5xl font-black text-typography tracking-tighter leading-none mb-1">
             Model <span className="text-primary italic">Status</span>
           </h1>
           <p className="text-secondary/40 text-sm font-bold uppercase tracking-widest mt-2">
              Self-Hosted LLM Telemetry & Real-Time Resource Provisioning
           </p>
        </div>

        <div className="flex items-center space-x-4">
           {modelStatus === 'LOADED' ? (
              <button 
                onClick={() => setModelStatus('UNLOADING')}
                className="flex items-center space-x-3 px-8 py-4 bg-rose-50 text-rose-600 border border-rose-100 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all shadow-xl shadow-rose-500/10 group"
              >
                 <Square size={18} className="group-hover:fill-current" />
                 <span>Force Unload Model</span>
              </button>
           ) : (
              <button 
                onClick={() => setModelStatus('LOADING')}
                className="flex items-center space-x-3 px-8 py-4 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all shadow-xl shadow-emerald-500/10 group"
              >
                 <Play size={18} className="group-hover:fill-current" />
                 <span>Initiate Hot-Load</span>
              </button>
           )}
           <button className="p-4 bg-white border border-gray-100 rounded-2xl text-secondary/40 hover:text-primary transition-all shadow-sm">
              <Settings size={20} />
           </button>
        </div>
      </section>

      {/* Resource & Inference Pulse */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
         {metrics.map((m) => (
           <div key={m.id} className="bg-white p-8 rounded-[2.5rem] border border-gray-50 shadow-sm relative group hover:border-primary/20 transition-all cursor-pointer">
              <div className="flex items-center justify-between mb-4 italic">
                 <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 shadow-inner", m.color)}>
                    <m.icon size={22} />
                 </div>
                 <span className="text-[9px] font-black text-secondary/20 uppercase tracking-widest">{m.trend}</span>
              </div>
              <p className="text-4xl font-black text-typography tracking-tighter capitalize leading-none mb-1">{m.value}</p>
              <p className="text-[10px] font-bold text-secondary/30 uppercase tracking-widest italic">{m.label}</p>
           </div>
         ))}
      </div>

      <div className="grid grid-cols-12 gap-10">
         {/* Live Inference Terminal */}
         <div className="col-span-12 lg:col-span-8 bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden flex flex-col group">
            <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform duration-1000">
               <BrainCircuit size={160} className="text-primary" />
            </div>
            <div className="flex items-center justify-between mb-10 relative z-10">
               <div>
                  <h3 className="text-xl font-black text-white tracking-tighter italic lowercase underline decoration-primary/30 select-none">Global Inference Terminal</h3>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1 italic">Monitoring Llama-3-Instruct-8B Stream Outlets</p>
               </div>
               <div className="flex items-center space-x-6 text-[10px] font-black uppercase tracking-widest">
                  <div className="flex items-center space-x-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                     <span className="text-emerald-500">Ollama API Up</span>
                  </div>
                  <div className="flex items-center space-x-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                     <span className="text-primary">Worker Thread Active</span>
                  </div>
               </div>
            </div>

            <div className="space-y-4 font-mono text-[11px] relative z-10 flex-1 lg:max-h-[400px] overflow-y-auto pr-6 custom-scrollbar">
               {[
                 { t: "10:48:42", m: "INF: Request ID R-9921 Received | Query: 'Engineering colleges in Pune under 5L'", status: "OK" },
                 { t: "10:48:43", m: "INF: Embedding Semantic Search Triggered | MeiliSearch Latency: 42ms", status: "OK" },
                 { t: "10:48:43", m: "INF: System Prompt Injected | Version: v2.1.0 | Context Window: 4096 Tokens", status: "OK" },
                 { t: "10:48:44", m: "INF: Prompt Token Analysis: 1.2k In / 1.5k Max", status: "OK" },
                 { t: "10:48:46", m: "INF: Streaming Output Chunk 0..240 | Tokens/Sec: 42.4", status: "OK" },
                 { t: "10:48:47", m: "INF: Response Completed | Total Time: 3.42s | GPU Utilization: 84%", status: "DONE" },
               ].map((log, i) => (
                 <div key={i} className="flex items-start space-x-4 border-l border-slate-800 pl-4 py-1 hover:bg-white/5 transition-all">
                    <span className="text-slate-600 shrink-0">{log.t}</span>
                    <span className="text-slate-300 flex-1">{log.m}</span>
                    <span className={cn(log.status === 'DONE' ? "text-emerald-500" : "text-primary")}>{log.status}</span>
                 </div>
               ))}
            </div>

            <div className="mt-10 pt-10 border-t border-slate-800 flex items-center justify-between relative z-10">
               <div className="flex items-center space-x-4">
                  <Terminal size={18} className="text-primary" />
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">Listening on Port 11434 (LLM Proxy Layer)</p>
               </div>
               <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline italic">Download Full Diagnostic Logs</button>
            </div>
         </div>

         {/* Queue & Capacity Sidebar */}
         <div className="col-span-12 lg:col-span-4 space-y-8">
            <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm relative group hover:border-primary/20 transition-all overflow-hidden flex flex-col justify-between h-full">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />
               <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                     <h4 className="text-sm font-black text-secondary/30 uppercase tracking-widest italic underline decoration-primary/10">Pipeline Capacity</h4>
                     <Zap size={18} className="text-amber-500 animate-bounce" />
                  </div>
                  <div className="space-y-10">
                     <div className="space-y-4">
                        <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-widest">
                           <span className="italic">Concurrent Sessions</span>
                           <span className="text-primary">14 / 20 Max</span>
                        </div>
                        <div className="h-4 bg-snow-pearl rounded-full overflow-hidden border border-gray-100 p-1">
                           <div className="h-full bg-primary rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(59,130,246,0.2)]" style={{ width: '70%' }} />
                        </div>
                     </div>
                     <div className="space-y-4">
                        <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-widest">
                           <span className="italic">Request Queue Depth</span>
                           <span className="text-rose-500">02 Waiting</span>
                        </div>
                        <div className="h-4 bg-snow-pearl rounded-full overflow-hidden border border-gray-100 p-1">
                           <div className="h-full bg-rose-500 rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(244,63,94,0.2)]" style={{ width: '10%' }} />
                        </div>
                     </div>
                  </div>
               </div>
               
               <div className="mt-14 space-y-4 relative z-10 italic">
                  <div className="p-6 bg-snow-pearl rounded-3xl border border-gray-100">
                     <p className="text-[10px] font-black text-secondary/30 uppercase tracking-widest mb-1 italic leading-none">Last Hot-Pull</p>
                     <h6 className="text-[13px] font-black text-typography uppercase tracking-tight">Llama-3.1-Instruct-8b</h6>
                     <p className="text-[9px] font-bold text-emerald-500 mt-1 uppercase">v1.2.4 Verified Cache Success</p>
                  </div>
                  <button className="w-full py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-primary/10">
                     Pull Updated Weights
                  </button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
