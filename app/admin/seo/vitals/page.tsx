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
    <div className="space-y-10">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-6 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-2">
              <div className="bg-primary/5 px-3 py-1.5 rounded-xl border border-primary/10">
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary italic lowercase underline decoration-primary/10">Page Experience API</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30">Core Web Vitals Tracker</span>
           </div>
           <h1 className="text-5xl font-black text-typography tracking-tighter leading-none mb-1">
             Performance <span className="text-primary italic">Vitals</span>
           </h1>
           <p className="text-secondary/40 text-sm font-bold uppercase tracking-widest mt-2">
              Measuring Field Data & Real-User Metrics (RUM) for Ranking Dominance
           </p>
        </div>

        <div className="flex items-center space-x-4 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm">
           <button 
             onClick={() => setDevice('mobile')}
             className={cn("flex items-center space-x-2 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all", device === 'mobile' ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-secondary/40 hover:text-secondary")}
           >
              <Smartphone size={16} />
              <span>Mobile First</span>
           </button>
           <button 
             onClick={() => setDevice('desktop')}
             className={cn("flex items-center space-x-2 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all", device === 'desktop' ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-secondary/40 hover:text-secondary")}
           >
              <Monitor size={16} />
              <span>Desktop View</span>
           </button>
        </div>
      </section>

      {/* Vitals Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         {[
           { label: "LCP (Loading Speed)", value: "1.8s", sub: "P75 Aggregate Avg.", icon: Zap, color: "text-emerald-500", range: "Goal: < 2.5s" },
           { label: "INP (Responsiveness)", value: "142ms", sub: "Total Blocking Time", icon: MousePointer2, color: "text-emerald-500", range: "Goal: < 200ms" },
           { label: "CLS (Visual Stability)", value: "0.04", sub: "Layout Shift Cumulative", icon: LayoutGrid, color: "text-emerald-500", range: "Goal: < 0.1" },
         ].map((s, i) => (
           <div key={i} className="bg-white p-10 rounded-[3rem] border border-gray-50 shadow-sm group hover:border-primary/20 transition-all cursor-pointer overflow-hidden relative">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
                 <s.icon size={48} className={s.color} />
              </div>
              <div className="flex items-center justify-between mb-6 italic">
                 <div className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[9px] font-black rounded-full border border-emerald-100">PASSING</div>
                 <span className="text-[9px] font-black text-secondary/20 uppercase tracking-widest">{s.range}</span>
              </div>
              <p className="text-5xl font-black text-typography tracking-tighter capitalize leading-none mb-2">{s.value}</p>
              <p className="text-[11px] font-black text-secondary/40 uppercase tracking-widest italic">{s.label}</p>
              <div className="mt-8 flex items-center space-x-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                 <span className="text-[9px] font-black text-emerald-500 uppercase italic underline decoration-emerald-200">{s.sub}</span>
              </div>
           </div>
         ))}
      </div>

      <div className="grid grid-cols-12 gap-10">
         {/* Detail Matrix */}
         <div className="col-span-12 lg:col-span-8 bg-white rounded-[3rem] border border-gray-50 shadow-sm overflow-hidden flex flex-col">
            <div className="p-10 border-b border-gray-50 flex items-center justify-between bg-snow-pearl/30">
               <div>
                  <h3 className="text-xl font-black text-typography tracking-tighter italic lowercase underline decoration-primary/10 select-none">Experience Matrix per Page Type</h3>
                  <p className="text-[10px] font-bold text-secondary/30 uppercase tracking-[0.2em] mt-2 italic select-none">Field Data Collected from Actual User Sessions (90 Days)</p>
               </div>
               <div className="flex items-center space-x-2">
                  <button className="p-4 bg-white rounded-2xl border border-gray-100 text-secondary/40 hover:text-primary transition-all shadow-sm group" title="Download Report">
                     <ArrowUpRight size={18} className="group-hover:scale-110 transition-all" />
                  </button>
               </div>
            </div>
            <div className="overflow-x-auto">
               <table className="w-full text-left italic">
                  <thead className="bg-snow-pearl/50 border-b border-gray-100">
                     <tr>
                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Growth Node Cluster</th>
                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">LCP (P75)</th>
                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">INP (P75)</th>
                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">CLS (Cumulative)</th>
                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40 text-right">Interrupt</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {vitals.map((v) => (
                      <tr key={v.id} className="group hover:bg-snow-pearl/30 transition-all">
                        <td className="px-10 py-8">
                           <div className="flex items-center space-x-6">
                              <div className={cn(
                                 "w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-inner",
                                 v.status === 'GOOD' ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                              )}>
                                 {v.status === 'GOOD' ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
                              </div>
                              <h4 className="text-sm font-black text-typography leading-tight uppercase tracking-tight">{v.category}</h4>
                           </div>
                        </td>
                        <td className="px-10 py-8">
                           <p className={cn("text-lg font-black tracking-tighter", getStatusColor(v.lcp, 'LCP'))}>{v.lcp}s</p>
                           <p className="text-[8px] font-bold text-secondary/20 uppercase tracking-widest italic leading-none mt-1">Goal: &lt; 2.5s</p>
                        </td>
                        <td className="px-10 py-8">
                           <p className={cn("text-lg font-black tracking-tighter", getStatusColor(v.inp, 'INP'))}>{v.inp}ms</p>
                           <p className="text-[8px] font-bold text-secondary/20 uppercase tracking-widest italic leading-none mt-1">Goal: &lt; 200ms</p>
                        </td>
                        <td className="px-10 py-8">
                           <p className={cn("text-lg font-black tracking-tighter", getStatusColor(v.cls, 'CLS'))}>{v.cls}</p>
                           <p className="text-[8px] font-bold text-secondary/20 uppercase tracking-widest italic leading-none mt-1">Goal: &lt; 0.1s</p>
                        </td>
                        <td className="px-10 py-8 text-right">
                           <button className="px-6 py-2 bg-white border border-gray-100 rounded-xl text-[10px] font-black uppercase tracking-widest hover:border-primary/20 hover:text-primary transition-all shadow-sm">
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
         <div className="col-span-12 lg:col-span-4 space-y-8">
            <section className="bg-slate-900 p-10 rounded-[3rem] text-white flex flex-col justify-between relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                  <ShieldAlert size={100} className="text-rose-500" />
               </div>
               <div className="relative z-10">
                  <h4 className="text-sm font-black text-slate-500 uppercase tracking-widest mb-10 italic underline decoration-rose-500/20">Critical Fix Queue (CWV POOR)</h4>
                  <div className="space-y-6">
                     {[
                        { url: "/search/engineering-colleges-pan-india", impact: "42k Reach", p: 72 },
                        { url: "/listing/top-mbbs-pune", impact: "14k Reach", p: 48 },
                        { url: "/career-path/cse-future", impact: "8k Reach", p: 32 }
                     ].map((p, i) => (
                        <div key={i} className="flex items-center justify-between p-6 bg-white/5 rounded-3xl border border-white/5 hover:border-rose-500/30 transition-all group/p cursor-pointer">
                           <div className="flex-1 min-w-0">
                              <p className="text-[11px] font-black text-white truncate italic lowercase mb-1 underline decoration-rose-500/20">{p.url}</p>
                              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{p.impact} Impacted</span>
                           </div>
                           <div className="ml-6 text-right">
                              <p className="text-lg font-black text-rose-500 tracking-tighter">Poor</p>
                              <div className="w-12 h-1 bg-white/10 rounded-full mt-1 overflow-hidden">
                                 <div className="h-full bg-rose-500" style={{ width: `${p.p}%` }} />
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
               <button className="mt-14 w-full py-4 bg-rose-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-700 transition-all shadow-xl shadow-rose-600/10 relative z-10">
                  Run Global Lighthouse Audit
               </button>
            </section>

            <div className="bg-white p-10 rounded-[3rem] border border-gray-50 shadow-sm space-y-6 group hover:border-primary/20 transition-all cursor-pointer">
               <ActivitySquare size={28} className="text-secondary/10 group-hover:text-primary transition-colors" />
               <p className="text-[10px] font-black text-secondary/30 uppercase tracking-widest mb-1 italic">Real User Health (CrUX)</p>
               <h4 className="text-xl font-black text-typography uppercase tracking-tight font-black leading-tight italic lowercase">92% Compliance Rate</h4>
               <p className="text-[10px] font-bold text-secondary/40 leading-relaxed mt-2 uppercase tracking-widest italic decoration-emerald-500/10 underline">Platform is exceeding Google's Recommended Experience Benchmarks for 90k+ nodes.</p>
            </div>
         </div>
      </div>
    </div>
  );
}
