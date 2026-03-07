"use client";

import { useState } from "react";
import { 
  Plus, 
  Search, 
  MapPin, 
  School, 
  BadgeCheck, 
  Save, 
  ArrowLeft,
  ChevronRight,
  Info,
  GraduationCap
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function NewCollegePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    city: "",
    state: "",
    type: "PRIVATE",
    naac_grade: "",
    approval_bodies: "",
    established_year: "",
    about_description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // API Call to save
    try {
      const res = await fetch("/api/admin/colleges/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        router.push("/admin/colleges");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10 max-w-4xl">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-6 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-2">
              <Link href="/admin/colleges" className="bg-primary/5 px-3 py-1.5 rounded-xl border border-primary/10 hover:bg-primary/10 transition-colors flex items-center space-x-2">
                 <ArrowLeft size={14} className="text-primary" />
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary">Back to Listing</span>
              </Link>
           </div>
           <h1 className="text-5xl font-black text-typography tracking-tighter leading-none mb-1">
             Onboard <span className="text-primary italic">Institution</span>
           </h1>
           <p className="text-secondary/40 text-sm font-bold uppercase tracking-widest mt-2">
              Creating a new master profile in the system
           </p>
        </div>

        <div className="flex items-center space-x-4">
           <button 
             onClick={handleSubmit}
             disabled={loading}
             className="flex items-center space-x-3 px-10 py-5 bg-primary text-white rounded-3xl text-[11px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20 disabled:opacity-50"
           >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <Save size={18} />
              )}
              <span>Deploy Profile</span>
           </button>
        </div>
      </section>

      {/* Form Context */}
      <form className="grid grid-cols-12 gap-10">
         {/* Basic Details Section */}
         <div className="col-span-12 lg:col-span-8 space-y-8">
            <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-8">
               <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary">
                     <School size={24} />
                  </div>
                  <div>
                     <h2 className="text-xl font-black text-typography uppercase tracking-tight leading-none">Identity Core</h2>
                     <p className="text-[10px] font-bold text-secondary/40 uppercase tracking-widest mt-1">Official naming and localization</p>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-8">
                  <div className="col-span-2 space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-secondary/40 ml-1">Full Institution Name</label>
                     <input 
                       className="w-full bg-gray-50 border-0 px-6 py-4 rounded-2xl text-[13px] font-bold outline-none focus:ring-2 focus:ring-primary/10 transition-all text-typography"
                       placeholder="e.g. Indian Institute of Technology Delhi"
                       value={formData.name}
                       onChange={(e) => setFormData({...formData, name: e.target.value, slug: e.target.value.toLowerCase().split(' ').join('-')})}
                     />
                  </div>

                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-secondary/40 ml-1">Unique Slug</label>
                     <input 
                       className="w-full bg-gray-50 border-0 px-6 py-4 rounded-2xl text-[13px] font-bold outline-none focus:ring-2 focus:ring-primary/10 transition-all text-secondary/40 font-mono"
                       placeholder="iit-delhi"
                       value={formData.slug}
                       readOnly
                     />
                  </div>

                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-secondary/40 ml-1">Establishment Year</label>
                     <input 
                       className="w-full bg-gray-50 border-0 px-6 py-4 rounded-2xl text-[13px] font-bold outline-none focus:ring-2 focus:ring-primary/10 transition-all text-typography"
                       placeholder="e.g. 1961"
                       value={formData.established_year}
                       onChange={(e) => setFormData({...formData, established_year: e.target.value})}
                     />
                  </div>

                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-secondary/40 ml-1">City</label>
                     <div className="relative">
                        <MapPin size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-secondary/20" />
                        <input 
                          className="w-full bg-gray-50 border-0 pl-14 pr-6 py-4 rounded-2xl text-[13px] font-bold outline-none focus:ring-2 focus:ring-primary/10 transition-all text-typography"
                          placeholder="Mumbai"
                          value={formData.city}
                          onChange={(e) => setFormData({...formData, city: e.target.value})}
                        />
                     </div>
                  </div>

                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-secondary/40 ml-1">State</label>
                     <input 
                       className="w-full bg-gray-50 border-0 px-6 py-4 rounded-2xl text-[13px] font-bold outline-none focus:ring-2 focus:ring-primary/10 transition-all text-typography"
                       placeholder="Maharashtra"
                       value={formData.state}
                       onChange={(e) => setFormData({...formData, state: e.target.value})}
                     />
                  </div>
               </div>
            </div>

            <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-8">
               <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500">
                     <BadgeCheck size={24} />
                  </div>
                  <div>
                     <h2 className="text-xl font-black text-typography uppercase tracking-tight leading-none">Accreditation & Rank</h2>
                     <p className="text-[10px] font-bold text-secondary/40 uppercase tracking-widest mt-1">Institutional verification metrics</p>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-secondary/40 ml-1">Institution Type</label>
                     <select 
                       className="w-full bg-gray-50 border-0 px-6 py-4 rounded-2xl text-[13px] font-bold outline-none focus:ring-2 focus:ring-primary/10 transition-all text-typography appearance-none"
                       value={formData.type}
                       onChange={(e) => setFormData({...formData, type: e.target.value})}
                     >
                        <option value="PRIVATE">Private</option>
                        <option value="GOVERNMENT">Government</option>
                        <option value="DEEMED">Deemed</option>
                        <option value="AUTONOMOUS">Autonomous</option>
                     </select>
                  </div>

                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-secondary/40 ml-1">NAAC Grade</label>
                     <input 
                       className="w-full bg-gray-50 border-0 px-6 py-4 rounded-2xl text-[13px] font-bold outline-none focus:ring-2 focus:ring-primary/10 transition-all text-typography"
                       placeholder="e.g. A++"
                       value={formData.naac_grade}
                       onChange={(e) => setFormData({...formData, naac_grade: e.target.value})}
                     />
                  </div>

                  <div className="col-span-2 space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-secondary/40 ml-1">Approval Bodies (Comma separated)</label>
                     <input 
                       className="w-full bg-gray-50 border-0 px-6 py-4 rounded-2xl text-[13px] font-bold outline-none focus:ring-2 focus:ring-primary/10 transition-all text-typography"
                       placeholder="AICTE, UGC, NBA"
                       value={formData.approval_bodies}
                       onChange={(e) => setFormData({...formData, approval_bodies: e.target.value})}
                     />
                  </div>
               </div>
            </div>
         </div>

         {/* Sidebar Controls */}
         <div className="col-span-12 lg:col-span-4 space-y-6">
            <div className="bg-primary p-10 rounded-[2.5rem] text-white shadow-2xl shadow-primary/20">
               <div className="flex items-center space-x-3 mb-6">
                  <Info size={18} className="text-white/40" />
                  <h3 className="text-xs font-black uppercase tracking-widest">Protocol Intelligence</h3>
               </div>
               <p className="text-sm font-bold text-white/60 leading-relaxed mb-8">
                  Ensure all information matches official NAAC/NIRF records. Profiles are audited before going live to students.
               </p>
               <div className="space-y-4">
                  <div className="flex items-center space-x-3 group cursor-help">
                     <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 group-hover:scale-150 transition-transform" />
                     <span className="text-[10px] font-black uppercase tracking-widest">Auto-Slug Generation</span>
                  </div>
                  <div className="flex items-center space-x-3 group cursor-help">
                     <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 group-hover:scale-150 transition-transform" />
                     <span className="text-[10px] font-black uppercase tracking-widest">Real-time DB Sync</span>
                  </div>
                  <div className="flex items-center space-x-3 group cursor-help opacity-40">
                     <div className="w-1.5 h-1.5 rounded-full bg-white group-hover:scale-150 transition-transform" />
                     <span className="text-[10px] font-black uppercase tracking-widest">MeiliSearch Indexing...</span>
                  </div>
               </div>
            </div>

            <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
               <h3 className="text-xs font-black uppercase tracking-widest text-secondary/40 mb-6 flex items-center space-x-3">
                  <GraduationCap size={16} />
                  <span>Onboarding Steps</span>
               </h3>
               <div className="space-y-6">
                  {[
                    { label: "Identity Core", status: "Active" },
                    { label: "Accreditation", status: "Active" },
                    { label: "Course Mapping", status: "Pending" },
                    { label: "Media Assets", status: "Locked" },
                    { label: "Final verification", status: "Locked" }
                  ].map((step, i) => (
                    <div key={i} className="flex items-center justify-between group">
                       <span className={cn(
                         "text-[11px] font-black uppercase tracking-widest",
                         step.status === "Active" ? "text-primary" : "text-secondary/20"
                       )}>{step.label}</span>
                       <div className={cn(
                         "text-[9px] font-black uppercase tracking-tighter px-2 py-0.5 rounded-full border",
                         step.status === "Active" ? "bg-primary/5 border-primary/20 text-primary" : "bg-gray-50 border-gray-100 text-secondary/20"
                       )}>
                          {step.status}
                       </div>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </form>
    </div>
  );
}
