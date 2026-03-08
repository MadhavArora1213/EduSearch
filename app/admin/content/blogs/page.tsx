"use client";

import { useState, useEffect } from "react";
import { 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  ChevronRight, 
  MoreVertical, 
  Eye, 
  Edit3, 
  Trash2, 
  ExternalLink, 
  Calendar, 
  User, 
  Tag, 
  Globe, 
  BarChart3, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  X,
  Image as ImageIcon,
  Save,
  ArrowLeft,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  author_name: string;
  category: string;
  is_published: boolean;
  published_at: string | null;
  view_count: number;
}

export default function BlogCMSPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Partial<BlogPost> | null>(null);

  useEffect(() => {
    setMounted(true);
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/blogs");
      const data = await res.json();
      setPosts(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const openEditor = (post: BlogPost | null = null) => {
    setEditingPost(post || { 
      title: "", 
      slug: "", 
      author_name: "Admin", 
      category: "General", 
      is_published: false, 
      published_at: null, 
      view_count: 0 
    });
    setIsEditorOpen(true);
  };

  const handleSave = async () => {
    if (!editingPost) return;
    
    try {
      const isUpdate = 'id' in editingPost;
      const res = await fetch(isUpdate ? `/api/admin/blogs/${editingPost.id}` : "/api/admin/blogs", {
        method: isUpdate ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingPost)
      });
      
      if (res.ok) {
        fetchPosts();
        setIsEditorOpen(false);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Permanently delete this article? This action is legally traceable in the audit log.")) {
      try {
        const res = await fetch(`/api/admin/blogs/${id}`, { method: "DELETE" });
        if (res.ok) fetchPosts();
      } catch (e) {
        console.error(e);
      }
    }
  };

  if (!mounted) return null;

  return (
    <div className="space-y-10 font-montserrat">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-6 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-2">
              <div className="bg-primary/5 px-3 py-1.5 rounded-xl border border-primary/10">
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary italic underline decoration-primary/10">Content Management</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30">Article Registry</span>
           </div>
           <h1 className="text-3xl md:text-3xl md:text-5xl font-black text-typography tracking-tighter leading-none mb-1">
             Content <span className="text-primary italic">Engine</span>
           </h1>
           <p className="text-secondary/40 text-sm font-bold uppercase tracking-widest mt-2">
              Managing Programmatic SEO & Editorial Assets for 80k+ Monthly Seekers
           </p>
        </div>

        <button 
          onClick={() => openEditor()}
          className="flex items-center space-x-2 px-8 py-4 bg-primary text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-primary/20"
        >
          <Plus size={18} />
          <span>Draft New Article</span>
        </button>
      </section>

      {/* KPI Stream */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
         {[
           { label: "Total Articles", value: posts.length, trend: "+4 this week", icon: FileText, color: "text-primary bg-primary/5" },
           { label: "Total PageViews", value: posts.reduce((acc, p) => acc + p.view_count, 0).toLocaleString(), trend: "Real-time", icon: BarChart3, color: "text-emerald-500 bg-emerald-50" },
           { label: "Avg. Time on Page", value: "4m 24s", trend: "+12s Hub Peak", icon: Clock, color: "text-indigo-500 bg-indigo-50" },
           { label: "Indexed Pages", value: "98.2%", trend: "Synced", icon: Globe, color: "text-amber-500 bg-amber-50" },
         ].map((kpi, i) => (
           <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-50 shadow-sm flex items-center justify-between group hover:border-primary/20 transition-all">
              <div>
                 <p className="text-[10px] font-bold text-secondary/30 uppercase tracking-widest italic mb-2 leading-none">{kpi.label}</p>
                 <p className="text-3xl font-black text-typography tracking-tighter leading-none">{kpi.value.toLocaleString()}</p>
                 <span className="inline-block mt-3 text-[10px] font-black text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full italic">{kpi.trend}</span>
              </div>
              <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 shadow-inner", kpi.color)}>
                 <kpi.icon size={26} />
              </div>
           </div>
         ))}
      </div>

      {/* Main Table */}
      <section className="bg-white rounded-[3rem] border border-gray-50 shadow-sm overflow-hidden flex flex-col min-h-[400px]">
         <div className="p-6 md:p-10 border-b border-gray-50 flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-snow-pearl/30">
            <div className="relative flex-1 max-w-xl">
               <Search size={22} className="absolute left-6 top-1/2 -translate-y-1/2 text-secondary/20" />
               <input 
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 placeholder="Search by Title, Category or Author..." 
                 className="w-full bg-white border-0 pl-16 pr-8 py-5 rounded-3xl text-[14px] font-bold outline-none focus:ring-4 focus:ring-primary/5 transition-all shadow-inner" 
               />
            </div>
            <div className="flex items-center space-x-4 pl-10">
               <button className="p-5 bg-white border border-gray-100 rounded-2xl text-secondary/20 hover:text-primary transition-all"><Filter size={20} /></button>
            </div>
         </div>

         <div className="overflow-x-auto relative">
            {loading && (
              <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-10">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
              </div>
            )}
            <table className="w-full text-left">
               <thead className="bg-snow-pearl/50 border-b border-gray-100 italic">
                  <tr>
                     <th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-secondary/40">Article Identity</th>
                     <th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-secondary/40">Classification</th>
                     <th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-secondary/40 text-center">Status</th>
                     <th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-secondary/40 text-right">Analytics</th>
                     <th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-secondary/40 text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-50">
                  {posts.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase())).map((post) => (
                    <tr key={post.id} className="group hover:bg-gray-50/30 transition-all italic">
                       <td className="px-10 py-10">
                          <div className="flex items-start space-x-5">
                             <div className="w-12 h-12 bg-snow-pearl rounded-xl flex items-center justify-center shrink-0">
                                <FileText className="text-secondary/20 group-hover:text-primary transition-colors" size={24} />
                             </div>
                             <div>
                                <h4 className="text-[14px] font-black text-typography uppercase tracking-tight group-hover:text-primary transition-colors leading-tight">{post.title}</h4>
                                <div className="flex items-center space-x-3 text-[9px] font-bold text-secondary/30 uppercase tracking-widest mt-1">
                                   <span className="underline decoration-primary/10">Slug: {post.slug}</span>
                                   <div className="w-1 h-1 bg-secondary/10 rounded-full" />
                                   <span>B-ID: {post.id}</span>
                                </div>
                             </div>
                          </div>
                       </td>
                       <td className="px-10 py-10">
                          <div className="space-y-1">
                             <div className="flex items-center space-x-2 text-[11px] font-black text-typography italic">
                                <Tag size={12} className="text-primary" />
                                <span>{post.category}</span>
                             </div>
                             <div className="flex items-center space-x-2 text-[10px] font-bold text-secondary/20 italic">
                                <User size={12} />
                                <span>By {post.author_name}</span>
                             </div>
                          </div>
                       </td>
                       <td className="px-10 py-10 text-center">
                          <span className={cn(
                            "px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest inline-flex items-center space-x-2",
                            post.is_published ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                          )}>
                             <div className={cn("w-1.5 h-1.5 rounded-full", post.is_published ? "bg-emerald-500" : "bg-amber-500")} />
                             <span>{post.is_published ? "PUBLISHED" : "DRAFT"}</span>
                          </span>
                       </td>
                       <td className="px-10 py-10 text-right">
                          <p className="text-xl font-black text-typography tracking-tighter italic">{post.view_count.toLocaleString()}</p>
                          <p className="text-[10px] font-bold text-secondary/30 uppercase tracking-widest">Total Views</p>
                       </td>
                       <td className="px-10 py-10 text-right">
                          <div className="flex items-center justify-end space-x-2">
                             <button 
                                onClick={() => openEditor(post)}
                                className="p-3 bg-white border border-gray-100 rounded-xl hover:text-primary transition-all shadow-sm group/btn"
                             >
                                <Edit3 size={16} />
                             </button>
                             <button 
                                onClick={() => handleDelete(post.id)}
                                className="p-3 bg-white border border-gray-100 rounded-xl hover:text-red-500 transition-all shadow-sm"
                             >
                                <Trash2 size={16} />
                             </button>
                          </div>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </section>

      {/* Quick Access Context Panel */}
      <section className="bg-slate-900 p-12 rounded-[3.5rem] text-white flex flex-col md:flex-row md:items-center justify-between group overflow-hidden relative">
         <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform duration-1000">
            <Globe size={120} className="text-primary" />
         </div>
         <div className="flex items-center space-x-8 relative z-10">
            <div className="w-20 h-20 bg-primary/20 text-primary rounded-[2rem] flex items-center justify-center shadow-inner group-hover:rotate-12 transition-transform">
               <BarChart3 size={32} />
            </div>
            <div>
               <h4 className="text-2xl font-black text-white tracking-tighter uppercase italic">Programmatic Growth Insight</h4>
               <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-2 max-w-lg">
                  Current top-performing cluster: <span className="text-white">Maharashtra Institute Rankings</span>. Indexed and driving 14% of Lead Pipeline today.
               </p>
            </div>
         </div>
         <button className="mt-8 md:mt-0 px-10 py-5 bg-white text-slate-900 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-primary/20 relative z-10 italic">
            Analyze Traffic Heatmap
         </button>
      </section>

      {/* Modal Editor */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-10 italic">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl" onClick={() => setIsEditorOpen(false)} />
          <div className="relative w-full max-w-4xl bg-white rounded-[3.5rem] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="p-6 md:p-10 border-b border-gray-50 flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-snow-pearl/30">
               <div>
                  <h3 className="text-2xl font-black text-typography uppercase tracking-tighter">
                    {editingPost?.id ? "Edit Article" : "Draft New Article"}
                  </h3>
                  <p className="text-[10px] font-black text-secondary/30 uppercase tracking-widest mt-1">Legall Integrity Node: CONTENT-EDITOR-V4</p>
               </div>
               <button onClick={() => setIsEditorOpen(false)} className="p-4 bg-white border border-gray-100 rounded-2xl hover:bg-rose-50 hover:text-rose-500 transition-all"><X size={20} /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-12 space-y-10 custom-scrollbar">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                     <label className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary/30 ml-4">Article Title</label>
                     <input 
                       value={editingPost?.title}
                       onChange={(e) => setEditingPost({...editingPost, title: e.target.value})}
                       className="w-full bg-snow-pearl border-0 px-8 py-5 rounded-3xl text-[14px] font-bold outline-none ring-1 ring-gray-100 focus:ring-4 focus:ring-primary/5 transition-all shadow-inner" 
                       placeholder="Enter high-impact title..."
                     />
                  </div>
                  <div className="space-y-4">
                     <label className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary/30 ml-4">URL Slug (Auto-Gen)</label>
                     <input 
                       value={editingPost?.slug}
                       onChange={(e) => setEditingPost({...editingPost, slug: e.target.value})}
                       className="w-full bg-snow-pearl border-0 px-8 py-5 rounded-3xl text-[14px] font-bold outline-none ring-1 ring-gray-100 focus:ring-4 focus:ring-primary/5 transition-all shadow-inner" 
                       placeholder="eg: top-engineering-colleges"
                     />
                  </div>
                  <div className="space-y-4">
                     <label className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary/30 ml-4">Category / Cluster</label>
                     <select 
                       value={editingPost?.category}
                       onChange={(e) => setEditingPost({...editingPost, category: e.target.value})}
                       className="w-full bg-snow-pearl border-0 px-8 py-5 rounded-3xl text-[14px] font-bold outline-none ring-1 ring-gray-100 focus:ring-4 focus:ring-primary/5 transition-all shadow-inner appearance-none"
                     >
                        <option>College Guide</option>
                        <option>Exam Tips</option>
                        <option>Study Abroad</option>
                        <option>Career Path</option>
                     </select>
                  </div>
                  <div className="space-y-4">
                     <label className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary/30 ml-4">Publishing Status</label>
                     <div className="flex items-center space-x-4">
                        {['DRAFT', 'PUBLISHED'].map((s) => (
                          <button 
                            key={s}
                            onClick={() => setEditingPost({...editingPost, is_published: s === 'PUBLISHED'})}
                            className={cn(
                              "flex-1 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all",
                              (s === 'PUBLISHED' ? editingPost?.is_published : !editingPost?.is_published) ? "bg-slate-900 text-white border-slate-900" : "bg-white text-secondary/40 border-gray-100 hover:border-primary/20"
                            )}
                          >
                             {s}
                          </button>
                        ))}
                     </div>
                  </div>
               </div>

               <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary/30 ml-4">Longform Asset Body (Markdown)</label>
                  <textarea 
                    className="w-full bg-snow-pearl border-0 px-8 py-8 rounded-[2rem] text-[14px] font-medium outline-none ring-1 ring-gray-100 focus:ring-4 focus:ring-primary/5 transition-all shadow-inner min-h-[300px]" 
                    placeholder="Compose your article structure here..."
                  />
               </div>
            </div>

            <div className="p-10 border-t border-gray-50 bg-white flex items-center justify-between">
               <button onClick={() => setIsEditorOpen(false)} className="flex items-center space-x-2 text-secondary/30 hover:text-primary transition-all text-[11px] font-black uppercase tracking-widest">
                  <ArrowLeft size={16} />
                  <span>Discard Changes</span>
               </button>
               <button 
                  onClick={handleSave}
                  className="flex items-center space-x-3 px-12 py-5 bg-slate-900 text-white rounded-[1.5rem] text-[11px] font-black uppercase tracking-widest hover:bg-primary transition-all shadow-xl shadow-slate-900/10 italic"
               >
                  <Save size={18} />
                  <span>Persist Article Node</span>
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
