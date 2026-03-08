"use client";

import { useState, useEffect } from "react";
import { 
  History, 
  Search, 
  Filter, 
  ChevronRight, 
  Download, 
  ShieldCheck, 
  User, 
  Activity, 
  AlertCircle, 
  Clock, 
  Database, 
  Zap, 
  Lock, 
  ArrowUpRight, 
  Trash2, 
  Edit3, 
  Plus, 
  Terminal, 
  Server,
  Code
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AuditEntry {
  id: string;
  timestamp: string;
  admin: string;
  action: string;
  entity: string;
  oldVal: string;
  newVal: string;
  ip: string;
  status: 'SUCCESS' | 'FAILED' | 'CRITICAL';
}

const auditData: AuditEntry[] = [
  { id: "A1", timestamp: "2026-03-08 10:42:15", admin: "rahul.admin", action: "COLLEGE_EDIT", entity: "VIT-202", oldVal: "{'fee': '1.2L'}", newVal: "{'fee': '1.8L'}", ip: "192.168.1.1", status: 'SUCCESS' },
  { id: "A2", timestamp: "2026-03-08 10:38:12", admin: "priya.mod", action: "REVIEW_APPROVE", entity: "REV-9921", oldVal: "{'status': 'PENDING'}", newVal: "{'status': 'APPROVED'}", ip: "42.100.22.4", status: 'SUCCESS' },
  { id: "A3", timestamp: "2026-03-08 09:12:44", admin: "SYSTEM_SCRAPER", action: "BULK_IMPORT", entity: "EXAM-JEE", oldVal: "null", newVal: "{'results': 'OUT'}", ip: "localhost", status: 'SUCCESS' },
  { id: "A4", timestamp: "2026-03-08 08:44:02", admin: "unknown", action: "LOGIN_ATTEMPT", entity: "ADMIN_LOGIN", oldVal: "null", newVal: "null", ip: "21.44.2.100", status: 'FAILED' },
  { id: "A5", timestamp: "2026-03-08 07:22:18", admin: "super.root", action: "PROMPT_CHANGE", entity: "AI_PERSONA", oldVal: "{'v': '2.4'}", newVal: "{'v': '2.5'}", ip: "112.5.21.1", status: 'CRITICAL' },
];

export default function AuditLogPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="p-10 min-h-screen bg-slate-900 animate-pulse flex items-center justify-center text-[10px] font-black tracking-widest uppercase italic text-primary/20">
        Verifying Audit Integrity...
      </div>
    );
  }

  return (
    <div className="space-y-10 font-sans">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-6 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-2">
              <div className="bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
                 <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">Immutable Audit Trail</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30">DPDP Act Compliance Registry</span>
           </div>
           <h1 className="text-5xl font-black text-typography tracking-tighter leading-none mb-1">
             Security <span className="text-primary italic">Audit</span>
           </h1>
           <p className="text-secondary/40 text-sm font-bold uppercase tracking-widest mt-2">
              Auditing 100% of Administrative Mutating Events (PostgreSQL Append-Only Ledger)
           </p>
        </div>

        <div className="flex items-center space-x-4">
           <button className="flex items-center space-x-2 px-8 py-4 bg-white border border-gray-200 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:border-primary/20 transition-all shadow-sm italic">
              <Download size={18} />
              <span>Export Legal Snapshot</span>
           </button>
        </div>
      </section>

      {/* Compliance Indicator Hub */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 italic">
         {[
           { label: "Log Integrity Status", value: "VERIFIED", trend: "0.0 Error", icon: ShieldCheck, color: "text-emerald-500 bg-emerald-50" },
           { label: "Storage Persistence", value: "3.2 GB", trend: "+12Mb/Day", icon: Database, color: "text-primary bg-primary/5" },
           { label: "Alert Thresholds", value: "High", trend: "Active", icon: Activity, color: "text-amber-500 bg-amber-50" },
           { label: "RTO Recovery Target", value: "15m", trend: "Fast", icon: Clock, color: "text-indigo-500 bg-indigo-50" },
         ].map((kpi, i) => (
           <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-50 shadow-sm flex items-center justify-between group hover:border-primary/20 transition-all cursor-pointer">
              <div>
                 <p className="text-[10px] font-bold text-secondary/30 uppercase tracking-widest italic mb-2 leading-none">{kpi.label}</p>
                 <p className="text-3xl font-black text-typography tracking-tighter leading-none italic">{kpi.value}</p>
                 <span className="inline-block mt-3 text-[10px] font-black text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full italic">{kpi.trend}</span>
              </div>
              <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 shadow-inner italic", kpi.color)}>
                 <kpi.icon size={26} />
              </div>
           </div>
         ))}
      </div>

      {/* Main Audit Feed */}
      <section className="bg-white rounded-[3rem] border border-gray-50 shadow-sm overflow-hidden flex flex-col font-sans">
         <div className="p-10 border-b border-gray-50 flex items-center justify-between bg-snow-pearl/30 border-gray-100">
            <div className="relative flex-1 max-w-xl italic">
               <Search size={22} className="absolute left-6 top-1/2 -translate-y-1/2 text-secondary/20" />
               <input placeholder="Search Admin, Action, Entity ID or IP..." className="w-full bg-white border-0 pl-16 pr-8 py-5 rounded-3xl text-[14px] font-bold outline-none focus:ring-4 focus:ring-primary/5 transition-all shadow-inner" />
            </div>
            <div className="flex items-center space-x-4 pl-10 italic">
               <button className="p-5 bg-white border border-gray-100 rounded-2xl text-secondary/20 hover:text-primary transition-all shadow-sm italic"><Filter size={20} /></button>
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left italic">
               <thead className="bg-snow-pearl/50 border-b border-gray-100 font-sans not-italic">
                  <tr>
                     <th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-secondary/40">Timestamp & Vector</th>
                     <th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-secondary/40">Admin Identity</th>
                     <th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-secondary/40">Mutation Action</th>
                     <th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-secondary/40">Affected ID</th>
                     <th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-secondary/40">Commit Proof</th>
                     <th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-secondary/40 text-right">Status</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-50 font-sans not-italic">
                  {auditData.map((e) => (
                    <tr key={e.id} className="group hover:bg-snow-pearl/30 transition-all italic">
                       <td className="px-10 py-10">
                          <p className="text-[12px] font-black text-typography italic">{e.timestamp}</p>
                          <p className="text-[8px] font-bold text-secondary/20 uppercase tracking-widest mt-1 italic">IP Vector: {e.ip}</p>
                       </td>
                       <td className="px-10 py-10">
                          <div className="flex items-center space-x-3 italic">
                             <div className="w-10 h-10 bg-snow-pearl rounded-xl flex items-center justify-center text-secondary/20 group-hover:text-primary transition-colors italic">
                                <User size={18} />
                             </div>
                             <div>
                                <h4 className="text-[14px] font-black text-typography uppercase tracking-tight italic truncate max-w-[120px]">{e.admin}</h4>
                                <p className="text-[8px] font-bold text-secondary/20 uppercase tracking-widest italic decoration-primary/10 underline">Verified Node</p>
                             </div>
                          </div>
                       </td>
                       <td className="px-10 py-10 italic">
                          <span className="text-[11px] font-black text-primary uppercase tracking-widest italic underline decoration-primary/10">{e.action}</span>
                       </td>
                       <td className="px-10 py-10 italic">
                          <code className="bg-snow-pearl px-3 py-1.5 rounded-xl border border-gray-100 text-[11px] font-mono text-typography font-bold italic">{e.entity}</code>
                       </td>
                       <td className="px-10 py-10 italic">
                          <div className="flex items-center space-x-2 text-[10px] font-bold text-secondary/40 italic">
                             <Edit3 size={12} className="text-secondary/20" />
                             <span className="truncate max-w-[100px]">{e.newVal}</span>
                             <Zap size={10} className="text-primary italic" />
                          </div>
                       </td>
                       <td className="px-10 py-10 text-right italic">
                          <div className="flex items-center justify-end space-x-2 italic">
                             <div className={cn(
                               "px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest italic",
                               e.status === 'SUCCESS' ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : e.status === 'CRITICAL' ? "bg-rose-500 text-white shadow-xl shadow-rose-500/20" : "bg-rose-50 text-rose-600 border border-rose-100"
                             )}>
                                {e.status}
                             </div>
                             <button className="p-3 bg-white border border-gray-100 rounded-xl hover:bg-primary hover:text-white transition-all shadow-sm italic"><Code size={16} /></button>
                          </div>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>

         <div className="p-10 border-t border-gray-50 flex items-center justify-between bg-white italic relative overflow-hidden font-sans">
            <div className="absolute top-0 right-0 p-10 opacity-5">
               <History size={100} className="text-primary" />
            </div>
            <div className="flex items-center space-x-6 relative z-10 italic">
               <Server size={18} className="text-secondary/20 italic" />
               <p className="text-xs font-black text-secondary/40 uppercase tracking-widest italic underline decoration-primary/10 uppercase italic">Ledger Status: PERSISTENT • Record Count: 14,204 • Retention Policy: 7 Years (Compliance-Vault)</p>
            </div>
            <div className="flex items-center space-x-4 relative z-10 font-sans not-italic">
               <button className="px-8 py-4 bg-snow-pearl rounded-2xl text-[10px] font-black uppercase tracking-widest text-secondary/40 hover:text-primary transition-all">Previous</button>
               <button className="px-8 py-4 bg-snow-pearl rounded-2xl text-[10px] font-black uppercase tracking-widest text-secondary/40 hover:text-primary transition-all">Next 50 Entries</button>
            </div>
         </div>
      </section>

      {/* Terminal View: Live Access Feed */}
      <section className="bg-slate-900 p-12 rounded-[3.5rem] text-white flex flex-col group overflow-hidden relative font-sans">
         <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform duration-1000">
            <Terminal size={120} className="text-primary italic" />
         </div>
         <div className="flex items-center justify-between mt-10 relative z-10 font-sans mb-10">
            <div>
               <h4 className="text-xl font-black text-white tracking-tighter uppercase italic lowercase underline decoration-primary/30">Live Integrity Stream</h4>
               <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-2 italic">Real-Time Append-Only Monitor Polling Registry Cluster</p>
            </div>
            <div className="flex items-center space-x-4 italic underline decoration-primary/10">
               <div className="flex items-center space-x-2 italic">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse italic" />
                  <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest italic">Node-A Synced</span>
               </div>
            </div>
         </div>
         
         <div className="space-y-4 font-mono text-[11px] relative z-10 flex-1 italic underline decoration-primary/10">
            {[
              { t: "11:32:01", m: "AUD: Transaction Commit #42021 Verified | Admin: super.root", status: "OK" },
              { t: "11:32:04", m: "AUD: Mutating Data Packet Recv | Entity: COURSE-992 | Checksum: valid", status: "SYNC" },
              { t: "11:32:08", m: "AUD: Append-Only Trigger Successful | PostgreSQL Offset: 421042", status: "DONE" },
            ].map((log, i) => (
              <div key={i} className="flex items-start space-x-4 border-l border-slate-800 pl-4 py-1 hover:bg-white/5 transition-all italic">
                 <span className="text-slate-600 shrink-0 italic">{log.t}</span>
                 <span className="text-slate-300 flex-1 italic lowercase">"{log.m}"</span>
                 <span className={cn(log.status === 'DONE' ? "text-emerald-500" : "text-primary")}>{log.status}</span>
              </div>
            ))}
         </div>
      </section>
    </div>
  );
}
