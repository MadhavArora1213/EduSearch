"use client";

import { motion } from "framer-motion";
import { 
  Calculator as CalcIcon, 
  Target as RankIcon, 
  Clock as AlertIcon, 
  Globe as AbroadIcon,
  ShieldCheck as VerifyIcon,
  ArrowRight as LinkIcon,
  Activity
} from "lucide-react";

export default function InnovationHub() {
  const tools = [
    { 
      title: "Fee & ROI Calculator", 
      desc: "Calculate course fees and estimated return on investment for top colleges.", 
      icon: CalcIcon, 
      color: "text-emerald-500", 
      bg: "bg-emerald-50/50",
      tag: "Admission Planning"
    },
    { 
      title: "College Rank Predictor", 
      desc: "Predict your college admission chances based on entrance exam scores.", 
      icon: RankIcon, 
      color: "text-blue-500", 
      bg: "bg-blue-50/50",
      tag: "Entrance Exams"
    },
    { 
      title: "Counseling Alerts", 
      desc: "Get real-time updates on counseling dates, seat vacancy, and cutoffs.", 
      icon: AlertIcon, 
      color: "text-amber-500", 
      bg: "bg-amber-50/50",
      tag: "Admissions 2026"
    },
    { 
      title: "Study Abroad Guide", 
      desc: "Complete assistance for international admissions and visa processing.", 
      icon: AbroadIcon, 
      color: "text-indigo-500", 
      bg: "bg-indigo-50/50",
      tag: "Global Education"
    }
  ];

  return (
    <section className="py-24 px-6 bg-slate-50/30 font-montserrat relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-20 items-start">
          
          {/* Static Detail Column */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-6">
               <div className="inline-flex items-center space-x-3 bg-white px-4 py-1.5 rounded-full border border-slate-200 shadow-sm">
                  <Activity size={12} className="text-secondary" />
                  <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-slate-400">Student Success Tools</span>
               </div>
               <h2 className="text-5xl md:text-7xl font-light text-slate-900 tracking-tighter leading-none">
                  Smart Admission <br /> 
                  <span className="italic font-medium text-slate-900/40">Planning Tools.</span>
               </h2>
               <p className="text-slate-500 text-sm md:text-base font-normal max-w-sm leading-relaxed tracking-tight">
                  Everything you need to plan your career—from fee comparisons to exam rank predictors and international admission guides.
               </p>
            </div>

            <div className="flex flex-col gap-6">
               <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-slate-100 shadow-sm">
                     <VerifyIcon size={18} className="text-secondary" />
                  </div>
                  <div>
                     <p className="text-[11px] font-medium text-slate-900 uppercase tracking-widest leading-none mb-1">Authentic Data</p>
                     <p className="text-[9px] font-normal text-slate-400 uppercase tracking-[0.2em]">Verified NIRF & University Info</p>
                  </div>
               </div>
               <button className="flex items-center space-x-3 text-[10px] font-medium text-slate-900 uppercase tracking-[0.3em] hover:text-secondary transition-colors">
                  <span>Explore Admission Hub</span>
                  <LinkIcon size={14} />
               </button>
            </div>
          </div>

          {/* Dynamic Cards Column */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4 relative">
             <div className="absolute inset-0 bg-blue-50/50 blur-[100px] -z-10" />
             
             {tools.map((tool, i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, scale: 0.98 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 transition={{ delay: i * 0.1 }}
                 whileHover={{ y: -8, backgroundColor: "white" }}
                 className="p-10 rounded-[40px] border border-slate-100/60 bg-white/40 backdrop-blur-sm space-y-6 hover:shadow-[0_40px_80px_-24px_rgba(0,0,0,0.08)] transition-all duration-500 group cursor-pointer"
               >
                 <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${tool.bg} border border-white transition-transform group-hover:rotate-6`}>
                    <tool.icon size={28} className={tool.color} strokeWidth={1.5} />
                 </div>
                 <div className="space-y-4">
                    <div className="flex flex-col gap-1">
                       <span className="text-[8px] font-medium text-secondary uppercase tracking-[0.3em]">{tool.tag}</span>
                       <h3 className="text-lg font-medium text-slate-800 tracking-tight uppercase">{tool.title}</h3>
                    </div>
                    <p className="text-[11px] text-slate-400 font-normal leading-relaxed uppercase tracking-wider">{tool.desc}</p>
                 </div>
                 <div className="pt-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center">
                       <LinkIcon size={14} className="text-slate-300" />
                    </div>
                 </div>
               </motion.div>
             ))}
          </div>
        </div>
      </div>
    </section>
  );
}
