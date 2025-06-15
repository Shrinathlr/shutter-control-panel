import React from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const disputes: any[] = []; // No disputes

const DisputesPage = () => (
  <div className="flex flex-col gap-8 animate-fade-in">
    <h2 className="text-2xl font-bold mb-2 text-pink-500">Dispute Center</h2>
    <div className="max-w-4xl space-y-6">
      <p>
        Manage and resolve platform disputes. Review evidence and handle ongoing cases.
      </p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Photographer</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Evidence</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {disputes.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7}>
                <div className="py-12 flex flex-col items-center">
                  <img
                    src="/placeholder.svg"
                    className="w-24 h-24 mb-4 opacity-60"
                    alt="No disputes"
                  />
                  <p className="text-center text-gray-400 text-sm">
                    No disputes found.
                  </p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            disputes.map((d, i) => (
              <TableRow key={d.id} className={i === 0 ? "animate-pulse" : ""}>
                <TableCell>{d.created}</TableCell>
                <TableCell>{d.user}</TableCell>
                <TableCell>{d.photographer}</TableCell>
                <TableCell className="max-w-[140px]">{d.reason}</TableCell>
                <TableCell>
                  <span
                    className={
                      d.status === "Pending"
                        ? "text-yellow-600 font-semibold"
                        : "text-green-500 font-semibold"
                    }
                  >
                    {d.status}
                  </span>
                </TableCell>
                <TableCell>
                  {/* Fix type error by checking for url/text */}
                  {d.evidence[0]?.type === "photo" && "url" in d.evidence[0] ? (
                    <img
                      src={d.evidence[0].url}
                      alt="evidence"
                      className="w-12 h-12 rounded-md object-cover border"
                    />
                  ) : d.evidence[0]?.type === "message" && "text" in d.evidence[0] ? (
                    <span className="text-xs text-muted-foreground">{d.evidence[0].text}</span>
                  ) : (
                    <span className="text-xs text-muted-foreground">No evidence</span>
                  )}
                </TableCell>
                <TableCell>
                  {d.status === "Pending" ? (
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Resolve</Button>
                      <Button variant="destructive" size="sm">Ban</Button>
                    </div>
                  ) : (
                    <span className="text-muted-foreground text-xs">No actions</span>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  </div>
);

export default DisputesPage;
