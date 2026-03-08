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
];export default function EmailTemplateLibraryPage() {
  const [activeTab, setActiveTab] = useState<'ALL' | 'TRANSACTIONAL' | 'CAMPAIGN'>('ALL');

  return (
    <div className="space-y-6 font-montserrat pb-10">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-4 md:space-y-0 pb-4 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-1.5">
              <div className="bg-primary/5 px-2.5 py-1 rounded-lg border border-primary/10">
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary">Notification Engine</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30 uppercase tracking-widest text-[10px]">Email Management</span>
           </div>
           <h1 className="text-3xl font-black text-typography tracking-tighter leading-none mb-1">
             Template <span className="text-primary italic">Registry</span>
           </h1>
           <p className="text-secondary/40 text-[10px] font-black uppercase tracking-[0.2em] mt-1.5 leading-none">
              Managing 20+ Programmatic HTML Templates & Dynamic Contexts
           </p>
        </div>

        <div className="flex items-center space-x-3">
           <button className="flex items-center space-x-2 px-6 py-2.5 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-primary/20">
              <Plus size={14} />
              <span>Draft New Template</span>
           </button>
        </div>
      </section>

      {/* Analytics: Global Email Health */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
         {[
           { label: "Delivery Rate", value: "99.8%", trend: "+0.2%", icon: Send, color: "text-emerald-500 bg-emerald-50 border-emerald-100/50" },
           { label: "Avg Open Rate", value: "32.4%", trend: "Stable", icon: Eye, color: "text-primary bg-primary/5 border-primary/10" },
           { label: "Click Through", value: "8.2%", trend: "High Impact", icon: MousePointer2, color: "text-indigo-500 bg-indigo-50 border-indigo-100/50" },
           { label: "Conversion Index", value: "9.4", trend: "High", icon: Sparkles, color: "text-amber-500 bg-amber-50 border-amber-100/50" },
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
         <div className="p-3 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-gray-50/30">
            <div className="flex items-center space-x-1 bg-white p-1 rounded-lg border border-gray-200 shadow-sm">
               {['ALL', 'TRANSACTIONAL', 'CAMPAIGN'].map(t => (
                 <button 
                  key={t}
                  onClick={() => setActiveTab(t as any)}
                  className={cn(
                    "px-3 py-1.5 rounded-md text-[9px] font-black uppercase tracking-widest transition-all leading-none",
                    activeTab === t ? "bg-primary text-white shadow-md shadow-primary/20" : "text-secondary/30 hover:text-secondary"
                  )}
                 >
                  {t}
                 </button>
               ))}
            </div>
            <div className="flex items-center space-x-2">
               <div className="relative flex-1 md:w-64">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary/30" />
                  <input placeholder="Search templates..." className="w-full bg-white border border-gray-200 pl-9 pr-3 py-2 rounded-lg text-[10px] font-black outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/30 transition-all shadow-sm" />
               </div>
               <button className="w-9 h-9 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-secondary/40 hover:text-primary transition-all shadow-sm active:scale-95"><Filter size={14} /></button>
            </div>
         </div>

         <div className="overflow-x-auto flex-1">
            <table className="w-full text-left font-montserrat">
               <thead className="bg-gray-50/50 border-b border-gray-100">
                  <tr>
                     <th className="px-4 py-3 text-[9px] font-black uppercase tracking-widest text-secondary/40">Template Vector</th>
                     <th className="px-4 py-3 text-[9px] font-black uppercase tracking-widest text-secondary/40">Subject Line Wrapper</th>
                     <th className="px-4 py-3 text-[9px] font-black uppercase tracking-widest text-secondary/40 text-center">Open Rate</th>
                     <th className="px-4 py-3 text-[9px] font-black uppercase tracking-widest text-secondary/40 text-center">Efficiency</th>
                     <th className="px-4 py-3 text-[9px] font-black uppercase tracking-widest text-secondary/40 text-right">Commit</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-50">
                  {templates.map((t) => (
                    <tr key={t.id} className="group hover:bg-gray-50/50 transition-all">
                       <td className="px-4 py-3">
                          <div className="flex items-center space-x-3">
                             <div className={cn(
                               "w-9 h-9 rounded-lg flex items-center justify-center transition-all group-hover:bg-primary group-hover:text-white border shadow-sm",
                               t.type === 'Transactional' ? "bg-indigo-50 text-indigo-600 border-indigo-100" : "bg-primary/5 text-primary border-primary/10"
                             )}>
                                <Mail size={16} />
                             </div>
                             <div>
                                <h4 className="text-[11px] font-black text-typography uppercase leading-none group-hover:text-primary transition-colors">{t.name}</h4>
                                <div className="flex items-center space-x-2 text-[8px] font-black text-secondary/30 uppercase tracking-widest mt-1.5 leading-none">
                                   <span>{t.type}</span>
                                   <div className="w-1 h-1 bg-secondary/10 rounded-full" />
                                   <span>ID: {t.id}</span>
                                </div>
                             </div>
                          </div>
                       </td>
                       <td className="px-4 py-3">
                          <p className="text-[10px] font-black text-secondary/60 truncate max-w-xs leading-none">{t.subject}</p>
                          <p className="text-[7px] font-black text-primary/40 uppercase tracking-widest mt-1.5 leading-none">Context: name, college_name</p>
                       </td>
                       <td className="px-4 py-3 text-center">
                          <div className="inline-flex flex-col items-center leading-none">
                             <span className={cn(
                               "text-[12px] font-black tracking-tighter",
                               t.openRate > 80 ? "text-emerald-500" : "text-typography"
                             )}>{t.openRate}%</span>
                             <div className="w-10 h-1 bg-gray-100 rounded-full mt-1.5 overflow-hidden">
                                <div className="h-full bg-emerald-500" style={{ width: `${t.openRate}%` }} />
                             </div>
                          </div>
                       </td>
                       <td className="px-4 py-3 text-center">
                          <p className="text-[12px] font-black text-typography tracking-tighter leading-none">{t.clickRate}%</p>
                          <p className="text-[7px] font-black text-secondary/20 uppercase tracking-widest mt-1">Click Rate</p>
                       </td>
                       <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end space-x-1.5">
                             <button className="w-8 h-8 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-secondary/30 hover:bg-emerald-500 hover:text-white transition-all shadow-sm"><Eye size={14} /></button>
                             <button className="w-8 h-8 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-secondary/30 hover:bg-slate-900 hover:text-white transition-all shadow-sm"><Edit3 size={14} /></button>
                          </div>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>

         <div className="p-3 border-t border-gray-100 flex items-center justify-between bg-gray-50/30">
            <div className="flex items-center space-x-3">
               <RefreshCw size={12} className="text-emerald-500 animate-spin-slow" />
               <p className="text-[8px] font-black text-secondary/30 uppercase tracking-widest">Brevo API Real-Time Sync Active • 142 Pending</p>
            </div>
            <div className="flex items-center space-x-2 text-[8px] font-black text-secondary/20 uppercase tracking-widest">
               <span>Showing Page 1 of 4</span>
            </div>
         </div>
      </section>

      {/* A/B Test Segment Footer */}
      <section className="bg-slate-900 p-5 rounded-xl text-white flex flex-col md:flex-row md:items-center justify-between group overflow-hidden relative shadow-lg">
         <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform duration-1000">
            <FlaskConical size={80} className="text-primary" />
         </div>
         <div className="flex items-center space-x-4 relative z-10">
            <div className="w-10 h-10 bg-primary/20 text-primary rounded-lg flex items-center justify-center border border-primary/20">
               <FlaskConical size={18} />
            </div>
            <div>
               <h4 className="text-xs font-black text-white tracking-widest uppercase">Subject Experiment Engine</h4>
               <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-1 max-w-lg leading-none">
                  Running <span className="text-white">4 Active A/B Tests</span>. Increases CTR by 24% in Review badge.
               </p>
            </div>
         </div>
         <button className="mt-4 md:mt-0 px-6 py-2.5 bg-white text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-lg relative z-10 active:scale-95">
            Analytics Report
         </button>
      </section>
    </div>
  );
}

