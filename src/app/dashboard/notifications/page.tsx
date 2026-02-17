"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api"; // 🟢 Secure Client
import { Card } from "@/components/ui/card";
import { CheckCircle, Info, Loader2, ArrowRight } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AuditReportView } from "@/components/business/AuditReportView"; 

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // State for Inline View
  const [selectedLog, setSelectedLog] = useState<any | null>(null);
  const [viewLoadingId, setViewLoadingId] = useState<number | null>(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await api.get("/api/v1/dashboard/audit-logs");
        const completedLogs = res.data
          .filter((i: any) => i.status === 'completed')
          .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        
        setNotifs(completedLogs);
      } catch (error) {
        console.error("Failed to fetch notifications", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [selectedLog]); 

  const handleViewLog = async (auditId: number) => {
    try {
        setViewLoadingId(auditId);
        const res = await api.get(`/api/v1/dashboard/audit-logs/${auditId}`);
        setSelectedLog(res.data);
    } catch(e) {
        console.error("Error loading report details", e);
    } finally {
        setViewLoadingId(null);
    }
  };

  // 1. IF REPORT SELECTED -> SHOW REPORT VIEW
  if (selectedLog) {
    // We wrap this in a container too so it stays centered
    return (
      <div className="max-w-5xl mx-auto py-6">
        <AuditReportView data={selectedLog} onBack={() => setSelectedLog(null)} />
      </div>
    );
  }

  // 2. IF LOADING LIST -> SHOW SPINNER
  if (loading) {
    return (
      <div className="h-[50vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#B6FF3B]" />
      </div>
    );
  }

  // 3. SHOW NOTIFICATIONS LIST
  return (
    // 🟢 ADDED: mx-auto, py-8, and max-w-5xl to center the page content
    <div className="space-y-6 max-w-5xl  py-8 animate-in fade-in duration-500">
      
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Notifications</h1>
          <p className="text-slate-400 text-sm mt-1">Recent system activity and completed audits.</p>
        </div>
        <div className="bg-[#B6FF3B]/10 text-[#B6FF3B] px-3 py-1 rounded-full text-xs font-bold">
          {notifs.length} New
        </div>
      </div>
      
      <div className="space-y-4">
        {notifs.length === 0 ? (
            // 🟢 CENTERED EMPTY STATE
            <div className="flex flex-col items-center justify-center h-64 border border-dashed border-white/10 rounded-xl bg-[#1A1F26]/50">
              <Info className="h-10 w-10 text-slate-500 mb-3" />
              <h3 className="text-white font-medium">No new notifications</h3>
              <p className="text-slate-500 text-sm">You're all caught up! Upload a file to generate reports.</p>
            </div>
        ) : (
            notifs.map((n) => (
              <Card key={n.id} className="bg-[#1A1F26] border-white/10 p-4 flex flex-col md:flex-row gap-4 items-center hover:border-white/20 transition-colors shadow-sm">
                
                {/* Icon Circle */}
                <div className="p-3 bg-green-500/10 rounded-full shrink-0">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                </div>
                
                {/* Text Content */}
                <div className="flex-1 text-center md:text-left">
                  <p className="text-white text-base">
                    Audit for <span className="font-bold text-[#B6FF3B]">{n.filename}</span> completed.
                  </p>
                  <p className="text-xs text-slate-500 mt-1 flex gap-2 justify-center md:justify-start items-center">
                    <span>{new Date(n.created_at).toLocaleString()}</span>
                    <span className="text-slate-700">•</span>
                    <span className={`font-medium ${n.risk_score > 50 ? "text-red-400" : "text-green-400"}`}>
                        Risk Score: {n.risk_score}/100
                    </span>
                  </p>
                </div>

                {/* Action Button */}
                <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleViewLog(n.id)}
                    disabled={viewLoadingId === n.id}
                    className="border-white/10 text-green hover:bg-white/5 shrink-0 w-full md:w-auto"
                >
                    {viewLoadingId === n.id ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                        <>View Report <ArrowRight className="ml-2 h-4 w-4" /></>
                    )}
                </Button>
              </Card>
            ))
        )}
      </div>
    </div>
  );
}