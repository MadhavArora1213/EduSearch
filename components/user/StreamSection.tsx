"use client";

import { Monitor, Briefcase, Heart, Palette, Scale, Microscope, Plane, Gamepad2, ArrowUpRight, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

export default function StreamSection() {
  const streams = [
    { name: "Engineering", count: "12,402", icon: Monitor, color: "text-blue-600", bg: "bg-blue-50/50" },
    { name: "Management", count: "8,210", icon: Briefcase, color: "text-emerald-600", bg: "bg-emerald-50/50" },
    { name: "Medical", count: "4,102", icon: Heart, color: "text-rose-600", bg: "bg-rose-50/50" },
    { name: "Design", count: "1,200", icon: Palette, color: "text-purple-600", bg: "bg-purple-50/50" },
    { name: "Law", count: "840", icon: Scale, color: "text-amber-600", bg: "bg-amber-50/50" },
    { name: "Science", count: "3,100", icon: Microscope, color: "text-cyan-600", bg: "bg-cyan-50/50" },
    { name: "Aviation", count: "120", icon: Plane, color: "text-indigo-600", bg: "bg-indigo-50/50" },
    { name: "Animation", count: "240", icon: Gamepad2, color: "text-pink-600", bg: "bg-pink-50/50" },
  ];

  return (
    <section className="py-24 px-6 bg-white font-montserrat">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-8 md:space-y-0">
          <div className="space-y-4">
             <div className="flex items-center space-x-2 text-slate-400">
                <GraduationCap size={14} className="text-secondary" />
                <span className="text-[10px] font-medium uppercase tracking-[0.4em]">Academic Disciplinary Hub</span>
             </div>
             <h2 className="text-4xl md:text-6xl font-light text-slate-900 tracking-tighter leading-none">
                Specialized <br className="hidden md:block" /> 
                <span className="italic font-medium text-slate-900/40">Knowledge Streams.</span>
             </h2>
          </div>
          <p className="text-slate-400 text-xs font-normal max-w-xs leading-relaxed uppercase tracking-widest text-right">
             Mapping 800+ disciplinary branches across the global cluster.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {streams.map((stream, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05, duration: 0.6 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group p-8 rounded-[32px] border border-slate-100 hover:border-secondary/20 hover:bg-slate-50/50 transition-all duration-500 cursor-pointer flex flex-col items-center text-center space-y-6"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${stream.bg} transition-transform group-hover:rotate-6`}>
                <stream.icon size={28} className={stream.color} strokeWidth={1.5} />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-slate-800 uppercase tracking-widest">{stream.name}</h3>
                <p className="text-[10px] text-slate-400 font-normal uppercase tracking-[0.2em]">{stream.count} Nodes</p>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-2 text-[8px] font-medium text-secondary uppercase tracking-widest">
                 <span>Explore Flow</span>
                 <ArrowUpRight size={10} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
