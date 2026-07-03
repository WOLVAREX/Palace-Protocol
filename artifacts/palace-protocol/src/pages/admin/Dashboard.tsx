import { Link } from "wouter";
import { useListBooks, useListMembers, useListAcademySessions, useListEnrollments } from "@workspace/api-client-react";

export default function Dashboard() {
  const { data: books = [] } = useListBooks();
  const { data: members = [] } = useListMembers();
  const { data: sessions = [] } = useListAcademySessions();
  const { data: enrollments = [] } = useListEnrollments();

  const pendingCount = enrollments.filter(e => e.status === "pending").length;
  const recent = [...enrollments].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif text-foreground mb-2">Overview</h1>
        <p className="text-muted-foreground">A summary of academy activity.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[["Total Books", books.length, "text-foreground"], ["Total Members", members.length, "text-foreground"], ["Pending Requests", pendingCount, "text-destructive"], ["Upcoming Sessions", sessions.length, "text-foreground"]].map(([label, count, cls]) => (
          <div key={String(label)} className="bg-card border border-line p-6">
            <p className="eyebrow mb-2">{label}</p>
            <div className={`text-3xl font-serif ${cls}`}>{count}</div>
          </div>
        ))}
      </div>
      <div className="bg-card border border-line">
        <div className="p-6 border-b border-line flex justify-between items-center">
          <h2 className="text-xl font-serif text-foreground">Recent Enrollment Requests</h2>
          <Link href="/admin/enrollments" className="text-sm text-primary hover:underline font-medium">View all</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted font-mono text-[11px] uppercase tracking-wider opacity-70">
              <tr>
                <th className="px-6 py-4 font-normal">Name</th>
                <th className="px-6 py-4 font-normal">Phone</th>
                <th className="px-6 py-4 font-normal">Status</th>
                <th className="px-6 py-4 font-normal">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {recent.map(e => (
                <tr key={e.id}>
                  <td className="px-6 py-4 font-medium">{e.name}</td>
                  <td className="px-6 py-4 opacity-80">{e.phone}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-sm text-xs font-medium uppercase tracking-wider font-mono ${e.status === "pending" ? "bg-[#A67C3D]/20 text-[#A67C3D]" : e.status === "approved" ? "bg-green-100 text-green-800" : "bg-destructive/20 text-destructive"}`}>{e.status}</span>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs opacity-60">{new Date(e.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
              {recent.length === 0 && <tr><td colSpan={4} className="px-6 py-8 text-center opacity-60">No enrollment requests yet.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
