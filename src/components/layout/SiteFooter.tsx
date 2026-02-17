"use client";

import Link from "next/link";
import { ShieldCheck, Github, Twitter, Linkedin } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="py-16 bg-[#080a0c] border-t border-white/10 text-[#E9EEF5]">
      <div className="container mx-auto px-6">
        
        {/* Top Section: CTA & Brand */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 pb-16 border-b border-white/10 gap-8">
          <div className="max-w-md">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-8 w-8 bg-[#B6FF3B] rounded-lg flex items-center justify-center">
                <ShieldCheck className="text-black h-5 w-5" />
              </div>
              <span className="text-2xl font-bold text-white">Ledger Guard</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              The financial intelligence engine for modern developers and agencies. 
              We ingest, audit, and forecast cash flow with 99% precision using Llama-3 and Prophet models.
            </p>
            <div className="flex gap-4">
              <Link href="https://github.com" target="_blank" className="p-2 bg-[#1A1F26] rounded-full hover:text-[#B6FF3B] transition-colors"><Github className="h-5 w-5" /></Link>
              <Link href="https://twitter.com" target="_blank" className="p-2 bg-[#1A1F26] rounded-full hover:text-[#B6FF3B] transition-colors"><Twitter className="h-5 w-5" /></Link>
              <Link href="https://linkedin.com" target="_blank" className="p-2 bg-[#1A1F26] rounded-full hover:text-[#B6FF3B] transition-colors"><Linkedin className="h-5 w-5" /></Link>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
            <div>
              <h4 className="font-bold text-white mb-6">Product</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><Link href="/upload" className="hover:text-[#B6FF3B] transition-colors">Audit Engine</Link></li>
                <li><Link href="/upload" className="hover:text-[#B6FF3B] transition-colors">Forecasting</Link></li>
                <li><Link href="/pricing" className="hover:text-[#B6FF3B] transition-colors">Pricing</Link></li>
                <li><Link href="/api-service" className="hover:text-[#B6FF3B] transition-colors">API Access</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6">Resources</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><Link href="/docs" className="hover:text-[#B6FF3B] transition-colors">Documentation</Link></li>
                <li><Link href="/blog" className="hover:text-[#B6FF3B] transition-colors">Blog</Link></li>
                <li><Link href="/about" className="hover:text-[#B6FF3B] transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-[#B6FF3B] transition-colors">Contact Support</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6">Legal</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><Link href="/legal/privacy" className="hover:text-[#B6FF3B] transition-colors">Privacy Policy</Link></li>
                <li><Link href="/legal/terms" className="hover:text-[#B6FF3B] transition-colors">Terms of Service</Link></li>
                <li><Link href="/legal/security" className="hover:text-[#B6FF3B] transition-colors">Security Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-slate-600">
          <p>&copy; 2026 Ledger Guard AI. All rights reserved.</p>
          <div className="flex gap-2 mt-4 md:mt-0">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-slate-500">System Status: Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}