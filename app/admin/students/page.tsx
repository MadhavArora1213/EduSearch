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
  Lock
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
    <div className="space-y-10 font-montserrat">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-6 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-2 font-montserrat italic">
              <div className="bg-primary/5 px-3 py-1.5 rounded-xl border border-primary/10">
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary italic lowercase">DPDP COMPLIANT</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30">User Lifecycle Node</span>
           </div>
           <h1 className="text-3xl md:text-3xl md:text-5xl font-black text-typography tracking-tighter leading-none mb-1">
             Student <span className="text-primary italic">Cloud</span>
           </h1>
           <p className="text-secondary/40 text-sm font-bold uppercase tracking-widest mt-2">
              Managing {(students.length || 0).toLocaleString()} Verified Academic Identities
           </p>
        </div>

        <div className="flex items-center space-x-4 italic">
           <button className="flex items-center space-x-2 px-6 py-4 bg-snow-pearl border border-gray-200 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-white hover:border-gray-300 transition-all text-secondary/40 underline decoration-primary/10">
              <Download size={18} />
              <span>Export User Manifest</span>
           </button>
           <button className="flex items-center space-x-2 px-8 py-4 bg-slate-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-slate-900/10 italic">
              <Zap size={18} />
              <span>Broadcast Pulse</span>
           </button>
        </div>
      </section>

      {/* KPI Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 italic">
         {[
           { label: "Active Nodes", value: students.length, trend: "Live", icon: Users, color: "text-primary bg-primary/5" },
           { label: "Today's Onboarding", value: students.filter(s => new Date(s.created_at).toDateString() === new Date().toDateString()).length, trend: "+420%", icon: Zap, color: "text-emerald-500 bg-emerald-50" },
           { label: "Identity Veracity", value: "98.8%", trend: "High", icon: UserCheck, color: "text-indigo-500 bg-indigo-50" },
           { label: "Inactive (>90d)", value: "1.2k", trend: "Audit Flagged", icon: Lock, color: "text-rose-500 bg-rose-50" },
         ].map((kpi, i) => (
           <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-50 shadow-sm transition-all hover:border-primary/20 cursor-pointer group">
              <div className="flex items-center justify-between mb-4">
                 <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner", kpi.color)}>
                    <kpi.icon size={22} />
                 </div>
                 <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">{kpi.trend}</span>
              </div>
              <p className="text-4xl font-black text-typography tracking-tighter leading-none mb-1 group-hover:text-primary transition-colors italic">{kpi.value.toLocaleString()}</p>
              <p className="text-[10px] font-bold text-secondary/30 uppercase tracking-widest italic">{kpi.label}</p>
           </div>
         ))}
      </div>

      {/* Filter Hub */}
      <section className="bg-white rounded-[3rem] border border-gray-50 shadow-sm overflow-hidden flex flex-col min-h-[400px]">
         <div className="p-6 md:p-10 border-b border-gray-50 flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-snow-pearl/30 border-gray-100 italic">
            <div className="relative flex-1 max-w-xl">
               <Search size={22} className="absolute left-6 top-1/2 -translate-y-1/2 text-secondary/20" />
               <input 
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 placeholder="Find Student by Name, Email or Identity ID..." 
                 className="w-full bg-white border-0 pl-16 pr-8 py-5 rounded-3xl text-[14px] font-bold outline-none focus:ring-4 focus:ring-primary/5 transition-all shadow-inner" 
               />
            </div>
            <div className="flex items-center space-x-4 lg:pl-10 italic w-full lg:w-auto justify-between lg:justify-end">
               <div className="flex items-center space-x-2 bg-white/50 p-1.5 rounded-2xl border border-gray-100">
                  {["All", "Today", "Suspended"].map((p) => (
                    <button key={p} className="px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-primary transition-all">
                       {p}
                    </button>
                  ))}
               </div>
               <button className="p-5 bg-white border border-gray-100 rounded-2xl text-secondary/20 hover:text-primary transition-all shadow-sm">
                  <Filter size={20} />
               </button>
            </div>
         </div>

         <div className="overflow-x-auto relative">
            {loading && (
              <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-10">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
              </div>
            )}
            <table className="w-full text-left italic font-montserratnot-italic">
               <thead className="bg-snow-pearl/50 border-b border-gray-100 italic">
                  <tr>
                     <th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-secondary/40">Student Profile</th>
                     <th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-secondary/40">Communication Node</th>
                     <th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-secondary/40">Enrolled Since</th>
                     <th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-secondary/40 text-center italic">Engagement</th>
                     <th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-secondary/40 text-right">Commit State</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-50 italic">
                  {students.length === 0 && !loading && (
                    <tr>
                      <td colSpan={5} className="px-10 py-20 text-center text-secondary/30 font-black uppercase tracking-widest text-[10px]">No Student Entities Sequenced in Registry</td>
                    </tr>
                  )}
                  {students.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase())).map((student) => (
                    <tr key={student.id} className="group hover:bg-snow-pearl/30 transition-all italic">
                       <td className="px-10 py-10">
                          <div className="flex items-center space-x-6 italic">
                             <div className="w-16 h-16 bg-snow-pearl rounded-[1.5rem] flex items-center justify-center text-secondary/10 group-hover:scale-110 group-hover:bg-primary/5 group-hover:text-primary transition-all shadow-inner border border-gray-100">
                                <User size={28} />
                             </div>
                             <div>
                                <h4 className="text-[15px] font-black text-typography uppercase tracking-tight group-hover:text-primary transition-colors italic underline decoration-primary/10">{student.name}</h4>
                                <p className="text-[9px] font-bold text-secondary/20 uppercase tracking-widest mt-1 italic">UID: {student.id.slice(0, 8)}</p>
                             </div>
                          </div>
                       </td>
                       <td className="px-10 py-10 font-montserrat not-italic">
                          <div className="space-y-2 italic underline decoration-primary/10">
                             <div className="flex items-center space-x-2 text-[12px] font-black text-typography">
                                <Mail size={12} className="text-secondary/20" />
                                <span>{student.email}</span>
                             </div>
                             <div className="flex items-center space-x-2 text-[12px] font-black text-secondary/40">
                                <Phone size={12} className="text-secondary/20" />
                                <span>{maskPhone(student.phone)}</span>
                             </div>
                          </div>
                       </td>
                       <td className="px-10 py-10 font-montserrat italic">
                          <p className="text-[13px] font-black text-typography uppercase">{new Date(student.created_at).toLocaleDateString('en-IN', { month: 'short', day: '2-digit', year: 'numeric' })}</p>
                          <p className="text-[8px] font-bold text-secondary/20 uppercase tracking-widest mt-1 italic">Identity Established</p>
                       </td>
                       <td className="px-10 py-10 text-center italic">
                          <div className="inline-flex space-x-4 italic underline decoration-primary/10">
                             <div className="text-center">
                                <p className="text-lg font-black text-typography italic">{student.reviews_count || 0}</p>
                                <p className="text-[7px] font-bold text-secondary/30 uppercase tracking-widest">Reviews</p>
                             </div>
                             <div className="w-px h-8 bg-gray-100" />
                             <div className="text-center">
                                <p className="text-lg font-black text-typography italic">{student.apps_count || 0}</p>
                                <p className="text-[7px] font-bold text-secondary/30 uppercase tracking-widest">Leads</p>
                             </div>
                          </div>
                       </td>
                       <td className="px-10 py-10 text-right italic">
                          <div className="flex items-center justify-end space-x-4 italic">
                             <span className={cn(
                               "px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest",
                               student.status === 'ACTIVE' ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-rose-50 text-rose-600 border border-rose-100"
                             )}>
                                {student.status || 'ACTIVE'}
                             </span>
                             <button className="p-4 bg-white border border-gray-200 rounded-2xl hover:bg-slate-900 hover:text-white transition-all shadow-sm italic underline decoration-primary/10">
                                <MoreVertical size={18} />
                             </button>
                          </div>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>

         <div className="p-10 border-t border-gray-50 flex items-center justify-between bg-white italic relative overflow-hidden font-montserrat">
            <div className="absolute top-0 right-0 p-10 opacity-5">
               <Fingerprint size={100} className="text-primary" />
            </div>
            <div className="flex items-center space-x-6 relative z-10 italic">
               <Activity size={18} className="text-emerald-500 animate-pulse" />
               <p className="text-xs font-black text-secondary/40 uppercase tracking-widest italic font-black decoration-primary/10 underline">Identity Consensus Protocol: Online • DPDP Compliance Layer Verified</p>
            </div>
            <p className="text-[9px] font-black text-secondary/20 uppercase tracking-widest relative z-10 italic">Records synced from Authentication Node (NextAuth)</p>
         </div>
      </section>
    </div>
  );
}
