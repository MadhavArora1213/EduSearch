"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";import { 
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
  const [menuOpen, setMenuOpen] = useState(false);

  const handleDownloadCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8,Demo Header 1, Demo Header 2\nValue 100, Value 200\nValue 300, Value 400";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${title.replace(/\s+/g, '_').toLowerCase()}_report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={cn("bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col h-full", className)}>
      <div className="flex justify-between items-start mb-6 w-full relative">
        <div className="min-w-0 pr-4">
          <div className="flex items-center space-x-2">
            {Icon && <Icon size={20} className="text-primary shrink-0" />}
            <h3 className="text-base font-bold text-gray-800 truncate">{title}</h3>
          </div>
          {subtitle && <p className="text-sm font-medium text-gray-500 mt-1 pl-7 truncate">{subtitle}</p>}
        </div>
        <div className="flex items-center space-x-2 shrink-0">
           <button onClick={handleDownloadCSV} title="Download CSV Report" className="p-1.5 hover:bg-gray-50 rounded-lg transition-all border border-transparent hover:border-gray-100 text-gray-400 hover:text-gray-600">
              <Download size={16} />
           </button>
           <div className="relative">
             <button onClick={() => setMenuOpen(!menuOpen)} className="p-1.5 hover:bg-gray-50 rounded-lg transition-all border border-transparent hover:border-gray-100 text-gray-400 hover:text-gray-600">
                <MoreVertical size={16} />
             </button>
             {menuOpen && (
               <div className="absolute right-0 top-8 w-36 bg-white border border-gray-100 shadow-xl rounded-xl flex flex-col p-1 z-50">
                  <button onClick={() => setMenuOpen(false)} className="text-xs text-left font-medium text-gray-600 hover:bg-gray-50 hover:text-primary px-3 py-2 rounded-md">View Details</button>
                  <button onClick={() => setMenuOpen(false)} className="text-xs text-left font-medium text-gray-600 hover:bg-gray-50 hover:text-primary px-3 py-2 rounded-md">Configure Widget</button>
                  <button onClick={() => setMenuOpen(false)} className="text-xs text-left font-medium text-red-600 hover:bg-red-50 px-3 py-2 rounded-md">Hide from View</button>
               </div>
             )}
           </div>
        </div>
      </div>
      <div className="flex-1 w-full min-h-0">{children}</div>
    </div>
  );
}

export function DashboardWidgets({ 
  topColleges: propTopColleges, 
  alerts: propAlerts, 
  activityData: propActivityData,
  leadVelocity: propLeadVelocity,
  revenueTrend: propRevenueTrend,
  moderationData: propModerationData,
  loading 
}: any) {
  const displayColleges = propTopColleges && propTopColleges.length > 0 ? propTopColleges : topColleges;
  const initialAlerts = propAlerts && propAlerts.length > 0 ? propAlerts : alerts;
  const displayActivityData = propActivityData && propActivityData.length > 0 ? propActivityData : activityData;
  const displayLeadVelocity = propLeadVelocity && propLeadVelocity.length > 0 ? propLeadVelocity : leadVelocity;
  const displayRevenueTrend = propRevenueTrend && propRevenueTrend.length > 0 ? propRevenueTrend : revenueTrend;
  const displayModerationData = propModerationData && propModerationData.length > 0 ? propModerationData : moderationData;

  const [localAlerts, setLocalAlerts] = useState<any[]>([]);

  useEffect(() => {
    setLocalAlerts(initialAlerts);
  }, [initialAlerts]);

  return (
    <div className="grid grid-cols-12 gap-8 mb-10">
      {/* Widget 1: Student Activity */}
      <WidgetCard 
        title="Student Activity" 
        subtitle="DAU vs Search Queries vs AI Counseling Sessions" 
        className="col-span-12 xl:col-span-8"
        icon={TrendingUp}
      >
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={displayActivityData}>
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
              <Legend verticalAlign="top" height={36}/>
              <Area type="monotone" name="DAU" dataKey="dau" stroke="#0B2447" strokeWidth={4} fillOpacity={1} fill="url(#colorDau)" />
              <Area type="monotone" name="Queries" dataKey="queries" stroke="#3B82F6" strokeWidth={2} fillOpacity={0.1} fill="#3B82F6" />
              <Area type="monotone" name="AI Sessions" dataKey="ai" stroke="#19376D" strokeWidth={4} fillOpacity={1} fill="url(#colorAi)" strokeDasharray="10 10" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </WidgetCard>

      {/* Widget 2: Lead Velocity */}
      <WidgetCard 
        title="Lead Velocity" 
        subtitle="Grouped by stream (Engineering/MBA/Medical)" 
        className="col-span-12 xl:col-span-4"
        icon={MousePointer2}
      >
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={displayLeadVelocity}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 10, fontWeight: 700}} dy={10} />
              <YAxis hide />
              <Tooltip cursor={{fill: '#F8FAFC'}} contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} />
              <Legend />
              <Bar dataKey="eng" name="Engineering" fill="#0B2447" radius={[6, 6, 0, 0]} barSize={12} />
              <Bar dataKey="mba" name="MBA" fill="#19376D" radius={[6, 6, 0, 0]} barSize={12} />
              <Bar dataKey="med" name="Medical" fill="#CBD5E1" radius={[6, 6, 0, 0]} barSize={12} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </WidgetCard>

      {/* Widget 3: Revenue Trend */}
      <WidgetCard 
        title="Revenue Trend" 
        subtitle="Daily CPL + Subscription Revenue" 
        className="col-span-12 lg:col-span-7 xl:col-span-8"
        icon={TrendingUp}
      >
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={displayRevenueTrend}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 10, fontWeight: 700}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 10, fontWeight: 700}} tickFormatter={(value) => `₹${value/1000}k`} />
              <Tooltip />
              <Legend />
              <Area type="step" name="Subscriptions" dataKey="sub" stroke="#0F172A" fill="#0F172A" fillOpacity={0.05} strokeWidth={2} />
              <Area type="monotone" name="CPL Revenue" dataKey="cpl" stroke="#10B981" fill="#10B981" fillOpacity={0.15} strokeWidth={4} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </WidgetCard>

      {/* Widget 4: College Client Map */}
      <WidgetCard 
        title="College Client Map" 
        subtitle="Geographic Spread of Active Leads" 
        className="col-span-12 lg:col-span-5 xl:col-span-4"
        icon={Globe}
      >
        <div className="h-[300px] w-full flex items-center justify-center bg-gray-50 rounded-xl relative overflow-hidden group border border-gray-100">
           <svg viewBox="0 0 200 200" className="w-full h-full opacity-20 group-hover:scale-110 transition-transform duration-1000">
              <path d="M50,150 L150,150 L100,50 Z" fill="currentColor" className="text-primary" />
              <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary/20" />
           </svg>
           <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              <Globe className="text-primary/40 mb-3 animate-pulse" size={32} />
              <p className="text-sm font-bold text-gray-800">Geographic Spread View</p>
              <p className="text-[10px] font-medium text-gray-500 mt-1 uppercase tracking-widest">Active Leads Intensity by Region</p>
              <div className="mt-4 flex space-x-2">
                 <div className="w-2 h-2 rounded-full bg-primary" />
                 <div className="w-2 h-2 rounded-full bg-primary/60" />
                 <div className="w-2 h-2 rounded-full bg-primary/20" />
              </div>
           </div>
        </div>
      </WidgetCard>

      {/* Widget 5: Moderation Queue Status */}
      <WidgetCard 
        title="Moderation Queue Status" 
        subtitle="Pending / Approved / Rejected Today" 
        className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-4"
        icon={ShieldAlert}
      >
        <div className="h-[300px] w-full flex flex-col items-center justify-center">
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={displayModerationData}
                innerRadius={70}
                outerRadius={90}
                paddingAngle={10}
                dataKey="value"
                stroke="none"
              >
                {displayModerationData.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex space-x-6">
            {displayModerationData.map((item: any) => (
              <div key={item.name} className="flex flex-col items-center">
                <div className="flex items-center space-x-2 mb-1">
                   <div className="w-2.5 h-2.5 rounded-full" style={{backgroundColor: item.color}} />
                   <span className="text-xs font-medium text-gray-500 leading-none">{item.name}</span>
                </div>
                <span className="text-lg font-bold text-gray-800">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </WidgetCard>

      {/* Widget 6: AI Counselor Usage */}
      <WidgetCard 
        title="AI Counselor Usage" 
        subtitle="Sessions Today: 1,245 | Avg Response: 2.1s" 
        className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-4" 
        icon={Zap}
      >
        <div className="h-[300px] flex flex-col justify-center space-y-6">
           <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-gray-500">
                 <span>Cache Hit Rate</span>
                 <span>84%</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                 <div className="h-full bg-emerald-500 rounded-full" style={{width: '84%'}} />
              </div>
           </div>
           <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-gray-500">
                 <span>Queue Depth</span>
                 <span>3 Active</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                 <div className="h-full bg-primary rounded-full" style={{width: '30%'}} />
              </div>
           </div>
           <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                 <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Total Tokens</p>
                 <p className="text-lg font-black text-typography">8.4M</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                 <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">GPU Load</p>
                 <p className="text-lg font-black text-typography">62%</p>
              </div>
           </div>
        </div>
      </WidgetCard>

      {/* Widget 7: Top Searched Colleges */}
      <WidgetCard 
        title="Top Searched Colleges" 
        subtitle="Most Viewed Institutions (Real-time)" 
        className="col-span-12 md:col-span-12 lg:col-span-4 xl:col-span-4"
        icon={Search}
      >
        <div className="space-y-4">
          {displayColleges.map((college: any, i: number) => (
            <div key={college.name} className="flex items-center justify-between group cursor-pointer hover:bg-gray-50 p-2 rounded-xl transition-all">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-[10px] font-bold text-gray-500 group-hover:bg-primary group-hover:text-white transition-all">
                   {i+1}
                </div>
                <div>
                   <p className="text-sm font-bold text-gray-800 line-clamp-1">{college.name}</p>
                   <p className="text-[10px] font-medium text-gray-500">{loading ? "..." : college.searches?.toLocaleString()} Views</p>
                </div>
              </div>
              <div className={cn(
                "text-[10px] font-black px-2 py-1 rounded-md",
                college.change?.startsWith('+') ? "text-emerald-700 bg-emerald-50" : "text-red-700 bg-red-50"
              )}>
                {college.change}
              </div>
            </div>
          ))}
        </div>
      </WidgetCard>

      {/* Widget 8: System Alerts Feed */}
      <WidgetCard 
        title="System Alerts Feed" 
        subtitle="Chronological infrastructure & security events" 
        className="col-span-12 lg:col-span-12"
        icon={Zap}
      >
        <div className="overflow-x-auto -mx-6 mb-[-24px]">
          <table className="w-full text-left border-t border-gray-100">
             <thead className="bg-gray-50/50">
                <tr>
                   <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                   <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Message</th>
                   <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Timestamp</th>
                   <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-gray-100">
                {localAlerts.map((alert: any) => (
                  <tr key={alert.id} className="group hover:bg-gray-50/80 transition-colors">
                    <td className="px-6 py-4">
                       <span className={cn(
                         "text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md",
                         alert.type === 'CRITICAL' ? 'bg-red-50 text-red-600' : 
                         alert.type === 'WARNING' ? 'bg-amber-50 text-amber-600' : 
                         'bg-sky-50 text-sky-600'
                       )}>
                         {alert.type}
                       </span>
                    </td>
                    <td className="px-6 py-4">
                       <p className="text-sm font-medium text-gray-800 line-clamp-1">{alert.text}</p>
                    </td>
                    <td className="px-6 py-4">
                       <p className="text-sm font-medium text-gray-400 whitespace-nowrap">{new Date(alert.time).toLocaleTimeString()}</p>
                    </td>
                    <td className="px-6 py-4 text-right">
                       <button onClick={() => setLocalAlerts(prev => prev.filter(a => a.id !== alert.id))} className="text-xs font-medium text-primary px-3 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary/5">Acknowledge</button>
                    </td>
                  </tr>
                ))}
                {localAlerts.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-gray-400 text-sm font-medium">All infrastructure systems operating optimally. No pending alerts.</td>
                  </tr>
                )}
             </tbody>
          </table>
        </div>
      </WidgetCard>
    </div>
  );
}

export function QuickActions() {
  const actions = [
    { label: "Add College", icon: Plus, color: "bg-primary", href: "/admin/colleges/new" },
    { label: "Approve Reviews", icon: ShieldAlert, color: "bg-red-600", href: "/admin/moderation/reviews" },
    { label: "Generate Invoices", icon: Download, color: "bg-secondary", href: "/admin/growth/invoices" },
    { label: "View Lead Disputes", icon: Users, color: "bg-amber-600", href: "/admin/operations/leads?disputes=true" },
    { label: "SEO Master Audit", icon: Globe, color: "bg-emerald-600", href: "/admin/seo/meta-tags" },
    { label: "Trigger Search Re-index", icon: Zap, color: "bg-blue-600", href: "/admin/system/meilisearch" },
  ];

  return (
    <div className="fixed bottom-24 lg:bottom-10 right-4 lg:right-10 flex flex-col space-y-4 items-end z-[90] group">
       <button className="w-14 h-14 md:w-16 md:h-16 bg-primary text-white rounded-[1.5rem] md:rounded-[2rem] shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all">
          <Settings size={28} className="animate-spin-slow" />
       </button>
       <div className="absolute bottom-16 md:bottom-20 right-0 flex flex-col space-y-4 pointer-events-none group-hover:pointer-events-auto">
          {actions.map((action, i) => (
            <div key={i} className="flex items-center justify-end space-x-4 opacity-0 group-hover:opacity-100 translate-y-10 group-hover:translate-y-0 transition-all duration-300" style={{ transitionDelay: `${i * 50}ms` }}>
               <span className="bg-white border border-gray-100 px-4 py-2 rounded-xl text-xs font-black shadow-lg shadow-black/5 whitespace-nowrap">
                  {action.label}
               </span>
               <Link href={action.href} className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-xl cursor-pointer hover:rotate-12 active:scale-95 transition-all", action.color)}>
                  <action.icon size={20} />
               </Link>
            </div>
          ))}
       </div>
    </div>
  );
}
