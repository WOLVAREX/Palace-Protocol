import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useListEnrollments, getListEnrollmentsQueryKey } from "@workspace/api-client-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function AdminEnrollments() {
  const qc = useQueryClient();
  const { data: enrollments = [], isLoading } = useListEnrollments();
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");

  const invalidate = () => qc.invalidateQueries({ queryKey: getListEnrollmentsQueryKey() });

  const updateStatus = async (id: number, status: string) => {
    await fetch(`/api/enrollments/${id}`, { method: "PATCH", credentials: "include", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    invalidate();
  };

  const filtered = enrollments
    .filter(e => filter === "all" || e.status === filter)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif text-foreground mb-2">Enrollment Requests</h1>
        <p className="text-muted-foreground">Review and manage applications to the academy.</p>
      </div>
      <div className="flex gap-2 border-b border-line pb-1">
        {(["all", "pending", "approved", "rejected"] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 font-mono text-[11px] uppercase tracking-wider transition-colors border-b-2 ${filter === f ? "border-primary text-primary" : "border-transparent opacity-60 hover:opacity-100"}`}>{f}</button>
        ))}
      </div>
      <div className="bg-card border border-line overflow-hidden rounded-sm">
        <Table>
          <TableHeader className="bg-muted">
            <TableRow className="border-line">
              <TableHead className="font-mono text-[11px] uppercase tracking-wider font-normal opacity-70 w-[20%]">Applicant</TableHead>
              <TableHead className="font-mono text-[11px] uppercase tracking-wider font-normal opacity-70 w-[40%]">Message</TableHead>
              <TableHead className="font-mono text-[11px] uppercase tracking-wider font-normal opacity-70">Status</TableHead>
              <TableHead className="font-mono text-[11px] uppercase tracking-wider font-normal opacity-70 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-line">
            {isLoading && <TableRow><TableCell colSpan={4} className="text-center py-8 opacity-60">Loading…</TableCell></TableRow>}
            {filtered.map(req => (
              <TableRow key={req.id} className="border-line hover:bg-muted/50">
                <TableCell>
                  <div className="font-medium">{req.name}</div>
                  <div className="text-xs opacity-70 mt-1">{req.phone}</div>
                  <div className="text-xs font-mono opacity-50 mt-1">{new Date(req.createdAt).toLocaleDateString()}</div>
                </TableCell>
                <TableCell className="opacity-80 whitespace-pre-wrap text-sm">{req.message}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2 py-1 rounded-sm text-xs font-medium uppercase tracking-wider font-mono ${req.status === "pending" ? "bg-[#A67C3D]/20 text-[#A67C3D]" : req.status === "approved" ? "bg-green-100 text-green-800" : "bg-destructive/20 text-destructive"}`}>{req.status}</span>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  {req.status === "pending" && (
                    <>
                      <Button variant="outline" size="sm" onClick={() => updateStatus(req.id, "approved")} className="rounded-sm border-green-200 text-green-700 hover:bg-green-50">Approve</Button>
                      <Button variant="outline" size="sm" onClick={() => updateStatus(req.id, "rejected")} className="rounded-sm border-red-200 text-destructive hover:bg-red-50">Reject</Button>
                    </>
                  )}
                  {req.status !== "pending" && (
                    <Button variant="ghost" size="sm" onClick={() => updateStatus(req.id, "pending")} className="rounded-sm opacity-50 hover:opacity-100">Reset</Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {!isLoading && filtered.length === 0 && <TableRow><TableCell colSpan={4} className="text-center py-8 opacity-60">No {filter !== "all" ? filter : ""} requests found.</TableCell></TableRow>}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
