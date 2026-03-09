"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, GraduationCap, Globe, BookOpen, MessageSquare, Sparkles, MoveRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  
  const navHeight = useTransform(scrollY, [0, 50], ["96px", "72px"]);
  const navBg = useTransform(scrollY, [0, 50], ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.8)"]);
  const navBorder = useTransform(scrollY, [0, 50], ["rgba(255, 255, 255, 0)", "rgba(15, 23, 42, 0.05)"]);

  const navLinks = [
    { name: "Colleges", href: "/colleges", icon: GraduationCap },
    { name: "Exams", href: "/exams", icon: BookOpen },
    { name: "Study Abroad", href: "/study-abroad", icon: Globe },
    { name: "Counseling", href: "/counseling", icon: MessageSquare, highlight: true },
  ];

  return (
    <motion.nav 
      style={{ height: navHeight, backgroundColor: navBg, borderColor: navBorder }}
      className="fixed top-0 left-0 right-0 z-[100] px-6 md:px-12 border-b transition-all duration-300 font-montserrat backdrop-blur-md flex items-center"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between w-full">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
           <div className="w-10 h-10 bg-slate-950 rounded-xl flex items-center justify-center shadow-2xl group-hover:rotate-6 transition-all duration-500">
             <GraduationCap size={20} className="text-white" />
           </div>
           <div className="flex flex-col">
             <span className="text-sm font-medium tracking-[0.4em] uppercase text-slate-900 leading-none">
               Edu<span className="text-secondary italic">Search</span>
             </span>
             <span className="text-[7px] font-medium uppercase tracking-[0.5em] text-slate-400 mt-1">2026 Admissions</span>
           </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center p-1.5 bg-slate-50/50 rounded-full border border-slate-100">
           {navLinks.map((link) => (
             <Link 
               key={link.name} 
               href={link.href}
               className={cn(
                 "text-[9px] font-medium uppercase tracking-[0.3em] px-6 py-2.5 rounded-full transition-all relative group overflow-hidden",
                 link.highlight ? "text-secondary" : "text-slate-400 hover:text-slate-900"
               )}
             >
               <span className="relative z-10">{link.name}</span>
               <div className="absolute inset-0 bg-white scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full -z-0 shadow-sm" />
             </Link>
           ))}
        </div>

        {/* User Actions */}
        <div className="flex items-center space-x-4">
           <button className="hidden md:block text-[9px] font-medium uppercase tracking-[0.4em] text-slate-400 hover:text-slate-900 transition-colors">Login</button>
           <motion.button 
             whileHover={{ x: 3 }}
             className="group text-[9px] font-medium uppercase tracking-[0.3em] bg-slate-950 text-white px-8 py-3.5 rounded-full hover:bg-secondary transition-all shadow-xl shadow-slate-950/10 flex items-center space-x-3"
           >
             <span>Get Started</span>
             <MoveRight size={14} className="group-hover:translate-x-1 transition-transform" />
           </motion.button>
           <button 
             className="lg:hidden p-2 text-slate-950"
             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
           >
             {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
           </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden fixed inset-0 top-[72px] bg-white z-[90] px-10 py-16 flex flex-col justify-between"
          >
            <div className="space-y-12">
              <p className="text-[8px] font-medium uppercase tracking-[0.6em] text-slate-300">Quick Links</p>
              <div className="flex flex-col space-y-8">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-4xl font-light text-slate-800 tracking-tighter hover:italic hover:text-secondary transition-all"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="h-px bg-slate-100 w-full" />
              <div className="flex flex-col space-y-4">
                <button className="w-full py-5 border border-slate-100 rounded-2xl text-[10px] uppercase font-medium tracking-[0.4em] text-slate-400">Student Login</button>
                <button className="w-full py-5 bg-slate-950 text-white rounded-2xl text-[10px] uppercase font-medium tracking-[0.4em]">Register Now</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
