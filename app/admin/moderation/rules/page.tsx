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
    <div className="space-y-6 font-montserrat pb-10">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-4 md:space-y-0 pb-4 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-1.5">
              <div className="bg-primary/5 px-2.5 py-1 rounded-lg border border-primary/10">
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary">Content Control</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30 uppercase tracking-widest text-[10px]">Rule Matrix</span>
           </div>
           <h1 className="text-3xl font-black text-typography tracking-tighter leading-none mb-1">
             Auto-Mod <span className="text-primary italic">Config</span>
           </h1>
           <p className="text-secondary/40 text-[10px] font-black uppercase tracking-[0.2em] mt-1.5 leading-none">
              Managing AI Rules & Shadow Mode Testing
           </p>
        </div>

        <div className="flex items-center space-x-3">
           <button className="flex items-center space-x-2 px-6 py-2.5 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20">
              <Plus size={14} />
              <span>Deploy Rule</span>
           </button>
        </div>
      </section>

      <section className="grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-4 space-y-4 text-typography">
            <div className="bg-slate-900 p-4 rounded-xl text-white shadow-xl shadow-slate-900/10 relative overflow-hidden group">
               <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-primary/20 to-transparent pointer-events-none" />
               <h3 className="text-xl font-black tracking-tight uppercase leading-none mb-1.5">Rule Engine</h3>
               <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest mb-6">SAVING 640 MODERATOR HOURS</p>

               <div className="space-y-2">
                 <div className="flex items-center justify-between px-3 py-2.5 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                    <span className="text-[9px] font-black uppercase tracking-widest text-white/50">Auto-Approved</span>
                    <span className="text-sm font-black text-emerald-400">1,450</span>
                 </div>
                 <div className="flex items-center justify-between px-3 py-2.5 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                    <span className="text-[9px] font-black uppercase tracking-widest text-white/50">Auto-Rejected</span>
                    <span className="text-sm font-black text-red-400">234</span>
                 </div>
                 <div className="flex items-center justify-between px-3 py-2.5 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                    <span className="text-[9px] font-black uppercase tracking-widest text-white/50">Shadow Mode</span>
                    <span className="text-sm font-black text-sky-400">12</span>
                 </div>
               </div>
            </div>

            <div className="bg-amber-50/50 border border-amber-100 p-4 rounded-xl shadow-sm">
               <h3 className="text-[10px] font-black text-amber-900 uppercase tracking-widest mb-2 flex items-center space-x-2">
                 <ShieldAlert size={14} className="text-amber-600" /><span>Shadow Mode Notice</span>
               </h3>
               <p className="text-[10px] font-bold text-amber-800/60 leading-relaxed">
                  New rules execute in <span className="text-amber-700 font-black">Shadow Mode</span> for 1 week. They log classifications without acting on reviews to baseline false-positives.
               </p>
            </div>
        </div>

        <div className="col-span-12 lg:col-span-8">
           <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm space-y-4">
              <div className="flex items-center justify-between mb-2">
                 <h3 className="text-xs font-black text-typography uppercase tracking-widest">Active Matrix</h3>
                 <div className="relative">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary/30" />
                    <input placeholder="Search rules..." className="w-48 bg-gray-50 border-0 pl-9 pr-3 py-2 rounded-lg text-[10px] font-bold outline-none ring-1 ring-gray-100 focus:ring-primary/10 transition-all text-typography font-montserrat" />
                 </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                 {rules.map((rule) => (
                    <div key={rule.id} className="p-4 bg-gray-50/50 rounded-xl border border-gray-100 hover:border-primary/20 transition-all group relative overflow-hidden">
                       <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                             <div className={cn(
                               "w-9 h-9 rounded-lg flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105",
                               rule.active ? "bg-emerald-500" : "bg-slate-400"
                             )}>
                                <Bot size={16} />
                             </div>
                             <div>
                                <h4 className="text-sm font-black text-typography leading-tight uppercase tracking-tight">{rule.name}</h4>
                                <p className="text-[9px] font-bold text-secondary/30 uppercase tracking-widest mt-1">RID: {rule.id}</p>
                             </div>
                          </div>
                          <div className="flex items-center space-x-3">
                             <span className={cn(
                               "px-2.5 py-1 rounded-md text-[8px] font-black uppercase tracking-widest border",
                               rule.mode === 'LIVE' ? "bg-red-50 text-red-600 border-red-100" : "bg-sky-50 text-sky-600 border-sky-100"
                             )}>
                                {rule.mode} MODE
                             </span>
                             <div
                               onClick={() => setRules(rules.map(r => r.id === rule.id ? {...r, active: !r.active} : r))}
                               className={cn(
                                "w-9 h-4.5 rounded-full p-1 cursor-pointer transition-all",
                                rule.active ? "bg-emerald-500" : "bg-gray-200"
                             )}>
                                <div className={cn(
                                  "w-2.5 h-2.5 bg-white rounded-full transition-transform",
                                  rule.active ? "translate-x-4.5" : "translate-x-0"
                                )} />
                             </div>
                          </div>
                       </div>

                       <div className="p-3 bg-white rounded-lg border border-gray-100 font-mono text-[10px] text-secondary/70 mb-4 whitespace-normal break-words leading-relaxed shadow-inner">
                          IF <span className="text-primary font-black uppercase">{rule.condition}</span> THEN <span className="text-slate-900 font-black uppercase">{rule.action}</span>
                       </div>

                       <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-widest pt-3 border-t border-gray-50">
                          <div className="flex items-center space-x-2 text-secondary/40">
                             <Activity size={12} />
                             <span>Volume: <span className="text-typography">{rule.hits} Hits</span></span>
                          </div>
                          <div className="flex items-center space-x-3">
                             <button className="flex items-center space-x-1 text-[8px] text-secondary/30 hover:text-primary transition-all">
                                <Copy size={12} /><span>Clone</span>
                             </button>
                             <button className="flex items-center space-x-1 text-[8px] text-secondary/30 hover:text-red-500 transition-all">
                                <Trash2 size={12} /><span>Flush</span>
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
