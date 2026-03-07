"use client";

import { useState, useEffect } from "react";
import { 
  MessageSquare, 
  CheckCircle2, 
  XCircle, 
  ShieldAlert, 
  Search, 
  ChevronRight, 
  User, 
  Star, 
  Brain, 
  ThumbsUp, 
  AlertTriangle,
  Download,
  Filter,
  Eye,
  Flag,
  RotateCcw
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Review {
  id: string;
  title: string;
  college: { name: string };
  student: { name: string, email: string };
  course: { name: string } | null;
  overall_rating: number;
  sentiment_label: string;
  quality_score: number;
  status: string;
  created_at: string;
  course_review: string;
  pros: string;
  cons: string;
}

export default function ReviewModerationPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("PENDING");

  useEffect(() => {
    fetchReviews();
  }, [filter]);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/moderation/reviews?status=${filter}`);
      const data = await res.json();
      setReviews(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/admin/moderation/reviews`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        setReviews(reviews.filter(r => r.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 pb-6 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-2">
              <div className="bg-primary/5 px-3 py-1.5 rounded-xl border border-primary/10">
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary">Content Integrity</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30">Review Moderation Queue</span>
           </div>
           <h1 className="text-5xl font-black text-typography tracking-tighter leading-none mb-1">
             Vigilance <span className="text-primary italic">Protocol</span>
           </h1>
           <p className="text-secondary/40 text-sm font-bold uppercase tracking-widest mt-2">
              Auditing Student Experiences Across India
           </p>
        </div>

        <div className="flex items-center space-x-4">
           <div className="bg-amber-50 px-6 py-4 rounded-2xl border border-amber-100 flex items-center space-x-3">
              <ShieldAlert size={18} className="text-amber-500" />
              <div className="text-[11px] font-black uppercase tracking-widest text-amber-700">
                 {reviews.length} Flagged for Audit
              </div>
           </div>
           <button className="flex items-center space-x-2 px-8 py-4 bg-primary text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20">
              <RotateCcw size={18} />
              <span>Bulk Action Queue</span>
           </button>
        </div>
      </section>

      {/* Filters */}
      <section className="flex items-center justify-between gap-6 bg-white p-6 rounded-[2.5rem] border border-gray-50 shadow-sm">
         <div className="flex items-center space-x-2 bg-gray-50 p-1.5 rounded-2xl border border-gray-100 w-full md:w-auto">
            {["PENDING", "APPROVED", "REJECTED"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                  filter === f 
                    ? "bg-white text-primary shadow-sm shadow-black/5" 
                    : "text-secondary/40 hover:text-secondary"
                )}
              >
                {f}
              </button>
            ))}
         </div>

         <div className="flex items-center space-x-4">
            <div className="relative w-80">
               <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-secondary/20" />
               <input placeholder="Search keywords in reviews..." className="w-full bg-gray-50 border-0 pl-14 pr-6 py-3.5 rounded-2xl text-[13px] font-bold outline-none ring-1 ring-gray-100 focus:ring-primary/10 transition-all" />
            </div>
            <button className="p-4 bg-gray-50 rounded-2xl border border-gray-100 text-secondary/40 hover:text-primary transition-all">
               <Download size={18} />
            </button>
         </div>
      </section>

      {/* Review Cards */}
      <section className="space-y-8">
         {loading ? [...Array(2)].map((_, i) => (
           <div key={i} className="bg-white p-10 rounded-[3rem] border border-gray-100 animate-pulse h-[400px]" />
         )) : reviews.length === 0 ? (
           <div className="bg-white p-20 rounded-[3rem] border border-gray-100 text-center flex flex-col items-center">
              <CheckCircle2 size={48} className="text-emerald-500 mb-4 opacity-20" />
              <p className="text-xl font-black text-typography capitalize">Queue clear. Great job!</p>
           </div>
         ) : reviews.map((review) => (
           <div key={review.id} className="bg-white rounded-[3rem] border border-gray-50 shadow-sm overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all">
              <div className="grid grid-cols-12">
                 <div className="col-span-12 lg:col-span-8 p-10 space-y-6">
                    <div className="flex items-center justify-between">
                       <div className="flex items-center space-x-4">
                          <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center text-primary">
                             <User size={24} />
                          </div>
                          <div>
                             <h4 className="text-base font-black text-typography leading-tight">{review.student.name}</h4>
                             <p className="text-[10px] font-bold text-secondary/40 uppercase tracking-widest">{review.student.email}</p>
                          </div>
                       </div>
                       <div className="flex items-center space-x-1 bg-amber-50 px-4 py-2 rounded-full border border-amber-100">
                          <Star size={14} className="text-amber-500 fill-amber-500" />
                          <span className="text-sm font-black text-amber-600">{review.overall_rating}</span>
                       </div>
                    </div>

                    <div className="space-y-4">
                       <h3 className="text-2xl font-black text-typography tracking-tight leading-tight italic underline decoration-primary/20 decoration-4 underline-offset-4">"{review.title}"</h3>
                       <p className="text-sm font-bold text-secondary/60 leading-relaxed line-clamp-3">
                         {review.course_review}
                       </p>
                    </div>

                    <div className="grid grid-cols-2 gap-6 p-6 bg-snow-pearl/50 rounded-3xl border border-gray-50">
                       <div className="space-y-2">
                          <div className="flex items-center space-x-2 text-emerald-600">
                             <ThumbsUp size={14} />
                             <span className="text-[10px] font-black uppercase tracking-widest">Pros</span>
                          </div>
                          <p className="text-xs font-bold text-secondary/70 leading-relaxed italic">{review.pros}</p>
                       </div>
                       <div className="space-y-2 border-l border-gray-100 pl-6">
                          <div className="flex items-center space-x-2 text-red-600">
                             <AlertTriangle size={14} />
                             <span className="text-[10px] font-black uppercase tracking-widest">Cons</span>
                          </div>
                          <p className="text-xs font-bold text-secondary/70 leading-relaxed italic">{review.cons}</p>
                       </div>
                    </div>

                    <div className="flex items-center space-x-10 text-secondary/30">
                       <div className="flex items-center space-x-2">
                          <CheckCircle2 size={16} />
                          <span className="text-[10px] font-black uppercase tracking-widest">{review.college.name}</span>
                       </div>
                       <div className="flex items-center space-x-2 border-l border-gray-100 pl-10">
                          <MessageSquare size={16} />
                          <span className="text-[10px] font-black uppercase tracking-widest">{review.course?.name || "General Experience"}</span>
                       </div>
                    </div>
                 </div>

                 <div className="col-span-12 lg:col-span-4 bg-gray-50 p-10 flex flex-col justify-between border-l border-gray-100">
                    <div className="space-y-6">
                       <div className="bg-white p-6 rounded-3xl border border-gray-100 flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                             <Brain size={18} className="text-primary" />
                             <span className="text-[10px] font-black uppercase tracking-widest text-primary">AI Sentiment Audit</span>
                          </div>
                          <div className={cn(
                            "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest",
                            review.sentiment_label === 'POSITIVE' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                          )}>
                             {review.sentiment_label}
                          </div>
                       </div>

                       <div className="bg-white p-6 rounded-3xl border border-gray-100">
                          <div className="flex items-center justify-between mb-2">
                             <span className="text-[10px] font-black uppercase tracking-widest text-secondary/40">Integrity Score</span>
                             <span className="text-xs font-black text-typography">{review.quality_score}%</span>
                          </div>
                          <div className="h-2 w-full bg-gray-50 rounded-full overflow-hidden">
                             <div className="h-full bg-primary" style={{ width: `${review.quality_score}%` }} />
                          </div>
                          <p className="text-[9px] font-bold text-secondary/20 uppercase tracking-widest mt-2 italic">Based on detail level & anti-fraud flags</p>
                       </div>
                    </div>

                    <div className="flex flex-col space-y-3">
                       <button 
                         onClick={() => updateStatus(review.id, "APPROVED")}
                         className="w-full py-4 bg-emerald-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-emerald-500/20 flex items-center justify-center space-x-2"
                        >
                          <CheckCircle2 size={16} />
                          <span>Approve & Go Live</span>
                       </button>
                       <button 
                         onClick={() => updateStatus(review.id, "REJECTED")}
                         className="w-full py-4 bg-white border border-gray-200 text-red-500 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-50 transition-all flex items-center justify-center space-x-2"
                       >
                          <XCircle size={16} />
                          <span>Audit Failed / Reject</span>
                       </button>
                       <div className="flex items-center space-x-2">
                          <button className="flex-1 py-4 bg-white border border-gray-200 text-secondary/40 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-100 transition-all flex items-center justify-center space-x-2">
                             <Flag size={14} />
                             <span>Spam</span>
                          </button>
                          <button className="flex-1 py-4 bg-white border border-gray-200 text-secondary/40 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-100 transition-all flex items-center justify-center space-x-2">
                             <Eye size={14} />
                             <span>Details</span>
                          </button>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
         ))}
      </section>
    </div>
  );
}
