
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const metrics = [
  { label: "Total Earnings", value: "$24,300", className: "text-pink-500" },
  { label: "Payouts Pending", value: "$2,150", className: "text-yellow-500" },
  { label: "Total Commission", value: "$5,540", className: "text-green-500" },
];

const FinancePage = () => (
  <div className="flex flex-col gap-8 animate-fade-in">
    <h2 className="text-2xl font-bold mb-2 text-pink-500">Financial Dashboard</h2>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl">
      {metrics.map(m => (
        <Card key={m.label} className="metric-card card-hover">
          <CardHeader>
            <CardTitle className="text-base text-muted-foreground">{m.label}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold animate-count-up ${m.className}`}>{m.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
    <div className="max-w-3xl mt-8">
      <h3 className="text-lg font-semibold mb-2">Earnings Over Time</h3>
      <div className="w-full h-48 flex items-center justify-center bg-muted rounded-md text-muted-foreground">
        {/* Sample chart placeholder */}
        <span>Chart coming soon...</span>
      </div>
    </div>
  </div>
);

export default FinancePage;
