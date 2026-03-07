"use client";

import { useState, useEffect } from "react";
import { 
  User, 
  Users, 
  ShieldCheck, 
  GraduationCap, 
  Search, 
  Filter, 
  MoreVertical, 
  ChevronRight, 
  Download, 
  Plus, 
  Mail, 
  Phone, 
  Calendar, 
  Trash2, 
  Edit2, 
  BadgeCheck,
  LayoutGrid,
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";

interface UserRecord {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: string;
  email_verified: boolean;
  created_at: string;
}

export default function UsersManagementPage() {
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchUsers();
  }, [filter]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      let url = "/api/admin/users";
      if (filter !== "all") url += `?role=${filter}`;
      const res = await fetch(url);
      const data = await res.json();
      setUsers(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-6 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-2">
              <div className="bg-primary/5 px-3 py-1.5 rounded-xl border border-primary/10">
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary">User & Security</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30">Master Identity Directory</span>
           </div>
           <h1 className="text-5xl font-black text-typography tracking-tighter leading-none mb-1">
             Identity <span className="text-primary italic">Access</span>
           </h1>
           <p className="text-secondary/40 text-sm font-bold uppercase tracking-widest mt-2">
              Managing 10M+ Student & Institutional Accounts
           </p>
        </div>

        <div className="flex items-center space-x-4">
           <button className="flex items-center space-x-2 px-6 py-4 bg-gray-50 border border-gray-200/50 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-white hover:border-gray-200 transition-all active:scale-95 text-secondary/60">
              <ShieldCheck size={16} />
              <span>Security Audit</span>
           </button>
           <button className="flex items-center space-x-2 px-8 py-4 bg-primary text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20">
              <Plus size={18} />
              <span>Provision Account</span>
           </button>
        </div>
      </section>

      {/* Role Tabs */}
      <section className="bg-white p-6 rounded-[2.5rem] border border-gray-50 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
         <div className="flex items-center space-x-2 bg-gray-50 p-1.5 rounded-2xl border border-gray-100 w-full md:w-auto overflow-x-auto">
            {["all", "STUDENT", "COLLEGE_ADMIN", "SUPER_ADMIN"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap",
                  filter === f 
                    ? "bg-white text-primary shadow-sm shadow-black/5" 
                    : "text-secondary/40 hover:text-secondary"
                )}
              >
                {f === "all" ? "All Identities" : f.replace('_', ' ')}
              </button>
            ))}
         </div>

         <div className="flex items-center space-x-4 w-full md:w-auto">
            <div className="relative group flex-1 md:w-80">
               <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-secondary/20" />
               <input placeholder="Search Name, Email or Phone..." className="w-full bg-gray-50 border-0 pl-14 pr-6 py-4 rounded-2xl text-[13px] font-bold outline-none focus:ring-4 focus:ring-primary/5 transition-all" />
            </div>
            <button className="p-4 bg-gray-50 rounded-2xl border border-gray-100 text-secondary/40 hover:text-primary transition-all">
               <Filter size={18} />
            </button>
         </div>
      </section>

      {/* User Table */}
      <section className="bg-white rounded-[2.5rem] border border-gray-50 shadow-sm overflow-hidden min-h-[500px]">
        <div className="overflow-x-auto">
           <table className="w-full text-left">
              <thead className="bg-snow-pearl/50 border-b border-gray-100">
                 <tr>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Profile Entity</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Role Access</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Metadata</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Status</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40 text-right">Actions</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loading ? [...Array(3)].map((_, i) => (
                  <tr key={i} className="animate-pulse h-[100px]">
                     <td colSpan={5} className="bg-gray-50/50" />
                  </tr>
                )) : users.map((u) => (
                  <tr key={u.id} className="group hover:bg-gray-50/30 transition-all">
                    <td className="px-10 py-8">
                       <div className="flex items-center space-x-6">
                          <div className={cn(
                             "w-14 h-14 rounded-2xl flex items-center justify-center border transition-all",
                             u.role === 'SUPER_ADMIN' ? "bg-primary/5 border-primary/10 text-primary" : "bg-gray-50 border-gray-100 text-secondary/20"
                          )}>
                             {u.role === 'SUPER_ADMIN' ? <ShieldCheck size={24} /> : u.role === 'COLLEGE_ADMIN' ? <Settings size={24} /> : <User size={24} />}
                          </div>
                          <div>
                             <h4 className="text-base font-black text-typography leading-tight">{u.name}</h4>
                             <p className="text-[11px] font-bold text-secondary/30 truncate max-w-[200px]">{u.email}</p>
                          </div>
                       </div>
                    </td>
                    <td className="px-10 py-8">
                       <div className={cn(
                          "px-4 py-2 rounded-full inline-flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest border",
                          u.role === 'SUPER_ADMIN' ? "bg-primary/5 border-primary/10 text-primary" : u.role === 'COLLEGE_ADMIN' ? "bg-emerald-50 border-emerald-100 text-emerald-600" : "bg-blue-50 border-blue-100 text-blue-600"
                       )}>
                          {u.role === 'SUPER_ADMIN' ? <ShieldCheck size={12} /> : u.role === 'COLLEGE_ADMIN' ? <LayoutGrid size={12} /> : <GraduationCap size={12} />}
                          <span>{u.role.replace('_', ' ')}</span>
                       </div>
                    </td>
                    <td className="px-10 py-8">
                       <p className="text-[12px] font-bold text-typography">{u.phone || "---"}</p>
                       <p className="text-[9px] font-bold text-secondary/20 uppercase tracking-widest mt-1">Reg: {new Date(u.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>
                    </td>
                    <td className="px-10 py-8">
                       <div className={cn(
                          "inline-flex items-center space-x-2 px-4 py-2 rounded-full border",
                          u.email_verified ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-red-50 text-red-600 border-red-100"
                       )}>
                          <BadgeCheck size={14} className={cn(!u.email_verified && "rotate-45")} />
                          <span className="text-[9px] font-black uppercase tracking-widest">{u.email_verified ? "Certified" : "Limited Access"}</span>
                       </div>
                    </td>
                    <td className="px-10 py-8 text-right">
                       <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-3 bg-white border border-gray-100 rounded-xl hover:bg-primary hover:text-white transition-all shadow-sm">
                             <Edit2 size={16} />
                          </button>
                          <button className="p-3 bg-white border border-gray-100 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm">
                             <Trash2 size={16} />
                          </button>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
           </table>
        </div>

        <div className="p-10 border-t border-gray-50 flex items-center justify-between bg-white text-typography animate-in fade-in transition-all">
           <p className="text-xs font-bold text-secondary/30 uppercase tracking-widest italic font-black">Showing {users.length} Active Identities</p>
           <button className="px-8 py-4 bg-gray-50 rounded-2xl text-[10px] font-black uppercase tracking-widest text-secondary/40 hover:text-primary transition-all">Load More Records</button>
        </div>
      </section>
    </div>
  );
}
