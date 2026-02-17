"use client";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#0B0D10] text-[#E9EEF5]">
      <SiteHeader />
      
      <div className="pt-32 pb-20 container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
           <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Simple, transparent pricing</h1>
           <p className="text-slate-400 text-lg">Start auditing for free. Upgrade as you scale.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
           {/* Free Tier */}
           <div className="bg-[#1A1F26] border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all">
              <h3 className="text-xl font-bold text-white mb-2">Starter</h3>
              <div className="text-4xl font-bold text-white mb-6">NGN 0<span className="text-lg text-slate-500 font-normal">/mo</span></div>
              <p className="text-slate-400 text-sm mb-8">Perfect for freelancers and individuals.</p>
              
              <ul className="space-y-4 mb-8">
                 <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="h-5 w-5 text-slate-500" /> 50 Transactions / Month</li>
                 <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="h-5 w-5 text-slate-500" /> Basic PDF Ingestion</li>
                 <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="h-5 w-5 text-slate-500" /> Email Support</li>
              </ul>
              <Link href="/signup">
                <Button className="w-full bg-white/10 text-white hover:bg-white/20">Get Started</Button>
              </Link>
           </div>

           {/* Pro Tier (Highlighted) */}
           <div className="bg-[#1A1F26] border-2 border-[#B6FF3B] rounded-2xl p-8 relative transform md:-translate-y-4 shadow-[0_0_40px_rgba(182,255,59,0.1)]">
              <div className="absolute top-0 right-0 bg-[#B6FF3B] text-black text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">POPULAR</div>
              <h3 className="text-xl font-bold text-white mb-2">Growth</h3>
              <div className="text-4xl font-bold text-white mb-6">NGN 29<span className="text-lg text-slate-500 font-normal">/mo</span></div>
              <p className="text-slate-400 text-sm mb-8">For scaling startups and agencies.</p>
              
              <ul className="space-y-4 mb-8">
                 <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="h-5 w-5 text-[#B6FF3B]" /> Unlimited Transactions</li>
                 <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="h-5 w-5 text-[#B6FF3B]" /> Prophet Forecasting</li>
                 <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="h-5 w-5 text-[#B6FF3B]" /> Export to PDF/CSV</li>
                 <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="h-5 w-5 text-[#B6FF3B]" /> Priority Support</li>
              </ul>
              <Link href="/signup">
                <Button className="w-full bg-[#B6FF3B] text-black hover:bg-[#a2ff00] font-bold">Start Free Trial</Button>
              </Link>
           </div>

           {/* Enterprise Tier */}
           <div className="bg-[#1A1F26] border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all">
              <h3 className="text-xl font-bold text-white mb-2">Enterprise</h3>
              <div className="text-4xl font-bold text-white mb-6">Custom</div>
              <p className="text-slate-400 text-sm mb-8">For large finance teams.</p>
              
              <ul className="space-y-4 mb-8">
                 <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="h-5 w-5 text-slate-500" /> API Access</li>
                 <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="h-5 w-5 text-slate-500" /> Custom Integrations</li>
                 <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="h-5 w-5 text-slate-500" /> Dedicated Account Manager</li>
              </ul>
              <Link href="/contact">
                <Button className="w-full bg-white/10 text-white hover:bg-white/20">Contact Sales</Button>
              </Link>
           </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}