"use client";

import { useState } from "react";
import { 
  AlertTriangle, 
  Building2, 
  Globe, 
  User, 
  ChevronRight, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  Flag, 
  ShieldAlert, 
  Zap, 
  Database, 
  ExternalLink,
  Search,
  MessageSquare
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ConflictRecord {
  id: string;
  college: string;
  field: string;
  scrapedValue: { val: string; source: string };
  collegeValue: { val: string; updatedBy: string };
  date: string;
  critical: boolean;
}

export default function ConflictResolutionPage() {
  const [conflicts] = useState<ConflictRecord[]>([
    {
      id: "CON-001",
      college: "Vellore Institute of Technology (VIT)",
      field: "Total Enrollment",
      scrapedValue: { val: "42,400", source: "NIRF 2026" },
      collegeValue: { val: "38,500", updatedBy: "College Admin" },
      date: "2026-03-07",
      critical: true
    },
    {
      id: "CON-002",
      college: "Manipal Academy",
      field: "Recognition Status",
      scrapedValue: { val: "Deemed-to-be", source: "UGC Portal" },
      collegeValue: { val: "Private State Univ", updatedBy: "Content Repo" },
      date: "2026-03-06",
      critical: false
    }
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-4 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-2">
              <div className="bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-100">
                 <span className="text-[10px] font-black uppercase tracking-widest text-amber-600 italic lowercase underline decoration-amber-200/50">Data Integrity Board</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30">Source Conflict Resolution</span>
           </div>
           <h1 className="text-3xl md:text-3xl md:text-5xl font-black text-typography tracking-tighter leading-none mb-1">
             Conflict <span className="text-amber-500 italic">Arbiter</span>
           </h1>
           <p className="text-secondary/40 text-sm font-bold uppercase tracking-widest mt-2">
              Resolving Contradictions Between Public Scraped Data & Institution Submissions
           </p>
        </div>

        <div className="flex items-center space-x-4">
           <div className="bg-slate-900 px-8 py-4 rounded-3xl border border-white/10 shadow-2xl flex items-center space-x-6 text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 blur-3xl rounded-full" />
              <div>
                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-2">Escalated Cases</p>
                 <p className="text-2xl font-black tracking-tighter italic">04 <span className="text-rose-500 text-[10px] font-black underline not-italic ml-2 uppercase">Critical</span></p>
              </div>
              <ShieldAlert size={32} className="text-rose-500 relative z-10" />
           </div>
        </div>
      </section>

      {/* Main Conflict Grid */}
      <div className="space-y-8">
         {conflicts.map((con, i) => (
            <div key={i} className={cn(
               "bg-white rounded-2xl border shadow-sm overflow-hidden group transition-all",
               con.critical ? "border-rose-100 shadow-rose-500/5" : "border-gray-50"
            )}>
               <div className="flex flex-col lg:flex-row h-full">
                  {/* Subject Info */}
                  <div className="lg:w-1/4 p-6 bg-snow-pearl/30 border-r border-gray-50 flex flex-col justify-between">
                     <div>
                        <div className="flex items-center space-x-4 mb-6">
                           <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-secondary/20 shadow-sm"><Building2 size={24} /></div>
                           <h4 className="text-xl font-black text-typography tracking-tighter leading-tight uppercase italic">{con.college}</h4>
                        </div>
                        <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-1 italic underline decoration-amber-200">Integrity Violation Spotted</p>
                        <h5 className="text-base font-black text-typography uppercase">{con.field}</h5>
                     </div>
                     <div className="mt-8 pt-8 border-t border-gray-100 italic">
                        <p className="text-[10px] font-bold text-secondary/30 uppercase tracking-widest">Detected: {con.date}</p>
                        {con.critical && <span className="inline-block mt-2 px-3 py-1 bg-rose-50 text-rose-600 text-[9px] font-black rounded-full uppercase">Super Admin Escalation</span>}
                     </div>
                  </div>

                  {/* Comparison Logic */}
                  <div className="flex-1 p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-white relative">
                     {/* Scraped View */}
                     <div className="space-y-6">
                        <div className="flex items-center space-x-2 text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em] italic">
                           <Globe size={14} />
                           <span>External Crawler (NIRF)</span>
                        </div>
                        <div className="p-5 bg-indigo-50/30 rounded-2xl border border-indigo-100 group-hover:border-indigo-400/30 transition-all text-center">
                           <p className="text-4xl font-black text-indigo-600 tracking-tighter">{con.scrapedValue.val}</p>
                           <button className="mt-4 flex items-center space-x-1 mx-auto text-[10px] font-black text-indigo-400 uppercase tracking-widest hover:underline">
                              <ExternalLink size={12} />
                              <span>{con.scrapedValue.source}</span>
                           </button>
                        </div>
                     </div>

                     {/* Internal View */}
                     <div className="space-y-6">
                        <div className="flex items-center space-x-2 text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em] italic">
                           <User size={14} />
                           <span>Institution Dashboard</span>
                        </div>
                        <div className="p-5 bg-emerald-50/30 rounded-2xl border border-emerald-100 group-hover:border-emerald-400/30 transition-all text-center">
                           <p className="text-4xl font-black text-emerald-600 tracking-tighter">{con.collegeValue.val}</p>
                           <p className="mt-4 text-[10px] font-black text-emerald-400 uppercase tracking-widest italic lowercase">Last Human Sync: {con.collegeValue.updatedBy}</p>
                        </div>
                     </div>

                     {/* Decision Actions Overlaying logic */}
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full border border-gray-100 shadow-xl flex items-center justify-center text-secondary/10 group-hover:rotate-180 transition-transform duration-1000 hidden md:flex">
                        <RefreshCw size={24} />
                     </div>
                  </div>

                  {/* Resolution Panel */}
                  <div className="lg:w-1/4 p-6 bg-snow-pearl/50 border-l border-gray-50 flex flex-col justify-center space-y-4">
                     <button className="w-full py-5 bg-indigo-600 text-white rounded-[2rem] text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/10 flex items-center justify-center space-x-3">
                        <CheckCircle2 size={18} />
                        <span>Use Scraped Value</span>
                     </button>
                     <button className="w-full py-5 bg-emerald-600 text-white rounded-[2rem] text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/10 flex items-center justify-center space-x-3">
                        <CheckCircle2 size={18} />
                        <span>Use College Value</span>
                     </button>
                     <button className="w-full py-5 bg-white border border-rose-100 text-rose-600 rounded-[2rem] text-[10px] font-black uppercase tracking-widest hover:bg-rose-600 hover:text-white transition-all flex items-center justify-center space-x-3 group/dispute">
                        <Flag size={18} className="group-hover/dispute:animate-bounce" />
                        <span>Mark as Disputed</span>
                     </button>
                     <button className="w-full py-3 text-[10px] font-black text-secondary/30 uppercase tracking-[0.2em] hover:text-primary transition-all flex items-center justify-center space-x-2">
                        <MessageSquare size={14} />
                        <span>Initiate Verification Call</span>
                     </button>
                  </div>
               </div>
            </div>
         ))}
      </div>

      {/* Enforcement Footer */}
      <section className="bg-slate-900 p-6 rounded-2xl border border-white/10 flex items-center justify-between text-white">
         <div className="flex items-center space-x-6 italic">
            <Database size={20} className="text-secondary/40" />
            <p className="text-[11px] font-black tracking-widest uppercase text-slate-400">Resolution Standard: Conflict logs are immutable for NIRF/UGC Grade fields. Super Admin audit trace is active on all overrides.</p>
         </div>
         <p className="text-[9px] font-black text-primary uppercase tracking-widest italic lowercase">Conflict Buffer v2.0 Operational</p>
      </section>
    </div>
  );
}

function RefreshCw(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M3 21v-5h5" />
    </svg>
  );
}
