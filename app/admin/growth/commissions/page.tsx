"use client";

import { useState } from "react";
import { 
  Building2,
  ChevronRight, 
  Search, 
  Filter, 
  Download, 
  Globe,
  Wallet,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  TrendingUp,
  Clock,
  Sparkles,
  Link as LinkIcon,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CommissionEntry {
  id: string;
  type: 'STUDY_ABROAD' | 'LOAN';
  partner: string;
  student: string;
  enrollmentDate: string;
  amount: number;
  rate: number;
  commission: number;
  status: 'DUE' | 'PAID' | 'VERIFYING';
}

export default function CommissionTrackerPage() {
  const [commissions] = useState<CommissionEntry[]>([
    {
      id: "COM-001",
      type: 'STUDY_ABROAD',
      partner: "University of Salford, UK",
      student: "Aaryan Verma",
      enrollmentDate: "2026-03-01",
      amount: 1450000,
      rate: 10,
      commission: 145000,
      status: 'VERIFYING'
    },
    {
      id: "COM-002",
      type: 'LOAN',
      partner: "HDFC Credila",
      student: "Priya Sharma",
      enrollmentDate: "2026-02-28",
      amount: 2500000,
      rate: 1.5,
      commission: 37500,
      status: 'PAID'
    },
    {
      id: "COM-003",
      type: 'STUDY_ABROAD',
      partner: "Monash University, AU",
      student: "Kabir Singh",
      enrollmentDate: "2026-02-15",
      amount: 1800000,
      rate: 12,
      commission: 216000,
      status: 'DUE'
    }
  ]);

  return (
    <div className="space-y-6 font-montserrat">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-4 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-1.5 font-montserrat">
              <div className="bg-indigo-50 px-3 py-1.5 rounded-xl border border-indigo-100">
                 <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 lowercase">Affiliate Yield</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30 uppercase tracking-widest text-[10px]">Secondary Revenue Channels</span>
           </div>
           <h1 className="text-3xl md:text-4xl font-black text-typography tracking-tighter leading-none mb-1">
             Settlement <span className="text-indigo-600 italic">Vault</span>
           </h1>
           <p className="text-secondary/40 text-[10px] font-black uppercase tracking-[0.2em] mt-1.5 leading-none">
              Tracking Referrals, Placements & Partner Payables
           </p>
        </div>
 
        <div className="flex items-center space-x-4">
           <div className="bg-white px-6 py-3 rounded-xl border border-gray-100 shadow-sm flex items-center space-x-4">
              <div>
                 <p className="text-[9px] font-black text-secondary/20 uppercase tracking-widest">Commission (MTD)</p>
                 <p className="text-xl font-black text-typography tracking-tighter leading-none mt-1">₹5.24L <span className="text-emerald-500 text-[10px] font-black ml-1">+12%</span></p>
              </div>
              <Wallet size={20} className="text-indigo-600 shadow-lg shadow-indigo-600/20" />
           </div>
        </div>
      </section>

      {/* Partner Entry Quick Actions */}
      <div className="grid grid-cols-12 gap-4">
         <div className="col-span-12 lg:col-span-8 bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="text-sm font-black text-typography tracking-tight uppercase mb-6">Partner Portals</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               {[
                  { name: 'HDFC Credila', type: 'Loan', icon: ShieldCheck },
                  { name: 'Avanse', type: 'Loan', icon: ShieldCheck },
                  { name: 'IDP Education', type: 'SA', icon: Globe },
                  { name: 'ApplyBoard', type: 'SA', icon: Globe },
               ].map((partner, i) => (
                  <div key={i} className="flex flex-col items-center justify-center p-4 bg-snow-pearl/30 rounded-xl border border-gray-100 group hover:bg-white hover:border-indigo-500/20 transition-all cursor-pointer">
                     <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center text-indigo-600 mb-3 group-hover:scale-110 transition-transform">
                        <partner.icon size={20} />
                     </div>
                     <p className="text-[11px] font-black text-typography uppercase text-center leading-tight">{partner.name}</p>
                     <p className="text-[8px] font-bold text-secondary/40 uppercase mt-1.5">{partner.type}</p>
                  </div>
               ))}
            </div>
         </div>
 
         <div className="col-span-12 lg:col-span-4 bg-slate-900 p-5 rounded-xl text-white relative overflow-hidden flex flex-col justify-between group">
            <div className="absolute bottom-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-1000">
               <Zap size={80} className="text-indigo-500" />
            </div>
            <div className="relative z-10">
               <h4 className="text-sm font-black tracking-tight uppercase">Yield Alerts</h4>
               <div className="mt-6 space-y-4">
                  <div className="flex items-start space-x-3">
                     <AlertCircle size={16} className="text-amber-500" />
                     <div>
                        <p className="text-[10px] font-black uppercase leading-tight">Dues Threshold</p>
                        <p className="text-[8px] font-bold text-slate-400 mt-1 uppercase tracking-widest">₹1.2L pending from 'IDP'</p>
                     </div>
                  </div>
                  <div className="flex items-start space-x-3">
                     <CheckCircle2 size={16} className="text-emerald-500" />
                     <div>
                        <p className="text-[10px] font-black uppercase leading-tight">Settlement Sync</p>
                        <p className="text-[8px] font-bold text-slate-400 mt-1 uppercase tracking-widest">HDFC Credila reconciled ₹37.5k</p>
                     </div>
                  </div>
               </div>
            </div>
            <button className="relative z-10 w-full py-3 bg-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-500 transition-all mt-6 shadow-lg shadow-indigo-600/20">
               Settlement Statement
            </button>
         </div>
      </div>
 
      {/* Ledger Table */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-snow-pearl/30">
           <div className="relative flex-1 max-w-xl">
              <Search size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-secondary/20" />
              <input placeholder="Search documents..." className="w-full bg-white border border-transparent pl-12 pr-6 py-2.5 rounded-xl text-[13px] font-bold outline-none focus:ring-4 focus:ring-primary/5 shadow-sm" />
           </div>
           <div className="flex items-center space-x-3">
              <button className="w-9 h-9 bg-white border border-gray-100 rounded-xl flex items-center justify-center text-secondary/20 hover:text-indigo-600 transition-all shadow-sm">
                 <Filter size={14} />
              </button>
              <button className="w-9 h-9 bg-white border border-gray-100 rounded-xl flex items-center justify-center text-secondary/20 hover:text-indigo-600 transition-all shadow-sm">
                 <Download size={14} />
              </button>
           </div>
        </div>

        <div className="overflow-x-auto">
           <table className="w-full text-left">
              <thead className="bg-snow-pearl/50 border-b border-gray-100">
                 <tr>
                    <th className="px-6 py-3 text-[9px] font-black uppercase tracking-[0.2em] text-secondary/40">Student & Placement Type</th>
                    <th className="px-6 py-3 text-[9px] font-black uppercase tracking-[0.2em] text-secondary/40">Partner Entity</th>
                    <th className="px-6 py-3 text-[9px] font-black uppercase tracking-[0.2em] text-secondary/40">Base Value</th>
                    <th className="px-6 py-3 text-[9px] font-black uppercase tracking-[0.2em] text-secondary/40">Commission</th>
                    <th className="px-6 py-3 text-[9px] font-black uppercase tracking-[0.2em] text-secondary/40">Status</th>
                    <th className="px-6 py-3 text-[9px] font-black uppercase tracking-[0.2em] text-secondary/40 text-right">Actions</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {commissions.map((entry) => (
                  <tr key={entry.id} className="group hover:bg-indigo-50/10 transition-all font-montserrat">
                    <td className="px-6 py-3">
                       <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-secondary/20 group-hover:bg-indigo-600 group-hover:text-white transition-all border border-gray-100 shadow-sm">
                             {entry.type === 'STUDY_ABROAD' ? <Globe size={18} /> : <Wallet size={18} />}
                          </div>
                          <div>
                             <h4 className="text-[13px] font-black text-typography leading-none uppercase tracking-tight">{entry.student}</h4>
                             <p className="text-[8px] font-black text-indigo-600 uppercase tracking-widest mt-1.5">{entry.type.replace('_', ' ')}</p>
                          </div>
                       </div>
                    </td>
                    <td className="px-6 py-3">
                       <p className="text-xs font-black text-typography leading-none">{entry.partner}</p>
                       <p className="text-[8px] font-bold text-secondary/30 uppercase tracking-widest mt-1.5">Date: {new Date(entry.enrollmentDate).toLocaleDateString()}</p>
                    </td>
                    <td className="px-6 py-3">
                       <p className="text-[12px] font-black text-typography leading-none">₹{(entry.amount/100000).toFixed(2)}L</p>
                       <p className="text-[8px] font-bold text-secondary/30 uppercase tracking-widest mt-1.5">Rate: {entry.rate}%</p>
                    </td>
                    <td className="px-6 py-3">
                       <div className="inline-flex items-center space-x-1.5 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100">
                          <TrendingUp size={12} className="text-indigo-600" />
                          <span className="text-[11px] font-black text-indigo-700">₹{entry.commission.toLocaleString()}</span>
                       </div>
                    </td>
                    <td className="px-6 py-3">
                       <span className={cn(
                          "inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border",
                          entry.status === 'PAID' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                          entry.status === 'VERIFYING' ? "bg-amber-50 text-amber-600 border-amber-100" :
                          "bg-indigo-50 text-indigo-600 border-indigo-100"
                       )}>
                          <div className={cn("w-1 h-1 rounded-full", entry.status === 'PAID' ? "bg-emerald-500" : "bg-current")} />
                          <span>{entry.status}</span>
                       </span>
                    </td>
                    <td className="px-6 py-3 text-right">
                       <div className="flex items-center justify-end space-x-2">
                          <button className="w-9 h-9 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center text-secondary/40 hover:bg-emerald-500 hover:text-white transition-all shadow-sm" title="Confirm Settlement">
                             <CheckCircle2 size={14} />
                          </button>
                          <button className="w-9 h-9 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center text-secondary/40 hover:bg-indigo-600 hover:text-white transition-all shadow-sm" title="View Partner Ledger">
                             <ArrowUpRight size={14} />
                          </button>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
           </table>
        </div>

        <div className="p-3 border-t border-gray-100 flex items-center justify-between bg-snow-pearl/30">
           <div className="flex items-center space-x-4">
              <p className="text-[9px] font-black text-secondary/30 uppercase tracking-[0.2em]">Affiliate Settlement Protocol Node: Settlement Engine v2.4 Active</p>
           </div>
           <p className="text-[8px] font-black text-secondary/20 uppercase tracking-widest">PostgreSQL Settlement Ledger</p>
        </div>
      </section>
    </div>
  );
}
