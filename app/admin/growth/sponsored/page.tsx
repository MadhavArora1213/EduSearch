"use client";

import { useState, useEffect } from "react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import { 
  Building2,
  ChevronRight, 
  Search, 
  Filter, 
  Download, 
  Calendar,
  Layout,
  MousePointer2,
  TrendingUp,
  Tag,
  Plus,
  ShieldCheck,
  Zap,
  Clock,
  ExternalLink
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AdSlot {
  id: string;
  location: string;
  occupant: string;
  startDate: string;
  endDate: string;
  price: number;
  performance: {
    impressions: number;
    clicks: number;
    leads: number;
  };
  status: 'ACTIVE' | 'UPCOMING' | 'EXPIRED' | 'AVAILABLE';
}

export default function SponsoredManagerPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="p-10 min-h-screen bg-gray-50/20 animate-pulse flex items-center justify-center text-[10px] font-black uppercase tracking-[0.5em] text-secondary/10 italic">Verifying Moderation Ledger...</div>;

  const [slots] = useState<AdSlot[]>([
    {
      id: "SLOT-001",
      location: "Search Results Position 1 (Engineering)",
      occupant: "IIT Bombay",
      startDate: "2026-03-01",
      endDate: "2026-03-31",
      price: 85000,
      performance: { impressions: 124000, clicks: 4200, leads: 450 },
      status: 'ACTIVE'
    },
    {
      id: "SLOT-002",
      location: "Homepage Featured (Top Banner)",
      occupant: "Amity University",
      startDate: "2026-03-15",
      endDate: "2026-04-15",
      price: 120000,
      performance: { impressions: 0, clicks: 0, leads: 0 },
      status: 'UPCOMING'
    },
    {
      id: "SLOT-003",
      location: "Exam Page Sidebar (JEE Main)",
      occupant: "VIT Vellore",
      startDate: "2026-02-01",
      endDate: "2026-02-28",
      price: 45000,
      performance: { impressions: 89000, clicks: 3100, leads: 240 },
      status: 'EXPIRED'
    }
  ]);

  return (
    <div className="space-y-10">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-6 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-2">
              <div className="bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-100">
                 <span className="text-[10px] font-black uppercase tracking-widest text-amber-600 italic lowercase">Ad Inventory</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30">Sponsored Real Estate</span>
           </div>
           <h1 className="text-5xl font-black text-typography tracking-tighter leading-none mb-1">
             Sponsorship <span className="text-primary italic">Command</span>
           </h1>
           <p className="text-secondary/40 text-sm font-bold uppercase tracking-widest mt-2">
              Managing Ad Slots, Contract Lifecycles & Listing Performance
           </p>
        </div>

        <div className="flex items-center space-x-4">
           <button className="flex items-center space-x-2 px-8 py-4 bg-primary text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20">
              <Plus size={18} />
              <span>Book New Slot</span>
           </button>
        </div>
      </section>

      {/* Ad Inventory Calendar Mock & Stats */}
      <div className="grid grid-cols-12 gap-8">
         <div className="col-span-12 lg:col-span-8 bg-white p-10 rounded-[2.5rem] border border-gray-50 shadow-sm overflow-hidden h-fit">
            <div className="flex justify-between items-center mb-10">
               <div>
                  <h3 className="text-xl font-black text-typography tracking-tighter italic lowercase underline decoration-primary/10">Inventory Pipeline</h3>
                  <p className="text-[10px] font-bold text-secondary/30 uppercase tracking-[0.2em] mt-2">Next 3 Months Availability Audit</p>
               </div>
               <div className="flex items-center space-x-2 bg-snow-pearl p-1.5 rounded-2xl border border-gray-100">
                  <button className="px-5 py-2 rounded-xl text-[10px] font-black uppercase bg-white shadow-sm transition-all italic">Mar 2026</button>
                  <button className="px-5 py-2 rounded-xl text-[10px] font-black uppercase text-secondary/30 hover:text-primary transition-all underline decoration-primary/10">Apr 2026</button>
               </div>
            </div>
            
            <div className="space-y-4">
               {["H1 Banner", "Search P1", "Search P2", "Article Mid", "Exam Footer"].map((slot, i) => (
                  <div key={i} className="flex items-center space-x-4">
                     <span className="w-24 text-[10px] font-black text-secondary/30 uppercase text-right leading-tight">{slot}</span>
                     <div className="flex-1 h-12 bg-gray-50 rounded-2xl flex relative overflow-hidden">
                        <div className="absolute inset-0 flex items-center px-4 z-10">
                           <span className="text-[10px] font-black text-white uppercase italic">IIT Bombay (Booking Active)</span>
                        </div>
                        <div className="w-3/4 bg-primary h-full border-r-2 border-white/20" />
                        <div className="w-1/4 bg-white border border-dashed border-gray-200 h-full flex items-center justify-center">
                           <span className="text-[9px] font-black text-primary uppercase italic">Avail</span>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         <div className="col-span-12 lg:col-span-4 grid grid-cols-1 gap-6">
            <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-20">
                  <TrendingUp size={64} className="text-primary" />
               </div>
               <div className="relative z-10">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Total Inventory yield</p>
                  <p className="text-5xl font-black tracking-tighter mt-2 group-hover:text-primary transition-colors">₹8.4L</p>
                  <div className="mt-6 flex items-center space-x-2 text-[10px] font-black text-emerald-500 uppercase italic underline decoration-emerald-500/20">
                     <ShieldCheck size={14} />
                     <span>100% Slot Occupancy for March</span>
                  </div>
               </div>
            </div>
            
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-50 shadow-sm group hover:border-primary/20 transition-all">
               <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 bg-snow-pearl rounded-2xl flex items-center justify-center text-secondary/10 group-hover:text-primary group-hover:bg-primary/5 transition-all">
                     <MousePointer2 size={24} />
                  </div>
                  <div className="text-right">
                     <p className="text-2xl font-black text-typography tracking-tighter">4.2%</p>
                     <p className="text-[10px] font-bold text-secondary/30 uppercase tracking-widest">Avg. CTR</p>
                  </div>
               </div>
               <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="w-[42%] h-full bg-primary rounded-full transition-all duration-1000 group-hover:scale-x-105" />
               </div>
            </div>
         </div>
      </div>

      {/* Ad Inventory Table */}
      <section className="bg-white rounded-[2.5rem] border border-gray-50 shadow-sm overflow-hidden">
        <div className="p-10 border-b border-gray-50 flex items-center justify-between">
           <div className="relative flex-1 max-w-xl">
              <Search size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-secondary/20" />
              <input placeholder="Search Active Sponsors..." className="w-full bg-snow-pearl border-0 pl-16 pr-8 py-5 rounded-3xl text-[14px] font-bold outline-none focus:ring-4 focus:ring-primary/5 transition-all" />
           </div>
        </div>

        <div className="overflow-x-auto">
           <table className="w-full text-left">
              <thead className="bg-snow-pearl/50 border-b border-gray-100">
                 <tr>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Slot Location & Institutional Occupant</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Contract Period</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Yield Performance</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40">Status</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/40 text-right">Actions</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {slots.map((slot) => (
                  <tr key={slot.id} className="group hover:bg-snow-pearl/30 transition-all">
                    <td className="px-10 py-8">
                       <div className="flex items-center space-x-6">
                          <div className="w-14 h-14 bg-snow-pearl rounded-2xl flex items-center justify-center text-secondary/10 group-hover:text-primary group-hover:bg-primary/5 transition-all">
                             <Layout size={24} />
                          </div>
                          <div>
                             <h4 className="text-base font-black text-typography leading-tight">{slot.location}</h4>
                             <div className="flex items-center space-x-2 text-[11px] font-black text-primary uppercase tracking-widest mt-1 italic underline decoration-primary/10">
                                <Building2 size={12} />
                                <span>{slot.occupant}</span>
                             </div>
                          </div>
                       </div>
                    </td>
                    <td className="px-10 py-8">
                       <div className="flex flex-col space-y-1">
                           <div className="flex items-center space-x-2 text-[12px] font-black text-typography">
                              <Calendar size={14} className="text-secondary/20" />
                              <span>{mounted ? new Date(slot.startDate).toLocaleDateString() : '...'}</span>
                              <ChevronRight size={12} className="text-secondary/20" />
                              <span>{mounted ? new Date(slot.endDate).toLocaleDateString() : '...'}</span>
                           </div>
                          <p className="text-[10px] font-bold text-typography/60 mt-2 italic">Rate: ₹{(slot.price/1000).toFixed(1)}k / month</p>
                       </div>
                    </td>
                    <td className="px-10 py-8">
                       <div className="grid grid-cols-2 gap-4">
                          <div>
                             <p className="text-[14px] font-black text-typography tracking-tighter">{(slot.performance.impressions/1000).toFixed(1)}k</p>
                             <p className="text-[8px] font-bold text-secondary/20 uppercase tracking-widest underline decoration-primary/10">Reach</p>
                          </div>
                          <div>
                             <p className="text-[14px] font-black text-emerald-500 tracking-tighter">{slot.performance.leads}</p>
                             <p className="text-[8px] font-bold text-secondary/20 uppercase tracking-widest underline decoration-emerald-500/10">Leads</p>
                          </div>
                       </div>
                    </td>
                    <td className="px-10 py-8">
                       <span className={cn(
                          "inline-flex items-center space-x-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                          slot.status === 'ACTIVE' ? "bg-emerald-50 text-emerald-600 border border-emerald-100" :
                          slot.status === 'UPCOMING' ? "bg-indigo-50 text-indigo-600 border border-indigo-100" :
                          slot.status === 'EXPIRED' ? "bg-rose-50 text-rose-600 border border-rose-100" :
                          "bg-gray-50 text-gray-600 border border-gray-100"
                       )}>
                          <div className={cn("w-1.5 h-1.5 rounded-full", slot.status === 'ACTIVE' ? "bg-emerald-500 animate-pulse" : "bg-current")} />
                          <span>{slot.status}</span>
                       </span>
                    </td>
                    <td className="px-10 py-8 text-right">
                       <div className="flex items-center justify-end space-x-2">
                          <button className="p-4 bg-white border border-gray-100 rounded-2xl hover:bg-amber-500 hover:text-white transition-all shadow-sm group/btn" title="View Heatmap">
                             <Zap size={18} />
                          </button>
                          <button className="p-4 bg-white border border-gray-100 rounded-2xl hover:bg-primary hover:text-white transition-all shadow-sm group/btn" title="Edit Booking">
                             <ExternalLink size={18} />
                          </button>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
           </table>
        </div>

        <div className="p-10 border-t border-gray-50 flex items-center justify-between bg-snow-pearl/30">
           <div className="flex items-center space-x-4">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-xs font-black text-emerald-600 uppercase tracking-widest italic leading-none">Yield Optimization Node: 4 upcoming slots available for bidding</p>
           </div>
           <button className="flex items-center space-x-2 text-[10px] font-black text-secondary/40 uppercase tracking-widest hover:text-primary transition-all">
              <span>View Historical Yield Report</span>
              <Download size={12} />
           </button>
        </div>
      </section>
    </div>
  );
}
