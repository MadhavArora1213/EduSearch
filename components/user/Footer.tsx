"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  GraduationCap, 
  Mail, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  ArrowUpRight,
  ShieldCheck,
  Globe,
  Sparkles
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Premier Nodes",
      links: ["IIT Bombay", "BITS Pilani", "IIM Ahmedabad", "LPU Punjab", "VIT Vellore"]
    },
    {
      title: "Navigation",
      links: ["Entrance Exams", "Rank Predictors", "Study Abroad", "Scholarship Hub", "AI Counselor"]
    }
  ];

  return (
    <footer className="bg-white border-t border-slate-50 pt-32 pb-16 px-6 font-montserrat relative overflow-hidden">
      {/* Decorative Gradient Flare */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-t from-slate-50/50 to-transparent -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-24">
          
          {/* Brand & Mission */}
          <div className="lg:col-span-5 space-y-10">
            <Link href="/" className="flex items-center space-x-3 group">
               <div className="w-10 h-10 bg-slate-950 rounded-xl flex items-center justify-center shadow-2xl group-hover:bg-secondary transition-colors duration-500">
                 <GraduationCap size={20} className="text-white" />
               </div>
               <div className="flex flex-col">
                 <span className="text-sm font-medium tracking-[0.4em] uppercase text-slate-900 leading-none">
                   Edu<span className="text-secondary italic">Search</span>
                 </span>
                 <span className="text-[8px] font-medium uppercase tracking-[0.5em] text-slate-400 mt-1">Foundational Registry</span>
               </div>
            </Link>
            
            <p className="text-slate-400 text-xs font-normal leading-relaxed tracking-tight max-w-sm">
              The definitive discovery layer for higher education. Synchronizing the world's brightest <span className="text-slate-900 font-medium whitespace-nowrap">10M+ seekers</span> with future-proof excellence through verified institutional data.
            </p>

            <div className="flex items-center space-x-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <motion.button 
                  whileHover={{ y: -3, backgroundColor: "rgb(15 23 42 / 0.05)" }}
                  key={i} 
                  className="w-10 h-10 bg-slate-50/50 rounded-xl flex items-center justify-center text-slate-400 border border-slate-100 transition-all"
                >
                  <Icon size={14} />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Link Groups */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8">
            {footerLinks.map((group) => (
              <div key={group.title} className="space-y-8">
                <h4 className="text-[10px] font-medium uppercase tracking-[0.4em] text-slate-900 border-l border-secondary pl-3">
                  {group.title}
                </h4>
                <ul className="space-y-4">
                  {group.links.map((link) => (
                    <li key={link}>
                      <Link href="#" className="flex items-center group">
                        <span className="text-[11px] font-normal text-slate-400 uppercase tracking-widest group-hover:text-slate-900 transition-colors">
                          {link}
                        </span>
                        <ArrowUpRight size={10} className="ml-2 text-secondary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact Node */}
          <div className="lg:col-span-3 space-y-10">
            <h4 className="text-[10px] font-medium uppercase tracking-[0.4em] text-slate-900 border-l border-secondary pl-3">Registry HQ</h4>
            <div className="space-y-6">
               <div className="flex items-start space-x-4 group cursor-pointer">
                  <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 group-hover:border-secondary/20 transition-colors">
                     <MapPin size={16} className="text-slate-400 group-hover:text-secondary" />
                  </div>
                  <p className="text-[11px] font-normal text-slate-400 uppercase tracking-widest leading-relaxed pt-1">
                     Sector 62, Digital Park, <br />Noida, UP, 201301
                  </p>
               </div>
               
               <motion.div 
                 whileHover={{ scale: 1.02 }}
                 className="p-5 bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-between relative overflow-hidden"
               >
                  <div className="flex items-center space-x-3 relative z-10">
                     <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                     <span className="text-[9px] font-medium uppercase tracking-[0.4em] text-slate-600">Global Sync Online</span>
                  </div>
                  <Globe size={16} className="text-slate-200" />
               </motion.div>
            </div>
          </div>
        </div>

        {/* Global Footer Bottom */}
        <div className="pt-12 border-t border-slate-50 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
             <p className="text-[9px] font-medium text-slate-300 uppercase tracking-[0.4em]">© {currentYear} EduSearch Intelligence Matrix</p>
             <div className="flex items-center space-x-2 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                <ShieldCheck size={12} className="text-secondary" />
                <span className="text-[8px] font-medium uppercase text-slate-400 tracking-widest">DPDP Secured Registry Node</span>
             </div>
          </div>

          <div className="flex items-center space-x-10">
             {["Protocol", "Privacy", "Licensing"].map(item => (
               <Link key={item} href="#" className="text-[9px] font-medium text-slate-300 uppercase tracking-[0.4em] hover:text-slate-900 transition-colors">
                 {item}
               </Link>
             ))}
          </div>

          <div className="hidden lg:flex items-center space-x-6 text-[8px] font-medium text-slate-200 uppercase tracking-[0.5em]">
             <div className="flex items-center space-x-2">
                <div className="w-1 h-1 bg-emerald-500 rounded-full" />
                <span>42ms</span>
             </div>
             <span>Build v5.0.1</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
