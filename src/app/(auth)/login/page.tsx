"use client";

import { useState } from "react";
import Link from "next/link";
import api from "@/lib/api"; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock, Chrome, Eye, EyeOff, Loader2 } from "lucide-react";

export default function LoginPage() {
  // 🔴 REMOVE useRouter. We need a hard browser reload.
  // const router = useRouter(); 
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const loginData = new URLSearchParams();
    loginData.append('username', formData.get('email') as string);
    loginData.append('password', formData.get('password') as string);

    try {
      const res = await api.post("/auth/login", loginData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
      
      const token = res.data.access_token;
      if (!token) throw new Error("No access token received");

      // 1. Save Token
      localStorage.setItem("token", token);
      
      // 2. Dispatch event (helps sync state, though reload makes it redundant)
      window.dispatchEvent(new Event("storage"));

      // 🟢 3. FIX: Force Hard Reload
      // This is the only way to guarantee the API client picks up the new token
      // immediately and stops the 401 loop.
      window.location.href = "/dashboard";

    } catch (err: any) {
      console.error(err);
      if (err.response?.status === 404) {
        setError("Server Error: Login endpoint not found.");
      } else {
        setError("Invalid email or password.");
      }
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#1A1F26] border border-white/10 rounded-2xl p-8 shadow-2xl w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-white text-center mb-6">Welcome Back</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs text-center">
          {error}
        </div>
      )}

      {/* Social Auth */}
      <div className="space-y-3 mb-6">
        <Button variant="outline" type="button" className="w-full border-white/10 text-slate-300 hover:bg-white/5 hover:text-white h-11">
          <Chrome className="mr-2 h-4 w-4" /> Sign in with Google
        </Button>
      </div>

      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/10"></span></div>
        <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#1A1F26] px-2 text-slate-500">Or sign in with email</span></div>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-400">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
            <Input name="email" type="email" required placeholder="name@example.com" className="bg-[#0B0D10] border-white/10 pl-10 text-white" />
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-xs font-medium text-slate-400">Password</label>
            <Link href="/auth/forgot-password" className="text-xs text-[#B6FF3B] hover:underline">Forgot password?</Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
            <Input 
                name="password" 
                type={showPassword ? "text" : "password"} 
                required 
                placeholder="••••••••" 
                className="bg-[#0B0D10] border-white/10 pl-10 pr-10 text-white" 
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-slate-500 hover:text-white">
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <Button disabled={loading} className="w-full bg-[#B6FF3B] text-black hover:bg-[#a2ff00] font-bold mt-2">
           {loading ? <Loader2 className="animate-spin h-4 w-4" /> : "Continue"}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm text-slate-400 border-t border-white/10 pt-4">
        Don't have an account? <Link href="/signup" className="text-[#B6FF3B] hover:underline font-bold">Sign up</Link>
      </div>
    </div>
  );
}