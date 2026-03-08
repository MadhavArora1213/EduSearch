"use client";

import { useState, useEffect } from "react";
import { 
  GraduationCap, 
  Globe, 
  Search, 
  Filter, 
  ChevronRight, 
  Upload, 
  Download, 
  Plus, 
  MoreVertical, 
  CheckCircle2, 
  AlertCircle, 
  MapPin, 
  DollarSign, 
  BookOpen, 
  ExternalLink, 
  Zap, 
  Building2,
  TrendingUp,
  History as HistoryIcon,
  HardDrive,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";

interface University {
  id: string;
  name: string;
  country: string;
  city: string;
  qs_rank: number;
  acceptance: number;
  tuition_usd: number;
  ielts_min: number;
  status: 'ACTIVE' | 'PAUSED';
  is_partner: boolean;
}

export default function UniversityCMSPage() {
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [exchangeRate, setExchangeRate] = useState(82.5); // Mock rate (INR/USD)
  const [searchTerm, setSearchTerm] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchUniversities();
  }, []);

  const fetchUniversities = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/study-abroad/universities");
      const data = await res.json();
      setUniversities(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (usd: number) => {
    if (!mounted) return `$${usd.toLocaleString()}`;
    const inr = usd * exchangeRate;
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(inr);
  };

  if (!mounted) return null;

  return (
    <div className="space-y-6 font-montserrat">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-4 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-1.5 font-montserrat">
              <div className="bg-primary/5 px-3 py-1.5 rounded-xl border border-primary/10">
                 <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary lowercase">Institution Nexus</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30 uppercase tracking-widest text-[10px]">Study Abroad CMS</span>
           </div>
           <h1 className="text-3xl md:text-4xl font-black text-typography tracking-tighter leading-none mb-1">
             University <span className="text-primary italic">Database</span>
           </h1>
           <p className="text-secondary/40 text-[10px] font-black uppercase tracking-[0.2em] mt-1.5 leading-none">
              Managing International Partner Profiles from Global Cluster
           </p>
        </div>
 
        <div className="flex items-center space-x-3">
           <button className="flex items-center space-x-2 px-6 py-2.5 bg-white border border-gray-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:text-primary transition-all shadow-sm">
              <Upload size={16} />
              <span>Bulk Import</span>
           </button>
           <button className="flex items-center space-x-2 px-6 py-2.5 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-primary/20">
              <Plus size={16} />
              <span>New Unit</span>
           </button>
        </div>
      </section>

      {/* Global Metadata & Exchange Hub */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
         <div className="md:col-span-2 bg-slate-900 p-4 rounded-xl text-white flex items-center justify-between overflow-hidden relative group border border-slate-800">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform duration-1000">
               <Globe size={100} className="text-primary" />
            </div>
            <div className="relative z-10 flex items-center space-x-6">
               <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center text-primary shadow-inner border border-primary/20">
                  <TrendingUp size={20} />
               </div>
               <div>
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1.5 leading-none">Exchange Registry (Redis)</p>
                  <h4 className="text-2xl font-black text-white tracking-tighter uppercase leading-none">1 USD = {exchangeRate} INR</h4>
               </div>
            </div>
            <div className="text-right relative z-10">
               <p className="text-emerald-500 text-[8px] font-black uppercase tracking-widest animate-pulse">Sync Active</p>
               <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mt-1">42m ago</p>
            </div>
         </div>
 
         {[
           { label: "Global Nodes", value: universities.length, trend: "Live Count", icon: Building2, color: "text-primary bg-primary/5" },
           { label: "Partner Yield", value: "12.8%", trend: "High", icon: GraduationCap, color: "text-emerald-500 bg-emerald-50" },
         ].map((kpi, i) => (
           <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between group hover:shadow-md transition-all cursor-pointer">
              <div>
                 <p className="text-[9px] font-bold text-secondary/30 uppercase tracking-[0.1em] mb-1.5 leading-none">{kpi.label}</p>
                 <p className="text-2xl font-black text-typography tracking-tighter leading-none">{kpi.value.toLocaleString()}</p>
                 <span className="inline-block mt-2 text-[8px] font-black text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full uppercase tracking-widest">{kpi.trend}</span>
              </div>
              <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center transition-all group-hover:scale-105 shadow-inner", kpi.color)}>
                 <kpi.icon size={18} />
              </div>
           </div>
         ))}
      </div>

      {/* Main Listing */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col min-h-[400px]">
         <div className="p-4 border-b border-gray-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-snow-pearl/30">
            <div className="relative flex-1 max-w-xl">
               <Search size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-secondary/20" />
               <input 
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 placeholder="Search global directory..." 
                 className="w-full bg-white border border-transparent pl-12 pr-6 py-2.5 rounded-xl text-[13px] font-bold outline-none focus:ring-4 focus:ring-primary/5 shadow-sm" 
               />
            </div>
            <div className="flex items-center space-x-3 w-full lg:w-auto justify-between lg:justify-end">
               <button className="w-9 h-9 bg-white border border-gray-100 rounded-xl flex items-center justify-center text-secondary/20 hover:text-primary transition-all shadow-sm"><Filter size={14} /></button>
               <button className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-all shadow-lg shadow-slate-900/10">Export Ledger</button>
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
                     <th className="px-6 py-3 text-[9px] font-black uppercase tracking-[0.2em] text-secondary/40">Institution Profile</th>
                     <th className="px-6 py-3 text-[9px] font-black uppercase tracking-[0.2em] text-secondary/40 text-center">QS Rank</th>
                     <th className="px-6 py-3 text-[9px] font-black uppercase tracking-[0.2em] text-secondary/40 text-center">Acceptance</th>
                     <th className="px-6 py-3 text-[9px] font-black uppercase tracking-[0.2em] text-secondary/40 text-center">IELTS</th>
                     <th className="px-6 py-3 text-[9px] font-black uppercase tracking-[0.2em] text-secondary/40 text-right">Avg. Tuition (INR)</th>
                     <th className="px-6 py-3 text-[9px] font-black uppercase tracking-[0.2em] text-secondary/40 text-right">Commit State</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-50">
                  {universities.length === 0 && !loading && (
                    <tr>
                      <td colSpan={6} className="px-10 py-20 text-center text-secondary/30 font-black uppercase tracking-widest text-[10px]">No Partner Universities Sequenced from Registry Node</td>
                    </tr>
                  )}
                  {universities.filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase())).map((uni) => (
                    <tr key={uni.id} className="group hover:bg-gray-50/50 transition-all">
                       <td className="px-6 py-3">
                          <div className="flex items-center space-x-4">
                             <div className={cn(
                               "w-10 h-10 rounded-xl flex items-center justify-center transition-all group-hover:bg-primary group-hover:text-white border border-gray-100 shadow-sm",
                               uni.is_partner ? "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100" : "bg-gray-50 text-secondary/10"
                             )}>
                                <Building2 size={18} />
                             </div>
                             <div>
                                <h4 className="text-[13px] font-black text-typography uppercase tracking-tight group-hover:text-primary transition-colors flex items-center space-x-1.5 leading-none">
                                   <span>{uni.name}</span>
                                   {uni.is_partner && <Zap size={10} className="text-emerald-500 fill-current" />}
                                </h4>
                                <div className="flex items-center space-x-2 text-[8px] font-black text-secondary/30 uppercase tracking-widest mt-1.5 leading-none">
                                   <MapPin size={10} className="text-primary/40" />
                                   <span>{uni.city}, {uni.country}</span>
                                   <div className="w-1 h-1 bg-secondary/10 rounded-full" />
                                   <span className={uni.is_partner ? "text-emerald-500" : ""}>{uni.is_partner ? 'Revenue Partner' : 'Listed'}</span>
                                </div>
                             </div>
                          </div>
                       </td>
                       <td className="px-6 py-3 text-center">
                          <p className="text-lg font-black text-typography tracking-tighter leading-none">#{uni.qs_rank || '?'}</p>
                          <p className="text-[8px] font-black text-secondary/20 uppercase tracking-widest mt-1">Global Rank</p>
                       </td>
                       <td className="px-6 py-3 text-center">
                          <div className="inline-flex flex-col items-center">
                             <span className="text-[13px] font-black text-typography tracking-tighter leading-none">{uni.acceptance || 0}%</span>
                             <div className="w-10 h-1 bg-gray-100 rounded-xl mt-1.5 overflow-hidden">
                                <div className="h-full bg-primary" style={{ width: `${uni.acceptance || 0}%` }} />
                             </div>
                          </div>
                       </td>
                       <td className="px-6 py-3 text-center">
                          <div className="flex items-center justify-center space-x-1.5 text-[12px] font-black text-indigo-600 leading-none">
                             <BookOpen size={12} />
                             <span>{(Number(uni.ielts_min) || 0).toFixed(1)}</span>
                          </div>
                          <p className="text-[8px] font-black text-secondary/20 uppercase tracking-widest mt-1">Band Req.</p>
                       </td>
                       <td className="px-6 py-3 text-right">
                          <p className="text-[13px] font-black text-typography tracking-tighter leading-none">{formatCurrency(uni.tuition_usd || 0)}</p>
                          <p className="text-[8px] font-black text-secondary/30 uppercase tracking-widest mt-1 group-hover:text-primary transition-colors leading-none">${(uni.tuition_usd || 0).toLocaleString()} USD</p>
                       </td>
                       <td className="px-6 py-3 text-right">
                          <div className="flex items-center justify-end space-x-2">
                             <span className={cn(
                               "px-2.5 py-1 rounded-xl text-[8px] font-black uppercase tracking-widest border transition-all",
                               uni.status === 'ACTIVE' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-rose-50 text-rose-600 border-rose-100"
                             )}>
                                {uni.status}
                             </span>
                             <button className="w-8 h-8 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center text-secondary/40 hover:bg-primary hover:text-white transition-all shadow-sm">
                                <ChevronRight size={14} />
                             </button>
                          </div>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>

         <div className="p-3 border-t border-gray-100 flex items-center justify-between bg-snow-pearl/30 relative overflow-hidden font-montserrat">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform duration-1000">
               <HardDrive size={80} className="text-primary" />
            </div>
            <div className="flex items-center space-x-4 relative z-10">
               <HistoryIcon size={14} className="text-secondary/20" />
               <p className="text-[9px] font-black text-secondary/30 uppercase tracking-[0.2em]">Global Exchange Registry v2.1 • USD/INR Batch Sync</p>
            </div>
            <div className="flex items-center space-x-2 relative z-10 font-montserrat">
               <button className="px-4 py-2 bg-white border border-gray-100 rounded-xl text-[9px] font-black uppercase tracking-widest text-secondary/40 hover:text-primary transition-all shadow-sm">Prev</button>
               <button className="w-8 h-8 bg-primary text-white rounded-xl flex items-center justify-center text-[10px] font-black shadow-lg shadow-primary/20">1</button>
               <button className="px-4 py-2 bg-white border border-gray-100 rounded-xl text-[9px] font-black uppercase tracking-widest text-secondary/40 hover:text-primary transition-all shadow-sm">Next</button>
            </div>
         </div>
      </section>
    </div>
  );
}
