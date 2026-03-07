"use client";

import { Bell, Search, User, Settings, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [notifications] = useState(12);

  return (
    <header className="h-20 border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 px-10 flex items-center justify-between z-40">
      <div className="flex items-center space-x-4">
        <h2 className="text-xl font-black text-typography tracking-tight">Command Centre</h2>
        <div className="h-6 w-px bg-gray-100 mx-2" />
        <div className="flex items-center space-x-2 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
           <CheckCircle2 size={14} className="text-emerald-500" />
           <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">All Systems Operational</span>
        </div>
      </div>

      <div className="flex items-center space-x-8">
        <div className="relative group">
           <Search size={20} className="text-secondary/40 absolute left-4 top-1/2 -translate-y-1/2 group-hover:text-primary transition-colors" />
           <input 
             placeholder="Global Search (Ctrl+K)" 
             className="bg-gray-50 border-0 pl-12 pr-6 py-3 rounded-2xl text-[13px] font-bold w-64 focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none text-typography"
           />
        </div>

        <div className="flex items-center space-x-4">
          <button className="relative w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center hover:bg-primary/5 hover:text-primary transition-all active:scale-95 group">
             <Bell size={20} className="group-hover:animate-bounce" />
             {notifications > 0 && (
               <span className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-red-500 border-4 border-white text-white text-[10px] font-black rounded-full flex items-center justify-center shadow-lg shadow-red-500/30">
                 {notifications}
               </span>
             )}
          </button>
          
          <div className="flex items-center space-x-4 pl-4 border-l border-gray-100">
             <div className="text-right">
                <p className="text-xs font-black text-typography uppercase tracking-wider">Vishal Sandal</p>
                <p className="text-[10px] font-bold text-secondary/40 uppercase tracking-widest">Super Admin</p>
             </div>
             <div className="w-12 h-12 bg-gradient-to-br from-primary to-yale-blue rounded-2xl p-[1px] shadow-lg shadow-primary/20 group cursor-pointer hover:rotate-6 transition-all">
                <div className="w-full h-full bg-white rounded-[15px] flex items-center justify-center overflow-hidden">
                   <div className="w-full h-full bg-primary/5 flex items-center justify-center text-primary font-black uppercase text-xl italic">
                      V
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </header>
  );
}
