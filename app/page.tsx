"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/user/Navbar";
import Hero from "@/components/user/Hero";
import StreamSection from "@/components/user/StreamSection";
import FeaturedColleges from "@/components/user/FeaturedColleges";
import InnovationHub from "@/components/user/InnovationHub";
import AICounselorBanner from "@/components/user/AICounselorBanner";
import ValueProp from "@/components/user/ValueProp";
import Footer from "@/components/user/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white selection:bg-secondary/10 selection:text-secondary overflow-x-hidden relative">
      {/* Visual Shell */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: `linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }} 
        />
        
        <motion.div 
          animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[10%] left-[10%] w-[40vw] h-[40vw] bg-blue-50/40 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ x: [0, -100, 0], y: [0, -50, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[20%] right-[10%] w-[35vw] h-[35vw] bg-indigo-50/40 rounded-full blur-[120px]" 
        />
      </div>

      <Navbar />
      <Hero />
      <StreamSection />
      <FeaturedColleges />
      <AICounselorBanner />
      <InnovationHub />
      <ValueProp />
      
      {/* Metric Section */}
      <section className="py-32 px-6 bg-white border-t border-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none">
          <span className="text-[20vw] font-light tracking-tighter uppercase">Admissions</span>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-24">
            {[
              { label: "Verified Colleges", value: "35k+" },
              { label: "Active Students", value: "10M+" },
              { label: "Student Reviews", value: "4.2M+" },
              { label: "Career Successes", value: "85k+" },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="space-y-4"
              >
                 <div className="h-px w-12 bg-secondary/30 mb-8" />
                 <h4 className="text-5xl md:text-7xl font-light text-slate-900 tracking-tighter italic leading-none">
                   {stat.value}
                 </h4>
                 <p className="text-[10px] font-medium uppercase tracking-[0.5em] text-slate-400">
                   {stat.label}
                 </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
