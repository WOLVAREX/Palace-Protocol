import { BookCard } from "../components/BookCard";
import { useListBooks, useGetSiteSettings } from "@workspace/api-client-react";

export default function Books() {
  const { data: books = [] } = useListBooks();
  const { data: settings } = useGetSiteSettings();

  return (
    <div className="min-h-screen bg-bone">
      <section className="py-16 md:py-24 border-b border-line bg-ink text-bone relative overflow-hidden">
        <svg className="absolute -right-[90px] top-1/2 -translate-y-1/2 w-[520px] h-[520px] opacity-[0.04] pointer-events-none" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="46" fill="none" stroke="#A67C3D" strokeWidth="0.6" />
          <circle cx="50" cy="50" r="36" fill="none" stroke="#A67C3D" strokeWidth="0.6" />
          <text x="50" y="58" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="30" fill="#A67C3D">PP</text>
        </svg>
        <div className="max-w-wrap relative z-10">
          <p className="eyebrow mb-4">The Library</p>
          <h1 className="text-[36px] md:text-[52px] leading-[1.08] max-w-[700px] text-bone mb-6">Study the protocol, chapter by chapter.</h1>
          <p className="text-[17px] text-parchment opacity-85 max-w-[480px]">Our official texts provide the foundational knowledge for every member. Required reading for all academy initiates.</p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-wrap">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {books.map(book => (
              <div key={book.id} className="flex flex-col">
                <BookCard book={book} whatsappNumber={settings?.whatsappNumber} />
                {book.description && <p className="mt-4 text-sm text-ink opacity-70 px-1">{book.description}</p>}
              </div>
            ))}
            {books.length === 0 && <p className="text-ink opacity-60 col-span-3 py-12 text-center">No books in the library yet.</p>}
          </div>
          <div className="mt-16 pt-8 border-t border-line">
            <p className="text-[13px] text-ink opacity-60 italic">Payment is arranged directly over WhatsApp once you place an order — no card or checkout on this site.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
