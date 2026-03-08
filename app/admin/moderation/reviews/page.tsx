"use client";

import { useState, useEffect } from "react";
import { 
  MessageSquare, 
  CheckCircle2, 
  XCircle, 
   ShieldAlert,
   ShieldCheck,
   Search, 
   Users,
  ChevronRight, 
  User, 
  Star, 
  Brain, 
  ThumbsUp, 
  AlertTriangle,
  Download,
  Filter,
  Eye,
  RotateCcw,
  StarHalf,
  FileText,
  Mail,
  Clock,
  ExternalLink
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
  assigned_to?: string;
  verification_method: 'OTP' | 'STUDENT_ID';
  verification_log?: string;
  evidence_url?: string;
  rating_breakdown: {
    academics: number;
    faculty: number;
    infrastructure: number;
    accommodation: number;
    placements: number;
  };
  student_meta: {
    account_age_days: number;
    total_reviews: number;
    previous_rejections: number;
  };
  ai_reasoning: string;
}
export default function ReviewModerationPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("PENDING");
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [isRejecting, setIsRejecting] = useState(false);

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
    <div className="space-y-6 font-montserrat">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between space-y-4 md:space-y-0 pb-4 border-b border-gray-100">
        <div>
           <div className="flex items-center space-x-3 mb-1.5">
              <div className="bg-primary/5 px-2.5 py-1 rounded-lg border border-primary/10">
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary">Moderation Intel</span>
              </div>
              <ChevronRight size={14} className="text-secondary/30" />
              <span className="text-xs font-bold text-secondary/30 uppercase tracking-widest text-[10px]">Queue Protocol</span>
           </div>
           <h1 className="text-3xl font-black text-typography tracking-tighter leading-none mb-1">
             Vigilance <span className="text-primary italic">Registry</span>
           </h1>
           <p className="text-secondary/40 text-[10px] font-black uppercase tracking-[0.2em] mt-1.5 leading-none">
              Auditing Student Experiences Across India
           </p>
        </div>

        <div className="flex items-center space-x-3">
           <div className="bg-amber-50 px-4 py-2.5 rounded-xl border border-amber-100 flex items-center space-x-2 shadow-sm">
              <ShieldAlert size={14} className="text-amber-500" />
              <div className="text-[10px] font-black uppercase tracking-widest text-amber-700">
                 {reviews.length} Flagged
              </div>
           </div>
           <button className="flex items-center space-x-2 px-6 py-2.5 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20">
              <RotateCcw size={14} />
              <span>Bulk Action</span>
           </button>
        </div>
      </section>

      {/* Filters */}
      <section className="flex items-center justify-between gap-4 bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
         <div className="flex items-center space-x-1.5 bg-gray-50 p-1 rounded-lg border border-gray-100">
            {["PENDING", "APPROVED", "REJECTED"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "px-5 py-2 rounded-md text-[9px] font-black uppercase tracking-widest transition-all",
                  filter === f 
                    ? "bg-white text-primary shadow-sm ring-1 ring-gray-100" 
                    : "text-secondary/40 hover:text-secondary"
                )}
              >
                {f}
              </button>
            ))}
         </div>

         <div className="flex items-center space-x-3">
            <div className="relative w-64">
               <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/20" />
               <input placeholder="Search keywords..." className="w-full bg-gray-50 border-0 pl-10 pr-4 py-2 rounded-lg text-xs font-bold outline-none ring-1 ring-gray-100 focus:ring-primary/10 transition-all font-montserrat" />
            </div>
            <button className="w-8 h-8 bg-gray-50 rounded-lg border border-gray-100 text-secondary/40 hover:text-primary transition-all flex items-center justify-center">
               <Download size={14} />
            </button>
         </div>
      </section>

      {/* Review Cards */}
      <section className="space-y-4">
         {loading ? [...Array(2)].map((_, i) => (
           <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 animate-pulse h-[300px]" />
         )) : reviews.length === 0 ? (
           <div className="bg-white py-12 px-4 rounded-xl border border-gray-100 text-center flex flex-col items-center">
              <CheckCircle2 size={32} className="text-emerald-500 mb-3 opacity-20" />
              <p className="text-sm font-black text-typography uppercase tracking-widest leading-none">Queue clear</p>
           </div>
         ) : reviews.map((review) => (
           <div key={review.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all">
              <div className="grid grid-cols-12">
                 <div className="col-span-12 lg:col-span-8 p-4 space-y-4">
                    <div className="flex items-center justify-between">
                       <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary border border-primary/10 shadow-inner">
                             <User size={18} />
                          </div>
                          <div>
                             <h4 className="text-sm font-black text-typography leading-tight uppercase tracking-tight">{review.student.name}</h4>
                              <p className="text-[9px] font-bold text-secondary/30 uppercase tracking-widest mt-1">{review.student.email}</p>
                           </div>
                        </div>
                        <div className="flex items-center space-x-3">
                           {review.assigned_to && (
                             <div className="flex items-center space-x-1.5 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                                <Users size={10} className="text-secondary/40" />
                                <span className="text-[8px] font-black uppercase tracking-widest text-secondary/40">Audit: {review.assigned_to}</span>
                             </div>
                           )}
                           <div className="flex items-center space-x-1 bg-amber-50 px-2.5 py-1.5 rounded-lg border border-amber-100 shadow-sm">
                              <Star size={12} className="text-amber-500 fill-amber-500" />
                              <span className="text-[10px] font-black text-amber-600">{review.overall_rating}</span>
                           </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                       <h3 className="text-xl font-black text-typography tracking-tighter leading-tight italic decoration-primary/10 underline underline-offset-4 decoration-2">"{review.title}"</h3>
                       <p className="text-[11px] font-bold text-secondary/60 leading-relaxed line-clamp-2">
                         {review.course_review}
                       </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 p-3 bg-gray-50/50 rounded-xl border border-gray-100">
                       <div className="space-y-1">
                          <div className="flex items-center space-x-1.5 text-emerald-600">
                             <ThumbsUp size={12} />
                             <span className="text-[9px] font-black uppercase tracking-widest">Pros</span>
                          </div>
                          <p className="text-[10px] font-bold text-secondary/60 leading-relaxed italic line-clamp-2">{review.pros}</p>
                       </div>
                       <div className="space-y-1 border-l border-gray-200 pl-4">
                          <div className="flex items-center space-x-1.5 text-red-600">
                             <AlertTriangle size={12} />
                             <span className="text-[9px] font-black uppercase tracking-widest">Cons</span>
                          </div>
                          <p className="text-[10px] font-bold text-secondary/60 leading-relaxed italic line-clamp-2">{review.cons}</p>
                       </div>
                    </div>

                    <div className="flex items-center space-x-6 text-secondary/30 py-1">
                       <div className="flex items-center space-x-2">
                          <CheckCircle2 size={12} />
                          <span className="text-[9px] font-black uppercase tracking-widest leading-none">{review.college.name}</span>
                       </div>
                       <div className="flex items-center space-x-2 border-l border-gray-100 pl-6 leading-none">
                          <MessageSquare size={12} />
                          <span className="text-[9px] font-black uppercase tracking-widest leading-none">{review.course?.name || "General Experience"}</span>
                       </div>
                    </div>
                 </div>

                 <div className="col-span-12 lg:col-span-4 bg-gray-50/50 p-4 flex flex-col justify-between border-l border-gray-100">
                    <div className="space-y-3">
                       <div className="bg-white p-3 rounded-xl border border-gray-100 flex items-center justify-between shadow-sm">
                          <div className="flex items-center space-x-2">
                             <Brain size={14} className="text-primary" />
                             <span className="text-[9px] font-black uppercase tracking-widest text-primary">AI Sentiment</span>
                          </div>
                          <div className={cn(
                            "px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest border",
                            review.sentiment_label === 'POSITIVE' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-red-50 text-red-600 border-red-100'
                          )}>
                             {review.sentiment_label}
                          </div>
                       </div>

                       <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm leading-none">
                          <div className="flex items-center justify-between mb-1.5">
                             <span className="text-[9px] font-black uppercase tracking-widest text-secondary/40">Integrity Score</span>
                             <span className="text-[10px] font-black text-typography">{review.quality_score}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                             <div className="h-full bg-primary" style={{ width: `${review.quality_score}%` }} />
                          </div>
                          <p className="text-[8px] font-bold text-secondary/20 uppercase tracking-[0.1em] mt-1.5">DETAIL LEVEL & FRAUD FLAGS</p>
                       </div>
                    </div>

                    <div className="flex flex-col space-y-2 mt-4">
                       <button 
                         onClick={() => setSelectedReview(review)}
                         className="w-full py-2.5 bg-white border border-gray-200 text-secondary/60 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all flex items-center justify-center space-x-2 shadow-sm"
                       >
                          <Eye size={12} />
                          <span>Audit Details</span>
                       </button>
                       <div className="flex items-center space-x-2">
                          <button onClick={() => updateStatus(review.id, "APPROVED")} className="flex-1 py-2 bg-emerald-600 text-white rounded-lg text-[8px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-md shadow-emerald-600/10">
                             Approve
                          </button>
                          <button onClick={() => { setSelectedReview(review); setIsRejecting(true); }} className="flex-1 py-2 bg-red-50 text-red-600 rounded-lg text-[8px] font-black uppercase tracking-widest border border-red-100 hover:bg-red-500 hover:text-white transition-all">
                             Reject
                          </button>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
         ))}
      </section>

      {/* Review Detail Pane (Side Sheet) */}
      {selectedReview && (
        <div className="fixed inset-0 z-[100] flex justify-end font-montserrat">
           <div className="absolute inset-0 bg-typography/40 backdrop-blur-[2px] transition-opacity" onClick={() => { setSelectedReview(null); setIsRejecting(false); }} />
           <div className="relative w-full max-w-xl bg-white h-full shadow-2xl animate-in slide-in-from-right duration-300 overflow-y-auto no-scrollbar border-l border-gray-100 flex flex-col">
              <div className="p-4 space-y-4 flex-1">
                 {/* Header */}
                 <div className="flex items-center justify-between pb-3 border-b border-gray-50">
                    <button onClick={() => { setSelectedReview(null); setIsRejecting(false); }} className="w-8 h-8 bg-gray-50 rounded-lg text-secondary/40 hover:text-primary transition-all flex items-center justify-center border border-gray-100">
                       <ChevronRight size={16} className="rotate-180" />
                    </button>
                    <div className="flex items-center space-x-3">
                       <span className="text-[9px] font-black uppercase tracking-[0.2em] text-secondary/20">RID: {selectedReview!.id.slice(0,8)}</span>
                       <div className={cn(
                          "px-3 py-1 rounded-md text-[8px] font-black uppercase tracking-widest shadow-sm",
                          selectedReview!.status === 'PENDING' ? "bg-amber-50 text-amber-600 border border-amber-100" : "bg-emerald-50 text-emerald-600 border border-emerald-100"
                       )}>
                          {selectedReview!.status}
                       </div>
                    </div>
                 </div>

                 {/* Ratings Breakdown */}
                 <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                    <h4 className="text-[9px] font-black uppercase tracking-widest text-secondary/30 mb-4 pb-2 border-b border-gray-100">Star Rating Grid</h4>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                       {Object.entries(selectedReview!.rating_breakdown).map(([key, val]) => (
                         <div key={key} className="flex flex-col space-y-1">
                            <span className="text-[8px] font-black uppercase tracking-widest text-secondary/20 truncate">{key}</span>
                            <div className="flex items-center space-x-1">
                               {[...Array(5)].map((_, i) => (
                                 <Star key={i} size={10} className={cn(i < val ? "text-amber-500 fill-amber-500" : "text-gray-200")} />
                               ))}
                               <span className="ml-1 text-[10px] font-black text-typography leading-none">{val}.0</span>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>

                 {/* Content */}
                 <div className="space-y-3">
                    <h3 className="text-2xl font-black text-typography tracking-tight uppercase italic leading-none">{selectedReview!.title}</h3>
                    <div className="bg-primary/5 p-4 rounded-xl border border-primary/10">
                       <p className="text-[12px] font-bold text-typography leading-relaxed text-secondary/70">
                          {selectedReview!.course_review}
                       </p>
                    </div>
                 </div>

                 {/* Verification & Identity */}
                 <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white border border-gray-100 p-3.5 rounded-xl space-y-4 shadow-sm flex flex-col justify-between">
                       <div className="space-y-3">
                          <h4 className="text-[9px] font-black uppercase tracking-widest text-secondary/30">Auth Protocol</h4>
                          <div className="flex items-center space-x-3">
                             <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600 border border-emerald-100">
                                <ShieldCheck size={16} />
                             </div>
                             <div>
                                <p className="text-[10px] font-black text-typography leading-none">Via {selectedReview!.verification_method}</p>
                                <p className="text-[8px] font-bold text-emerald-600 uppercase tracking-widest mt-1">Verified Audit</p>
                             </div>
                          </div>
                       </div>
                       <button className="w-full py-2 bg-gray-50 text-secondary/40 text-[8px] font-black uppercase tracking-widest rounded-lg hover:bg-gray-100 transition-all flex items-center justify-center space-x-1.5 border border-gray-100">
                          <ExternalLink size={12} />
                          <span>View Proof</span>
                       </button>
                    </div>

                    <div className="bg-white border border-gray-100 p-3.5 rounded-xl space-y-4 shadow-sm flex flex-col justify-between">
                       <div className="space-y-3">
                          <h4 className="text-[9px] font-black uppercase tracking-widest text-secondary/30">User Node</h4>
                          <div className="flex items-center space-x-3">
                             <div className="w-8 h-8 bg-primary/5 rounded-lg flex items-center justify-center text-primary border border-primary/10">
                                <User size={16} />
                             </div>
                             <div>
                                <p className="text-[10px] font-black text-typography leading-none">{selectedReview!.student_meta.account_age_days}d Node Age</p>
                                <p className="text-[8px] font-bold text-secondary/20 uppercase tracking-widest mt-1">{selectedReview!.student_meta.total_reviews} Total Logs</p>
                             </div>
                          </div>
                       </div>
                       <div className="px-2 py-1 bg-red-50 rounded-lg text-[8px] font-black text-red-600 uppercase tracking-widest flex items-center space-x-1.5 border border-red-100">
                          <AlertTriangle size={10} />
                          <span>{selectedReview!.student_meta.previous_rejections} Rejections</span>
                       </div>
                    </div>
                 </div>

                 {/* AI Insights */}
                 <div className="bg-slate-900 text-white p-4 rounded-xl shadow-xl shadow-slate-900/10 relative overflow-hidden flex flex-col justify-between">
                    <div className="absolute right-0 top-0 w-16 h-16 bg-white/5 rounded-full -translate-y-8 translate-x-8" />
                    <div className="flex items-center space-x-3 mb-4 relative z-10">
                       <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-primary">
                          <Brain size={16} />
                       </div>
                       <div>
                          <h4 className="text-xs font-black tracking-widest uppercase italic">AI Inference</h4>
                          <p className="text-[8px] font-black text-white/20 uppercase tracking-widest leading-none">Llama-3 Integration</p>
                       </div>
                    </div>
                    <p className="text-[11px] font-bold text-white/60 leading-relaxed italic mb-4 relative z-10">
                       "{selectedReview!.ai_reasoning}"
                    </p>
                    <div className="flex items-center justify-between pt-3 border-t border-white/5 relative z-10">
                       <div className="flex items-center space-x-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="text-[8px] font-black uppercase tracking-widest text-white/30">Confidence: 98.4%</span>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Actions */}
              <div className="p-4 border-t border-gray-100 bg-gray-50/50">
                 {isRejecting ? (
                   <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                      <div className="bg-white p-3 rounded-xl border border-red-100 shadow-sm leading-none">
                         <label className="text-[9px] font-black uppercase tracking-widest text-secondary/30 ml-1">Rejection Reason</label>
                         <select 
                           value={rejectionReason}
                           onChange={(e) => setRejectionReason(e.target.value)}
                           className="w-full bg-transparent border-0 px-1 py-2 text-xs font-bold outline-none text-red-900 appearance-none"
                         >
                            <option value="">Select a reason...</option>
                            <option value="INSUFFICIENT">Too Short / No Detail</option>
                            <option value="PROMOTIONAL">Promotional / Marketing</option>
                            <option value="OFF_TOPIC">Off-topic / Irrelevant</option>
                            <option value="FAKE">Suspected Fraudulent</option>
                            <option value="ABUSIVE">Abusive Language</option>
                         </select>
                         <div className="mt-2 pt-2 border-t border-gray-50 text-[8px] font-bold text-red-400 uppercase tracking-widest flex items-center space-x-1">
                            <Mail size={10} />
                            <span>System Trigger: Automated Rejection Dispatch</span>
                         </div>
                      </div>
                      <div className="flex items-center space-x-2">
                         <button onClick={() => { updateStatus(selectedReview!.id, "REJECTED"); setSelectedReview(null); }} className="flex-1 py-3 bg-red-600 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-red-700 transition-all shadow-lg shadow-red-600/10">
                            Confirm Deflaking
                         </button>
                         <button onClick={() => setIsRejecting(false)} className="px-6 py-3 bg-white border border-gray-200 text-secondary/40 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all">
                            Back
                         </button>
                      </div>
                   </div>
                 ) : (
                   <div className="flex items-center space-x-3">
                      <button onClick={() => { updateStatus(selectedReview!.id, "APPROVED"); setSelectedReview(null); }} className="flex-1 py-3 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center space-x-2">
                         <CheckCircle2 size={16} />
                         <span>Deploy Approval</span>
                      </button>
                      <button onClick={() => setIsRejecting(true)} className="flex-1 py-3 bg-white border border-gray-200 text-red-500 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-50 transition-all flex items-center justify-center space-x-2">
                         <XCircle size={16} />
                         <span>Reject Review</span>
                      </button>
                   </div>
                 )}
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
