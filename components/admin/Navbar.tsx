"use client";

import { Bell, Search, User, Settings, CheckCircle2, Menu } from "lucide-react";
import { useState } from "react";

interface NavbarProps {
  onMenuClick: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  const [notifications] = useState(12);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if(searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      // Implement actual search routing here if needed
    }
  };

  return (
    <header className="h-20 border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 px-4 md:px-8 flex items-center justify-between z-40">
      <div className="flex items-center space-x-4">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2 hover:bg-gray-100 rounded-xl text-gray-600 transition-colors"
        >
          <Menu size={24} />
        </button>
        <h2 className="text-xl font-bold text-gray-800 tracking-tight whitespace-nowrap hidden xs:block">Dashboard Overview</h2>
      </div>

      <div className="flex items-center space-x-2 md:space-x-4 w-full justify-end">
        <form onSubmit={handleSearch} className="relative group flex-1 max-w-[400px] hidden xs:block">
           <Search size={16} className="text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 group-hover:text-primary transition-colors" />
           <input 
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
             placeholder="Search..." 
             className="bg-gray-50 border border-transparent pl-10 pr-4 py-2 rounded-lg text-xs font-medium w-full focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all outline-none text-gray-800 placeholder:text-gray-400"
           />
        </form>

        <div className="flex items-center space-x-2 md:space-x-4">
          <button className="relative w-9 h-9 bg-gray-50 rounded-lg flex items-center justify-center hover:bg-gray-100 text-gray-500 transition-all active:scale-95 group border border-gray-100 shrink-0">
             <Bell size={16} className="group-hover:text-gray-700" />
             {notifications > 0 && (
               <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-sm">
                 {notifications}
               </span>
             )}
          </button>
          
          <div className="flex items-center space-x-2 md:space-x-4 pl-2 md:pl-4 border-l border-gray-200">
             <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-gray-800 line-clamp-1">Vishal Sandal</p>
                <p className="text-[10px] font-medium text-gray-500">Super Admin</p>
             </div>
             <div className="w-9 h-9 md:w-10 md:h-10 bg-primary rounded-full shadow-sm group cursor-pointer hover:ring-4 ring-primary/10 transition-all flex items-center justify-center text-white font-bold text-base md:text-lg shrink-0">
                V
             </div>
          </div>
        </div>
      </div>
    </header>
  );
}
