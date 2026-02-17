"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, X } from "lucide-react";
import Link from "next/link";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("ledger_cookie_consent");
    if (!consent) {
      // Small delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConsent = (choice: "accepted" | "rejected") => {
    localStorage.setItem("ledger_cookie_consent", choice);
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-[60] p-4 md:p-6"
        >
          <div className="max-w-4xl mx-auto bg-[#1A1F26] border border-white/10 rounded-2xl shadow-2xl p-6 md:flex items-center justify-between gap-6">
            
            {/* Text Content */}
            <div className="flex-1 mb-6 md:mb-0">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-5 w-5 text-[#B6FF3B]" />
                <h3 className="font-bold text-white text-lg">We value your privacy</h3>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                We use cookies to enhance your browsing experience and analyze our traffic. 
                We respect your data privacy rights. Read our <Link href="/legal/privacy" className="text-[#B6FF3B] hover:underline">Privacy Policy</Link>.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                variant="outline" 
                onClick={() => handleConsent("rejected")}
                className="border-white/10 text-slate-300 hover:bg-white/5 hover:text-white whitespace-nowrap"
              >
                Reject All
              </Button>
              <Button 
                onClick={() => handleConsent("accepted")}
                className="bg-[#B6FF3B] text-black hover:bg-[#a2ff00] font-bold whitespace-nowrap"
              >
                Accept All
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}