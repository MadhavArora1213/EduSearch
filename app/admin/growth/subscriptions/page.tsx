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
    <div className="space-y-6">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-4 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-2">
              <div className="bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100">
                 <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 italic lowercase">Revenue Engine</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30">Institution Lifecycle</span>
           </div>
           <h1 className="text-3xl md:text-3xl md:text-5xl font-black text-typography tracking-tighter leading-none mb-1">
             Subscription <span className="text-primary italic">Matrix</span>
           </h1>
           <p className="text-secondary/40 text-sm font-bold uppercase tracking-widest mt-2">
              Managing Partner Plans, Retention & Yield Optimization
           </p>
        </div>

        <div className="flex items-center space-x-4">
           <button className="flex items-center space-x-2 px-8 py-4 bg-primary text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20">
              <Zap size={18} />
              <span>Bulk Plan Update</span>
           </button>
        </div>
      </section>

      {/* Analytics Strip */}
      <div className="grid grid-cols-4 gap-5">
         {[
           { label: "Active MRR", value: "₹42.8L", trend: "+8.4%", icon: TrendingUp, color: "text-emerald-500 bg-emerald-50" },
           { label: "Average CPL", value: "₹284", trend: "Target: ₹300", icon: Target, color: "text-primary bg-primary/5" },
           { label: "Renewals (7d)", value: "114", trend: "Action Needed", icon: Clock, color: "text-amber-500 bg-amber-50" },
           { label: "Upgrade conversion", value: "14.2%", trend: "+2.1%", icon: Sparkles, color: "text-indigo-500 bg-indigo-50" }
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

      {/* Subscription Listing */}
      <section className="bg-white rounded-2xl border border-gray-50 shadow-sm overflow-hidden">
        <div className="p-6 md:p-6 border-b border-gray-50 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
           <div className="relative flex-1 max-w-xl">
              <Search size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-secondary/20" />
              <input placeholder="Search Institution..." className="w-full bg-snow-pearl border-0 pl-16 pr-8 py-5 rounded-3xl text-[14px] font-bold outline-none focus:ring-4 focus:ring-primary/5 transition-all" />
           </div>
           
           <div className="flex items-center space-x-4 pl-10">
              <button className="flex items-center space-x-2 px-6 py-4 bg-snow-pearl border border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-secondary/40 hover:text-primary transition-all">
                 <Filter size={18} />
                 <span>Filter Plans</span>
              </button>
              <button className="p-5 bg-snow-pearl rounded-2xl border border-gray-100 text-secondary/20 hover:text-primary transition-all">
                 <Download size={20} />
              </button>
           </div>
        </div>

        <div className="overflow-x-auto">
           <table className="w-full text-left">
              <thead className="bg-snow-pearl/50 border-b border-gray-100">
                 <tr>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Institution</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Tier & Yield</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Credits</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">AI Churn Risk</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Status</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40 text-right">Actions</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {subscriptions.map((sub) => (
                  <tr key={sub.id} className="group hover:bg-snow-pearl/30 transition-all">
                    <td className="px-10 py-4">
                       <div className="flex items-center space-x-6">
                          <div className="w-14 h-14 bg-snow-pearl rounded-2xl flex items-center justify-center text-secondary/10 group-hover:text-primary group-hover:bg-primary/5 transition-all">
                             <Building2 size={24} />
                          </div>
                          <div>
                             <h4 className="text-base font-black text-typography leading-tight">{sub.name}</h4>
                             <p className="text-[10px] font-bold text-secondary/40 uppercase tracking-widest mt-1 italic font-black">Started {new Date(sub.startDate).toLocaleDateString()}</p>
                          </div>
                       </div>
                    </td>
                    <td className="px-10 py-4">
                       <div className="flex flex-col space-y-1">
                          <span className={cn(
                             "inline-flex px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest w-fit",
                             sub.plan === 'PREMIUM' ? "bg-indigo-50 text-indigo-600" :
                             sub.plan === 'GROWTH' ? "bg-emerald-50 text-emerald-600" :
                             "bg-gray-50 text-gray-600"
                          )}>
                             {sub.plan}
                          </span>
                          <p className="text-[12px] font-black text-typography mt-1">₹{sub.cplRate} <span className="text-[9px] font-bold text-secondary/20">/ CPL</span></p>
                       </div>
                    </td>
                    <td className="px-10 py-4">
                       <div className="flex flex-col space-y-2">
                          <div className="flex items-center justify-between w-32">
                             <span className="text-[10px] font-black text-typography">{sub.leadBalance}</span>
                             <span className="text-[9px] font-bold text-secondary/20 uppercase">Remaining</span>
                          </div>
                          <div className="w-32 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                             <div 
                                className={cn("h-full rounded-full transition-all duration-1000", sub.leadBalance < 100 ? "bg-rose-500" : "bg-primary")} 
                                style={{ width: `${Math.min(100, (sub.leadBalance/2000)*100)}%` }} 
                             />
                          </div>
                       </div>
                    </td>
                    <td className="px-10 py-4">
                       <div className={cn(
                          "inline-flex items-center space-x-2 px-4 py-2 rounded-2xl border italic font-black text-[10px] uppercase tracking-widest",
                          sub.churnRisk === 'LOW' ? "bg-emerald-50 border-emerald-100 text-emerald-600" :
                          sub.churnRisk === 'MEDIUM' ? "bg-amber-50 border-amber-100 text-amber-600" :
                          "bg-rose-50 border-rose-100 text-rose-600 animate-pulse"
                       )}>
                          <ShieldAlert size={14} />
                          <span>{sub.churnRisk} RISK</span>
                       </div>
                       {sub.upgradePrompts > 3 && (
                          <p className="text-[9px] font-black text-rose-500 uppercase tracking-widest mt-2 blink">🔥 Sales Follow-up Req.</p>
                       )}
                    </td>
                    <td className="px-10 py-4">
                       <span className={cn(
                          "inline-flex items-center space-x-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                          sub.status === 'ACTIVE' ? "bg-emerald-50 text-emerald-600" :
                          sub.status === 'TRIAL' ? "bg-amber-50 text-amber-600" :
                          sub.status === 'CHURNED' ? "bg-rose-50 text-rose-600" :
                          "bg-gray-50 text-gray-600"
                       )}>
                          <div className={cn("w-1.5 h-1.5 rounded-full", sub.status === 'ACTIVE' ? "bg-emerald-500 animate-pulse" : "bg-current")} />
                          <span>{sub.status}</span>
                       </span>
                    </td>
                    <td className="px-10 py-4 text-right">
                       <div className="flex items-center justify-end space-x-2">
                          <button className="p-4 bg-white border border-gray-100 rounded-2xl hover:bg-emerald-500 hover:text-white transition-all shadow-sm group/btn" title="Issue Lead Credits">
                             <Zap size={18} />
                          </button>
                          <button className="p-4 bg-white border border-gray-100 rounded-2xl hover:bg-primary hover:text-white transition-all shadow-sm group/btn" title="Upgrade Plan">
                             <ArrowUpRight size={18} />
                          </button>
                          <button className="p-4 bg-white border border-gray-100 rounded-2xl hover:bg-gray-900 hover:text-white transition-all shadow-sm group/btn" title="Manage Billing">
                             <CreditCard size={18} />
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
              <div className="flex -space-x-3">
                 {[1,2,3].map(i => (
                    <div key={i} className="w-10 h-10 rounded-xl bg-white border-2 border-snow-pearl flex items-center justify-center text-[10px] font-black text-primary italic">L+</div>
                 ))}
              </div>
              <p className="text-xs font-bold text-secondary/40 uppercase tracking-widest italic leading-none">Llama Intelligence: 14 colleges ready for growth upgrade</p>
           </div>
           <button className="py-3 px-8 bg-white border border-gray-100 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-sm">
              Trigger Automation Sequence
           </button>
        </div>
      </section>
    </div>
  );
}
