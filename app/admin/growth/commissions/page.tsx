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
    <div className="space-y-10">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-6 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-2">
              <div className="bg-indigo-50 px-3 py-1.5 rounded-xl border border-indigo-100">
                 <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 italic">Affiliate Yield</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30">Secondary Revenue Channels</span>
           </div>
           <h1 className="text-3xl md:text-3xl md:text-5xl font-black text-typography tracking-tighter leading-none mb-1">
             Settlement <span className="text-indigo-600 italic">Vault</span>
           </h1>
           <p className="text-secondary/40 text-sm font-bold uppercase tracking-widest mt-2">
              Tracking Loan Referrals, Study Abroad Placements & Partner Payables
           </p>
        </div>

        <div className="flex items-center space-x-4">
           <div className="bg-white px-8 py-4 rounded-3xl border border-gray-100 shadow-sm flex items-center space-x-6">
              <div>
                 <p className="text-[10px] font-black text-secondary/20 uppercase tracking-widest">Total Commission (MTD)</p>
                 <p className="text-2xl font-black text-typography tracking-tighter">₹5.24L <span className="text-emerald-500 text-xs text-[10px] font-black italic">+12%</span></p>
              </div>
              <Wallet size={28} className="text-indigo-600 shadow-xl shadow-indigo-600/20" />
           </div>
        </div>
      </section>

      {/* Partner Entry Quick Actions */}
      <div className="grid grid-cols-12 gap-8">
         <div className="col-span-12 lg:col-span-8 bg-white p-10 rounded-[2.5rem] border border-gray-50 shadow-sm">
            <h3 className="text-xl font-black text-typography tracking-tighter italic lowercase underline decoration-primary/10 mb-8">Integrated Partner Portals</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
               {[
                  { name: 'HDFC Credila', type: 'Loan', icon: ShieldCheck },
                  { name: 'Avanse', type: 'Loan', icon: ShieldCheck },
                  { name: 'IDP Education', type: 'SA', icon: Globe },
                  { name: 'ApplyBoard', type: 'SA', icon: Globe },
               ].map((partner, i) => (
                  <div key={i} className="flex flex-col items-center justify-center p-6 bg-snow-pearl/50 rounded-2xl border border-gray-100 group hover:bg-white hover:border-indigo-500/20 transition-all cursor-pointer">
                     <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-indigo-600 mb-4 group-hover:scale-110 transition-transform">
                        <partner.icon size={24} />
                     </div>
                     <p className="text-xs font-black text-typography uppercase text-center">{partner.name}</p>
                     <p className="text-[9px] font-bold text-secondary/40 uppercase mt-2">{partner.type} Partner</p>
                     <div className="mt-4 flex items-center space-x-2">
                        <LinkIcon size={14} className="text-indigo-500" />
                     </div>
                  </div>
               ))}
            </div>
         </div>

         <div className="col-span-12 lg:col-span-4 bg-slate-900 p-10 rounded-[2.5rem] text-white relative overflow-hidden flex flex-col justify-between">
            <div className="absolute bottom-0 right-0 p-10 opacity-10">
               <Zap size={120} className="text-indigo-500" />
            </div>
            <div className="relative z-10">
               <h4 className="text-2xl font-black tracking-tighter italic lowercase underline decoration-indigo-500/30">Yield Alerts</h4>
               <div className="mt-8 space-y-6">
                  <div className="flex items-start space-x-4">
                     <AlertCircle size={20} className="text-amber-500" />
                     <div>
                        <p className="text-xs font-black uppercase italic">Dues Approaching Threshold</p>
                        <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">₹1.2L pending from 'IDP' &gt; 30 days</p>
                     </div>
                  </div>
                  <div className="flex items-start space-x-4">
                     <CheckCircle2 size={20} className="text-emerald-500" />
                     <div>
                        <p className="text-xs font-black uppercase italic">Settlement Successful</p>
                        <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">HDFC Credila reconciled ₹37.5k</p>
                     </div>
                  </div>
               </div>
            </div>
            <button className="relative z-10 w-full py-4 bg-indigo-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-500 transition-all mt-8">
               Generate Settlement Statement
            </button>
         </div>
      </div>

      {/* Ledger Table */}
      <section className="bg-white rounded-[2.5rem] border border-gray-50 shadow-sm overflow-hidden">
        <div className="p-6 md:p-10 border-b border-gray-50 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
           <div className="relative flex-1 max-w-xl">
              <Search size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-secondary/20" />
              <input placeholder="Search Student or Partner..." className="w-full bg-snow-pearl border-0 pl-16 pr-8 py-5 rounded-3xl text-[14px] font-bold outline-none focus:ring-4 focus:ring-primary/5 transition-all" />
           </div>
           <div className="flex items-center space-x-4 pl-10">
              <button className="p-5 bg-snow-pearl rounded-2xl border border-gray-100 text-secondary/20 hover:text-indigo-600 transition-all">
                 <Filter size={20} />
              </button>
              <button className="p-5 bg-snow-pearl rounded-2xl border border-gray-100 text-secondary/20 hover:text-indigo-600 transition-all">
                 <Download size={20} />
              </button>
           </div>
        </div>

        <div className="overflow-x-auto">
           <table className="w-full text-left">
              <thead className="bg-snow-pearl/50 border-b border-gray-100">
                 <tr>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Student & Placement Type</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Partner Entity</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Base Value</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40 italic">Commission</th>
                    <th className="px-10 py-6 text-[10px) font-black uppercase tracking-widest text-secondary/40">Status</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40 text-right">Actions</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {commissions.map((entry) => (
                  <tr key={entry.id} className="group hover:bg-indigo-50/10 transition-all">
                    <td className="px-10 py-8">
                       <div className="flex items-center space-x-6">
                          <div className="w-14 h-14 bg-snow-pearl rounded-2xl flex items-center justify-center text-secondary/10 group-hover:text-indigo-600 group-hover:bg-indigo-50 transition-all">
                             {entry.type === 'STUDY_ABROAD' ? <Globe size={24} /> : <Wallet size={24} />}
                          </div>
                          <div>
                             <h4 className="text-base font-black text-typography leading-tight">{entry.student}</h4>
                             <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mt-1 italic underline decoration-indigo-600/10">{entry.type.replace('_', ' ')}</p>
                          </div>
                       </div>
                    </td>
                    <td className="px-10 py-8">
                       <p className="text-sm font-black text-typography">{entry.partner}</p>
                       <p className="text-[10px] font-bold text-secondary/30 uppercase tracking-widest mt-1 italic">Date: {new Date(entry.enrollmentDate).toLocaleDateString()}</p>
                    </td>
                    <td className="px-10 py-8">
                       <p className="text-[12px] font-black text-typography">₹{(entry.amount/100000).toFixed(2)}L</p>
                       <p className="text-[10px] font-bold text-secondary/30 uppercase tracking-widest mt-1 italic">Contract Rate: {entry.rate}%</p>
                    </td>
                    <td className="px-10 py-8">
                       <div className="inline-flex items-center space-x-2 bg-indigo-50 px-4 py-2 rounded-2xl border border-indigo-100">
                          <TrendingUp size={14} className="text-indigo-600" />
                          <span className="text-sm font-black text-indigo-700 italic">₹{entry.commission.toLocaleString()}</span>
                       </div>
                    </td>
                    <td className="px-10 py-8">
                       <span className={cn(
                          "inline-flex items-center space-x-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                          entry.status === 'PAID' ? "bg-emerald-50 text-emerald-600 border border-emerald-100" :
                          entry.status === 'VERIFYING' ? "bg-amber-50 text-amber-600 border border-amber-100" :
                          "bg-indigo-50 text-indigo-600 border border-indigo-100"
                       )}>
                          <div className={cn("w-1.5 h-1.5 rounded-full", entry.status === 'PAID' ? "bg-emerald-500" : "bg-current")} />
                          <span>{entry.status}</span>
                       </span>
                    </td>
                    <td className="px-10 py-8 text-right">
                       <div className="flex items-center justify-end space-x-2">
                          <button className="p-4 bg-white border border-gray-100 rounded-2xl hover:bg-emerald-500 hover:text-white transition-all shadow-sm" title="Confirm Settlement">
                             <CheckCircle2 size={18} />
                          </button>
                          <button className="p-4 bg-white border border-gray-100 rounded-2xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm" title="View Partner Ledger">
                             <ArrowUpRight size={18} />
                          </button>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
           </table>
        </div>

        <div className="p-10 border-t border-gray-50 flex items-center justify-between bg-snow-pearl/30">
           <div className="flex items-center space-x-4">
              <p className="text-xs font-black text-secondary/40 uppercase tracking-widest italic lowercase underline decoration-indigo-600/10 italic">Affiliate Settlement Ledger: Automated Verification Protocol</p>
           </div>
           <p className="text-[10px] font-bold text-secondary/30 uppercase tracking-widest">PostgreSQL Settlement Engine: v2.4.1 Active</p>
        </div>
      </section>
    </div>
  );
}
