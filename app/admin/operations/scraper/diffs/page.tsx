"use client";

import { useState } from "react";
import { 
  History, 
  CheckCircle2, 
  XCircle, 
  ChevronRight, 
  Search, 
  Filter, 
  ArrowRight, 
  Globe, 
  Clock, 
  ShieldCheck, 
  AlertTriangle,
  Zap,
  Layers,
  Sparkles,
  Database,
  Building2,
  ExternalLink
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DataDiff {
  id: string;
  collegeName: string;
  field: string;
  oldValue: string;
  newValue: string;
  source: string;
  confidence: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export default function DataDiffViewerPage() {
  const [diffs] = useState<DataDiff[]>([
    {
      id: "DIFF-991",
      collegeName: "IIT Delhi",
      field: "Avg. Placement Package",
      oldValue: "₹18.4 LPA",
      newValue: "₹22.1 LPA",
      source: "NIRF 2026 Data",
      confidence: 98,
      status: 'PENDING'
    },
    {
      id: "DIFF-992",
      collegeName: "LPU Jalandhar",
      field: "NAAC Grade",
      oldValue: "A+",
      newValue: "A++",
      source: "NAAC Portal Webhooks",
      confidence: 100,
      status: 'PENDING'
    },
    {
      id: "DIFF-993",
      collegeName: "Amity University",
      field: "B.Tech Tuition Fee",
      oldValue: "₹3,12,000",
      newValue: "₹3,45,000",
      source: "Official Website Crawler",
      confidence: 72,
      status: 'PENDING'
    }
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-4 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-2">
              <div className="bg-primary/5 px-3 py-1.5 rounded-xl border border-primary/10">
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary italic lowercase">Staging Buffer</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30">Scraper Data Diff Inspector</span>
           </div>
           <h1 className="text-3xl md:text-3xl md:text-5xl font-black text-typography tracking-tighter leading-none mb-1">
             Diff <span className="text-primary italic">Intelligence</span>
           </h1>
           <p className="text-secondary/40 text-sm font-bold uppercase tracking-widest mt-2">
              Reviewing 1,204 Queued Changes Before Post-Staging Commit
           </p>
        </div>

        <div className="flex items-center space-x-4">
           <button className="flex items-center space-x-2 px-6 py-4 bg-white border border-gray-200 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:border-primary/20 transition-all text-secondary/40">
              <History size={16} />
              <span>Full Audit Trail</span>
           </button>
           <button className="flex items-center space-x-2 px-8 py-4 bg-primary text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20">
              <CheckCircle2 size={18} />
              <span>Approve All High-Confidence</span>
           </button>
        </div>
      </section>

      {/* Analytics Strip */}
      <div className="grid grid-cols-3 gap-5">
         {[
           { label: "Queued Diffs", value: "1,204", sub: "842 Auto-pushed", icon: Layers, color: "text-primary" },
           { label: "Avg. Confidence", value: "88.4%", sub: "Source Reliability: High", icon: Sparkles, color: "text-indigo-500" },
           { label: "Conflicts Detected", value: "14", sub: "Needs Manual Decision", icon: AlertTriangle, color: "text-amber-500" }
         ].map((s, i) => (
           <div key={i} className="bg-white p-5 rounded-2xl border border-gray-50 shadow-sm flex items-center space-x-8 group hover:border-primary/20 transition-all">
              <div className={cn("w-16 h-16 rounded-[2rem] flex items-center justify-center transition-all group-hover:scale-110", s.color.replace('text-', 'bg-').replace('500', '50'))}>
                 <s.icon size={28} className={s.color} />
              </div>
              <div>
                 <p className="text-4xl font-black text-typography tracking-tighter leading-none mb-1">{s.value}</p>
                 <p className="text-[10px] font-bold text-secondary/30 uppercase tracking-widest">{s.label}</p>
                 <span className="inline-block mt-3 text-[9px] font-black text-primary uppercase italic">{s.sub}</span>
              </div>
           </div>
         ))}
      </div>

      {/* Main Diff Table */}
      <section className="bg-white rounded-2xl border border-gray-50 shadow-sm overflow-hidden flex flex-col">
        <div className="p-6 md:p-6 border-b border-gray-50 flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-snow-pearl/30">
           <div className="relative flex-1 max-w-xl">
              <Search size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-secondary/20" />
              <input placeholder="Search College or Source..." className="w-full bg-white border-0 pl-16 pr-8 py-5 rounded-3xl text-[14px] font-bold outline-none focus:ring-4 focus:ring-primary/5 transition-all shadow-sm" />
           </div>
           <div className="flex items-center space-x-4 pl-10 px-4 py-2 bg-white rounded-2xl border border-gray-100 shadow-sm">
             <span className="text-[10px] font-black text-secondary/40 uppercase tracking-widest">Confidence:</span>
             <button className="px-4 py-1.5 bg-primary text-white rounded-xl text-[10px] font-black shadow-sm">&gt; 90%</button>
             <button className="px-4 py-1.5 bg-gray-50 text-secondary/40 rounded-xl text-[10px] font-black">All Samples</button>
           </div>
        </div>

        <div className="overflow-x-auto">
           <table className="w-full text-left">
              <thead className="bg-snow-pearl/50 border-b border-gray-100">
                 <tr>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Institution & Field Vector</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">State Change (Old vs New)</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Source Intel</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Confidence</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40 text-right">Commit</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {diffs.map((diff) => (
                  <tr key={diff.id} className="group hover:bg-snow-pearl/30 transition-all">
                    <td className="px-10 py-4">
                       <div className="flex items-center space-x-6">
                          <div className="w-14 h-14 bg-snow-pearl rounded-2xl flex items-center justify-center text-secondary/10 group-hover:bg-primary/5 group-hover:text-primary transition-all">
                             <Building2 size={24} />
                          </div>
                          <div>
                             <h4 className="text-base font-black text-typography leading-tight uppercase italic">{diff.collegeName}</h4>
                             <p className="text-[10px] font-black text-primary uppercase tracking-widest mt-1 underline decoration-primary/10">{diff.field}</p>
                          </div>
                       </div>
                    </td>
                    <td className="px-10 py-4">
                       <div className="flex items-center space-x-4">
                          <span className="text-[12px] font-bold text-secondary/30 line-through bg-gray-50 px-2 py-1 rounded-md">{diff.oldValue}</span>
                          <ArrowRight size={14} className="text-secondary/20" />
                          <span className="text-[13px] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-100">{diff.newValue}</span>
                       </div>
                    </td>
                    <td className="px-10 py-4">
                       <div className="flex items-center space-x-2 text-[11px] font-black text-typography italic">
                          <Globe size={14} className="text-secondary/20" />
                          <span>{diff.source}</span>
                       </div>
                       <button className="flex items-center space-x-1 text-[9px] font-bold text-secondary/30 uppercase tracking-widest mt-1 hover:text-primary transition-colors">
                          <ExternalLink size={10} />
                          <span>Verify Source URL</span>
                       </button>
                    </td>
                    <td className="px-10 py-4">
                       <div className="flex flex-col items-center">
                          <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden mb-2">
                             <div 
                               className={cn("h-full transition-all duration-1000", diff.confidence > 90 ? "bg-emerald-500" : "bg-amber-500")}
                               style={{ width: `${diff.confidence}%` }}
                             />
                          </div>
                          <span className="text-[10px] font-black text-typography">{diff.confidence}%</span>
                       </div>
                    </td>
                    <td className="px-10 py-4 text-right">
                       <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-all">
                          <button className="p-4 bg-white border border-gray-100 rounded-2xl hover:bg-emerald-500 hover:text-white transition-all shadow-sm group/btn" title="Approve & Commit to Core">
                             <CheckCircle2 size={18} />
                          </button>
                          <button className="p-4 bg-white border border-gray-100 rounded-2xl hover:bg-rose-500 hover:text-white transition-all shadow-sm group/btn" title="Reject & Mark as Invalid">
                             <XCircle size={18} />
                          </button>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
           </table>
        </div>

        <div className="p-6 border-t border-gray-50 flex items-center justify-between bg-white italic relative">
           <div className="flex items-center space-x-4">
              <ShieldCheck size={20} className="text-primary" />
              <p className="text-xs font-black text-secondary/40 uppercase tracking-widest leading-none">Auto-Apply logic is active for confidence scores &gt; 95% on non-payout fields.</p>
           </div>
           <p className="text-[10px] font-black text-secondary/20 uppercase tracking-widest">PostgreSQL Staging Log v2.9 Verified</p>
        </div>
      </section>
    </div>
  );
}
