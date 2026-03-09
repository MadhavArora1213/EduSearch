"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle, 
  Download,
  School,
  MapPin,
  BookOpen,
  MessageSquare,
  BadgeCheck,
  TrendingUp,
  ExternalLink,
  Edit2,
  Trash2,
  Copy,
  Clock,
  Briefcase
} from "lucide-react";
import { cn } from "@/lib/utils";

interface College {
  id: string;
  name: string;
  slug: string;
  city: string;
  state: string;
  type: string;
  is_verified: boolean;
  naac_grade: string | null;
  logo_url: string | null;
  has_b2b: boolean;
  last_updated: string;
  _count: {
    courses: number;
    reviews: number;
  }
}

export default function CollegesPage() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchColleges();
  }, [filter]);

  const fetchColleges = async () => {
    setLoading(true);
    try {
      let url = "/api/admin/colleges";
      if (filter === "verified") url += "?verified=true";
      else if (filter === "unverified") url += "?verified=false";
      
      const res = await fetch(url);
      const data = await res.json();
      setColleges(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const filteredColleges = Array.isArray(colleges) ? colleges.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.state.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  return (
    <div className="space-y-6 font-montserrat">
      {/* Header Section */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-4 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-1.5">
              <div className="bg-primary/5 px-3 py-1.5 rounded-xl border border-primary/10">
                 <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Entity Management</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30 uppercase tracking-widest text-[10px]">Educational Institutes</span>
           </div>
           <h1 className="text-3xl md:text-4xl font-black text-typography tracking-tighter leading-none mb-1">
             Colleges <span className="text-primary italic">& Courses</span>
           </h1>
           <p className="text-secondary/40 text-[10px] font-black uppercase tracking-[0.2em] mt-1.5 leading-none">
              Managing 35,000+ Indian Institutions from Global Registry
           </p>
        </div>
 
        <div className="flex items-center space-x-3">
           <button onClick={() => {
              const csvContent = "data:text/csv;charset=utf-8,ID,Name,Type,City\n" + colleges.map(c => `${c.id},${c.name},${c.type},${c.city}`).join("\n");
              const encodedUri = encodeURI(csvContent);
              const link = document.createElement("a");
              link.setAttribute("href", encodedUri);
              link.setAttribute("download", "college_export.csv");
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
           }} className="flex items-center space-x-2 px-6 py-2.5 bg-white border border-gray-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:text-primary transition-all shadow-sm">
              <Download size={14} />
              <span>Export</span>
           </button>
           <Link href="/admin/colleges/new" className="flex items-center space-x-2 px-6 py-2.5 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-primary/20">
              <Plus size={16} />
              <span>Add College</span>
           </Link>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="bg-white p-2 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
         <div className="flex items-center space-x-1 bg-gray-50 p-1 rounded-lg border border-gray-100 w-full md:w-auto">
            {["all", "verified", "unverified", "pending"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-widest transition-all",
                  filter === f
                    ? "bg-white text-primary shadow-sm"
                    : "text-secondary/30 hover:text-secondary"
                )}
              >
                {f}
              </button>
            ))}
         </div>
 
         <div className="flex items-center space-x-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64 group">
               <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary/20" />
               <input
                 placeholder="Search registry..."
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 className="w-full bg-gray-50 border-0 pl-9 pr-3 py-2 rounded-lg text-[12px] font-bold outline-none focus:ring-4 focus:ring-primary/5 transition-all"
               />
            </div>
            <button onClick={() => alert("Filters...")} className="w-8 h-8 bg-white border border-gray-100 rounded-lg flex items-center justify-center text-secondary/20 hover:text-primary transition-all shadow-sm">
               <Filter size={14} />
            </button>
         </div>
      </section>

      {/* College Listing Table */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden min-h-[500px]">
        <div className="overflow-x-auto">
           <table className="w-full text-left font-montserrat">
              <thead className="bg-snow-pearl/50 border-b border-gray-100">
                 <tr>
                    <th className="px-6 py-3 text-[9px] font-black uppercase tracking-[0.2em] text-secondary/40">Institution Profile</th>
                    <th className="px-6 py-3 text-[9px] font-black uppercase tracking-[0.2em] text-secondary/40">B2B Link</th>
                    <th className="px-6 py-3 text-[9px] font-black uppercase tracking-[0.2em] text-secondary/40">Freshness</th>
                    <th className="px-6 py-3 text-[9px] font-black uppercase tracking-[0.2em] text-secondary/40 text-center">Stats Matrix</th>
                    <th className="px-6 py-3 text-[9px] font-black uppercase tracking-[0.2em] text-secondary/40">Status</th>
                    <th className="px-6 py-3 text-[9px] font-black uppercase tracking-[0.2em] text-secondary/40 text-right">Commit</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loading ? (
                  [...Array(5)].map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td colSpan={6} className="px-6 py-3">
                         <div className="h-10 bg-gray-50 rounded-xl w-full" />
                      </td>
                    </tr>
                  ))
                ) : filteredColleges.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center">
                       <div className="flex flex-col items-center">
                          <AlertCircle size={40} className="text-secondary/10 mb-3" />
                          <AlertCircle size={32} className="text-secondary/10 mb-2" />
                          <p className="text-base font-black text-typography">No Institutions Found</p>
                          <p className="text-secondary/40 text-xs font-bold uppercase tracking-widest mt-1">Try adjusting your filters or search term</p>
                       </div>
                    </td>
                  </tr>
                ) : (
                  filteredColleges.map((college) => (
                    <tr key={college.id} className="group hover:bg-gray-50/30 transition-all">
                       <td className="px-6 py-2.5">
                          <div className="flex items-center space-x-3">
                             <div className="w-9 h-9 bg-gray-50 rounded-xl flex items-center justify-center p-1.5 border border-gray-100 group-hover:scale-105 transition-all">
                                {college.logo_url ? (
                                  <img src={college.logo_url} className="w-full h-full object-contain" />
                                ) : (
                                  <School size={16} className="text-secondary/20" />
                                )}
                             </div>
                             <div>
                                <h3 className="text-[13px] font-black text-typography uppercase leading-none group-hover:text-primary transition-colors">{college.name}</h3>
                                <div className="flex items-center space-x-2 mt-1.5 leading-none">
                                   <span className="text-[8px] font-black uppercase tracking-widest text-secondary/30">{college.type}</span>
                                   <div className="w-1 h-1 bg-secondary/10 rounded-full" />
                                   <span className="text-[8px] font-black text-emerald-500 uppercase">{college.naac_grade || "N/A"} Grade</span>
                                </div>
                             </div>
                          </div>
                       </td>
                       <td className="px-6 py-2.5">
                          <div className={cn(
                            "flex items-center space-x-2 text-[10px] items-center",
                            college.has_b2b ? "text-primary" : "text-secondary/30"
                          )}>
                             <Briefcase size={12} />
                             <span className="font-black uppercase tracking-widest leading-none">{college.has_b2b ? "Active" : "Null"}</span>
                          </div>
                       </td>
                       <td className="px-6 py-2.5">
                          <div className="flex flex-col leading-none">
                             <div className="flex items-center space-x-1.5 text-secondary/40">
                                <Clock size={10} />
                                <span className="text-[10px] font-black uppercase tracking-tight">12d ago</span>
                             </div>
                             <span className="text-[7px] font-black uppercase text-emerald-500 mt-1">TTL: 168d</span>
                          </div>
                       </td>
                       <td className="px-6 py-2.5">
                          <div className="flex items-center justify-center space-x-4 text-center">
                             <div>
                                <p className="text-[13px] font-black text-typography leading-none">{college._count.courses}</p>
                                <p className="text-[7px] font-black text-secondary/30 uppercase tracking-[0.1em] mt-1">Units</p>
                             </div>
                             <div className="w-px h-6 bg-gray-100" />
                             <div>
                                <p className="text-[13px] font-black text-typography leading-none">{college._count.reviews}</p>
                                <p className="text-[7px] font-black text-secondary/30 uppercase tracking-[0.1em] mt-1">Intel</p>
                             </div>
                          </div>
                       </td>
                       <td className="px-6 py-2.5">
                          <div className={cn(
                            "inline-flex items-center space-x-1.5 px-3 py-1 rounded-full border transition-all",
                            college.is_verified 
                              ? "bg-emerald-50 border-emerald-100 text-emerald-600" 
                              : "bg-amber-50 border-amber-100 text-amber-600"
                          )}>
                             {college.is_verified ? <BadgeCheck size={12} /> : <AlertCircle size={12} />}
                             <span className="text-[8px] font-black uppercase tracking-widest leading-none">
                                {college.is_verified ? "Verified" : "Unverified"}
                             </span>
                          </div>
                       </td>
                       <td className="px-6 py-2.5 text-right">
                          <div className="flex items-center justify-end space-x-1.5">
                             <button onClick={() => alert(`Edit: ${college.name}`)} className="w-8 h-8 flex items-center justify-center bg-gray-50 border border-transparent rounded-lg text-secondary/40 hover:bg-primary hover:text-white transition-all shadow-sm">
                                <Edit2 size={12} />
                             </button>
                             <button onClick={() => window.open(`/${college.slug}`, '_blank')} className="w-8 h-8 flex items-center justify-center bg-gray-50 border border-transparent rounded-lg text-secondary/40 hover:bg-emerald-500 hover:text-white transition-all shadow-sm">
                                <ExternalLink size={12} />
                             </button>
                             <button onClick={() => alert(`Archive: ${college.name}`)} className="w-8 h-8 flex items-center justify-center bg-gray-50 border border-transparent rounded-lg text-secondary/40 hover:bg-rose-500 hover:text-white transition-all shadow-sm">
                                <Trash2 size={12} />
                             </button>
                          </div>
                       </td>
                    </tr>
                  ))
                )}
              </tbody>
           </table>
        </div>
        
        {/* Pagination etc */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-snow-pearl/30 font-montserrat">
           <p className="text-[9px] font-black text-secondary/30 uppercase tracking-[0.2em]">Showing {filteredColleges.length} Verified Institutions</p>
           <div className="flex items-center space-x-3">
              <button className="px-4 py-2 bg-white border border-gray-100 rounded-xl text-[9px] font-black uppercase tracking-widest text-secondary/40 shadow-sm hover:text-primary transition-all">Prev</button>
              <div className="flex items-center space-x-1.5">
                 <button className="w-8 h-8 bg-primary text-white rounded-xl flex items-center justify-center text-[10px] font-black shadow-lg shadow-primary/20">1</button>
                 <button className="w-8 h-8 bg-white border border-gray-100 text-secondary/30 rounded-xl flex items-center justify-center text-[10px] font-black hover:text-primary transition-all shadow-sm">2</button>
              </div>
              <button className="px-4 py-2 bg-white border border-gray-100 rounded-xl text-[9px] font-black uppercase tracking-widest text-secondary/40 shadow-sm hover:text-primary transition-all">Next</button>
           </div>
        </div>
      </section>
    </div>
  );
}
