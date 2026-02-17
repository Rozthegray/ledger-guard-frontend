"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MailOpen, Loader2 } from "lucide-react";

export default function VerifyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false); // 🟢 State for resend button
  const [email, setEmail] = useState("your email");
  
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const savedEmail = localStorage.getItem("user_email");
    if (savedEmail) setEmail(savedEmail);
  }, []);

  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  // 🟢 1. VERIFY LOGIC (Fixed URL & Error Handling)
  const handleSubmit = async () => {
    setLoading(true);
    const code = otp.join("");
    
    if (code.length < 6) {
        alert("Please enter the full 6-digit code.");
        setLoading(false);
        return;
    }

    try {
        // Correct URL: /auth/verify-email
        await api.post("/auth/verify-email", { code });
        router.push("/onboarding");
    } catch (err: any) {
        console.error(err);
        // Show specific error if backend sent one, otherwise generic
        if (err.response?.status === 404) {
            alert("❌ Server Error: Endpoint not found. Did you restart the backend?");
        } else {
            alert("❌ Invalid code. Please try again.");
        }
        setOtp(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();
    } finally {
        setLoading(false);
    }
  };

  // 🟢 2. RESEND LOGIC (Implemented)
  const handleResend = async () => {
    if (resending) return;
    setResending(true);
    try {
        // Correct URL: /auth/resend-code
        await api.post(`/auth/resend-code?user_email=${email}`);
    } catch (err) {
        console.error(err);
        alert("Failed to resend code. Please try again.");
    } finally {
        setTimeout(() => setResending(false), 30000); // 30s cooldown
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0D10] flex items-center justify-center p-4">
      <div className="bg-[#1A1F26] border border-white/10 rounded-2xl p-8 shadow-2xl text-center max-w-md w-full">
        <div className="flex justify-center mb-6">
          <div className="h-16 w-16 bg-[#B6FF3B]/10 rounded-full flex items-center justify-center">
              <MailOpen className="h-8 w-8 text-[#B6FF3B]" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-2">Check your email</h2>
        <p className="text-slate-400 text-sm mb-8">
          We sent a verification code to <br/> <span className="text-white font-medium">{email}</span>
        </p>

        <div className="space-y-6">
          <div className="text-left">
              <label className="text-xs font-medium text-slate-400 block mb-3 text-center uppercase tracking-widest">Enter OTP Code</label>
              <div className="flex justify-center gap-2">
                  {otp.map((digit, i) => (
                      <Input 
                          key={i}
                          // @ts-ignore
                          ref={(el) => (inputRefs.current[i] = el)}
                          type="text"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleChange(i, e.target.value)}
                          className="w-12 h-14 bg-[#0B0D10] border-white/10 text-center text-xl font-bold text-white focus:border-[#B6FF3B] focus:ring-[#B6FF3B]" 
                      />
                  ))}
              </div>
          </div>

          <Button 
            onClick={handleSubmit} 
            disabled={loading} 
            className="w-full bg-[#B6FF3B] text-black hover:bg-[#a2ff00] font-bold h-12"
          >
            {loading ? <Loader2 className="animate-spin h-4 w-4" /> : "Verify Email"}
          </Button>
        </div>

        <div className="mt-8 text-sm text-slate-500">
          Didn't receive the email? 
          <button 
            onClick={handleResend}
            disabled={resending}
            className={`ml-1 font-bold ${resending ? 'text-slate-600 cursor-not-allowed' : 'text-[#B6FF3B] hover:underline'}`}
          >
            {resending ? "Sent! Wait 30s..." : "Click to resend"}
          </button>
        </div>
      </div>
    </div>
  );
}