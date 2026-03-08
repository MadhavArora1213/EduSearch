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
  Globe,
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
    <div className="space-y-6 font-montserrat pb-10">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-4 md:space-y-0 pb-4 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-1.5">
              <div className="bg-primary/5 px-2.5 py-1 rounded-lg border border-primary/10">
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary">Rich Data</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30 uppercase tracking-widest text-[10px]">Schema Validator</span>
           </div>
           <h1 className="text-3xl font-black text-typography tracking-tighter leading-none mb-1">
             Schema <span className="text-primary italic">Auditor</span>
           </h1>
           <p className="text-secondary/40 text-[10px] font-black uppercase tracking-[0.2em] mt-1.5 leading-none">
              Validating JSON-LD Fragments for 90k+ Growth Nodes
           </p>
        </div>

        <div className="flex items-center space-x-3">
           <button className="flex items-center space-x-2 px-6 py-2.5 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20">
              <RotateCcw size={14} />
              <span>Full Manifest Scrape</span>
           </button>
        </div>
      </section>

      {/* Manual URL Tester */}
      <section className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-8 relative overflow-hidden group">
         <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
            <FileJson size={80} className="text-primary" />
         </div>
         <div className="mb-0 relative z-10">
            <h4 className="text-lg font-black text-typography uppercase tracking-tighter">Live URL Profiler</h4>
            <p className="text-[9px] font-bold text-secondary/40 uppercase tracking-widest mt-1.5 max-w-[240px]">
               Validate JSON-LD against Google's Rich Result requirements.
            </p>
         </div>
         <div className="flex-1 flex items-center space-x-3 bg-gray-50/50 p-2 rounded-xl border border-gray-100 relative z-10 w-full">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-primary shadow-sm border border-gray-100">
               <Globe size={18} />
            </div>
            <input 
               placeholder="Enter URL to test..." 
               className="bg-transparent border-0 pl-2 py-2 text-xs font-bold outline-none flex-1 text-typography" 
               value={url}
               onChange={(e) => setUrl(e.target.value)}
            />
            <button className="px-6 py-2.5 bg-slate-900 text-white rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center space-x-2 group">
               <ShieldCheck size={14} className="group-hover:animate-bounce" />
               <span>Audit</span>
            </button>
         </div>
      </section>

      {/* Aggregate Health Grid */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-gray-100 bg-gray-50/30">
           <h3 className="text-xs font-black text-typography uppercase tracking-widest">Growth Node Schema Health</h3>
           <p className="text-[9px] font-black text-secondary/20 uppercase tracking-widest mt-1">Batch Audit of Entire URL Manifest</p>
        </div>

        <div className="overflow-x-auto">
           <table className="w-full text-left">
              <thead className="bg-gray-50/50 border-b border-gray-100">
                 <tr>
                    <th className="px-4 py-3 text-[9px] font-black uppercase tracking-widest text-secondary/40">Vocabulary Type</th>
                    <th className="px-4 py-3 text-[9px] font-black uppercase tracking-widest text-secondary/40">Nodes</th>
                    <th className="px-4 py-3 text-[9px] font-black uppercase tracking-widest text-secondary/40">Violation Cluster</th>
                    <th className="px-4 py-3 text-[9px] font-black uppercase tracking-widest text-secondary/40">Health Score</th>
                    <th className="px-4 py-3 text-[9px] font-black uppercase tracking-widest text-secondary/40 text-right">Commit</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 font-montserrat">
                {audits.map((audit) => (
                  <tr key={audit.id} className="group hover:bg-gray-50/50 transition-all">
                    <td className="px-4 py-3">
                       <div className="flex items-center space-x-4">
                          <div className={cn(
                             "w-10 h-10 rounded-lg flex items-center justify-center transition-all shadow-sm border border-gray-100",
                             audit.status === 'OPTIMAL' ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                          )}>
                             <Layers size={18} />
                          </div>
                          <div>
                             <h4 className="text-xs font-black text-typography leading-tight lowercase tracking-tight">{audit.type}</h4>
                             <p className="text-[8px] font-black text-secondary/20 uppercase tracking-widest mt-1">Vocabulary v1.4</p>
                          </div>
                       </div>
                    </td>
                    <td className="px-4 py-3">
                       <span className="text-sm font-black text-typography tracking-tighter truncate">{audit.pagesTested.toLocaleString()} Nodes</span>
                    </td>
                    <td className="px-4 py-3">
                       {audit.status === 'ERRORS' ? (
                          <div className="flex items-center space-x-2 text-rose-600">
                             <XOctagon size={14} />
                             <span className="text-[9px] font-black uppercase tracking-widest">14 Failures</span>
                          </div>
                       ) : (
                          <div className="flex items-center space-x-2 text-emerald-600">
                             <CheckCircle2 size={14} />
                             <span className="text-[9px] font-black uppercase tracking-widest">Optimal</span>
                          </div>
                       )}
                    </td>
                    <td className="px-4 py-3">
                       <div className="flex flex-col">
                          <div className="w-16 h-1 bg-gray-100 rounded-full overflow-hidden mb-1.5 shadow-inner">
                             <div 
                               className={cn("h-full transition-all duration-1000", audit.health > 90 ? "bg-emerald-500" : audit.health > 70 ? "bg-amber-500" : "bg-rose-500")}
                                style={{ width: `${audit.health}%` }}
                             />
                          </div>
                          <span className="text-[8px] font-black text-typography uppercase tracking-widest opacity-40">{audit.health}% Confidence</span>
                       </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                       <button className="px-4 py-1.5 bg-white border border-gray-100 rounded-lg text-[9px] font-black uppercase tracking-widest hover:border-primary/20 hover:text-primary transition-all shadow-sm">
                          Fix
                       </button>
                    </td>
                  </tr>
                ))}
              </tbody>
           </table>
        </div>

        <div className="p-4 border-t border-gray-100 flex items-center justify-between text-[8px] font-black text-secondary/20 uppercase tracking-widest bg-gray-50/50">
           <div className="flex items-center space-x-2">
              <Code2 size={12} className="text-primary" />
              <span>Injection Engine v3.1 Operational • 100% Core coverage</span>
           </div>
           <p>Last Audit: 42 mins ago</p>
        </div>
      </section>

      {/* Schema Components Visualizer */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
         {[
           { icon: Building2, label: "Institution Schema", stat: "34k Nodes" },
           { icon: Calendar, label: "Exam Event Data", stat: "2k Nodes" },
           { icon: MessageSquare, label: "Review Aggregate", stat: "12k Nodes" },
           { icon: Zap, label: "Search Action Hub", stat: "Global Page" }
         ].map((c, i) => (
           <div key={i} className="bg-slate-900 p-4 rounded-xl border border-white/5 text-white group hover:border-primary/20 transition-all cursor-pointer">
              <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-primary group-hover:scale-110 transition-transform mb-4">
                 <c.icon size={18} />
              </div>
              <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">{c.label}</h5>
              <p className="text-xl font-black tracking-tighter uppercase leading-none">{c.stat}</p>
           </div>
         ))}
      </div>
    </div>
  );
}
