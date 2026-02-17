"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Card } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, Activity, AlertTriangle, FileCheck, DollarSign, Loader2, Coins } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { calculateMetrics, FinancialMetrics } from "@/lib/financial-utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardOverview() {
  const [metrics, setMetrics] = useState<FinancialMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [latestFilename, setLatestFilename] = useState("");
  const [alerts, setAlerts] = useState<any[]>([]);
  const [currency, setCurrency] = useState("NGN"); // Default to NGN safely

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch User Settings FIRST
        const userRes = await api.get("/user/me");
        // Robust check for nested currency
        const userCurrency = userRes.data?.settings?.preferences?.currency || "NGN";
        setCurrency(userCurrency);

        // 2. Then Fetch Logs
        const logsRes = await api.get("/api/v1/dashboard/audit-logs");
        const logs = logsRes.data || [];
        
        // Find most recent completed log
        const latestLogSummary = logs.find((l: any) => l.status === 'completed');

        if (latestLogSummary) {
          setLatestFilename(latestLogSummary.filename);
          const fullLogRes = await api.get(`/api/v1/dashboard/audit-logs/${latestLogSummary.id}`);
          const findings = fullLogRes.data.findings || [];

          setMetrics(calculateMetrics(findings));
          setAlerts(findings.filter((t: any) => t.is_anomaly).slice(0, 5));
        } else {
           setMetrics(null);
        }
      } catch (err) {
        console.error("Failed to load dashboard data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  //  Robust Formatter
  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="h-[50vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#B6FF3B]" />
      </div>
    );
  }

  // --- EMPTY STATE ---
  if (!metrics) {
      return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                 <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
            </div>
            <Card className="bg-[#1A1F26] border-white/10 border-dashed p-10 flex flex-col items-center justify-center text-center h-96">
                <FileCheck className="h-12 w-12 text-slate-500 mb-4" />
                <h3 className="text-xl font-bold text-white">No Financial Data</h3>
                <p className="text-slate-400 max-w-md mb-6">
                    Upload your first bank statement to unlock real-time financial tracking.
                </p>
                <Link href="/dashboard/upload">
                    <Button className="bg-[#B6FF3B] text-black hover:bg-[#a2ff00] font-bold">
                        Start First Audit
                    </Button>
                </Link>
            </Card>
        </div>
      );
  }

  // --- ACTIVE STATE ---
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-6">
        <div>
            <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
            <p className="text-slate-400 text-sm">
                Financial health based on <span className="text-[#B6FF3B]">{latestFilename}</span>
            </p>
        </div>
        <Link href="/dashboard/upload">
            <Button variant="outline" className="border-[#B6FF3B] text-[#B6FF3B] hover:bg-[#B6FF3B]/10">
                New Analysis
            </Button>
        </Link>
      </div>

      {/* ROW 1: METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Balance */}
        <Card className="bg-[#1A1F26] border-white/10 p-6 flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-xs uppercase tracking-wider font-bold">Net Balance</p>
              <h3 className={`text-2xl font-bold mt-1 ${metrics.balance >= 0 ? "text-white" : "text-red-400"}`}>
                {formatMoney(metrics.balance)}
              </h3>
            </div>
            <div className="p-2 bg-green-500/10 rounded-lg"><Coins className="h-5 w-5 text-green-500" /></div>
          </div>
        </Card>

        {/* Burn Rate */}
        <Card className="bg-[#1A1F26] border-white/10 p-6 flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-xs uppercase tracking-wider font-bold">Monthly Burn</p>
              <h3 className="text-2xl font-bold text-white mt-1">
                {formatMoney(metrics.monthlyBurn)}
              </h3>
            </div>
            <div className="p-2 bg-red-500/10 rounded-lg"><ArrowDownRight className="h-5 w-5 text-red-500" /></div>
          </div>
        </Card>

        {/* Runway (Days, so no currency needed) */}
        <Card className="bg-[#1A1F26] border-white/10 p-6 flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-xs uppercase tracking-wider font-bold">Est. Runway</p>
              <h3 className="text-2xl font-bold text-[#B6FF3B] mt-1">
                {metrics.runway} Days
              </h3>
            </div>
            <div className="p-2 bg-[#B6FF3B]/10 rounded-lg"><Activity className="h-5 w-5 text-[#B6FF3B]" /></div>
          </div>
        </Card>
      </div>

      {/* ROW 2: CHART */}
      <Card className="bg-[#1A1F26] border-white/10 p-6 h-[400px]">
        <h3 className="text-lg font-bold text-white mb-6">Cash Flow Trend</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={metrics.chartData}>
              <defs>
                <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#B6FF3B" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#B6FF3B" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis 
                stroke="#475569" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
                tickFormatter={(val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: currency, notation: "compact" }).format(val)} 
              />
             <Tooltip 
  contentStyle={{ backgroundColor: '#0B0D10', borderColor: '#334155', color: '#fff' }} 
  itemStyle={{ color: '#B6FF3B' }}
  formatter={(value: any) => [formatMoney(Number(value)), "Balance"]}
/>
              <Area type="monotone" dataKey="value" stroke="#B6FF3B" strokeWidth={2} fillOpacity={1} fill="url(#colorVal)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* ROW 3: RISKS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-[#1A1F26] border-white/10 p-6 h-64 overflow-y-auto">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" /> AI Detected Risks
          </h3>
          <div className="space-y-3">
            {alerts.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-slate-500 text-sm">
                    <FileCheck className="h-8 w-8 mb-2 opacity-50" />
                    No anomalies detected. Clean audit!
                </div>
            ) : (
                alerts.map((alert: any, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-[#0B0D10] rounded-lg border border-white/5 hover:border-red-500/30 transition-colors">
                        <div className="h-2 w-2 mt-2 rounded-full bg-red-500 shrink-0"></div>
                        <div className="w-full">
                            <div className="flex justify-between">
                                <p className="text-sm text-white font-medium">{alert.vendor}</p>
                                <span className="text-xs font-bold text-red-400">{formatMoney(alert.amount)}</span>
                            </div>
                            <p className="text-xs text-slate-500 mt-1">{alert.audit_reason || "Unusual transaction pattern detected"}</p>
                        </div>
                    </div>
                ))
            )}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-[#1A1F26] border-white/10 p-6 h-64 flex flex-col">
           <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
             <FileCheck className="h-5 w-5 text-[#B6FF3B]" /> Quick Actions
           </h3>
           <div className="space-y-3 flex-1">
              <Link href="/dashboard/upload">
                  <div className="flex justify-between items-center p-3 bg-[#0B0D10] border border-white/5 rounded-lg hover:border-[#B6FF3B]/30 cursor-pointer transition-colors group">
                     <div className="flex items-center gap-3">
                        <div className="h-8 w-8 bg-blue-500/20 text-blue-400 rounded flex items-center justify-center text-xs font-bold group-hover:text-blue-300">PDF</div>
                        <div className="text-sm text-white">Upload New Statement</div>
                     </div>
                     <span className="text-xs text-slate-500">Start Analysis</span>
                  </div>
              </Link>
              
              <Link href="/dashboard/logs">
                  <div className="flex justify-between items-center p-3 bg-[#0B0D10] border border-white/5 rounded-lg hover:border-[#B6FF3B]/30 cursor-pointer transition-colors group">
                     <div className="flex items-center gap-3">
                        <div className="h-8 w-8 bg-purple-500/20 text-purple-400 rounded flex items-center justify-center text-xs font-bold group-hover:text-purple-300">LOG</div>
                        <div className="text-sm text-white">View Audit History</div>
                     </div>
                     <span className="text-xs text-slate-500">Review Past Reports</span>
                  </div>
              </Link>
           </div>
        </Card>
      </div>
    </div>
  );
}