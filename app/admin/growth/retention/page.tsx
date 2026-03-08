"use client";

import { useState } from "react";
import { 
  Users, 
  Calendar, 
  ChevronRight, 
  Download, 
  Filter, 
  ArrowUpRight, 
  Target, 
  Database, 
  Zap, 
  Sparkles,
  MousePointer2,
  TrendingUp,
  History,
  HardDrive
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Cohort Data
const cohortData = [
  { week: 'Feb 02', size: 12400, retention: [100, 34, 28, 22, 18, 15, 12, 10] },
  { week: 'Feb 09', size: 13200, retention: [100, 36, 30, 24, 20, 17, 14] },
  { week: 'Feb 16', size: 11800, retention: [100, 38, 32, 26, 22, 19] },
  { week: 'Feb 23', size: 14500, retention: [100, 42, 35, 29, 24] },
  { week: 'Mar 02', size: 15100, retention: [100, 45, 38, 31] },
  { week: 'Mar 09', size: 16200, retention: [100, 48, 41] },
  { week: 'Mar 16', size: 17800, retention: [100, 52] },
];

export default function CohortRetentionPage() {
  const [segment, setSegment] = useState<'ALL' | 'AI_USERS' | 'ORGANIC'>('ALL');

  const getHeatmapColor = (value: number) => {
    if (value === 100) return 'bg-snow-pearl text-secondary/40';
    if (value >= 50) return 'bg-emerald-500 text-white';
    if (value >= 40) return 'bg-emerald-400 text-white';
    if (value >= 30) return 'bg-emerald-300 text-white';
    if (value >= 25) return 'bg-emerald-200 text-emerald-900 font-black';
    if (value >= 20) return 'bg-emerald-100 text-emerald-800 font-extrabold';
    if (value >= 15) return 'bg-emerald-50 text-emerald-700 font-bold';
    return 'bg-white text-secondary/20';
  };

  return (
    <div className="space-y-6 font-montserrat">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-4 border-b border-gray-100 italic font-montserrat not-italic">
        <div>
           <div className="flex items-center space-x-3 mb-1.5 font-montserrat">
              <div className="bg-primary/5 px-3 py-1.5 rounded-xl border border-primary/10">
                 <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary lowercase">Retention Lab</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30 uppercase tracking-widest text-[10px]">Stickiness Matrix</span>
           </div>
           <h1 className="text-3xl md:text-4xl font-black text-typography tracking-tighter leading-none mb-1">
             Cohort <span className="text-primary italic">Retention</span>
           </h1>
           <p className="text-secondary/40 text-[10px] font-black uppercase tracking-[0.2em] mt-1.5 leading-none">
              Monitoring Weekly User Cycles & Value Capture
           </p>
        </div>

        <div className="flex items-center space-x-3">
           <div className="flex items-center space-x-1 bg-white p-1 rounded-xl border border-gray-100 shadow-sm">
              {[
                { id: 'ALL', label: 'All Traffic', icon: Users },
                { id: 'AI_USERS', label: 'AI Counselor', icon: Sparkles },
                { id: 'ORGANIC', label: 'Organic SEO', icon: TrendingUp }
              ].map(s => (
                <button 
                  key={s.id}
                  onClick={() => setSegment(s.id as any)}
                  className={cn(
                    "flex items-center space-x-2 px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all",
                    segment === s.id ? "bg-primary text-white shadow-md shadow-primary/20" : "text-secondary/30 hover:text-secondary"
                  )}
                >
                  <s.icon size={12} />
                  <span>{s.label}</span>
                </button>
              ))}
           </div>
           <button className="w-9 h-9 bg-white border border-gray-100 rounded-xl flex items-center justify-center text-secondary/40 hover:text-primary transition-all shadow-sm">
              <Download size={14} />
           </button>
        </div>
      </section>

      <div className="grid grid-cols-12 gap-6 font-montserrat not-italic">
         {/* Main Retention Matrix */}
         <div className="col-span-12 lg:col-span-9 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
            <div className="p-5 border-b border-gray-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-snow-pearl/30">
               <div>
                  <h3 className="text-sm font-black text-typography tracking-tight uppercase">Acquisition Cohorts</h3>
                  <p className="text-[9px] font-black text-secondary/30 uppercase tracking-[0.2em] mt-1.5">Target: W1 &gt; 35% Retention • Current: 38.2%</p>
               </div>
               <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-lg border border-emerald-100 text-[9px] font-black uppercase tracking-widest">
                  <div className="flex items-center space-x-2 bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-xl border border-emerald-100 text-[9px] font-black uppercase tracking-widest">
                     <Zap size={12} />
                     <span>Healthy Stickiness</span>
                  </div>
               </div>
            </div>

            <div className="overflow-x-auto">
               <table className="w-full text-center border-collapse">
                  <thead className="bg-snow-pearl/50 border-b border-gray-100">
                     <tr>
                        <th className="px-6 py-3 text-[9px] font-black uppercase tracking-[0.2em] text-secondary/40 text-left border-r border-gray-100">Week</th>
                        <th className="px-6 py-3 text-[9px] font-black uppercase tracking-[0.2em] text-secondary/40 border-r border-gray-100">Size</th>
                        {[...Array(8)].map((_, i) => (
                          <th key={i} className="px-6 py-3 text-[9px] font-black uppercase tracking-[0.2em] text-secondary/40">W {i}</th>
                        ))}
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                     {cohortData.map((cohort, i) => (
                        <tr key={i} className="group hover:bg-snow-pearl/30 transition-all">
                           <td className="px-6 py-3 text-left border-r border-gray-100">
                               <h4 className="text-[13px] font-black text-typography leading-none uppercase tracking-tight">{cohort.week}</h4>
                           </td>
                           <td className="px-6 py-3 border-r border-gray-100">
                               <span className="text-[12px] font-black text-typography">{cohort.size.toLocaleString()}</span>
                           </td>
                           {[...Array(8)].map((_, j) => {
                             const val = cohort.retention[j];
                             return (
                               <td key={j} className="p-0.5 min-w-[80px]">
                                  {val !== undefined ? (
                                    <div className={cn(
                                       "w-full h-full min-h-[36px] flex items-center justify-center rounded-lg text-[10px] font-black transition-all",
                                       getHeatmapColor(val)
                                    )}>
                                       {val}%
                                    </div>
                                  ) : (
                                    <div className="w-full h-full min-h-[36px] bg-snow-pearl/10 border border-snow-pearl/20 rounded-lg" />
                                  )}
                               </td>
                             );
                           })}
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
         {/* Insights: Feature Impact */}
         <div className="col-span-12 lg:col-span-3 space-y-4">
            <div className="bg-slate-900 p-5 rounded-xl text-white flex flex-col justify-between relative group h-full overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform duration-1000">
                  <Sparkles size={80} className="text-primary" />
               </div>
               <div className="relative z-10 flex-1">
                  <h4 className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-6">Stickiness Factors</h4>
                  <div className="space-y-6">
                     <div className="space-y-2">
                        <div className="flex items-center space-x-3">
                           <div className="w-9 h-9 bg-primary/20 rounded-lg flex items-center justify-center text-primary border border-primary/10">
                              <Zap size={18} />
                           </div>
                           <div>
                              <p className="text-[11px] font-black text-white uppercase tracking-tight">AI Counselor</p>
                              <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mt-1">+340% W4 Impact</p>
                           </div>
                        </div>
                        <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                           <div className="h-full bg-emerald-500 w-[92%]" />
                          </div>
                     </div>
 
                     <div className="space-y-2">
                        <div className="flex items-center space-x-3">
                           <div className="w-9 h-9 bg-indigo-500/20 rounded-lg flex items-center justify-center text-indigo-400 border border-indigo-500/10">
                              <Target size={18} />
                           </div>
                           <div>
                              <p className="text-[11px] font-black text-white uppercase tracking-tight">Geo-Alerts</p>
                              <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mt-1">+120% Lift</p>
                           </div>
                        </div>
                        <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                           <div className="h-full bg-indigo-500 w-[45%]" />
                          </div>
                     </div>
                  </div>
               </div>
               <div className="mt-8 relative z-10">
                  <button className="w-full py-3.5 bg-white text-slate-900 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-lg">
                     Export Analysis
                  </button>
               </div>
            </div>
         </div>
      </div>


      {/* DPDP Compliance Notice (Context Specific) */}
      <section className="bg-snow-pearl/30 p-4 rounded-xl border border-gray-100 flex items-center justify-between font-montserrat not-italic">
         <div className="flex items-center space-x-4">
            <History size={16} className="text-secondary/20" />
            <p className="text-[9px] font-bold text-secondary/40 tracking-[0.1em] uppercase">Anonymized Cohorts • Compliance Node Active</p>
         </div>
         <p className="text-[9px] font-black text-secondary/20 uppercase tracking-widest">Calculated Today 18:00 UTC</p>
      </section>
    </div>
  );
}
