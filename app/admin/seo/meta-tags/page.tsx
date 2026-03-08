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
    <div className="space-y-6 font-montserrat pb-10">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-4 md:space-y-0 pb-4 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-1.5">
              <div className="bg-primary/5 px-2.5 py-1 rounded-lg border border-primary/10">
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary">SEO Logic</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30 uppercase tracking-widest text-[10px]">Meta Console</span>
           </div>
           <h1 className="text-3xl font-black text-typography tracking-tighter leading-none mb-1">
             Search <span className="text-primary italic">Engine</span> Console
           </h1>
           <p className="text-secondary/40 text-[10px] font-black uppercase tracking-[0.2em] mt-1.5 leading-none">
              Managing 50,000+ Dynamic Page Metadata
           </p>
        </div>

        <div className="flex items-center space-x-3">
           <button className="flex items-center space-x-2 px-5 py-2.5 bg-gray-50 border border-gray-200/50 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:border-gray-200 transition-all active:scale-95 text-secondary/60 shadow-sm">
              <Download size={14} />
              <span>Sync</span>
           </button>
           <button className="flex items-center space-x-2 px-6 py-2.5 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20">
              <Zap size={14} />
              <span>Auto-Gen</span>
           </button>
        </div>
      </section>

      {/* SEO Pulse Strip */}
      <div className="grid grid-cols-4 gap-4">
         {[
           { label: "Indexable Pages", val: "48,291", icon: Layers, color: "primary" },
           { label: "Index Health", val: "98.4%", icon: CheckCircle2, color: "emerald" },
           { label: "Crawl Errors", val: "104", icon: AlertCircle, color: "amber" },
           { label: "Domain Auth", val: "42", icon: TrendingUp, color: "indigo" }
         ].map((stat, i) => (
           <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between group overflow-hidden relative">
              <div className={`absolute -right-4 -bottom-4 w-16 h-16 bg-${stat.color}-500/5 rounded-full group-hover:scale-150 transition-transform duration-700`} />
              <div>
                 <p className="text-[9px] font-black uppercase tracking-widest text-secondary/20 mb-1">{stat.label}</p>
                 <p className="text-xl font-black text-typography">{stat.val}</p>
              </div>
              <div className={`w-10 h-10 bg-${stat.color}-50 rounded-lg flex items-center justify-center text-${stat.color}-500 border border-${stat.color}-100 italic relative`}>
                 <stat.icon size={18} />
              </div>
           </div>
         ))}
      </div>

      {/* Meta Tag Editor */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden min-h-[500px]">
        <div className="p-3 border-b border-gray-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-gray-50/30">
           <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-1.5 bg-gray-100/50 p-1 rounded-lg border border-gray-100">
                {["Page Meta", "Breadcrumbs", "JSON-LD"].map((t) => (
                  <button key={t} className="px-5 py-1.5 rounded-md text-[9px] font-black uppercase tracking-widest hover:text-primary hover:bg-white transition-all">
                    {t}
                  </button>
                ))}
              </div>
              <div className="w-px h-6 bg-gray-200" />
              <div className="flex items-center space-x-4">
                 <button className="flex items-center space-x-1.5 text-primary text-[9px] font-black uppercase tracking-widest">
                    <Monitor size={14} />
                    <span>Desktop</span>
                 </button>
                 <button className="flex items-center space-x-1.5 text-secondary/30 hover:text-secondary transition-colors text-[9px] font-black uppercase tracking-widest">
                    <Smartphone size={14} />
                    <span>Mobile</span>
                 </button>
              </div>
           </div>
           
           <div className="relative group w-64">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary/20" />
              <input placeholder="Search URL..." className="w-full bg-white border-0 pl-9 pr-3 py-2 rounded-lg text-xs font-bold outline-none ring-1 ring-gray-100 focus:ring-primary/10 transition-all text-typography font-montserrat" />
           </div>
        </div>

        <div className="divide-y divide-gray-100">
          {loading ? [...Array(2)].map((_, i) => (
            <div key={i} className="p-4 animate-pulse bg-gray-50/50 h-[300px]" />
          )) : tags.map((tag) => (
            <div key={tag.id} className="p-4 group hover:bg-gray-50/30 transition-all grid grid-cols-12 gap-4 bg-white text-typography animate-in fade-in">
               <div className="col-span-12 lg:col-span-5 space-y-4">
                  <div className="flex items-center space-x-3">
                     <div className="bg-primary/5 px-2 py-1 rounded-lg border border-primary/10 flex items-center space-x-2">
                        <Globe size={10} className="text-primary" />
                        <span className="text-[9px] font-black uppercase tracking-widest text-primary lowercase">/{tag.page.split('/')[1]}/</span>
                     </div>
                     <ChevronRight size={10} className="text-secondary/20" />
                     <span className="text-[10px] font-bold text-secondary/30 truncate">{tag.page}</span>
                  </div>
                  
                  <div className="space-y-3">
                     <div className="space-y-1.5">
                        <div className="flex items-center justify-between px-1">
                           <label className="text-[8px] font-black uppercase tracking-widest text-secondary/20">Meta Title</label>
                           <span className={cn(
                             "text-[8px] font-black tracking-widest uppercase",
                             tag.title.length > 60 ? "text-red-500" : "text-emerald-500"
                           )}>{tag.title.length}/60</span>
                        </div>
                        <input className="w-full bg-gray-50 border-0 px-4 py-2.5 rounded-xl text-xs font-bold outline-none ring-1 ring-gray-100 focus:ring-primary/10 transition-all font-montserrat" value={tag.title} />
                     </div>

                     <div className="space-y-1.5">
                        <div className="flex items-center justify-between px-1">
                           <label className="text-[8px] font-black uppercase tracking-widest text-secondary/20">Description</label>
                           <span className={cn(
                             "text-[8px] font-black tracking-widest uppercase",
                             tag.description.length > 160 ? "text-red-500" : "text-emerald-500"
                           )}>{tag.description.length}/160</span>
                        </div>
                        <textarea rows={2} className="w-full bg-gray-50 border-0 px-4 py-2.5 rounded-xl text-xs font-bold outline-none ring-1 ring-gray-100 focus:ring-primary/10 transition-all resize-none font-montserrat" defaultValue={tag.description} />
                     </div>
                  </div>
               </div>

               <div className="col-span-12 lg:col-span-7 bg-gray-50/50 p-4 rounded-xl border border-gray-100 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-4 leading-none">
                       <Zap size={12} className="text-primary" />
                       <h4 className="text-[9px] font-black uppercase tracking-widest text-primary">Live Google Preview Node</h4>
                    </div>
                    
                    <div className="space-y-1.5 max-w-lg bg-white p-4 rounded-xl border border-gray-100 shadow-sm font-sans">
                       <div className="text-[11px] font-medium text-[#202124] leading-tight flex items-center space-x-1">
                          <span>google.com</span> <span className="text-secondary/20">•</span> <span>{tag.page}</span> <span className="text-secondary/20 invisible">▼</span>
                       </div>
                       <h3 className="text-[16px] text-[#1a0dab] leading-tight cursor-pointer hover:underline mb-0.5">{tag.title}</h3>
                       <p className="text-[11px] text-[#4d5156] leading-relaxed line-clamp-2">
                          <span className="text-secondary/40">Jul 12, 2025 — </span> {tag.description}
                       </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-6 mt-4 border-t border-gray-100 text-typography">
                     <div className="flex items-center space-x-2">
                        <button className="flex items-center space-x-1.5 px-5 py-2 bg-primary text-white text-[9px] font-black uppercase tracking-widest rounded-lg hover:scale-[1.02] active:scale-95 transition-all shadow-md shadow-primary/10">
                           <CheckCircle2 size={12} />
                           <span>Sync</span>
                        </button>
                        <button className="flex items-center space-x-1.5 px-4 py-2 bg-white border border-gray-200 text-secondary/30 text-[9px] font-black uppercase tracking-widest rounded-lg hover:text-secondary hover:bg-gray-50 transition-all">
                           <Layers size={12} />
                           <span>Clone</span>
                        </button>
                     </div>
                     <span className="text-[8px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100 shadow-sm">{tag.status}</span>
                  </div>
               </div>
            </div>
          ))}
        </div>
      </section>

      {/* Compliance Strip */}
      <section className="bg-slate-900 p-4 rounded-xl shadow-xl shadow-slate-900/10 flex items-start space-x-4">
         <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-primary mt-0.5">
            <Info size={20} />
         </div>
         <div>
            <h4 className="text-xs font-black text-white uppercase tracking-widest leading-none">Metadata Compliance Protocol</h4>
            <p className="text-[10px] font-bold text-white/40 leading-relaxed mt-2 uppercase tracking-tight">
               Populated via Llama 3.1 Inference • Global Index sync latency is 48h • Manual overrides prioritized
            </p>
         </div>
      </section>
    </div>
  );
}
