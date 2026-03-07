"use client";

import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, Legend 
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  MousePointer2, 
  ShieldAlert, 
  Search, 
  Zap, 
  ArrowRight,
  Download,
  MoreVertical,
  Plus,
  Globe,
  Settings
} from 'lucide-react';
import { cn } from "@/lib/utils";

// Mock Data
const activityData = [
  { name: '01 Mar', dau: 4000, queries: 2400, ai: 2400 },
  { name: '02 Mar', dau: 3000, queries: 1398, ai: 2210 },
  { name: '03 Mar', dau: 2000, queries: 9800, ai: 2290 },
  { name: '04 Mar', dau: 2780, queries: 3908, ai: 2000 },
  { name: '05 Mar', dau: 1890, queries: 4800, ai: 2181 },
  { name: '06 Mar', dau: 2390, queries: 3800, ai: 2500 },
  { name: '07 Mar', dau: 3490, queries: 4300, ai: 2100 },
];

const leadVelocity = [
  { day: 'Mon', eng: 40, mba: 24, med: 24 },
  { day: 'Tue', eng: 30, mba: 13, med: 22 },
  { day: 'Wed', eng: 20, mba: 98, med: 22 },
  { day: 'Thu', eng: 27, mba: 39, med: 20 },
  { day: 'Fri', eng: 18, mba: 48, med: 21 },
  { day: 'Sat', eng: 23, mba: 38, med: 25 },
  { day: 'Sun', eng: 34, mba: 43, med: 21 },
];

const revenueTrend = [
  { date: 'Feb 15', cpl: 12000, sub: 35000 },
  { date: 'Feb 20', cpl: 19000, sub: 35000 },
  { date: 'Feb 25', cpl: 15000, sub: 45000 },
  { date: 'Mar 1', cpl: 22000, sub: 45000 },
  { date: 'Mar 5', cpl: 30000, sub: 60000 },
  { date: 'Mar 7', cpl: 34000, sub: 60000 },
];

const moderationData = [
  { name: 'Pending', value: 34, color: '#0F172A' },
  { name: 'Approved', value: 156, color: '#10B981' },
  { name: 'Rejected', value: 12, color: '#EF4444' },
];

const topColleges = [
  { name: 'IIT Bombay', searches: 12450, change: '+12%' },
  { name: 'BITS Pilani', searches: 9800, change: '+8%' },
  { name: 'SRM University', searches: 8400, change: '+15%' },
  { name: 'LPU Jalandhar', searches: 7200, change: '-4%' },
  { name: 'Chandigarh University', searches: 6800, change: '+20%' },
];

const alerts = [
  { id: 1, type: 'CRITICAL', text: 'VPS RAM usage exceeded 90% (Node-02)', time: '2 mins ago' },
  { id: 2, type: 'WARNING', text: 'Bulk review import conflict detected (ID: 482)', time: '15 mins ago' },
  { id: 3, type: 'INFO', text: 'New College Subscription: Amity University', time: '1 hour ago' },
  { id: 4, type: 'DEBUG', text: 'Scraper task completed for NIRF Rank 2024', time: '3 hours ago' },
];

function WidgetCard({ title, children, className, subtitle, icon: Icon, actions }: any) {
  return (
    <div className={cn("bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 flex flex-col h-full", className)}>
      <div className="flex justify-between items-start mb-8">
        <div>
          <div className="flex items-center space-x-3 mb-1">
            {Icon && <Icon size={18} className="text-primary" />}
            <h3 className="text-lg font-black text-typography tracking-tight uppercase leading-none">{title}</h3>
          </div>
          {subtitle && <p className="text-xs font-bold text-secondary/40 uppercase tracking-widest">{subtitle}</p>}
        </div>
        <div className="flex items-center space-x-2">
           <button className="p-2 hover:bg-gray-50 rounded-xl transition-all border border-transparent hover:border-gray-100">
              <Download size={16} className="text-secondary/40 hover:text-primary" />
           </button>
           <button className="p-2 hover:bg-gray-50 rounded-xl transition-all border border-transparent hover:border-gray-100">
              <MoreVertical size={16} className="text-secondary/40 hover:text-primary" />
           </button>
        </div>
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}

export function DashboardWidgets({ topColleges: propTopColleges, alerts: propAlerts, loading }: any) {
  const displayColleges = propTopColleges && propTopColleges.length > 0 ? propTopColleges : topColleges;
  const displayAlerts = propAlerts && propAlerts.length > 0 ? propAlerts : alerts;

  return (
    <div className="grid grid-cols-12 gap-8 mb-10">
      {/* Widget 1: Student Activity */}
      <WidgetCard 
        title="Student Activity" 
        subtitle="DAU vs AI Counseling Sessions (Last 7 Days)" 
        className="col-span-12 lg:col-span-8"
        icon={TrendingUp}
      >
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={activityData}>
              <defs>
                <linearGradient id="colorDau" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0B2447" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#0B2447" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorAi" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#19376D" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#19376D" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 10, fontWeight: 700}} dy={15} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 10, fontWeight: 700}} dx={-15} />
              <Tooltip 
                contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', fontWeight: 700 }}
                itemStyle={{ fontSize: '11px' }}
              />
              <Area type="monotone" dataKey="dau" stroke="#0B2447" strokeWidth={4} fillOpacity={1} fill="url(#colorDau)" />
              <Area type="monotone" dataKey="ai" stroke="#19376D" strokeWidth={4} fillOpacity={1} fill="url(#colorAi)" strokeDasharray="10 10" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </WidgetCard>

      {/* Widget 2: Lead Velocity */}
      <WidgetCard 
        title="Lead Velocity" 
        subtitle="Grouped by stream (Engineering/MBA/Medical)" 
        className="col-span-12 lg:col-span-4"
        icon={MousePointer2}
      >
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={leadVelocity}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 10, fontWeight: 700}} dy={10} />
              <YAxis hide />
              <Tooltip cursor={{fill: '#F8FAFC'}} contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} />
              <Bar dataKey="eng" fill="#0B2447" radius={[6, 6, 0, 0]} barSize={12} />
              <Bar dataKey="mba" fill="#19376D" radius={[6, 6, 0, 0]} barSize={12} />
              <Bar dataKey="med" fill="#CBD5E1" radius={[6, 6, 0, 0]} barSize={12} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </WidgetCard>

      {/* Widget 3: Revenue Trend */}
      <WidgetCard 
        title="Revenue Performance" 
        subtitle="Daily CPL + Subscription Revenue" 
        className="col-span-12 lg:col-span-6"
        icon={TrendingUp}
      >
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueTrend}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 10, fontWeight: 700}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 10, fontWeight: 700}} tickFormatter={(value) => `₹${value/1000}k`} />
              <Tooltip />
              <Area type="step" dataKey="sub" stroke="#0F172A" fill="#0F172A" fillOpacity={0.05} strokeWidth={2} />
              <Area type="monotone" dataKey="cpl" stroke="#10B981" fill="#10B981" fillOpacity={0.15} strokeWidth={4} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </WidgetCard>

      {/* Widget 5: Moderation Status */}
      <WidgetCard 
        title="Moderation Pipeline" 
        subtitle="Pending / Approved / Rejected Today" 
        className="col-span-12 lg:col-span-3"
        icon={ShieldAlert}
      >
        <div className="h-[300px] w-full flex flex-col items-center justify-center">
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={moderationData}
                innerRadius={70}
                outerRadius={90}
                paddingAngle={10}
                dataKey="value"
                stroke="none"
              >
                {moderationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex space-x-6">
            {moderationData.map((item) => (
              <div key={item.name} className="flex flex-col items-center">
                <div className="flex items-center space-x-2">
                   <div className="w-2.5 h-2.5 rounded-full" style={{backgroundColor: item.color}} />
                   <span className="text-[10px] font-black uppercase text-secondary/40 leading-none">{item.name}</span>
                </div>
                <span className="text-lg font-black mt-1">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </WidgetCard>

      {/* Widget 7: Top Searches */}
      <WidgetCard 
        title="Global Trend Intelligence" 
        subtitle="Top 5 Most Searched Colleges Today" 
        className="col-span-12 lg:col-span-3"
        icon={Search}
      >
        <div className="space-y-6">
          {displayColleges.map((college: any, i: number) => (
            <div key={college.name} className="flex items-center justify-between group cursor-pointer hover:translate-x-1 transition-all">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-xs font-black text-secondary group-hover:bg-primary group-hover:text-white transition-all">
                   0{i+1}
                </div>
                <div>
                   <p className="text-sm font-black text-typography line-clamp-1">{college.name}</p>
                   <p className="text-[10px] font-bold text-secondary/40">{loading ? "..." : college.searches?.toLocaleString()} Queries</p>
                </div>
              </div>
              <div className={cn(
                "text-[10px] font-black italic",
                college.change?.startsWith('+') ? "text-emerald-500" : "text-red-500"
              )}>
                {college.change}
              </div>
            </div>
          ))}
        </div>
        <button className="w-full mt-8 py-3 bg-gray-50 hover:bg-primary hover:text-white text-secondary text-[10px] font-black uppercase tracking-widest rounded-2xl transition-all flex items-center justify-center space-x-2 border border-gray-100">
           <span>View 100+ More</span>
           <ArrowRight size={12} />
        </button>
      </WidgetCard>

      {/* Widget 8: Infrastructure Logs */}
      <WidgetCard 
        title="Real-Time System Alerts" 
        subtitle="Critical Infrastructure Monitoring" 
        className="col-span-12 lg:col-span-12"
        icon={Zap}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left">
             <thead className="bg-snow-pearl/50 border-y border-gray-50">
                <tr>
                   <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-secondary/50">Status</th>
                   <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-secondary/50">Message</th>
                   <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-secondary/50">Timestamp</th>
                   <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-secondary/50 text-right">Actions</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-gray-50">
                {displayAlerts.map((alert: any) => (
                  <tr key={alert.id} className="group hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-5">
                       <span className={cn(
                         "text-[9px] font-black uppercase tracking-wider px-3 py-1 rounded-full",
                         alert.type === 'CRITICAL' ? 'bg-red-50 text-red-600' : 
                         alert.type === 'WARNING' ? 'bg-amber-50 text-amber-600' : 
                         'bg-sky-50 text-sky-600'
                       )}>
                         {alert.type}
                       </span>
                    </td>
                    <td className="px-6 py-5">
                       <p className="text-sm font-bold text-typography line-clamp-1">{alert.text}</p>
                    </td>
                    <td className="px-6 py-5">
                       <p className="text-xs font-bold text-secondary/30 whitespace-nowrap">{new Date(alert.time).toLocaleTimeString()}</p>
                    </td>
                    <td className="px-6 py-5 text-right">
                       <button className="text-[10px] font-black text-primary px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity bg-primary/5">Acknowledge</button>
                    </td>
                  </tr>
                ))}
             </tbody>
          </table>
        </div>
      </WidgetCard>
    </div>
  );
}

export function QuickActions() {
  const actions = [
    { label: "New College", icon: Plus, color: "bg-primary" },
    { label: "Approve 34 Reviews", icon: ShieldAlert, color: "bg-red-600" },
    { label: "Scraper Control", icon: Zap, color: "bg-secondary" },
    { label: "AI Config", icon: Zap, color: "bg-emerald-600" },
    { label: "SEO Sitemap", icon: Globe, color: "bg-blue-600" },
  ];

  return (
    <div className="fixed bottom-10 right-10 flex flex-col space-y-4 items-end z-50 group">
       <button className="w-16 h-16 bg-primary text-white rounded-[2rem] shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all">
          <Settings size={28} className="animate-spin-slow" />
       </button>
       <div className="absolute bottom-20 right-0 flex flex-col space-y-4 pointer-events-none group-hover:pointer-events-auto">
          {actions.map((action, i) => (
            <div key={i} className="flex items-center justify-end space-x-4 opacity-0 group-hover:opacity-100 translate-y-10 group-hover:translate-y-0 transition-all duration-300" style={{ transitionDelay: `${i * 50}ms` }}>
               <span className="bg-white border border-gray-100 px-4 py-2 rounded-xl text-xs font-black shadow-lg shadow-black/5 whitespace-nowrap">
                  {action.label}
               </span>
               <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-xl cursor-pointer hover:rotate-12 active:scale-95 transition-all", action.color)}>
                  <action.icon size={20} />
               </div>
            </div>
          ))}
       </div>
    </div>
  );
}
