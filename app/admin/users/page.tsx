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
    <div className="space-y-10">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-6 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-2">
              <div className="bg-primary/5 px-3 py-1.5 rounded-xl border border-primary/10">
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary italic">Student Lifecycle</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30">User Management</span>
           </div>
           <h1 className="text-3xl md:text-3xl md:text-5xl font-black text-typography tracking-tighter leading-none mb-1">
             Student <span className="text-primary italic">Registry</span>
           </h1>
           <p className="text-secondary/40 text-sm font-bold uppercase tracking-widest mt-2">
              Managing 10.4M+ Verified Student Profiles & GDPR/DPDP Status
           </p>
        </div>

        <div className="flex items-center space-x-4">
           <Link href="/admin/users/dpdp" className="flex items-center space-x-2 px-6 py-4 bg-snow-pearl border border-gray-200/50 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-white hover:border-primary/20 transition-all text-secondary/60">
              <ShieldAlert size={16} className="text-rose-500" />
              <span>DPDP Compliance Centre</span>
           </Link>
           <button className="flex items-center space-x-2 px-8 py-4 bg-primary text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20">
              <Download size={18} />
              <span>Export User List</span>
           </button>
        </div>
      </section>

      {/* Filter Presets */}
      <div className="flex items-center space-x-4">
         {[
           { label: "All Users", count: "10.4M", active: true },
           { label: "Registered Today", count: "4,210", active: false },
           { label: "Inactive (90d)", count: "1.2M", active: false },
           { label: "Suspended", count: "842", active: false },
           { label: "Deletion Requests", count: "12", active: false, alert: true }
         ].map((f, i) => (
           <button key={i} className={cn(
             "px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all flex items-center space-x-3 border",
             f.active ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" : "bg-white text-secondary/40 border-gray-100 hover:border-primary/20"
           )}>
              <span>{f.label}</span>
              <span className={cn("px-2 py-0.5 rounded-lg text-[9px]", f.active ? "bg-white/20" : "bg-gray-100")}>{f.count}</span>
              {f.alert && <div className="w-2 h-2 bg-rose-500 rounded-full animate-ping" />}
           </button>
         ))}
      </div>

      {/* Main Table Container */}
      <section className="bg-white rounded-[2.5rem] border border-gray-50 shadow-sm overflow-hidden">
        <div className="p-6 md:p-10 border-b border-gray-50 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
           <div className="relative flex-1 max-w-2xl">
              <Search size={22} className="absolute left-8 top-1/2 -translate-y-1/2 text-secondary/20" />
              <input placeholder="Search by Name, Email or Partial Phone..." className="w-full bg-snow-pearl border-0 pl-20 pr-8 py-6 rounded-3xl text-[15px] font-bold outline-none focus:ring-4 focus:ring-primary/5 transition-all placeholder:text-secondary/20" />
           </div>
           
           <button className="ml-6 p-6 bg-snow-pearl rounded-2xl border border-gray-100 text-secondary/40 hover:text-primary transition-all">
              <Filter size={22} />
           </button>
        </div>

        <div className="overflow-x-auto">
           <table className="w-full text-left">
              <thead className="bg-snow-pearl/50 border-b border-gray-100">
                 <tr>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Student Profile</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Engagement</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40 text-center">Identity</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Status</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Last Activity</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40 text-right">Actions</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {users.map((user) => (
                  <tr key={user.id} className="group hover:bg-snow-pearl/30 transition-all">
                    <td className="px-10 py-8">
                       <div className="flex items-center space-x-6">
                          <div className="relative">
                             <div className="w-16 h-16 bg-snow-pearl rounded-2xl flex items-center justify-center text-secondary/10 group-hover:bg-primary/5 group-hover:text-primary transition-all">
                                <User size={28} />
                             </div>
                             <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full border-4 border-white flex items-center justify-center">
                                {user.loginMethod === 'GOOGLE' ? <div className="w-2.5 h-2.5 bg-blue-500 rounded-full" /> : <div className="w-2.5 h-2.5 bg-green-500 rounded-full" />}
                             </div>
                          </div>
                          <div>
                             <h4 className="text-base font-black text-typography leading-tight">{user.name}</h4>
                             <div className="flex items-center space-x-3 text-[10px] font-bold text-secondary/40 uppercase tracking-widest mt-1">
                                <span className="flex items-center space-x-1"><Smartphone size={10} /> <span>{user.phone}</span></span>
                                <div className="w-1 h-1 bg-secondary/10 rounded-full" />
                                <span className="underline decoration-primary/10 italic">{user.id}</span>
                             </div>
                          </div>
                       </div>
                    </td>
                    <td className="px-10 py-8">
                       <div className="flex items-center space-x-6">
                          <div>
                             <p className="text-xl font-black text-typography tracking-tighter">{user.reviewsCount}</p>
                             <p className="text-[9px] font-bold text-secondary/20 uppercase tracking-widest">Reviews</p>
                          </div>
                          <div className="w-px h-8 bg-gray-100" />
                          <div>
                             <p className="text-xl font-black text-typography tracking-tighter">{user.applicationsCount}</p>
                             <p className="text-[9px] font-bold text-secondary/20 uppercase tracking-widest">Apps</p>
                          </div>
                       </div>
                    </td>
                    <td className="px-10 py-8 text-center">
                       <div className="inline-flex flex-col items-center">
                          <span className="text-[12px] font-black text-typography">{user.email}</span>
                          <span className="text-[9px] font-bold text-secondary/30 uppercase tracking-widest mt-1 italic">{user.loginMethod} Verified</span>
                       </div>
                    </td>
                    <td className="px-10 py-8">
                       <span className={cn(
                          "inline-flex items-center space-x-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                          user.status === 'ACTIVE' ? "bg-emerald-50 text-emerald-600 border border-emerald-100" :
                          user.status === 'SUSPENDED' ? "bg-rose-50 text-rose-600 border border-rose-100" :
                          "bg-gray-50 text-gray-500 border border-gray-100"
                       )}>
                          <div className={cn("w-1.5 h-1.5 rounded-full", user.status === 'ACTIVE' ? "bg-emerald-500" : user.status === 'SUSPENDED' ? "bg-rose-500" : "bg-gray-400")} />
                          <span>{user.status}</span>
                       </span>
                    </td>
                    <td className="px-10 py-8">
                       <div className="flex items-center space-x-2 text-[12px] font-black text-typography">
                          <Clock size={14} className="text-secondary/20" />
                          <span>{user.lastActive}</span>
                       </div>
                    </td>
                    <td className="px-10 py-8 text-right">
                       <div className="flex items-center justify-end space-x-2">
                          <Link href={`/admin/users/${user.id}`} className="p-4 bg-white border border-gray-100 rounded-2xl hover:bg-primary hover:text-white transition-all shadow-sm" title="Manage Account Detail">
                             <MousePointer2 size={18} />
                          </Link>
                          <button className="p-4 bg-white border border-gray-100 rounded-2xl hover:bg-rose-500 hover:text-white transition-all shadow-sm" title="Flag for Suspension">
                             <AlertTriangle size={18} />
                          </button>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
           </table>
        </div>

        <div className="p-10 border-t border-gray-100 flex items-center justify-between bg-snow-pearl/30">
           <div className="flex items-center space-x-4">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-xs font-black text-secondary/40 uppercase tracking-widest italic lowercase underline decoration-primary/10">DPDP Act Real-time Audit logging active</p>
           </div>
           <div className="flex items-center space-x-2 text-[10px] font-bold text-secondary/30 uppercase tracking-widest">
              <span>Showing 1-50 of 10.4M Students</span>
           </div>
        </div>
      </section>
    </div>
  );
}
