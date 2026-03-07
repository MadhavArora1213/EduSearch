"use client";

import { useState, useEffect } from "react";
import { KpiStrip } from "@/components/admin/KpiStrip";
import { DashboardWidgets, QuickActions } from "@/components/admin/DashboardWidgets";
import { Calendar, Filter, Share2, Plus, Loader2 } from "lucide-react";

export default function DashboardPage() {
  const [data, setData] = useState<{ kpis?: any, topColleges?: any, alerts?: any } | null>(null);
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

  return (
    <div className="space-y-10 pb-20">
      {/* Dashboard Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-6 border-b border-gray-100 italic transition-all">
        <div>
           <div className="flex items-center space-x-3 mb-2">
              <div className="bg-primary/5 px-3 py-1.5 rounded-xl border border-primary/10">
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary italic lowercase">System Overlord</span>
              </div>
              <Calendar size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}</span>
           </div>
           <h1 className="text-5xl font-black text-typography tracking-tighter leading-none mb-1">
             Command <span className="text-primary italic italic">Centre</span>
           </h1>
           <p className="text-secondary/40 text-sm font-bold uppercase tracking-widest mt-2 overflow-hidden text-ellipsis whitespace-nowrap">
              Unified Platform Intelligence Dashboard
           </p>
        </div>

        <div className="flex items-center space-x-4">
           {loading && <Loader2 size={24} className="text-primary animate-spin" />}
           <button className="flex items-center space-x-2 px-6 py-4 bg-gray-50 border border-gray-200/50 rounded-3xl text-[11px] font-black uppercase tracking-widest hover:bg-white hover:border-gray-200 transition-all active:scale-95 text-secondary/60 shadow-sm">
              <Filter size={16} />
              <span className="hidden sm:inline">Filter View</span>
           </button>
           <button className="flex items-center space-x-3 px-10 py-5 bg-primary text-white rounded-3xl text-[11px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20">
              <Plus size={18} />
              <span className="hidden sm:inline">New Resource</span>
           </button>
        </div>
      </section>

      {/* KPI Section */}
      <section>
         <KpiStrip kpis={data?.kpis} loading={loading} />
      </section>

      {/* Main Widgets Grid */}
      <section>
         <DashboardWidgets topColleges={data?.topColleges} alerts={data?.alerts} loading={loading} />
      </section>

      {/* Quick Actions Floating Action Button */}
      <QuickActions />
    </div>
  );
}
