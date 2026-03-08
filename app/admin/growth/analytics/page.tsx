"use client";

import { useState, useEffect } from "react";
import { 
  TrendingUp, 
  Users, 
  MousePointer2, 
  BarChart3, 
  ChevronRight, 
  ArrowUpRight, 
  ArrowDownRight,
  Filter,
  Download,
  Calendar,
  Layers,
  Zap,
  Target,
  LayoutGrid,
  Clock,
  PieChart as PieChartIcon,
  RotateCw
} from "lucide-react";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, BarChart, Bar, Cell, PieChart, Pie
} from 'recharts';
import { cn } from "@/lib/utils";

// Mock Data
const engagementTrends = [
  { name: 'Week 1', dau: 4500, wau: 22000, mau: 85000 },
  { name: 'Week 2', dau: 5200, wau: 24000, mau: 88000 },
  { name: 'Week 3', dau: 4800, wau: 23500, mau: 86000 },
  { name: 'Week 4', dau: 6100, wau: 28000, mau: 92000 },
  { name: 'Week 5', dau: 5900, wau: 27500, mau: 95000 },
  { name: 'Week 6', dau: 7200, wau: 32000, mau: 105000 },
  { name: 'Week 7', dau: 8400, wau: 38000, mau: 120000 },
];

const bounceRates = [
  { type: 'Homepage', rate: 42, color: '#0B2447' },
  { type: 'College Listing', rate: 35, color: '#19376D' },
  { type: 'College Profile', rate: 28, color: '#3B82F6' },
  { type: 'Exam Pages', rate: 48, color: '#60A5FA' },
  { type: 'AI Counselor', rate: 12, color: '#10B981' },
];

const sessionDuration = [
  { name: 'Mon', mins: 3.2 },
  { name: 'Tue', mins: 3.5 },
  { name: 'Wed', mins: 4.1 },
  { name: 'Thu', mins: 3.8 },
  { name: 'Fri', mins: 4.4 },
  { name: 'Sat', mins: 5.2 },
  { name: 'Sun', mins: 5.8 },
];

export default function GrowthAnalyticsPage() {
  const [timeRange, setTimeRange] = useState('90d');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="p-6 min-h-screen bg-gray-50/20 animate-pulse flex items-center justify-center text-[10px] font-black uppercase tracking-[0.5em] text-secondary/10 italic">Waking up growth engines...</div>;
  }

  return (
    <div className="space-y-6 font-montserrat">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-4 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-1.5">
              <div className="bg-primary/5 px-3 py-1.5 rounded-xl border border-primary/10">
                 <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Growth Ops</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30 uppercase tracking-widest text-[10px]">Intel Hub</span>
           </div>
           <h1 className="text-3xl md:text-4xl font-black text-typography tracking-tighter leading-none mb-1">
             Growth <span className="text-primary italic">Intelligence</span>
           </h1>
           <p className="text-secondary/40 text-[10px] font-black uppercase tracking-[0.2em] mt-1.5 leading-none">
              Monitoring Velocity Clusters & Retention Stickiness
           </p>
        </div>
 
        <div className="flex items-center space-x-3">
           <div className="flex items-center space-x-1 bg-white p-1 rounded-xl border border-gray-100 shadow-sm">
              {['7d', '30d', '90d', '1y'].map(r => (
                <button 
                  key={r}
                  onClick={() => setTimeRange(r)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all leading-none",
                    timeRange === r ? "bg-primary text-white shadow-md shadow-primary/20" : "text-secondary/30 hover:text-secondary"
                  )}
                >
                  {r}
                </button>
              ))}
           </div>
           <button className="flex items-center space-x-2 px-6 py-2.5 bg-white border border-gray-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:text-primary transition-all shadow-sm">
              <Download size={14} />
              <span>Export</span>
           </button>
        </div>
      </section>

      {/* KPI HUD */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
         {[
           { label: "Return Visit Rate", value: "34.2%", trend: "+8.1%", icon: RotateCw, color: "text-emerald-500 bg-emerald-50" },
           { label: "Avg Session Depth", value: "4.8", trend: "Target > 4", icon: Layers, color: "text-primary bg-primary/5" },
           { label: "Retention Gap", value: "12%", trend: "Alert", icon: Target, color: "text-rose-500 bg-rose-50" },
           { label: "Identity Mix", value: "62/38", trend: "Balanced", icon: Users, color: "text-indigo-500 bg-indigo-50" },
         ].map((kpi, i) => (
           <div key={i} className="bg-white p-3.5 rounded-xl border border-gray-100 shadow-sm transition-all hover:shadow-md cursor-pointer group">
              <div className="flex items-center justify-between mb-2">
                 <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center shadow-inner", kpi.color)}>
                    <kpi.icon size={16} />
                 </div>
                 <span className={cn(
                    "text-[7px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border shadow-sm",
                    kpi.trend.includes('+') || kpi.trend === 'Balanced' ? "text-emerald-600 bg-emerald-50 border-emerald-100" : "text-rose-600 bg-rose-50 border-rose-100"
                 )}>{kpi.trend}</span>
              </div>
              <p className="text-2xl font-black text-typography tracking-tighter leading-none mb-1.5">{kpi.value}</p>
              <p className="text-[8px] font-black text-secondary/20 uppercase tracking-[0.2em]">{kpi.label}</p>
           </div>
         ))}
      </section>

      <div className="grid grid-cols-12 gap-4">
         {/* Main DAU/WAU/MAU Trend */}
         <div className="col-span-12 lg:col-span-8 bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
               <div>
                  <h3 className="text-xs font-black text-typography tracking-tighter uppercase">Velocity Matrix</h3>
                  <p className="text-[8px] font-black text-secondary/20 uppercase tracking-[0.2em] mt-1.5 leading-none">DAU / WAU / MAU 90-Day Trendline</p>
               </div>
               <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                     <div className="w-2 h-2 rounded-full bg-primary" />
                     <span className="text-[9px] font-black text-secondary/30 uppercase tracking-widest">DAU</span>
                  </div>
                  <div className="flex items-center space-x-2">
                     <div className="w-2 h-2 rounded-full bg-emerald-500" />
                     <span className="text-[9px] font-black text-secondary/30 uppercase tracking-widest">MAU</span>
                  </div>
               </div>
            </div>
            <div className="h-[350px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={engagementTrends}>
                     <defs>
                        <linearGradient id="colorMau" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#10B981" stopOpacity={0.1}/>
                           <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorDau" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#0B2447" stopOpacity={0.1}/>
                           <stop offset="95%" stopColor="#0B2447" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 10, fontWeight: 700}} dy={15} />
                     <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 10, fontWeight: 700}} width={40} />
                     <Tooltip 
                        contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', fontWeight: 800, fontSize: '11px' }}
                     />
                     <Area type="monotone" dataKey="mau" stroke="#10B981" strokeWidth={4} fillOpacity={1} fill="url(#colorMau)" />
                     <Area type="monotone" dataKey="dau" stroke="#0B2447" strokeWidth={4} fillOpacity={1} fill="url(#colorDau)" />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>

           <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex-1 flex flex-col">
               <div className="flex items-center justify-between mb-4">
                  <h4 className="text-[8px] font-black text-secondary/20 uppercase tracking-[0.2em]">Bounce Segment</h4>
                  <PieChartIcon size={12} className="text-primary/40" />
               </div>
               <div className="flex-1 space-y-4">
                  {bounceRates.map((item) => (
                     <div key={item.type} className="space-y-1 group cursor-pointer">
                        <div className="flex justify-between items-end leading-none">
                           <p className="text-[9px] font-black text-typography uppercase tracking-tight">{item.type}</p>
                           <p className={cn(
                             "text-[11px] font-black tracking-tighter",
                             item.rate > 40 ? "text-rose-500" : "text-emerald-500"
                           )}>{item.rate}%</p>
                        </div>
                        <div className="w-full h-1 bg-gray-50 rounded-full overflow-hidden">
                           <div className="h-full group-hover:opacity-80 transition-all duration-1000" style={{ width: `${item.rate}%`, backgroundColor: item.color }} />
                        </div>
                     </div>
                  ))}
               </div>
               <div className="mt-4 p-2.5 bg-rose-50/50 rounded-lg border border-rose-100/50">
                  <p className="text-[8px] font-black text-rose-600 uppercase tracking-widest leading-relaxed">Alert: LCP issues on Mobile Exam Nodes.</p>
               </div>
            </div>
         </div>
      </div>

      {/* Session Stickiness */}
      <div className="grid grid-cols-12 gap-4">
         <div className="col-span-12 lg:col-span-4 bg-slate-900 p-4 rounded-xl text-white flex flex-col justify-between relative overflow-hidden group shadow-xl shadow-slate-900/10">
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/10 blur-3xl rounded-full group-hover:scale-150 transition-transform duration-1000" />
            <div className="relative z-10">
               <h4 className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Stickiness Factor</h4>
               <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                     <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">W1 Retention</p>
                     <p className="text-lg font-black text-white italic tracking-tighter leading-none">42.4%</p>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                     <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">W4 Retention</p>
                     <p className="text-lg font-black text-primary italic tracking-tighter leading-none">18.1%</p>
                  </div>
                  <div className="flex items-center justify-between">
                     <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">AI Lift</p>
                     <p className="text-lg font-black text-emerald-500 italic tracking-tighter leading-none">+312%</p>
                  </div>
               </div>
            </div>
            <div className="mt-6 relative z-10">
               <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.1em] leading-relaxed border-t border-white/5 pt-4">AI nodes drive 3.4x higher survival vs generic search clusters.</p>
            </div>
         </div>
  
         <div className="col-span-12 lg:col-span-8 bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-center mb-4">
               <h4 className="text-[8px] font-black text-secondary/20 uppercase tracking-[0.2em]">Session Stickiness (Mins)</h4>
               <button className="text-[8px] font-black text-primary uppercase tracking-[0.2em] hover:underline flex items-center space-x-1.5 transition-all">
                  <span>Heatmaps</span>
                  <ArrowUpRight size={10} />
               </button>
            </div>
            <div className="h-[180px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sessionDuration}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F8FAFC" />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 8, fontWeight: 900}} dy={5} />
                     <Tooltip 
                        cursor={{fill: '#F1F5F9'}} 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 20px rgba(0,0,0,0.05)', fontWeight: 800, fontSize: '9px' }}
                     />
                     <Bar dataKey="mins" radius={[3, 3, 0, 0]} barSize={24}>
                        {sessionDuration.map((entry, index) => (
                           <Cell key={index} fill={entry.mins > 4 ? '#0B2447' : '#F1F5F9'} stroke={entry.mins > 4 ? 'transparent' : '#E2E8F0'} strokeWidth={1} />
                        ))}
                     </Bar>
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </div>
      </div>
    </div>
  );
}

