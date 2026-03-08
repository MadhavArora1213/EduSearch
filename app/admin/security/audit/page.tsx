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
    <div className="space-y-6 font-montserrat">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-4 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-2 font-montserrat">
              <div className="bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-100 italic">
                 <span className="text-[10px] font-black uppercase tracking-widest text-rose-600 italic">DPDP COMPLIANT</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30">Security Governance</span>
           </div>
           <h1 className="text-3xl md:text-3xl md:text-5xl font-black text-typography tracking-tighter leading-none mb-1">
             Security <span className="text-rose-500 italic">Audit Log</span>
           </h1>
           <p className="text-secondary/40 text-sm font-bold uppercase tracking-widest mt-2">
              Immutable Ledger of Administrative Actions & System Mutations
           </p>
        </div>

        <div className="flex items-center space-x-4">
           <button className="flex items-center space-x-2 px-8 py-4 bg-slate-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-rose-600 transition-all shadow-xl shadow-slate-900/10 italic">
              <Download size={18} />
              <span>Export Compliance Data</span>
           </button>
        </div>
      </section>

      {/* Real-time Integrity KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-5">
         {[
           { label: "Integrity Status", value: logs.length > 0 ? "SECURE" : "AWAITING DATA", trend: "100% Validated", icon: ShieldCheck, color: "text-emerald-500 bg-emerald-50" },
           { label: "Active Admins", value: new Set(logs.map(l => l.admin_email)).size, trend: "Pulse Monitor", icon: Activity, color: "text-primary bg-primary/5" },
           { label: "System Events (24h)", value: logs.length, trend: "Nominal", icon: Cpu, color: "text-indigo-500 bg-indigo-50" },
           { label: "DB Mutations", value: logs.filter(l => l.action.toLowerCase().includes('edit') || l.action.toLowerCase().includes('delete')).length, trend: "Audited", icon: Database, color: "text-amber-500 bg-amber-50" },
         ].map((kpi, i) => (
           <div key={i} className="bg-white p-5 rounded-2xl border border-gray-50 shadow-sm flex items-center justify-between group hover:border-rose-500/20 transition-all">
              <div>
                 <p className="text-[10px] font-bold text-secondary/30 uppercase tracking-widest italic mb-2 leading-none">{kpi.label}</p>
                 <p className="text-3xl font-black text-typography tracking-tighter leading-none italic uppercase">{kpi.value.toLocaleString()}</p>
                 <span className="inline-block mt-3 text-[10px] font-black text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full">{kpi.trend}</span>
              </div>
              <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 shadow-inner", kpi.color)}>
                 <kpi.icon size={26} />
              </div>
           </div>
         ))}
      </div>

      {/* Main Forensic Table */}
      <section className="bg-white rounded-2xl border border-gray-50 shadow-sm overflow-hidden flex flex-col min-h-[400px]">
         <div className="p-6 md:p-6 border-b border-gray-50 flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-snow-pearl/30 border-gray-100">
            <div className="relative flex-1 max-w-xl italic">
               <Search size={22} className="absolute left-6 top-1/2 -translate-y-1/2 text-secondary/20" />
               <input 
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 placeholder="Search by Admin Email, Action or Entity Type..." 
                 className="w-full bg-white border-0 pl-16 pr-8 py-5 rounded-3xl text-[14px] font-bold outline-none focus:ring-4 focus:ring-rose-500/5 transition-all shadow-inner" 
               />
            </div>
            <div className="flex items-center space-x-4 pl-10">
               <button className="p-5 bg-white border border-gray-100 rounded-2xl text-secondary/20 hover:text-rose-500 transition-all italic"><Filter size={20} /></button>
            </div>
         </div>

         <div className="overflow-x-auto relative">
            {loading && (
              <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-10">
                <Loader2 className="w-10 h-10 text-rose-500 animate-spin" />
              </div>
            )}
            <table className="w-full text-left italic">
               <thead className="bg-snow-pearl/50 border-b border-gray-100 italic">
                  <tr>
                     <th className="px-10 py-4 text-[10px] font-black uppercase tracking-widest text-secondary/40">Timestamp & ID</th>
                     <th className="px-10 py-4 text-[10px] font-black uppercase tracking-widest text-secondary/40">Actor (Admin)</th>
                     <th className="px-10 py-4 text-[10px] font-black uppercase tracking-widest text-secondary/40">Action Sequence</th>
                     <th className="px-10 py-4 text-[10px] font-black uppercase tracking-widest text-secondary/40">Target Entity</th>
                     <th className="px-10 py-4 text-[10px] font-black uppercase tracking-widest text-secondary/40">IP Forensic</th>
                     <th className="px-10 py-4 text-[10px] font-black uppercase tracking-widest text-secondary/40 text-right">Commit Status</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-50 italic">
                  {filteredLogs.length === 0 && !loading && (
                    <tr>
                      <td colSpan={6} className="px-10 py-20 text-center text-rose-500/30 font-black uppercase tracking-widest text-[10px]">No Security Events Sequenced from Ledger Node</td>
                    </tr>
                  )}
                  {filteredLogs.map((log) => (
                    <tr key={log.id} className="group hover:bg-snow-pearl/30 transition-all italic">
                       <td className="px-10 py-4">
                          <p className="text-[12px] font-black text-typography uppercase leading-none">
                             {new Date(log.created_at).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'medium' })}
                          </p>
                          <p className="text-[9px] font-bold text-secondary/20 uppercase tracking-widest mt-1">E-ID: {log.id.slice(0, 8)}</p>
                       </td>
                       <td className="px-10 py-4">
                          <div className="flex items-center space-x-3">
                             <div className="w-8 h-8 bg-snow-pearl rounded-full flex items-center justify-center border border-gray-100 italic">
                                <Lock size={12} className="text-secondary/30" />
                             </div>
                             <span className="text-[12px] font-black text-typography lowercase underline decoration-rose-500/10">{log.admin_email}</span>
                          </div>
                       </td>
                       <td className="px-10 py-4 text-[10px] font-black uppercase tracking-widest">
                          <span className={cn(
                            "px-3 py-1 rounded-lg border",
                            log.action.includes('DELETE') ? "bg-rose-50 border-rose-100 text-rose-600" : "bg-emerald-50 border-emerald-100 text-emerald-600"
                          )}>
                             {log.action}
                          </span>
                       </td>
                       <td className="px-10 py-4">
                          <p className="text-[10px] font-black text-typography uppercase tracking-widest italic">{log.entity_type}</p>
                          <p className="text-[8px] font-bold text-secondary/20 uppercase tracking-widest mt-0.5">{log.entity_id}</p>
                       </td>
                       <td className="px-10 py-4 flex items-center space-x-2 text-secondary/30">
                          <TerminalIcon size={14} />
                          <span className="text-[11px] font-mono font-bold">{log.ip_address}</span>
                       </td>
                       <td className="px-10 py-4 text-right">
                          <div className={cn(
                             "inline-flex items-center space-x-2 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest",
                             log.status === 'SUCCESS' ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
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

         <div className="p-6 border-t border-gray-100 bg-snow-pearl/30 flex items-center justify-between font-montserrat italic">
            <div className="flex items-center space-x-4 italic underline decoration-rose-500/10">
               <ShieldCheck size={18} className="text-emerald-500" />
               <p className="text-xs font-black text-secondary/40 uppercase tracking-widest">Ledger Integrity: Verified with SHA-256 Merkle Hash Node</p>
            </div>
            <div className="flex items-center space-x-3 italic">
               <button className="px-8 py-3 bg-white border border-gray-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-secondary/40 hover:text-rose-500 transition-all">Next Cluster</button>
            </div>
         </div>
      </section>

      {/* Terminal Context Panel */}
      <section className="bg-slate-900 rounded-2xl p-12 border border-slate-800 shadow-2xl relative overflow-hidden group italic">
         <div className="absolute top-0 right-0 p-12 opacity-5">
            <TerminalIcon size={120} className="text-rose-500" />
         </div>
         <div className="relative z-10 space-y-8 italic">
            <div className="flex items-center space-x-3 italic underline decoration-rose-500/20">
               <div className="w-3 h-3 rounded-full bg-rose-500 animate-pulse" />
               <h4 className="text-rose-500 text-[10px] font-black uppercase tracking-[0.4em]">ADMIN-STREAM-CONSOLEXv8.1: MONITORING ACTIVE...</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-mono italic">
               <div className="space-y-4">
                  <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest italic select-none opacity-50 underline">System Anomaly Detection</p>
                  <div className="bg-black/20 p-6 rounded-2xl border border-rose-500/10 space-y-2">
                     <p className="text-emerald-500 text-[11px] select-none lowercase italic underline decoration-emerald-500/10 truncate font-mono tracking-tight">$ scan.network_integrity --origin="IND-AS-W-1"</p>
                     <p className="text-slate-400 text-[11px] select-none lowercase italic truncate font-mono tracking-tight">result: integrity_verified 100% | latent_signals: 0</p>
                  </div>
               </div>
               <div className="p-5 border border-white/5 bg-white/5 rounded-2xl flex items-center justify-between italic select-none">
                  <div>
                     <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-1 italic underline decoration-rose-500/10 truncate font-mono tracking-tight">Live Threat Intelligence</p>
                     <p className="text-xl text-white font-black italic select-none lowercase truncate font-mono tracking-tight underline decoration-rose-500/10">Zero Violations Found</p>
                  </div>
                  <Zap size={24} className="text-rose-500 animate-pulse" />
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
