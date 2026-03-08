"use client";

import { useState } from "react";
import { 
  User,
  Smartphone,
  Mail,
  Calendar,
  Zap,
  ShieldCheck,
  Clock,
  ChevronRight,
  History,
  Target,
  FileText,
  MessageSquare,
  Lock,
  XCircle,
  RefreshCw,
  MailCheck,
  Trash2,
  Search,
  ArrowLeft,
  ArrowUpRight,
  TrendingUp,
  MapPin
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function StudentDetail({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState<'ACTIVITY' | 'LEADS' | 'APPS' | 'REVIEWS'>('ACTIVITY');

  // Mock student data
  const student = {
    id: params.id,
    name: "Aaryan Verma",
    email: "aaryan.verma.tech@gmail.com", // Fully visible to admin
    phone: "+91 98765 43210",
    registrationDate: "March 1, 2026",
    loginMethod: "GOOGLE",
    status: "ACTIVE",
    lastIp: "42.108.12.3",
    location: "New Delhi, India"
  };

  return (
    <div className="space-y-10">
      {/* Breadcrumb & Actions Header */}
      <section className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0 pb-6 border-b border-gray-100">
        <Link href="/admin/users" className="group flex items-center space-x-3 text-secondary/40 hover:text-primary transition-all">
           <div className="w-10 h-10 bg-white rounded-xl border border-gray-100 flex items-center justify-center group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all">
              <ArrowLeft size={18} />
           </div>
           <span className="text-xs font-black uppercase tracking-widest">Back to Registry</span>
        </Link>

        <div className="flex items-center space-x-4">
           <button className="flex items-center space-x-2 px-6 py-4 bg-white border border-gray-200 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:border-primary/20 transition-all">
              <RefreshCw size={16} />
              <span>Reset Password</span>
           </button>
           <button className="flex items-center space-x-2 px-6 py-4 bg-white border border-gray-200 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:border-emerald-500/20 text-emerald-600 transition-all">
              <MailCheck size={16} />
              <span>Verify Email</span>
           </button>
           <button className="flex items-center space-x-2 px-6 py-4 bg-rose-50 border border-rose-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-rose-600 hover:bg-rose-600 hover:text-white transition-all">
              <XCircle size={16} />
              <span>Suspend Account</span>
           </button>
        </div>
      </section>

      <div className="grid grid-cols-12 gap-10">
        {/* Profile Sidebar */}
        <div className="col-span-12 lg:col-span-4 space-y-8">
           <div className="bg-white p-10 rounded-[3rem] border border-gray-50 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8">
                 <ShieldCheck size={48} className="text-secondary/5 -mr-2 -mt-2 group-hover:text-primary/10 transition-colors" />
              </div>
              <div className="w-24 h-24 bg-snow-pearl rounded-[2.5rem] flex items-center justify-center text-primary mb-8 shadow-inner">
                 <User size={42} />
              </div>
              <h2 className="text-3xl font-black text-typography tracking-tighter mb-2">{student.name}</h2>
              <p className="text-[10px] font-black text-secondary/30 uppercase tracking-[0.2em] mb-8">{student.id}</p>
              
              <div className="space-y-6">
                 <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-snow-pearl rounded-xl flex items-center justify-center text-secondary/30"><Mail size={18} /></div>
                    <div>
                       <p className="text-[10px] font-black text-secondary/20 uppercase tracking-widest">Email Address</p>
                       <p className="text-[13px] font-bold text-typography">{student.email}</p>
                    </div>
                 </div>
                 <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-snow-pearl rounded-xl flex items-center justify-center text-secondary/30"><Smartphone size={18} /></div>
                    <div>
                       <p className="text-[10px] font-black text-secondary/20 uppercase tracking-widest">Phone Number</p>
                       <p className="text-[13px] font-bold text-typography">{student.phone}</p>
                    </div>
                 </div>
                 <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-snow-pearl rounded-xl flex items-center justify-center text-secondary/30"><MapPin size={18} /></div>
                    <div>
                       <p className="text-[10px] font-black text-secondary/20 uppercase tracking-widest">Last Known IP / Loc</p>
                       <p className="text-[13px] font-bold text-typography">{student.lastIp} ({student.location})</p>
                    </div>
                 </div>
              </div>

              <div className="mt-10 pt-10 border-t border-gray-50 flex items-center justify-between">
                 <div>
                    <p className="text-[20px] font-black text-typography tracking-tight">Active</p>
                    <p className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest italic">Current Status</p>
                 </div>
                 <div className="text-right">
                    <p className="text-[14px] font-black text-typography italic">{student.loginMethod}</p>
                    <p className="text-[9px] font-bold text-secondary/20 uppercase tracking-widest">Auth Provider</p>
                 </div>
              </div>
           </div>

           <div className="bg-slate-900 p-10 rounded-[3rem] text-white overflow-hidden relative group">
              <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:scale-125 transition-transform duration-1000">
                 <Trash2 size={80} className="text-rose-500" />
              </div>
              <h4 className="text-xl font-black tracking-tighter italic lowercase">Danger Zone</h4>
              <p className="text-[10px] font-bold text-slate-400 mt-4 leading-relaxed uppercase tracking-widest">
                 Permanent deletion of all personal data. This action is irreversible and compliant with DPDP Act 2023.
              </p>
              <button className="mt-8 w-full py-4 bg-rose-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-500 transition-all flex items-center justify-center space-x-2">
                 <Trash2 size={16} />
                 <span>Execute DPDP Deletion</span>
              </button>
           </div>
        </div>

        {/* Dynamic Detail Content */}
        <div className="col-span-12 lg:col-span-8 flex flex-col space-y-8">
           <div className="bg-white rounded-[3rem] border border-gray-50 shadow-sm overflow-hidden flex flex-col flex-1">
              <div className="p-2 bg-snow-pearl flex border-b border-gray-50">
                 {[
                   { id: 'ACTIVITY', label: 'Activity Feed', icon: History },
                   { id: 'LEADS', label: 'Lead History', icon: Target },
                   { id: 'APPS', label: 'Applications', icon: FileText },
                   { id: 'REVIEWS', label: 'Reviews', icon: MessageSquare }
                 ].map((tab) => (
                   <button 
                     key={tab.id}
                     onClick={() => setActiveTab(tab.id as any)}
                     className={cn(
                       "flex-1 flex items-center justify-center space-x-3 py-5 rounded-[2.5rem] text-[10px] font-black uppercase tracking-widest transition-all",
                       activeTab === tab.id ? "bg-white text-primary shadow-sm ring-1 ring-gray-100" : "text-secondary/40 hover:text-secondary"
                     )}
                   >
                     <tab.icon size={16} />
                     <span>{tab.label}</span>
                   </button>
                 ))}
              </div>

              <div className="p-10 flex-1 overflow-y-auto no-scrollbar max-h-[700px]">
                 {activeTab === 'ACTIVITY' && (
                   <div className="space-y-8">
                      {[
                        { action: "Applied for MBA", target: "IIT Bombay", time: "10 mins ago", type: "APP", meta: "₹500 Fee Paid" },
                        { action: "AI Counselor Session", target: "Career Pathing - Finance", time: "2 hours ago", type: "AI", meta: "24 Tokens Consumed" },
                        { action: "Profile View", target: "Amity University (Noida)", time: "Yesterday", type: "VIEW", meta: "Duration: 4m 20s" },
                        { action: "Lead Submitted", target: "SRM University (CSE)", time: "March 5th", type: "LEAD", meta: "Quality: High" },
                        { action: "Keyword Search", target: "'Best Medical Colleges in Bangalore'", time: "March 4th", type: "SEARCH", meta: "6 Results Clicked" }
                      ].map((item, i) => (
                        <div key={i} className="flex relative pl-10 pb-8 last:pb-0">
                           {i !== 4 && <div className="absolute left-[7px] top-6 bottom-0 w-px bg-gray-100" />}
                           <div className="absolute left-0 top-1 w-4 h-4 rounded-full border-4 border-white bg-primary ring-4 ring-primary/5 shadow-sm" />
                           <div className="flex-1 bg-snow-pearl/30 p-6 rounded-3xl border border-gray-50 group hover:border-primary/20 transition-all">
                              <div className="flex items-center justify-between mb-2">
                                 <span className="text-[10px] font-black text-primary uppercase italic tracking-widest">{item.type}</span>
                                 <span className="text-[10px] font-bold text-secondary/30 uppercase tracking-widest">{item.time}</span>
                              </div>
                              <h5 className="text-[13px] font-black text-typography uppercase tracking-tight">{item.action}</h5>
                              <p className="text-[11px] font-bold text-secondary/60 mt-1">Target: {item.target}</p>
                              <div className="mt-4 flex items-center space-x-2 text-[9px] font-black text-secondary/30 uppercase tracking-widest bg-white px-3 py-1 rounded-full w-fit italic border border-gray-100/50">
                                 <Zap size={10} />
                                 <span>{item.meta}</span>
                              </div>
                           </div>
                        </div>
                      ))}
                   </div>
                 )}

                 {activeTab === 'LEADS' && (
                    <div className="flex flex-col items-center justify-center h-full py-20 text-center uppercase">
                       <Target size={48} className="text-secondary/10 mb-6" />
                       <p className="text-[11px] font-black text-secondary/30 tracking-widest">Detailed Lead Distribution Log Available in B2B Hub</p>
                       <Link href="/admin/operations/leads" className="mt-6 text-xs font-black text-primary underline decoration-primary/10">Jump to Lead Monitor</Link>
                    </div>
                 )}

                 {activeTab === 'APPS' && (
                    <div className="space-y-4">
                       {[1, 2].map((_, i) => (
                          <div key={i} className="p-8 bg-snow-pearl/50 rounded-3xl border border-gray-100 flex items-center justify-between group hover:border-primary/20 transition-all">
                             <div className="flex items-center space-x-6">
                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm"><FileText size={24} /></div>
                                <div>
                                   <p className="text-[10px] font-black text-secondary/20 uppercase tracking-widest leading-none mb-1">IIT Bombay - MBA</p>
                                   <p className="text-[14px] font-black text-typography uppercase tracking-tight">Application #APP-882103</p>
                                   <span className="inline-block mt-2 text-[9px] font-black bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full uppercase tracking-tighter">Paid & Submitted</span>
                                </div>
                             </div>
                             <button className="p-4 bg-white rounded-2xl border border-gray-100 text-secondary/20 hover:text-primary transition-all">
                                <ArrowUpRight size={20} />
                             </button>
                          </div>
                       ))}
                    </div>
                 )}

                 {activeTab === 'REVIEWS' && (
                    <div className="flex flex-col items-center justify-center h-full py-20 text-center uppercase">
                       <MessageSquare size={48} className="text-secondary/10 mb-6" />
                       <p className="text-[11px] font-black text-secondary/30 tracking-widest italic lowercase">Student has contributed 12 validated reviews</p>
                       <Link href="/admin/moderation/reviews" className="mt-6 text-xs font-black text-primary underline decoration-primary/10 tracking-widest">Moderate User Content</Link>
                    </div>
                 )}
              </div>
           </div>

           <div className="grid grid-cols-2 gap-8">
              <div className="bg-white p-10 rounded-[3rem] border border-gray-50 shadow-sm flex items-center justify-between">
                 <div>
                    <p className="text-4xl font-black text-typography tracking-tighter">1,240</p>
                    <p className="text-[10px] font-bold text-secondary/30 uppercase tracking-widest mt-1">Total Profile Views</p>
                 </div>
                 <trendingUp size={32} className="text-emerald-500 bg-emerald-50 p-2 rounded-xl" />
              </div>
              <div className="bg-white p-10 rounded-[3rem] border border-gray-50 shadow-sm flex items-center justify-between">
                 <div>
                    <p className="text-4xl font-black text-typography tracking-tighter">₹2.4k</p>
                    <p className="text-[10px] font-bold text-secondary/30 uppercase tracking-widest mt-1">Total Platform spend</p>
                 </div>
                 <TrendingUp size={32} className="text-primary bg-primary/5 p-2 rounded-xl" />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
