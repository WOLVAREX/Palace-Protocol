import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useGetSiteSettings, getGetSiteSettingsQueryKey } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminSettings() {
  const qc = useQueryClient();
  const { data: settings } = useGetSiteSettings();
  const [form, setForm] = useState({ whatsappNumber: "", email: "", location: "", sessionTimes: "", ceoName: "", ceoTitle: "" });
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (settings) setForm({ whatsappNumber: settings.whatsappNumber, email: settings.email, location: settings.location, sessionTimes: settings.sessionTimes, ceoName: settings.ceoName, ceoTitle: settings.ceoTitle });
  }, [settings]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true);
    await fetch("/api/site/settings", { method: "PATCH", credentials: "include", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    qc.invalidateQueries({ queryKey: getGetSiteSettingsQueryKey() });
    setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 3000);
  };

  const Section = ({ title }: { title: string }) => <h3 className="font-serif text-xl text-foreground border-b border-line pb-2 pt-2">{title}</h3>;

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-3xl font-serif text-foreground mb-2">Site Settings</h1>
        <p className="text-muted-foreground">Manage contact details, leadership info, and academy configuration.</p>
      </div>
      <div className="bg-ink border border-[rgba(166,124,61,0.35)] p-5 space-y-1">
        <p className="eyebrow text-[#C9A860]">Admin Login Credentials</p>
        <p className="text-parchment text-sm opacity-80">Username: <span className="font-mono text-[#C9A860]">admin</span></p>
        <p className="text-parchment text-sm opacity-80">Password: <span className="font-mono text-[#C9A860]">Palace2026!</span></p>
        <p className="text-parchment/50 text-xs mt-2 font-mono">Keep these credentials private. Do not share publicly.</p>
      </div>
      <div className="bg-card border border-line p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Section title="Contact Information" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>WhatsApp Number</Label>
              <Input required value={form.whatsappNumber} onChange={e => setForm({ ...form, whatsappNumber: e.target.value })} placeholder="+254700000000" className="bg-muted rounded-sm" />
              <p className="text-xs opacity-60">Include country code, e.g. +254700000000</p>
            </div>
            <div className="space-y-2">
              <Label>Public Email</Label>
              <Input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="bg-muted rounded-sm" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Location / Venue</Label>
              <Input required value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} className="bg-muted rounded-sm" />
            </div>
            <div className="space-y-2">
              <Label>Session Times</Label>
              <Input required value={form.sessionTimes} onChange={e => setForm({ ...form, sessionTimes: e.target.value })} placeholder="e.g. Saturdays, 9:00 AM – 12:00 PM" className="bg-muted rounded-sm" />
            </div>
          </div>
          <Section title="Academy Leadership" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>CEO / Founder Name</Label>
              <Input required value={form.ceoName} onChange={e => setForm({ ...form, ceoName: e.target.value })} className="bg-muted rounded-sm" />
              <p className="text-xs opacity-60">Displayed on the About section and CEO card.</p>
            </div>
            <div className="space-y-2">
              <Label>CEO Title</Label>
              <Input required value={form.ceoTitle} onChange={e => setForm({ ...form, ceoTitle: e.target.value })} className="bg-muted rounded-sm" />
            </div>
          </div>
          <Section title="Quick Links" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[["Site Content", "Edit hero, about, pillars, CEO photo", "/admin/content"], ["Terms of Service", "Edit legal terms shown at /terms", "/admin/terms"], ["Privacy Policy", "Edit privacy policy shown at /policies", "/admin/policies"], ["Library Management", "Add/edit books and cover photos", "/admin/books"]].map(([title, desc, href]) => (
              <a key={href} href={href} className="flex items-center gap-3 p-4 border border-line hover:border-primary bg-muted transition-colors">
                <span className="text-2xl font-serif text-[#A67C3D]">✦</span>
                <div><div className="font-medium text-sm">{title}</div><div className="text-xs opacity-60">{desc}</div></div>
              </a>
            ))}
          </div>
          <div className="pt-4 flex items-center gap-4 border-t border-line">
            <Button type="submit" disabled={saving} className="bg-primary text-primary-foreground hover:bg-[#C9A860] rounded-sm px-8">{saving ? "Saving…" : "Save Settings"}</Button>
            {saved && <span className="text-sm font-medium text-green-600">Settings saved.</span>}
          </div>
        </form>
      </div>
    </div>
  );
}
