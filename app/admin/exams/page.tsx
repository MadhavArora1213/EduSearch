"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { 
  FileText, 
  Plus, 
  Search, 
  Calendar, 
  Globe, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  TrendingUp, 
  ChevronRight,
  Download,
  Filter,
  MoreVertical,
  Link2,
  ListFilter
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Exam {
  id: string;
  name: string;
  full_name: string | null;
  level: string;
  mode: string | null;
  exam_date: string | null;
  _count: {
    cutoffs: number;
    courses: number;
  }
}

export default function ExamsListingPage() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/exams");
      const data = await res.json();
      setExams(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const filteredExams = exams.filter(e => {
    const matchesSearch = e.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         (e.full_name?.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesLevel = selectedLevel === "All Levels" || e.level === selectedLevel.toUpperCase();
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="space-y-10 font-montserrat">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-6 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-2">
              <div className="bg-primary/5 px-3 py-1.5 rounded-xl border border-primary/10">
                 <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Entrance Intel</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30">Master Exam Database</span>
           </div>
           <h1 className="text-3xl md:text-5xl font-black text-typography tracking-tighter leading-none mb-1">
             Entrance <span className="text-primary italic">Intelligence</span>
           </h1>
           <p className="text-secondary/40 text-sm font-bold uppercase tracking-[0.2em] mt-2">
              Managing 350+ National & State Exams
           </p>
        </div>

        <div className="flex items-center space-x-4">
           <button onClick={() => {
              const fileInput = document.createElement('input');
              fileInput.type = 'file';
              fileInput.accept = '.csv';
              fileInput.onchange = e => {
                 if ((e.target as HTMLInputElement).files?.length) {
                    alert('Cutoff CSV successfully uploaded and queued for processing! (Simulated)');
                 }
              };
              fileInput.click();
           }} className="flex items-center space-x-2 px-6 py-4 bg-gray-50 border border-gray-200/50 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-white hover:border-gray-200 transition-all active:scale-95 text-secondary/60">
              <Download size={16} />
              <span>Import Cutoffs</span>
           </button>
           <button onClick={() => alert('Opening Exam Registration Wizard...')} className="flex items-center space-x-3 px-8 py-4 bg-primary text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20">
              <Plus size={18} />
              <span>Register Exam</span>
           </button>
        </div>
      </section>

      {/* Grid of Exams */}
      <section className="grid grid-cols-12 gap-8 lg:gap-10">
         {/* Filter Card */}
         <div className="col-span-12 lg:col-span-3 space-y-6">
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-50 shadow-sm sticky top-28">
               <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary/40 mb-8 flex items-center space-x-3">
                  <ListFilter size={16} />
                  <span>Advanced Filters</span>
               </h3>
               
               <div className="space-y-8">
                  <div className="space-y-4">
                     <label className="text-[9px] font-black uppercase tracking-widest text-secondary/30">Exam Level</label>
                     <div className="flex flex-col space-y-2">
                        {["All Levels", "National", "State"].map((lvl) => (
                           <button 
                             key={lvl}
                             onClick={() => setSelectedLevel(lvl)}
                             className={cn(
                               "w-full px-5 py-3.5 rounded-xl text-left text-xs font-black uppercase tracking-widest transition-all",
                               selectedLevel === lvl 
                                 ? "bg-primary text-white shadow-lg shadow-primary/20" 
                                 : "bg-gray-50 text-secondary/40 hover:bg-white hover:text-primary hover:shadow-md"
                             )}
                           >
                              {lvl}
                           </button>
                        ))}
                     </div>
                  </div>

                  <div className="pt-8 border-t border-gray-50 space-y-4">
                     <label className="text-[9px] font-black uppercase tracking-widest text-secondary/30">Current Status</label>
                     <div className="space-y-4">
                        {["Active", "Completed", "Results Declared"].map((s) => (
                          <label key={s} className="flex items-center space-x-3 cursor-pointer group">
                             <div className="w-5 h-5 rounded-lg border-2 border-gray-100 group-hover:border-primary/30 transition-all flex items-center justify-center bg-gray-50">
                                <div className="w-2 h-2 rounded-sm bg-primary opacity-0 group-hover:opacity-20 transition-opacity" />
                             </div>
                             <span className="text-[11px] font-bold text-secondary/40 group-hover:text-typography transition-colors uppercase tracking-wider">{s}</span>
                          </label>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Content Area */}
         <div className="col-span-12 lg:col-span-9 space-y-8">
            <div className="relative group text-typography">
               <Search size={20} className="absolute left-7 top-1/2 -translate-y-1/2 text-secondary/20 group-focus-within:text-primary transition-colors" />
               <input 
                 placeholder="Search Exams, Full Names or Levels..." 
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 className="w-full bg-white border border-transparent pl-16 pr-8 py-5 rounded-[2rem] text-[15px] font-bold outline-none focus:ring-4 focus:ring-primary/5 shadow-xl shadow-black/[0.02] transition-all placeholder:text-secondary/20"
               />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {loading ? [...Array(4)].map((_, i) => (
                <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-gray-50 animate-pulse h-[350px]" />
              )) : filteredExams.map((exam) => (
                <div key={exam.id} className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-black/5 transition-all group overflow-hidden relative flex flex-col justify-between">
                   {/* Decorative elements */}
                   <div className="absolute -right-12 -top-12 w-48 h-48 bg-primary/5 rounded-full group-hover:scale-125 transition-transform duration-1000 blur-2xl" />
                   
                   <div>
                     <div className="flex justify-between items-start mb-8 relative z-10">
                        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-100 group-hover:scale-110 group-hover:rotate-3 transition-all">
                           <span className="text-2xl font-black text-primary italic">{exam.name[0]}</span>
                        </div>
                        <div className={cn(
                          "px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border",
                          exam.level === 'NATIONAL' 
                            ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
                            : "bg-blue-50 text-blue-600 border-blue-100"
                        )}>
                          {exam.level}
                        </div>
                     </div>

                     <h3 className="text-2xl font-black text-typography tracking-tighter mb-1 mt-2 group-hover:text-primary transition-colors">{exam.name}</h3>
                     <p className="text-secondary/40 text-[10px] font-black uppercase tracking-[0.1em] mb-10 truncate border-l-2 border-primary/10 pl-3 leading-none">{exam.full_name || "Official Examination Authority"}</p>
                     
                     <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-50">
                        <div>
                           <p className="text-xl font-black text-typography leading-none">{exam._count.cutoffs}</p>
                           <div className="flex items-center space-x-1.5 mt-2 text-[9px] font-black text-secondary/30 uppercase tracking-widest">
                              <TrendingUp size={12} className="text-emerald-500" />
                              <span>Cutoffs</span>
                           </div>
                        </div>
                        <div className="border-x border-gray-50 px-4">
                           <p className="text-xl font-black text-typography leading-none">{exam._count.courses}</p>
                           <div className="flex items-center space-x-1.5 mt-2 text-[9px] font-black text-secondary/30 uppercase tracking-widest">
                              <Link2 size={12} className="text-blue-500" />
                              <span>Courses</span>
                           </div>
                        </div>
                        <div className="pl-2">
                           <p className="text-[11px] font-black text-typography uppercase tracking-tighter leading-none">
                              {exam.exam_date ? new Date(exam.exam_date).toLocaleDateString('en-US', { day: '2-digit', month: 'short' }) : "TBA"}
                           </p>
                           <div className="flex items-center space-x-1.5 mt-2 text-[9px] font-black text-secondary/30 uppercase tracking-widest">
                              <Calendar size={12} className="text-amber-500" />
                              <span>Date</span>
                           </div>
                        </div>
                     </div>
                   </div>

                   <div className="mt-10 flex items-center space-x-3 relative z-10">
                      <button onClick={() => alert(`Opening Advanced Rank Predictor... for: ${exam.name}`)} className="flex-1 py-4.5 bg-gray-50 text-secondary/60 text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-primary hover:text-white hover:shadow-xl hover:shadow-primary/20 transition-all active:scale-95 border border-transparent hover:border-white/10">
                         Manage Cutoffs
                      </button>
                      <button onClick={() => window.open(`/exams/${exam.id}`, '_blank')} title="View Public Page" className="w-14 h-14 bg-gray-50 text-secondary/30 rounded-2xl flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all active:scale-95 border border-transparent shadow-sm">
                         <ExternalLink size={16} />
                      </button>
                   </div>
                </div>
              ))}
            </div>
         </div>
      </section>
    </div>
  );
}
