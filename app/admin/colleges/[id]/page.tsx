"use client";

import { useState } from "react";
import { 
  ArrowLeft,
  Save,
  Globe,
  Info,
  BookOpen,
  GraduationCap,
  TrendingUp,
  MessageSquare,
  Building2,
  Image as ImageIcon,
  Share2,
  Search,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";

const tabs = [
  { id: "core", label: "Core Info", icon: Info },
  { id: "courses", label: "Courses & Fees", icon: BookOpen },
  { id: "admission", label: "Admission & Cutoffs", icon: GraduationCap },
  { id: "placement", label: "Placement Stats", icon: TrendingUp },
  { id: "reviews", label: "Reviews & Ratings", icon: MessageSquare },
  { id: "facilities", label: "Facilities", icon: Building2 },
  { id: "media", label: "Gallery & Media", icon: ImageIcon },
  { id: "social", label: "Contact & Social", icon: Share2 },
  { id: "seo", label: "SEO & Meta", icon: Search },
];

export default function CollegeEditPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("core");
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Sticky Header */}
      <section className="sticky top-0 z-40 bg-white/80 backdrop-blur-md -mx-8 px-8 py-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0 shadow-sm">
        <div className="flex items-center space-x-6">
           <Link href="/admin/colleges" className="w-12 h-12 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center hover:bg-white transition-all shadow-sm group">
              <ArrowLeft size={18} className="text-secondary/40 group-hover:text-primary transition-colors" />
           </Link>
           <div>
              <div className="flex items-center space-x-2 mb-1">
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/5 px-2 py-0.5 rounded-full border border-primary/10">Editing Profile</span>
                 <span className="text-[10px] font-black uppercase tracking-widest text-secondary/40">ID: {id}</span>
              </div>
              <h1 className="text-3xl font-black text-typography tracking-tighter leading-none">
                 Indian Institute of <span className="text-primary italic">Technology</span> Delhi
              </h1>
           </div>
        </div>

        <div className="flex items-center space-x-4">
           <button className="px-6 py-3 bg-white border border-gray-100 rounded-2xl text-[11px] font-black uppercase tracking-widest text-secondary/60 hover:bg-gray-50 transition-all flex items-center space-x-2">
              <Globe size={16} />
              <span>Preview Live</span>
           </button>
           <button 
             onClick={handleSave}
             disabled={loading}
             className="px-8 py-4 bg-primary text-white rounded-2xl text-[11px] font-black uppercase tracking-widest flex items-center space-x-3 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20 disabled:opacity-50"
           >
              {loading ? <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <Save size={18} />}
              <span>Commit Changes</span>
           </button>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="grid grid-cols-12 gap-8">
         {/* Navigation Sidebar (Vertical Tabs) */}
         <div className="col-span-12 lg:col-span-3 space-y-2">
            <div className="bg-white p-4 rounded-[2rem] border border-gray-50 shadow-sm sticky top-32">
               {tabs.map((tab) => (
                 <button
                   key={tab.id}
                   onClick={() => setActiveTab(tab.id)}
                   className={cn(
                     "w-full flex items-center space-x-3 px-6 py-4 rounded-2xl text-[12px] font-black uppercase tracking-wider transition-all",
                     activeTab === tab.id 
                       ? "bg-primary text-white shadow-xl shadow-primary/20" 
                       : "text-secondary/40 hover:bg-gray-50 hover:text-secondary/60"
                   )}
                 >
                   <tab.icon size={18} />
                   <span>{tab.label}</span>
                 </button>
               ))}
               
               <div className="mt-8 pt-8 border-t border-gray-50 px-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary/20 mb-4 text-center">Data Integrity Score</p>
                  <div className="h-2 w-full bg-gray-50 rounded-full overflow-hidden mb-2">
                     <div className="h-full bg-emerald-500 rounded-full" style={{width: '92%'}} />
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-bold text-secondary/40">
                     <span>92% Accurate</span>
                     <CheckCircle2 size={12} className="text-emerald-500" />
                  </div>
               </div>
            </div>
         </div>

         {/* Form Content */}
         <div className="col-span-12 lg:col-span-9 space-y-8">
            {activeTab === "core" && (
               <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="bg-white p-12 rounded-[3rem] border border-gray-50 shadow-sm space-y-10">
                     <div className="flex items-center space-x-4">
                        <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center text-primary">
                           <Info size={28} />
                        </div>
                        <div>
                           <h2 className="text-2xl font-black text-typography uppercase tracking-tight">Identity & Localization</h2>
                           <p className="text-[10px] font-bold text-secondary/40 uppercase tracking-widest mt-1">Foundational data for global discovery</p>
                        </div>
                     </div>

                     <div className="grid grid-cols-2 gap-10">
                        <div className="col-span-2 space-y-3">
                           <label className="text-[10px] font-black uppercase tracking-widest text-secondary/40 ml-1">Official Name (English)</label>
                           <input defaultValue="Indian Institute of Technology Delhi" className="w-full bg-gray-50 border-0 px-8 py-5 rounded-[1.5rem] text-[15px] font-bold text-typography focus:ring-4 focus:ring-primary/5 outline-none transition-all placeholder:text-secondary/20" />
                        </div>

                        <div className="space-y-3">
                           <label className="text-[10px] font-black uppercase tracking-widest text-secondary/40 ml-1">Slug / URL Handle</label>
                           <input defaultValue="iit-delhi" className="w-full bg-gray-50 border-0 px-8 py-5 rounded-[1.5rem] text-[15px] font-bold text-secondary/30 font-mono focus:ring-4 focus:ring-primary/5 outline-none transition-all" readOnly />
                        </div>

                        <div className="space-y-3">
                           <label className="text-[10px] font-black uppercase tracking-widest text-secondary/40 ml-1">Short Name/Acronym</label>
                           <input defaultValue="IITD" className="w-full bg-gray-50 border-0 px-8 py-5 rounded-[1.5rem] text-[15px] font-bold text-typography focus:ring-4 focus:ring-primary/5 outline-none transition-all" />
                        </div>

                        <div className="space-y-3">
                           <label className="text-[10px] font-black uppercase tracking-widest text-secondary/40 ml-1">Institute Type</label>
                           <select className="w-full bg-gray-50 border-0 px-8 py-5 rounded-[1.5rem] text-[15px] font-bold text-typography focus:ring-4 focus:ring-primary/5 outline-none transition-all appearance-none">
                              <option>PUBLIC / GOVERNMENT</option>
                              <option>PRIVATE</option>
                              <option>DEEMED</option>
                           </select>
                        </div>

                        <div className="space-y-3">
                           <label className="text-[10px] font-black uppercase tracking-widest text-secondary/40 ml-1">Establishment Year</label>
                           <input defaultValue="1961" className="w-full bg-gray-50 border-0 px-8 py-5 rounded-[1.5rem] text-[15px] font-bold text-typography focus:ring-4 focus:ring-primary/5 outline-none transition-all" />
                        </div>
                     </div>
                  </div>

                  <div className="bg-white p-12 rounded-[3rem] border border-gray-50 shadow-sm space-y-10">
                     <div className="flex items-center space-x-4">
                        <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500">
                           <CheckCircle2 size={28} />
                        </div>
                        <div>
                           <h2 className="text-2xl font-black text-typography uppercase tracking-tight">Accreditation & Ranking</h2>
                           <p className="text-[10px] font-bold text-secondary/40 uppercase tracking-widest mt-1">Official scores and verified grades</p>
                        </div>
                     </div>

                     <div className="grid grid-cols-2 gap-10">
                        <div className="space-y-3">
                           <label className="text-[10px] font-black uppercase tracking-widest text-secondary/40 ml-1">NAAC Grade</label>
                           <input defaultValue="A++" className="w-full bg-gray-50 border-0 px-8 py-5 rounded-[1.5rem] text-[15px] font-bold text-typography focus:ring-4 focus:ring-primary/5 outline-none transition-all" />
                        </div>

                        <div className="space-y-3">
                           <label className="text-[10px] font-black uppercase tracking-widest text-secondary/40 ml-1">NIRF Rank (Current)</label>
                           <input defaultValue="#2 (Engineering)" className="w-full bg-gray-50 border-0 px-8 py-5 rounded-[1.5rem] text-[15px] font-bold text-typography focus:ring-4 focus:ring-primary/5 outline-none transition-all" />
                        </div>
                     </div>
                  </div>
               </div>
            )}

            {activeTab !== "core" && (
               <div className="bg-white/40 border border-dashed border-gray-200 p-20 rounded-[3rem] flex flex-col items-center justify-center text-center space-y-6">
                  <div className="w-20 h-20 bg-white rounded-[2rem] shadow-sm flex items-center justify-center text-secondary/20">
                     <AlertCircle size={40} />
                  </div>
                  <div>
                     <h3 className="text-xl font-black text-typography uppercase tracking-tight">Module Under Construction</h3>
                     <p className="text-secondary/40 text-[10px] font-bold uppercase tracking-widest mt-2">{activeTab.toUpperCase()} configuration pane is being optimized</p>
                  </div>
               </div>
            )}
         </div>
      </div>
    </div>
  );
}
