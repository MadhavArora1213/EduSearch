"use client";

import { useState } from "react";
import { 
  Building2,
  ChevronRight, 
  Search, 
  Filter, 
  Download, 
  CreditCard,
  Target,
  ArrowUpRight,
  ShieldAlert,
  Zap,
  TrendingUp,
  Clock,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CollegeSubscription {
  id: string;
  name: string;
  plan: 'FREE' | 'GROWTH' | 'PREMIUM';
  startDate: string;
  renewalDate: string;
  cplRate: number;
  leadBalance: number;
  status: 'ACTIVE' | 'TRIAL' | 'SUSPENDED' | 'CHURNED';
  churnRisk: 'LOW' | 'MEDIUM' | 'HIGH';
  upgradePrompts: number;
}

export default function SubscriptionsPage() {
  const [subscriptions] = useState<CollegeSubscription[]>([
    {
      id: "SUB-001",
      name: "IIT Bombay",
      plan: 'PREMIUM',
      startDate: "2024-01-15",
      renewalDate: "2025-01-15",
      cplRate: 350,
      leadBalance: 1240,
      status: 'ACTIVE',
      churnRisk: 'LOW',
      upgradePrompts: 1
    },
    {
      id: "SUB-002",
      name: "Amity University",
      plan: 'GROWTH',
      startDate: "2025-02-01",
      renewalDate: "2025-03-01",
      cplRate: 200,
      leadBalance: 45,
      status: 'TRIAL',
      churnRisk: 'MEDIUM',
      upgradePrompts: 4
    },
    {
      id: "SUB-003",
      name: "SRM Institute",
      plan: 'FREE',
      startDate: "2025-03-01",
      renewalDate: "2025-03-15",
      cplRate: 450,
      leadBalance: 0,
      status: 'CHURNED',
      churnRisk: 'HIGH',
      upgradePrompts: 8
    }
  ]);

  return (
    <div className="space-y-6 font-montserrat">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-4 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-1.5 font-montserrat">
              <div className="bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100">
                 <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 lowercase">Revenue Engine</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30 uppercase tracking-widest text-[10px]">Institution Lifecycle</span>
           </div>
           <h1 className="text-3xl md:text-4xl font-black text-typography tracking-tighter leading-none mb-1">
             Subscription <span className="text-primary italic">Matrix</span>
           </h1>
           <p className="text-secondary/40 text-[10px] font-black uppercase tracking-[0.2em] mt-1.5 leading-none">
              Managing Partner Plans, Retention & Yield Optimization
           </p>
        </div>
 
        <div className="flex items-center space-x-4">
           <button className="flex items-center space-x-2 px-6 py-2.5 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20">
              <Zap size={16} />
              <span>Bulk Update</span>
           </button>
        </div>
      </section>

      {/* Analytics Strip */}
      <div className="grid grid-cols-4 gap-4">
         {[
           { label: "Active MRR", value: "₹42.8L", trend: "+8.4%", icon: TrendingUp, color: "text-emerald-500 bg-emerald-50" },
           { label: "Average CPL", value: "₹284", trend: "Target: ₹300", icon: Target, color: "text-primary bg-primary/5" },
           { label: "Renewals (7d)", value: "114", trend: "Action Needed", icon: Clock, color: "text-amber-500 bg-amber-50" },
           { label: "Upgrade conversion", value: "14.2%", trend: "+2.1%", icon: Sparkles, color: "text-indigo-500 bg-indigo-50" }
         ].map((s, i) => (
           <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm group transition-all hover:shadow-md">
              <div className="flex items-center justify-between mb-3">
                 <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center transition-all group-hover:scale-105", s.color)}>
                    <s.icon size={18} />
                 </div>
                 <span className="text-[8px] font-black text-secondary/40 bg-gray-50 px-2 py-0.5 rounded-full uppercase tracking-widest">{s.trend}</span>
              </div>
              <p className="text-2xl font-black text-typography tracking-tighter leading-none">{s.value}</p>
              <p className="text-[9px] font-bold text-secondary/30 uppercase tracking-[0.1em] mt-1.5">{s.label}</p>
           </div>
         ))}
      </div>

      {/* Subscription Listing */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-snow-pearl/30">
           <div className="relative flex-1 max-w-xl">
              <Search size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-secondary/20" />
              <input placeholder="Search documents..." className="w-full bg-white border border-transparent pl-12 pr-6 py-2.5 rounded-xl text-[13px] font-bold outline-none focus:ring-4 focus:ring-primary/5 shadow-sm" />
           </div>
           
           <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-secondary/40 hover:text-primary transition-all shadow-sm">
                 <Filter size={14} />
                 <span>Filter</span>
              </button>
              <button className="w-9 h-9 bg-white flex items-center justify-center rounded-xl border border-gray-100 text-secondary/20 hover:text-primary transition-all shadow-sm">
                 <Download size={16} />
              </button>
           </div>
        </div>

        <div className="overflow-x-auto">
           <table className="w-full text-left">
               <thead className="bg-snow-pearl/50 border-b border-gray-100">
                  <tr>
                     <th className="px-6 py-3 text-[9px] font-black uppercase tracking-[0.2em] text-secondary/40">Institution</th>
                     <th className="px-6 py-3 text-[9px] font-black uppercase tracking-[0.2em] text-secondary/40">Tier & Yield</th>
                     <th className="px-6 py-3 text-[9px] font-black uppercase tracking-[0.2em] text-secondary/40">Credits</th>
                     <th className="px-6 py-3 text-[9px] font-black uppercase tracking-[0.2em] text-secondary/40">Churn Risk</th>
                     <th className="px-6 py-3 text-[9px] font-black uppercase tracking-[0.2em] text-secondary/40">Status</th>
                     <th className="px-6 py-3 text-[9px] font-black uppercase tracking-[0.2em] text-secondary/40 text-right">Actions</th>
                  </tr>
               </thead>
              <tbody className="divide-y divide-gray-50">
                {subscriptions.map((sub) => (
                   <tr key={sub.id} className="group hover:bg-snow-pearl/30 transition-all font-montserrat">
                     <td className="px-6 py-3">
                        <div className="flex items-center space-x-4">
                           <div className="w-10 h-10 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center text-secondary/20 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                              <Building2 size={18} />
                           </div>
                           <div>
                              <h4 className="text-[13px] font-black text-typography leading-none uppercase tracking-tight">{sub.name}</h4>
                              <p className="text-[8px] font-black text-secondary/30 uppercase tracking-[0.1em] mt-1.5">Started {new Date(sub.startDate).toLocaleDateString()}</p>
                           </div>
                        </div>
                     </td>
                     <td className="px-6 py-3">
                        <div className="flex flex-col space-y-1">
                           <span className={cn(
                              "inline-flex px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest w-fit border",
                              sub.plan === 'PREMIUM' ? "bg-indigo-50 text-indigo-600 border-indigo-100" :
                              sub.plan === 'GROWTH' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                              "bg-gray-50 text-gray-600 border-gray-200"
                           )}>
                              {sub.plan}
                           </span>
                           <p className="text-xs font-black text-typography leading-none">₹{sub.cplRate} <span className="text-[7px] font-black text-secondary/20 uppercase">/ CPL</span></p>
                        </div>
                     </td>
                     <td className="px-6 py-3">
                        <div className="flex flex-col space-y-1.5">
                           <div className="flex items-center justify-between w-24">
                             <span className="text-[10px] font-black text-typography">{sub.leadBalance}</span>
                             <span className="text-[7px] font-black text-secondary/20 uppercase tracking-widest">Left</span>
                          </div>
                           <div className="w-24 h-1 bg-gray-100 rounded-full overflow-hidden">
                              <div 
                                 className={cn("h-full rounded-full transition-all duration-1000", sub.leadBalance < 100 ? "bg-rose-500" : "bg-primary")} 
                                 style={{ width: `${Math.min(100, (sub.leadBalance/2000)*100)}%` }} 
                              />
                           </div>
                        </div>
                     </td>
                     <td className="px-6 py-3">
                        <div className={cn(
                           "inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border font-black text-[8px] uppercase tracking-widest",
                           sub.churnRisk === 'LOW' ? "bg-emerald-50 border-emerald-100 text-emerald-600" :
                           sub.churnRisk === 'MEDIUM' ? "bg-amber-50 border-amber-100 text-amber-600" :
                           "bg-rose-50 border-rose-100 text-rose-600 animate-pulse"
                        )}>
                           <ShieldAlert size={12} />
                           <span>{sub.churnRisk} RISK</span>
                        </div>
                       {sub.upgradePrompts > 3 && (
                          <p className="text-[9px] font-black text-rose-500 uppercase tracking-widest mt-2">🔥 Sales Follow-up Req.</p>
                       )}
                    </td>
                     <td className="px-6 py-3">
                        <span className={cn(
                           "inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border",
                           sub.status === 'ACTIVE' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                           sub.status === 'TRIAL' ? "bg-amber-50 text-amber-600 border-amber-100" :
                           sub.status === 'CHURNED' ? "bg-rose-50 text-rose-600 border-rose-100" :
                           "bg-gray-50 text-gray-600 border-gray-200"
                        )}>
                           <div className={cn("w-1 h-1 rounded-full", sub.status === 'ACTIVE' ? "bg-emerald-500 animate-pulse" : "bg-current")} />
                           <span>{sub.status}</span>
                        </span>
                     </td>
                     <td className="px-6 py-3 text-right">
                        <div className="flex items-center justify-end space-x-2">
                           <button className="w-9 h-9 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center text-secondary/40 hover:bg-primary hover:text-white transition-all shadow-sm" title="Issue Lead Credits">
                              <Zap size={14} />
                           </button>
                           <button className="w-9 h-9 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center text-secondary/40 hover:bg-emerald-500 hover:text-white transition-all shadow-sm" title="Upgrade Plan">
                              <ArrowUpRight size={14} />
                           </button>
                           <button className="w-9 h-9 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center text-secondary/40 hover:bg-slate-900 hover:text-white transition-all shadow-sm" title="Manage Billing">
                              <CreditCard size={14} />
                           </button>
                        </div>
                     </td>
                   </tr>
                 ))}
              </tbody>
           </table>
        </div>

        <div className="p-4 border-t border-gray-100 bg-snow-pearl/30 flex items-center justify-between">
           <div className="flex items-center space-x-3">
              <div className="flex -space-x-2">
                 {[1,2,3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-[8px] font-black text-primary">L+</div>
                 ))}
              </div>
              <p className="text-[10px] font-black text-secondary/40 uppercase tracking-widest">Growth Intelligence: 14 colleges eligible for upgrade</p>
           </div>
           <button className="py-2 px-6 bg-white border border-gray-100 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-sm">
              Trigger Automation
           </button>
        </div>
      </section>
    </div>
  );
}
