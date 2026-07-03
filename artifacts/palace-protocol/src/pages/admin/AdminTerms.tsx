import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useGetSiteContent, getGetSiteContentQueryKey } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function AdminTerms() {
  const qc = useQueryClient();
  const { data: content } = useGetSiteContent();
  const [terms, setTerms] = useState("");
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => { if (content?.terms) setTerms(content.terms); }, [content]);

  const save = async () => {
    setSaving(true);
    await fetch("/api/site/content", { method: "PATCH", credentials: "include", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ terms }) });
    qc.invalidateQueries({ queryKey: getGetSiteContentQueryKey() });
    setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-3xl font-serif text-foreground mb-2">Terms of Service</h1>
        <p className="text-muted-foreground">Edit the academy's terms of service. Displayed at <span className="font-mono text-xs">/terms</span>.</p>
      </div>
      <div className="bg-card border border-line p-8 space-y-6">
        <p className="text-xs font-mono uppercase tracking-wider opacity-50">Plain text — line breaks are preserved when displayed.</p>
        <Textarea value={terms} onChange={e => setTerms(e.target.value)} className="bg-muted rounded-sm resize-none font-mono text-xs leading-relaxed" rows={30} />
        <div className="pt-4 flex items-center gap-4 border-t border-line">
          <Button onClick={save} disabled={saving} className="bg-primary text-primary-foreground hover:bg-[#C9A860] rounded-sm px-8">{saving ? "Saving…" : "Save Terms"}</Button>
          {saved && <span className="text-sm font-medium text-green-600">Terms saved.</span>}
        </div>
      </div>
    </div>
  );
}
