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
    <div className="space-y-10">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-6 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-2">
              <div className="bg-primary/5 px-3 py-1.5 rounded-xl border border-primary/10">
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary italic lowercase underline decoration-primary/10">Traffic Preserver</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30">Programmatic Redirect Manager</span>
           </div>
           <h1 className="text-5xl font-black text-typography tracking-tighter leading-none mb-1">
             Redirect <span className="text-primary italic">Intelligence</span>
           </h1>
           <p className="text-secondary/40 text-sm font-bold uppercase tracking-widest mt-2">
              Preserving 90k+ URL Authoritative States via Production-Grade 301/302 Rules
           </p>
        </div>

        <div className="flex items-center space-x-4">
           <button className="flex items-center space-x-2 px-8 py-4 bg-white border border-gray-200 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:border-primary/20 transition-all text-secondary/40">
              <Download size={18} />
              <span>Bulk CSV Import</span>
           </button>
           <button className="flex items-center space-x-2 px-8 py-4 bg-primary text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20">
              <Plus size={18} />
              <span>New Permanent Redirect</span>
           </button>
        </div>
      </section>

      {/* Redirect Stats HUD */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
         {[
           { label: "Active 301s", value: "8,242", sub: "Permanent Moves", icon: Link2, color: "text-primary bg-primary/5" },
           { label: "Temporary 302s", value: "124", sub: "Session Handlers", icon: Activity, color: "text-indigo-500 bg-indigo-50" },
           { label: "Hits Redirected", value: "1.2M", sub: "Monthly Volume", icon: Zap, color: "text-amber-500 bg-amber-50" },
           { label: "Authority Leakage", value: "1.2%", sub: "Minimal Loss", icon: ShieldAlert, color: "text-emerald-500 bg-emerald-50" }
         ].map((s, i) => (
           <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-50 shadow-sm relative group hover:border-primary/20 transition-all cursor-pointer">
              <div className="flex items-center justify-between mb-4 italic">
                 <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 shadow-inner", s.color)}>
                    <s.icon size={22} />
                 </div>
                 <span className="text-[9px] font-black text-secondary/20 uppercase tracking-widest">{s.sub}</span>
              </div>
              <p className="text-4xl font-black text-typography tracking-tighter capitalize leading-none mb-1">{s.value}</p>
              <p className="text-[10px] font-bold text-secondary/30 uppercase tracking-widest italic">{s.label}</p>
           </div>
         ))}
      </div>

      <div className="grid grid-cols-12 gap-10">
         {/* Main Redirect Table */}
         <div className="col-span-12 lg:col-span-8 bg-white rounded-[3rem] border border-gray-50 shadow-sm overflow-hidden flex flex-col">
            <div className="p-10 border-b border-gray-50 flex items-center justify-between bg-snow-pearl/30">
               <div>
                  <h3 className="text-xl font-black text-typography tracking-tighter italic lowercase underline decoration-primary/10 select-none">Global Redirect Registry</h3>
                  <p className="text-[10px] font-bold text-secondary/30 uppercase tracking-[0.2em] mt-1 italic select-none capitalize">Managing URL transitions for 90k+ growth nodes</p>
               </div>
               <div className="relative">
                  <Search size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-secondary/20" />
                  <input placeholder="Search source or destination..." className="w-64 bg-white border border-gray-100 pl-14 pr-6 py-3 rounded-2xl text-[12px] font-bold outline-none focus:ring-4 focus:ring-primary/5 transition-all shadow-sm" />
               </div>
            </div>
            <div className="overflow-x-auto">
               <table className="w-full text-left italic">
                  <thead className="bg-snow-pearl/50 border-b border-gray-100">
                     <tr>
                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Source Path Vector</th>
                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Destination Path</th>
                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Type</th>
                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Monthly Hits</th>
                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40 text-right">Interrupt</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {redirects.map((r) => (
                      <tr key={r.id} className="group hover:bg-snow-pearl/30 transition-all">
                        <td className="px-10 py-8">
                           <div className="flex items-center space-x-6">
                              <div className={cn(
                                 "w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-inner",
                                 r.status === 'ACTIVE' ? "bg-emerald-50 text-emerald-600" : r.status === 'CHAINED' ? "bg-amber-50 text-amber-500" : "bg-rose-50 text-rose-600"
                              )}>
                                 <RefreshCw size={22} className={cn(r.status === 'CHAINED' && "animate-spin duration-3000")} />
                              </div>
                              <h4 className="text-sm font-black text-typography leading-tight lowercase underline decoration-secondary/10 tracking-tight truncate w-[180px]">{r.source}</h4>
                           </div>
                        </td>
                        <td className="px-10 py-8">
                           <div className="flex items-center space-x-4">
                              <ArrowRight size={14} className="text-secondary/20" />
                              <span className="text-sm font-black text-primary underline decoration-primary/10 tracking-tight truncate w-[180px]">{r.destination}</span>
                           </div>
                        </td>
                        <td className="px-10 py-8">
                           <span className="px-4 py-1.5 rounded-full bg-snow-pearl text-[10px] font-black text-typography uppercase tracking-widest border border-gray-100">{r.type}</span>
                        </td>
                        <td className="px-10 py-8">
                           <p className="text-lg font-black text-typography tracking-tighter">{r.hits >= 1000 ? `${(r.hits / 1000).toFixed(1)}k` : r.hits}</p>
                           <p className="text-[9px] font-bold text-secondary/20 uppercase tracking-widest italic">{r.lastHit}</p>
                        </td>
                        <td className="px-10 py-8 text-right">
                           <div className="flex items-center justify-end space-x-2">
                              {r.status === 'CHAINED' && (
                                 <button className="px-4 py-2 bg-amber-500 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-amber-500/10">
                                    Collapse Chain
                                 </button>
                              )}
                              <button className="p-4 bg-white border border-gray-100 rounded-2xl hover:bg-rose-500 hover:text-white transition-all shadow-sm group/btn" title="Delete Redirect">
                                 <Trash2 size={18} />
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
         <div className="col-span-12 lg:col-span-4 space-y-8">
            <section className="bg-slate-900 p-10 rounded-[3rem] text-white flex flex-col justify-between relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-1000">
                  <Terminal size={100} className="text-primary" />
               </div>
               <div className="relative z-10">
                  <h4 className="text-sm font-black text-slate-500 uppercase tracking-widest mb-10 italic underline decoration-primary/20">Chain Detector Hub</h4>
                  <div className="space-y-6">
                     {[
                        { chain: "/college/bms → /bmsce → /bms-eng", reason: "Found A → B → C Chain" },
                        { chain: "/old-exam → /exam-new → /guide", reason: "Multiple Hop Violation" }
                     ].map((c, i) => (
                        <div key={i} className="p-8 bg-white/5 rounded-3xl border border-white/5 hover:border-amber-500/30 transition-all cursor-pointer group/c relative">
                           <div className="flex items-center justify-between mb-4">
                              <span className="text-[9px] font-black text-amber-500 uppercase tracking-widest italic">{c.reason}</span>
                              <AlertTriangle size={14} className="text-amber-500 animate-pulse" />
                           </div>
                           <p className="text-[11px] font-black text-slate-300 italic lowercase leading-relaxed break-all">{c.chain}</p>
                           <button className="mt-4 w-full py-3 bg-white/5 text-slate-400 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-white/10 transition-all border border-white/5">Auto-Collapse A → C</button>
                        </div>
                     ))}
                  </div>
               </div>
               <div className="mt-14 pt-10 border-t border-slate-800 italic relative z-10">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Redirection Standard Policy</p>
                  <p className="text-xs font-black text-slate-400 leading-relaxed uppercase tracking-tighter">EDU-SEO-V3: Source authority must be preserved via 301 Permanent Header. Max hop limit set to 1. 302 only for active maintenance windows.</p>
               </div>
            </section>

            <div className="bg-white p-10 rounded-[3rem] border border-gray-50 shadow-sm space-y-6 group hover:border-primary/20 transition-all cursor-pointer">
               <ShieldAlert size={28} className="text-secondary/10 group-hover:text-primary transition-colors" />
               <p className="text-[10px] font-black text-secondary/30 uppercase tracking-widest mb-1 italic">Authority Recovery Rate</p>
               <h4 className="text-xl font-black text-typography uppercase tracking-tight leading-tight italic lowercase">99.8% Index Preservation</h4>
               <p className="text-[10px] font-bold text-secondary/40 leading-relaxed mt-2 uppercase tracking-widest italic decoration-primary/10 underline">The platform successfully migrates ranking power during institutional rename operations through automated header management.</p>
            </div>
         </div>
      </div>
    </div>
  );
}
