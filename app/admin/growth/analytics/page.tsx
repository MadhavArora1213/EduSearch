"use client";

import { useState, useEffect } from "react";
import { 
  BarChart3, 
  ChevronRight, 
  Search, 
  Zap, 
  Globe, 
  ShieldCheck, 
  Settings, 
  Info, 
  ExternalLink,
  Edit2,
  Trash2,
  Download,
  Filter,
  Monitor,
  Flame,
  Activity,
  Terminal,
  Play,
  Share2,
  AlertTriangle,
  Cpu,
  Layers,
  Sparkles,
  TrendingUp,
  CreditCard,
  Users,
  Target,
  ArrowUpRight,
  TrendingDown,
  Clock,
  LayoutGrid
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, PieChart, Pie } from "recharts";

interface FunnelItem {
  step: string;
  count: number;
  conv: string;
}

interface Performer {
  name: string;
  leads: number;
}

const revenueData = [
  { month: "Jan", rev: 1.2 },
  { month: "Feb", rev: 1.8 },
  { month: "Mar", rev: 1.5 },
  { month: "Apr", rev: 2.4 },
  { month: "May", rev: 3.1 },
  { month: "Jun", rev: 2.8 },
  { month: "Jul", rev: 4.2 },
];

export default function GrowthAnalyticsPage() {
  const [funnel, setFunnel] = useState<FunnelItem[]>([]);
  const [performers, setPerformers] = useState<Performer[]>([]);
  const [revenue, setRevenue] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
     fetchGrowthData();
  }, []);

  const fetchGrowthData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/growth/analytics");
      const data = await res.json();
      setFunnel(data.funnel);
      setPerformers(data.top_performers);
      setRevenue(data.revenue);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-6 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-2">
              <div className="bg-primary/5 px-3 py-1.5 rounded-xl border border-primary/10">
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary italic lowercase">Growth & Revenue</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30">Conversion Velocity Dashboard</span>
           </div>
           <h1 className="text-5xl font-black text-typography tracking-tighter leading-none mb-1">
             Revenue <span className="text-primary italic">Velocitor</span>
           </h1>
           <p className="text-secondary/40 text-sm font-bold uppercase tracking-widest mt-2">
              Monitoring Lifecycle Conversions & Institutional Payouts
           </p>
        </div>

        <div className="flex items-center space-x-4">
           <div className="bg-emerald-50 px-8 py-4 rounded-3xl border border-emerald-100 flex items-center space-x-4 group animate-in slide-in-from-right">
              <div className="w-10 h-10 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                 <ArrowUpRight size={18} />
              </div>
              <div>
                 <p className="text-[9px] font-black uppercase tracking-widest text-emerald-800">MoM Growth</p>
                 <p className="text-xl font-black text-emerald-900">+34.2%</p>
              </div>
           </div>
           <button className="flex items-center space-x-2 px-8 py-5 bg-primary text-white rounded-3xl text-[11px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20">
              <Download size={18} />
              <span>Full Growth Export</span>
           </button>
        </div>
      </section>

      {/* Financial KPIs */}
      <div className="grid grid-cols-4 gap-8">
         {[
           { label: "Gross Revenue (Month)", value: revenue?.total || "₹0", sub: "+₹4.2M from Leads", icon: CreditCard, color: "text-primary" },
           { label: "Active Student Profiles", value: "10.4M", sub: "842K Verified", icon: Users, color: "text-sky-500" },
           { label: "Avg. CAC Per Lead", value: "₹42", sub: "-12% Efficiency", icon: Target, iconColor: "text-emerald-500" },
           { label: "Retention Speed", value: "48s", sub: "Councilor Return Rate", icon: Clock, color: "text-amber-500" }
         ].map((s, i) => (
           <div key={i} className="bg-white p-10 rounded-[3rem] border border-gray-50 shadow-sm group hover:border-primary/20 transition-all">
              <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-secondary/10 group-hover:text-primary transition-all group-hover:bg-primary/5 mb-6">
                 <s.icon size={24} />
              </div>
              <p className="text-3xl font-black text-typography tracking-tighter mb-1">{s.value}</p>
              <p className="text-[10px] font-bold text-secondary/30 uppercase tracking-widest">{s.label}</p>
              <div className="mt-6 pt-6 border-t border-gray-50 flex items-center justify-between">
                 <span className="text-[10px] font-black italic text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full uppercase truncate">{s.sub}</span>
              </div>
           </div>
         ))}
      </div>

      {/* Main Charts Overlay */}
      <section className="grid grid-cols-12 gap-8">
         {/* Conversion Funnel */}
         <div className="col-span-12 lg:col-span-12 xl:col-span-7 bg-white p-12 rounded-[4rem] border border-gray-50 shadow-sm overflow-hidden relative group">
            <div className="absolute -right-20 -top-20 w-80 h-80 bg-primary/5 rounded-full group-hover:scale-150 transition-transform duration-1000 pointer-events-none" />
            
            <div className="flex items-center justify-between mb-12 relative">
               <div>
                  <h3 className="text-3xl font-black text-typography tracking-tight">Full-Lifecycle Funnel</h3>
                  <p className="text-[11px] font-bold text-secondary/40 uppercase tracking-widest mt-1 italic">From Discovery (Google) to Admission (Campus)</p>
               </div>
               <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-secondary/20">
                  <LayoutGrid size={24} />
               </div>
            </div>

            <div className="space-y-4">
               {funnel.map((item, i) => (
                 <div key={item.step} className="group/item flex items-center h-16">
                    <div className="w-40 mr-10 flex flex-col justify-center">
                       <span className="text-[11px] font-black text-secondary/30 uppercase tracking-[0.2em] leading-none mb-1">Step {i+1}</span>
                       <span className="text-[13px] font-black text-typography group-hover/item:text-primary transition-colors">{item.step}</span>
                    </div>
                    
                    <div className="flex-1 flex items-center space-x-6">
                       <div className="flex-1 h-3 bg-gray-50 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary origin-left transition-all duration-1000 delay-300" 
                            style={{ width: `${(item.count / 120000) * 100}%` }} 
                          />
                       </div>
                       <div className="w-40 flex items-center justify-end space-x-4">
                          <span className="text-lg font-black text-typography">{item.count >= 1000 ? (item.count/1000).toFixed(1) + 'K' : item.count}</span>
                          <span className={cn(
                             "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border",
                             i === 0 ? "bg-primary text-white border-primary" : "bg-emerald-50 text-emerald-600 border-emerald-100"
                          )}>
                             {i === 0 ? "Entry" : item.conv}
                          </span>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
            
            <div className="mt-12 p-8 bg-gray-50/50 rounded-[2.5rem] border border-gray-100 flex items-center space-x-6 italic">
               <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-500 shadow-sm">
                  <Sparkles size={20} />
               </div>
               <p className="text-[11px] font-bold text-secondary/60 leading-relaxed max-w-xl">
                 Identified a bottleneck at <span className="text-primary font-black uppercase">Step 3 (Leads)</span>. Conversion from College Visits dropped by 12% MoM. Suggested action: Review Lead Capture Form usability.
               </p>
            </div>
         </div>

         {/* Revenue Velocity */}
         <div className="col-span-12 lg:col-span-12 xl:col-span-5 bg-typography p-12 rounded-[4rem] text-white shadow-2xl shadow-primary/20 relative overflow-hidden group/dark">
            <div className="absolute right-0 bottom-0 w-1/2 h-1/2 bg-gradient-to-tl from-primary/10 to-transparent pointer-events-none" />
            
            <h3 className="text-3xl font-black tracking-tight leading-none mb-2">Revenue <span className="text-primary italic italic">Flux</span></h3>
            <p className="text-[10px] font-black text-secondary/30 uppercase tracking-[0.2em] mb-12">YTD Performance (Millions)</p>
            
            <div className="h-[250px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                     <defs>
                        <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#01579B" stopOpacity={0.4}/>
                           <stop offset="95%" stopColor="#01579B" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <XAxis dataKey="month" hide />
                     <YAxis hide />
                     <Tooltip 
                        contentStyle={{ borderRadius: '20px', border: 'none', backgroundColor: '#002147', color: 'white', padding: '15px' }}
                        itemStyle={{ color: 'white' }}
                     />
                     <Area 
                        type="monotone" 
                        dataKey="rev" 
                        stroke="#01579B" 
                        strokeWidth={4} 
                        fill="url(#colorRev)" 
                        animationDuration={1500}
                     />
                  </AreaChart>
               </ResponsiveContainer>
            </div>

            <div className="space-y-6 mt-12">
               <div className="flex items-center justify-between">
                  <div>
                     <p className="text-2xl font-black">₹{revenue?.lead_revenue || "0"}</p>
                     <p className="text-[9px] font-black uppercase tracking-widest text-secondary/40 italic">B2B Lead Payouts</p>
                  </div>
                  <div className="text-right">
                     <p className="text-2xl font-black">₹{revenue?.app_fee_revenue || "0"}</p>
                     <p className="text-[9px] font-black uppercase tracking-widest text-secondary/40 italic">Application Fees</p>
                  </div>
               </div>
               
               <div className="bg-white/5 p-6 rounded-[2.5rem] border border-white/10 flex items-center justify-between group cursor-pointer hover:bg-white/10 transition-all active:scale-95 italic">
                  <div className="flex items-center space-x-4">
                     <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                        <ArrowUpRight size={18} />
                     </div>
                     <span className="text-[11px] font-black uppercase tracking-widest leading-none">Invoicing Protocol</span>
                  </div>
                  <ChevronRight size={16} className="text-secondary/40" />
               </div>
            </div>
         </div>
      </section>

      {/* Performer Leaderboard */}
      <section className="bg-white p-12 rounded-[4rem] border border-gray-50 shadow-sm overflow-hidden text-typography">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
               <h3 className="text-3xl font-black tracking-tight mb-2 uppercase">Institutional <span className="text-primary italic italic">Titans</span></h3>
               <p className="text-xs font-bold text-secondary/40 uppercase tracking-widest mb-10 leading-relaxed italic truncate">Top performing colleges by conversion pull</p>
               
               <div className="space-y-4">
                  {performers.map((p, i) => (
                    <div key={p.name} className="flex items-center justify-between p-6 bg-gray-50/50 border border-gray-100/50 rounded-[2.5rem] group hover:bg-white hover:border-primary/20 transition-all animate-in fade-in transition-all">
                       <div className="flex items-center space-x-6">
                          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-xs font-black shadow-sm group-hover:bg-primary group-hover:text-white transition-all">
                             {i+1}
                          </div>
                          <div>
                             <h4 className="text-base font-black uppercase tracking-tighter leading-none">{p.name}</h4>
                             <p className="text-[10px] font-black text-secondary/20 uppercase tracking-widest mt-1 italic">Engineering Tier-1</p>
                          </div>
                       </div>
                       <div className="flex items-center space-x-6">
                          <div className="text-right">
                             <p className="text-lg font-black">{p.leads}</p>
                             <p className="text-[9px] font-black text-secondary/30 uppercase tracking-widest">Leads Captured</p>
                          </div>
                          <ChevronRight size={18} className="text-secondary/20 group-hover:text-primary transition-colors" />
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="space-y-10 italic">
               <div className="grid grid-cols-2 gap-8">
                  <div className="bg-primary/5 p-10 rounded-[3.5rem] border border-primary/10">
                     <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-2 italic">Organic Lift</p>
                     <p className="text-4xl font-black text-typography">+94.2%</p>
                     <p className="text-[9px] font-bold text-secondary/40 mt-4 leading-relaxed">Referral traffic conversion is exceeding CPC performance.</p>
                  </div>
                  <div className="bg-sky-50 p-10 rounded-[3.5rem] border border-sky-100">
                     <p className="text-[10px] font-black uppercase tracking-widest text-sky-600 mb-2 italic">Search Visibility</p>
                     <p className="text-4xl font-black text-typography">10.2M</p>
                     <p className="text-[9px] font-bold text-secondary/40 mt-4 leading-relaxed">Impressions daily across academic dynamic routes.</p>
                  </div>
               </div>
               
               <div className="bg-gray-50/50 p-12 rounded-[4rem] border border-gray-100 flex flex-col items-center justify-center text-center group">
                  <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-primary shadow-sm mb-6 group-hover:scale-110 transition-transform">
                     <Target size={28} />
                  </div>
                  <h4 className="text-xl font-black uppercase tracking-tight">Strategy Forecast</h4>
                  <p className="text-xs font-bold text-secondary/40 leading-relaxed mt-2 max-w-xs uppercase tracking-widest">
                    Predicting ₹12M Yearly Revenue based on current lifecycle velocity.
                  </p>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
