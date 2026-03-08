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
    <div className="space-y-6 font-montserrat pb-10">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-4 md:space-y-0 pb-4 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-1.5">
              <div className="bg-primary/5 px-2.5 py-1 rounded-lg border border-primary/10">
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary">SERP Intel</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30 uppercase tracking-widest text-[10px]">Metadata Manager</span>
           </div>
           <h1 className="text-3xl font-black text-typography tracking-tighter leading-none mb-1">
             Bulk <span className="text-primary italic">Metadata</span>
           </h1>
           <p className="text-secondary/40 text-[10px] font-black uppercase tracking-[0.2em] mt-1.5 leading-none">
              Optimizing CTR & Indexing for 90k+ Growth Nodes
           </p>
        </div>

        <div className="flex items-center space-x-3">
           <div className="bg-slate-900 px-5 py-2.5 rounded-xl border border-white/10 shadow-lg flex items-center space-x-4 text-white overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-16 h-16 bg-primary/20 blur-2xl rounded-full" />
              <div>
                 <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-0.5 leading-none">Page CTR</p>
                 <p className="text-lg font-black tracking-tighter leading-none">4.2% <span className="text-emerald-500 text-[8px] font-black ml-1 uppercase leading-none">+0.8%</span></p>
              </div>
              <Flame size={20} className="text-orange-500 relative z-10 animate-pulse" />
           </div>
           <button className="flex items-center space-x-2 px-5 py-2.5 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20">
              <LayoutGrid size={14} />
              <span>Apply Template</span>
           </button>
        </div>
      </section>

      {/* Filters HUD */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
         <div className="col-span-1 md:col-span-2 relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/30" />
            <input placeholder="Search URL slug, keywords..." className="w-full bg-white border border-gray-200 pl-11 pr-4 py-2.5 rounded-xl text-xs font-bold outline-none focus:ring-4 focus:ring-primary/5 transition-all shadow-sm" />
         </div>
         <div className="bg-white p-1 rounded-xl border border-gray-200 flex items-center space-x-1 shadow-sm">
            {['All', 'Nodes', 'Exams', 'Docs'].map(f => (
               <button key={f} className={cn("flex-1 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all", f === 'All' ? "bg-gray-100 text-typography shadow-sm" : "text-secondary/30 hover:text-typography")}>
                  {f}
               </button>
            ))}
         </div>
         <button className="bg-white border border-gray-200 rounded-xl px-4 flex items-center justify-between text-secondary/40 hover:border-primary/20 transition-all shadow-sm">
            <div className="flex items-center space-x-2">
               <Filter size={14} />
               <span className="text-[9px] font-black uppercase tracking-widest">Advanced Segments</span>
            </div>
            <div className="w-5 h-5 bg-gray-100 rounded-md flex items-center justify-center text-[9px] font-black text-typography">12</div>
         </button>
      </div>

      {/* Main Metadata Grid */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-gray-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-gray-50/30">
           <div>
              <h3 className="text-xs font-black text-typography uppercase tracking-widest">Live Meta Optimization</h3>
              <p className="text-[9px] font-black text-secondary/20 uppercase tracking-widest mt-1">Character limits enforced • Auto-saving</p>
           </div>
           <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-1.5 px-5 py-2.5 bg-white border border-emerald-100 text-emerald-600 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-sm hover:bg-emerald-50 transition-all">
                 <Save size={14} />
                 <span>Push to Staging</span>
              </button>
           </div>
        </div>

        <div className="overflow-x-auto">
           <table className="w-full text-left">
              <thead className="bg-gray-50/50 border-b border-gray-100">
                 <tr>
                    <th className="px-4 py-3 text-[9px] font-black uppercase tracking-widest text-secondary/40">Page & Vector</th>
                    <th className="px-4 py-3 text-[9px] font-black uppercase tracking-widest text-secondary/40 w-[300px]">Meta Title Tag</th>
                    <th className="px-4 py-3 text-[9px] font-black uppercase tracking-widest text-secondary/40">Description Snippet</th>
                    <th className="px-4 py-3 text-[9px] font-black uppercase tracking-widest text-secondary/40 text-center">Rank</th>
                    <th className="px-4 py-3 text-[9px] font-black uppercase tracking-widest text-secondary/40 text-right">Commit</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {pages.map((page) => {
                  const draftTitle = editValues[page.id]?.title !== undefined ? editValues[page.id].title : page.title;
                  const draftDesc = editValues[page.id]?.desc !== undefined ? editValues[page.id].desc : page.description;
                  const isTitleLong = draftTitle.length > 60;
                  const isDescLong = draftDesc.length > 160;

                  return (
                    <tr key={page.id} className="group hover:bg-gray-50/50 transition-all">
                      <td className="px-4 py-3">
                         <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-secondary/10 group-hover:bg-primary/5 group-hover:text-primary transition-all shadow-inner border border-gray-100">
                               <Globe size={18} />
                            </div>
                            <div className="max-w-[150px]">
                               <h4 className="text-[11px] font-black text-typography leading-tight lowercase truncate truncate">{page.url}</h4>
                               <span className="text-[8px] font-black text-primary uppercase tracking-widest mt-1 block opacity-70 leading-none">{page.type}</span>
                            </div>
                         </div>
                      </td>
                      <td className="px-4 py-3">
                         <div className="relative">
                            <textarea 
                               value={draftTitle}
                               onChange={(e) => handleEdit(page.id, 'title', e.target.value)}
                               rows={2}
                               className={cn(
                                  "w-full bg-white border p-3 rounded-lg text-[11px] font-bold outline-none transition-all resize-none shadow-sm",
                                  isTitleLong ? "border-rose-200 text-rose-600 focus:ring-rose-200" : "border-gray-200 focus:ring-primary/5 hover:border-gray-400"
                               )}
                            />
                            <div className={cn(
                               "absolute -bottom-1 right-2 text-[7px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded shadow-sm",
                               isTitleLong ? "bg-rose-500 text-white" : "bg-gray-100 text-secondary/40"
                            )}>
                               {draftTitle.length} / 60
                            </div>
                         </div>
                      </td>
                      <td className="px-4 py-3">
                         <div className="relative">
                            <textarea 
                               value={draftDesc}
                               onChange={(e) => handleEdit(page.id, 'desc', e.target.value)}
                               rows={2}
                               className={cn(
                                  "w-full bg-white border p-3 rounded-lg text-[11px] font-bold leading-relaxed outline-none transition-all resize-none shadow-sm",
                                  isDescLong ? "border-rose-200 text-rose-600 focus:ring-rose-200" : "border-gray-200 focus:ring-primary/5 hover:border-gray-400"
                               )}
                            />
                            <div className={cn(
                               "absolute -bottom-1 right-2 text-[7px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded shadow-sm",
                               isDescLong ? "bg-rose-500 text-white" : "bg-gray-100 text-secondary/40"
                            )}>
                               {draftDesc.length} / 160
                            </div>
                         </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                         <span className="text-xl font-black text-typography tracking-tighter leading-none">{page.rank || '-'}</span>
                         <p className="text-[7px] font-black text-secondary/20 uppercase tracking-widest mt-1">GSC Avg.</p>
                      </td>
                      <td className="px-4 py-3 text-right">
                         <div className="flex items-center justify-end space-x-1.5">
                            <button className="w-8 h-8 flex items-center justify-center bg-white border border-gray-100 rounded-lg hover:bg-primary hover:text-white transition-all shadow-sm text-secondary/30" title="Preview">
                               <Smartphone size={14} />
                            </button>
                            <button className="w-8 h-8 flex items-center justify-center bg-white border border-gray-100 rounded-lg hover:bg-emerald-500 hover:text-white transition-all shadow-sm text-secondary/30" title="Save">
                               <CheckCircle2 size={14} />
                            </button>
                         </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
           </table>
        </div>

        <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50 relative overflow-hidden">
           <div className="flex items-center space-x-3 relative z-10">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-[9px] font-black text-secondary/40 uppercase tracking-widest leading-none">Substitution Engine v2.1 • Variables: {"{city}, {course}, {state}"} Available</p>
           </div>
           <p className="text-[8px] font-black text-secondary/20 uppercase tracking-widest relative z-10">Programmatic SEO Layer • Multi-Language Support Enabled</p>
        </div>
      </section>
    </div>
  );
}
