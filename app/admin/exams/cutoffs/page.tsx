"use client";

import { useState, useEffect } from "react";
import { 
  Plus, 
  Search, 
  Filter, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp, 
  Download,
  Upload,
  Database,
  Calculator,
  ListFilter,
  MoreVertical,
  MinusCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Cutoff {
  id: string;
  course: {
    name: string;
    college: { name: string }
  };
  exam: { name: string };
  year: number;
  category: string;
  quota: string | null;
  opening_value: number | null;
  closing_value: number | null;
  cutoff_type: string;
}

export default function CutoffsManagementPage() {
  const [cutoffs, setCutoffs] = useState<Cutoff[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCutoffs();
  }, []);

  const fetchCutoffs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/exams/cutoffs");
      const data = await res.json();
      setCutoffs(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10">
      {/* Header Section */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-6 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-2">
              <div className="bg-primary/5 px-3 py-1.5 rounded-xl border border-primary/10">
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary">Entrance Intel</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30">Master Cutoff Database</span>
           </div>
           <h1 className="text-3xl md:text-3xl md:text-5xl font-black text-typography tracking-tighter leading-none mb-1">
             Cutoff <span className="text-primary italic">Manager</span>
           </h1>
           <p className="text-secondary/40 text-sm font-bold uppercase tracking-widest mt-2">
              Managing Year-on-Year Eligibility Thresholds
           </p>
        </div>

        <div className="flex items-center space-x-4">
           <button className="flex items-center space-x-2 px-6 py-4 bg-gray-50 border border-gray-200/50 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-white hover:border-gray-200 transition-all active:scale-95 text-secondary/60">
              <Upload size={16} />
              <span>Bulk Import (CSV)</span>
           </button>
           <button className="flex items-center space-x-2 px-8 py-4 bg-primary text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20">
              <Calculator size={18} />
              <span>Test Rank Predictor</span>
           </button>
        </div>
      </section>

      {/* Stats Quick Strip */}
      <div className="grid grid-cols-4 gap-6">
         {[
           { label: "Total Data points", value: cutoffs.length.toLocaleString(), color: "bg-primary" },
           { label: "Active 2025 Cutoffs", value: cutoffs.filter(c => c.year === 2025).length.toString(), color: "bg-emerald-500" },
           { label: "Pending verified", value: "12", color: "bg-amber-500" },
           { label: "Anomalies", value: "0", color: "bg-red-500" }
         ].map((s, i) => (
           <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center space-x-4">
              <div className={cn("w-2 h-10 rounded-full", s.color)} />
              <div>
                 <p className="text-[9px] font-black uppercase tracking-[0.2em] text-secondary/30">{s.label}</p>
                 <p className="text-2xl font-black text-typography">{s.value}</p>
              </div>
           </div>
         ))}
      </div>

      {/* Listing Table */}
      <section className="bg-white rounded-[2.5rem] border border-gray-50 shadow-sm overflow-hidden">
        <div className="p-6 md:p-10 border-b border-gray-50 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
           <div className="relative group flex-1 max-w-md">
              <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-secondary/20" />
              <input 
                placeholder="Search College or Course..." 
                className="w-full bg-gray-50 border-0 pl-14 pr-6 py-4 rounded-2xl text-[13px] font-bold outline-none focus:ring-4 focus:ring-primary/5 transition-all"
              />
           </div>
           
           <div className="flex items-center space-x-4">
              <button className="bg-gray-50 p-4 rounded-2xl border border-gray-100 hover:border-primary/20 transition-all group">
                 <Filter size={18} className="text-secondary/40 group-hover:text-primary" />
              </button>
              <button className="p-4 bg-primary text-white rounded-2xl flex items-center space-x-3 text-[10px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 transition-all active:scale-95">
                 <Plus size={16} />
                 <span>Add Point</span>
              </button>
           </div>
        </div>

        <div className="overflow-x-auto">
           <table className="w-full text-left">
              <thead className="bg-snow-pearl/50 border-b border-gray-100">
                 <tr>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Institution & Course</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Exam & Year</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40 text-center">Opening</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40 text-center">Closing</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40 text-right">Verification</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loading ? [...Array(3)].map((_, i) => (
                  <tr key={i} className="animate-pulse h-[100px]">
                     <td colSpan={5} className="bg-gray-50/50" />
                  </tr>
                )) : cutoffs.map((cutoff) => (
                  <tr key={cutoff.id} className="group hover:bg-gray-50/30 transition-all">
                    <td className="px-10 py-8">
                       <h3 className="text-sm font-black text-typography group-hover:text-primary transition-colors">{cutoff.course.college.name}</h3>
                       <p className="text-[10px] font-bold text-secondary/40 uppercase tracking-widest mt-1">{cutoff.course.name}</p>
                    </td>
                    <td className="px-10 py-8">
                       <div className="flex items-center space-x-2">
                          <span className="text-xs font-black text-typography italic">{cutoff.exam.name}</span>
                          <span className="bg-primary/5 px-2 py-0.5 rounded text-[10px] font-black text-primary">{cutoff.year}</span>
                       </div>
                       <p className="text-[9px] font-bold text-secondary/20 uppercase tracking-widest mt-1">{cutoff.category} | {cutoff.quota || "All States"}</p>
                    </td>
                    <td className="px-10 py-8 text-center">
                       <span className="text-base font-black text-typography">{cutoff.opening_value?.toLocaleString() || "-"}</span>
                       <p className="text-[9px] font-bold text-secondary/20 uppercase tracking-widest">Opening {cutoff.cutoff_type}</p>
                    </td>
                    <td className="px-10 py-8 text-center">
                       <span className="text-base font-black text-typography italic">{cutoff.closing_value?.toLocaleString() || "-"}</span>
                       <p className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest">Target Threshold</p>
                    </td>
                    <td className="px-10 py-8 text-right">
                       <div className="flex items-center justify-end space-x-4">
                          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500 shadow-sm border border-emerald-100">
                             <BadgeCheck size={18} />
                          </div>
                          <button className="p-3 bg-white border border-gray-100 rounded-xl hover:bg-primary hover:text-white transition-all shadow-sm opacity-0 group-hover:opacity-100">
                             <MoreVertical size={16} />
                          </button>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
           </table>
        </div>

        <div className="p-10 border-t border-gray-50 bg-white">
           <div className="bg-amber-50 border border-amber-100 p-6 rounded-3xl flex items-center space-x-4">
              <AlertCircle size={20} className="text-amber-500" />
              <p className="text-[11px] font-bold text-amber-900 leading-relaxed uppercase tracking-widest">
                Warning: These data points directly drive the **AI Rank Predictor**. Incorrect closing ranks will lead to critical platform trust degradation.
              </p>
           </div>
        </div>
      </section>
    </div>
  );
}

function BadgeCheck({ size }: { size: number }) {
   return <CheckCircle2 size={size} />;
}
