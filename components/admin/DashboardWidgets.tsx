"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
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
    <div className={cn("bg-white rounded-2xl border border-gray-100 shadow-sm p-4 md:p-6 flex flex-col h-full", className)}>
      <div className="flex justify-between items-start mb-6 w-full relative">
        <div className="min-w-0 pr-2">
          <div className="flex items-center space-x-2">
            {Icon && <Icon size={18} className="text-primary shrink-0" />}
            <h3 className="text-[14px] font-black text-typography tracking-tight leading-none">{title}</h3>
          </div>
          {subtitle && <p className="text-[10px] font-bold text-secondary/40 uppercase tracking-widest mt-2">
            {subtitle}
          </p>}
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

const STABLE_EMPTY_ARRAY: any[] = [];

export function DashboardWidgets({ 
  topColleges = STABLE_EMPTY_ARRAY, 
  alerts = STABLE_EMPTY_ARRAY, 
  activityData = STABLE_EMPTY_ARRAY,
  leadVelocity = STABLE_EMPTY_ARRAY,
  revenueTrend = STABLE_EMPTY_ARRAY,
  moderationData = STABLE_EMPTY_ARRAY,
  loading 
}: any) {
  const [mounted, setMounted] = useState(false);
  const [localAlerts, setLocalAlerts] = useState<any[]>(alerts);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (alerts && alerts.length > 0) {
      setLocalAlerts(alerts);
    }
  }, [alerts]);

  if (!mounted) return <div className="grid grid-cols-12 gap-8 mb-10 min-h-[600px] animate-pulse bg-gray-50/50 rounded-[3rem]" />;

  return (
    <div className="grid grid-cols-12 gap-8 mb-10">
      {/* Widget 1: Student Activity */}
      <WidgetCard 
        title="Student Activity" 
        subtitle="DAU vs Queries vs AI" 
        className="col-span-12 xl:col-span-8"
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
              <Legend verticalAlign="top" height={36}/>
              <Area type="monotone" name="DAU" dataKey="dau" stroke="#0B2447" strokeWidth={4} fillOpacity={1} fill="url(#colorDau)" />
              <Area type="monotone" name="AI Sessions" dataKey="ai" stroke="#19376D" strokeWidth={4} fillOpacity={1} fill="url(#colorAi)" strokeDasharray="10 10" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </WidgetCard>

      {/* Widget 2: Lead Velocity */}
      <WidgetCard 
        title="Lead Velocity" 
        subtitle="Grouped by stream (Eng/MBA/Med)" 
        className="col-span-12 xl:col-span-4"
        icon={MousePointer2}
      >
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={leadVelocity}>
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
            <AreaChart data={revenueTrend}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 10, fontWeight: 700}} dy={15} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 10, fontWeight: 700}} tickFormatter={(value) => `₹${value/1000}k`} dx={-10} width={45} />
              <Tooltip />
              <Legend />
              <Area type="monotone" name="Revenue" dataKey="revenue" stroke="#10B981" fill="#10B981" fillOpacity={0.15} strokeWidth={4} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </WidgetCard>

      {/* Widget 5: Moderation Queue Status */}
      <WidgetCard 
        title="Queue Pipeline" 
        subtitle="Moderation Status" 
        className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-4"
        icon={ShieldAlert}
      >
        <div className="h-[300px] w-full flex flex-col items-center justify-center">
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={moderationData}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={10}
                dataKey="value"
                stroke="none"
              >
                {moderationData.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex space-x-6">
            {moderationData.map((item: any) => (
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

      {/* Widget 7: Top Searched Colleges */}
      <WidgetCard 
        title="Top Lead-Generating Colleges" 
        subtitle="Most Interested Institutions (Real-time)" 
        className="col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12"
        icon={Search}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topColleges.map((college: any, i: number) => (
            <div key={college.name} className="flex items-center justify-between group cursor-pointer hover:bg-gray-50 p-4 rounded-xl transition-all border border-gray-50">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-[10px] font-bold text-gray-500 group-hover:bg-primary group-hover:text-white transition-all">
                   {i+1}
                </div>
                <div>
                   <p className="text-sm font-bold text-gray-800">{college.name}</p>
                   <p className="text-[10px] font-medium text-gray-500">{loading ? "..." : college.leads?.toLocaleString()} Leads Ingested</p>
                </div>
              </div>
              <div className={cn(
                "text-[10px] font-black px-2 py-1 rounded-md bg-emerald-50 text-emerald-700"
              )}>
                {college.change}
              </div>
            </div>
          ))}
          {topColleges.length === 0 && (
            <div className="col-span-full py-10 text-center text-gray-400 text-xs font-bold uppercase tracking-widest">
               No Lead Nodes Sequenced
            </div>
          )}
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
                {localAlerts.map((alert: any) => {
                  const displayTime = alert.time?.includes('ago') ? alert.time : new Date(alert.time).toLocaleTimeString();
                  return (
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
                        <p className="text-sm font-medium text-gray-400 whitespace-nowrap">{displayTime}</p>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button onClick={() => setLocalAlerts(prev => prev.filter(a => a.id !== alert.id))} className="text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary hover:text-white px-4 py-2 rounded-xl transition-all border border-primary/10">Acknowledge</button>
                      </td>
                    </tr>
                  );
                })}
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
    { label: "Lead Control", icon: Users, color: "bg-amber-600", href: "/admin/operations/leads" },
    { label: "SEO Master Audit", icon: Globe, color: "bg-emerald-600", href: "/admin/seo/metadata" },
    { label: "AI Logic Control", icon: Zap, color: "bg-blue-600", href: "/admin/ai/quality/prompts" },
  ];

  return (
    <div className="fixed bottom-6 lg:bottom-10 right-4 lg:right-10 flex flex-col space-y-4 items-end z-[90] group">
       <button className="w-14 h-14 md:w-16 md:h-16 bg-primary text-white rounded-[1.5rem] md:rounded-[2rem] shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all outline-none">
          <Settings size={28} className="animate-spin-slow" />
       </button>
       <div className="absolute bottom-16 md:bottom-20 right-0 flex flex-col space-y-3 pointer-events-none group-hover:pointer-events-auto">
          {actions.map((action, i) => (
            <div key={i} className="flex items-center justify-end space-x-3 md:space-x-4 opacity-0 group-hover:opacity-100 translate-y-10 group-hover:translate-y-0 transition-all duration-300" style={{ transitionDelay: `${i * 50}ms` }}>
               <span className="bg-white border border-gray-100 px-3 py-1.5 md:px-4 md:py-2 rounded-xl text-[10px] md:text-xs font-black shadow-lg shadow-black/5 whitespace-nowrap">
                  {action.label}
               </span>
               <Link href={action.href} className={cn("w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center text-white shadow-xl cursor-pointer hover:rotate-12 active:scale-95 transition-all leading-none", action.color)}>
                  <action.icon size={18} />
               </Link>
            </div>
          ))}
       </div>
    </div>
  );
}
