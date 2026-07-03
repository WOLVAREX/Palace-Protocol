import { BookItem } from "@workspace/api-client-react";
import { SealLogo } from "./SealLogo";

interface BookCardProps {
  book: BookItem;
  whatsappNumber?: string;
}

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

export function BookCard({ book, whatsappNumber = "" }: BookCardProps) {
  const whatsappText = encodeURIComponent(`I'd like to order: ${book.title}`);
  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${whatsappText}`;
  const roman = ROMAN[book.volume - 1] ?? String(book.volume);

  return (
    <div className="border border-line bg-parchment" data-testid={`card-book-${book.id}`}>
      <div className="aspect-[3/4] bg-ink flex flex-col items-center justify-center gap-2.5 text-[#C9A860] overflow-hidden relative">
        {book.coverImage
          ? <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover absolute inset-0" />
          : <>
              <SealLogo size={44} color="brass-light" className="opacity-55" />
              <div className="font-mono text-[11px] tracking-[2px]">VOL. {roman} — COVER PENDING</div>
            </>
        }
      </div>
      <div className="p-5 md:p-6 pb-6">
        <div className="font-mono text-[10px] tracking-[2px] text-[#A67C3D] uppercase mb-1">Vol. {roman}</div>
        <div className="font-serif text-[20px] font-semibold mb-1.5 leading-tight text-ink">{book.title}</div>
        <div className="font-mono text-[13px] text-destructive mb-4">KSh {book.price.toLocaleString()}</div>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 w-full px-5 py-2.5 text-sm font-medium rounded-sm cursor-pointer border border-transparent font-sans bg-destructive text-bone hover:bg-[#8B3550] transition-colors"
          data-testid={`link-order-book-${book.id}`}
        >
          Order on WhatsApp
        </a>
      </div>
    </div>
  );
}
