"use client";

import { useState, useEffect } from "react";
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend, AreaChart, Area
} from 'recharts';
import { 
  Activity, 
  TrendingUp, 
  Target, 
  Clock, 
  Zap, 
  ChevronRight,
  ShieldAlert,
  Search,
  ArrowUpRight,
  Globe
} from 'lucide-react';
import { cn } from "@/lib/utils";

const slaData = [
  { time: '< 10s', count: 450, color: '#10B981' },
  { time: '10-30s', count: 320, color: '#10B981' },
  { time: '30-60s', count: 180, color: '#F59E0B' },
  { time: '1-2m', count: 65, color: '#EF4444' },
  { time: '2m+', count: 12, color: '#EF4444' },
];

const roiData = [
  { name: 'IIT Delhi', conversion: 12.4, leads: 450 },
  { name: 'Amity Uni', conversion: 8.2, leads: 1200 },
  { name: 'SRM Ist', conversion: 14.8, leads: 320 },
  { name: 'Bits Pilani', conversion: 11.5, leads: 540 },
  { name: 'LPU Jalandhar', conversion: 6.4, leads: 2100 },
];

const qualityTrendData = [
  { month: 'Oct', score: 82 },
  { month: 'Nov', score: 85 },
  { month: 'Dec', score: 78 },
  { month: 'Jan', score: 88 },
  { month: 'Feb', score: 84 },
  { month: 'Mar', score: 91 },
];

export default function LeadPerformancePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="p-6 min-h-screen animate-pulse bg-gray-50/50 flex items-center justify-center text-[10px] font-black tracking-widest uppercase italic text-secondary/10">
        Loading Performance Ledger...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-4 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-2">
              <div className="bg-primary/5 px-3 py-1.5 rounded-xl border border-primary/10">
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary italic">Ops Intelligence</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30">Yield & Velocity Metrics</span>
           </div>
           <h1 className="text-3xl md:text-3xl md:text-5xl font-black text-typography tracking-tighter leading-none mb-1">
             SLA <span className="text-primary italic">Precision</span>
           </h1>
           <p className="text-secondary/40 text-sm font-bold uppercase tracking-widest mt-2">
              Monitoring Real-time Lead Delivery Performance & Partner ROI
           </p>
        </div>

        <div className="flex items-center space-x-4">
           <div className="bg-white px-8 py-4 rounded-3xl border border-gray-100 shadow-sm flex items-center space-x-6">
              <div>
                 <p className="text-[10px] font-black text-secondary/20 uppercase tracking-widest">Global Avg Delivery</p>
                 <p className="text-2xl font-black text-typography tracking-tighter">42s <span className="text-emerald-500 text-xs text-[10px] font-black underline italic">Optimal</span></p>
              </div>
              <Activity size={28} className="text-primary animate-pulse" />
           </div>
        </div>
      </section>

      {/* SLA Distribution Chart */}
      <div className="grid grid-cols-12 gap-5">
         <div className="col-span-12 lg:col-span-8 bg-white p-6 rounded-2xl border border-gray-50 shadow-sm">
            <div className="flex justify-between items-start mb-6">
               <div>
                  <h3 className="text-xl font-black text-typography tracking-tighter italic lowercase underline decoration-primary/10">Delivery SLA Distribution</h3>
                  <p className="text-[10px] font-bold text-secondary/30 uppercase tracking-[0.2em] mt-2">Target: 95% Leads delivered under 60 seconds</p>
               </div>
               <div className="flex items-center space-x-2 bg-indigo-50 px-4 py-2 rounded-2xl border border-indigo-100 italic">
                  <Clock size={16} className="text-indigo-600" />
                  <span className="text-[10px] font-black text-indigo-700 uppercase leading-none">P95 Analysis</span>
               </div>
            </div>
            <div className="h-[300px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={slaData}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F8FAFC" />
                     <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 10, fontWeight: 700}} dy={15} />
                     <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 10, fontWeight: 700}} dx={-15} />
                     <Tooltip 
                        cursor={{fill: '#F1F5F9'}} 
                        contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', fontWeight: 700 }}
                     />
                     <Bar dataKey="count" radius={[8, 8, 0, 0]} barSize={48}>
                        {slaData.map((entry, index) => (
                           <Cell key={index} fill={entry.color} />
                        ))}
                     </Bar>
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </div>

         <div className="col-span-12 lg:col-span-4 bg-white p-6 rounded-2xl border border-gray-50 shadow-sm flex flex-col items-center justify-center text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-5">
               <Zap size={64} className="text-secondary/5 -mr-4 -mt-4" />
            </div>
            <div className="w-24 h-24 bg-primary/5 rounded-[2rem] flex items-center justify-center text-primary mb-6 shadow-2xl shadow-primary/10">
               <Target size={42} />
            </div>
            <h4 className="text-3xl font-black text-typography tracking-tighter mb-2 italic">Yield Score</h4>
            <div className="text-6xl font-black text-primary tracking-tighter">94.2</div>
            <p className="text-[10px] font-bold text-secondary/30 uppercase tracking-widest mt-4">Composite Platform health index</p>
            <div className="mt-8 flex items-center space-x-2 bg-emerald-50 px-4 py-2 rounded-full font-black text-[10px] text-emerald-600 uppercase italic">
               <TrendingUp size={14} />
               <span>+2.4% vs Last Month</span>
            </div>
         </div>
      </div>

      {/* ROI & Quality Trend */}
      <div className="grid grid-cols-12 gap-5">
         <div className="col-span-12 lg:col-span-7 bg-white p-6 rounded-2xl border border-gray-50 shadow-sm">
            <h3 className="text-xl font-black text-typography tracking-tighter italic lowercase underline decoration-primary/10 mb-8">Lead Quality Pulse</h3>
            <div className="h-[250px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={qualityTrendData}>
                     <defs>
                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#0B2447" stopOpacity={0.1}/>
                           <stop offset="95%" stopColor="#0B2447" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F8FAFC" />
                     <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 10, fontWeight: 700}} dy={15} />
                     <YAxis hide domain={[0, 100]} />
                     <Tooltip 
                        contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', fontWeight: 700 }}
                     />
                     <Area type="monotone" dataKey="score" stroke="#0B2447" strokeWidth={4} fillOpacity={1} fill="url(#colorScore)" />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>

         <div className="col-span-12 lg:col-span-5 bg-white p-6 rounded-2xl border border-gray-50 shadow-sm">
            <h3 className="text-xl font-black text-typography tracking-tighter italic lowercase underline decoration-primary/10 mb-8">Partner ROI Ranking</h3>
            <div className="space-y-4">
               {roiData.map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 group hover:bg-white hover:border-primary/20 transition-all cursor-pointer">
                     <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-xs font-black text-secondary/30 group-hover:text-primary transition-colors italic">
                           {i+1}
                        </div>
                        <div>
                           <p className="text-sm font-black text-typography">{item.name}</p>
                           <p className="text-[10px] font-bold text-secondary/40 uppercase tracking-widest">{item.leads.toLocaleString()} Leads Consumed</p>
                        </div>
                     </div>
                     <div className="text-right">
                        <p className="text-lg font-black text-primary tracking-tighter">{item.conversion}%</p>
                        <p className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest italic">CPL ROI: High</p>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>

      {/* Blacklist Management Hook */}
      <section className="bg-slate-900 rounded-2xl p-12 text-white relative overflow-hidden">
         <div className="absolute top-0 right-0 p-12 opacity-10">
            <ShieldAlert size={120} />
         </div>
         <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            <div className="max-w-xl">
               <h2 className="text-4xl font-black tracking-tighter italic lowercase">Blacklist Protocol</h2>
               <p className="text-slate-400 font-bold uppercase tracking-widest text-[11px] mt-4 leading-relaxed">
                  Automatic Bot Mitigation is active. System has auto-rejected 124 fraudulent submissions this session based on IP and Email clustering fingerprints.
               </p>
            </div>
            <div className="flex items-center space-x-4">
               <div className="relative">
                  <Search size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input placeholder="Search Flagged Email/Phone..." className="bg-white/5 border border-white/10 pl-16 pr-8 py-4 rounded-2xl text-[12px] font-bold outline-none focus:bg-white/10 transition-all w-80" />
               </div>
               <button className="px-8 py-4 bg-white text-slate-900 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all">
                  Sync Global Blacklist
               </button>
            </div>
         </div>
      </section>
    </div>
  );
}
