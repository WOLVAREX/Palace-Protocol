import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useListBooks, getListBooksQueryKey } from "@workspace/api-client-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "../../components/ImageUpload";

interface BookForm {
  title: string; volume: number; price: number; description: string;
  coverImage: string | null; coverPending: boolean;
}

export default function AdminBooks() {
  const qc = useQueryClient();
  const { data: books = [], isLoading } = useListBooks();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<BookForm>({ title: "", volume: 1, price: 0, description: "", coverImage: null, coverPending: true });

  const invalidate = () => qc.invalidateQueries({ queryKey: getListBooksQueryKey() });

  const openAdd = () => {
    setEditingId(null);
    setForm({ title: "", volume: books.length + 1, price: 0, description: "", coverImage: null, coverPending: true });
    setIsDialogOpen(true);
  };
  const openEdit = (b: typeof books[0]) => {
    setEditingId(b.id);
    setForm({ title: b.title, volume: b.volume, price: b.price, description: b.description, coverImage: b.coverImage ?? null, coverPending: b.coverPending });
    setIsDialogOpen(true);
  };
  const handleDelete = async (id: number) => {
    if (!confirm("Delete this book?")) return;
    await fetch(`/api/books/${id}`, { method: "DELETE", credentials: "include" });
    invalidate();
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true);
    const body = { ...form, coverPending: !form.coverImage };
    if (editingId) await fetch(`/api/books/${editingId}`, { method: "PATCH", credentials: "include", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    else await fetch("/api/books", { method: "POST", credentials: "include", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    setSaving(false); setIsDialogOpen(false); invalidate();
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-serif text-foreground mb-2">Library Management</h1>
          <p className="text-muted-foreground">Manage the academy's official texts and cover photos.</p>
        </div>
        <Button onClick={openAdd} className="bg-primary text-primary-foreground hover:bg-[#C9A860] rounded-sm">Add Book</Button>
      </div>
      <div className="bg-card border border-line overflow-hidden">
        <Table>
          <TableHeader className="bg-muted">
            <TableRow className="border-line">
              <TableHead className="font-mono text-[11px] uppercase tracking-wider font-normal opacity-70 w-16">Cover</TableHead>
              <TableHead className="font-mono text-[11px] uppercase tracking-wider font-normal opacity-70 w-12">Vol</TableHead>
              <TableHead className="font-mono text-[11px] uppercase tracking-wider font-normal opacity-70">Title</TableHead>
              <TableHead className="font-mono text-[11px] uppercase tracking-wider font-normal opacity-70">Price</TableHead>
              <TableHead className="font-mono text-[11px] uppercase tracking-wider font-normal opacity-70 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-line">
            {isLoading && <TableRow><TableCell colSpan={5} className="text-center py-8 opacity-60">Loading…</TableCell></TableRow>}
            {books.map(book => (
              <TableRow key={book.id} className="border-line hover:bg-muted/50">
                <TableCell>
                  <div className="w-10 h-14 bg-ink flex items-center justify-center overflow-hidden">
                    {book.coverImage ? <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover" /> : <span className="font-mono text-[8px] text-[#A67C3D] text-center px-1 leading-tight">NO COVER</span>}
                  </div>
                </TableCell>
                <TableCell className="font-mono text-xs opacity-70">Vol.{book.volume}</TableCell>
                <TableCell>
                  <div className="font-medium">{book.title}</div>
                  {book.description && <div className="text-xs opacity-60 mt-1 line-clamp-1">{book.description}</div>}
                </TableCell>
                <TableCell className="font-mono text-sm text-[#6E2439]">KSh {book.price.toLocaleString()}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="outline" size="sm" onClick={() => openEdit(book)} className="rounded-sm border-line hover:text-primary hover:bg-transparent">Edit</Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(book.id)} className="rounded-sm border-line text-destructive hover:bg-destructive/10">Delete</Button>
                </TableCell>
              </TableRow>
            ))}
            {!isLoading && books.length === 0 && <TableRow><TableCell colSpan={5} className="text-center py-8 opacity-60">No books yet.</TableCell></TableRow>}
          </TableBody>
        </Table>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-card border-line max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle className="font-serif text-2xl">{editingId ? "Edit Book" : "Add Book"}</DialogTitle></DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-5 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2"><Label>Title</Label><Input required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="bg-muted rounded-sm" /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2"><Label>Volume</Label><Input type="number" required min={1} value={form.volume} onChange={e => setForm({ ...form, volume: parseInt(e.target.value) })} className="bg-muted rounded-sm" /></div>
                  <div className="space-y-2"><Label>Price (KSh)</Label><Input type="number" required min={0} value={form.price} onChange={e => setForm({ ...form, price: parseInt(e.target.value) })} className="bg-muted rounded-sm" /></div>
                </div>
                <div className="space-y-2"><Label>Description</Label><Textarea required value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="bg-muted rounded-sm resize-none" rows={4} /></div>
              </div>
              <ImageUpload label="Book Cover Photo" hint="Upload a book cover image. Ideal size: 3:4 ratio." aspectRatio="portrait" value={form.coverImage ?? undefined} onChange={(url) => setForm({ ...form, coverImage: url ?? null })} />
            </div>
            <div className="flex justify-end pt-2">
              <Button type="submit" disabled={saving} className="bg-primary text-primary-foreground hover:bg-[#C9A860] rounded-sm">{saving ? "Saving…" : editingId ? "Save Changes" : "Add Book"}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
