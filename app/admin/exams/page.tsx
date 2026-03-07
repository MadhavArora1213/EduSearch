"use client";

import { useState, useEffect } from "react";
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

  const filteredExams = exams.filter(e => 
    e.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (e.full_name?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-10">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-6 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-2">
              <div className="bg-primary/5 px-3 py-1.5 rounded-xl border border-primary/10">
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary">Entrance Intel</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30">Master Exam Database</span>
           </div>
           <h1 className="text-5xl font-black text-typography tracking-tighter leading-none mb-1">
             Entrance <span className="text-primary italic">Intelligence</span>
           </h1>
           <p className="text-secondary/40 text-sm font-bold uppercase tracking-widest mt-2">
              Managing 350+ National & State Exams
           </p>
        </div>

        <div className="flex items-center space-x-4">
           <button className="flex items-center space-x-2 px-6 py-4 bg-gray-50 border border-gray-200/50 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-white hover:border-gray-200 transition-all active:scale-95 text-secondary/60">
              <Download size={16} />
              <span>Import Cutoffs (CSV)</span>
           </button>
           <button className="flex items-center space-x-8 px-10 py-4 bg-primary text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20">
              <Plus size={18} />
              <span>Register New Exam</span>
           </button>
        </div>
      </section>

      {/* Grid of Exams */}
      <section className="grid grid-cols-12 gap-8">
         {/* Filter Card */}
         <div className="col-span-12 lg:col-span-3 space-y-6">
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-50 shadow-sm sticky top-28">
               <h3 className="text-xs font-black uppercase tracking-widest text-secondary/40 mb-6 flex items-center space-x-3">
                  <ListFilter size={16} />
                  <span>Advanced Filters</span>
               </h3>
               <div className="space-y-4">
                  <div className="space-y-2">
                     <label className="text-[9px] font-black uppercase tracking-widest text-secondary/30">Level</label>
                     <select className="w-full bg-gray-50 border-0 p-4 rounded-xl text-xs font-bold outline-none ring-1 ring-gray-100">
                        <option>All Levels</option>
                        <option>National</option>
                        <option>State</option>
                     </select>
                  </div>
                  <div className="space-y-2 pt-4 border-t border-gray-50">
                     <label className="text-[9px] font-black uppercase tracking-widest text-secondary/30">Exam Status</label>
                     <div className="space-y-3 pt-2">
                        {["Active", "Completed", "Results Declared"].map((s) => (
                          <label key={s} className="flex items-center space-x-3 cursor-pointer group">
                             <div className="w-4 h-4 rounded border border-gray-200 group-hover:border-primary transition-colors" />
                             <span className="text-xs font-bold text-secondary/40 group-hover:text-secondary">{s}</span>
                          </label>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Content Area */}
         <div className="col-span-12 lg:col-span-9 space-y-6">
            <div className="relative group mb-10 text-typography">
               <Search size={22} className="absolute left-6 top-1/2 -translate-y-1/2 text-secondary/20 group-focus-within:text-primary transition-colors" />
               <input 
                 placeholder="Search Exams, Full Names or Levels..." 
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 className="w-full bg-white border border-gray-100 pl-16 pr-8 py-5 rounded-[2.5rem] text-[15px] font-bold outline-none focus:ring-4 focus:ring-primary/5 shadow-sm transition-all placeholder:text-secondary/20"
               />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {loading ? [...Array(4)].map((_, i) => (
                <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-gray-50 animate-pulse h-[300px]" />
              )) : filteredExams.map((exam) => (
                <div key={exam.id} className="bg-white p-10 rounded-[2.5rem] border border-gray-50 shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all group overflow-hidden relative">
                   {/* Gradient Micro-detail */}
                   <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/5 rounded-full group-hover:scale-150 transition-transform duration-700" />
                   
                   <div className="flex justify-between items-start mb-8 relative">
                      <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-100 group-hover:rotate-6 transition-all">
                         <span className="text-2xl font-black text-primary italic">{exam.name[0]}</span>
                      </div>
                      <div className={cn(
                        "px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest",
                        exam.level === 'NATIONAL' ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-blue-50 text-blue-600 border border-blue-100"
                      )}>
                        {exam.level}
                      </div>
                   </div>

                   <h3 className="text-2xl font-black text-typography tracking-tight mb-2 group-hover:text-primary transition-colors">{exam.name}</h3>
                   <p className="text-secondary/40 text-xs font-bold uppercase tracking-widest mb-8 truncate">{exam.full_name || "Official Examination"}</p>
                   
                   <div className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-50">
                      <div>
                         <p className="text-xl font-black text-typography">{exam._count.cutoffs}</p>
                         <div className="flex items-center space-x-1 text-[9px] font-black text-secondary/30 uppercase tracking-widest">
                            <TrendingUp size={10} />
                            <span>Cutoffs</span>
                         </div>
                      </div>
                      <div>
                         <p className="text-xl font-black text-typography">{exam._count.courses}</p>
                         <div className="flex items-center space-x-1 text-[9px] font-black text-secondary/30 uppercase tracking-widest">
                            <Link2 size={10} />
                            <span>Courses</span>
                         </div>
                      </div>
                      <div className="text-right">
                         <p className="text-[11px] font-black text-typography uppercase tracking-tighter">
                            {exam.exam_date ? new Date(exam.exam_date).toLocaleDateString('en-US', { day: '2-digit', month: 'short' }) : "TBA"}
                         </p>
                         <div className="flex items-center space-x-1 justify-end text-[9px] font-black text-secondary/30 uppercase tracking-widest">
                            <Calendar size={10} />
                            <span>Date</span>
                         </div>
                      </div>
                   </div>

                   <div className="mt-8 flex items-center space-x-2">
                      <button className="flex-1 py-4 bg-gray-50 text-secondary text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-primary hover:text-white transition-all">
                         Manage Cutoffs
                      </button>
                      <button className="px-5 py-4 bg-gray-50 text-secondary rounded-xl hover:bg-primary hover:text-white transition-all">
                         <ExternalLink size={14} />
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
