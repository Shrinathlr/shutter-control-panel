
import React from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const pendingKYC = [
  {
    id: "#KYC8901",
    name: "Emily Green",
    location: "London",
    docs: [
      { url: "/lovable-uploads/e8f7f798-454c-42b4-90b7-786473e9c28e.png", type: "image" },
    ],
    portfolio: [
      { url: "/lovable-uploads/e8f7f798-454c-42b4-90b7-786473e9c28e.png" },
    ],
    status: "Pending",
  },
  {
    id: "#KYC8902",
    name: "Omar Singh",
    location: "Toronto",
    docs: [
      { url: "/lovable-uploads/e8f7f798-454c-42b4-90b7-786473e9c28e.png", type: "image" },
    ],
    portfolio: [
      { url: "/lovable-uploads/e8f7f798-454c-42b4-90b7-786473e9c28e.png" },
    ],
    status: "Pending",
  },
];

const KYCPage = () => (
  <div className="flex flex-col gap-8 animate-fade-in">
    <h2 className="text-2xl font-bold mb-2 text-pink-500">KYC & Portfolio Review</h2>
    <div className="max-w-5xl space-y-6">
      <p>Review photographer KYC & portfolio submissions. Approve, reject, or request resubmission.</p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Documents</TableHead>
            <TableHead>Portfolio</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pendingKYC.map(({ id, name, location, docs, portfolio, status }, i) => (
            <TableRow key={id}>
              <TableCell>{name}</TableCell>
              <TableCell>{location}</TableCell>
              <TableCell>
                {docs.map((d, idx) => (
                  <img
                    key={idx}
                    src={d.url}
                    className="w-10 h-10 object-cover rounded border mb-1"
                    alt="KYC doc"
                  />
                ))}
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  {portfolio.map((p, idx) => (
                    <img key={idx} src={p.url} className="w-8 h-8 rounded" alt="Portfolio sample" />
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <span className="text-yellow-600 font-semibold">{status}</span>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-2">
                  <Button variant="default" size="sm">Approve</Button>
                  <Button variant="outline" size="sm">Request Re-upload</Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </div>
);

export default KYCPage;
