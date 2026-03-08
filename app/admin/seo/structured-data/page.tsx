"use client";

import { useState } from "react";
import { 
  ShieldCheck, 
  Search, 
  Filter, 
  ChevronRight, 
  Code2, 
  CheckCircle2, 
  AlertCircle, 
  XOctagon, 
  RotateCcw, 
  ExternalLink, 
  FileJson, 
  Zap, 
  Layers, 
  Building2, 
  Calendar, 
  MessageSquare, 
  ArrowUpRight 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SchemaAudit {
  id: string;
  type: 'EducationalOrganization' | 'Event' | 'Review' | 'FAQPage' | 'BreadcrumbList' | 'SearchAction';
  pagesTested: number;
  health: number;
  status: 'OPTIMAL' | 'DEPRECATED' | 'ERRORS';
}

export default function StructuredDataValidator() {
  const [url, setUrl] = useState("");
  const [audits] = useState<SchemaAudit[]>([
    { id: "A1", type: "EducationalOrganization", pagesTested: 34204, health: 98, status: 'OPTIMAL' },
    { id: "A2", type: "Event", pagesTested: 2102, health: 74, status: 'ERRORS' },
    { id: "A3", type: "Review", pagesTested: 12402, health: 92, status: 'OPTIMAL' },
    { id: "A4", type: "FAQPage", pagesTested: 840, health: 88, status: 'OPTIMAL' },
    { id: "A5", type: "BreadcrumbList", pagesTested: 90220, health: 100, status: 'OPTIMAL' },
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-4 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-2">
              <div className="bg-primary/5 px-3 py-1.5 rounded-xl border border-primary/10">
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary italic lowercase underline decoration-primary/10">Rich Results Intelligence</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30">Structured Data Validator</span>
           </div>
           <h1 className="text-3xl md:text-3xl md:text-5xl font-black text-typography tracking-tighter leading-none mb-1">
             Schema <span className="text-primary italic">Auditor</span>
           </h1>
           <p className="text-secondary/40 text-sm font-bold uppercase tracking-widest mt-2">
              Validating JSON-LD Fragments for 90,000+ Growth Nodes
           </p>
        </div>

        <div className="flex items-center space-x-4">
           <button className="flex items-center space-x-2 px-8 py-4 bg-primary text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20">
              <RotateCcw size={18} />
              <span>Full Manifest Scrape</span>
           </button>
        </div>
      </section>

      {/* Manual URL Tester */}
      <section className="bg-white p-12 rounded-[3.5rem] border border-gray-50 shadow-sm flex flex-col md:flex-row md:items-center space-y-6 md:space-y-0 md:space-x-12 relative overflow-hidden group">
         <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform">
            <FileJson size={140} className="text-primary" />
         </div>
         <div className="mb-0 relative z-10">
            <h4 className="text-2xl font-black text-typography uppercase tracking-tighter italic">Live URL Profiler</h4>
            <p className="text-[11px] font-bold text-secondary/30 uppercase tracking-widest mt-2 max-w-sm">
               Extract and validate all JSON-LD structured data against Google's Rich Result requirements.
            </p>
         </div>
         <div className="flex-1 flex items-center space-x-4 bg-snow-pearl/50 p-3 rounded-2xl border border-gray-50 max-w-2xl relative z-10 w-full">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm ring-1 ring-gray-100">
               <Globe size={24} />
            </div>
            <input 
               placeholder="https://edusearch.com/college/iit-delhi" 
               className="bg-transparent border-0 pl-4 py-4 text-[14px] font-bold outline-none flex-1 italic" 
               value={url}
               onChange={(e) => setUrl(e.target.value)}
            />
            <button className="px-10 py-4 bg-slate-900 text-white rounded-[1.8rem] text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center space-x-3 group">
               <ShieldCheck size={18} className="group-hover:animate-bounce" />
               <span>Test Schema</span>
            </button>
         </div>
      </section>

      {/* Aggregate Health Grid */}
      <section className="bg-white rounded-2xl border border-gray-50 shadow-sm overflow-hidden flex flex-col">
        <div className="p-6 md:p-6 border-b border-gray-50 flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-snow-pearl/30">
           <div>
              <h3 className="text-xl font-black text-typography tracking-tighter italic lowercase underline decoration-primary/10 select-none capitalize">Growth Node Schema Health</h3>
              <p className="text-[10px] font-bold text-secondary/30 uppercase tracking-[0.2em] mt-2 italic select-none">Daily Batch Audit of Entire URL Manifest</p>
           </div>
        </div>

        <div className="overflow-x-auto">
           <table className="w-full text-left italic">
              <thead className="bg-snow-pearl/50 border-b border-gray-100">
                 <tr>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">JSON-LD Vocabulary Type</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Pages Injected</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Violation Cluster</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Health Score</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40 text-right">Commit</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {audits.map((audit) => (
                  <tr key={audit.id} className="group hover:bg-snow-pearl/30 transition-all">
                    <td className="px-10 py-4">
                       <div className="flex items-center space-x-6">
                          <div className={cn(
                             "w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-inner",
                             audit.status === 'OPTIMAL' ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                          )}>
                             <Layers size={24} />
                          </div>
                          <div>
                             <h4 className="text-base font-black text-typography leading-tight lowercase underline decoration-secondary/10 tracking-tight">{audit.type}</h4>
                             <p className="text-[9px] font-bold text-secondary/30 uppercase tracking-widest mt-1">Schema.org Vocabulary v1.4</p>
                          </div>
                       </div>
                    </td>
                    <td className="px-10 py-4">
                       <span className="text-[14px] font-black text-typography tracking-tighter">{audit.pagesTested.toLocaleString()} Nodes</span>
                    </td>
                    <td className="px-10 py-4">
                       {audit.status === 'ERRORS' ? (
                          <div className="flex items-center space-x-3 text-rose-600">
                             <XOctagon size={16} />
                             <span className="text-[10px] font-black uppercase tracking-widest">14 Critical Failures</span>
                          </div>
                       ) : (
                          <div className="flex items-center space-x-3 text-emerald-600">
                             <CheckCircle2 size={16} />
                             <span className="text-[10px] font-black uppercase tracking-widest">Optimal Enrichment</span>
                          </div>
                       )}
                    </td>
                    <td className="px-10 py-4">
                       <div className="flex flex-col items-center">
                          <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden mb-2 shadow-inner">
                             <div 
                               className={cn("h-full transition-all duration-1000", audit.health > 90 ? "bg-emerald-500" : audit.health > 70 ? "bg-amber-500" : "bg-rose-500")}
                               style={{ width: `${audit.health}%` }}
                             />
                          </div>
                          <span className="text-[10px] font-black text-typography italic">{audit.health}% CONF</span>
                       </div>
                    </td>
                    <td className="px-10 py-4 text-right">
                       <button className="px-6 py-2 bg-white border border-gray-100 rounded-xl text-[10px] font-black uppercase tracking-widest hover:border-primary/20 hover:text-primary transition-all shadow-sm">
                          Fix Vocabulary
                       </button>
                    </td>
                  </tr>
                ))}
              </tbody>
           </table>
        </div>

        <div className="p-6 border-t border-gray-50 flex items-center justify-between text-[11px] font-bold text-secondary/30 uppercase tracking-widest italic bg-snow-pearl/50">
           <div className="flex items-center space-x-3">
              <Code2 size={16} className="text-primary" />
              <span>Programmatic Schema Injection Engine v3.1 Operational • 100% Core coverage</span>
           </div>
           <p>Last Global Audit: 42 mins ago</p>
        </div>
      </section>

      {/* Schema Components Visualizer */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-5">
         {[
           { icon: Building2, label: "Institution Schema", stat: "34k Nodes" },
           { icon: Calendar, label: "Exam Event Data", stat: "2k Nodes" },
           { icon: MessageSquare, label: "Review Aggregate", stat: "12k Nodes" },
           { icon: Zap, label: "Search Action Hub", stat: "Global Page" }
         ].map((c, i) => (
           <div key={i} className="bg-slate-900 p-5 rounded-2xl border border-white/5 text-white italic group hover:border-primary/30 transition-all cursor-pointer">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform mb-6">
                 <c.icon size={24} />
              </div>
              <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">{c.label}</h5>
              <p className="text-xl font-black tracking-tighter uppercase">{c.stat}</p>
           </div>
         ))}
      </div>
    </div>
  );
}
