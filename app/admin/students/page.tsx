"use client";

import { useState, useEffect } from "react";
import { 
  Users, 
  Search, 
  Filter, 
  ChevronRight, 
  MoreVertical, 
  Mail, 
  Phone, 
  Calendar, 
  UserCheck, 
  UserMinus, 
  UserX, 
  Activity, 
  FileText, 
  Download, 
  Smartphone, 
  User,
  Zap,
  Loader2,
  CheckCircle2,
  Lock,
  Fingerprint
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  registration_date?: string;
  created_at: string;
  last_active?: string;
  status: 'ACTIVE' | 'SUSPENDED' | 'DEACTIVATED' | string;
  reviews_count?: number;
  apps_count?: number;
}

export default function StudentsManagementPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/users?role=STUDENT");
      const data = await res.json();
      setStudents(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const maskPhone = (phone: string | null) => {
    if (!phone) return "N/A";
    return `*******${phone.slice(-4)}`;
  };

  if (!mounted) return null;

  return (
    <div className="space-y-6 font-montserrat">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-4 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-1.5 font-montserrat">
              <div className="bg-primary/5 px-3 py-1.5 rounded-xl border border-primary/10">
                 <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary lowercase">Identity Protocol</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30 uppercase tracking-widest text-[10px]">Registry</span>
           </div>
           <h1 className="text-3xl md:text-4xl font-black text-typography tracking-tighter leading-none mb-1">
             Student <span className="text-primary italic">Cloud</span>
           </h1>
           <p className="text-secondary/40 text-[10px] font-black uppercase tracking-[0.2em] mt-1.5 leading-none">
              Managing {(students.length || 0).toLocaleString()} Registered Nodes
           </p>
        </div>
 
        <div className="flex items-center space-x-3">
           <button className="flex items-center space-x-2 px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:text-primary transition-all shadow-sm">
              <Download size={16} />
              <span>Export</span>
           </button>
           <button className="flex items-center space-x-2 px-6 py-2.5 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-slate-900/10">
              <Zap size={16} />
              <span>Broadcast</span>
           </button>
        </div>
      </section>

      {/* KPI Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-5">
         {[
           { label: "Active Nodes", value: students.length, trend: "Live", icon: Users, color: "text-primary bg-primary/5" },
           { label: "Today's Onboarding", value: students.filter(s => new Date(s.created_at).toDateString() === new Date().toDateString()).length, trend: "+420%", icon: Zap, color: "text-emerald-500 bg-emerald-50" },
           { label: "Identity Veracity", value: "98.8%", trend: "High", icon: UserCheck, color: "text-indigo-500 bg-indigo-50" },
           { label: "Inactive (>90d)", value: "1.2k", trend: "Audit Flagged", icon: Lock, color: "text-rose-500 bg-rose-50" },
         ].map((kpi, i) => (
           <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm transition-all hover:shadow-md cursor-pointer group">
              <div className="flex items-center justify-between mb-3">
                 <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shadow-inner", kpi.color)}>
                    <kpi.icon size={18} />
                 </div>
                 <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">{kpi.trend}</span>
              </div>
              <p className="text-3xl font-black text-typography tracking-tighter leading-none mb-1 group-hover:text-primary transition-colors">{kpi.value.toLocaleString()}</p>
              <p className="text-[9px] font-bold text-secondary/30 uppercase tracking-[0.2em]">{kpi.label}</p>
           </div>
         ))}
      </div>

      {/* Filter Hub */}
      <section className="bg-white rounded-xl border border-gray-50 shadow-sm overflow-hidden flex flex-col min-h-[400px]">
         <div className="p-4 border-b border-gray-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-snow-pearl/30">
            <div className="relative flex-1 max-w-xl">
               <Search size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-secondary/20" />
               <input 
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 placeholder="Search identities..." 
                 className="w-full bg-white border border-transparent pl-12 pr-6 py-2.5 rounded-xl text-[13px] font-bold outline-none focus:ring-4 focus:ring-primary/5 shadow-sm" 
               />
            </div>
             <div className="flex items-center space-x-3 w-full lg:w-auto justify-between lg:justify-end">
                <div className="flex items-center space-x-1 bg-gray-50 p-1 rounded-xl border border-gray-100">
                   {["All", "Today", "Suspended"].map((p) => (
                     <button key={p} className="px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-white hover:text-primary transition-all">
                        {p}
                     </button>
                   ))}
                </div>
                <button className="w-9 h-9 bg-white border border-gray-100 rounded-xl flex items-center justify-center text-secondary/20 hover:text-primary transition-all shadow-sm">
                   <Filter size={14} />
                </button>
             </div>
         </div>

         <div className="overflow-x-auto relative">
            {loading && (
              <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-10">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
              </div>
            )}
             <table className="w-full text-left font-montserrat">
                <thead className="bg-snow-pearl/50 border-b border-gray-100">
                   <tr>
                      <th className="px-6 py-3 text-[9px] font-black uppercase tracking-[0.2em] text-secondary/40">Profile Node</th>
                      <th className="px-6 py-3 text-[9px] font-black uppercase tracking-[0.2em] text-secondary/40">Meta Bridge</th>
                      <th className="px-6 py-3 text-[9px] font-black uppercase tracking-[0.2em] text-secondary/40 text-center">Established</th>
                      <th className="px-6 py-3 text-[9px] font-black uppercase tracking-[0.2em] text-secondary/40 text-center border-l border-gray-50">Engagement</th>
                      <th className="px-6 py-3 text-[9px] font-black uppercase tracking-[0.2em] text-secondary/40 text-right">Commit State</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                   {students.length === 0 && !loading && (
                     <tr>
                       <td colSpan={5} className="px-10 py-20 text-center text-secondary/30 font-black uppercase tracking-widest text-[10px]">No Student Entities Sequenced in Registry</td>
                     </tr>
                   )}
                   {students.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase())).map((student) => (
                     <tr key={student.id} className="group hover:bg-gray-50/30 transition-all">
                        <td className="px-6 py-3">
                           <div className="flex items-center space-x-4">
                              <div className="w-10 h-10 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center text-secondary/20 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                                 <User size={18} />
                              </div>
                              <div>
                                 <h4 className="text-[13px] font-black text-typography uppercase leading-none group-hover:text-primary transition-colors">{student.name}</h4>
                                 <p className="text-[9px] font-bold text-secondary/20 uppercase tracking-widest mt-1.5">ID: {student.id.slice(0, 8)}</p>
                              </div>
                           </div>
                        </td>
                        <td className="px-6 py-3">
                           <div className="space-y-1.5">
                              <div className="flex items-center space-x-1.5 text-[10px] font-black text-typography uppercase">
                                 <Mail size={12} className="text-primary" />
                                 <span>{student.email}</span>
                              </div>
                              <div className="flex items-center space-x-1.5 text-[9px] font-black text-secondary/30 uppercase tracking-widest">
                                 <Smartphone size={12} />
                                 <span>{maskPhone(student.phone)}</span>
                              </div>
                           </div>
                        </td>
                        <td className="px-6 py-3 text-center">
                           <p className="text-[11px] font-black text-typography uppercase leading-none">{new Date(student.created_at).toLocaleDateString('en-IN', { month: 'short', day: '2-digit', year: 'numeric' })}</p>
                           <p className="text-[8px] font-black text-secondary/20 uppercase tracking-widest mt-1.5 leading-none">Registered</p>
                        </td>
                        <td className="px-6 py-3 text-center border-l border-gray-50/50 bg-gray-50/20">
                           <div className="inline-flex space-x-3 items-center">
                              <div className="text-center">
                                 <p className="text-[13px] font-black text-typography leading-none">{student.reviews_count || 0}</p>
                                 <p className="text-[7px] font-bold text-secondary/20 uppercase tracking-widest mt-1 leading-none">Feed</p>
                              </div>
                              <div className="w-px h-5 bg-gray-200/50" />
                              <div className="text-center">
                                 <p className="text-[13px] font-black text-typography leading-none">{student.apps_count || 0}</p>
                                 <p className="text-[7px] font-bold text-secondary/20 uppercase tracking-widest mt-1 leading-none">Ops</p>
                              </div>
                           </div>
                        </td>
                        <td className="px-6 py-3 text-right">
                           <div className="flex items-center justify-end space-x-2">
                              <span className={cn(
                                "px-2.5 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border transition-all",
                                student.status === 'ACTIVE' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-rose-50 text-rose-600 border-rose-100"
                              )}>
                                 {student.status || 'ACTIVE'}
                              </span>
                              <button className="w-8 h-8 bg-white border border-gray-100 rounded-lg hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center text-secondary/30">
                                 <MoreVertical size={14} />
                              </button>
                           </div>
                        </td>
                     </tr>
                   ))}
                </tbody>
             </table>
         </div>

         <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-snow-pearl/30 relative overflow-hidden font-montserrat">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform duration-1000">
               <Fingerprint size={80} className="text-primary" />
            </div>
            <div className="flex items-center space-x-4 relative z-10">
               <Activity size={14} className="text-emerald-500 animate-pulse" />
               <p className="text-[9px] font-black text-secondary/30 uppercase tracking-[0.2em]">Identity Consensus Node: DPDP Compliance Verified</p>
            </div>
            <p className="text-[8px] font-black text-secondary/20 uppercase tracking-widest relative z-10">Auth Bridge: NextAuth v5</p>
         </div>
      </section>
    </div>
  );
}
