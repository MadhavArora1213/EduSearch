"use client";

import { useState } from "react";
import { 
  ShieldAlert, 
  Terminal, 
  Bug, 
  ChevronRight, 
  Search, 
  Filter, 
  UserPlus, 
  Activity, 
  Clock, 
  CheckCircle2, 
  ExternalLink,
  Cpu,
  Zap,
  Layers,
  Sparkles,
  BarChart3,
  Flame,
  XCircle,
  Code2,
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SentryError {
  id: string;
  title: string;
  location: string;
  count: number;
  lastSeen: string;
  status: 'UNRESOLVED' | 'RESOLVED' | 'ASSIGNED';
  platform: 'FRONTEND' | 'BACKEND';
  assignee?: string;
}

export default function SentryErrorCentrePage() {
  const [activeTab, setActiveTab] = useState<'ISSUES' | 'PERFORMANCE'>('ISSUES');

  const issues: SentryError[] = [
    { 
      id: "ERR-991", 
      title: "TypeError: Cannot read properties of null (reading 'college')", 
      location: "/app/colleges/[id]/page.tsx:142", 
      count: 142, 
      lastSeen: "2 mins ago", 
      status: 'UNRESOLVED', 
      platform: 'FRONTEND' 
    },
    { 
      id: "ERR-992", 
      title: "FastifyTimeoutError: Ollama generation timed out after 30000ms", 
      location: "/api/ai/counselor", 
      count: 24, 
      lastSeen: "12 mins ago", 
      status: 'ASSIGNED', 
      platform: 'BACKEND',
      assignee: "Developer Rohan"
    },
    { 
       id: "ERR-993", 
       title: "PostgresError: Connection pool limit reached", 
       location: "database-cluster-v3", 
       count: 8, 
       lastSeen: "1 hour ago", 
       status: 'UNRESOLVED', 
       platform: 'BACKEND' 
    }
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-6 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-2">
              <div className="bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-100">
                 <span className="text-[10px] font-black uppercase tracking-widest text-rose-600 italic lowercase">Stack Trace Center</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30">Sentry Error Intelligence</span>
           </div>
           <h1 className="text-5xl font-black text-typography tracking-tighter leading-none mb-1">
             Error <span className="text-rose-600 italic">Command</span>
           </h1>
           <p className="text-secondary/40 text-sm font-bold uppercase tracking-widest mt-2">
              Aggregated Exceptions, component crashes & API Latency monitoring
           </p>
        </div>

        <div className="flex items-center space-x-4">
           <div className="bg-slate-900 px-8 py-4 rounded-3xl border border-white/10 shadow-2xl flex items-center space-x-6 text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/10 blur-3xl rounded-full" />
              <div>
                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-2">Unresolved Issues</p>
                 <p className="text-2xl font-black tracking-tighter italic">12 <span className="text-rose-500 text-[10px] font-black underline not-italic ml-2 uppercase tracking-widest">Action Needed</span></p>
              </div>
              <XCircle size={32} className="text-rose-500 relative z-10" />
           </div>
        </div>
      </section>

      {/* Control Tabs */}
      <div className="flex items-center space-x-4 bg-white p-2 rounded-[2.5rem] border border-gray-100 shadow-sm w-fit">
         {[
           { id: 'ISSUES', label: 'Issue Stream', icon: Bug },
           { id: 'PERFORMANCE', label: 'Performance Tracing', icon: Activity }
         ].map((tab) => (
           <button 
             key={tab.id}
             onClick={() => setActiveTab(tab.id as any)}
             className={cn(
               "flex items-center space-x-3 px-6 py-4 rounded-3xl text-[10px] font-black uppercase tracking-widest transition-all",
               activeTab === tab.id ? "bg-rose-600 text-white shadow-lg shadow-rose-600/20" : "text-secondary/40 hover:text-secondary hover:bg-snow-pearl"
             )}
           >
             <tab.icon size={16} />
             <span>{tab.label}</span>
           </button>
         ))}
      </div>

      <div className="grid grid-cols-12 gap-10">
         <div className="col-span-12 lg:col-span-8 bg-white rounded-[3rem] border border-gray-50 shadow-sm overflow-hidden flex flex-col">
            {activeTab === 'ISSUES' ? (
               <>
                  <div className="p-10 border-b border-gray-50 flex items-center justify-between bg-rose-50/10">
                     <div>
                        <h3 className="text-xl font-black text-typography tracking-tighter italic lowercase underline decoration-rose-500/20 capitalize">Exception Stream (Aggregated)</h3>
                        <p className="text-[10px] font-bold text-secondary/30 uppercase tracking-[0.2em] mt-2 italic">Real-time unhandled component crashes & Node exceptions</p>
                     </div>
                     <div className="flex items-center space-x-2">
                        <button className="p-4 bg-white rounded-2xl border border-gray-100 text-secondary/40 hover:text-rose-500 transition-all shadow-sm">
                           <Filter size={18} />
                        </button>
                     </div>
                  </div>
                  <div className="overflow-x-auto">
                     <table className="w-full text-left">
                        <thead className="bg-snow-pearl/50 border-b border-gray-100">
                           <tr>
                              <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Error Detail & Trace</th>
                              <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40 text-center">Environment</th>
                              <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Occurrences</th>
                              <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Status</th>
                              <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40 text-right">Interrupt</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 italic">
                           {issues.map((issue) => (
                              <tr key={issue.id} className="group hover:bg-rose-50/10 transition-all">
                                 <td className="px-10 py-8">
                                    <div className="flex items-center space-x-6">
                                       <div className="w-12 h-12 bg-snow-pearl rounded-2xl flex items-center justify-center text-secondary/10 group-hover:bg-rose-100 group-hover:text-rose-600 transition-all">
                                          <Bug size={24} />
                                       </div>
                                       <div className="max-w-md">
                                          <h4 className="text-[13px] font-black text-typography tracking-tight line-clamp-1 lowercase">{issue.title}</h4>
                                          <div className="flex items-center space-x-2 text-[9px] font-bold text-secondary/30 uppercase tracking-widest mt-1">
                                             <Code2 size={10} />
                                             <span className="underline decoration-secondary/10">{issue.location}</span>
                                          </div>
                                       </div>
                                    </div>
                                 </td>
                                 <td className="px-10 py-8 text-center">
                                    <span className={cn(
                                       "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border",
                                       issue.platform === 'FRONTEND' ? "bg-indigo-50 text-indigo-600 border-indigo-100" : "bg-emerald-50 text-emerald-600 border-emerald-100"
                                    )}>
                                       {issue.platform}
                                    </span>
                                 </td>
                                 <td className="px-10 py-8">
                                    <div className="flex flex-col space-y-1">
                                       <span className="text-lg font-black text-typography tracking-tighter">{issue.count}x</span>
                                       <span className="text-[9px] font-bold text-secondary/20 uppercase tracking-widest italic">{issue.lastSeen}</span>
                                    </div>
                                 </td>
                                 <td className="px-10 py-8">
                                    {issue.status === 'ASSIGNED' ? (
                                       <div className="flex items-center space-x-2">
                                          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                                          <span className="text-[10px] font-black text-indigo-600 uppercase italic underline decoration-indigo-200">Assigned: {issue.assignee?.split(' ')[1]}</span>
                                       </div>
                                    ) : (
                                       <span className="text-[10px] font-black text-rose-500 uppercase italic bg-rose-50 px-3 py-1 rounded-full border border-rose-100">Unresolved</span>
                                    )}
                                 </td>
                                 <td className="px-10 py-8 text-right">
                                    <div className="flex items-center justify-end space-x-2">
                                       <button className="p-4 bg-white border border-gray-100 rounded-2xl hover:bg-primary hover:text-white transition-all shadow-sm group/btn" title="Assign to Developer">
                                          <UserPlus size={18} />
                                       </button>
                                       <button className="p-4 bg-white border border-gray-100 rounded-2xl hover:bg-emerald-500 hover:text-white transition-all shadow-sm group/btn" title="Mark as Resolved">
                                          <CheckCircle2 size={18} />
                                       </button>
                                    </div>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </>
            ) : (
               <div className="p-10 space-y-10">
                  <div className="bg-snow-pearl/30 p-10 rounded-[3rem] border border-gray-100 italic">
                     <div className="flex items-center justify-between mb-10">
                        <div>
                           <h4 className="text-2xl font-black text-typography tracking-tighter uppercase italic">Endpoint Latency (P95)</h4>
                           <p className="text-[10px] font-bold text-secondary/30 uppercase tracking-widest mt-1">Measuring API performance across global edge nodes</p>
                        </div>
                        <BarChart3 size={32} className="text-indigo-500" />
                     </div>
                     <div className="space-y-6">
                        {[
                           { name: "POST /api/leads/submit", lat: "142ms", health: 94 },
                           { name: "GET /api/colleges/search", lat: "88ms", health: 98 },
                           { name: "POST /api/ai/counselor", lat: "4,200ms", health: 64 }
                        ].map((p, i) => (
                           <div key={i} className="flex items-center justify-between p-6 bg-white rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group">
                              <div className="absolute top-0 left-0 bottom-0 bg-indigo-500/5 transition-all group-hover:bg-indigo-500/10" style={{ width: `${p.health}%` }} />
                              <div className="relative z-10 flex items-center space-x-6">
                                 <div className="w-10 h-10 bg-snow-pearl rounded-xl flex items-center justify-center text-secondary/20"><Activity size={20} /></div>
                                 <span className="text-sm font-black text-typography uppercase italic">{p.name}</span>
                              </div>
                              <div className="relative z-10 text-right">
                                 <p className="text-lg font-black text-typography tracking-tighter">{p.lat}</p>
                                 <span className={cn("text-[9px] font-black uppercase tracking-widest", p.health > 90 ? "text-emerald-500" : "text-amber-500")}>{p.health}% SCORE</span>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            )}
         </div>

         <div className="col-span-12 lg:col-span-4 space-y-8">
            <div className="bg-slate-900 p-10 rounded-[3rem] text-white overflow-hidden relative group">
               <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Cpu size={80} className="text-primary" />
               </div>
               <h4 className="text-sm font-black text-slate-500 uppercase tracking-widest mb-6 italic underline decoration-primary/30">DevOps Pulse</h4>
               <div className="space-y-6">
                  <div className="flex items-center justify-between">
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Hydration Errors</p>
                     <p className="text-lg font-black text-emerald-500 italic">0%</p>
                  </div>
                  <div className="flex items-center justify-between">
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">API 5xx Distribution</p>
                     <p className="text-lg font-black text-rose-500 italic">1.2%</p>
                  </div>
                  <div className="flex items-center justify-between">
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ollama Timeouts</p>
                     <p className="text-lg font-black text-amber-500 italic">04 Today</p>
                  </div>
               </div>
               <div className="mt-10 pt-10 border-t border-slate-800">
                  <button className="w-full flex items-center justify-center space-x-3 py-4 bg-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-primary/20">
                     <ExternalLink size={16} />
                     <span>Jump to full Sentry Cloud</span>
                  </button>
               </div>
            </div>

            <div className="bg-white p-10 rounded-[3rem] border border-gray-50 shadow-sm space-y-6 group hover:border-primary/20 transition-all cursor-pointer">
               <div className="flex items-center justify-between">
                  <Activity size={28} className="text-secondary/10 group-hover:text-primary transition-colors" />
                  <Sparkles size={18} className="text-emerald-500 animate-pulse" />
               </div>
               <h4 className="text-sm font-black text-typography uppercase tracking-tight italic lowercase underline decoration-primary/10">Vercel Web Vitals</h4>
               <div className="space-y-4">
                  {[
                     { l: 'LCP (Largest Contentful Paint)', v: '1.2s' },
                     { l: 'CLS (Cumulative Layout Shift)', v: '0.04' }
                  ].map((stat, i) => (
                     <div key={i} className="flex justify-between items-center text-[11px] font-bold">
                        <span className="text-secondary/40 italic">{stat.l}</span>
                        <span className="text-emerald-600 italic bg-emerald-50 px-2 py-0.5 rounded-md">{stat.v}</span>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
