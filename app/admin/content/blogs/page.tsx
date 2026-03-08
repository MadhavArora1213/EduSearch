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
    <div className="space-y-6 font-montserrat">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-4 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-1.5">
              <div className="bg-primary/5 px-3 py-1.5 rounded-xl border border-primary/10">
                 <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">CMS Operations</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30 uppercase tracking-widest text-[10px]">Article Registry</span>
           </div>
           <h1 className="text-3xl md:text-4xl font-black text-typography tracking-tighter leading-none mb-1">
             Content <span className="text-primary italic">Engine</span>
           </h1>
           <p className="text-secondary/40 text-[10px] font-black uppercase tracking-[0.2em] mt-1.5 leading-none">
              Managing Editorial Assets & Programmatic SEO across 1,200+ Nodes
           </p>
        </div>
 
        <button 
          onClick={() => openEditor()}
          className="flex items-center space-x-2 px-6 py-2.5 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-primary/20"
        >
          <Plus size={16} />
          <span>New Article</span>
        </button>
      </section>

      {/* KPI Stream */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
         {[
           { label: "Total Articles", value: posts.length, trend: "+45% WoW", icon: FileText, color: "text-primary bg-primary/5" },
           { label: "Total Views", value: posts.reduce((acc, p) => acc + p.view_count, 0).toLocaleString(), trend: "Real-time", icon: BarChart3, color: "text-emerald-500 bg-emerald-50" },
           { label: "Avg Retention", value: "4m 24s", trend: "+12s Peak", icon: Clock, color: "text-indigo-500 bg-indigo-50" },
           { label: "Serp Index", value: "98.2%", trend: "Synced", icon: Globe, color: "text-amber-500 bg-amber-50" },
         ].map((kpi, i) => (
           <div key={i} className="bg-white p-3.5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between group hover:shadow-md transition-all">
              <div className="leading-none">
                 <p className="text-[9px] font-black text-secondary/20 uppercase tracking-[0.1em] mb-2">{kpi.label}</p>
                 <p className="text-2xl font-black text-typography tracking-tighter">{kpi.value}</p>
                 <span className="inline-block mt-2 text-[8px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full uppercase tracking-widest border border-emerald-100/50">{kpi.trend}</span>
              </div>
              <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center transition-all group-hover:scale-105 border border-transparent shadow-inner", kpi.color)}>
                 <kpi.icon size={18} />
              </div>
           </div>
         ))}
      </section>

      {/* Main Table */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col min-h-[400px]">
         <div className="p-2 border-b border-gray-100 flex flex-col lg:flex-row lg:items-center justify-between gap-3 bg-snow-pearl/30">
            <div className="relative flex-1 max-w-lg">
               <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/20" />
               <input 
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 placeholder="Search documents cluster..." 
                 className="w-full bg-white border border-gray-100 pl-10 pr-4 py-2 rounded-lg text-[12px] font-bold outline-none focus:ring-4 focus:ring-primary/5 shadow-sm transition-all" 
               />
            </div>
            <div className="flex items-center space-x-2">
               <button className="w-8 h-8 bg-white border border-gray-100 rounded-lg flex items-center justify-center text-secondary/20 hover:text-primary transition-all shadow-sm">
                  <Filter size={14} />
               </button>
            </div>
         </div>

         <div className="overflow-x-auto relative">
            {loading && (
              <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-10">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
              </div>
            )}
             <table className="w-full text-left font-montserrat">
                <thead className="bg-snow-pearl/50 border-b border-gray-100">
                   <tr>
                      <th className="px-6 py-3 text-[9px] font-black uppercase tracking-[0.2em] text-secondary/40">Article Identity</th>
                      <th className="px-6 py-3 text-[9px] font-black uppercase tracking-[0.2em] text-secondary/40">Classification</th>
                      <th className="px-6 py-3 text-[9px] font-black uppercase tracking-[0.2em] text-secondary/40 text-center">Status</th>
                      <th className="px-6 py-3 text-[9px] font-black uppercase tracking-[0.2em] text-secondary/40 text-right">Discovery</th>
                      <th className="px-6 py-3 text-[9px] font-black uppercase tracking-[0.2em] text-secondary/40 text-right">Commit</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                   {posts.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase())).map((post) => (
                     <tr key={post.id} className="group hover:bg-gray-50/50 transition-all font-montserrat">
                        <td className="px-6 py-2.5">
                           <div className="flex items-center space-x-3">
                              <div className="w-9 h-9 bg-gray-50 rounded-lg flex items-center justify-center shrink-0 border border-gray-100 text-secondary/20 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                                 <FileText size={16} />
                              </div>
                              <div>
                                 <h4 className="text-[13px] font-black text-typography uppercase leading-none group-hover:text-primary transition-colors">{post.title}</h4>
                                 <p className="text-[8px] font-black text-secondary/30 uppercase tracking-widest mt-1.5 leading-none">ID: {post.id.slice(0, 8)}</p>
                              </div>
                           </div>
                        </td>
                        <td className="px-6 py-2.5">
                           <div className="space-y-1 leading-none">
                              <div className="flex items-center space-x-1.5 text-[10px] font-black text-typography uppercase">
                                 <Tag size={10} className="text-primary/40" />
                                 <span>{post.category}</span>
                              </div>
                              <div className="flex items-center space-x-1.5 text-[8px] font-black text-secondary/20 uppercase tracking-widest">
                                 <User size={10} />
                                 <span>{post.author_name}</span>
                              </div>
                           </div>
                        </td>
                        <td className="px-6 py-2.5 text-center">
                           <span className={cn(
                             "px-2 py-0.5 rounded-full text-[7px] font-black uppercase tracking-widest inline-flex items-center space-x-1.5 border transition-all shadow-sm",
                             post.is_published ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-amber-50 text-amber-600 border-amber-100"
                           )}>
                              <div className={cn("w-1 h-1 rounded-full", post.is_published ? "bg-emerald-500" : "bg-amber-500")} />
                              <span>{post.is_published ? "LIVE" : "DRAFT"}</span>
                           </span>
                        </td>
                        <td className="px-6 py-2.5 text-right">
                           <p className="text-[13px] font-black text-typography tracking-tighter leading-none">{post.view_count.toLocaleString()}</p>
                           <p className="text-[7px] font-black text-secondary/20 uppercase tracking-widest mt-1 leading-none">Total Hits</p>
                        </td>
                        <td className="px-6 py-2.5 text-right">
                           <div className="flex items-center justify-end space-x-1.5">
                              <button 
                                 onClick={() => openEditor(post)}
                                 className="w-8 h-8 bg-white border border-gray-100 rounded-lg flex items-center justify-center text-secondary/30 hover:bg-slate-900 hover:text-white transition-all shadow-sm"
                              >
                                 <Edit3 size={12} />
                              </button>
                              <button 
                                 onClick={() => handleDelete(post.id)}
                                 className="w-8 h-8 bg-white border border-gray-100 rounded-lg flex items-center justify-center text-secondary/30 hover:bg-rose-500 hover:text-white transition-all shadow-sm"
                              >
                                 <Trash2 size={12} />
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
       <section className="bg-slate-900 px-6 py-4 rounded-xl text-white flex flex-col md:flex-row md:items-center justify-between group overflow-hidden relative font-montserrat shadow-xl shadow-slate-900/10">
          <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:scale-110 transition-transform duration-1000">
             <Globe size={100} className="text-primary" />
          </div>
          <div className="flex items-center space-x-4 relative z-10">
             <div className="w-10 h-10 bg-primary/20 text-primary rounded-lg flex items-center justify-center border border-primary/20">
                <BarChart3 size={18} />
             </div>
             <div>
                <h4 className="text-sm font-black text-white tracking-tight uppercase">Growth insight</h4>
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1 max-w-lg leading-none">
                   Cluster: <span className="text-white">Maharashtra Intel</span>. Driving 14% of pipeline nodes.
                </p>
             </div>
          </div>
          <button className="mt-4 md:mt-0 px-6 py-2 bg-white text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-lg relative z-10">
             Traffic Heatmap
          </button>
       </section>

      {/* Modal Editor */}
      {isEditorOpen && (
       <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 font-montserrat">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsEditorOpen(false)} />
          <div className="relative w-full max-w-3xl bg-white rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="p-3 border-b border-gray-100 flex items-center justify-between bg-snow-pearl/30">
               <div className="leading-none">
                  <h3 className="text-lg font-black text-typography uppercase tracking-tighter">
                    {editingPost?.id ? "Edit Article" : "Draft New Node"}
                  </h3>
                  <p className="text-[8px] font-black text-secondary/20 uppercase tracking-[0.2em] mt-1.5">CMS Engine Node: CONTENT-EDITOR-V4</p>
               </div>
               <button onClick={() => setIsEditorOpen(false)} className="w-8 h-8 bg-white border border-gray-100 rounded-lg flex items-center justify-center text-secondary/30 hover:text-rose-500 transition-all shadow-sm"><X size={14} /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                     <label className="text-[8px] font-black uppercase tracking-widest text-secondary/20 ml-2 leading-none">Article Title</label>
                     <input 
                       value={editingPost?.title}
                       onChange={(e) => setEditingPost({...editingPost, title: e.target.value})}
                       className="w-full bg-snow-pearl border border-gray-100 px-4 py-2 rounded-lg text-[12px] font-bold outline-none focus:ring-4 focus:ring-primary/5 transition-all shadow-inner" 
                       placeholder="Enter title..."
                     />
                  </div>
                  <div className="space-y-1">
                     <label className="text-[8px] font-black uppercase tracking-widest text-secondary/20 ml-2 leading-none">URL Slug</label>
                     <input 
                       value={editingPost?.slug}
                       onChange={(e) => setEditingPost({...editingPost, slug: e.target.value})}
                       className="w-full bg-snow-pearl border border-gray-100 px-4 py-2 rounded-lg text-[12px] font-bold outline-none focus:ring-4 focus:ring-primary/5 transition-all shadow-inner" 
                       placeholder="eg: article-slug"
                     />
                  </div>
                  <div className="space-y-1">
                     <label className="text-[8px] font-black uppercase tracking-widest text-secondary/20 ml-2 leading-none">Category</label>
                     <select 
                       value={editingPost?.category}
                       onChange={(e) => setEditingPost({...editingPost, category: e.target.value})}
                       className="w-full bg-snow-pearl border border-gray-100 px-4 py-2 rounded-lg text-[12px] font-bold outline-none focus:ring-4 focus:ring-primary/5 transition-all appearance-none"
                     >
                        <option>College Guide</option>
                        <option>Exam Tips</option>
                        <option>Study Abroad</option>
                        <option>Career Path</option>
                     </select>
                  </div>
                  <div className="space-y-1">
                     <label className="text-[8px] font-black uppercase tracking-widest text-secondary/20 ml-2 leading-none">Status</label>
                     <div className="flex items-center space-x-1.5">
                        {['DRAFT', 'LIVE'].map((s) => (
                          <button 
                            key={s}
                            onClick={() => setEditingPost({...editingPost, is_published: s === 'LIVE'})}
                            className={cn(
                              "flex-1 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border transition-all shadow-sm",
                              (s === 'LIVE' ? editingPost?.is_published : !editingPost?.is_published) ? "bg-slate-900 text-white border-slate-900" : "bg-white text-secondary/30 border-gray-100 hover:border-primary/20"
                            )}
                          >
                             {s}
                          </button>
                        ))}
                     </div>
                  </div>
               </div>
 
               <div className="space-y-1">
                  <label className="text-[8px] font-black uppercase tracking-widest text-secondary/20 ml-2 leading-none">Markdown Body</label>
                  <textarea 
                    className="w-full bg-snow-pearl border border-gray-100 px-4 py-3 rounded-xl text-[12px] font-medium outline-none focus:ring-4 focus:ring-primary/5 transition-all min-h-[200px] shadow-inner" 
                    placeholder="Compose content..."
                  />
               </div>
            </div>
 
            <div className="p-3 border-t border-gray-100 bg-white flex items-center justify-between">
               <button onClick={() => setIsEditorOpen(false)} className="flex items-center space-x-1.5 text-secondary/30 hover:text-primary transition-all text-[9px] font-black uppercase tracking-widest">
                  <ArrowLeft size={12} />
                  <span>Discard</span>
               </button>
               <button 
                  onClick={handleSave}
                  className="flex items-center space-x-2 px-6 py-2 bg-slate-900 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-primary transition-all shadow-lg shadow-slate-900/10"
               >
                  <Save size={14} />
                  <span>Persist Node</span>
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
