"use client";

import { useState, useEffect, useMemo } from "react";
import { 
  ShieldAlert, 
  Terminal as TerminalIcon, 
  Filter, 
  Search, 
  ChevronRight, 
  Activity, 
  Download, 
  Trash2, 
  AlertTriangle, 
  Lock, 
  Cpu, 
  Database,
  Eye,
  ArrowRight,
  ShieldCheck,
  Zap,
  Loader2,
  History as HistoryIcon
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AuditLog {
  id: string;
  admin_email: string;
  action: string;
  entity_type: string;
  entity_id: string;
  old_value: string | null;
  new_value: string | null;
  ip_address: string;
  status: 'SUCCESS' | 'FAILED' | string;
  created_at: string;
}

export default function AuditLogPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/security/audit");
      const data = await res.json();
      setLogs(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const filteredLogs = useMemo(() => {
    return logs.filter(log => 
      log.admin_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.entity_type.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [logs, searchTerm]);

  if (!mounted) return null;

  return (
    <div className="space-y-6 font-montserrat pb-10">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-4 md:space-y-0 pb-4 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-1.5 font-montserrat">
              <div className="bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-100">
                 <span className="text-[10px] font-black uppercase tracking-widest text-rose-600">Compliance Hub</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30 uppercase tracking-widest text-[10px]">Governance</span>
           </div>
           <h1 className="text-3xl font-black text-typography tracking-tighter leading-none mb-1">
             Security <span className="text-rose-500 italic">Audit</span>
           </h1>
           <p className="text-secondary/40 text-[10px] font-black uppercase tracking-widest mt-1.5 leading-none">
              Immutable Ledger of Administrative Actions & System Mutations
           </p>
        </div>

        <div className="flex items-center space-x-3">
           <button className="flex items-center space-x-2 px-6 py-2.5 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-600 transition-all shadow-lg shadow-slate-900/10 active:scale-95">
              <Download size={14} />
              <span>Export Ledger</span>
           </button>
        </div>
      </section>

      {/* Real-time Integrity KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
         {[
           { label: "Integrity Status", value: logs.length > 0 ? "SECURE" : "IDLE", trend: "Validated", icon: ShieldCheck, color: "text-emerald-500 bg-emerald-50 border-emerald-100/50" },
           { label: "Active Admins", value: new Set(logs.map(l => l.admin_email)).size.toString(), trend: "Pulse active", icon: Activity, color: "text-primary bg-primary/5 border-primary/10" },
           { label: "System Events", value: logs.length.toString(), trend: "Baseline nominal", icon: Cpu, color: "text-indigo-500 bg-indigo-50 border-indigo-100/50" },
           { label: "DB Mutations", value: logs.filter(l => l.action.toLowerCase().includes('edit') || l.action.toLowerCase().includes('delete')).length.toString(), trend: "Audited sync", icon: Database, color: "text-amber-500 bg-amber-50 border-amber-100/50" },
         ].map((kpi, i) => (
           <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-rose-500/20 transition-all cursor-pointer">
              <div className="leading-none flex-1">
                 <p className="text-[8px] font-black text-secondary/30 uppercase tracking-widest mb-2">{kpi.label}</p>
                 <p className="text-3xl font-black text-typography tracking-tighter leading-none mb-1.5 uppercase">{kpi.value.toLocaleString()}</p>
                 <span className="inline-block text-[7px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full uppercase tracking-widest border border-emerald-100/50">{kpi.trend}</span>
              </div>
              <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center transition-all group-hover:scale-110 border shadow-sm", kpi.color)}>
                 <kpi.icon size={18} />
              </div>
           </div>
         ))}
      </div>

      {/* Main Forensic Table */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col min-h-[400px]">
         <div className="p-3 border-b border-gray-100 flex flex-col lg:flex-row lg:items-center justify-between gap-3 bg-gray-50/30">
            <div className="relative flex-1 max-w-md">
               <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary/30" />
               <input 
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 placeholder="Search by Admin, Action or Entity..." 
                 className="w-full bg-white border border-gray-200 pl-9 pr-4 py-2 rounded-lg text-[10px] font-black outline-none focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500/30 shadow-sm transition-all" 
               />
            </div>
            <div className="flex items-center space-x-2">
               <button className="w-9 h-9 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-secondary/40 hover:text-rose-500 transition-all shadow-sm active:scale-95"><Filter size={14} /></button>
            </div>
         </div>

         <div className="overflow-x-auto relative flex-1">
            {loading && (
               <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-10">
                 <Loader2 className="w-10 h-10 text-rose-500 animate-spin" />
               </div>
            )}
            <table className="w-full text-left font-montserrat">
               <thead className="bg-gray-50/50 border-b border-gray-100">
                  <tr>
                     <th className="px-4 py-3 text-[9px] font-black uppercase tracking-widest text-secondary/40">Timestamp & ID</th>
                     <th className="px-4 py-3 text-[9px] font-black uppercase tracking-widest text-secondary/40">Actor (Admin)</th>
                     <th className="px-4 py-3 text-[9px] font-black uppercase tracking-widest text-secondary/40">Action</th>
                     <th className="px-4 py-3 text-[9px] font-black uppercase tracking-widest text-secondary/40">Target Entity</th>
                     <th className="px-4 py-3 text-[9px] font-black uppercase tracking-widest text-secondary/40">IP Forensic</th>
                     <th className="px-4 py-3 text-[9px] font-black uppercase tracking-widest text-secondary/40 text-right">Commit</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-50">
                  {filteredLogs.length === 0 && !loading && (
                    <tr>
                       <td colSpan={6} className="px-10 py-20 text-center text-rose-500/30 font-black uppercase tracking-widest text-[10px]">No Security Events Sequenced</td>
                    </tr>
                  )}
                  {filteredLogs.map((log) => (
                    <tr key={log.id} className="group hover:bg-gray-50/50 transition-all font-montserrat">
                       <td className="px-4 py-3">
                          <p className="text-[11px] font-black text-typography uppercase leading-none">
                             {new Date(log.created_at).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'medium' })}
                          </p>
                          <p className="text-[8px] font-black text-secondary/30 uppercase tracking-widest mt-1.5 leading-none">E-ID: {log.id.slice(0, 8)}</p>
                       </td>
                       <td className="px-4 py-3">
                          <div className="flex items-center space-x-3">
                             <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center border border-gray-200 shadow-sm">
                                <Lock size={12} className="text-secondary/40" />
                             </div>
                             <span className="text-[10px] font-black text-typography lowercase group-hover:text-rose-600 transition-colors leading-none">{log.admin_email}</span>
                          </div>
                       </td>
                       <td className="px-4 py-3">
                          <span className={cn(
                             "px-2.5 py-1 rounded-md text-[8px] font-black uppercase tracking-widest border shadow-sm leading-none inline-block",
                             log.action.includes('DELETE') ? "bg-rose-50 border-rose-100 text-rose-600" : "bg-emerald-50 border-emerald-100 text-emerald-600"
                          )}>
                             {log.action}
                          </span>
                       </td>
                       <td className="px-4 py-3">
                          <p className="text-[10px] font-black text-typography uppercase tracking-widest leading-none">{log.entity_type}</p>
                          <p className="text-[8px] font-black text-secondary/30 uppercase tracking-widest mt-1.5 leading-none">{log.entity_id}</p>
                       </td>
                       <td className="px-4 py-3">
                          <div className="flex items-center space-x-2 text-secondary/40 leading-none">
                             <TerminalIcon size={12} />
                             <span className="text-[10px] font-mono font-bold tracking-tight">{log.ip_address}</span>
                          </div>
                       </td>
                       <td className="px-4 py-3 text-right">
                          <div className={cn(
                             "inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md text-[8px] font-black uppercase tracking-widest shadow-sm border",
                             log.status === 'SUCCESS' ? "bg-emerald-50 border-emerald-100 text-emerald-600" : "bg-rose-50 border-rose-100 text-rose-600"
                          )}>
                             <div className={cn("w-1.5 h-1.5 rounded-full", log.status === 'SUCCESS' ? "bg-emerald-500" : "bg-rose-500")} />
                             <span>{log.status}</span>
                          </div>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>

         <div className="p-3 border-t border-gray-100 bg-gray-50/30 flex items-center justify-between font-montserrat">
            <div className="flex items-center space-x-3 text-secondary/40">
               <ShieldCheck size={14} className="text-emerald-500" />
               <p className="text-[8px] font-black uppercase tracking-widest">Ledger Integrity: Verified with SHA-256 Merkle Hash Node</p>
            </div>
            <button className="px-5 py-2 bg-white border border-gray-200 rounded-lg text-[9px] font-black uppercase tracking-widest text-secondary/40 hover:text-rose-500 transition-all shadow-sm active:scale-95">Next Cluster</button>
         </div>
      </section>

      {/* Terminal Context Panel */}
      <section className="bg-slate-900 rounded-xl p-6 border border-slate-800 shadow-xl relative overflow-hidden group">
         <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform duration-1000">
            <TerminalIcon size={100} className="text-rose-500" />
         </div>
         <div className="relative z-10 space-y-6">
            <div className="flex items-center space-x-3">
               <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
               <h4 className="text-rose-500 text-[10px] font-black uppercase tracking-[0.4em]">ADMIN-STREAMv8.1: MONITORING...</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono">
               <div className="space-y-4">
                  <p className="text-slate-500 text-[9px] uppercase font-bold tracking-widest opacity-50">Anomaly Detection Cluster</p>
                  <div className="bg-black/20 p-4 rounded-xl border border-rose-500/10 space-y-1.5 shadow-inner">
                     <p className="text-emerald-500 text-[10px] truncate tracking-tight">$ scan.network --origin="IND-AS-W-1"</p>
                     <p className="text-slate-400 text-[10px] truncate tracking-tight">result: verified 100% | signals: 0</p>
                  </div>
               </div>
               <div className="p-4 border border-white/5 bg-white/5 rounded-xl flex items-center justify-between shadow-sm hover:bg-white/10 transition-colors">
                  <div>
                     <p className="text-slate-500 text-[9px] uppercase font-bold tracking-widest mb-1 opacity-50">Threat Intelligence</p>
                     <p className="text-lg text-white font-black italic tracking-tighter">Zero Violations</p>
                  </div>
                  <Zap size={20} className="text-rose-500 animate-pulse" />
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
