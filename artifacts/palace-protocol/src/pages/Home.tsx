import { Link } from "wouter";
import { SealLogo } from "../components/SealLogo";
import { PillarCard } from "../components/PillarCard";
import { BookCard } from "../components/BookCard";
import { useListBooks, useGetSiteSettings, useGetSiteContent } from "@workspace/api-client-react";
import { motion } from "framer-motion";

export default function Home() {
  const { data: settings } = useGetSiteSettings();
  const { data: content } = useGetSiteContent();
  const { data: allBooks = [] } = useListBooks();
  const books = allBooks.slice(0, 3);

  const pillars = content ? [
    { numeral: content.pillar1Numeral ?? "I.", title: content.pillar1Title ?? "Presence", description: content.pillar1Description ?? "" },
    { numeral: content.pillar2Numeral ?? "II.", title: content.pillar2Title ?? "Respect", description: content.pillar2Description ?? "" },
    { numeral: content.pillar3Numeral ?? "III.", title: content.pillar3Title ?? "Discretion", description: content.pillar3Description ?? "" },
  ] : [];

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="relative overflow-hidden bg-ink text-bone pt-24 pb-28 border-b border-line">
        <svg className="absolute -right-[90px] top-1/2 -translate-y-1/2 w-[520px] h-[520px] opacity-[0.06] pointer-events-none" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="46" fill="none" stroke="#A67C3D" strokeWidth="0.6" />
          <circle cx="50" cy="50" r="36" fill="none" stroke="#A67C3D" strokeWidth="0.6" />
          <text x="50" y="58" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="30" fill="#A67C3D">PP</text>
        </svg>
        <div className="max-w-wrap relative z-10 grid grid-cols-1 md:grid-cols-[1.15fr_0.85fr] gap-12 items-center">
          <div className="order-2 md:order-1 text-left">
            <p className="eyebrow">Protocol &amp; conduct mentorship</p>
            <h1 className="text-[36px] md:text-[52px] leading-[1.08] my-4 md:my-5 max-w-[560px] text-bone">
              {content?.heroHeadline ?? ""}
            </h1>
            <p className="text-[17px] text-parchment opacity-85 max-w-[480px] mb-9">
              {content?.heroSubheadline ?? ""}
            </p>
            <div className="flex flex-wrap gap-3.5">
              <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-sm cursor-pointer border border-transparent bg-primary text-ink hover:bg-[#C9A860] transition-colors" data-testid="link-begin-training">
                Begin your training
              </Link>
              <Link href="/about" className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-sm cursor-pointer border border-primary text-[#C9A860] bg-transparent hover:bg-[#a67c3d1f] transition-colors" data-testid="link-read-story">
                Read our story
              </Link>
            </div>
          </div>
          <div className="order-1 md:order-2 flex justify-center md:justify-end items-center mb-6 md:mb-0">
            <motion.div initial={{ opacity: 0, scale: 1.6, rotate: -8 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}>
              <SealLogo size={280} color="brass-light" showText />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="bg-parchment py-16 md:py-24">
        <div className="max-w-wrap">
          <div className="grid grid-cols-1 md:grid-cols-[1.3fr_0.7fr] gap-14 items-start">
            <div>
              <p className="eyebrow">The academy</p>
              <h2 className="text-[28px] md:text-[36px] leading-[1.2] mt-3.5 mb-6 max-w-[600px] text-ink">{content?.aboutHeading ?? ""}</h2>
              <p className="text-base text-ink opacity-85 mb-4 max-w-[520px]">{content?.aboutBody1 ?? ""}</p>
              <p className="text-base text-ink opacity-85 max-w-[520px]">{content?.aboutBody2 ?? ""}</p>
            </div>
            <div className="bg-bone border border-line p-7">
              <div className="w-full aspect-square bg-ink flex items-center justify-center mb-4.5 relative overflow-hidden">
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
            </div>
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="bg-ink text-bone border-y border-line py-16 md:py-24">
        <div className="max-w-wrap">
          <div className="max-w-[600px] mb-14">
            <p className="eyebrow">The code</p>
            <h2 className="text-[28px] md:text-[36px] leading-[1.2] mt-3.5 text-bone">Three clauses every member is trained in.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-line border border-line">
            {pillars.map(p => <PillarCard key={p.numeral} numeral={p.numeral} title={p.title} description={p.description} />)}
          </div>
        </div>
      </section>

      {/* BOOKS */}
      <section className="bg-bone py-16 md:py-24">
        <div className="max-w-wrap">
          <div className="max-w-[600px] mb-14">
            <p className="eyebrow">The library</p>
            <h2 className="text-[28px] md:text-[36px] leading-[1.2] mt-3.5 text-ink">Study the protocol, chapter by chapter.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {books.map(book => <BookCard key={book.id} book={book} whatsappNumber={settings?.whatsappNumber} />)}
          </div>
          <p className="mt-7 text-[13px] text-ink opacity-60 italic">Payment is arranged directly over WhatsApp once you place an order — no card or checkout on this site.</p>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="bg-ink text-bone py-16 md:py-24">
        <div className="max-w-wrap">
          <div className="max-w-[600px] mb-14">
            <p className="eyebrow">Reach the academy</p>
            <h2 className="text-[28px] md:text-[36px] leading-[1.2] mt-3.5 text-bone">Every enrolment starts with a conversation.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-line">
            <div className="bg-destructive p-11 flex flex-col justify-center gap-4">
              <h3 className="font-serif text-[26px] text-bone">Message us on WhatsApp</h3>
              <p className="text-sm text-parchment opacity-85">The fastest way to ask about sessions, order a book, or enquire about joining.</p>
              <a href={`https://wa.me/${(settings?.whatsappNumber ?? "").replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium rounded-sm cursor-pointer border border-transparent bg-primary text-ink hover:bg-[#C9A860] transition-colors mt-2 self-start" data-testid="link-whatsapp-hero">Chat on WhatsApp</a>
            </div>
            <div className="p-11 flex flex-col justify-center gap-5 bg-ink">
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
