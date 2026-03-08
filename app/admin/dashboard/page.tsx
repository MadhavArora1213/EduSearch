"use client";

import { useState, useEffect, useRef } from "react";
import { KpiStrip } from "@/components/admin/KpiStrip";
import { DashboardWidgets, QuickActions } from "@/components/admin/DashboardWidgets";
import { Calendar, Filter, Share2, Plus, Loader2 } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const [data, setData] = useState<{ kpis?: any, topColleges?: any, alerts?: any, activityData?: any, leadVelocity?: any, revenueTrend?: any, moderationData?: any } | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetch('/api/admin/dashboard')
      .then(r => r.json())
      .then(d => {
        setData(d);
        setLoading(false);
      })
      .catch(e => {
         console.error(e);
         setLoading(false);
      });
  }, []);

  const [filterOpen, setFilterOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);

  return (
    <div className="space-y-6 pb-20 font-montserrat">
      {/* Dashboard Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-4 border-b border-gray-100 transition-all">
        <div>
           <div className="flex items-center space-x-3 mb-1.5">
              <div className="bg-primary/5 px-2 py-1 rounded-lg border border-primary/10">
                 <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary lowercase">Intelligence Node</span>
              </div>
               <Calendar size={14} className="text-secondary/30" />
               <span className="text-[10px] font-black text-secondary/30 uppercase tracking-widest">
                  {mounted ? new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric'}) : "..."}
               </span>
           </div>
           <h1 className="text-3xl md:text-4xl font-black text-typography tracking-tighter leading-none mb-1">
             Command <span className="text-primary italic">Centre</span>
           </h1>
           <p className="text-secondary/40 text-[10px] font-black uppercase tracking-[0.2em] mt-1.5 leading-none">
              Unified Platform Intelligence & Monitoring
           </p>
        </div>

        <div className="flex items-center space-x-3">
           {loading && <Loader2 size={18} className="text-primary animate-spin" />}
           
           <div className="relative">
             <button onClick={() => setFilterOpen(!filterOpen)} className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-secondary/40 hover:text-primary transition-all shadow-sm">
                 <Filter size={14} />
                 <span className="hidden sm:inline">Filters</span>
              </button>
              {filterOpen && (
                <div className="absolute right-0 top-11 w-60 bg-white border border-gray-100 shadow-xl rounded-xl p-3 z-50">
                   <h4 className="text-[10px] font-black text-typography uppercase tracking-widest mb-3 border-b pb-2">Filter Matrix</h4>
                   <div className="space-y-3">
                      <div>
                         <label className="text-[8px] font-black text-secondary/30 uppercase tracking-widest mb-1 block">Date Range</label>
                         <select className="w-full text-[11px] font-bold border-gray-100 rounded-lg bg-gray-50 px-2 py-2 outline-none">
                            <option>Last 7 Days</option>
                            <option>Last 30 Days</option>
                            <option>Year to Date</option>
                         </select>
                      </div>
                      <button onClick={() => setFilterOpen(false)} className="w-full bg-primary hover:bg-primary/90 transition-all text-white text-[9px] font-black uppercase tracking-widest py-2.5 rounded-lg mt-2 shadow-lg shadow-primary/20">Apply Configuration</button>
                   </div>
                </div>
              )}
           </div>
 
           <div className="relative">
             <button onClick={() => setCreateOpen(!createOpen)} className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-primary/20">
                 <Plus size={14} />
                 <span className="hidden sm:inline">New Resource</span>
              </button>
              {createOpen && (
                <div className="absolute right-0 top-11 w-44 bg-white border border-gray-100 shadow-xl rounded-xl p-1.5 z-50 flex flex-col">
                   <Link href="/admin/colleges" onClick={() => setCreateOpen(false)} className="text-[10px] font-black text-secondary/40 hover:bg-gray-50 hover:text-primary px-3 py-2 rounded-lg transition-colors uppercase tracking-widest">New College</Link>
                   <Link href="/admin/scholarships" onClick={() => setCreateOpen(false)} className="text-[10px] font-black text-secondary/40 hover:bg-gray-50 hover:text-primary px-3 py-2 rounded-lg transition-colors uppercase tracking-widest">New scholarship</Link>
                   <Link href="/admin/operations/leads" onClick={() => setCreateOpen(false)} className="text-[10px] font-black text-secondary/40 hover:bg-gray-50 hover:text-primary px-3 py-2 rounded-lg transition-colors uppercase tracking-widest">Import Leads</Link>
                   <Link href="/admin/exams" onClick={() => setCreateOpen(false)} className="text-[10px] font-black text-secondary/40 hover:bg-gray-50 hover:text-primary px-3 py-2 rounded-lg transition-colors uppercase tracking-widest">Add Exam</Link>
                </div>
              )}
           </div>
        </div>
      </section>

      {/* KPI Section */}
      <section>
         <KpiStrip kpis={data?.kpis} loading={loading} />
      </section>

      {/* Main Widgets Grid */}
      <section>
         <DashboardWidgets 
            topColleges={data?.topColleges} 
            alerts={data?.alerts} 
            activityData={data?.activityData}
            leadVelocity={data?.leadVelocity}
            revenueTrend={data?.revenueTrend}
            moderationData={data?.moderationData}
            loading={loading} 
         />
      </section>

      {/* Quick Actions Floating Action Button */}
      <QuickActions />
    </div>
  );
}
