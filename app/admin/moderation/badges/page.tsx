"use client";

import { useState } from "react";
import { 
  BadgeCheck, 
  Search, 
  ChevronRight,
  ShieldAlert,
  GraduationCap,
  Briefcase,
  CheckCircle2,
  XCircle,
  Eye,
  Trash2,
  AlertTriangle
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function BadgeVerificationPage() {
  const [filter, setFilter] = useState("PENDING");

  const [requests] = useState([
    { id: "VER-1", name: "Priya Sharma", role: "Alumni", college: "Delhi University", graduation_year: "2021", evidence: "linkedin.com/in/priyasharma_du", status: "PENDING", date: "4 hrs ago" },
    { id: "VER-2", name: "Dr. Arvind Mehta", role: "Faculty", college: "VIT Vellore", graduation_year: "-", evidence: "ID Card Uploaded", status: "PENDING", date: "1 day ago" },
  ]);

  const [approved] = useState([
    { id: "B-1", name: "Karan Johar", role: "Alumni", college: "IIM Ahmedabad", date_verified: "Oct 12, 2024" },
    { id: "B-2", name: "Prof. Anjali D.", role: "Faculty", college: "BITS Pilani", date_verified: "Nov 01, 2024" }
  ]);

  return (
    <div className="space-y-6 pb-20">
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-4 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-2">
              <div className="bg-primary/5 px-3 py-1.5 rounded-xl border border-primary/10">
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary">Identity Engine</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30">Badge Verification</span>
           </div>
           <h1 className="text-3xl md:text-3xl md:text-5xl font-black text-typography tracking-tighter leading-none mb-1">
             Trust & <span className="text-primary italic">Safety</span>
           </h1>
           <p className="text-secondary/40 text-sm font-bold uppercase tracking-widest mt-2">
              Auditing Alumni & Faculty Claim Requests
           </p>
        </div>

        <div className="flex items-center space-x-4">
           <div className="bg-amber-50 px-6 py-4 rounded-2xl border border-amber-100 flex items-center space-x-3">
              <ShieldAlert size={18} className="text-amber-500" />
              <div className="text-[11px] font-black uppercase tracking-widest text-amber-700">
                 {requests.length} Pending Verifications
              </div>
           </div>
        </div>
      </section>

      <section className="flex items-center justify-between gap-6 bg-white p-6 rounded-2xl border border-gray-50 shadow-sm">
         <div className="flex items-center space-x-2 bg-gray-50 p-1.5 rounded-2xl border border-gray-100 w-full md:w-auto">
            {["PENDING", "ACTIVE_BADGES", "REVOKED"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                  filter === f 
                    ? "bg-white text-primary shadow-sm shadow-black/5" 
                    : "text-secondary/40 hover:text-secondary"
                )}
              >
                {f.replace("_", " ")}
              </button>
            ))}
         </div>

         <div className="flex items-center space-x-4">
            <div className="relative w-80">
               <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-secondary/20" />
               <input placeholder="Search names or colleges..." className="w-full bg-gray-50 border-0 pl-14 pr-6 py-3.5 rounded-2xl text-[13px] font-bold outline-none ring-1 ring-gray-100 focus:ring-primary/10 transition-all text-typography" />
            </div>
         </div>
      </section>

      {filter === "PENDING" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
           {requests.map((r) => (
             <div key={r.id} className="bg-white p-6 rounded-2xl border border-gray-50 shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all group overflow-hidden relative">
                <div className="absolute -right-8 -top-5 w-32 h-32 bg-primary/5 rounded-full group-hover:scale-150 transition-transform duration-700" />
                
                <div className="flex justify-between items-start mb-8 relative">
                   <div className={cn(
                     "w-14 h-14 rounded-2xl flex items-center justify-center text-white",
                     r.role === 'Alumni' ? "bg-sky-500 shadow-sky-500/20 shadow-xl" : "bg-emerald-500 shadow-emerald-500/20 shadow-xl"
                   )}>
                      {r.role === 'Alumni' ? <GraduationCap size={24} /> : <Briefcase size={24} />}
                   </div>
                   <div className="bg-amber-50 text-amber-600 border border-amber-100 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">
                      Under Review
                   </div>
                </div>

                <h3 className="text-2xl font-black text-typography tracking-tight mb-2">{r.name}</h3>
                <p className="text-[10px] font-black text-secondary/30 uppercase tracking-[0.2em] mb-8">{r.role} Claim</p>
                
                <div className="grid grid-cols-2 gap-6 pt-6 border-t border-gray-50 mb-8">
                   <div className="col-span-2">
                      <p className="text-sm font-black text-typography">{r.college}</p>
                      <span className="text-[9px] font-black text-secondary/40 uppercase tracking-widest">Institution</span>
                   </div>
                   <div>
                      <p className="text-sm font-black text-typography">{r.graduation_year}</p>
                      <span className="text-[9px] font-black text-secondary/40 uppercase tracking-widest">Year</span>
                   </div>
                   <div>
                      <p className="text-[10px] font-bold text-primary italic truncate underline decoration-primary/20 decoration-2 underline-offset-4 cursor-pointer">{r.evidence}</p>
                      <span className="text-[9px] font-black text-secondary/40 uppercase tracking-widest">Evidence Link</span>
                   </div>
                </div>

                <div className="flex items-center space-x-3">
                   <button onClick={() => alert("Badge Approved")} className="flex-1 py-4 bg-emerald-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-emerald-500/20 flex items-center justify-center space-x-2">
                      <CheckCircle2 size={16} /><span>Verify Identity</span>
                   </button>
                   <button onClick={() => alert("Evidence Modal Opened")} className="px-6 py-4 bg-gray-50 text-secondary/40 hover:text-primary rounded-2xl transition-all">
                      <Eye size={18} />
                   </button>
                   <button onClick={() => alert("Claim Rejected")} className="px-6 py-4 bg-red-50 border border-red-100 text-red-500 hover:bg-red-500 hover:text-white rounded-2xl transition-all">
                      <XCircle size={18} />
                   </button>
                </div>
             </div>
           ))}
        </div>
      )}

      {filter === "ACTIVE_BADGES" && (
        <div className="bg-white rounded-2xl border border-gray-50 shadow-sm overflow-hidden p-6">
           <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
               <h3 className="text-xl font-black text-typography uppercase tracking-tight">Active Matrix</h3>
               <span className="bg-gray-50 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-secondary/40">{approved.length} Master Badges</span>
           </div>

           <div className="space-y-4">
              {approved.map(b => (
                 <div key={b.id} className="flex items-center justify-between p-6 bg-gray-50/50 rounded-3xl border border-gray-100 hover:border-primary/20 transition-all group">
                    <div className="flex items-center space-x-6">
                       <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                          <BadgeCheck size={20} className="fill-emerald-50 text-emerald-500" />
                       </div>
                       <div>
                          <h4 className="text-sm font-black text-typography">{b.name}</h4>
                          <div className="flex items-center space-x-2 mt-1">
                             <span className={cn(
                               "text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded border",
                               b.role === 'Alumni' ? "bg-sky-50 text-sky-600 border-sky-100" : "bg-primary/5 text-primary border-primary/10"
                             )}>{b.role}</span>
                             <span className="text-[10px] font-bold text-secondary/40 uppercase tracking-widest">{b.college}</span>
                          </div>
                       </div>
                    </div>
                    <div className="flex items-center space-x-6">
                       <div className="text-right">
                          <p className="text-[10px] font-black text-secondary/40 uppercase tracking-widest">Verified On</p>
                          <p className="text-xs font-bold text-typography mt-0.5">{b.date_verified}</p>
                       </div>
                       <button onClick={() => alert("Revoking Badge from user")} className="p-4 bg-white border border-gray-200 text-secondary/40 hover:text-red-500 hover:border-red-500/30 transition-all rounded-2xl opacity-0 group-hover:opacity-100">
                          <AlertTriangle size={16} />
                       </button>
                    </div>
                 </div>
              ))}
           </div>
        </div>
      )}
    </div>
  );
}
