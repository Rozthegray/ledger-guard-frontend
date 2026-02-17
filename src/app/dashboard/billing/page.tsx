"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api"; 
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, CreditCard, Star, Loader2 } from "lucide-react";

interface Subscription {
    id: number;
    plan_name: string;
    amount: number;
    status: string;
    created_at: string;
    end_date: string | null;
}

export default function BillingPage() {
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<Subscription[]>([]);
  const [activePlan, setActivePlan] = useState<string>("starter");

  useEffect(() => {
    const fetchData = async () => {
        try {
            // 1. Get History
            const res = await api.get("/billing/history");
            setHistory(res.data);
            
            // 2. Get Current Plan Status
            const userRes = await api.get("/user/me");
            setActivePlan(userRes.data.plan);
        } catch (e) {
            console.error("Failed to load data");
        }
    };
    fetchData();
  }, []);

  const handleSubscribe = async (planId: string, price: number) => {
    setLoading(true);
    try {
        const res = await api.post("/billing/paystack/initialize", {
            plan_id: planId,
            amount: price * 100, 
            currency: "NGN" 
        });
        const win = window.open(res.data.url, "_blank");
        if (win) alert("Payment tab opened! After paying, refresh this page.");
    } catch (err: any) {
        // This handles the "You already have an active plan" error
        const msg = err.response?.data?.detail || "Failed to start payment";
        alert(msg);
    } finally {
        setLoading(false);
    }
  };

  // Helper to check if they are already on the paid plan
  const isGrowthActive = activePlan === "growth";

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Billing & Plans</h1>
        <p className="text-slate-400">Manage your subscription and billing history.</p>
      </div>

      <div className="bg-[#1A1F26] border border-white/10 rounded-xl p-6 flex items-center gap-4">
          <div className="h-12 w-12 bg-slate-700 rounded-full flex items-center justify-center text-white">
            <CreditCard className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Current Plan</p>
            <h3 className="text-xl font-bold text-white capitalize">{activePlan}</h3>
          </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* STARTER */}
        <Card className="bg-[#0B0D10] border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Starter</CardTitle>
            <CardDescription>For individuals.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-3xl font-bold text-white">₦0<span className="text-sm font-normal text-slate-500">/mo</span></div>
            <ul className="text-sm space-y-3 text-slate-400">
              <li className="flex gap-2"><Check className="h-4 w-4"/> 5 Uploads / Month</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full border-white/10 text-slate-300" disabled>Current Plan</Button>
          </CardFooter>
        </Card>

        {/* GROWTH */}
        <Card className={`bg-[#1A1F26] border-[#B6FF3B] relative ${isGrowthActive ? "opacity-75" : ""}`}>
          <div className="absolute top-0 right-0 bg-[#B6FF3B] text-black text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg flex items-center gap-1">
            <Star className="h-3 w-3 fill-black" /> POPULAR
          </div>
          <CardHeader>
            <CardTitle className="text-white text-xl">Growth</CardTitle>
            <CardDescription className="text-slate-400">For scaling startups.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-4xl font-bold text-white">₦5,000<span className="text-sm font-normal text-slate-500">/mo</span></div>
            <ul className="text-sm space-y-3 text-slate-300">
              <li className="flex gap-2"><Check className="h-4 w-4 text-[#B6FF3B]"/> Unlimited Uploads</li>
              <li className="flex gap-2"><Check className="h-4 w-4 text-[#B6FF3B]"/> Priority Support</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full bg-[#B6FF3B] text-black hover:bg-[#a2ff00] font-bold h-12"
              disabled={loading || isGrowthActive} // 🟢 Disable if already active
              onClick={() => handleSubscribe("growth", 5000)}
            >
              {loading ? <Loader2 className="animate-spin h-4 w-4" /> : isGrowthActive ? "Plan Active" : "Upgrade Now"}
            </Button>
          </CardFooter>
        </Card>

        {/* ENTERPRISE */}
        <Card className="bg-[#0B0D10] border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Enterprise</CardTitle>
            <CardDescription>For large teams.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-3xl font-bold text-white">Custom</div>
            <ul className="text-sm space-y-3 text-slate-400">
              <li className="flex gap-2"><Check className="h-4 w-4"/> Custom Features</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full border-white/10 text-white hover:bg-white/5">Contact Sales</Button>
          </CardFooter>
        </Card>
      </div>

      {/* 🟢 BILLING HISTORY TABLE */}
      <div className="bg-[#1A1F26] border border-white/10 rounded-xl p-6 mt-8">
        <h3 className="text-xl font-bold text-white mb-4">Billing History</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-400">
              <thead className="border-b border-white/10 text-xs uppercase text-slate-500">
                  <tr>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4">Plan</th>
                      <th className="py-3 px-4">Amount</th>
                      <th className="py-3 px-4">Expires</th>
                      <th className="py-3 px-4 text-right">Status</th>
                  </tr>
              </thead>
              <tbody>
                  {history.length === 0 ? (
                      <tr><td className="py-4 px-4 text-center" colSpan={5}>No payment history found.</td></tr>
                  ) : (
                      history.map((sub) => (
                          <tr key={sub.id} className="border-b border-white/5 last:border-0">
                              <td className="py-3 px-4">{new Date(sub.created_at).toLocaleDateString()}</td>
                              <td className="py-3 px-4 capitalize text-white">{sub.plan_name}</td>
                              <td className="py-3 px-4">₦{sub.amount.toLocaleString()}</td>
                              <td className="py-3 px-4 text-[#B6FF3B]">
                                {sub.end_date ? new Date(sub.end_date).toLocaleDateString() : "-"}
                              </td>
                              <td className="py-3 px-4 text-right">
                                <span className={`px-2 py-1 rounded text-xs font-bold ${
                                    sub.status === 'success' ? 'bg-green-500/20 text-green-400' : 
                                    sub.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : 
                                    'bg-red-500/20 text-red-400'
                                }`}>
                                    {sub.status.toUpperCase()}
                                </span>
                              </td>
                          </tr>
                      ))
                  )}
              </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}