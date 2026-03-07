"use client";

import { useState, useEffect, useRef } from "react";
import { KpiStrip } from "@/components/admin/KpiStrip";
import { DashboardWidgets, QuickActions } from "@/components/admin/DashboardWidgets";
import { Calendar, Filter, Share2, Plus, Loader2 } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const [data, setData] = useState<{ kpis?: any, topColleges?: any, alerts?: any, activityData?: any, leadVelocity?: any, revenueTrend?: any, moderationData?: any } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    <div className="space-y-10 pb-20">
      {/* Dashboard Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-6 border-b border-gray-100 transition-all">
        <div>
           <div className="flex items-center space-x-3 mb-3">
              <div className="bg-primary/5 px-3 py-1 rounded-lg border border-primary/10">
                 <span className="text-xs font-bold text-primary">System Overview</span>
              </div>
              <Calendar size={14} className="text-gray-400" />
              <span className="text-sm font-medium text-gray-500">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}</span>
           </div>
           <h1 className="text-3xl font-bold text-typography mb-1">
             Command Centre
           </h1>
           <p className="text-gray-500 text-sm font-medium">
              Unified Platform Intelligence Dashboard
           </p>
        </div>

        <div className="flex items-center space-x-4">
           {loading && <Loader2 size={24} className="text-primary animate-spin" />}
           
           <div className="relative">
             <button onClick={() => setFilterOpen(!filterOpen)} className="flex items-center space-x-2 px-5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 hover:bg-white transition-all shadow-sm">
                <Filter size={16} />
                <span className="hidden sm:inline">Filter View</span>
             </button>
             {filterOpen && (
               <div className="absolute right-0 top-12 w-64 bg-white border border-gray-100 shadow-xl rounded-xl p-4 z-50">
                  <h4 className="text-sm font-bold text-gray-800 mb-3">Dashboard Filters</h4>
                  <div className="space-y-3">
                     <div>
                        <label className="text-xs font-medium text-gray-500 mb-1 block">Date Range</label>
                        <select className="w-full text-sm border-gray-200 rounded-lg bg-gray-50 px-2 py-2 outline-none">
                           <option>Last 7 Days</option>
                           <option>Last 30 Days</option>
                           <option>This Year</option>
                        </select>
                     </div>
                     <button onClick={() => setFilterOpen(false)} className="w-full bg-primary hover:bg-yale-blue transition-colors text-white text-xs font-bold py-2 rounded-lg mt-2">Apply Filters</button>
                  </div>
               </div>
             )}
           </div>

           <div className="relative">
             <button onClick={() => setCreateOpen(!createOpen)} className="flex items-center space-x-2 px-5 py-2.5 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-yale-blue transition-all shadow-sm">
                <Plus size={16} />
                <span className="hidden sm:inline">New Resource</span>
             </button>
             {createOpen && (
               <div className="absolute right-0 top-12 w-48 bg-white border border-gray-100 shadow-xl rounded-xl p-2 z-50 flex flex-col">
                  <Link href="/admin/colleges" onClick={() => setCreateOpen(false)} className="text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-primary px-3 py-2 rounded-lg transition-colors">New College</Link>
                  <Link href="/admin/scholarships" onClick={() => setCreateOpen(false)} className="text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-primary px-3 py-2 rounded-lg transition-colors">New Scholarship</Link>
                  <Link href="/admin/operations/leads" onClick={() => setCreateOpen(false)} className="text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-primary px-3 py-2 rounded-lg transition-colors">Import Leads</Link>
                  <Link href="/admin/exams" onClick={() => setCreateOpen(false)} className="text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-primary px-3 py-2 rounded-lg transition-colors">Add Exam</Link>
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
