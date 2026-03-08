"use client";

import { useState } from "react";
import { 
  FileText, 
  Search, 
  Filter, 
  ChevronRight, 
  ArrowUpRight, 
  ExternalLink, 
  Flame, 
  Snowflake, 
  MousePointer2, 
  Eye, 
  Zap, 
  LayoutGrid,
  Clock,
  ArrowDownRight,
  TrendingUp,
  AlertCircle,
  LucideIcon
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ContentPage {
  id: string;
  url: string;
  type: 'College' | 'Exam' | 'Article';
  pageviews: number;
  avgDuration: string;
  bounceRate: number;
  conversion: number;
  status: 'HOT' | 'COLD' | 'STABLE';
}

const contentData: ContentPage[] = [
  { id: "C1", url: "/college/iit-madras", type: "College", pageviews: 24500, avgDuration: "5:42", bounceRate: 22, conversion: 8.4, status: 'HOT' },
  { id: "C2", url: "/exam/jee-advanced-2026", type: "Exam", pageviews: 18200, avgDuration: "3:12", bounceRate: 48, conversion: 2.1, status: 'COLD' },
  { id: "C3", url: "/news/best-cs-colleges-india", type: "Article", pageviews: 12100, avgDuration: "4:05", bounceRate: 35, conversion: 4.8, status: 'STABLE' },
  { id: "C4", url: "/engineering-colleges/bangalore", type: "College", pageviews: 9400, avgDuration: "6:15", bounceRate: 18, conversion: 9.1, status: 'HOT' },
];

export default function ContentPerformancePage() {
  const [activeTab, setActiveTab] = useState<'TOP' | 'UNDER' | 'GAP'>('TOP');

  return (
    <div className="space-y-6 font-montserrat">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-4 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-2">
              <div className="bg-primary/5 px-3 py-1.5 rounded-xl border border-primary/10">
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary italic lowercase underline decoration-primary/10">Editorial Intelligence</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30">Node Yield Analysis</span>
           </div>
           <h1 className="text-3xl md:text-3xl md:text-5xl font-black text-typography tracking-tighter leading-none mb-1">
             Content <span className="text-primary italic">Performance</span>
           </h1>
           <p className="text-secondary/40 text-sm font-bold uppercase tracking-widest mt-2">
              Auditing 90,000+ Programmatic Growth Nodes for Conversion ROI
           </p>
        </div>

        <div className="flex items-center space-x-4">
           <div className="flex items-center space-x-2 bg-white p-1.5 rounded-2xl border border-gray-100 shadow-sm">
              {[
                { id: 'TOP', label: 'Top Performers', icon: Flame },
                { id: 'UNDER', label: 'Leakage Nodes', icon: Snowflake },
                { id: 'GAP', label: 'Content Gaps', icon: Search }
              ].map(t => (
                <button 
                  key={t.id}
                  onClick={() => setActiveTab(t.id as any)}
                  className={cn(
                    "flex items-center space-x-2 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                    activeTab === t.id ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-secondary/30 hover:text-secondary"
                  )}
                >
                  <t.icon size={14} />
                  <span>{t.label}</span>
                </button>
              ))}
           </div>
        </div>
      </section>

      {/* Analytics Matrix */}
      <section className="bg-white rounded-2xl border border-gray-50 shadow-sm overflow-hidden flex flex-col">
         <div className="p-6 md:p-6 border-b border-gray-50 flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-snow-pearl/30 border-gray-100">
            <div className="relative flex-1 max-w-xl">
               <Search size={22} className="absolute left-6 top-1/2 -translate-y-1/2 text-secondary/20" />
               <input placeholder="Search slug, node type or intent..." className="w-full bg-white border-0 pl-16 pr-8 py-5 rounded-3xl text-[14px] font-bold outline-none focus:ring-4 focus:ring-primary/5 transition-all shadow-inner" />
            </div>
            <div className="flex items-center space-x-4 pl-10">
               <button className="p-5 bg-white border border-gray-100 rounded-2xl text-secondary/20 hover:text-primary transition-all shadow-sm"><Filter size={20} /></button>
               <button className="px-10 py-5 bg-slate-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-primary transition-all shadow-xl shadow-slate-900/10">Optimize Templates</button>
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead className="bg-snow-pearl/50 border-b border-gray-100">
                  <tr>
                     <th className="px-10 py-4 text-[10px] font-black uppercase tracking-widest text-secondary/40 italic">Growth Node Vector</th>
                     <th className="px-10 py-4 text-[10px] font-black uppercase tracking-widest text-secondary/40 text-center">Pageviews</th>
                     <th className="px-10 py-4 text-[10px] font-black uppercase tracking-widest text-secondary/40 text-center">Dwell Time</th>
                     <th className="px-10 py-4 text-[10px] font-black uppercase tracking-widest text-secondary/40 text-center">Bounce Rate</th>
                     <th className="px-10 py-4 text-[10px] font-black uppercase tracking-widest text-secondary/40 text-center">Lead CV%</th>
                     <th className="px-10 py-4 text-[10px] font-black uppercase tracking-widest text-secondary/40 text-right">Commit</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-50">
                  {contentData.map((page) => (
                    <tr key={page.id} className="group hover:bg-snow-pearl/30 transition-all">
                       <td className="px-10 py-10">
                          <div className="flex items-center space-x-6">
                             <div className={cn(
                               "w-14 h-14 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 shadow-inner",
                               page.status === 'HOT' ? "bg-rose-50 text-rose-500" : page.status === 'COLD' ? "bg-sky-50 text-sky-500" : "bg-snow-pearl text-secondary/20"
                             )}>
                                <FileText size={24} />
                             </div>
                             <div>
                                <h4 className="text-[14px] font-black text-typography leading-tight uppercase transition-colors group-hover:text-primary flex items-center space-x-2">
                                   <span>{page.url}</span>
                                   <ExternalLink size={12} className="flex items-center space-x-2" />
                                </h4>
                                <div className="flex items-center space-x-3 text-[9px] font-bold text-secondary/20 uppercase tracking-widest mt-1 italic decoration-primary/10 underline">
                                   <span>{page.type} Node</span>
                                   <div className="w-1 h-1 bg-secondary/10 rounded-full" />
                                   <span>Status: {page.status}</span>
                                </div>
                             </div>
                          </div>
                       </td>
                       <td className="px-10 py-10 text-center">
                          <p className="text-xl font-black text-typography italic tracking-tighter">{(page.pageviews / 1000).toFixed(1)}K</p>
                          <p className="text-[8px] font-bold text-secondary/20 uppercase tracking-widest">Monthly</p>
                       </td>
                       <td className="px-10 py-10 text-center">
                          <p className="text-xl font-black text-typography italic tracking-tighter">{page.avgDuration}</p>
                          <p className="text-[8px] font-bold text-secondary/20 uppercase tracking-widest">Avg Session</p>
                       </td>
                       <td className="px-10 py-10 text-center">
                          <div className="space-y-1">
                             <p className={cn("text-xl font-black italic tracking-tighter", page.bounceRate > 40 ? "text-rose-500" : "text-emerald-500")}>{page.bounceRate}%</p>
                             <div className="w-12 h-1 bg-snow-pearl rounded-full mx-auto overflow-hidden">
                                <div className={cn("h-full transition-all duration-1000", page.bounceRate > 40 ? "bg-rose-500" : "bg-emerald-500")} style={{ width: `${page.bounceRate}%` }} />
                             </div>
                          </div>
                       </td>
                       <td className="px-10 py-10 text-center">
                          <div className="bg-primary/5 px-4 py-2 rounded-2xl border border-primary/10 inline-block">
                             <p className="text-[13px] font-black text-primary italic">{page.conversion}%</p>
                          </div>
                       </td>
                       <td className="px-10 py-10 text-right">
                          <button className="p-4 bg-white border border-gray-100 rounded-2xl hover:bg-primary transition-all shadow-sm group/btn hover:text-white">
                             <Zap size={18} />
                          </button>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>

         <div className="p-6 border-t border-gray-50 flex items-center justify-between bg-white relative overflow-hidden italic">
            <div className="absolute top-0 right-0 p-6 opacity-5">
               <TrendingUp size={100} className="text-emerald-500" />
            </div>
            <div className="flex items-center space-x-6 relative z-10">
               <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center italic">
                  <Flame size={22} className="animate-pulse" />
               </div>
               <p className="text-xs font-bold text-secondary/40 leading-relaxed uppercase tracking-widest italic lowercase decoration-emerald-500/20 underline">
                  Highest Conversion Node: <span className="text-emerald-600 font-black">/engineering-colleges/bangalore</span> (9.1% CV) • High Dwell Time (6m 15s)
               </p>
            </div>
            <p className="text-[9px] font-black text-secondary/20 uppercase tracking-widest relative z-10">Last Data Refresh: 2h ago via Umami Node Wrapper</p>
         </div>
      </section>

      {/* Content Gap Finder Hub */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 font-montserrat italic not-italic">
         <div className="bg-slate-900 p-12 rounded-[3.5rem] text-white flex flex-col justify-between group overflow-hidden relative">
            <div className="absolute inset-0 bg-primary/10 flex items-center space-x-2 duration-1000" />
            <div className="relative z-10">
               <h4 className="text-lg font-black text-slate-500 uppercase tracking-widest mb-6 italic underline decoration-primary/30">Ghost Intent Detection</h4>
               <div className="space-y-6">
                  {[
                    { query: "B.Tech fees in BIT Mesra direct", bounce: 94, duration: "12s" },
                    { query: "Scholarships for SC students abroad", bounce: 88, duration: "24s" },
                    { query: "Admission without JEE in IITs", bounce: 92, duration: "08s" },
                  ].map((q, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-all cursor-pointer group/q">
                       <div>
                          <p className="text-[13px] font-black text-white italic tracking-tight uppercase underline decoration-primary/20">{q.query}</p>
                          <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mt-1">Bounce: {q.bounce}% • Duration: {q.duration}</p>
                       </div>
                       <ArrowUpRight size={18} className="text-slate-600 group-hover/q:text-primary transition-colors" />
                    </div>
                  ))}
               </div>
            </div>
            <div className="mt-14 relative z-10">
               <button className="w-full py-5 bg-white text-slate-900 rounded-3xl text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] transition-all shadow-xl shadow-primary/20 italic">
                  Brief New Content Cluster
               </button>
            </div>
         </div>

         <div className="bg-white p-12 rounded-[3.5rem] border border-gray-100 shadow-sm flex flex-col justify-between group overflow-hidden relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-50/50 via-transparent to-transparent pointer-events-none" />
            <div className="relative z-10">
               <h4 className="text-lg font-black text-secondary/20 uppercase tracking-widest mb-6 italic underline decoration-indigo-500/10 italic">Template Efficiency Analysis</h4>
               <div className="space-y-8">
                  <div className="flex items-start justify-between">
                     <div className="flex items-center space-x-6">
                        <div className="w-14 h-14 bg-indigo-50 text-indigo-500 rounded-[1.5rem] flex items-center justify-center shadow-inner">
                           <LayoutGrid size={24} />
                        </div>
                        <div>
                           <p className="text-sm font-black text-typography uppercase italic">Tabbed Profile v4</p>
                           <p className="text-[9px] font-bold text-secondary/30 uppercase tracking-widest mt-1 italic decoration-indigo-500/10 underline">Active on 42,000+ College Pages</p>
                        </div>
                     </div>
                     <div className="text-right">
                        <p className="text-2xl font-black text-indigo-500 italic tracking-tighter">+12.4%</p>
                        <p className="text-[8px] font-bold text-secondary/20 uppercase tracking-widest">Dwell Lift</p>
                     </div>
                  </div>
                  
                  <div className="flex items-start justify-between">
                     <div className="flex items-center space-x-6">
                        <div className="w-14 h-14 bg-snow-pearl text-secondary/20 rounded-[1.5rem] flex items-center justify-center">
                           <FileText size={24} />
                        </div>
                        <div>
                           <p className="text-sm font-black text-typography uppercase italic">Single-Page Stream</p>
                           <p className="text-[9px] font-bold text-secondary/30 uppercase tracking-widest mt-1 italic">Active on Exam Hubs</p>
                        </div>
                     </div>
                     <div className="text-right">
                        <p className="text-2xl font-black text-rose-500 italic tracking-tighter">-4.2%</p>
                        <p className="text-[8px] font-bold text-secondary/20 uppercase tracking-widest">Leads Shift</p>
                     </div>
                  </div>
               </div>
            </div>
            <div className="mt-14 relative z-10">
               <button className="w-full py-5 bg-indigo-500 text-white rounded-3xl text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] transition-all shadow-xl shadow-indigo-500/20 flex items-center justify-center space-x-3 italic">
                  <Zap size={16} />
                  <span>Execute Global Refactor</span>
               </button>
            </div>
         </div>
      </section>
    </div>
  );
}

