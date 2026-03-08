"use client";

import { useState } from "react";
import { 
  MessageCircleQuestion, 
  Plus, 
  Search, 
  ChevronRight,
  ShieldCheck,
  Flag,
  CheckCircle2,
  XCircle,
  ThumbsUp,
  Pin,
  Edit2,
  Trash2,
  AlertTriangle,
  UserCheck
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function QnAModerationPage() {
  const [filter, setFilter] = useState("PENDING");

  const [questions] = useState([
    { id: "Q-1", text: "What is the exact hostel fee for boys including mess per year at IIT B?", asker: "Rahul S.", role: "Student", college: "IIT Bombay", date: "2 hrs ago", reports: 0, status: "PENDING" },
    { id: "Q-2", text: "Is the placement cell fake? Heard 100% placement is a scam here. Call me +91 99999...", asker: "Anonymous", role: "Unverified", college: "LPU Jalandhar", date: "5 hrs ago", reports: 12, status: "REPORTED" },
  ]);

  const [answers] = useState([
    { id: "A-1", text: "The hostel fee is exactly ₹45,000 per semester. Mess is billed separately at ₹22,000/sem.", answerer: "Dr. Vinay K.", role: "Verified Faculty", college: "IIT Bombay", question: "What is the exact hostel fee for boys...", date: "15 mins ago", status: "PENDING" },
  ]);

  return (
    <div className="space-y-6 font-montserrat pb-10">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-4 md:space-y-0 pb-4 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-1.5">
              <div className="bg-primary/5 px-2.5 py-1 rounded-lg border border-primary/10">
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary">Community Intel</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30 uppercase tracking-widest text-[10px]">Forum Sentry</span>
           </div>
           <h1 className="text-3xl font-black text-typography tracking-tighter leading-none mb-1">
             Forum <span className="text-primary italic">Overwatch</span>
           </h1>
           <p className="text-secondary/40 text-[10px] font-black uppercase tracking-[0.2em] mt-1.5 leading-none">
              Screening College-Specific Q&A and Reports
           </p>
        </div>

        <div className="flex items-center space-x-3">
           <div className="bg-red-50 px-4 py-2.5 rounded-xl border border-red-100 flex items-center space-x-2 shadow-sm">
              <Flag size={14} className="text-red-500" />
              <div className="text-[10px] font-black uppercase tracking-widest text-red-700">
                 12 Reports
              </div>
           </div>
        </div>
      </section>

      {/* Filters */}
      <section className="flex items-center justify-between gap-4 bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
         <div className="flex items-center space-x-1.5 bg-gray-50 p-1 rounded-lg border border-gray-100">
            {["PENDING", "REPORTED", "FEATURED"].map((f) => (
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
                {f}
              </button>
            ))}
         </div>

         <div className="flex items-center space-x-3">
            <div className="relative w-64">
               <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/20" />
               <input placeholder="Search forum records..." className="w-full bg-gray-50 border-0 pl-10 pr-4 py-2 rounded-lg text-xs font-bold outline-none ring-1 ring-gray-100 focus:ring-primary/10 transition-all font-montserrat" />
            </div>
         </div>
      </section>

      <div className="grid grid-cols-12 gap-4">
         <div className="col-span-12 lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-100">
               <h3 className="text-xs font-black text-typography uppercase tracking-widest">Inbound Questions</h3>
               <span className="bg-gray-50 px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-widest text-secondary/40 border border-gray-100">{questions.length} Queued</span>
            </div>

            <div className="grid grid-cols-1 gap-4">
               {questions.map((q) => (
                 <div key={q.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all group relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -translate-y-12 translate-x-12 group-hover:scale-150 transition-all duration-700" />
                    
                    <div className="flex items-start justify-between mb-4 relative z-10">
                       <div className="flex items-center space-x-3">
                          <div className={cn(
                            "w-9 h-9 rounded-lg flex items-center justify-center text-white shadow-sm",
                            q.status === 'REPORTED' ? "bg-red-500" : "bg-primary"
                          )}>
                             {q.status === 'REPORTED' ? <Flag size={14} /> : <MessageCircleQuestion size={14} />}
                          </div>
                          <div>
                             <h4 className="text-[10px] font-black text-typography uppercase tracking-tight">{q.asker}</h4>
                             <p className={cn(
                               "text-[8px] font-black uppercase tracking-widest mt-1",
                               q.role === 'Unverified' ? "text-amber-500" : "text-emerald-600 flex items-center"
                             )}>
                               {q.role} {q.role !== 'Unverified' && <CheckCircle2 size={10} className="ml-1" />}
                             </p>
                          </div>
                       </div>
                       <div className="text-right">
                          <p className="text-[9px] font-black text-secondary/30 uppercase tracking-widest leading-none">{q.college}</p>
                          <p className="text-[8px] font-bold text-secondary/20 mt-1 uppercase leading-none">{q.date}</p>
                       </div>
                    </div>

                    <p className="text-sm font-bold text-typography leading-relaxed relative z-10 line-clamp-3">{q.text}</p>
                    
                    {q.reports > 0 && (
                      <div className="mt-3 p-2.5 bg-red-50 border border-red-100 rounded-lg flex items-center space-x-2 text-[8px] font-black text-red-600 uppercase tracking-widest shadow-sm">
                         <AlertTriangle size={12} />
                         <span>Flagged {q.reports} Times</span>
                      </div>
                    )}

                    <div className="flex items-center space-x-2 mt-6">
                       <button onClick={() => alert("Approved")} className="flex-1 py-2.5 bg-emerald-600 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center space-x-1.5 shadow-md shadow-emerald-500/10">
                          <CheckCircle2 size={14} /><span>Approve</span>
                       </button>
                       <button onClick={() => alert("Edit")} className="w-10 h-10 bg-gray-50 text-secondary/40 rounded-xl hover:text-primary transition-all flex items-center justify-center border border-gray-100 shadow-sm">
                          <Edit2 size={14} />
                       </button>
                       <button onClick={() => alert("Delete")} className="w-10 h-10 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all border border-red-100 flex items-center justify-center shadow-sm">
                          <Trash2 size={14} />
                       </button>
                    </div>
                 </div>
               ))}
            </div>
         </div>

         <div className="col-span-12 lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-100">
               <h3 className="text-xs font-black text-typography uppercase tracking-widest">Inbound Answers</h3>
               <span className="bg-gray-50 px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-widest text-secondary/40 border border-gray-100">{answers.length} Queued</span>
            </div>

            <div className="grid grid-cols-1 gap-4">
               {answers.map((a) => (
                 <div key={a.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-emerald-500/5 transition-all group relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-full -translate-y-12 translate-x-12 group-hover:scale-150 transition-all duration-700" />
                    
                    <div className="flex items-start justify-between mb-4 relative z-10">
                       <div className="flex items-center space-x-3">
                          <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-sm">
                             <UserCheck size={14} />
                          </div>
                          <div>
                             <h4 className="text-[10px] font-black text-typography uppercase tracking-tight">{a.answerer}</h4>
                             <p className="text-[8px] font-black text-emerald-600 uppercase tracking-widest mt-1 flex items-center">
                               {a.role} <CheckCircle2 size={10} className="ml-1" />
                             </p>
                          </div>
                       </div>
                       <div className="text-right">
                          <p className="text-[9px] font-black text-secondary/30 uppercase tracking-widest leading-none">{a.college}</p>
                          <p className="text-[8px] font-bold text-secondary/20 mt-1 uppercase leading-none">{a.date}</p>
                       </div>
                    </div>

                    <div className="p-3 bg-gray-50 rounded-lg mb-3 border border-gray-100 shadow-inner">
                       <p className="text-[8px] font-black text-secondary/20 uppercase tracking-[0.15em] mb-1">REFERENCE NODE</p>
                       <p className="text-[10px] font-bold text-secondary/50 italic line-clamp-1">{a.question}</p>
                    </div>

                    <p className="text-sm font-bold text-emerald-900 leading-relaxed relative z-10 line-clamp-3">{a.text}</p>
                    
                    <div className="flex items-center space-x-2 mt-6">
                       <button onClick={() => alert("Approved")} className="flex-1 py-2.5 bg-emerald-600 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center space-x-1.5 shadow-md shadow-emerald-500/10">
                          <CheckCircle2 size={14} /><span>Approve</span>
                       </button>
                       <button onClick={() => alert("Pin")} className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl hover:bg-amber-500 hover:text-white transition-all border border-amber-100 flex items-center justify-center shadow-sm">
                          <Pin size={14} />
                       </button>
                       <button onClick={() => alert("Delete")} className="w-10 h-10 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all border border-red-100 flex items-center justify-center shadow-sm">
                          <Trash2 size={14} />
                       </button>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
}
