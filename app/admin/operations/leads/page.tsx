"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  User, 
  Users,
  ChevronRight, 
  Search, 
  Filter, 
  Download, 
  PhoneCall, 
  Mail, 
  ExternalLink, 
  Zap, 
  Flame, 
  Snowflake, 
  Clock, 
  MapPin,
  TrendingUp,
  MoreVertical,
  CheckCircle2,
  Share2,
  Building2,
  AlertTriangle,
  Send,
  RefreshCw,
  Loader2
} from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell 
} from 'recharts';
import { cn } from "@/lib/utils";

interface Lead {
  id: string;
  student_name: string;
  student_phone: string;
  student_email: string;
  course_interest: string | null;
  city: string | null;
  quality_score: string;
  status: string;
  college: { name: string };
  utm_source: string | null;
  created_at: string;
}

export default function LeadsManagementPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState({ todayIntake: 0, highQualityPct: "0", totalLeads: 0 });
  const [hourlyData, setHourlyData] = useState<{ hour: string, count: number, spike?: boolean }[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/operations/leads");
      const data = await res.json();
      setLeads(data.leads || []);
      setStats(data.stats || { todayIntake: 0, highQualityPct: "0", totalLeads: 0 });
      setHourlyData(data.hourlyData || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const filteredLeads = leads.filter(l => 
    l.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.student_phone.includes(searchTerm) ||
    l.college.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-10">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-6 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-2">
              <div className="bg-primary/5 px-3 py-1.5 rounded-xl border border-primary/10">
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary italic lowercase">B2B Operations</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30">Master Lead Distribution</span>
           </div>
           <h1 className="text-5xl font-black text-typography tracking-tighter leading-none mb-1">
             Lead <span className="text-primary italic">Velocitor</span>
           </h1>
           <p className="text-secondary/40 text-sm font-bold uppercase tracking-widest mt-2">
              Managing Real-time Intake for Partner Institutions
           </p>
        </div>

        <div className="flex items-center space-x-4">
           <button className="flex items-center space-x-2 px-6 py-4 bg-snow-pearl border border-gray-200/50 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-white hover:border-gray-200 transition-all active:scale-95 text-secondary/60">
              <Zap size={16} />
              <span>Bulk CRM Sync</span>
           </button>
           <button className="flex items-center space-x-2 px-8 py-4 bg-primary text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20">
              <Download size={18} />
              <span>Export Hot Leads</span>
           </button>
        </div>
      </section>

      {/* Analytics & Hourly Volume */}
      <div className="grid grid-cols-12 gap-8">
         <div className="col-span-12 lg:col-span-8 bg-white p-10 rounded-[2.5rem] border border-gray-50 shadow-sm flex flex-col min-h-[400px]">
            <div className="flex justify-between items-start mb-8 italic">
               <div>
                  <h3 className="text-xl font-black text-typography tracking-tighter italic lowercase underline decoration-primary/10 select-none">Spike Detection Node</h3>
                  <p className="text-[10px] font-bold text-secondary/30 uppercase tracking-[0.2em] mt-2 italic select-none">Hourly lead volume intake from PostgreSQL Cluster</p>
               </div>
               <div className="flex items-center space-x-2 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100 italic">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Live Pipeline</span>
               </div>
            </div>
            <div className="h-[250px] w-full relative">
               {loading && (
                 <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-10">
                   <Loader2 className="w-8 h-8 text-primary animate-spin" />
                 </div>
               )}
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={hourlyData}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F8FAFC" />
                     <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 10, fontWeight: 700}} dy={15} />
                     <Tooltip 
                        cursor={{fill: '#F1F5F9'}} 
                        contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', fontWeight: 700 }}
                     />
                     <Bar dataKey="count" radius={[6, 6, 0, 0]} barSize={32}>
                        {hourlyData.map((entry, index) => (
                           <Cell key={index} fill={entry.count > 100 ? '#EF4444' : '#0B2447'} />
                        ))}
                     </Bar>
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </div>

         <div className="col-span-12 lg:col-span-4 grid grid-cols-1 gap-6 italic">
            {[
              { label: "Total Intake Today", value: stats.todayIntake.toLocaleString(), trend: "Real-time", icon: Users, color: "text-primary" },
              { label: "High Quality Pct", value: `${stats.highQualityPct}%`, trend: "Dynamic", icon: AlertTriangle, color: "text-amber-500" },
            ].map((s, i) => (
              <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-50 shadow-sm group hover:border-primary/20 transition-all flex items-center justify-between cursor-pointer">
                 <div>
                    <p className="text-[10px] font-bold text-secondary/30 uppercase tracking-widest leading-none mb-2 italic">{s.label}</p>
                    <p className="text-4xl font-black text-typography tracking-tighter leading-none italic">{s.value}</p>
                    <span className="inline-block mt-3 text-[10px] font-black text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full italic">{s.trend}</span>
                 </div>
                 <div className={cn("w-16 h-16 bg-snow-pearl rounded-[1.5rem] flex items-center justify-center transition-all group-hover:scale-110", s.color.replace('text-', 'bg-').replace('500', '50'))}>
                    <s.icon size={28} className={s.color} />
                 </div>
              </div>
            ))}
         </div>
      </div>

      {/* Main Listing */}
      <section className="bg-white rounded-[2.5rem] border border-gray-50 shadow-sm overflow-hidden flex flex-col min-h-[400px]">
        <div className="p-10 border-b border-gray-50 flex items-center justify-between bg-snow-pearl/30 border-gray-100">
           <div className="relative flex-1 max-w-xl italic">
              <Search size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-secondary/20" />
              <input 
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 placeholder="Search Lead Name, Phone or College..." 
                 className="w-full bg-white border-0 pl-16 pr-8 py-5 rounded-3xl text-[14px] font-bold outline-none focus:ring-4 focus:ring-primary/5 transition-all shadow-inner" 
              />
           </div>
           
           <div className="flex items-center space-x-4 pl-10">
              <button className="p-5 bg-white border border-gray-100 rounded-2xl text-secondary/20 hover:text-primary transition-all shadow-sm">
                 <Filter size={20} />
              </button>
           </div>
        </div>

        <div className="overflow-x-auto relative">
            {loading && (
              <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-10">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
              </div>
            )}
            <table className="w-full text-left italic font-sans">
               <thead className="bg-snow-pearl/50 border-b border-gray-100 italic">
                  <tr>
                     <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Potential Student</th>
                     <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Institution Target</th>
                     <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40 text-center italic">Quality</th>
                     <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Status</th>
                     <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40 text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-50 italic">
                  {filteredLeads.length === 0 && !loading && (
                    <tr>
                      <td colSpan={5} className="px-10 py-20 text-center text-secondary/30 font-black uppercase tracking-widest text-[10px]">No Leads Processed in current sequence</td>
                    </tr>
                  )}
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="group hover:bg-snow-pearl/30 transition-all italic">
                      <td className="px-10 py-8">
                         <div className="flex items-center space-x-6 italic">
                            <div className="w-14 h-14 bg-snow-pearl rounded-2xl flex items-center justify-center text-secondary/10 group-hover:text-primary group-hover:bg-primary/5 transition-all ring-1 ring-gray-100">
                               <User size={24} />
                            </div>
                            <div>
                               <h4 className="text-[15px] font-black text-typography leading-tight uppercase tracking-tight italic underline decoration-primary/10 group-hover:text-primary transition-colors">{lead.student_name}</h4>
                               <div className="flex items-center space-x-3 text-[9px] font-bold text-secondary/40 uppercase tracking-widest mt-1 italic">
                                  <span className="flex items-center space-x-1"><PhoneCall size={9} /> <span>{lead.student_phone}</span></span>
                                  <div className="w-1 h-1 bg-secondary/10 rounded-full" />
                                  <span className="flex items-center space-x-1"><MapPin size={9} /> <span>{lead.city || 'INTL'}</span></span>
                               </div>
                            </div>
                         </div>
                      </td>
                      <td className="px-10 py-8">
                         <h3 className="text-[13px] font-black text-typography group-hover:text-primary transition-colors line-clamp-1 italic">{lead.college?.name}</h3>
                         <p className="text-[9px] font-black text-primary/60 uppercase tracking-widest mt-1 underline decoration-primary/10 italic">{lead.course_interest || 'General'}</p>
                      </td>
                      <td className="px-10 py-8 text-center">
                         <div className={cn(
                            "inline-flex flex-col items-center space-y-1 px-4 py-2 rounded-2xl border transition-all",
                            lead.quality_score === 'HIGH' ? "bg-rose-50 border-rose-100 text-rose-500" : "bg-sky-50 border-sky-100 text-sky-500"
                         )}>
                            {lead.quality_score === 'HIGH' ? <Flame size={16} /> : <Snowflake size={16} />}
                            <span className="text-[9px] font-black uppercase tracking-widest italic">{lead.quality_score}</span>
                         </div>
                      </td>
                      <td className="px-10 py-8">
                         <span className={cn(
                            "inline-flex items-center space-x-2 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all",
                            lead.status === 'CONVERTED' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                            lead.status === 'JUNK' ? "bg-red-50 text-red-600 border-red-100" :
                            "bg-amber-50 text-amber-600 border-amber-100"
                         )}>
                            <Clock size={12} />
                            <span>{lead.status}</span>
                         </span>
                         <p className="text-[8px] font-bold text-secondary/20 uppercase tracking-widest mt-2 italic">Ingested: {new Date(lead.created_at).toLocaleDateString()}</p>
                      </td>
                      <td className="px-10 py-8 text-right">
                         <div className="flex items-center justify-end space-x-2 italic">
                            <button className="p-4 bg-white border border-gray-200 rounded-2xl hover:bg-emerald-500 hover:text-white transition-all shadow-sm group/btn italic underline decoration-primary/10" title="Retry Delivery">
                               <RefreshCw size={16} />
                            </button>
                            <Link href={`/admin/operations/leads/${lead.id}`} className="p-4 bg-white border border-gray-200 rounded-2xl hover:bg-primary hover:text-white transition-all shadow-sm group/btn italic" title="View Full Log">
                               <ExternalLink size={16} />
                            </Link>
                         </div>
                      </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>

         <div className="p-10 border-t border-gray-50 flex items-center justify-between bg-white italic relative overflow-hidden font-sans">
            <div className="absolute top-0 right-0 p-10 opacity-5">
               <TrendingUp size={100} className="text-primary" />
            </div>
            <div className="flex items-center space-x-6 relative z-10 italic underline decoration-primary/10">
               <RefreshCw size={18} className="text-secondary/20 animate-spin-slow" />
               <p className="text-xs font-black text-secondary/40 uppercase tracking-widest italic font-black">Lead Velocitor Protocol: Live Intake Registry Node</p>
            </div>
            <div className="flex items-center space-x-4 relative z-10 font-sans not-italic">
               <button onClick={fetchLeads} className="px-8 py-4 bg-snow-pearl rounded-2xl text-[10px] font-black uppercase tracking-widest text-secondary/40 hover:text-primary transition-all italic">Force Sync</button>
               <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center text-xs font-black italic shadow-lg shadow-primary/20">1</div>
            </div>
         </div>
      </section>
    </div>
  );
}
