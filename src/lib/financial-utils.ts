// frontend/lib/financial-utils.ts

export interface FinancialMetrics {
    balance: number;
    monthlyBurn: number;
    runway: number | string;
    chartData: { name: string; value: number }[]; // Changed 'date' to 'name', 'balance' to 'value' for Recharts compatibility
    transactionCount: number;
    anomalyCount: number;
}

export const calculateMetrics = (transactions: any[]): FinancialMetrics => {
    const sanitizedTxns = Array.isArray(transactions) ? transactions : [];
    
    let balance = 0;
    let totalExpense = 0;
    let minDate = new Date();
    let maxDate = new Date(0);
    let anomalyCount = 0;

    const chartDataMap: Record<string, number> = {};
    let hasData = false;

    sanitizedTxns.forEach((t: any) => {
        hasData = true;
        const amount = parseFloat(t.amount);
        const date = new Date(t.date);
        
        balance += amount;
        
        if (amount < 0) totalExpense += Math.abs(amount);
        if (t.is_anomaly) anomalyCount++;

        if (date < minDate) minDate = date;
        if (date > maxDate) maxDate = date;

        const dateStr = date.toISOString().split('T')[0];
        chartDataMap[dateStr] = (chartDataMap[dateStr] || 0) + amount;
    });

    if (!hasData) {
        return { balance: 0, monthlyBurn: 0, runway: 0, chartData: [], transactionCount: 0, anomalyCount: 0 };
    }

    // Burn Rate (Monthly Average)
    const daysDiff = Math.max(1, (maxDate.getTime() - minDate.getTime()) / (1000 * 3600 * 24));
    const months = Math.max(daysDiff / 30, 1);
    const monthlyBurn = totalExpense / months;
    
    // Runway
    const runwayNum = monthlyBurn > 0 ? Math.floor(Math.abs(balance) / monthlyBurn * 30) : 999;
    const runway = runwayNum > 900 ? "900+" : runwayNum;

    // Chart Data (Running Total)
    let runningBalance = 0;
    const chartData = Object.keys(chartDataMap).sort().map(date => {
        runningBalance += chartDataMap[date];
        return { name: date, value: runningBalance }; // Matching Recharts keys
    });

    return { 
        balance, 
        monthlyBurn, 
        runway, 
        chartData,
        transactionCount: sanitizedTxns.length,
        anomalyCount
    };
};