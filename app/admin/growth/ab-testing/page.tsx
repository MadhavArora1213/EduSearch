"use client";

import { useState } from "react";
import { 
  Split, 
  Search, 
  Filter, 
  ChevronRight, 
  Play, 
  Pause, 
  Save, 
  ArrowUpRight, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  TrendingUp, 
  Activity, 
  LayoutGrid, 
  MousePointer2, 
  Zap, 
  Plus, 
  MoreVertical,
  FlaskConical,
  BarChart3,
  Monitor,
  Smartphone
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ABTest {
  id: string;
  name: string;
  type: 'College Profile' | 'Homepage' | 'Lead Form' | 'Modal';
  status: 'RUNNING' | 'DRAFT' | 'COMPLETED';
  startDate: string;
  visitors: number;
  variantA: { label: string, cr: number };
  variantB: { label: string, cr: number };
  confidence: number;
  winner: 'A' | 'B' | 'NONE';
}

const tests: ABTest[] = [
  { 
    id: "T1", 
    name: "Enquire Now Button Color: Emerald vs Indigo", 
    type: "College Profile", 
    status: 'RUNNING', 
    startDate: "2026-03-01", 
    visitors: 42100, 
    variantA: { label: "Emerald (Control)", cr: 4.8 }, 
    variantB: { label: "Indigo (Test)", cr: 5.9 }, 
    confidence: 98, 
    winner: 'B' 
  },
  { 
    id: "T2", 
    name: "AI Counselor Floating Trigger: Delay 5s vs 15s", 
    type: "Homepage", 
    status: 'RUNNING', 
    startDate: "2026-03-05", 
    visitors: 12400, 
    variantA: { label: "5s Delay", cr: 8.2 }, 
    variantB: { label: "15s Delay", cr: 7.9 }, 
    confidence: 64, 
    winner: 'NONE' 
  },
  { 
    id: "T3", 
    name: "Lead Form Step Count: 2 Steps vs 4 Steps", 
    type: "Lead Form", 
    status: 'COMPLETED', 
    startDate: "2026-02-15", 
    visitors: 85600, 
    variantA: { label: "2 Steps", cr: 14.2 }, 
    variantB: { label: "4 Steps", cr: 9.1 }, 
    confidence: 99, 
    winner: 'A' 
  },
];

export default function ABTestManagerPage() {
  return (
    <div className="space-y-6 font-montserrat">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-4 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-1.5 font-montserrat">
              <div className="bg-primary/5 px-3 py-1.5 rounded-xl border border-primary/10">
                 <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary lowercase">Optimization Lab</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30 uppercase tracking-widest text-[10px]">Testing Intelligence</span>
           </div>
           <h1 className="text-3xl md:text-4xl font-black text-typography tracking-tighter leading-none mb-1">
             A/B <span className="text-primary italic">Testing</span>
           </h1>
           <p className="text-secondary/40 text-[10px] font-black uppercase tracking-[0.2em] mt-1.5 leading-none">
              Executing Experiments to Maximize ROI Node Yield
           </p>
        </div>
 
        <div className="flex items-center space-x-4">
           <button className="flex items-center space-x-2 px-6 py-2.5 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-all shadow-lg shadow-slate-900/10 active:scale-95 group">
              <Plus size={16} className="group-hover:rotate-90 transition-transform duration-500" />
              <span>Initiate New Test</span>
           </button>
        </div>
      </section>

      {/* Main Test Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
         {tests.map((test) => (
            <div key={test.id} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm group hover:shadow-md transition-all flex flex-col justify-between h-full relative overflow-hidden">
               {test.winner !== 'NONE' && (
                 <div className="absolute top-0 right-0 p-4 rotate-12 opacity-5 scale-150 group-hover:scale-[1.8] transition-transform duration-1000">
                    <CheckCircle2 size={100} className="text-emerald-500" />
                 </div>
               )}
               
               <div>
                  <div className="flex items-center justify-between mb-6">
                     <div className={cn(
                       "flex items-center space-x-2 px-2.5 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest",
                       test.status === 'RUNNING' ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-gray-50 text-secondary/30 border border-gray-100"
                     )}>
                        <div className={cn("w-1.5 h-1.5 rounded-full", test.status === 'RUNNING' && "bg-emerald-500 animate-pulse")} />
                        <span>{test.status}</span>
                     </div>
                     <button className="text-secondary/20 hover:text-primary transition-all">
                        <MoreVertical size={16} />
                     </button>
                  </div>
 
                  <p className="text-[9px] font-black text-primary uppercase tracking-[0.1em] mb-1.5">{test.type} Experiment</p>
                  <h4 className="text-sm font-black text-typography tracking-tight leading-snug group-hover:text-primary transition-colors uppercase">{test.name}</h4>
                  <p className="text-[9px] font-bold text-secondary/20 uppercase tracking-widest mt-1.5">{test.startDate} • {test.visitors.toLocaleString()} Participants</p>
 
                  <div className="mt-8 space-y-4">
                     <div className="space-y-1.5 group/v">
                        <div className="flex justify-between items-end">
                           <p className="text-[10px] font-bold text-secondary/40 uppercase tracking-widest leading-none">{test.variantA.label}</p>
                           <p className="text-lg font-black text-typography italic tracking-tighter leading-none">{test.variantA.cr}%</p>
                        </div>
                        <div className="w-full h-1 bg-gray-50 rounded-full overflow-hidden">
                           <div className="h-full bg-slate-300" style={{ width: `${test.variantA.cr * 5}%` }} />
                        </div>
                     </div>
                     <div className="space-y-1.5 group/v relative">
                        <div className="flex justify-between items-end">
                           <p className="text-[10px] font-bold text-secondary/40 uppercase tracking-widest leading-none">{test.variantB.label}</p>
                           <p className={cn(
                             "text-lg font-black italic tracking-tighter leading-none",
                             test.variantB.cr > test.variantA.cr ? "text-emerald-500" : "text-rose-500"
                           )}>{test.variantB.cr}%</p>
                        </div>
                        <div className="w-full h-1 bg-gray-50 rounded-full overflow-hidden">
                           <div className={cn(
                             "h-full transition-all duration-1000",
                             test.variantB.cr > test.variantA.cr ? "bg-emerald-500" : "bg-rose-500"
                           )} style={{ width: `${test.variantB.cr * 5}%` }} />
                        </div>
                     </div>
                  </div>
               </div>


                <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                   <div className="flex flex-col">
                      <span className="text-[7px] font-black text-secondary/30 uppercase tracking-[0.2em] mb-1">Significance</span>
                      <span className={cn(
                        "text-[11px] font-black",
                        test.confidence > 90 ? "text-emerald-500" : "text-amber-500"
                      )}>{test.confidence}% Confident</span>
                   </div>
                   {test.winner !== 'NONE' ? (
                      <button className="px-5 py-2.5 bg-primary text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-primary/20 flex items-center space-x-1.5">
                         <Zap size={12} />
                         <span>Promote {test.winner === 'A' ? 'A' : 'B'}</span>
                      </button>
                   ) : (
                      <button className="px-5 py-2.5 bg-gray-50 text-secondary/40 rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center space-x-1.5 hover:bg-primary/5 hover:text-primary transition-all">
                         <Monitor size={12} />
                         <span>Live Data</span>
                      </button>
                   )}
                </div>
             </div>
          ))}
       </div>

      {/* Lab Stats Footnote */}
      <section className="bg-slate-900 p-6 rounded-xl text-white flex flex-col md:flex-row md:items-center justify-between group overflow-hidden relative">
         <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform duration-1000">
            <FlaskConical size={80} className="text-secondary/20" />
         </div>
         <div className="flex items-center space-x-6 relative z-10">
            <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-primary shadow-inner ring-1 ring-white/10">
               <TrendingUp size={24} />
            </div>
            <div>
               <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1.5">Lab Impact</p>
               <h4 className="text-2xl font-black text-white tracking-tighter leading-none italic">+24.8% <span className="text-emerald-500 text-xs not-italic ml-2 uppercase tracking-widest">CV Lift</span></h4>
            </div>
         </div>
         <div className="mt-6 md:mt-0 flex items-center space-x-10 relative z-10">
            <div className="flex flex-col">
               <span className="text-lg font-black text-white italic tracking-tighter">12</span>
               <span className="text-[7px] font-black text-slate-500 uppercase tracking-widest">Active</span>
            </div>
            <div className="flex flex-col">
               <span className="text-lg font-black text-emerald-500 italic tracking-tighter">95%</span>
               <span className="text-[7px] font-black text-slate-500 uppercase tracking-widest">Confidence</span>
            </div>
            <div className="w-px h-8 bg-white/10 hidden md:block" />
            <button className="px-6 py-3 bg-primary text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all shadow-lg shadow-primary/20">
               Archive Hub
            </button>
         </div>
      </section>
    </div>
  );
}
