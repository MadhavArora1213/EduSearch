"use client";

import { useState } from "react";
import { 
  Database, 
  Cloud, 
  RefreshCw, 
  ChevronRight, 
  ShieldCheck, 
  Clock, 
  History, 
  FileArchive, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Zap, 
  Download, 
  HardDrive,
  Trash2,
  Lock,
  Search,
  ArrowUpRight,
  ShieldAlert,
  Terminal,
  Server
} from "lucide-react";
import { cn } from "@/lib/utils";

interface BackupRecord {
  id: string;
  date: string;
  type: 'DAILY' | 'MANUAL' | 'PRE_DEPLOY';
  size: string;
  destination: 'CLOUDFLARE_R2' | 'AWS_S3';
  status: 'SUCCESS' | 'FAILED' | 'IN_PROGRESS';
  verification: 'VERIFIED' | 'UNVERIFIED' | 'PENDING';
}

export default function BackupDashboardPage() {
  const [backups] = useState<BackupRecord[]>([
    { id: "BKP-9921", date: "2026-03-08 04:00 AM", type: 'DAILY', size: "4.2 GB", destination: 'CLOUDFLARE_R2', status: 'SUCCESS', verification: 'VERIFIED' },
    { id: "BKP-9920", date: "2026-03-07 04:00 AM", type: 'DAILY', size: "4.1 GB", destination: 'CLOUDFLARE_R2', status: 'SUCCESS', verification: 'VERIFIED' },
    { id: "BKP-MANUAL", date: "2026-03-06 02:42 PM", type: 'MANUAL', size: "3.9 GB", destination: 'CLOUDFLARE_R2', status: 'SUCCESS', verification: 'UNVERIFIED' },
  ]);

  return (
    <div className="space-y-10">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-6 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-2">
              <div className="bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100">
                 <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 italic">Data Protection</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30">Backup Registry & R2 Sync</span>
           </div>
           <h1 className="text-3xl md:text-3xl md:text-5xl font-black text-typography tracking-tighter leading-none mb-1">
             Backup <span className="text-emerald-500 italic">Sentry</span>
           </h1>
           <p className="text-secondary/40 text-sm font-bold uppercase tracking-widest mt-2">
              Immutable PostgreSQL Snapshots, WAL Archiving & Cloudflare R2 Egress
           </p>
        </div>

        <div className="flex items-center space-x-4">
           <div className="bg-slate-900 px-8 py-4 rounded-3xl border border-white/10 shadow-2xl flex items-center space-x-6 text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 blur-3xl rounded-full" />
              <div>
                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 italic">RPO Target Status</p>
                 <p className="text-2xl font-black tracking-tighter italic">Healthy <span className="text-emerald-500 text-[10px] font-black underline not-italic ml-2 uppercase">&lt; 24h Loss</span></p>
              </div>
              <ShieldCheck size={32} className="text-emerald-500 relative z-10" />
           </div>
           <button className="flex items-center space-x-2 px-8 py-4 bg-primary text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20">
              <Database size={18} />
              <span>Take Backup Now</span>
           </button>
        </div>
      </section>

      {/* Analytics Strip */}
      <div className="grid grid-cols-4 gap-8">
         {[
           { label: "Total Snapshots", value: "42", sub: "R2 Mirror: Active", icon: FileArchive, color: "text-primary bg-primary/5" },
           { label: "Storage Consumed", value: "184 GB", sub: "Lifecycle: 6 Months", icon: HardDrive, color: "text-indigo-500 bg-indigo-50" },
           { label: "Restore Readiness", value: "100%", sub: "Last Test: 2d ago", icon: ShieldCheck, color: "text-emerald-500 bg-emerald-50" },
           { label: "Retention Policy", value: "3-Tier", sub: "Daily/Weekly/Monthly", icon: Lock, color: "text-slate-500 bg-slate-100" }
         ].map((s, i) => (
           <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-50 shadow-sm group hover:border-primary/20 transition-all">
              <div className="flex items-center justify-between mb-4">
                 <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 shadow-inner", s.color)}>
                    <s.icon size={22} />
                 </div>
                 <ArrowUpRight size={18} className="text-secondary/10 group-hover:text-primary transition-colors" />
              </div>
              <p className="text-3xl font-black text-typography tracking-tighter capitalize leading-none">{s.value}</p>
              <p className="text-[10px] font-bold text-secondary/30 uppercase tracking-widest mt-1 italic">{s.label}</p>
              <span className="inline-block mt-4 text-[9px] font-black bg-snow-pearl px-2 py-0.5 rounded-full text-secondary/40 uppercase italic tracking-tighter">{s.sub}</span>
           </div>
         ))}
      </div>

      {/* Main Table Container */}
      <section className="bg-white rounded-[3rem] border border-gray-50 shadow-sm overflow-hidden flex flex-col">
        <div className="p-6 md:p-10 border-b border-gray-50 flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-snow-pearl/30">
           <div>
              <h3 className="text-xl font-black text-typography tracking-tighter italic lowercase underline decoration-emerald-500/10">Immutable Point-in-Time History</h3>
              <p className="text-[10px] font-bold text-secondary/30 uppercase tracking-[0.2em] mt-2 italic">Compressed binary snapshots with SHA-256 validation</p>
           </div>
           <div className="flex items-center space-x-2 bg-emerald-50 px-4 py-2 rounded-2xl border border-emerald-100">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-black text-emerald-600 uppercase italic">WAL Archiving Active</span>
           </div>
        </div>

        <div className="overflow-x-auto">
           <table className="w-full text-left">
              <thead className="bg-snow-pearl/50 border-b border-gray-100">
                 <tr>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Snapshot Identity</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Data Footprint</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Destination</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40 text-center">Verification</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40 text-right">Interrupt</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 italic">
                {backups.map((bkp) => (
                  <tr key={bkp.id} className="group hover:bg-snow-pearl/30 transition-all">
                    <td className="px-10 py-8">
                       <div className="flex items-center space-x-6">
                          <div className="w-14 h-14 bg-snow-pearl rounded-2xl flex items-center justify-center text-secondary/10 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-all shadow-inner">
                             <Database size={24} />
                          </div>
                          <div>
                             <h4 className="text-base font-black text-typography uppercase tracking-tight">{bkp.date}</h4>
                             <p className="text-[10px] font-bold text-secondary/30 uppercase tracking-widest mt-1 italic leading-none">{bkp.id} • {bkp.type}</p>
                          </div>
                       </div>
                    </td>
                    <td className="px-10 py-8">
                       <div className="flex items-center space-x-3">
                          <span className="text-lg font-black text-typography tracking-tighter">{bkp.size}</span>
                          <span className="text-[9px] font-black text-secondary/20 uppercase tracking-widest bg-gray-50 px-2 py-0.5 rounded-md border border-gray-100">Compressed</span>
                       </div>
                    </td>
                    <td className="px-10 py-8">
                       <div className="flex items-center space-x-2 text-[10px] font-black text-indigo-500 uppercase tracking-widest italic decoration-indigo-200 underline">
                          <Cloud size={14} />
                          <span>{bkp.destination.replace('_', ' ')}</span>
                       </div>
                    </td>
                    <td className="px-10 py-8">
                       <div className="flex flex-col items-center">
                          <span className={cn(
                             "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border",
                             bkp.verification === 'VERIFIED' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-amber-50 text-amber-600 border-amber-100"
                          )}>
                             {bkp.verification}
                          </span>
                          <p className="text-[8px] font-bold text-secondary/20 uppercase tracking-widest mt-1 italic">Shadow DB test passed</p>
                       </div>
                    </td>
                    <td className="px-10 py-8 text-right">
                       <div className="flex items-center justify-end space-x-2">
                          <button className="p-4 bg-white border border-gray-100 rounded-2xl hover:bg-indigo-500 hover:text-white transition-all shadow-sm group/btn" title="Download for Local Storage">
                             <Download size={18} />
                          </button>
                          <button className="p-4 bg-white border border-gray-100 rounded-2xl hover:bg-rose-500 hover:text-white transition-all shadow-sm group/btn" title="Purge Snapshot">
                             <Trash2 size={18} />
                          </button>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
           </table>
        </div>

        <div className="p-10 border-t border-gray-100 flex items-center justify-between bg-white italic relative overflow-hidden">
           <div className="absolute top-0 right-0 p-10 opacity-5">
              <Server size={80} className="text-emerald-500" />
           </div>
           <div className="flex items-center space-x-4 relative z-10">
              <ShieldAlert size={20} className="text-secondary/20" />
              <p className="text-xs font-black text-secondary/30 uppercase tracking-widest leading-none">Retention: 7d daily • 4w weekly • 6m monthly (Managed via R2 Lifecycle Rules)</p>
           </div>
           <div className="flex items-center space-x-4 relative z-10">
              <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest italic">Encryption: AES-256 (Cloudside)</p>
           </div>
        </div>
      </section>
    </div>
  );
}
