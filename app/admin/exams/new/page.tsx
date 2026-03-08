"use client";

import { useState } from "react";
import { 
  Plus, 
  Search, 
  MapPin, 
  School, 
  Save, 
  ArrowLeft,
  ChevronRight,
  Info,
  Globe,
  Calendar,
  Layers,
  Link2
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function NewExamPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    full_name: "",
    level: "NATIONAL",
    mode: "ONLINE",
    exam_date: "",
    result_date: "",
    application_link: "",
  });

  const generateSlug = () => {
    if (!formData.name) return;
    const slug = formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    setFormData(prev => ({ ...prev, slug }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Formatting payload
    const payload = {
       ...formData,
       exam_date: formData.exam_date ? new Date(formData.exam_date).toISOString() : null,
       result_date: formData.result_date ? new Date(formData.result_date).toISOString() : null,
    };

    try {
      // Typically goes to your API
      // const res = await fetch("/api/admin/exams", { ... });
      
      // Simulating API latency
      setTimeout(() => {
         alert("Exam Profile Created Successfully!");
         router.push("/admin/exams");
         setLoading(false);
      }, 1000);
      
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10 max-w-4xl pb-20">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-6 border-b border-gray-100">
         <div>
           <div className="flex items-center space-x-3 mb-2">
              <Link href="/admin/exams" className="bg-primary/5 px-3 py-1.5 rounded-xl border border-primary/10 hover:bg-primary/10 transition-colors flex items-center space-x-2">
                 <ArrowLeft size={14} className="text-primary" />
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary">Exam Registry</span>
              </Link>
           </div>
           <h1 className="text-3xl md:text-3xl md:text-5xl font-black text-typography tracking-tighter leading-none mb-1">
             Register <span className="text-primary italic">Exam</span>
           </h1>
           <p className="text-secondary/40 text-sm font-bold uppercase tracking-widest mt-2">
              Add a new entrance test to the global database
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
              <span>Initialize Record</span>
           </button>
        </div>
      </section>

      {/* Form Context */}
      <form className="grid grid-cols-12 gap-10">
         <div className="col-span-12 lg:col-span-8 space-y-8">
            <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-8">
               <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary">
                     <Layers size={24} />
                  </div>
                  <div>
                     <h2 className="text-xl font-black text-typography uppercase tracking-tight leading-none">Examination Core</h2>
                     <p className="text-[10px] font-bold text-secondary/40 uppercase tracking-widest mt-1">Official nomenclature & identifiers</p>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-8">
                  <div className="col-span-1 space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-secondary/40 ml-1">Short Name/Acronym</label>
                     <input 
                       className="w-full bg-gray-50 border-0 px-6 py-4 rounded-2xl text-[13px] font-bold outline-none focus:ring-2 focus:ring-primary/10 transition-all text-typography"
                       placeholder="e.g. JEE Main"
                       value={formData.name}
                       onChange={(e) => setFormData({...formData, name: e.target.value})}
                       onBlur={generateSlug}
                     />
                  </div>

                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-secondary/40 ml-1">System Slug</label>
                     <input 
                       className="w-full bg-gray-50 border border-gray-100/50 bg-gray-50/50 px-6 py-4 rounded-2xl text-[13px] font-bold outline-none text-secondary/40 font-mono"
                       placeholder="jee-main"
                       value={formData.slug}
                       readOnly
                     />
                  </div>

                  <div className="col-span-2 space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-secondary/40 ml-1">Full Examination Name</label>
                     <input 
                       className="w-full bg-gray-50 border-0 px-6 py-4 rounded-2xl text-[13px] font-bold outline-none focus:ring-2 focus:ring-primary/10 transition-all text-typography"
                       placeholder="e.g. Joint Entrance Examination Main"
                       value={formData.full_name}
                       onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                     />
                  </div>
               </div>
            </div>

            <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-8">
               <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-sky-50 rounded-2xl flex items-center justify-center text-sky-500">
                     <Globe size={24} />
                  </div>
                  <div>
                     <h2 className="text-xl font-black text-typography uppercase tracking-tight leading-none">Logistics & Dates</h2>
                     <p className="text-[10px] font-bold text-secondary/40 uppercase tracking-widest mt-1">Schedules and operational details</p>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-secondary/40 ml-1">Exam Level</label>
                     <select 
                       className="w-full bg-gray-50 border-0 px-6 py-4 rounded-2xl text-[13px] font-bold outline-none focus:ring-2 focus:ring-primary/10 transition-all text-typography appearance-none"
                       value={formData.level}
                       onChange={(e) => setFormData({...formData, level: e.target.value})}
                     >
                        <option value="NATIONAL">National Level</option>
                        <option value="STATE">State Level</option>
                        <option value="UNIVERSITY">University Level</option>
                     </select>
                  </div>

                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-secondary/40 ml-1">Examination Mode</label>
                     <input 
                       className="w-full bg-gray-50 border-0 px-6 py-4 rounded-2xl text-[13px] font-bold outline-none focus:ring-2 focus:ring-primary/10 transition-all text-typography"
                       placeholder="e.g. CBT (Online), Pen & Paper"
                       value={formData.mode}
                       onChange={(e) => setFormData({...formData, mode: e.target.value})}
                     />
                  </div>

                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-secondary/40 ml-1">Date of Examination</label>
                     <div className="relative">
                        <Calendar size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-secondary/20" />
                        <input 
                          type="date"
                          className="w-full bg-gray-50 border-0 pl-14 pr-6 py-4 rounded-2xl text-[13px] font-bold outline-none focus:ring-2 focus:ring-primary/10 transition-all text-typography"
                          value={formData.exam_date}
                          onChange={(e) => setFormData({...formData, exam_date: e.target.value})}
                        />
                     </div>
                  </div>

                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-secondary/40 ml-1">Expected Result Date</label>
                     <div className="relative">
                        <Calendar size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-secondary/20" />
                        <input 
                          type="date"
                          className="w-full bg-gray-50 border-0 pl-14 pr-6 py-4 rounded-2xl text-[13px] font-bold outline-none focus:ring-2 focus:ring-primary/10 transition-all text-typography"
                          value={formData.result_date}
                          onChange={(e) => setFormData({...formData, result_date: e.target.value})}
                        />
                     </div>
                  </div>

                  <div className="col-span-2 space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-secondary/40 ml-1">Official Application Portal</label>
                     <div className="relative">
                        <Link2 size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-secondary/20" />
                        <input 
                          className="w-full bg-gray-50 border-0 pl-14 pr-6 py-4 rounded-2xl text-[13px] font-bold outline-none focus:ring-2 focus:ring-primary/10 transition-all text-typography"
                          placeholder="https://admissions.exam.org"
                          value={formData.application_link}
                          onChange={(e) => setFormData({...formData, application_link: e.target.value})}
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
                  <h3 className="text-xs font-black uppercase tracking-widest">System Triggers</h3>
               </div>
               <p className="text-sm font-bold text-white/60 leading-relaxed mb-8">
                  Setting the Result Date directly integrates with BullMQ workflows for mass SMS and Email notifications.
               </p>
            </div>
         </div>
      </form>
    </div>
  );
}
