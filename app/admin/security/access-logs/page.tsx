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
    <div className="space-y-6 font-montserrat pb-10">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-4 md:space-y-0 pb-4 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-1.5">
              <div className="bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-100">
                 <span className="text-[10px] font-black uppercase tracking-widest text-rose-600">Identity Monitor</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30 uppercase tracking-widest text-[10px]">RBAC Lifecycle</span>
           </div>
           <h1 className="text-3xl font-black text-typography tracking-tighter leading-none mb-1">
             Access <span className="text-primary italic">Registry</span>
           </h1>
           <p className="text-secondary/40 text-[10px] font-black uppercase tracking-widest mt-1.5 leading-none">
              Auditing RBAC Identity Shifts & Permission Mutations for DPDP Compliance
           </p>
        </div>

        <div className="flex items-center space-x-3">
           <button className="flex items-center space-x-2 px-6 py-2.5 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-600 transition-all shadow-lg shadow-slate-900/10 active:scale-95">
              <ShieldAlert size={14} />
              <span>Verify Root</span>
           </button>
        </div>
      </section>

      {/* Security Health KPI strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
         {[
           { label: "Privilege Escalations", value: "02", trend: "High Alert", icon: UserPlus, color: "text-rose-600 bg-rose-50 border-rose-100/50" },
           { label: "Active Sessions", value: "124", trend: "Normal", icon: Activity, color: "text-primary bg-primary/5 border-primary/10" },
           { label: "Suspended Accounts", value: "04", trend: "Audit Req", icon: UserMinus, color: "text-amber-500 bg-amber-50 border-amber-100/50" },
           { label: "MFA Coverage", value: "100%", trend: "Optimal", icon: Key, color: "text-emerald-500 bg-emerald-50 border-emerald-100/50" },
         ].map((kpi, i) => (
           <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between group hover:shadow-md transition-all cursor-pointer">
              <div className="leading-none flex-1">
                 <p className="text-[8px] font-black text-secondary/30 uppercase tracking-widest mb-2">{kpi.label}</p>
                 <p className="text-3xl font-black text-typography tracking-tighter leading-none mb-1.5">{kpi.value}</p>
                 <span className="inline-block text-[7px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full uppercase tracking-widest border border-emerald-100/50">{kpi.trend}</span>
              </div>
              <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center transition-all group-hover:scale-110 border shadow-sm", kpi.color)}>
                 <kpi.icon size={18} />
              </div>
           </div>
         ))}
      </div>

      {/* Access Event Feed */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col font-montserrat flex-1">
         <div className="p-3 border-b border-gray-100 flex flex-col lg:flex-row lg:items-center justify-between gap-3 bg-gray-50/30">
            <div>
               <h3 className="text-xs font-black text-typography tracking-tighter uppercase mb-1">Identity Mutation Ledger</h3>
               <p className="text-[8px] font-black text-secondary/30 uppercase tracking-widest leading-none">Tracking Role-Based Access Lifecycle Events</p>
            </div>
            <div className="flex items-center space-x-2">
               <button className="flex items-center space-x-2 px-5 py-2.5 bg-white border border-rose-200 text-rose-600 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-sm hover:bg-rose-50 transition-all active:scale-95">
                  <Mail size={14} />
                  <span>Notify Admin</span>
               </button>
            </div>
         </div>

         <div className="overflow-x-auto flex-1">
            <table className="w-full text-left">
               <thead className="bg-gray-50/50 border-b border-gray-100">
                  <tr>
                     <th className="px-4 py-3 text-[9px] font-black uppercase tracking-widest text-secondary/40">Timestamp & Vector</th>
                     <th className="px-4 py-3 text-[9px] font-black uppercase tracking-widest text-secondary/40">Changed By</th>
                     <th className="px-4 py-3 text-[9px] font-black uppercase tracking-widest text-secondary/40">Target User</th>
                     <th className="px-4 py-3 text-[9px] font-black uppercase tracking-widest text-secondary/40">Role Shift</th>
                     <th className="px-4 py-3 text-[9px] font-black uppercase tracking-widest text-secondary/40">Reasoning</th>
                     <th className="px-4 py-3 text-[9px] font-black uppercase tracking-widest text-secondary/40 text-right">Commit</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-50">
                  {accessLogs.map((log) => (
                    <tr key={log.id} className="group hover:bg-gray-50/50 transition-all">
                       <td className="px-4 py-3">
                          <p className="text-[11px] font-black text-typography leading-none">{log.timestamp}</p>
                          <p className="text-[8px] font-black text-secondary/30 uppercase tracking-widest mt-1.5 leading-none">Vector: {log.ip}</p>
                       </td>
                       <td className="px-4 py-3">
                          <div className="flex items-center space-x-3">
                             <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-primary group-hover:scale-110 transition-transform shadow-md shadow-slate-900/20">
                                <Lock size={12} />
                             </div>
                             <span className="text-[10px] font-black text-typography uppercase leading-none group-hover:text-primary transition-colors">{log.changedBy}</span>
                          </div>
                       </td>
                       <td className="px-4 py-3">
                          <h4 className="text-[11px] font-black text-typography uppercase tracking-tight leading-none">{log.targetUser}</h4>
                          <p className="text-[8px] font-black text-secondary/30 uppercase tracking-widest mt-1.5 leading-none">Staff Node: {log.id}</p>
                       </td>
                       <td className="px-4 py-3">
                          <div className="flex items-center space-x-3">
                             <span className="text-[10px] font-black text-secondary/40 uppercase tracking-widest leading-none bg-gray-50 px-2 py-1 rounded-md border border-gray-100">{log.oldRole}</span>
                             <ChevronRight size={14} className="text-secondary/30" />
                             <span className={cn(
                                "text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md border shadow-sm leading-none",
                                log.newRole === 'SUSPENDED' ? "bg-rose-50 border-rose-100 text-rose-600" : "bg-emerald-50 border-emerald-100 text-emerald-600"
                             )}>{log.newRole}</span>
                          </div>
                       </td>
                       <td className="px-4 py-3">
                          <p className="text-[10px] font-black text-secondary/60 uppercase max-w-xs leading-tight truncate">"{log.reason}"</p>
                       </td>
                       <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end space-x-1.5">
                             <button className="w-8 h-8 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-secondary/30 hover:bg-slate-900 hover:text-white transition-all shadow-sm">
                                <ArrowUpRight size={14} />
                             </button>
                          </div>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>

         <div className="p-3 border-t border-gray-100 bg-rose-50/30 relative overflow-hidden flex items-center justify-between font-montserrat">
            <div className="absolute top-0 right-0 p-3 opacity-5 pointer-events-none">
               <ShieldAlert size={60} className="text-rose-500" />
            </div>
            <div className="flex items-center space-x-3 relative z-10">
               <AlertCircle size={14} className="text-rose-500 animate-pulse" />
               <p className="text-[8px] font-black text-rose-600/60 uppercase tracking-widest max-w-2xl leading-relaxed">Anomaly Detected: 2 privilege escalations without prior Super-Admin approval in past 24h</p>
            </div>
            <p className="text-[7px] font-black text-secondary/20 uppercase tracking-widest relative z-10">RBAC-Enforce v4.2</p>
         </div>
      </section>

      {/* RBAC Verification Node */}
      <section className="bg-emerald-50/50 p-5 rounded-xl border border-emerald-100/50 flex flex-col md:flex-row md:items-center justify-between group shadow-md transition-all hover:shadow-lg">
         <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-emerald-500 text-white rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform">
               <Unlock size={20} />
            </div>
            <div>
               <h4 className="text-[11px] font-black text-emerald-900 uppercase tracking-widest leading-none mb-2">Institutional Identity Lock</h4>
               <p className="text-[9px] font-black text-emerald-700/60 uppercase tracking-widest leading-relaxed max-w-xl">
                  Permission changes require <span className="text-emerald-800 font-black">2FA Root Re-verification</span>. This log provides the final legal proof for DPDP audits.
               </p>
            </div>
         </div>
         <button className="mt-4 md:mt-0 px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg active:scale-95 shadow-emerald-600/20">
            Audit Current Permissions
         </button>
      </section>
    </div>
  );
}
