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
    <div className="space-y-6 font-montserrat pb-10">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-4 md:space-y-0 pb-4 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-1.5">
              <div className="bg-primary/5 px-2.5 py-1 rounded-lg border border-primary/10">
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary">Identity Engine</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30 uppercase tracking-widest text-[10px]">Verification Desk</span>
           </div>
           <h1 className="text-3xl font-black text-typography tracking-tighter leading-none mb-1">
             Trust & <span className="text-primary italic">Safety</span>
           </h1>
           <p className="text-secondary/40 text-[10px] font-black uppercase tracking-[0.2em] mt-1.5 leading-none">
              Auditing Alumni & Faculty Claim Requests
           </p>
        </div>

        <div className="flex items-center space-x-3">
           <div className="bg-blue-50 px-4 py-2.5 rounded-xl border border-blue-100 flex items-center space-x-2 shadow-sm">
              <ShieldAlert size={14} className="text-blue-500" />
              <div className="text-[10px] font-black uppercase tracking-widest text-blue-700">
                 {requests.length} Pending
              </div>
           </div>
        </div>
      </section>

      {/* Filters */}
      <section className="flex items-center justify-between gap-4 bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
         <div className="flex items-center space-x-1.5 bg-gray-50 p-1 rounded-lg border border-gray-100">
            {["PENDING", "ACTIVE_BADGES", "REVOKED"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "px-5 py-2 rounded-md text-[9px] font-black uppercase tracking-widest transition-all",
                  filter === f 
                    ? "bg-white text-primary shadow-sm ring-1 ring-gray-100" 
                    : "text-secondary/40 hover:text-secondary"
                )}
              >
                {f.replace("_", " ")}
              </button>
            ))}
         </div>

         <div className="flex items-center space-x-3">
            <div className="relative w-64">
               <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/20" />
               <input placeholder="Search identity..." className="w-full bg-gray-50 border-0 pl-10 pr-4 py-2 rounded-lg text-xs font-bold outline-none ring-1 ring-gray-100 focus:ring-primary/10 transition-all font-montserrat" />
            </div>
         </div>
      </section>

      {filter === "PENDING" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           {requests.map((r) => (
             <div key={r.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all group overflow-hidden relative">
                <div className="absolute -right-6 -top-6 w-24 h-24 bg-primary/5 rounded-full group-hover:scale-150 transition-transform duration-700" />
                
                <div className="flex justify-between items-start mb-6 relative z-10">
                   <div className={cn(
                     "w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg",
                     r.role === 'Alumni' ? "bg-sky-500 shadow-sky-500/10" : "bg-emerald-500 shadow-emerald-500/10"
                   )}>
                      {r.role === 'Alumni' ? <GraduationCap size={18} /> : <Briefcase size={18} />}
                   </div>
                   <div className="bg-amber-50 text-amber-600 border border-amber-100 px-2.5 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest">
                      In Queue
                   </div>
                </div>

                <div className="relative z-10">
                   <h3 className="text-xl font-black text-typography tracking-tight uppercase mb-0.5">{r.name}</h3>
                   <p className="text-[9px] font-black text-secondary/30 uppercase tracking-[0.2em] mb-6">{r.role} Request</p>
                   
                   <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-50 mb-6">
                      <div className="col-span-2">
                         <p className="text-xs font-black text-typography truncate">{r.college}</p>
                         <span className="text-[8px] font-black text-secondary/40 uppercase tracking-widest">Target Institute</span>
                      </div>
                      <div>
                         <p className="text-[10px] font-black text-typography">{r.graduation_year}</p>
                         <span className="text-[8px] font-black text-secondary/40 uppercase tracking-widest">Rel. Year</span>
                      </div>
                      <div className="max-w-full overflow-hidden">
                         <p className="text-[10px] font-bold text-primary truncate underline decoration-primary/20 decoration-2 underline-offset-4 cursor-pointer">{r.evidence}</p>
                         <span className="text-[8px] font-black text-secondary/40 uppercase tracking-widest">Evidence Node</span>
                      </div>
                   </div>

                   <div className="flex items-center space-x-2">
                      <button onClick={() => alert("Verified")} className="flex-1 py-2.5 bg-emerald-600 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-md shadow-emerald-600/10 flex items-center justify-center space-x-1.5">
                         <CheckCircle2 size={14} /><span>Approve</span>
                      </button>
                      <button onClick={() => alert("Detail View")} className="w-10 h-10 bg-gray-50 text-secondary/40 hover:text-primary rounded-xl flex items-center justify-center border border-gray-100 transition-all">
                         <Eye size={16} />
                      </button>
                      <button onClick={() => alert("Reject")} className="w-10 h-10 bg-red-50 border border-red-100 text-red-500 hover:bg-red-500 hover:text-white rounded-xl flex items-center justify-center transition-all">
                         <XCircle size={16} />
                      </button>
                   </div>
                </div>
             </div>
           ))}
        </div>
      )}

      {filter === "ACTIVE_BADGES" && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden p-4">
           <div className="flex items-center justify-between mb-6 pb-3 border-b border-gray-100">
               <h3 className="text-xs font-black text-typography uppercase tracking-widest">Verified Directory</h3>
               <span className="bg-gray-50 px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-widest text-secondary/40 border border-gray-100">{approved.length} Active Nodes</span>
           </div>

           <div className="space-y-3">
              {approved.map(b => (
                 <div key={b.id} className="flex items-center justify-between p-3.5 bg-gray-50/50 rounded-xl border border-transparent hover:border-gray-100 hover:bg-white transition-all group">
                    <div className="flex items-center space-x-4">
                       <div className="w-9 h-9 bg-white rounded-lg shadow-sm border border-gray-100 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                          <BadgeCheck size={18} className="fill-emerald-50 text-emerald-500" />
                       </div>
                       <div>
                          <h4 className="text-xs font-black text-typography uppercase tracking-tight">{b.name}</h4>
                          <div className="flex items-center space-x-2 mt-0.5">
                             <span className={cn(
                               "text-[7px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded border leading-none",
                               b.role === 'Alumni' ? "bg-sky-50 text-sky-600 border-sky-100" : "bg-primary/5 text-primary border-primary/10"
                             )}>{b.role}</span>
                             <span className="text-[9px] font-bold text-secondary/30 uppercase tracking-[0.05em] leading-none">{b.college}</span>
                          </div>
                       </div>
                    </div>
                    <div className="flex items-center space-x-6">
                       <div className="text-right hidden sm:block">
                          <p className="text-[8px] font-black text-secondary/20 uppercase tracking-widest">Audit Date</p>
                          <p className="text-[10px] font-black text-typography leading-none mt-1">{b.date_verified}</p>
                       </div>
                       <button onClick={() => alert("Revoked")} className="w-8 h-8 bg-white border border-gray-100 text-secondary/20 hover:text-red-500 hover:border-red-100 transition-all rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 shadow-sm">
                          <AlertTriangle size={14} />
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
