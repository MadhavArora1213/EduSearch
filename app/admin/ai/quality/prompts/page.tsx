"use client";

import { useState } from "react";
import { 
  Terminal, 
  Search, 
  Filter, 
  ChevronRight, 
  Play, 
  Save, 
  RotateCcw, 
  History, 
  RotateCw, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Sparkles, 
  LayoutGrid, 
  Layers, 
  ArrowUpRight, 
  Lock, 
  Zap, 
  Split,
  Undo2,
  Copy,
  PenTool,
  BrainCircuit,
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PromptVersion {
  id: string;
  version: string;
  author: string;
  date: string;
  status: 'ACTIVE' | 'SHADOW' | 'ARCHIVED';
  desc: string;
}

export default function SystemPromptEditor() {
  const [activePrompt, setActivePrompt] = useState(`You are the EduSearch AI Counselor, a friendly and expert guide for students in India. 
Your goal is to help students find the best colleges and exams based on their preferences.

CONTEXT RULES:
1. Always suggest colleges available in the edusearch database.
2. If fees are mentioned, be precise (e.g., 2.4 LPA vs ~2 LPA).
3. If NIRF ranking is available, quote it to build trust.
4. Tone: Encouraging, analytical, and concise.

GUARDRAILS:
- Do NOT hallucinate colleges not in the database.
- Do NOT guarantee admission.
- If unsure about a fact, state that the student should verify with the college directly.`);

  const [versions] = useState<PromptVersion[]>([
    { id: "V1", version: "v2.1.0", author: "Aditya S.", date: "2026-03-01", status: 'ACTIVE', desc: "Added NIRF importance logic + strict fee quoting" },
    { id: "V2", version: "v2.0.4", author: "Priya V.", date: "2026-02-24", status: 'SHADOW', desc: "Shadow Test: Multi-lingual greeting experiment (10% Traffic)" },
    { id: "V3", version: "v2.0.2", author: "System", date: "2026-02-15", status: 'ARCHIVED', desc: "Base Persona Baseline" },
  ]);

  return (
    <div className="space-y-6 font-montserrat">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-4 border-b border-gray-100 italic">
        <div>
           <div className="flex items-center space-x-3 mb-2 italic">
              <div className="bg-primary/5 px-3 py-1.5 rounded-xl border border-primary/10">
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary italic lowercase underline decoration-primary/10">Prompt Engineering Lab</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30">Counselor Persona Orchestrator</span>
           </div>
           <h1 className="text-3xl md:text-3xl md:text-5xl font-black text-typography tracking-tighter leading-none mb-1">
             System <span className="text-primary italic">Prompts</span>
           </h1>
           <p className="text-secondary/40 text-sm font-bold uppercase tracking-widest mt-2">
              Managing Persona v2.1.0 • Global Guardrails & Context Steering
           </p>
        </div>

        <div className="flex items-center space-x-4">
           <button className="flex items-center space-x-2 px-8 py-4 bg-white border border-gray-200 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:border-primary/20 transition-all text-secondary/40 group">
              <History size={18} className="group-hover:rotate-180 transition-transform duration-500" />
              <span>Version History</span>
           </button>
           <button className="flex items-center space-x-2 px-8 py-4 bg-primary text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20">
              <Save size={18} />
              <span>Deploy to Shadow</span>
           </button>
        </div>
      </section>

      <div className="grid grid-cols-12 gap-6">
         {/* Editor Workspace */}
         <div className="col-span-12 lg:col-span-8 bg-white rounded-2xl border border-gray-50 shadow-sm overflow-hidden flex flex-col italic">
            <div className="p-6 md:p-6 border-b border-gray-50 flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-snow-pearl/30 border-gray-100">
               <div className="flex items-center space-x-6">
                  <div className="w-14 h-14 bg-primary/5 text-primary rounded-2xl flex items-center justify-center shadow-inner ring-1 ring-primary/10">
                     <PenTool size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-typography tracking-tighter italic lowercase underline decoration-primary/10 select-none">Active Persona Framework</h3>
                    <p className="text-[10px] font-black text-secondary/30 uppercase tracking-[0.2em] mt-1 italic select-none">Markdown & Template Variables Supported</p>
                  </div>
               </div>
               <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-xl text-[9px] font-black uppercase tracking-widest">
                     <CheckCircle2 size={12} />
                     <span>Syntax Valid</span>
                  </div>
                  <button className="p-3 bg-snow-pearl rounded-xl text-secondary/20 hover:text-primary transition-all">
                     <Copy size={18} />
                  </button>
               </div>
            </div>
            <div className="p-6 bg-slate-900 min-h-[500px] flex flex-col relative group">
               <textarea 
                  value={activePrompt}
                  onChange={(e) => setActivePrompt(e.target.value)}
                  className="w-full h-full bg-transparent border-0 text-slate-300 font-mono text-[14px] leading-relaxed outline-none resize-none flex-1 lg:max-h-[600px] custom-scrollbar focus:ring-0"
               />
               <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-1000">
                  <Terminal size={120} className="text-primary" />
               </div>
               <div className="mt-8 p-6 bg-white/5 rounded-3xl border border-white/5 flex items-center justify-between relative z-10">
                  <div className="flex items-center space-x-6">
                     <div className="flex flex-col">
                        <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest italic">Tokens</span>
                        <span className="text-xs font-black text-white italic">1,242 / 4,096</span>
                     </div>
                     <div className="w-px h-6 bg-slate-800" />
                     <div className="flex flex-col">
                        <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest italic">Estimated Latency</span>
                        <span className="text-xs font-black text-emerald-500 italic">+0.4s Added</span>
                     </div>
                  </div>
                  <div className="flex items-center space-x-3 text-[10px] font-black text-slate-400 italic">
                     <ShieldCheck size={14} className="text-primary" />
                     <span>PII Sanitization Enabled</span>
                  </div>
               </div>
            </div>
         </div>

         {/* Version Manifest & Simulation */}
         <div className="col-span-12 lg:col-span-4 space-y-8 italic">
            <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative group hover:border-primary/20 transition-all flex flex-col h-full overflow-hidden">
               <div className="mb-6">
                  <h4 className="text-sm font-black text-secondary/30 uppercase tracking-widest italic mb-8">Simulation Suite</h4>
                  <div className="space-y-6">
                     <p className="text-[10px] font-black text-secondary/20 uppercase tracking-widest italic underline decoration-primary/10">Student Profile Blueprint</p>
                     <div className="p-6 bg-snow-pearl/50 rounded-2xl border border-gray-100 text-[12px] font-bold text-typography leading-relaxed shadow-inner">
                        <p className="text-secondary/30 mb-2 italic">{"{ profile }"}</p>
                        "12th Grade Student, JEE 94%, Budget 2L/yr, Interests: CSE, Bangalore"
                     </div>
                     <button className="w-full py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center space-x-3 hover:scale-105 transition-all shadow-xl shadow-primary/10">
                        <Play size={16} className="fill-current" />
                        <span>Run Dry Inference</span>
                     </button>
                  </div>
               </div>

               <div className="pt-10 border-t border-gray-50 flex-1 flex flex-col italic">
                  <h4 className="text-sm font-black text-secondary/30 uppercase tracking-widest italic mb-8">Registry Manifest</h4>
                  <div className="space-y-4 flex-1">
                     {versions.map((v) => (
                        <div key={v.id} className="p-6 bg-white border border-gray-100 rounded-2xl hover:border-primary/20 transition-all cursor-pointer group/v relative overflow-hidden">
                           <div className="absolute top-0 right-0 p-4 opacity-5 group-hover/v:scale-110 transition-transform">
                              <History size={24} className="text-primary" />
                           </div>
                           <div className="flex items-center justify-between mb-3 italic">
                              <div className="flex items-center space-x-2">
                                 <span className="text-[13px] font-black text-typography tracking-tighter">{v.version}</span>
                                 <div className={cn(
                                    "px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest italic",
                                    v.status === 'ACTIVE' ? "bg-emerald-50 text-emerald-600" : v.status === 'SHADOW' ? "bg-primary/5 text-primary" : "bg-gray-100 text-secondary/30"
                                 )}>
                                    {v.status}
                                 </div>
                              </div>
                              <span className="text-[8px] font-black text-secondary/20 uppercase tracking-widest">{v.date}</span>
                           </div>
                           <p className="text-[10px] font-bold text-secondary/40 leading-tight italic line-clamp-2 underline decoration-secondary/5">{v.desc}</p>
                           {v.status === 'SHADOW' && (
                              <button className="mt-4 w-full py-2 bg-primary/5 text-primary rounded-xl text-[8px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all border border-primary/10">
                                 Promote to Production
                              </button>
                           )}
                        </div>
                     ))}
                  </div>
                  <button className="mt-10 w-full py-4 bg-snow-pearl text-secondary/30 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-typography transition-all border border-transparent hover:border-gray-200 italic">
                     Explore full v3 Audit Trail
                  </button>
               </div>
            </section>
         </div>
      </div>

      {/* Shadow Testing Analytics Hud */}
      <section className="bg-slate-900 p-6 rounded-2xl text-white flex flex-col md:flex-row md:items-center space-y-6 md:space-y-0 md:space-x-12 italic relative group overflow-hidden">
         <div className="absolute inset-0 bg-primary/10 flex items-center space-x-2 duration-1000" />
         <div className="flex items-center space-x-6 relative z-10">
            <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center text-primary animate-pulse">
               <Split size={28} />
            </div>
            <div>
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 italic">Shadow Experiment: Multi-Lingual Persona</p>
               <h3 className="text-xl font-black text-white tracking-tighter uppercase leading-none">Traffic Split: 10% Shadow (v2.0.4) • 90% Prod (v2.1.0)</h3>
            </div>
         </div>
         <div className="flex-1 flex items-center space-x-10 relative z-10 italic">
            <div className="flex flex-col">
               <span className="text-2xl font-black text-emerald-500 tracking-tighter">98.2%</span>
               <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest italic">Safety Match</span>
            </div>
            <div className="flex flex-col">
               <span className="text-2xl font-black text-primary tracking-tighter">+2.4s</span>
               <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest italic">Avg. Latency (Prod)</span>
            </div>
            <div className="flex flex-col">
               <span className="text-2xl font-black text-amber-500 tracking-tighter">+3.1s</span>
               <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest italic">Avg. Latency (Shadow)</span>
            </div>
         </div>
         <div className="relative z-10">
            <button className="px-8 py-4 bg-white text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-primary/20 border-0 italic">
               Generate Diff Report
            </button>
         </div>
      </section>
    </div>
  );
}
