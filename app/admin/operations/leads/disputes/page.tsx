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
    <div className="space-y-10">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-6 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-2">
              <div className="bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-100">
                 <span className="text-[10px] font-black uppercase tracking-widest text-rose-600">Conflict Resolution</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30">Lead Integrity Audit</span>
           </div>
           <h1 className="text-5xl font-black text-typography tracking-tighter leading-none mb-1">
             Invalid <span className="text-rose-500 italic">Disputes</span>
           </h1>
           <p className="text-secondary/40 text-sm font-bold uppercase tracking-widest mt-2">
              Managed Queue for College Lead Credit Requests
           </p>
        </div>

        <div className="flex items-center space-x-4">
           <div className="bg-white px-8 py-4 rounded-3xl border border-gray-100 shadow-sm flex items-center space-x-6">
              <div>
                 <p className="text-[10px] font-black text-secondary/20 uppercase tracking-widest">Global Dispute Rate</p>
                 <p className="text-2xl font-black text-typography tracking-tighter">8.4% <span className="text-emerald-500 text-xs text-[10px] font-black underline italic">Safe Zone</span></p>
              </div>
              <ShieldCheck size={28} className="text-rose-500 shadow-xl shadow-rose-500/20" />
           </div>
        </div>
      </section>

      {/* Main Listing */}
      <section className="bg-white rounded-[2.5rem] border border-gray-50 shadow-sm overflow-hidden">
        <div className="p-10 border-b border-gray-50 flex items-center justify-between">
           <div className="relative flex-1 max-w-xl">
              <Search size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-secondary/20" />
              <input placeholder="Search Dispute ID or College..." className="w-full bg-snow-pearl border-0 pl-16 pr-8 py-5 rounded-3xl text-[14px] font-bold outline-none focus:ring-4 focus:ring-primary/5 transition-all" />
           </div>
           
           <div className="flex items-center space-x-4 pl-10">
              <button className="p-5 bg-snow-pearl rounded-2xl border border-gray-100 text-secondary/40 hover:text-rose-500 transition-all">
                 <Filter size={20} />
              </button>
           </div>
        </div>

        <div className="overflow-x-auto">
           <table className="w-full text-left">
              <thead className="bg-snow-pearl/50 border-b border-gray-100">
                 <tr>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Institution & Case ID</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Reason</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Leads</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Status / SLA</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40 text-right">Actions</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {disputes.map((d) => (
                  <tr key={d.id} className="group hover:bg-rose-50/10 transition-all">
                    <td className="px-10 py-8">
                       <div className="flex items-center space-x-6">
                          <div className="w-14 h-14 bg-snow-pearl rounded-2xl flex items-center justify-center text-secondary/10 group-hover:text-rose-500 group-hover:bg-rose-50 transition-all">
                             <Building2 size={24} />
                          </div>
                          <div>
                             <h4 className="text-base font-black text-typography leading-tight">{d.collegeName}</h4>
                             <p className="text-[10px] font-bold text-secondary/40 uppercase tracking-widest mt-1 italic font-black text-rose-500">{d.id}</p>
                          </div>
                       </div>
                    </td>
                    <td className="px-10 py-8">
                       <p className="text-[12px] font-bold text-typography uppercase tracking-tight">{d.reason}</p>
                       <p className="text-[10px] font-bold text-secondary/40 uppercase tracking-widest mt-1 italic leading-none">Submitted {new Date(d.submittedAt).toLocaleDateString()}</p>
                    </td>
                    <td className="px-10 py-8">
                        <div className="inline-flex items-center space-x-2 bg-gray-50 px-4 py-2 rounded-2xl border border-gray-100 italic">
                           <Users size={14} className="text-secondary/20" />
                           <span className="text-sm font-black text-typography">{d.leadCount}</span>
                        </div>
                    </td>
                    <td className="px-10 py-8">
                       <div className="flex flex-col space-y-2">
                          <span className={cn(
                             "inline-flex items-center space-x-2 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest w-fit",
                             d.status === 'APPROVED' ? "bg-emerald-50 text-emerald-600 border border-emerald-100" :
                             d.status === 'REJECTED' ? "bg-rose-50 text-rose-600 border border-rose-100" :
                             "bg-amber-50 text-amber-600 border border-amber-100"
                          )}>
                             {d.status === 'APPROVED' ? <CheckCircle2 size={12} /> : d.status === 'REJECTED' ? <XCircle size={12} /> : <Clock size={12} />}
                             <span>{d.status}</span>
                          </span>
                          <span className={cn("text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-lg w-fit", d.slaColor)}>
                             {d.slaLabel}
                          </span>
                       </div>
                    </td>
                    <td className="px-10 py-8 text-right">
                       <div className="flex items-center justify-end space-x-2">
                          <button className="p-4 bg-white border border-gray-100 rounded-2xl hover:bg-emerald-500 hover:text-white transition-all shadow-sm group/btn" title="Approve & Issue Credit">
                             <CreditCard size={18} />
                          </button>
                          <button className="p-4 bg-white border border-gray-100 rounded-2xl hover:bg-rose-500 hover:text-white transition-all shadow-sm group/btn" title="Investigate / Call Number">
                             <PhoneCall size={18} />
                          </button>
                          <button className="p-4 bg-white border border-gray-100 rounded-2xl hover:bg-primary hover:text-white transition-all shadow-sm group/btn" title="Open Case Detail">
                             <MessageSquare size={18} />
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
              <div className="w-3 h-3 rounded-full bg-rose-500 animate-pulse" />
              <p className="text-xs font-black text-rose-500 uppercase tracking-widest italic leading-none">SLA Warning: 2 disputes nearing 72h limit</p>
           </div>
           <button className="flex items-center space-x-2 text-[10px] font-black text-secondary/40 uppercase tracking-widest hover:text-primary transition-all">
              <span>View Resolution History</span>
              <ExternalLink size={12} />
           </button>
        </div>
      </section>

      {/* Investigation Panel Overlay (Mock) */}
      <div className="grid grid-cols-12 gap-8">
         <div className="col-span-12 lg:col-span-6 bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8">
               <ShieldCheck size={48} className="text-secondary/5 -mr-4 -mt-4 rotate-12" />
            </div>
            <h3 className="text-2xl font-black text-typography tracking-tighter italic lowercase mb-6">Investigative Suite</h3>
            <div className="space-y-6">
               <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm shrink-0">
                     <AlertCircle size={20} />
                  </div>
                  <div>
                     <p className="text-xs font-bold text-gray-800">CPL Anomaly Detected</p>
                     <p className="text-[10px] font-medium text-gray-500 mt-1">College 'Amity' has flagged 42% of Engineering leads this week. Investigating source: 'AI Recommendation Node'.</p>
                  </div>
               </div>
               <button className="w-full py-4 bg-primary text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20">
                  Run Cross-Platform Dedupe Audit
               </button>
            </div>
         </div>
      </div>
    </div>
  );
}
