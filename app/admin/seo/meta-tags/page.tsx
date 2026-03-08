"use client";

import { useState, useEffect } from "react";
import { 
  Search, 
  ChevronRight, 
  MoreVertical, 
  Globe, 
  Zap, 
  ArrowRight, 
  Settings, 
  CheckCircle2, 
  AlertCircle, 
  Info,
  ExternalLink,
  Edit2,
  Trash2,
  Download,
  Filter,
  Layers,
  Monitor,
  Smartphone,
  TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MetaTag {
  id: string;
  page: string;
  title: string;
  description: string;
  status: string;
}

export default function SeometaTagsPage() {
  const [tags, setTags] = useState<MetaTag[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/seo/meta-tags");
      const data = await res.json();
      setTags(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-4 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-2">
              <div className="bg-primary/5 px-3 py-1.5 rounded-xl border border-primary/10">
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary">Growth & SEO</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30">Meta Tag Intelligence</span>
           </div>
           <h1 className="text-3xl md:text-3xl md:text-5xl font-black text-typography tracking-tighter leading-none mb-1">
             Search <span className="text-primary italic">Engine</span> Console
           </h1>
           <p className="text-secondary/40 text-sm font-bold uppercase tracking-widest mt-2">
              Managing 50,000+ Dynamic Page Metadata
           </p>
        </div>

        <div className="flex items-center space-x-4">
           <button className="flex items-center space-x-2 px-6 py-4 bg-gray-50 border border-gray-200/50 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-white hover:border-gray-200 transition-all active:scale-95 text-secondary/60">
              <Download size={16} />
              <span>Sitemap Sync</span>
           </button>
           <button className="flex items-center space-x-2 px-8 py-4 bg-primary text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20">
              <Zap size={18} />
              <span>Auto-Generate Tags</span>
           </button>
        </div>
      </section>

      {/* SEO Pulse Strip */}
      <div className="grid grid-cols-4 gap-5">
         <div className="bg-white p-5 rounded-2xl border border-gray-50 shadow-sm flex items-center justify-between group overflow-hidden relative">
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-primary/5 rounded-full group-hover:scale-150 transition-transform duration-700" />
            <div>
               <p className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary/30 mb-2">Indexable Pages</p>
               <p className="text-3xl font-black text-typography">48,291</p>
            </div>
            <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary border border-primary/10 italic relative">
               <Layers size={24} />
            </div>
         </div>
         <div className="bg-white p-5 rounded-2xl border border-gray-50 shadow-sm flex items-center justify-between group overflow-hidden relative">
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-sky-50 rounded-full group-hover:scale-150 transition-transform duration-700" />
            <div>
               <p className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary/30 mb-2">Index Health</p>
               <p className="text-3xl font-black text-typography">98.4%</p>
            </div>
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 border border-emerald-100 italic relative">
               <CheckCircle2 size={24} />
            </div>
         </div>
         <div className="bg-white p-5 rounded-2xl border border-gray-50 shadow-sm flex items-center justify-between group overflow-hidden relative">
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-amber-50 rounded-full group-hover:scale-150 transition-transform duration-700" />
            <div>
               <p className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary/30 mb-2">Crawl Errors</p>
               <p className="text-3xl font-black text-typography">104</p>
            </div>
            <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500 border border-amber-100 italic relative">
               <AlertCircle size={24} />
            </div>
         </div>
         <div className="bg-white p-5 rounded-2xl border border-gray-50 shadow-sm flex items-center justify-between group overflow-hidden relative">
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-indigo-50 rounded-full group-hover:scale-150 transition-transform duration-700" />
            <div>
               <p className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary/30 mb-2">Avg Domain Auth</p>
               <p className="text-3xl font-black text-typography">42</p>
            </div>
            <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-500 border border-indigo-100 italic relative">
               <TrendingUp size={24} />
            </div>
         </div>
      </div>

      {/* Meta Tag Editor */}
      <section className="bg-white rounded-2xl border border-gray-50 shadow-sm overflow-hidden min-h-[500px]">
        <div className="p-6 md:p-6 border-b border-gray-50 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
           <div className="flex items-center space-x-10">
              <div className="flex items-center space-x-2 bg-gray-50 p-1.5 rounded-2xl border border-gray-100">
                {["Page Meta", "Breadcrumbs", "JSON-LD"].map((t) => (
                  <button key={t} className="px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:text-primary hover:bg-white transition-all">{t}</button>
                ))}
              </div>
              <div className="w-px h-8 bg-gray-100" />
              <div className="flex items-center space-x-4">
                 <button className="flex items-center space-x-2 text-primary">
                    <Monitor size={16} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Desktop Preview</span>
                 </button>
                 <button className="flex items-center space-x-2 text-secondary/30 hover:text-secondary transition-colors">
                    <Smartphone size={16} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Mobile</span>
                 </button>
              </div>
           </div>
           
           <div className="relative group w-80">
              <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-secondary/20" />
              <input placeholder="Search URL or Keyword..." className="w-full bg-gray-50 border-0 pl-14 pr-6 py-3.5 rounded-2xl text-[13px] font-bold outline-none focus:ring-4 focus:ring-primary/5 transition-all text-typography" />
           </div>
        </div>

        <div className="divide-y divide-gray-50">
          {loading ? [...Array(2)].map((_, i) => (
            <div key={i} className="p-6 animate-pulse bg-gray-50/50 h-[300px]" />
          )) : tags.map((tag) => (
            <div key={tag.id} className="p-6 group hover:bg-snow-pearl/30 transition-all grid grid-cols-12 gap-6 bg-white text-typography animate-in fade-in transition-all">
               <div className="col-span-12 lg:col-span-5 space-y-6">
                  <div className="flex items-center space-x-3">
                     <div className="bg-primary/5 px-3 py-1.5 rounded-xl border border-primary/10 flex items-center space-x-2">
                        <Globe size={12} className="text-primary" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-primary italic lowercase">/{tag.page.split('/')[1]}/</span>
                     </div>
                     <ChevronRight size={12} className="text-secondary/20" />
                     <span className="text-xs font-bold text-secondary/30 italic truncate">{tag.page}</span>
                  </div>
                  
                  <div className="space-y-4">
                     <div className="space-y-2">
                        <div className="flex items-center justify-between px-1">
                           <label className="text-[9px] font-black uppercase tracking-widest text-secondary/30">Meta Title</label>
                           <span className={cn(
                             "text-[9px] font-bold uppercase tracking-widest",
                             tag.title.length > 60 ? "text-red-500" : "text-emerald-500"
                           )}>{tag.title.length} / 60 chars</span>
                        </div>
                        <input className="w-full bg-gray-50 border-0 px-6 py-4 rounded-2xl text-[13px] font-bold outline-none focus:ring-2 focus:ring-primary/10 transition-all" value={tag.title} />
                     </div>

                     <div className="space-y-2">
                        <div className="flex items-center justify-between px-1">
                           <label className="text-[9px] font-black uppercase tracking-widest text-secondary/30">Meta Description</label>
                           <span className={cn(
                             "text-[9px] font-bold uppercase tracking-widest",
                             tag.description.length > 160 ? "text-red-500" : "text-emerald-500"
                           )}>{tag.description.length} / 160 chars</span>
                        </div>
                        <textarea rows={3} className="w-full bg-gray-50 border-0 px-6 py-4 rounded-3xl text-[13px] font-bold outline-none focus:ring-2 focus:ring-primary/10 transition-all resize-none" defaultValue={tag.description} />
                     </div>
                  </div>
               </div>

               <div className="col-span-12 lg:col-span-7 bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col justify-between italic">
                  <div>
                    <div className="flex items-center space-x-3 mb-6">
                       <Zap size={16} className="text-primary" />
                       <h4 className="text-[10px] font-black uppercase tracking-widest text-primary">Live Google Preview</h4>
                    </div>
                    
                    <div className="space-y-2 max-w-lg">
                       <div className="text-[12px] font-medium text-[#202124] leading-tight flex items-center space-x-1">
                          <span>google.com</span> <span className="text-secondary/20">•</span> <span>{tag.page}</span> <span className="text-secondary/20">▼</span>
                       </div>
                       <h3 className="text-[18px] text-[#1a0dab] leading-tight cursor-pointer hover:underline">{tag.title}</h3>
                       <p className="text-[13px] text-[#4d5156] leading-relaxed line-clamp-2">
                          <span className="text-secondary/40">Jul 12, 2025 — </span> {tag.description}
                       </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-10 border-t border-gray-100 text-typography">
                     <div className="flex items-center space-x-4">
                        <button className="flex items-center space-x-2 px-6 py-3 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:scale-105 transition-all">
                           <CheckCircle2 size={14} />
                           <span>Save & Sync</span>
                        </button>
                        <button className="flex items-center space-x-2 px-6 py-3 bg-white border border-gray-200 text-secondary/40 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-gray-100 transition-all">
                           <Layers size={14} />
                           <span>Clone to Similar</span>
                        </button>
                     </div>
                     <span className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-500 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-100 italic transition-all">{tag.status}</span>
                  </div>
               </div>
            </div>
          ))}
        </div>
      </section>

      {/* SEO Warnings */}
      <section className="bg-amber-50 p-6 rounded-2xl border border-amber-100 flex items-start space-x-6 animate-in slide-in-from-bottom transition-all">
         <Info size={24} className="text-amber-500 mt-1" />
         <div>
            <h4 className="text-sm font-black text-amber-900 uppercase tracking-widest">Metadata Compliance Protocol</h4>
            <p className="text-xs font-bold text-amber-800 leading-relaxed mt-2 italic max-w-3xl">
              Pages with missing meta descriptions are automatically populated using Llama 3.1. Manual overrides should be limited to high-traffic landing pages. SEO rankings will be recalculated within 48 hours of any changes.
            </p>
         </div>
      </section>
    </div>
  );
}
