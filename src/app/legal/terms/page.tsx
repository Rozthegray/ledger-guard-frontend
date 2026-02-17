"use client";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0B0D10] text-[#E9EEF5]">
      <SiteHeader />
      <div className="container mx-auto px-6 pt-32 pb-20 max-w-3xl">
        <h1 className="text-4xl font-bold text-white mb-2">Terms of Service</h1>
        <p className="text-slate-400 mb-12">Last Updated: February 7, 2026</p>

        <div className="prose prose-invert prose-lg text-slate-300">
          <h3>1. Acceptance of Terms</h3>
          <p>By accessing and using Ledger Guard, you accept and agree to be bound by the terms and provision of this agreement.</p>

          <h3>2. Description of Service</h3>
          <p>Ledger Guard provides AI-powered financial auditing and forecasting tools. We reserve the right to modify or discontinue the service at any time.</p>

          <h3>3. User Responsibilities</h3>
          <p>You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.</p>

          <h3>4. Data Usage</h3>
          <p>We process your financial data solely for the purpose of providing the analysis. We do not sell your data to third parties.</p>
          
          {/* Add more sections as needed */}
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}