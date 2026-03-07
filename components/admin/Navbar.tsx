"use client";

import { Bell, Search, User, Settings, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export function Navbar() {
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
        <h2 className="text-xl font-bold text-gray-800 tracking-tight whitespace-nowrap">Dashboard Overview</h2>
      </div>

      <div className="flex items-center space-x-6 w-full justify-end">
        <form onSubmit={handleSearch} className="relative group hidden sm:block">
           <Search size={18} className="text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 group-hover:text-primary transition-colors" />
           <input 
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
             placeholder="Search platform..." 
             className="bg-gray-50 border border-transparent pl-12 pr-6 py-2.5 rounded-lg text-sm font-medium w-64 lg:w-96 focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all outline-none text-gray-800 placeholder:text-gray-400"
           />
        </form>

        <div className="flex items-center space-x-4">
          <button className="relative w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center hover:bg-gray-100 text-gray-500 transition-all active:scale-95 group border border-gray-100">
             <Bell size={18} className="group-hover:text-gray-700" />
             {notifications > 0 && (
               <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm ring-2 ring-white">
                 {notifications}
               </span>
             )}
          </button>
          
          <div className="flex items-center space-x-4 pl-4 border-l border-gray-200">
             <div className="text-right">
                <p className="text-sm font-bold text-gray-800">Vishal Sandal</p>
                <p className="text-xs font-medium text-gray-500">Super Admin</p>
             </div>
             <div className="w-10 h-10 bg-primary rounded-full shadow-sm group cursor-pointer hover:ring-4 ring-primary/10 transition-all flex items-center justify-center text-white font-bold text-lg">
                V
             </div>
          </div>
        </div>
      </div>
    </header>
  );
}
