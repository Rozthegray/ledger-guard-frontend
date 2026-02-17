"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DEFAULT_DATA = [
  { date: "Jan", balance: 5000 },
  { date: "Feb", balance: 4200 },
  { date: "Mar", balance: 3100 },
  { date: "Apr", balance: 1800 },
  { date: "May", balance: 500 },
  { date: "Jun", balance: -800 },
];

export function ForecastChart({ data = DEFAULT_DATA }: { data?: any[] }) {
  return (
    <Card className="bg-[#1A1F26] border-white/10 shadow-none">
      <CardHeader>
        <CardTitle className="text-white">Cash Flow Forecast (Runway)</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-white/5" />
              <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis 
                stroke="#94a3b8" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
                tickFormatter={(value) => `$${value}`} 
              />
              <Tooltip 
                contentStyle={{ backgroundColor: "#0B0D10", color: "#fff", border: "1px solid #334155" }}
                itemStyle={{ color: "#B6FF3B" }}
              />
              {/* CHANGED STROKE FROM BLUE TO NEON LIME */}
              <Line 
                type="monotone" 
                dataKey="balance" 
                stroke="#B6FF3B" 
                strokeWidth={2} 
                activeDot={{ r: 6, fill: "#B6FF3B" }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}