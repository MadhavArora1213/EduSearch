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
    { id: "S4", category: "Excluded (Canonical/Noindex)", count: 620, status: 'EXCLUDED', trend: 0.2, color: "text-slate-500 bg-slate-100" },
    { id: "S5", category: "Indexing Errors", count: 142, status: 'ERROR', trend: -24.2, color: "text-rose-500 bg-rose-50" }
  ]);

  const [errors] = useState<ErroredPage[]>([
    { url: "/college/delhi-technological-university-dtu", error: "404 - Page Deleted", impact: 1420, type: '404' },
    { url: "/engineering-colleges/delhi", error: "Duplicate Content Flagged", impact: 840, type: 'DUPLICATE' },
    { url: "/exam/jee-mains/dates", error: "Redirect Chain > 3", impact: 420, type: 'REDIRECT_CHAIN' },
  ]);

  return (
    <div className="space-y-10">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-6 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-2">
              <div className="bg-primary/5 px-3 py-1.5 rounded-xl border border-primary/10">
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary italic lowercase underline decoration-primary/10">GSC API Integration</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30">Programmatic Indexing Monitor</span>
           </div>
           <h1 className="text-5xl font-black text-typography tracking-tighter leading-none mb-1">
             Indexing <span className="text-primary italic">Health</span>
           </h1>
           <p className="text-secondary/40 text-sm font-bold uppercase tracking-widest mt-2">
              Auditing 90,000+ Page Fragments Across Google Search Console
           </p>
        </div>

        <div className="flex items-center space-x-4">
           <button className="flex items-center space-x-2 px-8 py-4 bg-white border border-gray-200 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:border-primary/20 transition-all text-secondary/40">
              <RefreshCw size={18} />
              <span>Full GSC Refresh</span>
           </button>
           <button className="flex items-center space-x-2 px-8 py-4 bg-primary text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20">
              <Sparkles size={18} />
              <span>Fix Priority Errors</span>
           </button>
        </div>
      </section>

      {/* Indexing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
         {stats.map((s) => (
           <div key={s.id} className="bg-white p-6 rounded-[2.5rem] border border-gray-50 shadow-sm relative group hover:border-primary/20 transition-all">
              <div className="flex items-center justify-between mb-4">
                 <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110", s.color)}>
                    <Globe size={20} />
                 </div>
                 <div className={cn("flex items-center space-x-1 text-[9px] font-black uppercase tracking-widest", s.trend > 0 ? "text-emerald-500" : "text-rose-500")}>
                    {s.trend > 0 ? <TrendingUp size={12} /> : <TrendingUp size={12} className="rotate-180" />}
                    <span>{Math.abs(s.trend)}%</span>
                 </div>
              </div>
              <p className="text-3xl font-black text-typography tracking-tighter capitalize leading-none">{s.count.toLocaleString()}</p>
              <p className="text-[10px] font-bold text-secondary/30 uppercase tracking-widest mt-1 italic">{s.category}</p>
              
              {s.status === 'ERROR' && (
                 <div className="absolute top-0 right-0 p-4">
                    <div className="w-2 h-2 bg-rose-500 rounded-full animate-ping" />
                 </div>
              )}
           </div>
         ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
         {/* Critical Errors List */}
         <section className="bg-white rounded-[3rem] border border-gray-50 shadow-sm overflow-hidden flex flex-col">
            <div className="p-10 border-b border-gray-50 flex items-center justify-between bg-rose-50/10 border-rose-100/20">
               <div>
                  <h3 className="text-xl font-black text-typography tracking-tighter italic lowercase underline decoration-rose-500/20 capitalize">Top Critical Violations</h3>
                  <p className="text-[10px] font-bold text-secondary/30 uppercase tracking-[0.2em] mt-2 italic capitalize">Ranked by Monthly Traffic/Authority Impact</p>
               </div>
               <button className="p-4 bg-white border border-rose-100 rounded-2xl text-rose-500 hover:bg-rose-500 hover:text-white transition-all shadow-sm">
                  <ShieldAlert size={20} />
               </button>
            </div>
            <div className="divide-y divide-gray-50">
               {errors.map((err, i) => (
                  <div key={i} className="p-8 group hover:bg-snow-pearl/30 transition-all flex items-center justify-between">
                     <div className="flex items-center space-x-6">
                        <div className={cn(
                           "w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-inner italic",
                           err.type === '404' ? "bg-rose-50 text-rose-500" : err.type === 'DUPLICATE' ? "bg-amber-50 text-amber-500" : "bg-indigo-50 text-indigo-500"
                        )}>
                           {err.type === '404' ? '404' : err.type === 'DUPLICATE' ? <LayoutGrid size={20} /> : <RefreshCw size={20} />}
                        </div>
                        <div>
                           <h4 className="text-[13px] font-black text-typography tracking-tight lowercase truncate w-[250px] italic decoration-secondary/10 underline">{err.url}</h4>
                           <span className="text-[9px] font-black text-rose-500 uppercase tracking-widest mt-1">{err.error}</span>
                        </div>
                     </div>
                     <div className="text-right">
                        <p className="text-lg font-black text-typography tracking-tighter">{err.impact.toLocaleString()}</p>
                        <p className="text-[8px] font-bold text-secondary/30 uppercase tracking-widest italic leading-none">Monthly PV Lost</p>
                     </div>
                  </div>
               ))}
            </div>
            <button className="p-8 border-t border-gray-50 text-[10px] font-black text-primary uppercase tracking-widest hover:bg-snow-pearl transition-all">Explore all 142 instances</button>
         </section>

         {/* Visual Indexing Distribution */}
         <section className="bg-slate-900 p-10 rounded-[3rem] text-white flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
               <Zap size={100} className="text-primary" />
            </div>
            <div className="relative z-10">
               <h4 className="text-sm font-black text-slate-500 uppercase tracking-widest mb-10 italic underline decoration-primary/30">Auto-Generated Node Coverage</h4>
               <div className="space-y-8">
                  {[
                     { label: "College Profiles", val: 98.4, total: "34k pages" },
                     { label: "City+Course Combos", val: 84.2, total: "12k pages" },
                     { label: "Exam Guides", val: 92.8, total: "2k pages" },
                     { label: "Article Repository", val: 72.4, total: "42k pages" }
                  ].map((cat, i) => (
                     <div key={i} className="space-y-3 italic">
                        <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-widest">
                           <span>{cat.label} <span className="text-slate-500 text-[9px] not-italic ml-2">{cat.total}</span></span>
                           <span className={cn(cat.val > 90 ? "text-emerald-500" : "text-amber-500")}>{cat.val}% INDEXED</span>
                        </div>
                        <div className="h-2 bg-white/5 rounded-full overflow-hidden shadow-inner border border-white/5">
                           <div className={cn("h-full transition-all group-hover:scale-x-105 duration-1000 origin-left", cat.val > 90 ? "bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]" : "bg-primary shadow-[0_0_15px_rgba(59,130,246,0.3)]")} style={{ width: `${cat.val}%` }} />
                        </div>
                     </div>
                  ))}
               </div>
            </div>
            <div className="mt-14 pt-10 border-t border-slate-800 flex items-center justify-between text-[9px] font-black uppercase tracking-widest text-slate-500 relative z-10">
               <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                  <span>Programmatic Sitemap Generated: 14 mins ago</span>
               </div>
               <button className="text-primary hover:underline italic">Regenerate Sitemap Now</button>
            </div>
         </section>
      </div>

      {/* Manual Request Terminal */}
      <section className="bg-white p-10 rounded-[3rem] border border-gray-50 shadow-sm flex flex-col md:flex-row md:items-center space-y-6 md:space-y-0 md:space-x-10 italic">
         <div className="w-14 h-14 bg-snow-pearl rounded-2xl flex items-center justify-center text-primary shadow-sm ring-1 ring-gray-100"><Zap size={24} /></div>
         <div className="flex-1">
            <h4 className="text-lg font-black text-typography tracking-tighter uppercase italic">Manual Indexing Accelerator</h4>
            <p className="text-[10px] font-bold text-secondary/30 uppercase tracking-widest mt-1">Submit high-priority new collections directly to Google Search Console</p>
         </div>
         <div className="flex items-center space-x-4 bg-snow-pearl/50 p-2 rounded-2xl border border-gray-50 max-w-md w-full">
            <input placeholder="Paste absolute URL..." className="bg-transparent border-0 pl-4 py-3 text-[12px] font-bold outline-none flex-1" />
            <button className="px-6 py-3 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all">Submit to URL Inspection</button>
         </div>
      </section>
    </div>
  );
}
