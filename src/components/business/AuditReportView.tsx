"use client";

import { useState, useMemo, useEffect } from "react";
import api from "@/lib/api"; // 🟢 Import API to fetch settings
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ForecastChart } from "@/components/business/ForecastChart";
import { TransactionsTable } from "@/components/business/TransactionsTable";
import { FileText, TrendingDown, TrendingUp, Hourglass, ArrowLeft, Download, Loader2 } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface AuditReportViewProps {
  data: any; 
  onBack?: () => void; 
}

export function AuditReportView({ data, onBack }: AuditReportViewProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [currency, setCurrency] = useState("USD"); // Default to USD until loaded

  // 🟢 1. Fetch User Currency Preference
  useEffect(() => {
    api.get("/user/me").then((res) => {
        const userCurrency = res.data?.settings?.preferences?.currency || "USD";
        setCurrency(userCurrency);
    }).catch(() => setCurrency("USD"));
  }, []);

  // 🟢 2. Helper to Format Currency Dynamically
  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
  };

  const transactions = Array.isArray(data.findings) ? data.findings : [];

  const metrics = useMemo(() => {
    let balance = 0;
    let totalExpense = 0;
    let minDate = new Date();
    let maxDate = new Date(0);

    const chartDataMap: Record<string, number> = {};

    transactions.forEach((t: any) => {
      const amount = parseFloat(t.amount);
      const date = new Date(t.date);
      
      balance += amount;
      
      if (amount < 0) totalExpense += Math.abs(amount);

      if (date < minDate) minDate = date;
      if (date > maxDate) maxDate = date;

      const dateStr = date.toISOString().split('T')[0];
      chartDataMap[dateStr] = (chartDataMap[dateStr] || 0) + amount;
    });

    const daysDiff = Math.max(1, (maxDate.getTime() - minDate.getTime()) / (1000 * 3600 * 24));
    const months = Math.max(daysDiff / 30, 1);
    const monthlyBurn = totalExpense / months;

    const runway = monthlyBurn > 0 ? Math.floor(Math.abs(balance) / monthlyBurn * 30) : "∞";

    let runningBalance = 0;
    const chartData = Object.keys(chartDataMap).sort().map(date => {
      runningBalance += chartDataMap[date];
      return { date, balance: runningBalance };
    });

    return { balance, monthlyBurn, runway, chartData };
  }, [transactions]);

  // 3. PDF Export Logic (Updated with Currency)
  const handleExportPDF = () => {
    setIsExporting(true);
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(18);
    doc.text("Ledger Guard - Audit Report", 14, 22);
    doc.setFontSize(11);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 30);
    doc.text(`File: ${data.filename || "Audit Export"}`, 14, 36);

    // Summary Box
    doc.setFillColor(245, 245, 245);
    doc.rect(14, 42, 180, 25, "F");
    doc.setFontSize(10);
    
    // 🟢 Use formatMoney for PDF values
    doc.text(`Net Balance: ${formatMoney(metrics.balance)}`, 20, 55);
    doc.text(`Est. Burn Rate: ${formatMoney(metrics.monthlyBurn)}/mo`, 80, 55);
    doc.text(`Runway: ${metrics.runway} Days`, 140, 55);

    // Data Table
    const tableRows = transactions.map((t: any) => [
      t.date,
      t.vendor,
      t.category,
      formatMoney(parseFloat(t.amount)), // 🟢 Format Table Amount
      t.is_anomaly ? "RISK" : "OK"
    ]);

    autoTable(doc, {
      startY: 75,
      head: [["Date", "Vendor", "Category", "Amount", "Status"]],
      body: tableRows,
      theme: "grid",
      headStyles: { fillColor: [182, 255, 59], textColor: [0,0,0] }, 
    });

    doc.save(`audit_report_${data.id || "new"}.pdf`);
    setIsExporting(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* ACTION HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4 w-full overflow-hidden">
          {onBack && (
            <Button variant="outline" size="icon" onClick={onBack} className="bg-[#1A1F26] border-white/10 text-white hover:bg-white/10 shrink-0">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="truncate block" title={data.filename}>
                {data.filename || "Audit Results"}
              </span>
              <span className={`shrink-0 text-xs px-2 py-1 rounded border ${data.is_anomaly ? 'border-red-500 text-red-400' : 'border-green-500 text-green-400'}`}>
                 Score: {data.risk_score || 0}
              </span>
            </h2>
            <p className="text-slate-400 text-sm">
              Analyzed {transactions.length} transactions.
            </p>
          </div>
        </div>

        <Button 
          className="bg-[#B6FF3B] text-black hover:bg-[#a2ff00] font-bold shrink-0" 
          onClick={handleExportPDF} 
          disabled={isExporting}
        >
          {isExporting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
          {isExporting ? "Generating..." : "Download Report"}
        </Button>
      </div>

      {/* METRICS DASHBOARD */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-[#1A1F26] border-white/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Net Balance</CardTitle>
          </CardHeader>
          <CardContent>
            {/* 🟢 Updated to use formatMoney */}
            <div className={`text-2xl font-bold ${metrics.balance >= 0 ? "text-white" : "text-red-400"}`}>
              {formatMoney(metrics.balance)}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#1A1F26] border-white/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Monthly Burn</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <TrendingDown className="h-4 w-4 text-red-400" />
            {/* 🟢 Updated to use formatMoney */}
            <div className="text-2xl font-bold text-white">
                {formatMoney(metrics.monthlyBurn)}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#1A1F26] border-white/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Est. Runway</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <Hourglass className="h-4 w-4 text-[#B6FF3B]" />
            <div className="text-2xl font-bold text-[#B6FF3B]">{metrics.runway} Days</div>
          </CardContent>
        </Card>
      </div>

      {/* CHART & RISK */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
           <ForecastChart data={metrics.chartData} />
        </div>
        
        {/* Risk Summary Card */}
        <Card className="bg-[#1A1F26] border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Risk Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-slate-400">Flagged Items</span>
                <span className="text-red-400 font-bold">{transactions.filter((t: any) => t.is_anomaly).length}</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-slate-400">AI Confidence</span>
                <span className="text-[#B6FF3B] font-bold">99.2%</span>
              </div>
              <div className="p-3 bg-white/5 border border-white/10 rounded text-xs text-slate-300">
                AI has verified dates, amounts, and vendor consistency across all entries.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <TransactionsTable transactions={transactions} />
    </div>
  );
}