"use client";

import { useState } from "react";
import { 
  BarChart3, 
  Search, 
  Filter, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle, 
  ShieldAlert, 
  Zap, 
  RefreshCw, 
  Eye, 
  Globe, 
  MousePointer2,
  TrendingUp,
  Activity,
  LayoutGrid,
  Sparkles,
  Link
} from "lucide-react";
import { cn } from "@/lib/utils";

interface IndexStatus {
  id: string;
  category: string;
  count: number;
  status: 'INDEXED' | 'CRAWLED' | 'DISCOVERED' | 'EXCLUDED' | 'ERROR';
  trend: number;
  color: string;
}

interface ErroredPage {
  url: string;
  error: string;
  impact: number; // monthly traffic
  type: '404' | 'REDIRECT_CHAIN' | 'DUPLICATE';
}

export default function ProgrammaticPageHealth() {
  const [stats] = useState<IndexStatus[]>([
    { id: "S1", category: "Validly Indexed", count: 72402, status: 'INDEXED', trend: 4.2, color: "text-emerald-500 bg-emerald-50" },
    { id: "S2", category: "Crawled (Not Indexed)", count: 12104, status: 'CRAWLED', trend: -1.4, color: "text-indigo-500 bg-indigo-50" },
    { id: "S3", category: "Discovered (Not Crawled)", count: 4802, status: 'DISCOVERED', trend: 12.8, color: "text-amber-500 bg-amber-50" },
    { id: "S4", category: "Excluded (Canonical)", count: 620, status: 'EXCLUDED', trend: 0.2, color: "text-slate-500 bg-slate-100" },
    { id: "S5", category: "Indexing Errors", count: 142, status: 'ERROR', trend: -24.2, color: "text-rose-500 bg-rose-50" }
  ]);

  const [errors] = useState<ErroredPage[]>([
    { url: "/college/delhi-technological-university-dtu", error: "404 - Page Deleted", impact: 1420, type: '404' },
    { url: "/engineering-colleges/delhi", error: "Duplicate Content Flagged", impact: 840, type: 'DUPLICATE' },
    { url: "/exam/jee-mains/dates", error: "Redirect Chain > 3", impact: 420, type: 'REDIRECT_CHAIN' },
  ]);

  return (
    <div className="space-y-6 font-montserrat pb-10">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-4 md:space-y-0 pb-4 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-1.5">
              <div className="bg-primary/5 px-2.5 py-1 rounded-lg border border-primary/10">
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary">GSC Intel</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30 uppercase tracking-widest text-[10px]">Indexing Monitor</span>
           </div>
           <h1 className="text-3xl font-black text-typography tracking-tighter leading-none mb-1">
             Indexing <span className="text-primary italic">Health</span>
           </h1>
           <p className="text-secondary/40 text-[10px] font-black uppercase tracking-[0.2em] mt-1.5 leading-none">
              Auditing 90k+ Page Fragments Across Search Console
           </p>
        </div>

        <div className="flex items-center space-x-3">
           <button className="flex items-center space-x-2 px-6 py-2.5 bg-white border border-gray-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:border-primary/20 transition-all text-secondary/40">
              <RefreshCw size={14} />
              <span>Full GSC Refresh</span>
           </button>
           <button className="flex items-center space-x-2 px-6 py-2.5 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20">
              <Sparkles size={14} />
              <span>Fix Priority Errors</span>
           </button>
        </div>
      </section>

      {/* Indexing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
         {stats.map((s) => (
           <div key={s.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm relative group hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-4">
                 <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center transition-all group-hover:scale-110 shadow-sm border border-gray-100", s.color)}>
                    <Globe size={18} />
                 </div>
                 <div className={cn("flex items-center space-x-1 text-[8px] font-black uppercase tracking-widest", s.trend > 0 ? "text-emerald-500" : "text-rose-500")}>
                    {s.trend > 0 ? <TrendingUp size={10} /> : <TrendingUp size={10} className="rotate-180" />}
                    <span>{Math.abs(s.trend)}%</span>
                 </div>
              </div>
              <p className="text-3xl font-black text-typography tracking-tighter leading-none mb-1.5">{s.count.toLocaleString()}</p>
              <p className="text-[9px] font-black text-secondary/30 uppercase tracking-widest leading-none truncate">{s.category}</p>
              
              {s.status === 'ERROR' && (
                 <div className="absolute top-2 right-2">
                    <div className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse" />
                 </div>
              )}
           </div>
         ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         {/* Critical Errors List */}
         <section className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
            <div className="p-4 border-b border-gray-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-rose-50/10">
               <div>
                  <h3 className="text-xs font-black text-typography uppercase tracking-widest">Top Critical Violations</h3>
                  <p className="text-[9px] font-black text-secondary/20 uppercase tracking-widest mt-1">Ranked by Traffic/Authority Impact</p>
               </div>
               <button className="w-8 h-8 flex items-center justify-center bg-white border border-rose-100 rounded-lg text-rose-500 hover:bg-rose-500 hover:text-white transition-all shadow-sm">
                  <ShieldAlert size={16} />
               </button>
            </div>
            <div className="divide-y divide-gray-50 flex-1">
               {errors.map((err, i) => (
                  <div key={i} className="p-4 group hover:bg-gray-50/50 transition-all flex items-center justify-between">
                     <div className="flex items-center space-x-4 min-w-0">
                        <div className={cn(
                           "w-10 h-10 rounded-lg flex items-center justify-center transition-all shadow-sm border border-gray-100 flex-shrink-0 text-[10px] font-black",
                           err.type === '404' ? "bg-rose-50 text-rose-500" : err.type === 'DUPLICATE' ? "bg-amber-50 text-amber-500" : "bg-indigo-50 text-indigo-500"
                        )}>
                           {err.type === '404' ? '404' : err.type === 'DUPLICATE' ? <LayoutGrid size={16} /> : <RefreshCw size={16} />}
                        </div>
                        <div className="min-w-0">
                           <h4 className="text-[11px] font-black text-typography leading-tight lowercase truncate underline decoration-gray-100">{err.url}</h4>
                           <span className="text-[8px] font-black text-rose-500 uppercase tracking-widest mt-1 block truncate opacity-70">{err.error}</span>
                        </div>
                     </div>
                     <div className="text-right flex-shrink-0 ml-4">
                        <p className="text-base font-black text-typography tracking-tighter leading-none">{err.impact.toLocaleString()}</p>
                        <p className="text-[7px] font-black text-secondary/20 uppercase tracking-widest mt-1">Monthly PV Lost</p>
                     </div>
                  </div>
               ))}
            </div>
            <button className="p-3 bg-gray-50/50 border-t border-gray-100 text-[9px] font-black text-primary uppercase tracking-widest hover:bg-gray-100 transition-all">Explore all 142 instances</button>
         </section>

         {/* Visual Indexing Distribution */}
         <section className="bg-slate-900 p-6 rounded-xl text-white flex flex-col justify-between relative overflow-hidden group shadow-lg">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
               <Zap size={80} className="text-primary" />
            </div>
            <div className="relative z-10 w-full">
               <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Auto-Generated Node Coverage</h4>
               <div className="space-y-6">
                  {[
                     { label: "College Profiles", val: 98.4, total: "34k pages" },
                     { label: "City+Course Combos", val: 84.2, total: "12k pages" },
                     { label: "Exam Guides", val: 92.8, total: "2k pages" },
                     { label: "Article Repository", val: 72.4, total: "42k pages" }
                  ].map((cat, i) => (
                     <div key={i} className="space-y-2">
                        <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-widest">
                           <span className="truncate pr-4">{cat.label} <span className="text-slate-500 text-[8px] ml-1">{cat.total}</span></span>
                           <span className={cn("flex-shrink-0", cat.val > 90 ? "text-emerald-500" : "text-amber-500")}>{cat.val}%</span>
                        </div>
                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                           <div className={cn("h-full transition-all group-hover:scale-x-105 duration-1000 origin-left shadow-lg", cat.val > 90 ? "bg-emerald-500" : "bg-primary")} style={{ width: `${cat.val}%` }} />
                        </div>
                     </div>
                  ))}
               </div>
            </div>
            <div className="mt-10 pt-6 border-t border-slate-800 flex items-center justify-between text-[8px] font-black uppercase tracking-widest text-slate-500 relative z-10">
               <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="truncate">Sitemap Generated: 14 mins ago</span>
               </div>
               <button className="text-primary hover:underline flex-shrink-0 pl-4">Regen Now</button>
            </div>
         </section>
      </div>

      {/* Manual Request Terminal */}
      <section className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-8">
         <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-primary shadow-sm border border-gray-100 flex-shrink-0"><Zap size={20} /></div>
         <div className="flex-1 min-w-0">
            <h4 className="text-sm font-black text-typography uppercase tracking-tighter">Manual Indexing Accelerator</h4>
            <p className="text-[9px] font-black text-secondary/20 uppercase tracking-widest mt-1">Submit high-priority new collections directly to Google</p>
         </div>
         <div className="flex items-center space-x-2 bg-gray-50/50 p-1.5 rounded-lg border border-gray-100 max-w-sm w-full">
            <input placeholder="Paste URL..." className="bg-transparent border-0 pl-2 py-1.5 text-[10px] font-bold outline-none flex-1 text-typography" />
            <button className="px-5 py-2 bg-primary text-white rounded-md text-[8px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-sm">Audit</button>
         </div>
      </section>
    </div>
  );
}
