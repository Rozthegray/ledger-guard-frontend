"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
// 🟢 1. Import Alert Components
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ArrowLeft, Download, AlertTriangle, CheckCircle, Loader2, AlertCircle } from "lucide-react";
import { TransactionsTable } from "@/components/business/TransactionsTable"; 

export default function AuditDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [audit, setAudit] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchAudit = async () => {
      try {
const res = await api.get(`/api/v1/dashboard/audit-logs/${id}`);
      } catch (err) {
        console.error(err);
        setError("This audit log does not exist or you do not have permission to view it.");
      } finally {
        setLoading(false);
      }
    };

    fetchAudit();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center text-white">
        <Loader2 className="mr-2 h-6 w-6 animate-spin text-[#B6FF3B]" /> Loading Report...
      </div>
    );
  }

  // 🟢 2. Use Alert for Errors
  if (error || !audit) {
    return (
      <div className="max-w-2xl mx-auto py-20">
        <Alert variant="destructive" className="bg-red-900/20 border-red-900/50 text-red-200">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Audit Not Found</AlertTitle>
          <AlertDescription>
            {error || "An unexpected error occurred."}
          </AlertDescription>
        </Alert>
        <div className="mt-4 flex justify-center">
            <Button variant="outline" onClick={() => router.back()}>Return to Dashboard</Button>
        </div>
      </div>
    );
  }

  // Parse findings
  const findings = typeof audit.findings === 'string' 
    ? JSON.parse(audit.findings) 
    : audit.findings || [];

  const anomalyCount = findings.filter((f: any) => f.is_anomaly).length;

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="text-slate-400 hover:text-white">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              {audit.filename}
            </h1>
            <p className="text-slate-400 text-sm">
              Analyzed on {new Date(audit.created_at).toLocaleString()}
            </p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Badge className={`px-3 py-1 text-sm ${
            audit.status === 'completed' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 
            'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
          }`}>
            {audit.status.toUpperCase()}
          </Badge>
          <Button variant="outline" className="border-white/10 hover:bg-white/5 text-slate-300">
            <Download className="mr-2 h-4 w-4" /> Export PDF
          </Button>
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-[#1A1F26] border-white/10">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-slate-400">Total Transactions</CardTitle></CardHeader>
          <CardContent><div className="text-3xl font-bold text-white">{findings.length}</div></CardContent>
        </Card>
        
        <Card className="bg-[#1A1F26] border-white/10">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-slate-400">Risk Score</CardTitle></CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold ${audit.risk_score > 50 ? 'text-red-400' : 'text-green-400'}`}>
              {audit.risk_score || 0}<span className="text-lg text-slate-500">/100</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1A1F26] border-white/10">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-slate-400">Anomalies</CardTitle></CardHeader>
          <CardContent className="flex items-center gap-2">
            <div className={`text-3xl font-bold ${anomalyCount > 0 ? 'text-yellow-400' : 'text-white'}`}>
              {anomalyCount}
            </div>
            {anomalyCount > 0 && <AlertTriangle className="h-5 w-5 text-yellow-400" />}
          </CardContent>
        </Card>
      </div>

      {/* DETAILED TABLE */}
      <div className="bg-[#1A1F26] border border-white/10 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">Transaction Analysis</h3>
        <div className="rounded-md border border-white/10 overflow-hidden">
           <TransactionsTable transactions={findings} />
        </div>
      </div>
    </div>
  );
}