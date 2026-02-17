"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MailOpen } from "lucide-react";

export default function VerifyPage() {
  return (
    <div className="bg-[#1A1F26] border border-white/10 rounded-2xl p-8 shadow-2xl text-center">
      <div className="flex justify-center mb-6">
        <div className="h-16 w-16 bg-[#B6FF3B]/10 rounded-full flex items-center justify-center">
            <MailOpen className="h-8 w-8 text-[#B6FF3B]" />
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-white mb-2">Check your email</h2>
      <p className="text-slate-400 text-sm mb-8">
        We sent a verification link to <br/> <span className="text-white font-medium">user@example.com</span>
      </p>

      <div className="space-y-6">
        <div className="text-left">
            <label className="text-xs font-medium text-slate-400 block mb-3 text-center uppercase tracking-widest">Enter OTP Code</label>
            <div className="flex justify-center gap-3">
                {[1, 2, 3, 4].map((i) => (
                    <Input 
                        key={i} 
                        className="w-14 h-14 bg-[#0B0D10] border-white/10 text-center text-xl font-bold text-white focus:border-[#B6FF3B] focus:ring-[#B6FF3B]" 
                        maxLength={1}
                    />
                ))}
            </div>
        </div>

        <Link href="/onboarding" className="block w-full">
            <Button className="w-full bg-[#B6FF3B] text-black hover:bg-[#a2ff00] font-bold">
            Verify Email
            </Button>
        </Link>
      </div>

      <div className="mt-8 text-sm text-slate-500">
        Didn't receive the email? <button className="text-[#B6FF3B] hover:underline font-bold">Click to resend</button>
      </div>
    </div>
  );
}