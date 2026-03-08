"use client";

import { useState } from "react";
import { 
  MessageSquare, 
  Search, 
  Filter, 
  ChevronRight, 
  Plus, 
  Smartphone, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Zap, 
  MoreVertical, 
  Database,
  History,
  Copy,
  ExternalLink,
  Lock,
  ArrowUpRight,
  TrendingDown,
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SMSTemplate {
  id: string;
  name: string;
  text: string;
  charCount: number;
  dltId: string;
  type: 'Transactional' | 'Service' | 'Promotional';
  status: 'APPROVED' | 'PENDING_DLT' | 'REJECTED';
}

const smsTemplates: SMSTemplate[] = [
  { id: "S1", name: "OTP Verification", text: "Your EduSearch OTP is {{otp}}. This is valid for 10 minutes. Do not share it.", charCount: 84, dltId: "1007123456789012345", type: "Transactional", status: 'APPROVED' },
  { id: "S2", name: "Lead Notification (College)", text: "New lead received: {{student_name}} for {{course}}. Login to B2B portal to view.", charCount: 112, dltId: "1007987654321098765", type: "Service", status: 'APPROVED' },
  { id: "S3", name: "Admit Card Alert", text: "JEE Main 2026 Admit Card is out! Download now at edusearch.com/exam/jee-2026", charCount: 92, dltId: "123456", type: "Service", status: 'PENDING_DLT' },
  { id: "S4", name: "Counseling Update", text: "The wait is over! Your AI Counseling session is ready. Check your dashboard.", charCount: 88, dltId: "Pending", type: "Service", status: 'REJECTED' },
];

export default function SMSContentManagerPage() {
  return (
    <div className="space-y-6 font-montserrat pb-10">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-4 md:space-y-0 pb-4 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-1.5">
              <div className="bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-100">
                 <span className="text-[10px] font-black uppercase tracking-widest text-rose-600">DLT Compliance Lab</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30 uppercase tracking-widest text-[10px]">Regulation Center</span>
           </div>
           <h1 className="text-3xl font-black text-typography tracking-tighter leading-none mb-1">
             SMS <span className="text-primary italic">Manager</span>
           </h1>
           <p className="text-secondary/40 text-[10px] font-black uppercase tracking-[0.2em] mt-1.5 leading-none">
              Auditing 160-Character Nodes for India Carrier Compliance & Lead Delivery
           </p>
        </div>

        <div className="flex items-center space-x-3">
           <button className="flex items-center space-x-2 px-6 py-2.5 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-primary/20">
              <Plus size={14} />
              <span>Register Template</span>
           </button>
        </div>
      </section>

      {/* Compliance & Delivery KPI strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
         {[
           { label: "DLT Approval", value: "94%", trend: "Stable", icon: ShieldCheck, color: "text-emerald-500 bg-emerald-50 border-emerald-100/50" },
           { label: "Avg Delivery", value: "91.2%", trend: "Medium", icon: Zap, color: "text-primary bg-primary/5 border-primary/10" },
           { label: "Blacklist Incidence", value: "0.2%", trend: "-0.1%", icon: Lock, color: "text-rose-500 bg-rose-50 border-rose-100/50" },
           { label: "Active Entities", value: "02", trend: "TRAI OK", icon: Database, color: "text-indigo-500 bg-indigo-50 border-indigo-100/50" },
         ].map((kpi, i) => (
           <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between group hover:shadow-md transition-all cursor-pointer">
              <div className="leading-none flex-1">
                 <p className="text-[8px] font-black text-secondary/30 uppercase tracking-widest mb-2">{kpi.label}</p>
                 <p className="text-3xl font-black text-typography tracking-tighter leading-none mb-1.5">{kpi.value}</p>
                 <span className="inline-block text-[7px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full uppercase tracking-widest border border-emerald-100/50">{kpi.trend}</span>
              </div>
              <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center transition-all group-hover:scale-110 border shadow-sm", kpi.color)}>
                 <kpi.icon size={18} />
              </div>
           </div>
         ))}
      </div>

      {/* Main Listing Section */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col min-h-[400px]">
         <div className="p-3 border-b border-gray-100 flex flex-col lg:flex-row lg:items-center justify-between gap-3 bg-gray-50/30">
            <div className="relative flex-1 max-w-md">
               <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary/30" />
               <input placeholder="Search Template, DLT ID or Type..." className="w-full bg-white border border-gray-200 pl-9 pr-4 py-2 rounded-lg text-[10px] font-black outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/30 shadow-sm transition-all" />
            </div>
            <div className="flex items-center space-x-2">
               <button className="w-9 h-9 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-secondary/40 hover:text-primary transition-all shadow-sm active:scale-95"><Filter size={14} /></button>
               <button className="px-5 py-2 bg-slate-900 text-white rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-primary transition-all shadow-lg active:scale-95">Sync Carriers</button>
            </div>
         </div>

         <div className="overflow-x-auto flex-1">
            <table className="w-full text-left font-montserrat">
               <thead className="bg-gray-50/50 border-b border-gray-100">
                  <tr>
                     <th className="px-4 py-3 text-[9px] font-black uppercase tracking-widest text-secondary/40">SMS Entity</th>
                     <th className="px-4 py-3 text-[9px] font-black uppercase tracking-widest text-secondary/40">Template Node</th>
                     <th className="px-4 py-3 text-[9px] font-black uppercase tracking-widest text-secondary/40 text-center">Chars</th>
                     <th className="px-4 py-3 text-[9px] font-black uppercase tracking-widest text-secondary/40">DLT ID</th>
                     <th className="px-4 py-3 text-[9px] font-black uppercase tracking-widest text-secondary/40 text-right">Commit</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-50">
                  {smsTemplates.map((sms) => (
                    <tr key={sms.id} className="group hover:bg-gray-50/50 transition-all font-montserrat">
                       <td className="px-4 py-3">
                          <div className="flex items-center space-x-3">
                             <div className={cn(
                               "w-9 h-9 rounded-lg flex items-center justify-center transition-all group-hover:bg-primary group-hover:text-white border shadow-sm",
                               sms.status === 'APPROVED' ? "bg-emerald-50 text-emerald-500 border-emerald-100" : sms.status === 'PENDING_DLT' ? "bg-amber-50 text-amber-500 border-amber-100" : "bg-rose-50 text-rose-500 border-rose-100"
                             )}>
                                <MessageSquare size={16} />
                             </div>
                             <div>
                                <h4 className="text-[11px] font-black text-typography uppercase leading-none group-hover:text-primary transition-colors">{sms.name}</h4>
                                <p className="text-[8px] font-black text-secondary/30 uppercase tracking-widest mt-1.5 leading-none">{sms.type} Unit</p>
                             </div>
                          </div>
                       </td>
                       <td className="px-4 py-3 max-w-xs">
                          <p className="text-[10px] font-black text-secondary/60 leading-tight truncate">"{sms.text}"</p>
                       </td>
                       <td className="px-4 py-3 text-center">
                          <span className={cn(
                              "text-[12px] font-black",
                              sms.charCount > 160 ? "text-rose-500" : "text-typography"
                          )}>{sms.charCount}</span>
                       </td>
                       <td className="px-4 py-3">
                          <div className="flex items-center space-x-2 text-[10px] font-black text-secondary/60 font-mono leading-none">
                             <Lock size={10} className="text-secondary/30" />
                             <span>{sms.dltId.slice(0, 8)}...</span>
                             <Copy size={12} className="hover:text-primary text-secondary/30 cursor-pointer transition-colors" />
                          </div>
                       </td>
                       <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end space-x-1.5">
                             <span className={cn(
                               "px-2 py-1 rounded-md text-[7px] font-black uppercase tracking-widest border transition-all shadow-sm",
                               sms.status === 'APPROVED' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : sms.status === 'PENDING_DLT' ? "bg-amber-50 text-amber-600 border-amber-100" : "bg-rose-50 text-rose-600 border-rose-100"
                             )}>
                                {sms.status}
                             </span>
                             <button className="w-8 h-8 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-secondary/30 hover:bg-slate-900 hover:text-white transition-all shadow-sm">
                                <ArrowUpRight size={14} />
                             </button>
                          </div>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>

         <div className="p-3 border-t border-gray-100 flex items-center justify-between bg-gray-50/30">
            <div className="flex items-center space-x-3 relative z-10">
               <AlertCircle size={12} className="text-amber-500 animate-pulse" />
               <p className="text-[8px] font-black text-secondary/30 uppercase tracking-widest">TRAI Regulation: DLT ID Verification Sync Active</p>
            </div>
            <p className="text-[7px] font-black text-secondary/20 uppercase tracking-widest relative z-10">Carrier Node Gateway v2.4</p>
         </div>
      </section>

      {/* Device Preview Node */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
         <div className="bg-slate-900 p-6 rounded-xl text-white flex flex-col justify-between group overflow-hidden relative shadow-lg">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform duration-1000">
               <History size={100} className="text-primary" />
            </div>
            <div className="relative z-10">
               <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Carrier Latency Monitor</h4>
               <div className="space-y-2">
                  {[
                    { carrier: "Airtel India", latency: "1.2s", success: "94.2%" },
                    { carrier: "Reliance Jio", latency: "0.8s", success: "98.4%" },
                  ].map((c, i) => (
                    <div key={i} className="flex items-center justify-between p-3.5 bg-white/5 rounded-lg border border-white/5 hover:bg-white/10 transition-all cursor-pointer">
                       <div className="leading-none">
                          <p className="text-[11px] font-black text-white tracking-widest uppercase leading-none">{c.carrier}</p>
                          <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mt-1.5">Latency: {c.latency} • API: <span className="text-emerald-500">{c.success}</span></p>
                       </div>
                       <Zap size={14} className="text-slate-600" />
                    </div>
                  ))}
               </div>
            </div>
            <button className="mt-6 w-full py-2.5 bg-white text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-xl active:scale-95">
               Full Routing History
            </button>
         </div>

         {/* Virtual SMS Preview Device */}
         <div className="bg-gray-50/50 p-5 rounded-xl flex flex-col items-center justify-center relative overflow-hidden group border border-gray-200">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform duration-1000">
               <Smartphone size={100} className="text-primary" />
            </div>
            <div className="w-[200px] h-[340px] bg-slate-900 rounded-[2rem] border-[4px] border-slate-800 shadow-xl relative overflow-hidden p-4">
               <div className="w-12 h-1.5 bg-slate-800 rounded-full mx-auto mb-4" />
               <div className="flex items-center space-x-2 mb-4 font-mono text-[8px] font-bold text-slate-500 justify-between uppercase">
                  <span>9:41 AM</span>
                  <div className="flex items-center space-x-1">
                     <div className="w-1 h-1 bg-emerald-500 rounded-full" />
                     <span>LTE</span>
                  </div>
               </div>
               
               <div className="space-y-3">
                  <div className="flex flex-col">
                     <div className="bg-slate-800/80 p-3 rounded-xl rounded-tl-none border border-slate-700/50 shadow-sm">
                        <p className="text-[9px] font-bold text-white leading-relaxed">Your EduSearch OTP is <span className="text-primary font-black">992142</span>. Valid for 10m.</p>
                     </div>
                     <span className="text-[7px] text-slate-500 mt-1 uppercase tracking-widest ml-1 font-black">1m ago • EDUSCH</span>
                  </div>
               </div>

               <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-slate-800 rounded-full border border-slate-700 shadow-inner flex items-center justify-center">
                  <div className="w-2 h-2 border border-slate-600 rounded-sm" />
               </div>
            </div>
            <p className="text-[8px] font-black text-secondary/30 uppercase tracking-widest mt-4">Virtual Node Preview: OTP Vector</p>
         </div>
      </section>
    </div>
  );
}

