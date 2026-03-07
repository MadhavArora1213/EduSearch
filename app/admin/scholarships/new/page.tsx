"use client";

import { useState } from "react";
import { 
  Plus, 
  Search, 
  Wallet, 
  Award, 
  Save, 
  ArrowLeft,
  ChevronRight,
  Info,
  Calendar,
  Percent,
  Banknote,
  Link2,
  FileText
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function NewScholarshipPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "GOVERNMENT",
    target_category: "",
    income_limit: "",
    merit_percentage_min: "",
    amount_description: "",
    about_scholarship: "",
    application_link: "",
    deadline: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API Saving
    setTimeout(() => {
       alert("Financial Aid scheme added successfully!");
       router.push("/admin/scholarships");
       setLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-10 max-w-4xl pb-20">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-6 border-b border-gray-100">
         <div>
           <div className="flex items-center space-x-3 mb-2">
              <Link href="/admin/scholarships" className="bg-primary/5 px-3 py-1.5 rounded-xl border border-primary/10 hover:bg-primary/10 transition-colors flex items-center space-x-2">
                 <ArrowLeft size={14} className="text-primary" />
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary">Financial Aid</span>
              </Link>
           </div>
           <h1 className="text-5xl font-black text-typography tracking-tighter leading-none mb-1">
             New <span className="text-primary italic">Scholarship</span>
           </h1>
           <p className="text-secondary/40 text-sm font-bold uppercase tracking-widest mt-2">
              Add a grant or financial aid program
           </p>
        </div>

        <div className="flex items-center space-x-4">
           <button 
             onClick={handleSave}
             disabled={loading}
             className="flex items-center space-x-3 px-10 py-5 bg-primary text-white rounded-3xl text-[11px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20 disabled:opacity-50"
           >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <Save size={18} />
              )}
              <span>Publish Scheme</span>
           </button>
        </div>
      </section>

      {/* Form Context */}
      <form className="grid grid-cols-12 gap-10">
         <div className="col-span-12 lg:col-span-8 space-y-8">
            <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-8">
               <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary">
                     <Award size={24} />
                  </div>
                  <div>
                     <h2 className="text-xl font-black text-typography uppercase tracking-tight leading-none">Scheme Core</h2>
                     <p className="text-[10px] font-bold text-secondary/40 uppercase tracking-widest mt-1">Identity and categorization</p>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-8">
                  <div className="col-span-2 space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-secondary/40 ml-1">Official Name of Scheme</label>
                     <input 
                       name="name"
                       className="w-full bg-gray-50 border-0 px-6 py-4 rounded-2xl text-[13px] font-bold outline-none focus:ring-2 focus:ring-primary/10 transition-all text-typography"
                       placeholder="e.g. PM Vidyalaxmi Scheme 2024"
                       value={formData.name}
                       onChange={handleChange}
                     />
                  </div>

                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-secondary/40 ml-1">Funding Category</label>
                     <select 
                       name="category"
                       className="w-full bg-gray-50 border-0 px-6 py-4 rounded-2xl text-[13px] font-bold outline-none focus:ring-2 focus:ring-primary/10 transition-all text-typography appearance-none"
                       value={formData.category}
                       onChange={handleChange}
                     >
                        <option value="GOVERNMENT">Government</option>
                        <option value="PRIVATE">Private / Corporate</option>
                        <option value="INSTITUTIONAL">Institutional</option>
                     </select>
                  </div>

                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-secondary/40 ml-1">Caste/Target Category (Optional)</label>
                     <input 
                       name="target_category"
                       className="w-full bg-gray-50 border-0 px-6 py-4 rounded-2xl text-[13px] font-bold outline-none focus:ring-2 focus:ring-primary/10 transition-all text-typography"
                       placeholder="e.g. SC/ST/OBC Only"
                       value={formData.target_category}
                       onChange={handleChange}
                     />
                  </div>
               </div>
            </div>

            <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-8">
               <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500">
                     <Banknote size={24} />
                  </div>
                  <div>
                     <h2 className="text-xl font-black text-typography uppercase tracking-tight leading-none">Financials & Eligibility</h2>
                     <p className="text-[10px] font-bold text-secondary/40 uppercase tracking-widest mt-1">Rules required to match students</p>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-secondary/40 ml-1">Max Annual Family Income (₹)</label>
                     <div className="relative">
                        <Wallet size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-secondary/20" />
                        <input 
                          type="number"
                          name="income_limit"
                          className="w-full bg-gray-50 border-0 pl-14 pr-6 py-4 rounded-2xl text-[13px] font-bold outline-none focus:ring-2 focus:ring-primary/10 transition-all text-typography"
                          placeholder="e.g. 250000"
                          value={formData.income_limit}
                          onChange={handleChange}
                        />
                     </div>
                  </div>

                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-secondary/40 ml-1">Minimum Merit (%)</label>
                     <div className="relative">
                        <Percent size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-secondary/20" />
                        <input 
                          type="number"
                          step="0.01"
                          name="merit_percentage_min"
                          className="w-full bg-gray-50 border-0 pl-14 pr-6 py-4 rounded-2xl text-[13px] font-bold outline-none focus:ring-2 focus:ring-primary/10 transition-all text-typography"
                          placeholder="e.g. 75.50"
                          value={formData.merit_percentage_min}
                          onChange={handleChange}
                        />
                     </div>
                  </div>

                  <div className="col-span-2 space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-secondary/40 ml-1">Benefit/Amount Description</label>
                     <input 
                       name="amount_description"
                       className="w-full bg-gray-50 border-0 px-6 py-4 rounded-2xl text-[13px] font-bold outline-none focus:ring-2 focus:ring-primary/10 transition-all text-typography"
                       placeholder="e.g. ₹50,000 per year or 100% Tuition Waiver"
                       value={formData.amount_description}
                       onChange={handleChange}
                     />
                  </div>
               </div>
            </div>

            <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-8">
               <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-sky-50 rounded-2xl flex items-center justify-center text-sky-500">
                     <FileText size={24} />
                  </div>
                  <div>
                     <h2 className="text-xl font-black text-typography uppercase tracking-tight leading-none">Content & Links</h2>
                     <p className="text-[10px] font-bold text-secondary/40 uppercase tracking-widest mt-1">Details and external portals</p>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-8">
                  <div className="col-span-2 space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-secondary/40 ml-1">About Scholarship</label>
                     <textarea 
                       name="about_scholarship"
                       rows={4}
                       className="w-full bg-gray-50 border-0 px-6 py-4 rounded-2xl text-[13px] font-medium outline-none focus:ring-2 focus:ring-primary/10 transition-all text-typography resize-none"
                       placeholder="Provide full Markdown-supported details..."
                       value={formData.about_scholarship}
                       onChange={handleChange}
                     />
                  </div>

                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-secondary/40 ml-1">Application Deadline</label>
                     <div className="relative">
                        <Calendar size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-secondary/20" />
                        <input 
                          type="date"
                          name="deadline"
                          className="w-full bg-gray-50 border-0 pl-14 pr-6 py-4 rounded-2xl text-[13px] font-bold outline-none focus:ring-2 focus:ring-primary/10 transition-all text-typography"
                          value={formData.deadline}
                          onChange={handleChange}
                        />
                     </div>
                  </div>

                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-secondary/40 ml-1">Official Portal URL</label>
                     <div className="relative">
                        <Link2 size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-secondary/20" />
                        <input 
                          name="application_link"
                          className="w-full bg-gray-50 border-0 pl-14 pr-6 py-4 rounded-2xl text-[13px] font-bold outline-none focus:ring-2 focus:ring-primary/10 transition-all text-typography"
                          placeholder="https://scholarships.gov.in"
                          value={formData.application_link}
                          onChange={handleChange}
                        />
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <div className="col-span-12 lg:col-span-4 space-y-6">
            <div className="bg-primary p-10 rounded-[2.5rem] text-white shadow-2xl shadow-primary/20">
               <div className="flex items-center space-x-3 mb-6">
                  <Info size={18} className="text-white/40" />
                  <h3 className="text-xs font-black uppercase tracking-widest">Auto-Finder Protocol</h3>
               </div>
               <p className="text-sm font-bold text-white/60 leading-relaxed mb-8">
                  Rules configured here drive the matching engine for 10M+ students. Ensure merit and income thresholds are precise to avoid false eligibility matches.
               </p>
               <div className="p-4 bg-white/10 rounded-xl border border-white/10">
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-2">Notice</p>
                  <p className="text-xs font-medium">After publishing, you can manage specific eligibility rules using the Visual Rule Builder on the dashboard via the 'Manage Rules' UI.</p>
               </div>
            </div>
         </div>
      </form>
    </div>
  );
}
