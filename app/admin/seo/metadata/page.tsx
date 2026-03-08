"use client";

import { useState } from "react";
import { 
  Globe, 
  Search, 
  Filter, 
  ChevronRight, 
  Edit3, 
  Save, 
  Smartphone, 
  Eye, 
  CheckCircle2, 
  AlertCircle,
  Undo2,
  Copy,
  Zap,
  ArrowUpRight,
  Calculator,
  Flame,
  LayoutGrid
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MetadataPage {
  id: string;
  type: 'College' | 'Exam' | 'Article' | 'City' | 'Scholarship';
  url: string;
  title: string;
  description: string;
  rank?: number;
}

export default function MetadataBulkEditor() {
  const [pages] = useState<MetadataPage[]>([
    { id: "P1", type: "College", url: "/college/iit-delhi", title: "IIT Delhi: Ranking, Fees, Placement 2026", description: "Get details on Indian Institute of Technology Delhi like ranking, fee structure, placement 2026, and direct admission processes.", rank: 3 },
    { id: "P2", type: "Exam", url: "/exam/jee-advanced", title: "JEE Advanced 2026: Registration, Admit Card, Results", description: "Complete guide for JEE Advanced 2026. Check important dates, syllabus, question papers, and cut-off for IIT admissions.", rank: 11 },
    { id: "P3", type: "City", url: "/engineering-colleges/bangalore", title: "Top Engineering Colleges in Bangalore 2026 - Fees, Reviews", description: "Discover the best engineering colleges in Bangalore for 2026. Compare fees, placement packages, and student reviews for top B.Tech colleges.", rank: 42 },
    { id: "P4", type: "Article", url: "/news/how-to-choose-btech-stream", title: "How to Choose the Right B.Tech Stream? — Expert Guide", description: "Struggling to pick between CS, IT or Mechanical? Read our comprehensive guide on how to choose the right engineering branch for your career.", rank: 104 }
  ]);

  const [editValues, setEditValues] = useState<Record<string, { title: string, desc: string }>>({});

  const handleEdit = (id: string, field: 'title' | 'desc', val: string) => {
    setEditValues(prev => {
      const current = prev[id] || { 
        title: pages.find(p => p.id === id)!.title, 
        desc: pages.find(p => p.id === id)!.description 
      };
      return {
        ...prev,
        [id]: {
          ...current,
          [field === 'title' ? 'title' : 'desc']: val
        }
      };
    });
  };

  return (
    <div className="space-y-6 font-montserrat">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-4 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-2">
              <div className="bg-primary/5 px-3 py-1.5 rounded-xl border border-primary/10">
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary italic">SERP Intelligence</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30">Programmatic Metadata Manager</span>
           </div>
           <h1 className="text-3xl md:text-3xl md:text-5xl font-black text-typography tracking-tighter leading-none mb-1">
             Bulk <span className="text-primary italic">Metadata</span>
           </h1>
           <p className="text-secondary/40 text-sm font-bold uppercase tracking-widest mt-2">
              Optimizing CTR & Indexing for 90,000+ Growth Nodes
           </p>
        </div>

        <div className="flex items-center space-x-4">
           <div className="bg-indigo-900 px-8 py-4 rounded-3xl border border-white/10 shadow-2xl flex items-center space-x-6 text-white overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/20 blur-3xl rounded-full" />
              <div>
                 <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1 italic">Average Page CTR</p>
                 <p className="text-2xl font-black tracking-tighter italic">4.2% <span className="text-emerald-500 text-[10px] font-black underline not-italic ml-2 uppercase">+0.8%</span></p>
              </div>
              <Flame size={32} className="text-orange-500 relative z-10 animate-pulse" />
           </div>
           <button className="flex items-center space-x-2 px-8 py-4 bg-primary text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20">
              <LayoutGrid size={18} />
              <span>Apply Template</span>
           </button>
        </div>
      </section>

      {/* Filters HUD */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         <div className="col-span-1 md:col-span-2 relative">
            <Search size={22} className="absolute left-6 top-1/2 -translate-y-1/2 text-secondary/20" />
            <input placeholder="Search URL slug, keywords, or college names..." className="w-full bg-white border border-gray-100 pl-16 pr-8 py-5 rounded-3xl text-[14px] font-bold outline-none focus:ring-4 focus:ring-primary/5 transition-all shadow-sm" />
         </div>
         <div className="bg-white p-2 rounded-[2rem] border border-gray-100 flex items-center space-x-2 shadow-sm">
            {['All', 'Colleges', 'Exams', 'Blogs'].map(f => (
               <button key={f} className={cn("flex-1 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all", f === 'All' ? "bg-snow-pearl text-typography" : "text-secondary/30 hover:text-typography")}>
                  {f}
               </button>
            ))}
         </div>
         <button className="bg-white border border-gray-100 rounded-3xl p-5 flex items-center justify-between text-secondary/40 hover:border-primary/20 transition-all shadow-sm">
            <div className="flex items-center space-x-3">
               <Filter size={18} />
               <span className="text-[11px] font-black uppercase tracking-widest">Advanced Segments</span>
            </div>
            <div className="w-6 h-6 bg-snow-pearl rounded-lg flex items-center justify-center text-[10px] font-black text-typography">12</div>
         </button>
      </div>

      {/* Main Metadata Grid */}
      <section className="bg-white rounded-2xl border border-gray-50 shadow-sm overflow-hidden flex flex-col">
        <div className="p-6 md:p-6 border-b border-gray-50 flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-snow-pearl/30">
           <div>
              <h3 className="text-xl font-black text-typography tracking-tighter italic lowercase underline decoration-primary/10 select-none">Live Meta Optimization</h3>
              <p className="text-[10px] font-bold text-secondary/30 uppercase tracking-[0.2em] mt-2 italic select-none">Auto-saving drafted changes • character limits enforced</p>
           </div>
           <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-6 py-3 bg-white border border-emerald-100 text-emerald-600 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-sm hover:bg-emerald-50 transition-all">
                 <Save size={16} />
                 <span>Push to Staging</span>
              </button>
           </div>
        </div>

        <div className="overflow-x-auto">
           <table className="w-full text-left">
              <thead className="bg-snow-pearl/50 border-b border-gray-100">
                 <tr>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Page Type & Vector</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40 w-[350px]">Meta Title Tag</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Description Snippet</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40 text-center">SERP Rank</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40 text-right">Commit</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {pages.map((page) => {
                  const draftTitle = editValues[page.id]?.title !== undefined ? editValues[page.id].title : page.title;
                  const draftDesc = editValues[page.id]?.desc !== undefined ? editValues[page.id].desc : page.description;
                  const isTitleLong = draftTitle.length > 60;
                  const isDescLong = draftDesc.length > 160;

                  return (
                    <tr key={page.id} className="group hover:bg-snow-pearl/30 transition-all">
                      <td className="px-10 py-4">
                         <div className="flex items-center space-x-6">
                            <div className="w-14 h-14 bg-snow-pearl rounded-2xl flex items-center justify-center text-secondary/10 group-hover:bg-primary/5 group-hover:text-primary transition-all shadow-inner">
                               <Globe size={24} />
                            </div>
                            <div className="max-w-[180px]">
                               <h4 className="text-sm font-black text-typography leading-tight uppercase tracking-tight truncate">{page.url}</h4>
                               <span className="text-[9px] font-black text-primary uppercase tracking-widest mt-1 italic italic decoration-primary/10 underline">{page.type}</span>
                            </div>
                         </div>
                      </td>
                      <td className="px-10 py-4">
                         <div className="relative group/field">
                            <textarea 
                               value={draftTitle}
                               onChange={(e) => handleEdit(page.id, 'title', e.target.value)}
                               rows={2}
                               className={cn(
                                  "w-full bg-white border p-4 rounded-xl text-[12px] font-bold outline-none transition-all resize-none shadow-sm",
                                  isTitleLong ? "border-rose-200 text-rose-600 focus:ring-rose-200" : "border-gray-100 focus:ring-primary/5 hover:border-primary/20"
                               )}
                            />
                            <div className={cn(
                               "absolute -bottom-2 right-2 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md",
                               isTitleLong ? "bg-rose-500 text-white" : "bg-snow-pearl text-secondary/30"
                            )}>
                               {draftTitle.length} / 60
                            </div>
                         </div>
                      </td>
                      <td className="px-10 py-4">
                         <div className="relative group/field">
                            <textarea 
                               value={draftDesc}
                               onChange={(e) => handleEdit(page.id, 'desc', e.target.value)}
                               rows={3}
                               className={cn(
                                  "w-full bg-white border p-4 rounded-xl text-[12px] font-bold leading-relaxed outline-none transition-all resize-none shadow-sm",
                                  isDescLong ? "border-rose-200 text-rose-600 focus:ring-rose-200" : "border-gray-100 focus:ring-primary/5 hover:border-primary/20"
                               )}
                            />
                            <div className={cn(
                               "absolute -bottom-2 right-2 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md",
                               isDescLong ? "bg-rose-500 text-white" : "bg-snow-pearl text-secondary/30"
                            )}>
                               {draftDesc.length} / 160
                            </div>
                         </div>
                      </td>
                      <td className="px-10 py-4">
                         <div className="flex flex-col items-center">
                            <span className="text-2xl font-black text-typography tracking-tighter italic">{page.rank || '-'}</span>
                            <p className="text-[8px] font-bold text-secondary/30 uppercase tracking-widest mt-1">GSC Avg.</p>
                         </div>
                      </td>
                      <td className="px-10 py-4 text-right">
                         <div className="flex items-center justify-end space-x-2">
                            <button className="p-4 bg-white border border-gray-100 rounded-2xl hover:bg-primary hover:text-white transition-all shadow-sm group/btn" title="View Preview in Mobile Mockup">
                               <Smartphone size={18} />
                            </button>
                            <button className="p-4 bg-white border border-gray-100 rounded-2xl hover:bg-emerald-500 hover:text-white transition-all shadow-sm group/btn" title="Save Draft">
                               <CheckCircle2 size={18} />
                            </button>
                         </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
           </table>
        </div>

        <div className="p-6 border-t border-gray-50 flex items-center justify-between bg-white italic relative overflow-hidden">
           <div className="absolute top-0 right-0 p-6 opacity-5">
              <Zap size={100} className="text-primary" />
           </div>
           <div className="flex items-center space-x-4 relative z-10">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-xs font-black text-secondary/40 uppercase tracking-widest leading-none">Auto-Substitution Engine v2.1 • Variables: {"{city}, {course}, {state}"} Available</p>
           </div>
           <p className="text-[10px] font-black text-secondary/20 uppercase tracking-widest relative z-10">Programmatic SEO Layer • Multi-Language Support Enabled</p>
        </div>
      </section>
    </div>
  );
}
