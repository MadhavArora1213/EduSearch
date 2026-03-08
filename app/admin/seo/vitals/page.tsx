"use client";

import { useState } from "react";
import { 
  BarChart3, 
  Smartphone, 
  Monitor, 
  ChevronRight, 
  Zap, 
  Activity, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ShieldAlert, 
  Search, 
  Filter, 
  ArrowUpRight, 
  LayoutGrid, 
  ActivitySquare,
  Sparkles,
  MousePointer2,
  TrendingUp,
  ExternalLink
} from "lucide-react";
import { cn } from "@/lib/utils";

interface VitalsMetric {
  id: string;
  category: string;
  lcp: number;
  inp: number;
  cls: number;
  status: 'GOOD' | 'NEEDS_IMPROVEMENT' | 'POOR';
}

export default function CoreWebVitalsTracker() {
  const [device, setDevice] = useState<'mobile' | 'desktop'>('mobile');

  const vitals: VitalsMetric[] = [
    { id: "V1", category: "College Profiles", lcp: 1.4, inp: 120, cls: 0.04, status: 'GOOD' },
    { id: "V2", category: "Exam Intelligence", lcp: 2.1, inp: 184, cls: 0.08, status: 'GOOD' },
    { id: "V3", category: "Programmatic Search", lcp: 3.8, inp: 340, cls: 0.12, status: 'POOR' },
    { id: "V4", category: "Article Landing", lcp: 1.8, inp: 142, cls: 0.02, status: 'GOOD' },
  ];

  const getStatusColor = (val: number, type: 'LCP' | 'INP' | 'CLS') => {
    if (type === 'LCP') return val < 2.5 ? "text-emerald-500" : val < 4.0 ? "text-amber-500" : "text-rose-500";
    if (type === 'INP') return val < 200 ? "text-emerald-500" : val < 500 ? "text-amber-500" : "text-rose-500";
    if (type === 'CLS') return val < 0.1 ? "text-emerald-500" : val < 0.25 ? "text-amber-500" : "text-rose-500";
    return "";
  };

  return (
    <div className="space-y-6 font-montserrat pb-10">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-4 md:space-y-0 pb-4 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-1.5">
              <div className="bg-primary/5 px-2.5 py-1 rounded-lg border border-primary/10">
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary">Web Core</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30 uppercase tracking-widest text-[10px]">UX Performance</span>
           </div>
           <h1 className="text-3xl font-black text-typography tracking-tighter leading-none mb-1">
             Performance <span className="text-primary italic">Vitals</span>
           </h1>
           <p className="text-secondary/40 text-[10px] font-black uppercase tracking-[0.2em] mt-1.5 leading-none">
              Measuring Field Data & RUM for Ranking Dominance
           </p>
        </div>

        <div className="flex items-center space-x-2 bg-gray-50 p-1 rounded-xl border border-gray-200/50 shadow-sm">
           <button 
             onClick={() => setDevice('mobile')}
             className={cn("flex items-center space-x-2 px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all", device === 'mobile' ? "bg-white text-primary border border-gray-100 shadow-sm" : "text-secondary/40 hover:text-secondary")}
           >
              <Smartphone size={14} />
              <span>Mobile</span>
           </button>
           <button 
             onClick={() => setDevice('desktop')}
             className={cn("flex items-center space-x-2 px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all", device === 'desktop' ? "bg-white text-primary border border-gray-100 shadow-sm" : "text-secondary/40 hover:text-secondary")}
           >
              <Monitor size={14} />
              <span>Desktop</span>
           </button>
        </div>
      </section>

      {/* Vitals Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
         {[
           { label: "LCP (Loading)", value: "1.8s", sub: "P75 Aggregate Avg.", icon: Zap, color: "text-emerald-500", range: "Goal: < 2.5s" },
           { label: "INP (Latency)", value: "142ms", sub: "Total Blocking Time", icon: MousePointer2, color: "text-emerald-500", range: "Goal: < 200ms" },
           { label: "CLS (Stability)", value: "0.04", sub: "Layout Shift Sum", icon: LayoutGrid, color: "text-emerald-500", range: "Goal: < 0.1" },
         ].map((s, i) => (
           <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm group hover:shadow-md transition-all cursor-pointer overflow-hidden relative">
              <div className="absolute top-0 right-0 p-3 opacity-5 group-hover:scale-110 transition-transform">
                 <s.icon size={40} className={s.color} />
              </div>
              <div className="flex items-center justify-between mb-4">
                 <div className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[8px] font-black rounded-md border border-emerald-100">PASSING</div>
                 <span className="text-[8px] font-black text-secondary/20 uppercase tracking-widest">{s.range}</span>
              </div>
              <p className="text-4xl font-black text-typography tracking-tighter leading-none mb-1.5">{s.value}</p>
              <p className="text-[10px] font-black text-secondary/30 uppercase tracking-widest leading-none truncate">{s.label}</p>
              <div className="mt-6 flex items-center space-x-1.5">
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                 <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">{s.sub}</span>
              </div>
           </div>
         ))}
      </div>

      <div className="grid grid-cols-12 gap-4">
         {/* Detail Matrix */}
         <div className="col-span-12 lg:col-span-8 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
            <div className="p-4 border-b border-gray-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-gray-50/30">
               <div>
                  <h3 className="text-xs font-black text-typography uppercase tracking-widest">Experience Matrix per Page Type</h3>
                  <p className="text-[9px] font-black text-secondary/20 uppercase tracking-widest mt-1">Field Data Collected from Actual User Sessions (90 Days)</p>
               </div>
               <div className="flex items-center space-x-2">
                  <button className="w-8 h-8 bg-white rounded-lg border border-gray-100 text-secondary/40 hover:text-primary transition-all shadow-sm flex items-center justify-center" title="Export">
                     <ArrowUpRight size={14} />
                  </button>
               </div>
            </div>
            <div className="overflow-x-auto">
               <table className="w-full text-left">
                  <thead className="bg-gray-50/50 border-b border-gray-100">
                     <tr>
                        <th className="px-4 py-3 text-[9px] font-black uppercase tracking-widest text-secondary/40">Node Cluster</th>
                        <th className="px-4 py-3 text-[9px] font-black uppercase tracking-widest text-secondary/40">LCP (P75)</th>
                        <th className="px-4 py-3 text-[9px] font-black uppercase tracking-widest text-secondary/40">INP (P75)</th>
                        <th className="px-4 py-3 text-[9px] font-black uppercase tracking-widest text-secondary/40">CLS (Sum)</th>
                        <th className="px-4 py-3 text-[9px] font-black uppercase tracking-widest text-secondary/40 text-right">Ops</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 font-montserrat">
                    {vitals.map((v) => (
                      <tr key={v.id} className="group hover:bg-gray-50/50 transition-all">
                        <td className="px-4 py-3">
                           <div className="flex items-center space-x-3">
                              <div className={cn(
                                 "w-10 h-10 rounded-lg flex items-center justify-center transition-all shadow-sm border border-gray-100",
                                 v.status === 'GOOD' ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                              )}>
                                 {v.status === 'GOOD' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                              </div>
                              <h4 className="text-xs font-black text-typography leading-tight uppercase tracking-tight">{v.category}</h4>
                           </div>
                        </td>
                        <td className="px-4 py-3">
                           <p className={cn("text-lg font-black tracking-tighter leading-none", getStatusColor(v.lcp, 'LCP'))}>{v.lcp}s</p>
                           <p className="text-[8px] font-black text-secondary/20 uppercase tracking-widest mt-1">Goal: &lt; 2.5s</p>
                        </td>
                        <td className="px-4 py-3">
                           <p className={cn("text-lg font-black tracking-tighter leading-none", getStatusColor(v.inp, 'INP'))}>{v.inp}ms</p>
                           <p className="text-[8px] font-black text-secondary/20 uppercase tracking-widest mt-1">Goal: &lt; 200ms</p>
                        </td>
                        <td className="px-4 py-3">
                           <p className={cn("text-lg font-black tracking-tighter leading-none", getStatusColor(v.cls, 'CLS'))}>{v.cls}</p>
                           <p className="text-[8px] font-black text-secondary/20 uppercase tracking-widest mt-1">Goal: &lt; 0.1s</p>
                        </td>
                        <td className="px-4 py-3 text-right">
                           <button className="px-3 py-1.5 bg-white border border-gray-100 rounded-lg text-[8px] font-black uppercase tracking-widest hover:border-primary/20 hover:text-primary transition-all shadow-sm">
                              Fix Template
                           </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
               </table>
            </div>
         </div>

         {/* Poor Pages Feed */}
         <div className="col-span-12 lg:col-span-4 space-y-4">
            <section className="bg-slate-900 p-4 rounded-xl text-white flex flex-col justify-between relative overflow-hidden group shadow-lg">
               <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
                  <ShieldAlert size={80} className="text-rose-500" />
               </div>
               <div className="relative z-10">
                  <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Critical Fix Queue (CWV POOR)</h4>
                  <div className="space-y-3">
                     {[
                        { url: "/search/engineering-colleges-pan-india", impact: "42k Reach", p: 72 },
                        { url: "/listing/top-mbbs-pune", impact: "14k Reach", p: 48 },
                        { url: "/career-path/cse-future", impact: "8k Reach", p: 32 }
                     ].map((p, i) => (
                        <div key={i} className="flex items-center justify-between p-3.5 bg-white/5 rounded-xl border border-white/5 hover:border-rose-500/20 transition-all group/p cursor-pointer shadow-inner">
                           <div className="flex-1 min-w-0">
                              <p className="text-[10px] font-bold text-white truncate lowercase mb-1 underline decoration-white/10">{p.url}</p>
                              <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">{p.impact}</span>
                           </div>
                           <div className="ml-4 text-right leading-none">
                              <p className="text-xs font-black text-rose-500 uppercase">Poor</p>
                              <div className="w-10 h-0.5 bg-white/10 rounded-full mt-1.5 overflow-hidden">
                                 <div className="h-full bg-rose-500" style={{ width: `${p.p}%` }} />
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
               <button className="mt-8 w-full py-3 bg-rose-600 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-rose-700 transition-all shadow-lg shadow-rose-600/10 relative z-10">
                  Run Global Audit
               </button>
            </section>

            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm space-y-3 group hover:border-primary/20 transition-all cursor-pointer">
               <ActivitySquare size={20} className="text-secondary/10 group-hover:text-primary transition-colors" />
               <p className="text-[8px] font-black text-secondary/20 uppercase tracking-widest mb-1 leading-none">Real User Health (CrUX)</p>
               <h4 className="text-sm font-black text-typography uppercase tracking-tight leading-none truncate">92% Compliance Rate</h4>
               <p className="text-[9px] font-black text-secondary/40 leading-relaxed mt-2 uppercase tracking-widest opacity-60">
                 Platform is exceeding Google's Experience Benchmarks for 90k+ nodes.
               </p>
            </div>
         </div>
      </div>
    </div>
  );
}
