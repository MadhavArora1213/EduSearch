"use client";

import { useState } from "react";
import { 
  Filter, 
  Download, 
  ChevronRight, 
  Target, 
  ChevronDown, 
  Smartphone, 
  Layout, 
  Search, 
  Globe, 
  Users,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Zap,
  MousePointer2,
  BarChart3
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Funnel Data
const funnelStages = [
  { id: 'VISIT', label: 'Visit', count: 125000, nextLabel: 'Search', color: '#0B2447', percentage: 100 },
  { id: 'SEARCH', label: 'Search', count: 98000, nextLabel: 'Browse Profile', color: '#19376D', percentage: 78.4 },
  { id: 'PROFILE', label: 'Profile View', count: 62000, nextLabel: 'Initiate Inquiry', color: '#3B82F6', percentage: 63.2 },
  { id: 'ENQUIRE_CLICK', label: 'Enquire Click', count: 18500, nextLabel: 'Lead Submit', color: '#60A5FA', percentage: 29.8 },
  { id: 'LEAD', label: 'Lead Submitted', count: 14200, nextLabel: 'Auth Redirect', color: '#93C5FD', percentage: 76.7 },
  { id: 'ACCOUNT', label: 'Account Created', count: 12800, nextLabel: 'Apply Now', color: '#BFDBFE', percentage: 90.1 },
  { id: 'APPLY_START', label: 'Apply Started', count: 4200, nextLabel: 'Completion', color: '#10B981', percentage: 32.8 },
  { id: 'APPLY_FINISH', label: 'Application Done', count: 3100, nextLabel: 'Admission', color: '#059669', percentage: 73.8 },
  { id: 'ADMIT', label: 'Admitted', count: 450, nextLabel: 'End', color: '#047857', percentage: 14.5 },
];

const trafficSources = [
  { source: 'Organic Search', conversion: 4.8, count: 1240, color: 'text-primary' },
  { source: 'Direct Traffic', conversion: 5.2, count: 850, color: 'text-emerald-500' },
  { source: 'Paid Ads', conversion: 2.1, count: 420, color: 'text-rose-500' },
  { source: 'Social Media', conversion: 1.4, count: 180, color: 'text-amber-500' },
];

export default function ConversionFunnelPage() {
  const [device, setDevice] = useState<'ALL' | 'MOBILE' | 'DESKTOP'>('ALL');

  return (
    <div className="space-y-6 font-montserrat">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-4 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-1.5">
              <div className="bg-primary/5 px-3 py-1.5 rounded-xl border border-primary/10">
                 <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Funnel Ops</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30 uppercase tracking-widest text-[10px]">Path Intelligence</span>
           </div>
           <h1 className="text-3xl md:text-4xl font-black text-typography tracking-tighter leading-none mb-1">
             Full <span className="text-primary italic">Funnel</span>
           </h1>
           <p className="text-secondary/40 text-[10px] font-black uppercase tracking-[0.2em] mt-1.5 leading-none">
              Auditing Admission Drop-offs & UX Intent Clusters
           </p>
        </div>
 
        <div className="flex items-center space-x-3">
           <div className="flex items-center space-x-1 bg-white p-1 rounded-xl border border-gray-100 shadow-sm">
              <button 
                onClick={() => setDevice('ALL')}
                className={cn("w-8 h-8 rounded-lg flex items-center justify-center transition-all", device === 'ALL' ? "bg-primary text-white shadow-md shadow-primary/20" : "text-secondary/30 hover:text-secondary")}
                title="All Devices"
              >
                <Globe size={12} />
              </button>
              <button 
                onClick={() => setDevice('MOBILE')}
                className={cn("w-8 h-8 rounded-lg flex items-center justify-center transition-all", device === 'MOBILE' ? "bg-primary text-white shadow-md shadow-primary/20" : "text-secondary/30 hover:text-secondary")}
                title="Mobile Only"
              >
                <Smartphone size={12} />
              </button>
              <button 
                onClick={() => setDevice('DESKTOP')}
                className={cn("w-8 h-8 rounded-lg flex items-center justify-center transition-all", device === 'DESKTOP' ? "bg-primary text-white shadow-md shadow-primary/20" : "text-secondary/30 hover:text-secondary")}
                title="Desktop Only"
              >
                <Layout size={12} />
              </button>
           </div>
           <button className="flex items-center space-x-2 px-6 py-2.5 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-all shadow-lg active:scale-95 group">
              <Zap size={14} className="group-hover:rotate-12 transition-transform" />
              <span>Resolve Leaks</span>
           </button>
        </div>
      </section>

      <div className="grid grid-cols-12 gap-6 font-montserrat italic not-italic">
         {/* Funnel Visualization */}
         <div className="col-span-12 lg:col-span-9 bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex flex-col">
            <div className="flex justify-between items-center mb-6">
               <div>
                  <h3 className="text-xs font-black text-typography tracking-tighter uppercase">Enrollment Pipeline</h3>
                  <p className="text-[8px] font-black text-secondary/20 uppercase tracking-[0.1em] mt-1.5 leading-none">Traffic to Admission Workflow Clusters</p>
               </div>
               <div className="flex items-center space-x-2 px-2.5 py-1 bg-emerald-50 rounded-xl border border-emerald-100/50">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[8px] font-black text-emerald-700 uppercase tracking-widest">Live Flow</span>
               </div>
            </div>
 
            <div className="space-y-2">
               {funnelStages.map((stage, i) => {
                 const dropOff = i > 0 ? (funnelStages[i-1].count - stage.count) : 0;
                 const conversionFromPrev = i > 0 ? ((stage.count / funnelStages[i-1].count) * 100).toFixed(1) : 100;
  
                 return (
                   <div key={stage.id} className="group relative flex items-center">
                      {/* Drop-off visualization (left) */}
                      <div className="w-16 text-right pr-4">
                         {i > 0 && (
                           <div className="flex flex-col items-end leading-none">
                              <span className="text-[10px] font-black text-rose-500">-{dropOff.toLocaleString()}</span>
                              <span className="text-[6px] font-black text-secondary/10 uppercase tracking-widest mt-0.5">Leaked</span>
                           </div>
                         )}
                      </div>
  
                      {/* Funnel Bar */}
                      <div className="flex-1 relative h-8 bg-gray-50 rounded-xl overflow-hidden border border-gray-100 group-hover:border-primary/20 transition-all p-0.5 flex items-center">
                         <div 
                           className="h-full rounded-xl transition-all duration-1000 shadow-sm flex items-center px-4 relative overflow-hidden" 
                           style={{ width: `${stage.percentage}%`, backgroundColor: stage.color }}
                         >
                            <div className="absolute top-0 right-0 h-full w-12 bg-white/5 skew-x-[30deg] translate-x-6" />
                            <span className="text-[9px] font-black text-white uppercase tracking-widest whitespace-nowrap">{stage.label}</span>
                            <span className="ml-auto text-[10px] font-black text-white tracking-tighter">{stage.count.toLocaleString()}</span>
                         </div>
                      </div>
  
                      {/* Step Conversion (right) */}
                      <div className="w-20 pl-4 leading-none">
                         <div className="flex items-center space-x-1.5">
                            <span className={cn(
                               "text-[12px] font-black tracking-tighter",
                               i === 0 ? "text-secondary/10" : parseFloat(conversionFromPrev as string) < 30 ? "text-rose-500" : "text-emerald-500"
                            )}>{i === 0 ? 'START' : `${conversionFromPrev}%`}</span>
                            {i > 0 && parseFloat(conversionFromPrev as string) < 30 && <AlertCircle size={8} className="text-rose-500 animate-pulse" />}
                         </div>
                         {i > 0 && <p className="text-[6px] font-black text-secondary/20 uppercase tracking-widest mt-0.5">Retention</p>}
                      </div>
                   </div>
                 );
               })}
            </div>
         </div>

         {/* Sidebar: Source Context */}
         <div className="col-span-12 lg:col-span-3">
            <div className="bg-slate-900 p-4 rounded-xl text-white flex flex-col justify-between relative group h-full shadow-xl shadow-slate-900/10">
               <div className="absolute top-0 right-0 p-3 opacity-[0.03] group-hover:scale-110 transition-transform duration-1000">
                  <Target size={60} className="text-primary" />
               </div>
               <div className="relative z-10 flex-1">
                  <h4 className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 leading-none">Source Performance</h4>
                  <div className="space-y-4">
                     {trafficSources.map((s, i) => (
                        <div key={i} className="flex flex-col space-y-1 group/s">
                           <div className="flex justify-between items-end leading-none">
                              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest group-hover/s:text-white transition-colors">{s.source}</p>
                              <p className={cn("text-[13px] font-black tracking-tighter", s.color)}>{s.conversion}%</p>
                           </div>
                           <div className="w-full h-1 bg-slate-800/50 rounded-full overflow-hidden">
                              <div 
                                className={cn("h-full group-hover/s:opacity-100 transition-all duration-1000", s.color.replace('text-', 'bg-'))} 
                                style={{ width: `${s.conversion * 15}%` }} 
                              />
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
               <div className="mt-6 p-3 bg-white/5 rounded-lg border border-white/5">
                  <p className="text-[8px] font-bold text-slate-400 leading-relaxed uppercase tracking-widest">
                     Organic nodes yield 4.8x survival vs social clusters at Stage 4.
                  </p>
               </div>
            </div>
         </div>
      </div>

      {/* Growth Node: UX Insights */}
      <section className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100/50 flex flex-col md:flex-row md:items-center justify-between group shadow-sm">
         <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-emerald-500 text-white rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
               <MousePointer2 size={18} />
            </div>
            <div>
               <h4 className="text-sm font-black text-emerald-900 tracking-tight uppercase">UX Friction Diagnostic</h4>
               <p className="text-[10px] font-bold text-emerald-600/60 uppercase tracking-widest mt-1 max-w-xl">
                  Losing <span className="text-emerald-700 font-black">70.2% of users</span> at Enquire Node. Trigger redesign target: +23% Lift.
               </p>
            </div>
         </div>
         <button className="mt-4 md:mt-0 px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg flex items-center space-x-2">
            <span>Deploy A/B Trigger</span>
            <ChevronRight size={14} />
         </button>
      </section>
    </div>
  );
}
