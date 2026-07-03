import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useListAcademySessions, getListAcademySessionsQueryKey } from "@workspace/api-client-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface SessionForm { title: string; date: string; time: string; location: string; description: string; capacity: number; }
const empty: SessionForm = { title: "", date: "", time: "", location: "", description: "", capacity: 15 };

export default function AdminSessions() {
  const qc = useQueryClient();
  const { data: sessions = [], isLoading } = useListAcademySessions();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<SessionForm>(empty);

  const invalidate = () => qc.invalidateQueries({ queryKey: getListAcademySessionsQueryKey() });

  const openAdd = () => { setEditingId(null); setForm(empty); setIsDialogOpen(true); };
  const openEdit = (s: typeof sessions[0]) => {
    setEditingId(s.id);
    setForm({ title: s.title, date: s.date, time: s.time, location: s.location, description: s.description, capacity: s.capacity });
    setIsDialogOpen(true);
  };
  const handleDelete = async (id: number) => {
    if (!confirm("Delete this session?")) return;
    await fetch(`/api/academy-sessions/${id}`, { method: "DELETE", credentials: "include" });
    invalidate();
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true);
    if (editingId) await fetch(`/api/academy-sessions/${editingId}`, { method: "PATCH", credentials: "include", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    else await fetch("/api/academy-sessions", { method: "POST", credentials: "include", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setSaving(false); setIsDialogOpen(false); invalidate();
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-serif text-foreground mb-2">Sessions</h1>
          <p className="text-muted-foreground">Schedule and manage academy training sessions.</p>
        </div>
        <Button onClick={openAdd} className="bg-primary text-primary-foreground hover:bg-[#C9A860] rounded-sm">Create Session</Button>
      </div>
      <div className="bg-card border border-line overflow-hidden rounded-sm">
        <Table>
          <TableHeader className="bg-muted">
            <TableRow className="border-line">
              <TableHead className="font-mono text-[11px] uppercase tracking-wider font-normal opacity-70 w-[35%]">Title</TableHead>
              <TableHead className="font-mono text-[11px] uppercase tracking-wider font-normal opacity-70">Date &amp; Time</TableHead>
              <TableHead className="font-mono text-[11px] uppercase tracking-wider font-normal opacity-70">Location</TableHead>
              <TableHead className="font-mono text-[11px] uppercase tracking-wider font-normal opacity-70 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-line">
            {isLoading && <TableRow><TableCell colSpan={4} className="text-center py-8 opacity-60">Loading…</TableCell></TableRow>}
            {sessions.map(session => (
              <TableRow key={session.id} className="border-line hover:bg-muted/50">
                <TableCell className="font-medium">{session.title}</TableCell>
                <TableCell>
                  <div>{new Date(session.date).toLocaleDateString()}</div>
                  <div className="text-xs font-mono opacity-70 mt-1">{session.time}</div>
                </TableCell>
                <TableCell className="opacity-80">{session.location}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="outline" size="sm" onClick={() => openEdit(session)} className="rounded-sm border-line hover:text-primary hover:bg-transparent">Edit</Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(session.id)} className="rounded-sm border-line text-destructive hover:bg-destructive/10">Delete</Button>
                </TableCell>
              </TableRow>
            ))}
            {!isLoading && sessions.length === 0 && <TableRow><TableCell colSpan={4} className="text-center py-8 opacity-60">No sessions yet.</TableCell></TableRow>}
          </TableBody>
        </Table>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-card border-line rounded-sm">
          <DialogHeader><DialogTitle className="font-serif text-2xl">{editingId ? "Edit Session" : "Create Session"}</DialogTitle></DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-2"><Label>Title</Label><Input required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="bg-muted rounded-sm" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Date</Label><Input type="date" required value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="bg-muted rounded-sm" /></div>
              <div className="space-y-2"><Label>Time</Label><Input required placeholder="e.g. 09:00 AM - 12:00 PM" value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} className="bg-muted rounded-sm" /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Location</Label><Input required value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} className="bg-muted rounded-sm" /></div>
              <div className="space-y-2"><Label>Capacity</Label><Input type="number" required min={1} value={form.capacity} onChange={e => setForm({ ...form, capacity: parseInt(e.target.value) })} className="bg-muted rounded-sm" /></div>
            </div>
            <div className="space-y-2"><Label>Description</Label><Textarea required value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="bg-muted rounded-sm resize-none" rows={3} /></div>
            <div className="flex justify-end pt-4">
              <Button type="submit" disabled={saving} className="bg-primary text-primary-foreground hover:bg-[#C9A860] rounded-sm">{saving ? "Saving…" : editingId ? "Save Changes" : "Create Session"}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
