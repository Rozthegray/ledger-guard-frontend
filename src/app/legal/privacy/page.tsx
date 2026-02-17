"use client";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0B0D10] text-[#E9EEF5]">
      <SiteHeader />
      <div className="container mx-auto px-6 pt-32 pb-20 max-w-3xl">
        <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
        <div className="prose prose-invert prose-lg">
          <p className="text-slate-400">Effective Date: February 7, 2026</p>
          <h3 className="text-white mt-8 mb-4 font-bold text-xl">1. Data Collection</h3>
          <p className="text-slate-400">We collect financial data solely for the purpose of analysis. Files are processed in volatile memory and are not persistently stored unless you create an account.</p>
          <h3 className="text-white mt-8 mb-4 font-bold text-xl">2. Cookie Usage</h3>
          <p className="text-slate-400">We use essential cookies to maintain your session. You may reject non-essential cookies via our consent manager.</p>
          {/* Add more legal text here */}
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}