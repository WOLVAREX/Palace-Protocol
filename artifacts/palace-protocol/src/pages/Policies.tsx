import { useGetSiteContent } from "@workspace/api-client-react";

export default function Policies() {
  const { data: content } = useGetSiteContent();
  const text = content?.policies ?? "";
  const paragraphs = text.split(/\n\n+/).filter(Boolean);

  return (
    <div className="bg-bone min-h-screen">
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "80px 32px" }}>
        <p className="eyebrow mb-4">Legal</p>
        <h1 className="font-serif text-4xl text-ink mb-10">Privacy Policy</h1>
        <div className="space-y-5">
          {paragraphs.map((para, i) => {
            const isHeading = para === para.toUpperCase() && para.length < 80;
            return isHeading
              ? <h2 key={i} className="font-serif text-xl text-ink mt-8 mb-2 border-b border-line pb-2">{para}</h2>
              : <p key={i} className="text-ink opacity-80 leading-relaxed whitespace-pre-wrap">{para}</p>;
          })}
          {!text && <p className="text-ink opacity-50 italic">No privacy policy has been published yet.</p>}
        </div>
      </div>
    </div>
  );
}
