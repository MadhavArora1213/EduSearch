"use client";

import { useState } from "react";
import { 
  FileSearch, 
  Search, 
  Filter, 
  ChevronRight, 
  RefreshCw, 
  Globe, 
  Zap, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  Clock, 
  FileText, 
  Trash2,
  Send,
  Plus,
  ArrowUpRight,
  Database
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SitemapFile {
  id: string;
  name: string;
  urls: number;
  size: string;
  lastGenerated: string;
  status: 'PENDING' | 'SUBMITTED' | 'ERROR';
}

export default function SitemapManager() {
  const [sitemaps] = useState<SitemapFile[]>([
    { id: "S1", name: "sitemap-colleges.xml", urls: 34204, size: "4.2 MB", lastGenerated: "14 mins ago", status: 'SUBMITTED' },
    { id: "S2", name: "sitemap-exams.xml", urls: 2102, size: "240 KB", lastGenerated: "2 hours ago", status: 'SUBMITTED' },
    { id: "S3", name: "sitemap-articles.xml", urls: 42100, size: "12.8 MB", lastGenerated: "Daily at 04:00 AM", status: 'SUBMITTED' },
    { id: "S4", name: "sitemap-cities.xml", urls: 12040, size: "1.2 MB", lastGenerated: "Pending Trigger", status: 'PENDING' },
  ]);

  return (
    <div className="space-y-6 font-montserrat pb-10">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-4 md:space-y-0 pb-4 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-1.5">
              <div className="bg-primary/5 px-2.5 py-1 rounded-lg border border-primary/10">
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary">Discovery Ops</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30 uppercase tracking-widest text-[10px]">Index Controller</span>
           </div>
           <h1 className="text-3xl font-black text-typography tracking-tighter leading-none mb-1">
             Sitemap <span className="text-primary italic">Engine</span>
           </h1>
           <p className="text-secondary/40 text-[10px] font-black uppercase tracking-[0.2em] mt-1.5 leading-none">
              Managing XML Indices & Submission Pings for 90k+ URLs
           </p>
        </div>

        <div className="flex items-center space-x-3">
           <button className="flex items-center space-x-2 px-6 py-2.5 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20">
              <RefreshCw size={14} />
              <span>Full Manifest Regen</span>
           </button>
        </div>
      </section>

      {/* Analytics Hud */}
      <div className="grid grid-cols-4 gap-4">
         {[
           { label: "Total XML URLs", value: "90,446", sub: "Indexed", icon: Globe, color: "text-primary" },
           { label: "Index Size", value: "18.4 MB", sub: "Storage", icon: Database, color: "text-indigo-500" },
           { label: "Submission", value: "Optimal", sub: "Health", icon: CheckCircle2, color: "text-emerald-500" },
           { label: "Budget Yield", value: "92.4%", sub: "Efficiency", icon: Zap, color: "text-amber-500" }
         ].map((s, i) => (
           <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm relative group hover:shadow-md transition-all cursor-pointer overflow-hidden">
              <div className="absolute -top-1 -right-1 p-2 opacity-5 group-hover:scale-110 transition-transform">
                 <s.icon size={40} className={s.color} />
              </div>
              <p className="text-3xl font-black text-typography tracking-tighter leading-none mb-1.5">{s.value}</p>
              <p className="text-[9px] font-black text-secondary/30 uppercase tracking-widest leading-none mb-4">{s.label}</p>
              <div className="flex items-center space-x-1">
                 <div className="w-1 h-1 rounded-full bg-primary/40" />
                 <span className="text-[8px] font-black text-primary uppercase tracking-widest leading-none">{s.sub} Node</span>
              </div>
           </div>
         ))}
      </div>

      {/* Sitemaps List */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-gray-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-gray-50/30">
           <div>
              <h3 className="text-xs font-black text-typography uppercase tracking-widest">Active Sitemap Manifests</h3>
              <p className="text-[9px] font-black text-secondary/20 uppercase tracking-widest mt-1">Partitioned indices for rapid discovery</p>
           </div>
           <div className="flex items-center space-x-3">
              <button className="px-5 py-2.5 bg-white border border-indigo-100 text-indigo-600 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-sm hover:bg-indigo-50 transition-all flex items-center space-x-1.5">
                 <Send size={14} />
                 <span>Ping GSC & Bing</span>
              </button>
           </div>
        </div>

        <div className="overflow-x-auto">
           <table className="w-full text-left">
              <thead className="bg-gray-50/50 border-b border-gray-100">
                 <tr>
                    <th className="px-4 py-3 text-[9px] font-black uppercase tracking-widest text-secondary/40">Manifest Identity</th>
                    <th className="px-4 py-3 text-[9px] font-black uppercase tracking-widest text-secondary/40">Nodes</th>
                    <th className="px-4 py-3 text-[9px] font-black uppercase tracking-widest text-secondary/40">Footprint</th>
                    <th className="px-4 py-3 text-[9px] font-black uppercase tracking-widest text-secondary/40">Cadence</th>
                    <th className="px-4 py-3 text-[9px] font-black uppercase tracking-widest text-secondary/40 text-center">Status</th>
                    <th className="px-4 py-3 text-[9px] font-black uppercase tracking-widest text-secondary/40 text-right">Interrupt</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 font-montserrat">
                {sitemaps.map((map) => (
                  <tr key={map.id} className="group hover:bg-gray-50/50 transition-all">
                    <td className="px-4 py-3">
                       <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-secondary/10 group-hover:bg-primary/5 group-hover:text-primary transition-all shadow-inner relative border border-gray-100">
                             <FileText size={18} />
                             {map.status === 'SUBMITTED' && <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white shadow-sm" />}
                          </div>
                          <div>
                             <h4 className="text-xs font-black text-typography leading-tight lowercase tracking-tight">{map.name}</h4>
                             <button className="flex items-center space-x-1 text-[8px] font-black text-primary uppercase tracking-widest mt-1 hover:underline">
                                <ExternalLink size={10} />
                                <span>Inspect Node</span>
                             </button>
                          </div>
                       </div>
                    </td>
                    <td className="px-4 py-3">
                       <span className="text-sm font-black text-typography tracking-tighter leading-none">{map.urls.toLocaleString()} <span className="text-[8px] text-secondary/20 uppercase tracking-widest ml-1 font-black">Entries</span></span>
                    </td>
                    <td className="px-4 py-3">
                       <span className="text-[10px] font-black text-secondary/40 uppercase tracking-widest">{map.size}</span>
                    </td>
                    <td className="px-4 py-3">
                       <div className="flex items-center space-x-2 text-[10px] font-black text-typography">
                          <Clock size={12} className="text-secondary/20" />
                          <span>{map.lastGenerated}</span>
                       </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                       <span className={cn(
                          "px-2.5 py-1 rounded-md text-[8px] font-black uppercase tracking-widest border shadow-sm",
                          map.status === 'SUBMITTED' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                          map.status === 'ERROR' ? "bg-rose-50 text-rose-600 border-rose-100" : "bg-gray-50 text-gray-500 border-gray-100"
                       )}>
                          {map.status}
                       </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                       <div className="flex items-center justify-end space-x-1.5">
                          <button className="w-8 h-8 bg-white border border-gray-100 rounded-lg hover:bg-primary hover:text-white transition-all shadow-sm flex items-center justify-center text-secondary/30" title="Regen">
                             <RefreshCw size={14} />
                          </button>
                          <button className="w-8 h-8 bg-white border border-gray-100 rounded-lg hover:bg-red-500 hover:text-white transition-all shadow-sm flex items-center justify-center text-secondary/30" title="Exclude">
                             <Trash2 size={14} />
                          </button>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
           </table>
        </div>

        <div className="p-4 border-t border-gray-100 bg-slate-900 text-white flex items-center justify-between relative overflow-hidden group">
           <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent group-hover:scale-150 transition-transform duration-1000" />
           <div className="flex items-center space-x-5 relative z-10">
              <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-primary">
                 <Zap size={20} className="animate-pulse" />
              </div>
              <div>
                 <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Global Robots.txt Protocol</p>
                 <p className="text-[11px] font-black tracking-widest uppercase opacity-80">User-agent: * • Disallow: /admin/ • Allow: /blog/</p>
              </div>
           </div>
           <button className="px-6 py-2.5 bg-white text-slate-900 rounded-xl text-[9px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-primary/10 relative z-10">
              Manage Exclusion Matrix
           </button>
        </div>
      </section>
    </div>
  );
}
