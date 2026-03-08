"use client";

import { useState, useEffect } from "react";
import { 
  Bell, 
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
  LayoutGrid,
  Send,
  Mail,
  MessageCircle,
  Smartphone,
  CheckCircle2,
  XCircle,
  MoreVertical,
  Wifi,
  Megaphone
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Campaign {
  id: string;
  name: string;
  type: string;
  channel: string;
  sent: string | number;
  open_rate: string;
}

export default function NotificationHubPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [status, setStatus] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotificationHubData();
  }, []);

  const fetchNotificationHubData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/notifications/hub");
      const data = await res.json();
      setCampaigns(data.active_campaigns);
      setStatus(data.status);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12 pb-20 font-montserrat italic">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-4 border-b border-gray-100 italic transition-all">
        <div>
           <div className="flex items-center space-x-3 mb-2">
              <div className="bg-primary/5 px-3 py-1.5 rounded-xl border border-primary/10">
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary italic lowercase">Omnichannel Hub</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30">Global Distribution Console</span>
           </div>
           <h1 className="text-3xl md:text-3xl md:text-5xl font-black text-typography tracking-tighter leading-none mb-1">
             Omni <span className="text-primary italic italic">Link</span> Center
           </h1>
           <p className="text-secondary/40 text-sm font-bold uppercase tracking-widest mt-2">
              Orchestrating 10M+ Student Lifecycle Communications
           </p>
        </div>

        <div className="flex items-center space-x-4">
           <div className="bg-emerald-50 px-8 py-4 rounded-3xl border border-emerald-100 flex items-center space-x-4 group animate-in slide-in-from-right">
              <div className="w-10 h-10 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                 <Wifi size={18} />
              </div>
              <div>
                 <p className="text-[9px] font-black uppercase tracking-widest text-emerald-800">Delivery Node-9</p>
                 <p className="text-xl font-black text-emerald-900">{status?.delivery_rate || "99.9%"}</p>
              </div>
           </div>
           <button className="flex items-center space-x-2 px-8 py-5 bg-primary text-white rounded-3xl text-[11px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20">
              <Megaphone size={18} />
              <span>Blast Global Alert</span>
           </button>
        </div>
      </section>

      {/* Delivery Stats Strip */}
      <div className="grid grid-cols-4 gap-5">
         <div className="bg-white p-6 rounded-2xl border border-gray-50 shadow-sm group hover:border-primary/20 transition-all">
            <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform mb-6">
               <Layers size={22} />
            </div>
            <p className="text-3xl font-black text-typography tracking-tighter mb-1">{status?.queue_size || "0"}</p>
            <p className="text-[10px] font-bold text-secondary/40 uppercase tracking-widest">Active Queue</p>
         </div>
         <div className="bg-white p-6 rounded-2xl border border-gray-50 shadow-sm group hover:border-primary/20 transition-all">
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform mb-6">
               <MessageCircle size={22} />
            </div>
            <p className="text-3xl font-black text-typography tracking-tighter mb-1">{status?.whatsapp_balance || "₹0"}</p>
            <p className="text-[10px] font-bold text-secondary/40 uppercase tracking-widest">WhatsApp Balance</p>
         </div>
         <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm group hover:border-sky-500/20 transition-all">
            <div className="w-12 h-12 bg-sky-50 rounded-2xl flex items-center justify-center text-sky-500 group-hover:scale-110 transition-transform mb-6">
               <Mail size={22} />
            </div>
            <p className="text-3xl font-black text-typography tracking-tighter mb-1 text-sky-600">PRO</p>
            <p className="text-[10px] font-bold text-secondary/40 uppercase tracking-widest whitespace-nowrap overflow-hidden text-ellipsis">Enterprise SMTP Status</p>
         </div>
         <div className="bg-white p-6 rounded-2xl border border-gray-50 shadow-sm group hover:border-primary/20 transition-all overflow-hidden">
            <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-secondary/10 group-hover:text-primary group-hover:bg-primary/5 transition-all mb-6">
               <Activity size={22} />
            </div>
            <p className="text-3xl font-black text-typography tracking-tighter mb-1">REAL</p>
            <p className="text-[10px] font-bold text-secondary/40 uppercase tracking-widest truncate">Latency: 0.2ms</p>
         </div>
      </div>

      {/* Main Campaign Management Overlay */}
      <section className="grid grid-cols-12 gap-5">
         {/* Active Campaigns */}
         <div className="col-span-12 lg:col-span-8 bg-white p-12 rounded-[3.5rem] border border-gray-50 shadow-sm overflow-hidden relative">
            <div className="flex items-center justify-between mb-6">
               <div>
                  <h3 className="text-3xl font-black text-typography tracking-tight">Active Campaigns</h3>
                  <p className="text-[10px] font-bold text-secondary/40 uppercase tracking-widest mt-1 italic capitalize">Omnichannel Lifecycles (Push, WhatsApp, SMTP)</p>
               </div>
               <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded-2xl border border-gray-100">
                  <button className="px-6 py-2.5 bg-white text-primary rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm">All Types</button>
                  <button className="px-6 py-2.5 text-secondary/30 hover:text-secondary rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">Lifecycle Only</button>
               </div>
            </div>

            <div className="space-y-6 pb-20">
               {loading ? [...Array(3)].map((_, i) => (
                 <div key={i} className="h-20 bg-gray-50 animate-pulse rounded-2xl" />
               )) : campaigns.map((c) => (
                 <div key={c.id} className="group flex items-center justify-between p-5 bg-gray-50/50 rounded-2xl border border-gray-100 hover:bg-white hover:border-primary/20 transition-all cursor-pointer">
                    <div className="flex items-center space-x-8">
                       <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-secondary/30 group-hover:text-primary shadow-sm transition-all rotate-3 group-hover:rotate-0">
                          {c.channel === 'PUSH' ? <Smartphone size={24} /> : c.channel === 'WHATSAPP' ? <MessageCircle size={24} /> : <Mail size={24} />}
                       </div>
                       <div>
                          <h4 className="text-base font-black text-typography line-clamp-1 group-hover:text-primary transition-colors">{c.name}</h4>
                          <div className="flex items-center space-x-3 text-[10px] font-bold text-secondary/20 uppercase tracking-widest mt-1 italic">
                             <span className="text-secondary/40">{c.type}</span>
                             <div className="w-1 h-1 bg-secondary/10 rounded-full" />
                             <span>Sent to {typeof c.sent === 'number' ? (c.sent/1000).toFixed(1) + 'K' : c.sent} Students</span>
                          </div>
                       </div>
                    </div>

                    <div className="flex items-center space-x-10 text-typography">
                       <div className="text-right">
                          <p className="text-xl font-black">{c.open_rate}</p>
                          <p className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Open Rate</p>
                       </div>
                       <button className="p-4 bg-white border border-gray-100 rounded-2xl hover:bg-primary hover:text-white transition-all shadow-sm">
                          <ExternalLink size={18} />
                       </button>
                    </div>
                 </div>
               ))}
            </div>
            
            <div className="absolute left-0 bottom-0 w-full p-6 bg-gradient-to-t from-white to-transparent pointer-events-none flex justify-center">
               <button className="pointer-events-auto px-10 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-secondary/40 hover:text-primary transition-all">View Campaign Archive</button>
            </div>
         </div>

         {/* Send Panel */}
         <div className="col-span-12 lg:col-span-4 bg-typography p-12 rounded-[4rem] text-white shadow-2xl shadow-primary/20 relative overflow-hidden flex flex-col justify-between group/dark">
            <div className="absolute right-0 bottom-0 w-1/2 h-1/2 bg-gradient-to-tl from-primary/10 to-transparent pointer-events-none" />
            
            <div>
               <h3 className="text-3xl font-black tracking-tight leading-none mb-2">Instant <span className="text-primary italic italic">Blast</span></h3>
               <p className="text-[10px] font-black text-secondary/30 uppercase tracking-[0.2em] mb-12">Global High-Priority Push Access</p>
               
               <div className="space-y-6 italic">
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Alert Title</label>
                     <input className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-xs font-bold outline-none focus:ring-2 focus:ring-primary/40 transition-all font-montserrat italic" placeholder="e.g. JEE Main Results Declared!" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Push Body Context</label>
                     <textarea rows={4} className="w-full bg-white/5 border border-white/10 p-6 rounded-3xl text-xs font-bold outline-none focus:ring-2 focus:ring-primary/40 transition-all resize-none font-montserrat italic" placeholder="Check your national rank and institutional eligibility now..." />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                     <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex items-center space-x-3 cursor-pointer hover:bg-white/10 transition-all active:scale-95 group/check">
                        <div className="w-5 h-5 rounded-lg border border-white/20 flex items-center justify-center text-primary group-hover/check:bg-white transition-all">
                           <CheckCircle2 size={12} />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest">Pin to Top</span>
                     </div>
                     <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex items-center space-x-3 cursor-pointer hover:bg-white/10 transition-all active:scale-95 group/check">
                        <div className="w-5 h-5 rounded-lg border border-white/20 flex items-center justify-center text-emerald-500 group-hover/check:bg-white transition-all">
                           <CheckCircle2 size={12} />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest">Notify Sales</span>
                     </div>
                  </div>
               </div>
            </div>

            <button className="w-full py-6 bg-primary text-white rounded-3xl text-[11px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-primary/40 flex items-center justify-center space-x-4 mt-12 animate-in slide-in-from-bottom">
               <Send size={18} className="rotate-45" />
               <span>Initiate Global Relay</span>
            </button>
         </div>
      </section>

      {/* Warning Overlay */}
      <section className="bg-amber-50 p-6 rounded-[3.5rem] border border-amber-100 flex items-start space-x-6">
         <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-amber-500 shadow-sm border border-amber-50 group transition-all">
            <AlertTriangle size={28} className="group-hover:rotate-12 transition-transform" />
         </div>
         <div>
            <h4 className="text-xl font-black text-amber-900 uppercase tracking-tight italic">Relay Compliance Logic</h4>
            <p className="text-sm font-bold text-amber-800 leading-relaxed max-w-4xl mt-1 uppercase tracking-widest italic truncate opacity-60">
              Sending global alerts to 10M+ users is a high-cost operation. Ensure the content is verified and double-check CRM sync tags before deployment. All global relays are audited by the Head of Operations.
            </p>
         </div>
      </section>
    </div>
  );
}
