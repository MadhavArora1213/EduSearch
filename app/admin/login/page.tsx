"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
    <div className="min-h-screen flex items-center justify-center p-6 bg-snow-pearl">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-[0_20px_50px_rgba(11,36,71,0.15)] overflow-hidden">
        <div className="p-10 pt-12 text-center">
          <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/5 text-primary">
            <svg
              className="w-10 h-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A10.003 10.003 0 0012 3v8m0 0v8a10.003 10.003 0 008.257-4.305l-.054-.09A9.998 9.998 0 0112 11z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-typography mb-2 font-sans">Welcome Back</h1>
          <p className="text-secondary/60 text-sm font-sans">Sign in to manage your portal</p>
        </div>

        <form onSubmit={handleLogin} className="px-10 pb-10 space-y-5">
          {error && (
            <div className="bg-red-50 text-red-600 text-xs p-4 rounded-xl border border-red-100 animate-in fade-in slide-in-from-top-2 font-sans font-bold">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-bold text-typography uppercase tracking-wider font-sans">
              Email Address / Admin User
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all duration-200 text-typography placeholder:text-gray-400 font-sans"
              placeholder="admin@edusearch.com"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-typography uppercase tracking-wider font-sans">
                Password
              </label>
              <a href="#" className="text-[10px] font-black text-primary/70 hover:text-primary transition-colors uppercase tracking-widest font-sans">
                Forgot?
              </a>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all duration-200 text-typography placeholder:text-gray-400 font-sans"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary hover:bg-yale-blue text-white font-black py-5 rounded-2xl shadow-lg shadow-primary/20 active:scale-[0.98] transition-all duration-200 flex items-center justify-center space-x-2 font-sans"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <span>Sign In</span>
            )}
          </button>
        </form>

        <div className="px-10 py-6 bg-gray-50/50 text-center border-t border-gray-100 font-sans">
          <p className="text-xs text-secondary/40 font-bold">
            Secure Admin Access System — &copy; 2026 EduSearch Operations
          </p>
        </div>
      </div>
    </div>
  );
}
