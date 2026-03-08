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
    <div className="space-y-10 font-sans">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-6 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-2">
              <div className="bg-primary/5 px-3 py-1.5 rounded-xl border border-primary/10">
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary italic lowercase underline decoration-primary/10">Global Institution Nexus</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30">Study Abroad CMS</span>
           </div>
           <h1 className="text-5xl font-black text-typography tracking-tighter leading-none mb-1">
             University <span className="text-primary italic">Database</span>
           </h1>
           <p className="text-secondary/40 text-sm font-bold uppercase tracking-widest mt-2">
              Managing International Partner Profiles from Database Cluster
           </p>
        </div>

        <div className="flex items-center space-x-4">
           <button className="flex items-center space-x-2 px-6 py-4 bg-snow-pearl border border-gray-200 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:border-primary/20 transition-all text-secondary/40">
              <Upload size={18} />
              <span>Bulk CSV Import</span>
           </button>
           <button className="flex items-center space-x-2 px-8 py-4 bg-primary text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-primary/20">
              <Plus size={18} />
              <span>Provision New Unit</span>
           </button>
        </div>
      </section>

      {/* Global Metadata & Exchange Hub */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
         <div className="md:col-span-2 bg-slate-900 p-8 rounded-[2.5rem] text-white flex items-center justify-between overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-1000">
               <Globe size={100} className="text-primary" />
            </div>
            <div className="relative z-10 flex items-center space-x-8">
               <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center text-primary italic shadow-inner ring-1 ring-white/10">
                  <TrendingUp size={28} />
               </div>
               <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 italic underline decoration-primary/30">Exchange Rate Cache (Redis)</p>
                  <h4 className="text-3xl font-black text-white tracking-tighter italic">1 USD = {exchangeRate} INR</h4>
               </div>
            </div>
            <div className="text-right relative z-10">
               <p className="text-emerald-500 text-[10px] font-black uppercase tracking-widest animate-pulse italic underline">Sync Active</p>
               <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Last Poll: 42m ago</p>
            </div>
         </div>

         {[
           { label: "Active Global Nodes", value: universities.length, trend: "Live Count", icon: Building2, color: "text-primary bg-primary/5" },
           { label: "Partner Yield/Unit", value: "12.8%", trend: "High", icon: GraduationCap, color: "text-emerald-500 bg-emerald-50" },
         ].map((kpi, i) => (
           <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-50 shadow-sm flex items-center justify-between group hover:border-primary/20 transition-all cursor-pointer">
              <div>
                 <p className="text-[10px] font-bold text-secondary/30 uppercase tracking-widest italic mb-2 leading-none">{kpi.label}</p>
                 <p className="text-4xl font-black text-typography tracking-tighter leading-none">{kpi.value.toLocaleString()}</p>
                 <span className="inline-block mt-3 text-[10px] font-black text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full">{kpi.trend}</span>
              </div>
              <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 shadow-inner", kpi.color)}>
                 <kpi.icon size={26} />
              </div>
           </div>
         ))}
      </div>

      {/* Main Listing */}
      <section className="bg-white rounded-[3rem] border border-gray-50 shadow-sm overflow-hidden flex flex-col min-h-[400px]">
         <div className="p-10 border-b border-gray-50 flex items-center justify-between bg-snow-pearl/30 border-gray-100">
            <div className="relative flex-1 max-w-xl italic">
               <Search size={22} className="absolute left-6 top-1/2 -translate-y-1/2 text-secondary/20" />
               <input 
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 placeholder="Search University, Country, or QS Rank..." 
                 className="w-full bg-white border-0 pl-16 pr-8 py-5 rounded-3xl text-[14px] font-bold outline-none focus:ring-4 focus:ring-primary/5 transition-all shadow-inner" 
               />
            </div>
            <div className="flex items-center space-x-4 pl-10 italic">
               <button className="p-5 bg-white border border-gray-100 rounded-2xl text-secondary/20 hover:text-primary transition-all shadow-sm"><Filter size={20} /></button>
               <button className="px-10 py-5 bg-slate-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-primary transition-all shadow-xl shadow-slate-900/10 italic">Export Global Ledger</button>
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
                     <th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-secondary/40">Institution Profile</th>
                     <th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-secondary/40 text-center">QS Rank</th>
                     <th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-secondary/40 text-center">Acceptance Rate</th>
                     <th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-secondary/40">Min. IELTS</th>
                     <th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-secondary/40 text-right">Avg. Tuition (INR)</th>
                     <th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-secondary/40 text-right italic">Status & Commit</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-50 italic">
                  {universities.length === 0 && !loading && (
                    <tr>
                      <td colSpan={6} className="px-10 py-20 text-center text-secondary/30 font-black uppercase tracking-widest text-[10px]">No Partner Universities Sequenced from Registry Node</td>
                    </tr>
                  )}
                  {universities.filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase())).map((uni) => (
                    <tr key={uni.id} className="group hover:bg-snow-pearl/30 transition-all">
                       <td className="px-10 py-10">
                          <div className="flex items-center space-x-6 italic">
                             <div className={cn(
                               "w-16 h-16 rounded-[1.5rem] flex items-center justify-center transition-all group-hover:scale-110 shadow-inner",
                               uni.is_partner ? "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100" : "bg-snow-pearl text-secondary/10"
                             )}>
                                <Building2 size={28} />
                             </div>
                             <div>
                                <h4 className="text-base font-black text-typography leading-tight uppercase tracking-tight group-hover:text-primary transition-colors flex items-center space-x-2 italic">
                                   <span>{uni.name}</span>
                                   {uni.is_partner && <Zap size={10} className="text-emerald-500 fill-current" />}
                                </h4>
                                <div className="flex items-center space-x-3 text-[10px] font-bold text-secondary/20 uppercase tracking-widest mt-1 italic decoration-primary/10 underline">
                                   <MapPin size={10} />
                                   <span>{uni.city}, {uni.country}</span>
                                   <div className="w-1 h-1 bg-secondary/10 rounded-full" />
                                   <span>{uni.is_partner ? 'Revenue Partner' : 'Listed Only'}</span>
                                </div>
                             </div>
                          </div>
                       </td>
                       <td className="px-10 py-10 text-center">
                          <p className="text-3xl font-black text-typography italic tracking-tighter">#{uni.qs_rank || '?'}</p>
                          <p className="text-[8px] font-bold text-secondary/20 uppercase tracking-widest">Global Rank</p>
                       </td>
                       <td className="px-10 py-10 text-center">
                          <div className="inline-flex flex-col items-center">
                             <span className="text-xl font-black text-typography italic tracking-tighter">{uni.acceptance || 0}%</span>
                             <div className="w-12 h-1 bg-snow-pearl rounded-full mt-1.5 overflow-hidden">
                                <div className="h-full bg-primary" style={{ width: `${uni.acceptance || 0}%` }} />
                             </div>
                          </div>
                       </td>
                       <td className="px-10 py-10">
                          <div className="flex items-center space-x-2 text-[12px] font-black text-indigo-600 italic">
                             <BookOpen size={16} />
                             <span>{(Number(uni.ielts_min) || 0).toFixed(1)}</span>
                          </div>
                          <p className="text-[8px] font-bold text-secondary/20 uppercase tracking-widest mt-1">Band Req.</p>
                       </td>
                       <td className="px-10 py-10 text-right">
                          <p className="text-lg font-black text-typography italic tracking-tighter">{formatCurrency(uni.tuition_usd || 0)}</p>
                          <p className="text-[10px] font-bold text-secondary/30 uppercase tracking-widest leading-none mt-1 group-hover:text-primary transition-colors underline decoration-primary/10">${(uni.tuition_usd || 0).toLocaleString()} USD</p>
                       </td>
                       <td className="px-10 py-10 text-right">
                          <div className="flex items-center justify-end space-x-3 italic">
                             <span className={cn(
                               "px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest",
                               uni.status === 'ACTIVE' ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-rose-50 text-rose-600 border border-rose-100"
                             )}>
                                {uni.status}
                             </span>
                             <button className="p-4 bg-white border border-gray-100 rounded-2xl hover:bg-primary hover:text-white transition-all shadow-sm group/btn italic">
                                <ChevronRight size={18} />
                             </button>
                          </div>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>

         <div className="p-10 border-t border-gray-50 flex items-center justify-between bg-white relative overflow-hidden italic font-sans">
            <div className="absolute top-0 right-0 p-10 opacity-5">
               <HardDrive size={100} className="text-primary" />
            </div>
            <div className="flex items-center space-x-6 relative z-10 italic">
               <HistoryIcon size={18} className="text-secondary/20" />
               <p className="text-xs font-black text-secondary/40 uppercase tracking-widest italic decoration-primary/10 underline">Global Exchange Registry v2.1 • Currencies: USD → INR synced from PostgreSQL Node</p>
            </div>
            <div className="flex items-center space-x-4 relative z-10 font-sans not-italic">
               <button className="px-8 py-4 bg-snow-pearl rounded-2xl text-[10px] font-black uppercase tracking-widest text-secondary/40 hover:text-primary transition-all">Previous</button>
               <button className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center text-xs font-black shadow-lg shadow-primary/20 italic">1</button>
               <button className="px-8 py-4 bg-snow-pearl rounded-2xl text-[10px] font-black uppercase tracking-widest text-secondary/40 hover:text-primary transition-all italic">Next Page</button>
            </div>
         </div>
      </section>
    </div>
  );
}
