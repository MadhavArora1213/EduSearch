"use client";

import { useState, useEffect } from "react";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ChevronRight,
  PieChart as PieIcon,
  Search,
  Download,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  BarChart,
  Bar
} from "recharts";
import { cn } from "@/lib/utils";

const volumeData = [
  { day: "Mon", reviews: 450, auto: 280 },
  { day: "Tue", reviews: 520, auto: 310 },
  { day: "Wed", reviews: 480, auto: 290 },
  { day: "Thu", reviews: 610, auto: 400 },
  { day: "Fri", reviews: 580, auto: 380 },
  { day: "Sat", reviews: 320, auto: 210 },
  { day: "Sun", reviews: 290, auto: 180 },
];

const rejectionReasons = [
  { name: "Insufficient Detail", value: 60, color: "#002147" },
  { name: "Promotional", value: 15, color: "#01579B" },
  { name: "Suspected Fake", value: 12, color: "#3B82F6" },
  { name: "Duplicate", value: 8, color: "#93C5FD" },
  { name: "Abusive", value: 5, color: "#DBEAFE" },
];

const moderatorPerformance = [
  { name: "Amit K.", reviews: 145, time: "2.4m", accuracy: "98.2%" },
  { name: "Sneha R.", reviews: 132, time: "2.8m", accuracy: "94.5%" },
  { name: "Vikram S.", reviews: 118, time: "3.1m", accuracy: "96.8%" },
  { name: "Priya M.", reviews: 95, time: "2.1m", accuracy: "99.1%" },
];

export default function ModerationAnalyticsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="p-6 min-h-screen bg-gray-50/20 animate-pulse flex items-center justify-center text-[10px] font-black uppercase tracking-[0.5em] text-secondary/10">
        Verifying Moderation Ledger...
      </div>
    );
  }

  return (
    <div className="space-y-6 font-montserrat pb-10">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-4 md:space-y-0 pb-4 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-1.5">
              <div className="bg-primary/5 px-2.5 py-1 rounded-lg border border-primary/10">
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary">Intelligence Hub</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30 uppercase tracking-widest text-[10px]">Moderation Analytics</span>
           </div>
           <h1 className="text-3xl font-black text-typography tracking-tighter leading-none mb-1">
             Vigilance <span className="text-primary italic">Analytics</span>
           </h1>
           <p className="text-secondary/40 text-[10px] font-black uppercase tracking-[0.2em] mt-1.5 leading-none">
              Audit Trails & Operational Efficiency Tracking
           </p>
        </div>

        <div className="flex items-center space-x-3">
           <button className="flex items-center space-x-2 px-6 py-2.5 bg-gray-50 border border-gray-200/50 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:border-gray-200 transition-all active:scale-95 text-secondary/60">
              <Download size={14} />
              <span>Export Audit Trail</span>
           </button>
        </div>
      </section>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
         {[
           { label: "AVG SLA RESOLUTION", val: "2.4", unit: "Hrs", icon: TrendingUp, delta: "12% Faster", up: true },
           { label: "AUTO-APPROVAL RATE", val: "62.8", unit: "%", icon: CheckCircle2, delta: "Rule R-1 Effective", up: true },
           { label: "REJECTION INDEX", val: "18.4", unit: "%", icon: XCircle, delta: "Spam Wave Detected", up: false },
           { label: "PENDING OVERFLOW", val: "42", unit: "", icon: Clock, delta: "Safe Zone", up: true, dark: true }
         ].map((k, i) => (
           <div key={i} className={cn(
             "p-5 rounded-xl shadow-sm relative overflow-hidden group border transition-all",
             k.dark ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-gray-100 hover:border-gray-200 text-typography"
           )}>
              <div className={cn("absolute right-0 top-0 p-4 opacity-10 transition-transform duration-500 group-hover:scale-110", k.dark ? "text-primary" : "text-primary")}>
                 <k.icon size={48} />
              </div>
              <p className={cn("text-[8px] font-black uppercase tracking-widest mb-4", k.dark ? "text-slate-500" : "text-secondary/40")}>{k.label}</p>
              <h3 className="text-3xl font-black mb-1.5 tracking-tighter leading-none">{k.val}<span className="text-lg opacity-40 ml-0.5">{k.unit}</span></h3>
              <div className={cn("flex items-center space-x-1", k.dark ? "text-primary" : (k.up ? "text-emerald-500" : "text-amber-500"))}>
                 <span className="text-[8px] font-black uppercase tracking-widest">{k.delta}</span>
              </div>
           </div>
         ))}
      </div>

      {/* Main Charts Overlay */}
      <section className="grid grid-cols-12 gap-4">
         {/* volume Trend */}
         <div className="col-span-12 lg:col-span-8 bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-8">
               <div>
                  <h3 className="text-sm font-black text-typography uppercase tracking-tighter leading-none mb-1">Review Volume Flux</h3>
                  <p className="text-[9px] font-black text-secondary/30 uppercase tracking-widest mt-1">Manual vs Automated Processing</p>
               </div>
            </div>

            <div className="h-[300px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={volumeData}>
                     <defs>
                        <linearGradient id="colorReviews" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                           <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                     <XAxis 
                       dataKey="day" 
                       axisLine={false} 
                       tickLine={false} 
                       tick={{ fontSize: 9, fontWeight: 900, fill: '#94a3b8' }}
                       dy={10}
                     />
                     <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 900, fill: '#94a3b8' }} />
                     <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)', padding: '12px', fontSize: '10px' }}
                     />
                     <Area type="monotone" dataKey="reviews" stroke="#3B82F6" strokeWidth={3} fill="url(#colorReviews)" />
                     <Area type="monotone" dataKey="auto" stroke="#94a3b8" strokeWidth={1.5} fill="transparent" strokeDasharray="5 5" />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* Rejection Pie */}
         <div className="col-span-12 lg:col-span-4 bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between">
            <div>
               <h3 className="text-sm font-black text-typography uppercase tracking-tighter leading-none mb-1">Rejection Breakdown</h3>
               <p className="text-[9px] font-black text-secondary/30 uppercase tracking-widest mt-1 mb-8">Primary Quality Failure Reasons</p>
            </div>
            
            <div className="h-[200px] w-full relative mb-6">
               <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                     <Pie
                        data={rejectionReasons}
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={4}
                        dataKey="value"
                     >
                        {rejectionReasons.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                     </Pie>
                     <Tooltip />
                  </PieChart>
               </ResponsiveContainer>
               <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-[8px] font-black text-secondary/20 uppercase tracking-widest">Target</span>
                  <span className="text-xl font-black text-typography leading-none">85%</span>
               </div>
            </div>

            <div className="space-y-2.5">
               {rejectionReasons.map((item) => (
                 <div key={item.name} className="flex items-center justify-between group cursor-default">
                    <div className="flex items-center space-x-2.5">
                       <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                       <span className="text-[9px] font-black text-secondary/40 uppercase tracking-tight">{item.name}</span>
                    </div>
                    <span className="text-[10px] font-black text-typography">{item.value}%</span>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Moderator Performance Table */}
      <section className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
         <div className="flex items-center justify-between mb-6">
            <div>
               <h3 className="text-sm font-black text-typography uppercase tracking-tighter leading-none mb-1">Squad Performance Matrix</h3>
               <p className="text-[9px] font-black text-secondary/30 uppercase tracking-widest mt-1">Operational Audit of Human Moderation Team</p>
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="border-b border-gray-100">
                     <th className="pb-3 text-[9px] font-black uppercase tracking-widest text-secondary/40">Moderator</th>
                     <th className="pb-3 text-[9px] font-black uppercase tracking-widest text-secondary/40">Throughput</th>
                     <th className="pb-3 text-[9px] font-black uppercase tracking-widest text-secondary/40">Avg Time</th>
                     <th className="pb-3 text-[9px] font-black uppercase tracking-widest text-secondary/40">Accuracy Index</th>
                     <th className="pb-3 text-[9px] font-black uppercase tracking-widest text-secondary/40 text-right">Audit</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-50">
                  {moderatorPerformance.map((mod) => (
                    <tr key={mod.name} className="group hover:bg-gray-50/50 transition-all duration-300">
                       <td className="py-2.5">
                          <div className="flex items-center space-x-3">
                             <div className="w-8 h-8 bg-primary/5 rounded-lg border border-primary/10 flex items-center justify-center text-primary font-black text-[10px] uppercase shadow-sm group-hover:bg-primary/10 transition-colors">
                                {mod.name.split(' ')[0][0]}{mod.name.split(' ')[1][0]}
                             </div>
                             <span className="text-[10px] font-black text-typography uppercase tracking-widest group-hover:text-primary transition-colors">{mod.name}</span>
                          </div>
                       </td>
                       <td className="py-2.5 text-[10px] font-black text-secondary/40 uppercase tracking-widest">{mod.reviews} Items</td>
                       <td className="py-2.5">
                          <div className="flex items-center space-x-2 text-[10px] font-black text-typography uppercase tracking-widest">
                             <Clock size={12} className="text-secondary/30" />
                             <span>{mod.time}</span>
                          </div>
                       </td>
                       <td className="py-2.5">
                          <div className="flex items-center space-x-3">
                             <div className="w-20 h-1.5 bg-gray-50 rounded-full overflow-hidden border border-gray-100 shadow-inner">
                                <div className="h-full bg-emerald-500 shadow-sm" style={{ width: mod.accuracy }} />
                             </div>
                             <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">{mod.accuracy}</span>
                          </div>
                       </td>
                       <td className="py-2.5 text-right pr-2">
                          <button className="px-5 py-2 bg-white border border-gray-200 rounded-lg text-[8px] font-black uppercase tracking-widest hover:border-primary hover:text-primary transition-all shadow-sm active:scale-95">Logs</button>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </section>
    </div>
  );
}
