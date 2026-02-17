"use client";

import { useEffect, useState, useMemo } from "react";
import api from "@/lib/api";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  AlertTriangle, 
  CheckCircle2, 
  Search, 
  ArrowUpRight, 
  ArrowDownRight, 
  ArrowUpDown,
  Filter 
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function TransactionsTable({ transactions }: { transactions: any[] }) {
  const [currency, setCurrency] = useState("USD");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  // 1. Fetch Currency
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get("/user/me");
        setCurrency(res.data?.settings?.preferences?.currency || "USD");
      } catch (e) { console.error(e); }
    };
    fetchSettings();
  }, []);

  // 2. Filter & Sort
  const processedData = useMemo(() => {
    let data = [...transactions];

    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      data = data.filter((t) => 
          (t.vendor && t.vendor.toLowerCase().includes(lowerTerm)) ||
          (t.category && t.category.toLowerCase().includes(lowerTerm)) ||
          (t.description && t.description.toLowerCase().includes(lowerTerm)) ||
          (t.amount && t.amount.toString().includes(lowerTerm))
      );
    }

    if (sortConfig) {
      data.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return data;
  }, [transactions, searchTerm, sortConfig]);

  const requestSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
    }).format(Math.abs(amount));
  };

  // 🟢 CONFIG: Strict List of "Money In" Categories
  const INCOME_CATEGORIES = ["revenue", "deposits", "income", "interest", "refund", "dividends"];

  return (
    <div className="space-y-4">
      
      {/* TOOLBAR */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <Input 
                placeholder="Search vendor, category, amount..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 bg-[#1A1F26] border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-[#B6FF3B]"
            />
        </div>
        <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-slate-500" />
            <span className="text-xs text-slate-500 uppercase tracking-wider font-medium">
                {processedData.length} Results
            </span>
        </div>
      </div>

      {/* TABLE */}
      <div className="rounded-xl border border-white/10 bg-[#1A1F26] overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-[#0B0D10]">
            <TableRow className="border-white/5 hover:bg-transparent">
              <TableHead className="w-[140px]">
                <Button variant="ghost" onClick={() => requestSort('date')} className="hover:text-[#B6FF3B] px-0 font-bold text-slate-400">
                  Date <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead className="text-slate-400 font-bold">Vendor</TableHead>
              <TableHead className="text-slate-400 font-bold">Category</TableHead>
              <TableHead className="text-right">
                <Button variant="ghost" onClick={() => requestSort('amount')} className="hover:text-[#B6FF3B] px-0 font-bold text-slate-400">
                  Amount <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead className="text-slate-400 font-bold text-center">Risk Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {processedData.length > 0 ? (
                processedData.map((txn, i) => {
                    // 🟢 STRICT LOGIC: "Revenue" = Green, Everything Else = Red
                    const cat = (txn.category || "").toLowerCase();
                    const isRevenue = INCOME_CATEGORIES.includes(cat);
                    
                    // Force Expense if NOT in the safe list
                    const isExpense = !isRevenue;

                    const amountClass = isExpense ? "text-red-400" : "text-emerald-400";
                    
                    return (
                        <TableRow 
                        key={i} 
                        className={`border-white/5 transition-colors hover:bg-white/5 
                            ${txn.is_anomaly ? "bg-red-500/5 border-l-2 border-l-red-500" : ""}
                        `}
                        >
                        <TableCell className="font-mono text-sm text-slate-300">
                            {new Date(txn.date).toLocaleDateString()}
                        </TableCell>
                        
                        <TableCell className="font-medium text-white">
                            <div className="flex flex-col">
                                <span>{txn.vendor || "Unknown Vendor"}</span>
                                <span className="text-[10px] text-slate-500 font-normal md:hidden">{txn.description}</span>
                            </div>
                        </TableCell>
                        
                        <TableCell>
                            <Badge variant="outline" className="bg-[#0B0D10] text-slate-300 border-white/10 font-normal hover:bg-white/5">
                            {txn.category || "Uncategorized"}
                            </Badge>
                        </TableCell>
                        
                        {/* 🟢 COLORED AMOUNT DISPLAY */}
                        <TableCell className={`font-medium text-right ${amountClass}`}>
                            <div className="flex items-center justify-end gap-1">
                                {isExpense ? (
                                    <ArrowDownRight className="h-3 w-3 opacity-50" />
                                ) : (
                                    <ArrowUpRight className="h-3 w-3 opacity-50" />
                                )}
                                <span>
                                    {isExpense ? "-" : "+"} {formatMoney(txn.amount)}
                                </span>
                            </div>
                        </TableCell>
                        
                        <TableCell className="text-center">
                            {txn.is_anomaly ? (
                            <div className="inline-flex items-center px-2 py-1 rounded bg-red-500/10 text-red-400 font-bold text-[10px] border border-red-500/20 animate-pulse">
                                <AlertTriangle className="mr-1 h-3 w-3" /> RISK
                            </div>
                            ) : (
                            <div className="inline-flex items-center text-[#B6FF3B] text-xs opacity-50">
                                <CheckCircle2 className="mr-1 h-3 w-3" /> Verified
                            </div>
                            )}
                        </TableCell>
                        </TableRow>
                    );
                })
            ) : (
                <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center text-slate-500">
                        No transactions match your filter.
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}