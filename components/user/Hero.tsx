"use client";

import { useState, useEffect, useRef } from "react";
import { Search, MapPin, Sparkles, MoveRight, Command } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

export default function Hero() {
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  
  // Parallax effects
  const y1 = useTransform(scrollY, [0, 1000], [0, 300]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -200]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);
  const scale = useTransform(scrollY, [0, 600], [1, 0.98]);

  const words = ["Potential", "Ambition", "Career", "Legacy"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % words.length), 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-[95vh] flex items-center justify-center pt-48 overflow-hidden font-montserrat">
      {/* Dynamic Aura Background */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -20, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-100/30 rounded-full blur-[140px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            x: [0, -30, 0],
            y: [0, 20, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-100/40 rounded-full blur-[140px]" 
        />
      </div>

      {/* Parallax Decorative Shapes */}
      <motion.div style={{ y: y1 }} className="absolute top-1/4 right-[10%] w-32 h-32 border border-slate-100 rounded-full opacity-20 hidden lg:block" />
      <motion.div style={{ y: y2 }} className="absolute bottom-1/4 left-[5%] w-48 h-48 border border-slate-100 rounded-3xl rotate-12 opacity-10 hidden lg:block" />

      <motion.div 
        style={{ opacity, scale }}
        className="max-w-7xl mx-auto px-6 relative z-10 w-full"
      >
        <div className="flex flex-col items-center text-center space-y-12">
          
          {/* Intelligent Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="group flex items-center space-x-3 bg-white/40 backdrop-blur-md px-5 py-2 rounded-full border border-slate-200/50 shadow-sm cursor-help hover:border-secondary transition-colors"
          >
            <Sparkles size={14} className="text-secondary animate-pulse" />
            <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-slate-500">Global Academic Intelligence v5.0</span>
          </motion.div>

          {/* Master Heading */}
          <div className="space-y-6">
            <h1 className="text-6xl md:text-9xl font-light text-slate-900 tracking-tighter leading-[0.9] flex flex-col items-center">
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                Engineer Your
              </motion.span>
              <div className="relative h-[1.6em] overflow-hidden flex justify-center mt-6 w-full">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={words[index]}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute text-secondary italic font-medium whitespace-nowrap"
                  >
                    {words[index]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-slate-400 text-base md:text-lg font-normal max-w-2xl mx-auto leading-relaxed tracking-tight"
            >
              The definitive discovery layer for higher education. Synchronizing the world's brightest <span className="text-slate-900 font-medium">10M+ seekers</span> with future-proof excellence.
            </motion.p>
          </div>

          {/* Hyper-Search Interaction */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="w-full max-w-4xl relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-[32px] blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-1000" />
            
            <div className="relative bg-white/80 backdrop-blur-3xl p-3 rounded-[28px] border border-slate-200 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.06)] transition-all">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="relative flex-1 w-full flex items-center">
                  <Search size={20} className="absolute left-6 text-slate-300 pointer-events-none group-focus-within:text-secondary transition-colors" />
                  <input 
                    type="text"
                    placeholder="Search Colleges, Curriculums or Career Pathways..."
                    className="w-full pl-16 pr-8 py-5 rounded-2xl text-base font-light outline-none text-slate-600 placeholder:text-slate-300 bg-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <div className="absolute right-6 hidden md:flex items-center space-x-2 text-slate-300 bg-slate-50 px-2 py-1.5 rounded-lg border border-slate-100">
                    <Command size={10} />
                    <span className="text-[10px] font-medium">K</span>
                  </div>
                </div>
                
                <button className="w-full md:w-auto bg-slate-950 text-white px-10 py-5 rounded-2xl text-xs font-medium tracking-[0.2em] uppercase flex items-center justify-center space-x-4 hover:bg-secondary transition-all shadow-xl shadow-slate-900/10 active:scale-[0.98]">
                  <span>Begin Search</span>
                  <MoveRight size={16} />
                </button>
              </div>
            </div>
            
            {/* Context Tags */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
               <span className="text-[10px] font-medium uppercase text-slate-400 tracking-[0.3em]">Trending Hubs:</span>
               {["IIT Bombay", "LPU Online", "MBA Delhi", "DU Admission"].map((tag) => (
                 <motion.button 
                   whileHover={{ y: -3, scale: 1.05 }}
                   whileTap={{ scale: 0.95 }}
                   key={tag} 
                   className="px-5 py-2 bg-white/50 backdrop-blur-sm rounded-full text-[9px] font-medium text-slate-500 border border-slate-200 shadow-sm hover:border-secondary hover:text-secondary transition-all"
                 >
                   {tag}
                 </motion.button>
               ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Elegant Bottom Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
