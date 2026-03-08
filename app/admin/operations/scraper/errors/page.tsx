"use client";

import { useState } from "react";
import { 
  Terminal, 
  AlertCircle, 
  XOctagon, 
  ChevronRight, 
  Search, 
  Filter, 
  RefreshCw, 
  Ban, 
  ShieldAlert, 
  Globe, 
  Cpu, 
  Activity, 
  Mail,
  ArrowUpRight,
  Database,
  Lock,
  WifiOff
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ScraperError {
  id: string;
  job: string;
  url: string;
  errorCode: number | string;
  status: 'BLOCKED' | 'NOT_FOUND' | 'TIMEOUT' | 'PARSING_ERROR';
  occurrences: number;
  lastSeen: string;
}

export default function ScraperErrorLogPage() {
  const [activeTab, setActiveTab] = useState<'ERRORS' | 'BLOCKLIST' | 'NOTIFICATIONS'>('ERRORS');

  const errors: ScraperError[] = [
    { id: "ERR-001", job: "NIRF Crawler", url: "https://nirfindia.org/2026/Ranking", errorCode: 403, status: 'BLOCKED', occurrences: 42, lastSeen: "2 mins ago" },
    { id: "ERR-002", job: "NAAC Sync", url: "https://naac.gov.in/grade/122", errorCode: 404, status: 'NOT_FOUND', occurrences: 12, lastSeen: "1 hour ago" },
    { id: "ERR-003", job: "Salary Scraper", url: "https://ambitionbox.com/api/c/12", errorCode: 'ETIMEDOUT', status: 'TIMEOUT', occurrences: 8, lastSeen: "4 hours ago" },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-6 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-2">
              <div className="bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-100">
                 <span className="text-[10px] font-black uppercase tracking-widest text-rose-600 italic lowercase">Stack Trace Monitoring</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30">Pipeline Error Intelligence</span>
           </div>
           <h1 className="text-5xl font-black text-typography tracking-tighter leading-none mb-1">
             Error <span className="text-rose-600 italic">Terminal</span>
           </h1>
           <p className="text-secondary/40 text-sm font-bold uppercase tracking-widest mt-2">
              Decoding Proxy Blocks, DOM Failures & Network Timeouts
           </p>
        </div>

        <div className="flex items-center space-x-4">
           <button className="flex items-center space-x-2 px-8 py-4 bg-slate-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20">
              <RefreshCw size={18} />
              <span>Rotate Proxy Pool</span>
           </button>
        </div>
      </section>

      {/* Control Tabs */}
      <div className="flex items-center space-x-4 bg-white p-2 rounded-[2.5rem] border border-gray-100 shadow-sm w-fit">
         {[
           { id: 'ERRORS', label: 'Network & Logic Failures', icon: Terminal },
           { id: 'BLOCKLIST', label: 'IP Denial Monitoring', icon: Ban },
           { id: 'NOTIFICATIONS', label: 'Brevo Alert Rules', icon: Mail }
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

      {activeTab === 'ERRORS' && (
         <div className="bg-white rounded-[3rem] border border-gray-50 shadow-sm overflow-hidden flex flex-col">
            <div className="p-10 border-b border-gray-50 flex items-center justify-between bg-rose-50/10">
               <div>
                  <h3 className="text-xl font-black text-typography tracking-tighter italic lowercase underline decoration-rose-500/20 capitalize">Recent Pipeline Exceptions</h3>
                  <p className="text-[10px] font-bold text-secondary/30 uppercase tracking-[0.2em] mt-2 italic">Aggregated failures from Node-V3 scraper fleet</p>
               </div>
               <div className="flex items-center space-x-4">
                  <div className="relative">
                     <Search size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-secondary/20" />
                     <input placeholder="Filter by URL or Class..." className="w-64 bg-white border border-gray-100 pl-14 pr-6 py-3 rounded-2xl text-[12px] font-bold outline-none focus:ring-4 focus:ring-rose-500/5 transition-all" />
                  </div>
                  <button className="p-4 bg-white rounded-2xl border border-gray-100 text-secondary/20 hover:text-rose-500 transition-all">
                     <Filter size={18} />
                  </button>
               </div>
            </div>
            <div className="overflow-x-auto">
               <table className="w-full text-left">
                  <thead className="bg-snow-pearl/50 border-b border-gray-100">
                     <tr>
                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Failure Type & Job</th>
                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Violating Endpoint</th>
                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Severity Cluster</th>
                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Last Incident</th>
                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40 text-right">Action</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                     {errors.map((err) => (
                        <tr key={err.id} className="group hover:bg-rose-50/10 transition-all">
                           <td className="px-10 py-8">
                              <div className="flex items-center space-x-6">
                                 <div className={cn(
                                    "w-12 h-12 bg-snow-pearl rounded-2xl flex items-center justify-center transition-all group-hover:bg-rose-100 group-hover:text-rose-600 shadow-inner",
                                    err.status === 'BLOCKED' ? "text-rose-500" : "text-amber-500"
                                 )}>
                                    {err.status === 'BLOCKED' ? <XOctagon size={20} /> : <Terminal size={20} />}
                                 </div>
                                 <div>
                                    <h4 className="text-sm font-black text-typography uppercase tracking-tight">{err.status.replace('_', ' ')}</h4>
                                    <p className="text-[10px] font-bold text-secondary/30 uppercase tracking-widest italic">{err.job}</p>
                                 </div>
                              </div>
                           </td>
                           <td className="px-10 py-8">
                              <p className="text-[11px] font-bold text-secondary/40 truncate w-64 italic">{err.url}</p>
                              <span className="text-[9px] font-black text-rose-500 uppercase tracking-widest mt-1">HTTP {err.errorCode} Error</span>
                           </td>
                           <td className="px-10 py-8">
                              <div className="flex items-center space-x-2">
                                 <span className="text-lg font-black text-typography tracking-tighter">{err.occurrences}x</span>
                                 <div className="w-full h-1 bg-gray-100 rounded-full w-12 overflow-hidden">
                                    <div className="h-full bg-rose-500" style={{ width: `${Math.min(100, err.occurrences * 5)}%` }} />
                                 </div>
                              </div>
                           </td>
                           <td className="px-10 py-8 text-[12px] font-black text-typography italic">
                              {err.lastSeen}
                           </td>
                           <td className="px-10 py-8 text-right">
                              <button className="px-6 py-2 bg-white border border-gray-100 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-600 hover:text-white transition-all shadow-sm">
                                 Debug Job
                              </button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      )}

      {activeTab === 'BLOCKLIST' && (
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center">
               <Ban size={48} className="text-rose-500 mb-6" />
               <h3 className="text-2xl font-black text-typography tracking-tighter uppercase italic">WAF Evasion Status</h3>
               <p className="text-[11px] font-bold text-secondary/30 uppercase tracking-widest mt-4 leading-relaxed max-w-sm">
                  System has identified 14 target domains actively blocking our proxy egress-nodes. Evasion level elevated to v3 (Stealth Mode).
               </p>
               <button className="mt-8 px-10 py-4 bg-slate-900 text-white rounded-3xl text-[10px] font-black uppercase tracking-widest italic">Request New Proxy CIDR</button>
            </div>
            <div className="bg-slate-900 p-10 rounded-[3rem] text-white flex flex-col justify-center relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                  <WifiOff size={100} className="text-rose-500" />
               </div>
               <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 italic underline decoration-rose-500/20">Blocked Domains (24h)</h4>
               <div className="space-y-4 relative z-10">
                  {['nirfindia.org', 'naac.gov.in', 'ugc.ac.in'].map((dom) => (
                     <div key={dom} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
                        <span className="text-[11px] font-black italic">{dom}</span>
                        <span className="px-3 py-1 bg-rose-500/20 text-rose-500 text-[9px] font-black rounded-full uppercase tracking-widest border border-rose-500/20">Hard Blocked</span>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      )}

      {activeTab === 'NOTIFICATIONS' && (
         <div className="bg-white p-10 rounded-[3rem] border border-gray-50 shadow-sm">
            <h3 className="text-xl font-black text-typography tracking-tighter uppercase italic mb-8">Escalation Policy Nodes</h3>
            <div className="space-y-4">
               {[
                  { trigger: "Job fails 3x consecutively", alert: "Critical SMTP to DevOps Hub", status: "Active" },
                  { trigger: "Success rate < 60%", alert: "Moderate Warning to Slack", status: "Active" },
                  { trigger: "IP Block Rate > 20%", alert: "Immediate Proxy Rotation Trigger", status: "Active" }
               ].map((rule, i) => (
                  <div key={i} className="p-8 bg-snow-pearl/50 rounded-[2.5rem] border border-gray-100 flex items-center justify-between group hover:border-primary/20 transition-all">
                     <div className="flex items-center space-x-6">
                        <div className="w-14 h-14 bg-white rounded-3xl flex items-center justify-center text-primary shadow-sm"><Mail size={24} /></div>
                        <div>
                           <p className="text-[10px] font-black text-secondary/30 uppercase tracking-widest mb-1">Trigger: {rule.trigger}</p>
                           <p className="text-base font-black text-typography uppercase italic">{rule.alert}</p>
                        </div>
                     </div>
                     <span className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest italic border border-emerald-100">{rule.status}</span>
                  </div>
               ))}
            </div>
         </div>
      )}
    </div>
  );
}
