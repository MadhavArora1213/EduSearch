"use client";

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
  return (
    <div className="space-y-12 pb-20">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-6 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-2">
              <div className="bg-primary/5 px-3 py-1.5 rounded-xl border border-primary/10">
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary">Intelligence Hub</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30">Moderation Performance Metrics</span>
           </div>
           <h1 className="text-5xl font-black text-typography tracking-tighter leading-none mb-1">
             Vigilance <span className="text-primary italic">Analytics</span>
           </h1>
           <p className="text-secondary/40 text-sm font-bold uppercase tracking-widest mt-2 hover:text-secondary transition-colors cursor-default">
              Audit Trails & Operational Efficiency Tracker
           </p>
        </div>

        <div className="flex items-center space-x-4">
           <button className="flex items-center space-x-3 px-8 py-5 bg-gray-50 border border-gray-200/50 rounded-3xl text-[11px] font-black uppercase tracking-widest hover:bg-white hover:border-gray-200 transition-all active:scale-95 text-secondary/60">
              <Download size={18} />
              <span>Export Audit Trail</span>
           </button>
        </div>
      </section>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
         <div className="bg-white p-10 rounded-[3rem] border border-gray-50 shadow-sm relative overflow-hidden group italic">
            <div className="absolute right-0 top-0 p-8 text-primary/10 group-hover:scale-110 transition-transform">
               <TrendingUp size={48} />
            </div>
            <p className="text-[10px] font-black text-secondary/30 uppercase tracking-[0.2em] mb-4">AVG SLA RESOLUTION</p>
            <h3 className="text-4xl font-black text-typography mb-2 italic tracking-tighter">2.4<span className="text-xl">Hrs</span></h3>
            <div className="flex items-center space-x-2 text-emerald-500">
               <ArrowDownRight size={14} />
               <span className="text-[10px] font-bold">12% Faster than Last Week</span>
            </div>
         </div>

         <div className="bg-white p-10 rounded-[3rem] border border-gray-50 shadow-sm relative overflow-hidden group italic">
            <div className="absolute right-0 top-0 p-8 text-primary/10 group-hover:scale-110 transition-transform">
               <CheckCircle2 size={48} />
            </div>
            <p className="text-[10px] font-black text-secondary/30 uppercase tracking-[0.2em] mb-4">AUTO-APPROVAL RATE</p>
            <h3 className="text-4xl font-black text-typography mb-2 italic tracking-tighter">62.8<span className="text-xl">%</span></h3>
            <div className="flex items-center space-x-2 text-emerald-500">
               <ArrowUpRight size={14} />
               <span className="text-[10px] font-bold">New Rule R-1 Effective</span>
            </div>
         </div>

         <div className="bg-white p-10 rounded-[3rem] border border-gray-50 shadow-sm relative overflow-hidden group italic">
            <div className="absolute right-0 top-0 p-8 text-primary/10 group-hover:scale-110 transition-transform">
               <XCircle size={48} />
            </div>
            <p className="text-[10px] font-black text-secondary/30 uppercase tracking-[0.2em] mb-4">REJECTION INDEX</p>
            <h3 className="text-4xl font-black text-typography mb-2 italic tracking-tighter">18.4<span className="text-xl">%</span></h3>
            <div className="flex items-center space-x-2 text-amber-500">
               <ArrowUpRight size={14} />
               <span className="text-[10px] font-bold">Spam Wave Detected</span>
            </div>
         </div>

         <div className="bg-typography text-white p-10 rounded-[3rem] shadow-2xl shadow-primary/20 relative overflow-hidden group italic transition-all">
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-primary/20 rounded-full" />
            <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-4">PENDING OVERFLOW</p>
            <h3 className="text-4xl font-black text-white mb-2 italic tracking-tighter">42</h3>
            <div className="flex items-center space-x-2 text-primary">
               <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
               <span className="text-[10px] font-black tracking-widest uppercase">Safe Zone</span>
            </div>
         </div>
      </div>

      {/* Main Charts Overlay */}
      <section className="grid grid-cols-12 gap-8">
         {/* volume Trend */}
         <div className="col-span-12 lg:col-span-8 bg-white p-12 rounded-[3.5rem] border border-gray-50 shadow-sm italic">
            <div className="flex items-center justify-between mb-10">
               <div>
                  <h3 className="text-2xl font-black text-typography tracking-tight">Review Volume Flux</h3>
                  <p className="text-[10px] font-bold text-secondary/40 uppercase tracking-widest mt-1 italic">Manual vs Automated Processing</p>
               </div>
            </div>

            <div className="h-[400px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={volumeData}>
                     <defs>
                        <linearGradient id="colorReviews" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#002147" stopOpacity={0.1}/>
                           <stop offset="95%" stopColor="#002147" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                     <XAxis 
                       dataKey="day" 
                       axisLine={false} 
                       tickLine={false} 
                       tick={{ fontSize: 10, fontWeight: 900, fill: '#94A3B8' }}
                       dy={10}
                     />
                     <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: '#94A3B8' }} />
                     <Tooltip 
                        contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 50px -10px rgba(0,0,0,0.1)', padding: '20px' }}
                     />
                     <Area type="monotone" dataKey="reviews" stroke="#002147" strokeWidth={4} fill="url(#colorReviews)" />
                     <Area type="monotone" dataKey="auto" stroke="#3B82F6" strokeWidth={2} fill="transparent" strokeDasharray="5 5" />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* Rejection Pie */}
         <div className="col-span-12 lg:col-span-4 bg-white p-12 rounded-[3.5rem] border border-gray-50 shadow-sm flex flex-col italic">
            <h3 className="text-2xl font-black text-typography tracking-tight italic">Rejection Breakdown</h3>
            <p className="text-[10px] font-bold text-secondary/40 uppercase tracking-widest mt-1 mb-8">Primary Quality Failure Reasons</p>
            
            <div className="h-[250px] w-full relative mb-10">
               <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                     <Pie
                        data={rejectionReasons}
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={10}
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
                  <span className="text-[10px] font-black text-secondary/30 uppercase tracking-widest">Target</span>
                  <span className="text-2xl font-black text-typography">85%</span>
               </div>
            </div>

            <div className="space-y-4">
               {rejectionReasons.map((item) => (
                 <div key={item.name} className="flex items-center justify-between group cursor-default">
                    <div className="flex items-center space-x-3">
                       <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                       <span className="text-[11px] font-bold text-secondary/70 uppercase tracking-tight">{item.name}</span>
                    </div>
                    <span className="text-xs font-black text-typography">{item.value}%</span>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Moderator Performance Table */}
      <section className="bg-white p-12 rounded-[4rem] border border-gray-100 shadow-sm italic">
         <div className="flex items-center justify-between mb-12">
            <div>
               <h3 className="text-2xl font-black text-typography tracking-tight italic uppercase">Squad <span className="text-primary">Performance</span> Matrix</h3>
               <p className="text-[10px] font-bold text-secondary/40 uppercase tracking-widest mt-1">Operational Audit of Human Moderation Team</p>
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="border-b border-gray-100">
                     <th className="pb-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Moderator</th>
                     <th className="pb-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Reviews Processed</th>
                     <th className="pb-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Avg Time / Item</th>
                     <th className="pb-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Accuracy Index</th>
                     <th className="pb-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Audit Score</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-50 uppercase">
                  {moderatorPerformance.map((mod) => (
                    <tr key={mod.name} className="group hover:bg-gray-50 transition-all transition-all duration-300 italic">
                       <td className="py-8">
                          <div className="flex items-center space-x-4">
                             <div className="w-10 h-10 bg-primary/5 rounded-xl border border-primary/10 flex items-center justify-center text-primary font-black text-xs">
                                {mod.name.charAt(0)}
                             </div>
                             <span className="text-sm font-black text-typography">{mod.name}</span>
                          </div>
                       </td>
                       <td className="py-8 text-sm font-bold text-secondary/60">{mod.reviews} Items</td>
                       <td className="py-8">
                          <div className="flex items-center space-x-2 text-sm font-black text-typography">
                             <Clock size={14} className="text-secondary/30" />
                             <span>{mod.time}</span>
                          </div>
                       </td>
                       <td className="py-8">
                          <div className="flex items-center space-x-3">
                             <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500" style={{ width: mod.accuracy }} />
                             </div>
                             <span className="text-xs font-black text-emerald-600">{mod.accuracy}</span>
                          </div>
                       </td>
                       <td className="py-8">
                          <button className="px-5 py-2.5 bg-white border border-gray-100 rounded-xl text-[9px] font-black uppercase tracking-widest hover:border-primary hover:text-primary transition-all shadow-sm">Review Logs</button>
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
