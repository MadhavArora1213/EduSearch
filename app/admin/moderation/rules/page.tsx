"use client";

import { useState } from "react";
import { 
  Bot, 
  Plus, 
  Search, 
  Settings, 
  ShieldAlert,
  ChevronRight,
  Activity,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Play,
  Copy,
  Trash2
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AutoModerationRulesConfigPage() {
  const [rules, setRules] = useState([
    { id: "R-1", name: "High Trust Auto-Approve", condition: "AI Score >= 8 AND Status = College Verified AND Rejections = 0", action: "Auto-Approve", active: true, hits: 1450, mode: "LIVE" },
    { id: "R-2", name: "Promotional Content Block", condition: "AI Flag = PROMOTIONAL_DISCOUNT OR Contains Ph No.", action: "Auto-Reject (Reason: Promotional)", active: true, hits: 234, mode: "LIVE" },
    { id: "R-3", name: "Short Gibberish Rule", condition: "Char Count < 100 AND All Ratings = 1 OR 5", action: "Flag for Review", active: true, hits: 54, mode: "LIVE" },
    { id: "R-4", name: "Suspicious Location Override", condition: "IP Location != Reviewer State Profile", action: "Escalate to Senior", active: false, hits: 12, mode: "SHADOW" },
  ]);

  return (
    <div className="space-y-6 pb-20">
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-4 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-2">
              <div className="bg-primary/5 px-3 py-1.5 rounded-xl border border-primary/10">
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary">Content Integrity</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30">Auto-Moderation Setup</span>
           </div>
           <h1 className="text-3xl md:text-3xl md:text-5xl font-black text-typography tracking-tighter leading-none mb-1">
             Rule <span className="text-primary italic">Config</span>
           </h1>
           <p className="text-secondary/40 text-sm font-bold uppercase tracking-widest mt-2">
              Managing AI Rules & Shadow Mode Testing
           </p>
        </div>

        <div className="flex items-center space-x-4">
           <button className="flex items-center space-x-2 px-8 py-4 bg-primary text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20">
              <Plus size={18} />
              <span>Deploy New Rule</span>
           </button>
        </div>
      </section>

      <section className="grid grid-cols-12 gap-5">
        <div className="col-span-12 lg:col-span-4 space-y-8">
            <div className="bg-typography p-6 rounded-2xl text-white shadow-2xl shadow-primary/20 relative overflow-hidden group">
               <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-primary/20 to-transparent pointer-events-none" />
               <h3 className="text-2xl font-black tracking-tight leading-none mb-2">Rule Engine Status</h3>
               <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-8">Saving 60% manual moderator hours</p>
               
               <div className="space-y-6">
                 <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
                    <span className="text-xs font-black uppercase tracking-widest text-white/50">Auto-Approved Today</span>
                    <span className="text-xl font-black text-emerald-400">1,450</span>
                 </div>
                 <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
                    <span className="text-xs font-black uppercase tracking-widest text-white/50">Auto-Rejected Today</span>
                    <span className="text-xl font-black text-red-400">234</span>
                 </div>
                 <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
                    <span className="text-xs font-black uppercase tracking-widest text-white/50">Shadow Mode Hits</span>
                    <span className="text-xl font-black text-sky-400">12</span>
                 </div>
               </div>
            </div>
            
            <div className="bg-amber-50 border border-amber-100 p-5 rounded-2xl">
               <h3 className="text-sm font-black text-amber-900 uppercase tracking-tight mb-2 flex items-center space-x-2">
                 <ShieldAlert size={16} /><span>Shadow Mode Notice</span>
               </h3>
               <p className="text-xs font-bold text-amber-800/70 leading-relaxed italic">
                 New rules execute in "Shadow Mode" for 1 week. They log classifications without acting on reviews, allowing admins to measure false-positive rates before going LIVE.
               </p>
            </div>
        </div>

        <div className="col-span-12 lg:col-span-8">
           <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
              <div className="flex items-center justify-between mb-8">
                 <h3 className="text-xl font-black text-typography uppercase tracking-tight">Active Matrix</h3>
                 <div className="relative">
                    <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/30" />
                    <input placeholder="Search rules..." className="w-64 bg-gray-50 border-0 pl-12 pr-4 py-3 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-primary/10 transition-all text-typography" />
                 </div>
              </div>

              <div className="space-y-6">
                 {rules.map((rule) => (
                   <div key={rule.id} className="p-6 bg-gray-50/50 rounded-3xl border border-gray-100 hover:border-primary/20 transition-all group relative overflow-hidden">
                      <div className="flex items-center justify-between mb-4">
                         <div className="flex items-center space-x-3">
                            <div className={cn(
                              "w-10 h-10 rounded-xl flex items-center justify-center text-white",
                              rule.active ? "bg-emerald-500" : "bg-secondary/20"
                            )}>
                               <Bot size={18} />
                            </div>
                            <div>
                               <h4 className="text-base font-black text-typography leading-tight">{rule.name}</h4>
                               <p className="text-[9px] font-bold text-secondary/40 uppercase tracking-widest mt-0.5">ID: {rule.id}</p>
                            </div>
                         </div>
                         <div className="flex items-center space-x-3">
                            <span className={cn(
                              "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest",
                              rule.mode === 'LIVE' ? "bg-red-50 text-red-600 border border-red-100" : "bg-sky-50 text-sky-600 border border-sky-100"
                            )}>
                               {rule.mode} MODE
                            </span>
                            <div className={cn(
                              "w-12 h-6 rounded-full p-1 cursor-pointer transition-all",
                              rule.active ? "bg-emerald-500" : "bg-gray-200"
                            )}>
                               <div className={cn(
                                 "w-4 h-4 bg-white rounded-full transition-transform",
                                 rule.active ? "translate-x-6" : "translate-x-0"
                               )} />
                            </div>
                         </div>
                      </div>

                      <div className="p-4 bg-white rounded-2xl border border-gray-100 font-mono text-xs text-secondary/80 mb-4 whitespace-normal break-words leading-relaxed">
                         IF <span className="text-primary font-bold">{rule.condition}</span> THEN <span className="text-secondary font-bold">{rule.action}</span>
                      </div>

                      <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                         <div className="flex items-center space-x-2 text-secondary/50">
                            <Activity size={14} />
                            <span>Processed Today: <span className="text-typography">{rule.hits}</span></span>
                         </div>
                         <div className="flex items-center space-x-3 flex items-center space-x-2">
                            <button className="flex items-center space-x-1 text-secondary/40 hover:text-primary transition-all">
                               <Copy size={14} /><span>Clone</span>
                            </button>
                            <button className="flex items-center space-x-1 text-secondary/40 hover:text-red-500 transition-all">
                               <Trash2 size={14} /><span>Delete</span>
                            </button>
                         </div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}
