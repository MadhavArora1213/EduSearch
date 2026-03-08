"use client";

import { useState } from "react";
import { 
  Zap, 
  Play, 
  Pause, 
  RefreshCw, 
  ChevronRight, 
  Activity, 
  Globe, 
  Database, 
  Clock, 
  AlertTriangle, 
  Settings, 
  TrendingUp, 
  ShieldCheck,
  Search,
  Filter,
  ArrowUpRight,
  Cpu,
  Layers,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ScraperJob {
  id: string;
  name: string;
  source: string;
  schedule: string;
  lastRun: string;
  status: 'SUCCESS' | 'FAILED' | 'RUNNING' | 'PAUSED';
  recordsUpdated: number;
  healthScore: number;
}

export default function ScraperManagerPage() {
  const [jobs] = useState<ScraperJob[]>([
    { id: "JOB-001", name: "NIRF Ranking Sync", source: "NIRF Official", schedule: "Daily", lastRun: "Today, 04:00 AM", status: 'SUCCESS', recordsUpdated: 1840, healthScore: 98 },
    { id: "JOB-002", name: "NAAC Grade Crawler", source: "Gov of India - NAAC", schedule: "Weekly", lastRun: "March 5th", status: 'SUCCESS', recordsUpdated: 420, healthScore: 92 },
    { id: "JOB-003", name: "Salary Packages Poll", source: "AmbitionBox / Glassdoor", schedule: "Monthly", lastRun: "Feb 28th", status: 'FAILED', recordsUpdated: 0, healthScore: 64 },
    { id: "JOB-004", name: "Min. Education API", source: "Gov Data Portal", schedule: "Real-time", lastRun: "Running...", status: 'RUNNING', recordsUpdated: 12, healthScore: 100 },
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-4 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-2">
              <div className="bg-primary/5 px-3 py-1.5 rounded-xl border border-primary/10">
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary italic lowercase">Ingestion Pipeline</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30">Data Quality Engine</span>
           </div>
           <h1 className="text-3xl md:text-3xl md:text-5xl font-black text-typography tracking-tighter leading-none mb-1">
             Scraper <span className="text-primary italic">Manager</span>
           </h1>
           <p className="text-secondary/40 text-sm font-bold uppercase tracking-widest mt-2">
              Orchestrating Source Pipelines, Validation Hooks & BullMQ Schedules
           </p>
        </div>

        <div className="flex items-center space-x-4">
           <div className="bg-white px-8 py-4 rounded-3xl border border-gray-100 shadow-sm flex items-center space-x-6">
              <div>
                 <p className="text-[10px] font-black text-secondary/20 uppercase tracking-widest">Pipeline Health</p>
                 <p className="text-2xl font-black text-typography tracking-tighter italic">94.2% <span className="text-emerald-500 text-xs text-[10px] font-black underline italic">Stable</span></p>
              </div>
              <Cpu size={28} className="text-primary" />
           </div>
           <button className="flex items-center space-x-2 px-8 py-4 bg-primary text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20">
              <Plus size={18} />
              <span>New Source Job</span>
           </button>
        </div>
      </section>

      {/* Analytics Strip */}
      <div className="grid grid-cols-4 gap-5">
         {[
           { label: "Records Daily", value: "2.4M+", trend: "+12.1%", icon: Activity, color: "text-primary bg-primary/5" },
           { label: "Accuracy Index", value: "98.8%", trend: "High Confidence", icon: ShieldCheck, color: "text-emerald-500 bg-emerald-50" },
           { label: "Source Conflicts", value: "14", trend: "Needs Resolution", icon: AlertTriangle, color: "text-amber-500 bg-amber-50" },
           { label: "API Throttling", value: "1.2%", trend: "-0.4% Efficiency", icon: Zap, color: "text-rose-500 bg-rose-50" }
         ].map((s, i) => (
           <div key={i} className="bg-white p-5 rounded-2xl border border-gray-50 shadow-sm group hover:border-primary/20 transition-all">
              <div className="flex items-center justify-between mb-4">
                 <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110", s.color)}>
                    <s.icon size={22} />
                 </div>
                 <span className="text-[9px] font-black text-secondary/40 bg-gray-50 px-3 py-1 rounded-full uppercase tracking-widest">{s.trend}</span>
              </div>
              <p className="text-3xl font-black text-typography tracking-tighter">{s.value}</p>
              <p className="text-[10px] font-bold text-secondary/30 uppercase tracking-widest mt-1">{s.label}</p>
           </div>
         ))}
      </div>

      {/* Main Table Container */}
      <section className="bg-white rounded-2xl border border-gray-50 shadow-sm overflow-hidden">
        <div className="p-6 md:p-6 border-b border-gray-50 flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-snow-pearl/30">
           <div>
              <h3 className="text-xl font-black text-typography tracking-tighter italic lowercase underline decoration-primary/10">Active Scraping Jobs</h3>
              <p className="text-[10px] font-bold text-secondary/30 uppercase tracking-[0.2em] mt-2 italic">Automated BullMQ scheduling & anti-block rotation active</p>
           </div>
        </div>

        <div className="overflow-x-auto">
           <table className="w-full text-left">
              <thead className="bg-snow-pearl/50 border-b border-gray-100">
                 <tr>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Target Source & Pipeline</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Schedule</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Performance</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Status</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40 text-center italic">Health</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40 text-right">Interrupt</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {jobs.map((job) => (
                  <tr key={job.id} className="group hover:bg-snow-pearl/30 transition-all">
                    <td className="px-10 py-4">
                       <div className="flex items-center space-x-6">
                          <div className="w-14 h-14 bg-snow-pearl rounded-2xl flex items-center justify-center text-secondary/10 group-hover:text-primary group-hover:bg-primary/5 transition-all relative">
                             <Globe size={24} />
                             {job.status === 'RUNNING' && <div className="absolute top-0 right-0 w-3 h-3 bg-emerald-500 rounded-full animate-ping" />}
                          </div>
                          <div>
                             <h4 className="text-base font-black text-typography leading-tight uppercase tracking-tight">{job.name}</h4>
                             <p className="text-[10px] font-bold text-secondary/40 uppercase tracking-widest mt-1 italic underline decoration-primary/10">{job.source}</p>
                          </div>
                       </div>
                    </td>
                    <td className="px-10 py-4">
                       <div className="flex items-center space-x-2 text-[12px] font-black text-typography italic">
                          <Clock size={14} className="text-secondary/20" />
                          <span>{job.schedule}</span>
                       </div>
                       <p className="text-[9px] font-bold text-secondary/20 uppercase tracking-widest mt-1">Last: {job.lastRun}</p>
                    </td>
                    <td className="px-10 py-4">
                       <div className="flex items-center space-x-3">
                          <TrendingUp size={16} className="text-emerald-500" />
                          <div>
                             <p className="text-[13px] font-black text-typography uppercase">+{job.recordsUpdated} Records</p>
                             <p className="text-[9px] font-bold text-secondary/20 uppercase tracking-widest italic">In last cycle</p>
                          </div>
                       </div>
                    </td>
                    <td className="px-10 py-4">
                       <span className={cn(
                          "inline-flex items-center space-x-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                          job.status === 'SUCCESS' ? "bg-emerald-50 text-emerald-600 border border-emerald-100" :
                          job.status === 'FAILED' ? "bg-rose-50 text-rose-600 border border-rose-100" :
                          job.status === 'RUNNING' ? "bg-indigo-50 text-indigo-600 border border-indigo-100" :
                          "bg-gray-100 text-gray-500 border border-gray-200"
                       )}>
                          <div className={cn("w-1.5 h-1.5 rounded-full", job.status === 'RUNNING' ? "bg-indigo-500 animate-pulse" : "bg-current")} />
                          <span>{job.status}</span>
                       </span>
                    </td>
                    <td className="px-10 py-4">
                       <div className="flex flex-col items-center">
                          <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden mb-2 shadow-inner">
                             <div 
                               className={cn("h-full transition-all duration-1000", job.healthScore > 90 ? "bg-emerald-500" : job.healthScore > 70 ? "bg-amber-500" : "bg-rose-500")}
                               style={{ width: `${job.healthScore}%` }}
                             />
                          </div>
                          <span className="text-[10px] font-black text-typography italic">{job.healthScore}% CONF</span>
                       </div>
                    </td>
                    <td className="px-10 py-4 text-right">
                       <div className="flex items-center justify-end space-x-2">
                          <button className="p-4 bg-white border border-gray-100 rounded-2xl hover:bg-primary hover:text-white transition-all shadow-sm group/btn" title="Trigger Job Manual Override">
                             <Play size={18} />
                          </button>
                          <button className="p-4 bg-white border border-gray-100 rounded-2xl hover:bg-amber-500 hover:text-white transition-all shadow-sm group/btn" title="Pause Schedule">
                             <Pause size={18} />
                          </button>
                          <button className="p-4 bg-white border border-gray-100 rounded-2xl hover:bg-indigo-500 hover:text-white transition-all shadow-sm group/btn" title="Edit Schedule">
                             <Settings size={18} />
                          </button>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
           </table>
        </div>

        <div className="p-6 border-t border-gray-50 flex items-center justify-between bg-white italic relative overflow-hidden">
           <div className="absolute bottom-0 right-0 p-6 opacity-5">
              <Zap size={100} className="text-primary" />
           </div>
           <div className="flex items-center space-x-4 relative z-10">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-xs font-black text-secondary/40 uppercase tracking-widest leading-none">Scraper Integrity Node Active: 204 proxies in rotation • No Captcha blocks detected</p>
           </div>
           <p className="text-[10px] font-black text-primary uppercase tracking-widest relative z-10">BullMQ Scheduler v4.1 • Node-V3 Primary</p>
        </div>
      </section>
    </div>
  );
}

function Plus(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}
