import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useGetSiteContent, getGetSiteContentQueryKey } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "../../components/ImageUpload";

interface ContentForm {
  heroHeadline: string; heroSubheadline: string;
  aboutHeading: string; aboutBody1: string; aboutBody2: string;
  ceoPhoto: string | null;
  pillar1Numeral: string; pillar1Title: string; pillar1Description: string;
  pillar2Numeral: string; pillar2Title: string; pillar2Description: string;
  pillar3Numeral: string; pillar3Title: string; pillar3Description: string;
}

const defaultForm: ContentForm = {
  heroHeadline: "", heroSubheadline: "", aboutHeading: "", aboutBody1: "", aboutBody2: "", ceoPhoto: null,
  pillar1Numeral: "I.", pillar1Title: "Presence", pillar1Description: "",
  pillar2Numeral: "II.", pillar2Title: "Respect", pillar2Description: "",
  pillar3Numeral: "III.", pillar3Title: "Discretion", pillar3Description: "",
};

export default function AdminContent() {
  const qc = useQueryClient();
  const { data: content } = useGetSiteContent();
  const [form, setForm] = useState<ContentForm>(defaultForm);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"hero" | "about" | "pillars" | "ceo">("hero");

  useEffect(() => {
    if (content) setForm({
      heroHeadline: content.heroHeadline, heroSubheadline: content.heroSubheadline,
      aboutHeading: content.aboutHeading, aboutBody1: content.aboutBody1, aboutBody2: content.aboutBody2,
      ceoPhoto: content.ceoPhoto ?? null,
      pillar1Numeral: content.pillar1Numeral ?? "I.", pillar1Title: content.pillar1Title ?? "Presence", pillar1Description: content.pillar1Description ?? "",
      pillar2Numeral: content.pillar2Numeral ?? "II.", pillar2Title: content.pillar2Title ?? "Respect", pillar2Description: content.pillar2Description ?? "",
      pillar3Numeral: content.pillar3Numeral ?? "III.", pillar3Title: content.pillar3Title ?? "Discretion", pillar3Description: content.pillar3Description ?? "",
    });
  }, [content]);

  const save = async () => {
    setSaving(true);
    await fetch("/api/site/content", { method: "PATCH", credentials: "include", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    qc.invalidateQueries({ queryKey: getGetSiteContentQueryKey() });
    setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 3000);
  };

  const tabs = [{ id: "hero" as const, label: "Hero Section" }, { id: "about" as const, label: "About Section" }, { id: "ceo" as const, label: "CEO / Founder" }, { id: "pillars" as const, label: "The Code (Pillars)" }];

  const pillars = [
    { numeral: form.pillar1Numeral, title: form.pillar1Title, description: form.pillar1Description, prefix: "pillar1" },
    { numeral: form.pillar2Numeral, title: form.pillar2Title, description: form.pillar2Description, prefix: "pillar2" },
    { numeral: form.pillar3Numeral, title: form.pillar3Title, description: form.pillar3Description, prefix: "pillar3" },
  ];

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-3xl font-serif text-foreground mb-2">Site Content</h1>
        <p className="text-muted-foreground">Edit all public-facing copy and photos.</p>
      </div>
      <div className="flex border border-line overflow-x-auto">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} className={`flex-1 whitespace-nowrap px-4 py-3 font-mono text-[11px] uppercase tracking-wider transition-colors ${activeTab === t.id ? "bg-ink text-[#C9A860]" : "bg-muted opacity-60 hover:opacity-100"}`}>{t.label}</button>
        ))}
      </div>
      <div className="bg-card border border-line p-4 sm:p-8 space-y-6">
        {activeTab === "hero" && (
          <>
            <h3 className="font-serif text-xl border-b border-line pb-2">Hero Section</h3>
            <div className="space-y-2"><Label>Main Headline</Label><Textarea value={form.heroHeadline} onChange={e => setForm({ ...form, heroHeadline: e.target.value })} className="bg-muted rounded-sm resize-none text-xl font-serif" rows={2} /></div>
            <div className="space-y-2"><Label>Subheadline / Lede</Label><Textarea value={form.heroSubheadline} onChange={e => setForm({ ...form, heroSubheadline: e.target.value })} className="bg-muted rounded-sm resize-none" rows={3} /></div>
          </>
        )}
        {activeTab === "about" && (
          <>
            <h3 className="font-serif text-xl border-b border-line pb-2">About Section</h3>
            <div className="space-y-2"><Label>Section Heading</Label><Textarea value={form.aboutHeading} onChange={e => setForm({ ...form, aboutHeading: e.target.value })} className="bg-muted rounded-sm resize-none font-serif text-lg" rows={2} /></div>
            <div className="space-y-2"><Label>First Paragraph</Label><Textarea value={form.aboutBody1} onChange={e => setForm({ ...form, aboutBody1: e.target.value })} className="bg-muted rounded-sm resize-none" rows={4} /></div>
            <div className="space-y-2"><Label>Second Paragraph</Label><Textarea value={form.aboutBody2} onChange={e => setForm({ ...form, aboutBody2: e.target.value })} className="bg-muted rounded-sm resize-none" rows={3} /></div>
          </>
        )}
        {activeTab === "ceo" && (
          <>
            <h3 className="font-serif text-xl border-b border-line pb-2">CEO / Founder</h3>
            <p className="text-xs opacity-60">To update CEO name and title, go to <span className="font-mono">Site Settings → Academy Leadership</span>.</p>
            <ImageUpload label="CEO / Founder Photo" hint="Upload a portrait photo. Will appear on the About section." aspectRatio="portrait" value={form.ceoPhoto ?? undefined} onChange={(url) => setForm({ ...form, ceoPhoto: url ?? null })} />
          </>
        )}
        {activeTab === "pillars" && (
          <>
            <h3 className="font-serif text-xl border-b border-line pb-2">The Code — Three Pillars</h3>
            {pillars.map((pillar, i) => (
              <div key={i} className="space-y-3 pb-6 border-b border-line last:border-0">
                <p className="eyebrow">Pillar {pillar.numeral}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="space-y-1"><Label>Numeral</Label><Input value={pillar.numeral} onChange={e => setForm({ ...form, [`${pillar.prefix}Numeral`]: e.target.value })} className="bg-muted rounded-sm font-mono" /></div>
                  <div className="space-y-1 md:col-span-2"><Label>Title</Label><Input value={pillar.title} onChange={e => setForm({ ...form, [`${pillar.prefix}Title`]: e.target.value })} className="bg-muted rounded-sm font-serif" /></div>
                </div>
                <div className="space-y-1"><Label>Description</Label><Textarea value={pillar.description} onChange={e => setForm({ ...form, [`${pillar.prefix}Description`]: e.target.value })} className="bg-muted rounded-sm resize-none" rows={2} /></div>
              </div>
            ))}
          </>
        )}
        <div className="pt-4 flex items-center gap-4 border-t border-line">
          <Button onClick={save} disabled={saving} className="bg-primary text-primary-foreground hover:bg-[#C9A860] rounded-sm px-8">{saving ? "Saving…" : "Save Changes"}</Button>
          {saved && <span className="text-sm font-medium text-green-600">Content saved successfully.</span>}
        </div>
      </div>
    </div>
  );
}
