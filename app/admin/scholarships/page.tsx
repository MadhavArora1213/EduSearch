"use client";

import { useState, useEffect } from "react";
import { 
  BookOpen, 
  Plus, 
  Search, 
  Calendar, 
  ChevronRight, 
  Award, 
  Wallet, 
  Users, 
  Clock, 
  Filter, 
  Download,
  AlertCircle,
  MoreVertical,
  CheckCircle2,
  ExternalLink
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Scholarship {
  id: string;
  name: string;
  category: string;
  target_category: string | null;
  income_limit: number | null;
  merit_percentage_min: number | null;
  amount_description: string | null;
  deadline: string | null;
}

export default function ScholarshipsPage() {
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchScholarships();
  }, []);

  const fetchScholarships = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/scholarships");
      const data = await res.json();
      setScholarships(data);
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
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary">Financial Aid</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30">Master Scholarship Directory</span>
           </div>
           <h1 className="text-5xl font-black text-typography tracking-tighter leading-none mb-1">
             Financial <span className="text-primary italic">Assistance</span>
           </h1>
           <p className="text-secondary/40 text-sm font-bold uppercase tracking-widest mt-2">
              Managing 150+ Govt and Private Aid Schemes
           </p>
        </div>

        <div className="flex items-center space-x-4">
           <button className="flex items-center space-x-2 px-6 py-4 bg-gray-50 border border-gray-200/50 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-white hover:border-gray-200 transition-all active:scale-95 text-secondary/60">
              <Download size={16} />
              <span>Export Directory</span>
           </button>
           <button className="flex items-center space-x-2 px-8 py-4 bg-primary text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20">
              <Plus size={18} />
              <span>New Scholarship</span>
           </button>
        </div>
      </section>

      {/* Main Grid View */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? [...Array(3)].map((_, i) => (
          <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-gray-50 animate-pulse h-[350px]" />
        )) : scholarships.length === 0 ? (
          <div className="col-span-12 py-20 bg-white rounded-[2.5rem] border border-gray-100 flex flex-col items-center">
             <AlertCircle size={48} className="text-secondary/10 mb-4" />
             <p className="text-xl font-black text-typography">No Scholarships Registered</p>
          </div>
        ) : scholarships.map((s) => (
          <div key={s.id} className="bg-white p-10 rounded-[3rem] border border-gray-50 shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all group relative overflow-hidden active:scale-[0.98]">
             {/* Micro Decorative Element */}
             <div className="absolute -right-12 -top-12 w-48 h-48 bg-primary/5 rounded-full group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
             
             <div className="flex justify-between items-start mb-8 relative">
                <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary group-hover:rotate-12 transition-all">
                   <Award size={28} />
                </div>
                <div className={cn(
                  "px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest",
                  s.category === 'GOVERNMENT' ? "bg-red-50 text-red-600 border border-red-100" : "bg-sky-50 text-sky-600 border border-sky-100"
                )}>
                   {s.category}
                </div>
             </div>

             <h3 className="text-2xl font-black text-typography tracking-tight mb-2 group-hover:text-primary transition-colors line-clamp-2 min-h-[64px]">{s.name}</h3>
             
             <div className="space-y-6 mt-8 pt-8 border-t border-gray-50">
                <div className="grid grid-cols-2 gap-6">
                   <div className="space-y-1">
                      <p className="text-[10px] font-black text-secondary/30 uppercase tracking-[0.2em] leading-none">Min Merit</p>
                      <p className="text-lg font-black text-typography">{s.merit_percentage_min || "0"}%</p>
                   </div>
                   <div className="space-y-1">
                      <p className="text-[10px] font-black text-secondary/30 uppercase tracking-[0.2em] leading-none">Income Limit</p>
                      <p className="text-lg font-black text-typography">₹{s.income_limit ? (s.income_limit/100000).toFixed(1) + "L" : "N/A"}</p>
                   </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                   <div className="flex items-center space-x-3 text-secondary/40">
                      <Clock size={16} />
                      <span className="text-[10px] font-black uppercase tracking-widest italic">Deadline</span>
                   </div>
                   <span className="text-[11px] font-black text-typography uppercase tracking-tighter">
                      {s.deadline ? new Date(s.deadline).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }) : "NOT SET"}
                   </span>
                </div>
                
                <div className="bg-emerald-50 border border-emerald-100/50 p-4 rounded-2xl">
                   <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest leading-none mb-1">Scholarship Benefit</p>
                   <p className="text-xs font-bold text-emerald-800 italic line-clamp-1">{s.amount_description || "Variable amount based on criteria"}</p>
                </div>
             </div>

             <div className="mt-8 flex items-center space-x-2">
                <button className="flex-1 py-4 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-2xl shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                   Manage Rules
                </button>
                <button className="px-5 py-4 bg-gray-50 text-secondary/40 rounded-2xl hover:bg-gray-100 hover:text-secondary transition-all">
                   <ExternalLink size={16} />
                </button>
             </div>
          </div>
        ))}
      </section>

      {/* Eligibility Rule Warning */}
      <section className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
         <div className="flex items-start space-x-6">
            <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500 border border-amber-100">
               <AlertCircle size={28} />
            </div>
            <div>
               <h3 className="text-xl font-black text-typography uppercase tracking-tight">Auto-Finder Protocol</h3>
               <p className="text-sm font-bold text-secondary/40 leading-relaxed mt-2 max-w-2xl">
                 Rules configured here drive the matching engine for 10M+ students. Ensure merit and income thresholds are precise to avoid false eligibility matches.
               </p>
            </div>
         </div>
      </section>
    </div>
  );
}
