"use client";

import { useState } from "react";
import { 
  ShieldCheck, 
  Trash2, 
  Download, 
  ChevronRight, 
  FileJson, 
  Clock, 
  History, 
  Users, 
  AlertCircle,
  Mail,
  Zap,
  CheckCircle2,
  Database,
  Lock,
  Search,
  ArrowUpRight,
  ShieldAlert,
  Fingerprint
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DeletionRequest {
  id: string;
  name: string;
  requestDate: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  deadline: string;
}

interface ConsentLog {
  userId: string;
  consentDate: string;
  version: string;
  ip: string;
}

export default function DPDPCompliancePage() {
  const [activeTab, setActiveTab] = useState<'DELETION' | 'EXPORT' | 'CONSENT' | 'MINORS'>('DELETION');

  const deletionRequests: DeletionRequest[] = [
    { id: "USR-9921", name: "Rajat Gupta", requestDate: "2026-03-05", status: 'PENDING', deadline: "2026-04-04" },
    { id: "USR-1024", name: "Sanya Malhotra", requestDate: "2026-02-15", status: 'IN_PROGRESS', deadline: "2026-03-17" },
    { id: "USR-0881", name: "Vikram Batra", requestDate: "2026-02-10", status: 'COMPLETED', deadline: "2026-03-12" },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-6 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-2">
              <div className="bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-100">
                 <span className="text-[10px] font-black uppercase tracking-widest text-rose-600 italic">Privacy Operations</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30">DPDP Act 2023 Compliance</span>
           </div>
           <h1 className="text-5xl font-black text-typography tracking-tighter leading-none mb-1">
             Compliance <span className="text-rose-600 italic">Vault</span>
           </h1>
           <p className="text-secondary/40 text-sm font-bold uppercase tracking-widest mt-2">
              Managing Data Portability, Erasure Requests & Guardian Consents
           </p>
        </div>

        <div className="flex items-center space-x-4">
           <div className="bg-slate-900 px-8 py-4 rounded-3xl border border-white/10 shadow-2xl flex items-center space-x-6 text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/10 blur-3xl rounded-full" />
              <div>
                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Global Compliance Health</p>
                 <p className="text-2xl font-black tracking-tighter italic">99.8% <span className="text-emerald-500 text-[10px] font-black underline not-italic ml-2">Audit-Ready</span></p>
              </div>
              <ShieldCheck size={32} className="text-emerald-500 relative z-10" />
           </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="flex items-center space-x-4 bg-white p-2 rounded-[2.5rem] border border-gray-100 shadow-sm w-fit">
         {[
           { id: 'DELETION', label: 'Erasure Requests', icon: Trash2 },
           { id: 'EXPORT', label: 'Data Portability', icon: Download },
           { id: 'CONSENT', label: 'Consent Registry', icon: History },
           { id: 'MINORS', label: 'Guardian Oversight', icon: ShieldAlert }
         ].map((tab) => (
           <button 
             key={tab.id}
             onClick={() => setActiveTab(tab.id as any)}
             className={cn(
               "flex items-center space-x-3 px-6 py-4 rounded-3xl text-[10px] font-black uppercase tracking-widest transition-all",
               activeTab === tab.id ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-secondary/40 hover:text-secondary hover:bg-snow-pearl"
             )}
           >
             <tab.icon size={16} />
             <span>{tab.label}</span>
           </button>
         ))}
      </div>

      {/* Dynamic Content */}
      <div className="grid grid-cols-12 gap-8">
         <div className="col-span-12 lg:col-span-8 bg-white rounded-[3rem] border border-gray-50 shadow-sm overflow-hidden">
            {activeTab === 'DELETION' && (
               <>
                  <div className="p-10 border-b border-gray-50 flex items-center justify-between">
                     <div>
                        <h3 className="text-xl font-black text-typography tracking-tighter italic lowercase underline decoration-primary/10">Pending Erasure Workflow</h3>
                        <p className="text-[10px] font-bold text-secondary/30 uppercase tracking-[0.2em] mt-2 italic">Legal Requirement: 30-day fulfillment window</p>
                     </div>
                  </div>
                  <div className="overflow-x-auto">
                     <table className="w-full text-left">
                        <thead className="bg-snow-pearl/50 border-b border-gray-100">
                           <tr>
                              <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Requestor Identity</th>
                              <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Request Date</th>
                              <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">SLA Deadline</th>
                              <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Status</th>
                              <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40 text-right">Action</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                           {deletionRequests.map((req) => (
                              <tr key={req.id} className="group hover:bg-snow-pearl/30 transition-all">
                                 <td className="px-10 py-8">
                                    <div className="flex items-center space-x-6">
                                       <div className="w-12 h-12 bg-snow-pearl rounded-2xl flex items-center justify-center text-secondary/10 group-hover:text-rose-500 group-hover:bg-rose-50 transition-all">
                                          <Trash2 size={20} />
                                       </div>
                                       <div>
                                          <h4 className="text-sm font-black text-typography leading-tight">{req.name}</h4>
                                          <p className="text-[9px] font-bold text-secondary/30 uppercase tracking-widest italic">{req.id}</p>
                                       </div>
                                    </div>
                                 </td>
                                 <td className="px-10 py-8">
                                    <span className="text-[12px] font-black text-typography uppercase">{new Date(req.requestDate).toLocaleDateString()}</span>
                                 </td>
                                 <td className="px-10 py-8">
                                    <div className="flex items-center space-x-2 text-[12px] font-black text-rose-600 italic">
                                       <Clock size={14} />
                                       <span>{new Date(req.deadline).toLocaleDateString()}</span>
                                    </div>
                                 </td>
                                 <td className="px-10 py-8">
                                    <span className={cn(
                                       "inline-flex items-center space-x-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                                       req.status === 'PENDING' ? "bg-amber-50 text-amber-600 border border-amber-100" :
                                       req.status === 'IN_PROGRESS' ? "bg-indigo-50 text-indigo-600 border border-indigo-100" :
                                       "bg-emerald-50 text-emerald-600 border border-emerald-100"
                                    )}>
                                       <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", req.status === 'PENDING' ? "bg-amber-500" : "bg-current")} />
                                       <span>{req.status}</span>
                                    </span>
                                 </td>
                                 <td className="px-10 py-8 text-right">
                                    <button className="px-6 py-3 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-600 transition-all active:scale-95 shadow-lg shadow-slate-900/10">
                                       Process Erasure
                                    </button>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </>
            )}

            {activeTab === 'EXPORT' && (
               <div className="p-20 text-center flex flex-col items-center">
                  <div className="w-24 h-24 bg-primary/5 rounded-[2.5rem] flex items-center justify-center text-primary mb-8 shadow-inner">
                     <FileJson size={42} />
                  </div>
                  <h3 className="text-3xl font-black text-typography tracking-tighter mb-4 italic">Data Portability Engine</h3>
                  <p className="text-xs font-bold text-secondary/40 leading-relaxed uppercase tracking-widest max-w-lg mb-10">
                     Generate comprehensive user context snapshots in JSON format. Files are served via secure 24h transient links delivered through Brevo.
                  </p>
                  <div className="relative w-full max-w-md">
                     <Search size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-secondary/20" />
                     <input placeholder="Enter User ID or Email to Export..." className="w-full bg-snow-pearl border-0 pl-16 pr-8 py-5 rounded-3xl text-[14px] font-bold outline-none focus:ring-4 focus:ring-primary/5 transition-all" />
                  </div>
                  <button className="mt-8 px-12 py-5 bg-primary text-white rounded-3xl text-[11px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20 flex items-center space-x-3">
                     <Zap size={18} />
                     <span>Trigger Audit Export</span>
                  </button>
               </div>
            )}

            {activeTab === 'CONSENT' && (
               <div className="p-10">
                  <h3 className="text-xl font-black text-typography tracking-tighter italic lowercase underline decoration-primary/10 mb-8 uppercase">Immutable Consent Records</h3>
                  <div className="space-y-4">
                     {[1, 2, 3].map((_, i) => (
                        <div key={i} className="p-6 bg-snow-pearl/50 rounded-3xl border border-gray-100 flex items-center justify-between group hover:border-primary/20 transition-all">
                           <div className="flex items-center space-x-6">
                              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-secondary/20"><Fingerprint size={22} /></div>
                              <div>
                                 <p className="text-[12px] font-black text-typography uppercase">Consent Version v4.2.1-IndianDPDP</p>
                                 <p className="text-[9px] font-bold text-secondary/30 uppercase tracking-widest mt-1">IP: 102.14.99.12 • Node: US-EAST-1</p>
                              </div>
                           </div>
                           <div className="text-right">
                              <p className="text-[11px] font-black text-emerald-600 italic">Verified March 7, 2026</p>
                              <p className="text-[9px] font-bold text-secondary/20 uppercase tracking-widest mt-1">Status: Legally Binding</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            )}

            {activeTab === 'MINORS' && (
               <div className="p-20 text-center flex flex-col items-center">
                  <ShieldAlert size={64} className="text-amber-500 mb-8" />
                  <h3 className="text-3xl font-black text-typography tracking-tighter mb-4 italic">Age-Restricted Guardian Portal</h3>
                  <p className="text-xs font-bold text-secondary/40 leading-relaxed uppercase tracking-widest max-w-lg mb-10">
                     System has detected <span className="text-amber-600 font-black">4,281 Profiles</span> likely belonging to users under 18. DPDP Act requires explicit guardian consent for these accounts.
                  </p>
                  <button className="px-10 py-5 bg-amber-500 text-white rounded-3xl text-[11px] font-black uppercase tracking-widest hover:bg-amber-600 transition-all shadow-lg shadow-amber-500/20">
                     View Pending Guardian Consents
                  </button>
               </div>
            )}
         </div>

         {/* Stats Sidebar */}
         <div className="col-span-12 lg:col-span-4 space-y-8">
            <div className="bg-slate-900 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
               <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/10 blur-3xl rounded-full" />
               <div className="relative z-10">
                  <h4 className="text-sm font-black text-slate-500 uppercase tracking-widest mb-6 italic underline decoration-indigo-500/30">Compliance Metrics</h4>
                  <div className="space-y-8">
                     <div>
                        <div className="flex justify-between items-end mb-3">
                           <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Erasure Fulfillment Rate</p>
                           <p className="text-xl font-black italic">100%</p>
                        </div>
                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                           <div className="w-full h-full bg-emerald-500" />
                        </div>
                     </div>
                     <div>
                        <div className="flex justify-between items-end mb-3">
                           <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Avg. Export Latency</p>
                           <p className="text-xl font-black italic">4.2m</p>
                        </div>
                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                           <div className="w-[85%] h-full bg-indigo-500" />
                        </div>
                     </div>
                     <div>
                        <div className="flex justify-between items-end mb-3">
                           <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Consent Refresh Cycle</p>
                           <p className="text-xl font-black italic">90d</p>
                        </div>
                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                           <div className="w-[45%] h-full bg-amber-500" />
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="bg-white p-10 rounded-[3rem] border border-gray-50 shadow-sm group hover:border-primary/20 transition-all cursor-pointer">
               <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 bg-snow-pearl rounded-2xl flex items-center justify-center text-secondary/10 group-hover:text-primary group-hover:bg-primary/5 transition-all">
                     <Database size={24} />
                  </div>
                  <ArrowUpRight size={20} className="text-secondary/20 group-hover:text-primary" />
               </div>
               <p className="text-[10px] font-black text-secondary/30 uppercase tracking-widest mb-1 italic">PostgreSQL Audit Ledger</p>
               <h4 className="text-xl font-black text-typography uppercase tracking-tight">Access Secure Logs</h4>
               <p className="text-[10px] font-bold text-secondary/40 leading-relaxed mt-2 uppercase tracking-widest italic decoration-primary/10 underline">Immutable record of all admin data access events</p>
            </div>
         </div>
      </div>

      {/* Compliance Notice Footer */}
      <section className="bg-snow-pearl/30 p-10 rounded-[2.5rem] border border-gray-100 flex items-center justify-between">
         <div className="flex items-center space-x-6 italic">
            <Lock size={20} className="text-secondary/20" />
            <p className="text-[11px] font-bold text-secondary/40 tracking-widest uppercase">Encryption Standard: AES-256 for PII at rest • TLS 1.3 for data portability exports • Role-based decrypt logic active</p>
         </div>
         <p className="text-[9px] font-black text-secondary/20 uppercase tracking-widest">Last Compliance Scan: 2026-03-08 10:30 UTC</p>
      </section>
    </div>
  );
}
