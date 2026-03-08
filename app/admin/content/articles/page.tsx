"use client";

import { useState, useEffect } from "react";
import { 
  FileText, 
  ChevronRight, 
  Search, 
  Plus, 
  Calendar, 
  Clock, 
  Eye, 
  Edit2, 
  Trash2, 
  MoreVertical, 
  Download, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  BookOpen,
  Newspaper,
  Target,
  Share2,
  TrendingUp,
  LayoutGrid,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Article {
  id: string;
  title: string;
  author: string;
  status: string;
  date: string;
  views: string;
  category: string;
}

export default function ContentEditorPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/content/articles");
      const data = await res.json();
      setArticles(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12 pb-20 font-montserrat italic">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-6 border-b border-gray-100 italic transition-all">
        <div>
           <div className="flex items-center space-x-3 mb-2">
              <div className="bg-primary/5 px-3 py-1.5 rounded-xl border border-primary/10">
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary italic lowercase">Knowledge Economy</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30">Editorial Lifecycle Control</span>
           </div>
           <h1 className="text-3xl md:text-3xl md:text-5xl font-black text-typography tracking-tighter leading-none mb-1">
             Content <span className="text-primary italic italic">Velocitor</span>
           </h1>
           <p className="text-secondary/40 text-sm font-bold uppercase tracking-widest mt-2 overflow-hidden text-ellipsis whitespace-nowrap">
              Managing 5,000+ Career Articles & Real-time Exam News
           </p>
        </div>

        <div className="flex items-center space-x-4">
           <div className="bg-emerald-50 px-8 py-4 rounded-3xl border border-emerald-100 flex items-center space-x-4 group animate-in slide-in-from-right transition-all">
              <div className="w-10 h-10 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                 <TrendingUp size={18} />
              </div>
              <div>
                 <p className="text-[9px] font-black uppercase tracking-widest text-emerald-800 italic">Reading Lift</p>
                 <p className="text-xl font-black text-emerald-900">+4.2M views</p>
              </div>
           </div>
           <button className="flex items-center space-x-3 px-10 py-5 bg-primary text-white rounded-3xl text-[11px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20">
              <Plus size={18} />
              <span>Compose Article</span>
           </button>
        </div>
      </section>

      {/* Content Analytics Strip */}
      <div className="grid grid-cols-4 gap-8">
         {[
           { label: "Total Articles (Live)", value: "5,420", sub: "128 Published this Month", icon: BookOpen, color: "text-primary" },
           { label: "Scheduled Protocol", value: "42", sub: "Next Release: 2h ago", icon: Clock, color: "text-sky-500" },
           { label: "Draft Index", value: "194", sub: "Awaiting Final Audit", icon: FileText, color: "text-amber-500" },
           { label: "Average Read Score", value: "9.2/10", sub: "+0.4 Sentiment Lift", icon: Target, color: "text-emerald-500" }
         ].map((s, i) => (
           <div key={i} className="bg-white p-10 rounded-[3rem] border border-gray-50 shadow-sm group hover:border-primary/20 transition-all overflow-hidden relative italic">
              <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-secondary/20 group-hover:text-primary transition-all group-hover:bg-primary/5 mb-6">
                 <s.icon size={22} />
              </div>
              <p className="text-3xl font-black text-typography mb-1 uppercase tracking-tighter">{s.value}</p>
              <p className="text-[10px] font-bold text-secondary/40 uppercase tracking-widest">{s.label}</p>
           </div>
         ))}
      </div>

      {/* Article Listing Console */}
      <section className="bg-white rounded-[4rem] border border-gray-50 shadow-sm overflow-hidden min-h-[600px] mb-20 animate-in fade-in transition-all italic">
         <div className="p-6 md:p-10 border-b border-gray-50 flex flex-col lg:flex-row lg:items-center justify-between gap-6 italic bg-snow-pearl/30">
            <div className="flex items-center space-x-10">
               <div className="flex items-center space-x-2 bg-gray-50 p-1.5 rounded-2xl border border-gray-100">
                 {["All Content", "Published", "Scheduled", "Drafts"].map((t) => (
                   <button key={t} className={cn(
                     "px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap",
                     t === "All Content" ? "bg-white text-primary shadow-sm shadow-black/5" : "text-secondary/30 hover:text-secondary"
                   )}>{t}</button>
                 ))}
               </div>
            </div>
            
            <div className="flex items-center space-x-6">
               <div className="relative group w-80">
                  <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-secondary/20 group-focus-within:text-primary transition-colors" />
                  <input placeholder="Search Headlines, Authors..." className="w-full bg-gray-50 border-0 pl-14 pr-6 py-4 rounded-2xl text-[13px] font-bold outline-none focus:ring-4 focus:ring-primary/5 transition-all text-typography italic" />
               </div>
               <button className="p-4 bg-gray-50 rounded-2xl border border-gray-100 text-secondary/40 hover:text-primary transition-all">
                  <Filter size={18} />
               </button>
            </div>
         </div>

         <div className="divide-y divide-gray-50 font-black italic">
           {loading ? [...Array(4)].map((_, i) => (
             <div key={i} className="p-10 animate-pulse h-28 bg-gray-50/50" />
           )) : articles.map((article) => (
             <div key={article.id} className="p-10 group hover:bg-gray-50/50 transition-all grid grid-cols-12 gap-10 text-typography animate-in slide-in-from-bottom transition-all">
                <div className="col-span-12 lg:col-span-8 flex items-center space-x-10 overflow-hidden text-ellipsis whitespace-nowrap">
                   <div className="w-16 h-16 bg-white border border-gray-100 rounded-2xl flex-shrink-0 flex items-center justify-center text-secondary/10 group-hover:text-primary group-hover:bg-primary/5 group-hover:border-primary/20 transition-all rotate-2 group-hover:rotate-0 shadow-sm">
                      <Newspaper size={28} />
                   </div>
                   
                   <div className="space-y-2 overflow-hidden text-ellipsis whitespace-nowrap">
                      <div className="flex items-center space-x-3 mb-1 overflow-hidden text-ellipsis whitespace-nowrap italic">
                         <span className="px-2 py-0.5 bg-sky-50 text-sky-600 text-[9px] font-black rounded-md border border-sky-100 italic uppercase truncate">/{article.category}/</span>
                         <span className="text-[10px] font-bold text-secondary/20 uppercase tracking-widest italic truncate">{article.author}</span>
                      </div>
                      <h4 className="text-lg font-black text-typography uppercase tracking-tighter leading-tight group-hover:text-primary transition-colors italic line-clamp-1">{article.title}</h4>
                   </div>
                </div>

                <div className="col-span-12 lg:col-span-4 flex items-center justify-between space-x-6 overflow-hidden text-ellipsis whitespace-nowrap">
                   <div className="flex items-center space-x-12">
                      <div className="text-right">
                         <p className="text-[11px] font-black text-typography italic">{article.date}</p>
                         <p className="text-[9px] font-black text-secondary/30 uppercase tracking-widest italic truncate mt-1">{article.views} Hits</p>
                      </div>
                      <div className={cn(
                        "px-4 py-2 rounded-full border text-[10px] font-black uppercase tracking-widest italic",
                        article.status === 'PUBLISHED' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : article.status === 'SCHEDULED' ? 'bg-sky-50 text-sky-600 border-sky-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                      )}>
                         {article.status}
                      </div>
                   </div>
                   
                   <div className="flex items-center space-x-2 flex items-center space-x-2">
                      <button className="p-3 bg-white border border-gray-100 rounded-xl hover:bg-primary hover:text-white transition-all shadow-sm">
                         <Edit2 size={16} />
                      </button>
                      <button className="p-3 bg-white border border-gray-100 rounded-xl hover:bg-sky-500 hover:text-white transition-all shadow-sm">
                         <Share2 size={16} />
                      </button>
                   </div>
                </div>
             </div>
           ))}
         </div>

         <div className="p-10 border-t border-gray-50 flex items-center justify-between text-typography italic bg-snow-pearl/30 transition-all">
            <p className="text-xs font-black text-secondary/30 uppercase tracking-[0.2em] italic capitalize">Knowledge Node Processing Protocol Active</p>
            <div className="flex items-center space-x-4">
              <button className="px-10 py-5 bg-gray-50 border border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-secondary/40 hover:text-primary transition-all shadow-sm">Full Content Calendar</button>
              <button className="px-10 py-5 bg-white border border-primary/20 rounded-2xl text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary hover:text-white transition-all shadow-md">Next Page</button>
            </div>
         </div>
      </section>

      {/* Content SEO Insight Warning */}
      <section className="bg-primary/5 p-12 rounded-[4rem] border border-primary/10 flex items-start space-x-8 italic shadow-xl shadow-primary/5 group animate-in slide-in-from-bottom transition-all">
         <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-primary border border-primary/10 group-hover:scale-110 transition-transform shadow-sm flex-shrink-0">
            <Zap size={32} />
         </div>
         <div>
            <h4 className="text-xl font-black text-primary uppercase tracking-tight italic">Content Intelligence Protocol</h4>
            <p className="text-sm font-bold text-secondary/60 leading-relaxed mt-2 max-w-4xl italic uppercase tracking-widest opacity-80 leading-relaxed truncate overflow-hidden text-ellipsis whitespace-nowrap">
              Cross-linking articles to College Pages (Section 2.1) increases organic retention by 24%. Ensure every news update is linked to its respective institute to optimize the SEO Knowledge Graph. 5,420 Articles currently mapped to dynamic entities.
            </p>
         </div>
      </section>
    </div>
  );
}
