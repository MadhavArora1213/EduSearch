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
    <div className="space-y-6 font-montserrat">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-4 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-1.5">
              <div className="bg-primary/5 px-3 py-1.5 rounded-xl border border-primary/10">
                 <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Entrance Intel</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30 uppercase tracking-widest text-[10px]">Master Registry</span>
           </div>
           <h1 className="text-3xl md:text-4xl font-black text-typography tracking-tighter leading-none mb-1">
             Entrance <span className="text-primary italic">Intelligence</span>
           </h1>
           <p className="text-secondary/40 text-[10px] font-black uppercase tracking-[0.2em] mt-1.5 leading-none">
              Managing 350+ National & State Exams from Database Cluster
           </p>
        </div>
 
        <div className="flex items-center space-x-3">
           <button onClick={() => alert('Import...')} className="flex items-center space-x-2 px-6 py-2.5 bg-white border border-gray-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:text-primary transition-all shadow-sm">
              <Download size={14} />
              <span>Import Cutoffs</span>
           </button>
           <button onClick={() => alert('Add Exam...')} className="flex items-center space-x-2 px-6 py-2.5 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-primary/20">
              <Plus size={16} />
              <span>Register Exam</span>
           </button>
        </div>
      </section>

      {/* Grid of Exams */}
      <section className="grid grid-cols-12 gap-4">
         {/* Filter Card */}
         <div className="col-span-12 lg:col-span-3">
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm sticky top-28">
               <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-secondary/30 mb-4 flex items-center space-x-2">
                  <ListFilter size={12} />
                  <span>Filters</span>
               </h3>
               
               <div className="space-y-4">
                  <div className="space-y-2">
                     <label className="text-[8px] font-black uppercase tracking-widest text-secondary/20">Exam Level</label>
                     <div className="flex flex-col space-y-1">
                        {["All Levels", "National", "State"].map((lvl) => (
                           <button 
                             key={lvl}
                             onClick={() => setSelectedLevel(lvl)}
                             className={cn(
                               "w-full px-3 py-2 rounded-lg text-left text-[10px] font-black uppercase tracking-widest transition-all",
                               selectedLevel === lvl 
                                 ? "bg-primary text-white shadow-md shadow-primary/10" 
                                 : "bg-gray-50 text-secondary/40 hover:bg-white hover:text-primary"
                             )}
                           >
                              {lvl}
                           </button>
                        ))}
                     </div>
                  </div>
 
                  <div className="pt-4 border-t border-gray-100 space-y-2">
                     <label className="text-[8px] font-black uppercase tracking-widest text-secondary/20">Status</label>
                     <div className="space-y-2">
                        {["Active", "Completed", "Results"].map((s) => (
                          <label key={s} className="flex items-center space-x-2 cursor-pointer group">
                             <div className="w-4 h-4 rounded border border-gray-200 group-hover:border-primary/30 transition-all flex items-center justify-center bg-gray-50">
                                <div className="w-1.5 h-1.5 rounded-sm bg-primary opacity-0 group-hover:opacity-20 transition-opacity" />
                             </div>
                             <span className="text-[10px] font-bold text-secondary/30 group-hover:text-typography transition-colors uppercase tracking-wider">{s}</span>
                          </label>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Content Area */}
         <div className="col-span-12 lg:col-span-9 space-y-4">
            <div className="relative group">
               <Search size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-secondary/20 group-focus-within:text-primary transition-colors" />
               <input 
                 placeholder="Search registry cluster..." 
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 className="w-full bg-white border border-gray-100 pl-10 pr-4 py-2 rounded-xl text-[12px] font-bold outline-none focus:ring-4 focus:ring-primary/5 shadow-sm transition-all"
               />
            </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {loading ? [...Array(4)].map((_, i) => (
                 <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 animate-pulse h-[200px]" />
               )) : filteredExams.map((exam) => (
                 <div key={exam.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all group overflow-hidden relative flex flex-col justify-between">
                    <div className="absolute -right-6 -top-6 w-24 h-24 bg-primary/5 rounded-full group-hover:scale-125 transition-transform duration-1000 blur-xl" />
                    
                    <div>
                      <div className="flex justify-between items-start mb-4 relative z-10">
                         <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                            <span className="text-lg font-black italic">{exam.name[0]}</span>
                         </div>
                         <div className={cn(
                           "px-2 py-1 rounded-full text-[7px] font-black uppercase tracking-[0.2em] border",
                           exam.level === 'NATIONAL' 
                             ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
                             : "bg-blue-50 text-blue-600 border-blue-100"
                         )}>
                           {exam.level}
                         </div>
                      </div>
 
                      <h3 className="text-lg font-black text-typography tracking-tighter mb-1.5 group-hover:text-primary transition-colors">{exam.name}</h3>
                      <p className="text-secondary/30 text-[8px] font-black uppercase tracking-[0.1em] truncate border-l border-primary/20 pl-2 leading-none">{exam.full_name || "Official Examination Authority"}</p>
                      
                      <div className="grid grid-cols-3 gap-1 pt-4 border-t border-gray-100 mt-4">
                         <div>
                            <p className="text-sm font-black text-typography leading-none">{exam._count.cutoffs}</p>
                            <p className="text-[7px] font-black text-secondary/30 uppercase tracking-[0.1em] mt-1.5">Cutoffs</p>
                         </div>
                         <div className="border-x border-gray-100 px-3">
                            <p className="text-sm font-black text-typography leading-none">{exam._count.courses}</p>
                            <p className="text-[7px] font-black text-secondary/30 uppercase tracking-[0.1em] mt-1.5">Units</p>
                         </div>
                         <div className="pl-3">
                            <p className="text-[9px] font-black text-typography uppercase tracking-tight leading-none">
                               {exam.exam_date ? new Date(exam.exam_date).toLocaleDateString('en-US', { day: '2-digit', month: 'short' }) : "TBA"}
                            </p>
                            <p className="text-[7px] font-black text-secondary/30 uppercase tracking-[0.1em] mt-1.5">Date</p>
                         </div>
                      </div>
                    </div>
 
                    <div className="mt-6 flex items-center space-x-1.5 relative z-10">
                       <button onClick={() => alert(`Manage: ${exam.name}`)} className="flex-1 py-2 bg-gray-50 text-secondary/40 text-[8px] font-black uppercase tracking-widest rounded-lg hover:bg-primary hover:text-white transition-all shadow-sm border border-transparent">
                          Manage Cutoffs
                       </button>
                       <button onClick={() => window.open(`/exams/${exam.id}`, '_blank')} className="w-8 h-8 bg-gray-50 text-secondary/30 rounded-lg flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all shadow-sm">
                          <ExternalLink size={12} />
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
