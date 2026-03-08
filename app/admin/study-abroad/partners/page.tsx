"use client";

import { useState, useEffect } from "react";
import { 
  Building2, 
  ChevronRight, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Zap, 
  DollarSign, 
  Users, 
  Target, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  PieChart,
  TrendingUp,
  BarChart3,
  MousePointer2,
  Calendar,
  Lock,
  ArrowUpRight,
  Loader2,
  History as HistoryIcon,
  Terminal as TerminalIcon
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PartnerContract {
  id: string;
  commission_pct: number;
  payment_cycle: 'MONTHLY' | 'QUARTERLY' | string;
  payout_pending: number;
  total_enrolled: number;
  status: 'ACTIVE' | 'PENDING_RENEWAL' | 'PAUSED' | string;
  expiry_date: string;
  university: {
    name: string;
  }
}

export default function PartnerUniversityPage() {
  const [contracts, setContracts] = useState<PartnerContract[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchContracts();
  }, []);

  const fetchContracts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/study-abroad/partners");
      const data = await res.json();
      setContracts(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="space-y-6 font-montserrat">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-4 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-1.5 font-montserrat">
              <div className="bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100">
                 <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 lowercase">Revenue Ops</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30 uppercase tracking-widest text-[10px]">Partner Lifecyle</span>
           </div>
           <h1 className="text-3xl md:text-4xl font-black text-typography tracking-tighter leading-none mb-1">
             Partner <span className="text-emerald-500 italic">Portfolio</span>
           </h1>
           <p className="text-secondary/40 text-[10px] font-black uppercase tracking-[0.2em] mt-1.5 leading-none">
              Managing Global Education Partnerships & Enrollment Commissions
           </p>
        </div>
 
        <div className="flex items-center space-x-3">
           <button className="flex items-center space-x-2 px-6 py-2.5 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-slate-900/10">
              <Plus size={16} />
              <span>Draft Contract</span>
           </button>
        </div>
      </section>

      {/* Contract & Payout KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
         {[
           { label: "Commission Outstanding", value: `$${contracts.reduce((acc, c) => acc + Number(c.payout_pending), 0).toLocaleString()}`, trend: "Real-time", icon: DollarSign, color: "text-emerald-500 bg-emerald-50" },
           { label: "Active Revenue Nodes", value: `${contracts.length} Units`, trend: "Balanced", icon: Building2, color: "text-primary bg-primary/5" },
           { label: "LTV per Enrollment", value: "$4.2k", trend: "+$200", icon: TrendingUp, color: "text-indigo-500 bg-indigo-50" },
           { label: "Cycle Yield (Q1)", value: "$1.4M", trend: "Projected", icon: PieChart, color: "text-amber-500 bg-amber-50" },
         ].map((kpi, i) => (
           <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm group hover:shadow-md transition-all cursor-pointer">
              <div className="flex items-center justify-between mb-3">
                 <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center transition-all group-hover:scale-105 shadow-inner", kpi.color)}>
                    <kpi.icon size={18} />
                 </div>
                 <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">{kpi.trend}</span>
              </div>
              <p className="text-2xl font-black text-typography tracking-tighter leading-none mb-1">{kpi.value}</p>
              <p className="text-[9px] font-bold text-secondary/30 uppercase tracking-[0.1em]">{kpi.label}</p>
           </div>
         ))}
      </div>

      {/* Main Partner Table */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col min-h-[400px]">
         <div className="p-4 border-b border-gray-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-snow-pearl/30">
            <div>
               <h3 className="text-lg font-black text-typography tracking-tighter uppercase leading-none">Partner Manifest</h3>
               <p className="text-[9px] font-black text-secondary/30 uppercase tracking-[0.2em] mt-1.5">Tracking Revenue Loops & Enrollment Consensus</p>
            </div>
            <div className="flex items-center space-x-3">
               <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 text-emerald-600 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-sm hover:bg-emerald-50 transition-all">
                  <Download size={14} />
                  <span>Settlement Report</span>
               </button>
            </div>
         </div>

         <div className="overflow-x-auto relative">
            {loading && (
              <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-10">
                <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
              </div>
            )}
            <table className="w-full text-left font-montserrat">
               <thead className="bg-snow-pearl/50 border-b border-gray-100">
                  <tr>
                     <th className="px-6 py-3 text-[9px] font-black uppercase tracking-[0.2em] text-secondary/40">University Partner</th>
                     <th className="px-6 py-3 text-[9px] font-black uppercase tracking-[0.2em] text-secondary/40 text-center">Share</th>
                     <th className="px-6 py-3 text-[9px] font-black uppercase tracking-[0.2em] text-secondary/40 text-center">Enrollments</th>
                     <th className="px-6 py-3 text-[9px] font-black uppercase tracking-[0.2em] text-secondary/40 text-center">Pending Payout</th>
                     <th className="px-6 py-3 text-[9px] font-black uppercase tracking-[0.2em] text-secondary/40 text-right">Contract</th>
                     <th className="px-6 py-3 text-[9px] font-black uppercase tracking-[0.2em] text-secondary/40 text-right">Commit</th>
                  </tr>
               </thead>
                <tbody className="divide-y divide-gray-50">
                   {contracts.length === 0 && !loading && (
                     <tr>
                       <td colSpan={6} className="px-10 py-20 text-center text-emerald-600/30 font-black uppercase tracking-widest text-[10px]">No Partner Contracts Sequenced</td>
                     </tr>
                   )}
                   {contracts.map((partner) => (
                     <tr key={partner.id} className="group hover:bg-gray-50/50 transition-all font-montserrat">
                        <td className="px-6 py-3">
                           <div className="flex items-center space-x-4">
                              <div className="w-10 h-10 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center text-secondary/20 group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-sm">
                                 <Building2 size={18} />
                              </div>
                              <div>
                                 <h4 className="text-[13px] font-black text-typography uppercase tracking-tight group-hover:text-emerald-600 transition-colors leading-none">{partner.university.name}</h4>
                                 <div className="flex items-center space-x-2 text-[8px] font-black text-secondary/30 uppercase tracking-[0.1em] mt-1.5 leading-none">
                                    <span>V-ID: {partner.id.slice(0, 8)}</span>
                                    <div className="w-1 h-1 bg-secondary/10 rounded-full" />
                                    <span>{partner.payment_cycle}</span>
                                 </div>
                              </div>
                           </div>
                        </td>
                        <td className="px-6 py-3 text-center">
                           <span className="text-[13px] font-black text-typography tracking-tighter leading-none">{partner.commission_pct}%</span>
                           <p className="text-[8px] font-black text-secondary/20 uppercase tracking-widest mt-1">Share</p>
                        </td>
                        <td className="px-6 py-3 text-center">
                           <div className="flex items-center justify-center space-x-1.5 text-[13px] font-black text-typography leading-none">
                              <Users size={12} className="text-primary" />
                              <span>{partner.total_enrolled}</span>
                           </div>
                           <p className="text-[8px] font-black text-secondary/20 uppercase tracking-widest mt-1">Nodes</p>
                        </td>
                        <td className="px-6 py-3 text-center">
                           <p className="text-[13px] font-black text-emerald-600 tracking-tighter leading-none">${Number(partner.payout_pending).toLocaleString()}</p>
                           <p className="text-[7px] font-black text-emerald-500/60 uppercase tracking-widest mt-1">Verified</p>
                        </td>
                        <td className="px-6 py-3 text-right">
                           <div className={cn(
                              "inline-flex items-center space-x-1.5 text-[10px] font-black uppercase tracking-tight",
                              partner.status === 'PENDING_RENEWAL' ? "text-rose-500" : "text-typography"
                           )}>
                              <Calendar size={12} />
                              <span>{new Date(partner.expiry_date).toISOString().split('T')[0]}</span>
                           </div>
                           <p className="text-[8px] font-black text-secondary/20 uppercase tracking-widest mt-1">Expiry</p>
                        </td>
                        <td className="px-6 py-3 text-right">
                           <button className="w-8 h-8 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center text-secondary/40 hover:bg-emerald-500 hover:text-white transition-all shadow-sm">
                              <ArrowUpRight size={14} />
                           </button>
                        </td>
                     </tr>
                   ))}
                </tbody>
            </table>
         </div>

         <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-snow-pearl/30 relative overflow-hidden font-montserrat">
            <div className="absolute top-0 right-0 p-4 opacity-5">
               <Lock size={80} className="text-emerald-500" />
            </div>
            <div className="flex items-center space-x-4 relative z-10">
               <HistoryIcon size={14} className="text-secondary/20" />
               <p className="text-[9px] font-black text-secondary/30 uppercase tracking-[0.2em]">Partner Compliance v4.0 • Revenue Loop Active</p>
            </div>
            <p className="text-[8px] font-black text-secondary/20 uppercase tracking-widest relative z-10">Sync verified: {new Date().toLocaleDateString()}</p>
         </div>
      </section>

      {/* Conversion Funnel Context Node */}
      <section className="bg-slate-900 p-8 rounded-xl text-white flex flex-col md:flex-row md:items-center justify-between group overflow-hidden relative font-montserrat border border-slate-800">
         <div className="absolute inset-0 bg-emerald-500/5 duration-1000" />
         <div className="flex items-center space-x-6 relative z-10">
            <div className="w-14 h-14 bg-emerald-500/20 text-emerald-500 rounded-xl flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform border border-emerald-500/20">
               <Target size={24} />
            </div>
            <div>
               <h4 className="text-xl font-black text-white tracking-tighter uppercase leading-none">Enrollment Lifecycle Intel</h4>
               <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-2 max-w-lg leading-relaxed">
                  Partner <span className="text-white">Active Registry</span> yields <span className="text-emerald-500">12% Higher</span> conversion vs non-partners.
               </p>
            </div>
         </div>
         <div className="mt-6 md:mt-0 relative z-10">
            <button className="px-6 py-2.5 bg-white text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-emerald-500/10">
               Pipeline Analytics
            </button>
         </div>
      </section>
    </div>
  );
}
