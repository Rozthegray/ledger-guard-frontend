"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api"; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Calendar, Phone, Loader2 } from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const payload = {
        full_name: formData.get("full_name"),
        phone: formData.get("phone"),
        dob: formData.get("dob")
    };

    try {
        // 🟢 FIX: Correct Endpoint is /user/me
        await api.put("/user/me", payload);
        
        // Redirect to Dashboard
        router.push("/dashboard");
    } catch (err) {
        console.error("Failed to update profile", err);
        // Optional: Show error or allow verify anyway
        alert("Failed to save details. Please try again.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0D10] flex items-center justify-center p-4">
      <div className="bg-[#1A1F26] border border-white/10 rounded-2xl p-8 shadow-2xl max-w-md w-full">
        <h2 className="text-2xl font-bold text-white text-center mb-2">Fill Personal Info</h2>
        <p className="text-slate-400 text-sm text-center mb-8">
          Just a few more details to get you started.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-400">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
              <Input name="full_name" required placeholder="e.g. John Doe" className="bg-[#0B0D10] border-white/10 pl-10 text-white" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-400">Phone Number (Optional)</label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
              <Input name="phone" placeholder="+234..." className="bg-[#0B0D10] border-white/10 pl-10 text-white" />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-400">Date of Birth</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
              <Input name="dob" type="date" className="bg-[#0B0D10] border-white/10 pl-10 text-white [color-scheme:dark]" />
            </div>
          </div>

          <div className="pt-2">
              <Button disabled={loading} className="w-full bg-[#B6FF3B] text-black hover:bg-[#a2ff00] font-bold h-12">
              {loading ? <Loader2 className="animate-spin h-4 w-4" /> : "Complete Setup"}
              </Button>
          </div>
        </form>
      </div>
    </div>
  );
}