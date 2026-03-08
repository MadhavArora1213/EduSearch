"use client";

import { useState } from "react";
import { 
  Building2,
  ChevronRight, 
  Search, 
  Filter, 
  Download, 
  CreditCard,
  FileText,
  Mail,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Zap,
  Printer,
  MoreVertical,
  CalendarDays
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Invoice {
  id: string;
  collegeName: string;
  month: string;
  leadsDelivered: number;
  cplRate: number;
  amount: number;
  status: 'DRAFT' | 'SENT' | 'PAID' | 'OVERDUE' | 'DISPUTED';
}

export default function InvoicesPage() {
  const [invoices] = useState<Invoice[]>([
    {
      id: "INV-2026-03-01",
      collegeName: "IIT Bombay",
      month: "March 2026",
      leadsDelivered: 450,
      cplRate: 350,
      amount: 157500,
      status: 'PAID'
    },
    {
      id: "INV-2026-03-02",
      collegeName: "Amity University",
      month: "March 2026",
      leadsDelivered: 200,
      cplRate: 200,
      amount: 40000,
      status: 'SENT'
    },
    {
      id: "INV-2026-02-15",
      collegeName: "SRM University",
      month: "February 2026",
      leadsDelivered: 120,
      cplRate: 450,
      amount: 54000,
      status: 'OVERDUE'
    }
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-4 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-2">
              <div className="bg-primary/5 px-3 py-1.5 rounded-xl border border-primary/10">
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary italic lowercase">Financial Ops</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30">Billing & Settlements</span>
           </div>
           <h1 className="text-3xl md:text-3xl md:text-5xl font-black text-typography tracking-tighter leading-none mb-1">
             Invoice <span className="text-primary italic">Engine</span>
           </h1>
           <p className="text-secondary/40 text-sm font-bold uppercase tracking-widest mt-2">
              Automated Billing, PDF Generation & Razorpay Reconciliations
           </p>
        </div>

        <div className="flex items-center space-x-4">
           <button className="flex items-center space-x-2 px-6 py-4 bg-snow-pearl border border-gray-200/50 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-white hover:border-gray-200 transition-all active:scale-95 text-secondary/60">
              <Printer size={16} />
              <span>Bulk PDF Export</span>
           </button>
           <button className="flex items-center space-x-2 px-8 py-4 bg-primary text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20">
              <Zap size={18} />
              <span>Run Monthly Batch</span>
           </button>
        </div>
      </section>

      {/* Analytics Strip */}
      <div className="grid grid-cols-4 gap-5">
         {[
           { label: "Total Receivables", value: "₹18.4L", trend: "14 Drafts", icon: CreditCard, color: "text-primary bg-primary/5" },
           { label: "Collection Rate", value: "92.4%", trend: "+2.1%", icon: CheckCircle2, color: "text-emerald-500 bg-emerald-50" },
           { label: "Overdue Count", value: "04", trend: "High Priority", icon: AlertTriangle, color: "text-rose-500 bg-rose-50" },
           { label: "Days Sales Out", value: "8.2d", trend: "-1.2d", icon: Clock, color: "text-amber-500 bg-amber-50" }
         ].map((s, i) => (
           <div key={i} className="bg-white p-5 rounded-2xl border border-gray-50 shadow-sm group hover:border-primary/20 transition-all">
              <div className="flex items-center justify-between mb-4">
                 <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110", s.color)}>
                    <s.icon size={22} />
                 </div>
                 <span className="text-[9px] font-black text-secondary/40 bg-gray-50 px-3 py-1 rounded-full uppercase tracking-widest">{s.trend}</span>
              </div>
              <p className="text-3xl font-black text-typography tracking-tighter">{s.value}</p>
              <p className="text-[10px] font-bold text-secondary/30 uppercase tracking-widest mt-1">{s.label}</p>
           </div>
         ))}
      </div>

      {/* Invoice Table */}
      <section className="bg-white rounded-2xl border border-gray-50 shadow-sm overflow-hidden">
        <div className="p-6 md:p-6 border-b border-gray-50 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
           <div className="flex items-center space-x-4">
              <div className="bg-snow-pearl px-4 py-2 rounded-xl flex items-center space-x-3 border border-gray-100">
                 <CalendarDays size={18} className="text-secondary/20" />
                 <select className="bg-transparent text-sm font-black text-typography outline-none">
                    <option>March 2026</option>
                    <option>February 2026</option>
                    <option>January 2026</option>
                 </select>
              </div>
              <div className="relative">
                 <Search size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-secondary/20" />
                 <input placeholder="Search Invoice # or College..." className="w-80 bg-snow-pearl border-0 pl-16 pr-8 py-5 rounded-3xl text-[14px] font-bold outline-none focus:ring-4 focus:ring-primary/5 transition-all" />
              </div>
           </div>
           
           <div className="flex items-center space-x-4">
              <button className="p-5 bg-snow-pearl rounded-2xl border border-gray-100 text-secondary/20 hover:text-primary transition-all">
                 <Filter size={20} />
              </button>
           </div>
        </div>

        <div className="overflow-x-auto">
           <table className="w-full text-left">
              <thead className="bg-snow-pearl/50 border-b border-gray-100">
                 <tr>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Invoice & Partner</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Period</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Calculation</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40 text-center italic">Gross Amount</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Status</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40 text-right">Settlement</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {invoices.map((inv) => (
                  <tr key={inv.id} className="group hover:bg-snow-pearl/30 transition-all">
                    <td className="px-10 py-4">
                       <div className="flex items-center space-x-6">
                          <div className="w-14 h-14 bg-snow-pearl rounded-2xl flex items-center justify-center text-secondary/10 group-hover:text-primary group-hover:bg-primary/5 transition-all">
                             <FileText size={24} />
                          </div>
                          <div>
                             <h4 className="text-base font-black text-typography leading-tight">{inv.id}</h4>
                             <div className="flex items-center space-x-2 text-[10px] font-bold text-secondary/40 uppercase tracking-widest mt-1">
                                <Building2 size={10} />
                                <span>{inv.collegeName}</span>
                             </div>
                          </div>
                       </div>
                    </td>
                    <td className="px-10 py-4">
                       <p className="text-[12px] font-black text-typography">{inv.month}</p>
                       <p className="text-[10px] font-bold text-secondary/20 uppercase tracking-widest mt-1 italic">Post-paid Cycle</p>
                    </td>
                    <td className="px-10 py-4">
                       <p className="text-[12px] font-black text-typography">{inv.leadsDelivered} <span className="text-[9px] font-bold text-secondary/20">Leads Concluded</span></p>
                       <p className="text-[10px] font-bold text-secondary/40 uppercase tracking-widest mt-1 underline decoration-primary/10">Yield: ₹{inv.cplRate}/lead</p>
                    </td>
                    <td className="px-10 py-4 text-center">
                       <p className="text-xl font-black text-typography tracking-tighter">₹{(inv.amount/1000).toFixed(1)}k</p>
                       <p className="text-[9px] font-bold text-secondary/20 uppercase tracking-widest mt-1">Net Payable</p>
                    </td>
                    <td className="px-10 py-4">
                       <span className={cn(
                          "inline-flex items-center space-x-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                          inv.status === 'PAID' ? "bg-emerald-50 text-emerald-600 border border-emerald-100" :
                          inv.status === 'OVERDUE' ? "bg-rose-50 text-rose-600 border border-rose-100 animate-pulse" :
                          inv.status === 'DRAFT' ? "bg-gray-50 text-gray-500 border border-gray-100" :
                          "bg-amber-50 text-amber-600 border border-amber-100"
                       )}>
                          <div className={cn("w-1.5 h-1.5 rounded-full", inv.status === 'PAID' ? "bg-emerald-500" : "bg-current")} />
                          <span>{inv.status}</span>
                       </span>
                    </td>
                    <td className="px-10 py-4 text-right">
                       <div className="flex items-center justify-end space-x-2">
                          <button className="p-4 bg-white border border-gray-100 rounded-2xl hover:bg-primary hover:text-white transition-all shadow-sm group/btn" title="Download PDF Invoice">
                             <Download size={18} />
                          </button>
                          <button className="p-4 bg-white border border-gray-100 rounded-2xl hover:bg-indigo-500 hover:text-white transition-all shadow-sm group/btn" title="Email via Brevo">
                             <Mail size={18} />
                          </button>
                          <button className="p-4 bg-white border border-gray-100 rounded-2xl hover:bg-emerald-500 hover:text-white transition-all shadow-sm group/btn" title="Mark as Paid">
                             <CheckCircle2 size={18} />
                          </button>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
           </table>
        </div>

        <div className="p-6 border-t border-gray-50 bg-snow-pearl/30 flex items-center justify-between">
           <div className="flex items-center space-x-4">
              <p className="text-xs font-black text-secondary/40 uppercase tracking-widest italic lowercase underline decoration-primary/10">Automatic Reconciliation Active</p>
           </div>
           <p className="text-[10px] font-bold text-secondary/30 uppercase tracking-widest">PostgreSQL Settlement Ledger: Verified 2026-03-07</p>
        </div>
      </section>
    </div>
  );
}
