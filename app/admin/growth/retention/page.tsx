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
    <div className="space-y-10 font-sans italic">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-6 border-b border-gray-100 italic font-sans not-italic">
        <div>
           <div className="flex items-center space-x-3 mb-2">
              <div className="bg-primary/5 px-3 py-1.5 rounded-xl border border-primary/10">
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary italic lowercase underline decoration-primary/10">Retention Lab</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30">LTV & Stickiness Matrix</span>
           </div>
           <h1 className="text-5xl font-black text-typography tracking-tighter leading-none mb-1">
             Cohort <span className="text-primary italic">Retention</span>
           </h1>
           <p className="text-secondary/40 text-sm font-bold uppercase tracking-widest mt-2">
              Monitoring Weekly User Cycles & Feature Impact on Value Capture
           </p>
        </div>

        <div className="flex items-center space-x-4">
           <div className="flex items-center space-x-2 bg-white p-1.5 rounded-2xl border border-gray-100 shadow-sm">
              {[
                { id: 'ALL', label: 'All Traffic', icon: Users },
                { id: 'AI_USERS', label: 'AI Counselor', icon: Sparkles },
                { id: 'ORGANIC', label: 'Organic SEO', icon: TrendingUp }
              ].map(s => (
                <button 
                  key={s.id}
                  onClick={() => setSegment(s.id as any)}
                  className={cn(
                    "flex items-center space-x-2 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                    segment === s.id ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-secondary/30 hover:text-secondary"
                  )}
                >
                  <s.icon size={14} />
                  <span>{s.label}</span>
                </button>
              ))}
           </div>
           <button className="p-4 bg-white border border-gray-100 rounded-2xl text-secondary/20 hover:text-primary transition-all shadow-sm">
              <Download size={20} />
           </button>
        </div>
      </section>

      <div className="grid grid-cols-12 gap-10 font-sans not-italic">
         {/* Main Retention Matrix */}
         <div className="col-span-12 lg:col-span-9 bg-white rounded-[3rem] border border-gray-50 shadow-sm overflow-hidden flex flex-col">
            <div className="p-10 border-b border-gray-50 flex items-center justify-between bg-snow-pearl/30">
               <div>
                  <h3 className="text-xl font-black text-typography tracking-tighter italic lowercase underline decoration-primary/10 select-none">Weekly Acquisition Cohorts</h3>
                  <p className="text-[10px] font-black text-secondary/30 uppercase tracking-[0.2em] mt-2 italic select-none">Target: W1 &gt; 35% Retention • Current: 38.2%</p>
               </div>
               <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl border border-emerald-100 text-[10px] font-black uppercase tracking-widest">
                     <Zap size={14} />
                     <span>Healthy Stickiness</span>
                  </div>
               </div>
            </div>

            <div className="overflow-x-auto">
               <table className="w-full text-center border-collapse">
                  <thead className="bg-snow-pearl/50 border-b border-gray-100">
                     <tr>
                        <th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-secondary/40 text-left border-r border-gray-100">Acquisition Week</th>
                        <th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-secondary/40 border-r border-gray-100">Size</th>
                        {[...Array(8)].map((_, i) => (
                          <th key={i} className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-secondary/40">Week {i}</th>
                        ))}
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                     {cohortData.map((cohort, i) => (
                        <tr key={i} className="group hover:bg-snow-pearl/30 transition-all">
                           <td className="px-10 py-10 text-left border-r border-gray-100">
                              <h4 className="text-sm font-black text-typography leading-none">{cohort.week}</h4>
                              <p className="text-[9px] font-bold text-secondary/20 uppercase tracking-widest mt-1">Cohort Cycle</p>
                           </td>
                           <td className="px-10 py-10 border-r border-gray-100">
                              <span className="text-[14px] font-black text-typography italic">{cohort.size.toLocaleString()}</span>
                           </td>
                           {[...Array(8)].map((_, j) => {
                             const val = cohort.retention[j];
                             return (
                               <td key={j} className="p-0.5 min-w-[100px]">
                                  {val !== undefined ? (
                                    <div className={cn(
                                       "w-full h-full min-h-[50px] flex items-center justify-center rounded-xl text-xs font-black transition-all",
                                       getHeatmapColor(val)
                                    )}>
                                       {val}%
                                    </div>
                                  ) : (
                                    <div className="w-full h-full min-h-[50px] bg-snow-pearl/10 border border-snow-pearl/20 rounded-xl" />
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
         <div className="col-span-12 lg:col-span-3 space-y-8">
            <div className="bg-slate-900 p-10 rounded-[3rem] text-white flex flex-col justify-between relative group h-full overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-1000">
                  <Sparkles size={100} className="text-primary" />
               </div>
               <div className="relative z-10 flex-1">
                  <h4 className="text-sm font-black text-slate-500 uppercase tracking-widest mb-10 italic underline decoration-primary/30">Stickiness Multipliers</h4>
                  <div className="space-y-10 flex flex-col h-full">
                     <div className="space-y-4">
                        <div className="flex items-center space-x-4 mb-6">
                           <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center text-primary shadow-inner">
                              <Zap size={22} />
                           </div>
                           <div>
                              <p className="text-[12px] font-black text-white italic tracking-tight">AI Counselor Effect</p>
                              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">+340% W4 Impact</p>
                           </div>
                        </div>
                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                           <div className="h-full bg-emerald-500 w-[92%]" />
                         </div>
                     </div>

                     <div className="space-y-4">
                        <div className="flex items-center space-x-4 mb-6">
                           <div className="w-12 h-12 bg-indigo-500/20 rounded-2xl flex items-center justify-center text-indigo-400 shadow-inner">
                              <Target size={22} />
                           </div>
                           <div>
                              <p className="text-[12px] font-black text-white italic tracking-tight">Personalized Alerts</p>
                              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">+120% Retention Lift</p>
                           </div>
                        </div>
                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                           <div className="h-full bg-indigo-500 w-[45%]" />
                         </div>
                     </div>
                  </div>
               </div>
               <div className="mt-14 relative z-10">
                  <button className="w-full py-5 bg-white text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-primary/10 italic">
                     Generate Retention Memo
                  </button>
               </div>
            </div>
         </div>
      </div>

      {/* DPDP Compliance Notice (Context Specific) */}
      <section className="bg-snow-pearl/30 p-10 rounded-[2.5rem] border border-gray-100 flex items-center justify-between font-sans not-italic">
         <div className="flex items-center space-x-6">
            <History size={20} className="text-secondary/20" />
            <p className="text-[11px] font-bold text-secondary/40 tracking-widest uppercase italic">Cohort snapshots are anonymized per DPDP Act standards • No PII is shared in growth node analytics</p>
         </div>
         <p className="text-[9px] font-black text-secondary/20 uppercase tracking-widest">Next Re-calculation: Today 18:00 UTC</p>
      </section>
    </div>
  );
}
