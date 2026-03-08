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
    <div className="space-y-10 font-montserrat">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-6 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-2">
              <div className="bg-primary/5 px-3 py-1.5 rounded-xl border border-primary/10">
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary italic">Precision Marketing</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30">Conversion Leakage Monitor</span>
           </div>
           <h1 className="text-3xl md:text-3xl md:text-5xl font-black text-typography tracking-tighter leading-none mb-1">
             Full <span className="text-primary italic">Funnel</span>
           </h1>
           <p className="text-secondary/40 text-sm font-bold uppercase tracking-widest mt-2">
              Auditing Path-to-Admission Drop-offs & UX Intent
           </p>
        </div>

        <div className="flex items-center space-x-4">
           <div className="flex items-center space-x-2 bg-white p-1.5 rounded-[1.5rem] border border-gray-100 shadow-sm">
              <button 
                onClick={() => setDevice('ALL')}
                className={cn("px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all", device === 'ALL' ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-secondary/30")}
              >
                <Globe size={16} />
              </button>
              <button 
                onClick={() => setDevice('MOBILE')}
                className={cn("px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all", device === 'MOBILE' ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-secondary/30")}
              >
                <Smartphone size={16} />
              </button>
              <button 
                onClick={() => setDevice('DESKTOP')}
                className={cn("px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all", device === 'DESKTOP' ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-secondary/30")}
              >
                <Layout size={16} />
              </button>
           </div>
           <button className="flex items-center space-x-2 px-8 py-4 bg-slate-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-primary transition-all shadow-xl shadow-slate-900/10 active:scale-95 group italic">
              <Zap size={18} className="group-hover:rotate-12 transition-transform italic" />
              <span>Fix Funnel Leakage</span>
           </button>
        </div>
      </section>

      <div className="grid grid-cols-12 gap-10 font-montserrat italic not-italic">
         {/* Funnel Visualization */}
         <div className="col-span-12 lg:col-span-9 bg-white rounded-[3rem] border border-gray-50 shadow-sm p-14 flex flex-col overflow-hidden italic">
            <div className="flex justify-between items-center mb-14 italic">
               <div>
                  <h3 className="text-2xl font-black text-typography tracking-tighter italic lowercase underline decoration-primary/10">The Enrollment Pipeline</h3>
                  <p className="text-[10px] font-bold text-secondary/30 uppercase tracking-[0.2em] mt-2 italic decoration-primary/10 underline">Global Traffic to Verified Admission Workflow</p>
               </div>
               <div className="flex items-center space-x-2 px-4 py-2 bg-snow-pearl rounded-xl border border-gray-100 italic">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse italic" />
                  <span className="text-[10px] font-black text-secondary/40 uppercase tracking-widest italic">Live Flow Active</span>
               </div>
            </div>

            <div className="space-y-4 italic">
               {funnelStages.map((stage, i) => {
                 const dropOff = i > 0 ? (funnelStages[i-1].count - stage.count) : 0;
                 const conversionFromPrev = i > 0 ? ((stage.count / funnelStages[i-1].count) * 100).toFixed(1) : 100;

                 return (
                   <div key={stage.id} className="group relative flex items-center italic">
                      {/* Drop-off visualization (left) */}
                      <div className="w-24 text-right pr-6 italic">
                         {i > 0 && (
                           <div className="flex flex-col items-end italic">
                              <span className="text-[12px] font-black text-rose-500 italic">-{dropOff.toLocaleString()}</span>
                              <span className="text-[8px] font-bold text-secondary/20 uppercase tracking-widest italic">Leaked</span>
                           </div>
                         )}
                      </div>

                      {/* Funnel Bar */}
                      <div className="flex-1 relative h-14 bg-snow-pearl rounded-2xl overflow-hidden border border-gray-100 group-hover:border-primary/20 transition-all p-1 flex items-center italic">
                         <div 
                           className="h-full rounded-xl transition-all duration-1000 shadow-xl flex items-center px-6 relative overflow-hidden italic" 
                           style={{ width: `${stage.percentage}%`, backgroundColor: stage.color }}
                         >
                            <div className="absolute top-0 right-0 h-full w-24 bg-white/5 skew-x-[30deg] translate-x-12 italic" />
                            <span className="text-[11px] font-black text-white uppercase tracking-widest whitespace-nowrap italic">{stage.label}</span>
                            <span className="ml-auto text-[13px] font-black text-white italic tracking-tighter italic">{stage.count.toLocaleString()}</span>
                         </div>
                      </div>

                      {/* Step Conversion (right) */}
                      <div className="w-32 pl-6 italic">
                         <div className="flex items-center space-x-2 italic">
                            <span className={cn(
                               "text-lg font-black tracking-tighter italic",
                               i === 0 ? "text-secondary/20" : parseFloat(conversionFromPrev as string) < 30 ? "text-rose-500" : "text-emerald-500"
                            )}>{i === 0 ? 'START' : `${conversionFromPrev}%`}</span>
                            {i > 0 && parseFloat(conversionFromPrev as string) < 30 && <AlertCircle size={14} className="text-rose-500 animate-bounce italic" />}
                         </div>
                         {i > 0 && <p className="text-[8px] font-bold text-secondary/30 uppercase tracking-widest leading-none italic">Step Retention</p>}
                      </div>
                   </div>
                 );
               })}
            </div>
         </div>

         {/* Sidebar: Source Context */}
         <div className="col-span-12 lg:col-span-3 space-y-8 font-montserrat italic not-italic">
            <div className="bg-slate-900 p-10 rounded-[3rem] text-white flex flex-col justify-between relative group h-full italic">
               <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-1000 italic">
                  <Target size={80} className="text-primary italic" />
               </div>
               <div className="relative z-10 flex-1 italic">
                  <h4 className="text-sm font-black text-slate-500 uppercase tracking-widest mb-10 italic underline decoration-primary/30 italic">Conversion by Source</h4>
                  <div className="space-y-10 italic">
                     {trafficSources.map((s, i) => (
                        <div key={i} className="flex flex-col space-y-2 group/s italic">
                           <div className="flex justify-between items-end italic">
                              <p className="text-[11px] font-bold text-slate-300 uppercase tracking-widest group-hover/s:text-white transition-colors italic">{s.source}</p>
                              <p className={cn("text-xl font-black italic tracking-tighter italic", s.color)}>{s.conversion}%</p>
                           </div>
                           <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden italic">
                              <div 
                                className={cn("h-full group-hover/s:opacity-100 transition-all duration-1000 italic", s.color.replace('text-', 'bg-'))} 
                                style={{ width: `${s.conversion * 15}%` }} 
                              />
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
               <div className="mt-14 p-6 bg-white/5 rounded-3xl border border-white/5 relative z-10 italic">
                  <p className="text-[9px] font-bold text-slate-400 leading-relaxed uppercase tracking-[0.1em] italic">
                     Organic SEO traffic maintains the highest retention rate (4.8%) through Stage 4 vs social referral (1.4%).
                  </p>
               </div>
            </div>
         </div>
      </div>

      {/* Growth Node: UX Insights */}
      <section className="bg-emerald-50 p-12 rounded-[3.5rem] border border-emerald-100 flex flex-col md:flex-row md:items-center justify-between group font-montserrat italic not-italic">
         <div className="flex items-center space-x-8 italic">
            <div className="w-20 h-20 bg-emerald-500 text-white rounded-[2.5rem] flex items-center justify-center shadow-xl shadow-emerald-500/20 group-hover:scale-110 transition-transform italic">
               <MousePointer2 size={32} className="italic" />
            </div>
            <div>
               <h4 className="text-2xl font-black text-emerald-900 tracking-tighter uppercase italic">The "Enquire Now" Friction Node</h4>
               <p className="text-xs font-bold text-emerald-600/60 uppercase tracking-widest mt-2 max-w-xl italic font-montserrat not-italic">
                  We are losing <span className="text-emerald-700 font-black">70.2% of users</span> at the Enquire Click stage. Redesigning the modal trigger to be less intrusive could lift lead volume by 23%.
               </p>
            </div>
         </div>
         <button className="mt-8 md:mt-0 px-10 py-5 bg-emerald-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-600/20 flex items-center space-x-3 italic">
            <span>A/B Test Trigger</span>
            <ChevronRight size={18} className="italic" />
         </button>
      </section>
    </div>
  );
}
