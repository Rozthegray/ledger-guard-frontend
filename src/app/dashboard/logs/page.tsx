"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, FileText, CheckCircle2, XCircle, Loader2, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { AuditReportView } from "@/components/business/AuditReportView"; 

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [selectedLog, setSelectedLog] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchLogs = async () => {
        try {
            const res = await api.get("/api/v1/dashboard/audit-logs");
            setLogs(res.data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };
    fetchLogs();
  }, [selectedLog]); // Re-fetch when closing report (in case status changed)

  // 🟢 Handle "View" Click
  const handleViewLog = async (auditId: number) => {
    try {
        setLoading(true);
        const res = await api.get(`/api/v1/dashboard/audit-logs/${auditId}`);
        setSelectedLog(res.data);
    } catch(e) {
        console.error("Error loading log details", e);
    } finally {
        setLoading(false);
    }
  };

  // Filter logs
  const filteredLogs = logs.filter(log => 
    (log.filename || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 🟢 SWITCH VIEW: If log selected, show report. Else show list.
  if (selectedLog) {
    return <AuditReportView data={selectedLog} onBack={() => setSelectedLog(null)} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
            <h1 className="text-3xl font-bold text-white mb-2">Audit Logs & History</h1>
            <p className="text-slate-400">Track every analysis and system event.</p>
        </div>
        <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
            <Input 
                placeholder="Search logs..." 
                className="bg-[#1A1F26] border-white/10 pl-10 text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-[#1A1F26] overflow-hidden">
        <Table>
          <TableHeader className="bg-[#0B0D10]">
            <TableRow className="border-white/5">
              <TableHead className="text-slate-400">Filename</TableHead>
              <TableHead className="text-slate-400">Date</TableHead>
              <TableHead className="text-slate-400">Status</TableHead>
              <TableHead className="text-slate-400">Risk Score</TableHead>
              <TableHead className="text-right text-slate-400">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
                <TableRow>
                    <TableCell colSpan={5} className="text-center py-10 text-white">
                        <div className="flex items-center justify-center gap-2">
                            <Loader2 className="animate-spin h-4 w-4" /> Loading...
                        </div>
                    </TableCell>
                </TableRow>
            ) : filteredLogs.length === 0 ? (
                <TableRow>
                    <TableCell colSpan={5} className="text-center py-10 text-slate-500">No logs found.</TableCell>
                </TableRow>
            ) : (
                filteredLogs.map((log) => (
                <TableRow key={log.id} className="border-white/5 hover:bg-white/5 transition-colors">
                    <TableCell className="font-medium text-white flex items-center gap-2">
                        <FileText className="h-4 w-4 text-blue-400" />
                        {log.filename}
                    </TableCell>
                    <TableCell className="text-slate-400">
                        {new Date(log.created_at).toLocaleDateString()} <span className="text-xs text-slate-600 ml-1">{new Date(log.created_at).toLocaleTimeString()}</span>
                    </TableCell>
                    <TableCell>
                        <Badge variant="outline" className={`border-0 ${
                            log.status === 'completed' ? 'bg-green-500/10 text-green-400' : 
                            log.status === 'failed' ? 'bg-red-500/10 text-red-400' : 
                            'bg-yellow-500/10 text-yellow-400'
                        }`}>
                            {log.status === 'completed' && <CheckCircle2 className="h-3 w-3 mr-1"/>}
                            {log.status === 'failed' && <XCircle className="h-3 w-3 mr-1"/>}
                            {log.status?.toUpperCase()}
                        </Badge>
                    </TableCell>
                    <TableCell>
                        {log.status === 'completed' && (
                            <span className={`px-2 py-1 rounded text-xs font-bold ${log.risk_score > 50 ? "bg-red-500/20 text-red-400" : "bg-[#B6FF3B]/20 text-[#B6FF3B]"}`}>
                                {log.risk_score || 0}/100
                            </span>
                        )}
                    </TableCell>
                    <TableCell className="text-right">
                    {log.status === 'completed' && (
                        <Button variant="ghost" size="sm" onClick={() => handleViewLog(log.id)} className="text-[#B6FF3B] hover:text-[#a2ff00] hover:bg-[#B6FF3B]/10">
                            <Eye className="h-4 w-4 mr-2" /> View Report
                        </Button>
                    )}
                    </TableCell>
                </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}