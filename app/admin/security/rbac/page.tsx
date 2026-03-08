"use client";

import { useState } from "react";
import { 
  ShieldCheck, 
  Users, 
  Settings, 
  ChevronRight, 
  Plus, 
  Check, 
  X, 
  Lock, 
  History, 
  UserPlus, 
  MoreVertical,
  ArrowUpRight,
  Filter,
  Search,
  Zap,
  ShieldAlert,
  Edit2
} from "lucide-react";
import { cn } from "@/lib/utils";

const roles = [
  "Super Admin",
  "Content Manager",
  "Data Entry",
  "Moderator",
  "Finance Mgr",
  "SEO Manager",
  "Viewer"
];

const sections = [
  "Dashboard & Analytics",
  "College & Courses",
  "Exam Intelligence",
  "Lead Operations",
  "Financial / Billing",
  "Content Hub",
  "SEO Intelligence",
  "AI Ops Control",
  "System / Infrastructure",
  "Security / Audit"
];

export default function RBACPage() {
  const [activeTab, setActiveTab] = useState<'ROLES' | 'TEAM' | 'AUDIT'>('ROLES');

  return (
    <div className="space-y-6 font-montserrat pb-10">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-4 md:space-y-0 pb-4 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-1.5">
              <div className="bg-primary/5 px-2.5 py-1 rounded-lg border border-primary/10">
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary">Security Ops</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30 uppercase tracking-widest text-[10px]">RBAC Matrix</span>
           </div>
           <h1 className="text-3xl font-black text-typography tracking-tighter leading-none mb-1">
             Authority <span className="text-primary italic">Control</span>
           </h1>
           <p className="text-secondary/40 text-[10px] font-black uppercase tracking-widest mt-1.5 leading-none">
              Enforcing Principle of Least Privilege & Team Accountability
           </p>
        </div>

        <div className="flex items-center space-x-3">
           <button className="flex items-center space-x-2 px-6 py-2.5 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all shadow-lg shadow-primary/20">
              <UserPlus size={14} />
              <span>Invite Team</span>
           </button>
        </div>
      </section>

      {/* Control Tabs */}
      <div className="flex items-center space-x-2 bg-white p-1 rounded-xl border border-gray-200 shadow-sm w-fit">
         {[
           { id: 'ROLES', label: 'Matrix', icon: Lock },
           { id: 'TEAM', label: 'Team', icon: Users },
           { id: 'AUDIT', label: 'Audit', icon: History }
         ].map((tab) => (
           <button 
             key={tab.id}
             onClick={() => setActiveTab(tab.id as any)}
             className={cn(
               "flex items-center space-x-2 px-5 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
               activeTab === tab.id ? "bg-primary text-white shadow-md shadow-primary/20" : "text-secondary/40 hover:text-secondary hover:bg-gray-50"
             )}
           >
             <tab.icon size={14} />
             <span>{tab.label}</span>
           </button>
         ))}
      </div>

      {activeTab === 'ROLES' && (
         <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden overflow-x-auto">
            <table className="w-full text-left">
               <thead className="bg-gray-50/50 border-b border-gray-100">
                  <tr>
                     <th className="px-5 py-3 min-w-[200px]">
                        <h3 className="text-[10px] font-black text-typography uppercase tracking-widest leading-none">Permission Sets</h3>
                        <p className="text-[8px] font-black text-secondary/40 uppercase tracking-widest mt-1.5 leading-none">Authorization Grid</p>
                     </th>
                     {roles.map(role => (
                        <th key={role} className="px-4 py-3 text-center min-w-[100px]">
                           <span className="text-[9px] font-black uppercase tracking-widest text-secondary/40 whitespace-nowrap">{role}</span>
                        </th>
                     ))}
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-50">
                  {sections.map(section => (
                     <tr key={section} className="group hover:bg-gray-50/50 transition-all">
                        <td className="px-5 py-3">
                           <span className="text-[10px] font-black text-typography uppercase tracking-tight leading-none group-hover:text-primary transition-colors">{section}</span>
                        </td>
                        {roles.map((role, i) => {
                           const isAllowed = role === 'Super Admin' || (role === 'Content Manager' && section.includes('Content')) || (role === 'Finance Mgr' && section.includes('Financial'));
                           const isLocked = role === 'Super Admin';

                           return (
                              <td key={`${section}-${role}`} className="px-4 py-3">
                                 <div className="flex justify-center">
                                    <button 
                                       disabled={isLocked}
                                       className={cn(
                                          "w-7 h-7 rounded-lg flex items-center justify-center transition-all border shadow-sm",
                                          isAllowed ? "bg-emerald-50 text-emerald-600 border-emerald-100/50" : "bg-rose-50 text-rose-600 border-rose-100/50 opacity-20 group-hover:opacity-100",
                                          isLocked && "cursor-not-allowed opacity-100 border-emerald-500/20"
                                       )}
                                    >
                                       {isAllowed ? <Check size={14} /> : <X size={14} />}
                                    </button>
                                 </div>
                              </td>
                           );
                        })}
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      )}

      {activeTab === 'TEAM' && (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-typography flex-1">
            {[
               { name: 'Ankit Sharma', role: 'Super Admin', email: 'ankit@edusearch.com', status: 'ACTIVE' },
               { name: 'Rohan Das', role: 'Content Manager', email: 'rohan@edusearch.com', status: 'ACTIVE' },
               { name: 'Simran Gill', role: 'Moderator', email: 'simran@edusearch.com', status: 'INACTIVE' }
            ].map((member, i) => (
               <div key={i} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm relative group hover:shadow-md hover:border-primary/20 transition-all flex flex-col justify-between min-h-[180px]">
                  <div className="absolute top-0 right-0 p-3">
                     <button className="w-8 h-8 bg-white rounded-lg text-secondary/30 hover:text-primary hover:border-primary/30 transition-all flex items-center justify-center border border-gray-200 shadow-sm opacity-0 group-hover:opacity-100 active:scale-95">
                        <Edit2 size={12} />
                     </button>
                  </div>
                  <div>
                     <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-secondary/30 group-hover:bg-primary/10 group-hover:text-primary transition-all mb-4 shadow-sm border border-gray-100">
                        <Users size={18} />
                     </div>
                     <h4 className="text-xs font-black tracking-tighter uppercase leading-none">{member.name}</h4>
                     <p className="text-[9px] font-black text-primary uppercase tracking-widest mt-2">{member.role}</p>
                  </div>
                  
                  <div className="mt-5 pt-4 border-t border-gray-100 space-y-2.5">
                     <div className="flex items-center space-x-2 text-secondary/40 leading-none">
                        <ShieldCheck size={12} />
                        <span className="text-[9px] font-black tracking-widest lowercase">{member.email}</span>
                     </div>
                     <div className="flex items-center space-x-2 font-montserrat leading-none bg-gray-50/50 w-fit px-2 py-1 rounded-md border border-gray-100">
                        <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", member.status === 'ACTIVE' ? "bg-emerald-500" : "bg-rose-500")} />
                        <span className={cn("text-[8px] font-black uppercase tracking-widest leading-none", member.status === 'ACTIVE' ? "text-emerald-600" : "text-rose-600")}>{member.status}</span>
                     </div>
                  </div>
               </div>
            ))}
            
            <button className="bg-gray-50/50 border border-dashed border-gray-200 rounded-xl p-5 flex flex-col items-center justify-center text-secondary/30 hover:border-primary/50 hover:bg-primary/5 hover:text-primary transition-all group min-h-[180px] active:scale-95">
               <div className="w-10 h-10 rounded-xl border border-dashed border-current flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Plus size={20} />
               </div>
               <span className="text-[9px] font-black uppercase tracking-widest">Add Team Seat</span>
            </button>
         </div>
      )}

      {activeTab === 'AUDIT' && (
         <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex-1">
            <div className="p-4 border-b border-gray-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-slate-900 text-white">
               <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center text-secondary/40">
                     <History size={18} />
                  </div>
                  <div>
                     <h3 className="text-xs font-black tracking-widest uppercase leading-none mb-1.5">Authority Events</h3>
                     <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none">Immutable Control Log</p>
                  </div>
               </div>
               <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input placeholder="Search Audit Identity..." className="bg-white/5 border border-white/10 pl-9 pr-4 py-2 rounded-lg text-[10px] font-black outline-none focus:bg-white/10 focus:border-white/20 transition-all w-full lg:w-64 text-white shadow-inner placeholder:text-slate-600" />
               </div>
            </div>
            <div className="overflow-x-auto">
               <table className="w-full text-left">
                  <thead className="bg-gray-50/50 border-b border-gray-100">
                     <tr>
                        <th className="px-5 py-3 text-[9px] font-black uppercase tracking-widest text-secondary/40">Timestamp</th>
                        <th className="px-5 py-3 text-[9px] font-black uppercase tracking-widest text-secondary/40">Actuary (Admin)</th>
                        <th className="px-5 py-3 text-[9px] font-black uppercase tracking-widest text-secondary/40">Subject User</th>
                        <th className="px-5 py-3 text-[9px] font-black uppercase tracking-widest text-secondary/40">Operation</th>
                        <th className="px-5 py-3 text-[9px] font-black uppercase tracking-widest text-secondary/40 text-right">Result</th>
                     </tr>
                  </thead>
               <tbody className="divide-y divide-gray-50">
                     {[
                        { time: '2026-03-08 10:20:42', actuary: 'Ankit Sharma', subject: 'Simran Gill', op: 'Role Changed: DE-Operator → Moderator', res: 'SUCCESS' },
                        { time: '2026-03-08 09:12:11', actuary: 'Ankit Sharma', subject: 'Rohan Das', op: 'Module Access: Financial → REVOKED', res: 'SUCCESS' },
                        { time: '2026-03-07 14:44:02', actuary: 'Node-V3', subject: 'Simran Gill', op: 'MFA Mandatory Enforcement', res: 'SUCCESS' }
                     ].map((log, i) => (
                        <tr key={i} className="group hover:bg-gray-50/50 transition-all">
                           <td className="px-5 py-3 text-[9px] font-black text-typography uppercase">{log.time}</td>
                           <td className="px-5 py-3 text-[10px] font-black text-typography uppercase tracking-tight group-hover:text-primary transition-colors">{log.actuary}</td>
                           <td className="px-5 py-3 text-[10px] font-black text-typography uppercase tracking-tight">{log.subject}</td>
                           <td className="px-5 py-3">
                              <span className="text-[9px] font-black text-secondary/60 uppercase leading-none bg-gray-50 px-2.5 py-1 rounded-md border border-gray-100 inline-block">{log.op}</span>
                           </td>
                           <td className="px-5 py-3 text-right">
                              <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md text-[8px] font-black uppercase tracking-widest shadow-sm border bg-emerald-50 border-emerald-100 text-emerald-600">
                                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                 <span>{log.res}</span>
                              </div>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      )}
    </div>
  );
}
