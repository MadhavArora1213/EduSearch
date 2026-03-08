"use client";

import { useState } from "react";
import { 
  Calendar, 
  Search, 
  Filter, 
  ChevronRight, 
  Plus, 
  Clock, 
  Users, 
  Target, 
  CheckCircle2, 
  AlertCircle, 
  Zap, 
  MoreVertical, 
  Send, 
  Eye, 
  Trash2, 
  Mail, 
  MessageSquare, 
  Globe, 
  ArrowUpRight, 
  TrendingUp, 
  History, 
  HardDrive,
  Activity
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Campaign {
  id: string;
  name: string;
  channel: 'EMAIL' | 'SMS' | 'WHATSAPP';
  segment: string;
  status: 'SCHEDULED' | 'RUNNING' | 'COMPLETED' | 'DRAFT';
  scheduledTime: string;
  reach: number;
}

const campaigns: Campaign[] = [
  { id: "C1", name: "JEE Main 2026 Alert Digest", channel: "EMAIL", segment: "Engineering Aspirants", status: 'SCHEDULED', scheduledTime: "2026-03-15 18:00", reach: 85400 },
  { id: "C2", name: "Maharashtra Private Colleges Promo", channel: "WHATSAPP", segment: "West India Cohort", status: 'RUNNING', scheduledTime: "2026-03-08 10:00", reach: 12400 },
  { id: "C3", name: "Scholarship Reminder (7d)", channel: "SMS", segment: "Shortlisted Students", status: 'DRAFT', scheduledTime: "2026-03-12 11:30", reach: 5200 },
  { id: "C4", name: "February Growth Newsletter", channel: "EMAIL", segment: "Global (All Users)", status: 'COMPLETED', scheduledTime: "2026-02-28 09:00", reach: 125000 },
];

export default function CampaignSchedulerPage() {
  return (
    <div className="space-y-10 font-montserrat italic not-italic font-montserrat">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-6 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-2">
              <div className="bg-primary/5 px-3 py-1.5 rounded-xl border border-primary/10">
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary italic lowercase underline decoration-primary/10">Orchestration Hub</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30">Omnichannel Campaign Engine</span>
           </div>
           <h1 className="text-3xl md:text-3xl md:text-5xl font-black text-typography tracking-tighter leading-none mb-1">
             Campaign <span className="text-primary italic">Scheduler</span>
           </h1>
           <p className="text-secondary/40 text-sm font-bold uppercase tracking-widest mt-2">
              Managing Automated Lifecycle Probes & Multi-Channel Broadcast Segments
           </p>
        </div>

        <div className="flex items-center space-x-4">
           <button className="flex items-center space-x-2 px-8 py-4 bg-slate-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-primary transition-all shadow-xl shadow-slate-900/10 active:scale-95 group italic">
              <Plus size={18} className="group-hover:rotate-90 transition-transform duration-500 italic" />
              <span>Provision Broadcast</span>
           </button>
        </div>
      </section>

      {/* Campaign Health KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 italic">
         {[
           { label: "Channel Delivery", value: "98.4%", trend: "+1.2%", icon: Send, color: "text-emerald-500 bg-emerald-50" },
           { label: "Active Broadcasts", value: "14 Nodes", trend: "Balanced", icon: Activity, color: "text-primary bg-primary/5" },
           { label: "Segment Coverage", value: "82% Users", trend: "High", icon: Target, color: "text-indigo-500 bg-indigo-50" },
           { label: "Engagement ROI", value: "12.8x", trend: "+2.4", icon: TrendingUp, color: "text-amber-500 bg-amber-50" },
         ].map((kpi, i) => (
           <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-50 shadow-sm flex items-center justify-between group hover:border-primary/20 transition-all cursor-pointer">
              <div>
                 <p className="text-[10px] font-bold text-secondary/30 uppercase tracking-widest italic mb-2 leading-none">{kpi.label}</p>
                 <p className="text-3xl font-black text-typography tracking-tighter leading-none italic">{kpi.value}</p>
                 <span className="inline-block mt-3 text-[10px] font-black text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full italic">{kpi.trend}</span>
              </div>
              <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 shadow-inner italic", kpi.color)}>
                 <kpi.icon size={26} />
              </div>
           </div>
         ))}
      </div>

      {/* Main Campaign Timeline Listing */}
      <section className="bg-white rounded-[3rem] border border-gray-50 shadow-sm overflow-hidden flex flex-col font-montserrat italic not-italic">
         <div className="p-6 md:p-10 border-b border-gray-50 flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-snow-pearl/30 border-gray-100">
            <div className="relative flex-1 max-w-xl italic">
               <Search size={22} className="absolute left-6 top-1/2 -translate-y-1/2 text-secondary/20" />
               <input placeholder="Search Active Campaigns or Segments..." className="w-full bg-white border-0 pl-16 pr-8 py-5 rounded-3xl text-[14px] font-bold outline-none focus:ring-4 focus:ring-primary/5 transition-all shadow-inner" />
            </div>
            <div className="flex items-center space-x-4 lg:pl-10 italic w-full lg:w-auto justify-between lg:justify-end">
               <button className="p-5 bg-white border border-gray-100 rounded-2xl text-secondary/20 hover:text-primary transition-all shadow-sm italic"><Filter size={20} /></button>
            </div>
         </div>

         <div className="overflow-x-auto italic">
            <table className="w-full text-left italic">
               <thead className="bg-snow-pearl/50 border-b border-gray-100 italic">
                  <tr>
                     <th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-secondary/40">Campaign Node</th>
                     <th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-secondary/40">Channel / Segment</th>
                     <th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-secondary/40 text-center">Scheduled Cycle</th>
                     <th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-secondary/40 text-center">Batch Size</th>
                     <th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-secondary/40 text-right">Commit</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-50 italic">
                  {campaigns.map((c) => (
                    <tr key={c.id} className="group hover:bg-snow-pearl/30 transition-all font-montserrat italic not-italic">
                       <td className="px-10 py-10">
                          <div className="flex items-center space-x-6 italic">
                             <div className={cn(
                               "w-16 h-16 rounded-[1.5rem] flex items-center justify-center transition-all group-hover:scale-110 shadow-inner",
                               c.status === 'RUNNING' ? "bg-emerald-50 text-emerald-500" : c.status === 'SCHEDULED' ? "bg-primary/5 text-primary" : "bg-snow-pearl text-secondary/10"
                             )}>
                                <Send size={28} />
                             </div>
                             <div>
                                <h4 className="text-[14px] font-black text-typography uppercase tracking-tight group-hover:text-primary transition-colors italic truncate max-w-[200px] underline decoration-primary/20">{c.name}</h4>
                                <div className="flex items-center space-x-2 text-[8px] font-bold text-secondary/20 uppercase tracking-widest mt-1 italic">
                                   <span>CID: {c.id}</span>
                                   <div className="w-1 h-1 bg-secondary/10 rounded-full" />
                                   <span className={cn(c.status === 'RUNNING' && "text-emerald-500")}>Status: {c.status}</span>
                                </div>
                             </div>
                          </div>
                       </td>
                       <td className="px-10 py-10 italic">
                          <div className="flex items-center space-x-2 bg-slate-900 border border-slate-800 text-white px-3 py-1.5 rounded-xl italic inline-flex mb-1">
                             {c.channel === 'EMAIL' ? <Mail size={12} /> : c.channel === 'WHATSAPP' ? <Globe size={12} /> : <MessageSquare size={12} />}
                             <span className="text-[8px] font-black uppercase tracking-widest">{c.channel}</span>
                          </div>
                          <p className="text-[11px] font-bold text-secondary/40 italic lowercase underline decoration-primary/10">{c.segment}</p>
                       </td>
                       <td className="px-10 py-10 text-center italic">
                          <p className="text-[12px] font-black text-typography italic tracking-tighter">{c.scheduledTime}</p>
                          <p className="text-[8px] font-bold text-secondary/20 uppercase tracking-widest mt-1 italic">Local Execution Offset</p>
                       </td>
                       <td className="px-10 py-10 text-center italic">
                          <p className="text-xl font-black text-typography italic tracking-tighter">{(c.reach / 1000).toFixed(1)}K</p>
                          <p className="text-[8px] font-bold text-secondary/20 uppercase tracking-widest italic">Audience Vector</p>
                       </td>
                       <td className="px-10 py-10 text-right italic">
                          <div className="flex items-center justify-end space-x-3 italic">
                             <button className="p-4 bg-white border border-gray-100 rounded-2xl hover:bg-rose-50 hover:text-rose-500 transition-all text-secondary/20 shadow-sm italic"><Trash2 size={18} /></button>
                             <button className="p-4 bg-white border border-gray-100 rounded-2xl hover:bg-primary hover:text-white transition-all text-secondary/20 shadow-sm italic font-montserrat not-italic">
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
            <div className="absolute top-0 right-0 p-10 opacity-5 italic">
               <History size={100} className="text-primary" />
            </div>
            <div className="flex items-center space-x-6 relative z-10 italic">
               <Clock size={18} className="text-secondary/20" />
               <p className="text-xs font-black text-secondary/40 uppercase tracking-widest italic underline decoration-primary/10 uppercase">Campaign Node v4.0 Active • CRON-Offset Polled via Fastify Orchestrator • 12 Global Campaigns Queued</p>
            </div>
            <p className="text-[9px] font-black text-secondary/20 uppercase tracking-widest relative z-10 italic">Last Settlement: 1h 4m ago</p>
         </div>
      </section>

      {/* Frequency Control / Segment Suggestor Node */}
      <section className="bg-slate-900 p-12 rounded-[3.5rem] text-white flex flex-col md:flex-row md:items-center justify-between group overflow-hidden relative italic not-italic font-montserrat">
         <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-primary/10 blur-3xl rounded-full" />
         <div className="flex items-center space-x-8 relative z-10">
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-primary shadow-inner italic">
               <Target size={28} />
            </div>
            <div>
               <h4 className="text-xl font-black text-white tracking-tighter uppercase italic lowercase">AI Segment Synthesis Node</h4>
               <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-2 max-w-lg italic">
                  Suggested Segment: <span className="text-white">"Students with 80% scroll depth on VIT profile but 0 inquiry"</span>. Potential Audience Size: <span className="text-emerald-500">1,420</span>.
               </p>
            </div>
         </div>
         <div className="mt-8 md:mt-0 relative z-10">
            <button className="px-10 py-5 bg-white text-slate-900 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-primary/20 italic font-montserrat not-italic">
               Draft AI Campaign
            </button>
         </div>
      </section>
    </div>
  );
}
