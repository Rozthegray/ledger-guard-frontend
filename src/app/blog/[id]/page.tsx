"use client";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, User, Clock, ThumbsUp, MessageSquare, Share2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const [likes, setLikes] = useState(124);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
      setIsLiked(false);
    } else {
      setLikes(likes + 1);
      setIsLiked(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0D10] text-[#E9EEF5]">
      <SiteHeader />
      
      <div className="pt-32 pb-20 container mx-auto px-6">
        <Link href="/blog" className="inline-flex items-center text-slate-400 hover:text-[#B6FF3B] mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Blog
        </Link>

        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* MAIN CONTENT */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-4 text-xs font-mono text-[#B6FF3B] mb-4">
                <span className="bg-[#B6FF3B]/10 px-2 py-1 rounded">ENGINEERING</span>
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> 5 MIN READ</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                How Prophet AI Predicts Your Financial Runway
              </h1>
              <div className="flex items-center gap-4 text-sm text-slate-400 border-b border-white/10 pb-8">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 bg-slate-700 rounded-full"></div>
                  <span className="text-white">Alex Chen</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" /> Feb 08, 2026
                </div>
              </div>
            </div>

            {/* Article Body */}
            <article className="prose prose-invert prose-lg max-w-none text-slate-300">
              <p className="lead text-xl text-white mb-6">
                Cash flow forecasting has historically been a manual, error-prone process. Here is how we automated it using Meta's Prophet model.
              </p>
              
              <h3 className="text-2xl font-bold text-white mt-8 mb-4">Why Time-Series Matter</h3>
              <p className="mb-6">
                Traditional accounting looks backwards. It tells you what you spent. Ledger Guard looks forward. By analyzing daily transaction volume and recurring expenses, we can map out a trajectory for your bank balance.
              </p>

              <div className="bg-[#1A1F26] border-l-4 border-[#B6FF3B] p-6 my-8 rounded-r-lg">
                <p className="italic text-white">
                  "The most dangerous number in business is the bank balance you see today, because it doesn't account for the bills due tomorrow."
                </p>
              </div>

              <h3 className="text-2xl font-bold text-white mt-8 mb-4">The Technical Stack</h3>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li><strong>Ingestion:</strong> Llama-3 for PDF parsing.</li>
                <li><strong>Normalization:</strong> Vector DB for category matching.</li>
                <li><strong>Forecast:</strong> Prophet for seasonality detection.</li>
              </ul>
            </article>

            {/* Interactions */}
            <div className="flex items-center justify-between mt-12 pt-8 border-t border-white/10">
              <div className="flex gap-4">
                <Button 
                  variant="ghost" 
                  onClick={handleLike}
                  className={`gap-2 ${isLiked ? "text-[#B6FF3B] bg-[#B6FF3B]/10" : "text-slate-400 hover:text-white"}`}
                >
                  <ThumbsUp className="h-5 w-5" /> {likes}
                </Button>
                <Button variant="ghost" className="text-slate-400 hover:text-white gap-2">
                  <MessageSquare className="h-5 w-5" /> 24
                </Button>
              </div>
              <Button variant="ghost" className="text-slate-400 hover:text-white gap-2">
                <Share2 className="h-5 w-5" /> Share
              </Button>
            </div>

            {/* Comments Section */}
            <div className="mt-16">
              <h3 className="text-2xl font-bold text-white mb-8">Comments (24)</h3>
              
              <div className="bg-[#1A1F26] p-6 rounded-xl border border-white/10 mb-10">
                <Textarea placeholder="Add to the discussion..." className="bg-[#0B0D10] border-white/10 text-white min-h-[100px] mb-4" />
                <div className="flex justify-end">
                  <Button className="bg-[#B6FF3B] text-black hover:bg-[#a2ff00] font-bold">Post Comment</Button>
                </div>
              </div>

              <div className="space-y-8">
                {[1, 2].map((i) => (
                  <div key={i} className="flex gap-4">
                    <div className="h-10 w-10 bg-slate-800 rounded-full flex-shrink-0"></div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-white">Sarah Jenkins</span>
                        <span className="text-xs text-slate-500">2 hours ago</span>
                      </div>
                      <p className="text-slate-400 text-sm">
                        This is exactly what I needed. The manual Excel sheets were killing my agency's productivity.
                      </p>
                      <button className="text-xs text-[#B6FF3B] mt-2 hover:underline">Reply</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-[#1A1F26] p-6 rounded-xl border border-white/10">
              <h4 className="font-bold text-white mb-4">Newsletter</h4>
              <p className="text-sm text-slate-400 mb-4">Get financial engineering tips delivered to your inbox.</p>
              <Input placeholder="Enter email" className="bg-[#0B0D10] border-white/10 text-white mb-2" />
              <Button className="w-full bg-white/10 text-white hover:bg-white/20">Subscribe</Button>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Related Posts</h4>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="group cursor-pointer">
                    <div className="text-xs text-[#B6FF3B] mb-1">TUTORIAL</div>
                    <h5 className="font-bold text-slate-300 group-hover:text-white transition-colors">
                      Detecting Fraud with Anomaly Scans
                    </h5>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
      <SiteFooter />
    </div>
  );
}