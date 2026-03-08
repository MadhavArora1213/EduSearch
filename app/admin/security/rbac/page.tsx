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
    <div className="space-y-10">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-6 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-2">
              <div className="bg-primary/5 px-3 py-1.5 rounded-xl border border-primary/10">
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary italic lowercase">Internal Security</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30">Role-Based Access Control</span>
           </div>
           <h1 className="text-5xl font-black text-typography tracking-tighter leading-none mb-1">
             Authority <span className="text-primary italic">Matrix</span>
           </h1>
           <p className="text-secondary/40 text-sm font-bold uppercase tracking-widest mt-2">
              Enforcing Principle of Least Privilege & Team Accountability
           </p>
        </div>

        <div className="flex items-center space-x-4">
           <button className="flex items-center space-x-2 px-8 py-4 bg-primary text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20">
              <UserPlus size={18} />
              <span>Invite Team Member</span>
           </button>
        </div>
      </section>

      {/* Control Tabs */}
      <div className="flex items-center space-x-4 bg-white p-2 rounded-[2.5rem] border border-gray-100 shadow-sm w-fit">
         {[
           { id: 'ROLES', label: 'Permission Matrix', icon: Lock },
           { id: 'TEAM', label: 'Team Management', icon: Users },
           { id: 'AUDIT', label: 'Security Audit Log', icon: History }
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

      {activeTab === 'ROLES' && (
         <div className="bg-white rounded-[3rem] border border-gray-50 shadow-sm overflow-hidden overflow-x-auto">
            <table className="w-full text-left">
               <thead className="bg-snow-pearl/50 border-b border-gray-100">
                  <tr>
                     <th className="px-10 py-8 min-w-[250px]">
                        <h3 className="text-xl font-black text-typography tracking-tighter italic lowercase underline decoration-primary/10">Permission Sets</h3>
                        <p className="text-[9px] font-bold text-secondary/30 uppercase tracking-widest mt-2 italic">Module-wise Authorization Grid</p>
                     </th>
                     {roles.map(role => (
                        <th key={role} className="px-6 py-8 text-center min-w-[120px]">
                           <span className="text-[10px] font-black uppercase tracking-widest text-typography whitespace-nowrap">{role}</span>
                        </th>
                     ))}
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-50">
                  {sections.map(section => (
                     <tr key={section} className="group hover:bg-snow-pearl/20 transition-all">
                        <td className="px-10 py-8">
                           <span className="text-[13px] font-black text-typography uppercase tracking-tight">{section}</span>
                        </td>
                        {roles.map((role, i) => {
                           const isAllowed = role === 'Super Admin' || (role === 'Content Manager' && section.includes('Content')) || (role === 'Finance Mgr' && section.includes('Financial'));
                           const isLocked = role === 'Super Admin';

                           return (
                              <td key={`${section}-${role}`} className="px-6 py-8">
                                 <div className="flex justify-center">
                                    <button 
                                       disabled={isLocked}
                                       className={cn(
                                          "w-10 h-10 rounded-xl flex items-center justify-center transition-all border",
                                          isAllowed ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-rose-50 text-rose-600 border-rose-100 opacity-30 group-hover:opacity-100",
                                          isLocked && "cursor-not-allowed opacity-100 border-emerald-500/20 shadow-inner"
                                       )}
                                    >
                                       {isAllowed ? <Check size={18} /> : <X size={18} />}
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
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-typography">
            {[
               { name: 'Ankit Sharma', role: 'Super Admin', email: 'ankit@edusearch.com', status: 'ACTIVE' },
               { name: 'Rohan Das', role: 'Content Manager', email: 'rohan@edusearch.com', status: 'ACTIVE' },
               { name: 'Simran Gill', role: 'Moderator', email: 'simran@edusearch.com', status: 'INACTIVE' }
            ].map((member, i) => (
               <div key={i} className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm relative group hover:border-primary/20 transition-all">
                  <div className="absolute top-0 right-0 p-8">
                     <button className="p-3 bg-snow-pearl rounded-xl text-secondary/20 hover:text-primary transition-all">
                        <Edit2 size={16} />
                     </button>
                  </div>
                  <div className="w-16 h-16 bg-snow-pearl rounded-3xl flex items-center justify-center text-secondary/10 group-hover:bg-primary/5 group-hover:text-primary transition-all mb-8 shadow-inner">
                     <Users size={28} />
                  </div>
                  <h4 className="text-[20px] font-black tracking-tighter uppercase">{member.name}</h4>
                  <p className="text-[10px] font-black text-primary uppercase tracking-widest mt-1 italic underline decoration-primary/10">{member.role}</p>
                  
                  <div className="mt-8 space-y-4">
                     <div className="flex items-center space-x-3 text-secondary/40">
                        <ShieldCheck size={14} />
                        <span className="text-[11px] font-bold tracking-tight">{member.email}</span>
                     </div>
                     <div className="flex items-center space-x-3">
                        <div className={cn("w-1.5 h-1.5 rounded-full", member.status === 'ACTIVE' ? "bg-emerald-500" : "bg-rose-500")} />
                        <span className={cn("text-[9px] font-black uppercase tracking-widest", member.status === 'ACTIVE' ? "text-emerald-600" : "text-rose-600")}>{member.status}</span>
                     </div>
                  </div>
               </div>
            ))}
            
            <button className="bg-snow-pearl/30 border-2 border-dashed border-gray-200 rounded-[3rem] p-10 flex flex-col items-center justify-center text-secondary/20 hover:border-primary hover:text-primary transition-all group">
               <div className="w-16 h-16 rounded-3xl border-2 border-dashed border-current flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Plus size={32} />
               </div>
               <span className="text-[11px] font-black uppercase tracking-widest">Add New Seat</span>
            </button>
         </div>
      )}

      {activeTab === 'AUDIT' && (
         <div className="bg-white rounded-[3rem] border border-gray-50 shadow-sm overflow-hidden">
            <div className="p-10 border-b border-gray-50 flex items-center justify-between bg-slate-900 text-white border-0">
               <div className="flex items-center space-x-4">
                  <History size={24} className="text-secondary/40" />
                  <div>
                     <h3 className="text-xl font-black tracking-tighter italic lowercase underline decoration-primary/30">Authority Events</h3>
                     <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Immutable log of role & permission changes</p>
                  </div>
               </div>
               <div className="flex items-center space-x-4">
                  <div className="relative">
                     <Search size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500" />
                     <input placeholder="Search Audit Identity..." className="bg-white/5 border border-white/10 pl-16 pr-8 py-3 rounded-2xl text-[12px] font-bold outline-none focus:bg-white/10 transition-all w-64 text-white" />
                  </div>
               </div>
            </div>
            <div className="overflow-x-auto">
               <table className="w-full text-left">
                  <thead className="bg-snow-pearl/50 border-b border-gray-100">
                     <tr>
                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Timestamp</th>
                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Actuary (Admin)</th>
                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Subject User</th>
                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Operation</th>
                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40 text-right">Result</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 italic">
                     {[
                        { time: '2026-03-08 10:20:42', actuary: 'Ankit Sharma', subject: 'Simran Gill', op: 'Role Changed: DE-Operator → Moderator', res: 'SUCCESS' },
                        { time: '2026-03-08 09:12:11', actuary: 'Ankit Sharma', subject: 'Rohan Das', op: 'Module Access: Financial → REVOKED', res: 'SUCCESS' },
                        { time: '2026-03-07 14:44:02', actuary: 'System Node-V3', subject: 'Simran Gill', op: 'Password Reset: Mandatory (Security Incident)', res: 'SUCCESS' }
                     ].map((log, i) => (
                        <tr key={i} className="group hover:bg-snow-pearl/30 transition-all">
                           <td className="px-10 py-8 text-[11px] font-bold text-secondary/40 uppercase">{log.time}</td>
                           <td className="px-10 py-8 text-sm font-black text-typography uppercase tracking-tighter">{log.actuary}</td>
                           <td className="px-10 py-8 text-sm font-black text-typography uppercase tracking-tighter">{log.subject}</td>
                           <td className="px-10 py-8">
                              <span className="text-[12px] font-black text-primary italic lowercase underline decoration-primary/10">{log.op}</span>
                           </td>
                           <td className="px-10 py-8 text-right font-black text-emerald-500 text-[10px] uppercase">
                              {log.res}
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
