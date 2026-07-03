import { useState } from "react";
import { useGetSiteSettings } from "@workspace/api-client-react";

export default function Contact() {
  const { data: settings } = useGetSiteSettings();
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await fetch("/api/enrollments", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    setSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: "", phone: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-parchment">
      <section className="py-16 md:py-24 border-b border-line bg-ink text-bone relative overflow-hidden">
        <svg className="absolute -right-[90px] top-1/2 -translate-y-1/2 w-[520px] h-[520px] opacity-[0.04] pointer-events-none" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="46" fill="none" stroke="#A67C3D" strokeWidth="0.6" />
          <circle cx="50" cy="50" r="36" fill="none" stroke="#A67C3D" strokeWidth="0.6" />
          <text x="50" y="58" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="30" fill="#A67C3D">PP</text>
        </svg>
        <div className="max-w-wrap relative z-10">
          <p className="eyebrow mb-4">Reach the academy</p>
          <h1 className="text-[36px] md:text-[52px] leading-[1.08] max-w-[700px] text-bone mb-6">Every enrolment starts with a conversation.</h1>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-wrap">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-line bg-bone">
            <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-line">
              <h3 className="text-[26px] font-serif text-ink mb-2">Request Enrolment</h3>
              <p className="text-sm text-ink opacity-70 mb-8">Submit your details below. An academy representative will review your request and contact you.</p>
              {isSubmitted ? (
                <div className="bg-[#EFE7D6] border border-line p-6 text-center">
                  <div className="text-[#A67C3D] font-serif text-xl mb-2">Request Received</div>
                  <p className="text-sm text-ink opacity-80">We have recorded your interest. Our team will reach out to you on the provided number shortly.</p>
                  <button onClick={() => setIsSubmitted(false)} className="mt-4 text-xs font-mono text-destructive uppercase tracking-wider hover:underline">Submit another request</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div>
                    <label className="block text-[12px] text-ink opacity-70 mb-1.5">Full Name</label>
                    <input type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full p-3 border border-line bg-parchment font-sans text-sm text-ink focus:outline-none focus:border-primary transition-colors" placeholder="e.g. Samuel Ochieng" />
                  </div>
                  <div>
                    <label className="block text-[12px] text-ink opacity-70 mb-1.5">Phone (WhatsApp preferred)</label>
                    <input type="tel" required value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="w-full p-3 border border-line bg-parchment font-sans text-sm text-ink focus:outline-none focus:border-primary transition-colors" placeholder="+254 7XX XXX XXX" />
                  </div>
                  <div>
                    <label className="block text-[12px] text-ink opacity-70 mb-1.5">Message / Intent</label>
                    <textarea required rows={4} value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} className="w-full p-3 border border-line bg-parchment font-sans text-sm text-ink focus:outline-none focus:border-primary transition-colors resize-none" placeholder="Briefly state why you wish to join the academy..." />
                  </div>
                  <button type="submit" disabled={submitting} className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium rounded-sm cursor-pointer border border-transparent bg-primary text-ink hover:bg-[#C9A860] transition-colors mt-2 disabled:opacity-60">
                    {submitting ? "Submitting…" : "Submit Request"}
                  </button>
                </form>
              )}
            </div>
            <div className="bg-ink p-8 md:p-12 flex flex-col justify-center gap-8">
              <div className="bg-destructive p-8 flex flex-col justify-center gap-4 mb-4">
                <h3 className="text-[22px] text-bone font-serif">Message us directly</h3>
                <p className="text-sm text-parchment opacity-85">Prefer a faster response? Reach out directly on WhatsApp.</p>
                <a href={`https://wa.me/${(settings?.whatsappNumber ?? "").replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium rounded-sm cursor-pointer border border-transparent bg-primary text-ink hover:bg-[#C9A860] transition-colors mt-2 self-start">Chat on WhatsApp</a>
              </div>
              <div><p className="eyebrow mb-1.5">Email</p><p className="text-base text-bone">{settings?.email ?? ""}</p></div>
              <div><p className="eyebrow mb-1.5">Location</p><p className="text-base text-bone">{settings?.location ?? ""}</p></div>
              <div><p className="eyebrow mb-1.5">Session times</p><p className="text-base text-bone">{settings?.sessionTimes ?? ""}</p></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
