"use client";

import { useState } from "react";
import { 
  Mail, 
  Search, 
  Filter, 
  ChevronRight, 
  Plus, 
  ChevronDown, 
  Send, 
  Eye, 
  Edit3, 
  CheckCircle2, 
  AlertCircle, 
  Zap, 
  Layout, 
  Copy, 
  MoreVertical,
  MousePointer2,
  PieChart,
  Target,
  FlaskConical,
  Sparkles,
  RefreshCw,
  Clock,
  ExternalLink
} from "lucide-react";
import { cn } from "@/lib/utils";

interface EmailTemplate {
  id: string;
  name: string;
  type: 'Transactional' | 'Campaign';
  subject: string;
  sentCount: number;
  openRate: number;
  clickRate: number;
  status: 'ACTIVE' | 'DRAFT' | 'ARCHIVED';
}

const templates: EmailTemplate[] = [
  { id: "T1", name: "Welcome Email v2", type: "Transactional", subject: "Welcome to EduSearch, {{name}}!", sentCount: 14200, openRate: 48.2, clickRate: 12.4, status: 'ACTIVE' },
  { id: "T2", name: "Lead Confirmation (College)", type: "Transactional", subject: "New Lead Received: {{student_name}}", sentCount: 8400, openRate: 92.1, clickRate: 64.2, status: 'ACTIVE' },
  { id: "T3", name: "Scholarship Deadline Alert", type: "Campaign", subject: "7 Days Left: Apply for MIT International Grant", sentCount: 22000, openRate: 24.8, clickRate: 4.2, status: 'ACTIVE' },
  { id: "T4", name: "Review Approved Badge", type: "Transactional", subject: "Your review is live! 🌟", sentCount: 1240, openRate: 88.5, clickRate: 32.1, status: 'DRAFT' },
];

export default function EmailTemplateLibraryPage() {
  const [activeTab, setActiveTab] = useState<'ALL' | 'TRANSACTIONAL' | 'CAMPAIGN'>('ALL');

  return (
    <div className="space-y-10 font-sans italic not-italic">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-6 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-2">
              <div className="bg-primary/5 px-3 py-1.5 rounded-xl border border-primary/10">
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary italic lowercase underline decoration-primary/10">Brevo Integration Hub</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30">Email Lifecycle Manager</span>
           </div>
           <h1 className="text-5xl font-black text-typography tracking-tighter leading-none mb-1">
             Template <span className="text-primary italic">Library</span>
           </h1>
           <p className="text-secondary/40 text-sm font-bold uppercase tracking-widest mt-2">
              Managing 20+ Programmatic HTML Templates with Dynamic Variable Injection
           </p>
        </div>

        <div className="flex items-center space-x-4">
           <button className="flex items-center space-x-2 px-8 py-4 bg-slate-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-primary transition-all shadow-xl shadow-slate-900/10 italic">
              <Plus size={18} />
              <span>Draft New Template</span>
           </button>
        </div>
      </section>

      {/* Analytics: Global Email Health */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
         {[
           { label: "Avg. Delivery Rate", value: "99.8%", trend: "+0.2%", icon: Send, color: "text-emerald-500 bg-emerald-50" },
           { label: "Open Rate (Global)", value: "32.4%", trend: "Stable", icon: Eye, color: "text-primary bg-primary/5" },
           { label: "Click Through Rate", value: "8.2%", trend: "High Impact", icon: MousePointer2, color: "text-indigo-500 bg-indigo-50" },
           { label: "Template ROI Index", value: "9.4", trend: "High", icon: Sparkles, color: "text-amber-500 bg-amber-50" },
         ].map((kpi, i) => (
           <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-50 shadow-sm flex items-center justify-between group hover:border-primary/20 transition-all cursor-pointer">
              <div>
                 <p className="text-[10px] font-bold text-secondary/30 uppercase tracking-widest italic mb-2 leading-none">{kpi.label}</p>
                 <p className="text-3xl font-black text-typography tracking-tighter leading-none italic">{kpi.value}</p>
                 <span className="inline-block mt-3 text-[10px] font-black text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full">{kpi.trend}</span>
              </div>
              <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 shadow-inner", kpi.color)}>
                 <kpi.icon size={26} />
              </div>
           </div>
         ))}
      </div>

      {/* Main Listing Grid */}
      <section className="bg-white rounded-[3rem] border border-gray-50 shadow-sm overflow-hidden flex flex-col italic not-italic">
         <div className="p-10 border-b border-gray-50 flex items-center justify-between bg-snow-pearl/30 border-gray-100">
            <div className="flex items-center space-x-2 bg-white p-1.5 rounded-2xl border border-gray-100 italic">
               {['ALL', 'TRANSACTIONAL', 'CAMPAIGN'].map(t => (
                 <button 
                  key={t}
                  onClick={() => setActiveTab(t as any)}
                  className={cn(
                    "px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                    activeTab === t ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-secondary/30 hover:text-secondary"
                  )}
                 >
                  {t}
                 </button>
               ))}
            </div>
            <div className="flex items-center space-x-4 pl-10">
               <div className="relative flex-1 min-w-[300px] italic">
                  <Search size={22} className="absolute left-6 top-1/2 -translate-y-1/2 text-secondary/20" />
                  <input placeholder="Search Template Name or ID..." className="w-full bg-white border-0 pl-16 pr-8 py-4 rounded-2xl text-[13px] font-bold outline-none focus:ring-4 focus:ring-primary/5 transition-all shadow-inner" />
               </div>
               <button className="p-4 bg-white border border-gray-100 rounded-2xl text-secondary/20 hover:text-primary transition-all shadow-sm italic"><Filter size={20} /></button>
            </div>
         </div>

         <div className="overflow-x-auto italic">
            <table className="w-full text-left">
               <thead className="bg-snow-pearl/50 border-b border-gray-100">
                  <tr>
                     <th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-secondary/40">Email Template Vector</th>
                     <th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-secondary/40">Subject Line Wrapper</th>
                     <th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-secondary/40 text-center">Open Rate</th>
                     <th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-secondary/40 text-center">Click Rate</th>
                     <th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-secondary/40 text-right">Commit</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-50 italic">
                  {templates.map((t) => (
                    <tr key={t.id} className="group hover:bg-snow-pearl/30 transition-all font-sans not-italic">
                       <td className="px-10 py-10">
                          <div className="flex items-center space-x-6 italic">
                             <div className={cn(
                               "w-16 h-16 rounded-[1.5rem] flex items-center justify-center transition-all group-hover:scale-110 shadow-inner",
                               t.type === 'Transactional' ? "bg-indigo-50 text-indigo-600" : "bg-primary/5 text-primary"
                             )}>
                                <Mail size={28} />
                             </div>
                             <div>
                                <h4 className="text-[14px] font-black text-typography uppercase tracking-tight group-hover:text-primary transition-colors italic truncate max-w-[200px]">{t.name}</h4>
                                <div className="flex items-center space-x-2 text-[8px] font-bold text-secondary/20 uppercase tracking-widest mt-1 italic decoration-primary/10 underline">
                                   <span>Type: {t.type}</span>
                                   <div className="w-1 h-1 bg-secondary/10 rounded-full" />
                                   <span>V-ID: {t.id}</span>
                                </div>
                             </div>
                          </div>
                       </td>
                       <td className="px-10 py-10">
                          <p className="text-[12px] font-bold text-secondary/40 italic truncate max-w-[250px] underline decoration-primary/10 lowercase">{t.subject}</p>
                          <p className="text-[8px] font-black text-primary/40 uppercase tracking-widest mt-1">Variables: name, college_name</p>
                       </td>
                       <td className="px-10 py-10 text-center">
                          <div className="inline-flex flex-col items-center italic">
                             <span className={cn(
                               "text-xl font-black italic tracking-tighter",
                               t.openRate > 80 ? "text-emerald-500" : "text-typography"
                             )}>{t.openRate}%</span>
                             <div className="w-12 h-1 bg-snow-pearl rounded-full mt-1.5 overflow-hidden">
                                <div className="h-full bg-emerald-500" style={{ width: `${t.openRate}%` }} />
                             </div>
                          </div>
                       </td>
                       <td className="px-10 py-10 text-center">
                          <p className="text-xl font-black text-typography italic tracking-tighter">{t.clickRate}%</p>
                          <p className="text-[8px] font-bold text-secondary/20 uppercase tracking-widest">Efficiency</p>
                       </td>
                       <td className="px-10 py-10 text-right italic">
                          <div className="flex items-center justify-end space-x-3 italic">
                             <button className="p-4 bg-white border border-gray-100 rounded-2xl hover:bg-emerald-50 transition-all text-secondary/20 hover:text-emerald-500 shadow-sm"><Eye size={18} /></button>
                             <button className="p-4 bg-white border border-gray-100 rounded-2xl hover:bg-primary transition-all text-secondary/20 hover:text-white shadow-sm"><Edit3 size={18} /></button>
                          </div>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>

         <div className="p-10 border-t border-gray-50 flex items-center justify-between bg-white relative overflow-hidden italic">
            <div className="absolute top-0 right-0 p-10 opacity-5">
               <Zap size={100} className="text-primary" />
            </div>
            <div className="flex items-center space-x-6 relative z-10 italic font-sans not-italic">
               <RefreshCw size={18} className="text-secondary/20 animate-spin-slow" />
               <p className="text-xs font-black text-secondary/40 uppercase tracking-widest italic decoration-primary/10 underline">Brevo API Real-Time Sync Active • 142 Pending Transmissions in Queue</p>
            </div>
            <div className="flex items-center space-x-4 relative z-10 italic">
               <button className="px-8 py-4 bg-snow-pearl rounded-2xl text-[10px] font-black uppercase tracking-widest text-secondary/40 hover:text-primary transition-all italic">Previous</button>
               <button className="px-8 py-4 bg-snow-pearl rounded-2xl text-[10px] font-black uppercase tracking-widest text-secondary/40 hover:text-primary transition-all italic">Next Page</button>
            </div>
         </div>
      </section>

      {/* A/B Test Segment Footer */}
      <section className="bg-slate-900 p-12 rounded-[3.5rem] text-white flex flex-col md:flex-row md:items-center justify-between group overflow-hidden relative italic not-italic font-sans">
         <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
         <div className="flex items-center space-x-8 relative z-10">
            <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center text-primary shadow-inner">
               <FlaskConical size={28} />
            </div>
            <div>
               <h4 className="text-xl font-black text-white tracking-tighter uppercase italic lowercase">Subject Line Experiment Engine</h4>
               <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-2 max-w-lg italic">
                  Running <span className="text-white">4 Active A/B Tests</span> across transactional nodes. Current winner in 'Review Approved' increases CTR by 24%.
               </p>
            </div>
         </div>
         <div className="mt-8 md:mt-0 relative z-10">
            <button className="px-10 py-5 bg-white text-slate-900 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-primary/20 italic">
               Generate Diff Report
            </button>
         </div>
      </section>
    </div>
  );
}

