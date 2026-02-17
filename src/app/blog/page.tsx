"use client";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ArrowRight } from "lucide-react";

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#0B0D10] text-[#E9EEF5]">
      <SiteHeader />
      
      <div className="pt-32 pb-20 container mx-auto px-6">
        <h1 className="text-5xl font-bold text-white text-center mb-16">Latest Insights</h1>

        {/* Feature Post (Matches Sketch Top Box) */}
        <div className="w-full bg-[#1A1F26] border border-white/10 rounded-2xl overflow-hidden mb-16 group cursor-pointer">
           <div className="h-[400px] bg-slate-800 relative">
              {/* Placeholder for Hero Image */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1F26] to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-10">
                 <span className="bg-[#B6FF3B] text-black text-xs font-bold px-3 py-1 rounded-full mb-4 inline-block">FEATURED</span>
                 <h2 className="text-4xl font-bold text-white mb-4 group-hover:text-[#B6FF3B] transition-colors">How AI is Revolutionizing Cash Flow Management</h2>
                 <p className="text-slate-300 max-w-2xl text-lg">Discover the technology behind Prophet models and how they predict your financial runway with 99% accuracy.</p>
              </div>
           </div>
        </div>

        {/* Grid Posts (Matches Sketch Bottom 3 Boxes) */}
        <div className="grid md:grid-cols-3 gap-8">
           {[1, 2, 3].map((i) => (
             <div key={i} className="bg-[#1A1F26] border border-white/10 rounded-xl overflow-hidden hover:border-[#B6FF3B]/50 transition-all group cursor-pointer">
                <div className="h-48 bg-slate-800"></div>
                <div className="p-6">
                   <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#B6FF3B]">Auditing 101: Preventing Fraud</h3>
                   <p className="text-slate-400 text-sm mb-4">Learn the red flags that indicate potential fraud in your bank statements.</p>
                   <div className="flex items-center text-[#B6FF3B] text-sm font-bold">
                      Read More <ArrowRight className="ml-2 h-4 w-4" />
                   </div>
                </div>
             </div>
           ))}
        </div>

        {/* Pagination (Matches Sketch < 1 2 3 >) */}
        <div className="flex justify-center items-center gap-4 mt-16">
           <button className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5">&lt;</button>
           <button className="h-10 w-10 rounded-full bg-[#B6FF3B] text-black font-bold flex items-center justify-center">1</button>
           <button className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5">2</button>
           <button className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5">3</button>
           <button className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5">&gt;</button>
        </div>
      </div>
      <SiteFooter /> 
    </div>
  );
}