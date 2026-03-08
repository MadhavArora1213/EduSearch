"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, ArrowRight, Lock, User, Terminal, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push("/admin/dashboard");
      } else {
        setError(data.message || "Invalid credentials");
        setIsLoading(false);
      }
    } catch (err) {
      setError("An error occurred. Please check your database connection.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex items-center justify-center p-4 sm:p-5 font-montserrat">
      
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[2rem] shadow-2xl overflow-hidden min-h-[600px]">
        
        {/* Left Side - Access Form */}
        <div className="p-6 sm:p-14 flex flex-col justify-center relative">
           <div className="w-full max-w-sm mx-auto">
              <div className="mb-6">
                 <div className="flex items-center space-x-3 mb-8">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-md">
                       <span className="text-white font-bold text-xl leading-none">E</span>
                    </div>
                    <span className="font-extrabold text-2xl tracking-tight text-typography">EduSearch<span className="text-primary">.</span></span>
                 </div>
                 
                 <h1 className="text-3xl font-extrabold text-typography tracking-tight mb-2">
                   Operations Panel
                 </h1>
                 <p className="text-gray-500 text-sm font-medium">Please sign in to access your dashboard.</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                 {error && (
                   <div className="bg-red-50 text-red-600 text-xs font-semibold p-4 rounded-xl border border-red-100 flex items-center space-x-3">
                     <ShieldCheck size={16} />
                     <span>{error}</span>
                   </div>
                 )}

                 <div className="space-y-1.5">
                   <label className="text-xs font-bold text-gray-500 uppercase tracking-wider pl-1">Sign In ID</label>
                   <div className="relative">
                      <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3.5 pl-11 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all font-medium text-sm text-typography placeholder:text-gray-400"
                        placeholder="admin@edusearch.com"
                      />
                   </div>
                 </div>

                 <div className="space-y-1.5">
                   <label className="text-xs font-bold text-gray-500 uppercase tracking-wider pl-1">Passkey</label>
                   <div className="relative">
                      <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3.5 pl-11 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all font-medium text-sm text-typography placeholder:text-gray-400"
                        placeholder="••••••••••••"
                      />
                   </div>
                 </div>

                 <button
                   type="submit"
                   disabled={isLoading}
                   className="w-full bg-primary hover:bg-yale-blue text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 active:scale-[0.98] transition-all flex items-center justify-center space-x-2 mt-4 text-sm"
                 >
                   {isLoading ? (
                     <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                   ) : (
                     <>
                        <span>Secure Login</span>
                        <ArrowRight size={16} />
                     </>
                   )}
                 </button>
              </form>

           </div>
        </div>

        {/* Right Side - Visual/Branding */}
        <div className="hidden lg:flex flex-col justify-center p-14 bg-primary text-white relative h-full">
           
           <div className="relative z-10 max-w-md mx-auto">
              <div className="mb-6 text-white/50">
                 <ShieldCheck size={48} strokeWidth={1.5} />
              </div>
              <h2 className="text-4xl font-extrabold tracking-tight leading-[1.2] mb-6">
                 Centralized <br /> Administration.
              </h2>
              <p className="text-white/70 text-base leading-relaxed mb-12 font-medium">
                 Manage 55,000+ institutions, monitor millions of student interactions, and govern platform security from a single, unified interface.
              </p>

              <div className="space-y-4">
                 <div className="flex items-center space-x-4 bg-white/5 p-4 rounded-2xl border border-white/10 text-sm font-medium">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                       <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    </div>
                    <span>System operates at 99.9% uptime.</span>
                 </div>
                 <div className="flex items-center space-x-4 bg-white/5 p-4 rounded-2xl border border-white/10 text-sm font-medium">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                       <Cpu size={14} className="text-blue-400" />
                    </div>
                    <span>Real-time AI query processing online.</span>
                 </div>
              </div>
           </div>
           
           {/* Abstract Decoration */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
           <div className="absolute bottom-[-10%] left-[-10%] w-80 h-80 bg-blue-500/20 rounded-full blur-3xl opacity-50" />
        </div>
      </div>
    </div>
  );
}
