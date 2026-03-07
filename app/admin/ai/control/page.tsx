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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAIConfig();
  }, []);

  const fetchAIConfig = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/ai/control");
      const data = await res.json();
      setModels(data.models);
      setHeatmap(data.heatmap);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Header Section */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-6 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-2">
              <div className="bg-primary/5 px-3 py-1.5 rounded-xl border border-primary/10">
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary italic">Intelligence Ops</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30">Llama 3.1 & GPT-4 Oracle Control</span>
           </div>
           <h1 className="text-5xl font-black text-typography tracking-tighter leading-none mb-1">
             AI <span className="text-primary italic">Control</span> Center
           </h1>
           <p className="text-secondary/40 text-sm font-bold uppercase tracking-widest mt-2">
              Managing 1.2M+ Real-time Councilor Inferences / Day
           </p>
        </div>

        <div className="flex items-center space-x-4">
           <button className="flex items-center space-x-3 px-8 py-5 bg-gray-50 border border-gray-200/50 rounded-3xl text-[11px] font-black uppercase tracking-widest hover:bg-white hover:border-gray-200 transition-all active:scale-95 text-secondary/60">
              <Download size={18} />
              <span>Export Logs</span>
           </button>
           <button className="flex items-center space-x-3 px-10 py-5 bg-primary text-white rounded-3xl text-[11px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20">
              <Plus size={18} />
              <span>Deploy New Model</span>
           </button>
        </div>
      </section>

      {/* Model Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? [...Array(3)].map((_, i) => (
          <div key={i} className="h-[250px] bg-white rounded-[2.5rem] border border-gray-50 animate-pulse" />
        )) : models.map((m) => (
          <div key={m.name} className="bg-white p-10 rounded-[3rem] border border-gray-50 shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all group overflow-hidden relative">
             <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary/5 rounded-full group-hover:scale-150 transition-transform duration-700" />
             
             <div className="flex justify-between items-start mb-8 relative">
                <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center text-primary">
                   <Cpu size={24} />
                </div>
                <div className={cn(
                  "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest",
                  m.status === 'HEALTHY' ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-amber-50 text-amber-600 border border-amber-100"
                )}>
                   {m.status}
                </div>
             </div>

             <h3 className="text-xl font-black text-typography tracking-tight leading-none mb-2">{m.name}</h3>
             <p className="text-[10px] font-black text-secondary/30 uppercase tracking-[0.2em] mb-8">{m.provider} Infrastructure</p>
             
             <div className="grid grid-cols-2 gap-6 pt-6 border-t border-gray-50">
                <div>
                   <p className="text-lg font-black text-typography">{m.latency}</p>
                   <div className="flex items-center space-x-1 text-[9px] font-black text-secondary/20 uppercase tracking-widest">
                      <Zap size={10} />
                      <span>Latency</span>
                   </div>
                </div>
                <div>
                   <p className="text-lg font-black text-typography">{m.rate_limit}</p>
                   <div className="flex items-center space-x-1 text-[9px] font-black text-secondary/20 uppercase tracking-widest">
                      <Activity size={10} />
                      <span>Rate Limit</span>
                   </div>
                </div>
             </div>
          </div>
        ))}
      </section>

      {/* Analytics & Heatmap Overlay */}
      <section className="grid grid-cols-12 gap-8">
         {/* Performance Chart */}
         <div className="col-span-12 lg:col-span-8 bg-white p-12 rounded-[3.5rem] border border-gray-50 shadow-sm">
            <div className="flex items-center justify-between mb-10">
               <div>
                  <h3 className="text-2xl font-black text-typography tracking-tight">System Performance</h3>
                  <p className="text-[10px] font-bold text-secondary/40 uppercase tracking-widest mt-1">Real-time Inference Monitoring</p>
               </div>
               <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded-2xl border border-gray-100 italic">
                  <button className="px-5 py-2 bg-white text-primary rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm">Today</button>
                  <button className="px-5 py-2 text-secondary/30 hover:text-secondary rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">7 Days</button>
               </div>
            </div>

            <div className="h-[350px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
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
                       tick={{ fontSize: 10, fontWeight: 900, fill: '#94A3B8' }}
                       dy={10}
                     />
                     <YAxis hide />
                     <Tooltip 
                        contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 50px -10px rgba(0,0,0,0.1)', padding: '20px' }}
                        cursor={{ stroke: '#01579B', strokeWidth: 2, strokeDasharray: '5 5' }}
                     />
                     <Area 
                        type="monotone" 
                        dataKey="requests" 
                        stroke="#002147" 
                        strokeWidth={4} 
                        fillOpacity={1} 
                        fill="url(#colorRequests)" 
                        animationDuration={2000}
                     />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* Knowledge Heatmap */}
         <div className="col-span-12 lg:col-span-4 bg-white p-12 rounded-[3.5rem] border border-gray-50 shadow-sm flex flex-col justify-between">
            <div>
               <h3 className="text-2xl font-black text-typography tracking-tight">Intent Heatmap</h3>
               <p className="text-[10px] font-bold text-secondary/40 uppercase tracking-widest mt-1">Identified Content Gaps & Hot Topics</p>
               
               <div className="space-y-6 mt-12 italic">
                  {[
                    { topic: "B.Tech Placements 2025", count: 420, score: 98 },
                    { topic: "Scholarship Deadlines", count: 310, score: 84 },
                    { topic: "CUET Exam Dates", count: 280, score: 92 },
                    { topic: "College Comparison", count: 240, score: 76 },
                    { topic: "Fees Installments", count: 180, score: 65 }
                  ].map((item, i) => (
                    <div key={item.topic} className="group cursor-help">
                       <div className="flex items-center justify-between mb-2">
                          <span className="text-[11px] font-black text-typography group-hover:text-primary transition-colors">{item.topic}</span>
                          <div className="flex items-center space-x-2">
                             <span className="text-[9px] font-black uppercase text-emerald-500">{item.score}% Recall</span>
                             <span className="text-secondary/10">|</span>
                             <span className="text-[9px] font-bold text-secondary/40 uppercase tracking-widest">{item.count} Q</span>
                          </div>
                       </div>
                       <div className="h-1.5 w-full bg-gray-50 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary group-hover:scale-x-105 origin-left transition-transform duration-700" 
                            style={{ width: `${(item.count / 420) * 100}%` }} 
                          />
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="bg-primary/5 p-6 rounded-[2.5rem] border border-primary/10 mt-10">
               <div className="flex items-center space-x-3 mb-3">
                  <Sparkles size={16} className="text-primary" />
                  <p className="text-[10px] font-black uppercase tracking-widest text-primary italic lowercase">Operational Insight</p>
               </div>
               <p className="text-[11px] font-bold text-secondary leading-relaxed">
                  Knowledge staleness detected in "College Comparison".建议: Re-index latest 2025 NIRF rankings.
               </p>
            </div>
         </div>
      </section>

      {/* Prompt Laboratory Control Overlay */}
      <section className="bg-typography p-16 rounded-[4rem] text-white shadow-2xl shadow-primary/20 relative overflow-hidden group">
         <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-primary/20 to-transparent pointer-events-none" />
         
         <div className="grid grid-cols-12 gap-10 items-center relative">
            <div className="col-span-12 lg:col-span-7 space-y-8">
               <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center text-primary">
                     <Terminal size={32} />
                  </div>
                  <div>
                     <h3 className="text-4xl font-black tracking-tight leading-none italic uppercase">Prompt <span className="text-secondary/40">Laboratory</span></h3>
                     <p className="text-sm font-bold text-secondary/30 uppercase tracking-widest mt-2">v.3.2 Production Testbed</p>
                  </div>
               </div>
               
               <p className="text-xl font-bold text-white/50 leading-relaxed max-w-2xl italic">
                  "You are an expert Educational Councilor for Indian students. Provide advice on colleges, scholarships and career paths based on the student's profile..."
               </p>

               <div className="flex items-center space-x-4">
                  <button className="px-10 py-5 bg-white text-typography rounded-[2rem] text-[11px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/5 flex items-center space-x-3">
                     <Play size={16} className="fill-current" />
                     <span>Test Live Prompt</span>
                  </button>
                  <button className="px-10 py-5 bg-white/10 border border-white/10 text-white rounded-[2rem] text-[11px] font-black uppercase tracking-widest hover:bg-white/20 transition-all flex items-center justify-center space-x-3">
                     <Settings size={16} />
                     <span>Advanced Parameters</span>
                  </button>
               </div>
            </div>

            <div className="col-span-12 lg:col-span-5 italic">
               <div className="grid grid-cols-2 gap-6 pb-20">
                  <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10">
                     <p className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-1 italic">Knowledge Recall</p>
                     <p className="text-2xl font-black">94.8%</p>
                  </div>
                  <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10">
                     <p className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-1 italic">Hallucination Index</p>
                     <p className="text-2xl font-black text-emerald-400">0.02</p>
                  </div>
               </div>
            </div>
         </div>
         
         <div className="mt-20 flex items-center space-x-10 text-white/20">
            <div className="flex items-center space-x-2">
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
               <span className="text-[9px] font-black uppercase tracking-widest">Oracle Node-7 Online</span>
            </div>
            <div className="flex items-center space-x-2">
               <ShieldCheck size={14} />
               <span className="text-[9px] font-black uppercase tracking-widest">Privacy Protocol 2.0</span>
            </div>
         </div>
      </section>
    </div>
  );
}
