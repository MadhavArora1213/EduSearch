"use client";

import { useState } from "react";
import { 
  Users,
  Monitor,
  Smartphone,
  Globe,
  Clock,
  XCircle,
  ShieldAlert,
  ShieldCheck,
  ChevronRight,
  LogOut,
  User,
  Activity,
  Zap,
  Lock,
  Search,
  AlertTriangle,
  HelpCircle,
  Fingerprint
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Session {
  id: string;
  user: { name: string; role: string; email: string };
  ip: string;
  device: string;
  browser: string;
  startTime: string;
  lastSeen: string;
  type: 'ADMIN' | 'STUDENT';
  anomaly?: boolean;
}

export default function SessionManagementPage() {
  const [activeTab, setActiveTab] = useState<'ADMIN' | 'STUDENT_ANOMALY'>('ADMIN');

  const sessions: Session[] = [
    { 
      id: "SES-001", 
      user: { name: "Ankit Sharma", role: "Super Admin", email: "ankit@admissionseason.com" }, 
      ip: "42.108.12.3", 
      device: "MacBook Pro M3", 
      browser: "Chrome v122", 
      startTime: "Today, 09:00 AM", 
      lastSeen: "Just now", 
      type: 'ADMIN' 
    },
    { 
      id: "SES-002", 
      user: { name: "Rohan Das", role: "Content Manager", email: "rohan@admissionseason.com" }, 
      ip: "102.14.88.21", 
      device: "iPad Air", 
      browser: "Safari Mobile", 
      startTime: "Yesterday, 04:30 PM", 
      lastSeen: "2h ago", 
      type: 'ADMIN' 
    }
  ];

  const anomalies: Session[] = [
    { 
      id: "SES-991", 
      user: { name: "Aaryan Verma", role: "Student", email: "aaryan.v@gmail.com" }, 
      ip: "42.108.xx / 102.14.xx / 1.44.xx", 
      device: "3 Different Devices", 
      browser: "Various", 
      startTime: "Last 1 hour", 
      lastSeen: "Active", 
      type: 'STUDENT',
      anomaly: true
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-4 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-2">
              <div className="bg-primary/5 px-3 py-1.5 rounded-xl border border-primary/10">
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary italic lowercase">Audit Registry</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30">Session Control & Hijack Prevention</span>
           </div>
           <h1 className="text-3xl md:text-3xl md:text-5xl font-black text-typography tracking-tighter leading-none mb-1">
             Session <span className="text-primary italic">Command</span>
           </h1>
           <p className="text-secondary/40 text-sm font-bold uppercase tracking-widest mt-2">
              Monitoring Active Admin Tokens & Student Account Anomalies
           </p>
        </div>

        <div className="flex items-center space-x-4">
           <button className="flex items-center space-x-2 px-8 py-4 bg-rose-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-rose-600/20">
              <XCircle size={18} />
              <span>Kill All Admin Sessions</span>
           </button>
        </div>
      </section>

      {/* Control Tabs */}
      <div className="flex items-center space-x-4 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm w-fit">
         {[
           { id: 'ADMIN', label: 'Admin Terminal Sessions', icon: Lock },
           { id: 'STUDENT_ANOMALY', label: 'Compromise Alerts', icon: ShieldAlert }
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

      <div className="grid grid-cols-12 gap-6">
         <div className="col-span-12 lg:col-span-9 bg-white rounded-2xl border border-gray-50 shadow-sm overflow-hidden">
            <div className="p-6 md:p-6 border-b border-gray-50 flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-snow-pearl/30">
               <div>
                  <h3 className="text-xl font-black text-typography tracking-tighter italic lowercase underline decoration-primary/10">{activeTab === 'ADMIN' ? 'Active Administrative Nodes' : 'Identity Theft Prevention'}</h3>
                  <p className="text-[10px] font-bold text-secondary/30 uppercase tracking-[0.2em] mt-2 italic">
                    {activeTab === 'ADMIN' ? 'Authorized team members currently logged into the control panel' : 'Detection of 3+ IP changes within 60 minutes'}
                  </p>
               </div>
               <div className="flex items-center space-x-2 bg-emerald-50 px-4 py-2 rounded-2xl border border-emerald-100">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-black text-emerald-600 uppercase">Registry Live</span>
               </div>
            </div>

            <div className="overflow-x-auto">
               <table className="w-full text-left">
                  <thead className="bg-snow-pearl/50 border-b border-gray-100">
                     <tr>
                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">User & Access Identity</th>
                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Device / Browser</th>
                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Session Duration</th>
                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Security Posture</th>
                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40 text-right">Interrupt</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                     {(activeTab === 'ADMIN' ? sessions : anomalies).map((ses) => (
                        <tr key={ses.id} className="group hover:bg-snow-pearl/30 transition-all">
                           <td className="px-10 py-4">
                              <div className="flex items-center space-x-6">
                                 <div className="w-14 h-14 bg-snow-pearl rounded-2xl flex items-center justify-center text-secondary/10 group-hover:text-primary group-hover:bg-primary/5 transition-all">
                                    <User size={24} />
                                 </div>
                                 <div>
                                    <h4 className="text-base font-black text-typography leading-tight">{ses.user.name}</h4>
                                    <div className="flex items-center space-x-2 text-[10px] font-bold text-secondary/40 uppercase tracking-widest mt-1">
                                       <Globe size={10} />
                                       <span>{ses.ip}</span>
                                    </div>
                                 </div>
                              </div>
                           </td>
                           <td className="px-10 py-4">
                              <div className="flex flex-col space-y-1">
                                 <div className="flex items-center space-x-2 text-[12px] font-black text-typography uppercase">
                                    {ses.device.includes('Mac') || ses.device.includes('PC') ? <Monitor size={14} /> : <Smartphone size={14} />}
                                    <span>{ses.device}</span>
                                 </div>
                                 <p className="text-[10px] font-bold text-secondary/30 uppercase tracking-widest italic">{ses.browser}</p>
                              </div>
                           </td>
                           <td className="px-10 py-4">
                              <div className="flex flex-col space-y-1">
                                 <div className="flex items-center space-x-2 text-[12px] font-black text-typography italic">
                                    <Clock size={14} className="text-secondary/20" />
                                    <span>{ses.startTime}</span>
                                 </div>
                                 <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">{ses.lastSeen}</p>
                              </div>
                           </td>
                           <td className="px-10 py-4">
                              <span className={cn(
                                 "inline-flex items-center space-x-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                                 ses.anomaly ? "bg-rose-50 text-rose-600 border border-rose-100 animate-pulse" : "bg-emerald-50 text-emerald-600 border border-emerald-100"
                              )}>
                                 {ses.anomaly ? <ShieldAlert size={12} /> : <ShieldCheck size={12} />}
                                 <span>{ses.anomaly ? 'Identity Conflict' : 'Verified Hash'}</span>
                              </span>
                           </td>
                           <td className="px-10 py-4 text-right">
                              <button className="p-4 bg-white border border-gray-100 rounded-2xl hover:bg-rose-600 hover:text-white transition-all shadow-sm group/btn" title="Force Logout (Revoke JWT)">
                                 <LogOut size={18} />
                              </button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>

         <div className="col-span-12 lg:col-span-3 space-y-8">
            <div className="bg-slate-900 p-6 rounded-2xl text-white overflow-hidden relative group">
               <div className="absolute top-0 right-0 p-5 opacity-10">
                  <Fingerprint size={80} className="text-primary" />
               </div>
               <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-6 italic underline decoration-primary/30">Auth Intelligence</h4>
               <div className="space-y-6">
                  <div className="flex items-center justify-between">
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">JWT Refresh Gap</p>
                     <p className="text-lg font-black text-emerald-500 italic">45m</p>
                  </div>
                  <div className="flex items-center justify-between">
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">2FA Enforced</p>
                     <p className="text-lg font-black text-primary italic">100%</p>
                  </div>
                  <div className="flex items-center justify-between">
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Invalid Nonces</p>
                     <p className="text-lg font-black text-rose-500 italic">02</p>
                  </div>
               </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-50 shadow-sm space-y-6 group hover:border-primary/20 transition-all cursor-pointer">
               <div className="flex items-center justify-between">
                  <HelpCircle size={28} className="text-secondary/10 group-hover:text-primary transition-colors" />
                  <AlertTriangle size={18} className="text-amber-500" />
               </div>
               <h4 className="text-sm font-black text-typography uppercase tracking-tight italic lowercase underline decoration-primary/10">Session Hijack Shield</h4>
               <p className="text-[10px] font-bold text-secondary/40 leading-relaxed uppercase tracking-widest italic leading-relaxed">
                  Platform creates a unique 'Identity Fingerprint' for every session using Browser + Canvas + IP clustering. Any deviation &gt; 2 points triggers auto-logout.
               </p>
            </div>
         </div>
      </div>
    </div>
  );
}
