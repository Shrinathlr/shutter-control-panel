
import React, { useState } from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

// Only India
const baseCommissionData = [
  { category: "Wedding", country: "IN", value: 20 },
  { category: "Portrait", country: "IN", value: 15 },
  { category: "Event", country: "IN", value: 18 },
];

const CommissionsPage = () => {
  const [commissions, setCommissions] = useState(baseCommissionData);

  const updateCommission = (idx: number, val: number) => {
    const updated = commissions.map((c, i) =>
      i === idx ? { ...c, value: val } : c
    );
    setCommissions(updated);
  };

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      <h2 className="text-2xl font-bold mb-2 text-pink-500">Commission Settings</h2>
      <div className="max-w-2xl space-y-6">
        <p>Set platform commission per category for India only. Changes auto-save (demo only).</p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Commission (%)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {commissions.map((row, idx) => (
              <TableRow key={row.category + row.country}>
                <TableCell>{row.category}</TableCell>
                <TableCell>{row.country}</TableCell>
                <TableCell>
                  <input
                    type="range"
                    min={5}
                    max={30}
                    value={row.value}
                    onChange={e => updateCommission(idx, Number(e.target.value))}
                    className="w-32 accent-pink-500"
                  />
                  <span className="ml-3 font-semibold text-pink-500">{row.value}%</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button variant="default" className="mt-4 glow-on-hover" disabled>
          Save changes
        </Button>
      </div>
    </div>
  );
};

export default CommissionsPage;
