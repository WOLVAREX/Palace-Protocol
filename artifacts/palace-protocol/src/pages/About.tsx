import { Link } from "wouter";
import { SealLogo } from "../components/SealLogo";
import { useGetSiteSettings, useGetSiteContent } from "@workspace/api-client-react";

export default function About() {
  const { data: settings } = useGetSiteSettings();
  const { data: content } = useGetSiteContent();

  return (
    <div className="min-h-screen bg-parchment">
      <section className="py-16 md:py-24 border-b border-line bg-ink text-bone relative overflow-hidden">
        <svg className="absolute -right-[90px] top-1/2 -translate-y-1/2 w-[520px] h-[520px] opacity-[0.04] pointer-events-none" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="46" fill="none" stroke="#A67C3D" strokeWidth="0.6" />
          <circle cx="50" cy="50" r="36" fill="none" stroke="#A67C3D" strokeWidth="0.6" />
          <text x="50" y="58" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="30" fill="#A67C3D">PP</text>
        </svg>
        <div className="max-w-wrap relative z-10">
          <p className="eyebrow mb-4">Our Story</p>
          <h1 className="text-[36px] md:text-[52px] leading-[1.08] max-w-[700px] text-bone mb-6">A finishing school for the next generation of leaders.</h1>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-wrap">
          <div className="grid grid-cols-1 md:grid-cols-[1.3fr_0.7fr] gap-14 items-start">
            <div className="space-y-5">
              <h2 className="text-[28px] md:text-[36px] leading-[1.2] mt-0 mb-2 text-ink">{content?.aboutHeading ?? ""}</h2>
              <p className="text-base text-ink opacity-85">{content?.aboutBody1 ?? ""}</p>
              <p className="text-base text-ink opacity-85">{content?.aboutBody2 ?? ""}</p>
              <h3 className="font-serif text-[24px] text-ink mt-10 pt-4">The Curriculum</h3>
              <p className="text-base text-ink opacity-85">Our sessions are rigorous and structured. Members are mentored in small groups to ensure personalized attention. From the subtleties of table manners to the intricacies of formal correspondence, no detail is too small.</p>
              <p className="text-base text-ink opacity-85">Graduates of the academy leave with more than just rules; they leave with an unshakable confidence that allows them to navigate any social or professional environment with grace.</p>
              <div className="pt-4">
                <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-sm cursor-pointer border border-transparent bg-primary text-ink hover:bg-[#C9A860] transition-colors" data-testid="link-apply">Apply to join the academy</Link>
              </div>
            </div>
            <div className="bg-bone border border-line p-7 sticky top-24">
              <div className="w-full aspect-square bg-ink flex items-center justify-center mb-4 relative overflow-hidden">
                {content?.ceoPhoto
                  ? <img src={content.ceoPhoto} alt={settings?.ceoName ?? ""} className="w-full h-full object-cover" />
                  : <>
                      <SealLogo size={64} color="brass" className="opacity-50" />
                      <div className="absolute bottom-2.5 left-2.5 right-2.5 font-mono text-[10px] tracking-[1.5px] text-[#C9A860] uppercase text-center">Photo pending</div>
                    </>
                }
              </div>
              <div className="font-serif text-[22px] font-semibold text-ink">{settings?.ceoName ?? ""}</div>
              <div className="font-mono text-[11px] tracking-[1.5px] text-destructive uppercase mt-1">{settings?.ceoTitle ?? ""}</div>
              <p className="text-sm text-ink opacity-70 mt-4 italic">"Etiquette is not about rules. It is about ensuring everyone around you feels respected, while commanding respect yourself."</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
