"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Database, Globe2, Lock, Cpu, Sparkles } from "lucide-react";

export default function ValueProp() {
  const points = [
    { title: "Neural Logic", desc: "Proprietary Llama-powered cluster for private counseling.", icon: Cpu },
    { title: "Verified Hub", desc: "Direct-from-source synchronization with 35k+ institutions.", icon: Database },
    { title: "Global Gateway", desc: "End-to-end migration nodes for US, UK, and Canada entry.", icon: Globe2 },
    { title: "Secure Identity", desc: "Enterprise-grade DPDP compliance and identity protocol.", icon: Lock }
  ];

  return (
    <section className="py-24 px-6 bg-white font-montserrat overflow-hidden relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          <div className="space-y-12">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-3 bg-secondary/5 px-4 py-2 rounded-full border border-secondary/10">
                <ShieldCheck size={14} className="text-secondary" />
                <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-secondary">Trust Infrastructure</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-light text-slate-900 tracking-tighter leading-none">
                Platform <br /> 
                <span className="italic font-medium text-slate-900/40">Integrity.</span>
              </h2>
              <p className="text-slate-500 text-sm md:text-base font-normal max-w-lg leading-relaxed tracking-tight">
                Academic discovery requires absolute veracity. We've built the high-integrity foundation needed for verified life-changing transitions.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-10">
              {points.map((p, i) => (
                <div key={i} className="space-y-4">
                  <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 shadow-sm transition-transform hover:scale-110">
                    <p.icon size={22} className="text-secondary" strokeWidth={1.5} />
                  </div>
                  <div className="space-y-2">
                     <h4 className="text-xs font-medium text-slate-800 uppercase tracking-widest">{p.title}</h4>
                     <p className="text-[10px] text-slate-400 font-normal uppercase tracking-widest leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative aspect-square lg:pl-20">
             {/* Central Hub Orb */}
             <div className="w-full h-full bg-slate-50 rounded-full border border-slate-100 flex items-center justify-center relative group">
                <motion.div 
                   animate={{ rotate: 360 }}
                   transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                   className="absolute inset-[10%] border border-dashed border-slate-200 rounded-full" 
                />
                <motion.div 
                   animate={{ rotate: -360 }}
                   transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                   className="absolute inset-[25%] border border-slate-100 rounded-full" 
                />
                
                <div className="text-center relative z-10 space-y-4">
                   <div className="flex justify-center">
                      <Sparkles size={40} className="text-secondary/20 group-hover:text-secondary transition-colors duration-700" />
                   </div>
                   <div className="space-y-1">
                      <p className="text-5xl md:text-8xl font-light text-slate-900 tracking-tighter">99.9<span className="text-secondary font-medium">%</span></p>
                      <p className="text-[10px] font-medium text-slate-300 uppercase tracking-[0.6em]">System Veracity</p>
                   </div>
                </div>

                {/* Satellite Nodes */}
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity, delay: i * 1 }}
                    className="absolute w-2 h-2 bg-secondary rounded-full"
                    style={{
                      top: `${50 + 40 * Math.sin(i * Math.PI / 2)}%`,
                      left: `${50 + 40 * Math.cos(i * Math.PI / 2)}%`,
                    }}
                  />
                ))}
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
