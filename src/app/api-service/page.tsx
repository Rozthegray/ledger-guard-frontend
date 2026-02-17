"use client";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Button } from "@/components/ui/button";
import { Terminal, Copy, CheckCircle2 } from "lucide-react";

export default function ApiServicePage() {
  return (
    <div className="min-h-screen bg-[#0B0D10] text-[#E9EEF5]">
      <SiteHeader />
      
      <div className="pt-32 pb-20 container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Left: Info */}
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B6FF3B]/10 border border-[#B6FF3B]/20 text-[#B6FF3B] text-xs font-bold uppercase tracking-wide mb-6">
              <Terminal className="h-3 w-3" />
              <span>Developer API v1</span>
            </div>
            <h1 className="text-5xl font-bold text-white mb-6">
              Build on our <br />
              <span className="text-[#B6FF3B]">Financial Engine</span>
            </h1>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              Integrate Ledger Guard's ingestion, auditing, and forecasting capabilities directly into your own fintech application.
            </p>
            
            <div className="space-y-4 mb-8">
              {["99.9% Uptime SLA", "256-bit Encryption", "Webhooks for Real-time Events"].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#B6FF3B]" />
                  <span className="text-slate-300">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <Button className="bg-[#B6FF3B] text-black hover:bg-[#a2ff00] font-bold px-8 h-12">
                Get API Key
              </Button>
              <Button variant="outline" className="border-white/10 text-white hover:bg-white/5 h-12">
                View Docs
              </Button>
            </div>
          </div>

          {/* Right: Code Block */}
          <div className="flex-1 w-full max-w-lg">
            <div className="bg-[#1A1F26] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between px-4 py-3 bg-[#0F1216] border-b border-white/5">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-xs text-slate-500 font-mono">POST /v1/ingest</div>
              </div>
              <div className="p-6 font-mono text-sm relative group">
                <Button size="icon" variant="ghost" className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Copy className="h-4 w-4 text-slate-400" />
                </Button>
                <div className="text-purple-400">curl</div>
                <div className="text-white pl-4">-X POST https://api.ledgerguard.ai/v1/ingest \</div>
                <div className="text-white pl-4">-H <span className="text-green-400">"Authorization: Bearer YOUR_KEY"</span> \</div>
                <div className="text-white pl-4">-F <span className="text-green-400">"file=@statement.pdf"</span></div>
                <div className="text-slate-500 mt-4">// Response</div>
                <div className="text-yellow-300 mt-2">{"{"}</div>
                <div className="text-white pl-4">"status": <span className="text-green-400">"success"</span>,</div>
                <div className="text-white pl-4">"transactions": 124,</div>
                <div className="text-white pl-4">"anomalies": 2</div>
                <div className="text-yellow-300">{"}"}</div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <SiteFooter />
    </div>
  );
}