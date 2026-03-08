"use client";

import { useState } from "react";
import { 
  Database, 
  Search, 
  Filter, 
  ChevronRight, 
  Activity, 
  Zap, 
  RefreshCw, 
  CheckCircle2, 
  Trash2, 
  TrendingUp, 
  ArrowUpRight, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  Layers, 
  CloudRain, 
  HardDrive, 
  MousePointer2 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CacheQuery {
  id: string;
  pattern: string;
  hits: number;
  ttl: string;
  size: string;
}

export default function RedisCacheAnalytics() {
  const [queries] = useState<CacheQuery[]>([
    { id: "C1", pattern: "Engineering colleges in Maharashtra under 2 lakh", hits: 14202, ttl: "2h 14m", size: "4.2 KB" },
    { id: "C2", pattern: "Top medical colleges in Delhi with NEET cutoff", hits: 8402, ttl: "5h 42m", size: "3.8 KB" },
    { id: "C3", pattern: "JEE Advanced 2026 eligibility criteria expert guide", hits: 6204, ttl: "12h 20m", size: "2.5 KB" },
    { id: "C4", pattern: "Best government colleges for CSE in Bangalore", hits: 4102, ttl: "1h 04m", size: "5.1 KB" },
  ]);

  return (
    <div className="space-y-10 font-sans italic">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-6 border-b border-gray-100 italic">
        <div>
           <div className="flex items-center space-x-3 mb-2 italic">
              <div className="bg-primary/5 px-3 py-1.5 rounded-xl border border-primary/10">
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary italic lowercase underline decoration-primary/10">Inference Proxy Cache v4.2</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30">Redis Infrastructure & Yield Monitor</span>
           </div>
           <h1 className="text-5xl font-black text-typography tracking-tighter leading-none mb-1">
             Cache <span className="text-primary italic">Intelligence</span>
           </h1>
           <p className="text-secondary/40 text-sm font-bold uppercase tracking-widest mt-2">
              Optimizing Response Persistence & Protecting VPS RAM for 1M+ Monthly Queries
           </p>
        </div>

        <div className="flex items-center space-x-4">
           <button className="flex items-center space-x-3 px-8 py-4 bg-rose-50 text-rose-600 border border-rose-100 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-rose-600 hover:text-white transition-all shadow-xl shadow-rose-500/10 group">
              <Trash2 size={18} />
              <span>Flush Global AI Cache</span>
           </button>
           <button className="p-4 bg-white border border-gray-100 rounded-2xl text-secondary/40 hover:text-primary transition-all shadow-sm">
              <RefreshCw size={20} />
           </button>
        </div>
      </section>

      {/* Cache Yield Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
         {[
            { label: "Cache Hit Rate", value: "68.4%", sub: "+4.2% Growth", icon: Sparkles, color: "text-emerald-500 bg-emerald-50", trend: "+4.2%" },
            { label: "Ollama Calls Saved", value: "84,202", sub: "Last 30 Days", icon: Zap, color: "text-primary bg-primary/5", trend: "+12.4%" },
            { label: "Redis Memory Use", value: "1.24 GB", sub: "LRU Eviction Active", icon: HardDrive, color: "text-indigo-500 bg-indigo-50", trend: "Stable" },
            { label: "Response Speedup", value: "98.2%", sub: "vs Local Inference", icon: MousePointer2, color: "text-amber-500 bg-amber-50", trend: "Peak" }
         ].map((s, i) => (
           <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-50 shadow-sm relative group hover:border-primary/20 transition-all cursor-pointer overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
                 <s.icon size={48} className={s.color} />
              </div>
              <p className="text-4xl font-black text-typography tracking-tighter capitalize leading-none mb-1 italic">{s.value}</p>
              <p className="text-[10px] font-bold text-secondary/30 uppercase tracking-widest italic">{s.label}</p>
              <div className="mt-6 flex items-center space-x-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                 <span className="text-[9px] font-black text-emerald-500 uppercase italic underline decoration-emerald-200">{s.sub}</span>
              </div>
           </div>
         ))}
      </div>

      <div className="grid grid-cols-12 gap-10">
         {/* Top Cached Patterns */}
         <div className="col-span-12 lg:col-span-8 bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col italic">
            <div className="p-10 border-b border-gray-100 flex items-center justify-between bg-snow-pearl/30 border-gray-100">
               <div className="flex items-center space-x-6">
                  <div className="w-14 h-14 bg-indigo-500 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-500/20">
                     <Layers size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-typography tracking-tighter italic lowercase underline decoration-indigo-500/10 select-none">Contextual Query Hot-List</h3>
                    <p className="text-[10px] font-black text-secondary/30 uppercase tracking-[0.2em] mt-1 italic select-none">Top 20 Frequently Cached Semantic Pattern Fragments</p>
                  </div>
               </div>
               <div className="relative">
                  <Search size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-secondary/20" />
                  <input placeholder="Search cache patterns..." className="w-64 bg-white border border-gray-100 pl-14 pr-6 py-3 rounded-2xl text-[12px] font-bold outline-none focus:ring-4 focus:ring-primary/5 transition-all shadow-sm" />
               </div>
            </div>
            <div className="overflow-x-auto">
               <table className="w-full text-left italic">
                  <thead className="bg-snow-pearl/50 border-b border-gray-100 italic">
                     <tr>
                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Query Pattern Descriptor</th>
                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Absolute Hits</th>
                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Persistence TTL</th>
                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40 text-center">Data Footprint</th>
                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40 text-right">Commit</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {queries.map((q) => (
                      <tr key={q.id} className="group hover:bg-snow-pearl/30 transition-all">
                        <td className="px-10 py-8">
                           <div className="flex items-center space-x-6">
                              <div className="w-12 h-12 bg-snow-pearl rounded-2xl flex items-center justify-center text-secondary/10 group-hover:bg-primary/5 group-hover:text-primary transition-all shadow-inner">
                                 <Database size={22} />
                              </div>
                              <h4 className="text-[13px] font-black text-typography leading-tight lowercase underline decoration-secondary/10 tracking-tight truncate w-[250px]">"{q.pattern}"</h4>
                           </div>
                        </td>
                        <td className="px-10 py-8">
                           <p className="text-lg font-black text-typography tracking-tighter">{q.hits.toLocaleString()}</p>
                           <p className="text-[9px] font-bold text-emerald-500 uppercase italic">High Yield Yield</p>
                        </td>
                        <td className="px-10 py-8">
                           <div className="flex items-center space-x-2 text-[12px] font-bold text-typography italic">
                              <Clock size={14} className="text-secondary/20" />
                              <span>{q.ttl}</span>
                           </div>
                        </td>
                        <td className="px-10 py-8 text-center text-[13px] font-black text-secondary/40">
                           {q.size}
                        </td>
                        <td className="px-10 py-8 text-right">
                           <button className="p-4 bg-white border border-gray-100 rounded-2xl hover:bg-rose-500 hover:text-white transition-all shadow-sm group/btn" title="Evict Key">
                              <Trash2 size={18} />
                           </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
               </table>
            </div>
            <div className="p-10 border-t border-gray-50 italic text-center text-secondary/20 text-[9px] font-black uppercase tracking-widest bg-snow-pearl/10">
               * Inference Cache Cluster: Redis-v7.2 Cluster Mode Enabled • Multi-DC Mirroring Disabled
            </div>
         </div>

         {/* Memory Intelligence Sidebar */}
         <div className="col-span-12 lg:col-span-4 space-y-8 italic">
            <section className="bg-slate-900 p-10 rounded-[3rem] text-white flex flex-col justify-between relative overflow-hidden group min-h-[450px]">
               <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-1000">
                  <CloudRain size={160} className="text-primary" />
               </div>
               <div className="relative z-10">
                  <h4 className="text-sm font-black text-slate-500 uppercase tracking-widest mb-10 italic underline decoration-primary/20">Eviction Intelligence</h4>
                  <div className="space-y-10">
                    {[
                      { label: "Volatile LRU (AI Cache)", val: 92, count: "840k keys" },
                      { label: "Persistent User State", val: 14, count: "12k keys" },
                      { label: "Institutional Fragments", val: 48, count: "42k keys" }
                    ].map((m, i) => (
                      <div key={i} className="space-y-3">
                         <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-widest italic">
                            <span className="text-slate-500">{m.label} <span className="text-slate-700 not-italic ml-2">{m.count}</span></span>
                            <span className="text-primary">{m.val}% Capacity</span>
                         </div>
                         <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/5 shadow-inner">
                            <div className={cn("h-full transition-all group-hover:scale-x-105 duration-1000 origin-left", m.val > 90 ? "bg-primary shadow-[0_0_15px_rgba(59,130,246,0.3)]" : "bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]")} style={{ width: `${m.val}%` }} />
                         </div>
                      </div>
                    ))}
                  </div>
               </div>
               <div className="mt-14 pt-10 border-t border-slate-800 relative z-10 flex items-center justify-between">
                  <div>
                    <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest italic leading-none mb-1">Global TTL Extension</p>
                    <p className="text-[11px] font-black text-slate-400 tracking-tight italic lowercase underline decoration-primary/10">Dynamic TTL Scaling Enabled (High Traffic)</p>
                  </div>
                  <ShieldCheck size={24} className="text-primary animate-pulse" />
               </div>
            </section>

            <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm space-y-6 group hover:border-primary/20 transition-all cursor-pointer">
               <Activity size={28} className="text-secondary/10 group-hover:text-primary transition-colors" />
               <p className="text-[10px] font-black text-secondary/30 uppercase tracking-widest mb-1 italic">Total Cache Efficiency</p>
               <h4 className="text-xl font-black text-typography uppercase tracking-tight leading-tight italic lowercase">8.4M Tokens Preserved</h4>
               <p className="text-[10px] font-bold text-secondary/40 leading-relaxed mt-2 uppercase tracking-widest italic decoration-primary/10 underline">The platform successfully minimizes inference costs by reusing high-confidence semantic fragments for repeating student segments.</p>
            </div>
         </div>
      </div>
    </div>
  );
}
