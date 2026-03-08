"use client";

import { useState } from "react";
import { 
  ShieldAlert, 
  Search, 
  Filter, 
  ChevronRight, 
  UserPlus, 
  UserMinus, 
  Lock, 
  Unlock, 
  Activity, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Database, 
  Zap, 
  ArrowUpRight, 
  History, 
  Mail, 
  Key
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AccessChange {
  id: string;
  timestamp: string;
  changedBy: string;
  targetUser: string;
  oldRole: string;
  newRole: string;
  reason: string;
  ip: string;
}

const accessLogs: AccessChange[] = [
  { id: "L1", timestamp: "2026-03-08 11:20:15", changedBy: "super.admin", targetUser: "rahul.mod", oldRole: "Moderator", newRole: "Senior Mod", reason: "Promotion - Tier 2 Approvals", ip: "192.168.1.1" },
  { id: "L2", timestamp: "2026-03-08 10:15:42", changedBy: "system.security", targetUser: "priya.editor", oldRole: "Editor", newRole: "SUSPENDED", reason: "Rate Limit Violation (Scraper Detection)", ip: "42.100.22.4" },
  { id: "L3", timestamp: "2026-03-08 09:44:02", changedBy: "super.root", targetUser: "new.staff", oldRole: "NONE", newRole: "Finance", reason: "Initial Provisioning", ip: "21.44.2.100" },
];

export default function AccessChangeLogPage() {
  return (
    <div className="space-y-10 font-montserrat italic not-italic">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-6 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-2">
              <div className="bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-100 italic">
                 <span className="text-[10px] font-black uppercase tracking-widest text-rose-600 italic">Privilege Escalation Monitor</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30">RBAC Identity Lifecycle</span>
           </div>
           <h1 className="text-3xl md:text-3xl md:text-5xl font-black text-typography tracking-tighter leading-none mb-1">
             Access <span className="text-primary italic">Logs</span>
           </h1>
           <p className="text-secondary/40 text-sm font-bold uppercase tracking-widest mt-2">
              Auditing RBAC Identity Shifts & Permission Mutations for DPDP Compliance
           </p>
        </div>

        <div className="flex items-center space-x-4 italic">
           <button className="flex items-center space-x-2 px-8 py-4 bg-slate-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-rose-600 transition-all shadow-xl shadow-rose-500/10 italic">
              <ShieldAlert size={18} />
              <span>Verify Root Access</span>
           </button>
        </div>
      </section>

      {/* Security Health KPI strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 italic">
         {[
           { label: "Privilege Escalations", value: "02", trend: "High Alert", icon: UserPlus, color: "text-rose-600 bg-rose-50" },
           { label: "Active Sessions", value: "124", trend: "Normal", icon: Activity, color: "text-primary bg-primary/5" },
           { label: "Suspended Accounts", value: "04", trend: "Audit Req", icon: UserMinus, color: "text-amber-500 bg-amber-50" },
           { label: "MFA Coverage", value: "100%", trend: "Optimal", icon: Key, color: "text-emerald-500 bg-emerald-50" },
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

      {/* Access Event Feed */}
      <section className="bg-white rounded-[3rem] border border-gray-50 shadow-sm overflow-hidden flex flex-col font-montserrat not-italic">
         <div className="p-6 md:p-10 border-b border-gray-50 flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-snow-pearl/30 border-gray-100">
            <div>
               <h3 className="text-xl font-black text-typography tracking-tighter italic lowercase underline decoration-primary/10 select-none">Identity Mutation Ledger</h3>
               <p className="text-[10px] font-black text-secondary/30 uppercase tracking-[0.2em] mt-2 italic select-none">Tracking Role-Based Access Control (RBAC) Lifecycle Events</p>
            </div>
            <div className="flex items-center space-x-4 italic">
               <button className="flex items-center space-x-2 px-6 py-3 bg-white border border-rose-100 text-rose-600 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-sm hover:bg-rose-50 transition-all italic underline decoration-rose-500/10 uppercase">
                  <Mail size={16} />
                  <span>Notify Super Admin</span>
               </button>
            </div>
         </div>

         <div className="overflow-x-auto italic">
            <table className="w-full text-left italic">
               <thead className="bg-snow-pearl/50 border-b border-gray-100 italic">
                  <tr>
                     <th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-secondary/40">Vector & Timestamp</th>
                     <th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-secondary/40">Changed By</th>
                     <th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-secondary/40">Target User Vector</th>
                     <th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-secondary/40">Role Shift Matrix</th>
                     <th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-secondary/40">Legal Reason Payload</th>
                     <th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-secondary/40 text-right">Commit</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-50 font-montserrat not-italic">
                  {accessLogs.map((log) => (
                    <tr key={log.id} className="group hover:bg-snow-pearl/30 transition-all italic underline decoration-primary/5">
                       <td className="px-10 py-10">
                          <p className="text-[12px] font-black text-typography italic">{log.timestamp}</p>
                          <p className="text-[8px] font-bold text-secondary/20 uppercase tracking-widest mt-1 italic">IP Vector: {log.ip}</p>
                       </td>
                       <td className="px-10 py-10">
                          <div className="flex items-center space-x-3 italic">
                             <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                <Lock size={18} />
                             </div>
                             <span className="text-[14px] font-black text-typography uppercase italic">{log.changedBy}</span>
                          </div>
                       </td>
                       <td className="px-10 py-10 italic">
                          <h4 className="text-[14px] font-black text-typography uppercase tracking-tight italic">{log.targetUser}</h4>
                          <p className="text-[8px] font-bold text-secondary/20 uppercase tracking-widest mt-1 italic">Staff Node ID: {log.id}</p>
                       </td>
                       <td className="px-10 py-10 italic">
                          <div className="flex items-center space-x-4 italic underline decoration-primary/10">
                             <span className="text-[10px] font-bold text-secondary/40 uppercase tracking-widest italic">{log.oldRole}</span>
                             <ChevronRight size={14} className="text-secondary/20 italic" />
                             <span className={cn(
                               "text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-lg",
                               log.newRole === 'SUSPENDED' ? "bg-rose-50 text-rose-600" : "bg-emerald-50 text-emerald-600"
                             )}>{log.newRole}</span>
                          </div>
                       </td>
                       <td className="px-10 py-10 italic">
                          <p className="text-[11px] font-bold text-secondary/40 italic lowercase underline decoration-primary/10 truncate max-w-[200px]">"{log.reason}"</p>
                       </td>
                       <td className="px-10 py-10 text-right italic">
                          <button className="p-4 bg-white border border-gray-100 rounded-2xl text-secondary/20 hover:text-primary transition-all shadow-sm italic"><ArrowUpRight size={18} /></button>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>

         <div className="p-10 border-t border-gray-50 flex items-center justify-between bg-white italic relative overflow-hidden font-montserrat not-italic">
            <div className="absolute top-0 right-0 p-10 opacity-5">
               <ShieldAlert size={100} className="text-rose-500" />
            </div>
            <div className="flex items-center space-x-6 relative z-10 italic">
               <AlertCircle size={18} className="text-rose-500 animate-pulse italic" />
               <p className="text-xs font-black text-secondary/40 uppercase tracking-widest italic underline decoration-primary/10 uppercase italic">Anomaly Detected: 2 privilege escalations without prior Super-Admin approval in past 24h</p>
            </div>
            <p className="text-[9px] font-black text-secondary/20 uppercase tracking-widest relative z-10 italic">Security Layer: RBAC-Enforce v4.2 Polled</p>
         </div>
      </section>

      {/* RBAC Verification Node */}
      <section className="bg-emerald-50 p-12 rounded-[3.5rem] border border-emerald-100 flex flex-col md:flex-row md:items-center justify-between group overflow-hidden relative italic not-italic">
         <div className="absolute inset-0 bg-emerald-500/5 flex items-center space-x-2 duration-1000" />
         <div className="flex items-center space-x-8 relative z-10">
            <div className="w-20 h-20 bg-emerald-500/20 text-emerald-500 rounded-[2.5rem] flex items-center justify-center shadow-inner group-hover:rotate-12 transition-transform">
               <Unlock size={32} className="italic" />
            </div>
            <div>
               <h4 className="text-2xl font-black text-emerald-900 tracking-tighter uppercase italic">Institutional Identity Lock</h4>
               <p className="text-xs font-bold text-emerald-700/60 uppercase tracking-widest mt-2 max-w-lg italic">
                  All permission changes require <span className="text-emerald-800 font-black">2FA Root Re-verification</span>. This log provides the final legal proof of identity mutation for DPDP audits.
               </p>
            </div>
         </div>
         <div className="mt-8 md:mt-0 relative z-10 italic">
            <button className="px-10 py-5 bg-emerald-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-500/20 italic font-montserrat not-italic">
               Audit Current Permissions
            </button>
         </div>
      </section>
    </div>
  );
}
