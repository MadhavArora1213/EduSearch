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
    { id: "B1", label: "Messages Sent (24h)", value: "14,204", trend: "+8.2%", color: "text-emerald-500 bg-emerald-50", icon: Send },
    { id: "B2", label: "Avg Session Duration", value: "2m 14s", trend: "+12s", color: "text-primary bg-primary/5", icon: Clock },
    { id: "B3", label: "Conversation Completion", value: "68.4%", trend: "High", color: "text-indigo-500 bg-indigo-50", icon: Target },
    { id: "B4", label: "Lead Capture Rate", value: "12.8%", trend: "Stable", color: "text-amber-500 bg-amber-50", icon: MousePointer2 },
  ];

  return (
    <div className="space-y-10 font-sans italic not-italic font-sans">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-6 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-2">
              <div className="bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100 italic">
                 <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 italic">Baileys Bot Core v5.1</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30">WhatsApp Ecosystem Hub</span>
           </div>
           <h1 className="text-5xl font-black text-typography tracking-tighter leading-none mb-1">
             Bot <span className="text-emerald-500 italic">Manager</span>
           </h1>
           <p className="text-secondary/40 text-sm font-bold uppercase tracking-widest mt-2">
              Auditing Real-Time Conversation Flows & Automated Counselor Engagement
           </p>
        </div>

        <div className="flex items-center space-x-4">
           {botStatus === 'CONNECTED' ? (
              <button 
                onClick={() => setBotStatus('DISCONNECTED')}
                className="flex items-center space-x-3 px-8 py-4 bg-rose-50 text-rose-600 border border-rose-100 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all shadow-xl shadow-rose-500/10 group italic"
              >
                 <Square size={18} className="group-hover:fill-current italic" />
                 <span>Disconnect Bot</span>
              </button>
           ) : (
              <button 
                onClick={() => setBotStatus('CONNECTING')}
                className="flex items-center space-x-3 px-8 py-4 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all shadow-xl shadow-emerald-500/10 group italic"
              >
                 <Play size={18} className="group-hover:fill-current italic" />
                 <span>Initiate Connection</span>
              </button>
           )}
           <button className="p-4 bg-white border border-gray-100 rounded-2xl text-secondary/20 hover:text-primary transition-all shadow-sm italic"><Settings size={20} /></button>
        </div>
      </section>

      {/* Bot Health & Telemetry Strip */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 italic">
         {botMetrics.map((m) => (
           <div key={m.id} className="bg-white p-8 rounded-[2.5rem] border border-gray-50 shadow-sm relative group hover:border-emerald-500/20 transition-all cursor-pointer italic">
              <div className="flex items-center justify-between mb-4 italic">
                 <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 shadow-inner italic", m.color)}>
                    <m.icon size={22} className="italic" />
                 </div>
                 <span className="text-[9px] font-black text-secondary/20 uppercase tracking-widest italic">{m.trend}</span>
              </div>
              <p className="text-4xl font-black text-typography tracking-tighter capitalize leading-none mb-1 italic">{m.value}</p>
              <p className="text-[10px] font-bold text-secondary/30 uppercase tracking-widest italic">{m.label}</p>
           </div>
         ))}
      </div>

      <div className="grid grid-cols-12 gap-10 font-sans italic not-italic font-sans">
         {/* QR Auth Terminal */}
         <div className="col-span-12 lg:col-span-4 bg-slate-900 rounded-[3rem] p-12 text-white flex flex-col items-center justify-between group overflow-hidden relative font-sans italic not-italic">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-1000">
               <Wifi size={120} className="text-primary italic" />
            </div>
            <div className="w-full relative z-10 font-sans italic not-italic">
               <div className="flex items-center justify-between mb-10">
                  <h4 className="text-sm font-black text-slate-500 uppercase tracking-widest italic underline decoration-primary/30">Session Security</h4>
                  <div className={cn(
                    "flex items-center space-x-2 px-3 py-1 bg-white/5 rounded-full ring-1 ring-white/10 italic",
                    botStatus === 'CONNECTED' ? "text-emerald-500" : "text-amber-500"
                  )}>
                     <div className={cn("w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse italic", botStatus !== 'CONNECTED' && "bg-amber-500")} />
                     <span className="text-[9px] font-black uppercase tracking-widest">{botStatus}</span>
                  </div>
               </div>
               
               <div className="bg-white p-8 rounded-[2.5rem] flex items-center justify-center relative shadow-2xl ring-1 ring-white/20 italic">
                  {botStatus === 'CONNECTED' ? (
                    <div className="flex flex-col items-center py-10 italic">
                       <CheckCircle2 size={100} className="text-emerald-500 animate-bounce mb-6 italic" />
                       <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest italic">Node Active (Pixel 6 Pro)</p>
                       <p className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest mt-1">Verified via Baileys Multi-Device</p>
                    </div>
                  ) : botStatus === 'CONNECTING' ? (
                    <div className="flex flex-col items-center py-10 space-y-4 italic">
                       <RefreshCw size={80} className="text-primary animate-spin mb-4 italic" />
                       <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest italic">Fetching QR Payload...</p>
                    </div>
                  ) : (
                    <QrCode size={180} className="text-slate-900 group-hover:scale-105 transition-transform duration-500 italic" />
                  )}
               </div>

               <div className="mt-10 p-6 bg-white/5 rounded-3xl border border-white/5 italic">
                  <p className="text-[9px] font-bold text-slate-500 leading-relaxed uppercase tracking-[0.1em] italic underline decoration-primary/10">Use official WhatsApp to scan the QR above. Session remains active for 30 days without re-scan.</p>
               </div>
            </div>
         </div>

         {/* Conversation Flow Monitor */}
         <div className="col-span-12 lg:col-span-8 bg-white p-12 rounded-[3.5rem] border border-gray-100 shadow-sm flex flex-col font-sans italic not-italic font-sans">
            <div className="flex justify-between items-center mb-10 italic">
               <div>
                  <h4 className="text-black text-xl font-black tracking-tighter uppercase italic lowercase">Conversation Intent Flow</h4>
                  <p className="text-[9px] font-black text-secondary/30 uppercase tracking-[0.2em] mt-1 underline decoration-primary/10 italic">Visualizing Node-by-Node Drop-offs (Fastify FAST-Schema)</p>
               </div>
               <button className="flex items-center space-x-2 px-6 py-3 bg-snow-pearl rounded-2xl text-[10px] font-black uppercase tracking-widest text-secondary/40 hover:text-primary transition-all italic underline decoration-primary/10 italic">
                  <span>Edit Flow Schema</span>
                  <ExternalLink size={14} />
               </button>
            </div>

            <div className="flex-1 space-y-8">
               {[
                 { node: "Greeting & Profile Check", completion: 94.2, leads: 0 },
                 { node: "Stream Selection (Eng/Med/Law)", completion: 72.1, leads: 0 },
                 { node: "City Preference Capture", completion: 64.8, leads: 0 },
                 { node: "Scholarship Intent Analysis", completion: 42.4, leads: 1204 },
                 { node: "Final Lead Submission Node", completion: 28.1, leads: 420 },
               ].map((v, i) => (
                 <div key={i} className="group cursor-pointer">
                    <div className="flex justify-between items-end mb-2 italic">
                       <div className="flex items-center space-x-4 italic underline decoration-primary/10">
                          <span className="w-8 h-8 rounded-xl bg-snow-pearl flex items-center justify-center text-[10px] font-black text-secondary/30 italic">{i+1}</span>
                          <span className="text-[12px] font-black text-typography uppercase italic">{v.node}</span>
                       </div>
                       <div className="text-right italic">
                          <span className={cn(
                             "text-lg font-black italic tracking-tighter",
                             v.completion < 50 ? "text-rose-500" : "text-emerald-500"
                          )}>{v.completion}%</span>
                       </div>
                    </div>
                    <div className="w-full h-2 bg-snow-pearl rounded-full overflow-hidden mb-1">
                       <div className={cn(
                          "h-full transition-all duration-1000",
                          v.completion < 50 ? "bg-rose-500" : "bg-emerald-500"
                       )} style={{ width: `${v.completion}%` }} />
                    </div>
                    <div className="flex justify-between items-center italic">
                       <p className="text-[8px] font-black text-secondary/20 uppercase tracking-widest italic">Node Progression</p>
                       {v.leads > 0 && <p className="text-[8px] font-black text-emerald-500 uppercase tracking-widest italic">{v.leads} Leads Captured here</p>}
                    </div>
                 </div>
               ))}
            </div>

            <div className="mt-14 pt-10 border-t border-gray-50 flex items-center justify-between text-[9px] font-black text-secondary/20 uppercase tracking-widest italic">
               <div className="flex items-center space-x-4">
                  <Activity size={12} className="text-primary italic" />
                  <span>Real-Time Fastify Event Listener Active</span>
               </div>
               <span>Polling every 5s</span>
            </div>
         </div>
      </div>

      {/* Logic Config Alert Footnote */}
      <section className="bg-emerald-50 p-10 rounded-[2.5rem] border border-emerald-100 flex items-center justify-between italic not-italic font-sans">
         <div className="flex items-center space-x-6">
            <Lock size={20} className="text-emerald-600 italic" />
            <p className="text-[11px] font-bold text-emerald-800/60 tracking-widest uppercase italic font-sans not-italic">All bot messages are signed via AES-GCM • No PII cached in Fastify session storage • Session expiration enforced daily</p>
         </div>
         <p className="text-[9px] font-black text-emerald-600/30 uppercase tracking-widest italic">v5.1 High-Density Cluster</p>
      </section>
    </div>
  );
}
