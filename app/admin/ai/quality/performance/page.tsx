"use client";

import { useState } from "react";
import { 
  BarChart3, 
  Search, 
  Filter, 
  ChevronRight, 
  ThumbsUp, 
  ThumbsDown, 
  AlertTriangle, 
  CheckCircle2, 
  MessageSquare, 
  Clock, 
  Activity, 
  TrendingUp, 
  ArrowUpRight, 
  Zap, 
  History, 
  RotateCcw, 
  Layers,
  Sparkles,
  ExternalLink,
  BrainCircuit,
  PieChart
} from "lucide-react";
import { cn } from "@/lib/utils";

interface QualityMetric {
  id: string;
  category: string;
  score: number;
  trend: number;
  status: 'OPTIMAL' | 'WARNING' | 'CRITICAL';
}

interface FeedbackSample {
  id: string;
  time: string;
  query: string;
  reason: string;
  tags: string[];
}

export default function PromptPerformanceDashboard() {
  const [metrics] = useState<QualityMetric[]>([
    { id: "Q1", category: "Recommendation Accuracy", score: 94.2, trend: 1.2, status: 'OPTIMAL' },
    { id: "Q2", category: "Fact-Check Integrity", score: 88.4, trend: -4.2, status: 'WARNING' },
    { id: "Q3", category: "User Engagement (Turns)", score: 6.4, trend: 0.8, status: 'OPTIMAL' },
    { id: "Q4", category: "Hallucination Rate", score: 0.4, trend: -0.1, status: 'OPTIMAL' },
  ]);

  const [samples] = useState<FeedbackSample[]>([
    { id: "F1", time: "14 mins ago", query: "Top medical colleges in UP with low fee structure...", reason: "Rankings out of sync with 2026 data", tags: ["Stale Data", "Fees"] },
    { id: "F2", time: "2 hours ago", query: "Can I get admission in IIT with 92 percentile?", reason: "Missed category reservation details", tags: ["Incomplete", "IIT"] },
    { id: "F3", time: "1 day ago", query: "Private btech colleges in Bangalore with good placements", reason: "Hallucinated placement stats for minor college", tags: ["Hallucination", "Placements"] },
  ]);

  return (
    <div className="space-y-6 font-montserrat italic">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-4 border-b border-gray-100 italic">
        <div>
           <div className="flex items-center space-x-3 mb-2 italic">
              <div className="bg-primary/5 px-3 py-1.5 rounded-xl border border-primary/10">
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary italic lowercase underline decoration-primary/10">Inference Quality SDK</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30">Counselor Intelligence Audit</span>
           </div>
           <h1 className="text-3xl md:text-3xl md:text-5xl font-black text-typography tracking-tighter leading-none mb-1">
             AI <span className="text-primary italic">Quality</span>
           </h1>
           <p className="text-secondary/40 text-sm font-bold uppercase tracking-widest mt-2">
              Monitoring Sentiment Analyzers & Hallucination Guardrails Across 100k+ Turns
           </p>
        </div>

        <div className="flex items-center space-x-4">
           <div className="bg-white px-8 py-4 rounded-3xl border border-gray-100 shadow-sm flex items-center space-x-6">
              <div>
                 <p className="text-[10px] font-black text-secondary/20 uppercase tracking-widest mb-1 italic">Customer Satisfaction (CSAT)</p>
                 <p className="text-2xl font-black tracking-tighter text-emerald-500 italic">92.4% <span className="text-secondary/20 text-[10px] font-black not-italic ml-2 uppercase">Score</span></p>
              </div>
              <ThumbsUp size={32} className="text-emerald-500 animate-bounce" />
           </div>
        </div>
      </section>

      {/* Sentiment & Engagement Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-5">
         {metrics.map((m) => (
           <div key={m.id} className="bg-white p-5 rounded-2xl border border-gray-50 shadow-sm relative group hover:border-primary/20 transition-all cursor-pointer">
              <div className="flex items-center justify-between mb-4 italic">
                 <div className={cn(
                    "px-3 py-1 text-[9px] font-black rounded-full border italic",
                    m.status === 'OPTIMAL' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-rose-50 text-rose-600 border-rose-100"
                 )}>
                    {m.status}
                 </div>
                 <div className={cn("flex items-center space-x-1 text-[9px] font-black uppercase tracking-widest", m.trend > 0 ? "text-emerald-500" : "text-rose-500")}>
                    {m.trend > 0 ? <TrendingUp size={12} /> : <TrendingUp size={12} className="rotate-180" />}
                    <span>{Math.abs(m.trend).toFixed(1)}%</span>
                 </div>
              </div>
              <p className="text-4xl font-black text-typography tracking-tighter capitalize leading-none mb-1 italic">{m.score}{m.id === 'Q3' ? 'x' : '%'}</p>
              <p className="text-[10px] font-bold text-secondary/30 uppercase tracking-widest italic">{m.category}</p>
           </div>
         ))}
      </div>

      <div className="grid grid-cols-12 gap-6">
         {/* Low Quality Response Feed - Hallucination Hunter */}
         <div className="col-span-12 lg:col-span-8 bg-white rounded-2xl border border-gray-50 shadow-sm overflow-hidden flex flex-col italic">
            <div className="p-6 md:p-6 border-b border-gray-50 flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-rose-50/10 border-rose-100/20">
               <div className="flex items-center space-x-6">
                  <div className="w-14 h-14 bg-rose-500 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-rose-500/20">
                     <ThumbsDown size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-typography tracking-tighter italic lowercase underline decoration-rose-500/20 select-none">Hallucination & Rejection Feed</h3>
                    <p className="text-[10px] font-bold text-secondary/30 uppercase tracking-[0.2em] mt-1 italic select-none">Investigate Thumbs Down Samples for Prompt Optimization</p>
                  </div>
               </div>
               <button className="flex items-center space-x-2 px-6 py-3 bg-white border border-rose-100 text-rose-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-600 hover:text-white transition-all shadow-sm">
                  <AlertTriangle size={16} />
                  <span>Drill Into 14 Criticals</span>
               </button>
            </div>
            <div className="divide-y divide-gray-50">
               {samples.map((sample) => (
                  <div key={sample.id} className="p-6 group hover:bg-snow-pearl/30 transition-all flex items-start justify-between cursor-pointer">
                     <div className="flex-1 space-y-4">
                        <div className="flex items-center space-x-3">
                           <span className="text-[10px] font-black text-secondary/20 uppercase tracking-widest">{sample.time}</span>
                           <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                        </div>
                        <h4 className="text-lg font-black text-typography tracking-tighter leading-snug lowercase underline decoration-primary/10">"{sample.query}"</h4>
                        <p className="text-sm font-bold text-rose-500 leading-relaxed max-w-2xl">Refused/Disliked: {sample.reason}</p>
                        <div className="flex items-center space-x-3 pt-2">
                           {sample.tags.map(t => (
                              <span key={t} className="px-3 py-1 bg-snow-pearl text-[9px] font-black text-secondary/40 rounded-lg uppercase tracking-widest group-hover:bg-white group-hover:text-primary transition-all border border-transparent group-hover:border-primary/5 italic">{t}</span>
                           ))}
                        </div>
                     </div>
                     <button className="p-5 bg-snow-pearl rounded-2xl text-secondary/20 hover:bg-primary hover:text-white transition-all shadow-sm group/btn">
                        <MessageSquare size={22} className="group-hover/btn:scale-110 transition-transform" />
                     </button>
                  </div>
               ))}
            </div>
            <div className="p-5 border-t border-gray-50 text-center bg-snow-pearl/30">
               <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline italic decoration-primary/20">Explore all 842 sentiment markers</button>
            </div>
         </div>

         {/* Failure Category Distribution */}
         <div className="col-span-12 lg:col-span-4 space-y-8 italic">
            <section className="bg-slate-900 p-6 rounded-2xl text-white flex flex-col justify-between relative overflow-hidden group min-h-[500px]">
               <div className="absolute top-0 right-0 p-5 opacity-10 group-hover:scale-110 transition-transform duration-1000">
                  <PieChart size={140} className="text-rose-500" />
               </div>
               <div className="relative z-10">
                  <h4 className="text-sm font-black text-slate-500 uppercase tracking-widest mb-6 italic underline decoration-rose-500/20">Top Failure Clusters</h4>
                  <div className="space-y-6">
                    {[
                      { label: "Stale Fee Data", val: 42, color: "bg-rose-500" },
                      { label: "Wrong Category Logic", val: 28, color: "bg-rose-400" },
                      { label: "Tone Misalignment", val: 18, color: "bg-rose-300" },
                      { label: "Logic Loop Error", val: 12, color: "bg-rose-200" }
                    ].map((f, i) => (
                      <div key={i} className="space-y-3">
                         <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-widest">
                            <span className="text-slate-400">{f.label}</span>
                            <span className="text-white italic">{f.val}%</span>
                         </div>
                         <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                            <div className={cn("h-full transition-all group-hover:scale-x-105 duration-1000 origin-left", f.color)} style={{ width: `${f.val}%` }} />
                         </div>
                      </div>
                    ))}
                  </div>
               </div>
               <div className="mt-14 pt-10 border-t border-slate-800 relative z-10 flex items-center justify-between italic">
                  <div>
                    <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest italic leading-none mb-1">Quality Policy v2.1</p>
                    <p className="text-[11px] font-black text-slate-400 tracking-tight underline decoration-primary/10">Zero-Hallucination Guardrails Active</p>
                  </div>
                  <Sparkles size={24} className="text-primary animate-pulse" />
               </div>
            </section>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6 group hover:border-primary/20 transition-all cursor-pointer">
               <Activity size={28} className="text-secondary/10 group-hover:text-primary transition-colors" />
               <p className="text-[10px] font-black text-secondary/30 uppercase tracking-widest mb-1 italic">Average Turn Engagement</p>
               <h4 className="text-xl font-black text-typography uppercase tracking-tight leading-tight italic lowercase">6.4 Turns per Session</h4>
               <p className="text-[10px] font-bold text-secondary/40 leading-relaxed mt-2 uppercase tracking-widest italic decoration-emerald-500/10 underline">High turn engagement indicates deep counseling value. Sessions exceeding 12 turns flagged for potential logic loops.</p>
            </div>
         </div>
      </div>
    </div>
  );
}
