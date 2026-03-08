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
    <div className="space-y-6 font-montserrat">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-4 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-1.5 font-montserrat">
              <div className="bg-primary/5 px-3 py-1.5 rounded-xl border border-primary/10">
                 <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary lowercase">Billing Registry</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30 uppercase tracking-widest text-[10px]">Financial Ops</span>
           </div>
           <h1 className="text-3xl md:text-4xl font-black text-typography tracking-tighter leading-none mb-1">
             Invoice <span className="text-primary italic">Engine</span>
           </h1>
           <p className="text-secondary/40 text-[10px] font-black uppercase tracking-[0.2em] mt-1.5 leading-none">
              Automated Billing, PDF Generation & Reconciliations
           </p>
        </div>
 
        <div className="flex items-center space-x-3">
           <button className="flex items-center space-x-2 px-6 py-2.5 bg-white border border-gray-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:text-primary transition-all shadow-sm">
              <Printer size={16} />
              <span>Bulk Export</span>
           </button>
           <button className="flex items-center space-x-2 px-6 py-2.5 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-primary/20">
              <Zap size={16} />
              <span>Run Batch</span>
           </button>
        </div>
      </section>

      {/* Analytics Strip */}
      <div className="grid grid-cols-4 gap-4">
         {[
           { label: "Receivables", value: "₹18.4L", trend: "14 Drafts", icon: CreditCard, color: "text-primary bg-primary/5" },
           { label: "Collection Rate", value: "92.4%", trend: "+2.1%", icon: CheckCircle2, color: "text-emerald-500 bg-emerald-50" },
           { label: "Overdue", value: "04", trend: "Critical", icon: AlertTriangle, color: "text-rose-500 bg-rose-50" },
           { label: "Sales Out", value: "8.2d", trend: "-1.2d", icon: Clock, color: "text-amber-500 bg-amber-50" }
         ].map((s, i) => (
           <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm group hover:shadow-md transition-all flex items-center justify-between">
              <div>
                 <p className="text-[9px] font-bold text-secondary/30 uppercase tracking-[0.1em] mb-1.5 leading-none">{s.label}</p>
                 <p className="text-2xl font-black text-typography tracking-tighter leading-none">{s.value}</p>
                 <span className="inline-block mt-2 text-[8px] font-black text-secondary/40 bg-gray-50 px-2 py-0.5 rounded-full uppercase tracking-widest">{s.trend}</span>
              </div>
              <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center transition-all group-hover:scale-105", s.color)}>
                 <s.icon size={18} />
              </div>
           </div>
         ))}
      </div>

      {/* Invoice Table */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-snow-pearl/30">
           <div className="flex items-center space-x-3">
              <div className="bg-white border border-gray-100 px-3 py-2 rounded-xl flex items-center space-x-2 shadow-sm">
                 <CalendarDays size={14} className="text-secondary/20" />
                 <select className="bg-transparent text-[11px] font-black text-typography uppercase tracking-tight outline-none">
                    <option>Mar 2026</option>
                    <option>Feb 2026</option>
                    <option>Jan 2026</option>
                 </select>
              </div>
              <div className="relative">
                 <Search size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-secondary/20" />
                 <input placeholder="Search records..." className="w-64 bg-white border border-transparent pl-12 pr-6 py-2.5 rounded-xl text-[13px] font-bold outline-none focus:ring-4 focus:ring-primary/5 shadow-sm" />
              </div>
           </div>
           
           <div className="flex items-center space-x-3">
              <button className="w-9 h-9 bg-white border border-gray-100 rounded-xl flex items-center justify-center text-secondary/20 hover:text-primary transition-all shadow-sm">
                 <Filter size={14} />
              </button>
           </div>
        </div>

        <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead className="bg-snow-pearl/50 border-b border-gray-100">
                  <tr>
                     <th className="px-6 py-3 text-[9px] font-black uppercase tracking-[0.2em] text-secondary/40">Invoice & Partner</th>
                     <th className="px-6 py-3 text-[9px] font-black uppercase tracking-[0.2em] text-secondary/40">Period</th>
                     <th className="px-6 py-3 text-[9px] font-black uppercase tracking-[0.2em] text-secondary/40">Calculation</th>
                     <th className="px-6 py-3 text-[9px] font-black uppercase tracking-[0.2em] text-secondary/40 text-center">Gross</th>
                     <th className="px-6 py-3 text-[9px] font-black uppercase tracking-[0.2em] text-secondary/40 text-center">Status</th>
                     <th className="px-6 py-3 text-[9px] font-black uppercase tracking-[0.2em] text-secondary/40 text-right">Settlement</th>
                  </tr>
               </thead>
              <tbody className="divide-y divide-gray-50">                 {invoices.map((inv) => (
                   <tr key={inv.id} className="group hover:bg-gray-50/50 transition-all font-montserrat">
                     <td className="px-6 py-3">
                        <div className="flex items-center space-x-4">
                           <div className="w-10 h-10 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center text-secondary/20 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                              <FileText size={18} />
                           </div>
                           <div>
                              <h4 className="text-[13px] font-black text-typography leading-none uppercase tracking-tight">{inv.id}</h4>
                              <div className="flex items-center space-x-2 text-[8px] font-black text-secondary/30 uppercase tracking-widest mt-1.5 leading-none">
                                 <Building2 size={10} />
                                 <span>{inv.collegeName}</span>
                              </div>
                           </div>
                        </div>
                     </td>
                     <td className="px-6 py-3">
                        <p className="text-[12px] font-black text-typography leading-none">{inv.month}</p>
                        <p className="text-[8px] font-bold text-secondary/20 uppercase tracking-widest mt-1.5">Cycle</p>
                     </td>
                     <td className="px-6 py-3">
                        <p className="text-[12px] font-black text-typography leading-none">{inv.leadsDelivered} <span className="text-[9px] font-bold text-secondary/20">Leads</span></p>
                        <p className="text-[8px] font-bold text-secondary/40 uppercase tracking-widest mt-1.5 font-montserrat">Rate: ₹{inv.cplRate}/lead</p>
                     </td>
                     <td className="px-6 py-3 text-center">
                        <p className="text-lg font-black text-typography tracking-tighter leading-none">₹{(inv.amount/1000).toFixed(1)}k</p>
                        <p className="text-[8px] font-bold text-secondary/20 uppercase tracking-widest mt-1">Payable</p>
                     </td>
                     <td className="px-6 py-3 text-center">
                        <span className={cn(
                           "inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border",
                           inv.status === 'PAID' ? "bg-emerald-50 text-emerald-600 border border-emerald-100" :
                           inv.status === 'OVERDUE' ? "bg-rose-50 text-rose-600 border border-rose-100" :
                           inv.status === 'DRAFT' ? "bg-gray-50 text-gray-500 border border-gray-100" :
                           "bg-amber-50 text-amber-600 border border-amber-100"
                        )}>
                           <div className={cn("w-1 h-1 rounded-full", inv.status === 'PAID' ? "bg-emerald-500" : "bg-current")} />
                           <span>{inv.status}</span>
                        </span>
                     </td>
                     <td className="px-6 py-3 text-right">
                        <div className="flex items-center justify-end space-x-2">
                           <button className="w-9 h-9 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center text-secondary/40 hover:bg-primary hover:text-white transition-all shadow-sm" title="Download">
                              <Download size={14} />
                           </button>
                           <button className="w-9 h-9 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center text-secondary/40 hover:bg-indigo-500 hover:text-white transition-all shadow-sm" title="Email">
                              <Mail size={14} />
                           </button>
                           <button className="w-9 h-9 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center text-secondary/40 hover:bg-emerald-500 hover:text-white transition-all shadow-sm" title="Mark Paid">
                              <CheckCircle2 size={14} />
                           </button>
                        </div>
                     </td>
                   </tr>
                 ))}
              </tbody>
           </table>
        </div>

        <div className="p-3 border-t border-gray-100 bg-snow-pearl/30 flex items-center justify-between">
           <div className="flex items-center space-x-4">
              <p className="text-[9px] font-black text-secondary/30 uppercase tracking-[0.2em]">Financial Intelligence Node: Invoice Engine v4.2 Active</p>
           </div>
           <p className="text-[8px] font-black text-secondary/20 uppercase tracking-widest">Verified Batch Sync: {new Date().toLocaleDateString()}</p>
        </div>
      </section>
    </div>
  );
}
