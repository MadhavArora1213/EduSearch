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
           <div className="flex items-center space-x-3 mb-2">
              <div className="bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100 italic">
                 <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 italic">Revenue Ops</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30">Partner Commission Lifecycle</span>
           </div>
           <h1 className="text-3xl md:text-3xl md:text-5xl font-black text-typography tracking-tighter leading-none mb-1">
             Partner <span className="text-emerald-500 italic">Portfolio</span>
           </h1>
           <p className="text-secondary/40 text-sm font-bold uppercase tracking-widest mt-2">
              Managing High-Yield Global Education Partnerships & Enrollment Commissions
           </p>
        </div>

        <div className="flex items-center space-x-4">
           <button className="flex items-center space-x-2 px-8 py-4 bg-slate-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-xl shadow-slate-900/10 italic">
              <Plus size={18} />
              <span>Draft New Contract</span>
           </button>
        </div>
      </section>

      {/* Contract & Payout KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-5 italic">
         {[
           { label: "Commission Outstanding", value: `$${contracts.reduce((acc, c) => acc + Number(c.payout_pending), 0).toLocaleString()}`, trend: "Real-time", icon: DollarSign, color: "text-emerald-500 bg-emerald-50" },
           { label: "Active Revenue Nodes", value: `${contracts.length} Units`, trend: "Balanced", icon: Building2, color: "text-primary bg-primary/5" },
           { label: "LTV per Enrollment", value: "$4.2k", trend: "+$200", icon: TrendingUp, color: "text-indigo-500 bg-indigo-50" },
           { label: "Cycle Yield (Q1)", value: "$1.4M", trend: "Projected", icon: PieChart, color: "text-amber-500 bg-amber-50" },
         ].map((kpi, i) => (
           <div key={i} className="bg-white p-5 rounded-2xl border border-gray-50 shadow-sm group hover:border-emerald-500/20 transition-all cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                 <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 shadow-inner", kpi.color)}>
                    <kpi.icon size={22} />
                 </div>
                 <span className="text-[10px] font-black text-emerald-600 italic tracking-widest">{kpi.trend}</span>
              </div>
              <p className="text-3xl font-black text-typography tracking-tighter capitalize leading-none mb-1 italic">{kpi.value}</p>
              <p className="text-[10px] font-bold text-secondary/30 uppercase tracking-widest italic">{kpi.label}</p>
           </div>
         ))}
      </div>

      {/* Main Partner Table */}
      <section className="bg-white rounded-2xl border border-gray-50 shadow-sm overflow-hidden flex flex-col min-h-[400px]">
         <div className="p-6 md:p-6 border-b border-gray-50 flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-snow-pearl/30 border-gray-100 italic relative">
            <div>
               <h3 className="text-xl font-black text-typography tracking-tighter italic lowercase underline decoration-emerald-500/10 select-none">Active Partner Manifest</h3>
               <p className="text-[10px] font-black text-secondary/30 uppercase tracking-[0.2em] mt-2 italic select-none">Tracking Revenue Loop from Clicks to Enrollment Confirmation</p>
            </div>
            <div className="flex items-center space-x-4 italic">
               <button className="flex items-center space-x-2 px-6 py-3 bg-white border border-emerald-100 text-emerald-600 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-sm hover:bg-emerald-50 transition-all italic underline decoration-emerald-500/10">
                  <Download size={16} />
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
            <table className="w-full text-left italic">
               <thead className="bg-snow-pearl/50 border-b border-gray-100 font-montserrat italic">
                  <tr>
                     <th className="px-10 py-4 text-[10px] font-black uppercase tracking-widest text-secondary/40">University Partner</th>
                     <th className="px-10 py-4 text-[10px] font-black uppercase tracking-widest text-secondary/40 text-center">Comm. %</th>
                     <th className="px-10 py-4 text-[10px] font-black uppercase tracking-widest text-secondary/40 text-center">Enrollments</th>
                     <th className="px-10 py-4 text-[10px] font-black uppercase tracking-widest text-secondary/40">Pending Payout</th>
                     <th className="px-10 py-4 text-[10px] font-black uppercase tracking-widest text-secondary/40 text-right">Contract Expiry</th>
                     <th className="px-10 py-4 text-[10px] font-black uppercase tracking-widest text-secondary/40 text-right">Commit</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-50 italic">
                  {contracts.length === 0 && !loading && (
                    <tr>
                      <td colSpan={6} className="px-10 py-20 text-center text-emerald-600/30 font-black uppercase tracking-widest text-[10px]">No Partner Contracts Sequenced from Revenue Node</td>
                    </tr>
                  )}
                  {contracts.map((partner) => (
                    <tr key={partner.id} className="group hover:bg-snow-pearl/30 transition-all font-montserrat italic">
                       <td className="px-10 py-10">
                          <div className="flex items-center space-x-6 italic">
                             <div className="w-16 h-16 bg-snow-pearl rounded-2xl flex items-center justify-center text-secondary/10 group-hover:bg-emerald-500/5 group-hover:text-emerald-500 transition-all">
                                <Building2 size={28} />
                             </div>
                             <div>
                                <h4 className="text-[14px] font-black text-typography uppercase tracking-tight group-hover:text-emerald-600 transition-colors italic underline decoration-emerald-500/20">{partner.university.name}</h4>
                                <div className="flex items-center space-x-2 text-[9px] font-bold text-secondary/20 uppercase tracking-widest mt-1">
                                   <span>V-ID: {partner.id.slice(0, 8)}</span>
                                   <div className="w-1 h-1 bg-secondary/10 rounded-full" />
                                   <span>Cycle: {partner.payment_cycle}</span>
                                </div>
                             </div>
                          </div>
                       </td>
                       <td className="px-10 py-10 text-center">
                          <span className="text-xl font-black text-typography italic tracking-tighter">{partner.commission_pct}%</span>
                          <p className="text-[8px] font-bold text-secondary/20 uppercase tracking-widest">Revenue Share</p>
                       </td>
                       <td className="px-10 py-10 text-center">
                          <div className="bg-snow-pearl px-4 py-2 rounded-2xl border border-gray-100 italic inline-block inline-flex items-center space-x-2">
                             <Users size={14} className="text-primary" />
                             <span className="text-[13px] font-black text-typography">{partner.total_enrolled}</span>
                          </div>
                       </td>
                       <td className="px-10 py-10 font-montserrat italic">
                          <p className="text-xl font-black text-emerald-600 italic tracking-tighter">${Number(partner.payout_pending).toLocaleString()}</p>
                          <p className="text-[7px] font-black text-emerald-500/60 uppercase tracking-widest underline decoration-emerald-200">Verified for Settlement</p>
                       </td>
                       <td className="px-10 py-10 text-right font-montserrat italic">
                          <div className={cn(
                             "inline-flex items-center space-x-2 italic underline decoration-emerald-200",
                             partner.status === 'PENDING_RENEWAL' ? "text-rose-500" : "text-typography font-black"
                          )}>
                             <Calendar size={14} />
                             <span className="text-[12px] uppercase">{new Date(partner.expiry_date).toISOString().split('T')[0]}</span>
                          </div>
                       </td>
                       <td className="px-10 py-10 text-right italic">
                          <button className="p-4 bg-white border border-gray-200 rounded-2xl hover:bg-emerald-500 hover:text-white transition-all shadow-sm group/btn italic underline decoration-emerald-500/20">
                             <ArrowUpRight size={18} />
                          </button>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>

         <div className="p-6 border-t border-gray-50 flex items-center justify-between bg-white italic relative overflow-hidden font-montserrat">
            <div className="absolute top-0 right-0 p-6 opacity-5">
               <Lock size={100} className="text-emerald-500" />
            </div>
            <div className="flex items-center space-x-6 relative z-10 italic">
               <HistoryIcon size={18} className="text-secondary/20" />
               <p className="text-xs font-black text-secondary/40 uppercase tracking-widest italic decoration-emerald-500/10 underline">Contract Integrity Layer v4.0 • Records Pulled from Partnership Ledger</p>
            </div>
            <p className="text-[9px] font-black text-secondary/20 uppercase tracking-widest relative z-10 italic">Audit Log: Active Integrity Polling Sequenced</p>
         </div>
      </section>

      {/* Conversion Funnel Context Node */}
      <section className="bg-slate-900 p-12 rounded-[3.5rem] text-white flex flex-col md:flex-row md:items-center justify-between group overflow-hidden relative font-montserrat">
         <div className="absolute inset-0 bg-emerald-500/5 flex items-center space-x-2 duration-1000" />
         <div className="flex items-center space-x-8 relative z-10">
            <div className="w-20 h-20 bg-emerald-500/20 text-emerald-500 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
               <Target size={32} />
            </div>
            <div>
               <h4 className="text-2xl font-black text-white tracking-tighter uppercase italic">Enrollment Lifecycle Intel</h4>
               <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-2 max-w-lg italic">
                  Partner <span className="text-white">Active Registry</span> shows <span className="text-emerald-500">12% Higher</span> lead-to-enrollment conversion vs non-partners.
               </p>
            </div>
         </div>
         <div className="mt-8 md:mt-0 relative z-10">
            <button className="px-10 py-5 bg-white text-slate-900 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-emerald-500/20 italic">
               View Pipeline Diffs
            </button>
         </div>
      </section>
    </div>
  );
}
