"use client";

import { useState } from "react";
import { 
  Network, 
  Search, 
  Filter, 
  ChevronRight, 
  Link2, 
  Unlink, 
  CheckCircle2, 
  AlertCircle, 
  XOctagon, 
  RotateCcw, 
  ExternalLink, 
  Zap, 
  Layers, 
  Building2, 
  ArrowUpRight, 
  GitBranch, 
  Share2,
  Activity,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";

interface LinkStat {
  id: string;
  category: string;
  inLinks: number;
  outLinks: number;
  pages: number;
}

export default function InternalLinkManager() {
  const [stats] = useState<LinkStat[]>([
    { id: "L1", category: "Colleges", inLinks: 420242, outLinks: 12402, pages: 34204 },
    { id: "L2", category: "Exams", inLinks: 84022, outLinks: 4202, pages: 2102 },
    { id: "L3", category: "Cities", inLinks: 124022, outLinks: 8402, pages: 12402 },
    { id: "L4", category: "Articles", inLinks: 24202, outLinks: 42022, pages: 42100 },
  ]);

  return (
    <div className="space-y-6 font-montserrat pb-10">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-4 md:space-y-0 pb-4 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-1.5">
              <div className="bg-primary/5 px-2.5 py-1 rounded-lg border border-primary/10">
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary">Authority Flow</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30 uppercase tracking-widest text-[10px]">Link Intelligence</span>
           </div>
           <h1 className="text-3xl font-black text-typography tracking-tighter leading-none mb-1">
             Link <span className="text-primary italic">Intelligence</span>
           </h1>
           <p className="text-secondary/40 text-[10px] font-black uppercase tracking-[0.2em] mt-1.5 leading-none">
              Maximizing Page Discovery Across 90k+ Growth Nodes
           </p>
        </div>

        <div className="flex items-center space-x-3">
           <button className="flex items-center space-x-2 px-6 py-2.5 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20">
              <Network size={14} />
              <span>Full Graph Audit</span>
           </button>
        </div>
      </section>

      {/* Crawl Hub Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
         {[
           { label: "Orphaned Pages", value: "142", sub: "Priority: High", icon: Unlink, color: "text-rose-500 bg-rose-50" },
           { label: "Broken Links", value: "24", sub: "SLA Compliant", icon: XOctagon, color: "text-amber-500 bg-amber-50" },
           { label: "Link Yield", value: "12.4x", sub: "Avg per Page", icon: Share2, color: "text-primary bg-primary/5" },
           { label: "Discovery Rate", value: "98.8%", sub: "Optimal Path", icon: Zap, color: "text-emerald-500 bg-emerald-50" }
         ].map((s, i) => (
           <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm relative group hover:shadow-md transition-all cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                 <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center transition-all group-hover:scale-110 shadow-sm border border-gray-100/50", s.color)}>
                    <s.icon size={18} />
                 </div>
                 <span className="text-[8px] font-black text-secondary/20 uppercase tracking-widest leading-none">{s.sub}</span>
              </div>
              <p className="text-3xl font-black text-typography tracking-tighter leading-none mb-1.5">{s.value}</p>
              <p className="text-[9px] font-black text-secondary/30 uppercase tracking-widest leading-none">{s.label}</p>
              
              {s.label === 'Orphaned Pages' && (
                 <div className="absolute top-2 right-2 flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse" />
                 </div>
              )}
           </div>
         ))}
      </div>

      <div className="grid grid-cols-12 gap-4">
         {/* Cluster Health Matrix */}
         <div className="col-span-12 lg:col-span-8 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/30">
               <div>
                  <h3 className="text-xs font-black text-typography uppercase tracking-widest">Internal Equity Matrix</h3>
                  <p className="text-[9px] font-black text-secondary/20 uppercase tracking-widest mt-1">Balancing Density & Discovery Across Clusters</p>
               </div>
               <button className="w-8 h-8 flex items-center justify-center bg-white rounded-lg border border-gray-100 text-secondary/30 hover:text-primary transition-all shadow-sm group">
                  <ArrowUpRight size={14} className="group-hover:scale-110" />
               </button>
            </div>
            <div className="overflow-x-auto">
               <table className="w-full text-left">
                  <thead className="bg-gray-50/50 border-b border-gray-100">
                     <tr>
                        <th className="px-4 py-3 text-[9px] font-black uppercase tracking-widest text-secondary/40">Growth Cluster</th>
                        <th className="px-4 py-3 text-[9px] font-black uppercase tracking-widest text-secondary/40">Avg Inbound</th>
                        <th className="px-4 py-3 text-[9px] font-black uppercase tracking-widest text-secondary/40">Avg Outbound</th>
                        <th className="px-4 py-3 text-[9px] font-black uppercase tracking-widest text-secondary/40 text-center">Nodes</th>
                        <th className="px-4 py-3 text-[9px] font-black uppercase tracking-widest text-secondary/40 text-right">Action</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {stats.map((s) => (
                      <tr key={s.id} className="group hover:bg-gray-50/50 transition-all">
                        <td className="px-4 py-3">
                           <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-secondary/10 group-hover:bg-primary/5 group-hover:text-primary transition-all shadow-inner border border-gray-100">
                                 <Layers size={18} />
                              </div>
                              <h4 className="text-[11px] font-black text-typography leading-tight uppercase truncate max-w-[120px]">{s.category}</h4>
                           </div>
                        </td>
                        <td className="px-4 py-3">
                           <p className="text-base font-black text-typography leading-none">{(s.inLinks / s.pages).toFixed(1)}x</p>
                           <p className="text-[7px] font-black text-emerald-500 uppercase mt-0.5 tracking-tight">Ideal</p>
                        </td>
                        <td className="px-4 py-3">
                           <p className="text-base font-black text-typography leading-none">{(s.outLinks / s.pages).toFixed(1)}x</p>
                           <p className="text-[7px] font-black text-secondary/20 uppercase mt-0.5 tracking-tight">Discovery</p>
                        </td>
                        <td className="px-4 py-3 text-center text-[10px] font-black text-secondary/30">
                           {s.pages.toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-right">
                           <button className="px-4 py-1.5 bg-white border border-gray-100 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-sm">
                              Audit
                           </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
               </table>
            </div>
         </div>

         {/* Link Opportunity Engine */}
         <div className="col-span-12 lg:col-span-4 space-y-4">
            <section className="bg-slate-900 p-5 rounded-xl text-white shadow-lg relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-1000">
                  <Sparkles size={80} className="text-primary" />
               </div>
               <div className="relative z-10">
                  <h4 className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-6">AI Opportunity Engine</h4>
                  <div className="space-y-3">
                     {[
                        { from: "IIT Delhi", to: "DTU Delhi", score: 98, type: "Geo Link" },
                        { from: "JEE Mains", to: "B.Tech Guide", score: 94, type: "Flow Link" },
                        { from: "BITS Fee", to: "Scholarships", score: 88, type: "Topic Link" }
                     ].map((o, i) => (
                        <div key={i} className="p-3 bg-white/5 rounded-xl border border-white/5 hover:border-primary/30 transition-all cursor-pointer group/o">
                           <div className="flex items-center justify-between mb-2">
                              <span className="text-[7px] font-black text-slate-500 uppercase tracking-widest">{o.type}</span>
                              <span className="text-[8px] font-black text-emerald-500">+{o.score}% Boost</span>
                           </div>
                           <div className="flex items-center space-x-2 text-white min-w-0">
                              <p className="text-[9px] font-black uppercase truncate flex-1">{o.from}</p>
                              <ArrowRight size={10} className="text-slate-500 flex-shrink-0" />
                              <p className="text-[9px] font-black uppercase truncate flex-1">{o.to}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
               <button className="mt-8 w-full py-3 bg-primary text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-primary/20 relative z-10">
                  Inject Opportunities
               </button>
            </section>

            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm space-y-4 group hover:shadow-md transition-all cursor-pointer">
               <Activity size={24} className="text-secondary/10 group-hover:text-primary transition-colors" />
               <div>
                  <p className="text-[8px] font-black text-secondary/30 uppercase tracking-widest mb-1">Equity Index (LEI)</p>
                  <h4 className="text-base font-black text-typography uppercase tracking-tight leading-none mb-2">Graph Centrality: 84.4</h4>
                  <p className="text-[9px] font-black text-secondary/40 leading-relaxed uppercase opacity-60">
                    High interconnectivity detected. Authority distribution optimized across programmatic nodes.
                  </p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
