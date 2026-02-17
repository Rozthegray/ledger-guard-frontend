"use client";

import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter"; // <--- Import Footer
import { ChevronRight, FileText, Code, Shield } from "lucide-react";
import Link from "next/link";

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-[#0B0D10] text-[#E9EEF5]">
      <SiteHeader />
      
      <div className="pt-24 container mx-auto px-6 flex flex-col md:flex-row gap-12">
        
        {/* SIDEBAR NAVIGATION */}
        <aside className="w-full md:w-64 shrink-0 md:border-r border-white/10 md:min-h-[calc(100vh-200px)] py-8">
          <div className="sticky top-32 space-y-8">
            <div>
              <h4 className="font-bold text-white mb-4 px-2 text-sm uppercase tracking-wider">Getting Started</h4>
              <ul className="space-y-1 text-sm text-slate-400">
                <li className="px-2 py-1.5 bg-[#B6FF3B]/10 text-[#B6FF3B] rounded-md cursor-pointer font-medium border-l-2 border-[#B6FF3B]">Introduction</li>
                <li className="px-2 py-1.5 hover:text-white cursor-pointer hover:bg-white/5 rounded-md transition-colors">Quickstart</li>
                <li className="px-2 py-1.5 hover:text-white cursor-pointer hover:bg-white/5 rounded-md transition-colors">Authentication</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4 px-2 text-sm uppercase tracking-wider">API Reference</h4>
              <ul className="space-y-1 text-sm text-slate-400">
                <li className="px-2 py-1.5 hover:text-white cursor-pointer hover:bg-white/5 rounded-md transition-colors">/ingest (Upload)</li>
                <li className="px-2 py-1.5 hover:text-white cursor-pointer hover:bg-white/5 rounded-md transition-colors">/audit (Results)</li>
                <li className="px-2 py-1.5 hover:text-white cursor-pointer hover:bg-white/5 rounded-md transition-colors">/forecast (Prophet)</li>
              </ul>
            </div>
          </div>
        </aside>

        {/* MAIN DOCS CONTENT */}
        <main className="flex-1 py-8 max-w-4xl min-h-[800px]">
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
            <span className="hover:text-white cursor-pointer">Docs</span>
            <ChevronRight className="h-4 w-4" />
            <span className="text-[#B6FF3B]">Introduction</span>
          </div>

          <h1 className="text-5xl font-bold text-white mb-6">Introduction</h1>
          <p className="text-slate-300 text-lg leading-relaxed mb-12">
            Ledger Guard is a financial intelligence platform designed for modern developers. 
            We use a combination of **Llama-3 (LLM)** for semantic analysis and **Facebook Prophet** for time-series forecasting to turn messy bank PDFs into structured, actionable data.
          </p>

          {/* Quick Links Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            <div className="bg-[#1A1F26] border border-white/10 p-6 rounded-xl hover:border-[#B6FF3B]/50 transition-colors cursor-pointer group">
              <Code className="h-8 w-8 text-[#B6FF3B] mb-4" />
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#B6FF3B]">Quickstart Guide</h3>
              <p className="text-sm text-slate-400">Get your API key and make your first request in under 5 minutes.</p>
            </div>
            <div className="bg-[#1A1F26] border border-white/10 p-6 rounded-xl hover:border-[#B6FF3B]/50 transition-colors cursor-pointer group">
              <FileText className="h-8 w-8 text-[#B6FF3B] mb-4" />
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#B6FF3B]">API Reference</h3>
              <p className="text-sm text-slate-400">Detailed endpoints, request bodies, and response examples.</p>
            </div>
          </div>

          <hr className="border-white/10 mb-12" />

          <h2 className="text-3xl font-bold text-white mb-6">Core Concepts</h2>
          <div className="space-y-8">
            <div className="flex gap-4">
               <div className="mt-1"><div className="h-6 w-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">1</div></div>
               <div>
                 <h3 className="text-xl font-bold text-white mb-2">Ingestion & OCR</h3>
                 <p className="text-slate-400">We extract raw text from PDFs using advanced OCR. We support major Nigerian banks (GTBank, Zenith, Opay, Moniepoint) out of the box.</p>
               </div>
            </div>
            <div className="flex gap-4">
               <div className="mt-1"><div className="h-6 w-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs">2</div></div>
               <div>
                 <h3 className="text-xl font-bold text-white mb-2">Normalization</h3>
                 <p className="text-slate-400">Raw vendor strings (e.g., "UBER* TRIP 294") are mapped to clean categories (e.g., "Travel") using Vector Embeddings.</p>
               </div>
            </div>
            <div className="flex gap-4">
               <div className="mt-1"><div className="h-6 w-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center font-bold text-xs">3</div></div>
               <div>
                 <h3 className="text-xl font-bold text-white mb-2">Security</h3>
                 <p className="text-slate-400">All files are processed in volatile memory and deleted immediately after analysis. We are GDPR compliant.</p>
               </div>
            </div>
          </div>

        </main>
      </div>

      <SiteFooter /> {/* <--- Footer Added Here */}
    </div>
  );
}