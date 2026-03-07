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
  Trash2
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

  const filteredColleges = colleges.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-10">
      {/* Header Section */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-6 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-2">
              <div className="bg-primary/5 px-3 py-1.5 rounded-xl border border-primary/10">
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary">Entity Management</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30">Educational Institutes</span>
           </div>
           <h1 className="text-5xl font-black text-typography tracking-tighter leading-none mb-1">
             Colleges <span className="text-primary italic">& Courses</span>
           </h1>
           <p className="text-secondary/40 text-sm font-bold uppercase tracking-widest mt-2">
              Managing 35,000+ Indian Institutions
           </p>
        </div>

        <div className="flex items-center space-x-4">
           <button onClick={() => {
              const csvContent = "data:text/csv;charset=utf-8,ID,Name,Type,City\n" + colleges.map(c => `${c.id},${c.name},${c.type},${c.city}`).join("\n");
              const encodedUri = encodeURI(csvContent);
              const link = document.createElement("a");
              link.setAttribute("href", encodedUri);
              link.setAttribute("download", "college_export.csv");
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
           }} className="flex items-center space-x-2 px-6 py-4 bg-gray-50 border border-gray-200/50 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-white hover:border-gray-200 transition-all active:scale-95 text-secondary/60">
              <Download size={16} />
              <span>Bulk Export (CSV)</span>
           </button>
           <Link href="/admin/colleges/new" className="flex items-center space-x-2 px-8 py-4 bg-primary text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20">
              <Plus size={18} />
              <span>Add New College</span>
           </Link>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="bg-white p-6 rounded-[2.5rem] border border-gray-50 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
         <div className="flex items-center space-x-2 bg-gray-50 p-1.5 rounded-2xl border border-gray-100 w-full md:w-auto">
            {["all", "verified", "unverified", "pending"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                  filter === f 
                    ? "bg-white text-primary shadow-sm shadow-black/5" 
                    : "text-secondary/40 hover:text-secondary"
                )}
              >
                {f}
              </button>
            ))}
         </div>

         <div className="flex items-center space-x-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-80 group">
               <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-secondary/30 group-focus-within:text-primary transition-colors" />
               <input 
                 placeholder="Search by Name, City or State..." 
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 className="w-full bg-gray-50 border-0 pl-14 pr-6 py-4 rounded-2xl text-[13px] font-bold outline-none focus:ring-2 focus:ring-primary/10 transition-all text-typography"
               />
            </div>
            <button onClick={() => alert("Advanced filtering panel toggled...")} className="w-14 h-14 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center hover:bg-white hover:border-primary/20 transition-all group">
               <Filter size={18} className="text-secondary/40 group-hover:text-primary" />
            </button>
         </div>
      </section>

      {/* College Listing Table */}
      <section className="bg-white rounded-[2.5rem] border border-gray-50 shadow-sm overflow-hidden min-h-[500px]">
        <div className="overflow-x-auto">
           <table className="w-full text-left">
              <thead className="bg-snow-pearl/50 border-b border-gray-100">
                 <tr>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-secondary/40">Institution Details</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-secondary/40">Location</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-secondary/40 text-center">Stats</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-secondary/40">Status</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-secondary/40 text-right">Actions</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loading ? (
                  [...Array(5)].map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td colSpan={5} className="px-10 py-8">
                         <div className="h-12 bg-gray-50 rounded-2xl w-full" />
                      </td>
                    </tr>
                  ))
                ) : filteredColleges.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-10 py-20 text-center">
                       <div className="flex flex-col items-center">
                          <AlertCircle size={48} className="text-secondary/10 mb-4" />
                          <p className="text-xl font-black text-typography">No Institutions Found</p>
                          <p className="text-secondary/40 text-xs font-bold uppercase tracking-widest mt-2">Try adjusting your filters or search term</p>
                       </div>
                    </td>
                  </tr>
                ) : (
                  filteredColleges.map((college) => (
                    <tr key={college.id} className="group hover:bg-gray-50/30 transition-all">
                       <td className="px-10 py-8">
                          <div className="flex items-center space-x-6">
                             <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center p-2 group-hover:scale-105 transition-transform border border-gray-100">
                                {college.logo_url ? (
                                  <img src={college.logo_url} className="w-full h-full object-contain" />
                                ) : (
                                  <School size={28} className="text-secondary/20" />
                                )}
                             </div>
                             <div>
                                <h3 className="text-base font-black text-typography leading-tight mb-1 group-hover:text-primary transition-colors">{college.name}</h3>
                                <div className="flex items-center space-x-3">
                                   <span className="text-[10px] font-black uppercase tracking-widest text-secondary/40">{college.type}</span>
                                   <div className="w-1 h-1 bg-secondary/10 rounded-full" />
                                   <span className="text-[10px] font-black italic text-emerald-500">{college.naac_grade || "N/A"} Grade</span>
                                </div>
                             </div>
                          </div>
                       </td>
                       <td className="px-10 py-8">
                          <div className="flex items-center space-x-2 text-secondary/60">
                             <MapPin size={14} />
                             <span className="text-[13px] font-bold">{college.city}, {college.state}</span>
                          </div>
                       </td>
                       <td className="px-10 py-8">
                          <div className="flex items-center justify-center space-x-6 text-center">
                             <div>
                                <p className="text-lg font-black text-typography">{college._count.courses}</p>
                                <div className="flex items-center space-x-1 justify-center text-[10px] font-bold text-secondary/40 uppercase tracking-widest">
                                   <BookOpen size={10} />
                                   <span>Courses</span>
                                </div>
                             </div>
                             <div className="w-px h-8 bg-gray-100" />
                             <div>
                                <p className="text-lg font-black text-typography">{college._count.reviews}</p>
                                <div className="flex items-center space-x-1 justify-center text-[10px] font-bold text-secondary/40 uppercase tracking-widest">
                                   <MessageSquare size={10} />
                                   <span>Reviews</span>
                                </div>
                             </div>
                          </div>
                       </td>
                       <td className="px-10 py-8">
                          <div className={cn(
                            "inline-flex items-center space-x-2 px-4 py-2 rounded-full border",
                            college.is_verified 
                              ? "bg-emerald-50 border-emerald-100 text-emerald-600" 
                              : "bg-amber-50 border-amber-100 text-amber-600"
                          )}>
                             {college.is_verified ? <BadgeCheck size={14} /> : <AlertCircle size={14} />}
                             <span className="text-[10px] font-black uppercase tracking-widest">
                                {college.is_verified ? "Verified" : "Unverified"}
                             </span>
                          </div>
                       </td>
                       <td className="px-10 py-8 text-right">
                          <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                             <button onClick={() => alert(`Opening Full Edit Form for: ${college.name}`)} className="p-3 bg-white border border-gray-100 rounded-xl hover:bg-primary hover:text-white transition-all shadow-sm">
                                <Edit2 size={16} />
                             </button>
                             <button onClick={() => window.open(`/${college.slug}`, '_blank')} className="p-3 bg-white border border-gray-100 rounded-xl hover:bg-emerald-500 hover:text-white transition-all shadow-sm">
                                <ExternalLink size={16} />
                             </button>
                             <button onClick={async () => {
                               if (confirm(`Are you sure you want to soft-delete/archive ${college.name}?`)) {
                                 alert(`Archiving ${college.name}... (Simulated)`);
                                 // fetch(/api/admin/colleges/${college.id}, { method: 'DELETE' })
                               }
                             }} className="p-3 bg-white border border-gray-100 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm">
                                <Trash2 size={16} />
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
        <div className="p-10 border-t border-gray-50 flex items-center justify-between bg-white">
           <p className="text-xs font-bold text-secondary/30 uppercase tracking-widest italic">Showing {filteredColleges.length} Instititues</p>
           <div className="flex items-center space-x-4">
              <button onClick={() => alert("Navigating to previous page...")} className="p-4 bg-gray-50 rounded-2xl text-[11px] font-black uppercase tracking-widest text-secondary/40 hover:text-primary transition-all active:scale-95">Previous</button>
              <div className="flex items-center space-x-2">
                 <button className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center text-xs font-black">1</button>
                 <button className="w-12 h-12 bg-gray-50 text-secondary/40 rounded-2xl flex items-center justify-center text-xs font-black hover:bg-gray-100 transition-all">2</button>
                 <button className="w-12 h-12 bg-gray-50 text-secondary/40 rounded-2xl flex items-center justify-center text-xs font-black hover:bg-gray-100 transition-all">3</button>
              </div>
              <button onClick={() => alert("Navigating to next page...")} className="p-4 bg-gray-50 rounded-2xl text-[11px] font-black uppercase tracking-widest text-secondary/40 hover:text-primary transition-all active:scale-95">Next Page</button>
           </div>
        </div>
      </section>
    </div>
  );
}
