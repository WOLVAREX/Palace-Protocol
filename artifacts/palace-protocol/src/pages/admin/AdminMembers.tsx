import { useQueryClient } from "@tanstack/react-query";
import { useListMembers, getListMembersQueryKey } from "@workspace/api-client-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function AdminMembers() {
  const qc = useQueryClient();
  const { data: members = [], isLoading } = useListMembers();

  const invalidate = () => qc.invalidateQueries({ queryKey: getListMembersQueryKey() });

  const toggleStatus = async (id: number, current: string) => {
    const status = current === "active" ? "inactive" : "active";
    await fetch(`/api/members/${id}`, { method: "PATCH", credentials: "include", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    invalidate();
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif text-foreground mb-2">Members Roster</h1>
        <p className="text-muted-foreground">Manage academy members and their status.</p>
      </div>
      <div className="bg-card border border-line overflow-hidden rounded-sm">
        <Table>
          <TableHeader className="bg-muted">
            <TableRow className="border-line">
              <TableHead className="font-mono text-[11px] uppercase tracking-wider font-normal opacity-70 w-[30%]">Member</TableHead>
              <TableHead className="font-mono text-[11px] uppercase tracking-wider font-normal opacity-70">Contact</TableHead>
              <TableHead className="font-mono text-[11px] uppercase tracking-wider font-normal opacity-70">Joined</TableHead>
              <TableHead className="font-mono text-[11px] uppercase tracking-wider font-normal opacity-70">Status</TableHead>
              <TableHead className="font-mono text-[11px] uppercase tracking-wider font-normal opacity-70 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-line">
            {isLoading && <TableRow><TableCell colSpan={5} className="text-center py-8 opacity-60">Loading…</TableCell></TableRow>}
            {members.map(member => (
              <TableRow key={member.id} className="border-line hover:bg-muted/50">
                <TableCell><div className="font-medium">{member.name}</div></TableCell>
                <TableCell>
                  <div className="text-sm">{member.email}</div>
                  <div className="text-xs font-mono opacity-70 mt-1">{member.phone}</div>
                </TableCell>
                <TableCell className="opacity-80 text-sm">{new Date(member.joinedAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2 py-1 rounded-sm text-xs font-medium uppercase tracking-wider font-mono ${member.status === "active" ? "bg-green-100 text-green-800" : "bg-muted opacity-60"}`}>{member.status}</span>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm" onClick={() => toggleStatus(member.id, member.status)} className="rounded-sm border-line hover:text-primary hover:bg-transparent">{member.status === "active" ? "Deactivate" : "Activate"}</Button>
                </TableCell>
              </TableRow>
            ))}
            {!isLoading && members.length === 0 && <TableRow><TableCell colSpan={5} className="text-center py-8 opacity-60">No members yet.</TableCell></TableRow>}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
