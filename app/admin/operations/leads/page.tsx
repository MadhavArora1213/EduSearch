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
    <div className="space-y-6">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-4 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-1.5 font-montserrat">
              <div className="bg-primary/5 px-3 py-1.5 rounded-xl border border-primary/10">
                 <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary lowercase">B2B Operations</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30 uppercase tracking-widest text-[10px]">Lead Distribution</span>
           </div>
           <h1 className="text-3xl md:text-4xl font-black text-typography tracking-tighter leading-none mb-1">
             Lead <span className="text-primary italic">Velocitor</span>
           </h1>
           <p className="text-secondary/40 text-[10px] font-black uppercase tracking-[0.2em] mt-1.5 leading-none">
              Managing Real-Time Partner Intake
           </p>
        </div>

        <div className="flex items-center space-x-3">
           <button className="flex items-center space-x-2 px-5 py-2.5 bg-gray-50 border border-gray-200/50 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all active:scale-95 text-secondary/60">
              <Zap size={14} />
              <span>Bulk Sync</span>
           </button>
           <button className="flex items-center space-x-2 px-6 py-2.5 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/10">
              <Download size={16} />
              <span>Export Leads</span>
           </button>
        </div>
      </section>

      {/* Analytics & Hourly Volume */}
      <div className="grid grid-cols-12 gap-4">
         <div className="col-span-12 lg:col-span-8 bg-white p-5 rounded-xl border border-gray-50 shadow-sm flex flex-col min-h-[350px]">
            <div className="flex justify-between items-start mb-6">
               <div>
                  <h3 className="text-sm font-black text-typography tracking-tight uppercase">Spike Detection Node</h3>
                  <p className="text-[9px] font-bold text-secondary/30 uppercase tracking-[0.1em] mt-1.5">Hourly lead volume intake metrics</p>
               </div>
               <div className="flex items-center space-x-2 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-100">
                  <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">Live Pipeline</span>
               </div>
            </div>
            <div className="h-[220px] w-full relative">
               {loading && (
                 <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-10">
                   <Loader2 className="w-6 h-6 text-primary animate-spin" />
                 </div>
               )}
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={hourlyData}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F8FAFC" />
                     <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 9, fontWeight: 700}} dy={10} />
                     <Tooltip 
                        cursor={{fill: '#F1F5F9'}} 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 20px rgba(0,0,0,0.05)', fontWeight: 700, fontSize: '10px' }}
                     />
                     <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={28}>
                        {hourlyData.map((entry, index) => (
                           <Cell key={index} fill={entry.count > 100 ? '#EF4444' : '#0B2447'} />
                        ))}
                     </Bar>
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </div>

         <div className="col-span-12 lg:col-span-4 grid grid-cols-1 gap-4">
            {[
              { label: "Today's Intake", value: stats.todayIntake.toLocaleString(), trend: "Real-time", icon: Users, color: "text-primary" },
              { label: "High Quality Pct", value: `${stats.highQualityPct}%`, trend: "Dynamic", icon: AlertTriangle, color: "text-amber-500" },
            ].map((s, i) => (
              <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm group hover:shadow-md transition-all flex items-center justify-between cursor-pointer">
                 <div>
                    <p className="text-[9px] font-bold text-secondary/30 uppercase tracking-[0.1em] leading-none mb-1.5">{s.label}</p>
                    <p className="text-3xl font-black text-typography tracking-tighter leading-none">{s.value}</p>
                    <span className="inline-block mt-2.5 text-[8px] font-black text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full uppercase tracking-widest">{s.trend}</span>
                 </div>
                 <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center transition-all group-hover:scale-105", s.color.replace('text-', 'bg-').replace('500', '50'))}>
                    <s.icon size={20} className={s.color} />
                 </div>
              </div>
            ))}
         </div>
      </div>

      {/* Main Listing */}
      <section className="bg-white rounded-xl border border-gray-50 shadow-sm overflow-hidden flex flex-col min-h-[400px]">
        <div className="p-4 border-b border-gray-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-snow-pearl/30">
           <div className="relative flex-1 max-w-xl">
              <Search size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-secondary/20" />
              <input 
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 placeholder="Search identities..." 
                 className="w-full bg-white border border-transparent pl-12 pr-6 py-2.5 rounded-xl text-[13px] font-bold outline-none focus:ring-4 focus:ring-primary/5 shadow-sm" 
              />
           </div>
           
           <div className="flex items-center space-x-3 italic">
              <button className="w-9 h-9 bg-white border border-gray-100 rounded-xl flex items-center justify-center text-secondary/20 hover:text-primary transition-all shadow-sm">
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
            <table className="w-full text-left italic font-montserrat">
               <thead className="bg-snow-pearl/50 border-b border-gray-100">
                  <tr>
                     <th className="px-6 py-3 text-[9px] font-black uppercase tracking-[0.2em] text-secondary/40">Potential Student</th>
                     <th className="px-6 py-3 text-[9px] font-black uppercase tracking-[0.2em] text-secondary/40">Institution Target</th>
                     <th className="px-6 py-3 text-[9px] font-black uppercase tracking-[0.2em] text-secondary/40 text-center">Quality</th>
                     <th className="px-6 py-3 text-[9px] font-black uppercase tracking-[0.2em] text-secondary/40">Status</th>
                     <th className="px-6 py-3 text-[9px] font-black uppercase tracking-[0.2em] text-secondary/40 text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-50 italic">
                  {filteredLeads.length === 0 && !loading && (
                    <tr>
                      <td colSpan={5} className="px-10 py-20 text-center text-secondary/30 font-black uppercase tracking-widest text-[10px]">No Leads Processed in current sequence</td>
                    </tr>
                  )}
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="group hover:bg-gray-50/50 transition-all font-montserrat">
                      <td className="px-6 py-3">
                         <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-secondary/20 group-hover:bg-primary group-hover:text-white transition-all ring-1 ring-gray-100">
                               <User size={18} />
                            </div>
                            <div>
                               <h4 className="text-[13px] font-black text-typography leading-none uppercase tracking-tight group-hover:text-primary transition-colors underline decoration-primary/5">{lead.student_name}</h4>
                               <div className="flex items-center space-x-2 text-[8px] font-black text-secondary/30 uppercase tracking-widest mt-1.5">
                                  <span className="flex items-center space-x-1"><PhoneCall size={9} /> <span>{lead.student_phone}</span></span>
                                  <div className="w-1 h-1 bg-secondary/10 rounded-full" />
                                  <span className="flex items-center space-x-1"><MapPin size={9} /> <span>{lead.city || 'INTL'}</span></span>
                               </div>
                            </div>
                         </div>
                      </td>
                      <td className="px-6 py-3">
                         <h3 className="text-[12px] font-black text-typography group-hover:text-primary transition-colors line-clamp-1 truncate uppercase">{lead.college?.name}</h3>
                         <p className="text-[8px] font-black text-primary/60 uppercase tracking-widest mt-1 underline decoration-primary/10">{lead.course_interest || 'General'}</p>
                      </td>
                      <td className="px-6 py-3 text-center">
                         <div className={cn(
                            "inline-flex flex-col items-center px-3 py-1.5 rounded-xl border transition-all",
                            lead.quality_score === 'HIGH' ? "bg-rose-50 border-rose-100 text-rose-500" : "bg-sky-50 border-sky-100 text-sky-500"
                         )}>
                            {lead.quality_score === 'HIGH' ? <Flame size={14} /> : <Snowflake size={14} />}
                            <span className="text-[8px] font-black uppercase tracking-widest mt-0.5">{lead.quality_score}</span>
                         </div>
                      </td>
                      <td className="px-6 py-3">
                         <span className={cn(
                            "inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border transition-all",
                            lead.status === 'CONVERTED' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                            lead.status === 'JUNK' ? "bg-red-50 text-red-600 border-red-100" :
                            "bg-amber-50 text-amber-600 border-amber-100"
                         )}>
                            <Clock size={10} />
                            <span>{lead.status}</span>
                         </span>
                         <p className="text-[7px] font-bold text-secondary/20 uppercase tracking-widest mt-2">{new Date(lead.created_at).toLocaleDateString()}</p>
                      </td>
                      <td className="px-6 py-3 text-right">
                         <div className="flex items-center justify-end space-x-2">
                            <button className="w-9 h-9 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center text-secondary/40 hover:bg-emerald-500 hover:text-white transition-all shadow-sm" title="Retry Delivery">
                               <RefreshCw size={14} />
                            </button>
                            <Link href={`/admin/operations/leads/${lead.id}`} className="w-9 h-9 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center text-secondary/40 hover:bg-primary hover:text-white transition-all shadow-sm" title="View Full Log">
                               <ExternalLink size={14} />
                            </Link>
                         </div>
                      </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>

         <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-white relative overflow-hidden font-montserrat">
            <div className="absolute top-0 right-0 p-4 opacity-5">
               <TrendingUp size={100} className="text-primary" />
            </div>
            <div className="flex items-center space-x-4 relative z-10">
               <RefreshCw size={14} className="text-secondary/20 animate-spin-slow" />
               <p className="text-[10px] font-black text-secondary/30 uppercase tracking-[0.2em]">Lead Velocitor Protocol: Live Intake Registry Node</p>
            </div>
            <div className="flex items-center space-x-3 relative z-10 font-montserrat not-italic">
               <button onClick={fetchLeads} className="px-6 py-2.5 bg-gray-50 rounded-xl text-[9px] font-black uppercase tracking-widest text-secondary/40 hover:text-primary transition-all">Force Sync</button>
               <div className="w-8 h-8 bg-primary text-white rounded-lg flex items-center justify-center text-[10px] font-black shadow-lg shadow-primary/20">1</div>
            </div>
         </div>
      </section>
    </div>
  );
}
