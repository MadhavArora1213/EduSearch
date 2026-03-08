"use client";

import { useState } from "react";
import { 
  Users,
  User,
  Search, 
  Filter, 
  Download, 
  ChevronRight,
  MoreVertical,
  ShieldAlert,
  Clock,
  Mail,
  Smartphone,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Calendar,
  MousePointer2
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface StudentUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  registrationDate: string;
  loginMethod: 'GOOGLE' | 'EMAIL_OTP';
  lastActive: string;
  status: 'ACTIVE' | 'SUSPENDED' | 'DEACTIVATED';
  reviewsCount: number;
  applicationsCount: number;
}

export default function StudentUserTable() {
  const [users] = useState<StudentUser[]>([
    {
      id: "USR-88210",
      name: "Aaryan Verma",
      email: "aa****@gmail.com",
      phone: "******4210",
      registrationDate: "2026-03-01",
      loginMethod: 'GOOGLE',
      lastActive: "2 mins ago",
      status: 'ACTIVE',
      reviewsCount: 12,
      applicationsCount: 3
    },
    {
      id: "USR-88211",
      name: "Priya Sharma",
      email: "pr****@outlook.com",
      phone: "******1102",
      registrationDate: "2026-02-28",
      loginMethod: 'EMAIL_OTP',
      lastActive: "4 hours ago",
      status: 'SUSPENDED',
      reviewsCount: 2,
      applicationsCount: 1
    },
    {
      id: "USR-88212",
      name: "Kabir Singh",
      email: "ka****@iitb.ac.in",
      phone: "******9982",
      registrationDate: "2026-02-15",
      loginMethod: 'GOOGLE',
      lastActive: "3 days ago",
      status: 'ACTIVE',
      reviewsCount: 0,
      applicationsCount: 0
    }
  ]);

  return (
    <div className="space-y-6 font-montserrat">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-4 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-1.5">
              <div className="bg-primary/5 px-3 py-1.5 rounded-xl border border-primary/10">
                 <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Student Lifecycle</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30 uppercase tracking-widest text-[10px]">User Management</span>
           </div>
           <h1 className="text-3xl md:text-4xl font-black text-typography tracking-tighter leading-none mb-1">
             Student <span className="text-primary italic">Registry</span>
           </h1>
           <p className="text-secondary/40 text-[10px] font-black uppercase tracking-[0.2em] mt-1.5 leading-none">
              Managing 10.4M+ Verified Student Profiles & Security Clusters
           </p>
        </div>
 
        <div className="flex items-center space-x-3">
           <Link href="/admin/users/dpdp" className="flex items-center space-x-2 px-5 py-2.5 bg-snow-pearl border border-gray-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-primary transition-all shadow-sm">
              <ShieldAlert size={14} className="text-rose-500" />
              <span>Compliance Hub</span>
           </Link>
           <button className="flex items-center space-x-2 px-6 py-2.5 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-primary/20">
              <Download size={16} />
              <span>Export Node</span>
           </button>
        </div>
      </section>

      {/* Filter Presets */}
      <div className="flex flex-wrap items-center gap-3">
         {[
           { label: "Total Registry", count: "10.4M", active: true },
           { label: "New Nodes", count: "4,210", active: false },
           { label: "Inactive Cluster", count: "1.2M", active: false },
           { label: "Suspended", count: "842", active: false },
           { label: "Deletes", count: "12", active: false, alert: true }
         ].map((f, i) => (
           <button key={i} className={cn(
             "px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all flex items-center space-x-2.5 border",
             f.active ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" : "bg-white text-secondary/40 border-gray-100 hover:border-primary/20"
           )}>
              <span>{f.label}</span>
              <span className={cn("px-1.5 py-0.5 rounded text-[8px] font-bold", f.active ? "bg-white/20" : "bg-gray-50")}>{f.count}</span>
              {f.alert && <div className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse" />}
           </button>
         ))}
      </div>
 
      {/* Main Table Container */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col min-h-[400px]">
         <div className="p-2 border-b border-gray-100 flex flex-col lg:flex-row lg:items-center justify-between gap-3 bg-snow-pearl/30">
            <div className="relative flex-1 max-w-lg">
               <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/20" />
               <input placeholder="Search by ID, Name or Email Identity..." className="w-full bg-white border border-gray-100 pl-10 pr-4 py-2 rounded-lg text-[12px] font-bold outline-none focus:ring-4 focus:ring-primary/5 transition-all" />
            </div>
            <button className="w-8 h-8 bg-white border border-gray-100 rounded-lg flex items-center justify-center text-secondary/20 hover:text-primary transition-all shadow-sm">
               <Filter size={14} />
            </button>
         </div>
 
         <div className="overflow-x-auto">
            <table className="w-full text-left font-montserrat">
               <thead className="bg-snow-pearl/50 border-b border-gray-100">
                  <tr>
                     <th className="px-6 py-3 text-[9px] font-black uppercase tracking-[0.2em] text-secondary/40">Student Node</th>
                     <th className="px-6 py-3 text-[9px] font-black uppercase tracking-[0.2em] text-secondary/40">Matrix</th>
                     <th className="px-6 py-3 text-[9px] font-black uppercase tracking-[0.2em] text-secondary/40 text-center">Identity</th>
                     <th className="px-6 py-3 text-[9px] font-black uppercase tracking-[0.2em] text-secondary/40 text-center">Status</th>
                     <th className="px-6 py-3 text-[9px] font-black uppercase tracking-[0.2em] text-secondary/40">Last Peak</th>
                     <th className="px-6 py-3 text-[9px] font-black uppercase tracking-[0.2em] text-secondary/40 text-right">Commit</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-50">
                 {users.map((user) => (
                   <tr key={user.id} className="group hover:bg-gray-50/50 transition-all font-montserrat">
                     <td className="px-6 py-2.5">
                        <div className="flex items-center space-x-3">
                           <div className="relative">
                              <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-secondary/10 group-hover:bg-primary group-hover:text-white transition-all border border-gray-100 shadow-sm">
                                 <User size={18} />
                              </div>
                              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full border-2 border-white flex items-center justify-center">
                                 {user.loginMethod === 'GOOGLE' ? <div className="w-2 h-2 bg-blue-500 rounded-full" /> : <div className="w-2 h-2 bg-green-500 rounded-full" />}
                              </div>
                           </div>
                           <div>
                              <h4 className="text-[13px] font-black text-typography leading-none group-hover:text-primary transition-colors">{user.name}</h4>
                              <div className="flex items-center space-x-2 text-[8px] font-black text-secondary/30 uppercase tracking-widest mt-1.5 leading-none">
                                 <Smartphone size={8} /> 
                                 <span>{user.phone}</span>
                                 <div className="w-1 h-1 bg-secondary/10 rounded-full" />
                                 <span>{user.id}</span>
                              </div>
                           </div>
                        </div>
                     </td>
                     <td className="px-6 py-2.5">
                        <div className="flex items-center space-x-4">
                           <div className="leading-none">
                              <p className="text-[11px] font-black text-typography tracking-tighter">{user.reviewsCount}</p>
                              <p className="text-[6px] font-black text-secondary/20 uppercase tracking-[0.2em] mt-0.5">Reviews</p>
                           </div>
                           <div className="w-px h-6 bg-gray-100" />
                           <div className="leading-none">
                              <p className="text-[11px] font-black text-typography tracking-tighter">{user.applicationsCount}</p>
                              <p className="text-[6px] font-black text-secondary/20 uppercase tracking-[0.2em] mt-0.5">Apps</p>
                           </div>
                        </div>
                     </td>
                     <td className="px-6 py-2.5 text-center">
                        <div className="flex flex-col items-center leading-none">
                           <span className="text-[11px] font-black text-typography">{user.email}</span>
                           <span className="text-[7px] font-black text-secondary/30 uppercase tracking-[0.2em] mt-1.5 italic accent-primary">{user.loginMethod} Verified</span>
                        </div>
                     </td>
                     <td className="px-6 py-2.5 text-center">
                        <span className={cn(
                           "inline-flex items-center space-x-1.5 px-2 py-0.5 rounded-xl text-[7px] font-black uppercase tracking-widest border shadow-sm transition-all",
                           user.status === 'ACTIVE' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                           user.status === 'SUSPENDED' ? "bg-rose-50 text-rose-600 border-rose-100" :
                           "bg-gray-50 text-gray-400 border-gray-100"
                        )}>
                           <div className={cn("w-1 h-1 rounded-full", user.status === 'ACTIVE' ? "bg-emerald-500" : user.status === 'SUSPENDED' ? "bg-rose-500" : "bg-gray-400")} />
                           <span>{user.status}</span>
                        </span>
                     </td>
                     <td className="px-6 py-2.5">
                        <div className="flex items-center space-x-1.5 text-[11px] font-black text-typography leading-none">
                           <Clock size={12} className="text-secondary/20" />
                           <span>{user.lastActive}</span>
                        </div>
                     </td>
                     <td className="px-6 py-2.5 text-right">
                        <div className="flex items-center justify-end space-x-1.5">
                           <Link href={`/admin/users/${user.id}`} className="w-8 h-8 bg-white border border-gray-100 rounded-xl flex items-center justify-center text-secondary/30 hover:bg-slate-900 hover:text-white transition-all shadow-sm">
                              <MousePointer2 size={12} />
                           </Link>
                           <button className="w-8 h-8 bg-white border border-gray-100 rounded-xl flex items-center justify-center text-secondary/30 hover:bg-rose-500 hover:text-white transition-all shadow-sm">
                              <AlertTriangle size={12} />
                           </button>
                        </div>
                     </td>
                   </tr>
                 ))}
               </tbody>
            </table>
         </div>
 
         <div className="p-3 border-t border-gray-100 flex items-center justify-between bg-snow-pearl/30 font-montserrat">
            <div className="flex items-center space-x-3">
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
               <p className="text-[9px] font-black text-secondary/20 uppercase tracking-[0.2em] italic">DPDP Act Real-time Audit logging active</p>
            </div>
            <div className="flex items-center space-x-2 text-[8px] font-black text-secondary/10 uppercase tracking-[0.3em]">
               <span>Showing 1-50 of 10.4M Student Nodes</span>
            </div>
         </div>
      </section>
    </div>
  );
}
