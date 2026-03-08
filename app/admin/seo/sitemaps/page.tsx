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
    <div className="space-y-10">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-6 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-2">
              <div className="bg-primary/5 px-3 py-1.5 rounded-xl border border-primary/10">
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary italic lowercase underline decoration-primary/10">Bot Discovery Control</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30">Programmatic Sitemap Manager</span>
           </div>
           <h1 className="text-3xl md:text-3xl md:text-5xl font-black text-typography tracking-tighter leading-none mb-1">
             Sitemap <span className="text-primary italic">Engine</span>
           </h1>
           <p className="text-secondary/40 text-sm font-bold uppercase tracking-widest mt-2">
              Managing XML Indices & Submission Pings for 90,000+ Multi-Node URLs
           </p>
        </div>

        <div className="flex items-center space-x-4">
           <button className="flex items-center space-x-2 px-8 py-4 bg-primary text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20">
              <RefreshCw size={18} />
              <span>Full Manifest Regen</span>
           </button>
        </div>
      </section>

      {/* Analytics Hud */}
      <div className="grid grid-cols-4 gap-8">
         {[
           { label: "Total XML URLs", value: "90,446", sub: "Indexed by Search Engines", icon: Globe, color: "text-primary" },
           { label: "Sitemap Index Size", value: "18.4 MB", sub: "Cloudflare R2 Egress", icon: Database, color: "text-indigo-500" },
           { label: "Submission Health", value: "Optimal", sub: "Last Ping Success", icon: CheckCircle2, color: "text-emerald-500" },
           { label: "Crawl Budget Yield", value: "92.4%", sub: "High Efficiency", icon: Zap, color: "text-amber-500" }
         ].map((s, i) => (
           <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-50 shadow-sm relative group hover:border-primary/20 transition-all cursor-pointer overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform">
                 <s.icon size={48} className={s.color} />
              </div>
              <p className="text-4xl font-black text-typography tracking-tighter capitalize leading-none mb-1">{s.value}</p>
              <p className="text-[10px] font-bold text-secondary/30 uppercase tracking-widest italic">{s.label}</p>
              <span className="inline-block mt-4 text-[9px] font-black text-primary uppercase italic">{s.sub}</span>
           </div>
         ))}
      </div>

      {/* Sitemaps List */}
      <section className="bg-white rounded-[3rem] border border-gray-50 shadow-sm overflow-hidden flex flex-col">
        <div className="p-6 md:p-10 border-b border-gray-50 flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-snow-pearl/30">
           <div>
              <h3 className="text-xl font-black text-typography tracking-tighter italic lowercase underline decoration-primary/10 capitalize">Active Sitemap Manifests</h3>
              <p className="text-[10px] font-bold text-secondary/30 uppercase tracking-[0.2em] mt-2 italic capitalize">Partitioned indices for rapid search engine discovery</p>
           </div>
           <div className="flex items-center space-x-4">
              <button className="px-6 py-3 bg-white border border-indigo-100 text-indigo-600 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-sm hover:bg-indigo-50 transition-all flex items-center space-x-2">
                 <Send size={16} />
                 <span>Ping GSC & Bing</span>
              </button>
           </div>
        </div>

        <div className="overflow-x-auto">
           <table className="w-full text-left">
              <thead className="bg-snow-pearl/50 border-b border-gray-100">
                 <tr>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">XML Manifest Identity</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">URL Count</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Footprint</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Regeneration Cadence</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40 text-center">Submission Status</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40 text-right">Interrupt</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 italic">
                {sitemaps.map((map) => (
                  <tr key={map.id} className="group hover:bg-snow-pearl/30 transition-all">
                    <td className="px-10 py-8">
                       <div className="flex items-center space-x-6">
                          <div className="w-14 h-14 bg-snow-pearl rounded-2xl flex items-center justify-center text-secondary/10 group-hover:bg-primary/5 group-hover:text-primary transition-all shadow-inner relative">
                             <FileText size={24} />
                             {map.status === 'SUBMITTED' && <div className="absolute top-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white shadow-sm" />}
                          </div>
                          <div>
                             <h4 className="text-base font-black text-typography leading-tight lowercase underline decoration-secondary/10 tracking-tight">{map.name}</h4>
                             <button className="flex items-center space-x-1 text-[9px] font-black text-primary uppercase tracking-widest mt-1 hover:underline">
                                <ExternalLink size={10} />
                                <span>Inspect XML Live</span>
                             </button>
                          </div>
                       </div>
                    </td>
                    <td className="px-10 py-8">
                       <span className="text-[15px] font-black text-typography tracking-tighter">{map.urls.toLocaleString()} <span className="text-[10px] text-secondary/30 not-italic uppercase tracking-widest ml-1 italic">Nodes</span></span>
                    </td>
                    <td className="px-10 py-8">
                       <span className="text-[13px] font-black text-secondary/40 uppercase">{map.size}</span>
                    </td>
                    <td className="px-10 py-8">
                       <div className="flex items-center space-x-2 text-[12px] font-bold text-typography italic">
                          <Clock size={14} className="text-secondary/20" />
                          <span>{map.lastGenerated}</span>
                       </div>
                    </td>
                    <td className="px-10 py-8 text-center">
                       <span className={cn(
                          "px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border italic",
                          map.status === 'SUBMITTED' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                          map.status === 'ERROR' ? "bg-rose-50 text-rose-600 border-rose-100" : "bg-gray-50 text-gray-500 border-gray-100"
                       )}>
                          {map.status}
                       </span>
                    </td>
                    <td className="px-10 py-8 text-right">
                       <div className="flex items-center justify-end space-x-2">
                          <button className="p-4 bg-white border border-gray-100 rounded-2xl hover:bg-primary hover:text-white transition-all shadow-sm group/btn" title="Force Regenerate">
                             <RefreshCw size={18} />
                          </button>
                          <button className="p-4 bg-white border border-gray-100 rounded-2xl hover:bg-rose-500 hover:text-white transition-all shadow-sm group/btn" title="Exclude from Index">
                             <Trash2 size={18} />
                          </button>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
           </table>
        </div>

        <div className="p-10 border-t border-gray-50 italic bg-slate-900 text-white flex items-center justify-between relative overflow-hidden group">
           <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent group-hover:scale-150 transition-transform duration-1000" />
           <div className="flex items-center space-x-6 relative z-10">
              <Zap size={24} className="text-primary animate-pulse" />
              <div>
                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Global Robots.txt Policy</p>
                 <p className="text-sm font-black tracking-tight italic">User-agent: * • Disallow: /admin/ • Allow: /blog/ • Sitemap Index Optimized</p>
              </div>
           </div>
           <button className="px-8 py-3 bg-white text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-primary/10 relative z-10">
              Manage Exclusion List
           </button>
        </div>
      </section>
    </div>
  );
}
