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
           <div className="flex items-center space-x-3 mb-1.5 font-montserrat">
              <div className="bg-primary/5 px-3 py-1.5 rounded-xl border border-primary/10">
                 <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary lowercase">Funnel Ops</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30 uppercase tracking-widest text-[10px]">Path Intelligence</span>
           </div>
           <h1 className="text-3xl md:text-4xl font-black text-typography tracking-tighter leading-none mb-1">
             Full <span className="text-primary italic">Funnel</span>
           </h1>
           <p className="text-secondary/40 text-[10px] font-black uppercase tracking-[0.2em] mt-1.5 leading-none">
              Auditing Admission Drop-offs & UX Intent
           </p>
        </div>

        <div className="flex items-center space-x-3">
           <div className="flex items-center space-x-1 bg-white p-1 rounded-xl border border-gray-100 shadow-sm">
              <button 
                onClick={() => setDevice('ALL')}
                className={cn("w-9 h-9 rounded-lg flex items-center justify-center transition-all", device === 'ALL' ? "bg-primary text-white shadow-md shadow-primary/20" : "text-secondary/30 hover:text-secondary")}
                title="All Devices"
              >
                <Globe size={14} />
              </button>
              <button 
                onClick={() => setDevice('MOBILE')}
                className={cn("w-9 h-9 rounded-lg flex items-center justify-center transition-all", device === 'MOBILE' ? "bg-primary text-white shadow-md shadow-primary/20" : "text-secondary/30 hover:text-secondary")}
                title="Mobile Only"
              >
                <Smartphone size={14} />
              </button>
              <button 
                onClick={() => setDevice('DESKTOP')}
                className={cn("w-9 h-9 rounded-lg flex items-center justify-center transition-all", device === 'DESKTOP' ? "bg-primary text-white shadow-md shadow-primary/20" : "text-secondary/30 hover:text-secondary")}
                title="Desktop Only"
              >
                <Layout size={14} />
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
         <div className="col-span-12 lg:col-span-9 bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex flex-col">
            <div className="flex justify-between items-center mb-8">
               <div>
                  <h3 className="text-sm font-black text-typography tracking-tight uppercase">Enrollment Pipeline</h3>
                  <p className="text-[9px] font-bold text-secondary/30 uppercase tracking-[0.1em] mt-1.5">Traffic to Admission Workflow</p>
               </div>
               <div className="flex items-center space-x-2 px-3 py-1 bg-snow-pearl rounded-lg border border-gray-100">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[9px] font-black text-secondary/40 uppercase tracking-widest">Live Flow</span>
               </div>
            </div>

            <div className="space-y-3">
               {funnelStages.map((stage, i) => {
                 const dropOff = i > 0 ? (funnelStages[i-1].count - stage.count) : 0;
                 const conversionFromPrev = i > 0 ? ((stage.count / funnelStages[i-1].count) * 100).toFixed(1) : 100;
 
                 return (
                   <div key={stage.id} className="group relative flex items-center">
                      {/* Drop-off visualization (left) */}
                      <div className="w-20 text-right pr-4">
                         {i > 0 && (
                           <div className="flex flex-col items-end">
                              <span className="text-[11px] font-black text-rose-500">-{dropOff.toLocaleString()}</span>
                              <span className="text-[7px] font-black text-secondary/20 uppercase tracking-widest">Leaked</span>
                           </div>
                         )}
                      </div>
 
                      {/* Funnel Bar */}
                      <div className="flex-1 relative h-10 bg-gray-50 rounded-lg overflow-hidden border border-gray-100 group-hover:border-primary/20 transition-all p-0.5 flex items-center">
                         <div 
                           className="h-full rounded-md transition-all duration-1000 shadow-sm flex items-center px-4 relative overflow-hidden" 
                           style={{ width: `${stage.percentage}%`, backgroundColor: stage.color }}
                         >
                            <div className="absolute top-0 right-0 h-full w-16 bg-white/5 skew-x-[30deg] translate-x-8" />
                            <span className="text-[10px] font-black text-white uppercase tracking-widest whitespace-nowrap">{stage.label}</span>
                            <span className="ml-auto text-[11px] font-black text-white tracking-tight">{stage.count.toLocaleString()}</span>
                         </div>
                      </div>
 
                      {/* Step Conversion (right) */}
                      <div className="w-24 pl-4">
                         <div className="flex items-center space-x-2">
                            <span className={cn(
                               "text-sm font-black tracking-tight",
                               i === 0 ? "text-secondary/20" : parseFloat(conversionFromPrev as string) < 30 ? "text-rose-500" : "text-emerald-500"
                            )}>{i === 0 ? 'START' : `${conversionFromPrev}%`}</span>
                            {i > 0 && parseFloat(conversionFromPrev as string) < 30 && <AlertCircle size={10} className="text-rose-500 animate-pulse" />}
                         </div>
                         {i > 0 && <p className="text-[7px] font-black text-secondary/30 uppercase tracking-widest leading-none">Retention</p>}
                      </div>
                   </div>
                 );
               })}
            </div>
         </div>

         {/* Sidebar: Source Context */}
         <div className="col-span-12 lg:col-span-3 space-y-4">
            <div className="bg-slate-900 p-5 rounded-xl text-white flex flex-col justify-between relative group h-full">
               <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform duration-1000">
                  <Target size={60} className="text-primary" />
               </div>
               <div className="relative z-10 flex-1">
                  <h4 className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-6">Conversion by Source</h4>
                  <div className="space-y-5">
                     {trafficSources.map((s, i) => (
                        <div key={i} className="flex flex-col space-y-1.5 group/s">
                           <div className="flex justify-between items-end">
                              <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest group-hover/s:text-white transition-colors">{s.source}</p>
                              <p className={cn("text-lg font-black tracking-tighter", s.color)}>{s.conversion}%</p>
                           </div>
                           <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                              <div 
                                className={cn("h-full group-hover/s:opacity-100 transition-all duration-1000", s.color.replace('text-', 'bg-'))} 
                                style={{ width: `${s.conversion * 15}%` }} 
                              />
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
               <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/5">
                  <p className="text-[8px] font-black text-slate-400 leading-relaxed uppercase tracking-[0.1em]">
                     Organic SEO maintains highest retention (4.8%) through Stage 4 vs social (1.4%).
                  </p>
               </div>
            </div>
         </div>
      </div>

      {/* Growth Node: UX Insights */}
      <section className="bg-emerald-50 p-6 rounded-xl border border-emerald-100 flex flex-col md:flex-row md:items-center justify-between group">
         <div className="flex items-center space-x-6">
            <div className="w-14 h-14 bg-emerald-500 text-white rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
               <MousePointer2 size={24} />
            </div>
            <div>
               <h4 className="text-lg font-black text-emerald-900 tracking-tight uppercase">The "Enquire Now" Friction Node</h4>
               <p className="text-[10px] font-bold text-emerald-600/60 uppercase tracking-widest mt-1.5 max-w-xl">
                  Losing <span className="text-emerald-700 font-black">70.2% of users</span> at Enquire Click. Redesign trigger to lift volume by 23%.
               </p>
            </div>
         </div>
         <button className="mt-6 md:mt-0 px-8 py-3 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg flex items-center space-x-2">
            <span>A/B Test Trigger</span>
            <ChevronRight size={16} />
         </button>
      </section>
    </div>
  );
}
