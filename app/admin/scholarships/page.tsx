"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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
    <div className="space-y-6 font-montserrat">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-4 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-1.5">
              <div className="bg-primary/5 px-3 py-1.5 rounded-xl border border-primary/10">
                 <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Financial Aid</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30 uppercase tracking-widest text-[10px]">Master Directory</span>
           </div>
           <h1 className="text-3xl md:text-4xl font-black text-typography tracking-tighter leading-none mb-1">
             Financial <span className="text-primary italic">Assistance</span>
           </h1>
           <p className="text-secondary/40 text-[10px] font-black uppercase tracking-[0.2em] mt-1.5 leading-none">
              Managing 150+ Govt and Private Aid Schemes from Grant Registry
           </p>
        </div>
 
        <div className="flex items-center space-x-3">
           <button onClick={() => alert('Export...')} className="flex items-center space-x-2 px-6 py-2.5 bg-white border border-gray-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:text-primary transition-all shadow-sm">
              <Download size={14} />
              <span>Export</span>
           </button>
           <Link href="/admin/scholarships/new" className="flex items-center space-x-1.5 px-6 py-2.5 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-primary/20">
              <Plus size={14} />
              <span>New Grant</span>
           </Link>
        </div>
      </section>

      {/* Main Grid View */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? [...Array(3)].map((_, i) => (
          <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 animate-pulse h-[250px]" />
        )) : scholarships.length === 0 ? (
          <div className="col-span-12 py-16 bg-white rounded-xl border border-gray-100 flex flex-col items-center">
             <AlertCircle size={32} className="text-secondary/10 mb-2" />
             <p className="text-base font-black text-typography">No Scholarships Registered</p>
          </div>
        ) : scholarships.map((s) => (
          <div key={s.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
             <div className="absolute -right-10 -top-10 w-24 h-24 bg-primary/5 rounded-full group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
             
             <div className="flex justify-between items-start mb-4 relative">
                <div className="w-10 h-10 bg-primary/5 rounded-lg flex items-center justify-center text-primary transition-all">
                   <Award size={20} />
                </div>
                <div className={cn(
                  "px-2 py-1 rounded-full text-[7px] font-black uppercase tracking-[0.2em] border shadow-sm",
                  s.category === 'GOVERNMENT' ? "bg-rose-50 text-rose-600 border-rose-100" : "bg-sky-50 text-sky-600 border-sky-100"
                )}>
                   {s.category}
                </div>
             </div>
 
             <h3 className="text-lg font-black text-typography tracking-tighter mb-1.5 group-hover:text-primary transition-colors line-clamp-2 min-h-[48px] uppercase">{s.name}</h3>
             
             <div className="space-y-3 mt-4 pt-4 border-t border-gray-100">
                <div className="grid grid-cols-2 gap-4">
                   <div className="leading-none">
                      <p className="text-[7px] font-black text-secondary/20 uppercase tracking-[0.2em] mb-1.5">Min Merit</p>
                      <p className="text-sm font-black text-typography">{s.merit_percentage_min || "0"}%</p>
                   </div>
                   <div className="leading-none">
                      <p className="text-[7px] font-black text-secondary/20 uppercase tracking-[0.2em] mb-1.5">Threshold</p>
                      <p className="text-sm font-black text-typography">₹{s.income_limit ? (s.income_limit/100000).toFixed(1) + "L" : "N/A"}</p>
                   </div>
                </div>
 
                <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg border border-gray-100">
                   <div className="flex items-center space-x-2 text-secondary/30">
                      <Clock size={12} />
                      <span className="text-[8px] font-black uppercase tracking-[0.1em]">Deadline</span>
                   </div>
                   <span className="text-[9px] font-black text-typography uppercase tracking-tight">
                      {s.deadline ? new Date(s.deadline).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }) : "NOT SET"}
                   </span>
                </div>
                
                <div className="bg-emerald-50 border border-emerald-100/50 p-2.5 rounded-lg">
                   <p className="text-[7px] font-black text-emerald-600 uppercase tracking-widest leading-none mb-1">Grant Allocation</p>
                   <p className="text-[10px] font-bold text-emerald-800 line-clamp-1">{s.amount_description || "Dynamic Benefit Matrix"}</p>
                </div>
             </div>
 
             <div className="mt-4 flex items-center space-x-1.5 border-t border-gray-50 pt-4 relative z-10">
                <button onClick={() => alert(`Manage: ${s.name}`)} className="flex-1 py-2 bg-primary text-white text-[9px] font-black uppercase tracking-widest rounded-lg shadow-sm hover:scale-105 active:scale-95 transition-all">
                   Manage Rules
                </button>
                <button onClick={() => window.open(`/scholarships/${s.id}`, '_blank')} className="w-8 h-8 bg-gray-50 text-secondary/30 rounded-lg flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all shadow-sm">
                   <ExternalLink size={12} />
                </button>
             </div>
          </div>
        ))}
      </section>


      {/* Eligibility Rule Warning */}
      <section className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
         <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center text-amber-500 border border-amber-100">
               <AlertCircle size={16} />
            </div>
            <div>
               <h3 className="text-sm font-black text-typography uppercase tracking-tight">Auto-Finder Protocol</h3>
               <p className="text-[12px] font-bold text-secondary/40 leading-relaxed mt-1 max-w-2xl">
                 Matching engine active for 10M+ student records. Merit/income thresholds drive real-time eligibility clusters.
               </p>
            </div>
         </div>
      </section>
    </div>
  );
}
