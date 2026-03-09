"use client";

import { motion } from "framer-motion";
import { Star, MapPin, ArrowRight, BadgeCheck, Zap, ArrowUpRight } from "lucide-react";

export default function FeaturedColleges() {
  const colleges = [
    {
      name: "IIT Bombay",
      location: "Powai, Mumbai",
      package: "₹24.8 LPA",
      type: "Institute of Eminence",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/1/1d/Indian_Institute_of_Technology_Bombay_Logo.svg/1200px-Indian_Institute_of_Technology_Bombay_Logo.svg.png",
      rating: "4.9",
      tags: ["Placements", "Engineering"]
    },
    {
      name: "IIM Ahmedabad",
      location: "Vastrapur, Gujarat",
      package: "₹32.4 LPA",
      type: "National Importance",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/Indian_Institute_of_Management_Ahmedabad_Logo.svg/1200px-Indian_Institute_of_Management_Ahmedabad_Logo.svg.png",
      rating: "4.8",
      tags: ["MBA", "Top ROI"]
    },
    {
      name: "BITS Pilani",
      location: "Jhunjhunu, Rajasthan",
      package: "₹18.2 LPA",
      type: "Deemed University",
      image: "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=800",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/BITS_Pilani-Logo.svg/1200px-BITS_Pilani-Logo.svg.png",
      rating: "4.7",
      tags: ["Innovation", "Science"]
    }
  ];

  return (
    <section className="py-24 px-6 bg-white font-montserrat overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-secondary">
              <Zap size={14} className="fill-secondary" />
              <span className="text-[10px] font-medium uppercase tracking-[0.4em]">Curated Selection</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-light text-slate-900 tracking-tighter leading-none">
              Premier <span className="italic font-medium text-slate-900/40">Institutions.</span>
            </h2>
          </div>
          <motion.button 
            whileHover={{ x: 5 }}
            className="group flex items-center space-x-3 text-xs font-medium text-slate-400 uppercase tracking-widest mt-8 md:mt-0"
          >
            <span>Explore full registry</span>
            <ArrowRight size={16} className="group-hover:text-secondary transition-colors" />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 relative">
          {/* Background Highlight */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-50/20 blur-[150px] -z-10 pointer-events-none" />

          {colleges.map((college, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -12 }}
              className="group relative bg-white rounded-[40px] overflow-hidden border border-slate-100 shadow-[0_4px_30px_-10px_rgba(0,0,0,0.03)] hover:shadow-[0_64px_96px_-24px_rgba(0,0,0,0.1)] transition-all duration-700"
            >
              {/* Image Container with Floating Data */}
              <div className="h-[320px] overflow-hidden relative">
                 <motion.img 
                   whileHover={{ scale: 1.1, rotate: 1 }}
                   transition={{ duration: 2, ease: "circOut" }}
                   src={college.image} 
                   className="w-full h-full object-cover grayscale-[0.8] group-hover:grayscale-0 transition-all duration-1000" 
                 />
                 
                 {/* Neural Overlay */}
                 <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                 
                 <div className="absolute top-6 left-6 flex flex-col gap-2 relative z-10">
                    <motion.div 
                      initial={{ x: -10, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      className="bg-white/10 backdrop-blur-2xl px-4 py-2 rounded-full flex items-center space-x-2 border border-white/20 shadow-xl"
                    >
                       <BadgeCheck size={14} className="text-secondary" />
                       <span className="text-[9px] font-medium text-white uppercase tracking-[0.4em]">Verified Node</span>
                    </motion.div>
                 </div>

                 <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between text-white relative z-10">
                    <div className="space-y-2">
                       <p className="text-[9px] font-medium uppercase tracking-[0.4em] text-white/50">Avg. Package Node</p>
                       <p className="text-3xl font-light tracking-tighter">{college.package}</p>
                    </div>
                    <motion.div 
                      whileHover={{ scale: 1.1, backgroundColor: "rgb(255 255 255 / 1)" }}
                      className="w-14 h-14 bg-white/10 backdrop-blur-2xl rounded-2xl flex items-center justify-center border border-white/20 group-hover:text-slate-900 transition-all"
                    >
                       <ArrowUpRight size={24} />
                    </motion.div>
                 </div>
              </div>

              {/* Content Detail Layer */}
              <div className="p-10 space-y-10 bg-white relative">
                 <div className="flex justify-between items-start">
                    <div className="space-y-4">
                       <div className="flex items-center space-x-3 text-[9px] font-medium text-secondary uppercase tracking-[0.4em]">
                          <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse" />
                          <span>{college.type}</span>
                       </div>
                       <h3 className="text-3xl font-light text-slate-900 tracking-tighter uppercase leading-none">{college.name}</h3>
                       <div className="flex items-center space-x-2 text-slate-300">
                          <MapPin size={12} />
                          <span className="text-[10px] font-normal uppercase tracking-[0.3em]">{college.location}</span>
                       </div>
                    </div>
                    
                    <div className="w-16 h-16 bg-white rounded-2xl p-4 border border-slate-100 flex items-center justify-center -mt-20 relative z-10 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] transition-transform group-hover:scale-110">
                       <img src={college.logo} className="w-full h-full object-contain" alt="" />
                    </div>
                 </div>

                 {/* Tags & Rating Hub */}
                 <div className="flex flex-wrap items-center justify-between gap-6 pt-8 border-t border-slate-50">
                    <div className="flex gap-3">
                       {college.tags.map(tag => (
                          <span key={tag} className="px-4 py-1.5 bg-slate-50 rounded-full text-[9px] font-medium text-slate-400 uppercase tracking-widest border border-slate-100 group-hover:border-secondary/20 group-hover:text-secondary transition-colors">
                             {tag}
                          </span>
                       ))}
                    </div>
                    <div className="flex items-center space-x-2 bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
                       <Star size={12} className="text-amber-400 fill-amber-400" />
                       <span className="text-[10px] font-medium text-slate-600 uppercase tracking-widest">{college.rating} Hub Rating</span>
                    </div>
                 </div>
              </div>

              {/* Liquid Data Bar */}
              <div className="absolute bottom-0 left-0 h-1.5 bg-slate-50 w-full overflow-hidden">
                 <motion.div 
                   initial={{ x: "-100%" }}
                   whileInView={{ x: "0%" }}
                   transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
                   className="h-full bg-secondary w-full" 
                 />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
