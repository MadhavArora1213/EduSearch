"use client";

import { useState } from "react";
import { 
  ShieldAlert, 
  Ban, 
  Search, 
  Filter, 
  ChevronRight, 
  Activity, 
  Zap, 
  Terminal, 
  MapPin, 
  AlertTriangle, 
  Lock, 
  Settings, 
  RefreshCw,
  Globe,
  Cpu,
  Monitor,
  Flame,
  ShieldCheck
} from "lucide-react";
import { cn } from "@/lib/utils";

interface RateLimitEvent {
  ip: string;
  type: 'SEARCH' | 'LEAD' | 'LOGIN' | 'AI_COUNSELOR';
  hits: number;
  autoBlocked: boolean;
  lastHit: string;
  location: string;
}

export default function RateLimitDashboard() {
  const [activeTab, setActiveTab] = useState<'LIMITS' | 'BOTS' | 'LOGINS'>('LIMITS');

  const events: RateLimitEvent[] = [
    { ip: "192.168.42.108", type: 'SEARCH', hits: 450, autoBlocked: true, lastHit: "2 mins ago", location: "Mumbai, IN" },
    { ip: "45.12.88.21", type: 'LOGIN', hits: 12, autoBlocked: false, lastHit: "15 mins ago", location: "Moscow, RU" },
    { ip: "210.44.1.92", type: 'AI_COUNSELOR', hits: 89, autoBlocked: true, lastHit: "42 mins ago", location: "Beijing, CN" },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-6 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-2">
              <div className="bg-primary/5 px-3 py-1.5 rounded-xl border border-primary/10">
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary italic">Security Pulse</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30">Rate Limit & Abuse Dashboard</span>
           </div>
           <h1 className="text-3xl md:text-3xl md:text-5xl font-black text-typography tracking-tighter leading-none mb-1">
             Abuse <span className="text-primary italic">Control</span>
           </h1>
           <p className="text-secondary/40 text-sm font-bold uppercase tracking-widest mt-2">
              Real-time IP Monitoring, Bot Mitigation & Cloudflare WAF Hooks
           </p>
        </div>

        <div className="flex items-center space-x-4">
           <div className="bg-white px-8 py-4 rounded-3xl border border-gray-100 shadow-sm flex items-center space-x-6">
              <div>
                 <p className="text-[10px] font-black text-secondary/20 uppercase tracking-widest">Active Bans (24h)</p>
                 <p className="text-2xl font-black text-typography tracking-tighter">142 <span className="text-rose-500 text-xs text-[10px] font-black underline italic">High Alert</span></p>
              </div>
              <ShieldAlert size={28} className="text-rose-500 animate-pulse" />
           </div>
        </div>
      </section>

      {/* Control Tabs */}
      <div className="flex items-center space-x-4 bg-white p-2 rounded-[2.5rem] border border-gray-100 shadow-sm w-fit">
         {[
           { id: 'LIMITS', label: 'Rate Limit Violations', icon: Activity },
           { id: 'BOTS', label: 'Bot Detection Logs', icon: Cpu },
           { id: 'LOGINS', label: 'Auth Anomaly Monitor', icon: Lock }
         ].map((tab) => (
           <button 
             key={tab.id}
             onClick={() => setActiveTab(tab.id as any)}
             className={cn(
               "flex items-center space-x-3 px-6 py-4 rounded-3xl text-[10px] font-black uppercase tracking-widest transition-all",
               activeTab === tab.id ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-secondary/40 hover:text-secondary hover:bg-snow-pearl"
             )}
           >
             <tab.icon size={16} />
             <span>{tab.label}</span>
           </button>
         ))}
      </div>

      {/* Main View Area */}
      <div className="grid grid-cols-12 gap-10">
         <div className="col-span-12 lg:col-span-9 bg-white rounded-[3rem] border border-gray-50 shadow-sm overflow-hidden">
            {activeTab === 'LIMITS' && (
               <>
                  <div className="p-6 md:p-10 border-b border-gray-50 flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-snow-pearl/30">
                     <div>
                        <h3 className="text-xl font-black text-typography tracking-tighter italic lowercase underline decoration-primary/10">Real-time IP Thresholds</h3>
                        <p className="text-[10px] font-bold text-secondary/30 uppercase tracking-[0.2em] mt-2 italic">Active sessions exceeding platform rate-limits</p>
                     </div>
                     <div className="flex items-center space-x-4">
                        <button className="flex items-center space-x-2 px-6 py-3 bg-white border border-gray-200 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:border-primary/20 transition-all">
                           <RefreshCw size={14} />
                           <span>Sync with Nginx</span>
                        </button>
                        <button className="flex items-center space-x-2 px-8 py-4 bg-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-primary/20">
                           <Ban size={16} />
                           <span>Bulk Block IPs</span>
                        </button>
                     </div>
                  </div>
                  <div className="overflow-x-auto">
                     <table className="w-full text-left">
                        <thead className="bg-snow-pearl/50 border-b border-gray-100">
                           <tr>
                              <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">IP Address & Origin</th>
                              <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Violation Vector</th>
                              <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Request Volume</th>
                              <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">WAF Status</th>
                              <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40 text-right">Protection</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                           {events.map((ev, i) => (
                              <tr key={ev.ip} className="group hover:bg-snow-pearl/30 transition-all">
                                 <td className="px-10 py-8">
                                    <div className="flex items-center space-x-6">
                                       <div className="w-12 h-12 bg-snow-pearl rounded-2xl flex items-center justify-center text-secondary/10 group-hover:text-primary group-hover:bg-primary/5 transition-all">
                                          <Globe size={20} />
                                       </div>
                                       <div>
                                          <h4 className="text-base font-black text-typography leading-tight">{ev.ip}</h4>
                                          <div className="flex items-center space-x-2 text-[10px] font-bold text-secondary/40 uppercase tracking-widest mt-1">
                                             <MapPin size={10} />
                                             <span>{ev.location}</span>
                                          </div>
                                       </div>
                                    </div>
                                 </td>
                                 <td className="px-10 py-8 italic font-black text-[12px] text-typography uppercase tracking-tight">
                                    <span className="text-secondary/20 mr-2">{ev.type.replace('_', ' ')}</span>
                                    <span className="text-primary italic">Flooding Detected</span>
                                 </td>
                                 <td className="px-10 py-8">
                                    <div className="flex flex-col space-y-1">
                                       <span className="text-lg font-black text-typography tracking-tighter">{ev.hits} Hits</span>
                                       <span className="text-[10px] font-bold text-rose-500 uppercase tracking-widest italic">{ev.lastHit}</span>
                                    </div>
                                 </td>
                                 <td className="px-10 py-8">
                                    <span className={cn(
                                       "inline-flex items-center space-x-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                                       ev.autoBlocked ? "bg-rose-50 text-rose-600 border border-rose-100" : "bg-gray-50 text-gray-400 border border-gray-100"
                                    )}>
                                       <div className={cn("w-1.5 h-1.5 rounded-full", ev.autoBlocked ? "bg-rose-500 animate-pulse" : "bg-current")} />
                                       <span>{ev.autoBlocked ? 'Auto-Blocked' : 'Monitoring'}</span>
                                    </span>
                                 </td>
                                 <td className="px-10 py-8 text-right">
                                    <button className="p-4 bg-white border border-gray-100 rounded-2xl hover:bg-rose-600 hover:text-white transition-all shadow-sm" title="Permanent WAF Block">
                                       <Ban size={18} />
                                    </button>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </>
            )}

            {activeTab === 'BOTS' && (
               <div className="p-20 text-center flex flex-col items-center">
                  <Monitor size={64} className="text-indigo-500 mb-8" />
                  <h3 className="text-3xl font-black text-typography tracking-tighter mb-4 italic">Heuristic Bot Mitigation</h3>
                  <p className="text-xs font-bold text-secondary/40 leading-relaxed uppercase tracking-widest max-w-lg mb-10">
                     Analyzing User-Agent patterns, request timings & headless browser fingerprints. 
                     <span className="text-indigo-600 font-black ml-2">84% of blocked traffic matches Puppeteer/Playwright signatures.</span>
                  </p>
                  <div className="grid grid-cols-2 gap-8 w-full max-w-2xl text-left">
                     {[
                        { label: 'Scraper Cluster Detected', val: '42.108.xx', risk: 'HIGH' },
                        { label: 'Rapid Form Submission', val: '102.14.xx', risk: 'MED' }
                     ].map((item, i) => (
                        <div key={i} className="p-6 bg-snow-pearl rounded-3xl border border-gray-100 italic">
                           <p className="text-[10px] font-black text-secondary/30 uppercase tracking-widest">{item.label}</p>
                           <p className="text-lg font-black text-typography uppercase my-2">{item.val}</p>
                           <span className="text-[9px] font-black px-2 py-0.5 bg-rose-50 text-rose-500 rounded-full">{item.risk} Risk</span>
                        </div>
                     ))}
                  </div>
               </div>
            )}

            {activeTab === 'LOGINS' && (
               <div className="p-10 space-y-6">
                  <div className="flex items-center space-x-4 mb-10">
                     <Lock size={32} className="text-amber-500" />
                     <div>
                        <h3 className="text-xl font-black text-typography tracking-tighter uppercase italic">Brute Force Monitor</h3>
                        <p className="text-[10px] font-bold text-secondary/30 uppercase tracking-widest">Accounts with &gt; 5 failed attempts in 10 minutes</p>
                     </div>
                  </div>
                  {[1, 2].map((_, i) => (
                     <div key={i} className="p-8 bg-snow-pearl/50 rounded-[2.5rem] border border-gray-100 flex items-center justify-between group hover:border-amber-500/20 transition-all">
                        <div className="flex items-center space-x-6">
                           <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-amber-500 shadow-sm"><Flame size={28} /></div>
                           <div>
                              <p className="text-[12px] font-black text-typography uppercase leading-tight">aaryan.verma@google.com</p>
                              <p className="text-[10px] font-bold text-secondary/30 uppercase tracking-widest mt-1 italic">8 Attempts from IP: 42.1.8.22 (Russia)</p>
                           </div>
                        </div>
                        <div className="flex items-center space-x-4">
                           <span className="px-4 py-2 bg-rose-50 text-rose-600 rounded-full text-[10px] font-black uppercase tracking-widest animate-pulse border border-rose-100">Account Locked</span>
                           <button className="p-4 bg-white border border-gray-100 rounded-2xl hover:bg-primary hover:text-white transition-all shadow-sm">
                              <ShieldCheck size={20} />
                           </button>
                        </div>
                     </div>
                  ))}
               </div>
            )}
         </div>

         <div className="col-span-12 lg:col-span-3 space-y-8">
            <div className="bg-slate-900 p-10 rounded-[3rem] text-white overflow-hidden relative group">
               <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Terminal size={80} className="text-primary" />
               </div>
               <h4 className="text-sm font-black text-slate-500 uppercase tracking-widest mb-6 italic underline decoration-primary/30">System Integrity</h4>
               <div className="space-y-6">
                  <div className="flex items-center justify-between">
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">WAF Efficiency</p>
                     <p className="text-lg font-black text-emerald-500 italic">94.2%</p>
                  </div>
                  <div className="flex items-center justify-between">
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">DDoS Mitigation</p>
                     <p className="text-lg font-black text-indigo-400 italic">Active</p>
                  </div>
                  <div className="flex items-center justify-between">
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">TLS 1.3 Depth</p>
                     <p className="text-lg font-black text-slate-200 italic">Global</p>
                  </div>
               </div>
               <div className="mt-10 pt-10 border-t border-slate-800">
                  <p className="text-[9px] font-bold text-slate-500 uppercase leading-relaxed italic">Auto-Sync via Cloudflare Workers Node-V3 is currently active and healthy.</p>
               </div>
            </div>

            <div className="bg-white p-10 rounded-[3rem] border border-gray-50 shadow-sm space-y-6">
               <h4 className="text-sm font-black text-typography uppercase tracking-widest italic lowercase underline decoration-primary/10">Global Blocklist</h4>
               <div className="space-y-4">
                  {['China (CN)', 'Russia (RU)', 'North Korea (KP)'].map((geo) => (
                     <div key={geo} className="flex items-center justify-between p-4 bg-snow-pearl/50 rounded-2xl border border-gray-100">
                        <span className="text-[11px] font-black text-typography uppercase italic">{geo}</span>
                        <div className="w-8 h-4 bg-gray-200 rounded-full relative">
                           <div className="absolute left-1 top-1 w-2 h-2 bg-white rounded-full transition-all group-hover:left-5" />
                        </div>
                     </div>
                  ))}
               </div>
               <p className="text-[9px] font-bold text-secondary/30 uppercase tracking-widest leading-relaxed mt-4 italic">Geo-blocking requires Super Admin sign-off via 2FA.</p>
            </div>
         </div>
      </div>
    </div>
  );
}
