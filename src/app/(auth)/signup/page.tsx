"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "@/lib/api"; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock, Chrome, Eye, EyeOff, CheckCircle2, Loader2 } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const res = await api.post("/auth/signup", {
        email,
        password,
        full_name: "New User", 
        company_name: "My Company" 
      });

      // Store Token & Email for the next step
      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("user_email", email); 

      // ✅ CORRECT PATH: Ensure this matches your folder structure
      router.push("/verify-email");
      
    } catch (err: any) {
      console.error(err);
      if (err.response?.status === 400) {
        setError("Email already registered.");
      } else {
        setError("Connection failed. Is the backend running?");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#1A1F26] border border-white/10 rounded-2xl p-8 shadow-2xl w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-white text-center mb-6">Create an account</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs text-center font-medium">
          {error}
        </div>
      )}

      {/* Social Auth */}
      <div className="space-y-3 mb-6">
        <Button variant="outline" type="button" className="w-full border-white/10 text-slate-300 hover:bg-white/5 hover:text-white h-11">
          <Chrome className="mr-2 h-4 w-4" /> Sign up with Google
        </Button>
      </div>

      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/10"></span></div>
        <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#1A1F26] px-2 text-slate-500">Or sign up with email</span></div>
      </div>

      <form onSubmit={handleSignup} className="space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-400">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
            <Input name="email" type="email" required placeholder="name@example.com" className="bg-[#0B0D10] border-white/10 pl-10 text-white" />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-400">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
            <Input 
                name="password" 
                type={showPassword ? "text" : "password"} 
                required 
                placeholder="Create a password" 
                className="bg-[#0B0D10] border-white/10 pl-10 pr-10 text-white" 
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-slate-500 hover:text-white">
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-400">Confirm Password</label>
          <div className="relative">
            <CheckCircle2 className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
            <Input 
                name="confirmPassword" 
                type={showConfirm ? "text" : "password"} 
                required 
                placeholder="Confirm password" 
                className="bg-[#0B0D10] border-white/10 pl-10 pr-10 text-white" 
            />
            <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-3 text-slate-500 hover:text-white">
                {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <Button disabled={loading} className="w-full bg-[#B6FF3B] text-black hover:bg-[#a2ff00] font-bold mt-2">
          {loading ? <Loader2 className="animate-spin h-4 w-4" /> : "Create Account"}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm text-slate-400 border-t border-white/10 pt-4">
        Already signed up? <Link href="/login" className="text-[#B6FF3B] hover:underline font-bold">Sign in</Link>
      </div>
    </div>
  );
}