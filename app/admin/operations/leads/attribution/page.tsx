"use client";

import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie
} from 'recharts';
import { 
  Globe,
  TrendingUp, 
  MapPin, 
  ChevronRight,
  Database,
  Layers,
  Sparkles,
  Zap,
  Layout,
  MessageCircle,
  Search as SearchIcon,
  BookOpen
} from 'lucide-react';
import { cn } from "@/lib/utils";

const sourceData = [
  { name: 'Profile Pages', leads: 4200, color: '#0B2447' },
  { name: 'AI Counselor', leads: 3100, color: '#A5D7E8' },
  { name: 'Search Results', leads: 2800, color: '#19376D' },
  { name: 'WhatsApp Bot', leads: 1560, color: '#10B981' },
  { name: 'Exam Pages', leads: 1240, color: '#6366F1' },
  { name: 'Blog Ads', leads: 850, color: '#F59E0B' },
];

const streamData = [
  { name: 'Engineering', value: 45, color: '#0B2447' },
  { name: 'MBA / PGDM', value: 30, color: '#19376D' },
  { name: 'Medical / MBBS', value: 15, color: '#A5D7E8' },
  { name: 'Law', value: 6, color: '#6366F1' },
  { name: 'Other', value: 4, color: '#94A3B8' },
];

const heatMapData = [
  { hour: '12am-4am', count: 120 },
  { hour: '4am-8am', count: 80 },
  { hour: '8am-12pm', count: 450 },
  { hour: '12pm-4pm', count: 890 },
  { hour: '4pm-8pm', count: 1240 },
  { hour: '8pm-12am', count: 2100 }, // Peak for students
];

export default function LeadAttributionPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-6 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-2">
              <div className="bg-primary/5 px-3 py-1.5 rounded-xl border border-primary/10">
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary italic lowercase">Marketing Intel</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30">Conversion Pathways</span>
           </div>
           <h1 className="text-5xl font-black text-typography tracking-tighter leading-none mb-1">
             Source <span className="text-primary italic">Attribution</span>
           </h1>
           <p className="text-secondary/40 text-sm font-bold uppercase tracking-widest mt-2">
              Decoding Student Acquisition Channels & Content ROI
           </p>
        </div>

        <div className="flex items-center space-x-4">
           <div className="bg-white px-8 py-4 rounded-3xl border border-gray-100 shadow-sm flex items-center space-x-6">
              <div>
                 <p className="text-[10px] font-black text-secondary/20 uppercase tracking-widest">Winning Channel</p>
                 <p className="text-2xl font-black text-typography tracking-tighter italic">AI Assistant <span className="text-emerald-500 text-xs text-[10px] font-black underline">Top Conv.</span></p>
              </div>
              <Sparkles size={28} className="text-primary shadow-xl shadow-primary/20" />
           </div>
        </div>
      </section>

      {/* Conversion Funnel / Channel split */}
      <div className="grid grid-cols-12 gap-8">
         <div className="col-span-12 lg:col-span-8 bg-white p-10 rounded-[2.5rem] border border-gray-50 shadow-sm">
            <div className="flex justify-between items-start mb-10">
               <div>
                  <h3 className="text-xl font-black text-typography tracking-tighter italic lowercase underline decoration-primary/10">Platform Channel Attribution</h3>
                  <p className="text-[10px] font-bold text-secondary/30 uppercase tracking-[0.2em] mt-2">Where do leads actually originate? (Total monthly volume)</p>
               </div>
            </div>
            <div className="h-[350px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sourceData} layout="vertical">
                     <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F8FAFC" />
                     <XAxis type="number" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 10, fontWeight: 700}} />
                     <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#0B2447', fontSize: 11, fontWeight: 900}} width={120} />
                     <Tooltip 
                        cursor={{fill: '#F1F5F9'}} 
                        contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', fontWeight: 700 }}
                     />
                     <Bar dataKey="leads" radius={[0, 8, 8, 0]} barSize={32}>
                        {sourceData.map((entry, index) => (
                           <Cell key={index} fill={entry.color} />
                        ))}
                     </Bar>
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </div>

         <div className="col-span-12 lg:col-span-4 bg-white p-10 rounded-[2.5rem] border border-gray-50 shadow-sm">
            <h3 className="text-xl font-black text-typography tracking-tighter italic lowercase underline decoration-primary/10 mb-10">Stream-wise Gravity</h3>
            <div className="h-[250px] w-full relative">
               <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                     <Pie
                        data={streamData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                     >
                        {streamData.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                     </Pie>
                     <Tooltip />
                  </PieChart>
               </ResponsiveContainer>
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                  <p className="text-2xl font-black text-typography">12k+</p>
                  <p className="text-[8px] font-bold text-secondary/30 uppercase tracking-widest">Total Leads</p>
               </div>
            </div>
            <div className="mt-8 space-y-3">
               {streamData.slice(0, 3).map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                     <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-[10px] font-black text-typography uppercase tracking-tighter">{item.name}</span>
                     </div>
                     <span className="text-[10px] font-bold text-secondary/40">{item.value}%</span>
                  </div>
               ))}
            </div>
         </div>
      </div>

      {/* Heatmap Section */}
      <div className="grid grid-cols-12 gap-8">
         <div className="col-span-12 lg:col-span-6 bg-white p-10 rounded-[2.5rem] border border-gray-50 shadow-sm">
            <h3 className="text-xl font-black text-typography tracking-tighter italic lowercase underline decoration-primary/10 mb-8">Lead Submission Heatmap</h3>
            <div className="grid grid-cols-1 gap-4">
               {heatMapData.map((item, i) => (
                  <div key={i} className="flex items-center space-x-4">
                     <span className="w-20 text-[10px] font-black text-secondary/30 uppercase text-right">{item.hour}</span>
                     <div className="flex-1 h-8 bg-gray-50 rounded-xl overflow-hidden relative">
                        <div 
                           className={cn("h-full transition-all duration-1000", item.count > 1500 ? "bg-primary" : "bg-primary/20")}
                           style={{ width: `${(item.count / 2100) * 100}%` }}
                        />
                        <span className="absolute inset-0 flex items-center px-4 text-[10px] font-black text-typography/40 italic">{item.count} Leads</span>
                     </div>
                  </div>
               ))}
            </div>
            <p className="mt-8 text-[9px] font-bold text-secondary/20 uppercase tracking-[0.2em] italic text-center">Peak activity detected at 9:30 PM — Recommended Push Notification Window</p>
         </div>

         <div className="col-span-12 lg:col-span-6 grid grid-cols-2 gap-6">
            {[
               { icon: SearchIcon, label: 'SEO Direct', value: '42.1%', desc: 'Organic keywords' },
               { icon: MessageCircle, label: 'WhatsApp', value: '18.4%', desc: 'High intent bot' },
               { icon: Layout, label: 'Exam Pages', value: '11.5%', desc: 'Lateral entry' },
               { icon: BookOpen, label: 'Blog Posts', value: '8.2%', desc: 'In-content ads' },
            ].map((card, i) => (
               <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm group hover:border-primary/20 transition-all flex flex-col justify-between">
                  <div className="w-12 h-12 bg-snow-pearl rounded-2xl flex items-center justify-center text-secondary/10 group-hover:bg-primary/5 group-hover:text-primary transition-all">
                     <card.icon size={22} />
                  </div>
                  <div>
                     <p className="text-3xl font-black text-typography tracking-tighter mt-6">{card.value}</p>
                     <p className="text-[10px] font-black text-typography uppercase tracking-widest mt-1 italic">{card.label}</p>
                     <p className="text-[10px] font-bold text-secondary/30 mt-1 uppercase tracking-widest">{card.desc}</p>
                  </div>
               </div>
            ))}
         </div>
      </div>
    </div>
  );
}
