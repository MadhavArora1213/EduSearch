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
  Sparkles
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
    { id: "L1", category: "College Profiles", inLinks: 420242, outLinks: 12402, pages: 34204 },
    { id: "L2", category: "Exam Guides", inLinks: 84022, outLinks: 4202, pages: 2102 },
    { id: "L3", category: "City Pages", inLinks: 124022, outLinks: 8402, pages: 12402 },
    { id: "L4", category: "Article Flow", inLinks: 24202, outLinks: 42022, pages: 42100 },
  ]);

  return (
    <div className="space-y-10">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-6 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-2">
              <div className="bg-primary/5 px-3 py-1.5 rounded-xl border border-primary/10">
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary italic lowercase underline decoration-primary/10">Authority Flow Control</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30">Programmatic Internal Link Manager</span>
           </div>
           <h1 className="text-3xl md:text-3xl md:text-5xl font-black text-typography tracking-tighter leading-none mb-1">
             Link <span className="text-primary italic">Intelligence</span>
           </h1>
           <p className="text-secondary/40 text-sm font-bold uppercase tracking-widest mt-2">
              Maximizing Page Discovery & Authority Distribution Across 90k+ Nodes
           </p>
        </div>

        <div className="flex items-center space-x-4">
           <button className="flex items-center space-x-2 px-8 py-4 bg-primary text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20">
              <Network size={18} />
              <span>Full Graph Audit</span>
           </button>
        </div>
      </section>

      {/* Crawl Hub Metrics */}
      <div className="grid grid-cols-4 gap-8">
         {[
           { label: "Orphaned Pages", value: "142", sub: "Priority: Critical", icon: Unlink, color: "text-rose-500 bg-rose-50" },
           { label: "Broken Links", value: "24", sub: "SLA Compliant", icon: XOctagon, color: "text-amber-500 bg-amber-50" },
           { label: "Link Yield", value: "12.4x", sub: "Avg per Page", icon: Share2, color: "text-primary bg-primary/5" },
           { label: "Discovery Rate", value: "98.8%", sub: "Optimal Pathing", icon: Zap, color: "text-emerald-500 bg-emerald-50" }
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
              
              {s.label === 'Orphaned Pages' && (
                 <div className="absolute top-0 right-0 p-4">
                    <div className="w-2 h-2 bg-rose-500 rounded-full animate-ping" />
                 </div>
              )}
           </div>
         ))}
      </div>

      <div className="grid grid-cols-12 gap-10">
         {/* Cluster Health Matrix */}
         <div className="col-span-12 lg:col-span-8 bg-white rounded-[3rem] border border-gray-50 shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 md:p-10 border-b border-gray-50 flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-snow-pearl/30">
               <div>
                  <h3 className="text-xl font-black text-typography tracking-tighter italic lowercase underline decoration-primary/10 select-none">Internal Equity Distribution</h3>
                  <p className="text-[10px] font-bold text-secondary/30 uppercase tracking-[0.2em] mt-1 italic select-none">Balancing Inbound Density & Outbound Discovery Across Clusters</p>
               </div>
               <div className="flex items-center space-x-2">
                  <button className="p-4 bg-white rounded-2xl border border-gray-100 text-secondary/40 hover:text-primary transition-all shadow-sm group" title="Download Authority Map">
                     <ArrowUpRight size={18} className="group-hover:scale-110 transition-all" />
                  </button>
               </div>
            </div>
            <div className="overflow-x-auto">
               <table className="w-full text-left italic">
                  <thead className="bg-snow-pearl/50 border-b border-gray-100">
                     <tr>
                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Growth Node Cluster</th>
                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Average Inbound Links</th>
                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Average Outbound Links</th>
                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40 text-center">Page Count</th>
                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40 text-right">Commit</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {stats.map((s) => (
                      <tr key={s.id} className="group hover:bg-snow-pearl/30 transition-all">
                        <td className="px-10 py-8">
                           <div className="flex items-center space-x-6">
                              <div className="w-12 h-12 bg-snow-pearl rounded-2xl flex items-center justify-center text-secondary/10 group-hover:bg-primary/5 group-hover:text-primary transition-all shadow-inner relative">
                                 <Layers size={22} />
                              </div>
                              <h4 className="text-sm font-black text-typography leading-tight uppercase tracking-tight">{s.category}</h4>
                           </div>
                        </td>
                        <td className="px-10 py-8">
                           <p className="text-lg font-black text-typography tracking-tighter">{(s.inLinks / s.pages).toFixed(1)}x</p>
                           <p className="text-[9px] font-black text-emerald-500 uppercase italic">Ideal Frequency</p>
                        </td>
                        <td className="px-10 py-8">
                           <p className="text-lg font-black text-typography tracking-tighter">{(s.outLinks / s.pages).toFixed(1)}x</p>
                           <p className="text-[9px] font-black text-secondary/20 uppercase italic">Discovery Vector</p>
                        </td>
                        <td className="px-10 py-8 text-center text-[13px] font-black text-secondary/40">
                           {s.pages.toLocaleString()}
                        </td>
                        <td className="px-10 py-8 text-right">
                           <button className="px-6 py-2 bg-white border border-gray-100 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-sm">
                              Audit Cluster
                           </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
               </table>
            </div>
         </div>

         {/* Link Opportunity Engine */}
         <div className="col-span-12 lg:col-span-4 space-y-8">
            <section className="bg-slate-900 p-10 rounded-[3rem] text-white flex flex-col justify-between relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-1000">
                  <Sparkles size={100} className="text-primary" />
               </div>
               <div className="relative z-10">
                  <h4 className="text-sm font-black text-slate-500 uppercase tracking-widest mb-10 italic underline decoration-primary/20">AI Opportunity Engine</h4>
                  <div className="space-y-6">
                     {[
                        { from: "IIT Delhi Profile", to: "DTU Delhi", score: 98, type: "Same Geo Link" },
                        { from: "JEE Mains Exam", to: "B.Tech Guide", score: 94, type: "Next Step Link" },
                        { from: "BITS Pilani Fee", to: "Scholarships", score: 88, type: "Affordability Link" }
                     ].map((o, i) => (
                        <div key={i} className="p-6 bg-white/5 rounded-3xl border border-white/5 hover:border-primary/30 transition-all cursor-pointer group/o">
                           <div className="flex items-center justify-between mb-4">
                              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest italic">{o.type}</span>
                              <span className="text-[10px] font-black text-emerald-500 italic lowercase decoration-emerald-500/20 underline">+{o.score}% Boost</span>
                           </div>
                           <div className="flex items-center space-x-3 text-white">
                              <p className="text-[11px] font-black uppercase truncate italic">{o.from}</p>
                              <ArrowRight size={12} className="text-slate-500 flex-shrink-0" />
                              <p className="text-[11px] font-black uppercase truncate italic">{o.to}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
               <button className="mt-14 w-full py-4 bg-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-primary/20 relative z-10 italic">
                  Inject Top 100 Opportunities
               </button>
            </section>

            <div className="bg-white p-10 rounded-[3rem] border border-gray-50 shadow-sm space-y-6 group hover:border-primary/20 transition-all cursor-pointer">
               <Activity size={28} className="text-secondary/10 group-hover:text-primary transition-colors" />
               <p className="text-[10px] font-black text-secondary/30 uppercase tracking-widest mb-1 italic">Link Equity Index (LEI)</p>
               <h4 className="text-xl font-black text-typography uppercase tracking-tight leading-tight italic lowercase">Graph Centralization: 84.4</h4>
               <p className="text-[10px] font-bold text-secondary/40 leading-relaxed mt-2 uppercase tracking-widest italic decoration-primary/10 underline">The platform maintains a highly interconnected graph preventing authority leakage from programmatic nodes.</p>
            </div>
         </div>
      </div>
    </div>
  );
}

function ArrowRight(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5l7 7-7 7" />
    </svg>
  );
}
