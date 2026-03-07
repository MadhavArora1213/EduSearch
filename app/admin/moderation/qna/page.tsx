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
    <div className="space-y-10 pb-20">
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-6 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-2">
              <div className="bg-primary/5 px-3 py-1.5 rounded-xl border border-primary/10">
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary">Community Intel</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30">Q&A Moderation</span>
           </div>
           <h1 className="text-5xl font-black text-typography tracking-tighter leading-none mb-1">
             Forum <span className="text-primary italic">Overwatch</span>
           </h1>
           <p className="text-secondary/40 text-sm font-bold uppercase tracking-widest mt-2">
              Screening College-Specific Q&A and Reports
           </p>
        </div>

        <div className="flex items-center space-x-4">
           <div className="bg-red-50 px-6 py-4 rounded-2xl border border-red-100 flex items-center space-x-3">
              <Flag size={18} className="text-red-500" />
              <div className="text-[11px] font-black uppercase tracking-widest text-red-700">
                 12 Reported Posts
              </div>
           </div>
        </div>
      </section>

      <section className="flex items-center justify-between gap-6 bg-white p-6 rounded-[2.5rem] border border-gray-50 shadow-sm">
         <div className="flex items-center space-x-2 bg-gray-50 p-1.5 rounded-2xl border border-gray-100 w-full md:w-auto">
            {["PENDING", "REPORTED", "FEATURED"].map((f) => (
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
                {f}
              </button>
            ))}
         </div>

         <div className="flex items-center space-x-4">
            <div className="relative w-80">
               <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-secondary/20" />
               <input placeholder="Search questions/answers..." className="w-full bg-gray-50 border-0 pl-14 pr-6 py-3.5 rounded-2xl text-[13px] font-bold outline-none ring-1 ring-gray-100 focus:ring-primary/10 transition-all" />
            </div>
         </div>
      </section>

      <div className="grid grid-cols-12 gap-10">
         <div className="col-span-12 lg:col-span-6 space-y-6">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
               <h3 className="text-xl font-black text-typography uppercase tracking-tight">Pending Questions</h3>
               <span className="bg-gray-50 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-secondary/40">{questions.length} Queued</span>
            </div>

            <div className="space-y-6">
               {questions.map((q) => (
                 <div key={q.id} className="bg-white p-8 rounded-[2.5rem] border border-gray-100/50 shadow-sm hover:border-primary/20 transition-all group relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-all duration-700" />
                    
                    <div className="flex items-start justify-between mb-6 relative">
                       <div className="flex items-center space-x-3">
                          <div className={cn(
                            "w-10 h-10 rounded-xl flex items-center justify-center text-white",
                            q.status === 'REPORTED' ? "bg-red-500" : "bg-primary"
                          )}>
                             {q.status === 'REPORTED' ? <Flag size={16} /> : <MessageCircleQuestion size={16} />}
                          </div>
                          <div>
                             <h4 className="text-[11px] font-black text-typography uppercase tracking-widest">{q.asker}</h4>
                             <p className={cn(
                               "text-[9px] font-bold uppercase tracking-widest mt-0.5",
                               q.role === 'Unverified' ? "text-amber-500" : "text-emerald-500 flex items-center"
                             )}>
                               {q.role} {q.role !== 'Unverified' && <CheckCircle2 size={10} className="ml-1" />}
                             </p>
                          </div>
                       </div>
                       <div className="text-right">
                          <p className="text-[10px] font-black text-secondary/40 uppercase tracking-widest">{q.college}</p>
                          <p className="text-[9px] font-bold text-secondary/30 mt-0.5">{q.date}</p>
                       </div>
                    </div>

                    <p className="text-sm font-bold text-typography leading-relaxed relative z-10">{q.text}</p>
                    
                    {q.reports > 0 && (
                      <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-xl flex items-center space-x-2 text-[10px] font-black text-red-600 uppercase tracking-widest">
                         <AlertTriangle size={14} />
                         <span>Flagged {q.reports} Times by Community</span>
                      </div>
                    )}

                    <div className="flex items-center space-x-2 mt-8">
                       <button onClick={() => alert("Question Approved")} className="flex-1 py-3 bg-emerald-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/20">
                          <CheckCircle2 size={14} /><span>Approve</span>
                       </button>
                       <button onClick={() => alert("Edit Modal Opened")} className="px-5 py-3 bg-gray-50 text-secondary/40 rounded-xl hover:bg-gray-100 hover:text-secondary transition-all">
                          <Edit2 size={14} />
                       </button>
                       <button onClick={() => alert("Question Rejected & Deleted")} className="px-5 py-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 hover:text-red-600 transition-all border border-red-100">
                          <Trash2 size={14} />
                       </button>
                    </div>
                 </div>
               ))}
            </div>
         </div>

         <div className="col-span-12 lg:col-span-6 space-y-6">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
               <h3 className="text-xl font-black text-typography uppercase tracking-tight">Pending Answers</h3>
               <span className="bg-gray-50 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-secondary/40">{answers.length} Queued</span>
            </div>

            <div className="space-y-6">
               {answers.map((a) => (
                 <div key={a.id} className="bg-white p-8 rounded-[2.5rem] border border-gray-100/50 shadow-sm hover:border-emerald-500/20 transition-all group relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-all duration-700" />
                    
                    <div className="flex items-start justify-between mb-6 relative">
                       <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-emerald-50 text-emerald-500 border border-emerald-100">
                             <UserCheck size={16} />
                          </div>
                          <div>
                             <h4 className="text-[11px] font-black text-typography uppercase tracking-widest">{a.answerer}</h4>
                             <p className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest mt-0.5 flex items-center">
                               {a.role} <CheckCircle2 size={10} className="ml-1" />
                             </p>
                          </div>
                       </div>
                       <div className="text-right">
                          <p className="text-[10px] font-black text-secondary/40 uppercase tracking-widest">{a.college}</p>
                          <p className="text-[9px] font-bold text-secondary/30 mt-0.5">{a.date}</p>
                       </div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-2xl mb-4 border border-gray-100">
                       <p className="text-[10px] font-black text-secondary/30 uppercase tracking-widest mb-1">Replying to Q:</p>
                       <p className="text-xs font-bold text-secondary/60 italic line-clamp-1">{a.question}</p>
                    </div>

                    <p className="text-sm font-bold text-emerald-900 leading-relaxed relative z-10">{a.text}</p>
                    
                    <div className="flex items-center space-x-2 mt-8">
                       <button onClick={() => alert("Answer Approved")} className="flex-1 py-3 bg-emerald-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/20">
                          <CheckCircle2 size={14} /><span>Approve</span>
                       </button>
                       <button onClick={() => alert("Answer Pinned as Featured")} className="px-5 py-3 bg-[#FFD700]/10 text-[#FFD700] rounded-xl hover:bg-[#FFD700]/20 transition-all border border-[#FFD700]/20 flex items-center justify-center space-x-2 font-black text-[10px] uppercase tracking-widest">
                          <Pin size={14} />
                       </button>
                       <button onClick={() => alert("Answer Rejected")} className="px-5 py-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 hover:text-red-600 transition-all border border-red-100">
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
