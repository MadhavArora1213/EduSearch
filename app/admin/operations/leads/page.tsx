"use client";

import { useState, useEffect } from "react";
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
  Share2
} from "lucide-react";
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/operations/leads");
      const data = await res.json();
      setLeads(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-6 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-2">
              <div className="bg-primary/5 px-3 py-1.5 rounded-xl border border-primary/10">
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary">B2B Operations</span>
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
           <button className="flex items-center space-x-2 px-6 py-4 bg-gray-50 border border-gray-200/50 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-white hover:border-gray-200 transition-all active:scale-95 text-secondary/60">
              <Zap size={16} />
              <span>Bulk CRM Sync</span>
           </button>
           <button className="flex items-center space-x-2 px-8 py-4 bg-primary text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20">
              <Download size={18} />
              <span>Export Hot Leads</span>
           </button>
        </div>
      </section>

      {/* Analytics Strip */}
      <div className="grid grid-cols-4 gap-8">
         {[
           { label: "Total Leads Today", value: "1,294", trend: "+12%", icon: Users },
           { label: "Hot (High Intent)", value: leads.filter(l => l.quality_score === 'HIGH').length.toString(), trend: "Ready", icon: Flame },
           { label: "Avg. Response Time", value: "4.2m", trend: "-15s", icon: Clock },
           { label: "Conversion Rate", value: "8.4%", trend: "+2.1%", icon: TrendingUp }
         ].map((s, i) => (
           <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-50 shadow-sm group hover:border-primary/20 transition-all">
              <div className="flex items-center justify-between mb-4">
                 <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-secondary/20 group-hover:text-primary transition-all group-hover:bg-primary/5">
                    <s.icon size={22} />
                 </div>
                 <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full">{s.trend}</span>
              </div>
              <p className="text-3xl font-black text-typography tracking-tighter">{s.value}</p>
              <p className="text-[10px] font-bold text-secondary/30 uppercase tracking-widest mt-1">{s.label}</p>
           </div>
         ))}
      </div>

      {/* Main Listing */}
      <section className="bg-white rounded-[2.5rem] border border-gray-50 shadow-sm overflow-hidden">
        <div className="p-10 border-b border-gray-50 flex items-center justify-between">
           <div className="relative flex-1 max-w-xl">
              <Search size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-secondary/20" />
              <input placeholder="Search Lead Name, Phone or College..." className="w-full bg-gray-50 border-0 pl-16 pr-8 py-5 rounded-3xl text-[14px] font-bold outline-none focus:ring-4 focus:ring-primary/5 transition-all" />
           </div>
           
           <div className="flex items-center space-x-4 pl-10">
              <div className="flex items-center space-x-2 bg-gray-50 p-1.5 rounded-2xl border border-gray-100">
                {["All", "High", "Medium", "Low"].map((q) => (
                  <button key={q} className="px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-primary transition-all">{q}</button>
                ))}
              </div>
              <button className="p-5 bg-gray-50 rounded-2xl border border-gray-100 text-secondary/40 hover:text-primary transition-all">
                 <Filter size={20} />
              </button>
           </div>
        </div>

        <div className="overflow-x-auto">
           <table className="w-full text-left">
              <thead className="bg-snow-pearl/50 border-b border-gray-100">
                 <tr>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Potential Student</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Interest Target</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Acquisition Source</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40 text-center">Intent Score</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40 text-right">Actions</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loading ? [...Array(3)].map((_, i) => (
                  <tr key={i} className="animate-pulse h-[100px]">
                     <td colSpan={5} className="bg-gray-50/50" />
                  </tr>
                )) : leads.map((lead) => (
                  <tr key={lead.id} className="group hover:bg-gray-50/30 transition-all">
                    <td className="px-10 py-8">
                       <div className="flex items-center space-x-6">
                          <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-secondary/10 group-hover:text-primary group-hover:bg-primary/5 transition-all">
                             <User size={24} />
                          </div>
                          <div>
                             <h4 className="text-base font-black text-typography leading-tight">{lead.student_name}</h4>
                             <div className="flex items-center space-x-3 text-[10px] font-bold text-secondary/40 uppercase tracking-widest mt-1">
                                <span className="flex items-center space-x-1"><PhoneCall size={10} /> <span>{lead.student_phone}</span></span>
                                <div className="w-1 h-1 bg-secondary/10 rounded-full" />
                                <span className="flex items-center space-x-1"><MapPin size={10} /> <span>{lead.city}</span></span>
                             </div>
                          </div>
                       </div>
                    </td>
                    <td className="px-10 py-8">
                       <h3 className="text-sm font-black text-typography group-hover:text-primary transition-colors">{lead.college.name}</h3>
                       <p className="text-[10px] font-bold text-secondary/40 uppercase tracking-widest mt-1 underline decoration-primary/10">{lead.course_interest}</p>
                    </td>
                    <td className="px-10 py-8">
                       <div className="inline-flex items-center space-x-2 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-lg">
                          <span className="text-[10px] font-black text-typography">{lead.utm_source || "Direct"}</span>
                          <ChevronRight size={10} className="text-secondary/20" />
                          <span className="text-[9px] font-bold text-secondary/40 uppercase tracking-widest">Organic Search</span>
                       </div>
                       <p className="text-[9px] font-bold text-secondary/20 uppercase tracking-widest mt-2">{new Date(lead.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • Received 4m ago</p>
                    </td>
                    <td className="px-10 py-8 text-center">
                       <div className={cn(
                          "inline-flex flex-col items-center space-y-1 px-5 py-2 rounded-2xl border",
                          lead.quality_score === 'HIGH' ? "bg-red-50 border-red-100 text-red-500" : "bg-blue-50 border-blue-100 text-blue-500"
                       )}>
                          {lead.quality_score === 'HIGH' ? <Flame size={18} /> : <Snowflake size={18} />}
                          <span className="text-[10px] font-black uppercase tracking-widest">{lead.quality_score}</span>
                       </div>
                    </td>
                    <td className="px-10 py-8 text-right">
                       <div className="flex items-center justify-end space-x-2">
                          <button className="p-4 bg-white border border-gray-100 rounded-2xl hover:bg-emerald-500 hover:text-white transition-all shadow-sm">
                             <Share2 size={16} />
                          </button>
                          <button className="p-4 bg-white border border-gray-100 rounded-2xl hover:bg-primary hover:text-white transition-all shadow-sm">
                             <ExternalLink size={16} />
                          </button>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
           </table>
        </div>

        <div className="p-10 border-t border-gray-50 flex items-center justify-between bg-white">
           <p className="text-xs font-bold text-secondary/30 uppercase tracking-widest italic font-black">Lead Velocitor Protocol Active</p>
           <div className="flex items-center space-x-4">
              <button className="px-8 py-4 bg-gray-50 rounded-2xl text-[10px] font-black uppercase tracking-widest text-secondary/40 hover:text-primary transition-all">Previous</button>
              <button className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center text-xs font-black shadow-lg shadow-primary/20">1</button>
              <button className="px-8 py-4 bg-gray-50 rounded-2xl text-[10px] font-black uppercase tracking-widest text-secondary/40 hover:text-primary transition-all">Next Page</button>
           </div>
        </div>
      </section>
    </div>
  );
}
