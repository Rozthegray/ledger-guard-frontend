"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Menu, X, Bell, Loader2, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AuthGuard from "@/components/auth/AuthGuard";
import { Toaster, toast } from "sonner";
import Link from "next/link"; 

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<{ full_name: string, plan: string } | null>(null);
  
  // GLOBAL STATES
  const [isProcessing, setIsProcessing] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    api.get("/user/me").then(res => setUser(res.data)).catch(console.error);
  }, []);

  useEffect(() => {
    let lastCompleted = 0;
    const checkStatus = async () => {
      try {
        const res = await api.get("/api/v1/dashboard/audit-logs");
        const logs = res.data;

        // A. Check for Active Processing
        const active = logs.some((l: any) => l.status === "processing");
        setIsProcessing(active);

        // B. Check for Notifications
        const completedCount = logs.filter((l: any) => l.status === "completed").length;
        if (lastCompleted > 0 && completedCount > lastCompleted) {
           toast.success("Audit Complete!", {
             description: "Your financial analysis is ready.",
             icon: <CheckCircle className="text-green-500" />
           });
        }
        setUnreadCount(completedCount);
        lastCompleted = completedCount;
      } catch (e) { }
    };
    checkStatus();
    const interval = setInterval(checkStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AuthGuard>
      <div className="min-h-screen bg-[#0B0D10] text-[#E9EEF5] flex font-sans relative">
        <Toaster position="top-right" theme="dark" />
        
        {/* DESKTOP SIDEBAR */}
        <aside className="hidden md:block w-64 shrink-0 fixed top-0 left-0 bottom-0 z-40">
          <Sidebar user={user} />
        </aside>
        
        {/* MOBILE HEADER */}
        <div className="md:hidden fixed top-0 w-full z-50 bg-[#0B0D10]/95 backdrop-blur-md border-b border-white/10 px-4 h-16 flex items-center justify-between shadow-md">
           <div className="font-bold text-white flex items-center gap-2 text-lg">Ledger Guard</div>
           
           <div className="flex items-center gap-4">
             {/* 🟢 MOBILE AI INDICATOR (Added Here) */}
             {isProcessing && (
                <div className="flex items-center gap-1 px-2 py-1 bg-[#B6FF3B]/10 border border-[#B6FF3B]/30 rounded-full animate-pulse">
                   <Loader2 className="h-3 w-3 text-[#B6FF3B] animate-spin" />
                   <span className="text-[10px] font-bold text-[#B6FF3B]">AI...</span>
                </div>
             )}
             
             <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
               <Menu className="text-white h-6 w-6" />
             </button>
           </div>
        </div>

        {/* MOBILE SIDEBAR OVERLAY */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 bg-black/80 z-50 md:hidden backdrop-blur-sm"
              />
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 left-0 bottom-0 w-64 z-[60] md:hidden shadow-2xl"
              >
                <Sidebar user={user} onClose={() => setIsMobileMenuOpen(false)} />
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="absolute top-4 right-4 p-1 bg-white/10 rounded-full text-white md:hidden"
                >
                  <X className="h-5 w-5" />
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* MAIN CONTENT */}
        <main className="flex-1 md:ml-64 p-6 pt-20 md:pt-8 overflow-x-hidden min-h-screen relative z-0">
          
          {/* TOP BAR (Desktop Only) */}
          <div className="hidden md:flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
            
            <div className="flex items-center gap-4">
              {/* DESKTOP AI INDICATOR */}
              {isProcessing && (
                <div className="flex items-center gap-2 px-3 py-1 bg-[#B6FF3B]/10 border border-[#B6FF3B]/30 rounded-full animate-pulse shadow-[0_0_10px_rgba(182,255,59,0.1)]">
                   <Loader2 className="h-4 w-4 text-[#B6FF3B] animate-spin" />
                   <span className="text-xs font-bold text-[#B6FF3B]">AI ANALYZING...</span>
                </div>
              )}

              <div className="text-sm text-slate-400">
                Welcome back, <span className="text-white font-bold">{user?.full_name || "User"}</span>
              </div>
              
              <Link href="/dashboard/notifications">
                <button className="relative p-2 rounded-full hover:bg-white/5 border border-white/10 transition-colors">
                  <Bell className={`h-5 w-5 ${unreadCount > 0 ? "text-white" : "text-slate-300"}`} />
                  {unreadCount > 0 && (
                    <span className="absolute top-2 right-2 h-2.5 w-2.5 bg-red-500 rounded-full animate-ping"></span>
                  )}
                  {unreadCount > 0 && (
                    <span className="absolute top-2 right-2 h-2.5 w-2.5 bg-red-500 rounded-full border border-[#0B0D10]"></span>
                  )}
                </button>
              </Link>
            </div>
          </div>

          {children}

        </main>
      </div>
    </AuthGuard>
  );
}