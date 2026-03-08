"use client";

import { useState } from "react";
import { 
  RefreshCw, 
  Search, 
  Filter, 
  ChevronRight, 
  Link2, 
  ArrowRight, 
  CheckCircle2, 
  Plus, 
  ArrowUpRight, 
  Clock, 
  AlertTriangle, 
  Undo2, 
  LayoutGrid, 
  Activity, 
  Zap, 
  ShieldAlert, 
  Trash2,
  Download,
  Terminal
} from "lucide-react";
import { cn } from "@/lib/utils";

interface RedirectRecord {
  id: string;
  source: string;
  destination: string;
  type: 301 | 302;
  hits: number;
  lastHit: string;
  status: 'ACTIVE' | 'CHAINED' | 'BROKEN';
}

export default function RedirectManager() {
  const [redirects] = useState<RedirectRecord[]>([
    { id: "R1", source: "/college/bmsce", destination: "/college/bms-college-of-engineering", type: 301, hits: 14202, lastHit: "2 mins ago", status: 'ACTIVE' },
    { id: "R2", source: "/exam/jee-mains-dates", destination: "/exam/jee-mains", type: 301, hits: 8402, lastHit: "12 mins ago", status: 'CHAINED' },
    { id: "R3", source: "/old-blog/how-to-prep", destination: "/blog/preparation-guide", type: 301, hits: 1204, lastHit: "1 hour ago", status: 'ACTIVE' },
    { id: "R4", source: "/archived/iit-kanpur-placement", destination: "/college/iit-kanpur/placements", type: 301, hits: 420, lastHit: "1 day ago", status: 'BROKEN' },
  ]);

  return (
    <div className="space-y-6 font-montserrat pb-10">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-4 md:space-y-0 pb-4 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-1.5">
              <div className="bg-primary/5 px-2.5 py-1 rounded-lg border border-primary/10">
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary">Traffic Gate</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30 uppercase tracking-widest text-[10px]">Route Management</span>
           </div>
           <h1 className="text-3xl font-black text-typography tracking-tighter leading-none mb-1">
             Redirect <span className="text-primary italic">Intelligence</span>
           </h1>
           <p className="text-secondary/40 text-[10px] font-black uppercase tracking-[0.2em] mt-1.5 leading-none">
              Preserving URL Authoritative States via Production 301/302 Rules
           </p>
        </div>

        <div className="flex items-center space-x-3">
           <button className="flex items-center space-x-2 px-5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:border-gray-200 transition-all text-secondary/40 shadow-sm">
              <Download size={14} />
              <span>Import</span>
           </button>
           <button className="flex items-center space-x-2 px-6 py-2.5 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20">
              <Plus size={14} />
              <span>New Rule</span>
           </button>
        </div>
      </section>

      {/* Redirect Stats HUD */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
         {[
           { label: "Active 301s", value: "8,242", sub: "Permanent", icon: Link2, color: "text-primary bg-primary/5" },
           { label: "Temporary 302s", value: "124", sub: "Session", icon: Activity, color: "text-indigo-500 bg-indigo-50" },
           { label: "Monthly Hits", value: "1.2M", sub: "Volume", icon: Zap, color: "text-amber-500 bg-amber-50" },
           { label: "Leakage", value: "1.2%", sub: "Loss Rate", icon: ShieldAlert, color: "text-emerald-500 bg-emerald-50" }
         ].map((s, i) => (
           <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm relative group hover:shadow-md transition-all cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                 <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center transition-all group-hover:scale-105 shadow-sm", s.color)}>
                    <s.icon size={18} />
                 </div>
                 <span className="text-[8px] font-black text-secondary/20 uppercase tracking-widest">{s.sub}</span>
              </div>
              <p className="text-3xl font-black text-typography tracking-tighter leading-none mb-1.5">{s.value}</p>
              <p className="text-[9px] font-black text-secondary/30 uppercase tracking-widest leading-none">{s.label}</p>
           </div>
         ))}
      </div>

      <div className="grid grid-cols-12 gap-4">
         {/* Main Redirect Table */}
         <div className="col-span-12 lg:col-span-8 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
            <div className="p-4 border-b border-gray-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-gray-50/30">
               <div>
                  <h3 className="text-xs font-black text-typography uppercase tracking-widest">Global Redirect Registry</h3>
                  <p className="text-[9px] font-black text-secondary/20 uppercase tracking-widest mt-1">90k+ GROWTH NODES MONITORED</p>
               </div>
               <div className="relative group w-64">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary/20" />
                  <input placeholder="Search records..." className="w-full bg-white border-0 pl-9 pr-3 py-2 rounded-lg text-xs font-bold outline-none ring-1 ring-gray-100 focus:ring-primary/10 transition-all font-montserrat shadow-sm" />
               </div>
            </div>
            <div className="overflow-x-auto">
               <table className="w-full text-left">
                  <thead className="bg-gray-50/50 border-b border-gray-100">
                     <tr>
                        <th className="px-4 py-3 text-[9px] font-black uppercase tracking-widest text-secondary/40">Source Vector</th>
                        <th className="px-4 py-3 text-[9px] font-black uppercase tracking-widest text-secondary/40">Target Handle</th>
                        <th className="px-4 py-3 text-[9px] font-black uppercase tracking-widest text-secondary/40">Mode</th>
                        <th className="px-4 py-3 text-[9px] font-black uppercase tracking-widest text-secondary/40">Metics</th>
                        <th className="px-4 py-3 text-[9px] font-black uppercase tracking-widest text-secondary/40 text-right">Ops</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {redirects.map((r) => (
                      <tr key={r.id} className="group hover:bg-gray-50/50 transition-all font-montserrat">
                        <td className="px-4 py-3">
                           <div className="flex items-center space-x-3">
                              <div className={cn(
                                 "w-8 h-8 rounded-lg flex items-center justify-center transition-all shadow-sm",
                                 r.status === 'ACTIVE' ? "bg-emerald-50 text-emerald-600" : r.status === 'CHAINED' ? "bg-amber-50 text-amber-500" : "bg-rose-50 text-rose-600"
                              )}>
                                 <RefreshCw size={14} className={cn(r.status === 'CHAINED' && "animate-spin-slow")} />
                              </div>
                              <h4 className="text-xs font-black text-typography truncate w-[160px] lowercase tracking-tight">{r.source}</h4>
                           </div>
                        </td>
                        <td className="px-4 py-3">
                           <div className="flex items-center space-x-2">
                              <ArrowRight size={12} className="text-secondary/20" />
                              <span className="text-xs font-bold text-primary truncate w-[160px] lowercase tracking-tight">{r.destination}</span>
                           </div>
                        </td>
                        <td className="px-4 py-3">
                           <span className="px-2 py-1 rounded-md bg-gray-100 text-[8px] font-black text-typography uppercase tracking-widest border border-gray-200">{r.type}</span>
                        </td>
                        <td className="px-4 py-3">
                           <p className="text-sm font-black text-typography tracking-tighter leading-none">{r.hits >= 1000 ? `${(r.hits / 1000).toFixed(1)}k` : r.hits}</p>
                           <p className="text-[8px] font-black text-secondary/20 uppercase tracking-widest mt-1">{r.lastHit}</p>
                        </td>
                        <td className="px-4 py-3 text-right">
                           <div className="flex items-center justify-end space-x-1.5">
                              {r.status === 'CHAINED' && (
                                 <button className="px-2.5 py-1.5 bg-amber-500 text-white rounded-lg text-[8px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-md shadow-amber-500/10">
                                    Collapse
                                 </button>
                              )}
                              <button className="w-8 h-8 bg-white border border-gray-200 rounded-lg hover:bg-red-500 hover:text-white transition-all shadow-sm flex items-center justify-center text-secondary/30" title="Delete">
                                 <Trash2 size={14} />
                              </button>
                           </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
               </table>
            </div>
         </div>

         {/* Redirect Intelligence Sidebar */}
         <div className="col-span-12 lg:col-span-4 space-y-4">
            <section className="bg-slate-900 p-4 rounded-xl text-white flex flex-col justify-between relative overflow-hidden group shadow-lg">
               <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform duration-1000">
                  <Terminal size={80} className="text-primary" />
               </div>
               <div className="relative z-10">
                  <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Chain Detector Hub</h4>
                  <div className="space-y-3">
                     {[
                        { chain: "/college/bms → /bmsce → /bms-eng", reason: "Multiple Hop Violation" },
                        { chain: "/old-exam → /exam-new → /guide", reason: "Found A → B → C Chain" }
                     ].map((c, i) => (
                        <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/5 hover:border-amber-500/20 transition-all cursor-pointer group/c relative shadow-inner">
                           <div className="flex items-center justify-between mb-3 leading-none">
                              <span className="text-[8px] font-black text-amber-500 uppercase tracking-widest">{c.reason}</span>
                              <AlertTriangle size={12} className="text-amber-500 animate-pulse" />
                           </div>
                           <p className="text-[10px] font-bold text-slate-300 lowercase leading-relaxed break-all opacity-80">{c.chain}</p>
                           <button className="mt-3 w-full py-2 bg-white/5 text-slate-400 rounded-lg text-[8px] font-black uppercase tracking-widest hover:bg-white/10 transition-all border border-white/5">Auto-Collapse</button>
                        </div>
                     ))}
                  </div>
               </div>
               <div className="mt-8 pt-6 border-t border-slate-800 relative z-10">
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Standard Policy</p>
                  <p className="text-[9px] font-bold text-slate-400 leading-relaxed uppercase tracking-tight opacity-60">
                    Source authority preservation via 301. Max hop limit: 1. Header protocol V3.
                  </p>
               </div>
            </section>

            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm space-y-3 group hover:border-primary/20 transition-all cursor-pointer">
               <ShieldAlert size={20} className="text-secondary/10 group-hover:text-primary transition-colors" />
               <p className="text-[8px] font-black text-secondary/20 uppercase tracking-widest mb-1 leading-none">Authority Recovery Node</p>
               <h4 className="text-sm font-black text-typography uppercase tracking-tight leading-none">99.8% Preservation</h4>
               <p className="text-[9px] font-black text-secondary/40 leading-relaxed mt-2 uppercase tracking-widest opacity-60">
                 Platform success rate during institutional naming migrations via automated header management.
               </p>
            </div>
         </div>
      </div>
    </div>
  );
}
