"use client";

import { useDropzone } from "react-dropzone";
import { useIngestAgent } from "@/lib/hooks";
import { Card, CardContent } from "@/components/ui/card";
import { UploadCloud, CheckCircle2, BrainCircuit, XCircle, Hourglass } from "lucide-react";
import { useCallback, useState, useEffect, useRef } from "react";
import { Progress } from "@/components/ui/progress";

interface UploadZoneProps {
  onAnalysisComplete?: (data: any) => void; 
}

export function UploadZone({ onAnalysisComplete }: UploadZoneProps) {
  const { mutate, isPending, data, isError, error } = useIngestAgent();
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  
  // @ts-ignore
  const isRateLimit = error?.response?.status === 429;
  // @ts-ignore
  const rateLimitMsg = error?.response?.data?.detail || "AI Capacity Reached";

  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPending) {
      if (!startTimeRef.current) {
        startTimeRef.current = Date.now();
        setProgress(0);
        setLogs(["Initializing secure environment..."]);
      }
      interval = setInterval(() => {
        setProgress((prev) => {
          const newLog = generateLog(prev);
          if (newLog) setLogs(curr => [newLog, ...curr].slice(0, 10)); // Keep last 10 logs
          if (prev < 95) return prev + 0.5; 
          return prev;
        });
      }, 500); 
    } else if (data) {
      setProgress(100);
      setLogs(prev => ["✅ Analysis Complete.", ...prev]);
      if (onAnalysisComplete) onAnalysisComplete(data);
    } else if (isError) {
      setProgress(0);
    }
    return () => clearInterval(interval);
  }, [isPending, data, isError, onAnalysisComplete]);

  const generateLog = (prog: number) => {
    if (prog > 10 && prog < 12) return "Encrypting data packet (AES-256)...";
    if (prog > 30 && prog < 32) return "OCR Engine: Extracting text layers...";
    if (prog > 60 && prog < 62) return "Llama-3: Detecting anomalies...";
    return null;
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // 🟢 FIX: Optional chaining to prevent crash if array is undefined
    if (acceptedFiles?.length > 0) {
        mutate(acceptedFiles[0]);
    }
  }, [mutate]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop, 
    accept: { 'application/pdf': ['.pdf'], 'image/*': ['.png', '.jpeg'] } 
  });

  return (
    <div className="space-y-6">
      {/* 1. DROP ZONE */}
      {!isPending && !data && (
        <Card 
          {...getRootProps()} 
          className={`border-2 border-dashed cursor-pointer transition-all duration-300 h-64 flex flex-col items-center justify-center bg-[#1A1F26]
            ${isDragActive ? "border-[#B6FF3B] bg-[#B6FF3B]/5" : "border-white/10 hover:border-[#B6FF3B]/50"}
          `}
        >
          <input {...getInputProps()} />
          <div className="p-4 bg-[#0B0D10] rounded-full mb-4 border border-white/5">
            <UploadCloud className="h-10 w-10 text-[#B6FF3B]" />
          </div>
          <p className="text-lg font-bold text-white">Drag & Drop Bank Statement</p>
          <p className="text-sm text-slate-400">Supports PDF & PNG (Max 10MB)</p>
        </Card>
      )}

      {/* 2. PROCESSING / ERROR STATE */}
      {(isPending || isError) && (
        <Card className={`border-2 bg-[#1A1F26] overflow-hidden relative min-h-[300px] flex flex-col items-center justify-center
          ${isRateLimit ? "border-orange-500" : isError ? "border-red-500" : "border-[#B6FF3B]/30"}
        `}>
          <CardContent className="py-10 flex flex-col items-center relative z-10 w-full max-w-lg">
            
            {/* ICON */}
            {isRateLimit ? (
               <Hourglass className="h-12 w-12 text-orange-500 mb-6 animate-pulse" />
            ) : isError ? (
               <XCircle className="h-12 w-12 text-red-500 mb-6" />
            ) : (
               <BrainCircuit className="h-12 w-12 text-[#B6FF3B] animate-pulse mb-6" />
            )}
            
            {/* PROGRESS BAR */}
            <div className="w-full space-y-2 mb-8">
              <div className="flex justify-between text-xs font-mono uppercase tracking-widest text-slate-400">
                <span>{isRateLimit ? "COOLDOWN" : isError ? "FAILED" : "PROCESSING"}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className={`h-1 bg-[#0B0D10]`} />
            </div>

            {/* LOGS */}
            {!isRateLimit && (
                <div className="w-full h-32 overflow-y-auto bg-[#0B0D10] rounded-lg p-4 font-mono text-xs border border-white/5 space-y-1">
                {logs.map((log, i) => (
                    <div key={i} className={`transition-all ${isError ? "text-red-400" : "text-[#B6FF3B]"}`} style={{ opacity: 1 - (i * 0.1) }}>
                    <span className="opacity-50 mr-2">&gt;</span>{log}
                    </div>
                ))}
                </div>
            )}
            
            {/* RETRY BUTTON */}
            {isError && (
              <button 
                onClick={() => window.location.reload()}
                className="mt-6 px-6 py-2 bg-white/5 border border-white/10 rounded-full text-white text-sm hover:bg-white/10 transition-colors"
              >
                Try Again
              </button>
            )}
          </CardContent>
        </Card>
      )}

      {/* 3. SUCCESS STATE */}
      {data && (
        <div className="p-6 bg-[#B6FF3B]/10 border border-[#B6FF3B]/20 rounded-xl flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-[#B6FF3B] p-2 rounded-full"><CheckCircle2 className="h-6 w-6 text-black" /></div>
            <div>
              <h3 className="font-bold text-white text-lg">Analysis Complete</h3>
              <p className="text-slate-400">Successfully categorized <strong className="text-[#B6FF3B]">{data.data?.length || 0} transactions</strong>.</p>
            </div>
          </div>
          <button onClick={() => window.location.reload()} className="px-6 py-2 bg-[#B6FF3B] text-black font-bold rounded-lg hover:bg-[#a2ff00]">
            Scan Another
          </button>
        </div>
      )}
    </div>
  );
}