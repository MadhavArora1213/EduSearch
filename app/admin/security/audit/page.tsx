"use client";

import { useState, useEffect } from "react";
import { 
  ShieldCheck, 
  ChevronRight, 
  Search, 
  Zap, 
  Globe, 
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
  Megaphone,
  Fingerprint,
  Lock,
  Eye,
  FileText,
  UserCheck
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AuditLog {
  id: string;
  admin: string;
  action: string;
  target: string;
  details: string;
  time: string;
  ip: string;
  status: string;
}

export default function SecurityAuditPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAuditLogs();
  }, []);

  const fetchAuditLogs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/security/audit");
      const data = await res.json();
      setLogs(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12 pb-20 font-montserrat italic">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-6 border-b border-gray-100 italic transition-all">
        <div>
           <div className="flex items-center space-x-3 mb-2">
              <div className="bg-primary/5 px-3 py-1.5 rounded-xl border border-primary/10">
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary italic lowercase">Security & Governance</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30">Master Audit Link Protocol</span>
           </div>
           <h1 className="text-5xl font-black text-typography tracking-tighter leading-none mb-1">
             Vigilance <span className="text-primary italic italic">Audit</span> Stream
           </h1>
           <p className="text-secondary/40 text-sm font-bold uppercase tracking-widest mt-2 overflow-hidden text-ellipsis whitespace-nowrap">
              Tracking High-Impact Administrative Change & Protocol Integrity
           </p>
        </div>

        <div className="flex items-center space-x-4">
           <div className="bg-emerald-50 px-8 py-4 rounded-3xl border border-emerald-100 flex items-center space-x-4 group animate-in slide-in-from-right">
              <div className="w-10 h-10 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                 <UserCheck size={18} />
              </div>
              <div>
                 <p className="text-[9px] font-black uppercase tracking-widest text-emerald-800">Auth Health</p>
                 <p className="text-xl font-black text-emerald-900">100% SECURE</p>
              </div>
           </div>
           <button className="flex items-center space-x-3 px-8 py-5 bg-gray-50 border border-secondary/5 rounded-3xl text-[11px] font-black uppercase tracking-widest hover:bg-white hover:border-primary/20 transition-all active:scale-95 text-secondary/60">
              <Download size={18} />
              <span>Export Compliance Log</span>
           </button>
        </div>
      </section>

      {/* Security Widgets */}
      <div className="grid grid-cols-4 gap-8">
         <div className="bg-white p-10 rounded-[3rem] border border-gray-50 shadow-sm group hover:border-primary/20 transition-all overflow-hidden relative">
            <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-primary/5 rounded-full group-hover:scale-150 transition-transform duration-700" />
            <div className="flex items-center justify-between mb-6 relative">
               <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary">
                  <Fingerprint size={24} />
               </div>
               <span className="text-[9px] font-black bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full uppercase italic">ACTIVE</span>
            </div>
            <p className="text-3xl font-black text-typography mb-1">942</p>
            <p className="text-[10px] font-bold text-secondary/30 uppercase tracking-widest">Master Auth Logins (24h)</p>
         </div>
         <div className="bg-white p-10 rounded-[3rem] border border-gray-50 shadow-sm group hover:border-primary/20 transition-all overflow-hidden relative">
            <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-sky-50 rounded-full group-hover:scale-150 transition-transform duration-700" />
            <div>
               <div className="flex items-center justify-between mb-6 relative">
                  <div className="w-12 h-12 bg-sky-50 rounded-2xl flex items-center justify-center text-sky-500">
                     <Users size={24} />
                  </div>
                  <span className="text-[9px] font-black text-sky-600">LIVE</span>
               </div>
               <p className="text-3xl font-black text-typography mb-1">18</p>
               <p className="text-[10px] font-bold text-secondary/30 uppercase tracking-widest">Active Admin Sessions</p>
            </div>
         </div>
         <div className="bg-white p-10 rounded-[3rem] border border-gray-50 shadow-sm group hover:border-primary/20 transition-all overflow-hidden relative">
            <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-amber-50 rounded-full group-hover:scale-150 transition-transform duration-700" />
            <div className="flex items-center justify-between mb-6 relative">
               <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500">
                  <Lock size={24} />
               </div>
               <span className="text-[9px] font-black bg-amber-50 text-amber-600 px-3 py-1 rounded-full uppercase italic">MFA ON</span>
            </div>
            <p className="text-3xl font-black text-typography mb-1">04</p>
            <p className="text-[10px] font-bold text-secondary/30 uppercase tracking-widest">Failed Attempts (Auto-Flag)</p>
         </div>
         <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm group hover:border-primary/20 transition-all overflow-hidden relative">
            <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-red-50 rounded-full group-hover:scale-150 transition-transform duration-700" />
            <div className="flex items-center justify-between mb-6 relative">
               <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-red-500">
                  <ShieldCheck size={24} />
               </div>
               <span className="text-[9px] font-black bg-red-50 text-red-600 px-3 py-1 rounded-full uppercase italic">THREAT_STOP</span>
            </div>
            <p className="text-3xl font-black text-typography mb-1">2,491</p>
            <p className="text-[10px] font-bold text-secondary/30 uppercase tracking-widest truncate">SQLi / XSS Threats Blocked</p>
         </div>
      </div>

      {/* Audit Stream Console */}
      <section className="bg-white rounded-[4rem] border border-gray-50 shadow-sm overflow-hidden min-h-[600px] mb-20 animate-in fade-in transition-all">
         <div className="p-10 border-b border-gray-50 flex items-center justify-between italic bg-snow-pearl/30">
            <div className="flex items-center space-x-10">
               <div className="flex items-center space-x-2 bg-gray-50 p-1.5 rounded-2xl border border-gray-100">
                 {["Real-time Stream", "Critical Errors", "Sensitive Changes"].map((t) => (
                   <button key={t} className={cn(
                     "px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                     t === "Real-time Stream" ? "bg-white text-primary shadow-sm shadow-black/5" : "text-secondary/30 hover:text-secondary"
                   )}>{t}</button>
                 ))}
               </div>
            </div>
            
            <div className="flex items-center space-x-6">
               <div className="relative group w-80">
                  <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-secondary/20 group-focus-within:text-primary transition-colors" />
                  <input placeholder="Search Admin, Action or ID..." className="w-full bg-gray-50 border-0 pl-14 pr-6 py-4 rounded-2xl text-[13px] font-bold outline-none focus:ring-4 focus:ring-primary/5 transition-all text-typography uppercase" />
               </div>
               <button className="p-4 bg-gray-50 rounded-2xl border border-gray-100 text-secondary/40 hover:text-primary transition-all">
                  <Filter size={18} />
               </button>
            </div>
         </div>

         <div className="divide-y divide-gray-50 uppercase tracking-widest font-black italic">
           {loading ? [...Array(4)].map((_, i) => (
             <div key={i} className="p-10 animate-pulse h-24 bg-gray-50/50" />
           )) : logs.map((log) => (
             <div key={log.id} className="p-10 group hover:bg-gray-50/50 transition-all flex items-center justify-between text-typography animate-in slide-in-from-bottom transition-all">
                <div className="flex items-center space-x-10 flex-1">
                   <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-secondary/10 group-hover:text-primary group-hover:bg-primary/5 transition-all">
                      <Terminal size={24} />
                   </div>
                   
                   <div className="grid grid-cols-12 gap-10 flex-1">
                      <div className="col-span-12 lg:col-span-3">
                         <p className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary/30 mb-1 leading-none italic uppercase">Administrative Entity</p>
                         <h4 className="text-sm font-black text-typography uppercase tracking-tighter truncate overflow-hidden text-ellipsis whitespace-nowrap">{log.admin}</h4>
                      </div>
                      <div className="col-span-12 lg:col-span-3">
                         <p className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary/30 mb-1 leading-none italic uppercase">Action Protocol</p>
                         <span className="px-3 py-1 bg-primary/5 text-primary text-[11px] font-black rounded-lg border border-primary/10 italic truncate overflow-hidden text-ellipsis whitespace-nowrap inline-block">
                            {log.action}
                         </span>
                      </div>
                      <div className="col-span-12 lg:col-span-4">
                         <p className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary/30 mb-1 leading-none italic uppercase">Operation Details</p>
                         <p className="text-[11px] font-bold text-typography line-clamp-1 italic lowercase tracking-tight">{log.details}</p>
                      </div>
                      <div className="col-span-12 lg:col-span-2 text-right">
                         <p className="text-[12px] font-black text-typography italic">{log.time}</p>
                         <p className="text-[9px] font-black text-secondary/20 uppercase tracking-[0.2em] italic truncate overflow-hidden text-ellipsis whitespace-nowrap mt-1 lowercase italic">{log.ip}</p>
                      </div>
                   </div>
                </div>

                <div className="flex items-center space-x-6 ml-10">
                   {log.status === 'FLAGGED' ? (
                     <div className="flex items-center space-x-2 text-amber-500 bg-amber-50 px-5 py-2 rounded-full border border-amber-100 flex-shrink-0">
                        <AlertTriangle size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest leading-none">Flagged</span>
                     </div>
                   ) : (
                     <div className="flex items-center space-x-2 text-emerald-500 bg-emerald-50 px-5 py-2 rounded-full border border-emerald-100 flex-shrink-0">
                        <CheckCircle2 size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest leading-none">Success</span>
                     </div>
                   )}
                   <button className="p-3 bg-white border border-gray-100 rounded-xl hover:bg-primary hover:text-white transition-all shadow-sm flex-shrink-0">
                      <Eye size={16} />
                   </button>
                </div>
             </div>
           ))}
         </div>

         <div className="p-10 border-t border-gray-50 flex items-center justify-between text-typography italic bg-snow-pearl/30">
            <p className="text-xs font-black text-secondary/30 uppercase tracking-[0.2em] italic capitalize">Global Audit Relay Processing Node-7</p>
            <button className="px-10 py-5 bg-gray-50 border border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-secondary/40 hover:text-primary transition-all">Load Full Session Stream</button>
         </div>
      </section>

      {/* Permissions Matrix Warning */}
      <section className="bg-typography p-16 rounded-[4rem] text-white overflow-hidden group shadow-2xl shadow-primary/20 relative">
         <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-primary/10 to-transparent pointer-events-none" />
         
         <div className="grid grid-cols-12 gap-10 items-center relative">
            <div className="col-span-12 lg:col-span-7 space-y-8 italic">
               <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                     <ShieldCheck size={32} />
                  </div>
                  <div>
                     <h3 className="text-4xl font-black tracking-tight leading-none italic uppercase">RBAC <span className="text-secondary/40">Protocol</span></h3>
                     <p className="text-sm font-bold text-secondary/30 uppercase tracking-widest mt-2">v.5.2 Security Layer</p>
                  </div>
               </div>
               
               <p className="text-xl font-bold text-white/50 leading-relaxed max-w-2xl italic">
                  Configuring granular access for 42+ internal staff members across 12 operational modules. Every permission change is force-synced to SSO.
               </p>

               <div className="flex items-center space-x-4">
                  <button className="px-10 py-5 bg-white text-typography rounded-[2rem] text-[11px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-white/5 flex items-center space-x-3">
                     <Settings size={16} />
                     <span>Manage Permissions Matrix</span>
                  </button>
                  <button className="px-10 py-5 bg-white/5 border border-white/10 text-white rounded-[2rem] text-[11px] font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center space-x-3">
                     <FileText size={16} />
                     <span>View Access Logs</span>
                  </button>
               </div>
            </div>

            <div className="col-span-12 lg:col-span-5 italic">
               <div className="space-y-4">
                  {[
                    { role: "Super Admin", access: "FULL_SYSTEM_R_W", color: "text-primary" },
                    { role: "Moderator", access: "CONTENT_AUDIT_ONLY", color: "text-amber-500" },
                    { role: "Sales SPOC", access: "LEAD_INTAKE_R_W", color: "text-emerald-500" }
                  ].map((r) => (
                    <div key={r.role} className="bg-white/5 p-6 rounded-[2.5rem] border border-white/10 flex items-center justify-between group cursor-help hover:bg-white/10 transition-all">
                       <span className="text-sm font-black uppercase tracking-tighter">{r.role}</span>
                       <span className={cn("text-[9px] font-black uppercase tracking-[0.2em] italic", r.color)}>{r.access}</span>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
