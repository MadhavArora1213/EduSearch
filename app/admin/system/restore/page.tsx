"use client";

import { useState } from "react";
import { 
  History, 
  RotateCcw, 
  ChevronRight, 
  ShieldAlert, 
  Clock, 
  Database, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck,
  AlertCircle, 
  Lock, 
  Zap, 
  Terminal, 
  Server,
  Activity,
  Trash2,
  Settings,
  Flame,
  MousePointer2
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function RestoreProcedurePage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [targetEnv, setTargetEnv] = useState<'STAGING' | 'PRODUCTION'>('STAGING');
  const [confirmText, setConfirmText] = useState("");

  return (
    <div className="space-y-10">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-6 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-2">
              <div className="bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-100">
                 <span className="text-[10px] font-black uppercase tracking-widest text-rose-600 italic">Disaster Recovery</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30">Restore & Recovery Workflows</span>
           </div>
           <h1 className="text-3xl md:text-3xl md:text-5xl font-black text-typography tracking-tighter leading-none mb-1">
             System <span className="text-rose-600 italic">Restoration</span>
           </h1>
           <p className="text-secondary/40 text-sm font-bold uppercase tracking-widest mt-2">
              Point-in-Time Recovery via WAL Archives & Production Promotion Engine
           </p>
        </div>

        <div className="flex items-center space-x-4">
           <div className="bg-white px-8 py-4 rounded-3xl border border-gray-100 shadow-sm flex items-center space-x-6">
              <div>
                 <p className="text-[10px] font-black text-secondary/20 uppercase tracking-widest leading-none mb-2">RTO Target (Full Recovery)</p>
                 <p className="text-2xl font-black text-typography tracking-tighter italic">&lt; 120m <span className="text-emerald-500 text-[10px] font-black underline not-italic ml-2 uppercase tracking-widest">Compliant</span></p>
              </div>
              <Activity size={28} className="text-emerald-500" />
           </div>
        </div>
      </section>

      <div className="grid grid-cols-12 gap-10">
         {/* Recovery Wizard */}
         <div className="col-span-12 lg:col-span-8 space-y-8">
            <div className="bg-white rounded-[3rem] border border-gray-50 shadow-sm overflow-hidden flex flex-col">
               <div className="p-10 border-b border-gray-50 bg-snow-pearl/30 flex items-center justify-between">
                  <div>
                     <h3 className="text-xl font-black text-typography tracking-tighter italic lowercase underline decoration-primary/10">Orchestrated Restore Wizard</h3>
                     <p className="text-[10px] font-bold text-secondary/30 uppercase tracking-[0.2em] mt-2 italic">Follow the high-integrity multi-step protocol</p>
                  </div>
                  <div className="flex items-center space-x-4">
                     {[1, 2, 3].map((s) => (
                        <div key={s} className={cn(
                           "w-10 h-10 rounded-xl flex items-center justify-center text-[11px] font-black border transition-all shadow-inner",
                           step === s ? "bg-primary text-white border-primary" : step > s ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-white text-secondary/20 border-gray-100"
                        )}>
                           {step > s ? <CheckCircle2 size={16} /> : s}
                        </div>
                     ))}
                  </div>
               </div>

               <div className="p-14 min-h-[400px] flex flex-col justify-center">
                  {step === 1 && (
                     <div className="space-y-10 animate-in fade-in slide-in-from-bottom-5 duration-500">
                        <div className="text-center">
                           <History size={48} className="text-secondary/10 mx-auto mb-6" />
                           <h4 className="text-2xl font-black text-typography uppercase tracking-tighter italic">Select Restore Source</h4>
                           <p className="text-[11px] font-bold text-secondary/30 uppercase tracking-widest mt-2">Pick a binary snapshot or entry point from WAL archives</p>
                        </div>
                        <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
                           <button onClick={() => setStep(2)} className="p-8 bg-snow-pearl/50 rounded-3xl border border-gray-100 hover:border-primary/20 transition-all text-left flex items-start space-x-6 group">
                              <Database size={32} className="text-secondary/10 group-hover:text-primary transition-colors" />
                              <div>
                                 <p className="text-[13px] font-black text-typography uppercase tracking-tight">Full Daily Snapshot</p>
                                 <p className="text-[10px] font-bold text-secondary/40 uppercase tracking-widest mt-1">BKP-9921 • 2026-03-08</p>
                              </div>
                           </button>
                           <button onClick={() => setStep(2)} className="p-8 bg-snow-pearl/50 rounded-3xl border border-gray-100 hover:border-indigo-500/20 transition-all text-left flex items-start space-x-6 group">
                              <Clock size={32} className="text-secondary/10 group-hover:text-indigo-500 transition-colors" />
                              <div>
                                 <p className="text-[13px] font-black text-typography uppercase tracking-tight">Point-in-Time (PITR)</p>
                                 <p className="text-[10px] font-bold text-secondary/40 uppercase tracking-widest mt-1 italic">WAL Stream Recovery</p>
                              </div>
                           </button>
                        </div>
                     </div>
                  )}

                  {step === 2 && (
                     <div className="space-y-10 animate-in fade-in slide-in-from-bottom-5 duration-500">
                        <div className="text-center">
                           <Server size={48} className="text-primary mx-auto mb-6" />
                           <h4 className="text-2xl font-black text-typography uppercase tracking-tighter italic">Provision Target Environment</h4>
                           <p className="text-[11px] font-bold text-secondary/30 uppercase tracking-widest mt-2">Safety Protocol: Always restore to Staging for validation first</p>
                        </div>
                        <div className="flex flex-col space-y-4 max-w-md mx-auto">
                           <button onClick={() => setTargetEnv('STAGING')} className={cn(
                              "p-6 rounded-2xl border transition-all flex items-center justify-between",
                              targetEnv === 'STAGING' ? "bg-emerald-50 border-emerald-400 text-emerald-700 shadow-sm" : "bg-white border-gray-100 text-secondary/40"
                           )}>
                              <div className="flex items-center space-x-4">
                                 <ShieldCheck size={24} />
                                 <span className="text-[12px] font-black uppercase tracking-tight">Verified Staging Node</span>
                              </div>
                              {targetEnv === 'STAGING' && <CheckCircle2 size={18} />}
                           </button>
                           <button onClick={() => setTargetEnv('PRODUCTION')} className={cn(
                              "p-6 rounded-2xl border transition-all flex items-center justify-between",
                              targetEnv === 'PRODUCTION' ? "bg-rose-50 border-rose-400 text-rose-700 shadow-lg" : "bg-white border-gray-100 text-secondary/40"
                           )}>
                              <div className="flex items-center space-x-4">
                                 <Flame size={24} />
                                 <span className="text-[12px] font-black uppercase tracking-tight italic">Live Production Node</span>
                              </div>
                              {targetEnv === 'PRODUCTION' && <AlertCircle size={18} />}
                           </button>
                        </div>
                        <div className="flex justify-center space-x-4 pt-10 border-t border-gray-100">
                           <button onClick={() => setStep(1)} className="px-8 py-4 text-[10px] font-black text-secondary/30 uppercase tracking-widest hover:text-secondary transition-all">Previous</button>
                           <button onClick={() => setStep(3)} className="px-10 py-5 bg-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-primary/20">Initiate Data Provisioning</button>
                        </div>
                     </div>
                  )}

                  {step === 3 && (
                     <div className="space-y-10 animate-in fade-in slide-in-from-bottom-5 duration-500 max-w-xl mx-auto text-center">
                        <div className="w-24 h-24 bg-rose-500 text-white rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-rose-500/30">
                           <AlertCircle size={48} />
                        </div>
                        <h4 className="text-3xl font-black text-typography uppercase tracking-tighter italic">Nuclear Authorization</h4>
                        <p className="text-xs font-bold text-secondary/40 leading-relaxed uppercase tracking-widest italic lowercase decoration-rose-500/20 underline">
                           You are about to promote data to {targetEnv.toUpperCase()}. This will overwrite existing {targetEnv} records.
                        </p>
                        
                        <div className="space-y-4 pt-6">
                           <input 
                              placeholder="Type 'CONFIRM RESTORE' to execute" 
                              value={confirmText}
                              onChange={(e) => setConfirmText(e.target.value)}
                              className="w-full bg-snow-pearl p-6 rounded-3xl text-center text-sm font-black uppercase tracking-widest border border-gray-100 focus:ring-4 focus:ring-rose-500/10 outline-none transition-all"
                           />
                           <button 
                             disabled={confirmText !== 'CONFIRM RESTORE'}
                             className={cn(
                               "w-full py-6 rounded-3xl text-[11px] font-black uppercase tracking-widest transition-all italic",
                               confirmText === 'CONFIRM RESTORE' ? "bg-rose-600 text-white shadow-xl shadow-rose-600/20 hover:scale-[1.02]" : "bg-gray-100 text-secondary/20 cursor-not-allowed"
                             )}
                           >
                              Execute Global Promotion Protocol
                           </button>
                        </div>
                     </div>
                  )}
               </div>
            </div>
         </div>

         {/* Monitoring Sidebar */}
         <div className="col-span-12 lg:col-span-4 space-y-8">
            <div className="bg-slate-900 p-10 rounded-[3rem] text-white overflow-hidden relative group">
               <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Terminal size={80} className="text-primary" />
               </div>
               <h4 className="text-sm font-black text-slate-500 uppercase tracking-widest mb-6 italic underline decoration-primary/30">Recovery Intelligence</h4>
               <div className="space-y-6">
                  <div className="flex items-center justify-between">
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">PostgreSQL PITR Depth</p>
                     <p className="text-lg font-black text-emerald-500 italic">07 Days</p>
                  </div>
                  <div className="flex items-center justify-between">
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">DR Test Cadence</p>
                     <p className="text-lg font-black text-indigo-400 italic">Monthly</p>
                  </div>
                  <div className="flex items-center justify-between">
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Validation Success</p>
                     <p className="text-lg font-black text-emerald-400 italic">100%</p>
                  </div>
               </div>
               <div className="mt-10 pt-10 border-t border-slate-800">
                  <p className="text-[9px] font-bold text-slate-500 leading-relaxed uppercase tracking-widest italic bg-white/5 p-4 rounded-xl border border-white/5">
                     Last DR Test: 2026-03-01 <br/>Status: PASS (RTO: 42 mins)
                  </p>
               </div>
            </div>

            <div className="bg-white p-10 rounded-[3rem] border border-gray-50 shadow-sm group hover:border-primary/20 transition-all cursor-pointer">
               <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 bg-snow-pearl rounded-2xl flex items-center justify-center text-secondary/10 group-hover:text-primary group-hover:bg-primary/5 transition-all">
                     <MousePointer2 size={24} />
                  </div>
                  <Zap size={18} className="text-emerald-500 animate-bounce" />
               </div>
               <p className="text-[10px] font-black text-secondary/30 uppercase tracking-widest mb-1 italic">WAL Stream Health</p>
               <h4 className="text-xl font-black text-typography uppercase tracking-tight font-black leading-tight italic lowercase">Point-in-Time Shadow Log</h4>
               <p className="text-[10px] font-bold text-secondary/40 leading-relaxed mt-2 uppercase tracking-widest italic decoration-primary/10 underline">Archives being pushed to R2 every 5 minutes</p>
            </div>
         </div>
      </div>
    </div>
  );
}
