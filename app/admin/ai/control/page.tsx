"use client";

import { useState, useEffect } from "react";
import { 
  Brain, 
  ChevronRight, 
  Search, 
  Zap, 
  Globe, 
  ShieldCheck, 
  Settings, 
  Info, 
  ExternalLink,
  Edit2,
  Trash2,
  Download,
  Filter,
  Monitor,
  Flame,
  Activity,
  BarChart3,
  Terminal,
  Play,
  Share2,
  AlertTriangle,
  Cpu,
  Layers,
  Sparkles,
  Plus
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from "recharts";

interface AIModel {
  name: string;
  provider: string;
  status: string;
  latency: string;
  rate_limit: string;
  cost_today: string;
}

interface HeatmapItem {
  topic: string;
  count: number;

}

const chartData = [
  { time: "00:00", requests: 1200, score: 94 },
  { time: "04:00", requests: 800, score: 92 },
  { time: "08:00", requests: 3400, score: 96 },
  { time: "12:00", requests: 5600, score: 95 },
  { time: "16:00", requests: 4800, score: 94 },
  { time: "20:00", requests: 2900, score: 93 },
  { time: "23:59", requests: 1800, score: 95 },
];

export default function AiControlCenterPage() {
  const [models, setModels] = useState<AIModel[]>([]);
  const [heatmap, setHeatmap] = useState<HeatmapItem[]>([]);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    fetchAIConfig();
  }, []);

  const fetchAIConfig = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/ai/control");
      const data = await res.json();
      setModels(data.models || []);
      setHeatmap(data.heatmap || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return <div className="p-4 min-h-screen flex items-center justify-center text-[10px] font-black uppercase tracking-[0.5em] text-secondary/10">Loading Intelligence...</div>;

  return (
    <div className="space-y-6 font-montserrat pb-10">
      {/* Header Section */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-4 md:space-y-0 pb-4 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-1.5">
              <div className="bg-primary/5 px-2.5 py-1 rounded-lg border border-primary/10">
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary">Intelligence Ops</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30 uppercase tracking-widest text-[10px]">Oracle Cluster</span>
           </div>
           <h1 className="text-3xl font-black text-typography tracking-tighter leading-none mb-1">
             AI <span className="text-primary italic">Control</span> Center
           </h1>
           <p className="text-secondary/40 text-[10px] font-black uppercase tracking-widest mt-1.5 leading-none">
              Managing 1.2M+ Real-time Councilor Inferences / Day
           </p>
        </div>

        <div className="flex items-center space-x-3">
           <button className="flex items-center space-x-2 px-6 py-2.5 bg-white border border-gray-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all text-secondary/40 shadow-sm active:scale-95">
              <Download size={14} />
              <span>Export Logs</span>
           </button>
           <button className="flex items-center space-x-2 px-6 py-2.5 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20">
              <Plus size={14} />
              <span>Deploy Model</span>
           </button>
        </div>
      </section>

      {/* Model Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? [...Array(3)].map((_, i) => (
          <div key={i} className="h-48 bg-white rounded-xl border border-gray-100 animate-pulse shadow-sm" />
        )) : models.map((m) => (
          <div key={m.name} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all group overflow-hidden relative flex flex-col justify-between min-h-[160px]">
             <div className="absolute -right-4 -top-4 w-20 h-20 bg-primary/5 rounded-full group-hover:scale-150 transition-transform duration-700" />
             
             <div className="flex justify-between items-start mb-6 relative">
                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-primary border border-gray-200 shadow-sm group-hover:bg-primary/5 transition-colors">
                   <Cpu size={18} />
                </div>
                <div className={cn(
                  "px-2.5 py-1 rounded-md text-[8px] font-black uppercase tracking-widest border shadow-sm leading-none",
                  m.status === 'HEALTHY' ? "bg-emerald-50 text-emerald-600 border-emerald-100/50" : "bg-amber-50 text-amber-600 border-amber-100/50"
                )}>
                   {m.status}
                </div>
             </div>

             <div>
                <h3 className="text-sm font-black text-typography tracking-tighter leading-none mb-2 group-hover:text-primary transition-colors">{m.name}</h3>
                <p className="text-[8px] font-black text-secondary/30 uppercase tracking-widest mb-4 block truncate">{m.provider} Infrastructure</p>
                
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                   <div>
                      <p className="text-sm font-black text-typography leading-none">{m.latency}</p>
                      <p className="text-[7px] font-black text-secondary/30 uppercase tracking-widest mt-1.5">Latency</p>
                   </div>
                   <div>
                      <p className="text-sm font-black text-typography leading-none">{m.rate_limit}</p>
                      <p className="text-[7px] font-black text-secondary/30 uppercase tracking-widest mt-1.5">Rate Limit</p>
                   </div>
                </div>
             </div>
          </div>
        ))}
      </section>

      {/* Analytics & Heatmap Overlay */}
      <section className="grid grid-cols-12 gap-4">
         {/* Performance Chart */}
         <div className="col-span-12 lg:col-span-8 bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
               <div>
                  <h3 className="text-sm font-black text-typography uppercase tracking-tighter leading-none mb-1">System Performance</h3>
                  <p className="text-[9px] font-black text-secondary/30 uppercase tracking-widest leading-none">Real-time Inference Monitoring</p>
               </div>
               <div className="flex items-center space-x-1.5 bg-gray-50 p-1.5 rounded-lg border border-gray-100 shadow-inner w-fit">
                  <button className="px-4 py-1.5 bg-white text-primary rounded-md text-[8px] font-black uppercase tracking-widest shadow-sm border border-gray-100">Today</button>
                  <button className="px-4 py-1.5 text-secondary/40 hover:text-secondary hover:bg-white rounded-md text-[8px] font-black uppercase tracking-widest transition-all">7 Days</button>
               </div>
            </div>

            <div className="h-[250px] w-full mt-auto">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                     <defs>
                        <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#002147" stopOpacity={0.1}/>
                           <stop offset="95%" stopColor="#002147" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                     <XAxis 
                       dataKey="time" 
                       axisLine={false} 
                       tickLine={false} 
                       tick={{ fontSize: 9, fontWeight: 900, fill: '#94A3B8' }}
                       dy={10}
                     />
                     <YAxis hide />
                     <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: '1px solid #F1F5F9', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.05)', padding: '12px', fontSize: '10px', fontWeight: 'bold' }}
                     />
                     <Area 
                        type="monotone" 
                        dataKey="requests" 
                        stroke="#002147" 
                        strokeWidth={3} 
                        fillOpacity={1} 
                        fill="url(#colorRequests)" 
                        animationDuration={1500}
                     />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* Knowledge Heatmap */}
         <div className="col-span-12 lg:col-span-4 bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between">
            <div>
               <h3 className="text-sm font-black text-typography uppercase tracking-tighter leading-none mb-1">Intent Heatmap</h3>
               <p className="text-[9px] font-black text-secondary/30 uppercase tracking-widest leading-none">Identified Content Gaps & Topics</p>
               
               <div className="space-y-4 mt-6">
                  {[
                    { topic: "B.Tech Placements 2025", count: 420, score: 98 },
                    { topic: "Scholarship Deadlines", count: 310, score: 84 },
                    { topic: "CUET Exam Dates", count: 280, score: 92 },
                    { topic: "College Comparison", count: 240, score: 76 },
                    { topic: "Fees Installments", count: 180, score: 65 }
                  ].map((item, i) => (
                    <div key={item.topic} className="group cursor-help">
                       <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-black text-typography group-hover:text-primary transition-colors truncate pr-2 uppercase">{item.topic}</span>
                          <span className={cn(
                             "text-[8px] font-black flex-shrink-0 px-2 py-0.5 rounded-full border",
                             item.score > 90 ? "text-emerald-600 bg-emerald-50 border-emerald-100/50" : 
                             item.score > 75 ? "text-blue-600 bg-blue-50 border-blue-100/50" : 
                             "text-amber-600 bg-amber-50 border-amber-100/50"
                          )}>{item.score}%</span>
                       </div>
                       <div className="h-1.5 bg-gray-50 rounded-full overflow-hidden border border-gray-100 shadow-inner">
                          <div 
                            className={cn(
                               "h-full transition-transform duration-1000 origin-left shadow-sm",
                               item.score > 90 ? "bg-emerald-500" : 
                               item.score > 75 ? "bg-blue-500" : 
                               "bg-amber-500"
                            )}
                            style={{ width: `${(item.count / 420) * 100}%` }} 
                          />
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 mt-6 shadow-sm flex items-start space-x-3">
               <Sparkles size={16} className="text-primary mt-0.5" />
               <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-primary leading-none mb-1.5">AI Insight</p>
                  <p className="text-[9px] font-black text-secondary/60 leading-relaxed uppercase">
                     Knowledge staleness detected in "Comparison". <span className="text-primary italic">Re-index 2025 NIRF rankings.</span>
                  </p>
               </div>
            </div>
         </div>
      </section>

      {/* Prompt Laboratory Control Overlay */}
      <section className="bg-slate-900 p-8 rounded-xl text-white shadow-xl relative overflow-hidden group">
         <div className="absolute right-0 top-0 w-1/4 h-full bg-gradient-to-l from-primary/10 to-transparent pointer-events-none" />
         
         <div className="grid grid-cols-12 gap-6 items-center relative z-10">
            <div className="col-span-12 lg:col-span-8 space-y-6">
               <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center text-primary shadow-inner">
                     <Terminal size={24} />
                  </div>
                  <div>
                     <h3 className="text-2xl font-black tracking-tighter leading-none italic">Prompt <span className="text-slate-500">Laboratory</span></h3>
                     <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-1.5 leading-none">Production Testbed v.3.2</p>
                  </div>
               </div>
               
               <p className="text-sm font-black text-slate-400 leading-relaxed max-w-xl truncate lowercase underline decoration-white/5">
                  "You are an expert Educational Councilor for Indian students. Provide advice on colleges, scholarships..."
               </p>

               <div className="flex items-center space-x-3">
                  <button className="px-6 py-3 bg-white text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg flex items-center space-x-2">
                     <Play size={14} className="fill-current" />
                     <span>Test Live</span>
                  </button>
                  <button className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 active:scale-95 transition-all flex items-center space-x-2">
                     <Settings size={14} />
                     <span>Parameters</span>
                  </button>
               </div>
            </div>

            <div className="col-span-12 lg:col-span-4 flex flex-col items-center lg:items-end justify-center">
               <div className="grid grid-cols-2 gap-4 w-full">
                  <div className="bg-white/5 p-5 rounded-xl border border-white/10 shadow-inner group-hover:bg-white/10 transition-colors">
                     <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1 leading-none">Recall</p>
                     <p className="text-2xl font-black text-white tracking-widest leading-none">94.8%</p>
                  </div>
                  <div className="bg-white/5 p-5 rounded-xl border border-white/10 shadow-inner group-hover:bg-white/10 transition-colors">
                     <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1 leading-none">Hallucination</p>
                     <p className="text-2xl font-black text-emerald-400 tracking-widest leading-none">0.02</p>
                  </div>
               </div>
            </div>
         </div>
         
         <div className="mt-8 pt-5 border-t border-white/5 flex items-center space-x-6 text-slate-500">
            <div className="flex items-center space-x-2">
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
               <span className="text-[8px] font-black uppercase tracking-widest">Oracle Node-7 Online</span>
            </div>
            <div className="flex items-center space-x-2">
               <ShieldCheck size={12} />
               <span className="text-[8px] font-black uppercase tracking-widest">Privacy Protocol 2.0</span>
            </div>
         </div>
      </section>
    </div>
  );
}
