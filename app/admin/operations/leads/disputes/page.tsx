"use client";

import { useState, useEffect } from "react";
import { 
  Users,
  ChevronRight, 
  Search, 
  Filter, 
  PhoneCall, 
  ExternalLink, 
  AlertCircle,
  CheckCircle2,
  XCircle,
  Clock,
  Building2,
  ShieldCheck,
  CreditCard,
  MessageSquare
} from "lucide-react";
import { cn } from "@/lib/utils";

interface LeadDispute {
  id: string;
  collegeName: string;
  leadCount: number;
  reason: string;
  submittedAt: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'PARTIAL';
  slaLabel: string;
  slaColor: string;
}

export default function LeadDisputesPage() {
  const [disputes, setDisputes] = useState<LeadDispute[]>([
    {
      id: "DIS-74920",
      collegeName: "IIT Bombay",
      leadCount: 12,
      reason: "Invalid Phone Numbers",
      submittedAt: "2026-03-05T10:30:00Z",
      status: 'PENDING',
      slaLabel: "Overdue (4d)",
      slaColor: "text-rose-500 bg-rose-50"
    },
    {
      id: "DIS-74921",
      collegeName: "Amity University",
      leadCount: 5,
      reason: "No Response / Switch Off",
      submittedAt: "2026-03-06T14:45:00Z",
      status: 'PENDING',
      slaLabel: "Expires 24h",
      slaColor: "text-amber-500 bg-amber-50"
    },
    {
      id: "DIS-74922",
      collegeName: "SRM University",
      leadCount: 24,
      reason: "Duplicate Entries",
      submittedAt: "2026-03-07T09:15:00Z",
      status: 'APPROVED',
      slaLabel: "Resolved",
      slaColor: "text-emerald-500 bg-emerald-50"
    }
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-4 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-1.5 font-montserrat">
              <div className="bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-100">
                 <span className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-600 lowercase">Conflict Resolution</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30 uppercase tracking-widest text-[10px]">Integrity Audit</span>
           </div>
           <h1 className="text-3xl md:text-4xl font-black text-typography tracking-tighter leading-none mb-1">
             Invalid <span className="text-rose-500 italic">Disputes</span>
           </h1>
           <p className="text-secondary/40 text-[10px] font-black uppercase tracking-[0.2em] mt-1.5 leading-none">
              Managing College Lead Credit Requests
           </p>
        </div>

        <div className="flex items-center space-x-4">
           <div className="bg-white px-5 py-3 rounded-xl border border-gray-100 shadow-sm flex items-center space-x-4">
              <div>
                 <p className="text-[9px] font-black text-secondary/20 uppercase tracking-widest">Global Dispute Rate</p>
                 <p className="text-xl font-black text-typography tracking-tighter">8.4% <span className="text-emerald-500 text-[10px] font-black underline italic">Safe</span></p>
              </div>
              <ShieldCheck size={22} className="text-rose-500" />
           </div>
        </div>
      </section>

      {/* Main Listing */}
      <section className="bg-white rounded-xl border border-gray-50 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-snow-pearl/30">
           <div className="relative flex-1 max-w-xl">
              <Search size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-secondary/20" />
              <input placeholder="Search Case ID or College..." className="w-full bg-white border border-transparent pl-12 pr-6 py-2.5 rounded-xl text-[13px] font-bold outline-none focus:ring-4 focus:ring-primary/5 shadow-sm" />
           </div>
           
           <div className="flex items-center space-x-3">
              <button className="w-9 h-9 bg-white border border-gray-100 rounded-xl flex items-center justify-center text-secondary/20 hover:text-rose-500 transition-all shadow-sm">
                 <Filter size={14} />
              </button>
           </div>
        </div>

        <div className="overflow-x-auto">
           <table className="w-full text-left">
               <thead className="bg-snow-pearl/50 border-b border-gray-100">
                  <tr>
                     <th className="px-6 py-3 text-[9px] font-black uppercase tracking-[0.2em] text-secondary/40">Institution & Case ID</th>
                     <th className="px-6 py-3 text-[9px] font-black uppercase tracking-[0.2em] text-secondary/40">Reason</th>
                     <th className="px-6 py-3 text-[9px] font-black uppercase tracking-[0.2em] text-secondary/40">Leads</th>
                     <th className="px-6 py-3 text-[9px] font-black uppercase tracking-[0.2em] text-secondary/40">Status / SLA</th>
                     <th className="px-6 py-3 text-[9px] font-black uppercase tracking-[0.2em] text-secondary/40 text-right">Actions</th>
                  </tr>
               </thead>
              <tbody className="divide-y divide-gray-50">
                {disputes.map((d) => (
                  <tr key={d.id} className="group hover:bg-rose-50/5 transition-all font-montserrat">
                    <td className="px-6 py-3">
                       <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-secondary/20 group-hover:text-rose-500 group-hover:bg-rose-50 transition-all border border-gray-100">
                             <Building2 size={18} />
                          </div>
                          <div>
                             <h4 className="text-[13px] font-black text-typography leading-tight uppercase underline decoration-primary/5">{d.collegeName}</h4>
                             <p className="text-[9px] font-bold text-rose-500 uppercase tracking-widest mt-1">{d.id}</p>
                          </div>
                       </div>
                    </td>
                    <td className="px-6 py-3">
                       <p className="text-[11px] font-black text-typography uppercase tracking-tight">{d.reason}</p>
                       <p className="text-[8px] font-bold text-secondary/20 uppercase tracking-widest mt-1">Submitted {new Date(d.submittedAt).toLocaleDateString()}</p>
                    </td>
                    <td className="px-6 py-3">
                        <div className="inline-flex items-center space-x-1.5 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100">
                           <Users size={12} className="text-secondary/20" />
                           <span className="text-[13px] font-black text-typography">{d.leadCount}</span>
                        </div>
                    </td>
                    <td className="px-6 py-3">
                       <div className="flex flex-col space-y-1">
                          <span className={cn(
                             "inline-flex items-center space-x-1.5 px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest w-fit border",
                             d.status === 'APPROVED' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                             d.status === 'REJECTED' ? "bg-rose-50 text-rose-600 border-rose-100" :
                             "bg-amber-50 text-amber-600 border-amber-100"
                          )}>
                             {d.status === 'APPROVED' ? <CheckCircle2 size={10} /> : d.status === 'REJECTED' ? <XCircle size={10} /> : <Clock size={10} />}
                             <span>{d.status}</span>
                          </span>
                          <span className={cn("text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded border border-transparent w-fit", d.slaColor)}>
                             {d.slaLabel}
                          </span>
                       </div>
                    </td>
                    <td className="px-6 py-3 text-right">
                       <div className="flex items-center justify-end space-x-2">
                          <button className="w-9 h-9 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center text-secondary/40 hover:bg-emerald-500 hover:text-white transition-all shadow-sm" title="Approve & Issue Credit">
                             <CreditCard size={14} />
                          </button>
                          <button className="w-9 h-9 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center text-secondary/40 hover:bg-rose-500 hover:text-white transition-all shadow-sm" title="Investigate">
                             <PhoneCall size={14} />
                          </button>
                          <button className="w-9 h-9 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center text-secondary/40 hover:bg-primary hover:text-white transition-all shadow-sm" title="Details">
                             <MessageSquare size={14} />
                          </button>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
           </table>
        </div>

         <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-white relative overflow-hidden font-montserrat">
            <div className="flex items-center space-x-4 relative z-10">
               <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
               <p className="text-[10px] font-black text-rose-500 uppercase tracking-[0.2em] leading-none">SLA Warning: 2 disputes nearing 72h limit</p>
            </div>
            <button className="flex items-center space-x-1.5 text-[9px] font-black text-secondary/30 uppercase tracking-widest hover:text-primary transition-all relative z-10">
               <span>Resolution History</span>
               <ExternalLink size={10} />
            </button>
         </div>
      </section>

      {/* Investigation Panel Overlay (Mock) */}
      <div className="grid grid-cols-12 gap-4">
         <div className="col-span-12 lg:col-span-6 bg-white p-5 rounded-xl border border-gray-100 shadow-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4">
               <ShieldCheck size={40} className="text-secondary/5 -mr-2 -mt-2 rotate-12" />
            </div>
            <h3 className="text-xl font-black text-typography tracking-tighter uppercase mb-4">Investigative Suite</h3>
            <div className="space-y-4">
               <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-primary shadow-sm shrink-0">
                     <AlertCircle size={16} />
                  </div>
                  <div>
                     <p className="text-[11px] font-black text-gray-800 uppercase tracking-tight">Anomaly Detected</p>
                     <p className="text-[9px] font-bold text-gray-500 mt-1 leading-relaxed">College 'Amity' has flagged 42% of Engineering leads this week. Investigating source: 'AI Recommendation Node'.</p>
                  </div>
               </div>
               <button className="w-full py-3 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-primary/10">
                  Run Cross-Platform Dedupe Audit
               </button>
            </div>
         </div>
      </div>
    </div>
  );
}
