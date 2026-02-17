"use client";

import { useState } from "react";
import { UploadZone } from "@/components/business/UploadZone";
import { AuditReportView } from "@/components/business/AuditReportView";
import { Separator } from "@/components/ui/separator";
import api from "@/lib/api";
import { Loader2 } from "lucide-react";

export default function UploadPage() {
  const [reportData, setReportData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Called when UploadZone finishes the POST /ingest/universal request
  const handleUploadComplete = async (response: any) => {
    const auditId = response.audit_id;
    setIsLoading(true);

    // 🟢 POLL for completion (Because backend processes async in background)
    const checkStatus = setInterval(async () => {
      try {
        // Fetch specific audit log by ID
const res = await api.get(`/api/v1/dashboard/audit-logs/${auditId}`);        
        // If analysis is done, stop polling and show data
        if (res.data.status === 'completed' && res.data.findings) {
          clearInterval(checkStatus);
          setReportData(res.data);
          setIsLoading(false);
        } else if (res.data.status === 'failed') {
            clearInterval(checkStatus);
            alert("Audit failed. Check backend logs.");
            setIsLoading(false);
        }
      } catch (e) {
        console.error("Polling error", e);
      }
    }, 1000); // Check every 1 second
  };

  return (
    <div className="space-y-6">
      {!reportData ? (
        <>
          <div>
            <h3 className="text-lg font-medium text-white">AI Ingestion Engine</h3>
            <p className="text-sm text-slate-400">
              Upload Bank Statements. The AI will normalize, audit, and categorize automatically.
            </p>
          </div>
          <Separator className="bg-white/10" />
          
          {isLoading ? (
             <div className="h-96 flex flex-col items-center justify-center text-white space-y-6 border border-dashed border-white/10 rounded-xl bg-[#1A1F26]">
                <Loader2 className="h-12 w-12 text-[#B6FF3B] animate-spin" />
                <div className="text-center space-y-2">
                  <div className="text-xl font-bold text-white">Running Financial Audit...</div>
                  <p className="text-slate-400 text-sm">Extracting transactions, detecting fraud, and calculating runway.</p>
                </div>
             </div>
          ) : (
             <UploadZone onAnalysisComplete={handleUploadComplete} />
          )}
        </>
      ) : (
        // 🟢 DISPLAY THE REPORT VIEW WHEN DONE
        <AuditReportView 
          data={reportData} 
          onBack={() => { setReportData(null); setIsLoading(false); }} 
        />
      )}
    </div>
  );
}