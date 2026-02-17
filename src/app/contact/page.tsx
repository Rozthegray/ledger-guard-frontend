"use client";

import { SiteHeader } from "@/components/layout/SiteHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Globe } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#0B0D10] text-[#E9EEF5]">
      <SiteHeader />
      
      <div className="pt-32 pb-20 container mx-auto px-6">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 bg-[#1A1F26] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
          
          {/* Left: Info (Matches Sketch "Contact our team") */}
          <div className="p-10 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#B6FF3B]/5 rounded-full blur-[80px]"></div>
            <div>
              <h1 className="text-4xl font-bold text-white mb-4">Contact our team</h1>
              <p className="text-slate-400 mb-8">Need custom pricing or enterprise solutions? We're here to help.</p>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-white mb-1">Email</h4>
                  <p className="text-slate-400">support@ledgerguard.ai</p>
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Office</h4>
                  <p className="text-slate-400">Lagos, Nigeria</p>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10">
              <p className="text-sm font-bold text-[#B6FF3B] uppercase tracking-wider mb-4">Trusted by 1000+ Leaders</p>
              <div className="flex gap-4 opacity-50 grayscale">
                 <Globe className="h-6 w-6" />
                 <Globe className="h-6 w-6" />
                 <Globe className="h-6 w-6" />
              </div>
            </div>
          </div>

          {/* Right: Form (Matches Sketch Form) */}
          <div className="bg-[#0B0D10]/50 p-10 backdrop-blur-sm">
            <form className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Full Name</label>
                <Input className="bg-[#1A1F26] border-white/10 text-white" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Email Address</label>
                <Input className="bg-[#1A1F26] border-white/10 text-white" placeholder="john@company.com" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Message</label>
                <Textarea className="bg-[#1A1F26] border-white/10 text-white h-32" placeholder="Tell us how we can help..." />
              </div>
              <Button className="w-full bg-[#B6FF3B] text-black hover:bg-[#a2ff00] font-bold h-12">
                Send Message
              </Button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}