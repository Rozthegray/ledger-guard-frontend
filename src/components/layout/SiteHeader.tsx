"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  ShieldCheck, Menu, X, ChevronDown, Zap, TrendingUp, 
  BookOpen, Users, Mail, CreditCard, LayoutDashboard 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  return (
    <>
      <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#0B0D10]/80 backdrop-blur-md">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 bg-[#B6FF3B] rounded-lg flex items-center justify-center">
              <ShieldCheck className="text-black h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Ledger Guard</span>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            {/* Solutions Dropdown */}
            <div 
              className="relative group h-16 flex items-center cursor-pointer"
              onMouseEnter={() => setHoveredLink("solutions")}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <span className="flex items-center gap-1 hover:text-[#B6FF3B] transition-colors">
                Solutions <ChevronDown className="h-3 w-3" />
              </span>
              <AnimatePresence>
                {hoveredLink === "solutions" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-14 left-0 w-64 bg-[#1A1F26] border border-white/10 rounded-xl shadow-2xl p-2 grid gap-1"
                  >
                    <Link href="/dashboard/upload" className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                      <Zap className="h-5 w-5 text-[#B6FF3B] mt-1 group-hover:scale-110 transition-transform" />
                      <div>
                        <div className="text-white font-bold">Audit Tool</div>
                        <div className="text-xs text-slate-400">Deep transaction analysis</div>
                      </div>
                    </Link>
                    <Link href="/dashboard/upload" className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                      <TrendingUp className="h-5 w-5 text-[#B6FF3B] mt-1 group-hover:scale-110 transition-transform" />
                      <div>
                        <div className="text-white font-bold">Forecasting Tool</div>
                        <div className="text-xs text-slate-400">Runway prediction</div>
                      </div>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Resources Dropdown */}
            <div 
              className="relative group h-16 flex items-center cursor-pointer"
              onMouseEnter={() => setHoveredLink("resources")}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <span className="flex items-center gap-1 hover:text-[#B6FF3B] transition-colors">
                Resources <ChevronDown className="h-3 w-3" />
              </span>
              <AnimatePresence>
                {hoveredLink === "resources" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-14 left-0 w-64 bg-[#1A1F26] border border-white/10 rounded-xl shadow-2xl p-2 grid gap-1"
                  >
                    <Link href="/blog" className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
                      <BookOpen className="h-5 w-5 text-[#B6FF3B] mt-1" />
                      <div>
                        <div className="text-white font-bold">Blog</div>
                        <div className="text-xs text-slate-400">Latest updates</div>
                      </div>
                    </Link>
                    <Link href="/contact" className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
                      <Mail className="h-5 w-5 text-[#B6FF3B] mt-1" />
                      <div>
                        <div className="text-white font-bold">Contact Us</div>
                        <div className="text-xs text-slate-400">Get support</div>
                      </div>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/pricing" className="hover:text-[#B6FF3B] transition-colors">Pricing</Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="text-white hover:text-[#B6FF3B] hover:bg-transparent">Login</Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-[#B6FF3B] text-black hover:bg-[#a2ff00] font-bold rounded-full px-6">Start Free</Button>
            </Link>
          </div>

          {/* MOBILE HAMBURGER BUTTON */}
          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(true)}>
              <Menu className="text-white h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-[#0B0D10] p-6 flex flex-col"
          >
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-[#B6FF3B] rounded-lg flex items-center justify-center">
                  <ShieldCheck className="text-black h-5 w-5" />
                </div>
                <span className="text-xl font-bold tracking-tight text-white">Ledger Guard</span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X className="text-white h-6 w-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-8">
              {/* Product */}
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Product</h4>
                <Link href="/pricing" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-4 text-xl font-bold text-white mb-4">
                  Pricing
                </Link>
              </div>

              {/* Solutions */}
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Solutions</h4>
                <Link href="/dashboard/upload" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-4 text-xl font-bold text-white mb-4">
                  <Zap className="text-[#B6FF3B] h-5 w-5" /> Auditing Tool
                </Link>
                <Link href="/dashboard/upload" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-4 text-xl font-bold text-white mb-4">
                  <TrendingUp className="text-[#B6FF3B] h-5 w-5" /> Forecasting Tool
                </Link>
              </div>

              {/* Resources */}
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Resources</h4>
                <Link href="/blog" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-4 text-xl font-bold text-white mb-4">
                  Blog
                </Link>
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-4 text-xl font-bold text-white mb-4">
                  Contact Us
                </Link>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 space-y-3">
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full h-12 border-white/10 text-black hover:bg-white/5 text-lg">Log In</Button>
              </Link>
              <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full h-12 bg-[#B6FF3B] text-black hover:bg-[#a2ff00] font-bold text-lg">Get Started</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}