"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Sparkles, Brain, ArrowRight, Activity, Zap, Cpu } from "lucide-react";
import { useState, useEffect } from "react";

export default function AICounselorBanner() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    "Analyzing Cutoff Trajectories...",
    "Synchronizing Placement Logs...",
    "Calibrating Neural Match...",
    "Ready for Consultation."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 px-6 font-montserrat relative overflow-hidden bg-white">
      {/* Background Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 pointer-events-none">
         <div className="absolute top-[20%] left-[10%] w-[40%] h-[40%] bg-blue-50/50 rounded-full blur-[120px]" />
         <div className="absolute bottom-[20%] right-[10%] w-[40%] h-[40%] bg-indigo-50/50 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="bg-slate-950 rounded-[48px] p-8 md:p-20 relative overflow-hidden shadow-[0_40px_100px_-24px_rgba(0,0,0,0.3)] group">
          {/* Animated Mesh Overlay */}
          <div className="absolute inset-0 opacity-20 noise-bg mix-blend-overlay pointer-events-none" />
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
              rotate: [0, 45, 0]
            }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute -top-1/4 -right-1/4 w-[80%] h-[80%] bg-secondary rounded-full blur-[160px]" 
          />

          <div className="grid lg:grid-cols-2 gap-20 items-center relative z-10">
            <div className="space-y-10">
              <div className="space-y-6">
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="inline-flex items-center space-x-3 bg-white/5 border border-white/10 px-5 py-2 rounded-full backdrop-blur-sm"
                >
                  <Sparkles size={14} className="text-secondary" />
                  <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-blue-100/60">Autonomous Intelligence</span>
                </motion.div>

                <h2 className="text-5xl md:text-7xl font-light text-white tracking-tighter leading-[0.9] uppercase">
                  Your Personal <br />
                  <span className="italic font-medium text-secondary">Decision Hub.</span>
                </h2>

                <p className="text-slate-400 text-sm md:text-base font-normal max-w-lg leading-relaxed tracking-tight">
                  Beyond algorithms. Our proprietary Llama-powered cluster maps your ambition against a multi-dimensional registry of 35k institutions.
                </p>
              </div>

              {/* Live Status Logic */}
              <div className="flex items-center space-x-6 py-4 border-y border-white/5">
                 <div className="flex flex-col gap-1">
                    <p className="text-[9px] font-medium text-white/30 uppercase tracking-[0.3em]">System Status</p>
                    <div className="flex items-center space-x-2">
                       <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                       <AnimatePresence mode="wait">
                          <motion.span 
                            key={activeStep}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            className="text-[10px] font-medium text-white uppercase tracking-widest"
                          >
                             {steps[activeStep]}
                          </motion.span>
                       </AnimatePresence>
                    </div>
                 </div>
                 <div className="w-px h-8 bg-white/10" />
                 <div className="flex flex-col gap-1">
                    <p className="text-[9px] font-medium text-white/30 uppercase tracking-[0.3em]">Active Peers</p>
                    <p className="text-[10px] font-medium text-white uppercase tracking-widest">1.4M Nodes</p>
                 </div>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group px-10 py-5 bg-white text-slate-950 rounded-2xl text-[10px] font-medium uppercase tracking-[0.3em] flex items-center space-x-4 shadow-2xl shadow-white/5"
              >
                <span>Initialize AI Match</span>
                <ArrowRight size={16} className="text-secondary group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>

            {/* Visual Column: The "Brain" Console */}
            <div className="relative">
               <motion.div 
                 animate={{ y: [0, -15, 0] }}
                 transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                 className="relative bg-white/5 backdrop-blur-3xl rounded-[40px] border border-white/10 p-8 shadow-2xl"
               >
                  <div className="flex items-center justify-between mb-10 pb-6 border-b border-white/5">
                     <div className="w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center shadow-lg shadow-secondary/20">
                        <Brain size={24} className="text-white" />
                     </div>
                     <div className="flex items-center space-x-2 bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/10">
                        <Activity size={14} className="text-emerald-500" />
                        <span className="text-[10px] font-medium text-emerald-400 uppercase tracking-widest">Live Flux</span>
                     </div>
                  </div>

                  <div className="space-y-6">
                     {[
                       { icon: Zap, label: "Placement Predictor", status: "Calibrating", color: "text-amber-400" },
                       { icon: Cpu, label: "ROI Node Analysis", status: "Active", color: "text-blue-400" },
                       { icon: MessageSquare, label: "Natural Language Sync", status: "Ready", color: "text-emerald-400" }
                     ].map((item, i) => (
                       <motion.div 
                         initial={{ opacity: 0, x: 20 }}
                         whileInView={{ opacity: 1, x: 0 }}
                         transition={{ delay: i * 0.1 }}
                         key={i} 
                         className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/[0.08] transition-all"
                       >
                          <div className="flex items-center space-x-4">
                             <item.icon size={18} className={item.color} />
                             <span className="text-[11px] font-medium text-white/80 uppercase tracking-widest">{item.label}</span>
                          </div>
                          <span className="text-[9px] font-medium text-white/20 uppercase tracking-[0.2em]">{item.status}</span>
                       </motion.div>
                     ))}
                  </div>

                  {/* Mock Chart Bar */}
                  <div className="mt-10 flex gap-2 h-12 items-end">
                     {[40, 70, 45, 90, 60, 80, 50, 95].map((h, i) => (
                       <motion.div 
                         key={i}
                         initial={{ height: 0 }}
                         whileInView={{ height: `${h}%` }}
                         transition={{ delay: 1 + (i * 0.05), duration: 1, ease: "easeOut" }}
                         className="flex-1 bg-secondary/20 rounded-t-sm border-t border-secondary/40"
                       />
                     ))}
                  </div>
               </motion.div>

               {/* Overlapping Glass Detail */}
               <motion.div 
                 style={{ y: -40, x: 40 }}
                 className="absolute -bottom-10 -right-10 bg-white/10 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-2xl hidden md:block"
               >
                  <p className="text-[9px] font-medium text-white/40 uppercase tracking-[0.3em] mb-4">Neural Certainty</p>
                  <p className="text-4xl font-light text-white tracking-tighter">99.4<span className="text-secondary font-medium">%</span></p>
               </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
