"use client";

import { useState } from "react";
import { 
  Globe, 
  Search, 
  Filter, 
  ChevronRight, 
  QrCode, 
  Smartphone, 
  Wifi, 
  Zap, 
  BarChart3, 
  History, 
  Settings, 
  MessageSquare, 
  CheckCircle2, 
  AlertCircle, 
  Play, 
  Square, 
  Lock, 
  ArrowUpRight,
  TrendingUp,
  Activity,
  MousePointer2,
  RefreshCw,
  ExternalLink,
  Send,
  Clock,
  Target
} from "lucide-react";
import { cn } from "@/lib/utils";

interface BotMetric {
  id: string;
  label: string;
  value: string;
  trend: string;
  color: string;
  icon: any;
}

export default function WhatsAppBotManagerPage() {
  const [botStatus, setBotStatus] = useState<'CONNECTED' | 'DISCONNECTED' | 'CONNECTING'>('CONNECTED');

  const botMetrics: BotMetric[] = [
    { id: "B1", label: "Messages (24h)", value: "14,204", trend: "+8.2%", color: "text-emerald-500 bg-emerald-50 border-emerald-100/50", icon: Send },
    { id: "B2", label: "Avg Session", value: "2m 14s", trend: "+12s", color: "text-primary bg-primary/5 border-primary/10", icon: Clock },
    { id: "B3", label: "Completion Rate", value: "68.4%", trend: "High", color: "text-indigo-500 bg-indigo-50 border-indigo-100/50", icon: Target },
    { id: "B4", label: "Lead Capture", value: "12.8%", trend: "Stable", color: "text-amber-500 bg-amber-50 border-amber-100/50", icon: MousePointer2 },
  ];

  return (
    <div className="space-y-6 font-montserrat pb-10">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-4 md:space-y-0 pb-4 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-1.5">
              <div className="bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
                 <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Baileys Core v5.1</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30 uppercase tracking-widest text-[10px]">WhatsApp Hub</span>
           </div>
           <h1 className="text-3xl font-black text-typography tracking-tighter leading-none mb-1">
             Bot <span className="text-emerald-500 italic">Registry</span>
           </h1>
           <p className="text-secondary/40 text-[10px] font-black uppercase tracking-widest mt-1.5 leading-none">
              Auditing Real-Time Conversation Flows & Automated Counselor Engagement
           </p>
        </div>

        <div className="flex items-center space-x-3">
           {botStatus === 'CONNECTED' ? (
              <button 
                onClick={() => setBotStatus('DISCONNECTED')}
                className="flex items-center space-x-2 px-6 py-2.5 bg-rose-50 text-rose-600 border border-rose-100 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all shadow-lg shadow-rose-500/10 group active:scale-95"
              >
                 <Square size={14} className="group-hover:fill-current" />
                 <span>Disconnect Bot</span>
              </button>
           ) : (
              <button 
                onClick={() => setBotStatus('CONNECTING')}
                className="flex items-center space-x-2 px-6 py-2.5 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all shadow-lg shadow-emerald-500/10 group active:scale-95"
              >
                 <Play size={14} className="group-hover:fill-current" />
                 <span>Initiate Hub</span>
              </button>
           )}
           <button className="w-9 h-9 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-secondary/40 hover:text-primary transition-all shadow-sm active:scale-95"><Settings size={16} /></button>
        </div>
      </section>

      {/* Bot Health & Telemetry Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
         {botMetrics.map((m) => (
           <div key={m.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm transition-all hover:shadow-md cursor-pointer group">
              <div className="flex items-center justify-between mb-2">
                 <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center border shadow-sm transition-all group-hover:scale-110", m.color)}>
                    <m.icon size={18} />
                 </div>
                 <span className="text-[8px] font-black text-secondary/40 uppercase tracking-widest px-2.5 py-1 rounded-full border border-gray-200 bg-gray-50/50 shadow-sm">{m.trend}</span>
              </div>
              <p className="text-3xl font-black text-typography tracking-tighter leading-none mb-1.5 mt-3">{m.value}</p>
              <p className="text-[8px] font-black text-secondary/30 uppercase tracking-widest">{m.label}</p>
           </div>
         ))}
      </div>

      <div className="grid grid-cols-12 gap-4">
         {/* QR Auth Terminal */}
         <div className="col-span-12 lg:col-span-4 bg-slate-900 rounded-xl p-6 text-white flex flex-col justify-between group overflow-hidden relative shadow-lg">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform duration-1000">
               <Wifi size={100} className="text-primary" />
            </div>
            <div className="w-full relative z-10">
               <div className="flex items-center justify-between mb-6">
                  <h4 className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none">Session Security</h4>
                  <div className={cn(
                    "flex items-center space-x-2 px-2.5 py-1 bg-white/5 rounded-md ring-1 ring-white/10 shadow-sm",
                    botStatus === 'CONNECTED' ? "text-emerald-500" : "text-amber-500"
                  )}>
                     <div className={cn("w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse", botStatus !== 'CONNECTED' && "bg-amber-500")} />
                     <span className="text-[8px] font-black uppercase tracking-widest leading-none">{botStatus}</span>
                  </div>
               </div>
               
               <div className="bg-white p-4 rounded-2xl flex items-center justify-center relative shadow-xl ring-1 ring-white/20 min-h-[220px]">
                  {botStatus === 'CONNECTED' ? (
                    <div className="flex flex-col items-center py-6">
                       <CheckCircle2 size={80} className="text-emerald-500 animate-bounce mb-4" />
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Node Active</p>
                       <p className="text-[8px] font-black text-emerald-500 uppercase tracking-widest mt-2 leading-none">Verified session: Pixel 6 Pro</p>
                    </div>
                  ) : botStatus === 'CONNECTING' ? (
                    <div className="flex flex-col items-center py-6 space-y-4">
                       <RefreshCw size={60} className="text-primary animate-spin mb-2" />
                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Fetching QR...</p>
                    </div>
                  ) : (
                    <QrCode size={140} className="text-slate-900 group-hover:scale-105 transition-transform duration-500" />
                  )}
               </div>

               <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10 shadow-inner">
                  <p className="text-[9px] font-black text-slate-400 leading-relaxed uppercase tracking-widest">Use official WhatsApp to scan the QR above. Session remains active for 30 days without re-scan.</p>
               </div>
            </div>
         </div>

         {/* Conversation Flow Monitor */}
         <div className="col-span-12 lg:col-span-8 bg-white p-6 rounded-xl border border-gray-100 shadow-lg flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-[0.02] group-hover:scale-110 transition-transform duration-1000">
               <Activity size={120} className="text-emerald-500" />
            </div>
            <div className="flex justify-between items-center mb-6 relative z-10">
               <div>
                  <h4 className="text-sm font-black text-typography tracking-tighter uppercase mb-1">Intent Flow Analytics</h4>
                  <p className="text-[9px] font-black text-secondary/30 uppercase tracking-widest leading-none">Node-by-Node Drop-offs (FAST-Schema)</p>
               </div>
               <button className="flex items-center space-x-2 px-4 py-2 bg-gray-50 rounded-lg text-[9px] font-black uppercase tracking-widest text-secondary/40 hover:text-primary transition-all border border-gray-200 shadow-sm active:scale-95">
                  <span>Logic Schema</span>
                  <ExternalLink size={14} />
               </button>
            </div>

            <div className="flex-1 space-y-5 relative z-10">
               {[
                 { node: "Greeting & Profile Check", completion: 94.2, leads: 0 },
                 { node: "Stream Selection Logic", completion: 72.1, leads: 0 },
                 { node: "City Preference Capture", completion: 64.8, leads: 0 },
                 { node: "Scholarship Analysis", completion: 42.4, leads: 1204 },
                 { node: "Lead Submission Node", completion: 28.1, leads: 420 },
               ].map((v, i) => (
                 <div key={i} className="group/node cursor-pointer">
                    <div className="flex justify-between items-end mb-2 font-montserrat tracking-tight">
                       <div className="flex items-center space-x-3">
                          <span className="w-7 h-7 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center text-[10px] font-black text-secondary/40 shadow-sm group-hover/node:bg-primary group-hover/node:text-white group-hover/node:border-primary/20 transition-all">{i+1}</span>
                          <span className="text-[12px] font-black text-typography uppercase leading-none group-hover/node:text-primary transition-colors">{v.node}</span>
                       </div>
                       <div className="text-right leading-none">
                          <span className={cn(
                             "text-[16px] font-black tracking-tighter",
                             v.completion < 50 ? "text-rose-500" : "text-emerald-500"
                          )}>{v.completion}%</span>
                       </div>
                    </div>
                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mb-2 shadow-inner">
                       <div className={cn(
                          "h-full transition-all duration-1000 shadow-sm",
                          v.completion < 50 ? "bg-rose-500" : "bg-emerald-500"
                       )} style={{ width: `${v.completion}%` }} />
                    </div>
                    <div className="flex justify-between items-center">
                       <p className="text-[8px] font-black text-secondary/30 uppercase tracking-widest">Node Progression State</p>
                       {v.leads > 0 && <p className="text-[7px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full uppercase tracking-widest border border-emerald-100/50">{v.leads} Generated Leads</p>}
                    </div>
                 </div>
               ))}
            </div>

            <div className="mt-8 pt-5 border-t border-gray-100 flex items-center justify-between font-montserrat relative z-10">
               <div className="flex items-center space-x-3">
                  <Activity size={14} className="text-primary animate-pulse" />
                  <span className="text-[8px] font-black text-secondary/40 uppercase tracking-widest">Real-Time Event Listener Active</span>
               </div>
               <span className="text-[8px] font-black text-secondary/30 uppercase tracking-widest">v5.1 High-Density Cluster</span>
            </div>
         </div>
      </div>

      {/* Logic Config Alert Footnote */}
      <section className="bg-emerald-50/50 p-5 rounded-xl border border-emerald-100/50 flex flex-col md:flex-row md:items-center justify-between group shadow-md transition-all hover:shadow-lg">
         <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-emerald-500 text-white rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform">
               <Lock size={20} />
            </div>
            <div>
               <h4 className="text-[11px] font-black text-emerald-900 uppercase tracking-widest leading-none mb-2">Security & Encryption</h4>
               <p className="text-[9px] font-black text-emerald-600/70 uppercase tracking-widest leading-relaxed max-w-2xl">
                  Bot messages are signed via AES-GCM • No PII cached in session storage • Session expiration enforced daily at 23:59 UTC
               </p>
            </div>
         </div>
         <button className="mt-4 md:mt-0 px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20 active:scale-95 flex items-center space-x-2">
            <span>Security Audit</span>
            <ChevronRight size={14} />
         </button>
      </section>
    </div>
  );
}
