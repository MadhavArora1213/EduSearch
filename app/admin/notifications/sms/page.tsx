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
    <div className="space-y-10 font-montserrat italic not-italic font-montserrat">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-6 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-2">
              <div className="bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-100 italic">
                 <span className="text-[10px] font-black uppercase tracking-widest text-rose-600 italic">DLT Compliance Lab</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30">TRAI Regulation Center</span>
           </div>
           <h1 className="text-3xl md:text-3xl md:text-5xl font-black text-typography tracking-tighter leading-none mb-1">
             SMS <span className="text-primary italic">Manager</span>
           </h1>
           <p className="text-secondary/40 text-sm font-bold uppercase tracking-widest mt-2">
              Auditing 160-Character Nodes for India Carrier Compliance & Lead Delivery
           </p>
        </div>

        <div className="flex items-center space-x-4">
           <button className="flex items-center space-x-2 px-8 py-4 bg-slate-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-primary transition-all shadow-xl shadow-slate-900/10 italic">
              <Plus size={18} />
              <span>Register New Template</span>
           </button>
        </div>
      </section>

      {/* Compliance & Delivery KPI strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 italic">
         {[
           { label: "DLT Approval Rate", value: "94%", trend: "Stable", icon: ShieldCheck, color: "text-emerald-500 bg-emerald-50" },
           { label: "Avg Carrier Delivery", value: "91.2%", trend: "Medium", icon: Zap, color: "text-primary bg-primary/5" },
           { label: "Blacklist Incidence", value: "0.2%", trend: "-0.1%", icon: Lock, color: "text-rose-500 bg-rose-50" },
           { label: "Active DLT Entities", value: "02", trend: "TRAI OK", icon: Database, color: "text-indigo-500 bg-indigo-50" },
         ].map((kpi, i) => (
           <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-50 shadow-sm flex items-center justify-between group hover:border-primary/20 transition-all cursor-pointer">
              <div>
                 <p className="text-[10px] font-bold text-secondary/30 uppercase tracking-widest italic mb-2 leading-none">{kpi.label}</p>
                 <p className="text-4xl font-black text-typography tracking-tighter leading-none italic">{kpi.value}</p>
                 <span className="inline-block mt-3 text-[10px] font-black text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full italic">{kpi.trend}</span>
              </div>
              <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 shadow-inner", kpi.color)}>
                 <kpi.icon size={26} />
              </div>
           </div>
         ))}
      </div>

      {/* Main Listing Grid */}
      <section className="bg-white rounded-[3rem] border border-gray-50 shadow-sm overflow-hidden flex flex-col font-montserrat italic not-italic">
         <div className="p-6 md:p-10 border-b border-gray-50 flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-snow-pearl/30 border-gray-100">
            <div className="relative flex-1 max-w-xl italic">
               <Search size={22} className="absolute left-6 top-1/2 -translate-y-1/2 text-secondary/20" />
               <input placeholder="Search Template, DLT ID or Type..." className="w-full bg-white border-0 pl-16 pr-8 py-5 rounded-3xl text-[14px] font-bold outline-none focus:ring-4 focus:ring-primary/5 transition-all shadow-inner" />
            </div>
            <div className="flex items-center space-x-4 lg:pl-10 italic w-full lg:w-auto justify-between lg:justify-end">
               <button className="p-5 bg-white border border-gray-100 rounded-2xl text-secondary/20 hover:text-primary transition-all shadow-sm italic"><Filter size={20} /></button>
               <button className="px-10 py-5 bg-slate-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-primary transition-all shadow-xl shadow-slate-900/10 italic font-montserrat not-italic">Sync with Carriers</button>
            </div>
         </div>

         <div className="overflow-x-auto italic">
            <table className="w-full text-left italic">
               <thead className="bg-snow-pearl/50 border-b border-gray-100 italic">
                  <tr>
                     <th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-secondary/40">Registered SMS Entity</th>
                     <th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-secondary/40">Raw Template Node</th>
                     <th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-secondary/40 text-center">Chars</th>
                     <th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-secondary/40">DLT Template ID</th>
                     <th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-secondary/40 text-right">Commit Status</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-50 font-montserrat italic not-italic">
                  {smsTemplates.map((sms) => (
                    <tr key={sms.id} className="group hover:bg-snow-pearl/30 transition-all italic">
                       <td className="px-10 py-10">
                          <div className="flex items-center space-x-5 italic">
                             <div className={cn(
                               "w-14 h-14 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 shadow-inner italic",
                               sms.status === 'APPROVED' ? "bg-emerald-50 text-emerald-500" : sms.status === 'PENDING_DLT' ? "bg-amber-50 text-amber-500" : "bg-rose-50 text-rose-500"
                             )}>
                                <MessageSquare size={24} />
                             </div>
                             <div>
                                <h4 className="text-[14px] font-black text-typography uppercase tracking-tight group-hover:text-primary transition-colors italic truncate max-w-[150px]">{sms.name}</h4>
                                <p className="text-[8px] font-bold text-secondary/20 uppercase tracking-widest mt-1 italic decoration-primary/10 underline">{sms.type} Unit</p>
                             </div>
                          </div>
                       </td>
                       <td className="px-10 py-10 max-w-[300px] italic">
                          <p className="text-[11px] font-bold text-secondary/40 leading-relaxed italic lowercase truncate underline decoration-primary/10">"{sms.text}"</p>
                       </td>
                       <td className="px-10 py-10 text-center">
                          <span className={cn(
                             "text-[12px] font-black italic",
                             sms.charCount > 160 ? "text-rose-500" : "text-typography"
                          )}>{sms.charCount}</span>
                       </td>
                       <td className="px-10 py-10 font-mono italic">
                          <div className="flex items-center space-x-2 text-[10px] font-black text-secondary/40 italic">
                             <Lock size={10} className="text-secondary/20" />
                             <span>{sms.dltId}</span>
                             <Copy size={10} className="hover:text-primary cursor-pointer transition-colors" />
                          </div>
                       </td>
                       <td className="px-10 py-10 text-right italic">
                          <div className="flex items-center justify-end space-x-3 italic">
                             <span className={cn(
                               "px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest italic decoration-primary/10 underline",
                               sms.status === 'APPROVED' ? "bg-emerald-50 text-emerald-600" : sms.status === 'PENDING_DLT' ? "bg-amber-50 text-amber-600" : "bg-rose-50 text-rose-600"
                             )}>
                                {sms.status}
                             </span>
                             <button className="p-4 bg-white border border-gray-100 rounded-2xl hover:bg-primary hover:text-white transition-all shadow-sm italic font-montserrat not-italic">
                                <ArrowUpRight size={18} />
                             </button>
                          </div>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>

         <div className="p-10 border-t border-gray-50 flex items-center justify-between bg-white italic relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-5">
               <History size={100} className="text-primary" />
            </div>
            <div className="flex items-center space-x-6 relative z-10 italic font-montserrat not-italic">
               <AlertCircle size={18} className="text-amber-500 animate-pulse" />
               <p className="text-xs font-black text-secondary/40 uppercase tracking-widest italic decoration-primary/10 underline">TRAI Legal Warning: 2 unregistered templates detected in production nodes • Sync blocked until DLT ID verified</p>
            </div>
            <p className="text-[9px] font-black text-secondary/20 uppercase tracking-widest relative z-10 italic">Carrier Node: VI/Airtel/Jio Unified Gateway v2.4</p>
         </div>
      </section>

      {/* Device Preview Node */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 font-montserrat italic not-italic">
         <div className="bg-slate-900 p-12 rounded-[3.5rem] text-white flex flex-col justify-between group overflow-hidden relative italic not-italic">
            <div className="absolute inset-0 bg-primary/10 flex items-center space-x-2 duration-1000" />
            <div className="relative z-10">
               <h4 className="text-lg font-black text-slate-500 uppercase tracking-widest mb-10 italic underline decoration-primary/30">Carrier Latency Monitor</h4>
               <div className="space-y-6">
                  {[
                    { carrier: "Airtel India", latency: "1.2s", success: "94.2%" },
                    { carrier: "Vodafone Idea", latency: "2.8s", success: "88.1%" },
                    { carrier: "Reliance Jio", latency: "0.8s", success: "98.4%" },
                  ].map((c, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-all cursor-pointer group/q">
                       <div>
                          <p className="text-[13px] font-black text-white italic tracking-tight uppercase underline decoration-primary/20">{c.carrier}</p>
                          <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mt-1">Latency: {c.latency} • API Deliverability: <span className="text-emerald-500">{c.success}</span></p>
                       </div>
                       <Zap size={14} className="text-slate-600 group-hover/q:text-primary transition-colors" />
                    </div>
                  ))}
               </div>
            </div>
            <div className="mt-14 relative z-10">
               <button className="w-full py-5 bg-white text-slate-900 rounded-3xl text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] transition-all shadow-xl shadow-primary/20 italic font-montserrat not-italic">
                  View Full Routing History
               </button>
            </div>
         </div>

         {/* Virtual SMS Preview Device */}
         <div className="bg-snow-pearl p-6 rounded-[3.5rem] flex flex-col items-center justify-center relative overflow-hidden group border border-gray-100 italic not-italic">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-1000">
               <Smartphone size={100} className="text-primary" />
            </div>
            <div className="w-[280px] h-[500px] bg-slate-800 rounded-[3rem] border-[4px] border-slate-700 shadow-2xl relative overflow-hidden p-6 font-montserrat italic not-italic">
               <div className="w-16 h-1.5 bg-slate-700 rounded-full mx-auto mb-6" />
               <div className="flex items-center space-x-3 mb-6 font-mono text-[9px] text-slate-500 justify-between uppercase">
                  <span>9:41 AM</span>
                  <div className="flex items-center space-x-1">
                     <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                     <span>LTE</span>
                  </div>
               </div>
               
               <div className="space-y-4">
                  <div className="flex flex-col italic">
                     <div className="bg-slate-700/50 p-4 rounded-3xl rounded-tl-none border border-slate-600/50">
                        <p className="text-[10px] text-white leading-relaxed italic">Your EduSearch OTP is <span className="text-primary font-black">992142</span>. This is valid for 10 minutes. Do not share it.</p>
                     </div>
                     <span className="text-[7px] text-slate-500 mt-2 uppercase tracking-widest ml-1 font-bold">1 min ago • Sender: EDUSCH</span>
                  </div>
               </div>

               <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-10 h-10 bg-slate-700 rounded-full border border-slate-600 shadow-inner flex items-center justify-center">
                  <div className="w-3 h-3 border-2 border-slate-500 rounded-sm" />
               </div>
            </div>
            <p className="text-[10px] font-black text-secondary/30 uppercase tracking-widest mt-6 italic underline decoration-primary/10 italic">Virtual Node Preview: OTP Vector</p>
         </div>
      </section>
    </div>
  );
}

