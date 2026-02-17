"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, AlertTriangle, CheckCircle } from "lucide-react";
import { TransactionsTable } from "@/components/business/TransactionsTable"; 

export default function AuditDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [audit, setAudit] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    api.get(`/dashboard/audit-logs/${id}`)
       .then(res => setAudit(res.data))
       .catch(console.error)
       .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="text-white p-10">Loading report...</div>;
  if (!audit) return <div className="text-white p-10">Audit not found.</div>;

  // findings is stored as JSON in DB, usually Axios parses it automatically
  // but if it comes as a string, parse it.
  const findings = typeof audit.findings === 'string' ? JSON.parse(audit.findings) : audit.findings || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5 text-slate-400" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-white">{audit.filename}</h1>
            <p className="text-slate-400 text-sm">
              Analyzed on {new Date(audit.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Badge className={audit.status === 'completed' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}>
            {audit.status.toUpperCase()}
          </Badge>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-[#1A1F26] border-white/10">
          <CardHeader className="pb-2"><CardTitle className="text-sm text-slate-400">Total Transactions</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-white">{findings.length}</div></CardContent>
        </Card>
        
        <Card className="bg-[#1A1F26] border-white/10">
          <CardHeader className="pb-2"><CardTitle className="text-sm text-slate-400">Risk Score</CardTitle></CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${audit.risk_score > 50 ? 'text-red-400' : 'text-green-400'}`}>
              {audit.risk_score || 0}/100
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1A1F26] border-white/10">
          <CardHeader className="pb-2"><CardTitle className="text-sm text-slate-400">Anomalies Found</CardTitle></CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-400">
              {findings.filter((f: any) => f.is_anomaly).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reuse Transactions Table */}
      <div className="bg-[#1A1F26] border border-white/10 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">Transaction Analysis</h3>
        <TransactionsTable transactions={findings} />
      </div>
    </div>
  );
}