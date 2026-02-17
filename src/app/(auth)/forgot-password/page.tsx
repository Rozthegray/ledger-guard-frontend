"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { KeyRound, ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  return (
    <div className="bg-[#1A1F26] border border-white/10 rounded-2xl p-8 shadow-2xl">
      <div className="flex justify-center mb-6">
        <div className="h-12 w-12 bg-[#B6FF3B]/10 rounded-full flex items-center justify-center">
            <KeyRound className="h-6 w-6 text-[#B6FF3B]" />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white text-center mb-2">Reset Password</h2>
      <p className="text-slate-400 text-sm text-center mb-8">
        Enter the email address associated with your account and we'll send you a link to reset your password.
      </p>

      <form className="space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-400">Email Address</label>
          <Input placeholder="name@example.com" className="bg-[#0B0D10] border-white/10 text-white" />
        </div>

        <Button className="w-full bg-[#B6FF3B] text-black hover:bg-[#a2ff00] font-bold">
          Send Reset Link
        </Button>
      </form>

      <div className="mt-6 text-center">
        <Link href="/login" className="text-sm text-slate-400 hover:text-white flex items-center justify-center gap-2 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Return to sign in
        </Link>
      </div>
    </div>
  );
}