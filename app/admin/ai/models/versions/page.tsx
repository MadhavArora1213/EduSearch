"use client";

import { useState } from "react";
import { 
  History, 
  Search, 
  Filter, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle, 
  XCircle, 
  RotateCcw, 
  Zap, 
  Layers, 
  HardDrive, 
  Package, 
  Split, 
  ArrowUpRight, 
  MoreHorizontal, 
  DownloadCloud, 
  ShieldCheck, 
  Activity, 
  Trash2,
  Trash
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AIModel {
  id: string;
  name: string;
  size: string;
  downloadDate: string;
  status: 'ACTIVE' | 'AVAILABLE' | 'DEPRECATED';
  performance: number; // 0-100 quality score
  latency: number; // in ms
}

export default function ModelVersionManager() {
  const [models] = useState<AIModel[]>([
    { id: "M1", name: "llama3.1:8b-instruct-q4_K_M", size: "4.7 GB", downloadDate: "2026-03-01", status: 'ACTIVE', performance: 94, latency: 2420 },
    { id: "M2", name: "mistral:7b-instruct-v0.3-q4_0", size: "4.1 GB", downloadDate: "2026-02-15", status: 'AVAILABLE', performance: 88, latency: 1840 },
    { id: "M3", name: "llama3:8b-instruct-q4_0", size: "4.7 GB", downloadDate: "2026-01-20", status: 'DEPRECATED', performance: 82, latency: 3100 },
    { id: "M4", name: "phi3:3.8b-mini-instruct-q4_K_M", size: "2.2 GB", downloadDate: "2026-03-05", status: 'AVAILABLE', performance: 76, latency: 840 }
  ]);

  return (
    <div className="space-y-10">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-6 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-2">
              <div className="bg-primary/5 px-3 py-1.5 rounded-xl border border-primary/10">
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary italic lowercase underline decoration-primary/10">Ollama Image Repository</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30">Model Registry & A/B Experiments</span>
           </div>
           <h1 className="text-5xl font-black text-typography tracking-tighter leading-none mb-1">
             Version <span className="text-primary italic">Control</span>
           </h1>
           <p className="text-secondary/40 text-sm font-bold uppercase tracking-widest mt-2">
              Managing 100GB VPS Disk Slice for Local LLM Quantizations
           </p>
        </div>

        <div className="flex items-center space-x-4">
           <div className="bg-white px-8 py-4 rounded-3xl border border-gray-100 shadow-sm flex items-center space-x-6 overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 blur-3xl rounded-full" />
              <div>
                 <p className="text-[10px] font-black text-secondary/20 uppercase tracking-widest mb-1 italic">VPS Disk Usage (Models)</p>
                 <p className="text-2xl font-black tracking-tighter italic">15.7GB <span className="text-secondary/20 text-[10px] font-black not-italic ml-2 uppercase tracking-widest">/ 100GB</span></p>
              </div>
              <HardDrive size={32} className="text-secondary/10 group-hover:text-primary transition-colors duration-500" />
           </div>
           <button className="flex items-center space-x-2 px-8 py-4 bg-primary text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20">
              <DownloadCloud size={18} />
              <span>Pull New Model</span>
           </button>
        </div>
      </section>

      {/* A/B Testing Hud */}
      <section className="bg-slate-900 p-10 rounded-[3rem] text-white flex flex-col md:flex-row md:items-center space-y-8 md:space-y-0 md:space-x-12 relative overflow-hidden group">
         <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-110 transition-transform duration-1000">
            <Split size={140} className="text-primary" />
         </div>
         <div className="md:w-1/3 relative z-10">
            <h4 className="text-2xl font-black text-white uppercase tracking-tighter italic">Split Experimentation</h4>
            <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest mt-2 italic">Active A/B Test: Response Quality vs Inference Speed</p>
            <div className="mt-10 flex items-center space-x-6 italic">
               <div className="flex flex-col">
                  <span className="text-3xl font-black text-primary tracking-tighter">50%</span>
                  <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Variant A: Llama-3.1</span>
               </div>
               <div className="w-px h-10 bg-slate-800" />
               <div className="flex flex-col">
                  <span className="text-3xl font-black text-indigo-400 tracking-tighter">50%</span>
                  <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Variant B: Mistral-v0.3</span>
               </div>
            </div>
         </div>
         <div className="flex-1 space-y-6 relative z-10 italic">
            <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/5 flex items-center justify-between hover:border-primary/30 transition-all cursor-pointer group/v">
               <div className="flex items-center space-x-6">
                  <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center text-primary group-hover/v:scale-110 transition-transform">
                     <ShieldCheck size={28} />
                  </div>
                  <div>
                     <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 italic">Real-Time Leaderboard</p>
                     <h5 className="text-xl font-black text-white tracking-tighter uppercase leading-none">Llama-3.1 is winning (Quality score +14%)</h5>
                  </div>
               </div>
               <button className="px-8 py-3 bg-white text-slate-900 rounded-xl text-[9px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-primary/20 italic">
                  End & Promote A
               </button>
            </div>
         </div>
      </section>

      {/* Model Repository Table */}
      <section className="bg-white rounded-[3rem] border border-gray-50 shadow-sm overflow-hidden flex flex-col italic">
        <div className="p-10 border-b border-gray-50 flex items-center justify-between bg-snow-pearl/30 border-gray-100">
           <div>
              <h3 className="text-xl font-black text-typography tracking-tighter italic lowercase underline decoration-primary/10 select-none">Ollama Model Image Hub</h3>
              <p className="text-[10px] font-bold text-secondary/30 uppercase tracking-[0.2em] mt-1 italic select-none">Managing Quantized Binary Blobs & Version History</p>
           </div>
           <div className="flex items-center space-x-2">
              <Search size={18} className="text-secondary/20 mr-2" />
              <input placeholder="Filter repo..." className="bg-white border border-gray-100 px-6 py-3 rounded-2xl text-[12px] font-bold outline-none focus:ring-4 focus:ring-primary/5 transition-all w-64 shadow-sm" />
           </div>
        </div>

        <div className="overflow-x-auto">
           <table className="w-full text-left">
              <thead className="bg-snow-pearl/50 border-b border-gray-100 italic">
                 <tr>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Model Identity Vector</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Disk Footprint</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Quality Benchmark</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Deployment State</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40 text-right">Commit</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {models.map((m) => (
                  <tr key={m.id} className="group hover:bg-snow-pearl/30 transition-all">
                    <td className="px-10 py-8">
                       <div className="flex items-center space-x-6">
                          <div className={cn(
                             "w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-inner",
                             m.status === 'ACTIVE' ? "bg-emerald-50 text-emerald-600" : m.status === 'AVAILABLE' ? "bg-primary/5 text-primary" : "bg-gray-100 text-secondary/20"
                          )}>
                             <Package size={22} className={cn(m.status === 'ACTIVE' && "animate-pulse")} />
                          </div>
                          <div>
                             <h4 className="text-sm font-black text-typography leading-tight lowercase underline decoration-secondary/10 tracking-tight">{m.name}</h4>
                             <p className="text-[9px] font-bold text-secondary/30 uppercase tracking-widest mt-1 italic">Downloaded: {m.downloadDate}</p>
                          </div>
                       </div>
                    </td>
                    <td className="px-10 py-8">
                       <span className="text-[13px] font-black text-secondary/40 uppercase italic tracking-tighter">{m.size}</span>
                    </td>
                    <td className="px-10 py-8">
                       <div className="flex flex-col">
                          <p className="text-lg font-black text-typography tracking-tighter">{m.performance}% Score</p>
                          <p className="text-[9px] font-bold text-emerald-500 uppercase italic">Avg. {m.latency}ms Latency</p>
                       </div>
                    </td>
                    <td className="px-10 py-8">
                       <span className={cn(
                          "px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all italic",
                          m.status === 'ACTIVE' ? "bg-emerald-50 text-emerald-600 border-emerald-100 shadow-sm" :
                          m.status === 'AVAILABLE' ? "bg-indigo-50 text-indigo-600 border-indigo-100" : "bg-gray-50 text-gray-400 border-gray-100 opacity-40"
                       )}>
                          {m.status}
                       </span>
                    </td>
                    <td className="px-10 py-8 text-right">
                       <div className="flex items-center justify-end space-x-2">
                          {m.status === 'AVAILABLE' && (
                             <button className="px-6 py-2 bg-emerald-500 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-emerald-500/10 italic">
                                Activate Hot
                             </button>
                          )}
                          <button className="p-4 bg-white border border-gray-100 rounded-2xl hover:bg-rose-500 hover:text-white transition-all shadow-sm group/btn" title="Purge Model Image">
                             <Trash2 size={18} />
                          </button>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
           </table>
        </div>

        <div className="p-10 border-t border-gray-50 flex items-center justify-between text-[11px] font-bold text-secondary/30 uppercase tracking-widest italic bg-snow-pearl/10 overflow-hidden relative group/footer">
           <div className="absolute inset-0 opacity-10 bg-primary translate-x-full group-hover/footer:translate-x-0 transition-transform duration-1000" />
           <div className="flex items-center space-x-3 relative z-10">
              <RotateCcw size={16} className="text-primary italic animate-spin-slow" />
              <span>One-Click Rollback Protocol Enabled • Instant Weight Swapping</span>
           </div>
           <p className="relative z-10">Last Model Shift: 14h 22m ago</p>
        </div>
      </section>
    </div>
  );
}

function Trash2Icon(props: any) {
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
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  );
}
